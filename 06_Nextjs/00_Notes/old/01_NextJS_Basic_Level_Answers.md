# Next.js Interview Questions - Basic Level (Detailed Answers)

## 1. What is Next.js?

**Answer:**

Next.js is a powerful **React framework** that makes it easier to build modern web applications. Think of it as a toolkit that sits on top of React and adds many features that React doesn't have by default.

### Key Features:
- **Server-Side Rendering (SSR)** - Render pages on the server before sending to browser
- **Static Site Generation (SSG)** - Pre-build pages at build time
- **API Routes** - Create backend endpoints without needing a separate server
- **Automatic Code Splitting** - Only load JavaScript needed for each page
- **Image Optimization** - Automatically optimize images for performance
- **File-based Routing** - Create routes just by creating files

### Why Use Next.js?

| Feature | React App | Next.js |
|---------|-----------|---------|
| Routing | Requires React Router | Built-in file-based routing |
| Backend API | Need separate server | Built-in API routes |
| SEO | Difficult (client-side render) | Easy (SSR/SSG) |
| Performance | Manual optimization | Automatic optimization |
| Deployment | Complex setup | Simple (Vercel ready) |

### Simple Example:
```javascript
// pages/index.js
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}
```
This automatically becomes the `/` route in your application.

---

## 2. What are the key differences between Next.js and Create React App?

**Answer:**

### Comparison Table:

| Aspect | Create React App (CRA) | Next.js |
|--------|------------------------|---------|
| **Rendering** | Client-side only | Client-side, SSR, or SSG |
| **Routing** | Need React Router | Built-in file-based routing |
| **API Backend** | Separate backend needed | Built-in API routes |
| **SEO** | Poor (content loaded by JS) | Excellent (pre-rendered HTML) |
| **Performance** | Slower initial load | Faster (optimized bundles) |
| **Styling** | CSS/SCSS modules | Multiple options supported |
| **Deployment** | Any static host | Vercel (optimized) |
| **Learning Curve** | Simple | Moderate |

### Example: Creating a page

**Create React App:**
```javascript
// src/pages/Home.js
import { BrowserRouter as Router, Route } from 'react-router-dom';

function Home() {
  return <h1>Home</h1>;
}

// src/App.js
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}
```

**Next.js:**
```javascript
// pages/index.js - Automatically becomes the home page!
export default function Home() {
  return <h1>Home</h1>;
}
```

### Key Advantage - SEO:
With CRA, search engines see an empty page with just JavaScript. With Next.js, they see the actual content because it's rendered on the server first.

---

## 3. Explain the file-based routing system in Next.js.

**Answer:**

Next.js automatically creates routes based on the file structure inside the `pages` directory. You don't need to configure routes manually - just create a file and it becomes a route!

### How File-Based Routing Works:

```
pages/
├── index.js           → /
├── about.js           → /about
├── contact.js         → /contact
├── products/
│   ├── index.js       → /products
│   └── [id].js        → /products/123 (dynamic)
└── blog/
    ├── [slug].js      → /blog/my-post (dynamic)
    └── [slug]/
        └── comments.js → /blog/my-post/comments
```

### Basic Routes:

**File: `pages/index.js`**
```javascript
export default function Home() {
  return <h1>Home Page</h1>;
}
// Route: / (home page)
```

**File: `pages/about.js`**
```javascript
export default function About() {
  return <h1>About Page</h1>;
}
// Route: /about
```

**File: `pages/contact.js`**
```javascript
export default function Contact() {
  return <h1>Contact Page</h1>;
}
// Route: /contact
```

### Dynamic Routes:

**File: `pages/posts/[id].js`** (Square brackets = dynamic)
```javascript
export default function Post() {
  return <h1>Post Page</h1>;
}
// Routes that match: /posts/1, /posts/hello, /posts/anything
```

**File: `pages/blog/[slug]/index.js`**
```javascript
export default function BlogPost() {
  return <h1>Blog Post</h1>;
}
// Routes that match: /blog/my-story, /blog/first-post
```

### Catch-All Routes:

**File: `pages/docs/[...params].js`** (Three dots = catch all)
```javascript
export default function Docs() {
  return <h1>Documentation</h1>;
}
// Routes that match: /docs/api, /docs/api/getting-started, /docs/a/b/c
```

---

## 4. What is the pages directory in Next.js?

**Answer:**

The `pages` directory is the **heart of Next.js routing**. Every file you create in this directory automatically becomes a route in your application.

