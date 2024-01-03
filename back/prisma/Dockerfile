ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Add prisma client as a dependency
COPY prisma prisma

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    mv prisma/package.json ./ && \
    mv prisma/pnpm-lock.yaml ./ && \
    pnpm install --frozen-lockfile

CMD [ "/bin/sh", "-c", "DATABASE_URL=postgres://$PG_USER:$PG_PASSWORD@$PG_HOST:$PG_PORT/$PG_DATABASE pnpm migrate" ]
