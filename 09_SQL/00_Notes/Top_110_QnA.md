# 🗄️ SQL Interview Answers — Complete Guide

> **110 Questions | Layman Language | Real Examples | Interview-Ready Answers**

---

## 📌 SECTION 1 — SQL BASICS & FUNDAMENTALS

---

### Q1. What is SQL and why is it used?

**Simple Explanation:**
SQL (Structured Query Language) is the language you use to talk to a relational database. Think of a database as a massive Excel file with millions of rows — SQL is how you ask it questions: "Give me all customers from Mumbai who spent more than ₹5000."

**Interview Answer:**

> "SQL stands for Structured Query Language. It is the standard language used to interact with relational databases — to create tables, insert data, query data, update records, and delete data. It's used because almost every business stores data in structured tables and needs a reliable, standardized way to query and manipulate that data. SQL is used in MySQL, PostgreSQL, SQL Server, Oracle, and SQLite."

---

### Q2. What is the difference between SQL and a database?

**Interview Answer:**

> "A **database** is the actual storage system — the software that stores and manages data (e.g., MySQL, PostgreSQL). **SQL** is the language used to communicate with that database. The database is the filing cabinet; SQL is how you open drawers and find files. You write SQL queries; the database engine executes them."

---

### Q3. What are relational databases?

**Simple Explanation:**
A relational database stores data in tables (like spreadsheets) and allows those tables to be **related** to each other through shared columns. Like how an `orders` table can reference a `customers` table using a customer ID.

**Interview Answer:**

> "A relational database organizes data into structured tables (rows and columns) and defines relationships between those tables using keys. Data is stored without duplication — instead of repeating customer info in every order, you store the customer ID and join the tables when needed. Examples: MySQL, PostgreSQL, Oracle, SQL Server."

---

### Q4. What are tables, rows, and columns?

**Interview Answer:**

> "A **table** is a collection of related data, like a spreadsheet. Each **column** represents an attribute (e.g., `name`, `email`, `age`). Each **row** (also called a record or tuple) represents one entry — one customer, one order, one product."

```
users table:
| id | name    | email              | age |
|----|---------|---------------------|-----|
| 1  | Alice   | alice@email.com    | 28  |
| 2  | Bob     | bob@email.com      | 34  |
```

---

### Q5. What are primary keys and why are they important?

**Simple Explanation:**
A primary key is like an Aadhaar number — it uniquely identifies every row. No two rows can have the same primary key value, and it can never be NULL.

**Interview Answer:**

> "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It enforces entity integrity — no duplicate rows, no NULL values. Every table should have a primary key. It also speeds up lookups because databases automatically create an index on primary keys."

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);
```

---

### Q6. What are foreign keys and how do they maintain relationships?

**Simple Explanation:**
A foreign key is a column in one table that refers to the primary key of another table. It's a reference — like writing someone's Aadhaar number on a document to link it to that person.

**Interview Answer:**

> "A foreign key is a column that references the primary key of another table. It enforces **referential integrity** — you can't insert an order for a customer that doesn't exist, and you can't delete a customer who still has orders (unless you use CASCADE). It's how relational databases model relationships between entities."

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  amount DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### Q7. What is a composite key?

**Interview Answer:**

> "A composite key is a primary key made up of **two or more columns** together. Neither column alone uniquely identifies a row, but their combination does. Common in junction/mapping tables."

```sql
-- student_courses table: one student can take many courses
CREATE TABLE student_courses (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id) -- composite key
);
```

---

### Q8. What are constraints in SQL?

**Interview Answer:**

> "Constraints are rules enforced on columns to ensure data integrity:
>
> * `PRIMARY KEY` — Unique + NOT NULL identifier
> * `FOREIGN KEY` — References another table's PK
> * `UNIQUE` — No duplicate values in the column
> * `NOT NULL` — Column must always have a value
> * `CHECK` — Custom condition must be true (e.g., age > 0)
> * `DEFAULT` — Default value if none is provided"

```sql
CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  age INT CHECK (age >= 18),
  salary DECIMAL DEFAULT 30000.00
);
```

---

### Q9. What is the difference between a schema and a database?

**Interview Answer:**

> "A **database** is the top-level container that holds everything. A **schema** is a logical grouping of database objects (tables, views, procedures) inside a database. Think of the database as a building and schemas as floors — each floor has its own set of rooms (tables). In PostgreSQL, one database can have multiple schemas (e.g., `public`, `hr`, `sales`). In MySQL, schema and database are essentially the same thing."

---

### Q10. What are SQL data types?

**Interview Answer:**

> "Common SQL data types:
>
> * **Numeric** : `INT`, `BIGINT`, `DECIMAL(10,2)`, `FLOAT`
> * **String** : `VARCHAR(n)`, `CHAR(n)`, `TEXT`
> * **Date/Time** : `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`
> * **Boolean** : `BOOLEAN` (TRUE/FALSE)
> * **Binary** : `BLOB` (for images, files)
>
> Use `VARCHAR` for variable-length strings, `CHAR` for fixed-length (like country codes), `DECIMAL` for money (not FLOAT — floating-point rounding errors)."

---

## 📌 SECTION 2 — SQL QUERIES (SELECT, FILTERING, SORTING)

---

### Q11. What is the SELECT statement?

**Interview Answer:**

> "SELECT is the most fundamental SQL command — it retrieves data from one or more tables. You specify which columns you want, which table to read from, and optionally filter/sort the results."

```sql
SELECT name, email FROM users;        -- specific columns
SELECT * FROM users;                   -- all columns
SELECT name, salary * 12 AS annual_salary FROM employees; -- computed column
```

---

### Q12. What is the WHERE clause?

**Interview Answer:**

> "WHERE filters rows based on a condition. Only rows where the condition is TRUE are returned. It runs before GROUP BY and aggregation."

```sql
SELECT * FROM employees WHERE department = 'Engineering';
SELECT * FROM orders WHERE amount > 1000 AND status = 'paid';
```

---

### Q13. What is the difference between WHERE and HAVING?

**Interview Answer:**

> "**WHERE** filters individual rows **before** grouping happens. **HAVING** filters groups **after** GROUP BY is applied. You cannot use aggregate functions like `COUNT()` or `SUM()` in WHERE — that's what HAVING is for."

```sql
-- WHERE filters rows before grouping
SELECT department, COUNT(*) AS emp_count
FROM employees
WHERE status = 'active'           -- filter rows first
GROUP BY department
HAVING COUNT(*) > 5;              -- then filter groups
```

|            | WHERE           | HAVING         |
| ---------- | --------------- | -------------- |
| Filters    | Rows            | Groups         |
| When       | Before GROUP BY | After GROUP BY |
| Aggregates | ❌ Not allowed  | ✅ Allowed     |

---

### Q14. What is the ORDER BY clause?

**Interview Answer:**

> "ORDER BY sorts the result set by one or more columns. Default is ascending (`ASC`). Use `DESC` for descending. Always applied last in query execution."

```sql
SELECT name, salary FROM employees ORDER BY salary DESC;
SELECT name, department, salary FROM employees ORDER BY department ASC, salary DESC;
```

---

### Q15. What is DISTINCT used for?

**Interview Answer:**

> "DISTINCT removes duplicate values from the result set. It operates on the entire selected row — two rows are duplicates only if ALL selected columns match."

```sql
SELECT DISTINCT department FROM employees;
-- Returns unique department names only

