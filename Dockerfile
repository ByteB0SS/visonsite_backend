FROM node:22-slim
LABEL maintainer="rubemerensto2@gmail.com"
WORKDIR /api
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json ./api/
COPY . .
RUN pnpm install 
CMD [ "pnpm", "start" ]
EXPOSE 8080