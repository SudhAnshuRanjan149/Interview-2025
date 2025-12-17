# ============================================================
# Dockerfile for Hello World Node.js Application
# ============================================================
# This is a basic Dockerfile for learning and simple deployments
# Uses single-stage build with Node.js 18

# Base Image: Official Node.js 18 image from Docker Hub
# This image includes Node.js, npm, and essential build tools
FROM node:18

# Set Working Directory
# All subsequent commands will run in this directory inside the container
# Creates /app directory if it doesn't exist
WORKDIR /app

# Copy Package Files
# Copy package.json and package-lock.json first for better layer caching
# Docker caches layers, so if package files don't change, npm install is skipped
# The wildcard (*) matches both package.json and package-lock.json if it exists
COPY package*.json ./

# Install Dependencies
# Installs all dependencies defined in package.json
# Runs inside the container during build time
# Uses package-lock.json for deterministic builds
RUN npm install

# Copy Application Code
# Copies all remaining application files to the container
# Done after npm install to leverage Docker layer caching
# If code changes but dependencies don't, npm install layer is reused
COPY . .

# Expose Port
# Documents that the container listens on port 3000
# This is informational only - actual port mapping happens in docker-compose.yml
# Helps other developers understand which port the app uses
EXPOSE 3000

# Start Command
# Defines the command to run when container starts
# CMD can be overridden at runtime, ENTRYPOINT cannot
# Runs the Node.js application using the main entry file
CMD ["node", "index.js"]
