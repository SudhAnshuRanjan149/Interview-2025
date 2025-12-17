# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install only needed deps first for better caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source
COPY . .

# ---------- Runtime stage ----------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy only what we need from builder
COPY --chown=nodejs:nodejs --from=builder /app ./

USER nodejs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Healthcheck for orchestrator / monitoring
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "src/index.js"]
