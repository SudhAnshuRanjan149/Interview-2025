/*

MASTER NEXT.JS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — NEXT.JS BASICS & CORE CONCEPTS
========================================================
1. What is Next.js and why is it used?  
2. What problems does Next.js solve compared to CRA (Create React App)?  
3. What is the difference between React and Next.js?  
4. What is the file-based routing system in Next.js?  
5. What is the difference between pages/ and app/ directories?  
6. What are server components vs client components (Next.js 13+)?  
7. How does Next.js improve SEO compared to React?  
8. What is the difference between SPA, SSR, SSG, ISR in Next.js?  
9. What is the Next.js development server?  
10. What is the role of next.config.js?

========================================================
SECTION 2 — ROUTING SYSTEM (PAGES ROUTER)
========================================================
11. How does file-based routing work in Next.js (pages/ folder)?  
12. What are dynamic routes ([id].js)?  
13. How do you create nested routes?  
14. What are optional catch-all routes ([[...slug]].js)?  
15. How do you use getStaticProps and getServerSideProps?  
16. What is getStaticPaths used for?  
17. How do you create API routes in /pages/api?  
18. What is pre-rendering in the pages router?  
19. What is fallback: true / false / 'blocking'?  
20. How does client-side navigation work with next/link and next/router?

========================================================
SECTION 3 — APP ROUTER (NEXT.JS 13+)
========================================================
21. What is the app router and how does it differ from the pages router?  
22. What are server components in Next.js?  
23. What are client components and when must you use "use client"?  
24. What are layouts (layout.js)?  
25. What are loading.js and error.js files?  
26. How does parallel routing work?  
27. What is intercepting routing?  
28. How do you fetch data using server components?  
29. What is the difference between fetch(), cache(), revalidate() options?  
30. What is the new metadata API in Next.js 13?

========================================================
SECTION 4 — DATA FETCHING & RENDERING
========================================================
31. What is server-side rendering (SSR)?  
32. What is static site generation (SSG)?  
33. What is incremental static regeneration (ISR)?  
34. What is the difference between SSR and CSR?  
35. How does revalidation work in ISR?  
36. What is full route cache vs per-request cache?  
37. How do you fetch data from external APIs or databases in Next.js?  
38. What is the difference between getServerSideProps and server components?  
39. What is stale-while-revalidate?  
40. What causes hydration errors in Next.js?

========================================================
SECTION 5 — STYLING & UI IN NEXT.JS
========================================================
41. What styling options does Next.js support (CSS Modules, Styled JSX, Tailwind, etc.)?  
42. What are CSS Modules and why are they recommended?  
43. How do you use global.css?  
44. What is Styled JSX in Next.js?  
45. How do you configure Tailwind CSS in Next.js?  
46. What are layout-level styles?  
47. How does styling differ between app router and pages router?  
48. What are inline client component styles?  
49. What is CSS-in-JS and how does Next.js support it?  
50. How do you optimize and purge unused CSS?

========================================================
SECTION 6 — API ROUTES & BACKEND IN NEXT.JS
========================================================
51. What are API routes in Next.js?  
52. How do you create REST endpoints using pages/api?  
53. How do you access request & response objects in API routes?  
54. What is the difference between API routes vs external backend?  
55. How do you integrate databases (MongoDB, PostgreSQL) inside API routes?  
56. How do you handle authentication inside API routes?  
57. What are route handlers in app router (route.js)?  
58. What is streaming responses in Next.js?  
59. How do you handle middleware-based logic in API routes?  
60. How do API route caching and revalidation work?

========================================================
SECTION 7 — NEXT.JS MIDDLEWARE
========================================================
61. What is middleware in Next.js?  
62. How do you create a middleware.js file?  
63. What are common use cases for middleware (auth, redirects, logging)?  
64. How do you modify request/response using NextResponse?  
65. What is edge runtime?  
66. What are limitations of middleware?  
67. How do you perform URL rewrites and redirects?  
68. How does middleware differ from API route logic?  
69. How do you use geolocation and device detection in middleware?  
70. What are matcher configurations?

========================================================
SECTION 8 — PERFORMANCE & OPTIMIZATION
========================================================
71. What is automatic code splitting in Next.js?  
72. What is lazy loading and how do you use it?  
73. How do you optimize images using next/image?  
74. What are static assets and how to serve them?  
75. How do you use next/font for performance?  
76. What is bundle analyzer and how do you use it?  
77. What is tree-shaking?  
78. How do you optimize API route performance?  
79. How do you optimize React hydration in Next.js?  
80. What causes large JavaScript bundle sizes?

========================================================
SECTION 9 — AUTHENTICATION & SECURITY
========================================================
81. How do you implement authentication in Next.js?  
82. What is NextAuth.js and how does it integrate with Next.js?  
83. What is JWT authentication in Next.js?  
84. How do you secure API routes?  
85. What are CSRF protection strategies?  
86. What is secure cookie handling?  
87. What is middleware-based authentication?  
88. How do you protect server components?  
89. What is role-based access control (RBAC) in Next.js?  
90. What security best practices should be followed?

========================================================
SECTION 10 — DEPLOYMENT & DEVOPS
========================================================
91. How do you build and export a Next.js app?  
92. What is the difference between next build, next start, next dev?  
93. How do you deploy Next.js on Vercel?  
94. What are the benefits of deploying on Vercel?  
95. How do you deploy Next.js on AWS, Azure, or GCP?  
96. What is the standalone output format?  
97. What is edge deployment?  
98. How do you configure environment variables for production?  
99. What are common deployment issues?  
100. How do you optimize Next.js for CI/CD pipelines?

========================================================

*/