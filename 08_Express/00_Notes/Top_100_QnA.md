# 🚀 Express.js Interview Answers — Complete Guide

> **100 Questions | Layman Language | Real Examples | Interview-Ready Answers**

---

## 📌 SECTION 1 — EXPRESS.JS BASICS & FUNDAMENTALS

---

### Q1. What is Express.js and why is it used?

**Simple Explanation:**
Express.js is a lightweight framework built on top of Node.js that makes building web servers and APIs much easier. Think of Node.js as raw materials (bricks, cement) and Express as a pre-built house kit — it gives you structure and tools out of the box.

**Interview Answer:**

> "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of handling HTTP requests, defining routes, and integrating middleware. Without Express, you'd write a lot of repetitive boilerplate code in plain Node.js just to handle a basic GET request."

**Example:**

```js
// Without Express (plain Node.js)
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/hello' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  }
});

// With Express — much cleaner!
const express = require('express');
const app = express();
app.get('/hello', (req, res) => res.send('Hello World'));
```

---

### Q2. What problem does Express solve in Node.js development?

**Simple Explanation:**
Plain Node.js is like driving a car without power steering — you can do it, but it's a lot of effort. Express adds power steering: routing, middleware, request parsing, etc.

**Interview Answer:**

> "Node.js alone requires you to manually parse URLs, handle HTTP methods, manage headers, and write repetitive code for every route. Express solves this by providing:
>
> * Clean routing system
> * Middleware pipeline
> * Easy request/response handling
> * Built-in support for JSON, static files, etc.
>   It dramatically reduces boilerplate and increases developer productivity."

---

### Q3. What is the difference between Node.js and Express.js?

| Node.js                                           | Express.js                                     |
| ------------------------------------------------- | ---------------------------------------------- |
| Runtime environment (executes JS outside browser) | Framework built on Node.js                     |
| Low-level HTTP handling                           | High-level abstractions for routes, middleware |
| No routing system out of the box                  | Full routing system                            |
| You write everything from scratch                 | Pre-built utilities and structure              |

**Interview Answer:**

> "Node.js is the runtime — it lets JavaScript run on the server. Express is a framework that runs inside Node.js and provides tools like routing, middleware, and easier HTTP handling. Express doesn't replace Node.js; it builds on top of it."

---

### Q4. How do you install and initialize an Express application?

**Interview Answer:**

> "You initialize a Node project using `npm init -y`, then install Express using `npm install express`. You then create an entry file (usually `index.js` or `app.js`), require Express, create an app instance, define routes, and start the server."

```bash
mkdir my-app && cd my-app
npm init -y
npm install express
```

```js
// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
```

---

### Q5. What is the purpose of `app.listen()`?

**Simple Explanation:**
`app.listen()` is like opening a shop for business — it tells the server to start accepting incoming requests on a specific port.

**Interview Answer:**

> "`app.listen(port, callback)` starts the Express server and binds it to the given port. The callback runs once the server is ready. Port 3000 or 5000 is common in development, while port 80 (HTTP) or 443 (HTTPS) is used in production."

