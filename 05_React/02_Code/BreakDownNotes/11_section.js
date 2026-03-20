/*

========================================================
SECTION 11 — NEXT.JS & ECOSYSTEM (Optional but Important)
========================================================
85. What is Next.js and why is it used?  
86. What is the difference between SSR, SSG, and ISR in Next.js?  
87. What are API routes in Next.js?  
88. How does file-based routing work?  
89. What are middleware and edge functions?  
90. What is getStaticProps, getServerSideProps, and getStaticPaths?  

*/





/**
85. What is Next.js and why is it used?
--------------------------------------

Next.js is a React framework that provides production-ready features like server-side
rendering, static site generation, API routes, file-based routing, and more. It's
built on top of React and extends it with powerful capabilities for building modern
web applications.

What is Next.js:
----------------

// Regular React App:
// - Client-side only
// - Manual routing setup
// - No SSR out of the box
// - Need separate backend for APIs
// - Manual optimization

// Next.js App:
// - SSR, SSG, ISR built-in
// - File-based routing
// - API routes included
// - Automatic code splitting
// - Image optimization
// - Much more...

Basic Next.js Setup:
--------------------

// Install:
npx create-next-app@latest my-app

// Project structure:
my-app/
  pages/
    index.js          // Route: /
    about.js          // Route: /about
    blog/
      [slug].js       // Route: /blog/:slug
    api/
      hello.js        // API: /api/hello
  public/
    images/
  styles/
  next.config.js

// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is the homepage</p>
    </div>
  );
}

// That's it! No routing setup needed.
// Visit http://localhost:3000 - it works!

Why Use Next.js:
----------------

// 1. Server-Side Rendering (SSR)
// Pages rendered on server for each request

export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}

export default function Page({ data }) {
  return <div>{data}</div>;
}

// Benefits:
// - Better SEO
// - Faster initial load
// - Dynamic data

// 2. Static Site Generation (SSG)
// Pre-render pages at build time

export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}

export default function Blog({ posts }) {
  return posts.map(post => <Post key={post.id} {...post} />);
}

// Benefits:
// - Lightning fast
// - No server needed
// - Perfect SEO

// 3. API Routes
// Backend API in same project

// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = getUsers();
    res.status(200).json(users);
  }
}

// Call from frontend:
fetch('/api/users')
  .then(r => r.json())
  .then(users => console.log(users));

// Benefits:
// - Full-stack in one project
// - No CORS issues
// - Easy deployment

// 4. File-Based Routing
// No react-router needed!

// pages/index.js → /
// pages/about.js → /about
// pages/blog/[slug].js → /blog/:slug
// pages/posts/[id]/comments/[commentId].js → /posts/:id/comments/:commentId

// Automatic code splitting per route!

// 5. Automatic Code Splitting
// Each page only loads what it needs

// pages/home.js
import HeavyComponent from '../components/HeavyComponent';

export default function Home() {
  return <HeavyComponent />;
}

// pages/about.js
import LightComponent from '../components/LightComponent';

export default function About() {
  return <LightComponent />;
}

// Home page: Loads HeavyComponent.js
// About page: Loads LightComponent.js
// Automatically optimized!

// 6. Image Optimization
import Image from 'next/image';

function Profile() {
  return (
    <Image
      src="/profile.jpg"
      width={500}
      height={500}
      alt="Profile"
    />
  );
}

// Automatically:
// - Resizes images
// - Lazy loads
// - WebP format
// - Responsive images
// - Prevents layout shift

// 7. Built-in CSS Support
// Import CSS directly

// styles/Home.module.css
.container {
  padding: 20px;
}

// pages/index.js
import styles from '../styles/Home.module.css';

export default function Home() {
  return <div className={styles.container}>Hello</div>;
}

// CSS Modules, Sass, CSS-in-JS all supported!

// 8. Fast Refresh
// Edit code, see changes instantly
// Preserves component state!

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* Edit this text and see instant update without losing count! * /}
    </div>
  );
}

// 9. TypeScript Support
// Built-in TypeScript support

// tsconfig.json automatically generated
// Just rename .js to .tsx

// pages/index.tsx
import { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await fetchPosts();
  return { props: { posts } };
};

export default function Home({ posts }: Props) {
  return <div>{posts.map(post => <Post key={post.id} {...post} />)}</div>;
}

Key Features:
-------------

// 1. Hybrid Rendering
// Mix SSR, SSG, CSR in same app

// pages/index.js (SSG)
export async function getStaticProps() {
  return { props: { title: 'Home' } };
}

// pages/dashboard.js (SSR)
export async function getServerSideProps() {
  const user = await getUser();
  return { props: { user } };
}

// pages/profile.js (CSR)
function Profile() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(setData);
  }, []);
  
  return <div>{data?.name}</div>;
}

// 2. Incremental Static Regeneration (ISR)
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 60 // Rebuild every 60 seconds
  };
}

// 3. Built-in Environment Variables
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=secret123

// In code:
console.log(process.env.NEXT_PUBLIC_API_URL); // Client-side accessible
console.log(process.env.SECRET_KEY); // Server-side only

// 4. Preview Mode
// Preview draft content before publishing

export default function Post({ post }) {
  return <article>{post.content}</article>;
}

export async function getStaticProps({ preview, previewData }) {
  const post = preview
    ? await getDraftPost(previewData.id)
    : await getPublishedPost();
  
  return { props: { post } };
}

// 5. Internationalization (i18n)
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
  },
};

// Automatic routing:
// /about → English
// /fr/about → French
// /es/about → Spanish

Performance Benefits:
---------------------

// Automatic optimizations:

// 1. Prefetching
<Link href="/about">
  <a>About</a>  {/* Prefetches /about in background * /}
</Link>

// 2. Code splitting
// Each page = separate bundle
// Only load what's needed

// 3. Tree shaking
// Remove unused code automatically

// 4. Minification
// CSS and JavaScript minified in production

// 5. Compression
// Gzip/Brotli compression enabled

When to Use Next.js:
--------------------

// ✅ Use Next.js for:
// - Content-heavy sites (blogs, news, docs)
// - E-commerce sites
// - Marketing sites
// - SaaS applications
// - Dashboards with SSR needs
// - Full-stack applications

// ❌ Next.js might be overkill for:
// - Simple SPAs
// - Static landing pages (use Astro)
// - Mobile apps (use React Native)
// - Embedded widgets

Real-World Example:
-------------------

// Blog with Next.js

// pages/index.js (Homepage - SSG)
export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts }, revalidate: 3600 };
}

export default function Home({ posts }) {
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <a><h2>{post.title}</h2></a>
          </Link>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// pages/posts/[slug].js (Blog post - SSG with dynamic routes)
export async function getStaticPaths() {
  const posts = await fetchPosts();
  const paths = posts.map(post => ({ params: { slug: post.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <Image src={post.image} width={800} height={400} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// pages/api/newsletter.js (API route)
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    await subscribeToNewsletter(email);
    res.status(200).json({ message: 'Subscribed!' });
  }
}

Deployment:
-----------

// Vercel (recommended):
// 1. Push to GitHub
// 2. Connect to Vercel
// 3. Auto-deploy on push
// Done!

// Features:
// - Edge network
// - Automatic HTTPS
// - Preview deployments
// - Environment variables
// - Analytics

// Other platforms:
// - AWS (via Amplify or custom)
// - Google Cloud
// - Azure
// - Netlify
// - DigitalOcean
// - Self-hosted

Comparison:
-----------

// Create React App:
// - Client-side only
// - Manual routing
// - No SSR/SSG
// - No API routes
// - Manual optimization
// - Good for: SPAs

// Next.js:
// - SSR, SSG, ISR
// - File-based routing
// - API routes
// - Automatic optimization
// - Many built-in features
// - Good for: Production apps

// Gatsby:
// - SSG focused
// - GraphQL data layer
// - Plugin ecosystem
// - Great for: Static sites

// Remix:
// - SSR focused
// - Web standards
// - Nested routes
// - Great for: Dynamic apps


/**
86. What is the difference between SSR, SSG, and ISR in Next.js?
----------------------------------------------------------------

Next.js supports three main rendering strategies: Server-Side Rendering (SSR),
Static Site Generation (SSG), and Incremental Static Regeneration (ISR). Each
has different use cases and trade-offs.

1. Server-Side Rendering (SSR):
--------------------------------

// Renders HTML on server for each request
// Use getServerSideProps

// pages/profile.js
export async function getServerSideProps(context) {
  // Runs on every request
  const { req, res, params, query } = context;
  
  // Access cookies, headers
  const session = req.cookies.session;
  
  // Fetch user-specific data
  const user = await fetchUser(session);
  
  // Can redirect
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: { user }, // Passed to component
  };
}

export default function Profile({ user }) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

// How SSR works:
// 1. User requests /profile
// 2. Server runs getServerSideProps
// 3. Server fetches user data
// 4. Server renders React to HTML
// 5. Server sends HTML to client
// 6. Client receives rendered page
// 7. React hydrates on client
// 8. Page interactive

// Use SSR when:
// ✅ Data changes frequently
// ✅ Personalized content (user-specific)
// ✅ Need request data (cookies, headers)
// ✅ Real-time data
// ✅ SEO + fresh data required

// Don't use SSR when:
// ❌ Data doesn't change often (use SSG)
// ❌ Don't need SEO (use CSR)
// ❌ Want maximum performance (use SSG)

// Pros:
// + Always fresh data
// + User-specific content
// + Access to request context
// + Good SEO

// Cons:
// - Slower than SSG (server renders each request)
// - Requires server
// - Higher server costs
// - Can't cache on CDN

2. Static Site Generation (SSG):
---------------------------------

// Pre-renders HTML at build time
// Use getStaticProps

// pages/blog.js
export async function getStaticProps() {
  // Runs at build time
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    // Optional: revalidate makes it ISR (see below)
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// How SSG works:
// 1. Build time: Next.js runs getStaticProps
// 2. Fetches data
// 3. Renders page to HTML
// 4. Saves HTML file to disk
// 5. Deploy to CDN
// 6. User requests page → CDN serves HTML instantly
// 7. React hydrates on client

// Dynamic routes with SSG:
// pages/posts/[slug].js
export async function getStaticPaths() {
  // Generate list of paths at build time
  const posts = await fetchPosts();
  
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  
  return {
    paths, // e.g., [{ params: { slug: 'post-1' } }, ...]
    fallback: false, // or true, 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Generate page for each path
  const post = await fetchPost(params.slug);
  
  return {
    props: { post },
  };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

// Build output:
// - /posts/post-1.html
// - /posts/post-2.html
// - /posts/post-3.html
// All generated at build time!

// fallback options:

// fallback: false
// - Only paths from getStaticPaths exist
// - 404 for other paths

// fallback: true
// - Paths not in getStaticPaths generated on-demand
// - First request: shows fallback, generates page
// - Subsequent requests: cached page

// fallback: 'blocking'
// - Like true, but waits for page generation
// - No fallback shown, just waits

// Use SSG when:
// ✅ Data doesn't change often
// ✅ Same content for all users
// ✅ SEO important
// ✅ Maximum performance needed
// ✅ Marketing pages, blogs, docs

// Pros:
// + Blazing fast (CDN)
// + Cheap hosting
// + Perfect SEO
// + Scales infinitely

// Cons:
// - Data can be stale
// - Rebuild needed for updates
// - Build time increases with pages

3. Incremental Static Regeneration (ISR):
------------------------------------------

// Best of both worlds: Static + Fresh data
// Use getStaticProps with revalidate

// pages/products.js
export async function getStaticProps() {
  const products = await fetchProducts();
  
  return {
    props: { products },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

export default function Products({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// How ISR works:
// 1. Build time: Generate initial HTML
// 2. Deploy to CDN
// 3. User 1 (t=0s): Gets cached HTML (fast!)
// 4. User 2 (t=30s): Gets cached HTML (fast!)
// 5. User 3 (t=70s): Gets cached HTML, triggers regeneration
// 6. Background: Rebuild page with fresh data
// 7. User 4 (t=75s): Gets new HTML with fresh data
// 8. Cache updated

// Timeline visualization:
// Build: Page generated → cached
// 0-60s: All users get cached page
// 61s: User visits, gets cached page, triggers rebuild
// Background: Page regenerates with fresh data
// 65s: New page cached
// 65s+: All users get fresh page
// Repeat cycle...

// On-demand revalidation (Next.js 12.2+):
// pages/api/revalidate.js
export default async function handler(req, res) {
  // Check secret to prevent unauthorized revalidation
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
  try {
    // Revalidate specific path
    await res.revalidate('/posts/my-post');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}

// Trigger from CMS webhook:
// POST /api/revalidate?secret=SECRET&path=/posts/updated-post

// Use ISR when:
// ✅ Data changes occasionally
// ✅ Need both performance and freshness
// ✅ Large number of pages
// ✅ E-commerce products, news, blog posts

// Pros:
// + Fast like SSG (CDN)
// + Fresh data periodically
// + No full rebuild needed
// + Scales well
// + On-demand revalidation

// Cons:
// - Stale data for revalidate period
// - First user after revalidate sees old data
// - Slightly more complex

Comparison Table:
-----------------

// Feature          | SSR           | SSG           | ISR
// -----------------|---------------|---------------|------------------
// Renders          | Per request   | Build time    | Build time + updates
// Speed            | Medium        | Fastest       | Fast
// Data freshness   | Always fresh  | Stale         | Mostly fresh
// Server needed    | Yes           | No (CDN)      | No (CDN)
// Cost             | Higher        | Lowest        | Low
// SEO              | Good          | Perfect       | Perfect
// Personalization  | Yes           | No            | No
// Scalability      | Medium        | Infinite      | Infinite

Real-World Examples:
--------------------

// 1. E-commerce Site

// Homepage - SSG (content rarely changes)
// pages/index.js
export async function getStaticProps() {
  const featured = await fetchFeaturedProducts();
  return { props: { featured } };
}

// Product listing - ISR (prices change, but not constantly)
// pages/products.js
export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: { products },
    revalidate: 300, // 5 minutes
  };
}

// Product page - ISR (stock changes, need updates)
// pages/products/[id].js
export async function getStaticPaths() {
  const products = await fetchProducts();
  return {
    paths: products.map(p => ({ params: { id: p.id } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct(params.id);
  return {
    props: { product },
    revalidate: 60, // 1 minute
  };
}

// Cart page - SSR (user-specific)
// pages/cart.js
export async function getServerSideProps({ req }) {
  const session = req.cookies.session;
  const cart = await fetchCart(session);
  return { props: { cart } };
}

// User dashboard - SSR (personalized, authenticated)
// pages/dashboard.js
export async function getServerSideProps({ req }) {
  const user = await authenticate(req);
  if (!user) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  const data = await fetchUserData(user.id);
  return { props: { user, data } };
}

// 2. Blog

// Blog listing - ISR
export async function getStaticProps() {
  const posts = await fetchPosts();
  return {
    props: { posts },
    revalidate: 3600, // 1 hour
  };
}

// Blog post - SSG (content doesn't change)
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

// Comments section - CSR (client-side fetch)
function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    fetch(`/api/comments?postId=${postId}`)
      .then(r => r.json())
      .then(setComments);
  }, [postId]);
  
  return comments.map(c => <Comment key={c.id} {...c} />);
}

Decision Flow:
--------------

// Does data change per user?
// YES → SSR
// NO ↓

// Does data change frequently (< 1 minute)?
// YES → SSR or CSR
// NO ↓

// Does data change occasionally (minutes/hours)?
// YES → ISR
// NO ↓

// Static content?
// YES → SSG

Mixing Strategies:
------------------

// You can use different strategies on different pages!

// pages/
//   index.js              // SSG (marketing page)
//   about.js              // SSG (rarely changes)
//   blog/
//     index.js            // ISR (new posts periodically)
//     [slug].js           // SSG (posts don't change)
//   products/
//     index.js            // ISR (prices update)
//     [id].js             // ISR (stock updates)
//   dashboard.js          // SSR (user-specific)
//   profile.js            // SSR (personalized)
//   cart.js               // SSR (user cart)

Summary:

SSR (getServerSideProps):
- Renders on every request
- Always fresh data
- User-specific content
- Requires server
- Slower but dynamic

SSG (getStaticProps):
- Pre-rendered at build time
- Blazing fast (CDN)
- Same for all users
- Best for static content
- Perfect SEO

ISR (getStaticProps + revalidate):
- Pre-rendered + periodic updates
- Fast like SSG
- Fresh-ish data
- Best of both worlds
- Great for most use cases
*/


