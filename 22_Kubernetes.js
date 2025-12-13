/*

MASTER KUBERNETES INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — KUBERNETES BASICS & CORE CONCEPTS
========================================================
1. What is Kubernetes and why is it used?  
2. What problem does Kubernetes solve in container orchestration?  
3. What is the architecture of Kubernetes (master & worker nodes)?  
4. What are the main Kubernetes components (API server, scheduler, controller manager, kubelet, kube-proxy)?  
5. What is a cluster in Kubernetes?  
6. What are Pods in Kubernetes?  
7. What is the lifecycle of a Pod?  
8. What is the difference between a container and a Pod?  
9. What is the kubelet and what does it do?  
10. What is etcd and what role does it play?

========================================================
SECTION 2 — KUBERNETES OBJECTS & WORKLOADS
========================================================
11. What are Kubernetes workloads?  
12. What is a ReplicaSet?  
13. What is a Deployment and how does it differ from ReplicaSet?  
14. What is a StatefulSet and when should you use it?  
15. What is a DaemonSet and its use cases?  
16. What is a Job in Kubernetes?  
17. What is a CronJob?  
18. What is the difference between Deployment and StatefulSet?  
19. What is a static Pod?  
20. What is an init container?

========================================================
SECTION 3 — SERVICES & NETWORKING
========================================================
21. What is a Service in Kubernetes?  
22. What is the difference between ClusterIP, NodePort, and LoadBalancer services?  
23. What is kube-proxy and how does it work?  
24. What is DNS in Kubernetes?  
25. What is CoreDNS?  
26. What is headless service and why use it?  
27. What is ingress in Kubernetes?  
28. What is the difference between Ingress and Service?  
29. What are Ingress controllers?  
30. What is network policy and how does it secure networking?

========================================================
SECTION 4 — CONFIGURATION MANAGEMENT
========================================================
31. What is ConfigMap in Kubernetes?  
32. What is Secret in Kubernetes?  
33. What is the difference between ConfigMap and Secret?  
34. How do you mount ConfigMaps and Secrets into Pods?  
35. What is a downward API?  
36. What is environment variable injection in Pods?  
37. What are Kubernetes annotations?  
38. What is resource quota?  
39. What is limitrange?  
40. How does Kubernetes handle configuration changes in Pods?

========================================================
SECTION 5 — STORAGE & VOLUMES
========================================================
41. What is a Volume in Kubernetes?  
42. What is emptyDir volume?  
43. What is hostPath volume?  
44. What is Persistent Volume (PV)?  
45. What is Persistent Volume Claim (PVC)?  
46. What is StorageClass?  
47. What is dynamic provisioning of storage?  
48. What is CSI (Container Storage Interface)?  
49. What is the difference between block and file storage?  
50. How does Kubernetes handle stateful applications?

========================================================
SECTION 6 — SCHEDULING & RESOURCE MANAGEMENT
========================================================
51. What is the Kubernetes Scheduler?  
52. What is pod affinity and anti-affinity?  
53. What is node affinity?  
54. What is taints and tolerations?  
55. What is priority class?  
56. What is resource request and limit?  
57. How does Kubernetes perform bin packing?  
58. What is eviction in Kubernetes?  
59. What is node cordoning and draining?  
60. What is the difference between soft and hard constraints?

========================================================
SECTION 7 — KUBERNETES SECURITY
========================================================
61. What is RBAC in Kubernetes?  
62. What are Roles vs ClusterRoles?  
63. What are RoleBinding vs ClusterRoleBinding?  
64. What is a ServiceAccount?  
65. How do you secure Secrets in Kubernetes?  
66. What is Pod Security Policy (PSP)?  
67. What is Pod Security Admission (replacement for PSP)?  
68. What is NetworkPolicy and how does it secure communication?  
69. What is image scanning in Kubernetes?  
70. What is mutual TLS in Kubernetes (mTLS)?

========================================================
SECTION 8 — HELM & PACKAGE MANAGEMENT
========================================================
71. What is Helm and why is it used?  
72. What is a Helm chart?  
73. What is the structure of a Helm chart?  
74. What is values.yaml?  
75. What is Chart.yaml?  
76. What is the difference between Helm chart and Kubernetes manifest?  
77. What is templating in Helm?  
78. What is helm install/upgrade/rollback?  
79. What are Helm repositories?  
80. What is the difference between Helm v2 and v3?

========================================================
SECTION 9 — LOGGING, MONITORING & TROUBLESHOOTING
========================================================
81. How do you view logs of a Pod?  
82. How do you debug a failing container?  
83. What is kubectl describe and when is it used?  
84. What are events in Kubernetes?  
85. How do you perform cluster monitoring?  
86. How does Prometheus integrate with Kubernetes?  
87. What is kube-state-metrics?  
88. How does Grafana visualize cluster metrics?  
89. How do you troubleshoot image pull errors?  
90. How do you debug pending Pods?

========================================================
SECTION 10 — KUBERNETES SCALING STRATEGIES
========================================================
91. What is Horizontal Pod Autoscaler (HPA)?  
92. What metrics does HPA use for scaling?  
93. What is Vertical Pod Autoscaler (VPA)?  
94. What is Cluster Autoscaler?  
95. What is the difference between HPA and Cluster Autoscaler?  
96. What is manual scaling vs autoscaling?  
97. What is predictive autoscaling?  
98. What is scaling based on custom metrics?  
99. How does HPA work with Prometheus Adapter?  
100. How do you test autoscaling behavior?

========================================================
SECTION 11 — KUBERNETES CLUSTER ADMINISTRATION
========================================================
101. What is kubeadm?  
102. What is kubectl and how does it work?  
103. What is kubeconfig?  
104. What is the difference between kubectl apply and kubectl create?  
105. What are namespaces and how do you use them?  
106. What is cluster federation?  
107. What is multi-tenancy in Kubernetes?  
108. What is backup and restore of cluster data (Velero, etc.)?  
109. How do you upgrade a Kubernetes cluster?  
110. How do you secure ETCD?

========================================================
SECTION 12 — KUBERNETES IN PRODUCTION & SYSTEM DESIGN
========================================================
111. How do you design workloads for high availability?  
112. How do you ensure zero downtime deployments?  
113. What is blue-green vs canary deployment?  
114. How do you integrate Istio/Linkerd service mesh?  
115. What is sidecar pattern in microservices?  
116. What is the ambassador container pattern?  
117. What are best practices for multi-cluster deployments?  
118. How do you containerize microservices for Kubernetes?  
119. What are common production issues in Kubernetes?  
120. What are best practices for securing a production Kubernetes cluster?

========================================================

*/