```js
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

---

### Q6. What are the core features of Express.js?

**Interview Answer:**

> "Express provides:
>
> 1. **Routing** — Define URL endpoints and HTTP methods
> 2. **Middleware** — Functions that run between request and response
> 3. **Template engines** — Server-side HTML rendering (EJS, Pug)
> 4. **Static file serving** — Serve CSS, images, JS files
> 5. **Error handling** — Centralized error management
> 6. **Request/Response helpers** — Methods like `res.json()`, `res.send()`, `req.params`, `req.body`"

---

### Q7. What is routing in Express?

**Simple Explanation:**
Routing is like a receptionist who directs visitors to the right department. When a request comes in for `/users`, the router sends it to the users handler.

**Interview Answer:**

> "Routing refers to defining how an application responds to client requests at specific URL paths and HTTP methods. Each route has a path and a handler function."

```js
app.get('/users', (req, res) => res.send('Get all users'));
app.post('/users', (req, res) => res.send('Create user'));
app.delete('/users/:id', (req, res) => res.send('Delete user'));
```

---

### Q8. What is the role of the `req` and `res` objects?

**Interview Answer:**

> "`req` (request) contains all information about the incoming HTTP request — URL, headers, body, query params, cookies, etc. `res` (response) is used to send a response back to the client — JSON, HTML, status codes, redirects, etc."

```js
app.get('/profile', (req, res) => {
  console.log(req.query);    // ?name=John
  console.log(req.headers);  // request headers
  res.status(200).json({ user: 'John' }); // send JSON back
});
```

---

### Q9. What are HTTP methods in Express?

**Interview Answer:**

> "HTTP methods define the type of action being requested:
>
> * **GET** — Retrieve data
> * **POST** — Create new data
> * **PUT** — Replace existing data completely
> * **PATCH** — Partially update data
> * **DELETE** — Remove data
>
> Express has methods matching each: `app.get()`, `app.post()`, `app.put()`, `app.patch()`, `app.delete()`."

---

### Q10. What is the difference between route path and route handler?

**Interview Answer:**

> "The **route path** is the URL pattern (e.g., `/users/:id`). The **route handler** is the callback function that executes when that path is matched. You can have multiple handlers for one route (middleware chaining)."

```js
// '/users' is the route path
// (req, res) => {...} is the route handler
app.get('/users', (req, res) => {
  res.send('Users list');
});
```

---

## 📌 SECTION 2 — ROUTING & URL HANDLING

---

### Q11. What is a route in Express.js?

**Interview Answer:**

> "A route is a combination of an HTTP method, a URL path, and a handler function. It tells Express: 'When a request comes in at this path with this method, run this function.'"

```js
app.get('/about', (req, res) => {
  res.send('About page');
});
```

---

### Q12. What is `express.Router()` and why is it used?

**Simple Explanation:**
Think of `express.Router()` as a mini Express app. You create separate routers for different parts of your app (users, products, orders) and plug them all into the main app.

**Interview Answer:**

> "`express.Router()` creates a modular, mountable route handler. It lets you group related routes in separate files, making the codebase cleaner and more maintainable. You then attach it to the main app using `app.use()`."

```js
// routes/users.js
const router = require('express').Router();
router.get('/', (req, res) => res.send('All users'));
router.get('/:id', (req, res) => res.send(`User ${req.params.id}`));
module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
// Now: GET /users → 'All users', GET /users/5 → 'User 5'
```

---

### Q13. What are route parameters and how do you access them?

**Simple Explanation:**
Route parameters are variables in the URL path. `/users/:id` means `:id` is a placeholder for any value like `/users/42`.

**Interview Answer:**

> "Route parameters are named URL segments defined with a colon (`:name`). They are accessed via `req.params`. They're used when you need dynamic values in the URL like user IDs, product slugs, etc."

```js
app.get('/products/:id', (req, res) => {
  const productId = req.params.id; // /products/99 → '99'
  res.send(`Product ID: ${productId}`);
});
```

---

### Q14. What are query parameters and how do you access them?

**Simple Explanation:**
Query parameters are the key=value pairs after the `?` in a URL. For example: `/search?q=express&page=2`.

**Interview Answer:**

> "Query parameters are passed in the URL after a `?` symbol and accessed via `req.query`. They're commonly used for filtering, searching, sorting, and pagination."

```js
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  // URL: /search?q=express&page=2
  res.send(`Search: ${q}, Page: ${page}`);
});
```

---

### Q15. What is the difference between `app.get()` and `app.post()`?

**Interview Answer:**

> "`app.get()` handles GET requests — used for fetching/reading data. `app.post()` handles POST requests — used for sending data to create something. GET requests don't have a body; POST requests carry data in the request body."

```js
app.get('/users', (req, res) => res.send('Fetch users'));
app.post('/users', (req, res) => {
  const newUser = req.body; // Data sent from client
  res.status(201).json({ created: newUser });
});
```

---

### Q16. What is the purpose of `app.all()`?

**Interview Answer:**

> "`app.all()` matches all HTTP methods for a given route. It's useful for applying middleware or logic that should run regardless of the HTTP method — like authentication checks or logging."

```js
app.all('/secure', (req, res, next) => {
  console.log('This runs for GET, POST, DELETE... everything');
  next();
});
```

---

### Q17. What is chaining route handlers?

**Interview Answer:**

> "You can pass multiple callback functions to a route. Each one must call `next()` to pass control to the next handler. This is useful for separating concerns — e.g., one function validates, another queries the DB."

```js
const validate = (req, res, next) => {
  if (!req.body.name) return res.status(400).send('Name required');
  next();
};

const createUser = (req, res) => {
  res.status(201).send('User created');
};

app.post('/users', validate, createUser);
```

---

### Q18. What are wildcard routes in Express?

**Interview Answer:**

> "Wildcard routes use `*` to match any path segment. Useful for catch-all routes like 404 handlers."

```js
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});
```

---

### Q19. How do you implement modular routing?

**Interview Answer:**

> "Modular routing means splitting routes into separate files by feature/domain, then importing them in the main app using `app.use()`. This keeps code organized and scalable."

```
project/
├── routes/
│   ├── users.js
│   ├── products.js
│   └── orders.js
└── app.js
```

```js
// app.js
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
```

---

### Q20. What is the difference between static and dynamic routes?

**Interview Answer:**

> "**Static routes** have a fixed path like `/about` or `/contact`. **Dynamic routes** have variable segments like `/users/:id` or `/products/:slug`. Dynamic routes match multiple URLs based on the parameter value."

```js
app.get('/about', ...);          // static
app.get('/users/:id', ...);      // dynamic — matches /users/1, /users/99, etc.
```

---

## 📌 SECTION 3 — MIDDLEWARE (CORE EXPRESS CONCEPT)

---

### Q21. What is middleware in Express.js?

**Simple Explanation:**
Middleware is like security checkpoints at an airport. Every passenger (request) must pass through each checkpoint before reaching their destination (route handler). Each checkpoint can inspect, modify, or stop the passenger.

**Interview Answer:**

> "Middleware functions are functions that have access to the request (`req`), response (`res`), and the `next` function. They sit in the middle of the request-response cycle and can: execute code, modify req/res, end the request, or call `next()` to pass control forward. They are the backbone of Express's architecture."

```js
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Must call next() or the request will hang!
});
```

---

### Q22. What are application-level middleware functions?

**Interview Answer:**

> "Application-level middleware is bound to the entire Express app using `app.use()` or `app.METHOD()`. It runs for every request (or every request matching a specific path)."

```js
// Runs for every request
app.use((req, res, next) => {
  console.log('Middleware runs on every request');
  next();
});

// Runs only for /admin routes
app.use('/admin', (req, res, next) => {
  console.log('Admin middleware');
  next();
});
```

---

### Q23. What are router-level middleware functions?

**Interview Answer:**

> "Router-level middleware works the same as application-level but is bound to an instance of `express.Router()`. It only applies to routes on that specific router."

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log('This runs only for routes in this router');
  next();
});

router.get('/profile', (req, res) => res.send('Profile'));
```

