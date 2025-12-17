# Docker Node.js Hello World App

A simple Node.js Hello World application containerized with Docker and pushed to Docker Hub.

## Prerequisites

- Node.js installed on your system
- Docker installed on your system
- Docker Hub account

## Project Setup

### Step 1: Create the Node.js Application

Create a new directory and initialize the project:

```bash
mkdir hello-world-node
cd hello-world-node
npm init -y
```

### Step 2: Install Dependencies

Install Express:

```bash
npm install express
```

### Step 3: Create the Application

Create `index.js` with the following code:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Docker!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Dockerization

### Step 4: Create Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
# Use official Node.js image as base
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
```

### Step 5: Create .dockerignore

Create `.dockerignore` to exclude unnecessary files:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
```

## Building and Testing

### Step 6: Build Docker Image

Build the Docker image:

```bash
docker build -t hello-world-node .
```

Verify the image was created:

```bash
docker images
```

### Step 7: Test Locally

Run the container:

```bash
docker run -p 3000:3000 hello-world-node
```

Or run in detached mode (background):

```bash
docker run -d -p 3000:3000 --name my-hello-app hello-world-node
```

Test the application by visiting: `http://localhost:3000`

You should see: **Hello World from Docker!**

### Useful Docker Commands

Check running containers:

```bash
docker ps
```

View container logs:

```bash
docker logs my-hello-app
```

Stop the container:

```bash
docker stop my-hello-app
```

Remove the container:

```bash
docker rm my-hello-app
```

## Publishing to Docker Hub

### Step 8: Login to Docker Hub

```bash
docker login
```

Enter your Docker Hub username and password when prompted.

### Step 9: Tag the Image

Tag your image with your Docker Hub username:

```bash
docker tag hello-world-node <your-dockerhub-username>/hello-world-node:v1
```

### Step 10: Push to Docker Hub

Push the image to Docker Hub:

```bash
docker push <your-dockerhub-username>/hello-world-node:v1
```

### Step 11: Verify on Docker Hub

Visit your Docker Hub repository at:
```
https://hub.docker.com/r/<your-username>/hello-world-node
```

## Running from Docker Hub

Anyone can now pull and run your image:

```bash
docker pull <your-dockerhub-username>/hello-world-node:v1
docker run -p 3000:3000 <your-dockerhub-username>/hello-world-node:v1
```

## Project Structure

```
hello-world-node/
├── index.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
└── README.md
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can map to a different port:

```bash
docker run -p 8080:3000 hello-world-node
```

Then access at `http://localhost:8080`

### Image Build Fails

Make sure you're in the correct directory with the Dockerfile and all files are present.

### Cannot Push to Docker Hub

Ensure you're logged in with `docker login` and the image is properly tagged with your username.

## License

MIT

## Author

Sudhanshu Ranjan