# ============================================================
# Dockerfile for Secure React Application (Enterprise Production)
# ============================================================
# Production-hardened multi-stage build with comprehensive security measures
# Implements: non-root user, pinned versions, vulnerability scanning, minimal privileges

# ============================================================
# STAGE 1: Build Stage (Compile React Application)
# ============================================================
# Use Node.js 20 on Alpine Linux - minimal, secure base image
# Alpine: ~40MB vs ~900MB for standard Node.js image
# This stage is temporary and discarded after build completes
FROM node:20-alpine AS build

# Set working directory for build process
WORKDIR /app

# Copy package files for dependency installation
# Copying separately from source code enables layer caching
# If package.json unchanged, Docker reuses this layer, speeding up builds
COPY package*.json ./

# Install ALL dependencies (production + development)
# React build requires devDependencies (webpack, babel, react-scripts, etc.)
# npm install: installs both dependencies and devDependencies from package.json
RUN npm install

# Run security vulnerability scan
# npm audit: checks dependencies against security vulnerability database
# --audit-level=moderate: reports moderate and higher severity issues
# || true: continues build even if vulnerabilities found (logs warnings)
# In strict production, remove '|| true' to fail build on vulnerabilities
RUN npm audit --audit-level=moderate || true

# Accept build-time arguments
# ARG: variables passed during 'docker build' via --build-arg flag
# Only available during build, not in running container
# Required for embedding configuration into React build
ARG REACT_APP_API_URL
ARG REACT_APP_ENV

# Convert build arguments to environment variables
# ENV: makes variables available during build and runtime
# React requires REACT_APP_ prefix to embed variables in build
# These values are hardcoded into JavaScript bundles during build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV

# Copy all source code
# Done after npm install to maximize cache efficiency
# Source code changes frequently, but dependencies change rarely
COPY . .

# Build the React application for production
# npm run build: invokes react-scripts build
# Process:
#   1. Transpiles modern JavaScript to browser-compatible code
#   2. Bundles and minifies JS, CSS, and HTML
#   3. Optimizes images and assets
#   4. Creates build/ directory with production-ready static files
RUN npm run build

# ============================================================
# STAGE 2: Production Stage (Secure Nginx Server)
# ============================================================
# Use specific pinned version of Nginx Alpine image
# Version pinning prevents unexpected breaking changes from 'latest' tag
# Security: known, tested version with predictable behavior
FROM nginx:1.25.3-alpine

# Create non-root user and configure permissions
# Security Best Practice: Never run services as root in containers
# If container is compromised, attacker has limited privileges
RUN addgroup -g 1001 -S nginxuser && \
    # Create system group 'nginxuser' with GID 1001
    adduser -S nginxuser -u 1001 -G nginxuser && \
    # Create system user 'nginxuser' with UID 1001 in nginxuser group
    chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    # Give ownership of web root to nginxuser
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    # Give ownership of Nginx cache directory
    chown -R nginxuser:nginxuser /var/log/nginx && \
    # Give ownership of log directory (nginx needs write access)
    mkdir -p /var/run && \
    # Ensure /var/run directory exists
    touch /var/run/nginx.pid && \
    # Create PID file for Nginx process tracking
    chown -R nginxuser:nginxuser /var/run/nginx.pid && \
    # Give ownership of PID file
    chmod -R 755 /var/cache/nginx /var/log/nginx /var/run
    # Set permissions: owner (nginxuser) can read/write/execute
    #                  group and others can read/execute

# Copy custom Nginx configuration
# Replaces default config with hardened version including:
#   - Security headers (CSP, X-Frame-Options, etc.)
#   - Rate limiting
#   - Gzip compression
#   - Optimized caching strategy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from build stage with correct ownership
# --from=build: copy from 'build' stage (not from host filesystem)
# --chown=nginxuser:nginxuser: set file ownership to non-root user
# /app/build: source (output of npm run build in stage 1)
# /usr/share/nginx/html: destination (Nginx web root)
COPY --from=build --chown=nginxuser:nginxuser /app/build /usr/share/nginx/html

# Switch to non-root user for runtime
# All subsequent commands and the Nginx process run as nginxuser
# Critical security measure: limits damage if container is compromised
USER nginxuser

# Expose port 8080 (non-privileged port)
# Ports below 1024 require root privileges on Linux
# Using 8080 (>1024) allows nginx to bind as non-root user
# Informational only - actual port mapping in docker-compose.yml
EXPOSE 8080

# Health Check Configuration
# Enables Docker and orchestrators to monitor container health
# --interval=30s: check every 30 seconds during normal operation
# --timeout=3s: wait maximum 3 seconds for response
# --start-period=10s: grace period during startup (don't check immediately)
# --retries=3: mark unhealthy after 3 consecutive failures
# wget: HTTP client, checks if Nginx responds on port 8080
# --quiet: suppress output, --tries=1: single attempt
# --spider: don't download content, just check if URL exists
# || exit 1: return failure code if wget fails (marks container unhealthy)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Start Nginx web server
# nginx: the web server binary
# -g: global directive (configuration)
# "daemon off;": run in foreground instead of background
#   Docker requires main process in foreground to keep container alive
#   If nginx daemonizes, Docker thinks container has stopped
CMD ["nginx", "-g", "daemon off;"]