---

### Q24. What is error-handling middleware in Express?

**Interview Answer:**

> "Error-handling middleware has  **4 parameters** : `(err, req, res, next)`. Express identifies it as an error handler because of the 4th parameter. It should be defined  **last** , after all routes, to catch errors passed via `next(err)`."

```js
// Trigger error
app.get('/fail', (req, res, next) => {
  const error = new Error('Something went wrong');
  error.status = 500;
  next(error); // Pass to error handler
});

// Error handler (4 params!)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
```

---

### Q25. What is third-party middleware?

**Interview Answer:**

> "Third-party middleware is npm packages that plug into Express to add functionality. Examples: `morgan` (logging), `cors` (cross-origin), `helmet` (security), `multer` (file uploads), `express-validator` (validation)."

```js
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
```

---

### Q26. What is built-in middleware in Express 4.x?

**Interview Answer:**

> "Express 4.x has three built-in middlewares:
>
> 1. `express.json()` — Parses incoming JSON request bodies
> 2. `express.urlencoded()` — Parses URL-encoded form data
> 3. `express.static()` — Serves static files (HTML, CSS, images)"

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
```

---

### Q27. What is the difference between middleware and a route handler?

**Interview Answer:**

> "A **route handler** responds to a specific route + method (e.g., `GET /users`) and typically ends the request-response cycle. **Middleware** usually doesn't end the cycle — it processes the request and passes it along using `next()`. However, middleware *can* end the cycle (like auth middleware that rejects unauthorized requests)."

---

### Q28. What is `next()` and how does it work?

**Simple Explanation:**
`next()` is like saying "I'm done, pass the baton to the next runner." Without calling `next()`, the request gets stuck.

**Interview Answer:**

> "`next()` is a function passed to every middleware. Calling it tells Express to move to the next middleware or route handler. Calling `next(err)` skips to the error-handling middleware. If `next()` is never called and no response is sent, the request will time out."

```js
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized'); // ends cycle
  }
  next(); // continue to next middleware
});
```

---

### Q29. What happens if `next()` is not called in middleware?

**Interview Answer:**

> "If `next()` is not called and no response is sent, the request will hang indefinitely — the client will wait forever and eventually time out. This is a common bug. Always either call `next()` or send a response."

---

### Q30. What are common built-in middlewares?

**Interview Answer:**

> "1. `express.json()` — Parses JSON bodies (replaces the old `body-parser` package)
> 2. `express.urlencoded({ extended: true })` — Parses HTML form submissions
> 3. `express.static('public')` — Serves static files from the `public` folder"

---

## 📌 SECTION 4 — REQUEST HANDLING & BODY PARSING

---

### Q31. How do you parse JSON request bodies in Express?

**Interview Answer:**

> "Use `express.json()` middleware before your routes. It reads the raw request body and parses it as JSON, making it available at `req.body`."

```js
app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body); // { name: 'John', age: 25 }
  res.json({ received: req.body });
});
```

---

### Q32. What is `express.urlencoded()`?

**Interview Answer:**

> "It parses data sent from HTML forms (Content-Type: `application/x-www-form-urlencoded`). The `extended: true` option allows parsing of nested objects using the `qs` library; `false` uses the basic `querystring` library."

```js
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body; // from HTML form
  res.send(`Login: ${username}`);
});
```

---

### Q33. What is `multipart/form-data` and how do you handle file uploads?

**Interview Answer:**

> "`multipart/form-data` is the encoding type used when an HTML form sends files. `express.json()` and `express.urlencoded()` can't handle this — you need a specialized library like  **multer** ."

---

### Q34. What is `multer` and how does it work with Express?

**Interview Answer:**

> "Multer is a middleware for handling `multipart/form-data` — primarily file uploads. It processes the uploaded files and stores them either in memory or on disk, making them available at `req.file` (single) or `req.files` (multiple)."

```js
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // save to 'uploads' folder