SELECT DISTINCT city, country FROM customers;
-- Unique (city, country) combinations
```

---

### Q16. What are comparison operators?

**Interview Answer:**

> "SQL comparison operators:
>
> * `=` — Equal to
> * `<>` or `!=` — Not equal
> * `>`, `<`, `>=`, `<=` — Greater/Less than
> * `BETWEEN a AND b` — Inclusive range
> * `IN (a, b, c)` — Match any in list
> * `LIKE 'pattern'` — Pattern matching"

```sql
SELECT * FROM products WHERE price BETWEEN 100 AND 500;
SELECT * FROM users WHERE city IN ('Mumbai', 'Delhi', 'Pune');
SELECT * FROM employees WHERE name LIKE 'A%';  -- starts with A
```

---

### Q17. What is the LIMIT / TOP clause?

**Interview Answer:**

> "Limits the number of rows returned. Syntax varies by database:
>
> * MySQL/PostgreSQL: `LIMIT n`
> * SQL Server: `TOP n`
> * Oracle: `ROWNUM` or `FETCH FIRST n ROWS ONLY`"

```sql
-- MySQL/PostgreSQL
SELECT * FROM products ORDER BY price DESC LIMIT 10;

-- SQL Server
SELECT TOP 10 * FROM products ORDER BY price DESC;
```

---

### Q18. What is pattern matching using LIKE?

**Interview Answer:**

> "LIKE is used to search for patterns in string columns using wildcards:
>
> * `%` — Matches zero or more characters
> * `_` — Matches exactly one character"

```sql
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- ends with @gmail.com
SELECT * FROM users WHERE name LIKE 'J__n';          -- John, Joan (4 chars, starts J, ends n)
SELECT * FROM products WHERE code LIKE 'PRD_%';      -- starts with PRD_
```

---

### Q19. What is the difference between LIKE and ILIKE?

**Interview Answer:**

> "`LIKE` is case-sensitive — `LIKE 'John'` won't match 'john'. `ILIKE` (PostgreSQL-specific) is case-insensitive. In MySQL, LIKE is case-insensitive by default for non-binary strings. For case-insensitive search in SQL Server, use `COLLATE` or `LOWER()`."

```sql
-- PostgreSQL
SELECT * FROM users WHERE name ILIKE 'john%'; -- matches John, JOHN, john

-- MySQL (case-insensitive by default)
SELECT * FROM users WHERE name LIKE 'john%'; -- matches all cases
```

---

### Q20. What is NULL and how do you check for it?

**Simple Explanation:**
NULL means "unknown" or "missing value" — it's NOT the same as zero or an empty string. NULL ≠ NULL. You can't check for NULL using `= NULL`; you must use `IS NULL`.

**Interview Answer:**

> "NULL represents the absence of a value — it's unknown, not zero or empty string. Because NULL is not a value, you can't use `= NULL` or `!= NULL`. You must use `IS NULL` or `IS NOT NULL`. Any arithmetic with NULL returns NULL. Any comparison with NULL returns NULL (not TRUE or FALSE)."

```sql
SELECT * FROM employees WHERE manager_id IS NULL;      -- unmanaged employees
SELECT * FROM customers WHERE phone IS NOT NULL;       -- customers with phone

-- NULL in arithmetic
SELECT 100 + NULL; -- returns NULL!

-- Handle NULLs with COALESCE
SELECT name, COALESCE(phone, 'N/A') AS phone FROM customers;
```

---

## 📌 SECTION 3 — JOINS & RELATIONSHIPS

---

### Q21. What is a JOIN in SQL?

**Simple Explanation:**
A JOIN combines rows from two or more tables based on a related column. Like merging two Excel sheets using a common column (customer ID).

**Interview Answer:**

> "A JOIN is used to combine rows from two or more tables based on a related column between them. Without joins, you'd need multiple queries and manual data merging. Joins let you retrieve related data in one query."

---

### Q22. What is INNER JOIN?

**Interview Answer:**

> "INNER JOIN returns only the rows where there is a match in **both** tables. If a customer has no orders, they won't appear. If an order has no matching customer, it won't appear either. It's the most common join."

```sql
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
-- Only users who have at least one order
```

```
users: 1-Alice, 2-Bob, 3-Charlie
orders: user_id=1 (₹500), user_id=2 (₹300)
INNER JOIN result: Alice-₹500, Bob-₹300  ← Charlie excluded (no orders)
```

---

### Q23. What is LEFT JOIN?

**Interview Answer:**

> "LEFT JOIN (or LEFT OUTER JOIN) returns **all rows from the left table** and the matched rows from the right table. If there's no match on the right, columns from the right table show NULL. Use it when you want all records from the left table regardless of whether they have a match."

```sql
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
-- All users, even those with no orders (amount will be NULL)
```

```
Result: Alice-₹500, Bob-₹300, Charlie-NULL
```

---

### Q24. What is RIGHT JOIN?

**Interview Answer:**

> "RIGHT JOIN is the mirror of LEFT JOIN — returns **all rows from the right table** and matched rows from the left. Less commonly used; most people convert a RIGHT JOIN into a LEFT JOIN by swapping table order for readability."

```sql
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
-- All orders, even if the user doesn't exist (e.g., deleted users)
```

---

### Q25. What is FULL OUTER JOIN?

**Interview Answer:**

> "FULL OUTER JOIN returns  **all rows from both tables** . Where there's no match, NULLs fill the gaps. Useful for finding records that exist in one table but not the other."

```sql
SELECT users.name, orders.amount
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;
-- All users AND all orders; NULL where no match on either side
```

> ⚠️ MySQL doesn't support FULL OUTER JOIN directly — simulate it with `LEFT JOIN UNION RIGHT JOIN`.

---

### Q26. What is CROSS JOIN?

**Interview Answer:**

> "CROSS JOIN produces a **Cartesian product** — every row from the first table is combined with every row from the second. If table A has 5 rows and table B has 3 rows, the result has 15 rows. Rarely used in practice; useful for generating combinations."

```sql
SELECT colors.name, sizes.name
FROM colors
CROSS JOIN sizes;
-- Combines every color with every size: Red-S, Red-M, Red-L, Blue-S...
```

---

### Q27. What is SELF JOIN?

**Interview Answer:**

> "A SELF JOIN joins a table with itself. Used when rows in a table have a relationship to other rows in the same table — like an employee and their manager (both in the `employees` table)."

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
-- e and m are aliases for the same table
```

---

### Q28. What is the difference between JOIN and UNION?

| JOIN                          | UNION                             |
| ----------------------------- | --------------------------------- |
| Combines columns horizontally | Combines rows vertically          |
| Merges related tables         | Stacks results of two queries     |
| Needs a matching condition    | Column count and types must match |

**Interview Answer:**

> "JOIN merges two tables **side by side** based on a related column — adding more columns. UNION stacks two query results **on top of each other** — adding more rows. UNION removes duplicates; UNION ALL keeps them."

```sql
-- JOIN: wider result (more columns)
SELECT u.name, o.amount FROM users u JOIN orders o ON u.id = o.user_id;

-- UNION: taller result (more rows)
SELECT name FROM customers
UNION
SELECT name FROM suppliers;
```

---

### Q29. What are equi-joins and non-equi joins?

**Interview Answer:**

> "An **equi-join** uses `=` to match rows between tables (most common). A **non-equi join** uses other operators like `>`, `<`, `BETWEEN` to match rows."

```sql
-- Equi-join
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;

-- Non-equi join: find salary grade for each employee
SELECT e.name, g.grade
FROM employees e
JOIN salary_grades g ON e.salary BETWEEN g.min_salary AND g.max_salary;
```

---

### Q30. What is a natural join?

**Interview Answer:**

> "A NATURAL JOIN automatically joins tables on all columns that share the  **same name and data type** . No need to specify the ON condition. Avoid it in production — if column names change, queries silently break."

```sql
SELECT * FROM orders NATURAL JOIN customers;
-- Automatically joins on any common column names (e.g., customer_id)
```

---

## 📌 SECTION 4 — AGGREGATIONS & GROUPING

---

