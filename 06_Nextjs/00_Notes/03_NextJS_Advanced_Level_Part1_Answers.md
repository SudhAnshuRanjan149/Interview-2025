# Next.js Interview Questions - Advanced Level Part 1 (Questions 51-75)

## 51. What is the App Router in Next.js 13+?

**Answer:**

The **App Router** is the new way to build Next.js applications (introduced in Next.js 13). It replaces the old `pages` directory with a new `app` directory and uses **Server Components by default**.

### Old Way (Pages Router - Still Works):

```
pages/
├── index.js           → /
├── about.js           → /about
└── posts/
    └── [id].js        → /posts/1
```

### New Way (App Router - Recommended):

```
app/
├── page.js            → /
├── about/
│   └── page.js        → /about
└── posts/
    ├── page.js        → /posts
    └── [id]/
        └── page.js    → /posts/1
```

### Key Differences:

| Feature | Pages Router | App Router |
|---------|-------------|-----------|
| **Directory** | `/pages` | `/app` |
| **File** | `index.js` | `page.js` |
| **Default** | Client Component | Server Component |
| **Data Fetching** | getStaticProps, getServerSideProps | fetch() in components |
| **API Routes** | `/pages/api` | `/app/api` |
| **Layouts** | Per-page | Built-in layout.js |

### Why App Router is Better:

✅ Server Components by default (smaller bundles)  
✅ Better data fetching  
✅ Built-in layouts  
✅ Parallel routes  
✅ Streaming support  

### Simple Example:

**app/page.js:**
```javascript
export default function Home() {
  return <h1>Home Page</h1>;
}
```

**app/about/page.js:**
```javascript
export default function About() {
  return <h1>About Page</h1>;
}
```

**app/layout.js** (wraps all pages):
```javascript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

---

## 52. Explain Server Components vs Client Components.

**Answer:**

Think of them as two different places where your code can run:

- **Server Components** - Run on the server only (like backend code)
- **Client Components** - Run in the browser (traditional React)

### Server Components:

```javascript
// app/page.js (Server Component by default)
export default async function HomePage() {
  // This runs on the SERVER
  const data = await fetch('https://api.example.com/data');
  const result = await data.json();
  
  // You can use secrets here
  const apiKey = process.env.SECRET_API_KEY; // Safe!
  
  return <h1>{result.title}</h1>;
}
```

**Benefits:**
✅ Secret API keys stay secret  
✅ Direct database access  
✅ No JavaScript sent to browser  
✅ Faster initial load  

**Limitations:**
❌ No hooks (useState, useEffect)  
❌ No browser APIs (localStorage, window)  
❌ No event listeners  

### Client Components:

```javascript
// app/counter.js
'use client'; // This marks it as Client Component

import { useState } from 'react';