app.post('/upload', upload.single('photo'), (req, res) => {
  console.log(req.file); // uploaded file info
  res.send('File uploaded!');
});
```

---

### Q35. What is the difference between `body-parser` and `express.json()`?

**Interview Answer:**

> "Before Express 4.16, you had to install `body-parser` separately. From Express 4.16+, `express.json()` and `express.urlencoded()` are built-in and do the same thing. `body-parser` is now effectively part of Express internally. In modern Express apps, you don't need `body-parser` separately."

---

## 📌 SECTION 5 — SERVING STATIC FILES

---

### Q36. What is `express.static()` and how do you configure it?

**Interview Answer:**

> "`express.static()` is a built-in middleware that serves static files (HTML, CSS, JS, images) from a specified directory. Any file in that folder becomes publicly accessible."

```js
app.use(express.static('public'));
// Now: http://localhost:3000/style.css → serves public/style.css
```

---

### Q37. How do you serve multiple static folders in Express?

**Interview Answer:**

> "Call `app.use(express.static())` multiple times. Express will search each folder in order until it finds the requested file."

```js
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.static('uploads'));
```

---

### Q38. How do you set cache headers for static files?

**Interview Answer:**

> "Pass a `maxAge` option to `express.static()`. This sets the `Cache-Control` header telling browsers how long to cache files."

```js
app.use(express.static('public', {
  maxAge: '1d' // cache for 1 day
}));
```

---

## 📌 SECTION 6 — TEMPLATE ENGINES & SERVER-SIDE RENDERING

---

### Q39. What are template engines in Express?

**Interview Answer:**

> "Template engines let you generate HTML dynamically on the server side by embedding variables and logic into HTML files. Express supports EJS, Pug, Handlebars, and others."

---

### Q40. How do you set up EJS with Express?

**Interview Answer:**

> "Install EJS (`npm install ejs`), set it as the view engine, and create `.ejs` files in a `views` folder. Use `res.render()` to render them."

```js
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/home', (req, res) => {
  res.render('home', { title: 'My App', user: 'John' });
});
```

```html
<!-- views/home.ejs -->
<h1><%= title %></h1>
<p>Welcome, <%= user %>!</p>
```

---

### Q41. What is the difference between SSR and CSR?

| SSR (Server-Side Rendering)     | CSR (Client-Side Rendering)      |
| ------------------------------- | -------------------------------- |
| HTML is generated on the server | HTML is generated in the browser |
| Better for SEO                  | SEO needs extra effort           |
| Faster first page load          | Slower initial load              |
| Express + EJS/Pug               | React, Vue, Angular              |

**Interview Answer:**

> "In SSR, the server sends fully rendered HTML to the browser. In CSR, the browser downloads a minimal HTML file and JavaScript that builds the UI. Express with EJS is SSR. React apps are typically CSR."

---

### Q42. How do you pass data to a template engine in Express?

**Interview Answer:**

> "Pass an object as the second argument to `res.render()`. All keys in that object become variables available in the template."

```js
res.render('profile', { name: 'Alice', age: 30, isAdmin: true });
// In EJS: <%= name %>, <%= age %>, <% if (isAdmin) { %>Admin<% } %>
```

---

## 📌 SECTION 7 — ERROR HANDLING & LOGGING

---

### Q43. How does Express detect an error?

**Interview Answer:**

> "Express detects an error when `next(err)` is called with an argument (any truthy value). If you call `next()` without an argument, it goes to the next normal middleware. If you call `next(err)` with an error object, Express skips all normal middleware and goes directly to error-handling middleware (the one with 4 params)."

---

### Q44. What is the structure of an Express error-handling middleware?

**Interview Answer:**

> "It must have exactly  **4 parameters** : `(err, req, res, next)`. The first parameter is the error object. It must be defined **after** all other routes and middleware."

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});
```

---

### Q45. What is the difference between synchronous and asynchronous error handling?

**Interview Answer:**

> "Synchronous errors thrown with `throw` inside route handlers are caught by Express automatically. But async errors (in Promises or async/await) must be caught manually and passed to `next(err)`."

```js
// Synchronous — Express catches automatically
app.get('/sync', (req, res) => {
  throw new Error('Sync error'); // Express catches this
});

// Asynchronous — must use try/catch
app.get('/async', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err); // must manually pass to error handler
  }
});
```

---

### Q46. What is the purpose of `morgan` in Express apps?

**Interview Answer:**

> "`morgan` is an HTTP request logger middleware. It logs every incoming request — method, URL, status code, response time, etc. Very useful during development for debugging."

```js
const morgan = require('morgan');
app.use(morgan('dev'));
// Output: GET /users 200 5.234 ms - 120
```

---

### Q47. How do you implement global error handling in Express?

**Interview Answer:**

> "Define one error-handling middleware at the end of your app. Use a custom `AppError` class to create structured errors with status codes. All `next(err)` calls flow into this single handler."

```js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// In route
app.get('/user/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.json(user);
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});
```

---

## 📌 SECTION 8 — EXPRESS SECURITY

---

### Q48. What is CORS and how do you enable it in Express?

**Simple Explanation:**
CORS (Cross-Origin Resource Sharing) is a browser security rule that blocks your frontend (running on `localhost:3000`) from talking to your backend (on `localhost:5000`) unless the backend explicitly allows it.

**Interview Answer:**

> "CORS is a security mechanism that restricts cross-origin HTTP requests. When your frontend and backend are on different origins (domains/ports), the browser blocks the request by default. You enable CORS in Express using the `cors` npm package, which adds the appropriate headers."

```js
const cors = require('cors');

// Allow all origins (development)
app.use(cors());

// Allow specific origin (production)
app.use(cors({
  origin: 'https://myfrontend.com',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

---

### Q49. What is `helmet.js` and what security issues does it address?

**Interview Answer:**

> "Helmet is a collection of middleware that sets HTTP security headers to protect against common web vulnerabilities. It addresses:
>
> * **XSS** — via `Content-Security-Policy`
> * **Clickjacking** — via `X-Frame-Options`
> * **MIME sniffing** — via `X-Content-Type-Options`
> * **Information disclosure** — by removing `X-Powered-By: Express`"

```js
const helmet = require('helmet');
app.use(helmet()); // Sets 11+ security headers automatically
```

---

### Q50. What is rate limiting and how do you implement it?

**Interview Answer:**

> "Rate limiting restricts how many requests a client can make in a given time window. This prevents brute-force attacks, DDoS, and API abuse. Use the `express-rate-limit` package."

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window per IP
  message: 'Too many requests, please try again later'
});

app.use('/api', limiter);
```

---

### Q51. What are common security vulnerabilities in Express?

**Interview Answer:**

> "Common vulnerabilities include:
>
> 1. **XSS** — Injecting malicious scripts via user input
> 2. **SQL/NoSQL Injection** — Malicious queries via unsanitized inputs
> 3. **CSRF** — Forged requests from malicious sites
> 4. **Broken Authentication** — Weak JWT secrets, no expiry
> 5. **Sensitive Data Exposure** — Logging secrets, unencrypted data
> 6. **Unhandled Errors** — Stack traces exposed to clients
> 7. **Missing security headers** — Solved by helmet"