### Q31. What are aggregate functions?

**Interview Answer:**

> "Aggregate functions compute a single value from a set of rows:
>
> * `COUNT()` — Number of rows
> * `SUM()` — Total of values
> * `AVG()` — Average value
> * `MIN()` — Smallest value
> * `MAX()` — Largest value
>
> They ignore NULL values (except COUNT(*))."

```sql
SELECT
  COUNT(*) AS total_employees,
  AVG(salary) AS avg_salary,
  MAX(salary) AS highest_salary,
  MIN(salary) AS lowest_salary,
  SUM(salary) AS total_payroll
FROM employees;
```

---

### Q32. How does GROUP BY work?

**Simple Explanation:**
GROUP BY is like sorting your receipts into piles by category, then doing math on each pile. "How much did I spend per category?"

**Interview Answer:**

> "GROUP BY groups rows that have the same value in specified columns, then applies aggregate functions to each group. Every column in SELECT must either be in GROUP BY or wrapped in an aggregate function."

```sql
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Result:
-- Engineering | 25 | 85000
-- Marketing   | 10 | 60000
-- HR          | 8  | 55000
```

---

### Q33. What is the difference between GROUP BY and DISTINCT?

**Interview Answer:**

> "Both can remove duplicates, but they serve different purposes. **DISTINCT** simply removes duplicate rows from the result. **GROUP BY** groups rows and lets you apply aggregate functions to each group. If you don't use any aggregates, `GROUP BY col` and `SELECT DISTINCT col` give the same result — but GROUP BY is meant for aggregation."

```sql
SELECT DISTINCT department FROM employees;           -- unique departments
SELECT department, COUNT(*) FROM employees GROUP BY department; -- + count per group
```

---

### Q34. What is HAVING and how does it relate to GROUP BY?

**Interview Answer:**

> "HAVING filters groups created by GROUP BY, similar to how WHERE filters rows. You use HAVING when you want to filter based on an aggregate result — e.g., 'only departments with more than 10 employees.'"

```sql
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 10;  -- only departments with more than 10 employees
```

---

### Q35. What is the difference between COUNT(*) and COUNT(column)?

**Interview Answer:**

> "`COUNT(*)` counts **all rows** including those with NULL values. `COUNT(column)` counts only the rows where that specific column is  **NOT NULL** . Use COUNT(*) to count total rows; use COUNT(column) to count non-null entries in a column."

```sql
SELECT
  COUNT(*) AS total_rows,           -- counts all rows
  COUNT(phone) AS rows_with_phone,  -- ignores NULL phone values
  COUNT(DISTINCT city) AS unique_cities
FROM customers;
```

---

## 📌 SECTION 5 — SUBQUERIES & ADVANCED QUERYING

---

### Q36. What is a subquery?

**Simple Explanation:**
A subquery is a query inside another query — like asking "find employees who earn more than the average salary" where "average salary" itself is a query.

**Interview Answer:**

> "A subquery (or inner query) is a SELECT statement nested inside another SQL statement. The inner query runs first, and its result is used by the outer query. Subqueries can appear in SELECT, FROM, WHERE, and HAVING clauses."

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
-- First: calculate average salary
-- Then: return employees earning above that average
```

---

### Q37. What is the difference between correlated and non-correlated subqueries?

**Interview Answer:**

> "A **non-correlated subquery** runs once independently — its result doesn't depend on the outer query. A **correlated subquery** references the outer query and runs once per row of the outer query — it's like a nested loop and can be slow."

```sql
-- Non-correlated: inner query runs ONCE
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Correlated: inner query runs for EACH row of outer query
SELECT name, salary FROM employees e1
WHERE salary > (
  SELECT AVG(salary) FROM employees e2
  WHERE e2.department = e1.department  -- references outer query!
);
```

---

### Q38. What is EXISTS and how does it work?

**Interview Answer:**

> "EXISTS checks whether a subquery returns  **any rows at all** . It returns TRUE if the subquery returns at least one row, FALSE if it returns nothing. It stops as soon as it finds the first match — making it efficient."

```sql
-- Find customers who have placed at least one order
SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

---

### Q39. What is the difference between IN and EXISTS?

| IN                                    | EXISTS                                     |
| ------------------------------------- | ------------------------------------------ |
| Returns list of values, compares each | Just checks if any row exists              |
| Slower for large subquery results     | Faster for large datasets (short-circuits) |
| Fails with NULL values in the list    | Not affected by NULLs                      |

**Interview Answer:**

> "`IN` compares a value against a list of values returned by the subquery. `EXISTS` just checks if any rows exist — it doesn't return values. EXISTS is generally faster for large datasets because it short-circuits on first match. IN can behave unexpectedly when the subquery returns NULLs."

```sql
-- IN
SELECT * FROM employees WHERE department_id IN (SELECT id FROM departments WHERE location = 'Mumbai');

-- EXISTS (same logic, often faster)
SELECT * FROM employees e
WHERE EXISTS (SELECT 1 FROM departments d WHERE d.id = e.department_id AND d.location = 'Mumbai');
```

---

### Q40. What are scalar, multi-row, and table subqueries?

**Interview Answer:**

> "- **Scalar subquery** — Returns exactly one row, one column (a single value). Used in SELECT or WHERE.
>
> * **Multi-row subquery** — Returns multiple rows, one column. Used with IN, ANY, ALL.
> * **Table subquery** (derived table) — Returns multiple rows and columns. Used in FROM clause."

```sql
-- Scalar: returns one value
SELECT name, (SELECT AVG(salary) FROM employees) AS company_avg FROM employees;

-- Multi-row: returns list
SELECT name FROM employees WHERE dept_id IN (SELECT id FROM departments WHERE city = 'Delhi');

-- Table subquery (derived table): used in FROM
SELECT dept, avg_sal FROM (
  SELECT department AS dept, AVG(salary) AS avg_sal FROM employees GROUP BY department
) AS dept_summary
WHERE avg_sal > 70000;
```

---

### Q41. How do you use subqueries in SELECT, FROM, and WHERE?

```sql
-- Subquery in WHERE
SELECT name FROM products WHERE price > (SELECT AVG(price) FROM products);

-- Subquery in FROM (derived table / inline view)
SELECT dept, total FROM (
  SELECT department AS dept, SUM(salary) AS total FROM employees GROUP BY department
) AS summary;

-- Subquery in SELECT (scalar subquery)
SELECT name, salary, (SELECT AVG(salary) FROM employees) AS avg FROM employees;
```

---

### Q42. What is a Common Table Expression (CTE)?

**Simple Explanation:**
A CTE is like creating a temporary named result that you can reference within the same query. Think of it as giving a subquery a name so you can use it multiple times cleanly.

**Interview Answer:**

> "A CTE is a temporary named result set defined with the `WITH` clause. It exists only for the duration of the query. CTEs make complex queries more readable and can be referenced multiple times in the same query."

```sql
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees
  WHERE salary > 80000
)
SELECT department, COUNT(*) AS high_earner_count
FROM high_earners
GROUP BY department;
```

---

### Q43. What is the WITH clause used for?

**Interview Answer:**

> "The WITH clause defines one or more CTEs before the main query. You can define multiple CTEs separated by commas. They make queries more readable by breaking complex logic into named steps."

```sql
WITH
  dept_avg AS (SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department),
  high_depts AS (SELECT department FROM dept_avg WHERE avg_sal > 75000)
SELECT e.name, e.salary
FROM employees e
JOIN high_depts h ON e.department = h.department;
```

---

### Q44. What is the difference between CTE and subquery?

| CTE                                 | Subquery                           |
| ----------------------------------- | ---------------------------------- |
| Named, defined once with WITH       | Anonymous, defined inline          |
| Readable and reusable in same query | Can be repeated (code duplication) |
| Can be recursive                    | Cannot be recursive                |
| Evaluated once (sometimes)          | Re-evaluated each time referenced  |

