/*

MASTER API TECHNOLOGIES INTERVIEW SYLLABUS  
(Covers REST, GraphQL, gRPC, WebSockets, MQTT, SOAP, RPC, Webhooks & more)  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — GENERAL API FUNDAMENTALS
========================================================
1. What is an API?  
2. What are different types of APIs (REST, GraphQL, gRPC, SOAP, WebSockets, MQTT, Webhooks)?  
3. What is the difference between synchronous and asynchronous APIs?  
4. What is stateless vs stateful communication?  
5. What is client-server architecture?  
6. What is an API specification vs API implementation?  
7. What is an API contract?  
8. What is API versioning and why is it required?  
9. What is API pagination?  
10. What is rate limiting and throttling?

========================================================
SECTION 2 — REST APIs
========================================================
11. What is REST and what are its principles?  
12. What is the difference between REST and SOAP?  
13. What are HTTP methods (GET, POST, PUT, DELETE, PATCH)?  
14. What are idempotent and safe HTTP methods?  
15. What are HTTP status codes and categories?  
16. What is HATEOAS?  
17. What is the Richardson Maturity Model?  
18. What is RESTful resource naming best practice?  
19. What is content negotiation?  
20. What is the difference between query params, route params & headers?

========================================================
SECTION 3 — GRAPHQL
========================================================
21. What is GraphQL and how does it differ from REST?  
22. What are queries, mutations, and subscriptions?  
23. What is GraphQL schema?  
24. What are resolvers in GraphQL?  
25. What is introspection in GraphQL?  
26. How does GraphQL handle versioning?  
27. What is over-fetching and under-fetching?  
28. What is N+1 query problem in GraphQL?  
29. What is GraphQL federation?  
30. What is persisted queries?

========================================================
SECTION 4 — gRPC (Google Remote Procedure Call)
========================================================
31. What is gRPC and how does it differ from REST?  
32. What is protobuf (Protocol Buffers)?  
33. What is unary vs streaming RPC?  
34. What types of streaming does gRPC support?  
35. What is bidirectional streaming?  
36. What is HTTP/2 and why does gRPC depend on it?  
37. What is backward compatibility in protobufs?  
38. What are gRPC interceptors?  
39. How do you secure a gRPC API (TLS, mTLS)?  
40. How do you handle errors in gRPC?

========================================================
SECTION 5 — WEBSOCKETS
========================================================
41. What are WebSockets and why are they used?  
42. What is the difference between WebSockets and HTTP?  
43. How does WebSocket handshake work?  
44. When should you use WebSockets instead of REST?  
45. What are pub-sub systems with WebSockets?  
46. How do you handle reconnection logic?  
47. What is socket.io and how does it differ from WebSockets?  
48. What is message framing?  
49. What are WebSocket subprotocols?  
50. How do you secure WebSockets (WSS)?

========================================================
SECTION 6 — MQTT (Message Queuing Telemetry Transport)
========================================================
51. What is MQTT and where is it used (IoT, sensors)?  
52. What are MQTT topics?  
53. What is MQTT QoS (QoS 0, 1, 2)?  
54. What is retained message?  
55. What is Last Will and Testament (LWT) in MQTT?  
56. How does MQTT publish-subscribe model work?  
57. What is MQTT broker vs client?  
58. What is MQTT over WebSockets?  
59. How does MQTT compare to Kafka and RabbitMQ?  
60. What security features does MQTT support?

========================================================
SECTION 7 — SOAP (Simple Object Access Protocol)
========================================================
61. What is SOAP?  
62. What is WSDL?  
63. What are SOAP envelopes, headers, and body?  
64. What is the difference between RPC-style and document-style SOAP?  
65. What is SOAP fault?  
66. What is XML Schema in SOAP?  
67. What is WS-Security?  
68. How does SOAP differ from REST in real-world usage?  
69. What is UDDI?  
70. What are limitations of SOAP?

========================================================
SECTION 8 — RPC APIs (Remote Procedure Call)
========================================================
71. What is RPC?  
72. What is JSON-RPC?  
73. How is RPC different from REST and gRPC?  
74. What is tight coupling in RPC communication?  
75. What is request-response vs notification RPC?  
76. When should RPC be preferred over REST?  
77. What are the limitations of RPC APIs?  
78. What is RPC over WebSockets?  
79. What are service stubs and skeletons?  
80. What is schema evolution in RPC?

========================================================
SECTION 9 — API SECURITY FUNDAMENTALS
========================================================
81. What is authentication vs authorization?  
82. What is OAuth2?  
83. What is OpenID Connect?  
84. What is JWT (JSON Web Token)?  
85. How do you secure APIs using API keys?  
86. What is HMAC hashing?  
87. What are CSRF attacks and how to prevent them?  
88. What is CORS and how does it work?  
89. What is rate limiting?  
90. What is input validation and sanitization?

========================================================
SECTION 10 — ADVANCED API SECURITY
========================================================
91. What is mTLS (Mutual TLS)?  
92. What is token introspection?  
93. What is resource server vs authorization server?  
94. What is API gateway and how does it add security?  
95. What is WAF (Web Application Firewall)?  
96. What are OWASP API Top 10 vulnerabilities?  
97. What is replay attack and how do you prevent it?  
98. What is scope-based access control?  
99. How do you handle expired or invalid tokens?  
100. What is IP whitelisting?

========================================================
SECTION 11 — API DESIGN & BEST PRACTICES
========================================================
101. What are REST API naming conventions?  
102. How do you design versioning strategies?  
103. What is backward compatibility in APIs?  
104. What are idempotent operations?  
105. How do you design pagination strategies?  
106. What are hypermedia responses?  
107. What is contract-first API design?  
108. What is OpenAPI/Swagger specification?  
109. What is Postman and how is it used for API testing?  
110. What is API documentation best practice?

========================================================
SECTION 12 — REAL-WORLD API SCALING & ARCHITECTURE
========================================================
111. What is API Gateway (Kong, Nginx, Apigee, AWS)?  
112. What is load balancing for APIs?  
113. What is caching for APIs (CDN, Redis)?  
114. What is circuit breaker pattern?  
115. What is retry strategy?  
116. What is rate limiting and throttling?  
117. What are microservices and how do APIs relate to them?  
118. What is service discovery?  
119. What is API orchestration vs choreography?  
120. How do you monitor APIs (Grafana, Prometheus, ELK)?

========================================================

*/