ARG NODE_VERSION=20

###################
# BUILD
###################
FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

ENV VUE_APP_NODE_ENV=production

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

###################
# PRODUCTION
###################
FROM nginxinc/nginx-unprivileged:alpine3.18

RUN rm -rf /etc/nginx/html/*
 
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
