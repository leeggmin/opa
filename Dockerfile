FROM node:24-alpine AS builder
WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node app/server.mjs ./server.mjs
COPY --from=builder --chown=node:node /frontend/dist ./public
ENV STATIC_DIR=/app/public
USER node
EXPOSE 8080
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 CMD ["node", "-e", "fetch('http://127.0.0.1:8080/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["node", "server.mjs"]