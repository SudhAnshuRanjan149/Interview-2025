# Next.js Interview Questions - Intermediate Level (Detailed Answers)

## 21. What is Incremental Static Regeneration (ISR)?

**Answer:**

Incremental Static Regeneration (ISR) is a feature that lets you **update static pages without rebuilding the entire site**. You can have the benefits of static generation with the ability to update content!

### The Problem ISR Solves:

With regular Static Site Generation (SSG):
- ❌ Build happens once
- ❌ All pages are generated at build time
- ❌ To update content, you must rebuild entire site
- ❌ New products won't show until rebuild

### How ISR Works:

```
1. Page is generated at build time
   ↓
2. Served from cache for X seconds (revalidate: 60)
   ↓
3. On the 61st second, someone visits the page
   ↓
4. Old page is served while new one generates in background
   ↓
5. New page is cached and served to next visitors
```

### Implementation:

**pages/products/[id].js:**
```javascript
export async function getStaticPaths() {
  // Generate only popular products at build time
  const res = await fetch('https://api.example.com/popular-products');
  const products = await res.json();
  
  const paths = products.map(product => ({
    params: { id: product.id.toString() }
  }));
  
  return {
    paths,
    fallback: 'blocking' // Generate other products on first request
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();
  
  return {
    props: { product },
    revalidate: 3600 // Regenerate every hour
  };
}

export default function Product({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}
```

### Real Example - Blog with ISR:

**pages/blog/[slug].js:**
```javascript
export async function getStaticPaths() {
  // Generate popular posts at build time
  const res = await fetch('https://api.example.com/blog/popular');
  const posts = await res.json();
  
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
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    revalidate: 86400 // Regenerate daily (24 hours)
  };
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {post.author} • {post.date}</p>
      <div>{post.content}</div>
      <p>Views: {post.views}</p>
    </article>
  );
}
```

### Timeline Example:

```
Build time (npm run build):
├─ Generate /blog/first-post ✓
├─ Generate /blog/second-post ✓
└─ Revalidate set to: 3600 (1 hour)

User 1 visits /blog/first-post at 10:00
├─ Gets cached page
└─ Next revalidate at: 11:00

User 2 visits /blog/first-post at 10:59
├─ Gets cached page (not expired yet)

User 3 visits /blog/first-post at 11:05
├─ Gets old cached page
├─ Background regeneration starts
└─ New page cached for next visitors

User 4 visits /blog/first-post at 11:10
└─ Gets fresh page ✓
```

### Benefits:

✅ Fast like static sites  
✅ Fresh content automatically  
✅ Scales to thousands of pages  
✅ No rebuild needed  
✅ Cost-effective  

---

## 22. Explain the fallback strategies in `getStaticPaths`.

**Answer:**

The `fallback` option in `getStaticPaths` tells Next.js what to do when someone visits a page that wasn't pre-generated.

### Three Options:

### 1. `fallback: false`

Only pre-generated paths work. Everything else shows 404.

**Use when:** You have a small, fixed number of pages

```javascript
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/items/${params.id}`);
  const item = await res.json();
  return { props: { item } };
}

export default function Item({ item }) {
  return <h1>{item.name}</h1>;
}
```

**Behavior:**
- ✅ Visit `/items/1` → Works (pre-generated)
- ✅ Visit `/items/2` → Works (pre-generated)
- ❌ Visit `/items/999` → 404 (not pre-generated)

### 2. `fallback: true`

Generate missing pages on first request. User sees loading state.

**Use when:** You have many pages and can't pre-generate all

```javascript
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/blog');
  const posts = await res.json();
  
  // Only generate first 10 posts
  const paths = posts.slice(0, 10).map(post => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths,
    fallback: true // Generate others on demand
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/blog/${params.slug}`);
  const post = await res.json();
  
  if (!post) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    revalidate: 3600
  };
}

export default function BlogPost({ post }) {
  const router = useRouter();
  
  // Show loading while page is generating
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

**Behavior:**
- ✅ Visit `/blog/first-post` → Works immediately (pre-generated)
- ⏳ Visit `/blog/new-post` → Shows "Loading..." then page loads
- ✅ Subsequent visits to `/blog/new-post` → Works immediately (cached)

### 3. `fallback: 'blocking'`

Generate missing pages on first request. User waits (no loading state).

**Use when:** You want the best user experience (newest version of Next.js)

```javascript
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  
  const paths = products.slice(0, 50).map(product => ({
    params: { id: product.id.toString() }
  }));
  
  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await res.json();
  
  return {
    props: { product },
    revalidate: 86400
  };
}