---

### Q52. How do you prevent XSS in Express apps?

**Interview Answer:**

> "1. Use `helmet` to set `Content-Security-Policy` headers
> 2. Sanitize user inputs using libraries like `xss` or `DOMPurify`
> 3. Avoid inserting raw user input into HTML templates
> 4. Use `express-validator` to validate/sanitize inputs"

```js
const { body, validationResult } = require('express-validator');

app.post('/comment', 
  body('text').escape(), // Escapes HTML chars like < > &
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());
    // safe to use req.body.text now
  }
);
```

---

### Q53. How do you prevent SQL/NoSQL injection in Express?

**Interview Answer:**

> "For SQL: Use parameterized queries (prepared statements) — never concatenate user input into SQL strings. For MongoDB/Mongoose: Validate input types and use Mongoose schemas which provide type coercion. Avoid using `$where` with user input."

```js
// BAD — SQL injection risk
db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

// GOOD — parameterized query
db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);

// MongoDB — sanitize with express-mongo-sanitize
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // strips $ and . from req.body
```

---

### Q54. How do you securely store and access environment variables in Express?

**Interview Answer:**

> "Use `.env` files with the `dotenv` package for local development. Never commit `.env` to git (add to `.gitignore`). Access them via `process.env.VARIABLE_NAME`. In production, set them directly in the hosting environment (AWS, Heroku, etc.)."

```js
// .env file
PORT=3000
DB_URL=mongodb://localhost/mydb
JWT_SECRET=supersecretkey

// app.js
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;
```

---

## 📌 SECTION 9 — AUTHENTICATION & AUTHORIZATION

---

### Q55. What is JWT authentication and how do you implement it in Express?

**Simple Explanation:**
JWT is like a temporary ID badge. When you log in, the server gives you a signed token. You present this token with every subsequent request — the server verifies it without checking a database each time.

**Interview Answer:**

> "JWT (JSON Web Token) is a stateless authentication mechanism. The server creates a signed token containing user info on login. The client stores it and sends it in the `Authorization` header with every request. The server verifies the signature — no database lookup needed."

```js
const jwt = require('jsonwebtoken');

// Login — generate token
app.post('/login', (req, res) => {
  const user = { id: 1, email: 'john@example.com' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route — verify token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('No token');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};

app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

---

### Q56. What is the difference between sessions and tokens (JWT)?

| Sessions                          | JWT Tokens                        |
| --------------------------------- | --------------------------------- |
| Server stores session data        | Server stores nothing (stateless) |
| Session ID in cookie              | Token in header/cookie            |
| Easy to invalidate                | Hard to invalidate before expiry  |
| Not ideal for distributed systems | Great for microservices/APIs      |
| More secure by default            | Requires careful implementation   |

**Interview Answer:**

> "Sessions store state on the server and use a session ID cookie. Tokens (JWT) are self-contained and stateless — the server doesn't store anything. Sessions are easier to invalidate but harder to scale. JWTs scale easily but are harder to revoke before they expire."

---

### Q57. What is `express-session` and how does it work?

**Interview Answer:**

> "`express-session` manages user sessions by storing a session ID in a cookie. Session data is stored server-side (in memory by default, or Redis/DB in production). On each request, the session ID from the cookie is matched to the server-side session data."

```js
const session = require('express-session');

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 } // 1 hour
}));

app.post('/login', (req, res) => {
  req.session.userId = 123; // store in session
  res.send('Logged in');
});

app.get('/profile', (req, res) => {
  if (!req.session.userId) return res.status(401).send('Not logged in');
  res.send(`User ${req.session.userId}`);
});
```

---

### Q58. What is Passport.js and how is it used with Express?

**Interview Answer:**

> "Passport.js is an authentication middleware for Express that supports 500+ authentication strategies: local (username/password), Google OAuth, GitHub, Facebook, JWT, etc. You configure a strategy and Passport handles the authentication logic."

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user || !user.verifyPassword(password)) return done(null, false);
  return done(null, user);
}));

app.use(passport.initialize());
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));
```

---

### Q59. How do you protect Express routes using middleware?

**Interview Answer:**

> "Create an authentication middleware that checks for a valid session or JWT. Apply it to protected routes using `app.use()` or as a route-specific middleware argument."

```js
const protect = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Please log in' });
  }
  next();
};

// Apply to specific route
app.get('/settings', protect, (req, res) => res.send('Settings'));

// Apply to all /admin routes
app.use('/admin', protect);
```

---

### Q60. What is OAuth2 and how is it integrated with Express?

**Interview Answer:**

> "OAuth2 allows users to authenticate via a third-party provider (Google, GitHub) without sharing their password with your app. The flow: user clicks 'Login with Google' → redirected to Google → Google sends back an authorization code → your server exchanges it for an access token → you get user info. Passport.js with `passport-google-oauth20` simplifies this."

```js
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // find or create user in your DB
  done(null, profile);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/dashboard' }));
```

---

## 📌 SECTION 10 — DATABASE INTEGRATION

---

### Q61. How do you connect Express with MongoDB using Mongoose?

**Interview Answer:**

> "Install `mongoose`, then call `mongoose.connect()` with your MongoDB URI at app startup. It manages the connection pool automatically."

```js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection failed:', err));
```

---

### Q62. What are schemas and models in Mongoose?

**Interview Answer:**

> "A **Schema** defines the structure of a MongoDB document — field names, types, validations. A **Model** is a class created from the schema that provides methods for interacting with the collection (find, save, update, delete)."

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

---

### Q63. How do you perform CRUD operations using Express + MongoDB?

