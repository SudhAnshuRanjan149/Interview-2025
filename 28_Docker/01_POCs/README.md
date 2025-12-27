# Docker Compose Multi-Service Deployment

This repository contains a Docker Compose configuration to deploy **four applications** as a unified stack:

1. **hello-world-node** - A simple Node.js Express app
2. **secure-node-api** - A secure Node.js API with helmet, CORS, rate limiting, and logging
3. **my-react-app** - A basic React frontend served via Nginx
4. **secure-react-app** - A production-hardened React frontend with comprehensive security measures

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Services Overview](#services-overview)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Accessing the Applications](#accessing-the-applications)
- [Health Checks](#health-checks)
- [Stopping and Cleaning Up](#stopping-and-cleaning-up)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Docker** (version 20.10 or higher)
  ```bash
  docker --version
  ```

- **Docker Compose** (version 2.0 or higher)
  ```bash
  docker compose version
  ```

- **Git** (optional, for cloning)
  ```bash
  git --version
  ```

### Installation Links

- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Engine for Linux](https://docs.docker.com/engine/install/)

---

## 📁 Project Structure

```
13_Docker/01_POCs/
├── docker-compose.yml          # Main orchestration file
├── README.md                   # This file
├── hello_world_node/
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js
│   └── .dockerignore
├── secure-node-api/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env                    # Environment variables (create this)
│   ├── src/
│   │   └── index.js
│   └── .dockerignore
├── my-react-app/
│   ├── Dockerfile              # Basic production build
│   ├── package.json
│   ├── nginx.conf              # Standard Nginx config
│   ├── public/
│   ├── src/
│   └── .dockerignore
└── secure-react-app/
    ├── Dockerfile              # Multi-stage, non-root, security hardened
    ├── package.json
    ├── nginx.conf              # Production Nginx with security headers
    ├── public/
    ├── src/
    └── .dockerignore
```

---

## 🚀 Services Overview

### 1. Hello World Node (`hello-world-node`)

- **Description**: A minimal Express.js server
- **Internal Port**: 3000
- **Host Port**: 3001
- **Endpoint**: `http://localhost:3001/`
- **Response**: "Hello World from Docker!"

### 2. Secure Node API (`secure-node-api`)

- **Description**: Production-ready Node.js API with security best practices
- **Internal Port**: 3000
- **Host Port**: 3002
- **Key Features**:
  - Helmet for security headers
  - CORS with origin restrictions
  - Rate limiting (100 requests per 15 minutes)
  - Request logging with Morgan
  - Health check endpoint
- **Endpoints**:
  - `http://localhost:3002/health` - Health check
  - `http://localhost:3002/api/hello` - Sample API route

### 3. Secure React Frontend (`secure-react-app`)

- **Description**: Production-hardened React app with enterprise-grade security
- **Internal Port**: 8080
- **Host Port**: 8080
- **URL**: `http://localhost:8080`
- **Security Features**:
  - Runs as non-root user (nginxuser, UID 1001)
  - Comprehensive security headers (CSP, Referrer-Policy, Permissions-Policy)
  - Rate limiting (10 requests/second per IP)
  - Server signature hiding
  - Pinned Nginx version (1.25.3-alpine)
  - Multi-stage Docker build
  - Vulnerability scanning during build
  - Resource limits (CPU: 0.5, Memory: 256MB)
- **Endpoints**:
  - `http://localhost:8080` - React application
  - `http://localhost:8080/health` - Health check endpoint

### 4. Basic React Frontend (`my-react-app`)

- **Description**: Standard React app with basic production optimization
- **Internal Port**: 80
- **Host Port**: 3000
- **URL**: `http://localhost:3000`
- **Features**:
  - Production-optimized build
  - Multi-stage Docker build
  - Basic security headers (X-Frame-Options, X-Content-Type-Options)
  - Gzip compression
  - Static asset caching
  - SPA routing support

### Network

All services are connected via a custom bridge network called `poc-network`, allowing inter-service communication by service name.

---

## 🎯 Getting Started

### Step 1: Navigate to the Project Directory

```bash
cd /Users/priyaupadhyay/Desktop/sudhanshu/Code/InterviewPrep-2025/13_Docker/01_POCs
```

### Step 2: Create Environment File (Required for secure-node-api)

Create a `.env` file in the `secure-node-api` directory:

```bash
touch secure-node-api/.env
```

Add the following content to `secure-node-api/.env`:

```env
NODE_ENV=production
PORT=3000
```

### Step 3: Build and Start All Services

Build all Docker images and start the containers in detached mode:

```bash
docker compose up --build -d
```

**Flags explained:**
- `--build`: Forces rebuild of images (use on first run or after code changes)
- `-d`: Runs containers in detached mode (background)

### Step 4: Verify Services Are Running

Check the status of all containers:

```bash
docker compose ps
```

Expected output:
```
NAME                 IMAGE                        STATUS
hello-world-node     01_pocs-hello-world-node     Up (healthy)
secure-node-api      01_pocs-secure-node-api      Up (healthy)
my-react-app         01_pocs-my-react-app         Up (healthy)
secure-react-app     01_pocs-secure-react-app     Up (healthy)
```

---

## 🔧 Environment Variables

### secure-node-api Environment Variables

Create `secure-node-api/.env` with:

| Variable    | Default Value | Description                          |
|-------------|---------------|--------------------------------------|
| `NODE_ENV`  | `production`  | Node environment                     |
| `PORT`      | `3000`        | Internal port for the API server     |

### React App Build Arguments

These are configured in `docker-compose.yml`:

| Variable              | Default Value            | Description                    |
|-----------------------|--------------------------|--------------------------------|
| `REACT_APP_API_URL`   | `http://localhost:3002`  | Backend API URL                |
| `REACT_APP_ENV`       | `production`             | React app environment          |

To modify these, edit the `docker-compose.yml` file under the `react-app` service's `build.args` section.

---

## 📖 Usage

### Start All Services

```bash
docker compose up -d
```

### Start Specific Service(s)

```bash
docker compose up -d hello-world-node
docker compose up -d secure-node-api secure-react-app my-react-app
```

### View Logs

**All services:**
```bash
docker compose logs -f
```

**Specific service:**
```bash
docker compose logs -f hello-world-node
docker compose logs -f secure-node-api
docker compose logs -f secure-react-app
docker compose logs -f my-react-app
```

**Last 100 lines:**
```bash
docker compose logs --tail=100 -f
```

### Rebuild After Code Changes

If you modify any application code:

```bash
docker compose up --build -d
```

Or rebuild a specific service:

```bash
docker compose up --build -d secure-react-app
docker compose up --build -d my-react-app
```

### Execute Commands Inside Containers

```bash
# Access bash/sh in a container
docker compose exec hello-world-node sh
docker compose exec secure-node-api sh
docker compose exec secure-react-app sh
docker compose exec my-react-app sh

# Run a one-off command
docker compose exec secure-node-api node --version
```

---

## 🌐 Accessing the Applications

Once the services are running, access them via:

| Service                  | URL                               | Description                           |
|--------------------------|-----------------------------------|---------------------------------------|
| Hello World Node         | http://localhost:3001             | Simple Express app                    |
| Secure Node API          | http://localhost:3002/health      | API health check endpoint             |
| Secure Node API          | http://localhost:3002/api/hello   | Sample API route                      |
| Basic React App          | http://localhost:3000             | Standard React frontend               |
| Secure React Frontend    | http://localhost:8080             | Production-hardened React app         |
| React App Health Check   | http://localhost:8080/health      | Frontend health endpoint              |

### Testing with curl

```bash
# Test Hello World Node
curl http://localhost:3001

# Test Secure API Health
curl http://localhost:3002/health

# Test Secure API Hello endpoint
curl http://localhost:3002/api/hello

# Test Basic React App
curl http://localhost:3000

# Test Secure React App
curl http://localhost:8080

# Test Secure React App Health
curl http://localhost:8080/health
```
curl http://localhost:3002/api/hello

# Test React App
curl http://localhost:8080
```

---

## 💚 Health Checks

All services have built-in health checks configured in `docker-compose.yml`:

- **Interval**: 30 seconds
- **Timeout**: 3-5 seconds
- **Retries**: 3
- **Start Period**: 10 seconds

Check health status:

```bash
docker compose ps
```

Or inspect a specific container:

```bash
docker inspect hello-world-node --format='{{.State.Health.Status}}'
```

---

## 🛑 Stopping and Cleaning Up

### Stop All Services (Keep Containers)

```bash
docker compose stop
```

### Stop and Remove Containers

```bash
docker compose down
```

### Remove Containers, Networks, and Images

```bash
docker compose down --rmi all
```

### Remove Containers, Networks, Volumes, and Images

```bash
docker compose down --rmi all --volumes
```

### Remove Orphaned Containers

```bash
docker compose down --remove-orphans
```

---

## 🔍 Troubleshooting

### Issue 1: Port Already in Use

**Error:**
```
Error starting userland proxy: listen tcp4 0.0.0.0:3001: bind: address already in use
```

**Solution:**

Check which process is using the port:
```bash
lsof -i :3001
```

Kill the process or change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3005:3000"  # Change 3001 to another port
```

### Issue 2: Container Fails to Start

**Check logs:**
```bash
docker compose logs secure-node-api
```

**Common causes:**
- Missing `.env` file in `secure-node-api/`
- Syntax errors in code
- Missing dependencies

**Solution:**
Rebuild with no cache:
```bash
docker compose build --no-cache secure-node-api
docker compose up -d secure-node-api
```

### Issue 3: React App Shows Blank Page

**Check nginx logs:**
```bash
docker compose logs react-app
```

**Possible issues:**
- Build failed during Docker build
- Missing environment variables
- Nginx misconfiguration

**Solution:**
Rebuild the React app:
```bash
docker compose build --no-cache react-app
docker compose up -d react-app
```

### Issue 4: Services Can't Communicate

**Check network:**
```bash
docker network ls
docker network inspect poc-network
```

**Solution:**
Ensure all services are on the same network (defined in `docker-compose.yml`).

### Issue 5: Permission Denied (Linux)

**Error:**
```
permission denied while trying to connect to the Docker daemon socket
```

**Solution:**
Add your user to the docker group:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Issue 6: Unhealthy Container

**Check health:**
```bash
docker compose ps
docker inspect secure-node-api --format='{{json .State.Health}}'
```

**Solution:**
- Verify the health check command is correct
- Check if the application is listening on the correct port
- Review application logs for startup errors

---

## ⚙️ Advanced Configuration

### Scaling Services

Scale a service to multiple instances:

```bash
docker compose up -d --scale hello-world-node=3
```

**Note:** Remove the `container_name` field from `docker-compose.yml` to enable scaling.

### Using Docker Compose Profiles

Add profiles to run different configurations:

```yaml
services:
  hello-world-node:
    profiles: ["backend"]
  secure-node-api:
    profiles: ["backend"]
  react-app:
    profiles: ["frontend"]
```

Run only backend services:
```bash
docker compose --profile backend up -d
```

### Custom Network Configuration

Assign static IPs:

```yaml
networks:
  app-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16

services:
  hello-world-node:
    networks:
      app-network:
        ipv4_address: 172.28.0.10
```

### Volume Mounts for Development

For live code reloading during development:

```yaml
services:
  hello-world-node:
    volumes:
      - ./hello_world_node:/app
      - /app/node_modules  # Prevent overwriting node_modules
```

### Resource Limits

Limit CPU and memory:

```yaml
services:
  secure-node-api:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## 📊 Monitoring

### View Resource Usage

```bash
docker stats
```

### Export Logs

```bash
docker compose logs > logs.txt
```

### Continuous Integration

Example GitHub Actions workflow snippet:

```yaml
- name: Build and test with Docker Compose
  run: |
    docker compose up -d
    docker compose ps
    docker compose logs
    docker compose down
```

---

## 📊 Service Comparison

### React Apps Comparison

| Feature                    | my-react-app (Port 3000)        | secure-react-app (Port 8080)         |
|----------------------------|---------------------------------|--------------------------------------|
| **Security Level**         | Basic                           | Enterprise-grade                     |
| **User**                   | root                            | nginxuser (non-root)                 |
| **Port**                   | 80 (privileged)                 | 8080 (non-privileged)                |
| **Nginx Version**          | Latest (floating)               | 1.25.3-alpine (pinned)               |
| **CSP Header**             | ❌ None                         | ✅ Strict policy                     |
| **Rate Limiting**          | ❌ None                         | ✅ 10 req/s per IP                   |
| **Security Headers**       | Basic (3)                       | Comprehensive (7)                    |
| **Vulnerability Scanning** | ❌ None                         | ✅ npm audit in build                |
| **Resource Limits**        | ❌ None                         | ✅ CPU & Memory limits               |
| **Health Endpoint**        | Basic                           | JSON response                        |
| **Use Case**               | Development, demos              | Production deployments               |

### Node Apps Comparison

| Feature                    | hello-world-node (Port 3001)    | secure-node-api (Port 3002)          |
|----------------------------|---------------------------------|--------------------------------------|
| **Security Level**         | Minimal                         | Production-ready                     |
| **Middleware**             | Basic Express                   | Helmet, CORS, Rate-limit, Morgan     |
| **User**                   | Non-root (nodejs)               | Non-root (nodejs)                    |
| **Health Check**           | Root endpoint                   | Dedicated /health endpoint           |
| **Logging**                | Console only                    | Morgan logger                        |
| **CORS**                   | ❌ Not configured               | ✅ Origin restrictions               |
| **Rate Limiting**          | ❌ None                         | ✅ 100 req/15min                     |
| **Use Case**               | Simple demos, learning          | Production APIs                      |

---

## 🎓 Learn More

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Networking](https://docs.docker.com/network/)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Compose File Reference](https://docs.docker.com/compose/compose-file/)

---

## 📝 Notes

- All containers restart automatically unless stopped manually (`restart: unless-stopped`)
- Both React apps can run simultaneously on different ports
- Secure services (secure-react-app, secure-node-api) follow production best practices
- Basic services (my-react-app, hello-world-node) are simpler for learning and demos
- Health checks ensure services are ready before marking them as healthy
- Custom bridge network allows services to communicate using service names
- All images are built from local Dockerfiles (no pre-built images pulled from registries)

---

## 🤝 Contributing

To add new services:

1. Create a new directory with Dockerfile and application code
2. Add the service definition to `docker-compose.yml`
3. Update this README with service details
4. Test with `docker compose up --build -d`

---

## 📄 License

This is a proof-of-concept project for learning and demonstration purposes.

---

**Happy Dockerizing! 🐳**