export default function Counter() {
  // This runs in the BROWSER
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Benefits:**
✅ Use hooks (useState, useEffect)  
✅ Use browser APIs  
✅ Event listeners work  
✅ Interactive UI  

**Limitations:**
❌ JavaScript sent to browser  
❌ Can't use secrets  
❌ Can't access database directly  

### When to Use Each:

**Use Server Components for:**
- Fetching data from database
- Using secret API keys
- Keeping sensitive logic server-side
- Large data processing

**Use Client Components for:**
- Interactive elements
- Forms and buttons
- Using hooks (useState, useEffect)
- Browser APIs

### Real Example:

**app/page.js** (Server Component):
```javascript
import ProductsList from './ProductsList';

export default async function Home() {
  // Fetch on server - API key is secret
  const products = await fetch(
    'https://api.example.com/products',
    { headers: { Authorization: `Bearer ${process.env.API_KEY}` } }
  ).then(res => res.json());
  
  return (
    <div>
      <h1>Products</h1>
      <ProductsList products={products} />
    </div>
  );
}
```

**app/ProductsList.js** (Client Component):
```javascript
'use client';

import { useState } from 'react';

export default function ProductsList({ products }) {
  const [favorites, setFavorites] = useState([]);
  
  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => toggleFavorite(product.id)}>
            {favorites.includes(product.id) ? '❤️' : '🤍'} Favorite
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 53. How do you create a Server Component?

**Answer:**

Server Components are the **default** in the App Router. Just create a component without `'use client'`:

### Method 1: Simple Server Component

**app/page.js:**
```javascript
// No 'use client' = Server Component

export default async function Home() {
  // Can use async/await
  const data = await fetch('https://api.example.com/posts');
  const posts = await data.json();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Method 2: Server Component with Database

**app/dashboard/page.js:**
```javascript
import db from '@/lib/database';

export default async function Dashboard() {
  // Direct database access (server-only)
  const userData = await db.query('SELECT * FROM users WHERE id = 1');
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>User: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}
```

### Method 3: Fetch with Headers

**app/api-test/page.js:**
```javascript
export default async function APITest() {
  const response = await fetch('https://api.example.com/data', {
    headers: {
      'Authorization': `Bearer ${process.env.SECRET_TOKEN}`, // Secret!
      'Content-Type': 'application/json'
    }
  });
  
  const data = await response.json();
  
  return <div>{JSON.stringify(data)}</div>;
}
```

### Key Points:

✅ No `'use client'` directive  
✅ Can use `async/await`  
✅ Can access environment variables  
✅ Database queries work  
✅ Secrets are safe  

---

## 54. How do you create a Client Component?

**Answer:**

Add `'use client'` at the top of the file to make it a Client Component:

### Method 1: Simple Client Component

**app/counter/page.js:**
```javascript
'use client'; // Mark as Client Component

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

### Method 2: Form Handling

**app/contact/page.js:**
```javascript
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      setSubmitted(true);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required />
      <textarea name="message" required></textarea>
      <button type="submit">Send</button>
      {submitted && <p>Thanks for contacting us!</p>}
    </form>
  );
}
```

### Method 3: With useEffect

**app/products/page.js:**
```javascript
'use client';

import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch when component mounts
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []); // Empty dependency array = run once on mount
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

### Key Points:

✅ Must add `'use client'` at the very top  
✅ Can use all React hooks  
✅ Browser APIs available  
✅ Event listeners work  
❌ Can't do async/await directly in component (use useEffect)  

---

## 55. What is the `use` hook?

**Answer:**

The `use` hook lets **Client Components use data from Server Components**. It unwraps promises!

### Problem It Solves:

Client Components can't fetch data directly on the server. The `use` hook solves this.

### Example - Without `use`:

```javascript
// This doesn't work in Client Components
'use client';

export default function Page() {
  // Can't use async/await here!
  const data = await fetch('/api/data'); // ❌ Error!
}
```

### Example - With `use`:

**app/page.js** (Server Component):
```javascript
import { Suspense } from 'react';
import ClientComponent from './ClientComponent';

async function fetchData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default function Home() {
  const dataPromise = fetchData();
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ClientComponent dataPromise={dataPromise} />
    </Suspense>
  );
}
```

**app/ClientComponent.js** (Client Component):
```javascript
'use client';

import { use } from 'react';

export default function ClientComponent({ dataPromise }) {
  // Use the promise in client component
  const data = use(dataPromise);
  
  return <h1>{data.title}</h1>;
}
```

### Real Example - User Profile:

**app/user/[id]/page.js** (Server):
```javascript
import UserProfile from './UserProfile';

async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return res.json();
}

export default function UserPage({ params }) {
  const userPromise = fetchUser(params.id);
  
  return <UserProfile userPromise={userPromise} />;
}
```

**app/user/[id]/UserProfile.js** (Client):
```javascript
'use client';

import { use } from 'react';
import { useState } from 'react';

export default function UserProfile({ userPromise }) {
  const user = use(userPromise);
  const [isFollowing, setIsFollowing] = useState(false);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <button onClick={() => setIsFollowing(!isFollowing)}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
```