**Interview Answer:**

> "Both serve similar purposes but CTEs are more readable — they name the logic at the top and reference it cleanly. CTEs can be referenced multiple times in the query. Most importantly, only CTEs support recursion. For simple cases, either works; for complex logic, CTEs win on readability."

---

### Q45. What are recursive CTEs?

**Interview Answer:**

> "Recursive CTEs reference themselves to process hierarchical data — like org charts, folder trees, or bill of materials. They have two parts: the **base case** (starting point) and the **recursive case** (repeats until no more rows)."

```sql
-- Find all employees under a given manager (org hierarchy)
WITH RECURSIVE org_chart AS (
  -- Base case: start with the top manager
  SELECT id, name, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: find employees under each manager
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level;
```

---

## 📌 SECTION 6 — DATA MODIFICATION (DML)

---

### Q46. What are DML commands?

**Interview Answer:**

> "DML (Data Manipulation Language) commands modify the data inside tables:
>
> * `INSERT` — Add new rows
> * `UPDATE` — Modify existing rows
> * `DELETE` — Remove rows
> * `SELECT` — Read data (sometimes classified separately as DQL)"

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@email.com');
UPDATE users SET email = 'new@email.com' WHERE id = 1;
DELETE FROM users WHERE id = 1;
```

---

### Q47. What is INSERT INTO SELECT?

**Interview Answer:**

> "INSERT INTO SELECT copies data from one table into another in a single statement. Used for data migration, archiving, or creating backup tables."

```sql
-- Copy all inactive users to an archive table
INSERT INTO users_archive (id, name, email, created_at)
SELECT id, name, email, created_at
FROM users
WHERE last_login < '2023-01-01';
```

---

### Q48. What is the difference between DELETE and TRUNCATE?

|                      | DELETE                      | TRUNCATE                   |
| -------------------- | --------------------------- | -------------------------- |
| Removes              | Specific rows (with WHERE)  | All rows                   |
| WHERE clause         | ✅ Yes                      | ❌ No                      |
| Rollback             | ✅ Yes (DML, transactional) | ❌ Usually not (DDL)       |
| Triggers             | ✅ Fires row triggers       | ❌ Does not fire triggers  |
| Speed                | Slower (row by row)         | Faster (deallocates pages) |
| Auto-increment reset | ❌ No                       | ✅ Yes (in most DBs)       |

**Interview Answer:**

> "DELETE removes specific rows (or all rows without WHERE) and can be rolled back — it fires triggers and logs each row deletion. TRUNCATE removes ALL rows instantly by deallocating data pages, cannot be rolled back in most databases, doesn't fire row-level triggers, and resets auto-increment counters."

---

### Q49. What is MERGE and how is it used?

**Interview Answer:**

> "MERGE (also called UPSERT in some databases) combines INSERT and UPDATE in one statement. If a matching row exists — UPDATE it. If it doesn't exist — INSERT it. Common for syncing data between a staging table and a main table."

```sql
MERGE INTO employees AS target
USING new_employee_data AS source
ON target.id = source.id
WHEN MATCHED THEN
  UPDATE SET target.salary = source.salary
WHEN NOT MATCHED THEN
  INSERT (id, name, salary) VALUES (source.id, source.name, source.salary);
```

---

### Q50. What is UPSERT?

**Interview Answer:**

> "UPSERT = UPDATE + INSERT. If the row exists, update it. If not, insert it. Different databases implement this differently:
>
> * PostgreSQL: `INSERT ... ON CONFLICT DO UPDATE`
> * MySQL: `INSERT ... ON DUPLICATE KEY UPDATE`
> * SQL Server: `MERGE`"

```sql
-- PostgreSQL
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@new.com')
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- MySQL
INSERT INTO users (id, name, email)
VALUES (1, 'Alice', 'alice@new.com')
ON DUPLICATE KEY UPDATE email = VALUES(email);
```

---

## 📌 SECTION 7 — DATA DEFINITION (DDL)

---

### Q51. What are DDL commands?

**Interview Answer:**

> "DDL (Data Definition Language) commands define and modify database structure:
>
> * `CREATE` — Create tables, indexes, views
> * `ALTER` — Modify existing table structure (add/drop columns, change types)
> * `DROP` — Permanently delete tables or other objects
> * `TRUNCATE` — Remove all data from a table (classified as DDL in most DBs)"

---

### Q52. How do you create a table in SQL?

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT chk_price CHECK (price > 0)
);
```

---

### Q53. What are indexes and why are they important?

**Simple Explanation:**
An index is like the index at the back of a book — instead of reading every page to find "normalization," you check the index and jump straight to page 245. Database indexes work the same way for rows.

**Interview Answer:**

> "An index is a data structure (usually a B-tree) that the database builds on one or more columns to speed up data retrieval. Without an index, the database does a full table scan (reads every row). With an index, it can jump directly to the relevant rows. Indexes dramatically speed up SELECT queries but slow down INSERT/UPDATE/DELETE slightly because the index must also be updated."

```sql
CREATE INDEX idx_users_email ON users(email);
-- Now queries like WHERE email = 'x@y.com' are super fast
```

---

### Q54. What is the difference between clustered and non-clustered indexes?

| Clustered Index                    | Non-Clustered Index                       |
| ---------------------------------- | ----------------------------------------- |
| Sorts and stores actual table data | Separate structure pointing to table data |
| Only ONE per table                 | Multiple per table                        |
| Usually on Primary Key             | On any column(s)                          |
| Faster for range queries           | Slightly slower (needs pointer lookup)    |

**Interview Answer:**

> "A **clustered index** physically reorders the rows in the table based on the index key — like a dictionary where words are in alphabetical order. Only one per table (usually the primary key). A **non-clustered index** is a separate structure with pointers to the actual rows — like the index at the back of a book. You can have many non-clustered indexes per table."

---

### Q55. What is a unique index?

**Interview Answer:**

> "A unique index enforces that no two rows have the same value in the indexed column(s). It's similar to a UNIQUE constraint — in fact, creating a UNIQUE constraint automatically creates a unique index."

```sql
CREATE UNIQUE INDEX idx_email_unique ON users(email);
-- Prevents duplicate emails and speeds up queries on email
```

---

### Q56. What is a composite index?

**Interview Answer:**

> "A composite (multi-column) index covers multiple columns. The order matters: the index is most effective when queries filter by the leading (leftmost) columns first. A composite index on `(last_name, first_name)` helps queries filtering by `last_name` or `(last_name, first_name)` — but NOT by `first_name` alone."

```sql
CREATE INDEX idx_name ON employees(last_name, first_name);
-- Useful for: WHERE last_name = 'Sharma'
-- Useful for: WHERE last_name = 'Sharma' AND first_name = 'Raj'
-- NOT useful for: WHERE first_name = 'Raj' (alone)
```

---

### Q57. What is the difference between DROP, TRUNCATE, and DELETE?

| Command  | Removes                  | Rollback | Where Clause | Type |
| -------- | ------------------------ | -------- | ------------ | ---- |
| DELETE   | Rows (selective)         | ✅ Yes   | ✅ Yes       | DML  |
| TRUNCATE | All rows                 | ❌ No    | ❌ No        | DDL  |
| DROP     | Entire table + structure | ❌ No    | N/A          | DDL  |

---

## 📌 SECTION 8 — INDEXING & QUERY OPTIMIZATION

---

### Q58. How do indexes improve performance?

**Interview Answer:**

> "Without an index, a query like `WHERE email = 'x@y.com'` requires a **full table scan** — reading every single row. With an index on email, the database uses the B-tree structure to find the matching row in O(log n) time instead of O(n). For a table with 10 million rows, the difference between a full scan and an index seek can be milliseconds vs minutes."