export default function Product({ product }) {
  // No need for loading state!
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </div>
  );
}
```

**Behavior:**
- ✅ Visit `/products/1` → Works immediately (pre-generated)
- ⏳ Visit `/products/999` → Waits for generation, then shows page
- ✅ Subsequent visits → Works immediately (cached)

### Comparison Table:

| Strategy | Pre-gen Pages | New Page Behavior | User Experience | Best For |
|----------|---------------|-------------------|------------------|----------|
| `false` | Few | 404 | Fast | Small sites |
| `true` | Some | Loading state | Medium | Medium sites |
| `blocking` | Some | Wait for page | Best | Large sites |

---

## 23. How does Next.js handle environment variables?

**Answer:**

Environment variables store sensitive data and configuration that changes between environments (development, staging, production).

### File Types:

```
.env.local           (Local only, not committed)
.env.development     (Development environment)
.env.production      (Production environment)
.env                 (Shared defaults)
```

### Create Files:

**.env.local:**
```
DATABASE_URL=postgresql://user:pass@localhost/db
API_SECRET=super-secret-key
```

**.env.development:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DEBUG=true
```

**.env.production:**
```
NEXT_PUBLIC_API_URL=https://api.example.com
DEBUG=false
```

### Using in Server-Side Code:

**pages/api/users.js:**
```javascript
export default async function handler(req, res) {
  // Access in API routes (server-side)
  const dbUrl = process.env.DATABASE_URL;
  const apiSecret = process.env.API_SECRET;
  
  // This is secure - only on server
  console.log('Database URL:', dbUrl);
  
  const users = await fetchFromDatabase(dbUrl);
  res.json(users);
}
```

### Using in Client-Side Code:

For variables accessible in browser, prefix with `NEXT_PUBLIC_`:

**.env.production:**
```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
API_SECRET=secret (NOT exposed!)
```

**pages/index.js:**
```javascript
export default function Home() {
  return (
    <div>
      {/* This works - NEXT_PUBLIC_ prefix */}
      <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      
      {/* This doesn't work in browser - no NEXT_PUBLIC_ */}
      {/* process.env.API_SECRET is undefined */}
    </div>
  );
}
```

### Real Example - API Integration:

**pages/api/posts.js:**
```javascript
export default async function handler(req, res) {
  // Server-only access to secret
  const apiKey = process.env.EXTERNAL_API_KEY;
  
  const response = await fetch(
    `https://external-api.com/posts?key=${apiKey}`
  );
  const posts = await response.json();
  
  res.json(posts);
}
```

**pages/index.js:**
```javascript
export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const fetchPosts = async () => {
    // Call YOUR API (which has the secret)
    const res = await fetch(`${apiUrl}/posts`);
    const posts = await res.json();
    console.log(posts);
  };
  
  return <button onClick={fetchPosts}>Load Posts</button>;
}
```

### Environment-Specific Example:

**.env.development:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000
DEBUG=true
```

**.env.production:**
```
NEXT_PUBLIC_API_URL=https://api.production.com
DEBUG=false
```

**pages/index.js:**
```javascript
export default function Home() {
  return (
    <div>
      <h1>API URL: {process.env.NEXT_PUBLIC_API_URL}</h1>
      {process.env.NEXT_PUBLIC_DEBUG === 'true' && (
        <p>Debug mode is ON</p>
      )}
    </div>
  );
}
```

### Best Practices:

✅ Store sensitive data in `.env.local` (not committed)  
✅ Use `NEXT_PUBLIC_` only for non-sensitive data  
✅ Never commit `.env.local` to git  
✅ Add to `.gitignore`:

```
.env.local
.env.*.local
```

---

## 24. What is middleware in Next.js?

**Answer:**

Middleware intercepts requests before they reach your application. Use it for authentication, logging, redirects, and request modification.

### What is Middleware?

Middleware runs on every request:

```
User Request
    ↓
[MIDDLEWARE] ← Runs here first
    ↓
Route Handler / Page
    ↓
Response
```

### Common Uses:

✅ Authentication checks  
✅ Request logging  
✅ Redirects  
✅ Header modification  
✅ Rate limiting  

### Simple Example:

