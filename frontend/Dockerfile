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
# Ambil hasil build dari stage sebelumnya
COPY --from=build-stage /app/build ./build

# Pastikan Cloud Run tahu kita pakai port 8080
ENV PORT 8080
EXPOSE 8080

# Jalankan serve dengan path yang lebih jelas
CMD ["serve", "-s", "build", "-l", "8080"]