### Structure:

```
your-app/
├── pages/
│   ├── index.js          (Home page - /)
│   ├── _app.js           (Wrapper for all pages)
│   ├── _document.js      (HTML document structure)
│   ├── _error.js         (Error page)
│   ├── 404.js            (Not found page)
│   ├── about.js          (/about)
│   ├── products/
│   │   ├── index.js      (/products)
│   │   └── [id].js       (/products/1)
│   └── api/
│       └── hello.js      (API route)
├── public/               (Static files)
├── styles/               (CSS files)
└── next.config.js        (Configuration)
```

### Special Files:

| File | Purpose |
|------|---------|
| `index.js` | Home page or folder index |
| `_app.js` | Wraps every page (global provider) |
| `_document.js` | Customize HTML document |
| `404.js` | Custom 404 page |
| `500.js` | Custom server error page |
| `api/` | Backend API routes |

### Example - Simple Pages:

**pages/index.js:**
```javascript
export default function Home() {
  return <h1>Welcome Home!</h1>;
}
```

**pages/about.js:**
```javascript
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We are a great company!</p>
    </div>
  );
}
```

**pages/services/index.js:**
```javascript
export default function Services() {
  return <h1>Our Services</h1>;
}
// This becomes /services route
```

---

## 5. How does Next.js handle styling?

**Answer:**

Next.js supports multiple styling approaches. You can choose what works best for your project!

### 1. Global CSS

Create a CSS file and import it in `_app.js`:

**styles/globals.css:**
```css
body {
  margin: 0;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
}
```

**pages/_app.js:**
```javascript
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### 2. CSS Modules

CSS Modules scope styles to a specific component:

**components/Button.module.css:**
```css
.primary {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary:hover {
  background-color: darkblue;
}
```

**components/Button.js:**
```javascript
import styles from './Button.module.css';

export default function Button() {
  return <button className={styles.primary}>Click Me</button>;
}
```

### 3. Tailwind CSS

**Install:**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js:**
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Use in components:**
```javascript
export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>
    </div>
  );
}
```

### 4. CSS-in-JS (Styled-components)

**Install:**
```bash
npm install styled-components
npm install -D babel-plugin-styled-components
```

**components/StyledButton.js:**
```javascript
import styled from 'styled-components';

const StyledBtn = styled.button`
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

export default function Button() {
  return <StyledBtn>Styled Button</StyledBtn>;
}
```

### Comparison:

| Method | Pros | Cons |
|--------|------|------|
| Global CSS | Simple, fast | Global scope conflicts |
| CSS Modules | Scoped, no conflicts | Extra setup |
| Tailwind | Fast development, responsive | Large CSS file |
| Styled-components | Dynamic styles, scoped | Performance overhead |

---

## 6. What is Server-Side Rendering (SSR)?

**Answer:**

Server-Side Rendering means the **page is built on the server** before being sent to the browser. The browser receives a complete HTML page instead of an empty page with JavaScript.

### How SSR Works:

```
1. User visits your site
   ↓
2. Server processes request
   ↓
3. Server renders React component to HTML
   ↓
4. Server sends complete HTML to browser
   ↓
5. Browser displays page immediately
   ↓
6. React attaches to page (hydration)
```

### Why Use SSR?

✅ **SEO Friendly** - Search engines can see content immediately  
✅ **Faster First Paint** - Users see content faster  
✅ **Dynamic Content** - Generate different HTML for different users  
✅ **API Data** - Can fetch data before rendering  

### Implementation:

**pages/posts/[id].js:**
```javascript
// This function runs on the server for EVERY request
export async function getServerSideProps(context) {
  const { id } = context.params;
  
  // Fetch data from API
  const res = await fetch(`https://api.example.com/posts/${id}`);
  const post = await res.json();
  
  // Return props to component
  return {
    props: { post },
    revalidate: 60 // Update every 60 seconds
  };
}

