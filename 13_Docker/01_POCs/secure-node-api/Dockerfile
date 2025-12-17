# ============================================================
# Dockerfile for Secure Node.js API (Production-Ready)
# ============================================================
# Multi-stage build for optimized, secure production deployment
# Implements security best practices: non-root user, minimal image, clean install

# ============================================================
# STAGE 1: Build Stage (Dependencies Installation)
# ============================================================
# Use Alpine Linux for smaller image size (~40MB vs ~900MB for standard Node)
# Alpine is a minimal Linux distribution designed for security and resource efficiency
FROM node:20-alpine AS builder

# Set working directory for build stage
WORKDIR /app

# Copy package files for dependency installation
# Copying only package files first enables Docker layer caching
# If dependencies don't change, this layer is reused, speeding up builds
COPY package*.json ./

# Install production dependencies only
# npm ci: "clean install" - faster, more reliable than npm install
# --omit=dev: excludes devDependencies (testing tools, etc.) to reduce image size
# This creates a clean node_modules with only production dependencies
RUN npm ci --omit=dev

# Copy application source code
# Done after npm install to maximize cache efficiency
# If only code changes, npm ci layer is reused
COPY . .

# ============================================================
# STAGE 2: Runtime Stage (Final Production Image)
# ============================================================
# Start fresh from Alpine base to exclude build tools and cache
# This stage only contains what's needed to run the app
FROM node:20-alpine

# Set working directory for runtime
WORKDIR /app

# Create a non-root user for security
# Running as root is a security risk - if container is compromised, attacker has root access
# addgroup: creates a system group named 'nodejs' with GID 1001
# adduser: creates a system user named 'nodejs' with UID 1001 in the 'nodejs' group
# -S flag: creates a system user (no password, no home directory creation)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy application and dependencies from build stage
# --chown=nodejs:nodejs: sets file ownership to non-root user
# --from=builder: copies from the 'builder' stage instead of host
# This ensures only necessary files are in the final image
COPY --chown=nodejs:nodejs --from=builder /app ./

# Switch to non-root user
# All subsequent commands and the application will run as 'nodejs' user
# This follows the principle of least privilege
USER nodejs

# Set environment variables
# NODE_ENV=production: enables production optimizations in Node.js and libraries
#   - Disables verbose error messages
#   - Enables caching
#   - Reduces logging overhead
ENV NODE_ENV=production

# PORT: default port the application listens on (can be overridden)
ENV PORT=3000

# Document the port the application uses
# Informational only - actual port mapping is done in docker-compose.yml or docker run
EXPOSE 3000

# Health Check Configuration
# Allows Docker/orchestrators to monitor container health automatically
# --interval=30s: Check every 30 seconds
# --timeout=5s: Wait max 5 seconds for response
# --start-period=10s: Grace period before starting health checks (app startup time)
# --retries=3: Mark unhealthy after 3 consecutive failures
# wget -qO-: quiet output to stdout, perfect for health checks
# || exit 1: return non-zero exit code if wget fails (indicates unhealthy)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

# Start the application
# CMD: defines the default command to run when container starts
# Can be overridden at runtime with docker run or docker-compose command
# Runs the Node.js application entry point
CMD ["node", "src/index.js"]
