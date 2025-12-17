# ========== Build Stage ==========
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install ALL dependencies (needed for build)
COPY package*.json ./
RUN npm install

# Run security audit (warn on vulnerabilities but don't fail build)
RUN npm audit --audit-level=moderate || true

ARG REACT_APP_API_URL
ARG REACT_APP_ENV
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV

# Copy source code and build
COPY . .
RUN npm run build

# ========== Production Stage ==========
FROM nginx:1.25.3-alpine

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nginxuser && \
    adduser -S nginxuser -u 1001 -G nginxuser && \
    chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    mkdir -p /var/run && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid && \
    # Allow nginxuser to bind to port 8080
    chmod -R 755 /var/cache/nginx /var/log/nginx /var/run

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from build stage
COPY --from=build --chown=nginxuser:nginxuser /app/build /usr/share/nginx/html

# Switch to non-root user
USER nginxuser

# Expose port 8080 (non-privileged port)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
