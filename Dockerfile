FROM node:20-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev vips-dev git
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=7860
EXPOSE 7860
CMD ["npm", "run", "start"]
