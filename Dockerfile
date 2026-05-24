# Stage 1: Build
FROM node:20-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev vips-dev git
WORKDIR /opt/app

# Copy files
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Build project agar file .ts di config menjadi .js di dist/
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app

# Copy hasil build dan files yang diperlukan
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=7860
EXPOSE 7860
CMD ["npm", "run", "start"]
