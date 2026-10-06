# syntax=docker/dockerfile:1.7

# ---------- Build ----------
FROM node:22-alpine AS builder
ENV PNPM_HOME="/pnpm" PATH="/pnpm:$PATH" COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# KUNCI PERBAIKAN: Kunci pnpm ke versi 8 agar sesuai dengan lockfileVersion 6.0
RUN corepack enable && corepack prepare pnpm@8 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

# Dikirim dari CI: --build-arg ENV_FILE=".env.build"
ARG ENV_FILE=.env.build
RUN test -s "$ENV_FILE" || { echo "ERROR: $ENV_FILE kosong/tidak ada"; exit 1; } \
 && cp "$ENV_FILE" .env \
 && pnpm build \
 && rm -f .env

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
