/*

MASTER APACHE KAFKA INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — KAFKA BASICS & CORE CONCEPTS
========================================================
1. What is Apache Kafka and why is it used?  
2. What problem does Kafka solve compared to messaging systems like RabbitMQ?  
3. What is a distributed streaming platform?  
4. What are Kafka’s main components (Producer, Consumer, Broker, Zookeeper/KRaft)?  
5. What is a Kafka cluster?  
6. What is a Kafka topic?  
7. What is a partition in Kafka?  
8. What is an offset?  
9. What is a Kafka record/message?  
10. What is the difference between Kafka and traditional message queues?

========================================================
SECTION 2 — PRODUCERS & CONSUMERS
========================================================
11. What is a Kafka producer?  
12. How does a producer write data to a topic?  
13. What are producer acknowledgments (acks = 0, 1, all)?  
14. What is idempotent producer?  
15. What is a Kafka consumer?  
16. What is a consumer group?  
17. How does Kafka ensure load balancing across consumers?  
18. What is consumer offset management?  
19. What is the difference between automatic and manual offset commit?  
20. What happens when a consumer fails?

========================================================
SECTION 3 — KAFKA BROKERS & CLUSTER INTERNALS
========================================================
21. What is a Kafka broker?  
22. What is a leader partition?  
23. What are follower partitions?  
24. What is replication factor?  
25. How does Kafka ensure high availability?  
26. What is ISR (In-Sync Replicas)?  
27. What happens when a leader broker fails?  
28. What is controller broker?  
29. What is the role of ZooKeeper in Kafka?  
30. What is KRaft mode (Kafka without Zookeeper)?

========================================================
SECTION 4 — DATA RELIABILITY & DURABILITY
========================================================
31. What is durability in Kafka?  
32. How does Kafka achieve data persistence?  
33. What is log-segment and log-cleaning?  
34. What is log retention policy?  
35. What is the difference between delete and compact cleanup policies?  
36. What is Kafka exactly-once semantics (EOS)?  
37. What are transactional producers?  
38. How does Kafka handle duplicates?  
39. What are message ordering guarantees?  
40. What is backpressure in Kafka?

========================================================
SECTION 5 — KAFKA PERFORMANCE & OPTIMIZATION
========================================================
41. What factors impact Kafka throughput?  
42. What is batching in Kafka producers?  
43. What is linger.ms parameter?  
44. What is compression in Kafka (gzip, snappy, lz4, zstd)?  
45. How do partitions affect scalability?  
46. What is fetch.min.bytes and how does it impact consumers?  
47. What is the impact of increasing replication factor?  
48. What is page cache and how does Kafka use it?  
49. What tools monitor Kafka performance?  
50. How do you tune Kafka for high throughput?

========================================================
SECTION 6 — KAFKA CONNECT
========================================================
51. What is Kafka Connect?  
52. What is the difference between source and sink connectors?  
53. What is distributed vs standalone mode?  
54. What is schema registry and why is it used?  
55. What are common connectors (JDBC, Elastic, S3, etc.)?  
56. How does offset management work in connectors?  
57. How do you scale Kafka Connect workers?  
58. What is Single Message Transform (SMT)?  
59. What are dead-letter queues in Kafka Connect?  
60. What is config rebalancing in Connect?

========================================================
SECTION 7 — KAFKA STREAMS API
========================================================
61. What is Kafka Streams?  
62. What is the difference between Kafka Streams and stream processors like Spark/Flink?  
63. What are KStreams and KTables?  
64. What is the difference between streams and tables?  
65. What is stream-stream join?  
66. What is stream-table join?  
67. What is a windowed operation in Streams?  
68. What is state store?  
69. How does Kafka Streams achieve fault tolerance?  
70. What is interactive queries?

========================================================
SECTION 8 — KAFKA SECURITY
========================================================
71. What is SSL/TLS encryption in Kafka?  
72. What is SASL authentication?  
73. What is Kerberos and how does Kafka support it?  
74. What is ACL (Access Control List) in Kafka?  
75. How do you secure Kafka topics?  
76. How do you secure Kafka brokers?  
77. What is encryption at rest in Kafka?  
78. What is token-based authentication?  
79. How does Kafka Connect handle security?  
80. What is fine-grained access control?

========================================================
SECTION 9 — KAFKA DEPLOYMENT, OPERATIONS & MONITORING
========================================================
81. What metrics should you monitor in Kafka?  
82. How do you monitor consumer lag?  
83. What happens when consumer lag increases?  
84. What tools monitor Kafka clusters (Prometheus, Grafana, Confluent Control Center)?  
85. What is partition reassignment?  
86. What is rack awareness in Kafka?  
87. How do you perform rolling upgrades?  
88. What is Kafka MirrorMaker?  
89. What is MirrorMaker 2?  
90. How do you backup Kafka data?

========================================================
SECTION 10 — ADVANCED KAFKA CONCEPTS
========================================================
91. What is idempotent delivery in Kafka?  
92. What is end-to-end exactly-once processing?  
93. How do you guarantee message ordering in Kafka?  
94. What is message compaction used for?  
95. What is watermarking in Kafka Streams?  
96. What is consumer rebalance?  
97. What is cooperative rebalancing?  
98. What are quotas in Kafka?  
99. What are topic-level configuration overrides?  
100. How do you design an event-driven microservices architecture with Kafka?

========================================================

*/