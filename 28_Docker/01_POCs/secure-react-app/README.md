# Secure React App - Production Hardened# React.js App - Dockerized for Production



A production-ready React application with enterprise-grade security measures, built with React 19 and served via hardened Nginx.A complete guide to create, dockerize, and deploy a React.js application using Docker with Nginx, following production best practices.



---## Features



## 🔒 Security Features- React.js single-page application (SPA)

- Production-optimized multi-stage Docker build

### Docker Security- Nginx web server with optimized configuration

- ✅ **Non-root user**: Runs as `nginxuser` (UID 1001) instead of root- Gzip compression for better performance

- ✅ **Pinned base image**: Uses `nginx:1.25.3-alpine` (no floating tags)- Security headers configured

- ✅ **Multi-stage build**: Separates build and runtime environments- Static asset caching

- ✅ **Vulnerability scanning**: `npm audit` runs during build- React Router support (SPA routing)

- ✅ **Minimal attack surface**: Alpine Linux base (~5MB)- Health check endpoint

- ✅ **Resource limits**: CPU and memory constraints configured- Small Docker image size (~20-40MB)

- ✅ **Health checks**: Built-in container health monitoring

## Prerequisites

### Nginx Security Headers

- ✅ **Content-Security-Policy (CSP)**: Prevents XSS attacks- Node.js (v16 or later)

- ✅ **X-Frame-Options**: Prevents clickjacking (`SAMEORIGIN`)- Docker installed locally and on production server

- ✅ **X-Content-Type-Options**: Prevents MIME sniffing (`nosniff`)- Docker Hub account (or any container registry)

- ✅ **X-XSS-Protection**: Browser XSS protection enabled- Basic knowledge of React and Docker

- ✅ **Referrer-Policy**: Controls referrer information leakage

- ✅ **Permissions-Policy**: Disables unnecessary browser features---

- ✅ **Server tokens hidden**: Nginx version not exposed

## Part 1: Create React Application

### Application Security

- ✅ **Rate limiting**: 10 requests/second per IP (burst 20)### Step 1: Create a new React app

- ✅ **Static asset caching**: 1-year cache with immutable flag

- ✅ **Hidden file protection**: Blocks access to dotfiles (.env, .git)```bash

- ✅ **Sensitive file blocking**: Denies .md, .json, .yml filesnpx create-react-app my-react-app

- ✅ **Gzip compression**: Reduces bandwidth and improves performancecd my-react-app

- ✅ **SPA routing**: Proper React Router handling```



---### Step 2: Test locally



## 📋 Quick Start```bash

npm start

### Prerequisites```

- Docker 20.10+

- Docker Compose 2.0+Visit `http://localhost:3000` - you should see the default React app.



### Build and Run### Step 3: Build for production



```bash```bash

# Build the imagenpm run build

docker build -t secure-react-app:latest .```



# Run the containerThis creates an optimized production build in the `build/` folder with minified static files.

docker run -d \

  --name secure-react-app \---

  -p 8080:8080 \

  secure-react-app:latest## Part 2: Dockerize the Application



# Access the app### Step 4: Create Dockerfile

open http://localhost:8080

```Create `Dockerfile` in your project root:



### Run with Docker Compose```dockerfile

# ========== Build Stage ==========

From the parent directory (`01_POCs/`):FROM node:20-alpine AS build



```bashWORKDIR /app

docker compose up secure-react-app -d

```# Copy package files and install ALL dependencies (needed for build)

COPY package*.json ./

---RUN npm install



## 🔧 Configuration# Copy source code and build

COPY . .

### Environment VariablesRUN npm run build



Build-time arguments (set in `docker-compose.yml` or via `--build-arg`):# ========== Production Stage ==========

FROM nginx:alpine

| Variable              | Default                    | Description                |

|-----------------------|----------------------------|----------------------------|# Copy custom Nginx configuration

| `REACT_APP_API_URL`   | `http://localhost:3002`    | Backend API URL            |COPY nginx.conf /etc/nginx/conf.d/default.conf

| `REACT_APP_ENV`       | `production`               | Environment identifier     |

# Copy built React app from build stage

Example:COPY --from=build /app/build /usr/share/nginx/html

```bash

docker build \# Expose port 80

  --build-arg REACT_APP_API_URL=https://api.example.com \EXPOSE 80

  --build-arg REACT_APP_ENV=production \

  -t secure-react-app:latest .# Health check

```HEALTHCHECK --interval=30s --timeout=3s \

  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

### Nginx Configuration

# Start Nginx

The `nginx.conf` file includes:CMD ["nginx", "-g", "daemon off;"]