---

### Q59. What are the drawbacks of using too many indexes?

**Interview Answer:**

> "Indexes take up disk space and must be kept in sync with the table data. Every INSERT, UPDATE, and DELETE must also update all indexes on that table. Too many indexes slow down write operations. Also, the query optimizer might choose a suboptimal index. Rule of thumb: index columns used frequently in WHERE, JOIN, and ORDER BY — not every column."

---

### Q60. What is index selectivity?

**Interview Answer:**

> "Selectivity measures how unique the values in an indexed column are. High selectivity = many unique values (e.g., email, user ID) — index is very effective. Low selectivity = few unique values (e.g., gender, boolean flag) — index often not worth it because the DB might still scan most of the table."

---

### Q61. What is a covering index?

**Interview Answer:**

> "A covering index includes all columns needed for a query — so the database can answer the query entirely from the index without accessing the table at all. This is the fastest possible query execution."

```sql
-- Query
SELECT name, email FROM users WHERE department = 'Engineering';

-- Covering index: includes all needed columns
CREATE INDEX idx_covering ON users(department, name, email);
-- No need to touch the main table — everything is in the index!
```

---

### Q62. What is an execution plan?

**Interview Answer:**

> "An execution plan (or query plan) is the step-by-step strategy the database engine uses to execute a query. It shows which indexes are used, how tables are joined, in what order, and estimated costs. Use `EXPLAIN` (MySQL/PostgreSQL) or `EXPLAIN PLAN` (Oracle) to view it. Essential for debugging slow queries."

```sql
EXPLAIN SELECT * FROM employees WHERE department = 'HR';
-- Shows: table scan vs index seek, join order, estimated rows
```

---

### Q63. What is query optimization?

**Interview Answer:**

> "Query optimization is the process of rewriting queries or modifying schema/indexes to make queries run faster. Techniques:
>
> 1. Add appropriate indexes
> 2. Use covering indexes
> 3. Avoid SELECT * (fetch only needed columns)
> 4. Avoid functions on indexed columns in WHERE (prevents index usage)
> 5. Use EXISTS instead of IN for large datasets
> 6. Paginate results with LIMIT
> 7. Analyze EXPLAIN output and fix inefficient plans"

```sql
-- BAD: function on indexed column prevents index use
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- GOOD: range query uses the index
SELECT * FROM users WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';
```

---

### Q64. What is cardinality?

**Interview Answer:**

> "Cardinality refers to the number of unique values in a column. High cardinality = many unique values (user_id, email). Low cardinality = few unique values (gender, boolean, status). The query optimizer uses cardinality estimates to choose the best execution plan. High-cardinality columns benefit most from indexing."

---

### Q65. What is clustered index scan vs seek?

**Interview Answer:**

> "An **index seek** is fast — the database uses the B-tree to jump directly to the matching rows. An **index scan** reads all (or a large portion of) the index — essentially a table scan but using the index structure. Seek is what you want. Scans happen when the condition is not selective enough or the index can't be used."

---

## 📌 SECTION 9 — TRANSACTIONS & CONCURRENCY

---

### Q66. What is a transaction in SQL?

**Simple Explanation:**
A transaction is a group of operations that must ALL succeed or ALL fail together. Like transferring money: deducting from one account and adding to another must both succeed — if one fails, neither should happen.

**Interview Answer:**

> "A transaction is a sequence of SQL operations treated as a single unit of work. Either all operations complete successfully (COMMIT) or all are rolled back as if they never happened (ROLLBACK). Transactions ensure data consistency."

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 5000 WHERE id = 1; -- debit
  UPDATE accounts SET balance = balance + 5000 WHERE id = 2; -- credit
COMMIT; -- both succeed: finalize
-- or ROLLBACK if something went wrong
```

---

### Q67. What are ACID properties?

**Interview Answer:**

> "ACID is the set of properties that guarantee database transactions are processed reliably:
>
> * **Atomicity** — Transaction is all-or-nothing. If one step fails, all steps are rolled back.
> * **Consistency** — Transaction brings the database from one valid state to another. Rules and constraints are never violated.
> * **Isolation** — Concurrent transactions don't interfere with each other.
> * **Durability** — Once committed, data is permanently saved — even if the server crashes."

---

### Q68. What is COMMIT and ROLLBACK?

**Interview Answer:**

> "`COMMIT` permanently saves all changes made in the current transaction to the database. `ROLLBACK` undoes all changes made since the last COMMIT, restoring the database to its previous state. `SAVEPOINT` creates a checkpoint within a transaction so you can rollback to a specific point."

```sql
BEGIN;
  INSERT INTO orders VALUES (101, 5, 2500);
  SAVEPOINT order_saved;
  UPDATE inventory SET stock = stock - 5 WHERE product_id = 5;
  -- Something went wrong with inventory update:
ROLLBACK TO SAVEPOINT order_saved; -- undo inventory update, keep order insert
COMMIT;
```

---

### Q69. What are transaction isolation levels?

**Interview Answer:**

> "Isolation levels control how much one transaction can see of other concurrent transactions' changes:
>
> 1. **READ UNCOMMITTED** — Can read uncommitted changes (dirty reads possible)
> 2. **READ COMMITTED** — Can only read committed changes (default in most DBs)
> 3. **REPEATABLE READ** — Same row reads same data within transaction (MySQL InnoDB default)
> 4. **SERIALIZABLE** — Full isolation, transactions run as if sequential (safest, slowest)"

---

### Q70. What is dirty read, non-repeatable read, and phantom read?

**Interview Answer:**

> "- **Dirty Read** — Reading data that another transaction has modified but not yet committed. If that transaction rolls back, you read invalid data.
>
> * **Non-Repeatable Read** — Reading the same row twice in a transaction and getting different results because another transaction updated it in between.
> * **Phantom Read** — Running the same query twice and getting different rows because another transaction inserted or deleted rows in between."

| Problem             | Cause                                        |
| ------------------- | -------------------------------------------- |
| Dirty Read          | Reading uncommitted data                     |
| Non-Repeatable Read | Row updated by another transaction           |
| Phantom Read        | Rows inserted/deleted by another transaction |

---

### Q71. What is deadlock in SQL and how can it be prevented?

**Simple Explanation:**
Deadlock is when two transactions are each waiting for the other to release a lock — like two cars facing each other in a narrow road, both waiting for the other to back up.

**Interview Answer:**

> "A deadlock occurs when two or more transactions are waiting for each other to release locks — creating a circular dependency. The database detects this and kills one transaction (the victim) to break the cycle.
>
> Prevention strategies:
>
> 1. Always access tables/rows in the same order across transactions
> 2. Keep transactions short and fast
> 3. Use lower isolation levels where possible
> 4. Add appropriate indexes (fewer rows locked)
> 5. Use `SELECT ... FOR UPDATE` carefully"

---

### Q72. What is optimistic vs pessimistic locking?

**Interview Answer:**

> "**Pessimistic locking** assumes conflicts will happen — locks the row immediately when you read it (`SELECT FOR UPDATE`). Other transactions must wait. Safe but reduces concurrency.
>
> **Optimistic locking** assumes conflicts are rare — doesn't lock on read. When you update, it checks if the data changed since you read it (using a version number or timestamp). If changed, the update fails and you retry. Better for high-concurrency, read-heavy systems."

```sql
-- Pessimistic locking
SELECT * FROM products WHERE id = 1 FOR UPDATE; -- locks the row

