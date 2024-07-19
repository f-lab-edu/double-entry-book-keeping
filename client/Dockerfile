FROM node:alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
# package-lock.json 기반으로 의존성을 설치

COPY . .

CMD [ "npm", "run", "start" ]