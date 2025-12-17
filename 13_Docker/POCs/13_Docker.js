/*

TOP 25 MOST ASKED AND MOST IMPORTANT DOCKER INTERVIEW QUESTIONS
=================================================================

1. What is Docker and what are its main benefits?
2. What is the difference between a Docker container and a virtual machine?
3. What is a Docker image and how is it different from a container?
4. Explain the Docker architecture (Docker Engine, Docker Daemon, Docker Client)
5. What is a Dockerfile and what are its main instructions (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, EXPOSE)?
6. What is the difference between CMD and ENTRYPOINT in a Dockerfile?
7. What is the difference between COPY and ADD in a Dockerfile?
8. What are Docker volumes and why are they used?
9. How do you handle persistent data in Docker containers?
10. What is Docker Compose and what is it used for?
11. What is the difference between Docker Swarm and Kubernetes?
12. What are Docker namespaces and what are they used for?
13. What command is used to view all running containers?
14. How do you stop and remove a Docker container?
15. What are multi-stage builds in Docker and why are they important?
16. How do you optimize Docker image sizes?
17. What are Docker networks and what network types does Docker support?
18. How do you secure Docker containers in production?
19. How do you handle secrets and sensitive data in Docker?
20. What are health checks in Docker and how do you implement them?
21. How do you monitor Docker containers in a production environment?
22. What is the default IP address of the Docker host?
23. How do you scale services in Docker Swarm?
24. What are restart policies in Docker and how do you use them?
25. How do you troubleshoot a failed or crashed Docker container?

* /



/*
1. What is Docker and what are its main benefits?

Docker is a containerization platform that lets you package an application with all its dependencies into a standardized, portable unit called a container. This ensures the application runs the same way across different environments (dev, staging, production). Main benefits include:
- Portability: Containers run consistently across machines and clouds.
- Lightweight: Containers share the host OS kernel, so they start fast and use fewer resources than VMs.
- Isolation: Each container has its own filesystem, processes, and network stack, isolating apps from each other.
- Scalability: Containers are easy to replicate and orchestrate for horizontal scaling.
- Dev–prod parity: The same image can be used from development all the way to production.


2. What is the difference between a Docker container and a virtual machine?

- Virtualization level:
  - Container: OS-level virtualization; shares the host OS kernel and isolates at the process level.
  - VM: Hardware-level virtualization; each VM runs its own full guest OS on top of a hypervisor.
- Resource footprint:
  - Container: Very lightweight, smaller images, low memory/CPU overhead.
  - VM: Heavier because each VM includes a full OS stack.
- Startup time:
  - Container: Starts in seconds or less (just starting processes).
  - VM: Takes longer to boot an entire OS.
- Use cases:
  - Container: Microservices, stateless services, CI/CD pipelines.
  - VM: Stronger isolation, mixed OS environments, legacy workloads needing full OS separation.


3. What is a Docker image and how is it different from a container?

- Docker image:
  - A read-only template that defines the application, its dependencies, and filesystem.
  - Built from a Dockerfile in layers (base image + additional layers).
  - Stored in registries (e.g., Docker Hub, private registries).
  - Immutable once built.
- Docker container:
  - A running (or stopped) instance created from an image.
  - Adds a thin writable layer on top of the image’s read-only layers.
  - Has its own processes, network interfaces, and filesystem view.
In short: an image is the blueprint; a container is the live or instantiated object created from that blueprint.


4. Explain the Docker architecture (Docker Engine, Docker Daemon, Docker Client).

- Docker Engine:
  - The overall client–server application used to build and run containers.
  - Consists of the Docker Daemon, the REST API, and the Docker Client.
- Docker Daemon (dockerd):
  - Background service that manages Docker objects: images, containers, networks, volumes.
  - Exposes a REST API that the client uses to request operations like build, run, stop, etc.
- Docker Client (docker CLI):
  - Command-line tool (e.g., `docker build`, `docker run`, `docker ps`) used by developers and scripts.
  - Sends commands to the daemon via the API (Unix socket or TCP).
- Registry:
  - Service for storing and distributing images (e.g., Docker Hub, ECR, GCR).
- Typical flow:
  - User runs a `docker` command → client calls daemon’s API → daemon builds/runs containers and pulls/pushes images to registries.


5. What is a Dockerfile and what are its main instructions (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, EXPOSE)?

- Dockerfile:
  - A text file containing instructions to build a Docker image step by step.
  - Each instruction adds a new layer to the image.
  - Defines base image, build steps, configuration, and default runtime behavior.

Key instructions:

- FROM:
  - Sets the base image for subsequent instructions.
  - Must be the first non-comment instruction.
  - Example: `FROM node:20-alpine`

- RUN:
  - Executes commands at build time to install packages or configure the image.
  - Each RUN creates a new image layer.
  - Example: `RUN apk add --no-cache curl`

- COPY:
  - Copies files/directories from the build context (host) into the image.
  - Does not handle URLs or archive extraction.
  - Example: `COPY package.json .`

- ADD:
  - Similar to COPY but with extra features:
    - Can unpack local tar archives.
    - Can fetch files from remote URLs (not recommended in most cases).
  - Example: `ADD app.tar.gz /app/`

- CMD:
  - Specifies the default command and/or arguments to run when a container starts.
  - Only one CMD is used (the last one in the file).
  - Can be overridden by arguments to `docker run`.
  - Example (exec form): `CMD ["node", "server.js"]`

- ENTRYPOINT:
  - Defines the main executable for the container.
  - Used to make the container behave like a single-purpose binary.
  - Often combined with CMD, where CMD provides default arguments.
  - Example: `ENTRYPOINT ["nginx", "-g"]`

- EXPOSE:
  - Documents which port(s) the container listens on at runtime.
  - Does not actually publish the port to the host; it’s metadata.
  - Example: `EXPOSE 3000`


6. What is the difference between CMD and ENTRYPOINT in a Dockerfile?

- Purpose:
  - ENTRYPOINT:
    - Defines the primary executable that always runs when the container starts.
    - Makes the container behave like a command.
  - CMD:
    - Provides default parameters to ENTRYPOINT, or a default command when ENTRYPOINT is not set.
- Override behavior:
  - ENTRYPOINT:
    - Harder to override; must use `--entrypoint` in `docker run`.
  - CMD:
    - Easily overridden by specifying a command/args at the end of `docker run`.
- Common pattern:
  - Use ENTRYPOINT for the main binary and CMD for default arguments:
    - `ENTRYPOINT ["python", "app.py"]`
    - `CMD ["--port", "8000"]`
  - Running `docker run image` executes `python app.py --port 8000`.
  - Running `docker run image --port 9000` overrides only the arguments passed to the ENTRYPOINT.


7. What is the difference between COPY and ADD in a Dockerfile?

- COPY:
  - Simple file copy from the build context to the image.
  - No magic: cannot handle URLs and does not automatically unpack archives.
  - Preferred in most scenarios because its behavior is explicit and predictable.
- ADD:
  - Superset of COPY with additional capabilities:
    - Automatically extracts local tar archives into the image.
    - Can download files from remote URLs and add them to the image.
  - These features can be convenient but reduce transparency and reproducibility.
- Best practice:
  - Use COPY by default.
  - Use ADD only when specifically needing tar extraction from local archives (not remote URLs).


8. What are Docker volumes and why are they used?

- Docker volumes:
  - Special storage mechanism managed by Docker for persisting data outside the container’s writable layer.
  - Can be created, listed, and managed via Docker commands.
  - Mounted into containers at specific paths.
- Why they are used:
  - Persistence: Container writable layers are ephemeral; volumes keep data even if containers are removed.
  - Data sharing: Volumes can be mounted into multiple containers for shared access.
  - Performance and isolation: Often faster and more reliable than bind mounts; decouple app data from container lifecycle.
  - Backup and migration: Volumes can be backed up and moved between hosts.


9. How do you handle persistent data in Docker containers?

Common approaches:

- Named volumes:
  - Create and use Docker-managed volumes:
    - `docker volume create mydata`
    - `docker run -v mydata:/var/lib/mysql mysql`
  - Data remains after container removal and can be reused by new containers.

- Bind mounts:
  - Mount a host directory into a container:
    - `docker run -v /host/path:/container/path image`
  - Useful for development (live code editing on host) or when you need direct control over storage location.

- External storage / cloud volumes:
  - Use storage plugins or orchestrator integrations to mount network or cloud storage.
  - Common in production with Swarm or Kubernetes (e.g., EBS, NFS).

- Best practices:
  - Store stateful data in volumes or external stores (databases, object storage), not in container layers.
  - Keep containers stateless so they can be easily replaced or scaled.


10. What is Docker Compose and what is it used for?

- Docker Compose:
  - A tool for defining and running multi-container applications using a YAML file (typically `docker-compose.yml` or `compose.yaml`).
  - Describes services, networks, and volumes in a declarative way.
- Common use cases:
  - Local development of multi-service apps (API, frontend, database, cache).
  - Spinning up full stacks with a single command: `docker compose up`.
  - Managing common configuration for services (environment variables, ports, volumes, restart policies).
- Key benefits:
  - Simplifies orchestration of interconnected containers (dependency ordering, shared networks).
  - Provides reproducible, version-controlled environment definitions.
  - Easy to share and onboard: one file defines the entire stack configuration.
* /



/*
11. What is the difference between Docker Swarm and Kubernetes?

- Purpose:
  - Both are container orchestration platforms used to deploy, scale, and manage containerized applications in clusters.
- Complexity and ecosystem:
  - Docker Swarm:
    - Simpler, Docker-native orchestration solution.
    - Easier to set up and use; good for small to medium workloads.
    - Tighter integration with Docker CLI and concepts.
  - Kubernetes:
    - Feature-rich, more complex, and has a larger ecosystem.
    - Industry-standard for large-scale, production-grade orchestration.
    - Offers advanced features like custom resources, operators, richer scheduling, and extensibility.
- Architecture and capabilities:
  - Docker Swarm:
    - Uses Swarm mode with managers and workers.
    - Uses Docker services and stacks; limited auto-healing and rolling update features compared to Kubernetes.
  - Kubernetes:
    - Uses control plane components (API server, scheduler, controller-manager, etcd) and worker nodes.
    - Provides built-in service discovery, sophisticated load balancing, auto-scaling, self-healing, and declarative configuration with manifests.
- Community and adoption:
  - Kubernetes has broader adoption, community support, and cloud provider integrations.
  - Swarm is less commonly used now in large-scale production setups.


12. What are Docker namespaces and what are they used for?

- Namespaces:
  - Linux kernel feature that Docker uses to provide isolation between containers and the host.
  - Each namespace gives containers their own view of system resources.
- Types commonly used by Docker:
  - PID namespace: Isolates process IDs so processes in a container only see their own processes.
  - NET namespace: Provides isolated network stack (interfaces, routing tables, ports).
  - MNT namespace: Isolates filesystem mount points.
  - UTS namespace: Isolates hostname and domain name.
  - IPC namespace: Isolates inter-process communication resources.
  - USER namespace: Maps container user IDs to different host user IDs for better security.
- Purpose:
  - Ensures that containers are logically separated, preventing them from interfering with each other or the host’s processes and resources.


13. What command is used to view all running containers?

- Basic command:
  - `docker ps`
    - Shows all running containers by default.
- To see all containers (running, stopped, exited):
  - `docker ps -a`
- Common useful flags:
  - `docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"` to customize output.
  - `docker ps -q` to list only container IDs.


14. How do you stop and remove a Docker container?

- Stop a running container:
  - `docker stop <container_id_or_name>`
    - Sends a SIGTERM, then SIGKILL if it does not exit gracefully within the timeout.
- Remove a container:
  - `docker rm <container_id_or_name>`
    - Container must be stopped or use the `-f` flag to force removal.
- Common workflows:
  - Stop and remove in two steps:
    - `docker stop my-app`
    - `docker rm my-app`
  - Force stop and remove:
    - `docker rm -f my-app`
  - Remove all stopped containers:
    - `docker container prune`


15. What are multi-stage builds in Docker and why are they important?

- Multi-stage builds:
  - A Dockerfile pattern where multiple FROM instructions define multiple “stages”.
  - Artifacts are built in earlier stages and then selectively copied into a final, minimal stage.
- Why they are important:
  - Smaller images:
    - Build tools, compilers, and dev dependencies remain only in intermediate stages and are not shipped in the final image.
  - Improved security:
    - Reduces attack surface by excluding unnecessary tools and libraries.
  - Cleaner Dockerfiles:
    - Keeps build and runtime environments clearly separated in the same file.
- Example (simplified):
  - Stage 1: build app with Node + build tools.
  - Stage 2: copy build output into a small `node:alpine` or `nginx:alpine` image for runtime.


16. How do you optimize Docker image sizes?

Common techniques:

- Use smaller base images:
  - Choose Alpine or slim variants where appropriate (e.g., `node:20-alpine`, `python:3.12-slim`).
- Minimize layers:
  - Combine related commands in a single RUN when it makes sense.
  - Clean up package caches and temp files in the same RUN step.
- Avoid unnecessary files:
  - Use `.dockerignore` to exclude logs, local caches, node_modules (if built inside), test data, and docs.
- Use multi-stage builds:
  - Build with heavier toolchains in one stage and copy only the final artifacts into a minimal runtime image.
- Remove build dependencies:
  - Install build tools only for compilation and uninstall them before the end of the relevant layer (or keep them in separate build stage).
- Use language/runtime best practices:
  - For Node.js, copy `package.json`/`package-lock.json` first, run `npm ci`, then copy source to maximize cache reuse.
  - For compiled languages, copy only binaries into the final image.


17. What are Docker networks and what network types does Docker support?

- Docker networks:
  - Logical networks managed by Docker to connect containers and control how they communicate with each other and the outside world.
  - Provide isolation, service discovery, and flexible connectivity.
- Common network drivers/types:
  - bridge:
    - Default for standalone containers.
    - Containers on the same bridge network can communicate by IP or container name.
  - host:
    - Container shares the host’s network namespace.
    - No network isolation; container uses host’s IP and ports directly.
  - none:
    - Completely disables networking for the container.
    - Only loopback interface is available.
  - overlay:
    - Used in swarm or multi-host scenarios.
    - Creates a virtual network that can span multiple Docker hosts, enabling cross-node container communication.
  - macvlan:
    - Assigns a MAC address and IP from the physical network to the container.
    - Container appears as a physical device on the network.
- Custom networks:
  - `docker network create` used to create custom bridge or overlay networks for better control and service discovery.


18. How do you secure Docker containers in production?

Key practices:

- Minimal images:
  - Use small, minimal base images and remove unnecessary packages and tools.
- Least privilege:
  - Avoid running processes as root inside containers; use non-root users where possible.
  - Limit capabilities with `--cap-drop` and `--cap-add` as needed.
- Resource limits:
  - Set CPU and memory limits with `--cpus`, `--memory` to prevent resource exhaustion attacks.
- Network security:
  - Restrict open ports and use private networks.
  - Use firewalls and security groups at the host/cloud level.
- Image provenance and scanning:
  - Use trusted base images and private registries.
  - Scan images for known vulnerabilities and keep them updated.
- Filesystem and runtime constraints:
  - Use read-only root filesystems where possible (`--read-only`).
  - Use seccomp, AppArmor, or SELinux profiles to restrict system calls and access.
- Logging and monitoring:
  - Collect container logs and metrics.
  - Set up alerts for abnormal behavior or resource usage.


19. How do you handle secrets and sensitive data in Docker?

- Avoid baking secrets into images:
  - Do not put secrets in Dockerfiles, images, or source control.
- Environment variables (with care):
  - Pass sensitive values via environment variables (`-e` or compose `environment`), but be aware they may appear in logs or process inspection.
- Docker / orchestrator secrets:
  - In Swarm:
    - Use `docker secret` to store encrypted secrets and mount them into services as files.
  - In Kubernetes:
    - Use `Secret` objects; mount them as files or environment variables.
- External secret stores:
  - Integrate with dedicated secret managers (e.g., HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager).
- File-based secrets:
  - Mount secrets from secure host paths or volumes with appropriate permissions.
- Best practices:
  - Rotate secrets regularly.
  - Restrict access to secrets using RBAC and least privilege.
  - Audit access and usage of secrets.


20. What are health checks in Docker and how do you implement them?

- Health checks:
  - Mechanism to let Docker (or an orchestrator) know whether a container is “healthy” or “unhealthy”.
  - Typically implemented via periodic commands that verify the service is responding properly.
- Implementation in Dockerfile:
  - Use the `HEALTHCHECK` instruction:
    - Example:
      - `HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost:8080/health || exit 1`
  - The command should exit with:
    - `0` for healthy.
    - Non-zero for unhealthy.
- Runtime behavior:
  - Docker tracks container health and shows it via `docker ps` and `docker inspect`.
  - Orchestrators (Swarm, Kubernetes) can use health status to restart or reschedule failing containers, or to stop routing traffic to unhealthy instances.
* /



/*
21. How do you monitor Docker containers in a production environment?

Common monitoring approaches:

- Built-in Docker commands:
  - `docker stats`: Real-time stream of container resource usage (CPU, memory, network, disk I/O).
  - `docker logs`: View container stdout/stderr logs.
  - `docker inspect`: Get detailed configuration and state information.
  - `docker ps`: Check running container status.

- Monitoring tools and platforms:
  - Prometheus + Grafana:
    - Prometheus scrapes container metrics via exporters like cAdvisor.
    - Grafana visualizes metrics in customizable dashboards.
  - cAdvisor (Container Advisor):
    - Google's open-source tool that collects container resource usage and performance metrics.
    - Can be run as a container and exposes metrics for Prometheus.
  - Datadog:
    - Commercial monitoring platform with Docker and Kubernetes integrations.
    - Provides APM, logs, metrics, and distributed tracing.
  - Dynatrace:
    - AI-powered full-stack monitoring with automatic container discovery and anomaly detection.
  - Sysdig:
    - Container-native monitoring with deep visibility into containers and system calls.
  - ELK Stack (Elasticsearch, Logstash, Kibana):
    - Centralized logging solution for aggregating and analyzing container logs.
  - Netdata:
    - Real-time performance monitoring with per-second metrics and low overhead.

- Best practices:
  - Centralize logs and metrics from all containers.
  - Set up alerts for CPU/memory thresholds, restarts, and health check failures.
  - Monitor application-level metrics alongside infrastructure metrics.
  - Use distributed tracing for microservices communication analysis.


22. What is the default IP address of the Docker host?

- Default Docker bridge network (docker0):
  - The default IP address of the docker0 bridge interface is typically `172.17.0.1`.
  - Containers connected to the default bridge network receive IPs from the `172.17.0.0/16` subnet.
- Custom networks:
  - User-defined bridge networks are assigned subnets from ranges like `172.[17-31].0.0/16` or `192.168.[0-240].0/20` that don't overlap with existing interfaces.
- Changing the default:
  - You can change the default bridge IP by modifying Docker daemon configuration (`/etc/docker/daemon.json`) and adding:
    - `{ "bip": "192.168.1.1/24" }`
  - Then restart the Docker daemon.
- Host network mode:
  - If a container uses `--network host`, it shares the host's network namespace and uses the host's actual IP address directly.


23. How do you scale services in Docker Swarm?

- Command:
  - `docker service scale <service-name>=<number-of-replicas>`
  - Example:
    - `docker service scale web=5`
    - This scales the "web" service to 5 replicas (tasks).

- Checking scaled service:
  - `docker service ps <service-name>` to see all running tasks/replicas.
  - `docker service ls` to see the number of replicas for all services.

- Automatic scaling:
  - Docker Swarm itself does not have built-in auto-scaling based on metrics.
  - You can integrate external tools or scripts that monitor metrics and call `docker service scale` commands when needed.

- Multiple services at once:
  - `docker service scale service1=3 service2=5`

- Scaling down:
  - Set replicas to 0 to stop all tasks but keep the service definition:
    - `docker service scale web=0`


24. What are restart policies in Docker and how do you use them?

- Restart policies:
  - Configure whether and when Docker should automatically restart a container after it exits.
  - Applied at container runtime with the `--restart` flag.

- Available policies:
  - `no` (default):
    - Do not automatically restart the container.
  - `on-failure[:max-retries]`:
    - Restart only if the container exits with a non-zero exit code.
    - Optionally limit the number of restart attempts.
    - Example: `--restart on-failure:5`
  - `always`:
    - Always restart the container if it stops, regardless of exit code.
    - Also restarts containers on Docker daemon startup.
  - `unless-stopped`:
    - Similar to `always`, but will not restart the container if it was manually stopped before the daemon was restarted.

- Usage examples:
  - `docker run --restart always my-image`
  - `docker run --restart on-failure:3 my-image`
  - `docker update --restart unless-stopped <container-name>`

- Best practices:
  - Use `always` or `unless-stopped` for production services that should stay running.
  - Use `on-failure` for tasks that should only retry on error, not on graceful exits.


25. How do you troubleshoot a failed or crashed Docker container?

Step-by-step troubleshooting:

- Check container status:
  - `docker ps -a` to see all containers, including stopped/exited ones.
  - Look at the STATUS column for exit codes and timestamps.

- Inspect container logs:
  - `docker logs <container-id-or-name>` to view stdout/stderr output.
  - `docker logs --tail 100 <container>` for recent logs.
  - `docker logs -f <container>` to follow logs in real-time.

- Inspect container configuration and state:
  - `docker inspect <container>` to get detailed JSON output including:
    - Exit code and error messages.
    - Environment variables, mounts, network settings.
    - Resource limits and constraints.

- Check exit code:
  - Exit code 0: Normal exit.
  - Exit code 1: Application error.
  - Exit code 137: Killed by SIGKILL (often OOM - out of memory).
  - Exit code 139: Segmentation fault.
  - Exit code 143: Terminated by SIGTERM.

- Review resource usage:
  - `docker stats <container>` to check if the container hit memory or CPU limits before crashing.
  - Check host resources (`top`, `free -h`, `df -h`) for resource exhaustion.

- Restart with interactive shell for debugging:
  - `docker run -it --entrypoint /bin/sh <image>` to manually test the startup process.
  - Or use `docker exec -it <container> /bin/sh` if it's still running intermittently.

- Check health checks:
  - `docker inspect <container>` and look at the "Health" section to see if health checks are failing.

- Review Dockerfile and configurations:
  - Verify ENTRYPOINT/CMD, environment variables, and volume mounts.
  - Check if dependencies or configuration files are missing.

- Look for application-specific errors:
  - Check application logs inside the container if they're written to files.
  - Use `docker cp` to copy log files out of stopped containers.

- Monitor events:
  - `docker events` to see real-time Docker daemon events (starts, stops, kills, OOM).

- Common fixes:
  - Increase memory/CPU limits if resource-constrained.
  - Fix missing environment variables or configuration.
  - Update the image to fix bugs or dependency issues.
  - Check network connectivity and DNS resolution if the app depends on external services.
* /



/*
Most important Docker commands
(Organized by common use case)
* /

//
// 1. Docker CLI basics
//

// Show Docker version and system info
docker --version
docker version
docker info

//
// 2. Images
//

// List images
docker images

// Pull image from registry
docker pull nginx:latest

// Build image from Dockerfile
docker build -t my-app:latest .

// Tag an image
docker tag my-app:latest my-registry.com/my-app:1.0.0

// Push image to registry
docker push my-registry.com/my-app:1.0.0

// Remove image
docker rmi my-app:latest

// Remove unused images
docker image prune
docker image prune -a    // remove all unused images

//
// 3. Containers – run & manage
//

// Run container (foreground)
docker run nginx

// Run container (detached) with name
docker run -d --name web nginx

// Map host port to container port
docker run -d -p 8080:80 nginx

// Run with environment variables
docker run -d -e NODE_ENV=production my-app

// Run with a volume
docker run -d -v mydata:/var/lib/mysql mysql

// Run interactively (shell)
docker run -it ubuntu bash

// List running containers
docker ps

// List all containers (including stopped)
docker ps -a

// Stop a container
docker stop web

// Start a stopped container
docker start web

// Restart a container
docker restart web

// Remove a container
docker rm web

// Force remove (stop + remove)
docker rm -f web

// Remove all stopped containers
docker container prune

//
// 4. Logs & debugging
//

// View container logs
docker logs web

// Follow logs (stream)
docker logs -f web

// Execute command inside running container
docker exec -it web bash
docker exec -it web sh

// Inspect container details (JSON)
docker inspect web

// Show resource usage (top-like)
docker stats
docker stats web

//
// 5. Volumes
//

// List volumes
docker volume ls

// Create volume
docker volume create mydata

// Inspect volume
docker volume inspect mydata

// Remove volume
docker volume rm mydata

// Remove unused volumes
docker volume prune

//
// 6. Networks
//

// List networks
docker network ls

// Create network
docker network create my-network

// Inspect network
docker network inspect my-network

// Connect container to network
docker network connect my-network web

// Disconnect container from network
docker network disconnect my-network web

// Remove network
docker network rm my-network

//
// 7. Docker Compose (v2 syntax: `docker compose`)
//

// Start services (foreground logs)
docker compose up

// Start services (detached)
docker compose up -d

// Stop services
docker compose down

// Rebuild images and start
docker compose up --build

// View service logs
docker compose logs
docker compose logs -f api

// List services and containers
docker compose ps

//
// 8. Docker Swarm (orchestration)
//

// Initialize swarm
docker swarm init

// Join swarm (run on worker nodes with token)
docker swarm join --token <token> <manager-ip>:2377

// Create a service
docker service create --name web --replicas 3 -p 80:80 nginx

// List services
docker service ls

// Inspect service
docker service inspect web

// List tasks/replicas of a service
docker service ps web

// Scale a service
docker service scale web=5

// Update a service (e.g., image)
docker service update --image nginx:1.27 web

// Remove service
docker service rm web

//
// 9. System cleanup
//

// Remove unused data (dangling images, stopped containers, networks, cache)
docker system prune

// More aggressive prune (including unused images and volumes)
docker system prune -a --volumes

//
// 10. Misc / helpful
//

// Save image to tar
docker save -o my-app.tar my-app:latest

// Load image from tar
docker load -i my-app.tar

// Copy files from container
docker cp web:/app/logs ./logs

// Copy files into container
docker cp ./config.json web:/app/config.json

*/