/**
87. What are API routes in Next.js?
-----------------------------------

API routes provide a solution to build your API directly within your Next.js app.
Any file inside pages/api folder is treated as an API endpoint instead of a page.

Basic API Route:
----------------

// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from Next.js!' });
}

// Access at: http://localhost:3000/api/hello
// Returns: { "message": "Hello from Next.js!" }

// No Express or other framework needed!

Request and Response:
---------------------

// pages/api/users.js
export default function handler(req, res) {
  // Request object
  const {
    method,        // HTTP method: GET, POST, etc.
    query,         // Query parameters: ?name=John
    body,          // Request body (POST/PUT)
    cookies,       // Cookies
    headers,       // Headers
  } = req;
  
  // Response methods
  res.status(200);                    // Set status code
  res.json({ data: 'value' });       // Send JSON
  res.send('Text response');         // Send text
  res.redirect('/other-page');       // Redirect
  res.setHeader('Custom', 'value');  // Set header
  
  // Common pattern
  res.status(200).json({ success: true });
}

HTTP Methods:
-------------

// pages/api/posts.js
export default function handler(req, res) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      // Handle GET request
      const posts = await getPosts();
      res.status(200).json(posts);
      break;
      
    case 'POST':
      // Handle POST request
      const { title, content } = req.body;
      const newPost = await createPost({ title, content });
      res.status(201).json(newPost);
      break;
      
    case 'PUT':
      // Handle PUT request
      const { id } = req.query;
      const updated = await updatePost(id, req.body);
      res.status(200).json(updated);
      break;
      
    case 'DELETE':
      // Handle DELETE request
      const { id } = req.query;
      await deletePost(id);
      res.status(204).end();
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

Dynamic API Routes:
-------------------

// pages/api/posts/[id].js
export default async function handler(req, res) {
  const { id } = req.query;  // Get dynamic parameter
  
  if (req.method === 'GET') {
    const post = await getPost(id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.status(200).json(post);
  }
  
  if (req.method === 'DELETE') {
    await deletePost(id);
    res.status(204).end();
  }
}

// Access:
// GET /api/posts/123 → { id: '123' }
// DELETE /api/posts/456 → { id: '456' }

Catch-All API Routes:
---------------------

// pages/api/[...params].js
export default function handler(req, res) {
  const { params } = req.query;
  
  // /api/a → params = ['a']
  // /api/a/b → params = ['a', 'b']
  // /api/a/b/c → params = ['a', 'b', 'c']
  
  res.json({ params });
}

// Optional catch-all:
// pages/api/[[...params]].js
// Matches /api and /api/anything/...

Database Integration:
---------------------

// pages/api/users/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    if (req.method === 'GET') {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.status(200).json(user);
    }
    
    if (req.method === 'PUT') {
      const user = await prisma.user.update({
        where: { id: parseInt(id) },
        data: req.body
      });
      
      res.status(200).json(user);
    }
    
    if (req.method === 'DELETE') {
      await prisma.user.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

Authentication:
---------------

// pages/api/protected.js
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
  // Get token from header
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // Verify token
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Get user data
    const user = await getUser(decoded.userId);
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

Middleware Pattern:
-------------------

// lib/middleware.js
export function withAuth(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const user = await verifyToken(token);
      req.user = user;  // Attach user to request
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

// pages/api/dashboard.js
import { withAuth } from '../../lib/middleware';

async function handler(req, res) {
  // req.user is available here
  const data = await getDashboardData(req.user.id);
  res.json(data);
}

export default withAuth(handler);

File Upload:
------------

// pages/api/upload.js
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,  // Disable default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  
  const form = formidable({ multiples: true });
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed' });
    }
    
    const file = files.file;
    const data = await fs.readFile(file.filepath);
    
    // Save to cloud storage or process
    const url = await uploadToS3(data, file.originalFilename);
    
    res.status(200).json({ url });
  });
}

CORS Configuration:
-------------------

// pages/api/public.js
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Your API logic
  res.json({ message: 'CORS enabled' });
}

Real-World Example - Complete CRUD API:
----------------------------------------

// pages/api/todos/index.js
import { getTodos, createTodo } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const todos = await getTodos(userId);
      return res.status(200).json(todos);
    }
    
    if (req.method === 'POST') {
      const { text, userId } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }
      
      const todo = await createTodo({ text, userId, completed: false });
      return res.status(201).json(todo);
    }
    
    res.status(405).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// pages/api/todos/[id].js
import { getTodo, updateTodo, deleteTodo } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  
  try {
    if (req.method === 'GET') {
      const todo = await getTodo(id);
      
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      
      return res.status(200).json(todo);
    }
    
    if (req.method === 'PUT') {
      const todo = await updateTodo(id, req.body);
      return res.status(200).json(todo);
    }
    
    if (req.method === 'DELETE') {
      await deleteTodo(id);
      return res.status(204).end();
    }
    
    res.status(405).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Use from frontend:
// pages/index.js
function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  // Fetch todos
  useEffect(() => {
    fetch('/api/todos?userId=1')
      .then(r => r.json())
      .then(setTodos);
  }, []);
  
  // Create todo
  const addTodo = async (text) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, userId: 1 })
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };
  
  // Update todo
  const toggleTodo = async (id, completed) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    setTodos(todos.map(t => t.id === id ? {...t, completed: !completed} : t));
  };
  
  // Delete todo
  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id, todo.completed)}
          />
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

API Route Features:
-------------------

// 1. Environment Variables
export default function handler(req, res) {
  const apiKey = process.env.API_KEY;  // Server-side only
  res.json({ key: apiKey });
}

// 2. No CORS issues
// Same origin as frontend

// 3. Server-side only code
import bcrypt from 'bcrypt';  // Won't be in client bundle

export default async function handler(req, res) {
  const hash = await bcrypt.hash(req.body.password, 10);
  res.json({ hash });
}

// 4. Edge Runtime (experimental)
export const config = {
  runtime: 'edge',  // Runs on edge locations
};

export default async function handler(req) {
  return new Response('Hello from edge!');
}

Benefits:
---------

// ✅ Full-stack in one project
// ✅ No CORS configuration
// ✅ Serverless by default
// ✅ Automatic code splitting
// ✅ TypeScript support
// ✅ Easy deployment
// ✅ Same domain as frontend
// ✅ Can use server-side packages

Summary:

API Routes:
- Backend API in pages/api folder
- Each file = API endpoint
- Supports all HTTP methods
- Dynamic routes with [param]
- Database integration
- Authentication & middleware
- File uploads
- Serverless functions
- Deploy with your app
- No separate backend needed
*/


