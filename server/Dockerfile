FROM node:alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

COPY . .

FROM base AS development

CMD [ "npm", "run", "start:dev" ]

FROM base AS builder

RUN npm run build

FROM node:alpine AS production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

CMD [ "node", "dist/main.js" ]