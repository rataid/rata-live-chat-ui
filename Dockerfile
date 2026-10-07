# ---------- Build ----------
FROM node:22-alpine AS builder
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH" COREPACK_ENABLE_DOWNLOAD_PROMPT=0

ARG PNPM_VERSION=

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    set -eu; \
    corepack enable; \
    LOCK_VER="$(sed -n 's/^lockfileVersion:[^0-9]*\([0-9][0-9.]*\).*/\1/p' pnpm-lock.yaml | head -n1)"; \
    if [ -n "$PNPM_VERSION" ]; then \
      PNPM_V="$PNPM_VERSION"; \
    else \
      case "$LOCK_VER" in \
        5.*) PNPM_V=7 ;; \
        6.*) PNPM_V=8 ;; \
        9.*) PNPM_V=9 ;; \
        *) echo "ERROR: lockfileVersion '$LOCK_VER' tidak dikenal, set --build-arg PNPM_VERSION" >&2; exit 1 ;; \
      esac; \
    fi; \
    echo ">> lockfileVersion=${LOCK_VER} -> pnpm@${PNPM_V}"; \
    corepack prepare "pnpm@${PNPM_V}" --activate; \
    pnpm install --frozen-lockfile

COPY . .

ARG ENV_FILE=.env.build

# 1) File env harus ada dan berisi VITE_API_ENDPOINT yang tidak kosong
RUN test -s "$ENV_FILE" || { echo "ERROR: $ENV_FILE kosong/tidak ada"; exit 1; } \
 && grep -q '^VITE_API_ENDPOINT=.\+' "$ENV_FILE" \
 || { echo "ERROR: VITE_API_ENDPOINT tidak ada/kosong di $ENV_FILE"; exit 1; }

# 2) Jalankan script build via pnpm run build
RUN rm -f .env .env.local .env.production .env.production.local \
 && cp "$ENV_FILE" .env \
 && pnpm run build \
 && VAL="$(sed -n 's/^VITE_API_ENDPOINT=//p' .env | tr -d '\r"' | head -n1)" \
 && test -n "$VAL" \
 && grep -rqF "$VAL" dist \
 || { echo "ERROR: VITE_API_ENDPOINT tidak masuk ke bundle"; exit 1; }

RUN rm -f .env

# ---------- Runtime ----------
FROM nginx:alpine-slim AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location /assets/ { \
        root /usr/share/nginx/html; \
        try_files $uri =404; \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
        add_header Cache-Control "no-cache"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