---

## 56. Explain Streaming in Next.js 13+.

**Answer:**

Streaming sends HTML to the browser **in chunks** instead of waiting for everything. Pages feel faster!

### Without Streaming:

```
Server Processing:
1. Fetch data from database (2 seconds)
2. Render components (1 second)
3. Send complete HTML (3 seconds total)

User sees: Loading... Loading... Loading... [BOOM - page loads]
```

### With Streaming:

```
Server Processing:
1. Send header/navigation immediately (0.1 second)
2. Fetch data from database (2 seconds)
3. Send content as it's ready (0.5 seconds)

User sees: Header appears → Navigation → Content streams in
```

### Implementation:

**app/page.js:**
```javascript
import { Suspense } from 'react';
import SlowComponent from './SlowComponent';

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      
      {/* Show Loading while SlowComponent loads */}
      <Suspense fallback={<p>Loading posts...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

**app/SlowComponent.js:**
```javascript
export default async function SlowComponent() {
  // Simulate slow database query
  const data = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });
  const posts = await data.json();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Timeline:

```
Time 0ms:    Browser receives: <h1>Welcome</h1>
             Shows: "Welcome"

Time 100ms:  Browser renders navigation
             Shows: "Welcome" + navigation

Time 2500ms: SlowComponent finishes loading
             Browser receives: <div>posts...</div>
             Shows: Complete page!

User Experience: Page appears quickly, content streams in
```

---

## 57-58. What are Layout Groups and how do you use them?

**Answer:**

Layout Groups let you organize routes **without changing the URL structure**. Use parentheses around folder names.

### Problem:

You want separate layouts for different sections but don't want the folder name in the URL.

### Solution - Layout Groups:

```
app/
├── (marketing)/
│   ├── layout.js        (Marketing layout)
│   ├── page.js          → /
│   └── about/
│       └── page.js      → /about
│
├── (dashboard)/
│   ├── layout.js        (Dashboard layout)
│   ├── page.js          → /dashboard
│   └── settings/
│       └── page.js      → /dashboard/settings
│
└── (auth)/
    ├── layout.js        (Auth layout)
    ├── login/
    │   └── page.js      → /login
    └── signup/
        └── page.js      → /signup
```

### Marketing Layout:

**app/(marketing)/layout.js:**
```javascript
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarketingLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

**app/(marketing)/page.js:**
```javascript
export default function Home() {
  return <h1>Welcome to Our Site</h1>;
}
```

**app/(marketing)/about/page.js:**
```javascript
export default function About() {
  return <h1>About Us</h1>;
}
```

### Dashboard Layout:

**app/(dashboard)/layout.js:**
```javascript
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
```

**app/(dashboard)/page.js:**
```javascript
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

### Routes Generated:

```
(marketing) group:
/ → Home page
/about → About page

(dashboard) group:
/dashboard → Dashboard page
/dashboard/settings → Settings page

(auth) group:
/login → Login page
/signup → Signup page
```

Notice: Parentheses don't appear in URLs!

---

## 59. What is Route Segment Configuration?

**Answer:**

Route Segment Configuration controls how pages are built and cached using special exports.

### Common Configurations:

**app/page.js:**
```javascript
// Dynamic vs Static
export const dynamic = 'force-dynamic'; // Always generate on request
// or 'force-static' or 'error' or 'auto' (default)

// Revalidation
export const revalidate = 3600; // Regenerate every hour
// or false (static), or 0 (always fresh)

// Cache control
export const fetchCache = 'force-no-store'; // Never cache API calls
// or 'auto' (default), or 'force-cache', or 'only-no-store'

// Segment runtime
export const runtime = 'nodejs'; // or 'edge'

export default function Home() {
  return <h1>Home</h1>;
}
```

### Example - Always Fresh Data:

