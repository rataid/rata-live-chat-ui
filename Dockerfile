# syntax=docker/dockerfile:1.7

# ---------- Build ----------
FROM node:22-alpine AS builder
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH" COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Kunci pnpm ke versi 8 agar sesuai dengan lockfileVersion 6.0
RUN corepack enable && corepack prepare pnpm@8 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

# Dikirim dari CI: --build-arg ENV_FILE=".env.build"
ARG ENV_FILE=.env.build

# 1) File env harus ada dan berisi VITE_API_ENDPOINT yang tidak kosong
RUN test -s "$ENV_FILE" || { echo "ERROR: $ENV_FILE kosong/tidak ada"; exit 1; } \
 && grep -q '^VITE_API_ENDPOINT=.\+' "$ENV_FILE" \
 || { echo "ERROR: VITE_API_ENDPOINT tidak ada/kosong di $ENV_FILE"; exit 1; }

# 2) Buang file env lain yang bisa menimpa (Vite: .env.production > .env), lalu build
# 3) Verifikasi nilai endpoint benar-benar masuk ke bundle
RUN rm -f .env .env.local .env.production .env.production.local \
 && cp "$ENV_FILE" .env \
 && pnpm build \
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
