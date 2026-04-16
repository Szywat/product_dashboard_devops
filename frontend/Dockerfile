FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS production
WORKDIR /app
RUN addgroup -S app && adduser -S app -G app

RUN rm /etc/nginx/conf.d/default.conf

COPY --chown=app:app default.conf /etc/nginx/conf.d/
COPY --chown=app:app cache.conf /etc/nginx/conf.d/

COPY --from=builder --chown=app:app /app/out /usr/share/nginx/html

RUN chown -R app:app /var/cache/nginx \
    && chown -R app:app /var/log/nginx \
    && chown -R app:app /etc/nginx/conf.d \
    && touch /var/run/nginx.pid \
    && chown -R app:app /var/run/nginx.pid

USER app
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/  || exit 1
CMD ["nginx", "-g", "daemon off;"]