**app/live-scores/page.js:**
```javascript
// Always fetch fresh data (like live sports scores)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LiveScores() {
  const scores = await fetch('https://api.example.com/scores');
  const data = await scores.json();
  
  return (
    <div>
      <h1>Live Scores</h1>
      {data.map(game => (
        <div key={game.id}>
          <p>{game.team1} vs {game.team2}</p>
          <p>{game.score}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example - Static Content:

**app/blog/[slug]/page.js:**
```javascript
// Static, but regenerate daily
export const revalidate = 86400; // 24 hours
export const dynamic = 'force-static';

export default async function BlogPost({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`);
  const data = await post.json();
  
  return <article>{data.content}</article>;
}
```

---

## 60. Explain Parallel Routes in Next.js 13+.

**Answer:**

Parallel Routes render **multiple layouts simultaneously** in the same section using `@slot` syntax.

### Use Cases:

- Dashboards with multiple sections
- Modal dialogs
- Sidebars
- Tab navigation

### Example - Dashboard with Sidebar and Content:

```
app/
├── dashboard/
│   ├── layout.js
│   ├── page.js
│   ├── @sidebar/
│   │   ├── layout.js
│   │   └── page.js
│   └── @content/
│       ├── layout.js
│       └── page.js
```

**app/dashboard/layout.js:**
```javascript
export default function DashboardLayout({ children, sidebar, content }) {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar renders independently */}
      <div style={{ width: '250px' }}>{sidebar}</div>
      
      {/* Content renders independently */}
      <div style={{ flex: 1 }}>{content}</div>
      
      {/* Normal children */}
      {children}
    </div>
  );
}
```

**app/dashboard/@sidebar/page.js:**
```javascript
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/analytics">Analytics</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </nav>
  );
}
```

**app/dashboard/@content/page.js:**
```javascript
export default function Content() {
  return (
    <div>
      <h1>Dashboard Content</h1>
      <p>Main content goes here</p>
    </div>
  );
}
```

### Example - Modal Dialog:

```
app/
└── photos/
    ├── layout.js
    ├── page.js
    ├── [id]/
    │   └── page.js
    └── @modal/
        ├── layout.js
        └── (.)[id]/
            └── page.js
```

**app/photos/layout.js:**
```javascript
export default function PhotosLayout({ children, modal }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
```

**app/photos/@modal/(.)[id]/page.js:**
```javascript
export default function PhotoModal({ params }) {
  return (
    <dialog open>
      <h1>Photo {params.id}</h1>
      <img src={`/photos/${params.id}.jpg`} alt="Photo" />
    </dialog>
  );
}
```

---

## 61-62. What are Intercepting Routes and how do you create them?

**Answer:**

Intercepting Routes **capture routes without changing URL**. Useful for modals that appear while keeping the page content visible.

### Convention Prefixes:

- `(.)` - Same level
- `(..)` - One level up
- `(..)(..)` - Two levels up
- `(...)` - Root level

### Example - Modal Intercept:

```
app/
└── photos/
    ├── page.js               (List all photos)
    ├── [id]/
    │   └── page.js           (Full page view)
    └── (.)@modal/
        └── [id]/
            └── page.js       (Modal view - intercepts)
```

**app/photos/page.js:**
```javascript
import Link from 'next/link';

export default function PhotosList() {
  const photos = [
    { id: 1, title: 'Beach' },
    { id: 2, title: 'Mountain' },
    { id: 3, title: 'Forest' }
  ];
  
  return (
    <div>
      <h1>Photo Gallery</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {photos.map(photo => (
          <Link key={photo.id} href={`/photos/${photo.id}`}>
            <img src={`/photos/${photo.id}.jpg`} alt={photo.title} />
            <p>{photo.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**app/photos/[id]/page.js:**
```javascript
// Full page view
export default function PhotoPage({ params }) {
  return (
    <div>
      <h1>Photo {params.id} - Full Page</h1>
      <img src={`/photos/${params.id}.jpg`} alt="Photo" width={800} />
    </div>
  );
}
```

**app/photos/(.)@modal/[id]/page.js:**
```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function PhotoModal({ params }) {
  const router = useRouter();
  
  return (
    <dialog open style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000
    }}>
      <button onClick={() => router.back()}>Close</button>
      <h1>Photo {params.id}</h1>
      <img src={`/photos/${params.id}.jpg`} alt="Photo" width={500} />
    </dialog>
  );
}
```

**How it works:**

1. User clicks photo on `/photos` page
2. URL changes to `/photos/1`
3. Intercepting route captures this
4. Modal shows while photo list stays visible
5. Modal's URL is `/photos/1` but content is from `(.)@modal`

---

## 63. What is Partial Prerendering (PPR)?

**Answer:**

Partial Prerendering combines **static and dynamic content**. Serves static shell instantly, streams dynamic content.

### Before PPR:

```
User visits page → Wait for all data → Send complete page
⏳ Slow - waits for slowest data
```

### With PPR:

```
User visits page → Send static shell immediately → Stream dynamic content
⚡ Fast - static parts appear instantly!
```

### Enable PPR:

**app/page.js:**
```javascript
export const experimental_ppr = true; // Enable PPR

