/*

MASTER DOCKER INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — DOCKER BASICS & CONTAINER FUNDAMENTALS
========================================================
1. What is Docker and why is it used?  
2. What problem does containerization solve compared to virtualization?  
3. What is a Docker container?  
4. What is a Docker image?  
5. What is Docker Engine?  
6. What is the difference between Docker Engine and Docker Desktop?  
7. What is the difference between container and image?  
8. What is a Docker registry?  
9. What are Docker Hub and private registries?  
10. What is the layered filesystem in Docker?

========================================================
SECTION 2 — DOCKER ARCHITECTURE
========================================================
11. What is the architecture of Docker (Client–Daemon model)?  
12. What is dockerd?  
13. What is containerd?  
14. What is runc?  
15. How does Docker isolate processes (namespaces & cgroups)?  
16. What are Docker namespaces?  
17. What are control groups (cgroups)?  
18. What are storage drivers in Docker (overlay2, aufs, btrfs)?  
19. What is a union filesystem?  
20. What is copy-on-write in Docker?

========================================================
SECTION 3 — DOCKER IMAGES & DOCKERFILE
========================================================
21. What is a Dockerfile?  
22. What are common Dockerfile instructions (FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT, etc.)?  
23. What is the difference between CMD and ENTRYPOINT?  
24. What is the purpose of EXPOSE in Dockerfile?  
25. What are build arguments (ARG) vs environment variables (ENV)?  
26. What is multi-stage Dockerfile build?  
27. How do you reduce Docker image size?  
28. What is the best practice for writing Dockerfiles?  
29. What is ONBUILD and when is it used?  
30. What is the difference between ADD and COPY?

========================================================
SECTION 4 — DOCKER COMMANDS & CONTAINER MANAGEMENT
========================================================
31. How do you build an image using Docker CLI?  
32. How do you run a Docker container?  
33. What is the difference between docker run and docker start?  
34. How do you list running and stopped containers?  
35. How do you view logs of a container?  
36. How do you use docker exec?  
37. How do you stop, kill, and restart containers?  
38. How do you remove images and containers?  
39. What is the difference between attach and exec?  
40. How do you inspect images and containers?

========================================================
SECTION 5 — DOCKER NETWORKING
========================================================
41. What are the different types of Docker networks (bridge, host, overlay, none)?  
42. What is the default Docker network?  
43. What is the difference between host and bridge networks?  
44. What is an overlay network and when is it used?  
45. How does container-to-container communication work?  
46. What is port mapping (docker run -p)?  
47. What is DNS resolution inside Docker containers?  
48. How do you create custom Docker networks?  
49. What are network drivers in Docker?  
50. How do you troubleshoot Docker network issues?

========================================================
SECTION 6 — DOCKER VOLUMES & STORAGE
========================================================
51. What is a Docker volume?  
52. What is the difference between bind mounts and volumes?  
53. What is tmpfs storage?  
54. How do you create and use named volumes?  
55. Where are Docker volumes stored on the host machine?  
56. What is the difference between COPY and mounting a volume?  
57. How do you back up and restore Docker volumes?  
58. What is the purpose of -v and --mount flags?  
59. What is volume driver?  
60. How do you share data across multiple containers?

========================================================
SECTION 7 — DOCKER COMPOSE
========================================================
61. What is Docker Compose and why is it used?  
62. What is docker-compose.yml file?  
63. What is the structure of a compose file (services, networks, volumes)?  
64. What are build vs image options in Compose?  
65. How do you pass environment variables to Compose?  
66. What is depends_on in Compose?  
67. What is restart policy in Compose?  
68. How do multiple containers communicate in Compose?  
69. How do you scale services using Docker Compose?  
70. What is the difference between Docker Compose and Kubernetes?

========================================================
SECTION 8 — DOCKER SECURITY
========================================================
71. What are common Docker security risks?  
72. What is rootless Docker?  
73. Why should you avoid running containers as root?  
74. What is Docker content trust (DCT)?  
75. What are container vulnerabilities and how do you scan them?  
76. What is seccomp and how does it secure containers?  
77. What are Docker capabilities?  
78. What is image signing?  
79. What is the principle of least privilege in containers?  
80. What is a security profile in Docker?

========================================================
SECTION 9 — CI/CD WITH DOCKER
========================================================
81. How is Docker used in CI/CD pipelines?  
82. How do you build Docker images in GitHub Actions, GitLab CI, or Jenkins?  
83. What is Docker layer caching?  
84. What is the difference between docker build and buildx?  
85. What is a multi-arch build?  
86. What is docker prune and how does it clean unused resources?  
87. How do you push a Docker image to a registry?  
88. How do you version Docker images for CI/CD?  
89. What are Docker tags and how do they work?  
90. How do you automate Docker builds?

========================================================
SECTION 10 — DOCKER SWARM & ORCHESTRATION BASICS
========================================================
91. What is Docker Swarm?  
92. What is the difference between Swarm and Kubernetes?  
93. What is a Swarm node (manager vs worker)?  
94. What is a service in Docker Swarm?  
95. What is a Swarm stack?  
96. What is the Raft consensus algorithm in Swarm?  
97. How do you scale services in Docker Swarm?  
98. What is rolling update in Swarm?  
99. What is service discovery in Swarm?  
100. How do overlay networks work in Swarm?

========================================================

*/