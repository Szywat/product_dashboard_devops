FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS production
WORKDIR /app

RUN addgroup -S app && adduser -S app -G app

COPY --from=deps --chown=app:app /app/node_modules ./node_modules

COPY --chown=app:app . .

USER app
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8000/health || exit 1
CMD ["node", "./src/index.js"]
