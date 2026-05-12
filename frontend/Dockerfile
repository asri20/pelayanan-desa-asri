# Stage 1: Build aplikasi React
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve menggunakan Nginx agar ringan di Cloud [cite: 35]
FROM nginx:alpine
# Copy hasil build ke folder default Nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]