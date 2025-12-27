# React.js App - Dockerized for Production

A complete guide to create, dockerize, and deploy a React.js application using Docker with Nginx, following production best practices.

## Features

- React.js single-page application (SPA)
- Production-optimized multi-stage Docker build
- Nginx web server with optimized configuration
- Gzip compression for better performance
- Security headers configured
- Static asset caching
- React Router support (SPA routing)
- Health check endpoint
- Small Docker image size (~20-40MB)

## Prerequisites

- Node.js (v16 or later)
- Docker installed locally and on production server
- Docker Hub account (or any container registry)
- Basic knowledge of React and Docker

---

## Part 1: Create React Application

### Step 1: Create a new React app

```bash
npx create-react-app my-react-app
cd my-react-app
```

### Step 2: Test locally

```bash
npm start
```

Visit `http://localhost:3000` - you should see the default React app.

### Step 3: Build for production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder with minified static files.

---

## Part 2: Dockerize the Application

### Step 4: Create Dockerfile

Create `Dockerfile` in your project root:

```dockerfile
# ========== Build Stage ==========
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install ALL dependencies (needed for build)
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# ========== Production Stage ==========
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built React app from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

**Why Multi-Stage Build?**
- First stage: Uses Node.js to build the React app
- Second stage: Only copies built files to Nginx (lightweight)
- Result: Small final image size (~20-40MB vs 1GB+)

### Step 5: Create Nginx Configuration

Create `nginx.conf` in your project root:

```nginx
server {
    listen 80;
    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression for better performance
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Handle React Router (SPA routing)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Disable cache for index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        expires 0;
    }

    # Optional: API proxy (if you have a backend)
    # location /api {
    #     proxy_pass http://backend:3000;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade $http_upgrade;
    #     proxy_set_header Connection 'upgrade';
    #     proxy_set_header Host $host;
    #     proxy_cache_bypass $http_upgrade;
    # }
}
```

### Step 6: Create .dockerignore

Create `.dockerignore`:

```text
node_modules
build
npm-debug.log
.git
.gitignore
.env
.env.local
.env.development
.env.production
README.md
.vscode
.idea
coverage
.DS_Store
*.md
.eslintcache
```

---

## Part 3: Build and Test Docker Image

### Step 7: Build the Docker image

```bash
docker build -t my-react-app:latest .
```

Check image size:

```bash
docker images | grep my-react-app
```

You should see a small image (~20-40MB).

### Step 8: Test locally

Run the container:

```bash
docker run -d -p 8080:80 --name react-container my-react-app:latest
```

Visit `http://localhost:8080` - your React app should be running.

### Step 9: Verify and debug

Check container logs:

```bash
docker logs react-container
```

Check running containers:

```bash
docker ps
```

Stop the container:

```bash
docker stop react-container
docker rm react-container
```

---

## Part 4: Push to Docker Hub

### Step 10: Login to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password.

### Step 11: Tag the image

```bash
docker tag my-react-app:latest <your-dockerhub-username>/my-react-app:latest
```

Replace `<your-dockerhub-username>` with your actual Docker Hub username.

### Step 12: Push to Docker Hub

```bash
docker push <your-dockerhub-username>/my-react-app:latest
```

### Step 13: Verify on Docker Hub

Visit `https://hub.docker.com/r/<your-username>/my-react-app` to see your published image.

---

## Part 5: Production Deployment

### Option A: Simple Deployment (Direct Port Binding)

On your production server:

```bash
# Pull the image
docker pull <your-dockerhub-username>/my-react-app:latest

# Run the container
docker run -d \
  --name my-react-app \
  --restart unless-stopped \
  -p 80:80 \
  <your-dockerhub-username>/my-react-app:latest
```

Your app will be accessible at `http://your-server-ip`

### Option B: Behind Reverse Proxy (Recommended)

If you have multiple apps or need HTTPS:

```bash
docker run -d \
  --name my-react-app \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  <your-dockerhub-username>/my-react-app:latest
```

Then configure your external Nginx/Traefik to:
- Handle HTTPS/SSL certificates
- Proxy traffic from `https://your-domain.com` to `http://127.0.0.1:8080`

### Option C: Docker Compose (Recommended)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  react-app:
    image: <your-dockerhub-username>/my-react-app:latest
    container_name: my-react-app
    restart: unless-stopped
    ports:
      - "80:80"
    # For reverse proxy setup:
    # ports:
    #   - "127.0.0.1:8080:80"
