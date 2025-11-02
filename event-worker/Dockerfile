FROM node:20

WORKDIR /app

# Copy package files and install all dependencies (dev + prod)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build   # generates dist/

EXPOSE 3001

# Always run compiled JS
CMD ["node", "dist/index.js"]
