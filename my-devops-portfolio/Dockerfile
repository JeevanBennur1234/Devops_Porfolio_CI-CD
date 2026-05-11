# ============================================================
# Stage 1: Build the React application
# ============================================================
# Using a specific Node.js LTS version for reproducible builds
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package files first (leverages Docker layer caching)
# If package.json hasn't changed, npm ci won't re-run
COPY package.json package-lock.json ./

# Install dependencies using npm ci for deterministic builds
# npm ci is preferred over npm install in CI/CD pipelines
RUN npm ci --silent

# Copy the rest of the application source code
COPY . .

# Build the production-optimized static files
# Vite outputs to the /app/dist directory
RUN npm run build

# ============================================================
# Stage 2: Serve with Nginx (production-ready web server)
# ============================================================
# Using a lightweight Alpine-based Nginx image (~23MB)
FROM nginx:1.27-alpine AS production

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from Stage 1 into Nginx's serve directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Health check to verify the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Start Nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
