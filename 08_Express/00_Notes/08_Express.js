/*

MASTER EXPRESS.JS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — EXPRESS.JS BASICS & FUNDAMENTALS
========================================================
1. What is Express.js and why is it used?  
2. What problem does Express solve in Node.js development?  
3. What is the difference between Node.js and Express.js?  
4. How do you install and initialize an Express application?  
5. What is the purpose of app.listen()?  
6. What are the core features of Express.js?  
7. What is routing in Express?  
8. What is the role of the request (req) and response (res) objects?  
9. What are HTTP methods (GET, POST, PUT, DELETE) in Express?  
10. What is the difference between route path and route handler?  

========================================================
SECTION 2 — ROUTING & URL HANDLING
========================================================
11. What is a route in Express.js?  
12. What is express.Router() and why is it used?  
13. What are route parameters and how do you access them?  
14. What are query parameters and how do you access them?  
15. What is the difference between app.get() and app.post()?  
16. What is the purpose of app.all()?  
17. What is chaining route handlers?  
18. What are wildcard routes in Express?  
19. How do you implement modular routing?  
20. What is the difference between static and dynamic routes?  

========================================================
SECTION 3 — MIDDLEWARE (CORE EXPRESS CONCEPT)
========================================================
21. What is middleware in Express.js?  
22. What are application-level middleware functions?  
23. What are router-level middleware functions?  
24. What is error-handling middleware in Express?  
25. What is third-party middleware?  
26. What is built-in middleware in Express 4.x?  
27. What is the difference between middleware and a route handler?  
28. What is next() and how does it work?  
29. What happens if next() is not called in middleware?  
30. What are common built-in middlewares (express.json, express.urlencoded, express.static)?  

========================================================
SECTION 4 — REQUEST HANDLING & BODY PARSING
========================================================
31. How do you parse JSON request bodies in Express?  
32. What is express.urlencoded()?  
33. What is multipart/form-data and how do you handle file uploads?  
34. What is multer and how does it work with Express?  
35. What is the difference between body-parser and express.json()?  

========================================================
SECTION 5 — SERVING STATIC FILES
========================================================
36. What is express.static() and how do you configure it?  
37. How do you serve multiple static folders in Express?  
38. How do you set cache headers for static files?  

========================================================
SECTION 6 — TEMPLATE ENGINES & SERVER-SIDE RENDERING
========================================================
39. What are template engines in Express?  
40. How do you set up EJS, Pug, or Handlebars with Express?  
41. What is the difference between server-side rendering (SSR) and client-side rendering (CSR)?  
42. How do you pass data to a template engine in Express?  

========================================================
SECTION 7 — ERROR HANDLING & LOGGING
========================================================
43. How does Express detect an error?  
44. What is the structure of an Express error-handling middleware?  
45. What is the difference between synchronous and asynchronous error handling?  
46. What is the purpose of morgan in Express apps?  
47. How do you implement global error handling in Express?  

========================================================
SECTION 8 — EXPRESS SECURITY
========================================================
48. What is CORS and how do you enable it in Express?  
49. What is helmet.js and what security issues does it address?  
50. What is rate limiting and how do you implement it?  
51. What are common security vulnerabilities in Express?  
52. How do you prevent XSS in Express apps?  
53. How do you prevent SQL injection or NoSQL injection in Express apps?  
54. How do you securely store and access environment variables in Express?  

========================================================
SECTION 9 — AUTHENTICATION & AUTHORIZATION
========================================================
55. What is JWT authentication and how do you implement it in Express?  
56. What is the difference between sessions and tokens?  
57. What is express-session and how does it work?  
58. What is Passport.js and how is it used with Express?  
59. How do you protect Express routes using middleware?  
60. What is OAuth2 and how is it integrated with Express.js?  

========================================================
SECTION 10 — DATABASE INTEGRATION
========================================================
61. How do you connect Express with MongoDB using Mongoose?  
62. What are schema and models in Mongoose?  
63. How do you perform CRUD operations using Express + MongoDB?  
64. How do you connect Express with MySQL/PostgreSQL?  
65. What is an ORM/ODM and why use one (Sequelize, Prisma, TypeORM, Mongoose)?  
66. What is connection pooling and why is it needed?  

========================================================
SECTION 11 — EXPRESS APP ARCHITECTURE (REAL PROJECTS)
========================================================
67. What is project structure in Express? (controllers, services, routes, models)  
68. What is the MVC pattern in Express apps?  
69. How do you modularize routes and controllers?  
70. What is dependency injection and how can it be used in Express?  
71. What is the repository pattern and why use it?  
72. What is the service layer in backend architecture?  

========================================================
SECTION 12 — TESTING EXPRESS APPLICATIONS
========================================================
73. What is unit testing in Express?  
74. How do you use Jest or Mocha/Chai to test Express apps?  
75. What is Supertest and how do you test API endpoints?  
76. What is mocking in Express testing?  
77. What is integration testing and when is it needed?  

========================================================
SECTION 13 — PERFORMANCE OPTIMIZATION
========================================================
78. How do you improve Express performance?  
79. What is clustering in Node.js and how does Express use it?  
80. What is load balancing and how do you configure it with Express apps?  
81. How do you use PM2 to scale Express applications?  
82. What is caching and how do you use Redis with Express?  
83. What is gzip compression and how do you enable it in Express?  
84. How does Express handle concurrent connections?  

========================================================
SECTION 14 — EXPRESS MIDDLEWARE ECOSYSTEM
========================================================
85. What is multer and how does it handle file uploads?  
86. What is cookie-parser and how do you use cookies in Express?  
87. What is compression middleware and why is it used?  
88. What is express-validator and how does validation work?  
89. What is connect-history-api-fallback used for?  

========================================================
SECTION 15 — ADVANCED EXPRESS & REAL-WORLD CONCEPTS
========================================================
90. What is graceful shutdown and why is it important?  
91. What is zero-downtime deployment for Express apps?  
92. What is reverse proxying and why use NGINX with Express?  
93. What is API versioning and how do you implement it?  
94. How do you handle multipart uploads at scale in Express?  
95. What is an Express API gateway?  
96. What is the difference between monolithic and microservice architectures?  
97. How do you containerize an Express app using Docker?  
98. How do you deploy Express apps (Heroku, AWS, Vercel, Render)?  
99. What is rate throttling and how do you implement it?  
100. What is CSRF and how do you secure Express apps against it?  

========================================================

*/