- **Listen Port**: 8080 (non-privileged)```

- **Rate Limiting**: 10 req/s per IP

- **Security Headers**: Comprehensive protection**Why Multi-Stage Build?**

- **Caching Strategy**: Aggressive for assets, none for index.html- First stage: Uses Node.js to build the React app

- Second stage: Only copies built files to Nginx (lightweight)

To customize, edit `nginx.conf` and rebuild.- Result: Small final image size (~20-40MB vs 1GB+)



---### Step 5: Create Nginx Configuration



## 🧪 TestingCreate `nginx.conf` in your project root:



### Run Tests Locally```nginx

server {

```bash    listen 80;

npm test    server_name localhost;

```

    root /usr/share/nginx/html;

### Security Audit    index index.html;



```bash    # Gzip compression for better performance

# Check for vulnerabilities    gzip on;

npm run audit    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    gzip_min_length 1000;

# Check production dependencies only

npm run audit:production    # Security headers

    add_header X-Frame-Options "SAMEORIGIN" always;

# Fix vulnerabilities automatically    add_header X-Content-Type-Options "nosniff" always;

npm run audit:fix    add_header X-XSS-Protection "1; mode=block" always;

    add_header Referrer-Policy "no-referrer-when-downgrade" always;

# Check with moderate threshold

npm run audit:check    # Handle React Router (SPA routing)

```    location / {

        try_files $uri $uri/ /index.html;

### Build Locally    }



```bash    # Cache static assets

npm install    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {

npm run build        expires 1y;

```        add_header Cache-Control "public, immutable";

    }

---

    # Disable cache for index.html

## 🚀 Deployment    location = /index.html {

        add_header Cache-Control "no-cache, no-store, must-revalidate";

### Production Checklist        expires 0;

    }

- [ ] Update `REACT_APP_API_URL` to production API endpoint

- [ ] Enable HTTPS (use reverse proxy or update nginx.conf)    # Optional: API proxy (if you have a backend)

- [ ] Uncomment HSTS header in nginx.conf (requires HTTPS)    # location /api {

- [ ] Review and tighten CSP policy based on your needs    #     proxy_pass http://backend:3000;

- [ ] Set up monitoring and logging    #     proxy_http_version 1.1;

- [ ] Configure CORS on backend to allow your frontend domain    #     proxy_set_header Upgrade $http_upgrade;

- [ ] Run security audit: `npm run audit:check`    #     proxy_set_header Connection 'upgrade';

- [ ] Scan Docker image: `docker scan secure-react-app:latest` or `trivy image secure-react-app:latest`    #     proxy_set_header Host $host;

- [ ] Set resource limits in production orchestrator    #     proxy_cache_bypass $http_upgrade;

- [ ] Enable log aggregation (ELK, Splunk, etc.)    # }

- [ ] Set up health check monitoring}

```

### HTTPS Configuration

### Step 6: Create .dockerignore

For production, enable HTTPS by updating `nginx.conf`:

Create `.dockerignore`:

```nginx