/**
88. How does file-based routing work?
-------------------------------------

Next.js uses a file-based routing system where the file structure in the pages
directory automatically becomes your application's routes. No react-router needed!

Basic Routing:
--------------

// File system:
pages/
  index.js          → /
  about.js          → /about
  contact.js        → /contact
  blog.js           → /blog

// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}
// URL: http://localhost:3000/

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}
// URL: http://localhost:3000/about

Nested Routes:
--------------

// File system:
pages/
  blog/
    index.js        → /blog
    first-post.js   → /blog/first-post
    second-post.js  → /blog/second-post

// pages/blog/index.js
export default function BlogHome() {
  return <h1>Blog Home</h1>;
}
// URL: /blog

// pages/blog/first-post.js
export default function FirstPost() {
  return <h1>First Post</h1>;
}
// URL: /blog/first-post

Dynamic Routes:
---------------

// File system:
pages/
  posts/
    [id].js         → /posts/:id
    [slug].js       → /posts/:slug

// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;  // Get dynamic parameter
  
  return <h1>Post ID: {id}</h1>;
}

// URLs:
// /posts/1 → id = '1'
// /posts/2 → id = '2'
// /posts/abc → id = 'abc'

// With getStaticProps:
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
  const post = await fetchPost(params.id);
  return { props: { post } };
}

export default function Post({ post }) {
  return <h1>{post.title}</h1>;
}

Catch-All Routes:
-----------------

// File system:
pages/
  docs/
    [...slug].js    → /docs/* (any depth)

// pages/docs/[...slug].js
import { useRouter } from 'next/router';

export default function Docs() {
  const router = useRouter();
  const { slug } = router.query;
  
  // slug is an array
  return <h1>Docs: {slug?.join('/')}</h1>;
}

// URLs:
// /docs/a → slug = ['a']
// /docs/a/b → slug = ['a', 'b']
// /docs/a/b/c → slug = ['a', 'b', 'c']

// Optional catch-all:
// pages/docs/[[...slug]].js
// Matches /docs and /docs/anything/...

// URLs:
// /docs → slug = undefined
// /docs/a → slug = ['a']
// /docs/a/b → slug = ['a', 'b']

Link Component:
---------------

import Link from 'next/link';

function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/posts/1">Post 1</Link>
    </nav>
  );
}

// Dynamic links:
function PostList({ posts }) {
  return posts.map(post => (
    <Link key={post.id} href={`/posts/${post.id}`}>
      <a>{post.title}</a>
    </Link>
  ));
}

// Link with object:
<Link href={{
  pathname: '/posts/[id]',
  query: { id: post.id }
}}>
  <a>{post.title}</a>
</Link>

Programmatic Navigation:
------------------------

import { useRouter } from 'next/router';

function Component() {
  const router = useRouter();
  
  // Navigate to page
  const goToAbout = () => {
    router.push('/about');
  };
  
  // Navigate with params
  const goToPost = (id) => {
    router.push(`/posts/${id}`);
    // or
    router.push({
      pathname: '/posts/[id]',
      query: { id }
    });
  };
  
  // Replace (no history entry)
  const replaceRoute = () => {
    router.replace('/new-page');
  };
  
  // Go back
  const goBack = () => {
    router.back();
  };
  
  // Reload current page
  const reload = () => {
    router.reload();
  };
  
  // Prefetch page
  useEffect(() => {
    router.prefetch('/about');
  }, []);
  
  return (
    <div>
      <button onClick={goToAbout}>About</button>
      <button onClick={() => goToPost(123)}>Post 123</button>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

Query Parameters:
-----------------

// URL: /search?q=react&sort=date
import { useRouter } from 'next/router';

function SearchPage() {
  const router = useRouter();
  const { q, sort } = router.query;
  
  return (
    <div>
      <p>Search: {q}</p>
      <p>Sort: {sort}</p>
    </div>
  );
}

// Update query:
function updateQuery() {
  router.push({
    pathname: '/search',
    query: { q: 'nextjs', sort: 'relevance' }
  });
}

Shallow Routing:
----------------

// Update URL without running data fetching methods
function Page() {
  const router = useRouter();
  
  const updateFilter = (filter) => {
    router.push(
      {
        pathname: '/products',
        query: { filter }
      },
      undefined,
      { shallow: true }  // Don't re-run getStaticProps/getServerSideProps
    );
  };
  
  return (
    <div>
      <button onClick={() => updateFilter('electronics')}>Electronics</button>
      <button onClick={() => updateFilter('clothing')}>Clothing</button>
    </div>
  );
}

Route Groups (App Router - Next.js 13+):
-----------------------------------------

// Organize routes without affecting URL
app/
  (marketing)/
    about/
      page.js       → /about
    blog/
      page.js       → /blog
  (shop)/
    products/
      page.js       → /products
    cart/
      page.js       → /cart
  page.js           → /

// (folder) doesn't appear in URL
// Used for organization only

Parallel Routes (App Router):
------------------------------

// Show multiple pages at same URL
app/
  @modal/
    login/
      page.js
  @sidebar/
    page.js
  layout.js
  page.js

// layout.js
export default function Layout({ children, modal, sidebar }) {
  return (
    <div>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      {modal}
    </div>
  );
}

Intercepting Routes (App Router):
----------------------------------

// Intercept navigation to show modal instead
app/
  photos/
    [id]/
      page.js           → /photos/123 (direct visit)
  (..)photos/
    [id]/
      page.js           → /photos/123 (intercepted from within app)

// Show photo in modal when clicking link
// Show full page when visiting directly

Custom 404 Page:
----------------

// pages/404.js
export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Go home</Link>
    </div>
  );
}

Custom 500 Page:
----------------

// pages/500.js
export default function Custom500() {
  return (
    <div>
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
    </div>
  );
}

Custom App:
-----------

// pages/_app.js
// Wraps all pages
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav>{/* Navigation * /}</nav>
      <Component {...pageProps} />
      <footer>{/* Footer * /}</footer>
    </div>
  );
}

Custom Document:
----------------

// pages/_document.js
// Customize HTML document
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Complete Routing Example:
--------------------------

// File system:
pages/
  _app.js                    // Custom App
  _document.js               // Custom Document
  404.js                     // Custom 404
  index.js                   // /
  about.js                   // /about
  blog/
    index.js                 // /blog
    [slug].js                // /blog/:slug
  posts/
    index.js                 // /posts
    [id].js                  // /posts/:id
    [id]/
      edit.js                // /posts/:id/edit
      comments.js            // /posts/:id/comments
  docs/
    [[...slug]].js           // /docs/* (optional catch-all)
  api/
    hello.js                 // /api/hello
    posts/
      [id].js                // /api/posts/:id

// Navigation component:
function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      <Link href="/">
        <a className={router.pathname === '/' ? 'active' : ''}>
          Home
        </a>
      </Link>
      
      <Link href="/about">
        <a className={router.pathname === '/about' ? 'active' : ''}>
          About
        </a>
      </Link>
      
      <Link href="/blog">
        <a className={router.pathname.startsWith('/blog') ? 'active' : ''}>
          Blog
        </a>
      </Link>
    </nav>
  );
}

Routing Best Practices:
------------------------

// 1. Use Link for navigation (not <a>)
// ✅ Good
<Link href="/about"><a>About</a></Link>

// ❌ Bad
<a href="/about">About</a>  // Full page reload!

// 2. Prefetch important routes
<Link href="/important" prefetch={true}>
  <a>Important Page</a>
</Link>

// 3. Use dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>
});

// 4. Keep route structure flat when possible
// ✅ Good
pages/blog-post.js

// ❌ Avoid unnecessary nesting
pages/blog/post.js  // If blog only has one type

// 5. Use meaningful names
// ✅ Good
pages/products/[id].js

// ❌ Bad
pages/p/[i].js

Summary:

File-Based Routing:
- pages/ folder = routes
- index.js = root of directory
- [param].js = dynamic route
- [...slug].js = catch-all route
- [[...slug]].js = optional catch-all
- _app.js = custom App component
- _document.js = custom HTML document
- 404.js = custom 404 page
- Automatic code splitting
- Link component for navigation
- useRouter hook for programmatic navigation
- No configuration needed
*/

