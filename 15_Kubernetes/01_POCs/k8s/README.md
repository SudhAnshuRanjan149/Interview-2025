# Kubernetes POC - React + Node.js on MacBook

Complete guide to deploy a React frontend and Node.js backend using Docker and Kubernetes locally on MacBook.

## Table of Contents
- [Prerequisites Installation](#prerequisites-installation)
- [Project Setup](#project-setup)
- [Backend Application](#backend-application)
- [Frontend Application](#frontend-application)
- [Docker Configuration](#docker-configuration)
- [Kubernetes Setup](#kubernetes-setup)
- [Deployment](#deployment)
- [Access Applications](#access-applications)
- [Management Commands](#management-commands)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites Installation

### 1. Install Homebrew
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify
brew --version
```

### 2. Install Required Tools
```bash
# Node.js and npm
brew install node
node --version
npm --version

# Docker Desktop
brew install --cask docker
# Open Docker Desktop from Applications and wait for it to start

# Verify Docker
docker --version
docker run hello-world

# Kubernetes CLI
brew install kubectl
kubectl version --client

# Minikube (local Kubernetes)
brew install minikube
minikube version
```

### 3. Start Minikube
```bash
# Start with recommended settings
minikube start --driver=docker --cpus=4 --memory=6144 --disk-size=20g

# Enable addons
minikube addons enable metrics-server
minikube addons enable ingress

# Verify
minikube status
kubectl get nodes
```

---

## Project Setup

```bash
# Create project structure
mkdir ~/kubernetes-poc
cd ~/kubernetes-poc
mkdir -p frontend backend k8s

# Directory structure:
# kubernetes-poc/
# ├── frontend/
# ├── backend/
# └── k8s/
```

---

## Backend Application

### 1. Initialize Backend
```bash
cd ~/kubernetes-poc/backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors helmet dotenv compression morgan
```

### 2. Create server.js
Create `backend/server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Health check endpoints
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'Backend API is running on Kubernetes!',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    hostname: require('os').hostname()
  });
});

app.get('/api/liveness', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

app.get('/api/readiness', (req, res) => {
  res.status(200).json({ status: 'ready' });
});

// Sample data endpoint
app.get('/api/data', (req, res) => {
  res.json({
    message: 'Data from Kubernetes backend',
    data: [
      { id: 1, name: 'Item 1', description: 'First item' },
      { id: 2, name: 'Item 2', description: 'Second item' },
      { id: 3, name: 'Item 3', description: 'Third item' }
    ],
    pod: require('os').hostname()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📦 Pod: ${require('os').hostname()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => process.exit(0));
});

module.exports = app;
```

### 3. Create Backend Dockerfile
Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
```

### 4. Create Backend .dockerignore
Create `backend/.dockerignore`:

```
node_modules
npm-debug.log
.git
.env
```

---

## Frontend Application

### 1. Create React App
```bash
cd ~/kubernetes-poc/frontend

# Create React app
npx create-react-app .

# Install serve
npm install --save-dev serve
```

### 2. Update package.json
Update `frontend/package.json` scripts section:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "serve": "serve -s build -l 3000"
  }
}
```

### 3. Update App.js
Replace `frontend/src/App.js`:

```javascript
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch health status
    fetch(`${API_URL}/api/health`)
      .then(res => res.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to connect to backend');
        setLoading(false);
      });

    // Fetch data
    fetch(`${API_URL}/api/data`)
      .then(res => res.json())
      .then(data => setData(data.data || []))
      .catch(err => console.error('Error fetching data:', err));
  }, [API_URL]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React + Node.js on Kubernetes</h1>
        
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        
        {health && (
          <div style={{background: '#282c34', padding: '20px', borderRadius: '10px', margin: '20px'}}>
            <h2>✅ Backend Status</h2>
            <p><strong>Status:</strong> {health.status}</p>
            <p><strong>Message:</strong> {health.message}</p>
            <p><strong>Pod:</strong> {health.hostname}</p>
            <p><strong>Uptime:</strong> {Math.floor(health.uptime)}s</p>
          </div>
        )}

        {data.length > 0 && (
          <div style={{background: '#282c34', padding: '20px', borderRadius: '10px', margin: '20px'}}>
            <h2>📊 Sample Data</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
              {data.map(item => (
                <li key={item.id} style={{margin: '10px 0'}}>
                  <strong>{item.name}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <p style={{fontSize: '14px', marginTop: '30px'}}>
          API URL: {API_URL}
        </p>
      </header>
    </div>
  );
}

export default App;
```

### 4. Create Frontend Dockerfile
Create `frontend/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

RUN npm install -g serve

RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

WORKDIR /app

COPY --from=build --chown=nodejs:nodejs /app/build ./build

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["serve", "-s", "build", "-l", "3000"]
```

### 5. Create Frontend .dockerignore
Create `frontend/.dockerignore`:

```
node_modules
build
.git
README.md
```

---

## Docker Configuration

### 1. Build Docker Images
```bash
# Build backend
cd ~/kubernetes-poc/backend
docker build -t backend:1.0.0 .

# Build frontend
cd ~/kubernetes-poc/frontend
docker build -t frontend:1.0.0 .

# Verify images
docker images | grep -E "backend|frontend"
```

### 2. Load Images to Minikube
```bash
# Load images into Minikube (required for local development)
minikube image load backend:1.0.0
minikube image load frontend:1.0.0

# Verify
minikube ssh "docker images" | grep -E "backend|frontend"
```

---

## Kubernetes Setup

### 1. Backend Deployment
Create `k8s/backend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  labels:
    app: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: backend:1.0.0
        imagePullPolicy: Never
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "5000"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /api/liveness
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/readiness
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 5
```

### 2. Backend Service
Create `k8s/backend-service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  labels:
    app: backend
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - port: 5000
    targetPort: 5000
    protocol: TCP
```

### 3. Frontend Deployment
Create `k8s/frontend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  labels:
    app: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: frontend:1.0.0
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
        env:
        - name: REACT_APP_API_URL
          value: "http://backend-service:5000"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
```

### 4. Frontend Service
Create `k8s/frontend-service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  labels:
    app: frontend
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
    nodePort: 30080
    protocol: TCP
```

---

## Deployment

### 1. Deploy to Kubernetes
```bash
cd ~/kubernetes-poc

# Apply all configurations
kubectl apply -f k8s/

# Watch pods starting
kubectl get pods -w

# Wait until all pods show STATUS: Running
# Press Ctrl+C to exit watch mode
```

### 2. Verify Deployment
```bash
# Check all resources
kubectl get all

# Check pod status
kubectl get pods

# Check services
kubectl get services

# View pod logs
kubectl logs -l app=backend
kubectl logs -l app=frontend
```

---

## Access Applications

### Method 1: Minikube Service (Easiest)
```bash
# Get frontend URL
minikube service frontend-service --url

# Output example: http://192.168.49.2:30080
# Open this URL in your browser
```

### Method 2: Port Forwarding
```bash
# Terminal 1 - Forward frontend
kubectl port-forward service/frontend-service 8080:80

# Terminal 2 - Forward backend
kubectl port-forward service/backend-service 5000:5000

# Access:
# Frontend: http://localhost:8080
# Backend: http://localhost:5000/api/health
```

### Method 3: Minikube Tunnel
```bash
# In a separate terminal (requires sudo)
minikube tunnel

# Then access: http://localhost
```

---

## Management Commands

### Viewing Resources
```bash
# View all resources
kubectl get all

# View pods with labels
kubectl get pods -l app=backend
kubectl get pods -l app=frontend

# View detailed pod info
kubectl describe pod <pod-name>

# View pod logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs

# View events
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Scaling
```bash
# Scale deployment
kubectl scale deployment backend --replicas=3
kubectl scale deployment frontend --replicas=3

# Verify scaling
kubectl get pods -w
```

### Updating Application
```bash
# After code changes:

# 1. Rebuild image
cd ~/kubernetes-poc/backend
docker build -t backend:1.0.1 .

# 2. Load to Minikube
minikube image load backend:1.0.1

# 3. Update deployment YAML (change image version)
# Edit k8s/backend-deployment.yaml

# 4. Apply changes
kubectl apply -f k8s/backend-deployment.yaml

# 5. Watch rollout
kubectl rollout status deployment/backend

# 6. Verify
kubectl get pods
```

### Rollback
```bash
# View rollout history
kubectl rollout history deployment/backend

# Rollback to previous version
kubectl rollout undo deployment/backend

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=2
```

### Debugging
```bash
# Execute commands in pod
kubectl exec -it <pod-name> -- /bin/sh

# Test backend from within cluster
kubectl exec -it <frontend-pod-name> -- wget -qO- http://backend-service:5000/api/health

# Check resource usage
kubectl top nodes
kubectl top pods

# View full resource details
kubectl describe deployment backend
kubectl describe service backend-service
```

### Cleanup
```bash
# Delete specific resources
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/frontend-deployment.yaml

# Delete all resources
kubectl delete -f k8s/

# Or delete by label
kubectl delete all -l app=backend
kubectl delete all -l app=frontend
```

---

## Troubleshooting

### Pods Not Starting
```bash
# Check pod status
kubectl get pods

# View pod details
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp

# Verify images loaded
minikube ssh "docker images"
```

### Docker Desktop Issues
```bash
# Restart Docker Desktop from menu bar
# Or quit and reopen from Applications

# Check Docker daemon
docker info

# Test Docker
docker run hello-world
```

### Minikube Issues
```bash
# Check Minikube status
minikube status

# View Minikube logs
minikube logs -f

# Restart Minikube
minikube stop
minikube start

# Full reset (deletes everything)
minikube delete
minikube start --driver=docker --cpus=4 --memory=6144
```

### Image Pull Errors
```bash
# Common issue: Image not loaded to Minikube

# Solution: Load image again
minikube image load backend:1.0.0
minikube image load frontend:1.0.0

# Verify
minikube ssh "docker images"

# Make sure imagePullPolicy: Never in deployments
```

### Memory/CPU Issues
```bash
# Start Minikube with more resources
minikube delete
minikube start --cpus=6 --memory=8192 --disk-size=30g
```

### Service Not Accessible
```bash
# Check service
kubectl get service frontend-service

# Check endpoints
kubectl get endpoints

# Port forward for testing
kubectl port-forward service/frontend-service 8080:80

# Check if pods are ready
kubectl get pods
```

### Common Error Messages

**"ImagePullBackOff"**
- Image not loaded to Minikube
- Solution: `minikube image load <image-name>`

**"CrashLoopBackOff"**
- Container keeps crashing
- Solution: Check logs `kubectl logs <pod-name>`

**"Pending"**
- Resource constraints
- Solution: Check `kubectl describe pod <pod-name>`

---

## Useful Minikube Commands

```bash
# View Minikube dashboard (GUI)
minikube dashboard

# Check Minikube IP
minikube ip

# SSH into Minikube VM
minikube ssh

# Stop Minikube (saves state)
minikube stop

# Start Minikube
minikube start

# Delete cluster (fresh start)
minikube delete

# Check resource usage in Minikube
minikube ssh "free -h"
minikube ssh "df -h"

# List Minikube addons
minikube addons list

# Enable addon
minikube addons enable <addon-name>
```

---

## Quick Reference Commands

```bash
# Start everything from scratch
minikube start --driver=docker --cpus=4 --memory=6144
cd ~/kubernetes-poc
docker build -t backend:1.0.0 ./backend
docker build -t frontend:1.0.0 ./frontend
minikube image load backend:1.0.0
minikube image load frontend:1.0.0
kubectl apply -f k8s/
kubectl get pods -w

# Access application
minikube service frontend-service --url

# View logs
kubectl logs -l app=backend -f
kubectl logs -l app=frontend -f

# Scale
kubectl scale deployment backend --replicas=3

# Update after code changes
docker build -t backend:1.0.1 ./backend
minikube image load backend:1.0.1
# Update image in deployment YAML
kubectl apply -f k8s/backend-deployment.yaml

# Clean up
kubectl delete -f k8s/
minikube stop
```

---

## Additional Resources

- **Kubernetes Docs**: https://kubernetes.io/docs/
- **Minikube Docs**: https://minikube.sigs.k8s.io/docs/
- **Docker Docs**: https://docs.docker.com/
- **kubectl Cheat Sheet**: https://kubernetes.io/docs/reference/kubectl/cheatsheet/

---

## Notes

- Always ensure Docker Desktop is running before starting Minikube
- Use `imagePullPolicy: Never` for local images
- Load images to Minikube after every rebuild
- For production, push images to a container registry (Docker Hub, ECR, GCR)
- Monitor resource usage with `kubectl top` commands
- Use `minikube dashboard` for a visual interface

---

**Created**: December 2025  
**Last Updated**: December 2025  
**Version**: 1.0.0