```

Deploy:

```bash
docker-compose up -d
```

Stop:

```bash
docker-compose down
```

---

## Environment Variables (Optional)

If your React app uses environment variables:

### Step 1: Create .env files

Create `.env.production`:

```env
REACT_APP_API_URL=https://api.your-domain.com
REACT_APP_ENV=production
REACT_APP_APP_NAME=My React App
```

**Important:** Only variables prefixed with `REACT_APP_` are accessible in React.

### Step 2: Update Dockerfile (if using build args)

```dockerfile
# In build stage, add:
ARG REACT_APP_API_URL
ARG REACT_APP_ENV

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_ENV=$REACT_APP_ENV
```

### Step 3: Build with arguments

```bash
docker build \
  --build-arg REACT_APP_API_URL=https://api.your-domain.com \
  --build-arg REACT_APP_ENV=production \
  -t my-react-app:latest .
```

---

## Production Best Practices

### Security

- **Use HTTPS**: Always serve your app over HTTPS in production
- **Security headers**: Already included in nginx.conf
- **Regular updates**: Keep base images updated
- **Scan for vulnerabilities**:
  ```bash
  docker scan my-react-app:latest
  ```

### Performance

- **Gzip compression**: Enabled in nginx.conf
- **Static asset caching**: 1-year cache for static files
- **CDN**: Consider using a CDN for better global performance
- **Code splitting**: React does this automatically with lazy loading

### Monitoring

- **Health checks**: Already configured in Dockerfile
- **Logging**: View logs with:
  ```bash
  docker logs my-react-app
  ```
- **Uptime monitoring**: Use tools like UptimeRobot, Pingdom
- **Error tracking**: Integrate Sentry or similar

### Deployment

- **Zero downtime**: Use blue-green or rolling deployments
- **Automated CI/CD**: Set up GitHub Actions or GitLab CI
- **Resource limits**: Add memory and CPU limits in production:
  ```bash
  docker run -d \
    --name my-react-app \
    --restart unless-stopped \
    --memory=128m \
    --cpus=0.5 \
    -p 80:80 \
    my-react-app:latest
  ```

---

## Project Structure

```text
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── package.json
├── package-lock.json
├── Dockerfile
├── nginx.conf
├── .dockerignore
├── .env.production (optional)
├── docker-compose.yml (optional)
└── README.md
```

---

## Useful Commands

### Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Docker

```bash
# Build image
docker build -t my-react-app:latest .

# Run container
docker run -d -p 8080:80 --name react-container my-react-app:latest

# View running containers
docker ps

# View all containers
docker ps -a

# View logs
docker logs react-container

# Follow logs (live)
docker logs -f react-container

# Stop container
docker stop react-container

# Remove container
docker rm react-container

# Remove image
docker rmi my-react-app:latest

# Clean up unused images
docker image prune

# View image size
docker images
```

### Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

---

## Troubleshooting

### Build fails with npm errors

**Problem**: `npm ci` fails with package sync errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
docker build -t my-react-app:latest .
```

Or change Dockerfile to use `npm install` instead of `npm ci`.

### Container won't start

**Problem**: Container exits immediately

**Solution**: Check logs:
```bash
docker logs react-container
```

### Port already in use

**Problem**: Port 80 or 8080 already in use

**Solution**: Use a different port:
```bash
docker run -d -p 3000:80 --name react-container my-react-app:latest
```

### React Router 404 errors

**Problem**: Refreshing pages gives 404

**Solution**: Ensure nginx.conf has the `try_files` directive (already included).

### Changes not reflecting

**Problem**: Code changes don't appear in container

**Solution**: Rebuild the image:
```bash
docker build --no-cache -t my-react-app:latest .
```

### Large image size

**Problem**: Docker image is too large (>100MB)

**Solution**: 
- Ensure you're using multi-stage build (check Dockerfile)
- Check .dockerignore includes node_modules and build
- Use Alpine-based images (already in Dockerfile)

---

## Advanced: CI/CD with GitHub Actions

Create `.github/workflows/docker-deploy.yml`:

```yaml
name: Docker Build and Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ secrets.DOCKERHUB_USERNAME }}/my-react-app:latest
```

Add secrets in GitHub repository settings:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

---

## Next Steps

- Add authentication (Auth0, Firebase, JWT)
- Integrate with backend API
- Set up HTTPS with Let's Encrypt
- Add monitoring and analytics
- Implement error boundaries
- Set up automated testing
- Configure staging environment

---

## License

MIT

## Author

Sudhanshu Ranjan
