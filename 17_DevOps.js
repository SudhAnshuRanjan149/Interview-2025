/*

MASTER DEVOPS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — DEVOPS FUNDAMENTALS & CORE PRINCIPLES
========================================================
1. What is DevOps and why is it important?  
2. What problems does DevOps solve in software development?  
3. What are the key principles of DevOps?  
4. What is the difference between DevOps, Agile, and CI/CD?  
5. What is the DevOps lifecycle?  
6. What is Infrastructure as Code (IaC)?  
7. What is shift-left testing in DevOps?  
8. What are the benefits of DevOps for development teams?  
9. What is DevSecOps?  
10. What KPIs are used to measure DevOps success (DORA metrics)?

========================================================
SECTION 2 — CI/CD (CONTINUOUS INTEGRATION / DELIVERY / DEPLOYMENT)
========================================================
11. What is Continuous Integration (CI)?  
12. What is Continuous Delivery (CD)?  
13. What is Continuous Deployment (full automation)?  
14. What is the CI/CD pipeline?  
15. What tools are commonly used for CI/CD (Jenkins, GitHub Actions, GitLab, Azure DevOps)?  
16. What is a build pipeline?  
17. What is a release pipeline?  
18. What are pipeline triggers?  
19. What is artifact management?  
20. What are common CI/CD pipeline failures and how to handle them?

========================================================
SECTION 3 — VERSION CONTROL & GIT WORKFLOWS
========================================================
21. What is Git and why is it used in DevOps?  
22. What is trunk-based development?  
23. What is GitFlow?  
24. What is the difference between merge and rebase?  
25. How do Pull Requests (PRs) fit into DevOps pipelines?  
26. What are Git hooks?  
27. How do you resolve merge conflicts?  
28. How do you enforce branching strategies?  
29. What are protected branches?  
30. What is semantic versioning?

========================================================
SECTION 4 — CONTAINERIZATION (DOCKER / PODMAN)
========================================================
31. What is Docker and why is it important for DevOps?  
32. What is a Docker image vs container?  
33. What is a Dockerfile?  
34. What is multi-stage Docker build?  
35. What is Docker Compose?  
36. What is Docker networking?  
37. What is Docker registry?  
38. How do you optimize Docker images?  
39. What is container orchestration?  
40. What is the difference between Docker and Podman?

========================================================
SECTION 5 — KUBERNETES & CONTAINER ORCHESTRATION
========================================================
41. What is Kubernetes and why is it widely adopted in DevOps?  
42. What is a Pod, Service, Deployment, and Ingress?  
43. How does Kubernetes scheduling work?  
44. What is Helm and Helm charts?  
45. How do you run CI/CD with Kubernetes deployments?  
46. What is the difference between StatefulSet and Deployment?  
47. What is HPA (Horizontal Pod Autoscaler)?  
48. What is Kubernetes ConfigMap and Secret?  
49. What is kubectl?  
50. How do you troubleshoot Kubernetes pods?

========================================================
SECTION 6 — CONFIGURATION MANAGEMENT (ANSIBLE / CHEF / PUPPET)
========================================================
51. What is configuration management?  
52. How does Ansible work (agentless architecture)?  
53. What is an Ansible playbook?  
54. What are Chef recipes/cookbooks?  
55. What is Puppet manifest?  
56. How do these tools differ from Terraform?  
57. What is idempotency?  
58. What are Ansible roles?  
59. What is inventory in Ansible?  
60. How do you perform configuration drift detection?

========================================================
SECTION 7 — INFRASTRUCTURE AS CODE (TERRAFORM / CLOUDFORMATION)
========================================================
61. What is Infrastructure as Code (IaC)?  
62. What is Terraform and why is it used?  
63. What is the difference between Terraform and CloudFormation?  
64. What is Terraform state file?  
65. What are Terraform providers?  
66. What are Terraform modules?  
67. What is Terraform backend?  
68. How do you manage secrets in Terraform?  
69. What is the "plan" and "apply" workflow?  
70. What is drift detection in Terraform?

========================================================
SECTION 8 — CLOUD SERVICES (AWS / AZURE / GCP)
========================================================
71. What is IaaS, PaaS, SaaS?  
72. What is AWS EC2, S3, Lambda, RDS, IAM?  
73. What is Azure Virtual Machines, Web Apps, Functions, Key Vault?  
74. What is GCP Compute Engine, Cloud Run, Cloud SQL?  
75. What is autoscaling in cloud platforms?  
76. What is load balancing?  
77. What is VPC / VN?  
78. What is Identity and Access Management (IAM)?  
79. What is cloud cost optimization?  
80. What is serverless architecture?

========================================================
SECTION 9 — MONITORING, LOGGING & OBSERVABILITY
========================================================
81. What is monitoring in DevOps?  
82. What is observability and how does it differ from monitoring?  
83. What are logs, metrics, and traces?  
84. What is Prometheus and how does it work?  
85. What is Grafana and why is it used?  
86. What is ELK stack (Elasticsearch, Logstash, Kibana)?  
87. What is Loki?  
88. What is Jaeger for tracing?  
89. How do you set alerts in a monitoring system?  
90. What is SLO, SLI, SLA?

========================================================
SECTION 10 — NETWORKING & SECURITY IN DEVOPS
========================================================
91. What is DevSecOps?  
92. What is shift-left security?  
93. What is a firewall and how does it relate to cloud networks?  
94. What is SSL/TLS encryption?  
95. What is secrets management (Vault, Key Vault, Secret Manager)?  
96. How do you secure CI/CD pipelines?  
97. What is container image scanning?  
98. What is dependency scanning (SCA)?  
99. What is zero-trust architecture?  
100. What are security best practices for DevOps pipelines?

========================================================
SECTION 11 — SRE (SITE RELIABILITY ENGINEERING) PRINCIPLES
========================================================
101. What is SRE and how is it related to DevOps?  
102. What is an error budget?  
103. What is toil in SRE?  
104. What is incident management?  
105. What is root cause analysis (RCA)?  
106. What is blameless postmortem?  
107. What is service health monitoring?  
108. What is reliability vs availability?  
109. What is MTTR, MTBF?  
110. How do SRE teams automate operations?

========================================================
SECTION 12 — DEVOPS TOOLS & AUTOMATION WORKFLOWS
========================================================
111. What is Jenkins?  
112. What are Jenkins pipelines (scripted vs declarative)?  
113. What is GitHub Actions workflow?  
114. How does GitLab CI compare to Jenkins?  
115. What is ArgoCD (GitOps for Kubernetes)?  
116. What is FluxCD?  
117. What is HashiCorp Vault?  
118. What is Docker Swarm?  
119. What is Consul?  
120. What is SonarQube?

========================================================
SECTION 13 — REAL-WORLD DEVOPS PRACTICES & SCENARIOS
========================================================
121. How do you build a CI/CD pipeline from scratch?  
122. How do you implement GitOps?  
123. How do you deploy applications across multiple environments (dev/stage/prod)?  
124. How do you ensure zero-downtime deployment?  
125. How do you handle rollbacks?  
126. How do you monitor application performance in production?  
127. What is blue-green vs canary deployment?  
128. How do you scale applications automatically?  
129. How do you debug production failures?  
130. What are best practices for DevOps in large-scale distributed systems?

========================================================

*/