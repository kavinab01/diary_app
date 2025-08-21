# Stage 1: Build the frontend
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Build the frontend
RUN npm run build

# Determine output folder: either "build" (CRA) or "dist" (Vite)
RUN if [ -d build ]; then echo "Using build/"; else mv dist build; fi

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