// Continuing with remaining questions...

/**
89. What are middleware and edge functions?
------------------------------------------

Middleware in Next.js allows you to run code before a request is completed. Edge
functions run at the edge (CDN locations) closer to users for better performance.

Middleware:
-----------

// middleware.js (or middleware.ts)
// Runs before every request

import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get pathname
  const { pathname } = request.nextUrl;
  
  // Check authentication
  const token = request.cookies.get('token');
  
  if (pathname.startsWith('/dashboard') && !token) {
    // Redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Continue to page
  return NextResponse.next();
}

// Configure which paths middleware runs on
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

Middleware Use Cases:
---------------------

// 1. Authentication
export function middleware(request) {
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// 2. Redirects
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Old URL to new URL
  if (pathname === '/old-blog') {
    return NextResponse.redirect(new URL('/blog', request.url));
  }
  
  // Redirect based on condition
  if (pathname === '/admin' && !isAdmin(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// 3. Rewriting (URL stays same, content different)
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Show different page without changing URL
  if (pathname === '/about') {
    return NextResponse.rewrite(new URL('/about-us', request.url));
  }
  
  return NextResponse.next();
}

// 4. Geolocation-based content
export function middleware(request) {
  const country = request.geo.country;
  
  // Redirect based on country
  if (country === 'US' && !request.nextUrl.pathname.startsWith('/us')) {
    return NextResponse.redirect(new URL('/us', request.url));
  }
  
  if (country === 'UK' && !request.nextUrl.pathname.startsWith('/uk')) {
    return NextResponse.redirect(new URL('/uk', request.url));
  }
  
  return NextResponse.next();
}

// 5. A/B Testing
export function middleware(request) {
  // Random variant
  const variant = Math.random() < 0.5 ? 'a' : 'b';
  
  // Set cookie
  const response = NextResponse.next();
  response.cookies.set('ab-test-variant', variant);
  
  // Rewrite to variant page
  if (request.nextUrl.pathname === '/landing') {
    return NextResponse.rewrite(
      new URL(`/landing-${variant}`, request.url)
    );
  }
  
  return response;
}

// 6. Custom Headers
export function middleware(request) {
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('X-Custom-Header', 'value');
  response.headers.set('X-Request-Time', Date.now().toString());
  
  return response;
}

// 7. Rate Limiting
const rateLimit = new Map();

export function middleware(request) {
  const ip = request.ip || 'unknown';
  const now = Date.now();
  
  // Get user's request history
  const userRequests = rateLimit.get(ip) || [];
  
  // Filter requests in last minute
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  // Check limit
  if (recentRequests.length >= 100) {
    return new NextResponse('Rate limit exceeded', { status: 429 });
  }
  
  // Update history
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  
  return NextResponse.next();
}

// 8. Bot Protection
export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Block known bots
  const botPatterns = ['bot', 'crawler', 'spider', 'scraper'];
  const isBot = botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
  
  if (isBot && request.nextUrl.pathname.startsWith('/api')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  return NextResponse.next();
}

Middleware Configuration:
--------------------------

// Match specific paths
export const config = {
  matcher: '/dashboard/:path*',
};

// Match multiple paths
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

// Match all except specific
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * /
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

Edge Functions:
---------------

// Edge functions run at CDN edge locations
// Near users for low latency

// pages/api/edge-example.js
export const config = {
  runtime: 'edge',  // Enable edge runtime
};

export default async function handler(request) {
  // Get user location
  const { geo } = request;
  
  return new Response(
    JSON.stringify({
      country: geo.country,
      city: geo.city,
      region: geo.region,
      latitude: geo.latitude,
      longitude: geo.longitude,
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  );
}

// Benefits:
// - Runs globally at edge
// - Low latency (~50ms)
// - Scales automatically
// - No cold starts

Edge Function Examples:
-----------------------

// 1. Personalization
export const config = { runtime: 'edge' };

export default async function handler(request) {
  const country = request.geo.country;
  
  // Personalized content based on location
  const content = {
    US: 'Welcome, American visitor!',
    UK: 'Welcome, British visitor!',
    default: 'Welcome, international visitor!'
  };
  
  return new Response(content[country] || content.default);
}

// 2. Feature Flags
export const config = { runtime: 'edge' };

const features = {
  'new-ui': ['US', 'CA'],
  'beta-feature': ['US'],
};

export default async function handler(request) {
  const country = request.geo.country;
  const enabledFeatures = {};
  
  for (const [feature, countries] of Object.entries(features)) {
    enabledFeatures[feature] = countries.includes(country);
  }
  
  return new Response(JSON.stringify(enabledFeatures), {
    headers: { 'content-type': 'application/json' },
  });
}

// 3. Image Transformation
export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const width = searchParams.get('width') || 800;
  
  // Fetch and transform image at edge
  const response = await fetch(imageUrl);
  const image = await response.arrayBuffer();
  
  // Transform image (using edge-compatible library)
  const transformed = await transformImage(image, { width });
  
  return new Response(transformed, {
    headers: {
      'content-type': 'image/jpeg',
      'cache-control': 'public, max-age=31536000',
    },
  });
}

// 4. API Gateway
export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { pathname } = new URL(request.url);
  
  // Route to different backends
  const routes = {
    '/api/users': 'https://users-api.com',
    '/api/posts': 'https://posts-api.com',
    '/api/comments': 'https://comments-api.com',
  };
  
  const backend = routes[pathname];
  
  if (!backend) {
    return new Response('Not Found', { status: 404 });
  }
  
  // Proxy request to backend
  return fetch(`${backend}${pathname}`, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });
}

Middleware vs Edge Functions:
------------------------------

// Middleware:
// - Runs before rendering
// - Can redirect/rewrite
// - Access to cookies, headers
// - Runs for pages and API routes

// Edge Functions:
// - API route at edge
// - Returns response directly
// - Lower latency
// - Globally distributed

// Example: Combine both
// middleware.js
export function middleware(request) {
  // Check auth before edge function
  if (!request.cookies.get('token')) {
    return NextResponse.redirect('/login');
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/protected/:path*',
};

// pages/api/protected/data.js
export const config = { runtime: 'edge' };

export default async function handler(request) {
  // This runs at edge after middleware check
  const data = await fetchDataFromEdge();
  return new Response(JSON.stringify(data));
}

Real-World Example:
-------------------

// Internationalization with middleware

// middleware.js
import { NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr', 'de'];
const defaultLocale = 'en';

function getLocale(request) {
  // Check cookie
  const localeCookie = request.cookies.get('locale');
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie;
  }
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    for (const locale of locales) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }
  
  return defaultLocale;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();
  
  // Get user's preferred locale
  const locale = getLocale(request);
  
  // Redirect to locale-specific URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};

Summary:

Middleware:
- Runs before request completed
- Redirect, rewrite, modify headers
- Authentication, authorization
- A/B testing, feature flags
- Geolocation-based routing
- Rate limiting
- Defined in middleware.js

Edge Functions:
- API routes at edge locations
- Low latency (~50ms)
- Global distribution
- No cold starts
- Use runtime: 'edge'
- Limited APIs (edge-compatible only)
*/