**middleware.js (in project root):**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware: User visited', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
};
```

This logs every request to `/admin/*` and `/api/*`

### Authentication Example:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token');
  
  // If visiting protected route without token
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

**Flow:**
- ✅ User with valid token → Access `/admin`
- ❌ User without token → Redirect to `/login`

---

## 25. How do you create middleware in Next.js 12+?

**Answer:**

Create `middleware.js` (or `middleware.ts`) in your project root directory.

### Step 1: Create File

**middleware.js** (in project root, not in pages or app):
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Middleware logic here
  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*'] // Which routes to run middleware on
};
```

### Step 2: Define Routes

The `matcher` tells Next.js which routes to run middleware on:

```javascript
export const config = {
  matcher: [
    '/admin/:path*',      // All /admin/* routes
    '/api/:path*',        // All /api/* routes
    '/dashboard'          // Exact route
  ]
};
```

### Complete Example - Login Protection:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  
  // Try to verify token
  try {
    if (token) {
      await jwtVerify(token, secret);
      return NextResponse.next();
    }
  } catch (err) {
    // Token invalid or expired
  }
  
  // No valid token - redirect to login
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

**How it works:**
1. User visits `/dashboard`
2. Middleware checks if valid token exists in cookies
3. If valid → Allow access
4. If invalid → Redirect to `/login`

### Request Modification Example:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Create response
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-custom-header', 'my-value');
  response.headers.set('x-pathname', request.nextUrl.pathname);
  
  return response;
}

export const config = {
  matcher: ['/api/:path*']
};
```

Then in your API route:

**pages/api/data.js:**
```javascript
export default function handler(req, res) {
  const pathname = req.headers['x-pathname'];
  console.log('Accessed from:', pathname);
  res.json({ success: true });
}
```

### Redirect Example:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // If visiting old URL, redirect to new one
  if (request.nextUrl.pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*']
};
```

---

## 26. What is dynamic importing in Next.js?

**Answer:**

Dynamic importing loads components **only when needed**, not at initial page load. This reduces bundle size and improves performance.

### Why Use Dynamic Imports?

Regular import (loads immediately):
```javascript
import HeavyComponent from '@/components/Heavy';

// This component code is included in the page bundle
export default function Home() {
  return <HeavyComponent />;
}
```

Dynamic import (loads on demand):
```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'));

// Component code is in separate bundle, loaded only when needed
export default function Home() {
  return <HeavyComponent />;
}
```

### Real Example - Large Library:

**pages/analytics.js:**
```javascript
import dynamic from 'next/dynamic';

// Load heavy chart library only on this page
const ChartComponent = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // Don't render on server (client-only)
});

export default function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <ChartComponent />
    </div>
  );
}
```

### Conditional Loading:

**pages/posts.js:**
```javascript
import dynamic from 'next/dynamic';
import { useState } from 'react';

const CommentForm = dynamic(() => import('@/components/CommentForm'));

export default function Post() {
  const [showComments, setShowComments] = useState(false);
  
  return (
    <article>
      <h1>Post Title</h1>
      <p>Post content...</p>
      
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      
      {/* CommentForm only loads when showComments is true */}
      {showComments && <CommentForm />}
    </article>
  );
}
```

### With Loading State:

**pages/dashboard.js:**
```javascript
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  loading: () => <div>Loading dashboard...</div>,
  ssr: false
});

export default function DashboardPage() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <Dashboard />
    </div>
  );
}
```

---

## 27. How do you handle error pages in Next.js?

**Answer:**

Create `404.js` and `500.js` files to show custom error pages.

### Create 404 Page:

**pages/404.js:**
```javascript
export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  );
}
```

Shows when:
- ✅ User visits non-existent route
- ✅ Page returns `notFound: true` in `getStaticProps`

### Create 500 Error Page:

**pages/500.js:**
```javascript
export default function ServerError() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
      <a href="/">Go back home</a>
    </div>
  );
}
```

Shows when server encounters error.

### Return 404 from Data Fetching:

**pages/posts/[slug].js:**
```javascript
export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();
  
  // Post doesn't exist - show 404
  if (!post || !post.id) {
    return { notFound: true };
  }
  
  return {
    props: { post },
    revalidate: 3600
  };
}

export default function Post({ post }) {
  return <h1>{post.title}</h1>;
}
```

---

## 28. What is data fetching at build time vs request time?

**Answer:**

| Aspect | Build Time | Request Time |
|--------|-----------|--------------|
| **When** | npm run build | Every visitor request |
| **Function** | getStaticProps | getServerSideProps |
| **Speed** | ⚡ Fast | Slower |
| **Data** | Static | Fresh/Dynamic |
| **Use Case** | Blog posts, docs | User profiles, real-time |

### Build Time Example:

**pages/blog/[slug].js:**
```javascript
export async function getStaticProps({ params }) {
  // Runs at build time
  const res = await fetch(`https://api.example.com/posts/${params.slug}`);
  const post = await res.json();
  
  return {
    props: { post },
    revalidate: 3600 // Update every hour
  };
}

