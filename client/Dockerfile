FROM node:alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
# package-lock.json 기반으로 의존성을 설치

COPY . .

FROM base AS development

CMD [ "npm", "run", "start"]

FROM base AS builder

RUN npm run build

FROM nginx:alpine AS production

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html

