# ============================================================
# Dockerfile for React Application (Standard Production Build)
# ============================================================
# Multi-stage build: separates build environment from runtime environment
# Results in smaller final image (only contains built assets + Nginx)

# ============================================================
# STAGE 1: Build Stage (Compile React Application)
# ============================================================
# Use Node.js 20 on Alpine Linux for building the React app
# Alpine is chosen for smaller image size during build
# This stage will be discarded in the final image
FROM node:20-alpine AS build

# Set working directory for build process
# All subsequent commands in this stage run here
WORKDIR /app

# Copy package files for dependency installation
# Copying package files first allows Docker to cache the npm install layer
# If package.json doesn't change, Docker reuses cached node_modules
COPY package*.json ./

# Install ALL dependencies (including devDependencies)
# React build process needs devDependencies (webpack, babel, etc.)
# npm install: installs both dependencies and devDependencies
RUN npm install

# Accept build arguments
# ARG: variables available only during build time (not in running container)
# These must be passed via docker build --build-arg or docker-compose args
ARG REACT_APP_API_URL
ARG REACT_APP_ENV

# Set environment variables from build arguments
# ENV: makes variables available during build AND runtime
# React apps embed environment variables during build (not runtime)
# Variables must start with REACT_APP_ to be accessible in React code
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV

# Copy all application source code
# Done after npm install to leverage Docker layer caching
# Changes to source code don't invalidate npm install cache
COPY . .

# Build the React application for production
# npm run build: runs react-scripts build
# Creates optimized, minified static files in the build/ directory
# Output: HTML, CSS, JS bundles ready for deployment
RUN npm run build

# ============================================================
# STAGE 2: Production Stage (Serve with Nginx)
# ============================================================
# Use official Nginx Alpine image for serving static files
# nginx:alpine is ~24MB (vs ~133MB for standard nginx)
# This is the final stage - only this layer ends up in the image
FROM nginx:alpine

# Copy custom Nginx configuration
# Replaces default Nginx config with our optimized version
# Location: /etc/nginx/conf.d/default.conf is where Nginx looks for site configs
# Our config includes: SPA routing, caching, security headers, gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from build stage
# --from=build: copies from the 'build' stage defined above
# /app/build: location where 'npm run build' outputs files in build stage
# /usr/share/nginx/html: default Nginx web root directory
# Only the compiled static files are copied (not source code, node_modules, etc.)
COPY --from=build /app/build /usr/share/nginx/html

# Document that Nginx listens on port 80
# This is the default HTTP port
# Informational only - actual port mapping done in docker-compose.yml
EXPOSE 80

# Health Check Configuration
# Allows Docker/orchestrators to monitor if Nginx is responding
# --interval=30s: check every 30 seconds
# --timeout=3s: wait max 3 seconds for response
# wget: lightweight HTTP client included in Alpine
# --quiet: no output, --tries=1: single attempt, --spider: don't download content
# || exit 1: return failure code if wget fails
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Start Nginx web server
# nginx: the web server executable
# -g "daemon off;": run in foreground (required for Docker)
#   Docker needs the main process to run in foreground, not as daemon
CMD ["nginx", "-g", "daemon off;"]