**Interview Answer:**

> "Map HTTP methods to CRUD operations using Mongoose model methods."

```js
// CREATE
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// READ
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
```

---

### Q64. How do you connect Express with MySQL/PostgreSQL?

**Interview Answer:**

> "Use `mysql2` for MySQL or `pg` for PostgreSQL. Or use an ORM like Sequelize/Prisma which supports both."

```js
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost', user: 'root', database: 'mydb', password: 'pass'
});

app.get('/users', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM users');
  res.json(rows);
});
```

---

### Q65. What is an ORM/ODM and why use one?

**Interview Answer:**

> "An **ORM** (Object-Relational Mapper) maps SQL tables to JavaScript classes. An **ODM** (Object Document Mapper) does the same for NoSQL. Benefits: type safety, query building, migrations, validation, avoiding raw SQL. Examples: Sequelize/Prisma (SQL), Mongoose (MongoDB), TypeORM (SQL + TypeScript)."

---

### Q66. What is connection pooling and why is it needed?

**Interview Answer:**

> "Creating a new database connection for every request is slow and resource-intensive. A **connection pool** maintains a set of pre-established connections that are reused. When a request needs a DB operation, it borrows a connection from the pool, uses it, then returns it. Mongoose and most DB libraries handle this automatically."

---

## 📌 SECTION 11 — EXPRESS APP ARCHITECTURE

---

### Q67. What is project structure in Express?

**Interview Answer:**

> "A well-organized Express project separates concerns into layers:"

```
src/
├── routes/         # URL routing (defines endpoints)
├── controllers/    # Request handling logic
├── services/       # Business logic
├── models/         # Database schemas
├── middleware/     # Custom middleware
├── config/         # DB, env configuration
└── app.js          # App entry point
```

---

### Q68. What is the MVC pattern in Express apps?

**Interview Answer:**

> "MVC stands for Model-View-Controller:
>
> * **Model** — Data layer (Mongoose schemas, DB queries)
> * **View** — Presentation layer (EJS templates, or just JSON for APIs)
> * **Controller** — Handles request logic, calls the model, returns response
>
> It separates concerns, making code easier to test and maintain."

---

### Q69. How do you modularize routes and controllers?

**Interview Answer:**

> "Keep routes thin — they just define paths and call controller functions. Controllers contain the request-handling logic. This separation makes both easy to test independently."

```js
// controllers/userController.js
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// routes/users.js
const { getAllUsers } = require('../controllers/userController');
router.get('/', getAllUsers);
```

---

### Q70. What is dependency injection in Express?

**Interview Answer:**

> "Dependency injection (DI) means providing a function/class its dependencies from outside rather than creating them internally. In Express, this often means passing services/repositories into controllers rather than importing them directly. Makes testing easier — you can inject mock dependencies."

---

### Q71. What is the repository pattern?

**Interview Answer:**

> "The repository pattern abstracts the database layer. Instead of calling `User.findById()` directly in your service, you call `userRepository.findById()`. This decouples business logic from database technology — you could swap MongoDB for PostgreSQL without changing service code."

---

### Q72. What is the service layer?

**Interview Answer:**

> "The service layer contains business logic — it sits between controllers and the data layer (repositories/models). Controllers handle HTTP; services handle business rules. This makes business logic reusable and independently testable."

```
Request → Controller → Service → Repository → Database
         (HTTP logic)  (Business) (Data access)
```

---

## 📌 SECTION 12 — TESTING EXPRESS APPLICATIONS

---

### Q73. What is unit testing in Express?

**Interview Answer:**

> "Unit testing tests individual functions or modules in isolation — controllers, services, utility functions — without running the full server or connecting to a database. Dependencies are replaced with mocks."

---

### Q74. How do you use Jest to test Express apps?

**Interview Answer:**

> "Install `jest`, write test files with `.test.js` extension. Use `describe()` for grouping and `it()` or `test()` for individual test cases."

