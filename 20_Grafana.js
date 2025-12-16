/*

MASTER GRAFANA INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — GRAFANA BASICS & FUNDAMENTALS
========================================================
1. What is Grafana and why is it used?  
2. What is the difference between Grafana and Prometheus?  
3. What are dashboards in Grafana?  
4. What are panels in Grafana?  
5. What is a data source in Grafana?  
6. What kinds of data sources does Grafana support (Prometheus, Loki, MySQL, Elastic, InfluxDB, etc.)?  
7. What is the Grafana UI layout (Home, Dashboards, Explore, Alerting, Settings)?  
8. What is the Explore view in Grafana?  
9. What is the difference between Grafana OSS and Grafana Enterprise?  
10. What is Grafana Cloud?

========================================================
SECTION 2 — DASHBOARDS, PANELS & VISUALIZATIONS
========================================================
11. What is a dashboard in Grafana?  
12. What are panels and panel plugins?  
13. What is a time-series panel?  
14. What are stat, gauge, and bar gauge panels?  
15. What are heatmaps in Grafana?  
16. What are repeat panels and when do you use them?  
17. How do you set panel transformations?  
18. How do you apply thresholds in panels?  
19. What is annotation and how to use it?  
20. What is panel refresh interval and time range selector?

========================================================
SECTION 3 — GRAFANA DATA SOURCES
========================================================
21. How do you add a data source in Grafana?  
22. How do you query Prometheus from Grafana?  
23. What is the Query Builder?  
24. What is the difference between PromQL, Loki LogQL, and InfluxQL?  
25. What is Elasticsearch data source used for?  
26. What is InfluxDB data source used for?  
27. What is Loki and how does Grafana query logs using LogQL?  
28. What is Tempo and how does Grafana visualize tracing data?  
29. How do you connect SQL databases to Grafana?  
30. How do you securely store data source credentials?

========================================================
SECTION 4 — VARIABLES & TEMPLATING
========================================================
31. What are dashboard variables in Grafana?  
32. What types of variables exist (query, interval, constant, custom, datasource)?  
33. What is multi-value variable?  
34. How do you create cascading variables?  
35. What is regex filtering in variable values?  
36. What is the use of interval variable ($__interval)?  
37. How do you use variables inside PromQL/LogQL queries?  
38. How do you use variables in panel titles and labels?  
39. What is the difference between global and dashboard variables?  
40. What is $__timeFilter and where is it used?

========================================================
SECTION 5 — ALERTING IN GRAFANA
========================================================
41. What is Grafana Alerting?  
42. What is the difference between legacy alerting and new unified alerting system?  
43. What is a contact point?  
44. What is a notification policy?  
45. What are alert rules?  
46. What is no-data state and error state in alerting?  
47. How do you configure alert channels (Slack, Email, PagerDuty)?  
48. What is alert rule evaluation interval?  
49. How does Grafana integrate with Prometheus Alertmanager?  
50. What is silencing, muting, and alert grouping?

========================================================
SECTION 6 — GRAFANA ADMINISTRATION & USER MANAGEMENT
========================================================
51. What is an organisation in Grafana?  
52. What are roles in Grafana (Admin, Editor, Viewer)?  
53. What is team-based access control?  
54. How do you manage users in Grafana?  
55. How do you enable LDAP authentication?  
56. How do you enable OAuth / SSO in Grafana?  
57. What is API token-based authentication?  
58. How do you set folder permissions?  
59. What is provisioning (dashboards, users, datasources)?  
60. How do you backup and restore Grafana dashboards?

========================================================
SECTION 7 — GRAFANA PERFORMANCE & OPTIMIZATION
========================================================
61. How do you optimize dashboard performance?  
62. What is query caching in Grafana?  
63. What causes slow dashboards?  
64. How do you troubleshoot panels that load slowly?  
65. What is sampling in Grafana?  
66. What are time shift and time override options?  
67. What is the difference between live mode and normal mode?  
68. What is panel data limit and how do you configure it?  
69. How do you reduce high cardinality issues at the dashboard level?  
70. How do you handle large log datasets in Loki?

========================================================
SECTION 8 — GRAFANA PLUGINS & EXTENSIBILITY
========================================================
71. What are Grafana plugins?  
72. What types of plugins does Grafana support (datasource, panel, app)?  
73. How do you install Grafana plugins?  
74. How do you develop a custom plugin?  
75. What is the Grafana Plugin SDK?  
76. What is JSON dashboard model?  
77. How do you import/export dashboards in JSON?  
78. What is Grafana’s backend plugin architecture?  
79. What is the role of protobuf in plugin development?  
80. How do you integrate external APIs into Grafana?

========================================================
SECTION 9 — GRAFANA IN CLOUD & DEVOPS ECOSYSTEM
========================================================
81. How do you deploy Grafana using Docker?  
82. How do you run Grafana on Kubernetes?  
83. What is Grafana Operator (K8s operator)?  
84. How does Grafana integrate with Prometheus in cloud-native monitoring?  
85. How does Grafana integrate with Loki (logs)?  
86. How does Grafana integrate with Tempo (traces)?  
87. What is Grafana Alloy (agent)?  
88. What is Grafana Cloud’s fully managed stack?  
89. How do you automate dashboard provisioning in CI/CD?  
90. What is Terraform provider for Grafana?

========================================================
SECTION 10 — REAL-WORLD DASHBOARDING & SCENARIOS
========================================================
91. How do you design dashboards for microservices monitoring?  
92. How do you visualize API latency and error rates?  
93. How do you design a capacity planning dashboard?  
94. How do you build dashboards for Kubernetes cluster health?  
95. How do you monitor message queues (Kafka, RabbitMQ) using Grafana?  
96. How do you create SLO/SLI dashboards using Prometheus + Grafana?  
97. How do you visualize logs, metrics, and traces in one place?  
98. What are best practices for dashboard UX design?  
99. How do you avoid misleading visualizations?  
100. How do you structure dashboards for enterprise environments?

========================================================

*/