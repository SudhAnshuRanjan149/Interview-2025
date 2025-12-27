# Podman Interview Questions & Commands Guide

## TOP 25 MOST ASKED AND IMPORTANT PODMAN INTERVIEW QUESTIONS

1. [What is Podman and how does it differ from Docker?](#1-what-is-podman-and-how-does-it-differ-from-docker)
2. [Explain the daemonless architecture of Podman and its advantages.](#2-explain-the-daemonless-architecture-of-podman-and-its-advantages)
3. [What is the difference between rootless and rootful containers in Podman?](#3-what-is-the-difference-between-rootless-and-rootful-containers-in-podman)
4. [How do you run containers with Podman? Explain basic commands (run, ps, stop, rm).](#4-how-do-you-run-containers-with-podman-explain-basic-commands-run-ps-stop-rm)
5. [What are Podman pods and how do they relate to Kubernetes pods?](#5-what-are-podman-pods-and-how-do-they-relate-to-kubernetes-pods)
6. [How do you build container images with Podman (buildah integration)?](#6-how-do-you-build-container-images-with-podman-buildah-integration)
7. [Explain how Podman handles container networking (bridge, host, slirp4netns).](#7-explain-how-podman-handles-container-networking-bridge-host-slirp4netns)
8. [What is the difference between Podman and Buildah?](#8-what-is-the-difference-between-podman-and-buildah)
9. [How do you migrate from Docker to Podman? What compatibility features exist?](#9-how-do-you-migrate-from-docker-to-podman-what-compatibility-features-exist)
10. [Explain Podman's rootless mode and how it enhances security.](#10-explain-podmans-rootless-mode-and-how-it-enhances-security)
11. [How do you manage volumes and persistent storage in Podman?](#11-how-do-you-manage-volumes-and-persistent-storage-in-podman)
12. [What is podman-compose and how does it compare to docker-compose?](#12-what-is-podman-compose-and-how-does-it-compare-to-docker-compose)
13. [How do you generate Kubernetes YAML files from Podman containers/pods?](#13-how-do-you-generate-kubernetes-yaml-files-from-podman-containerspods)
14. [Explain Podman's integration with systemd for managing containers as services.](#14-explain-podmans-integration-with-systemd-for-managing-containers-as-services)
15. [What are the security advantages of using Podman over Docker?](#15-what-are-the-security-advantages-of-using-podman-over-docker)
16. [How do you handle container images in Podman (pull, push, tag, inspect)?](#16-how-do-you-handle-container-images-in-podman-pull-push-tag-inspect)
17. [What is the difference between OCI-compliant runtimes (runc, crun) used by Podman?](#17-what-is-the-difference-between-oci-compliant-runtimes-runc-crun-used-by-podman)
18. [How do you troubleshoot networking issues in rootless Podman containers?](#18-how-do-you-troubleshoot-networking-issues-in-rootless-podman-containers)
19. [Explain Podman's support for running containers in pods vs individual containers.](#19-explain-podmans-support-for-running-containers-in-pods-vs-individual-containers)
20. [How do you implement CI/CD pipelines with Podman?](#20-how-do-you-implement-cicd-pipelines-with-podman)
21. [What is Podman Machine and when would you use it (especially on macOS/Windows)?](#21-what-is-podman-machine-and-when-would-you-use-it-especially-on-macoswindows)
22. [How do you manage secrets and sensitive data in Podman?](#22-how-do-you-manage-secrets-and-sensitive-data-in-podman)
23. [Explain Podman's checkpoint and restore functionality for container migration.](#23-explain-podmans-checkpoint-and-restore-functionality-for-container-migration)
24. [How do you monitor and log Podman containers?](#24-how-do-you-monitor-and-log-podman-containers)
25. [What are the performance considerations when using Podman vs Docker?](#25-what-are-the-performance-considerations-when-using-podman-vs-docker)

---

## Detailed Answers

---

### 1. What is Podman and how does it differ from Docker?

Podman (Pod Manager) is an open-source, daemonless container engine developed by Red Hat for developing, managing, and running OCI (Open Container Initiative) containers and pods. It provides a Docker-compatible command-line interface and can run containers without requiring root privileges.

**Key differences from Docker:**

**Architecture:**
- **Podman**: Daemonless, containers run as child processes of Podman CLI
- **Docker**: Client-server with Docker daemon running as background service

**Security:**
- **Podman**: Supports rootless containers by default, no single point of failure
- **Docker**: Traditionally requires root access, daemon runs as root

**Pods support:**
- **Podman**: Native pod concept similar to Kubernetes
- **Docker**: No native pod support

**Systemd integration:**
- **Podman**: Built-in systemd integration for managing containers as services
- **Docker**: Requires additional configuration

**Process model:**
- **Podman**: Direct fork-exec model, easier debugging
- **Docker**: All containers are children of daemon process

---

### 2. Explain the daemonless architecture of Podman and its advantages.

**Daemonless Architecture:**
- Podman operates without a central daemon process
- Each Podman command runs as an independent process
- Containers are direct children of the Podman process that started them
- When you run "podman run", it forks and execs the container runtime (runc/crun) directly

**Advantages:**

**Security:**
- No single point of failure or privilege escalation
- Eliminates daemon as attack surface
- Process isolation at OS level

**Simplicity:**
- No background service to manage or maintain
- Easier troubleshooting and debugging
- Direct parent-child process relationship

**Resource efficiency:**
- No daemon consuming resources when idle
- Lower memory footprint

**Flexibility:**
- Can run as regular user without system-wide daemon
- Better suited for CI/CD environments
- No daemon socket to secure

---

### 3. What is the difference between rootless and rootful containers in Podman?

**Rootless Containers:**
- Run without root privileges on the host
- Container processes run under the user's UID
- User namespaces map container root to unprivileged host user
- Default and recommended mode in Podman
- Enhanced security: Even if container compromised, attacker cannot gain root on host

**Limitations:**
- Cannot bind to privileged ports (<1024) directly
- Limited access to host resources
- Some storage drivers unavailable (uses fuse-overlayfs)
- Network limitations (uses slirp4netns by default)

**Rootful Containers:**
- Run with root privileges (requires sudo/root)
- Full access to host resources
- Can bind to privileged ports
- Similar behavior to Docker

**Use cases:**
- When privileged operations required
- Legacy applications needing full system access
- When performance is critical (native networking)

**Best Practice:**
- Use rootless by default for security
- Switch to rootful only when necessary

---

### 4. How do you run containers with Podman? Explain basic commands (run, ps, stop, rm).

**Basic Podman Commands (Docker-compatible):**

**podman run:** Create and start container
```bash
podman run -d --name webserver -p 8080:80 nginx
```

**Options:**
- `-d`: detached mode (background)
- `--name`: assign name
- `-p`: port mapping (host:container)
- `-v`: volume mount
- `-e`: environment variables
- `--rm`: auto-remove when stopped

**podman ps:** List running containers
```bash
podman ps              # running containers
podman ps -a           # all containers (including stopped)
podman ps --format json
```

**podman stop:** Stop running container
```bash
podman stop webserver
podman stop <container_id>
podman stop $(podman ps -q)  # stop all
```

**podman rm:** Remove container
```bash
podman rm webserver
podman rm -f webserver  # force remove running container
podman rm $(podman ps -aq)  # remove all
```

**Other essential commands:**
```bash
podman start <container>    # start stopped container
podman restart <container>  # restart container
podman logs <container>     # view logs
podman exec -it <container> bash  # execute command inside
podman inspect <container>  # detailed info
podman kill <container>     # forcefully stop
```

**Alias for Docker compatibility:**
```bash
alias docker=podman
```

---

### 5. What are Podman pods and how do they relate to Kubernetes pods?

**Podman Pods:**
- A pod is a group of one or more containers sharing the same network namespace, IPC, and optionally PID namespace
- Containers in a pod can communicate via localhost
- Similar to Kubernetes pod concept
- Each pod has an "infra" container (pause container) that holds namespaces

**Creating and Managing Pods:**
```bash
# Create pod
podman pod create --name mypod -p 8080:80

# Add containers to pod
podman run -d --pod mypod nginx
podman run -d --pod mypod redis

# List pods
podman pod ps

# Inspect pod
podman pod inspect mypod

# Stop/start pod
podman pod stop mypod
podman pod start mypod

# Remove pod (removes all containers)
podman pod rm mypod
```

**Relationship to Kubernetes:**
- Direct mapping: Podman pods mirror Kubernetes pod semantics
- Shared network: Containers communicate via localhost
- Port mapping: Defined at pod level
- Lifecycle: Pod controls all container lifecycles
- Testing: Local Kubernetes pod behavior without cluster
- Generation: Can export pods to Kubernetes YAML

---

### 6. How do you build container images with Podman (buildah integration)?

**Image Building with Podman:**

**podman build:** Build from Dockerfile (uses buildah internally)
```bash
podman build -t myapp:latest .
podman build -f Dockerfile.prod -t myapp:prod .
podman build --build-arg VERSION=1.0 -t myapp:1.0 .
```

**Buildah Integration:**
- Podman uses buildah libraries for building
- Can use buildah directly for more advanced builds
- Buildah provides scripted builds without Dockerfile

**Building with Buildah (direct):**
```bash
# Script-based build
buildah from nginx
buildah copy nginx-container /src /app
buildah config --cmd '/app/start.sh' nginx-container
buildah commit nginx-container myapp
```

**Multi-stage builds:**
```dockerfile
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

FROM alpine:latest
COPY --from=builder /app/myapp /usr/local/bin/
CMD ["/usr/local/bin/myapp"]
```

**Podman build features:**
- OCI-compliant images
- Layer caching
- Multi-stage builds
- Build contexts from URL or Git
- Platform-specific builds (--platform)

**Difference:**
- **Podman**: High-level, Dockerfile-focused
- **Buildah**: Low-level, scriptable, more control

---

### 7. Explain how Podman handles container networking (bridge, host, slirp4netns).

**Podman Networking Modes:**

**Rootless (slirp4netns - default for rootless):**
- User-mode networking without root privileges
- NAT-based networking via slirp4netns
- Cannot bind to privileged ports (<1024) on host
- Slower than native networking
```bash
podman run --network slirp4netns nginx
```

**Bridge (default for rootful):**
- Virtual bridge network connecting containers
- Containers get private IPs on bridge subnet
- Port forwarding for host access
```bash
podman run --network bridge nginx
```

**Host:**
- Container shares host's network namespace
- No network isolation
- Container binds directly to host ports
- Better performance, reduced security
```bash
podman run --network host nginx
```

**None:**
- No networking, isolated
```bash
podman run --network none nginx
```

**Custom networks:**
```bash
podman network create mynet
podman run --network mynet container1
podman run --network mynet container2
```

**Pod networking:**
- All containers in pod share network namespace
- Communicate via localhost within pod

**Rootless limitations:**
- Cannot use bridge mode without root
- Port mapping handled by rootlessport
- Performance trade-off for security

---

### 8. What is the difference between Podman and Buildah?

**Podman vs Buildah:**

**Podman (Pod Manager):**
- Focuses on running and managing containers
- Provides Docker-compatible CLI
- Manages container lifecycle (run, stop, rm)
- Supports pods (multi-container groups)
- User-friendly for daily container operations
- Uses buildah internally for building images

**Buildah:**
- Specialized for building OCI container images
- Low-level, scriptable image building
- Can build without Dockerfile (imperative scripts)
- More flexibility and control
- Designed for CI/CD pipelines
- No container runtime functionality

**Key Differences:**

**Purpose:**
- **Podman**: Container runtime and management
- **Buildah**: Image building and manipulation

**Use cases:**
- **Podman**: Running applications, development, testing
- **Buildah**: Building images in CI/CD, custom builds

**Complexity:**
- **Podman**: User-friendly, Docker-like
- **Buildah**: More technical, script-oriented

**Complementary tools:**
- Use Podman for: `podman run`, `podman ps`, `podman exec`
- Use Buildah for: Advanced builds, layerless builds, script-based construction

Both are part of the same ecosystem and share libraries.

---

### 9. How do you migrate from Docker to Podman? What compatibility features exist?

**Migration Strategies:**

**Command Compatibility:**
- Podman supports most Docker CLI commands
- Drop-in replacement: `alias docker=podman`
- Compatible commands: run, ps, images, pull, push, build, exec, logs, inspect, rm, rmi, start, stop, restart, kill

**Docker Compose Compatibility:**
- Use podman-compose (community tool)
```bash
# Install
pip install podman-compose

# Usage
podman-compose up -d
```
- Alternative: Podman 4.0+ has "podman compose" (experimental)

**Docker API Emulation:**
- Podman can emulate Docker socket
```bash
# Enable
systemctl --user enable podman.socket

# Set environment
export DOCKER_HOST=unix:///run/user/$UID/podman/podman.sock
```
- Tools expecting Docker API can use Podman

**Image Compatibility:**
- OCI-compliant images work with both
```bash
# Pull from Docker Hub
podman pull docker.io/nginx
```
- Existing Docker images run without modification

**Migration Steps:**
1. Install Podman
2. Export Docker containers (if needed):
   ```bash
   docker export container > container.tar
   ```
3. Import to Podman:
   ```bash
   podman import container.tar myimage
   ```
4. Update scripts: Replace docker with podman
5. Test in parallel before removing Docker
6. Migrate docker-compose.yml to podman-compose

**Differences to note:**
- No daemon (remove daemon-related configs)
- Rootless by default (check permission requirements)
- Pod support (consider refactoring to pods)

---

### 10. Explain Podman's rootless mode and how it enhances security.

**Rootless Mode Security:**

**What is Rootless Mode:**
- Containers run under regular user privileges
- No root access required on host
- User namespaces remap container root to unprivileged host user
- Default mode in modern Podman installations

**Security Enhancements:**

**Attack surface reduction:**
- Compromised container cannot gain root on host
- No privilege escalation paths
- Container escape doesn't grant system access

**Isolation:**
- Each user's containers isolated from others
- Multi-tenant systems more secure
- Process-level separation

**No daemon exposure:**
- No privileged daemon socket to attack
- No single point of failure

**Compliance:**
- Meets security policies requiring non-root
- Easier to pass audits
- Aligns with least-privilege principle

**Implementation:**
- User namespaces: UID/GID mapping
  - Container UID 0 maps to host UID 1000 (example)
  - /etc/subuid and /etc/subgid define ranges
- Unprivileged user can manage own containers
- cgroups v2 for resource management

**Enabling rootless (usually default):**
```bash
podman run --user $(id -u):$(id -g) nginx
# Or simply: podman run nginx (rootless by default)
```

**Best practice:** Always use rootless unless specific requirements demand rootful.

---

### 11. How do you manage volumes and persistent storage in Podman?

**Volume Management:**

**Named Volumes:**
```bash
# Create volume
podman volume create myvolume

# Use volume
podman run -v myvolume:/data nginx

# List volumes
podman volume ls

# Inspect volume
podman volume inspect myvolume

# Remove volume
podman volume rm myvolume

# Prune unused volumes
podman volume prune
```

**Bind Mounts:**
```bash
# Mount host directory
podman run -v /host/path:/container/path:Z nginx

# Read-only mount
podman run -v /host/path:/container/path:ro nginx

# SELinux label (Z for private, z for shared)
podman run -v /host/path:/data:Z nginx
```

**tmpfs Mounts (memory):**
```bash
podman run --tmpfs /tmp nginx
```

**Volume Drivers:**
- local (default)
- Various third-party drivers

**Rootless Considerations:**
- Volumes stored in user's home directory
- Location: `~/.local/share/containers/storage/volumes/`
- Bind mounts: Must have user access to host paths
- SELinux: Use `:Z` or `:z` flags for proper labeling

**Best Practices:**
- Use named volumes for portability
- Bind mounts for development (live code changes)
- Set appropriate permissions
- Backup volumes regularly

---

### 12. What is podman-compose and how does it compare to docker-compose?

**podman-compose:**

**Definition:**
- Community-developed tool for running multi-container applications
- Implements docker-compose functionality for Podman
- Written in Python, separate from Podman core

**Installation:**
```bash
pip install podman-compose
# or
pip3 install podman-compose
```

**Usage (similar to docker-compose):**
```bash
# Start services
podman-compose up -d

# Stop services
podman-compose down

# View logs
podman-compose logs

# List containers
podman-compose ps
```

**docker-compose.yml compatibility:**
```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
```

**Comparison with docker-compose:**

**Syntax:** Compatible with docker-compose.yml files

**Features:** Supports most docker-compose features

**Differences:**
- Some advanced features may not work
- Uses Podman pods internally (optionally)
- No daemon dependency
- Rootless by default

**Limitations:**
- Less mature than docker-compose
- Some edge cases not supported
- Community-maintained, not official

**Alternative:**
- Podman 4.0+: Built-in "podman compose" (experimental)
- Use `podman kube` for Kubernetes YAML workflow

---

### 13. How do you generate Kubernetes YAML files from Podman containers/pods?

**Kubernetes YAML Generation:**

**Generate from Pod:**
```bash
# Create pod and containers
podman pod create --name myweb -p 8080:80
podman run -d --pod myweb nginx
podman run -d --pod myweb redis

# Generate Kubernetes YAML
podman generate kube myweb > myweb.yaml
# Result: Kubernetes Pod manifest with all containers
```

**Generate from Container:**
```bash
podman run -d --name myapp -p 8080:80 nginx
podman generate kube myapp > myapp.yaml
# Creates Pod with single container
```

**Generated YAML structure:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myweb
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80
      hostPort: 8080
  - name: redis
    image: redis:latest
```

**Play Kubernetes YAML (reverse):**
```bash
# Deploy YAML to Podman
podman play kube myweb.yaml
# Creates pod and containers from manifest
```

**Use Cases:**
- Local Kubernetes development and testing
- Generate manifests for deployment
- Migrate from Podman to Kubernetes
- CI/CD: Test locally, deploy to K8s
- Documentation and versioning

**Benefits:**
- Seamless local-to-cluster workflow
- Test Kubernetes configs without cluster
- Export development setup to production

---

### 14. Explain Podman's integration with systemd for managing containers as services.

**Systemd Integration:**

**Generate systemd Unit Files:**
```bash
# From container
podman generate systemd --name myapp > /etc/systemd/system/myapp.service

# From pod
podman generate systemd --name mypod --files

# With automatic restart
podman generate systemd --name myapp --restart-policy=always

# With new flag (creates container if not exists)
podman generate systemd --new --name myapp
```

**Generated Service File Example:**
```ini
[Unit]
Description=Podman container-myapp.service

[Service]
Restart=on-failure
ExecStart=/usr/bin/podman start myapp
ExecStop=/usr/bin/podman stop -t 10 myapp

[Install]
WantedBy=multi-user.target
```

**Managing Container as Service:**
```bash
# Enable service (start on boot)
systemctl enable myapp.service

# Start service
systemctl start myapp.service

# Check status
systemctl status myapp.service

# View logs
journalctl -u myapp.service

# Stop service
systemctl stop myapp.service
```

**Rootless Services (user mode):**
```bash
# Generate for user
podman generate systemd --new --name myapp > ~/.config/systemd/user/myapp.service

# Reload and enable
systemctl --user daemon-reload
systemctl --user enable myapp.service
systemctl --user start myapp.service

# Enable linger (start at boot without login)
loginctl enable-linger $USER
```

**Benefits:**
- Container lifecycle managed by systemd
- Automatic restarts on failure
- Start on boot
- Integration with system monitoring
- Centralized logging via journald

---

### 15. What are the security advantages of using Podman over Docker?

**Security Advantages:**

**Daemonless Architecture:**
- No privileged daemon running as root
- Eliminates daemon as single point of failure
- No daemon socket to secure or attack
- Reduced attack surface

**Rootless by Default:**
- Containers run without root privileges
- User namespace isolation
- Compromised container cannot escalate to root
- Better multi-tenant security

**Fork-Exec Model:**
- Direct process hierarchy
- Container processes owned by user
- Easier to track and audit
- Clear privilege boundaries

**SELinux Integration:**
- Better SELinux support for rootless
- Automatic labeling with `:Z` and `:z` flags
- Enhanced mandatory access control

**No Privileged Socket:**
- Docker socket (/var/run/docker.sock) often has security issues
- Mounting Docker socket = root access
- Podman has no equivalent vulnerability

**Audit and Compliance:**
- Easier to meet security requirements
- Non-root by default aligns with policies
- Better isolation in regulated environments
- Simpler security model to audit

**Resource Isolation:**
- cgroups v2 for better resource management
- User-level resource limits
- No shared daemon resources

**Security Best Practices:**
- Use rootless mode by default
- Enable SELinux
- Limit capabilities
- Use read-only containers where possible
- Regular security updates

---

### 16. How do you handle container images in Podman (pull, push, tag, inspect)?

**Image Management:**

**Pull Images:**
```bash
# From Docker Hub
podman pull nginx
podman pull docker.io/library/nginx:latest

# From other registries
podman pull quay.io/podman/hello
podman pull gcr.io/project/image:tag

# With authentication
podman login docker.io
podman pull private/image
```

**Push Images:**
```bash
# Tag image
podman tag myapp:latest docker.io/username/myapp:latest

# Push to registry
podman push docker.io/username/myapp:latest

# Push to local registry
podman push myapp:latest localhost:5000/myapp:latest
```

**Tag Images:**
```bash
podman tag nginx:latest mynginx:v1
podman tag image-id newname:newtag
```

**List Images:**
```bash
podman images
podman images --format json
podman images --filter dangling=true
```

**Inspect Images:**
```bash
podman inspect nginx:latest
podman inspect --format='{{.Config.Cmd}}' nginx

# Image history
podman history nginx
```

**Remove Images:**
```bash
podman rmi nginx:latest
podman rmi -f image-id
podman image prune  # remove unused
podman image prune -a  # remove all unused
```

**Save/Load Images:**
```bash
# Save to tar
podman save -o nginx.tar nginx:latest

# Load from tar
podman load -i nginx.tar

# Export/Import (for containers)
podman export container > container.tar
podman import container.tar newimage:tag
```

**Search Images:**
```bash
podman search nginx
podman search --filter=stars=100 nginx
```

---

### 17. What is the difference between OCI-compliant runtimes (runc, crun) used by Podman?

**OCI Runtimes:**

**runc:**
- Reference implementation of OCI runtime spec
- Written in Go
- Default runtime for Docker and early Podman
- Mature, stable, widely used
- Heavier due to Go runtime

**crun:**
- Alternative OCI runtime written in C
- Default in newer Podman versions
- Faster startup times
- Lower memory footprint
- Better suited for rootless containers
- Fully OCI-compliant

**Performance Comparison:**
- **crun**: ~2x faster container startup
- **crun**: ~30% less memory usage
- **crun**: Better for high-density container deployments

**Configuration:**
```bash
# Check current runtime
podman info | grep -i runtime

# Use specific runtime
podman --runtime crun run nginx
podman --runtime runc run nginx

# Set default in containers.conf
[engine]
runtime = "crun"
```

**Other OCI Runtimes:**
- **kata-runtime**: VM-based isolation
- **gVisor (runsc)**: Userspace kernel
- **youki**: Rust-based runtime

**When to use:**
- **crun**: Default choice, better performance
- **runc**: If compatibility issues with crun
- **kata/gVisor**: Enhanced security/isolation needs

Podman automatically selects best available runtime.

---

### 18. How do you troubleshoot networking issues in rootless Podman containers?

**Troubleshooting Rootless Networking:**

**Common Issues:**
- Cannot bind to privileged ports (<1024)
- Slow network performance (slirp4netns)
- Container cannot reach host or internet
- Port forwarding not working

**Diagnostic Commands:**
```bash
# Check network mode
podman inspect container | grep -i network

# List networks
podman network ls

# Inspect network
podman network inspect podman

# Check container IP
podman inspect -f '{{.NetworkSettings.IPAddress}}' container

# Test connectivity inside container
podman exec container ping google.com
podman exec container curl http://example.com
```

**Solutions:**

**Privileged Port Binding:**
```bash
# Problem: Cannot bind to port 80
# Solutions:

# Use port >= 1024
podman run -p 8080:80 nginx

# Map to unprivileged port
podman run -p 3000:80 nginx

# Use rootful (not recommended)
sudo podman run -p 80:80 nginx
```

**Performance Issues:**
```bash
# Problem: Slow network with slirp4netns
# Solutions:

# Enable pasta (newer, faster alternative)
podman run --network pasta nginx

# Use rootful mode for native performance
sudo podman run --network bridge nginx
```

**Connectivity Issues:**
```bash
# Check slirp4netns process
ps aux | grep slirp4netns

# Check firewall rules
sudo firewall-cmd --list-all

# Check DNS
podman exec container cat /etc/resolv.conf

# Set custom DNS
podman run --dns 8.8.8.8 nginx
```

**Container-to-Container Communication:**
```bash
# Use custom network
podman network create mynet
podman run --network mynet --name app1 nginx
podman run --network mynet --name app2 alpine ping app1

# Or use pods (shared network namespace)
podman pod create --name mypod
podman run --pod mypod nginx
podman run --pod mypod redis
```

**Port Forwarding Issues:**
```bash
# Check rootlessport process
ps aux | grep rootlessport

# Verify port mapping
podman port container

# Test from host
curl localhost:8080
```

**Debug Mode:**
```bash
podman --log-level debug run nginx
```

---

### 19. Explain Podman's support for running containers in pods vs individual containers.

**Pods vs Individual Containers:**

**Individual Containers:**
- Standalone container with own namespaces
- Independent network, IPC, PID spaces
- Simple single-application deployments
- Direct port mapping to host

**Usage:**
```bash
podman run -d -p 8080:80 --name web nginx
```

**Pods:**
- Group of containers sharing namespaces
- Kubernetes-like concept
- Shared network namespace (localhost communication)
- Shared IPC namespace
- Optional shared PID namespace
- Infra container manages shared namespaces

**Creating Pods:**
```bash
# Create pod
podman pod create --name myapp -p 8080:80

# Add containers
podman run -d --pod myapp nginx
podman run -d --pod myapp redis
podman run -d --pod myapp --name helper busybox sleep 1000

# Containers communicate via localhost
podman exec helper wget http://localhost:80
```

**Pod Advantages:**
- Kubernetes compatibility: Test K8s pods locally
- Simplified networking: No custom networks needed
- Shared resources: Containers share volumes, network
- Lifecycle management: Single unit control
- Port mapping: Defined once at pod level

**Pod Operations:**
```bash
# List pods
podman pod ps

# Inspect pod
podman pod inspect myapp

# Stop pod (stops all containers)
podman pod stop myapp

# Start pod
podman pod start myapp

# Remove pod
podman pod rm myapp

# Pod logs
podman pod logs myapp
```

**When to Use:**
- **Pods**: Multi-container apps, microservices, K8s migration
- **Individual**: Simple single-container apps, isolation needed

---

### 20. How do you implement CI/CD pipelines with Podman?

**CI/CD with Podman:**

**Benefits for CI/CD:**
- Daemonless: No daemon to manage in CI environment
- Rootless: Secure execution without privileges
- Docker-compatible: Easy migration from Docker
- Lightweight: Lower resource footprint
- Systemd integration: Service management

**Implementation Examples:**

**GitLab CI (.gitlab-ci.yml):**
```yaml
build:
  image: quay.io/podman/stable
  script:
    - podman build -t myapp:$CI_COMMIT_SHA .
    - podman push myapp:$CI_COMMIT_SHA registry.example.com/myapp
  tags:
    - podman
```

**GitHub Actions (.github/workflows/build.yml):**
```yaml
name: Build with Podman
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install Podman
        run: |
          sudo apt-get update
          sudo apt-get -y install podman
      - name: Build image
        run: podman build -t myapp .
      - name: Run tests
        run: podman run myapp pytest
```

**Jenkins Pipeline:**
```groovy
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'podman build -t myapp:${BUILD_NUMBER} .'
      }
    }
    stage('Test') {
      steps {
        sh 'podman run myapp:${BUILD_NUMBER} npm test'
      }
    }
    stage('Push') {
      steps {
        sh 'podman push myapp:${BUILD_NUMBER} registry.io/myapp'
      }
    }
  }
}
```

**Best Practices:**
- Use rootless mode in CI for security
- Cache layers for faster builds
- Use `podman image prune` to cleanup
- Implement multi-stage builds
- Store registry credentials securely
- Tag images with commit SHA or build number

**Podman in Kubernetes CI/CD:**
```bash
# Build and generate K8s manifest
podman build -t myapp .
podman generate kube myapp > k8s-manifest.yaml
kubectl apply -f k8s-manifest.yaml
```

---

### 21. What is Podman Machine and when would you use it (especially on macOS/Windows)?

**Podman Machine:**

**Definition:**
- Virtual machine management for running Podman on non-Linux systems
- Creates and manages lightweight VMs for container execution
- Similar to Docker Desktop's VM approach

**Why Needed:**
- Linux containers require Linux kernel
- macOS and Windows lack native container support
- Podman Machine provides Linux environment

**Usage:**

**Initialize and Start:**
```bash
# Create VM
podman machine init

# Start VM
podman machine start

# Check status
podman machine list

# SSH into VM
podman machine ssh

# Stop VM
podman machine stop

# Remove VM
podman machine rm
```

**Configuration:**
```bash
# Custom resources
podman machine init --cpus 4 --memory 8192 --disk-size 50

# Custom name
podman machine init myvm
podman machine start myvm
```

**Features:**
- Automatic volume mounting
- Port forwarding from host
- Seamless podman CLI integration
- Resource management (CPU, RAM, disk)

**Supported Platforms:**
- **macOS**: Uses QEMU or Apple Hypervisor
- **Windows**: Uses WSL2 or Hyper-V
- **Linux**: Not needed (native containers)

**When to Use:**
- Developing on macOS/Windows
- Need Podman without Docker Desktop
- Cross-platform development teams
- Resource-constrained environments (lighter than Docker Desktop)

**Comparison to Docker Desktop:**
- Free and open source
- Lighter resource footprint
- No licensing issues
- Daemonless architecture maintained

---

### 22. How do you manage secrets and sensitive data in Podman?

**Secret Management:**

**Podman Secrets (builtin):**
```bash
# Create secret from file
podman secret create db_password ./password.txt

# Create from stdin
echo "mysecret" | podman secret create api_key -

# List secrets
podman secret ls

# Inspect secret (doesn't show value)
podman secret inspect db_password

# Use secret in container
podman run -d --secret db_password nginx

# Access inside container
# Secret available at: /run/secrets/db_password

# Remove secret
podman secret rm db_password
```

**Using Secrets:**
```bash
podman run -d \
  --secret db_password \
  --secret api_key,target=/app/api.key \
  myapp
```

**Environment Variables (less secure):**
```bash
# From file
podman run --env-file .env nginx

# Inline
podman run -e DB_PASS=secret nginx

# Not recommended for secrets (visible in inspect)
```

**Volume-based Secrets:**
```bash
# Mount secret file
podman run -v /secure/secrets:/secrets:ro,Z nginx
```

**Kubernetes Secrets (with podman kube):**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  password: cGFzc3dvcmQ=  # base64 encoded
```

```bash
# Deploy with podman
podman kube play secret.yaml
```

**Best Practices:**
- Use Podman secrets for sensitive data
- Never commit secrets to Git
- Use `.gitignore` for secret files
- Rotate secrets regularly
- Limit container access (read-only)
- Use external secret managers (Vault, etc.) for production
- Avoid environment variables for secrets

**External Secret Management:**
- HashiCorp Vault integration
- Kubernetes secret providers
- Cloud provider secret managers (AWS Secrets Manager, etc.)

---

### 23. Explain Podman's checkpoint and restore functionality for container migration.

**Checkpoint and Restore (CRIU):**

**Definition:**
- **Checkpoint**: Save running container state to disk
- **Restore**: Resume container from saved state
- Uses CRIU (Checkpoint/Restore In Userspace)

**Prerequisites:**
```bash
# Install CRIU
sudo apt-get install criu  # Debian/Ubuntu
sudo dnf install criu      # Fedora/RHEL

# Check support
podman info | grep -i criu
```

**Checkpoint Container:**
```bash
# Create checkpoint
podman container checkpoint mycontainer

# Export checkpoint to archive
podman container checkpoint --export=/tmp/checkpoint.tar mycontainer

# Keep container running
podman container checkpoint --leave-running mycontainer
```

**Restore Container:**
```bash
# Restore from checkpoint
podman container restore mycontainer

# Import and restore
podman container restore --import=/tmp/checkpoint.tar

# Restore with new name
podman container restore --import=/tmp/checkpoint.tar --name newcontainer
```

**Use Cases:**

**Container Migration:**
- Move running containers between hosts
- Live migration without downtime

**Fast Startup:**
- Skip initialization phase
- Resume from specific state

**Debugging:**
- Save state for analysis
- Reproduce issues

**Snapshotting:**
- Save application state
- Rollback capability

**Limitations:**
- Not all applications support CRIU
- External connections may break
- File descriptors and sockets may not restore cleanly
- Requires same or compatible kernel version
- Some resource types unsupported

**Example Workflow:**
```bash
# On source host
podman run -d --name webapp nginx
podman checkpoint --export=/tmp/webapp.tar webapp
scp /tmp/webapp.tar user@target:/tmp/

# On target host
podman restore --import=/tmp/webapp.tar --name webapp
```

**Advanced Options:**
```bash
# TCP established connections
podman checkpoint --tcp-established

# File locks
podman checkpoint --file-locks
```

---

### 24. How do you monitor and log Podman containers?

**Monitoring and Logging:**

**Container Logs:**
```bash
# View logs
podman logs mycontainer

# Follow logs (real-time)
podman logs -f mycontainer

# Last N lines
podman logs --tail 100 mycontainer

# Timestamps
podman logs --timestamps mycontainer

# Since time
podman logs --since 2024-01-01 mycontainer
```

**Container Stats:**
```bash
# Real-time resource usage
podman stats

# Specific container
podman stats mycontainer

# No streaming (one-shot)
podman stats --no-stream

# Format output
podman stats --format "{{.Name}}: {{.CPUPerc}} {{.MemUsage}}"
```

**Resource Monitoring:**
```bash
# Detailed info
podman inspect mycontainer

# System info
podman info

# Events
podman events

# Specific events
podman events --filter container=mycontainer
```

**Integration with systemd/journald:**
```bash
# For systemd-managed containers
journalctl -u mycontainer.service

# Follow logs
journalctl -u mycontainer.service -f

# Specific time range
journalctl -u mycontainer.service --since "1 hour ago"
```

**External Monitoring Tools:**

**Prometheus + Grafana:**
```bash
# Expose metrics (via cAdvisor or custom exporter)
podman run -d \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --publish=8080:8080 \
  gcr.io/cadvisor/cadvisor
```

**ELK Stack:** Configure logging driver
```bash
podman run --log-driver=journald myapp
```

**Datadog, New Relic:** Agent-based monitoring

**Health Checks:**
```bash
# Define healthcheck
podman run -d \
  --health-cmd "curl -f http://localhost/ || exit 1" \
  --health-interval 30s \
  --health-timeout 10s \
  --health-retries 3 \
  nginx

# Check health status
podman inspect --format='{{.State.Health.Status}}' mycontainer
```

**Best Practices:**
- Use structured logging (JSON)
- Implement health checks
- Monitor resource usage
- Set log rotation
- Centralize logs for production
- Alert on critical metrics

---

### 25. What are the performance considerations when using Podman vs Docker?

**Performance Considerations:**

**Startup Time:**
- **Podman**: Slightly faster (no daemon overhead)
- **Docker**: Daemon warmup adds latency
- **Benefit**: Podman better for short-lived containers

**Runtime Performance:**
- **Similar**: Both use same OCI runtime (runc/crun)
- **crun** (Podman default): 30-50% faster than runc
- **Container execution**: Nearly identical

**Networking:**
- **Rootless Podman**: Slower (slirp4netns overhead)
  - slirp4netns: NAT in userspace, performance hit
  - pasta: Newer, faster alternative
- **Rootful Podman**: Comparable to Docker (native bridge)
- **Docker**: Native networking by default
- **Recommendation**: Use rootful or pasta for network-intensive apps

**Storage Drivers:**
- **Rootless Podman**: fuse-overlayfs (slightly slower)
- **Rootful Podman**: overlay2 (same as Docker)
- **Docker**: overlay2 by default
- **Impact**: Small difference for most workloads

**Resource Usage:**
- **Podman**: Lower memory (no daemon)
- **Docker**: Daemon consumes ~50-100MB
- **Benefit**: Podman better for resource-constrained environments

**Build Performance:**
- **Similar**: Both use buildah/BuildKit
- **Caching**: Comparable layer caching
- **Multi-stage**: Equal performance

**Scalability:**
- **Podman**: Better for high-density (lower overhead)
- **Docker**: Daemon can become bottleneck
- **Kubernetes**: Podman integrates well with CRI-O

**Optimization Tips:**

**Podman:**
```bash
# Use crun runtime
podman --runtime crun run nginx

# Use pasta for better networking
podman run --network pasta nginx

# Enable cgroups v2 (better resource management)

# Use rootful for performance-critical
sudo podman run nginx
```

**Docker:**
```bash
# Use BuildKit
DOCKER_BUILDKIT=1 docker build .

# Enable experimental features
# Tune daemon settings
```

**Benchmark Results (typical):**
- **Container start**: Podman 10-20% faster
- **Network throughput**: Docker 20-30% faster (rootless Podman)
- **Disk I/O**: Similar
- **CPU/Memory**: Identical (same runtime)

**Recommendation:**
- **Use Podman for**: Security, CI/CD, rootless, Kubernetes
- **Use Docker for**: Maximum network performance, ecosystem maturity
- **Both**: Excellent performance for most use cases

---

## Complete Podman Commands Reference

### 1. Podman CLI Basics

```bash
# Show Podman version and system info
podman --version
podman version
podman info

# Get help
podman --help
podman <command> --help
```

### 2. Container Management

```bash
# Run container
podman run nginx
podman run -d nginx                          # detached mode
podman run -it ubuntu bash                   # interactive with TTY
podman run --name myapp nginx                # with name
podman run -p 8080:80 nginx                  # port mapping
podman run -v /host:/container nginx         # volume mount
podman run -e ENV_VAR=value nginx            # environment variable
podman run --rm nginx                        # auto-remove on stop
podman run --restart=always nginx            # restart policy

# List containers
podman ps                                    # running containers
podman ps -a                                 # all containers
podman ps -q                                 # only IDs
podman ps --format json                      # JSON output
podman ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

# Container lifecycle
podman start <container>                     # start stopped container
podman stop <container>                      # stop container (SIGTERM)
podman kill <container>                      # kill container (SIGKILL)
podman restart <container>                   # restart container
podman pause <container>                     # pause container
podman unpause <container>                   # unpause container
podman wait <container>                      # wait for container to stop

# Remove containers
podman rm <container>                        # remove stopped container
podman rm -f <container>                     # force remove running container
podman rm $(podman ps -aq)                   # remove all containers
podman container prune                       # remove all stopped containers
podman container prune -f                    # force without confirmation

# Execute commands in running container
podman exec <container> <command>            # execute command
podman exec -it <container> bash             # interactive shell
podman exec -u root <container> whoami       # as specific user
podman exec -e VAR=value <container> env     # with environment variable

# Attach to running container
podman attach <container>                    # attach to container's stdout/stdin

# Copy files
podman cp <container>:/path /host/path       # from container to host
podman cp /host/path <container>:/path       # from host to container

# Container inspection
podman inspect <container>                   # detailed JSON info
podman inspect --format='{{.State.Status}}' <container>
podman top <container>                       # running processes
podman port <container>                      # port mappings
podman diff <container>                      # filesystem changes

# Container logs
podman logs <container>                      # view logs
podman logs -f <container>                   # follow logs (stream)
podman logs --tail 100 <container>           # last N lines
podman logs --since 1h <container>           # since time period
podman logs --timestamps <container>         # with timestamps

# Container stats
podman stats                                 # all containers
podman stats <container>                     # specific container
podman stats --no-stream                     # one-time snapshot
podman stats --format "{{.Name}}: CPU={{.CPUPerc}}, Mem={{.MemUsage}}"

# Rename container
podman rename <old-name> <new-name>

# Export/Import containers
podman export <container> > container.tar    # export filesystem
podman import container.tar myimage:tag      # import as image

# Update container resources
podman update --cpus 2 <container>
podman update --memory 512m <container>
```

### 3. Image Management

```bash
# Pull images
podman pull nginx                            # from default registry
podman pull docker.io/nginx:latest           # explicit registry
podman pull quay.io/podman/hello             # from Quay
podman pull gcr.io/project/image:tag         # from GCR
podman pull --arch arm64 nginx               # specific architecture

# List images
podman images                                # all images
podman images -a                             # including intermediate
podman images --format json                  # JSON output
podman images --filter dangling=true         # dangling images
podman images --digests                      # with digests
podman images --no-trunc                     # full image IDs

# Build images
podman build -t myapp:latest .               # from Dockerfile
podman build -f Dockerfile.prod -t myapp .   # specific Dockerfile
podman build --no-cache -t myapp .           # without cache
podman build --build-arg VERSION=1.0 -t myapp .
podman build --platform linux/amd64 -t myapp .
podman build --target production -t myapp .  # multi-stage target
podman build --squash -t myapp .             # squash layers

# Tag images
podman tag nginx:latest mynginx:v1
podman tag <image-id> newname:newtag

# Push images
podman push myapp:latest docker.io/user/myapp:latest
podman push myapp:latest localhost:5000/myapp:latest

# Remove images
podman rmi nginx:latest                      # remove image
podman rmi -f <image-id>                     # force remove
podman rmi $(podman images -q)               # remove all
podman image prune                           # remove dangling
podman image prune -a                        # remove all unused
podman image prune -a --force                # without confirmation

# Inspect images
podman inspect <image>                       # detailed info
podman inspect --format='{{.Config.Cmd}}' <image>
podman history <image>                       # layer history
podman history --no-trunc <image>            # full commands

# Save/Load images
podman save -o myapp.tar myapp:latest        # save to tar
podman save myapp:latest | gzip > myapp.tar.gz
podman load -i myapp.tar                     # load from tar
podman load < myapp.tar.gz

# Search images
podman search nginx                          # search registries
podman search --filter=stars=100 nginx
podman search --limit 10 nginx
podman search --list-tags docker.io/nginx

# Image tree
podman image tree <image>                    # layer tree visualization

# Sign and verify images
podman image sign --sign-by <key> <image>
podman image trust set -f policy.json
```

### 4. Pod Management

```bash
# Create pods
podman pod create --name mypod               # basic pod
podman pod create --name mypod -p 8080:80    # with port mapping
podman pod create --name mypod --network mynet
podman pod create --name mypod --share net,ipc,pid

# List pods
podman pod ps                                # running pods
podman pod ps -a                             # all pods
podman pod ps --format json

# Add containers to pod
podman run -d --pod mypod nginx              # add to existing pod
podman run -d --pod mypod redis

# Pod lifecycle
podman pod start <pod>                       # start all containers
podman pod stop <pod>                        # stop all containers
podman pod restart <pod>                     # restart all containers
podman pod pause <pod>                       # pause all containers
podman pod unpause <pod>                     # unpause all containers
podman pod kill <pod>                        # kill all containers

# Inspect pods
podman pod inspect <pod>                     # detailed info
podman pod top <pod>                         # processes in all containers
podman pod stats <pod>                       # resource usage

# Remove pods
podman pod rm <pod>                          # remove stopped pod
podman pod rm -f <pod>                       # force remove running pod
podman pod prune                             # remove all stopped pods

# Pod logs
podman pod logs <pod>                        # logs from all containers
podman pod logs -f <pod>                     # follow logs
```

### 5. Volume Management

```bash
# Create volumes
podman volume create myvolume                # basic volume
podman volume create --opt o=size=1G myvolume

# List volumes
podman volume ls                             # all volumes
podman volume ls --format json

# Inspect volume
podman volume inspect myvolume               # detailed info

# Remove volumes
podman volume rm myvolume                    # remove volume
podman volume rm $(podman volume ls -q)      # remove all
podman volume prune                          # remove unused
podman volume prune -f                       # without confirmation

# Mount volumes
podman run -v myvolume:/data nginx           # named volume
podman run -v /host/path:/container/path nginx   # bind mount
podman run -v /host:/container:ro nginx      # read-only
podman run -v /host:/container:Z nginx       # SELinux private label
podman run -v /host:/container:z nginx       # SELinux shared label
podman run --tmpfs /tmp nginx                # tmpfs mount
```

### 6. Network Management

```bash
# Create networks
podman network create mynet                  # basic network
podman network create --driver bridge mynet
podman network create --subnet 10.89.0.0/24 mynet
podman network create --gateway 10.89.0.1 mynet
podman network create --ipv6 mynet

# List networks
podman network ls                            # all networks
podman network ls --format json

# Inspect network
podman network inspect mynet                 # detailed info

# Connect/disconnect containers
podman network connect mynet <container>     # connect to network
podman network disconnect mynet <container>  # disconnect from network

# Remove networks
podman network rm mynet                      # remove network
podman network prune                         # remove unused
podman network prune -f                      # without confirmation

# Use networks
podman run --network mynet nginx             # specific network
podman run --network host nginx              # host network
podman run --network none nginx              # no network
podman run --network slirp4netns nginx       # slirp4netns (rootless)
podman run --network pasta nginx             # pasta (faster rootless)
```

### 7. Secret Management

```bash
# Create secrets
podman secret create mysecret ./secret.txt   # from file
echo "password" | podman secret create mysecret -   # from stdin

# List secrets
podman secret ls                             # all secrets
podman secret ls --format json

# Inspect secret
podman secret inspect mysecret               # metadata (not value)

# Use secrets
podman run --secret mysecret nginx           # mount at /run/secrets/
podman run --secret mysecret,target=/app/secret nginx

# Remove secrets
podman secret rm mysecret                    # remove secret
```

### 8. Registry Operations

```bash
# Login to registry
podman login docker.io                       # login to Docker Hub
podman login quay.io                         # login to Quay
podman login -u user -p pass registry.io
podman login --get-login docker.io           # show logged in user

# Logout from registry
podman logout docker.io                      # logout
podman logout --all                          # logout from all

# Manage registry authentication
cat ~/.config/containers/auth.json           # view auth config
```

### 9. Kubernetes Integration

```bash
# Generate Kubernetes YAML
podman generate kube <container> > pod.yaml  # from container
podman generate kube <pod> > pod.yaml        # from pod
podman generate kube --service <pod> > deploy.yaml

# Play Kubernetes YAML
podman kube play pod.yaml                    # deploy from YAML
podman kube play --network host pod.yaml
podman kube play --start pod.yaml            # and start immediately

# Down Kubernetes deployment
podman kube down pod.yaml                    # remove deployment

# Generate Kubernetes secrets
podman kube play secret.yaml                 # create secrets from YAML
```

### 10. Systemd Integration

```bash
# Generate systemd unit files
podman generate systemd <container> > myapp.service
podman generate systemd --new <container>    # with --new flag
podman generate systemd --name <container> --files  # to files
podman generate systemd --restart-policy=always <container>

# Manage systemd services (rootful)
sudo systemctl enable myapp.service
sudo systemctl start myapp.service
sudo systemctl status myapp.service
sudo systemctl stop myapp.service

# Manage systemd services (rootless)
systemctl --user enable myapp.service
systemctl --user start myapp.service
systemctl --user status myapp.service
loginctl enable-linger $USER                 # enable at boot
```

### 11. Checkpoint and Restore

```bash
# Checkpoint container
podman container checkpoint <container>
podman container checkpoint --export=/tmp/checkpoint.tar <container>
podman container checkpoint --leave-running <container>
podman container checkpoint --tcp-established <container>

# Restore container
podman container restore <container>
podman container restore --import=/tmp/checkpoint.tar
podman container restore --name newname --import=/tmp/checkpoint.tar

# List checkpoints
podman container checkpoint --list <container>
```

### 12. Podman Machine (macOS/Windows)

```bash
# Initialize machine
podman machine init                          # default machine
podman machine init --cpus 4 --memory 8192 --disk-size 50
podman machine init myvm                     # named machine

# Manage machines
podman machine start                         # start default
podman machine start myvm                    # start specific
podman machine stop                          # stop machine
podman machine restart                       # restart machine
podman machine rm myvm                       # remove machine

# Machine info
podman machine list                          # list all machines
podman machine ssh                           # SSH into machine
podman machine ssh -- ls /                   # run command in machine
podman machine inspect                       # detailed info

# Set default machine
podman machine set --rootful                 # set to rootful
```

### 13. System Management

```bash
# System information
podman info                                  # comprehensive system info
podman info --format json                    # JSON output
podman version                               # version details

# System events
podman events                                # real-time events
podman events --filter container=myapp
podman events --filter event=start
podman events --since 1h

# Prune system
podman system prune                          # remove unused data
podman system prune -a                       # aggressive prune
podman system prune --volumes                # include volumes
podman system prune -a --volumes -f          # all without confirmation

# System disk usage
podman system df                             # disk usage
podman system df -v                          # verbose

# Reset system
podman system reset                          # remove all (dangerous!)
podman system reset -f                       # without confirmation

# Service management
podman system service --time=0               # enable API socket
systemctl --user enable podman.socket        # enable socket at boot
```

### 14. Compose (podman-compose)

```bash
# Install podman-compose
pip install podman-compose

# Use podman-compose
podman-compose up                            # start services
podman-compose up -d                         # detached mode
podman-compose up --build                    # rebuild images
podman-compose down                          # stop and remove
podman-compose ps                            # list containers
podman-compose logs                          # view logs
podman-compose logs -f api                   # follow specific service
podman-compose exec api bash                 # execute in service
podman-compose restart api                   # restart service
```

### 15. Advanced Operations

```bash
# Health checks
podman run -d \
  --health-cmd "curl -f http://localhost/ || exit 1" \
  --health-interval 30s \
  --health-timeout 10s \
  --health-retries 3 \
  --health-start-period 40s \
  nginx

# Resource limits
podman run -d \
  --cpus 2 \
  --memory 512m \
  --memory-swap 1g \
  --pids-limit 100 \
  nginx

# Security options
podman run -d \
  --user 1000:1000 \
  --cap-drop ALL \
  --cap-add NET_BIND_SERVICE \
  --read-only \
  --tmpfs /tmp \
  --security-opt no-new-privileges \
  --security-opt label=type:container_runtime_t \
  nginx

# Auto-update containers
podman auto-update                           # update containers with label
podman run -d \
  --label io.containers.autoupdate=registry \
  nginx

# Container init
podman run -d --init nginx                   # with init process

# Unshare (rootless)
podman unshare                               # enter user namespace
podman unshare cat /proc/self/uid_map        # view UID mapping

# Mount container filesystem
podman mount <container>                     # mount (requires root)
podman unmount <container>                   # unmount
```

### 16. Debugging and Troubleshooting

```bash
# Debug mode
podman --log-level debug run nginx           # verbose logging
podman --log-level trace run nginx           # extremely verbose

# Container troubleshooting
podman logs <container>                      # view logs
podman inspect <container>                   # detailed state
podman top <container>                       # running processes
podman diff <container>                      # filesystem changes
podman port <container>                      # port mappings
podman events --filter container=myapp       # container events

# Health status
podman inspect --format='{{.State.Health.Status}}' <container>
podman inspect --format='{{json .State.Health}}' <container>

# Network troubleshooting
podman network ls
podman network inspect <network>
podman inspect --format='{{.NetworkSettings}}' <container>

# Test connectivity
podman run --rm alpine ping -c 3 google.com
podman exec <container> curl -v http://localhost

# Check runtime
podman info | grep -i runtime
podman info | grep -i cgroup

# Validate configurations
podman system connection list                # API connections
cat ~/.config/containers/containers.conf     # Podman config
cat ~/.config/containers/storage.conf        # Storage config
```

### 17. Miscellaneous Commands

```bash
# Commit container changes to image
podman commit <container> newimage:tag
podman commit --author "Name" --message "msg" <container> img:tag

# Wait for container
podman wait <container>                      # wait until stopped

# Manifest operations (multi-arch)
podman manifest create myimage
podman manifest add myimage docker.io/library/nginx:latest
podman manifest inspect myimage
podman manifest push myimage docker.io/user/myimage:latest

# Container exists check
podman container exists <container> && echo "exists" || echo "not found"

# Image exists check
podman image exists <image> && echo "exists" || echo "not found"

# Cleanup shorthand
alias podman-clean='podman system prune -a --volumes -f'

# Docker compatibility alias
alias docker=podman
```

---

**End of Podman Guide**
