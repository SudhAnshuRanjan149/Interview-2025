/*

MASTER POSTGRESQL INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — POSTGRESQL BASICS & FUNDAMENTALS
========================================================
1. What is PostgreSQL and how is it different from other relational databases?  
2. What are the key features that make PostgreSQL powerful?  
3. What are databases, schemas, tables, and roles in PostgreSQL?  
4. What is the PostgreSQL architecture (process-based architecture)?  
5. What are PostgreSQL data types?  
6. What are composite types and enum types?  
7. What is the difference between CHAR, VARCHAR, and TEXT?  
8. What is the difference between SERIAL, BIGSERIAL, and IDENTITY columns?  
9. What is the PostgreSQL config file (postgresql.conf) used for?  
10. What is pg_hba.conf and why is it important?  

========================================================
SECTION 2 — SQL BASICS IN POSTGRES
========================================================
11. What is the SELECT statement in PostgreSQL?  
12. What is the WHERE clause and how is filtering done?  
13. What is DISTINCT and how does it work?  
14. How do ORDER BY and LIMIT work in PostgreSQL?  
15. What are aggregate functions in PostgreSQL?  
16. What is GROUP BY and HAVING?  
17. What is BETWEEN, LIKE, and ILIKE in PostgreSQL?  
18. What is the difference between NULL, IS NULL, and COALESCE()?  
19. What is the RETURNING clause?  
20. What is the FETCH clause and how does pagination work?  

========================================================
SECTION 3 — JOINS & RELATIONSHIPS
========================================================
21. What are the different types of joins in PostgreSQL?  
22. What is the difference between INNER, LEFT, RIGHT, and FULL JOIN?  
23. What is CROSS JOIN and SELF JOIN?  
24. What is USING vs ON in JOIN conditions?  
25. What is the difference between JOIN and UNION?  
26. What is NATURAL JOIN?  

========================================================
SECTION 4 — ADVANCED POSTGRESQL QUERIES
========================================================
27. What is a subquery?  
28. What is the difference between correlated and uncorrelated subqueries?  
29. What is EXISTS and how is it used?  
30. What is the WITH clause in PostgreSQL?  
31. What are Common Table Expressions (CTEs)?  
32. What are recursive CTEs?  
33. What is windowing and what are window functions?  
34. What is ROW_NUMBER, RANK, and DENSE_RANK?  
35. What is LAG and LEAD?  
36. What is FILTER clause in aggregate functions?  

========================================================
SECTION 5 — POSTGRESQL DATA MODELING & NORMALIZATION
========================================================
37. What is database normalization?  
38. What are 1NF, 2NF, 3NF, BCNF in PostgreSQL context?  
39. What is schema design and normalization trade-offs?  
40. What is denormalization and when is it useful?  
41. What are primary, foreign, and unique keys in PostgreSQL?  
42. What are check constraints and exclusion constraints?  

========================================================
SECTION 6 — INDEXING IN POSTGRESQL
========================================================
43. What is an index and why is it used?  
44. What are B-tree indexes and when are they used?  
45. What are Hash, GiST, GIN, SP-GiST, and BRIN indexes?  
46. What is index selectivity and why is it important?  
47. What is a partial index?  
48. What is an expression index?  
49. What is a covering index?  
50. What is index-only scanning?  
51. How do you analyze index performance?  

========================================================
SECTION 7 — POSTGRESQL STORED PROCEDURES & FUNCTIONS
========================================================
52. What are stored functions in PostgreSQL?  
53. What languages does PostgreSQL support for functions (PL/pgSQL, PL/Python, etc.)?  
54. What is the difference between a stored procedure and a function?  
55. What is the difference between IMMUTABLE, STABLE, and VOLATILE functions?  
56. What are triggers in PostgreSQL?  
57. What are BEFORE, AFTER, and INSTEAD OF triggers?  
58. What are trigger functions?  

========================================================
SECTION 8 — TRANSACTIONS & CONCURRENCY CONTROL
========================================================
59. What is a transaction in PostgreSQL?  
60. What are ACID properties?  
61. What is the difference between COMMIT and ROLLBACK?  
62. What are isolation levels in PostgreSQL?  
63. What is MVCC (Multi-Version Concurrency Control)?  
64. What are row-level locks and table-level locks?  
65. What is deadlock and how does PostgreSQL prevent it?  
66. What is the difference between advisory and explicit locks?  

========================================================
SECTION 9 — PERFORMANCE OPTIMIZATION & ANALYSIS
========================================================
67. What is EXPLAIN and EXPLAIN ANALYZE?  
68. How do you interpret a query execution plan?  
69. What is VACUUM and what does it do?  
70. What is VACUUM FULL?  
71. What is ANALYZE and why is it important?  
72. What is autovacuum and how does it work?  
73. What is checkpointing in PostgreSQL?  
74. What is connection pooling (PgBouncer)?  
75. What are materialized views and when should you use them?  

========================================================
SECTION 10 — JSON, ARRAYS & SPECIAL DATA TYPES
========================================================
76. What is JSON and JSONB in PostgreSQL?  
77. What is the difference between JSON and JSONB?  
78. How do you query JSONB efficiently?  
79. What are PostgreSQL array types?  
80. How do you work with array operators in PostgreSQL?  
81. What is hstore and how is it used?  

========================================================
SECTION 11 — SECURITY IN POSTGRESQL
========================================================
82. What are roles and privileges in PostgreSQL?  
83. What is GRANT and REVOKE?  
84. What is row-level security (RLS)?  
85. What is data encryption at rest and in transit?  
86. What is pg_hba.conf and how does it manage authentication?  
87. What is SQL injection and how to prevent it?  

========================================================
SECTION 12 — BACKUP, RESTORE & HIGH AVAILABILITY
========================================================
88. What are logical backups (pg_dump, pg_restore)?  
89. What are physical backups in PostgreSQL?  
90. What is WAL (Write-Ahead Logging)?  
91. What is PITR (Point-In-Time Recovery)?  
92. What is streaming replication?  
93. What is a hot standby server?  
94. What are failover and switchover?  
95. What is pg_basebackup?  

========================================================
SECTION 13 — POSTGRESQL EXTENSIONS & ECOSYSTEM
========================================================
96. What are PostgreSQL extensions?  
97. What is PostGIS and what does it do?  
98. What is pg_stat_statements?  
99. What is TimescaleDB and how is it used for time-series data?  
100. What is Citus and how does it enable distributed PostgreSQL?  

========================================================

*/