export default function Page() {
  return (
    <div>
      {/* Static - shown immediately */}
      <Header />
      <Navigation />
      
      {/* Dynamic - shown when ready */}
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsSection />
      </Suspense>
    </div>
  );
}
```

### Real Example - E-commerce:

**app/products/[id]/page.js:**
```javascript
import { Suspense } from 'react';

export const experimental_ppr = true;

async function ProductDetails({ id }) {
  // Slow database query
  const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

async function Reviews({ id }) {
  // Another slow query
  const reviews = await db.query('SELECT * FROM reviews WHERE product_id = ?', [id]);
  
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <div>
      {/* Static content - shown immediately */}
      <h1>Product Page</h1>
      
      {/* Dynamic content - shown when ready */}
      <Suspense fallback={<p>Loading product...</p>}>
        <ProductDetails id={params.id} />
      </Suspense>
      
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Reviews id={params.id} />
      </Suspense>
    </div>
  );
}
```

### Timeline:

```
Time 0ms:    Send: <h1>Product Page</h1>
             User sees: "Product Page"

Time 100ms:  Send: Loading product...
             User sees: Loading indicator

Time 500ms:  ProductDetails loaded, send data
             User sees: Product name, price

Time 1000ms: ReviewsSection loaded
             User sees: Complete page!
```

---

## 64. Explain `generateStaticParams` in App Router.

**Answer:**

`generateStaticParams` is the new way (replaces `getStaticPaths`) to tell Next.js which dynamic routes to pre-generate.

### Pages Router (Old Way):

```javascript
export async function getStaticPaths() {
  const posts = await fetchPosts();
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: 'blocking'
  };
}
```

### App Router (New Way):

**app/blog/[slug]/page.js:**
```javascript
export async function generateStaticParams() {
  const posts = await fetchPosts();
  
  return posts.map(post => ({
    slug: post.slug // Note: just the value, not in params
  }));
}

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug);
  return <h1>{post.title}</h1>;
}
```

### Real Example - Product Pages:

**app/products/[id]/page.js:**
```javascript
export async function generateStaticParams() {
  // Fetch all product IDs
  const products = await fetch('https://api.example.com/products');
  const data = await products.json();
  
  // Return array of params
  return data.map(product => ({
    id: product.id.toString()
  }));
}

export async function generateMetadata({ params }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  const data = await product.json();
  
  return {
    title: data.name,
    description: data.description
  };
}

export default async function Product({ params }) {
  const response = await fetch(`https://api.example.com/products/${params.id}`);
  const product = await response.json();
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
}
```

### Multiple Dynamic Segments:

**app/[category]/[product]/page.js:**
```javascript
export async function generateStaticParams() {
  const categories = ['electronics', 'clothing', 'food'];
  
  const params = [];
  for (const category of categories) {
    const products = await fetch(`https://api.example.com/${category}`);
    const data = await products.json();
    
    data.forEach(product => {
      params.push({
        category,
        product: product.id.toString()
      });
    });
  }
  
  return params;
}

