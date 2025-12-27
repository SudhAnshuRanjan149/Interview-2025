# Secure React App – Production-Ready Frontend with Podman

A comprehensive guide to **create, secure, containerize, and deploy** a React.js frontend using **Podman** and **Nginx**, following production security best practices for 2025.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Development](#development)
- [Containerization](#containerization)
- [Deployment](#deployment)
- [Commands Reference](#commands-reference)
- [Troubleshooting](#troubleshooting)

---

## Overview

This is a production-ready React application demonstrating security best practices:

- **Framework**: React 19.2.3
- **Runtime**: Node.js 20 (build), Nginx Alpine (production)
- **Container Engine**: Podman (rootless, daemonless)
- **Security**: XSS protection, CSP headers, non-root containers
- **Architecture**: Multi-stage builds, minimal image size

### Key Features

✅ **XSS Protection** with DOMPurify sanitization  
✅ **Security Headers** (CSP, X-Frame-Options, X-Content-Type-Options)  
✅ **Non-root Container** (runs as nginx user, UID 101)  
✅ **Multi-stage Build** (separate build and runtime stages)  
✅ **Health Checks** (HTTP endpoint monitoring)  
✅ **SPA Routing** (React Router compatible)  
✅ **Gzip Compression** (optimized asset delivery)  
✅ **Dependency Auditing** (npm audit integration)

---

## Prerequisites

- **Node.js**: v18+ (v20 recommended)
- **Podman**: Latest version (rootless mode preferred)
- **npm**: v9+ (comes with Node.js)
- **Registry Account**: Docker Hub or any OCI-compatible registry (for deployment)
- **Basic Knowledge**: React, containers, terminal commands

### Installing Podman

**macOS:**
```bash
brew install podman
podman machine init
podman machine start
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y podman
```

**Verify Installation:**
```bash
podman --version
```

---

## Quick Start

### 1. Clone or Navigate to Project

```bash
cd /path/to/secure-react-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm start
```

Open http://localhost:3000 in your browser.

### 4. Build for Production

```bash
npm run build
```

### 5. Build Container Image

```bash
podman build -t secure-react-app:latest .
```

### 6. Run Container Locally

```bash
podman run -d -p 8080:8080 --name react-app secure-react-app:latest
```

Open http://localhost:8080 in your browser.

---

## Project Structure

```
secure-react-app/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/                     # React source code
│   ├── App.css              # Application styles
│   ├── App.js               # Main component with XSS protection demo
│   ├── App.test.js          # Unit tests
│   ├── index.css            # Global styles
│   ├── index.js             # Application entry point
│   ├── logo.svg             # React logo
│   ├── reportWebVitals.js   # Performance monitoring
│   └── setupTests.js        # Test configuration
├── .containerignore         # Files to exclude from container build
├── .env.production          # Production environment variables
├── .gitignore               # Git ignore patterns
├── Containerfile            # Multi-stage container definition
├── nginx.conf               # Production Nginx configuration
├── package.json             # Dependencies and scripts
├── package-lock.json        # Dependency lock file
└── README.md                # This file
```

## Security Features

### Frontend Security

#### 1. XSS Protection with DOMPurify

The application uses **DOMPurify** to sanitize user input before rendering:

```javascript
// src/App.js
import DOMPurify from 'dompurify';

const handleSubmit = (e) => {
  e.preventDefault();
  const clean = DOMPurify.sanitize(userInput);
  setSanitizedOutput(clean);
};
```

**Why it matters**: Prevents malicious scripts from being injected and executed in the browser.

#### 2. Secure Dependencies

```bash
# Installed security packages
npm install dompurify sanitize-html validator
npm install --save-dev @types/dompurify
```

- **dompurify**: XSS sanitizer for HTML, MathML and SVG
- **sanitize-html**: HTML sanitizer with allowlist
- **validator**: String validation and sanitization library

#### 3. Source Map Protection

Production builds disable source maps to prevent exposing source code:

```bash
# In package.json
"build": "GENERATE_SOURCEMAP=false react-scripts build"
```

#### 4. Environment Variables

Environment configuration in `.env.production`:

```bash
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false
```

**Note**: Only variables prefixed with `REACT_APP_` are exposed to the React app.

### Container Security

#### 1. Multi-Stage Build

**Benefits:**
- Separates build dependencies from runtime
- Reduces final image size (~900MB build → ~50MB production)
- Minimizes attack surface

```dockerfile
# Build stage: Node.js 20 Alpine
FROM node:20-alpine AS build
# ... build process

# Production stage: Nginx Alpine
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
```

#### 2. Non-Root User

Container runs as unprivileged `nginx` user (UID 101):

```dockerfile
USER nginx
EXPOSE 8080  # Unprivileged port (>1024)
```

**Why it matters**: Even if container is compromised, attacker cannot gain root access.

#### 3. Minimal Base Image

Uses `nginx:alpine` (~40MB) instead of full distributions (~900MB):
- Smaller attack surface
- Faster deployments
- Lower storage costs

### Nginx Security Headers

The `nginx.conf` implements multiple security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-XSS-Protection` | `1; mode=block` | Enables browser XSS filtering |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Restricts browser features |
| `Content-Security-Policy` | (see below) | Prevents XSS and injection attacks |

#### Content Security Policy (CSP)

```nginx
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: https:; 
  connect-src 'self' https://api.yourdomain.com; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self';
```

### Performance & Optimization

#### 1. Gzip Compression

```nginx
gzip on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript ...;
```

**Result**: 60-80% reduction in transfer size for text-based assets.

#### 2. Asset Caching Strategy

```nginx
# Static assets: 1 year cache
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# index.html: No cache (always fresh)
location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

#### 3. SPA Routing Support

```nginx
# Redirect all routes to index.html for React Router
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Development

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

- Opens automatically at http://localhost:3000
- Hot-reload enabled for rapid development
- Shows errors and warnings in console

### Run Tests

```bash
npm test
```

Launches test runner in interactive watch mode.

### Build for Production

```bash
npm run build
```

Creates optimized production bundle in `build/` directory:
- Minified JavaScript and CSS
- Source maps disabled
- Assets hashed for cache busting
- Gzip-ready compression

### Run Security Audit

```bash
npm run audit
```

Checks dependencies for known vulnerabilities (moderate level and above).

### Lint and Format

```bash
# Check code quality
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

---

## Containerization

### Understanding the Containerfile

The `Containerfile` (compatible with `Dockerfile`) uses a **two-stage build**:

#### Stage 1: Build (Node.js)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
ENV GENERATE_SOURCEMAP=false
ENV NODE_ENV=production
RUN npm run build
```

**Purpose**: Compiles React app into static files.

#### Stage 2: Production (Nginx)

```dockerfile
FROM nginx:alpine
RUN apk add --no-cache wget
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
# ... non-root user setup
USER nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Purpose**: Serves static files with Nginx on unprivileged port.

### Build Container Image

```bash
# Build with Podman
podman build -t secure-react-app:latest .

# Or specify Containerfile explicitly
podman build -f Containerfile -t secure-react-app:latest .

# Build with specific tag
podman build -t secure-react-app:1.0.0 .
```

### List Images

```bash
podman images
```

Expected output:
```
REPOSITORY              TAG         IMAGE ID      CREATED         SIZE
secure-react-app        latest      abc123def456  2 minutes ago   45MB
```

### Run Container Locally

```bash
# Run in detached mode
podman run -d \
  -p 8080:8080 \
  --name react-app \
  secure-react-app:latest

# Run with resource limits
podman run -d \
  -p 8080:8080 \
  --name react-app \
  --memory=256m \
  --cpus=0.5 \
  secure-react-app:latest

# Run with restart policy
podman run -d \
  -p 8080:8080 \
  --name react-app \
  --restart=always \
  secure-react-app:latest
```

### Verify Container is Running

```bash
# List running containers
podman ps

# Check container logs
podman logs react-app

# Follow logs in real-time
podman logs -f react-app

# Check container resource usage
podman stats react-app
```

### Test Security Headers

```bash
# Check HTTP headers
curl -I http://localhost:8080

# Detailed header inspection
curl -v http://localhost:8080 2>&1 | grep -i "^< "
```

Expected headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
```

### Health Check

The container includes automatic health monitoring:

```bash
# Check health status
podman inspect --format='{{.State.Health.Status}}' react-app

# View health check logs
podman inspect react-app | grep -A 10 "Health"
```

Health check configuration:
- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Start Period**: 5 seconds
- **Retries**: 3 attempts

### Stop and Remove Container

```bash
# Stop container gracefully
podman stop react-app

# Remove stopped container
podman rm react-app

# Force stop and remove in one command
podman rm -f react-app
```

### Clean Up Images

```bash
# Remove specific image
podman rmi secure-react-app:latest

# Remove unused images
podman image prune

# Remove all unused images
podman image prune -a
```

---

## Deployment

### Push to Container Registry

#### 1. Login to Docker Hub

```bash
podman login docker.io
```

Enter your Docker Hub username and password/token.

#### 2. Tag Image

```bash
# Tag for Docker Hub
podman tag secure-react-app:latest docker.io/<your-username>/secure-react-app:latest

# Tag with version
podman tag secure-react-app:latest docker.io/<your-username>/secure-react-app:1.0.0
```

#### 3. Push Image

```bash
# Push latest tag
podman push docker.io/<your-username>/secure-react-app:latest

# Push specific version
podman push docker.io/<your-username>/secure-react-app:1.0.0
```

#### 4. Verify on Docker Hub

Visit: `https://hub.docker.com/r/<your-username>/secure-react-app`

### Production Deployment Options

#### Option 1: Simple Server Deployment

On your production server with Podman installed:

```bash
# Pull the image
podman pull docker.io/<your-username>/secure-react-app:latest

# Run with production settings
podman run -d \
  --name secure-react-app \
  --restart always \
  -p 8080:8080 \
  --memory=256m \
  --cpus=0.5 \
  docker.io/<your-username>/secure-react-app:latest

# Verify container is running
podman ps
```

**Access**: `http://<server-ip>:8080`

#### Option 2: Behind Reverse Proxy (Recommended)

For HTTPS and additional security, use a reverse proxy:

**Nginx Reverse Proxy Configuration:**

```nginx
# /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Option 3: Systemd-Managed Service

For automatic startup and management:

**Step 1: Run container once**

```bash
podman run -d \
  --name secure-react-app \
  -p 8080:8080 \
  docker.io/<your-username>/secure-react-app:latest
```

**Step 2: Generate systemd unit file**

```bash
# For rootless (recommended)
podman generate systemd --new --files --name secure-react-app

# Move to user systemd directory
mkdir -p ~/.config/systemd/user
mv container-secure-react-app.service ~/.config/systemd/user/

# Enable and start
systemctl --user daemon-reload
systemctl --user enable container-secure-react-app.service
systemctl --user start container-secure-react-app.service

# Enable user services at boot (without login)
loginctl enable-linger $USER
```

**Step 3: Manage service**

```bash
# Check status
systemctl --user status container-secure-react-app.service

# View logs
journalctl --user -u container-secure-react-app.service -f

# Restart service
systemctl --user restart container-secure-react-app.service

# Stop service
systemctl --user stop container-secure-react-app.service
```

---

## Commands Reference

### Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build production bundle
npm run build

# Run tests
npm test

# Security audit
npm run audit

# Fix vulnerabilities
npm audit fix
```

### Podman Local Commands

```bash
# Build image
podman build -t secure-react-app:latest .

# Run container
podman run -d -p 8080:8080 --name react-app secure-react-app:latest

# List containers
podman ps
podman ps -a

# View logs
podman logs react-app
podman logs -f react-app

# Stop & remove container
podman stop react-app
podman rm react-app
podman rm -f react-app

# List images
podman images

# Remove image
podman rmi secure-react-app:latest

# Inspect container
podman inspect react-app
podman inspect --format='{{.State.Health.Status}}' react-app

# Container stats
podman stats react-app

# Execute command in container
podman exec -it react-app sh

# Test security headers
curl -I http://localhost:8080
```

### Registry Commands

```bash
# Login to Docker Hub
podman login docker.io

# Tag image
podman tag secure-react-app:latest docker.io/<username>/secure-react-app:latest

# Push image
podman push docker.io/<username>/secure-react-app:latest

# Pull image
podman pull docker.io/<username>/secure-react-app:latest

# Logout
podman logout docker.io
```

### Systemd Commands

```bash
# Generate systemd service
podman generate systemd --new --files --name secure-react-app

# Enable service (rootless)
systemctl --user enable container-secure-react-app.service

# Start service
systemctl --user start container-secure-react-app.service

# Check status
systemctl --user status container-secure-react-app.service

# View logs
journalctl --user -u container-secure-react-app.service -f

# Restart service
systemctl --user restart container-secure-react-app.service

# Stop service
systemctl --user stop container-secure-react-app.service

# Enable linger (start at boot)
loginctl enable-linger $USER
```

---

## Troubleshooting

### Container Won't Start

**Check logs:**
```bash
podman logs react-app
```

**Common issues:**
- Port already in use: Change host port `-p 8081:8080`
- Permission denied: Ensure rootless mode or use `sudo`
- Image not found: Verify image name with `podman images`

### Cannot Access Application

**Check container is running:**
```bash
podman ps
```

**Check port mapping:**
```bash
podman port react-app
```

**Test from host:**
```bash
curl http://localhost:8080
```

**Check firewall:**
```bash
# Allow port 8080
sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
```

### Health Check Failing

**View health status:**
```bash
podman inspect --format='{{json .State.Health}}' react-app | jq
```

**Check Nginx logs:**
```bash
podman logs react-app
```

**Test health endpoint:**
```bash
podman exec react-app wget --spider http://localhost:8080/
```

### Build Fails

**Clear cache and rebuild:**
```bash
podman build --no-cache -t secure-react-app:latest .
```

**Check disk space:**
```bash
df -h
podman system df
```

**Clean up unused resources:**
```bash
podman system prune -a --volumes -f
```

### Performance Issues

**Check resource usage:**
```bash
podman stats react-app
```

**Increase limits:**
```bash
podman update --memory=512m --cpus=1 react-app
```

**Check logs for errors:**
```bash
podman logs react-app | grep -i error
```

---

## Security Checklist

### ✅ Frontend Security

- [x] **XSS Protection**: DOMPurify sanitization implemented
- [x] **Dependency Audit**: Regular npm audit checks
- [x] **Source Maps**: Disabled in production (`GENERATE_SOURCEMAP=false`)
- [x] **Environment Variables**: Sensitive data not exposed in `REACT_APP_*`
- [x] **Input Validation**: Client-side validation with validator library
- [x] **Secure Dependencies**: Using maintained, audited packages

### ✅ Container Security

- [x] **Multi-Stage Build**: Separate build and runtime stages
- [x] **Non-Root User**: Container runs as nginx (UID 101)
- [x] **Minimal Image**: Alpine Linux base (~45MB final image)
- [x] **Unprivileged Port**: Port 8080 (>1024)
- [x] **Health Check**: Automated health monitoring
- [x] **Resource Limits**: Memory and CPU limits configured
- [x] **Read-Only Filesystem**: Can be enabled for extra security

### ✅ Nginx Security

- [x] **Security Headers**: X-Frame-Options, CSP, X-Content-Type-Options
- [x] **Server Tokens**: Disabled (hides version)
- [x] **Gzip Compression**: Enabled for performance
- [x] **Asset Caching**: Aggressive caching for static files
- [x] **SPA Routing**: React Router compatibility
- [x] **Hidden Files**: Access denied to dot files

### ✅ Infrastructure Security

- [ ] **HTTPS**: Deploy behind reverse proxy with TLS certificate
- [ ] **Firewall**: Configure host firewall rules
- [ ] **Monitoring**: Set up logging and alerting
- [ ] **Backups**: Regular image and data backups
- [ ] **Updates**: Automated security updates
- [ ] **Vulnerability Scanning**: CI/CD integration (Trivy, Snyk)

---

## Additional Resources

### Documentation

- [Podman Official Documentation](https://docs.podman.io/)
- [React Documentation](https://react.dev/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [OWASP Security Guide](https://owasp.org/)

### Tools

- **Security Scanning**: Trivy, Snyk, Clair
- **Monitoring**: Prometheus, Grafana, cAdvisor
- **Logging**: ELK Stack, Loki, Fluentd
- **CI/CD**: GitLab CI, GitHub Actions, Jenkins

### Best Practices

- Keep dependencies updated regularly
- Run security audits before deployments
- Use semantic versioning for images
- Implement automated testing in CI/CD
- Monitor container health and logs
- Use secrets management for sensitive data
- Implement rate limiting at reverse proxy level
- Regular security assessments and penetration testing

---

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Last Updated**: December 2025  
**Podman Version**: 4.9+  
**React Version**: 19.2.3  
**Node Version**: 20-alpine