// This component receives data and renders
export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>By {post.author}</p>
    </article>
  );
}
```

### Real Example:

**pages/user/[username].js:**
```javascript
export async function getServerSideProps(context) {
  const { username } = context.params;
  
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const userData = await response.json();
    
    return {
      props: { user: userData }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default function UserProfile({ user }) {
  return (
    <div>
      <img src={user.avatar_url} alt={user.login} width={100} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <p>Followers: {user.followers}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Visit GitHub Profile
      </a>
    </div>
  );
}
```

---

## 7. What is Static Site Generation (SSG)?

**Answer:**

Static Site Generation means **pages are built once at build time** and then served as static files. This is the fastest way to serve pages!

### How SSG Works:

```
1. You run: npm run build
   ↓
2. Next.js generates HTML for all pages
   ↓
3. HTML files are saved (no JavaScript needed to build them again)
   ↓
4. When user visits, server sends pre-built HTML immediately
   ↓
5. Browser displays page in milliseconds
```

### Why Use SSG?

✅ **Super Fast** - Pages are pre-built  
✅ **SEO Friendly** - Search engines see content  
✅ **Cheap Hosting** - Can use static file hosting  
✅ **Scalable** - No server processing needed  

### Implementation:

**pages/about.js:**
```javascript
export async function getStaticProps() {
  // This runs only at build time
  return {
    props: {
      buildTime: new Date().toISOString()
    },
    revalidate: 3600 // Regenerate every hour
  };
}

export default function About({ buildTime }) {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page was built at: {buildTime}</p>
      <p>Content remains same until rebuild</p>
    </div>
  );
}
```

### Real Example - Blog:

**pages/blog/[slug].js:**
```javascript
// This tells Next.js which pages to generate at build time
export async function getStaticPaths() {
  // Fetch all blog posts
  const res = await fetch('https://api.example.com/blog-posts');
  const posts = await res.json();
  
  // Create path for each post
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths,
    fallback: false // Return 404 if page not found
  };
}

// Fetch data for each static page
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();
  
  return {
    props: { post },
    revalidate: 3600 // Regenerate every hour
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div>{post.content}</div>
    </article>
  );
}
```

### SSR vs SSG Comparison:

| Aspect | SSR | SSG |
|--------|-----|-----|
| **Build Time** | Fast | Slow (generates all pages) |
| **Runtime** | Slow (render on each request) | Fast (pre-built) |
| **Cost** | Higher (server resources) | Lower (static hosting) |
| **Dynamic Data** | Yes | No (unless with ISR) |
| **Best For** | Real-time data, personalized | Blog posts, documentation |

---

## 8. Explain `getStaticProps` in Next.js.

**Answer:**

`getStaticProps` is a function that fetches data **at build time** and generates static pages. It's used with Static Site Generation.

### Key Points:

- ✅ Runs only at build time (not in browser)
- ✅ Fetches data once and generates HTML
- ✅ HTML is cached and served from CDN
- ✅ Fastest way to serve pages
- ❌ Cannot access request context (headers, cookies)
- ❌ Data won't update unless you rebuild

### Syntax:

```javascript
export async function getStaticProps(context) {
  // Fetch data here
  const data = await fetchData();
  
  return {
    props: { data },        // Pass to component
    revalidate: 60,         // Update every 60 seconds (ISR)
    notFound: false,        // Return 404 if true
    redirect: {             // Redirect if needed
      destination: '/other',
      permanent: false
    }
  };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}
```

### Real Example - Product Page:

**pages/products/[id].js:**
```javascript
export async function getStaticPaths() {
  // Fetch all product IDs
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  // Create a path for each product
  const paths = products.map(product => ({
    params: { id: product.id.toString() }
  }));
  
  return {
    paths,
    fallback: 'blocking' // Generate missing pages on request
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  
  // Fetch product data
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product = await res.json();
  
  if (!product) {
    return { notFound: true }; // Show 404
  }
  
  return {
    props: { product },
    revalidate: 86400 // Regenerate every 24 hours
  };
}

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <img src={product.image} alt={product.name} />
      <button>Add to Cart</button>
    </div>
  );
}
```

### Incremental Static Regeneration (ISR):

The `revalidate` option enables ISR - it regenerates static pages in the background:

```javascript
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
```

**How ISR Works:**
1. Page is served from cache for 60 seconds
2. On the 61st second, background regeneration starts
3. New page is generated while old one is served
4. Once generated, new page is cached

---

## 9. What is `getServerSideProps`?

**Answer:**

`getServerSideProps` is a function that runs **on every request** on the server. Use it when you need fresh data for every visitor.

### Key Points:

- ✅ Runs on every request (not at build time)
- ✅ Access to request context (headers, cookies, query params)
- ✅ Data is always fresh
- ✅ Good for real-time data
- ❌ Slower than static generation
- ❌ Requires a server to run

### Syntax:

```javascript
export async function getServerSideProps(context) {
  const { req, res, params, query } = context;
  
  // Fetch fresh data on every request
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60 // Cache for 60 seconds on CDN
  };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}
