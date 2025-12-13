/*

MASTER JMETER INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — JMETER BASICS & FUNDAMENTALS
========================================================
1. What is JMeter and why is it used?  
2. What types of testing can JMeter perform (Load, Stress, Spike, Soak)?  
3. What is the difference between JMeter and LoadRunner?  
4. What is the JMeter test plan?  
5. What is a thread group in JMeter?  
6. What are samplers in JMeter?  
7. What is the difference between GUI mode and non-GUI mode in JMeter?  
8. What is ramp-up period in JMeter?  
9. What is the purpose of loop count?  
10. What are controllers in JMeter?

========================================================
SECTION 2 — JMETER COMPONENTS & TEST ELEMENTS
========================================================
11. What are samplers and what types are commonly used?  
12. What is an HTTP Request sampler?  
13. What is JDBC Request sampler?  
14. What is JMS Request sampler?  
15. What are logic controllers in JMeter?  
16. What is Once Only Controller?  
17. What is Loop Controller?  
18. What is Transaction Controller?  
19. What is Recording Controller?  
20. What is Module Controller?

========================================================
SECTION 3 — TIMERS, CONFIG ELEMENTS, PRE-/POST-PROCESSORS
========================================================
21. What are timers in JMeter and why are they used?  
22. What is Constant Timer vs Gaussian Random Timer?  
23. What is Uniform Random Timer?  
24. What is Constant Throughput Timer?  
25. What are configuration elements in JMeter?  
26. What is HTTP Request Defaults?  
27. What is CSV Data Set Config and when is it used?  
28. What is a User Defined Variables element?  
29. What are pre-processors in JMeter?  
30. What is the Regular Expression Extractor?  
31. What are post-processors in JMeter?  
32. What is JSON Extractor?  
33. What is XPath Extractor?  
34. What is BeanShell / JSR223 Pre/Post Processor?  
35. How does JMeter handle correlation using extractors?

========================================================
SECTION 4 — ASSERTIONS & VALIDATION
========================================================
36. What are assertions in JMeter?  
37. What is Response Assertion?  
38. What is Duration Assertion?  
39. What is Size Assertion?  
40. What is XML Assertion?  
41. What is JSON Assertion?  
42. What does "Test passes" mean in JMeter?  
43. What is the difference between assertion and extractor?

========================================================
SECTION 5 — JMETER LISTENERS & REPORTING
========================================================
44. What are JMeter listeners?  
45. What is View Results Tree Listener?  
46. What is Summary Report Listener?  
47. What is Aggregate Report Listener?  
48. What is Backend Listener?  
49. What UI elements slow down JMeter test execution?  
50. What is the HTML Dashboard Report and how is it generated?  

========================================================
SECTION 6 — PERFORMANCE TEST DESIGN
========================================================
51. What is load testing and how does JMeter perform it?  
52. What is stress testing?  
53. What is spike testing?  
54. What is endurance (soak) testing?  
55. What is capacity testing?  
56. What is baseline testing?  
57. How do you determine test scenarios from requirements?  
58. What is workload modeling?  
59. How do you calculate the number of concurrent users?  
60. What is think time and why is it needed?

========================================================
SECTION 7 — JMETER EXECUTION MODES & DISTRIBUTED TESTING
========================================================
61. What is non-GUI mode in JMeter and why use it?  
62. What is distributed (remote) load testing in JMeter?  
63. How do you configure master-slave architecture in JMeter?  
64. What is the purpose of JMeter server (jmeter-server)?  
65. What is RMI and how does JMeter use it?  
66. What are the challenges of distributed testing in JMeter?  
67. How do you test with Dockerized JMeter?  

========================================================
SECTION 8 — JMETER SCRIPTS & CORRELATION
========================================================
68. What is correlation and why is it needed in performance testing?  
69. How do you correlate dynamic values using Regular Expression Extractor?  
70. How do you correlate values using JSON Extractor?  
71. How do you use XPath or CSS Selector Extractor?  
72. What is session management in JMeter?  
73. What is cookie handling?  
74. How do you debug complex JMeter scripts?

========================================================
SECTION 9 — DATABASE, API & ADVANCED LOAD TESTING
========================================================
75. How do you load test REST APIs using JMeter?  
76. How do you load test SOAP services?  
77. How do you load test databases via JDBC requests?  
78. What is connection pooling in JDBC tests?  
79. How do you test messaging systems (Kafka, JMS) using JMeter?  
80. What is parameterization in JMeter?  
81. How do you perform data-driven testing using CSV data sets?  
82. How do you handle authentication (OAuth2, JWT) in JMeter tests?  
83. How do you simulate real-world usage patterns?  
84. How do you test file uploads/downloads with JMeter?  

========================================================
SECTION 10 — JVM TUNING, PERFORMANCE & OPTIMIZATION
========================================================
85. What JVM parameters can be tuned for JMeter?  
86. How does heap memory impact test execution?  
87. What is throughput vs response time?  
88. What are common bottlenecks in JMeter execution?  
89. What is server-side vs client-side performance bottleneck?  
90. How do you identify server bottlenecks using monitoring tools (Grafana, New Relic)?  
91. What is garbage collection and how does it impact load tests?  
92. How do you monitor resource utilization (CPU, memory, network)?  

========================================================
SECTION 11 — JMETER IN CI/CD & CLOUD EXECUTION
========================================================
93. How do you run JMeter tests in Jenkins?  
94. What is Taurus (JMeter wrapper) and how does it help in CI/CD?  
95. How do you run JMeter tests in GitHub Actions?  
96. How do you integrate JMeter with AWS/GCP/Azure?  
97. How do you run JMeter tests in Kubernetes?  
98. What is the significance of pass/fail criteria in pipeline execution?  
99. How do you generate HTML reports in CI/CD pipelines?  
100. What are best practices for automated performance testing?

========================================================

*/