/**
90. What is getStaticProps, getServerSideProps, and getStaticPaths?
-------------------------------------------------------------------

These are special Next.js functions for data fetching that enable SSR, SSG, and ISR.
They run on the server (never on client) and determine how pages are rendered.

1. getStaticProps:
------------------

// Static Site Generation (SSG)
// Runs at build time
// Generates static HTML

// Basic example:
export async function getStaticProps() {
  // Fetch data at build time
  const posts = await fetchPosts();
  
  return {
    props: {
      posts,  // Will be passed to page component as props
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  );
}

// When Next.js builds:
// 1. Calls getStaticProps
// 2. Fetches posts
// 3. Renders Blog component with posts
// 4. Generates blog.html
// 5. Serves static HTML (blazing fast!)

// With ISR (Incremental Static Regeneration):
export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts },
    revalidate: 60,  // Regenerate every 60 seconds
  };
}

// Now pages rebuild periodically with fresh data!

// Context object:
export async function getStaticProps(context) {
  const {
    params,       // Route parameters (for dynamic routes)
    preview,      // True if in preview mode
    previewData,  // Preview data
    locale,       // Current locale (i18n)
    locales,      // All locales (i18n)
    defaultLocale, // Default locale (i18n)
  } = context;
  
  return { props: {} };
}

// Return options:
export async function getStaticProps() {
  return {
    props: { data },        // Props for component
    revalidate: 60,         // ISR: rebuild every 60s
    notFound: true,         // Show 404 page
    redirect: {             // Redirect to another page
      destination: '/other',
      permanent: false,
    },
  };
}

2. getServerSideProps:
----------------------

// Server-Side Rendering (SSR)
// Runs on every request
// Fresh data every time

// Basic example:
export async function getServerSideProps() {
  // Runs on every request
  const data = await fetchFreshData();
  
  return {
    props: { data },
  };
}

export default function Dashboard({ data }) {
  return <div>{data.value}</div>;
}

// Request flow:
// 1. User requests /dashboard
// 2. Server runs getServerSideProps
// 3. Server fetches data
// 4. Server renders component with data
// 5. Server sends HTML to client
// 6. React hydrates on client

// Context object:
export async function getServerSideProps(context) {
  const {
    params,       // Route parameters
    req,          // HTTP request object
    res,          // HTTP response object
    query,        // Query string
    preview,      // Preview mode
    previewData,  // Preview data
    resolvedUrl,  // Resolved URL
    locale,       // Current locale
    locales,      // All locales
    defaultLocale, // Default locale
  } = context;
  
  // Access cookies
  const token = req.cookies.token;
  
  // Access headers
  const userAgent = req.headers['user-agent'];
  
  // Set headers
  res.setHeader('Cache-Control', 'public, s-maxage=10');
  
  return { props: {} };
}

// Authentication example:
export async function getServerSideProps({ req, res }) {
  const session = await getSession(req);
  
  // Not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  // Fetch user-specific data
  const userData = await fetchUserData(session.user.id);
  
  return {
    props: {
      user: session.user,
      userData,
    },
  };
}

// Return options:
export async function getServerSideProps() {
  return {
    props: { data },        // Props for component
    notFound: true,         // Show 404 page
    redirect: {             // Redirect
      destination: '/other',
      permanent: false,
    },
  };
}

3. getStaticPaths:
------------------

// Required for dynamic routes with getStaticProps
// Tells Next.js which paths to pre-render

// pages/posts/[id].js
export async function getStaticPaths() {
  // Get list of all post IDs
  const posts = await fetchAllPosts();
  
  // Generate paths
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,           // Paths to pre-render
    fallback: false, // false, true, or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  // Fetch data for specific post
  const post = await fetchPost(params.id);
  
  return {
    props: { post },
  };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}

// Build output:
// - Calls getStaticPaths → gets all IDs
// - For each ID, calls getStaticProps
// - Generates HTML for each post
// - /posts/1.html
// - /posts/2.html
// - /posts/3.html

// Fallback Options:

// fallback: false
// - Only paths from getStaticPaths pre-rendered
// - 404 for other paths
export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
    ],
    fallback: false,  // /posts/3 → 404
  };
}

// fallback: true
// - Paths not pre-rendered generated on first request
// - Shows loading/fallback UI while generating
export async function getStaticPaths() {
  // Only pre-render most popular posts
  const popularPosts = await fetchPopularPosts();
  
  const paths = popularPosts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return {
    paths,
    fallback: true,  // Other posts generated on-demand
  };
}

export default function Post({ post }) {
  const router = useRouter();
  
  // Show loading while generating
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return <article>{post.title}</article>;
}

// fallback: 'blocking'
// - Like true, but waits for generation
// - No loading state shown, just waits
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',  // All posts generated on-demand
  };
}

// No need for isFallback check
export default function Post({ post }) {
  return <article>{post.title}</article>;
}

Complete Examples:
------------------

// Example 1: Blog with pagination

// pages/blog/page/[page].js
export async function getStaticPaths() {
  const totalPosts = await getTotalPosts();
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page);
  const postsPerPage = 10;
  
  const posts = await fetchPosts({
    skip: (page - 1) * postsPerPage,
    limit: postsPerPage
  });
  
  const totalPosts = await getTotalPosts();
  
  return {
    props: {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / postsPerPage),
    },
    revalidate: 3600,  // Rebuild every hour
  };
}

export default function BlogPage({ posts, currentPage, totalPages }) {
  return (
    <div>
      {posts.map(post => <Post key={post.id} {...post} />)}
      
      <div>
        {currentPage > 1 && (
          <Link href={`/blog/page/${currentPage - 1}`}>
            <a>Previous</a>
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <a>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
}

// Example 2: User profile with authentication

// pages/users/[id].js
export async function getServerSideProps({ params, req }) {
  const session = await getSession(req);
  
  // Check if user is viewing their own profile
  const isOwnProfile = session?.user?.id === params.id;
  
  // Get public or private data based on auth
  const user = await fetchUser(params.id, { 
    includePrivate: isOwnProfile 
  });
  
  if (!user) {
    return { notFound: true };
  }
  
  return {
    props: {
      user,
      isOwnProfile,
      viewerSession: session,
    },
  };
}

export default function UserProfile({ user, isOwnProfile }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      
      {isOwnProfile && (
        <div>
          <p>Email: {user.email}</p>  {/* Private info * /}
          <Link href="/settings"><a>Edit Profile</a></Link>
        </div>
      )}
    </div>
  );
}

// Example 3: Multi-level dynamic routes

// pages/[category]/[subcategory]/[product].js
export async function getStaticPaths() {
  const categories = await fetchCategories();
  const paths = [];
  
  for (const category of categories) {
    const subcategories = await fetchSubcategories(category.id);
    
    for (const subcategory of subcategories) {
      const products = await fetchProducts(subcategory.id);
      
      for (const product of products) {
        paths.push({
          params: {
            category: category.slug,
            subcategory: subcategory.slug,
            product: product.slug
          }
        });
      }
    }
  }
  
  return {
    paths,
    fallback: 'blocking',  // Generate new products on-demand
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProduct({
    category: params.category,
    subcategory: params.subcategory,
    slug: params.product
  });
  
  if (!product) {
    return { notFound: true };
  }
  
  return {
    props: { product },
    revalidate: 300,  // 5 minutes
  };
}

Comparison:
-----------

// getStaticProps:
// ✅ Runs at build time
// ✅ Pre-renders static HTML
// ✅ Fastest (served from CDN)
// ✅ Perfect SEO
// ❌ Data can be stale
// Use for: Blogs, marketing pages, docs

// getServerSideProps:
// ✅ Runs on every request
// ✅ Always fresh data
// ✅ User-specific content
// ✅ Access to request/response
// ❌ Slower (server renders each request)
// ❌ Can't cache on CDN
// Use for: Dashboards, profiles, real-time data

// getStaticPaths:
// ✅ Defines which dynamic paths to pre-render
// ✅ Works with getStaticProps
// ✅ Fallback options for flexibility
// Use for: Dynamic routes with SSG

Summary:

getStaticProps:
- Build-time data fetching
- Generates static HTML
- Optional ISR with revalidate
- Perfect for content sites

getServerSideProps:
- Request-time data fetching
- Server renders on every request
- Access to request context
- For personalized/real-time content

getStaticPaths:
- Define dynamic routes for SSG
- Works with getStaticProps
- Fallback options for on-demand generation
- For dynamic routes

All run server-side only
Never in client bundle
Enable SSR, SSG, and ISR
*/