export default function ProductPage({ params }) {
  return (
    <h1>
      {params.category} - Product {params.product}
    </h1>
  );
}
```

---

## 65-66. How do you handle metadata in App Router?

**Answer:**

Metadata (title, description, OG tags) for SEO and social sharing.

### Static Metadata:

**app/page.js:**
```javascript
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to our site',
  keywords: ['next', 'react', 'javascript'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'My Awesome Site',
    description: 'The best site ever',
    url: 'https://example.com',
    siteName: 'My Site',
    images: [
      { url: 'https://example.com/og-image.jpg' }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Site',
    description: 'Check this out',
    images: ['https://example.com/twitter-image.jpg']
  }
};

export default function Home() {
  return <h1>Home</h1>;
}
```

### Dynamic Metadata with `generateMetadata`:

**app/posts/[slug]/page.js:**
```javascript
export async function generateMetadata({ params }) {
  // Fetch post data
  const post = await fetch(`https://api.example.com/posts/${params.slug}`);
  const data = await post.json();
  
  return {
    title: data.title,
    description: data.excerpt,
    authors: [{ name: data.author }],
    openGraph: {
      title: data.title,
      description: data.excerpt,
      images: [data.image],
      type: 'article',
      publishedTime: data.publishedAt
    }
  };
}

export default async function Post({ params }) {
  const post = await fetch(`https://api.example.com/posts/${params.slug}`);
  const data = await post.json();
  
  return (
    <article>
      <h1>{data.title}</h1>
      <p>By {data.author}</p>
      <img src={data.image} alt={data.title} />
      <div>{data.content}</div>
    </article>
  );
}
```

### Real Example - Product Page:

**app/products/[id]/page.js:**
```javascript
export async function generateMetadata({ params }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  const data = await product.json();
  
  return {
    title: `${data.name} - Buy Online`,
    description: data.description.substring(0, 155),
    keywords: [data.category, data.brand, 'online shopping'],
    openGraph: {
      title: `${data.name} - ${data.price}`,
      description: data.description,
      images: [{
        url: data.mainImage,
        width: 1200,
        height: 630
      }],
      type: 'product'
    }
  };
}

export default async function Product({ params }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  const data = await product.json();
  
  return (
    <div>
      <h1>{data.name}</h1>
      <p>${data.price}</p>
      <p>{data.description}</p>
    </div>
  );
}
```

---

## 67. Explain caching strategies in Next.js.

**Answer:**

Next.js has multiple cache layers to make apps faster:

### 1. Request Memoization

Automatically caches duplicate `fetch()` calls during same render.

```javascript
// Both calls fetch once, use same data
const user = await fetch('https://api.example.com/user/1');
const userAgain = await fetch('https://api.example.com/user/1');
// Only one network request!
```

### 2. Data Cache

Caches fetch responses across requests.

```javascript
// Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  
  return <div>{data.title}</div>;
}
```

### 3. Full Route Cache

Pre-renders entire route at build time (like SSG).

```javascript
// app/blog/page.js - Cached and pre-rendered
export default function Blog() {
  return <h1>Blog</h1>;
}
```

### 4. Router Cache

Client-side cache of visited pages.

```
User visits /home
↓
Page cached in browser

User clicks Link to /about
↓
/about cached in browser