server {```text

    listen 443 ssl http2;node_modules

    server_name your-domain.com;build

npm-debug.log

    ssl_certificate /etc/nginx/ssl/cert.pem;.git

    ssl_certificate_key /etc/nginx/ssl/key.pem;.gitignore

    .env

    ssl_protocols TLSv1.2 TLSv1.3;.env.local

    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';.env.development

    ssl_prefer_server_ciphers off;.env.production

    README.md

    # Enable HSTS.vscode

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;.idea

    coverage

    # ... rest of config.DS_Store

}*.md

.eslintcache

# Redirect HTTP to HTTPS```

server {

    listen 80;---

    server_name your-domain.com;

    return 301 https://$host$request_uri;## Part 3: Build and Test Docker Image

}

```### Step 7: Build the Docker image



Mount SSL certificates:```bash

```bashdocker build -t my-react-app:latest .

docker run -d \```

  -v /path/to/certs:/etc/nginx/ssl:ro \

  -p 443:443 \Check image size:

  secure-react-app:latest

``````bash

docker images | grep my-react-app

---```



## 🔍 Health ChecksYou should see a small image (~20-40MB).



### Container Health### Step 8: Test locally



The Dockerfile includes a built-in health check:Run the container:

- **Endpoint**: `http://localhost:8080/health`

- **Interval**: 30 seconds```bash

- **Timeout**: 3 secondsdocker run -d -p 8080:80 --name react-container my-react-app:latest

- **Retries**: 3```

- **Start Period**: 10 seconds

Visit `http://localhost:8080` - your React app should be running.

Check health status:

```bash### Step 9: Verify and debug

docker inspect secure-react-app --format='{{.State.Health.Status}}'

```Check container logs:



### Manual Health Check```bash

docker logs react-container

```bash```

curl http://localhost:8080/health

```Check running containers:



Expected response:```bash

```jsondocker ps

{"status":"healthy","service":"secure-react-app"}```

```

Stop the container:

---

```bash

## 📊 Monitoringdocker stop react-container

docker rm react-container

### View Logs```



```bash---

# Docker logs

docker logs -f secure-react-app## Part 4: Push to Docker Hub



# Docker Compose logs### Step 10: Login to Docker Hub

docker compose logs -f secure-react-app

``````bash

docker login

### Resource Usage```



```bashEnter your Docker Hub username and password.

docker stats secure-react-app

```### Step 11: Tag the image



### Nginx Access Logs```bash

docker tag my-react-app:latest <your-dockerhub-username>/my-react-app:latest

Access logs are available inside the container:```

```bash

docker exec secure-react-app tail -f /var/log/nginx/access.logReplace `<your-dockerhub-username>` with your actual Docker Hub username.

```

### Step 12: Push to Docker Hub

---

```bash

## 🛠️ Troubleshootingdocker push <your-dockerhub-username>/my-react-app:latest

```

### Port 8080 Already in Use

### Step 13: Verify on Docker Hub

**Error**: `bind: address already in use`

Visit `https://hub.docker.com/r/<your-username>/my-react-app` to see your published image.

**Solution**: Change the host port mapping:

```bash---

docker run -p 8081:8080 secure-react-app:latest

```## Part 5: Production Deployment



### Container Unhealthy### Option A: Simple Deployment (Direct Port Binding)



**Check health status:**On your production server:

```bash

docker inspect secure-react-app --format='{{json .State.Health}}'```bash

```# Pull the image

docker pull <your-dockerhub-username>/my-react-app:latest

**Common causes:**

- Nginx failed to start# Run the container

- Port 8080 already in use inside containerdocker run -d \

- Health check URL incorrect  --name my-react-app \

  --restart unless-stopped \

**Solution**: Check logs:  -p 80:80 \

```bash  <your-dockerhub-username>/my-react-app:latest

docker logs secure-react-app```

```

Your app will be accessible at `http://your-server-ip`

### CSP Blocking Resources

### Option B: Behind Reverse Proxy (Recommended)

If Content-Security-Policy blocks legitimate resources:

If you have multiple apps or need HTTPS:

1. Check browser console for CSP errors

2. Update `nginx.conf` CSP header to allow specific domains:```bash

   ```nginxdocker run -d \

   add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://trusted-cdn.com; ..." always;  --name my-react-app \

   ```  --restart unless-stopped \

3. Rebuild: `docker compose up --build -d secure-react-app`  -p 127.0.0.1:8080:80 \

  <your-dockerhub-username>/my-react-app:latest

### Rate Limiting Too Strict```



If rate limiting blocks legitimate traffic:Then configure your external Nginx/Traefik to:

- Handle HTTPS/SSL certificates

1. Edit `nginx.conf` and increase the rate:- Proxy traffic from `https://your-domain.com` to `http://127.0.0.1:8080`

   ```nginx

   limit_req_zone $binary_remote_addr zone=app_limit:10m rate=50r/s;### Option C: Docker Compose (Recommended)

   ```

2. Or increase burst size:Create `docker-compose.yml`:

   ```nginx

   limit_req zone=app_limit burst=100 nodelay;```yaml

   ```version: '3.8'

3. Rebuild the container

services:

---  react-app:

    image: <your-dockerhub-username>/my-react-app:latest

## 📈 Performance Optimization    container_name: my-react-app

    restart: unless-stopped

### Current Optimizations    ports:

      - "80:80"

- ✅ Gzip compression enabled (level 6)    # For reverse proxy setup:

- ✅ Static assets cached for 1 year    # ports:

- ✅ index.html never cached    #   - "127.0.0.1:8080:80"

- ✅ Multi-stage build (small final image)```

- ✅ Alpine Linux base (minimal overhead)

- ✅ Non-root user (slight security overhead)Deploy:



### Further Improvements```bash

docker-compose up -d

1. **Enable Brotli compression** (better than gzip):```

   - Requires compiling Nginx with brotli module

   - Or use Cloudflare/CDN for automatic BrotliStop:



2. **Add HTTP/2 Push** (if using HTTPS):```bash

   ```nginxdocker-compose down

   http2_push /static/css/main.css;```

   http2_push /static/js/main.js;

   ```---



3. **Use CDN**: Serve static assets from CloudFlare, AWS CloudFront, etc.## Environment Variables (Optional)



4. **Optimize images**: Use WebP format, lazy loadingIf your React app uses environment variables:



5. **Code splitting**: Implemented via react-scripts by default### Step 1: Create .env files



---Create `.env.production`:



## 🔐 Security Best Practices```env

REACT_APP_API_URL=https://api.your-domain.com

### Already ImplementedREACT_APP_ENV=production

REACT_APP_APP_NAME=My React App

- [x] Non-root container user```

- [x] Pinned base image versions

- [x] Multi-stage builds**Important:** Only variables prefixed with `REACT_APP_` are accessible in React.

- [x] Security headers (CSP, X-Frame-Options, etc.)

- [x] Rate limiting### Step 2: Update Dockerfile (if using build args)

- [x] Server signature hiding

- [x] Hidden file protection```dockerfile

- [x] Vulnerability scanning in build# In build stage, add:

- [x] Resource limitsARG REACT_APP_API_URL

- [x] Health checksARG REACT_APP_ENV



### Recommended for ProductionENV REACT_APP_API_URL=$REACT_APP_API_URL

ENV REACT_APP_ENV=$REACT_APP_ENV

- [ ] Enable HTTPS/TLS```

- [ ] Enable HSTS header (requires HTTPS)

- [ ] Set up Web Application Firewall (WAF)### Step 3: Build with arguments

- [ ] Implement DDoS protection (Cloudflare, AWS Shield)

- [ ] Use secrets management (Docker secrets, Vault)```bash

- [ ] Enable audit loggingdocker build \

- [ ] Set up intrusion detection  --build-arg REACT_APP_API_URL=https://api.your-domain.com \

- [ ] Regular security scans (Trivy, Snyk)  --build-arg REACT_APP_ENV=production \

- [ ] Penetration testing  -t my-react-app:latest .

- [ ] Security incident response plan```



------



## 📦 Image Details## Production Best Practices



### Size### Security



- **Build stage**: ~1.2GB (Node.js + dependencies)- **Use HTTPS**: Always serve your app over HTTPS in production

- **Final image**: ~40MB (Nginx Alpine + static files)- **Security headers**: Already included in nginx.conf

- **Regular updates**: Keep base images updated

### Layers- **Scan for vulnerabilities**:

  ```bash

```bash  docker scan my-react-app:latest

docker history secure-react-app:latest  ```

```

### Performance

### Scan for Vulnerabilities

- **Gzip compression**: Enabled in nginx.conf

```bash- **Static asset caching**: 1-year cache for static files

# Docker scan (requires Docker Scout)- **CDN**: Consider using a CDN for better global performance

docker scan secure-react-app:latest- **Code splitting**: React does this automatically with lazy loading



# Trivy scan### Monitoring

trivy image secure-react-app:latest

- **Health checks**: Already configured in Dockerfile

# Snyk scan- **Logging**: View logs with:

snyk container test secure-react-app:latest  ```bash

```  docker logs my-react-app

  ```

---- **Uptime monitoring**: Use tools like UptimeRobot, Pingdom

- **Error tracking**: Integrate Sentry or similar

## 🧑‍💻 Development

### Deployment

### Local Development (Without Docker)

- **Zero downtime**: Use blue-green or rolling deployments

```bash- **Automated CI/CD**: Set up GitHub Actions or GitLab CI

npm install- **Resource limits**: Add memory and CPU limits in production:

npm start  ```bash

```  docker run -d \

    --name my-react-app \

Runs on `http://localhost:3000` with hot reload.    --restart unless-stopped \

    --memory=128m \

### Development with Docker (Hot Reload)    --cpus=0.5 \

    -p 80:80 \

Create `docker-compose.dev.yml`:    my-react-app:latest

  ```

```yaml

version: '3.8'---

services:

  secure-react-app-dev:## Project Structure

    build:

      context: .```text

      dockerfile: Dockerfile.devmy-react-app/

    volumes:├── public/

      - ./src:/app/src│   ├── index.html

      - ./public:/app/public│   └── favicon.ico

    ports:├── src/

      - "3000:3000"│   ├── App.js

    environment:│   ├── App.css

      - CHOKIDAR_USEPOLLING=true│   ├── index.js

```│   └── ...

├── package.json

Run:├── package-lock.json

```bash├── Dockerfile

docker compose -f docker-compose.dev.yml up├── nginx.conf

```├── .dockerignore

├── .env.production (optional)

---├── docker-compose.yml (optional)

└── README.md

## 📚 Resources```



- [React Documentation](https://react.dev/)---

- [Nginx Security Best Practices](https://www.nginx.com/blog/nginx-security-best-practices/)

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)## Useful Commands

- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)### Development



---```bash

# Install dependencies

## 📄 Licensenpm install



This project is for demonstration and educational purposes.# Run locally

npm start

---

# Build for production

## 🤝 Contributingnpm run build



To contribute security improvements:# Run tests

npm test

1. Review current security measures```

2. Identify gaps or enhancements

3. Test changes locally### Docker

4. Submit with security justification

5. Document changes in this README```bash

# Build image

---docker build -t my-react-app:latest .



**Built with ❤️ and 🔒 Security in Mind**# Run container

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
