# ---------- Build Stage ----------
FROM node:20 AS build
WORKDIR /app

# Optional: install build tools (for Alpine or native modules)
# RUN apk add --no-cache python3 make g++   # Only for alpine images

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (add --legacy-peer-deps if needed)
RUN npm install

# Copy the rest of the frontend source
COPY . .

# Build the production assets
RUN npm run build

# ---------- Production Stage (Nginx) ----------
FROM nginx:stable-alpine
# Remove default nginx index
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
