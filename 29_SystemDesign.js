/*

MASTER SYSTEM DESIGN INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — SYSTEM DESIGN BASICS & FUNDAMENTALS
========================================================
1. What is system design and why is it important in software engineering?  
2. What is the difference between high-level design (HLD) and low-level design (LLD)?  
3. What are functional vs non-functional requirements?  
4. What is scalability in system design?  
5. What is the difference between vertical and horizontal scaling?  
6. What is the difference between monolithic and microservices architectures?  
7. What is latency vs throughput?  
8. What is CAP theorem?  
9. What is consistency, availability, and partition tolerance?  
10. What is a load balancer and why is it used?  

========================================================
SECTION 2 — NETWORKING ESSENTIALS FOR SYSTEM DESIGN
========================================================
11. What is DNS and how does DNS resolution work?  
12. What is TCP vs UDP?  
13. What is CDN and how does it improve performance?  
14. What is caching and where can caches be applied (client, CDN, server, DB)?  
15. What are HTTP long polling, SSE, and WebSockets?  
16. What is reverse proxy vs forward proxy?  
17. What are connection pools and why are they used?  
18. What is a network partition?  
19. What is TLS/SSL and how does HTTPS work?  
20. What is a message queue and when should it be used?  

========================================================
SECTION 3 — STORAGE SYSTEMS & DATABASE DESIGN
========================================================
21. What is the difference between SQL and NoSQL databases?  
22. What is sharding and why is it used?  
23. What is replication and how does it improve reliability?  
24. What is master-slave vs leader-follower replication?  
25. What is read-write splitting?  
26. What are ACID vs BASE properties?  
27. What is eventual consistency?  
28. What is a distributed database?  
29. What is a partition key and why is it important?  
30. What is a key-value database, document DB, graph DB, column-family DB?  

========================================================
SECTION 4 — CACHING & PERFORMANCE OPTIMIZATION
========================================================
31. What is caching and how does it improve system performance?  
32. What are common caching strategies (LRU, LFU, FIFO)?  
33. What are write-through, write-back, and write-around caching?  
34. What is cache invalidation and why is it hard?  
35. What is a distributed cache (Redis, Memcached)?  
36. What is caching at CDN vs server vs DB level?  
37. What is rate limiting and how is it implemented?  
38. What is throttling and how is it different from rate limiting?  
39. What is debounce and throttle in distributed systems context?  
40. What is the thundering herd problem in caching?  

========================================================
SECTION 5 — MICROSERVICES ARCHITECTURE
========================================================
41. What are microservices?  
42. What are the advantages and disadvantages of microservices?  
43. What is service discovery and why is it needed?  
44. What is an API gateway?  
45. What is the difference between synchronous and asynchronous communication?  
46. What is event-driven architecture?  
47. What is the saga pattern for distributed transactions?  
48. What is the circuit breaker pattern?  
49. What is CQRS (Command Query Responsibility Segregation)?  
50. What is eventual consistency in microservices?  

========================================================
SECTION 6 — MESSAGE QUEUES & STREAM PROCESSING
========================================================
51. What is a message queue (Kafka, RabbitMQ)?  
52. What is the difference between queue and stream?  
53. What is consumer group in Kafka?  
54. What is at-least-once vs at-most-once vs exactly-once delivery?  
55. What is backpressure in stream processing?  
56. What is idempotency and why is it important?  
57. What is a dead letter queue (DLQ)?  
58. What is event sourcing?  
59. What is data partitioning in Kafka?  
60. What is offset management?  

========================================================
SECTION 7 — LOAD BALANCING & TRAFFIC MANAGEMENT
========================================================
61. What is load balancing?  
62. What are the types of load balancers (L4, L7)?  
63. What is the difference between round-robin, least-connections, and IP-hash?  
64. What is sticky sessions?  
65. What is health checking in load balancers?  
66. What is autoscaling and what are common strategies?  
67. What are blue-green deployments?  
68. What is canary deployment?  
69. What is API rate limiting and how does it protect systems?  
70. What is global load balancing?  

========================================================
SECTION 8 — SYSTEM DESIGN BUILDING BLOCKS
========================================================
71. What is object storage (S3, GCS)?  
72. What is blob storage?  
73. What is a distributed file system?  
74. What is reverse proxying (Nginx, Envoy)?  
75. What is service mesh (Istio, Linkerd)?  
76. What is a heartbeat mechanism?  
77. What are leader election algorithms?  
78. What is gossip protocol?  
79. What is ZooKeeper and how is it used?  
80. What is a scheduler in distributed systems?  

========================================================
SECTION 9 — DESIGNING REAL-WORLD SYSTEMS (SCENARIO QUESTIONS)
========================================================
81. How would you design a URL shortener like TinyURL?  
82. How would you design a social media feed?  
83. How would you design Instagram or a photo-sharing service?  
84. How would you design WhatsApp or a messaging system?  
85. How would you design Uber or real-time ride tracking?  
86. How would you design Netflix video streaming?  
87. How would you design YouTube or a video upload pipeline?  
88. How would you design an e-commerce system?  
89. How would you design a search engine?  
90. How would you design a notification system?  

========================================================
SECTION 10 — SCALING TECHNIQUES & DISTRIBUTED PROBLEMS
========================================================
91. What is a scalability bottleneck and how do you identify it?  
92. What is load shedding?  
93. What is graceful degradation?  
94. What is replication lag?  
95. What is data locality?  
96. What is clock skew and why does it matter?  
97. What is split-brain syndrome in distributed systems?  
98. What is quorum-based consistency?  
99. What is multi-leader replication?  
100. What is geo-replication?  

========================================================

*/