```

### Real Example - User Dashboard:

**pages/dashboard.js:**
```javascript
export async function getServerSideProps(context) {
  const { req, res } = context;
  
  // Get cookie/token for authentication
  const token = req.cookies.authToken;
  
  if (!token) {
    // Redirect to login if not authenticated
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  
  // Fetch user-specific data
  const userRes = await fetch('https://api.example.com/user', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const userData = await userRes.json();
  
  return {
    props: { user: userData }
  };
}

export default function Dashboard({ user }) {
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Last login: {user.lastLogin}</p>
      <h2>Your Account Info</h2>
      <ul>
        <li>Subscription: {user.subscription}</li>
        <li>Credits: {user.credits}</li>
      </ul>
    </div>
  );
}
```

### Another Example - Search Results:

**pages/search.js:**
```javascript
export async function getServerSideProps(context) {
  const { query } = context;
  const searchTerm = query.q || '';
  
  if (!searchTerm) {
    return {
      props: { results: [] }
    };
  }
  
  // Fetch search results
  const res = await fetch(`https://api.example.com/search?q=${searchTerm}`);
  const results = await res.json();
  
  return {
    props: { results, searchTerm }
  };
}

export default function SearchResults({ results, searchTerm }) {
  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>
      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.id}>
              <a href={result.url}>{result.title}</a>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### When to Use:

- 🎯 User authentication required
- 🎯 Real-time data needed
- 🎯 Access to cookies/headers needed
- 🎯 Data depends on request params (query string)

---

## 10. Explain `getStaticPaths`.

**Answer:**

`getStaticPaths` tells Next.js **which dynamic routes to pre-generate** at build time. It works with `getStaticProps` for dynamic pages.

### Why Needed?

For dynamic routes like `/posts/[id].js`, Next.js doesn't know which `id` values to generate. `getStaticPaths` provides this list.

### Syntax:

```javascript
export async function getStaticPaths() {
  // Fetch all possible values
  const data = await fetchAllData();
  
  // Create paths array
  const paths = data.map(item => ({
    params: { id: item.id.toString() }
  }));
  
  return {
    paths,
    fallback: true // 'blocking' or false
  };
}

export async function getStaticProps({ params }) {
  // ... fetch data for specific item
}

export default function Page({ data }) {
  // ... render component
}
```

### Real Example - Blog Posts:

**pages/blog/[slug].js:**
```javascript
export async function getStaticPaths() {
  // Fetch all blog posts
  const res = await fetch('https://api.example.com/blog');
  const posts = await res.json();
  
  // Create a path for each post
  // Example: /blog/first-post, /blog/second-post
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/blog/${params.slug}`);
  const post = await res.json();
  
  return {
    props: { post },
    revalidate: 3600
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

### Fallback Options:

#### 1. `fallback: false`

Only pre-generated paths work. Others show 404.

```javascript
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: false
};
```

✅ Use when: You have few static pages  
❌ Problem: New posts won't show until rebuild

#### 2. `fallback: true`

Generate missing pages on first request.

```javascript
return {
  paths: [
    { params: { id: '1' } },
    { params: { id: '2' } }
  ],
  fallback: true
};
```

✅ Use when: You have many pages  
⚠️ Problem: First visitor sees loading state

**Handling fallback in component:**
```javascript
import { useRouter } from 'next/router';

export default function Post({ post }) {
  const router = useRouter();
  
  // Show loading while page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

#### 3. `fallback: 'blocking'`

Generate page server-side before responding (best UX).

```javascript
return {
  paths: [],
  fallback: 'blocking'
};
```

✅ Use when: You want best user experience  
✅ No loading state needed

---

## 11. What are API Routes in Next.js?

**Answer:**

API Routes allow you to **create backend endpoints** in Next.js. Files in the `/pages/api` directory automatically become API routes - no separate backend server needed!

### Key Features:

- ✅ Built-in backend
- ✅ No CORS issues (same origin)
- ✅ Serverless functions
- ✅ Environment variables support
- ✅ Request/response handling

### How It Works:

```
pages/api/
├── hello.js          → /api/hello
├── users.js          → /api/users
├── users/
│   └── [id].js       → /api/users/123
└── upload.js         → /api/upload
```

### Simple Example:

**pages/api/hello.js:**
```javascript
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World!' });
}
```

Visit `http://localhost:3000/api/hello` and you get:
```json
{ "message": "Hello World!" }
```

