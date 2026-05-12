# Build stage
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build-stage /app/build ./build

# Cloud Run menggunakan port 8080 secara default
EXPOSE 8080

# Jalankan serve pada port 8080
CMD ["serve", "-s", "build", "-l", "8080"]