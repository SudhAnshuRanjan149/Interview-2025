/*

```txt
MASTER RABBITMQ INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — RABBITMQ BASICS & FUNDAMENTALS
========================================================
1. What is RabbitMQ and why is it used?  
2. What is the difference between RabbitMQ and Kafka?  
3. What is AMQP (Advanced Message Queuing Protocol)?  
4. What is a broker in RabbitMQ?  
5. What is a queue in RabbitMQ?  
6. What is a message in RabbitMQ?  
7. What are producers and consumers?  
8. What is the difference between push-based (RabbitMQ) and pull-based (Kafka) messaging?  
9. What is a connection vs a channel in RabbitMQ?  
10. Why does RabbitMQ encourage the reuse of channels instead of connections?

========================================================
SECTION 2 — EXCHANGES & ROUTING
========================================================
11. What is an exchange in RabbitMQ?  
12. What are the different types of exchanges (direct, topic, fanout, headers)?  
13. How does routing work in RabbitMQ?  
14. What is a binding?  
15. What is a routing key?  
16. When would you use a fanout exchange?  
17. When would you use a topic exchange?  
18. What is a headers exchange and how does it route messages?  
19. What is a default exchange?  
20. What is an alternate exchange?

========================================================
SECTION 3 — MESSAGE DELIVERY & RELIABILITY
========================================================
21. What are message acknowledgments (ack, nack)?  
22. What is auto-ack and when should you avoid it?  
23. What is message durability in RabbitMQ?  
24. What does it mean to persist messages?  
25. What is a persistent queue vs durable queue?  
26. What happens if RabbitMQ crashes?  
27. What is publisher confirm and how does it work?  
28. What is mandatory flag in publishing?  
29. What are dead-letter exchanges (DLX)?  
30. What is TTL (Time-to-Live) for messages and queues?

========================================================
SECTION 4 — QUEUE BEHAVIOR & ADVANCED CONSUMPTION
========================================================
31. What is prefetch count (basic.qos)?  
32. What is fair dispatch in RabbitMQ?  
33. What is consumer priority?  
34. What is lazy queue in RabbitMQ?  
35. What is quorum queue?  
36. What is classic mirrored queue?  
37. What are exclusive queues?  
38. What are auto-delete queues?  
39. What is the difference between durable, exclusive, and auto-delete queues?  
40. What is negative acknowledgment (nack) and requeueing?

========================================================
SECTION 5 — RABBITMQ CLUSTERING & HIGH AVAILABILITY
========================================================
41. What is a RabbitMQ cluster?  
42. What is a disc node vs RAM node?  
43. How does RabbitMQ replicate metadata?  
44. What are mirrored queues?  
45. What is queue leader and follower?  
46. What is HAProxy or load balancer used for with RabbitMQ?  
47. How does RabbitMQ handle node failure?  
48. What is federation in RabbitMQ?  
49. What is Shovel plugin?  
50. What is partition handling mode in RabbitMQ?

========================================================
SECTION 6 — SECURITY IN RABBITMQ
========================================================
51. What is user authentication in RabbitMQ?  
52. What is vhost and how does it help with multi-tenancy?  
53. What are permissions (configure, write, read)?  
54. How does SSL/TLS encryption work in RabbitMQ?  
55. How do you secure RabbitMQ nodes?  
56. What is LDAP authentication in RabbitMQ?  
57. What is firewall configuration for RabbitMQ (ports used)?  
58. What is AMQP over WebSockets?  

========================================================
SECTION 7 — PLUGINS & EXTENSIONS
========================================================
59. What is RabbitMQ Management Plugin?  
60. What is Prometheus or Grafana used for in RabbitMQ monitoring?  
61. What is STOMP plugin?  
62. What is MQTT plugin?  
63. What is Federation plugin?  
64. What is Shovel plugin and how does it differ from Federation?  
65. What is delayed message exchange plugin?  

========================================================
SECTION 8 — PERFORMANCE OPTIMIZATION & TUNING
========================================================
66. How do you scale RabbitMQ producers and consumers?  
67. What are common RabbitMQ performance bottlenecks?  
68. How does queue length affect RabbitMQ performance?  
69. What is the impact of message size on throughput?  
70. How do you tune RabbitMQ memory and disk usage?  
71. What is flow control in RabbitMQ?  
72. What is backpressure and how does RabbitMQ handle it?  
73. How do you improve message throughput in RabbitMQ?  
74. How do you benchmark RabbitMQ performance?  
75. How does batching publisher confirms improve performance?

========================================================
SECTION 9 — RABBITMQ IN MICROSERVICES
========================================================
76. How do you implement RPC (Request-Reply) with RabbitMQ?  
77. What is correlation ID and reply-to queue?  
78. How do you ensure idempotency in message processing?  
79. What is event-driven architecture with RabbitMQ?  
80. How do you handle message retries and DLQ patterns?  
81. What is at-least-once delivery guarantee?  
82. What is at-most-once delivery?  
83. What is exactly-once delivery and can RabbitMQ support it?  
84. How do you design distributed workflows with RabbitMQ?  
85. How do you ensure ordering of messages?

========================================================
SECTION 10 — DEBUGGING, MONITORING & OPERATIONS
========================================================
86. How do you view queue metrics in RabbitMQ?  
87. How do you inspect blocked connections or channels?  
88. How do you troubleshoot consumers not receiving messages?  
89. How do you handle unroutable messages?  
90. What tools are used to monitor RabbitMQ? (Prometheus, Nagios, Grafana)  
91. What are firehose events?  
92. What is “high memory watermark” warning?  
93. What is disk free alarm in RabbitMQ?  
94. How do you analyze RabbitMQ logs?  
95. How do you restore queues after node failure?

========================================================
SECTION 11 — DEPLOYMENT & CLOUD INTEGRATIONS
========================================================
96. How do you deploy RabbitMQ using Docker?  
97. How do you deploy RabbitMQ on Kubernetes?  
98. What is RabbitMQ Operator in Kubernetes?  
99. What cloud services provide RabbitMQ (AWS MQ, CloudAMQP)?  
100. How do you scale RabbitMQ clusters in cloud environments?  

========================================================

*/