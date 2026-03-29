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

RUN rm /etc/nginx/conf.d/default.conf

COPY default.conf /etc/nginx/conf.d/
COPY cache.conf /etc/nginx/conf.d/

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/  || exit 1

CMD ["nginx", "-g", "daemon off;"]
