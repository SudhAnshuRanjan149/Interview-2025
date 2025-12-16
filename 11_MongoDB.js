/*

MASTER MONGODB INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — MONGODB BASICS & CORE FUNDAMENTALS
========================================================
1. What is MongoDB and why is it called a NoSQL database?  
2. What are the differences between SQL and NoSQL databases?  
3. What is a document in MongoDB?  
4. What is a collection in MongoDB?  
5. What is BSON and how does it differ from JSON?  
6. What are MongoDB data types?  
7. What is Mongo Shell and how do you use it?  
8. How do you create a database and a collection in MongoDB?  
9. What are the ACID properties and does MongoDB support them?  
10. What is a MongoDB replica set?  

========================================================
SECTION 2 — CRUD OPERATIONS
========================================================
11. How do you insert documents in MongoDB?  
12. What is insertOne() vs insertMany()?  
13. How do you query documents using find()?  
14. What is the difference between find() and findOne()?  
15. How do you update documents in MongoDB?  
16. What is updateOne(), updateMany(), and replaceOne()?  
17. What are MongoDB update operators ($set, $inc, $push, $addToSet, etc.)?  
18. How do you delete documents in MongoDB?  
19. What is deleteOne() vs deleteMany()?  
20. What is upsert in MongoDB?  

========================================================
SECTION 3 — QUERYING & FILTERING DOCUMENTS
========================================================
21. What is the use of comparison operators ($eq, $gt, $lt, $gte, $lte)?  
22. What are logical operators ($and, $or, $not, $nor)?  
23. What are array query operators ($in, $nin, $elemMatch)?  
24. How do you query nested documents?  
25. What is projection in MongoDB queries?  
26. How do you sort documents in MongoDB?  
27. What is skip() and limit() used for?  
28. What is the difference between $regex and LIKE in SQL?  
29. How do you query for missing or null fields?  
30. What is the $exists operator?  

========================================================
SECTION 4 — INDEXING IN MONGODB
========================================================
31. What is an index in MongoDB?  
32. How do you create an index in MongoDB?  
33. What is a single-field index?  
34. What is a compound index?  
35. What is index cardinality and why is it important?  
36. What are unique and sparse indexes?  
37. What is a TTL (Time-To-Live) index?  
38. What is a text index and how does full-text search work?  
39. What is a hashed index and when is it used?  
40. How do you view and drop indexes?  

========================================================
SECTION 5 — AGGREGATION FRAMEWORK
========================================================
41. What is the aggregation pipeline in MongoDB?  
42. What are aggregation stages (match, group, project, sort, limit)?  
43. What is the difference between find() and aggregate()?  
44. How does the $match stage work?  
45. What is the $group stage used for?  
46. What is the $project stage?  
47. What is the $lookup stage and how does MongoDB join collections?  
48. What is the $unwind stage used for?  
49. What is the $facet stage?  
50. What is the $addFields stage?  

========================================================
SECTION 6 — DATA MODELING IN MONGODB
========================================================
51. What is schema design in MongoDB?  
52. What is the difference between embedding and referencing?  
53. When should you embed data?  
54. When should you reference data?  
55. What is data denormalization in MongoDB?  
56. What are the trade-offs between embedding and referencing?  
57. What is a one-to-many relationship in MongoDB?  
58. How do you model many-to-many relationships?  
59. What is schema validation in MongoDB?  
60. What is a capped collection and when is it used?  

========================================================
SECTION 7 — REPLICATION & HIGH AVAILABILITY
========================================================
61. What is replication in MongoDB?  
62. What is a replica set?  
63. What is the role of primary, secondary, and arbiter nodes?  
64. How does automatic failover work in MongoDB?  
65. What is write concern in MongoDB?  
66. What is read preference?  
67. What is oplog (operations log) in MongoDB replication?  

========================================================
SECTION 8 — SHARDING & SCALABILITY
========================================================
68. What is sharding in MongoDB?  
69. What is a shard key and why is it important?  
70. What is a mongos router?  
71. What is a config server in a sharded cluster?  
72. What is zone sharding?  
73. When should you shard a collection?  
74. What is horizontal scaling vs vertical scaling?  

========================================================
SECTION 9 — TRANSACTIONS IN MONGODB
========================================================
75. What are multi-document transactions?  
76. How do transactions differ from SQL transactions?  
77. What is session.startTransaction()?  
78. What are read and write concerns in transactions?  
79. What are common transaction use cases in MongoDB?  

========================================================
SECTION 10 — MONGODB ATLAS & CLOUD OPERATIONS
========================================================
80. What is MongoDB Atlas?  
81. How do you deploy a cluster in MongoDB Atlas?  
82. What are the features of Atlas (backups, monitoring, auto-scaling)?  
83. What is Atlas Data API?  
84. What is Atlas Search and how does it work?  
85. How do you configure network access and IP whitelisting in Atlas?  

========================================================
SECTION 11 — MONGODB WITH NODE.JS (MONGOOSE / DRIVER)
========================================================
86. What is the MongoDB Node.js driver?  
87. What is Mongoose and why is it used?  
88. What are schemas and models in Mongoose?  
89. What are mongoose middleware hooks (pre, post)?  
90. What are virtual fields in Mongoose?  
91. What is population in Mongoose?  
92. How do you handle validation in Mongoose?  
93. What is lean() in Mongoose and why is it used?  

========================================================
SECTION 12 — SECURITY IN MONGODB
========================================================
94. What is authentication and authorization in MongoDB?  
95. What is role-based access control (RBAC)?  
96. What is TLS/SSL encryption in MongoDB?  
97. How do you secure MongoDB against injection attacks?  
98. What is IP binding in MongoDB and why is it important?  
99. What is auditing in MongoDB?  
100. What are common security best practices for MongoDB deployment?  

========================================================

*/