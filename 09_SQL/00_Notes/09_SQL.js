/*

MASTER SQL INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — SQL BASICS & FUNDAMENTALS
========================================================
1. What is SQL and why is it used?  
2. What is the difference between SQL and a database?  
3. What are relational databases?  
4. What are tables, rows, and columns?  
5. What are primary keys and why are they important?  
6. What are foreign keys and how do they maintain relationships?  
7. What is a composite key?  
8. What are constraints in SQL (PRIMARY KEY, UNIQUE, CHECK, etc.)?  
9. What is the difference between a schema and a database?  
10. What are SQL data types?  

========================================================
SECTION 2 — SQL QUERIES (SELECT, FILTERING, SORTING)
========================================================
11. What is the SELECT statement?  
12. What is the WHERE clause?  
13. What is the difference between WHERE and HAVING?  
14. What is the ORDER BY clause?  
15. What is DISTINCT used for?  
16. What are comparison operators (=, >, <, BETWEEN, LIKE, IN)?  
17. What is the LIMIT or TOP clause?  
18. What is pattern matching using LIKE?  
19. What is the difference between LIKE and ILIKE?  
20. What is NULL and how do you check for it?  

========================================================
SECTION 3 — JOINS & RELATIONSHIPS
========================================================
21. What is a JOIN in SQL?  
22. What is INNER JOIN?  
23. What is LEFT JOIN?  
24. What is RIGHT JOIN?  
25. What is FULL OUTER JOIN?  
26. What is CROSS JOIN?  
27. What is SELF JOIN?  
28. What is the difference between JOIN and UNION?  
29. What are equi-joins and non-equi joins?  
30. What is a natural join?  

========================================================
SECTION 4 — AGGREGATIONS & GROUPING
========================================================
31. What are aggregate functions (COUNT, SUM, AVG, MIN, MAX)?  
32. How does GROUP BY work?  
33. What is the difference between GROUP BY and DISTINCT?  
34. What is HAVING and how does it relate to GROUP BY?  
35. What is the difference between COUNT(*) and COUNT(column)?  

========================================================
SECTION 5 — SUBQUERIES & ADVANCED QUERYING
========================================================
36. What is a subquery?  
37. What is the difference between correlated and non-correlated subqueries?  
38. What is EXISTS and how does it work?  
39. What is the difference between IN and EXISTS?  
40. What are scalar, multi-row, and table subqueries?  
41. How do you use subqueries inside SELECT, FROM, and WHERE clauses?  
42. What is a Common Table Expression (CTE)?  
43. What is the WITH clause used for?  
44. What is the difference between CTE and subquery?  
45. What are recursive CTEs?  

========================================================
SECTION 6 — DATA MODIFICATION (DML)
========================================================
46. What are DML commands (INSERT, UPDATE, DELETE)?  
47. What is INSERT INTO SELECT?  
48. What is the difference between DELETE and TRUNCATE?  
49. What is MERGE and how is it used?  
50. What is UPSERT?  

========================================================
SECTION 7 — DATA DEFINITION (DDL)
========================================================
51. What are DDL commands (CREATE, ALTER, DROP)?  
52. How do you create a table in SQL?  
53. What are indexes and why are they important?  
54. What is the difference between clustered and non-clustered indexes?  
55. What is a unique index?  
56. What is a composite index?  
57. What is the difference between DROP, TRUNCATE, and DELETE?  

========================================================
SECTION 8 — INDEXING & QUERY OPTIMIZATION
========================================================
58. How do indexes improve performance?  
59. What are the drawbacks of using too many indexes?  
60. What is index selectivity?  
61. What is a covering index?  
62. What is an execution plan?  
63. What is query optimization?  
64. What is cardinality?  
65. What is a clustered index scan vs seek?  

========================================================
SECTION 9 — TRANSACTIONS & CONCURRENCY
========================================================
66. What is a transaction in SQL?  
67. What are ACID properties?  
68. What is commit and rollback?  
69. What are transaction isolation levels?  
70. What is dirty read, non-repeatable read, and phantom read?  
71. What is deadlock in SQL and how can it be prevented?  
72. What is optimistic vs pessimistic locking?  

========================================================
SECTION 10 — STORED PROCEDURES, FUNCTIONS & TRIGGERS
========================================================
73. What is a stored procedure?  
74. What is a user-defined function (UDF)?  
75. What is the difference between stored procedures and functions?  
76. What are triggers in SQL?  
77. What are BEFORE and AFTER triggers?  
78. What are INSTEAD OF triggers?  
79. What are views and why are they used?  
80. What is a materialized view?  

========================================================
SECTION 11 — ADVANCED SQL (ANALYTICS & WINDOW FUNCTIONS)
========================================================
81. What are window functions in SQL?  
82. What is ROW_NUMBER and how is it used?  
83. What is RANK vs DENSE_RANK?  
84. What is LAG and LEAD?  
85. What is PARTITION BY in window functions?  
86. What is ORDER BY in window functions?  
87. What is a moving average?  
88. What is NTILE?  
89. What is FIRST_VALUE and LAST_VALUE?  
90. What is the OVER() clause?  

========================================================
SECTION 12 — DATABASE DESIGN & NORMALIZATION
========================================================
91. What is database normalization?  
92. What are the different normal forms (1NF, 2NF, 3NF, BCNF)?  
93. What is denormalization and when is it used?  
94. What is a surrogate key?  
95. What is database indexing strategy?  
96. What is ER modeling (Entity-Relationship modeling)?  
97. What is referential integrity?  

========================================================
SECTION 13 — NOSQL BASICS (FOR FULL-STACK INTERVIEWS)
========================================================
98. What are the main differences between SQL and NoSQL?  
99. What is a document database?  
100. What is a key-value store?  
101. What is a column-family database?  
102. What is eventual consistency?  
103. When should you use SQL vs NoSQL?  

========================================================
SECTION 14 — SQL IN PRACTICAL INTERVIEW SCENARIOS
========================================================
104. How do you find duplicate records in a table?  
105. How do you find the second highest salary?  
106. How do you find employees who are not in another table?  
107. How do you retrieve top N records?  
108. How do you pivot rows into columns?  
109. How do you unpivot columns into rows?  
110. How do you remove duplicates while keeping the latest record?  

========================================================

*/