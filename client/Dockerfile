FROM node:alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci
# package-lock.json 기반으로 의존성을 설치

COPY . .

FROM base AS development

# 도커 컴포즈에서는 메인 프로세스 실행 전에 디펜던시 체크를 수행
# 쿠버네티스에서는 initContainer에서 디펜던시 체크 수행 필요
CMD if [ "$SKIP_DEPENDENCY_CHECK" = "true" ]; then echo "Skipping dependency check"; else while ! wget --spider -q http://server:3000/healthz; do sleep 1; done; fi && npm run start

FROM base AS builder

ARG REACT_APP_API_BASE_URL

RUN npm run build

FROM nginx:alpine AS production

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html