```js
// services/math.test.js
const { add } = require('./math');

describe('add function', () => {
  it('should return 5 for 2 + 3', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

---

### Q75. What is Supertest and how do you test API endpoints?

**Interview Answer:**

> "Supertest lets you make HTTP requests to your Express app in tests without starting a real server. It's used for integration testing — testing routes end-to-end."

```js
const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
  it('should return 200 and a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

---

### Q76. What is mocking in Express testing?

**Interview Answer:**

> "Mocking replaces real dependencies (database calls, external APIs) with fake implementations during tests. This makes tests fast, predictable, and independent. Jest provides `jest.mock()` and `jest.fn()` for this."

```js
jest.mock('../models/User');
User.find.mockResolvedValue([{ name: 'John' }]);
```

---

### Q77. What is integration testing?

**Interview Answer:**

> "Integration testing tests how multiple parts of the system work together — route + controller + service + database. Unlike unit tests that test in isolation, integration tests test the full request-response cycle. Supertest is commonly used."

---

## 📌 SECTION 13 — PERFORMANCE OPTIMIZATION

---

### Q78. How do you improve Express performance?

**Interview Answer:**

> "Key techniques:
>
> 1. Use **compression** middleware (gzip responses)
> 2. Use **caching** (Redis for frequent queries)
> 3. Use **clustering** (use all CPU cores)
> 4. Enable **keep-alive** connections
> 5. Use **async/await** properly (no blocking code)
> 6. Use **pagination** for large datasets
> 7. Add **indexes** to your database
> 8. Serve static files via **CDN or Nginx** instead of Express"

---

### Q79. What is clustering in Node.js?

**Interview Answer:**

> "Node.js is single-threaded — it uses only one CPU core by default. The `cluster` module or PM2 lets you spawn multiple worker processes (one per CPU core), all sharing the same port. This dramatically improves throughput for CPU-bound tasks."

```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork()); // spawn one worker per CPU
} else {
  require('./app'); // each worker runs the Express app
}
```

---

### Q80. What is load balancing?

**Interview Answer:**

> "Load balancing distributes incoming requests across multiple server instances to prevent any one server from being overwhelmed. Nginx or AWS ELB can sit in front of multiple Express instances and route requests using round-robin, least connections, or IP hash strategies."

---

### Q81. How do you use PM2 to scale Express applications?

**Interview Answer:**

> "PM2 is a process manager for Node.js. It keeps your app running after crashes, enables clustering with one command, manages logs, and supports zero-downtime restarts."

```bash
pm2 start app.js -i max   # start one process per CPU core
pm2 restart app           # restart
pm2 logs                  # view logs
pm2 save && pm2 startup   # auto-restart on server reboot
```

---

### Q82. What is caching and how do you use Redis with Express?

**Interview Answer:**

> "Caching stores the result of expensive operations (DB queries, API calls) so future requests get the result instantly without re-computation. Redis is an in-memory key-value store perfect for caching."

```js
const redis = require('redis');
const client = redis.createClient();

app.get('/users', async (req, res) => {
  const cached = await client.get('all_users');
  if (cached) return res.json(JSON.parse(cached));
  
  const users = await User.find();
  await client.setEx('all_users', 3600, JSON.stringify(users)); // cache for 1hr
  res.json(users);
});
```

---

### Q83. What is gzip compression and how do you enable it?

**Interview Answer:**

> "Gzip compresses HTTP responses before sending them to the client, reducing response size by 60-80%. This means faster downloads and less bandwidth usage. Use the `compression` middleware."

```js
const compression = require('compression');
app.use(compression()); // gzip all responses automatically
```

---

### Q84. How does Express handle concurrent connections?

**Interview Answer:**

> "Node.js uses an event loop and non-blocking I/O. When Express handles a request that involves I/O (DB query, file read), it doesn't block — it registers a callback and moves on to the next request. This allows Express to handle thousands of concurrent connections with a single thread, as long as you use async/non-blocking operations."

---

## 📌 SECTION 14 — EXPRESS MIDDLEWARE ECOSYSTEM

---

### Q85. What is `multer` and how does it handle file uploads? *(See Q34)*

**Interview Answer:**

> "Multer processes `multipart/form-data` requests. It supports storing files in memory (`memoryStorage`) or disk (`diskStorage`). You configure file naming, destination, and size limits. Files are available at `req.file` or `req.files`."

```js
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB
```

---

### Q86. What is `cookie-parser` and how do you use cookies?

**Interview Answer:**

> "`cookie-parser` middleware parses the `Cookie` header and makes cookies available at `req.cookies`. You can set cookies on responses using `res.cookie()`."

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set', (req, res) => {
  res.cookie('username', 'John', { maxAge: 86400000, httpOnly: true });
  res.send('Cookie set');
});

app.get('/get', (req, res) => {
  res.send(`Cookie: ${req.cookies.username}`);
});
```

---

### Q87. What is compression middleware and why is it used? *(See Q83)*

**Quick Answer:**

> "It gzip-compresses HTTP responses, reducing payload size and improving performance."

---

### Q88. What is `express-validator` and how does validation work?

**Interview Answer:**

> "`express-validator` is a middleware for validating and sanitizing incoming request data. You chain validation rules on fields, then check results with `validationResult()`."

```js
const { body, validationResult } = require('express-validator');

app.post('/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    res.send('Registered!');
  }
);
```

---

### Q89. What is `connect-history-api-fallback` used for?

**Interview Answer:**

> "When serving a Single Page Application (React/Vue) with Express, refreshing on a client-side route like `/dashboard` returns a 404 because the server doesn't have that route. `connect-history-api-fallback` intercepts all navigation requests and serves `index.html`, letting the frontend router handle it."

```js
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static('dist')); // React/Vue build folder
```

---

## 📌 SECTION 15 — ADVANCED EXPRESS & REAL-WORLD CONCEPTS

---

### Q90. What is graceful shutdown and why is it important?

**Interview Answer:**

> "Graceful shutdown means cleanly stopping the server when it receives a termination signal (SIGTERM/SIGINT) — finishing in-progress requests, closing DB connections, and then exiting. Without it, terminating a server mid-request can cause data corruption or lost transactions."

```js
const server = app.listen(3000);

