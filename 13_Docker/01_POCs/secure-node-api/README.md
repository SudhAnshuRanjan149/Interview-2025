# Secure Node.js API (Express) – Dockerized for Production

A basic, production-ready Express.js API, containerized with Docker and configured with recommended security practices (non-root user, security headers, rate limiting, health checks, and environment-based configuration).

## Features

- Express.js REST API with `/api/hello` endpoint.  
- Security hardening:
  - `helmet` for secure HTTP headers.  
  - `cors` with restricted origins.  
  - Rate limiting on `/api` routes.  
  - Limited JSON body size.  
  - Disabled `x-powered-by` header.  
- Centralized error handling and `/health` endpoint.  
- Production-grade Dockerfile:
  - Multi-stage build.  
  - `node:20-alpine` minimal runtime image.  
  - Non-root user.  
  - Docker `HEALTHCHECK` and env vars.  
- Designed to run behind a reverse proxy (Nginx/Traefik) over HTTPS.

## Prerequisites

- Node.js (for local development).  
- Docker installed locally and on the production server.  
- Docker registry account (e.g., Docker Hub).  
- Optional: Nginx/Traefik on the production server for HTTPS termination.

## 1. Project Setup

### Create project

```bash
mkdir secure-node-api
cd secure-node-api
npm init -y
```

### Install dependencies

```bash
npm install express helmet express-rate-limit cors morgan dotenv
```

### Environment variables

Create `.env` (local/dev only; do not commit real secrets):

```env
PORT=3000
NODE_ENV=development
```

## 2. Express API Code

Create `src/index.js`:

```javascript
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Security middleware
app.use(helmet()); // Security headers
app.disable('x-powered-by');

// CORS (restrict to your real domain in prod)
app.use(
  cors({
    origin: ['https://your-prod-domain.com'], // adjust as needed
    methods: ['GET', 'POST'],
  })
);

// JSON body parsing with limit to prevent large body DoS
app.use(express.json({ limit: '10kb' }));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Healthcheck endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Sample API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from secure API' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler (no stack traces in responses)
app.use((err, req, res, next) => {
  console.error(err); // In prod, send this to a logging system
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Run locally

```bash
node src/index.js
curl http://localhost:3000/api/hello
```

## 3. Dockerization (Production-Ready)

### Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# ---------- Runtime stage ----------
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Copy only required files from builder, set ownership
COPY --chown=nodejs:nodejs --from=builder /app ./

# Use non-root user
USER nodejs

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

# Start the app
CMD ["node", "src/index.js"]
```

### .dockerignore

Create `.dockerignore`:

```text
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
.env
logs
```

### Build and test locally

```bash
docker build -t secure-node-api:latest .
docker run --rm -p 3000:3000 secure-node-api:latest
curl http://localhost:3000/api/hello
```

## 4. Push to Docker Registry

```bash
docker login

docker tag secure-node-api:latest <your-registry-username>/secure-node-api:latest

docker push <your-registry-username>/secure-node-api:latest
```

Replace `<your-registry-username>` with your actual registry username.

## 5. Production Deployment (Single Server)

### Pull and run on the server

On the production server:

```bash
docker pull <your-registry-username>/secure-node-api:latest

docker run -d \
  --name secure-node-api \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \  # bind to localhost only (use reverse proxy) 
  -e NODE_ENV=production \
  -e PORT=3000 \
  --memory=256m --cpus=0.5 \  # basic resource limits
  --read-only \               # filesystem read-only where possible
  --tmpfs /tmp \
  <your-registry-username>/secure-node-api:latest
```

Key security options:

- `-p 127.0.0.1:3000:3000`: only accessible via localhost; use a reverse proxy for external traffic.  
- `--restart unless-stopped`: automatic restart on failure/reboot.  
- `--memory` / `--cpus`: prevent resource exhaustion.  
- `--read-only` and `--tmpfs /tmp`: restrict write access.

### Reverse proxy (high-level)

Use Nginx or Traefik to:

- Terminate HTTPS with a valid TLS certificate (e.g., Let's Encrypt).  
- Proxy `https://api.your-domain.com` → `http://127.0.0.1:3000`.  
- Optionally configure:
  - Request body size limits.  
  - Timeouts.  
  - Basic IP allow/deny.

## 6. Security Checklist

- `helmet()` for HTTP security headers.  
- `cors` restricted to trusted origins.  
- Rate limiting on `/api`.  
- Body size limit on `express.json`.  
- Disabled `x-powered-by`.  
- Non-root user in container.  
- Minimal `alpine` runtime image.  
- Healthcheck endpoint and Docker `HEALTHCHECK`.  
- `NODE_ENV=production` in production.  
- Runs behind HTTPS reverse proxy.  
- Resource limits on the container.

For real-world apps, also:

- Add authentication/authorization (JWT, OAuth2, or sessions).  
- Add input validation/sanitization on all endpoints.  
- Integrate central logging and monitoring.  
- Regularly update dependencies and base images.  
- Run vulnerability scans on code and images.

## 7. Project Structure

```text
secure-node-api/
├── src/
│   └── index.js
├── .env              # local/dev only
├── .dockerignore
├── Dockerfile
├── package.json
└── package-lock.json
```

## 8. Useful Commands

```bash
# Install dependencies
npm install

# Run locally
node src/index.js

# Build Docker image
docker build -t secure-node-api:latest .

# Run Docker container (local)
docker run --rm -p 3000:3000 secure-node-api:latest

# View running containers
docker ps

# View logs
docker logs secure-node-api

# Stop container
docker stop secure-node-api

# Remove container
docker rm secure-node-api
```

## 9. Additional Production Considerations

### Logging

In production, send logs to a centralized logging service:

- Use `morgan` with a custom stream to forward to services like ELK, Loki, or CloudWatch.
- Configure Docker logging drivers to send container logs externally.

### Monitoring

- Monitor the `/health` endpoint with uptime monitoring tools (UptimeRobot, Pingdom, etc.).
- Set up application performance monitoring (APM) with tools like New Relic, Datadog, or open-source alternatives.
- Track metrics: request latency, error rates, memory usage, CPU usage.

### Secrets Management

- Never hardcode secrets in code or commit `.env` to version control.
- Use environment variables injected at runtime.
- For production, consider secret management tools like:
  - Docker Secrets (with Docker Swarm)
  - Kubernetes Secrets
  - HashiCorp Vault
  - Cloud provider secret managers (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)

### Updates and Maintenance

- Regularly update Node.js base image and npm dependencies.
- Run `npm audit` and fix vulnerabilities.
- Scan Docker images with tools like Trivy, Snyk, or Docker Scout.
- Implement a CI/CD pipeline to automate builds, tests, and deployments.

### Backup and Recovery

- Implement backup strategies for any persistent data.
- Document disaster recovery procedures.
- Test your deployment process regularly.

## 10. Troubleshooting

### Container won't start

Check logs:
```bash
docker logs secure-node-api
```

### Port already in use

Change the host port mapping:
```bash
docker run -d -p 127.0.0.1:8080:3000 secure-node-api:latest
```

### Permission denied errors

Ensure the non-root user has proper permissions in the Dockerfile.

### Health check failing

Test the health endpoint manually:
```bash
docker exec secure-node-api wget -qO- http://127.0.0.1:3000/health
```

## License

MIT

## Author

Sudhanshu Ranjan
