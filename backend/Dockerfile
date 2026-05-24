# Stage 1: Build
FROM node:20-alpine AS build

# Install build dependencies
RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev vips-dev git

WORKDIR /opt/app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy application source
COPY . .

# Build Strapi admin
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache vips-dev

WORKDIR /opt/app

# Copy from build stage
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/src ./src

# Expose port (HF standard)
EXPOSE 7860

# Set environment
ENV NODE_ENV=production
ENV PORT=7860

# Start command
CMD ["npm", "start"]
