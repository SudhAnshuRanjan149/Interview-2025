/*

MASTER REDIS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — REDIS BASICS & FUNDAMENTALS
========================================================
1. What is Redis and why is it called an in-memory data store?  
2. What are the key use cases of Redis?  
3. How is Redis different from databases like MongoDB or PostgreSQL?  
4. What is the Redis architecture (single-threaded event loop)?  
5. What is the difference between Redis DB and Redis keys?  
6. What is a Redis data type?  
7. What is the difference between Redis in-memory storage and RAM caching?  
8. What are Redis databases (logical DB numbers)?  
9. What are Redis commands and how do they work?  
10. What is the difference between RESP protocol and RESP3?

========================================================
SECTION 2 — REDIS DATA TYPES & COMMANDS
========================================================
11. What are strings in Redis and their common commands?  
12. What are Redis hashes and when should you use them?  
13. What are Redis lists and what operations do they support?  
14. What are Redis sets and sorted sets (ZSETs)?  
15. What is the difference between SET and ZSET?  
16. Why are Sorted Sets useful for ranking/leaderboard systems?  
17. What are Redis bitmaps?  
18. What are Redis hyperloglogs?  
19. What are Redis streams?  
20. What are geospatial indexes in Redis?

========================================================
SECTION 3 — TTL, EXPIRATION & CACHE BEHAVIOR
========================================================
21. What is TTL in Redis?  
22. How do you set expiration for a key?  
23. What is the difference between EXPIRE, PEXPIRE, EXPIREAT?  
24. What is volatile vs persistent data?  
25. What happens when Redis memory is full?  
26. What is Redis eviction?  
27. What are different eviction policies (allkeys-lru, volatile-lru, noeviction, etc.)?  
28. What is lazy eviction?  
29. What is memory fragmentation in Redis?  
30. How do you estimate memory usage of Redis keys?

========================================================
SECTION 4 — REDIS PERSISTENCE
========================================================
31. What is RDB (Redis Database Backup) persistence?  
32. When should you use RDB snapshots?  
33. What is AOF (Append Only File) persistence?  
34. What is the difference between RDB and AOF?  
35. What is fsync and how does it affect performance?  
36. What is hybrid persistence?  
37. How do you restore Redis data from RDB or AOF file?  
38. What happens during Redis restart with RDB or AOF?  
39. What are the trade-offs between durability and performance?  
40. What is the CONFIG command used for?

========================================================
SECTION 5 — REDIS TRANSACTIONS & SCRIPTING
========================================================
41. What is MULTI/EXEC in Redis?  
42. What is WATCH and how does optimistic locking work?  
43. What is DISCARD?  
44. What is redis-pipeline?  
45. What is the difference between pipeline and transaction?  
46. What is Lua scripting in Redis?  
47. How do you avoid race conditions using Lua scripts?  
48. What is EVAL and EVALSHA?  
49. What is atomicity in Redis?  
50. How does Redis ensure atomic operations?

========================================================
SECTION 6 — REDIS PUB/SUB & STREAMING
========================================================
51. What is Redis Pub/Sub?  
52. What are the limitations of Pub/Sub?  
53. What is Redis Streams?  
54. What is a consumer group in Redis Streams?  
55. What is XADD, XREAD, XGROUP, XACK?  
56. How do Redis Streams compare to Kafka?  
57. When should you use Streams vs Lists?  
58. How do you handle backpressure with Redis Streams?  
59. What is message ordering in Streams?  
60. How do you manage message retention in Streams?

========================================================
SECTION 7 — REDIS CLUSTERING & HIGH AVAILABILITY
========================================================
61. What is Redis Sentinel and what problem does it solve?  
62. What are Sentinel roles (monitor, leader election, automatic failover)?  
63. What is Redis Cluster?  
64. What is sharding in Redis Cluster?  
65. What are hash slots in Redis Cluster?  
66. How does Redis cluster route requests?  
67. What happens when a Redis node fails in a cluster?  
68. What is a replica (slave) node?  
69. What is read/write splitting in Redis?  
70. What is the difference between Sentinel and Cluster mode?

========================================================
SECTION 8 — REDIS PERFORMANCE OPTIMIZATION
========================================================
71. What is the impact of Redis being single-threaded?  
72. How do you scale Redis performance?  
73. What are Redis pipelines and why are they useful?  
74. How do you benchmark Redis using redis-benchmark?  
75. What are slow logs in Redis?  
76. What is connection pooling in Redis client libraries?  
77. What is maxmemory and how does it affect performance?  
78. What optimizations exist for large datasets in Redis?  
79. What is keyspace notification and when to enable it?  
80. How does Redis handle multi-core machines?

========================================================
SECTION 9 — REDIS SECURITY
========================================================
81. Why is Redis insecure by default?  
82. How do you enable Redis authentication?  
83. What is ACL (Access Control List) in Redis 6?  
84. How do you encrypt Redis connections (TLS/SSL)?  
85. What are common Redis attack vectors?  
86. How do you secure Redis in cloud environments?  
87. What is protected-mode?  
88. How do you limit access to Redis using firewall rules?  
89. How do you rotate Redis passwords?  
90. What is masking and key naming conventions?

========================================================
SECTION 10 — REDIS IN REAL-WORLD SYSTEMS
========================================================
91. How do you use Redis as a cache in microservices?  
92. How do you implement rate limiting using Redis?  
93. How do you implement distributed locks using Redis?  
94. What is Redlock?  
95. Why is Redlock controversial in large distributed systems?  
96. How do you use Redis for session storage?  
97. How do you use Redis for leaderboards?  
98. How do you use Redis for queuing (RPUSH/BLPOP)?  
99. How do you implement pub/sub-based notifications?  
100. What are common pitfalls when using Redis in production?

========================================================

*/