### Handling Different Methods:

**pages/api/users.js:**
```javascript
export default function handler(req, res) {
  // Get request
  if (req.method === 'GET') {
    return res.status(200).json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]);
  }
  
  // Post request
  if (req.method === 'POST') {
    const newUser = req.body; // { name: 'Bob' }
    return res.status(201).json({ id: 3, ...newUser });
  }
  
  // Method not allowed
  return res.status(405).end();
}
```

### Real Example - Database Operations:

**pages/api/posts.js:**
```javascript
import db from '@/lib/db'; // Your database connection

export default async function handler(req, res) {
  try {
    // GET all posts
    if (req.method === 'GET') {
      const posts = await db.query('SELECT * FROM posts');
      return res.status(200).json(posts);
    }
    
    // POST create new post
    if (req.method === 'POST') {
      const { title, content, author } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'Missing fields' });
      }
      
      const newPost = await db.query(
        'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
        [title, content, author]
      );
      
      return res.status(201).json(newPost);
    }
    
    res.status(405).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### Using from Frontend:

**pages/index.js:**
```javascript
import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    // Fetch from your API route
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 12. How do you create an API route?

**Answer:**

Creating an API route is simple - just create a file in `/pages/api` directory!

### Step-by-Step:

**Step 1:** Create file `pages/api/hello.js`

```javascript
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello!' });
}
```

**Step 2:** Access it at `http://localhost:3000/api/hello`

**Step 3:** You get response: `{ "message": "Hello!" }`

### Complete Example with All HTTP Methods:

**pages/api/todos.js:**
```javascript
let todos = [
  { id: 1, title: 'Learn Next.js', done: false },
  { id: 2, title: 'Build project', done: false }
];

export default function handler(req, res) {
  // GET - Fetch all todos
  if (req.method === 'GET') {
    return res.status(200).json(todos);
  }
  
  // POST - Create new todo
  if (req.method === 'POST') {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }
    
    const newTodo = {
      id: todos.length + 1,
      title,
      done: false
    };
    
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  }
  
  // PUT - Update todo
  if (req.method === 'PUT') {
    const { id, done } = req.body;
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    todo.done = done;
    return res.status(200).json(todo);
  }
  
  // DELETE - Delete todo
  if (req.method === 'DELETE') {
    const { id } = req.body;
    todos = todos.filter(t => t.id !== id);
    return res.status(200).json({ message: 'Deleted' });
  }
  
  // Method not allowed
  res.status(405).end();
}
```

### Dynamic API Routes:

**pages/api/users/[id].js:**
```javascript
export default function handler(req, res) {
  const { id } = req.query;
  
  // Simulate database lookup
  const users = {
    '1': { id: 1, name: 'John', email: 'john@example.com' },
    '2': { id: 2, name: 'Jane', email: 'jane@example.com' }
  };
  
  const user = users[id];
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  return res.status(200).json(user);
}
```

Access:
- `GET /api/users/1` → Returns John's data
- `GET /api/users/2` → Returns Jane's data
- `GET /api/users/999` → Returns 404 error

---

## 13. What is Image Optimization in Next.js?

**Answer:**

Image Optimization automatically optimizes images for web - smaller file sizes, better formats, responsive sizes, and lazy loading!

### Benefits:

✅ Smaller file sizes (saves bandwidth)  
✅ Modern formats (WebP for supported browsers)  
✅ Responsive images (different sizes for different devices)  
✅ Lazy loading (loads only when needed)  
✅ Prevents layout shift  

### Without Optimization (Regular HTML):

```html
<!-- This loads full image for all devices! -->
<img src="/large-image.jpg" alt="picture" width="800" height="600" />
```

Problems:
- Mobile users download 800px image but only see 300px
- No lazy loading (loads immediately)
- No modern format support
- Layout shift while loading

### With Next.js Image Component:

```javascript
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/optimized-image.jpg"
      alt="picture"
      width={800}
      height={600}
    />
  );
}
```

Benefits:
- ✅ Automatically creates multiple sizes (mobile, tablet, desktop)
- ✅ Uses WebP format if supported
- ✅ Lazy loading by default
- ✅ No layout shift (knows exact dimensions)

---

## 14. How do you use the Image component?

**Answer:**

The Image component is Next.js' optimized way to display images.

