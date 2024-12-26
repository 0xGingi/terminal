FROM oven/bun:1 as dependencies
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN bun run build

FROM lipanski/docker-static-website:latest
COPY --from=builder /app/dist .
COPY httpd.conf .
EXPOSE 3054
CMD ["/busybox-httpd", "-f", "-v", "-p", "3054", "-c", "httpd.conf"]