User goes back to /home
↓
Served from browser cache (instant!)
```

---

## 68. How do you opt out of caching?

**Answer:**

### Opt Out of Data Cache:

```javascript
// Don't cache this fetch
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store' // Always fresh
});
```

### Opt Out of Route Cache:

```javascript
// app/page.js - Always generate on request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page() {
  return <h1>Dynamic Page</h1>;
}
```

### Opt Out of Router Cache:

```javascript
'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  
  return (
    <button onClick={() => router.refresh()}>
      Refresh Page
    </button>
  );
}
```

---

## 69-70. What is `revalidatePath` and `revalidateTag`?

**Answer:**

These are **on-demand revalidation** functions. Update cached content without rebuilding.

### `revalidatePath` - Revalidate Specific Routes:

**app/api/posts/route.js:**
```javascript
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const body = await request.json();
  
  // Create new post in database
  const newPost = await db.posts.create(body);
  
  // Revalidate the posts page
  revalidatePath('/posts');
  
  return new Response(JSON.stringify(newPost));
}
```

**How it works:**
1. User creates post via API
2. Post saved to database
3. `/posts` page regenerated in background
4. Next visitor sees fresh page

### `revalidateTag` - Revalidate by Tags:

**app/page.js** (Server Component):
```javascript
async function getPosts() {
  const data = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] } // Tag this request
  });
  
  return data.json();
}

export default async function Page() {
  const posts = await getPosts();
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

**app/api/revalidate/route.js:**
```javascript
import { revalidateTag } from 'next/cache';

export async function POST(request) {
  const secret = request.headers.get('x-secret-token');
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Revalidate all data tagged with 'posts'
  revalidateTag('posts');
  
  return new Response(JSON.stringify({ revalidated: true }));
}
```

---

## 71-72. How do you handle errors in App Router and what is `not-found.js`?

**Answer:**

### Error Handling with `error.js`:

**app/error.js:**
```javascript
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);
  
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
```

This catches errors in:
- Server Components
- Client Components
- Route Handlers

### Not Found Handling with `not-found.js`:

**app/not-found.js:**
```javascript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page doesn't exist.</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

**Trigger 404 from Server Component:**

**app/products/[id]/page.js:**
```javascript
import { notFound } from 'next/navigation';

export default async function Product({ params }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  
  if (!product) {
    notFound(); // Shows not-found.js
  }
  
  return <h1>{product.name}</h1>;
}
```

---

## 73-74. Explain Route Handlers and HTTP methods

**Answer:**

Route Handlers handle HTTP requests in the App Router.

**app/api/posts/route.js:**
```javascript
// GET - Fetch all posts
export async function GET() {
  const posts = await db.posts.findAll();
  return Response.json(posts);
}

// POST - Create new post
export async function POST(request) {
  const body = await request.json();
  const post = await db.posts.create(body);
  return Response.json(post, { status: 201 });
}

// PUT - Update post
export async function PUT(request) {
  const body = await request.json();
  const post = await db.posts.update(body.id, body);
  return Response.json(post);
}

// DELETE - Delete post
export async function DELETE(request) {
  const { id } = await request.json();
  await db.posts.delete(id);
  return Response.json({ success: true });
}
```

**Dynamic Route Handlers:**

**app/api/posts/[id]/route.js:**
```javascript
export async function GET(request, { params }) {
  const post = await db.posts.findById(params.id);
  
  if (!post) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  
  return Response.json(post);
}

export async function DELETE(request, { params }) {
  await db.posts.delete(params.id);
  return Response.json({ deleted: true });
}
```

---

## 75. What is middleware with matchers?

**Answer:**

Matchers specify which routes should run middleware.

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware running');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',      // /admin and all sub-routes
    '/api/:path*',        // /api and all sub-routes
    '/dashboard',         // Exact match
    '/((?!_next|public).*)' // Everything except _next and public
  ]
};
```

**Example - Protect Admin Routes:**

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('adminToken');
  
  // If no token and trying to access /admin
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

---

## Summary of Part 1 (Questions 51-75)

These 25 advanced questions cover:
- ✅ App Router vs Pages Router
- ✅ Server and Client Components
- ✅ Streaming and Suspense
- ✅ Layouts and routing patterns
- ✅ Caching strategies
- ✅ Metadata and SEO
- ✅ Error handling
- ✅ Route Handlers
- ✅ Middleware

**Next Step:** Continue with Questions 76-100 for complete advanced knowledge!