-- Optimistic locking pattern (check version before update)
UPDATE products
SET stock = 45, version = version + 1
WHERE id = 1 AND version = 5; -- fails if someone else already updated it
```

---

## 📌 SECTION 10 — STORED PROCEDURES, FUNCTIONS & TRIGGERS

---

### Q73. What is a stored procedure?

**Interview Answer:**

> "A stored procedure is a pre-compiled set of SQL statements stored in the database that can be called by name. It can accept parameters, contain logic (IF/ELSE, loops), perform DML operations, and doesn't necessarily return a value."

```sql
CREATE PROCEDURE get_employee_by_dept(IN dept_name VARCHAR(100))
BEGIN
  SELECT name, salary FROM employees WHERE department = dept_name;
END;

-- Call it:
CALL get_employee_by_dept('Engineering');
```

---

### Q74. What is a user-defined function (UDF)?

**Interview Answer:**

> "A UDF is a reusable function defined by the user that returns a value. Unlike stored procedures, functions must return a value and can be used inside SQL queries — in SELECT, WHERE, etc."

```sql
CREATE FUNCTION get_annual_salary(monthly_sal DECIMAL(10,2))
RETURNS DECIMAL(10,2)
BEGIN
  RETURN monthly_sal * 12;
END;

-- Use in query:
SELECT name, get_annual_salary(salary) AS annual FROM employees;
```

---

### Q75. What is the difference between stored procedures and functions?

| Stored Procedure             | Function                        |
| ---------------------------- | ------------------------------- |
| May or may not return value  | Must return a value             |
| Cannot be used in SELECT     | Can be used in SELECT/WHERE     |
| Can have DML (INSERT/UPDATE) | Usually no DML (some DBs allow) |
| Called with CALL/EXEC        | Called like a function inline   |

---

### Q76. What are triggers in SQL?

**Interview Answer:**

> "A trigger is a set of SQL statements that automatically execute when a specific event (INSERT, UPDATE, DELETE) occurs on a table. Used for auditing, enforcing business rules, or cascading changes."

```sql
CREATE TRIGGER log_salary_change
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  IF OLD.salary <> NEW.salary THEN
    INSERT INTO salary_audit(emp_id, old_salary, new_salary, changed_at)
    VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
  END IF;
END;
```

---

### Q77. What are BEFORE and AFTER triggers?

**Interview Answer:**

> "**BEFORE triggers** execute before the DML operation — useful for validating or modifying data before it's saved. **AFTER triggers** execute after the DML operation — useful for auditing, logging, or cascading changes."

```sql
-- BEFORE INSERT: set a default timestamp
CREATE TRIGGER before_insert_user
BEFORE INSERT ON users
FOR EACH ROW
SET NEW.created_at = NOW();

-- AFTER DELETE: log deleted record
CREATE TRIGGER after_delete_user
AFTER DELETE ON users
FOR EACH ROW
INSERT INTO deleted_users_log VALUES (OLD.id, OLD.name, NOW());
```

---

### Q78. What are INSTEAD OF triggers?

**Interview Answer:**

> "INSTEAD OF triggers execute **in place of** the triggering statement — they replace the actual DML operation. Commonly used on **views** to make non-updatable views updatable."

```sql
CREATE TRIGGER instead_of_insert_view
INSTEAD OF INSERT ON v_employee_dept
FOR EACH ROW
BEGIN
  INSERT INTO employees(name) VALUES(NEW.name);
  INSERT INTO departments(dept_name) VALUES(NEW.dept_name);
END;
```

---

### Q79. What are views and why are they used?

**Interview Answer:**

> "A view is a virtual table — a saved SELECT query that you can query like a table. The data isn't stored separately; it's computed on-the-fly from the base tables. Benefits:
>
> * **Security** — Expose only certain columns (hide sensitive data)
> * **Simplicity** — Hide complex JOINs behind a simple name
> * **Consistency** — Reuse complex logic without duplication"

```sql
CREATE VIEW v_active_employees AS
SELECT id, name, department, salary
FROM employees
WHERE status = 'active';

-- Now query like a table:
SELECT * FROM v_active_employees WHERE department = 'HR';
```

---

### Q80. What is a materialized view?

**Interview Answer:**

> "A materialized view stores the query result physically on disk — unlike a regular view which recomputes every time. It's much faster to query but data can be stale until refreshed. Used for expensive aggregations/reports that don't need real-time freshness. Supported natively in PostgreSQL and Oracle; in MySQL, you simulate it with a table + triggers."

```sql
-- PostgreSQL
CREATE MATERIALIZED VIEW mv_dept_summary AS
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM employees GROUP BY department;

-- Refresh when data changes:
REFRESH MATERIALIZED VIEW mv_dept_summary;
```

---

## 📌 SECTION 11 — ADVANCED SQL (WINDOW FUNCTIONS)

---

### Q81. What are window functions in SQL?

**Simple Explanation:**
Aggregate functions (SUM, AVG) collapse rows into one result per group. Window functions perform calculations across a set of related rows but **keep all rows in the output** — like "what's this employee's salary vs the average in their department" without collapsing rows.

**Interview Answer:**

> "Window functions perform calculations across a set of rows related to the current row, without collapsing the result into a single row. They use the `OVER()` clause to define the 'window' (set of rows). Examples: ROW_NUMBER, RANK, LAG, LEAD, SUM, AVG used as window functions."

```sql
SELECT name, department, salary,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary
FROM employees;
-- Shows each employee WITH their department's average alongside
```

---

### Q82. What is ROW_NUMBER and how is it used?

**Interview Answer:**

> "ROW_NUMBER assigns a unique sequential integer to each row within a partition, ordered by the specified column. No ties — if two rows are equal, they get different numbers arbitrarily."

```sql
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees;
-- Within each department, employees ranked 1, 2, 3... by salary
```

---

### Q83. What is RANK vs DENSE_RANK?

**Interview Answer:**

> "Both rank rows within a partition, but handle ties differently:
>
> * `RANK()` — Tied rows get the same rank, but the next rank skips (1, 2, 2, 4)
> * `DENSE_RANK()` — Tied rows get the same rank, next rank does NOT skip (1, 2, 2, 3)"

```sql
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Salary: 90000, 85000, 85000, 80000
-- RANK:        1,      2,      2,      4  ← skips 3
-- DENSE_RANK:  1,      2,      2,      3  ← no skip
```

---

### Q84. What is LAG and LEAD?

**Interview Answer:**

> "`LAG(column, n)` accesses the value of a column from **n rows before** the current row. `LEAD(column, n)` accesses  **n rows after** . Useful for comparing a value with a previous or next period."

```sql
SELECT month, revenue,
  LAG(revenue, 1) OVER (ORDER BY month) AS prev_month_revenue,
  revenue - LAG(revenue, 1) OVER (ORDER BY month) AS growth
FROM monthly_sales;

-- Jan: 100000, prev: NULL, growth: NULL
-- Feb: 120000, prev: 100000, growth: 20000
-- Mar: 115000, prev: 120000, growth: -5000
```

---

### Q85. What is PARTITION BY in window functions?

**Interview Answer:**

> "PARTITION BY divides the result set into groups (partitions) and the window function operates within each partition independently. It's like GROUP BY but doesn't collapse rows — each row keeps its result calculated within its group."

```sql
SELECT name, department, salary,
  SUM(salary) OVER (PARTITION BY department) AS dept_total
FROM employees;
-- Each row shows its own salary AND the total for its department
```

---

### Q86. What is ORDER BY in window functions?

**Interview Answer:**

> "ORDER BY inside `OVER()` defines the order in which rows are processed for functions like ROW_NUMBER, RANK, LAG/LEAD, and running totals. Without ORDER BY, the window is the entire partition."

```sql
SELECT name, salary,
  SUM(salary) OVER (ORDER BY hire_date) AS running_total_payroll
