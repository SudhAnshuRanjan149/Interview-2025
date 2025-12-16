/*

MASTER PODMAN INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — PODMAN BASICS & FUNDAMENTALS
========================================================
1. What is Podman and why was it created?  
2. What is the difference between Podman and Docker?  
3. What does “daemonless containers” mean in Podman?  
4. What is OCI (Open Container Initiative)?  
5. What is the role of runc, crun, and conmon in Podman?  
6. How does Podman handle rootless containers?  
7. What are Podman containers, pods, and images?  
8. How does Podman store container metadata and images?  
9. What is the Podman architecture (no central daemon)?  
10. What is the difference between root and rootless mode?

========================================================
SECTION 2 — PODMAN COMMANDS & CONTAINER MANAGEMENT
========================================================
11. How do you run a container using Podman?  
12. What is the difference between podman run and podman start?  
13. How do you list running containers?  
14. How do you inspect containers and images?  
15. What is podman logs?  
16. How do you exec into a running container?  
17. What is the difference between Podman and Docker CLI compatibility?  
18. How do you remove containers and images?  
19. What is podman ps -a used for?  
20. How do you commit changes from a container into a new image?

========================================================
SECTION 3 — PODMAN IMAGES & OCI COMPATIBILITY
========================================================
21. What is an OCI image?  
22. How is Podman image format compatible with Docker?  
23. What is the podman build command?  
24. How do you use Containerfile (Dockerfile equivalent)?  
25. What is the difference between ADD and COPY?  
26. What are multi-stage builds in Podman?  
27. How do you manage image tags in Podman?  
28. How does Podman store images locally?  
29. How do you prune unused images?  
30. How do you sign and verify container images?

========================================================
SECTION 4 — PODS IN PODMAN
========================================================
31. What is a Pod in Podman?  
32. How is a Pod different from a Docker container?  
33. What is the relationship between Podman Pods and Kubernetes Pods?  
34. How do you create a Pod in Podman?  
35. How do you run multiple containers inside a Pod?  
36. How do containers inside a Pod share networking and namespaces?  
37. What is the infra container in Podman Pods?  
38. How do you inspect a Pod?  
39. How do you stop, start, or delete Pods?  
40. What are podman generate and podman play commands?

========================================================
SECTION 5 — PODMAN NETWORKING
========================================================
41. What are the network drivers supported by Podman?  
42. How do you expose ports using Podman?  
43. What is the difference between host and bridge networking?  
44. How do you inspect container networking details?  
45. What is slirp4netns and how does it enable rootless networking?  
46. What is pasta networking driver?  
47. How do you create custom networks in Podman?  
48. How does Podman handle DNS resolution?  
49. What are CNI plugins and how do they work with Podman?  
50. What is host networking mode?

========================================================
SECTION 6 — PODMAN VOLUMES & STORAGE
========================================================
51. What is a volume in Podman?  
52. What is the difference between bind mounts and named volumes?  
53. Where does Podman store volume data?  
54. How do you create and inspect volumes?  
55. What is the purpose of podman mount and unmount?  
56. What are overlay drivers in Podman?  
57. How does Podman manage persistent storage for rootless containers?  
58. What is tmpfs storage?  
59. How do you use --mount flag vs -v flag?  
60. How do you back up and restore Podman volumes?

========================================================
SECTION 7 — ROOTLESS PODMAN & SECURITY
========================================================
61. What is rootless Podman and why is it more secure?  
62. What are user namespaces in Podman?  
63. How does Podman prevent privilege escalation?  
64. What is seccomp and how is it used in Podman?  
65. What are SELinux labels in Podman?  
66. What is AppArmor and how does Podman work with it?  
67. What are capabilities in Linux containers?  
68. How do you configure Podman container security policies?  
69. How does Podman enforce cgroups?  
70. What security advantages does Podman have over Docker?

========================================================
SECTION 8 — PODMAN MACHINE, SYSTEMD & CONVERSION TOOLS
========================================================
71. What is Podman Machine (for macOS/Windows)?  
72. How does Podman emulate Linux environment using QEMU?  
73. What is the purpose of podman generate systemd?  
74. How do you run containers as systemd services?  
75. How do you export systemd unit files to automate Pods?  
76. What is the podman-docker compatibility package?  
77. What is podman play kube and how does it run Kubernetes YAML?  
78. What is podman generate kube?  
79. How do you convert Docker Compose files to Podman?  
80. How do you migrate workloads from Docker to Podman?

========================================================
SECTION 9 — PODMAN IN CI/CD, DEVOPS & KUBERNETES
========================================================
81. How do you use Podman in CI/CD pipelines?  
82. How do you build images with Podman in CI?  
83. How does Podman integrate with GitHub Actions, GitLab CI, Jenkins?  
84. What is Podman Desktop and how does it help developers?  
85. How does Podman relate to Kubernetes CRI?  
86. Why is Podman often used in OpenShift environments?  
87. What is cri-o and how does it compare to Docker and Podman?  
88. How do you run a Kubernetes-like workflow using Podman Pods?  
89. What is the difference between Podman Compose and Docker Compose?  
90. How do you debug pod/container issues in Podman?

========================================================
SECTION 10 — TROUBLESHOOTING, PERFORMANCE & REAL-WORLD SCENARIOS
========================================================
91. How do you troubleshoot networking issues in Podman?  
92. How do you inspect logs, metadata, and events for debugging?  
93. What causes permission issues in rootless mode?  
94. How do you monitor Podman containers?  
95. What is the impact of Podman being single process per container?  
96. How do you optimize Podman performance for production?  
97. How do you containerize microservices using Podman?  
98. How do you replicate Kubernetes Pod behavior locally with Podman?  
99. What are common Podman commands every DevOps engineer should know?  
100. What are best practices for using Podman in production?

========================================================

*/