export default function BlogPost({ post }) {
  return <h1>{post.title}</h1>;
}
```

### Request Time Example:

**pages/user/[id].js:**
```javascript
export async function getServerSideProps({ params, req }) {
  // Runs on every request
  const userId = params.id;
  const userToken = req.cookies.authToken;
  
  const res = await fetch(
    `https://api.example.com/users/${userId}`,
    { headers: { Authorization: `Bearer ${userToken}` } }
  );
  const user = await res.json();
  
  return { props: { user } };
}

export default function UserPage({ user }) {
  return <h1>{user.name}</h1>;
}
```

---

## 29. Explain revalidation in ISR.

**Answer:**

Revalidation regenerates static pages in the background. Set the `revalidate` time in seconds.

### Example:

```javascript
export async function getStaticProps() {
  const data = await fetchData();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
```

### Timeline:

```
Time 0:00   Build starts → Page generated
Time 0:00   Page served from cache

Time 0:59   User visits → Gets cached page
Time 1:01   User visits → Background regeneration starts
Time 1:02   User visits → Still gets old cached page
Time 1:03   Regeneration complete → New page cached
Time 1:04   User visits → Gets fresh page
```

### Values:

- `revalidate: 60` - Regenerate every 60 seconds
- `revalidate: 3600` - Regenerate every hour
- `revalidate: 86400` - Regenerate every day
- `revalidate: false` - Never revalidate (SSG)

---

## 30. What are incremental builds in Next.js?

**Answer:**

Incremental builds only rebuild **changed files** instead of the entire project. Saves time during deployment.

### Without Incremental Build:

```
npm run build
├─ Rebuild ALL 1000 pages (10 minutes)
└─ Deploy all files
```

### With Incremental Build:

```
npm run build
├─ Detect changed pages (2 pages changed)
├─ Rebuild only those 2 pages (30 seconds)
└─ Deploy only changed files
```

### Enabled by Default

Next.js enables incremental builds automatically for:
- ISR pages (revalidate set)
- On-demand revalidation
- Partial prerendering

---

## 31. How do you optimize performance in Next.js?

**Answer:**

### Key Optimization Techniques:

**1. Image Optimization:**
```javascript
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/image.jpg"
      alt="description"
      width={500}
      height={300}
      quality={75}
      priority={true}
    />
  );
}
```

**2. Code Splitting (Automatic):**
```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'));

export default function Home() {
  return <HeavyComponent />;
}
```

**3. Optimize Fonts:**
```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <h1 className={inter.className}>Hello</h1>;
}
```

**4. Use ISR:**
```javascript
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600
  };
}
```

**5. Script Optimization:**
```javascript
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        src="https://analytics.js"
        strategy="afterInteractive"
      />
    </>
  );
}
```

---

## 32. What is code splitting in Next.js?

**Answer:**

Code splitting automatically divides JavaScript into smaller chunks. Each page only loads the code it needs.

### Without Code Splitting:

```
Bundle size: 500KB (all code for all pages)
User visits /home → Downloads 500KB
User visits /about → Doesn't need to download again
```

### With Code Splitting:

```
/home chunk: 50KB → Downloads 50KB
/about chunk: 60KB → Downloads 60KB
/products chunk: 70KB → Downloads 70KB

Total downloaded by one user: 180KB (not 500KB!)
```

Next.js does this automatically!

---

## 33. How do you prefetch links?

**Answer:**

Prefetching preloads pages before user clicks them.

### Automatic Prefetching:

```javascript
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Links visible in viewport are prefetched automatically */}
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </>
  );
}
```

### Disable Prefetching:

```javascript
import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/slow-page" prefetch={false}>
      Slow Page (no prefetch)
    </Link>
  );
}
```

---

## 34-35. What is `next/script` and how do you use it?

**Answer:**

`next/script` optimizes third-party scripts with different loading strategies.

### Three Strategies:

**1. `beforeInteractive` - Load before page interactive:**
```javascript
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        src="https://analytics.js"
        strategy="beforeInteractive"
      />
      <h1>Hello</h1>
    </>
  );
}
```

Use for: Critical scripts needed before page works

**2. `afterInteractive` - Load after page interactive:**
```javascript
<Script
  src="https://analytics.js"
  strategy="afterInteractive"
/>
```

Use for: Analytics, tracking

**3. `lazyOnload` - Load when idle:**
```javascript
<Script
  src="https://chat-widget.js"
  strategy="lazyOnload"
/>
```

Use for: Chat widgets, non-critical

---

## 36-37. What are Web Vitals and how do you measure them?

**Answer:**

Web Vitals are metrics that measure website performance:

- **LCP** (Largest Contentful Paint) - When main content loads (< 2.5s good)
- **FID** (First Input Delay) - Response to user input (< 100ms good)
- **CLS** (Cumulative Layout Shift) - Visual stability (< 0.1 good)

### Measure Web Vitals:

**pages/_app.js:**
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics service
  fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) });
}
```