### Basic Usage:

```javascript
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/my-image.jpg"
      alt="Description"
      width={300}
      height={200}
    />
  );
}
```

### With External Images:

For external URLs, configure `next.config.js`:

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['example.com', 'cdn.example.com']
  }
};
```

Then use:
```javascript
import Image from 'next/image';

export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External"
      width={500}
      height={300}
    />
  );
}
```

### Responsive Images:

```javascript
import Image from 'next/image';

export default function ResponsiveImage() {
  return (
    <Image
      src="/responsive.jpg"
      alt="Responsive"
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, 50vw"
      quality={75}
      priority={false}
    />
  );
}
```

### Background Image Style:

```javascript
import Image from 'next/image';

export default function Hero() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
        src="/hero.jpg"
        alt="Hero"
        layout="fill"
        objectFit="cover"
      />
      <h1 style={{ position: 'relative', zIndex: 10, color: 'white' }}>
        Welcome!
      </h1>
    </div>
  );
}
```

### Common Props:

| Prop | Purpose |
|------|---------|
| `src` | Image URL or import |
| `alt` | Alt text (required) |
| `width` | Image width in pixels |
| `height` | Image height in pixels |
| `layout` | How image scales |
| `objectFit` | How to fill container |
| `quality` | 1-100 (default 75) |
| `priority` | Preload image |
| `loading` | 'lazy' or 'eager' |
| `sizes` | Responsive sizes |

---

## 15. What is `next/link`?

**Answer:**

`next/link` enables **client-side navigation** between pages without full page reload. This makes your app feel fast!

### Regular Link (Full Page Reload):
```html
<a href="/about">About</a>
<!-- Page refreshes, all state lost -->
```

### Next.js Link (Fast Navigation):
```javascript
import Link from 'next/link';

export default function Home() {
  return <Link href="/about">About</Link>;
}
```

### Key Benefits:

✅ No full page reload (faster)  
✅ Smooth experience  
✅ Prefetching (loads next page before click)  
✅ State preserved  

### Basic Examples:

**Simple link:**
```javascript
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
```

**Dynamic link:**
```javascript
import Link from 'next/link';

export default function PostsList({ posts }) {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

**With query string:**
```javascript
import Link from 'next/link';

export default function Filter() {
  return (
    <>
      <Link href="/products?category=electronics">Electronics</Link>
      <Link href="/products?category=books">Books</Link>
    </>
  );
}
```

**With className:**
```javascript
import Link from 'next/link';

export default function StyledLink() {
  return (
    <Link href="/about" className="btn btn-primary">
      About Us
    </Link>
  );
}
```

---

## 16. Explain the difference between `<Link>` and `<a>` tags.

**Answer:**

| Feature | `<Link>` | `<a>` |
|---------|---------|-------|
| **Page Reload** | No (client-side) | Yes (full reload) |
| **Speed** | ⚡ Fast | Slow |
| **State** | Preserved | Lost |
| **Prefetch** | Yes (by default) | No |
| **Use in Next.js** | ✅ Recommended | ❌ Not recommended |

### Side-by-Side Example:

**Using `<a>` tag:**
```javascript
export default function Home() {
  return (
    <>
      <h1>Page {Math.random()}</h1>
      <a href="/about">Go to About</a>
      {/* Click this: page refreshes, number changes */}
    </>
  );
}
```

**Using `<Link>`:**
```javascript
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Page {Math.random()}</h1>
      <Link href="/about">Go to About</Link>
      {/* Click this: no refresh, same number */}
    </>
  );
}
```

### When to Use Each:

**Use `<Link>`:**
- Internal navigation (between your pages)
- Want fast experience
- Building SPA-like apps

**Use `<a>`:**
- External links (outside your app)
- When you need to trigger page reload
- Downloads or file links

### Correct Approach for External Links:

```javascript
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      {/* Internal - use Link */}
      <Link href="/about">About</Link>
      
      {/* External - use a tag */}
      <a href="https://google.com" target="_blank" rel="noopener noreferrer">
        Google
      </a>
    </nav>
  );
}
```

---

## 17. What are layout components in Next.js?

**Answer:**

Layout components **wrap pages and persist across navigation**. They maintain state and don't re-mount when navigating between pages.

### Why Use Layouts?

✅ Header/Footer stay visible  
✅ Navigation persists  
✅ State maintained  
✅ Consistent styling  

### Simple Layout:

**components/Layout.js:**
```javascript
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

**pages/index.js:**
```javascript
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <h1>Home Page</h1>
      <p>Content here</p>
    </Layout>
  );
}
```

### Layout with Navigation:

**components/Layout.js:**
```javascript
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <header style={{ background: '#333', color: 'white', padding: '20px' }}>
        <h1>My App</h1>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>
      
      <main style={{ padding: '20px' }}>
        <p>Navigation clicked: {count} times</p>
        {children}
      </main>
      
      <footer style={{ background: '#f0f0f0', padding: '20px', marginTop: '50px' }}>
        <p>&copy; 2024 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}