process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close();
    console.log('Server closed gracefully');
    process.exit(0);
  });
});
```

---

### Q91. What is zero-downtime deployment?

**Interview Answer:**

> "Zero-downtime deployment means updating your app without users experiencing any downtime. PM2 supports this with `pm2 reload app` — it starts new processes before killing old ones. Container orchestrators like Kubernetes do rolling updates. Blue-green deployments switch traffic between two identical environments."

```bash
pm2 reload app  # Zero-downtime restart with PM2
```

---

### Q92. What is reverse proxying and why use Nginx with Express?

**Interview Answer:**

> "A reverse proxy (like Nginx) sits in front of Express and forwards requests to it. Benefits:
>
> * **SSL termination** — Nginx handles HTTPS; Express only speaks HTTP internally
> * **Load balancing** — Distributes requests across multiple Express instances
> * **Static file serving** — Nginx is faster at serving static files than Express
> * **Security** — Hides Express directly from the internet"

```nginx
# nginx.conf
server {
  listen 80;
  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
  }
}
```

---

### Q93. What is API versioning and how do you implement it?

**Interview Answer:**

> "API versioning allows you to make breaking changes to your API without breaking existing clients. Common approaches:
>
> 1. **URL versioning** — `/api/v1/users`, `/api/v2/users`
> 2. **Header versioning** — `Accept: application/vnd.api.v2+json`"

```js
app.use('/api/v1', require('./routes/v1'));
app.use('/api/v2', require('./routes/v2'));
```

---

### Q94. How do you handle multipart uploads at scale?

**Interview Answer:**

> "For scale, don't save files to the local filesystem (it doesn't scale across multiple servers). Instead:
>
> 1. Use multer with `memoryStorage` to hold file in memory temporarily
> 2. Stream it directly to cloud storage (AWS S3, GCS) using SDKs like `@aws-sdk/client-s3`
> 3. Store the returned public URL in your database"

---

### Q95. What is an Express API gateway?

**Interview Answer:**

> "An API gateway is a single entry point that routes requests to different microservices. In Express, you can use `http-proxy-middleware` to forward requests to different services based on the path. It also handles auth, rate limiting, logging, and SSL in one place."

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/users', createProxyMiddleware({ target: 'http://user-service:3001' }));
app.use('/orders', createProxyMiddleware({ target: 'http://order-service:3002' }));
```

---

### Q96. What is the difference between monolithic and microservice architectures?

| Monolithic                   | Microservices              |
| ---------------------------- | -------------------------- |
| Single large app             | Multiple small services    |
| Easy to develop initially    | Complex to orchestrate     |
| Hard to scale specific parts | Scale individual services  |
| One deployment unit          | Independent deployments    |
| Shared database              | Each service owns its data |

**Interview Answer:**

> "A monolith has all features in one Express app. Microservices split features into independent services (user-service, payment-service) that communicate via HTTP or message queues. Monoliths are simpler to start with; microservices scale better but add operational complexity."

---

### Q97. How do you containerize an Express app using Docker?

**Interview Answer:**

> "Create a `Dockerfile` that defines the image, copy your code, install dependencies, and specify the startup command. Use `docker-compose` for multi-container setups (app + database)."

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

```bash
docker build -t my-express-app .
docker run -p 3000:3000 my-express-app
```

---

### Q98. How do you deploy Express apps?

**Interview Answer:**

> "Common platforms:
>
> * **Render/Railway** — Easiest, git-push deployment
> * **Heroku** — Classic PaaS, simple CLI deployment
> * **AWS EC2** — Full control, use PM2 + Nginx
> * **AWS Elastic Beanstalk** — Managed AWS deployment
> * **Vercel** — Works for serverless Express (via `@vercel/node`)
> * **Docker + AWS ECS/Kubernetes** — Containerized production deployments"

---

### Q99. What is rate throttling and how do you implement it?

**Interview Answer:**

> "Rate throttling limits request rate to prevent abuse. Different from rate limiting (which blocks), throttling queues or slows excess requests. `express-rate-limit` handles both. For advanced throttling (per-user, distributed), use Redis with `rate-limiter-flexible`."

```js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl',
  points: 10,    // 10 requests
  duration: 1,   // per second per IP
});

app.use(async (req, res, next) => {
  try {
    await limiter.consume(req.ip);
    next();
  } catch {
    res.status(429).send('Too Many Requests');
  }
});
```

---

### Q100. What is CSRF and how do you secure Express apps against it?

**Simple Explanation:**
CSRF (Cross-Site Request Forgery) is when a malicious website tricks your browser into making requests to your app while you're logged in — like secretly submitting a form to transfer money.

**Interview Answer:**

> "CSRF attacks exploit the fact that browsers automatically send cookies with requests. Protection methods:
>
> 1. **CSRF tokens** — Use `csurf` middleware (or `csrf` in newer versions) to generate unique tokens for each session, included in forms. Server validates the token on every state-changing request.
> 2. **SameSite cookies** — Set `SameSite=Strict` or `SameSite=Lax` on cookies so they're not sent cross-origin.
> 3. **CORS** — Properly configured CORS prevents unauthorized origins from making requests.
>    For APIs using JWT (stateless, no cookies), CSRF is generally not a concern."

```js
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', csrfProtection, (req, res) => {
  res.send('Form submitted safely');
});
```

---

## 🎯 QUICK REVISION CHEAT SHEET

| Concept              | One-liner                              |
| -------------------- | -------------------------------------- |
| Express              | Minimal framework on top of Node.js    |
| Middleware           | Functions in request-response pipeline |
| `next()`           | Pass control to next middleware        |
| Route params         | `:id`in URL path →`req.params.id` |
| Query params         | `?key=val`in URL →`req.query.key` |
| `express.json()`   | Parse JSON request body                |
| `express.static()` | Serve static files                     |
| JWT                  | Stateless auth token                   |
| Sessions             | Server-side stateful auth              |
| Helmet               | Security HTTP headers                  |
| CORS                 | Allow cross-origin requests            |
| Rate Limiting        | Throttle request count                 |
| Cluster              | Use all CPU cores                      |
| Redis                | In-memory caching                      |
| Mongoose             | MongoDB ODM                            |
| Multer               | File upload handling                   |
| Morgan               | HTTP request logger                    |
| PM2                  | Node.js process manager                |
| CSRF                 | Forged cross-site request attack       |
| XSS                  | Script injection attack                |

---

> ✅ **Tip for Interviews:** Always answer with: **What it is → Why it's used → Simple example → Production consideration**
>
