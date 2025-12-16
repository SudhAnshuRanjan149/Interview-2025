/*

MASTER PROMETHEUS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — PROMETHEUS BASICS & CORE FUNDAMENTALS
========================================================
1. What is Prometheus and why is it used?  
2. What is the Prometheus ecosystem (Prometheus Server, Alertmanager, Pushgateway, Exporters)?  
3. What is the pull model used by Prometheus and why is it preferred?  
4. What is time-series data?  
5. What are metrics in Prometheus?  
6. What is the difference between monitoring and observability?  
7. What is the role of exporters in Prometheus?  
8. What is the difference between Prometheus and tools like Nagios or Zabbix?  
9. What is the Prometheus data model?  
10. What is a sample in Prometheus?

========================================================
SECTION 2 — METRIC TYPES
========================================================
11. What are the four metric types in Prometheus (Counter, Gauge, Histogram, Summary)?  
12. What is a Counter metric and when should you use it?  
13. What is a Gauge metric?  
14. What is a Histogram metric and how does bucket aggregation work?  
15. What is a Summary metric and how does quantile measurement work?  
16. What is the difference between Histogram and Summary?  
17. What are best practices for choosing metric types?  
18. What is cardinality in metrics?  
19. Why is high cardinality problematic in Prometheus?  
20. How do labels affect metric performance?

========================================================
SECTION 3 — PROMQL (PROMETHEUS QUERY LANGUAGE)
========================================================
21. What is PromQL?  
22. What is instant vector vs range vector?  
23. What is a selector in PromQL?  
24. What are PromQL aggregation operators (sum, avg, count, max, min)?  
25. What are PromQL binary operators (+, -, *, /)?  
26. What are PromQL vector matching rules?  
27. What is rate() function?  
28. What is increase() function?  
29. What is irate() and when should you use it?  
30. How do you write alert queries with PromQL?

========================================================
SECTION 4 — PROMETHEUS SERVER ARCHITECTURE
========================================================
31. What is the architecture of Prometheus Server?  
32. How does Prometheus scrape targets?  
33. What is a scrape interval?  
34. What is a scrape timeout?  
35. What is service discovery in Prometheus?  
36. What service discovery integrations exist (Kubernetes, EC2, Consul, DNS)?  
37. What are jobs and targets in Prometheus?  
38. How does Prometheus store data internally?  
39. What are blocks in TSDB (time series database)?  
40. How does compaction work in Prometheus?

========================================================
SECTION 5 — EXPORTERS & INSTRUMENTATION
========================================================
41. What are exporters in Prometheus?  
42. What is the Node Exporter?  
43. What is the Blackbox Exporter?  
44. What is the MySQL/PostgreSQL exporter?  
45. How do you create a custom exporter?  
46. What are client libraries for instrumentation?  
47. How do you instrument application code with Prometheus metrics?  
48. How do you expose metrics endpoint (/metrics)?  
49. What is OpenMetrics format?  
50. How do you avoid metric name collisions?

========================================================
SECTION 6 — ALERTING WITH PROMETHEUS & ALERTMANAGER
========================================================
51. What is Alertmanager?  
52. What is an alert rule in Prometheus?  
53. What is the difference between alert and recording rules?  
54. What is group_interval, repeat_interval, and group_wait?  
55. How does Alertmanager handle deduplication?  
56. What is alert inhibition?  
57. What is alert silencing?  
58. How do you configure alert routing (email, Slack, PagerDuty)?  
59. How do you write severity-based alerts?  
60. What is dead man's switch monitoring?

========================================================
SECTION 7 — PROMETHEUS IN KUBERNETES
========================================================
61. How does service discovery work in Kubernetes?  
62. What is Prometheus Operator?  
63. What are ServiceMonitor and PodMonitor CRDs?  
64. What is kube-state-metrics?  
65. How does Prometheus scrape containers in Kubernetes?  
66. How do you set up Grafana dashboards for Kubernetes monitoring?  
67. How do you monitor node health in Kubernetes with Prometheus?  
68. How do you monitor pod restarts, memory usage, and CPU?  
69. What is Thanos or Cortex and how does it extend Prometheus?  
70. How do you run high-availability Prometheus in Kubernetes?

========================================================
SECTION 8 — STORAGE, SCALABILITY & HIGH AVAILABILITY
========================================================
71. What is the retention policy in Prometheus?  
72. Why is horizontal scaling difficult with Prometheus?  
73. What are remote_write and remote_read APIs?  
74. What is long-term storage in Prometheus?  
75. How do Thanos, Mimir, and Cortex solve Prometheus scaling issues?  
76. What is federation in Prometheus?  
77. What is sharding in Prometheus?  
78. What is HA (high availability) Prometheus setup?  
79. How do WAL (Write Ahead Logs) work in Prometheus?  
80. How do you back up Prometheus data?

========================================================
SECTION 9 — PERFORMANCE, OPTIMIZATION & TROUBLESHOOTING
========================================================
81. How do you detect slow queries in Prometheus?  
82. What is the Prometheus API and how do you query it?  
83. How do you reduce cardinality in metrics?  
84. What are best practices for metric naming conventions?  
85. What causes high CPU usage in Prometheus?  
86. How do you handle scraping large numbers of targets?  
87. How do you debug missing metrics or scrape failures?  
88. What is the target health page in Prometheus UI?  
89. What is chunk encoding?  
90. How do you troubleshoot Alertmanager issues?

========================================================
SECTION 10 — PROMETHEUS IN REAL-WORLD SYSTEM DESIGN
========================================================
91. How do you design a full observability stack with Prometheus + Grafana?  
92. How do you implement SLO/SLI monitoring using Prometheus?  
93. How do you build dashboards for API latency and error rate?  
94. How do you monitor microservices architecture using Prometheus?  
95. How do you monitor message queues (Kafka/RabbitMQ) with Prometheus?  
96. How do you monitor databases using Prometheus exporters?  
97. How do you implement RED metrics (Rate, Errors, Duration)?  
98. How do you implement USE metrics (Utilization, Saturation, Errors)?  
99. What is the difference between white-box and black-box monitoring?  
100. How do you integrate Prometheus into CI/CD pipelines?

========================================================

*/