```

**pages/about.js:**
```javascript
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <h1>About Page</h1>
      <p>About content</p>
    </Layout>
  );
}
```

When you navigate from Home to About:
- ✅ Header stays (not re-rendered)
- ✅ Footer stays (not re-rendered)
- ✅ State (count) persists

---

## 18. How do you create a custom layout in Next.js?

**Answer:**

Create a custom layout by wrapping components with a layout component.

### Method 1: Per-Page Layouts (Recommended)

**components/MainLayout.js:**
```javascript
export default function MainLayout({ children }) {
  return (
    <div>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </div>
  );
}
```

**pages/index.js:**
```javascript
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <h1>Home</h1>
    </MainLayout>
  );
}
```

### Method 2: Global Layout in _app.js

**pages/_app.js:**
```javascript
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

Now every page automatically gets the layout!

### Method 3: Multiple Layouts

**components/AdminLayout.js:**
```javascript
export default function AdminLayout({ children }) {
  return (
    <div className="admin">
      <aside>Admin Sidebar</aside>
      <main>{children}</main>
    </div>
  );
}
```

**components/BlogLayout.js:**
```javascript
export default function BlogLayout({ children }) {
  return (
    <div className="blog">
      <aside>Blog Categories</aside>
      <main>{children}</main>
    </div>
  );
}
```

**pages/admin/dashboard.js:**
```javascript
import AdminLayout from '@/components/AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>
    </AdminLayout>
  );
}
```

**pages/blog/[slug].js:**
```javascript
import BlogLayout from '@/components/BlogLayout';

export default function BlogPost({ post }) {
  return (
    <BlogLayout>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </BlogLayout>
  );
}
```

---

## 19. What is the `_app.js` file?

**Answer:**

`_app.js` is a **special file that wraps all pages** in your Next.js app. It runs before any page loads.

### What You Can Do in _app.js:

✅ Add global CSS  
✅ Add context providers  
✅ Add global layout  
✅ Handle errors  
✅ Track analytics  
✅ Pass data to all pages  

### Basic _app.js:

**pages/_app.js:**
```javascript
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

This wraps every page component.

### With Global CSS:

**pages/_app.js:**
```javascript
import '../styles/globals.css';
import '../styles/navbar.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### With Global Layout:

**pages/_app.js:**
```javascript
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

Now all pages have the layout!

### With Context Provider:

**pages/_app.js:**
```javascript
import '../styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### With Error Handling:

**pages/_app.js:**
```javascript
import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Handle errors
    window.addEventListener('error', (event) => {
      console.error('Error:', event.error);
    });
  }, []);
  
  return <Component {...pageProps} />;
}

export default MyApp;
```

### With Analytics:

**pages/_app.js:**
```javascript
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Track page views
    const handleRouteChange = (url) => {
      console.log(`Page changed to: ${url}`);
      // Send to analytics
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
  
  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## 20. What is the `_document.js` file?

**Answer:**

`_document.js` lets you **customize the HTML document structure**. Use it for global `<head>` and `<body>` customization.

### Basic _document.js:

**pages/_document.js:**
```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Custom head content */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### With Google Fonts:

**pages/_document.js:**
```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### With Meta Tags:

**pages/_document.js:**
```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="My Next.js App" />
        <meta property="og:title" content="My App" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Key Differences:

| File | Purpose |
|------|---------|
| `_app.js` | Wraps page content (inside `<body>`) |
| `_document.js` | Customizes entire HTML (head + body) |

---

## Summary

These 20 basic level questions cover:
- ✅ What is Next.js and why use it
- ✅ Routing and pages
- ✅ Data fetching (SSG and SSR)
- ✅ Images and styling
- ✅ API routes
- ✅ Special files (_app, _document)

**Next Step:** Study Intermediate Level questions (21-50) in the next file!
