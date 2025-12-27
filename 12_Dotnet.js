/*

MASTER .NET API INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — .NET & ASP.NET CORE API FUNDAMENTALS
========================================================
1. What is .NET and what are its main components (.NET CLI, runtime, SDK)?  
2. What is ASP.NET Core and why is it used for building APIs?  
3. What is the difference between .NET Framework, .NET Core, and .NET 5/6/7/8?  
4. What is Kestrel server?  
5. What is the Program.cs minimal hosting model?  
6. What is Middleware in ASP.NET Core?  
7. What is the request pipeline?  
8. What is Dependency Injection (DI) and how is it built into ASP.NET Core?  
9. What are Services (Scoped, Transient, Singleton)?  
10. What is WebApplicationBuilder?

========================================================
SECTION 2 — CONTROLLERS, ROUTING & ENDPOINTS
========================================================
11. What is a Controller in ASP.NET Core API?  
12. What are Attributes like [ApiController], [Route], [HttpGet], [HttpPost]?  
13. What is attribute routing vs conventional routing?  
14. What are minimal APIs and when to use them?  
15. What is IActionResult vs ActionResult<T>?  
16. What is Model Binding?  
17. What is Model Validation using Data Annotations?  
18. What is FromBody, FromQuery, FromRoute, FromHeader binding?  
19. How do you handle default routes?  
20. What is API versioning and how is it implemented?

========================================================
SECTION 3 — REQUESTS, RESPONSES & JSON SERIALIZATION
========================================================
21. How is JSON serialization handled in .NET API by System.Text.Json?  
22. What is the difference between System.Text.Json and Newtonsoft.Json?  
23. How do you customize JSON serialization?  
24. What are problems like reference looping and how to fix them?  
25. What are response types (200, 400, 404, 500)?  
26. How do you return custom error responses?  
27. What is content negotiation?  
28. What is status code validation?  
29. What is HTTP PATCH and how do you implement json patch?  
30. What is asynchronous programming (async/await) in APIs?

========================================================
SECTION 4 — ENTITY FRAMEWORK CORE (DATABASE INTEGRATION)
========================================================
31. What is Entity Framework Core (EF Core)?  
32. What is Code-First vs Database-First approach?  
33. How do you configure DbContext?  
34. What are DbSet<> entities?  
35. How do you run migrations (add-migration, update-database)?  
36. How to configure relationships (One-to-One, One-to-Many, Many-to-Many)?  
37. What is lazy loading vs eager loading vs explicit loading?  
38. What is tracking vs no-tracking queries?  
39. What is global query filter?  
40. How do you implement repository and unit-of-work pattern?

========================================================
SECTION 5 — AUTHENTICATION & AUTHORIZATION
========================================================
41. What is Authentication vs Authorization?  
42. What is JWT authentication?  
43. How do you generate a JWT in ASP.NET Core API?  
44. What is token validation?  
45. What are claims and roles in JWT?  
46. What is Identity framework?  
47. How do you implement role-based authorization?  
48. What is policy-based authorization?  
49. How do you secure APIs using OAuth2 and OpenID Connect?  
50. What is refresh token mechanism?

========================================================
SECTION 6 — MIDDLEWARE, FILTERS & PIPELINE CUSTOMIZATION
========================================================
51. What is custom middleware and how do you write one?  
52. What is Use, Run, Map in middleware pipeline?  
53. What are filters (Action Filters, Exception Filters, Result Filters)?  
54. What is global exception handling middleware?  
55. How do you handle logging middleware?  
56. What is rate limiting middleware?  
57. What is CORS and how to configure it?  
58. What is request throttling?  
59. What is IP whitelisting?  
60. How do you protect APIs from common attacks (XSS, CSRF, SQL Injection)?

========================================================
SECTION 7 — API PERFORMANCE, CACHING & OPTIMIZATION
========================================================
61. How do you implement caching in .NET APIs?  
62. What is in-memory caching?  
63. What is distributed caching (Redis, SQL cache)?  
64. What is Response Caching Middleware?  
65. How do you optimize EF Core queries for performance?  
66. What is IHttpClientFactory?  
67. What is Polly and how to use retry/circuit-breaker patterns?  
68. What is gzip compression middleware?  
69. How do you handle large file uploads/downloads efficiently?  
70. How do you perform API load testing?

========================================================
SECTION 8 — LOGGING, MONITORING & OBSERVABILITY
========================================================
71. What is ILogger and how does logging work in ASP.NET Core?  
72. What are logging providers (Console, Debug, Seq, Serilog, ELK, Application Insights)?  
73. What is structured logging?  
74. How do you log exceptions globally?  
75. How do you integrate Serilog with .NET API?  
76. What is distributed tracing?  
77. How do you enable OpenTelemetry in .NET API?  
78. How do you push logs to Grafana, Loki, Prometheus?  
79. How do you track API performance metrics?  
80. What is HealthChecks middleware?

========================================================
SECTION 9 — TESTING .NET APIS
========================================================
81. What is unit testing in .NET API?  
82. What is integration testing and how do you set it up?  
83. How do you mock DbContext using in-memory providers?  
84. What testing frameworks are commonly used (xUnit, NUnit, MSTest)?  
85. How do you test controllers?  
86. What is test server?  
87. How do you test authentication in APIs?  
88. What is mocking using Moq?  
89. What is test-driven development (TDD)?  
90. How do you test minimal APIs?

========================================================
SECTION 10 — DEPLOYMENT, CI/CD & DOCKER
========================================================
91. How do you containerize .NET API using Docker?  
92. What is multistage Docker build for .NET?  
93. How do you deploy .NET API on IIS?  
94. How do you deploy .NET API on Linux using Kestrel + Nginx?  
95. How do you deploy .NET API on Azure App Services?  
96. How do you deploy .NET API on Kubernetes?  
97. How do you integrate .NET API with GitHub Actions CI/CD?  
98. How do you integrate .NET API with Azure DevOps Pipelines?  
99. What is blue-green / canary deployment for APIs?  
100. What are best practices for production-grade .NET API?

========================================================

*/