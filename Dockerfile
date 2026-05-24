# Stage 1: Build
FROM node:20-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev vips-dev git
WORKDIR /opt/app

# Copy dari folder backend (karena Dockerfile di root)
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copy sisa file dari folder backend
COPY backend/ .

RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/app

# Copy dari build stage
COPY --from=build /opt/app ./

EXPOSE 7860
ENV NODE_ENV=production
ENV PORT=7860
CMD ["npm", "start"]
