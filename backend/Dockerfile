FROM node:22-alpine

WORKDIR /app

# Copy package.json dulu
COPY package*.json ./

# Jalankan install (Pastikan ini tidak CACHED nanti)
RUN npm install

# Baru copy sisa file
COPY . .

RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]