FROM employees;
-- Running cumulative sum of salaries in order of hire date
```

---

### Q87. What is a moving average?

**Interview Answer:**

> "A moving average calculates the average of a row and its N preceding rows. Done using `ROWS BETWEEN` in the window frame specification."

```sql
SELECT date, revenue,
  AVG(revenue) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW  -- 7-day moving average
  ) AS moving_avg_7d
FROM daily_sales;
```

---

### Q88. What is NTILE?

**Interview Answer:**

> "NTILE(n) divides rows into n equal buckets and assigns a bucket number to each row. Useful for percentile analysis — divide customers into 4 quartiles by spending, etc."

```sql
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile
FROM employees;
-- Q1 = top 25%, Q2 = next 25%, Q3, Q4 = bottom 25%
```

---

### Q89. What is FIRST_VALUE and LAST_VALUE?

**Interview Answer:**

> "`FIRST_VALUE(col)` returns the value from the first row in the window frame. `LAST_VALUE(col)` returns the value from the last row. Useful for comparing each row to the best/worst in its group."

```sql
SELECT name, department, salary,
  FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS highest_in_dept,
  LAST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_in_dept
FROM employees;
```

---

### Q90. What is the OVER() clause?

**Interview Answer:**

> "The `OVER()` clause transforms an aggregate function into a window function. Inside `OVER()`, you specify:
>
> * `PARTITION BY` — How to group rows
> * `ORDER BY` — How to order rows within each group
> * `ROWS/RANGE BETWEEN` — The window frame (how many rows to include)"

```sql
-- Syntax template:
function_name() OVER (
  PARTITION BY column1        -- optional: group rows
  ORDER BY column2            -- optional: ordering within group
  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- optional: frame
)
```

---

## 📌 SECTION 12 — DATABASE DESIGN & NORMALIZATION

---

### Q91. What is database normalization?

**Simple Explanation:**
Normalization is organizing your database to reduce data redundancy (repetition) and improve data integrity. Instead of storing the same customer name in every order row, you store it once in a `customers` table and reference it by ID.

**Interview Answer:**

> "Normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. It involves dividing large tables into smaller, related tables. This prevents anomalies — insert anomaly (can't add data without other data), update anomaly (must update same data in many rows), delete anomaly (deleting a record accidentally removes other info)."

---

### Q92. What are the different normal forms?

**Interview Answer:**

> **1NF (First Normal Form):**
>
> * Each column holds atomic (indivisible) values
> * No repeating groups or arrays in a column
> * Each row is unique

```
BAD: orders table with "product1, product2, product3" in one column
GOOD: separate row per product
```

> **2NF (Second Normal Form):**
>
> * Must be in 1NF
> * No partial dependency — non-key columns must depend on the ENTIRE primary key (relevant for composite keys)

```
BAD: (order_id, product_id) → product_name stored here (product_name depends only on product_id, not the full composite key)
GOOD: Move product_name to a products table
```

> **3NF (Third Normal Form):**
>
> * Must be in 2NF
> * No transitive dependency — non-key columns must depend ONLY on the primary key, not on other non-key columns

```
BAD: employees table has zip_code → city → state (city depends on zip, not employee ID)
GOOD: Move zip/city/state to a separate addresses table
```

> **BCNF (Boyce-Codd Normal Form):**
>
> * Stricter version of 3NF
> * Every determinant must be a candidate key

---

### Q93. What is denormalization and when is it used?

**Interview Answer:**

> "Denormalization intentionally adds redundancy to a normalized database to improve  **read performance** . You combine tables, pre-compute aggregates, or store duplicate data to avoid expensive JOINs at query time. Used in:
>
> * Data warehouses and reporting systems (read-heavy, not write-heavy)
> * When query performance is critical and joins are too slow
> * OLAP vs OLTP scenarios"

---

### Q94. What is a surrogate key?

**Interview Answer:**

> "A surrogate key is a system-generated, meaningless unique identifier used as the primary key (e.g., auto-increment integer, UUID). Contrast with a **natural key** — a key derived from real-world data (email, SSN, phone number). Surrogate keys are preferred because natural keys can change and may have format/uniqueness issues."

```sql
-- Surrogate key (auto-generated, no business meaning)
id INT PRIMARY KEY AUTO_INCREMENT

-- vs Natural key (from real data — can change!)
email VARCHAR(100) PRIMARY KEY
```

---

### Q95. What is a database indexing strategy?

**Interview Answer:**

> "Index columns that are:
>
> 1. Frequently used in WHERE clauses
> 2. Used in JOIN conditions
> 3. Used in ORDER BY or GROUP BY
> 4. High cardinality (many unique values)
>
> Don't index:
>
> * Columns rarely used in queries
> * Low-cardinality columns (boolean, status with 3 values)
> * Very small tables (full scan is faster)
> * Columns frequently updated (index maintenance overhead)"

---

### Q96. What is ER modeling?

**Interview Answer:**

> "Entity-Relationship (ER) modeling is a visual way to design a database before writing SQL. You identify:
>
> * **Entities** — Things you store data about (Customer, Product, Order)
> * **Attributes** — Properties of each entity (Customer has name, email)
> * **Relationships** — How entities relate (Customer PLACES Order)
> * **Cardinality** — One-to-one, one-to-many, many-to-many"

---

### Q97. What is referential integrity?

**Interview Answer:**

> "Referential integrity ensures that relationships between tables remain consistent. Specifically: a foreign key value must always correspond to an existing primary key value in the referenced table. You can't insert an order for a non-existent customer, and you can't delete a customer who has existing orders (unless you use CASCADE DELETE)."

```sql
FOREIGN KEY (customer_id) REFERENCES customers(id)
  ON DELETE CASCADE    -- delete orders when customer is deleted
  ON UPDATE CASCADE    -- update order's customer_id if customers.id changes