---

## 38. What is the `public` directory?

**Answer:**

The `public` directory stores **static files** accessible from root URL.

```
public/
├── favicon.ico      → /favicon.ico
├── logo.png         → /logo.png
├── robots.txt       → /robots.txt
└── images/
    └── hero.jpg     → /images/hero.jpg
```

**Usage:**
```javascript
import Image from 'next/image';

export default function Home() {
  return <Image src="/logo.png" alt="logo" width={100} height={100} />;
}
```

---

## 39-40. How do you handle authentication and NextAuth.js?

**Answer:**

Authentication verifies user identity.

### Simple Authentication:

**pages/api/login.js:**
```javascript
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // Verify credentials
    if (email === 'user@example.com' && password === 'pass123') {
      // Set cookie
      res.setHeader(
        'Set-Cookie',
        serialize('token', 'valid-token', {
          httpOnly: true,
          maxAge: 86400
        })
      );
      return res.json({ success: true });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}
```

### NextAuth.js:

**pages/api/auth/[...nextauth].js:**
```javascript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await verifyUser(credentials.email, credentials.password);
        return user || null;
      }
    })
  ]
});
```

---

## 41. What is CORS in Next.js?

**Answer:**

CORS (Cross-Origin Resource Sharing) allows requests from different domains.

### Enable CORS:

**pages/api/data.js:**
```javascript
export default function handler(req, res) {
  // Allow requests from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  
  res.status(200).json({ data: 'value' });
}
```

### Allow Specific Domain:

```javascript
res.setHeader('Access-Control-Allow-Origin', 'https://example.com');
```

---

## 42. How do you handle file uploads in Next.js?

**Answer:**

**pages/api/upload.js:**
```javascript
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(400).json({ error: err.message });
      
      const file = files.file[0];
      const newPath = `./public/uploads/${file.originalFilename}`;
      
      fs.copyFileSync(file.filepath, newPath);
      
      res.json({ success: true, filename: file.originalFilename });
    });
  }
}
```

---

## 43-45. SSR with Data vs SSG with Data vs Differences

**Answer:**

Already covered in Basic Level (Questions 6-7, 9).

**Key Difference:**
- **SSR**: Generated fresh on each request
- **SSG**: Generated once at build time
- **ISR**: Generated once, updated periodically

---

## 46. How do you handle redirects in Next.js?

**Answer:**

**In Data Fetching:**
```javascript
export async function getStaticProps() {
  return {
    redirect: {
      destination: '/other-page',
      permanent: true // 301 redirect
    }
  };
}
```

**In Middleware:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/old-page') {
    return NextResponse.redirect(new URL('/new-page', request.url));
  }
}
```

**In next.config.js:**
```javascript
module.exports = {
  redirects: async () => [
    {
      source: '/old/:path*',
      destination: '/new/:path*',
      permanent: true
    }
  ]
};
```

---

## 47. What is the `basePath` configuration?

**Answer:**

Deploy app under a sub-path:

**next.config.js:**
```javascript
module.exports = {
  basePath: '/app'
};
```

Now:
- `/` becomes `/app`
- `/about` becomes `/app/about`
- `/api/users` becomes `/app/api/users`

---

## 48-49. Internationalization (i18n) and i18n Routing

**Answer:**

**next.config.js:**
```javascript
module.exports = {
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en'
  }
};
```

**Access in pages:**
```javascript
import { useRouter } from 'next/router';

export default function Home() {
  const { locale } = useRouter();
  
  return <h1>Language: {locale}</h1>; // en, es, or fr
}
```

---

## 50. How do you use `next/router`?

**Answer:**

**pages/products.js:**
```javascript
import { useRouter } from 'next/router';

export default function Products() {
  const router = useRouter();
  const { category } = router.query;
  
  const handleFilter = (cat) => {
    router.push(`/products?category=${cat}`);
  };
  
  return (
    <>
      <h1>Products - {category}</h1>
      <button onClick={() => handleFilter('electronics')}>
        Electronics
      </button>
    </>
  );
}
```

---

## Summary

These 30 intermediate questions cover:
- ✅ Advanced data fetching patterns (ISR)
- ✅ Environment variables and configuration
- ✅ Middleware and request handling
- ✅ Performance optimization
- ✅ Authentication and CORS
- ✅ File uploads
- ✅ i18n support
- ✅ Redirects and routing

**Next Step:** Study Advanced Level questions (51-100) for production-ready knowledge!