```

---

## 📌 SECTION 13 — NOSQL BASICS

---

### Q98. What are the main differences between SQL and NoSQL?

| SQL (Relational)              | NoSQL (Non-Relational)                 |
| ----------------------------- | -------------------------------------- |
| Structured tables with schema | Flexible schema (documents, key-value) |
| ACID transactions             | Eventual consistency (usually)         |
| Vertical scaling              | Horizontal scaling                     |
| Complex JOINs supported       | No JOINs (denormalized)                |
| Best for structured data      | Best for unstructured / big data       |
| MySQL, PostgreSQL             | MongoDB, Redis, Cassandra              |

**Interview Answer:**

> "SQL databases use tables with fixed schemas and support ACID transactions and complex joins — best for structured, relational data. NoSQL databases use flexible data models (documents, key-value, graphs) and scale horizontally — best for large volumes of unstructured data, high write throughput, or when the schema changes frequently."

---

### Q99. What is a document database?

**Interview Answer:**

> "A document database stores data as JSON/BSON documents — semi-structured, nested objects. Each document can have different fields. MongoDB is the most popular example. Great for hierarchical data where you want to store related data together in one document rather than spreading it across multiple tables."

```json
// MongoDB document — no fixed schema
{
  "_id": "user_123",
  "name": "Alice",
  "orders": [
    { "id": "ord_1", "amount": 500 },
    { "id": "ord_2", "amount": 1200 }
  ]
}
```

---

### Q100. What is a key-value store?

**Interview Answer:**

> "A key-value store is the simplest NoSQL type — you store and retrieve data by a unique key. Like a giant hash map / dictionary. Extremely fast for simple lookups. Used for caching, sessions, leaderboards. Examples: Redis, DynamoDB, Memcached."

```
SET user:123:name "Alice"
GET user:123:name  → "Alice"
```

---

### Q101. What is a column-family database?

**Interview Answer:**

> "Column-family databases (like Apache Cassandra, HBase) store data by columns rather than rows. Related columns are grouped into 'column families.' Optimized for reading/writing large amounts of data across many rows for specific columns. Great for time-series data, IoT data, analytics."

---

### Q102. What is eventual consistency?

**Interview Answer:**

> "In distributed NoSQL systems, data is replicated across multiple nodes. Eventual consistency means that after a write, all replicas will have the same data eventually — but there may be a brief window where different nodes return different values. This is the trade-off for high availability and partition tolerance (CAP theorem). Systems like DynamoDB and Cassandra default to eventual consistency."

---

### Q103. When should you use SQL vs NoSQL?

**Interview Answer:**

> "Use **SQL** when:
>
> * Data is structured and relational
> * You need ACID transactions (banking, e-commerce)
> * Data integrity and consistency are critical
> * Complex queries and reporting are needed
>
> Use **NoSQL** when:
>
> * Data is unstructured or schema changes frequently
> * You need to scale horizontally to handle massive data
> * High write throughput is required
> * You're building real-time apps, caches, or handling big data
>
> In practice, many systems use both — SQL for transactions, Redis for caching, MongoDB for flexible content."

---

## 📌 SECTION 14 — SQL PRACTICAL INTERVIEW SCENARIOS

---

### Q104. How do you find duplicate records in a table?

**Interview Answer:**

> "Use GROUP BY with HAVING COUNT > 1 to find duplicates."

```sql
-- Find duplicate emails
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- See full rows that are duplicates
SELECT * FROM users
WHERE email IN (
  SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1
);
```

---

### Q105. How do you find the second highest salary?

**Interview Answer:**

> "Classic interview question — multiple approaches:"

```sql
-- Method 1: Using LIMIT/OFFSET (MySQL/PostgreSQL)
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Method 2: Using subquery
SELECT MAX(salary) FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Method 3: Using DENSE_RANK (best approach — handles ties correctly)
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) ranked
WHERE rnk = 2;
```

---

### Q106. How do you find employees who are NOT in another table?

**Interview Answer:**

> "Multiple approaches — LEFT JOIN with NULL check is most reliable:"

```sql
-- Method 1: LEFT JOIN + NULL check (fastest)
SELECT e.name FROM employees e
LEFT JOIN managers m ON e.id = m.employee_id
WHERE m.employee_id IS NULL;

-- Method 2: NOT EXISTS
SELECT name FROM employees e
WHERE NOT EXISTS (SELECT 1 FROM managers m WHERE m.employee_id = e.id);

-- Method 3: NOT IN (avoid if subquery can return NULLs — causes bugs!)
SELECT name FROM employees
WHERE id NOT IN (SELECT employee_id FROM managers WHERE employee_id IS NOT NULL);
```

---

### Q107. How do you retrieve top N records per group?

**Interview Answer:**

> "Use ROW_NUMBER() window function — this is the modern, clean approach."

```sql
-- Top 3 highest-paid employees per department
SELECT name, department, salary
FROM (
  SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn <= 3;
```

---

### Q108. How do you pivot rows into columns?

**Interview Answer:**

> "Pivoting converts row data into column headers. Use conditional aggregation — a technique that works in all SQL databases."

```sql
-- Raw data: (year, quarter, revenue)
-- Pivot: one row per year, one column per quarter

SELECT year,
  SUM(CASE WHEN quarter = 'Q1' THEN revenue ELSE 0 END) AS Q1,
  SUM(CASE WHEN quarter = 'Q2' THEN revenue ELSE 0 END) AS Q2,
  SUM(CASE WHEN quarter = 'Q3' THEN revenue ELSE 0 END) AS Q3,
  SUM(CASE WHEN quarter = 'Q4' THEN revenue ELSE 0 END) AS Q4
FROM sales
GROUP BY year;
```

---

### Q109. How do you unpivot columns into rows?

**Interview Answer:**

> "Unpivoting converts column data back into rows. Use UNION ALL to stack each column as a row."

```sql
-- Unpivot Q1, Q2, Q3, Q4 columns into rows
SELECT year, 'Q1' AS quarter, Q1 AS revenue FROM sales
UNION ALL
SELECT year, 'Q2', Q2 FROM sales
UNION ALL
SELECT year, 'Q3', Q3 FROM sales
UNION ALL
SELECT year, 'Q4', Q4 FROM sales
ORDER BY year, quarter;
```

---

### Q110. How do you remove duplicates while keeping the latest record?

**Interview Answer:**

> "Use ROW_NUMBER() to rank duplicates by latest date, then delete/exclude rows where rank > 1."

```sql
-- Step 1: Identify which rows to keep (rank 1 = most recent per email)
WITH ranked AS (
  SELECT id, email, created_at,
    ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at DESC) AS rn
  FROM users
)
-- Step 2: Delete duplicates (keep rn = 1)
DELETE FROM users
WHERE id IN (
  SELECT id FROM ranked WHERE rn > 1
);

-- Or just SELECT the de-duplicated result:
SELECT id, email, created_at
FROM ranked WHERE rn = 1;
```

---

## 🎯 QUICK REVISION CHEAT SHEET

| Concept           | One-liner                                                      |
| ----------------- | -------------------------------------------------------------- |
| Primary Key       | Uniquely identifies each row; NOT NULL                         |
| Foreign Key       | References PK of another table; enforces referential integrity |
| INNER JOIN        | Only matching rows from both tables                            |
| LEFT JOIN         | All rows from left + matched from right (NULL if no match)     |
| WHERE             | Filter rows BEFORE grouping                                    |
| HAVING            | Filter groups AFTER GROUP BY                                   |
| GROUP BY          | Group rows for aggregation                                     |
| DISTINCT          | Remove duplicate rows from result                              |
| Subquery          | Query inside a query                                           |
| CTE               | Named temporary result with WITH clause                        |
| INDEX             | B-tree structure for fast lookups                              |
| Clustered Index   | Physically reorders table data (one per table)                 |
| Non-Clustered     | Separate lookup structure (many per table)                     |
| ACID              | Atomicity, Consistency, Isolation, Durability                  |
| Transaction       | Group of operations — all succeed or all rollback             |
| Deadlock          | Two transactions waiting for each other's locks                |
| VIEW              | Saved SELECT query — virtual table                            |
| Materialized View | Physically stored view result — refreshed manually            |
| Window Function   | Aggregation without collapsing rows (OVER clause)              |
| ROW_NUMBER        | Unique sequential rank per partition                           |
| RANK              | Rank with gaps on ties (1,2,2,4)                               |
| DENSE_RANK        | Rank without gaps on ties (1,2,2,3)                            |
| LAG / LEAD        | Access previous / next row's value                             |
| 1NF               | Atomic values, no repeating groups                             |
| 2NF               | No partial dependency (relevant for composite PKs)             |
| 3NF               | No transitive dependency                                       |
| TRUNCATE          | Remove all rows fast; no rollback; resets auto-increment       |
| DELETE            | Remove specific rows; can rollback; fires triggers             |
| DROP              | Removes entire table structure                                 |
| UPSERT            | Insert if not exists, update if exists                         |
| NULL              | Unknown/missing value — use IS NULL, not = NULL               |
| COALESCE          | Returns first non-NULL value                                   |

---

### 🧠 SQL Query Execution Order (Very Commonly Asked!)

```
1. FROM / JOIN       ← Which tables?
2. WHERE             ← Filter rows
3. GROUP BY          ← Group remaining rows
4. HAVING            ← Filter groups
5. SELECT            ← Pick columns / compute expressions
6. DISTINCT          ← Remove duplicates
7. ORDER BY          ← Sort result
8. LIMIT / OFFSET    ← Paginate
```

> ✅ **Interview Tip:** Always explain your reasoning — "I used LEFT JOIN instead of INNER JOIN because I want all customers even if they have no orders." Interviewers care about *why* as much as  *what* .
>
