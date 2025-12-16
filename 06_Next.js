/*
=======================================
NEXT.JS INTERVIEW QUESTIONS
=======================================

=======================================
FUNDAMENTAL CONCEPTS
=======================================

1. What is Next.js and what are its key features?
2. What are the differences between SSR (Server-Side Rendering), SSG (Static Site Generation), and CSR (Client-Side Rendering)?
3. Explain the file-based routing system in Next.js
4. What is the difference between the Pages Router and App Router?
5. What is the purpose of _app.js and _document.js files?
6. How does Next.js handle automatic code splitting?
7. What is the difference between getStaticProps, getServerSideProps, and getStaticPaths?
8. Explain the concept of Incremental Static Regeneration (ISR)
9. What is the role of the next/head component?
10. What is the public directory used for in Next.js?

=======================================
RENDERING & DATA FETCHING
=======================================

11. How do you implement dynamic routes in Next.js?
12. Write a Next.js component that uses getStaticPaths for dynamic routes
13. What is the difference between client-side and server-side data fetching?
14. Explain React Server Components in Next.js and when to use them
15. What are the different rendering methods available in Next.js?
16. How does shallow routing work in Next.js?
17. What is the role of React Suspense in Next.js applications?
18. Explain the data fetching strategies in the App Router
19. What is the difference between dynamic and static rendering?
20. How do you implement streaming and suspense in Next.js 13+?

=======================================
ROUTING & NAVIGATION
=======================================

21. What is the difference between next/link and next/router?
22. How do you implement nested routes in Next.js?
23. What are catch-all routes and optional catch-all routes?
24. How do you programmatically navigate in Next.js?
25. Explain route groups in the App Router
26. How do you handle parallel routes in Next.js?
27. What are intercepting routes in Next.js 13+?
28. How do you implement internationalization (i18n) routing?

=======================================
API ROUTES & MIDDLEWARE
=======================================

29. How do you create API routes in Next.js?
30. Write a Next.js API route that returns a JSON response
31. How do you implement middleware in Next.js?
32. What are Next.js API middlewares and how do you implement them?
33. How do you handle authentication in Next.js API routes?
34. What is the Edge Runtime in Next.js and when would you use it?
35. How do you implement custom error handling in Next.js API routes?
36. What is the difference between API routes in Pages Router vs Route Handlers in App Router?

=======================================
OPTIMIZATION & PERFORMANCE
=======================================

37. How do you optimize images in Next.js using next/image?
38. What are the benefits of using the Image component?
39. How do you implement lazy loading in Next.js?
40. What is the difference between dynamic imports and regular imports?
41. How do you optimize fonts in Next.js?
42. What are the best practices for bundle size optimization?
43. How do you implement caching strategies in Next.js?
44. What is the role of Babel and SWC in Next.js?
45. How do you handle memory leaks and performance issues?
46. What are the strategies for handling large datasets?

=======================================
STYLING & UI
=======================================

47. How do you handle CSS in a Next.js application?
48. What is the difference between CSS Modules and global CSS?
49. How do you integrate Tailwind CSS with Next.js?
50. What are styled-jsx and how do they work?
51. How do you implement CSS-in-JS solutions in Next.js?

=======================================
SEO & META TAGS
=======================================

52. How do you optimize SEO in Next.js applications?
53. How do you implement meta tags using next/head?
54. What is the Metadata API in Next.js App Router?
55. How do you implement Open Graph tags?
56. How do you generate dynamic sitemaps in Next.js?
57. How do you implement structured data (JSON-LD)?

=======================================
AUTHENTICATION & SECURITY
=======================================

58. How do you implement authentication in a Next.js application?
59. What is NextAuth.js and how do you use it?
60. How do you protect API routes with authentication?
61. How do you implement role-based access control (RBAC)?
62. How do you handle CSRF protection in Next.js?
63. What are the best practices for handling secrets and sensitive data?

=======================================
ERROR HANDLING & DEBUGGING
=======================================

64. How do you create a custom 404 page?
65. How do you implement custom error pages (_error.js)?
66. How do you handle error boundaries in Next.js?
67. What is error.js in the App Router?
68. How do you debug Next.js applications?

=======================================
DEPLOYMENT & CONFIGURATION
=======================================

69. How do you configure environment variables in Next.js?
70. What are the deployment strategies for Next.js applications?
71. How do you deploy Next.js on Vercel vs other platforms?
72. What is next.config.js and what can you configure?
73. How do you implement custom webpack configuration?
74. How do you set up environment-specific configurations?

=======================================
ADVANCED TOPICS
=======================================

75. How do you implement progressive web app (PWA) features?
76. How do you integrate GraphQL in Next.js applications?
77. How do you handle file uploads in Next.js?
78. What are the strategies for implementing micro-frontends?
79. How do you implement WebSocket connections?
80. How do you integrate a CMS with Next.js?
81. How do you implement A/B testing in Next.js?
82. What are the best practices for organizing code structure in large projects?
83. How do you implement feature flags?
84. What are the benefits and limitations of Next.js for large-scale applications?
85. How do you handle background jobs and scheduled tasks?

=======================================
TESTING
=======================================

86. How do you test Next.js applications?
87. What testing libraries work well with Next.js?
88. How do you test API routes?
89. How do you implement E2E testing in Next.js?
90. What are the testing strategies for Server Components?

=======================================
* /
/*


1. WHAT IS NEXT.JS AND ITS KEY FEATURES?
-----------------------------------------

Next.js is a React framework that gives you a full application runtime: routing, data fetching, rendering modes, and backend APIs, all in one project. It sits on top of React and solves common web app problems like SEO, performance, and deployment. Core features include:

- Multiple rendering modes (SSR, SSG, ISR, CSR) so you can choose per page how it should be rendered.
- File-based routing, so your folder and file structure becomes your URL structure.
- Built-in API routes so you can create backend endpoints without a separate server.
- Automatic code splitting and optimization for JavaScript, images, and fonts.
- First-class TypeScript support, fast refresh in development, and easy deployment (especially to Vercel).


2. DIFFERENCES BETWEEN SSR, SSG, AND CSR
-----------------------------------------


All three describe *when* and *where* HTML is generated:

- SSR (Server-Side Rendering): HTML is generated on the server on every request. Good when data must be always fresh or personalized, like dashboards or user-specific pages. Tradeoff is higher server cost and slightly slower first response.
- SSG (Static Site Generation): HTML is generated at build time and served as static files. Great for content that doesn’t change often (blogs, docs, marketing pages). Delivers best performance and scalability, but content is “frozen” until you rebuild (unless you add ISR).
- CSR (Client-Side Rendering): Server initially sends a minimal HTML shell, and the browser downloads JavaScript and fetches data to render UI. It’s closest to a pure React SPA. You get a very dynamic app, but initial load and SEO can be worse compared to SSR/SSG.


3. FILE-BASED ROUTING SYSTEM IN NEXT.JS
-----------------------------------------

Next.js turns your filesystem into a router, so you don’t manually configure routes:

- In the old *Pages Router* (pages/):
  - pages/index.js → /
  - pages/about.js → /about
  - pages/blog/[slug].js → /blog/my-post (slug = "my-post")
  - pages/blog/[...segments].js → /blog/a/b/c (catch-all)
  - pages/api/* → /api/* (backend endpoints)
- In the newer *App Router* (app/):
  - app/page.js → /
  - app/about/page.js → /about
  - app/blog/[slug]/page.js → /blog/my-post

Dynamic routes are declared with [param] in the filename, and nested folders create nested routes automatically, which makes structure and URLs tightly aligned.


4. DIFFERENCE BETWEEN PAGES ROUTER AND APP ROUTER
---------------------------------------------------

- Pages Router (pages/):
  - Older, battle-tested API available in Next.js 12 and earlier (and still supported).
  - Data-fetching via getStaticProps, getServerSideProps, getStaticPaths.
  - Uses _app.js and _document.js for global layout and document customization.
  - Mostly client components, with server rendering handled “around” them.

- App Router (app/):
  - Introduced in Next.js 13 and built around React Server Components.
  - Uses layout.js, page.js, loading.js, error.js to define nested layouts, loading states, and error boundaries per route segment.
  - Data fetching is done directly in Server Components using async functions, and caching is built into the framework.
  - Supports advanced patterns like parallel routes, intercepting routes, and streaming HTML to the client.

App Router is the future direction of Next.js, offering better performance and structure, but Pages Router is simpler and still widely used.


5. PURPOSE OF _app.js AND _document.js FILES
----------------------------------------------

These are specific to the *Pages Router*:

- _app.js:
  - Wraps every page component, so it’s the right place for global layout and providers (Redux, React Query, theme providers, etc).
  - Runs on both server and client.
  - You can inject global props or layout that persists during navigation (e.g., a navbar, footer).

- _document.js:
  - Only rendered on the server and controls the HTML document skeleton: <html>, <head>, and <body>.
  - Good place for adding custom lang attributes, global meta tags, or external font/script tags that must be in the initial HTML.
  - Does not re-run on client-side navigation; it’s evaluated once on initial load.


6. HOW NEXT.JS HANDLES AUTOMATIC CODE SPLITTING
------------------------------------------------

Code splitting means shipping only the JavaScript needed for the current page:

- Each page in pages/ (or route segment in app/) becomes its own bundle.
- Shared dependencies are extracted into common chunks that can be cached.
- Dynamic imports (dynamic(() => import('...'))) create additional lazy-loaded chunks.
- This reduces the initial bundle size, speeds up first load, and improves performance scores automatically.
- Developers rarely need to configure this manually; it’s part of the framework’s build pipeline.


7. DIFFERENCE BETWEEN getStaticProps, getServerSideProps, AND getStaticPaths
------------------------------------------------------------------------------

These APIs are used in the *Pages Router*:

- getStaticProps:
  - Runs at build time (or at revalidation time with ISR).
  - Produces static HTML + JSON that can be cached by a CDN.
  - Great for pages whose data doesn’t change per request (e.g., blog posts, category pages).
  - Can specify revalidate to periodically refresh the static page.

- getServerSideProps:
  - Runs on every request on the server.
  - Always returns fresh data and can use request-specific context (cookies, headers, auth).
  - Good for per-user or frequently changing data.
  - Trades performance and cost for freshness and personalization.

- getStaticPaths:
  - Used *together* with getStaticProps for dynamic routes (like [slug].js).
  - Tells Next.js which dynamic paths to generate at build time.
  - fallback (false/true/'blocking') controls what happens for paths not generated during build.
  - This is necessary so Next.js knows which URLs to pre-render when variables are in the path.


8. CONCEPT OF INCREMENTAL STATIC REGENERATION (ISR)
----------------------------------------------------

ISR lets you keep using static generation while still updating content over time:

- Pages are generated once at build time and stored as static files.
- You set revalidate on getStaticProps to define how often the page may be refreshed (in seconds).
- After a user requests the page and the revalidate period has passed:
  - Next.js serves the existing static HTML (so users never see a broken page).
  - In the background, it regenerates the page with fresh data.
  - The next request after regeneration gets the updated HTML.
- This model combines:
  - The speed and CDN-friendliness of SSG.
  - The “eventual freshness” of SSR, without running on every request.


9. ROLE OF next/head COMPONENT
---------------------------------

next/head is a React component for adding elements into the <head> of the document from within a specific page:

- It allows per-page control over:
  - <title>, description, viewport, and SEO meta tags.
  - Open Graph and Twitter cards for social sharing.
  - Link tags (favicons, preconnect, fonts).
- Multiple Head components on a page are merged, and where conflicts occur (e.g., title), the last one wins.
- It’s crucial for SEO and accessibility because it lets each page expose meaningful metadata.
- In the App Router, similar responsibilities are managed with the Metadata API and special exports instead of next/head, but conceptually it’s the same idea: controlling the <head> on a per-route basis.


10. PUBLIC DIRECTORY USAGE IN NEXT.JS
--------------------------------------

The public/ folder is a passthrough for static assets that should be served as-is:

- Any file in public/ is available at the root of the site:
  - public/favicon.ico → /favicon.ico
  - public/robots.txt → /robots.txt
  - public/images/banner.png → /images/banner.png
- No bundling or hashing is done for these files; they are served directly.
- You typically put:
  - Robots and sitemap files, icons, manifest.json (for PWAs).
  - Legacy assets that must have a fixed URL.
- In components, you reference them with absolute paths from root:
  - <img src="/images/banner.png" alt="Banner" />
- For images, you often prefer the next/image component with /public paths so you get optimization, but the underlying file still lives in public/.

* /



/*
=======================================
RENDERING & DATA FETCHING - ANSWERS
=======================================

11. HOW DO YOU IMPLEMENT DYNAMIC ROUTES IN NEXT.JS?
----------------------------------------------------

Dynamic routes allow you to create pages with variable URL segments using square brackets in filenames. [web:26][web:27][web:30]

Pages Router (pages/ directory):
- Create a file with brackets: pages/blog/[slug].js → matches /blog/any-slug
- Access the dynamic parameter using useRouter or in getStaticProps/getServerSideProps

Example:
// pages/blog/[slug].js
import { useRouter } from 'next/router'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  return <h1>Post: {slug}</h1>
}

App Router (app/ directory): [web:27][web:30]
- Create a folder with brackets: app/blog/[slug]/page.js
- Access parameters using useParams hook or params prop

Example:
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>
}

Advanced patterns:
- Catch-all routes: [slug] → /blog/a, [...slug] → /blog/a/b/c
- Optional catch-all: [[...slug]] → matches both /blog and /blog/a/b/c
- Multiple dynamic segments: app/[category]/[productId]/page.js



12. NEXT.JS COMPONENT USING getStaticPaths FOR DYNAMIC ROUTES
----------------------------------------------------------------

getStaticPaths works with getStaticProps to pre-render dynamic routes at build time. [web:26][web:33]

Example - Blog Posts:
// pages/blog/[slug].js

export async function getStaticPaths() {
  // Fetch list of all blog post slugs
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  
  // Generate paths for each post
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))
  
  return {
    paths,
    fallback: false // or true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  // Fetch specific post data using the slug
  const res = await fetch(`https://api.example.com/posts/${params.slug}`)
  const post = await res.json()
  
  return {
    props: { post },
    revalidate: 60 // ISR - regenerate every 60 seconds
  }
}

export default function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}

Fallback options:
- false: Only paths returned from getStaticPaths exist, 404 for others
- true: Paths not generated at build time will be generated on first request (shows fallback state initially)
- 'blocking': Like true but waits for generation before showing page (no fallback UI)


13. DIFFERENCE BETWEEN CLIENT-SIDE AND SERVER-SIDE DATA FETCHING
------------------------------------------------------------------

Server-Side Data Fetching:
- Data fetched on the server before sending HTML to the client
- Happens during build time (getStaticProps) or request time (getServerSideProps)
- Can access databases, APIs, file systems directly
- Can use sensitive API keys safely
- Better SEO as content is in initial HTML
- Users see fully rendered content immediately
- In App Router, done with async Server Components

Example (Server):
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data', {
    headers: { 'API-Key': process.env.SECRET_KEY }
  })
  return { props: { data } }
}

Client-Side Data Fetching: [web:31][web:34]
- Data fetched in the browser after initial page load
- Uses useEffect, SWR, React Query, or other client libraries
- Good for user-specific data, dashboards, interactive features
- Data not available for SEO (not in initial HTML)
- Can cause loading states and layout shifts
- Useful when data changes frequently or is personalized

Example (Client):
import { useEffect, useState } from 'react'

function Dashboard() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/user-data')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  if (!data) return <div>Loading...</div>
  return <div>{data.name}</div>
}

When to use each:
- Server: SEO-critical content, public data, initial page load
- Client: User interactions, real-time updates, authenticated data



14. REACT SERVER COMPONENTS IN NEXT.JS AND WHEN TO USE THEM
-------------------------------------------------------------


React Server Components (RSC) are components that render only on the server and never send JavaScript to the client. [web:31][web:34]

Key characteristics:
- Default in Next.js App Router (app/ directory)
- Can directly access databases, file systems, server-only APIs
- Cannot use React hooks (useState, useEffect, etc.)
- Cannot handle browser events (onClick, onChange, etc.)
- Can be async and await data directly
- Reduce client-side JavaScript bundle size

Example Server Component:
// app/posts/page.js (Server Component by default)
async function getPosts() {
  const posts = await db.posts.findMany()
  return posts
}

export default async function PostsPage() {
  const posts = await getPosts() // Direct database access
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}

Client Components (marked with 'use client'): [web:31][web:34]
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

When to use Server Components:
- Fetching data from databases or APIs
- Accessing server-only resources
- Keeping large dependencies on server (reduce bundle size)
- Rendering static content

When to use Client Components:
- Need interactivity (onClick, onChange, etc.)
- Need React hooks (useState, useEffect, useContext)
- Need browser APIs (localStorage, window, etc.)
- Need event listeners

Best practice: Use Server Components by default, switch to Client Components only when needed

=======================================
15. DIFFERENT RENDERING METHODS AVAILABLE IN NEXT.JS
-----------------------------------------------------


Next.js supports multiple rendering strategies that can be mixed per page:

1. Static Site Generation (SSG):
   - Pre-renders pages at build time
   - Uses getStaticProps in Pages Router
   - Default in App Router for routes without dynamic data
   - Best for: Blogs, marketing pages, documentation

2. Server-Side Rendering (SSR):
   - Renders page on each request
   - Uses getServerSideProps in Pages Router
   - In App Router, use dynamic functions (cookies(), headers())
   - Best for: Personalized content, frequently changing data

3. Incremental Static Regeneration (ISR):
   - Static generation with periodic updates
   - Uses revalidate in getStaticProps
   - Updates pages in background without rebuild
   - Best for: E-commerce, news sites

4. Client-Side Rendering (CSR):
   - Renders in browser after initial load
   - No getStaticProps or getServerSideProps
   - Fetches data with useEffect or data-fetching libraries
   - Best for: Dashboards, admin panels, authenticated pages

5. Streaming SSR (App Router):
   - Streams HTML to client as it's generated
   - Uses Suspense boundaries
   - Shows partial content while rest loads
   - Best for: Large pages with independent sections

Example combining methods:
export async function getStaticProps() {
  const staticData = await fetchStaticData()
  return {
    props: { staticData },
    revalidate: 3600 // ISR: Update every hour
  }
}

function Page({ staticData }) {
  const [clientData, setClientData] = useState(null)
  
  useEffect(() => {
    // Client-side data fetching
    fetchUserData().then(setClientData)
  }, [])
  
  return <div>{/* Render both static and client data * /}</div>
}



16. HOW SHALLOW ROUTING WORKS IN NEXT.JS
-----------------------------------------

Shallow routing allows you to change the URL without re-running data fetching methods (getStaticProps, getServerSideProps, etc.).

It only updates the URL and router state without triggering a full page navigation.

Example using router.push:
import { useRouter } from 'next/router'

function FilterComponent() {
  const router = useRouter()
  
  const updateFilter = (filter) => {
    // Shallow route - doesn't trigger getServerSideProps
    router.push({
      pathname: '/products',
      query: { filter }
    }, undefined, { shallow: true })
  }
  
  return (
    <button onClick={() => updateFilter('electronics')}>
      Filter Electronics
    </button>
  )
}

Use cases:
- Updating query parameters for filtering/sorting
- Tracking UI state in URL without refetching data
- Preserving component state during URL changes
- Implementing tabs or pagination without reload

Limitations:
- Only works for same page URL changes
- Doesn't work with different paths
- router.query updates but page doesn't re-render automatically
- Need to listen to router events for UI updates

Listening to shallow changes:
useEffect(() => {
  const handleRouteChange = (url) => {
    console.log('Shallow route changed to:', url)
  }
  
  router.events.on('routeChangeComplete', handleRouteChange)
  return () => router.events.off('routeChangeComplete', handleRouteChange)
}, [])

Note: Shallow routing is specific to Pages Router; App Router uses different patterns with useSearchParams.



17. ROLE OF REACT SUSPENSE IN NEXT.JS APPLICATIONS
---------------------------------------------------

React Suspense allows you to show fallback UI while waiting for components or data to load. [web:35]

In Next.js App Router, Suspense is deeply integrated for streaming and loading states.

Basic usage:
import { Suspense } from 'react'
import Loading from './loading'
import Posts from './Posts'

export default function Page() {
  return (
    <div>
      <h1>My Blog</h1>
      <Suspense fallback={<Loading />}>
        <Posts />
      </Suspense>
    </div>
  )
}

Benefits:
- Show immediate feedback while data loads
- Prevent blocking the entire page render
- Stream content as it becomes ready
- Better perceived performance
- Granular loading states for different page sections

Multiple Suspense boundaries: [web:35]
export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<ChartSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <RecentOrders />
      </Suspense>
    </div>
  )
}

Each section loads independently, showing its own fallback until ready.

With async Server Components:
// Posts component (Server Component)
async function Posts() {
  const posts = await fetchPosts() // This can be awaited
  return posts.map(post => <Post key={post.id} {...post} />)
}

Suspense catches the async operation and shows fallback until resolved.

Use cases:
- Loading states for data fetching
- Code splitting with lazy loading
- Streaming server-rendered content
- Progressive page rendering



18. DATA FETCHING STRATEGIES IN THE APP ROUTER
---------------------------------------------------

The App Router introduces new patterns for data fetching with Server Components:

1. Server Component Data Fetching (Default):
   - Fetch data directly in async components
   - No need for getStaticProps or getServerSideProps
   
   async function BlogPosts() {
     const posts = await fetch('https://api.example.com/posts')
       .then(res => res.json())
     return <div>{posts.map(/*...* /)}</div>
   }

2. Parallel Data Fetching:
   - Fetch multiple data sources simultaneously
   
   async function Page() {
     const [users, posts] = await Promise.all([
       fetchUsers(),
       fetchPosts()
     ])
     return <div>{/* render * /}</div>
   }

3. Sequential Data Fetching:
   - Fetch data that depends on previous results
   
   async function Page({ params }) {
     const user = await fetchUser(params.id)
     const posts = await fetchUserPosts(user.id) // Depends on user
     return <div>{/* render * /}</div>
   }

4. Streaming with Suspense: [web:32][web:35]
   - Load and display parts of page progressively
   
   export default function Page() {
     return (
       <div>
         <Suspense fallback={<Loading />}>
           <SlowComponent />
         </Suspense>
       </div>
     )
   }

5. Client-Side Fetching:
   - Use 'use client' with hooks
   
   'use client'
   import { useEffect, useState } from 'react'
   
   export default function ClientData() {
     const [data, setData] = useState(null)
     useEffect(() => {
       fetch('/api/data').then(res => res.json()).then(setData)
     }, [])
     return <div>{data?.content}</div>
   }

Caching behavior:
- fetch() requests are cached by default
- Use { cache: 'no-store' } for dynamic data
- Use { next: { revalidate: 60 } } for ISR-like behavior

Examples:
// Cached (static)
const data = await fetch('https://api.example.com/data')

// Not cached (dynamic)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// Revalidated periodically
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
})

=======================================

19. DIFFERENCE BETWEEN DYNAMIC AND STATIC RENDERING
------------------------------------------------------

Static Rendering:
- Routes are rendered at build time (or during revalidation)
- Result is cached and served to all users
- Fastest performance, served from CDN
- Default behavior in App Router
- Good for pages where data doesn't change per request

Characteristics:
- HTML generated once during build
- Same HTML served to everyone
- Data can be revalidated periodically (ISR)
- No access to request-specific data (cookies, headers)

Example:
// This is statically rendered by default
export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <div>{data.content}</div>
}

Dynamic Rendering:
- Routes are rendered at request time
- Different for each request/user
- Can access request-specific data
- Triggered by dynamic functions or dynamic segments

What makes a route dynamic:
- Using cookies(), headers(), or searchParams
- Using unstable_noStore() or cache: 'no-store'
- Having dynamic segments with no generateStaticParams

Example:
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies() // Makes route dynamic
  const theme = cookieStore.get('theme')
  return <div>Theme: {theme}</div>
}

Force dynamic rendering:
export const dynamic = 'force-dynamic'

export default async function Page() {
  return <div>Always rendered per request</div>
}

Key differences:
- Static: Build time, cached, same for all, faster
- Dynamic: Request time, personalized, slower, flexible

=======================================

20. IMPLEMENTING STREAMING AND SUSPENSE IN NEXT.JS 13+
-------------------------------------------------------

Streaming allows sending HTML to the client progressively rather than waiting for entire page. [web:32][web:35]

How it works:
1. Next.js sends initial HTML shell immediately
2. Server Components render and stream results as ready
3. Client receives and displays content progressively
4. JavaScript hydrates interactive components

Basic implementation:
// app/page.js
import { Suspense } from 'react'

async function SlowData() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const data = await fetchData()
  return <div>{data}</div>
}

export default function Page() {
  return (
    <div>
      <h1>Page Title</h1>
      {/* This content shows immediately * /}
      
      <Suspense fallback={<div>Loading data...</div>}>
        <SlowData /> {/* Streams in after 3 seconds * /}
      </Suspense>
    </div>
  )
}

Multiple streaming sections: [web:35]
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Each section streams independently * /}
      <Suspense fallback={<Skeleton type="user" />}>
        <UserProfile />
      </Suspense>
      
      <Suspense fallback={<Skeleton type="chart" />}>
        <AnalyticsChart />
      </Suspense>
      
      <Suspense fallback={<Skeleton type="table" />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}

Loading UI pattern:
// app/dashboard/loading.js
export default function Loading() {
  return <div>Loading dashboard...</div>
}

// Automatically wrapped in Suspense by Next.js

Nested layouts with streaming:
// app/layout.js
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Header /> {/* Shows immediately * /}
        <Suspense fallback={<div>Loading...</div>}>
          {children} {/* Streams when ready * /}
        </Suspense>
      </body>
    </html>
  )
}

Benefits:
- Users see content faster (above-the-fold content first)
- Better perceived performance
- Partial interactivity while rest loads
- Prevents blocking on slow data sources
- Improved Core Web Vitals scores

Note: Streaming only works with Server Components and requires proper Suspense boundaries for optimal UX.

=======================================
* /



/*
=======================================
ROUTING & NAVIGATION - ANSWERS
=======================================

21. DIFFERENCE BETWEEN next/link AND next/router
--------------------------------------------------

next/link and next/router are two different tools for navigation in Next.js. [web:36][web:37][web:40]

next/link Component:
- Declarative navigation component used in JSX
- Wraps anchor tags for client-side navigation
- Automatically prefetches linked pages in viewport
- Best for creating clickable navigation elements
- SEO-friendly (crawlers can detect links)
- Supports hover prefetching
- No full page reload

Example:
import Link from 'next/link'

function Navigation() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
    </nav>
  )
}

next/router (Pages Router) / useRouter (App Router):
- Imperative navigation using JavaScript
- Access to router object and methods
- Used for programmatic navigation
- Handle navigation in event handlers
- Access route information (pathname, query, etc.)
- Cannot be used in Server Components (App Router)

Pages Router Example:
import { useRouter } from 'next/router'

function LoginButton() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await loginUser()
    router.push('/dashboard') // Programmatic navigation
  }
  
  return <button onClick={handleLogin}>Login</button>
}

App Router Example:
'use client'
import { useRouter } from 'next/navigation'

function Component() {
  const router = useRouter()
  
  return <button onClick={() => router.push('/page')}>Go</button>
}

Key differences: [web:40]
- Link: Declarative, component-based, used in JSX markup
- useRouter: Imperative, hook-based, used in event handlers
- Link: Better for SEO and prefetching
- useRouter: Better for conditional navigation and accessing route data

When to use each:
- Use Link for standard navigation links
- Use useRouter when navigation depends on logic/events

=======================================

22. IMPLEMENTING NESTED ROUTES IN NEXT.JS
--------------------------------------------

Nested routes are created by nesting folders in the file system.

Pages Router (pages/ directory):
- Create nested folder structure
- Each folder can have an index.js for the base route

Structure:
pages/
  blog/
    index.js → /blog
    [slug].js → /blog/:slug
    categories/
      index.js → /blog/categories
      [category].js → /blog/categories/:category

Example:
// pages/blog/index.js
export default function Blog() {
  return <h1>Blog Home</h1>
}

// pages/blog/categories/[category].js
import { useRouter } from 'next/router'

export default function Category() {
  const router = useRouter()
  const { category } = router.query
  return <h1>Category: {category}</h1>
}

App Router (app/ directory):
- Nested folders with page.js files
- Supports nested layouts that persist

Structure:
app/
  blog/
    page.js → /blog
    layout.js → Layout for /blog/*
    [slug]/
      page.js → /blog/:slug
    categories/
      page.js → /blog/categories
      [category]/
        page.js → /blog/categories/:category

Example with Nested Layouts:
// app/blog/layout.js
export default function BlogLayout({ children }) {
  return (
    <div>
      <nav>Blog Navigation</nav>
      {children} {/* Nested pages render here * /}
    </div>
  )
}

// app/blog/page.js
export default function BlogPage() {
  return <h1>Blog Home</h1>
}

// app/blog/categories/[category]/page.js
export default function CategoryPage({ params }) {
  return <h1>Category: {params.category}</h1>
}

Benefits of nested routes in App Router:
- Layouts wrap all child routes automatically
- Shared UI persists during navigation
- Loading states can be per-segment
- Error boundaries can be nested

=======================================

23. CATCH-ALL ROUTES AND OPTIONAL CATCH-ALL ROUTES
---------------------------------------------------

Catch-all routes match multiple URL segments using special bracket syntax.

Catch-All Routes [...slug]:
- Matches one or more path segments
- Access segments as an array
- Does NOT match the base path

Pages Router Example:
// pages/docs/[...slug].js
import { useRouter } from 'next/router'

export default function Docs() {
  const router = useRouter()
  const { slug } = router.query // slug is an array
  
  return <div>Path: {slug?.join('/')}</div>
}

Matches:
/docs/introduction → slug = ['introduction']
/docs/api/authentication → slug = ['api', 'authentication']
/docs/a/b/c/d → slug = ['a', 'b', 'c', 'd']

Does NOT match:
/docs → 404 error

Optional Catch-All Routes [[...slug]]:
- Matches zero or more path segments
- Matches the base path as well
- More flexible than regular catch-all

Pages Router Example:
// pages/docs/[[...slug]].js
export default function Docs() {
  const router = useRouter()
  const { slug } = router.query
  
  // slug can be undefined for base route
  const path = slug ? slug.join('/') : 'home'
  return <div>Path: {path}</div>
}

Matches:
/docs → slug = undefined
/docs/introduction → slug = ['introduction']
/docs/api/authentication → slug = ['api', 'authentication']

App Router Example:
// app/shop/[[...slug]]/page.js
export default function Shop({ params }) {
  const path = params.slug ? params.slug.join('/') : 'all'
  return <h1>Shop: {path}</h1>
}

Use cases:
- Documentation sites with deep nesting
- File browsers
- E-commerce category pages
- CMS content with variable depth
- Multi-level navigation

With getStaticPaths:
export async function getStaticPaths() {
  const paths = [
    { params: { slug: ['getting-started'] } },
    { params: { slug: ['api', 'routes'] } },
    { params: { slug: ['api', 'middleware', 'cors'] } }
  ]
  
  return { paths, fallback: false }
}

=======================================

24. PROGRAMMATIC NAVIGATION IN NEXT.JS
---------------------------------------

Programmatic navigation allows redirecting users via JavaScript code instead of links.

Pages Router (next/router):
import { useRouter } from 'next/router'

function Component() {
  const router = useRouter()
  
  // Basic navigation
  const goToAbout = () => {
    router.push('/about')
  }
  
  // With query parameters
  const goToProduct = (id) => {
    router.push({
      pathname: '/products/[id]',
      query: { id }
    })
  }
  
  // Replace instead of push (no history entry)
  const replaceRoute = () => {
    router.replace('/new-page')
  }
  
  // Go back
  const goBack = () => {
    router.back()
  }
  
  // Reload current route
  const refresh = () => {
    router.reload()
  }
  
  // Shallow routing (no data refetch)
  const shallowNav = () => {
    router.push('/current?filter=new', undefined, { shallow: true })
  }
  
  return <button onClick={goToAbout}>Navigate</button>
}

App Router (next/navigation):
'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function Component() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Basic navigation
  const navigate = () => {
    router.push('/dashboard')
  }
  
  // Replace (no history)
  const replaceNav = () => {
    router.replace('/login')
  }
  
  // Go back
  const goBack = () => {
    router.back()
  }
  
  // Go forward
  const goForward = () => {
    router.forward()
  }
  
  // Refresh current route
  const refresh = () => {
    router.refresh()
  }
  
  // Prefetch a route
  const prefetch = () => {
    router.prefetch('/heavy-page')
  }
  
  return <button onClick={navigate}>Go</button>
}

Server-side redirects:
// In Server Components or API routes
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login') // Server-side redirect
  }
  
  return <div>Welcome {user.name}</div>
}

Common use cases:
- Form submission redirects
- Authentication flows
- Conditional navigation based on logic
- Post-action redirects
- Multi-step wizards

=======================================

25. ROUTE GROUPS IN THE APP ROUTER
-----------------------------------

Route groups allow organizing routes without affecting the URL structure. [web:41]

Created using parentheses (folder-name) - the folder name is excluded from the URL.

Basic Example:
app/
  (marketing)/
    page.js → /
    about/
      page.js → /about
    pricing/
      page.js → /pricing
  (shop)/
    products/
      page.js → /products
    cart/
      page.js → /cart

The (marketing) and (shop) folders don't appear in URLs - they're just for organization.

Use Case 1: Multiple Layouts
app/
  (auth)/
    layout.js → Auth layout (minimal UI)
    login/
      page.js → /login
    register/
      page.js → /register
  (dashboard)/
    layout.js → Dashboard layout (sidebar, header)
    overview/
      page.js → /overview
    settings/
      page.js → /settings

// app/(auth)/layout.js
export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <SimpleHeader />
      {children}
    </div>
  )
}

// app/(dashboard)/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Header />
      {children}
    </div>
  )
}

Use Case 2: Multiple Root Layouts
app/
  (main)/
    layout.js → Root layout for main site
    page.js → /
  (admin)/
    layout.js → Different root layout for admin
    page.js → /admin

This allows completely different HTML structure (<html>, <body>) for different sections.

Use Case 3: Organization
app/
  (routes)/
    (public)/
      about/
      contact/
    (protected)/
      dashboard/
      profile/

Benefits:
- Better code organization
- Multiple layouts without URL nesting
- Opt routes into specific layouts
- Split application into logical sections
- No impact on URL structure or SEO

=======================================

26. HANDLING PARALLEL ROUTES IN NEXT.JS
----------------------------------------

Parallel routes allow rendering multiple pages in the same layout simultaneously. [web:41]

Created using @folder naming convention - slots that can be rendered in parallel.

Basic Structure:
app/
  @team/
    page.js
  @analytics/
    page.js
  layout.js
  page.js

// app/layout.js
export default function Layout({ children, team, analytics }) {
  return (
    <div>
      <div>{children}</div>
      <div className="sidebar">
        {team}
        {analytics}
      </div>
    </div>
  )
}

Each @slot becomes a prop in the layout and renders independently.

Dashboard Example:
app/
  dashboard/
    @user/
      page.js → User info slot
    @analytics/
      page.js → Analytics slot
    @notifications/
      page.js → Notifications slot
    layout.js
    page.js

// app/dashboard/layout.js
export default function DashboardLayout({
  children,
  user,
  analytics,
  notifications
}) {
  return (
    <div className="dashboard">
      <header>{user}</header>
      <main>{children}</main>
      <aside>
        {analytics}
        {notifications}
      </aside>
    </div>
  )
}

Conditional Rendering:
export default function Layout({ children, admin, user }) {
  const isAdmin = checkAdmin()
  
  return (
    <div>
      {children}
      {isAdmin ? admin : user}
    </div>
  )
}

Loading States per Slot:
app/
  dashboard/
    @analytics/
      page.js
      loading.js → Loading UI for analytics only
    @user/
      page.js
      loading.js → Loading UI for user only

Each slot can have its own loading.js and error.js.

Use Cases:
- Dashboard with multiple independent sections
- Split views (email list + email content)
- Modals that maintain background context
- Conditional UI based on user role
- Independent data fetching per section

Benefits:
- Each slot loads independently with Suspense
- Better loading states (granular)
- Independent error boundaries
- Allows streaming different sections at different speeds

=======================================

27. INTERCEPTING ROUTES IN NEXT.JS 13+
---------------------------------------

Intercepting routes allow loading content from another route while keeping the current page context. [web:41]

Used primarily for modals, where clicking a link shows a modal instead of navigating.

Conventions for intercepting:
(.) - Same level
(..) - One level above
(..)(..) - Two levels above
(...) - From root app directory

Example - Photo Modal:
app/
  feed/
    page.js
    (..)photo/
      [id]/
        page.js → Intercepts /photo/[id] when navigating from /feed
  photo/
    [id]/
      page.js → Direct navigation to /photo/[id]

Flow:
1. User on /feed clicks link to /photo/123
2. Intercepting route (..)photo/[id]/page.js renders as modal
3. URL becomes /photo/123 (shareable)
4. If user refreshes, regular /photo/[id]/page.js loads
5. Direct navigation to /photo/123 uses regular route

Implementation:
// app/feed/(..)photo/[id]/page.js
import Modal from '@/components/modal'
import Photo from '@/components/photo'

export default function PhotoModal({ params }) {
  return (
    <Modal>
      <Photo id={params.id} />
    </Modal>
  )
}

// app/photo/[id]/page.js
import Photo from '@/components/photo'

export default function PhotoPage({ params }) {
  return (
    <div>
      <Photo id={params.id} />
    </div>
  )
}

Modal Component with Router:
'use client'
import { useRouter } from 'next/navigation'

export default function Modal({ children }) {
  const router = useRouter()
  
  return (
    <div className="modal-backdrop" onClick={() => router.back()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => router.back()}>Close</button>
        {children}
      </div>
    </div>
  )
}

Combined with Parallel Routes:
app/
  @modal/
    (..)photo/
      [id]/
        page.js
  photo/
    [id]/
      page.js
  layout.js

// app/layout.js
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}

Use Cases:
- Image galleries with modal preview
- Login/signup modals
- Share dialogs
- Quick view for products
- Video players that maintain context

Benefits:
- Shareable URLs even for modals
- Works on refresh (falls back to full page)
- Maintains page context
- Better UX for navigation

=======================================

28. IMPLEMENTING INTERNATIONALIZATION (i18n) ROUTING
------------------------------------------------------

i18n routing allows serving content in multiple languages based on URL structure. [web:42][web:45]

Pages Router (Built-in i18n):
Next.js has built-in i18n support in Pages Router.

Configuration:
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es', 'de'],
    defaultLocale: 'en',
    localeDetection: true, // Auto-detect from browser
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en'
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr'
      }
    ]
  }
}

URL Strategies:
1. Sub-path routing:
   - /en/about
   - /fr/about
   - /es/about

2. Domain routing:
   - example.com/about (English)
   - example.fr/about (French)

Accessing locale in components:
import { useRouter } from 'next/router'

function Component() {
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  
  const changeLocale = (newLocale) => {
    router.push(router.pathname, router.asPath, { locale: newLocale })
  }
  
  return (
    <div>
      <p>Current: {locale}</p>
      <button onClick={() => changeLocale('fr')}>Français</button>
      <button onClick={() => changeLocale('es')}>Español</button>
    </div>
  )
}

App Router (Custom Implementation):
App Router doesn't have built-in i18n, so use middleware and libraries. [web:45]

Using next-i18n-router library:
1. Install:
   npm install next-i18n-router

2. Create config:
   // i18nConfig.js
   const i18nConfig = {
     locales: ['en', 'fr', 'es'],
     defaultLocale: 'en'
   }
   export default i18nConfig

3. Setup middleware:
   // middleware.js
   import { i18nRouter } from 'next-i18n-router'
   import i18nConfig from './i18nConfig'
   
   export function middleware(request) {
     return i18nRouter(request, i18nConfig)
   }
   
   export const config = {
     matcher: '/((?!api|static|.*\\..*|_next).*)'
   }

4. Structure routes with locale:
   app/
     [locale]/
       layout.js
       page.js
       about/
         page.js

5. Layout with locale validation:
   import { notFound } from 'next/navigation'
   import i18nConfig from '@/i18nConfig'
   
   export default function RootLayout({ children, params: { locale } }) {
     if (!i18nConfig.locales.includes(locale)) {
       notFound()
     }
     
     return (
       <html lang={locale}>
         <body>{children}</body>
       </html>
     )
   }

Using translations:
// With react-i18next
import { useTranslation } from 'react-i18next'

function Component() {
  const { t } = useTranslation()
  
  return <h1>{t('welcome_message')}</h1>
}

Language switcher:
'use client'
import { useRouter, usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  
  const changeLanguage = (locale) => {
    const segments = pathname.split('/')
    segments[1] = locale // Replace locale segment
    router.push(segments.join('/'))
  }
  
  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="es">Español</option>
    </select>
  )
}

Best practices:
- Store translations in JSON files per locale
- Use libraries like react-i18next or react-intl
- Implement locale detection from browser headers
- Set lang attribute on <html> element
- Provide hreflang tags for SEO
- Cache translations for performance

=======================================
* /


/*
=======================================
API ROUTES & MIDDLEWARE - ANSWERS
=======================================

29. HOW DO YOU CREATE API ROUTES IN NEXT.JS?
---------------------------------------------

API routes allow you to build backend API endpoints within your Next.js application. [web:46][web:48]

Pages Router (pages/api/):
- Create files in pages/api/ directory
- Each file becomes an API endpoint
- File path determines the URL
- Export a default handler function

Structure:
pages/
  api/
    hello.js → /api/hello
    users/
      index.js → /api/users
      [id].js → /api/users/:id
    posts/
      [...slug].js → /api/posts/* (catch-all)

Basic API Route:
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' })
}

With HTTP Methods:
// pages/api/users.js
export default function handler(req, res) {
  const { method } = req
  
  switch (method) {
    case 'GET':
      return res.status(200).json({ users: [] })
    case 'POST':
      return res.status(201).json({ success: true })
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res.status(405).end(`Method ${method} Not Allowed`)
  }
}

Dynamic API Routes: [web:46]
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query
  res.status(200).json({ userId: id })
}

App Router (app/api/):
- Create route.js (or route.ts) files
- Use HTTP method functions (GET, POST, PUT, DELETE, etc.)
- Called "Route Handlers" [web:52][web:55]

Structure:
app/
  api/
    hello/
      route.js → /api/hello
    users/
      route.js → /api/users
      [id]/
        route.js → /api/users/:id

Route Handler Example:
// app/api/hello/route.js
import { NextResponse } from 'next/server'

export async function GET(request) {
  return NextResponse.json({ message: 'Hello from API' })
}

export async function POST(request) {
  const body = await request.json()
  return NextResponse.json({ received: body }, { status: 201 })
}

API routes are serverless functions deployed separately and run on the server only.

=======================================

30. NEXT.JS API ROUTE THAT RETURNS A JSON RESPONSE
----------------------------------------------------

Pages Router Example:
// pages/api/products.js

export default async function handler(req, res) {
  const { method, query, body } = req
  
  try {
    switch (method) {
      case 'GET':
        // Fetch all products or filter by query
        const products = await fetchProducts(query)
        return res.status(200).json({
          success: true,
          data: products,
          count: products.length
        })
      
      case 'POST':
        // Create new product
        const newProduct = await createProduct(body)
        return res.status(201).json({
          success: true,
          data: newProduct,
          message: 'Product created successfully'
        })
      
      case 'PUT':
        // Update product
        const updated = await updateProduct(query.id, body)
        return res.status(200).json({
          success: true,
          data: updated
        })
      
      case 'DELETE':
        // Delete product
        await deleteProduct(query.id)
        return res.status(200).json({
          success: true,
          message: 'Product deleted'
        })
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Helper functions
async function fetchProducts(query) {
  // Database logic here
  return [
    { id: 1, name: 'Product 1', price: 29.99 },
    { id: 2, name: 'Product 2', price: 39.99 }
  ]
}

async function createProduct(data) {
  // Create product in database
  return { id: 3, ...data }
}

async function updateProduct(id, data) {
  // Update product in database
  return { id, ...data }
}

async function deleteProduct(id) {
  // Delete from database
}

App Router Example: [web:50][web:55]
// app/api/products/route.js
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request) {
  try {
    // Access query parameters
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    
    const products = await fetchProducts(category)
    
    return NextResponse.json({
      success: true,
      data: products
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newProduct = await createProduct(body)
    
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 })
  }
}

Dynamic Route Handler: [web:50]
// app/api/products/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params
  const product = await fetchProductById(id)
  
  if (!product) {
    return NextResponse.json({
      success: false,
      error: 'Product not found'
    }, { status: 404 })
  }
  
  return NextResponse.json({
    success: true,
    data: product
  })
}

export async function DELETE(request, { params }) {
  await deleteProduct(params.id)
  
  return NextResponse.json({
    success: true,
    message: 'Product deleted'
  })
}

Setting Custom Headers:
export async function GET() {
  return NextResponse.json(
    { data: 'cached response' },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'Content-Type': 'application/json'
      }
    }
  )
}

=======================================

31. HOW DO YOU IMPLEMENT MIDDLEWARE IN NEXT.JS?
------------------------------------------------

Middleware runs before requests are completed, allowing you to modify responses, redirect, rewrite, or set headers.

Create a middleware.js (or .ts) file at the root of your project:
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Access request details
  const { pathname, searchParams } = request.nextUrl
  const token = request.cookies.get('token')
  
  // Example: Authentication check
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Example: Add custom header
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'custom-value')
  
  return response
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/:path*'
  ]
}

Common Middleware Use Cases:

1. Authentication & Authorization:
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard')
  
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

2. URL Rewriting:
export function middleware(request) {
  // Rewrite /blog/old-url to /blog/new-url
  if (request.nextUrl.pathname === '/blog/old-url') {
    return NextResponse.rewrite(new URL('/blog/new-url', request.url))
  }
}

3. Geolocation/A/B Testing:
export function middleware(request) {
  const country = request.geo?.country || 'US'
  const response = NextResponse.next()
  response.cookies.set('user-country', country)
  
  // Redirect based on country
  if (country === 'FR' && !request.nextUrl.pathname.startsWith('/fr')) {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
  
  return response
}

4. Setting Headers:
export function middleware(request) {
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  return response
}

Matcher Configuration:
export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    
    // Or specific patterns
    '/dashboard/:path*',
    '/api/:path*'
  ]
}

Important: Middleware runs on the Edge Runtime, so it has some limitations (no Node.js APIs like fs, certain npm packages). [web:51][web:54]

=======================================

32. NEXT.JS API MIDDLEWARES AND HOW TO IMPLEMENT THEM
-------------------------------------------------------

API middlewares are functions that process requests before they reach your API route handler. [web:48]

Next.js doesn't have built-in middleware for API routes, so you need third-party libraries or custom implementation.

Method 1: Using next-connect Library
// Install: npm install next-connect

// pages/api/users.js
import nextConnect from 'next-connect'

// Custom middleware functions
const auth = (req, res, next) => {
  const token = req.headers.authorization
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  // Verify token and attach user to request
  req.user = { id: 1, name: 'John' }
  next()
}

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
}

// Create handler with middleware chain
const handler = nextConnect()
  .use(logger)
  .use(cors)
  .use(auth)
  .get((req, res) => {
    res.json({ message: `Hello ${req.user.name}` })
  })
  .post((req, res) => {
    res.json({ created: true })
  })

export default handler

Method 2: Custom Middleware Pattern
// lib/middlewares.js
export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization
  
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  
  req.user = decodeToken(token)
  next()
}

export const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  
  next()
}

// pages/api/protected.js
import { runMiddleware, authMiddleware, corsMiddleware } from '@/lib/middlewares'

export default async function handler(req, res) {
  await runMiddleware(req, res, corsMiddleware)
  await runMiddleware(req, res, authMiddleware)
  
  // Your API logic here
  res.json({ user: req.user })
}

Method 3: Higher-Order Function Pattern
// lib/withMiddleware.js
export const withAuth = (handler) => {
  return async (req, res) => {
    const token = req.cookies.token
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    req.user = await verifyToken(token)
    return handler(req, res)
  }
}

export const withRateLimit = (handler) => {
  return async (req, res) => {
    // Rate limiting logic
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests' })
    }
    
    return handler(req, res)
  }
}

// pages/api/protected.js
import { withAuth, withRateLimit } from '@/lib/withMiddleware'

const handler = async (req, res) => {
  res.json({ data: 'Protected data', user: req.user })
}

export default withAuth(withRateLimit(handler))

App Router (Route Handlers):
App Router doesn't need middleware libraries - use standard async patterns:

// app/api/users/route.js
import { NextResponse } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export async function GET(request) {
  // Authentication check
  const user = await verifyAuth(request)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Your logic here
  return NextResponse.json({ data: 'Success', user })
}

Common middleware patterns:
- Authentication/Authorization
- CORS handling
- Rate limiting
- Request logging
- Input validation
- Error handling

=======================================

33. HOW DO YOU HANDLE AUTHENTICATION IN NEXT.JS API ROUTES?
------------------------------------------------------------

Authentication in API routes involves verifying user identity before processing requests.

Method 1: JWT (JSON Web Tokens)
// lib/auth.js
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (error) {
    return null
  }
}

// pages/api/login.js
import { generateToken } from '@/lib/auth'
import { verifyPassword } from '@/lib/bcrypt'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  
  const { email, password } = req.body
  
  // Find user in database
  const user = await findUserByEmail(email)
  
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  // Generate JWT
  const token = generateToken(user)
  
  // Set as HTTP-only cookie (secure)
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`)
  
  return res.status(200).json({
    success: true,
    user: { id: user.id, email: user.email }
  })
}

// pages/api/protected.js
import { verifyToken } from '@/lib/auth'

export default async function handler(req, res) {
  const token = req.cookies.token
  
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  
  const user = verifyToken(token)
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' })
  }
  
  // User is authenticated
  return res.status(200).json({ data: 'Protected data', user })
}

Method 2: Session-based Authentication
// lib/session.js
import { getIronSession } from 'iron-session'

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: 'app_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export async function getSession(req, res) {
  return await getIronSession(req, res, sessionOptions)
}

// pages/api/login.js
import { getSession } from '@/lib/session'

export default async function handler(req, res) {
  const session = await getSession(req, res)
  const { email, password } = req.body
  
  const user = await authenticateUser(email, password)
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  
  // Save user to session
  session.user = {
    id: user.id,
    email: user.email
  }
  await session.save()
  
  return res.status(200).json({ success: true })
}

// pages/api/me.js
import { getSession } from '@/lib/session'

export default async function handler(req, res) {
  const session = await getSession(req, res)
  
  if (!session.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  
  return res.status(200).json({ user: session.user })
}

Method 3: NextAuth.js (Recommended)
// Install: npm install next-auth

// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await authenticateUser(credentials.email, credentials.password)
        
        if (user) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    }
  }
})

// pages/api/protected.js
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  return res.status(200).json({ user: session.user })
}

App Router with NextAuth:
// app/api/protected/route.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({ user: session.user })
}

Best Practices:
- Store tokens in HTTP-only cookies, not localStorage
- Use HTTPS in production
- Hash passwords with bcrypt
- Implement rate limiting for login endpoints
- Use CSRF protection
- Set proper CORS headers

=======================================

34. WHAT IS THE EDGE RUNTIME IN NEXT.JS AND WHEN TO USE IT?
------------------------------------------------------------

Edge Runtime is a lightweight JavaScript runtime that runs on Vercel's Edge Network (or CDN edge locations). [web:51][web:54]

Characteristics:
- Runs globally at edge locations close to users
- Lower latency than traditional server (Node.js runtime)
- Limited API support (no Node.js APIs like fs, child_process)
- Smaller bundle size
- Faster cold starts
- Mandatory for Middleware

Node.js Runtime vs Edge Runtime:

Node.js Runtime (Default):
- Full Node.js APIs available
- Runs on centralized servers
- Can use any npm package
- More memory and CPU available
- Slightly higher latency

Edge Runtime:
- Limited to Web APIs (fetch, Response, URL, etc.)
- Runs on distributed edge network
- Restricted npm package compatibility
- Lower memory limits
- Ultra-low latency

Using Edge Runtime in API Routes:

Pages Router:
// pages/api/edge.js
export const config = {
  runtime: 'edge'
}

export default async function handler(req) {
  return new Response(
    JSON.stringify({ message: 'Hello from Edge' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

App Router:
// app/api/edge/route.js
export const runtime = 'edge' // 'nodejs' is default

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const country = request.geo?.country || 'Unknown'
  
  return new Response(
    JSON.stringify({ country, message: 'Edge response' }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}

When to Use Edge Runtime:
✅ Middleware (required)
✅ Simple API routes with minimal dependencies
✅ Geolocation-based responses
✅ A/B testing and redirects
✅ Authentication checks
✅ Header manipulation
✅ Caching and revalidation logic
✅ Lightweight data transformations

When NOT to Use Edge Runtime:
❌ Need Node.js APIs (fs, path, crypto.randomBytes)
❌ Database connections requiring Node.js drivers
❌ Heavy computational tasks
❌ Large npm packages incompatible with Edge
❌ File uploads/downloads
❌ Image processing

Example - Geolocation with Edge:
export const runtime = 'edge'

export async function GET(request) {
  const geo = request.geo
  
  return new Response(
    JSON.stringify({
      country: geo?.country,
      region: geo?.region,
      city: geo?.city,
      latitude: geo?.latitude,
      longitude: geo?.longitude
    })
  )
}

Available APIs in Edge Runtime:
- fetch, Request, Response, Headers
- URL, URLSearchParams
- Web Crypto API
- TextEncoder, TextDecoder
- setTimeout, setInterval
- console, atob, btoa

Note: Middleware MUST use Edge Runtime - there's no option for Node.js runtime. [web:51][web:54]

=======================================

35. IMPLEMENTING CUSTOM ERROR HANDLING IN NEXT.JS API ROUTES
--------------------------------------------------------------

Proper error handling improves API reliability and provides better debugging information.

Pages Router Error Handling:
// lib/errorHandler.js
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

export function errorHandler(err, req, res) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  
  // Log error for debugging
  console.error('API Error:', {
    url: req.url,
    method: req.method,
    error: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
  
  return res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
}

// pages/api/users/[id].js
import { ApiError, errorHandler } from '@/lib/errorHandler'

export default async function handler(req, res) {
  try {
    const { id } = req.query
    
    // Validation
    if (!id || isNaN(id)) {
      throw new ApiError(400, 'Invalid user ID')
    }
    
    const user = await fetchUser(id)
    
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    
    return res.status(200).json({ success: true, data: user })
    
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

Centralized Error Handler with Wrapper:
// lib/apiHandler.js
export function apiHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (error) {
      // Handle different error types
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors
        })
      }
      
      if (error.name === 'UnauthorizedError') {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized'
        })
      }
      
      if (error.code === 'ECONNREFUSED') {
        return res.status(503).json({
          success: false,
          error: 'Service unavailable'
        })
      }
      
      // Default error
      console.error('Unhandled error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          message: error.message,
          stack: error.stack
        })
      })
    }
  }
}

// pages/api/products.js
import { apiHandler } from '@/lib/apiHandler'

async function handler(req, res) {
  const products = await fetchProducts()
  res.status(200).json({ success: true, data: products })
}

export default apiHandler(handler)

App Router Error Handling:
// lib/apiError.js
export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message)
    this.statusCode = statusCode
    this.details = details
  }
}

// app/api/users/[id]/route.js
import { NextResponse } from 'next/server'
import { ApiError } from '@/lib/apiError'

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    if (!id) {
      throw new ApiError(400, 'User ID is required')
    }
    
    const user = await fetchUser(id)
    
    if (!user) {
      throw new ApiError(404, 'User not found')
    }
    
    return NextResponse.json({ success: true, data: user })
    
  } catch (error) {
    // Handle custom errors
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error.details
        },
        { status: error.statusCode }
      )
    }
    
    // Handle unexpected errors
    console.error('Unexpected error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      },
      { status: 500 }
    )
  }
}

Global Error Boundary Pattern:
// lib/withErrorHandler.js
import { NextResponse } from 'next/server'

export function withErrorHandler(handler) {
  return async (request, context) => {
    try {
      return await handler(request, context)
    } catch (error) {
      console.error('API Error:', {
        path: request.url,
        method: request.method,
        error: error.message
      })
      
      const statusCode = error.statusCode || 500
      const message = error.message || 'Internal Server Error'
      
      return NextResponse.json(
        { success: false, error: message },
        { status: statusCode }
      )
    }
  }
}

// app/api/products/route.js
import { withErrorHandler } from '@/lib/withErrorHandler'

async function handler(request) {
  const products = await fetchProducts()
  return NextResponse.json({ data: products })
}

export const GET = withErrorHandler(handler)
export const POST = withErrorHandler(async (request) => {
  const body = await request.json()
  const product = await createProduct(body)
  return NextResponse.json({ data: product }, { status: 201 })
})

Validation Error Example:
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().min(18)
})

export async function POST(request) {
  try {
    const body = await request.json()
    const validated = userSchema.parse(body)
    
    const user = await createUser(validated)
    return NextResponse.json({ data: user }, { status: 201 })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors
        },
        { status: 400 }
      )
    }
    throw error
  }
}

=======================================

36. DIFFERENCE BETWEEN API ROUTES (PAGES ROUTER) VS ROUTE HANDLERS (APP ROUTER)
----------------------------------------------------------------------------------

Both allow creating API endpoints, but with different syntax and capabilities. [web:52][web:55]

API Routes (Pages Router):
Location: pages/api/
File naming: Any .js/.ts file
Exports: Default function handler

// pages/api/users.js
export default function handler(req, res) {
  const { method, query, body } = req
  
  if (method === 'GET') {
    res.status(200).json({ users: [] })
  } else if (method === 'POST') {
    res.status(201).json({ created: true })
  } else {
    res.status(405).end()
  }
}

Features:
- Single handler function handles all HTTP methods
- Access req and res objects (Node.js style)
- Uses res.json(), res.status(), res.send()
- Middleware via third-party libraries (next-connect)
- Always runs on Node.js runtime

Route Handlers (App Router): [web:52][web:55]
Location: app/api/
File naming: Must be named route.js or route.ts
Exports: Named exports for each HTTP method

// app/api/users/route.js
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  return NextResponse.json({ users: [] })
}

export async function POST(request) {
  const body = await request.json()
  return NextResponse.json({ created: true }, { status: 201 })
}

export async function PUT(request, { params }) {
  return NextResponse.json({ updated: true })
}

export async function DELETE(request, { params }) {
  return NextResponse.json({ deleted: true })
}

Features:
- Separate function per HTTP method
- Uses Web APIs (Request, Response)
- Returns NextResponse or Response
- Can choose Node.js or Edge runtime
- Native async/await support
- Better TypeScript support

Key Differences:

1. Function Structure:
Pages Router: Single handler for all methods
App Router: Separate function per method

2. Request/Response:
Pages Router: Node.js req/res objects
App Router: Web Request/Response APIs

3. Query Parameters:
Pages Router: req.query
App Router: request.nextUrl.searchParams

4. Body Parsing:
Pages Router: Automatic (req.body)
App Router: await request.json() or request.formData()

5. Dynamic Routes:
Pages Router:
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query
}

App Router:
// app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params
}

6. Runtime:
Pages Router: Always Node.js
App Router: Can choose 'nodejs' or 'edge'

export const runtime = 'edge'

7. Streaming:
Pages Router: Limited support
App Router: Full streaming support

export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue('chunk1')
      controller.enqueue('chunk2')
      controller.close()
    }
  })
  return new Response(stream)
}

8. Middleware:
Pages Router: Requires libraries
App Router: Use middleware.js or compose functions

Migration Example:

Pages Router:
// pages/api/posts/[id].js
export default async function handler(req, res) {
  const { method, query } = req
  const { id } = query
  
  if (method === 'GET') {
    const post = await fetchPost(id)
    return res.status(200).json({ data: post })
  }
  
  if (method === 'DELETE') {
    await deletePost(id)
    return res.status(204).end()
  }
  
  res.status(405).end()
}

App Router:
// app/api/posts/[id]/route.js
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const post = await fetchPost(params.id)
  return NextResponse.json({ data: post })
}

export async function DELETE(request, { params }) {
  await deletePost(params.id)
  return new Response(null, { status: 204 })
}

Which to Use:
- New projects: Use Route Handlers (App Router)
- Existing projects: Can keep API Routes or migrate gradually
- Both can coexist in the same project
- App Router provides more flexibility and better DX

=======================================
* /


/*
=======================================
OPTIMIZATION & PERFORMANCE - ANSWERS
=======================================

37. HOW TO OPTIMIZE IMAGES IN NEXT.JS USING next/image
-------------------------------------------------------

The next/image component provides automatic image optimization with minimal configuration. [web:56][web:57][web:58]

Basic Usage:
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/photo.jpg"
      alt="Description"
      width={500}
      height={300}
      priority // Load immediately for above-fold images
    />
  )
}

Remote Images:
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**'
      }
    ]
  }
}

// Component
<Image
  src="https://example.com/images/photo.jpg"
  alt="Remote image"
  width={800}
  height={600}
/>

Responsive Images:
<Image
  src="/photo.jpg"
  alt="Responsive"
  fill // Fills parent container
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover' }}
/>

Loading States:
<Image
  src="/photo.jpg"
  alt="With placeholder"
  width={500}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

Static Import (automatic blur):
import photo from '@/public/photo.jpg'

<Image
  src={photo}
  alt="Static import"
  placeholder="blur" // Automatically generated
/>

Quality and Format:
<Image
  src="/photo.jpg"
  alt="High quality"
  width={800}
  height={600}
  quality={90} // Default is 75
/>

How it works: [web:56][web:63]
- Automatically converts to WebP/AVIF format
- Serves correctly sized images per device
- Lazy loads images by default (priority=false)
- Prevents layout shift with size attributes
- Caches optimized images for reuse
- On-demand optimization (not at build time)

=======================================

38. BENEFITS OF USING THE IMAGE COMPONENT
-------------------------------------------

The Image component offers significant advantages over regular <img> tags: [web:56][web:60]

1. Automatic Optimization:
- Converts to modern formats (WebP, AVIF) based on browser support
- Reduces file size by 23-87% compared to original [web:60]
- Optimizes on-demand, not at build time

2. Responsive Images:
- Automatically generates multiple sizes
- Serves appropriate size based on device
- Uses srcset and sizes automatically

3. Performance:
- Lazy loading by default (loads when in viewport)
- Prevents Cumulative Layout Shift (CLS)
- Priority loading for above-fold images
- Better Core Web Vitals scores

4. Visual Stability:
- Requires width/height to reserve space
- Prevents content jumping during load
- Blur placeholders for smooth loading

5. SEO Benefits:
- Proper alt text enforcement
- Better page performance ranking
- Faster load times

6. Developer Experience:
- Simple API
- Automatic srcset generation
- Built-in lazy loading
- No external dependencies needed

Comparison:
// Regular img - 105kb, no optimization
<img src="/photo.jpg" alt="Photo" />

// next/image - 80kb, WebP, lazy loaded, responsive
<Image src="/photo.jpg" alt="Photo" width={500} height={300} />

=======================================

39. HOW TO IMPLEMENT LAZY LOADING IN NEXT.JS
-------------------------------------------------

Lazy loading delays loading resources until needed, improving initial page load.

Images (Automatic with next/image):
import Image from 'next/image'

// Lazy loaded by default
<Image src="/photo.jpg" alt="Lazy" width={500} height={300} />

// Disable lazy loading for above-fold images
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Loads immediately
/>

Components (Dynamic Imports):
import dynamic from 'next/dynamic'

// Lazy load component
const HeavyComponent = dynamic(() => import('@/components/Heavy'))

// With loading state
const HeavyComponent = dynamic(
  () => import('@/components/Heavy'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false // Disable server-side rendering
  }
)

export default function Page() {
  return (
    <div>
      <h1>Page Content</h1>
      <HeavyComponent /> {/* Loaded when rendered * /}
    </div>
  )
}

Conditional Lazy Loading:
'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'), {
  ssr: false
})

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && <Chart />} {/* Loads only when clicked * /}
    </div>
  )
}

Lazy Load with Named Exports:
const Button = dynamic(
  () => import('@/components/UI').then(mod => mod.Button)
)

Lazy Load Multiple Components:
const Components = {
  Chart: dynamic(() => import('@/components/Chart')),
  Table: dynamic(() => import('@/components/Table')),
  Graph: dynamic(() => import('@/components/Graph'))
}

function Page({ type }) {
  const Component = Components[type]
  return <Component />
}

Third-Party Libraries:
const VideoPlayer = dynamic(
  () => import('react-player'),
  { ssr: false }
)

Benefits:
- Smaller initial bundle size
- Faster initial page load
- Load heavy components on-demand
- Better performance scores

=======================================

40. DIFFERENCE BETWEEN DYNAMIC IMPORTS AND REGULAR IMPORTS
-----------------------------------------------------------

Regular Imports:
- Loaded at build time, bundled together
- Synchronous loading
- Always included in initial bundle
- Evaluated immediately

import Component from '@/components/Component'
import { util } from '@/lib/utils'

// These are bundled into the main JavaScript file

Dynamic Imports:
- Loaded at runtime when needed
- Asynchronous loading
- Creates separate code chunks
- Reduces initial bundle size

// Next.js dynamic import
import dynamic from 'next/dynamic'
const Component = dynamic(() => import('@/components/Component'))

// Native JavaScript dynamic import
const module = await import('@/lib/heavy-module')

Key Differences:

1. Bundle Size:
Regular: All code in initial bundle
Dynamic: Split into separate chunks

2. Loading:
Regular: Loaded on page load
Dynamic: Loaded when component renders or function executes

3. Code Splitting:
Regular: No automatic code splitting
Dynamic: Automatic code splitting

4. Performance:
Regular: Slower initial load, faster component rendering
Dynamic: Faster initial load, slight delay on first render

Examples:

Regular Import (always loaded):
import Chart from '@/components/Chart'

export default function Page() {
  return <Chart /> // Chart code in main bundle
}

Dynamic Import (loaded on demand):
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('@/components/Chart'))

export default function Page() {
  return <Chart /> // Chart code in separate chunk
}

Conditional Dynamic Import:
async function handleAnalytics() {
  const analytics = await import('@/lib/analytics')
  analytics.track('event')
}

When to Use Dynamic Imports:
- Heavy third-party libraries (charts, video players)
- Components not visible on initial load
- Admin/dashboard components
- Modal/dialog components
- Route-specific utilities
- Conditional features

When to Use Regular Imports:
- Core components used everywhere
- Small utilities
- Critical above-fold content
- Shared UI components (buttons, inputs)

Bundle Analysis:
Regular imports increase main bundle:
main.js - 500kb (includes everything)

Dynamic imports split bundle:
main.js - 200kb
chart.chunk.js - 150kb (loaded when needed)
admin.chunk.js - 100kb (loaded when needed)

=======================================

41. HOW TO OPTIMIZE FONTS IN NEXT.JS
--------------------------------------

Next.js 13+ has built-in font optimization using next/font module.

Google Fonts:
import { Inter, Roboto, Poppins } from 'next/font/google'

// Single font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}

Multiple Fonts:
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const robotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Page() {
  return (
    <div>
      <h1 className={inter.className}>Heading</h1>
      <code className={robotoMono.className}>Code block</code>
    </div>
  )
}

Variable Fonts:
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

// Use with Tailwind CSS
<html className={inter.variable}>
  <body>
    <h1 className="font-sans">Uses Inter</h1>
  </body>
</html>

Local Fonts:
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/my-font.woff2',
  display: 'swap',
  variable: '--font-custom'
})

// Multiple weights
const myFont = localFont({
  src: [
    { path: './fonts/font-regular.woff2', weight: '400' },
    { path: './fonts/font-bold.woff2', weight: '700' }
  ]
})

Font Display Strategies:
const font = Inter({
  subsets: ['latin'],
  display: 'swap' // or 'auto', 'block', 'fallback', 'optional'
})

Preloading:
const font = Inter({
  subsets: ['latin'],
  preload: true // Default is true
})

Benefits:
- Self-hosts Google Fonts automatically (privacy + performance)
- Zero layout shift with font-display: swap
- Automatic font subsetting
- Preloads critical fonts
- No external requests (better privacy)
- CSS variables for easy usage

CSS Variables Approach:
// app/layout.js
const inter = Inter({ variable: '--font-inter' })

<html className={inter.variable}>

// globals.css
body {
  font-family: var(--font-inter), sans-serif;
}

Old Method (Not Recommended):
// _document.js with <link>
<link href="https://fonts.googleapis.com/..." />
// Problems: External request, layout shift, no optimization

=======================================

42. BEST PRACTICES FOR BUNDLE SIZE OPTIMIZATION
--------------------------------------------------

Bundle size directly impacts page load speed and user experience. [web:64]

1. Analyze Bundle:
// Install bundle analyzer
npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  // your config
})

// Run analysis
ANALYZE=true npm run build

2. Dynamic Imports:
// Instead of importing everything
import { Chart, Table, Graph } from 'heavy-lib'

// Import only what's needed
const Chart = dynamic(() => import('heavy-lib/chart'))

3. Tree Shaking:
// Bad - imports entire lodash
import _ from 'lodash'
_.debounce(fn, 100)

// Good - imports only debounce
import debounce from 'lodash/debounce'
debounce(fn, 100)

// Even better - use lodash-es
import { debounce } from 'lodash-es'

4. Remove Unused Dependencies:
npm install depcheck -g
depcheck

// Remove unused packages
npm uninstall unused-package

5. Use Lighter Alternatives:
// Instead of moment.js (289kb)
import moment from 'moment'

// Use date-fns (13kb with tree-shaking)
import { format } from 'date-fns'

// Instead of lodash (entire library)
// Use native JavaScript or specific imports

6. Code Splitting by Route:
// Automatic with Next.js pages
pages/
  index.js → main chunk
  about.js → about chunk
  dashboard.js → dashboard chunk

7. Minimize Third-Party Scripts:
// Use next/script for third-party scripts
import Script from 'next/script'

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload" // or 'afterInteractive'
/>

8. SWC Minification (default in Next.js 13+): [web:64]
// next.config.js
module.exports = {
  swcMinify: true // Default in Next.js 13+
}

9. Remove Console Logs in Production:
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

10. Optimize Images:
// Use next/image instead of <img>
<Image src="/large.jpg" width={800} height={600} />

11. Check Import Sizes:
// Use import-cost VS Code extension
// Or check manually
import analyze from 'webpack-bundle-analyzer'

12. Lazy Load Heavy Components:
const PDFViewer = dynamic(
  () => import('@/components/PDFViewer'),
  { ssr: false }
)

Checklist:
✅ Analyze bundle regularly
✅ Use dynamic imports for heavy components
✅ Tree-shake libraries properly
✅ Remove unused dependencies
✅ Use lighter alternatives
✅ Lazy load third-party scripts
✅ Enable SWC minification
✅ Optimize images with next/image
✅ Remove console logs in production
✅ Monitor bundle size in CI/CD

Target: Keep initial bundle < 200kb

=======================================

43. HOW TO IMPLEMENT CACHING STRATEGIES IN NEXT.JS
-----------------------------------------------------

Caching improves performance by storing and reusing previously fetched data. [web:62][web:65]

1. Static Generation (Build-time Cache):
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/data')
  
  return {
    props: { data },
    // No revalidate = cached forever
  }
}

2. Incremental Static Regeneration (ISR): [web:62]
export async function getStaticProps() {
  const data = await fetchData()
  
  return {
    props: { data },
    revalidate: 60 // Revalidate every 60 seconds
  }
}

3. Client-Side Caching with SWR: [web:62]
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000 // 1 minute cache
  })
  
  if (isLoading) return <div>Loading...</div>
  return <div>{data.name}</div>
}

4. App Router Data Cache:
// Cached by default
const data = await fetch('https://api.example.com/data')

// Opt out of caching
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
})

// Revalidate periodically
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // Every hour
})

5. API Route Caching: [web:65]
// pages/api/data.js
export default function handler(req, res) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  )
  
  res.json({ data: 'cached response' })
}

// App Router
export async function GET() {
  return NextResponse.json(
    { data: 'response' },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      }
    }
  )
}

6. Request Memoization (App Router):
// Same request in multiple components = single fetch
async function getData() {
  const data = await fetch('https://api.example.com/data')
  return data
}

// Both calls use same cached result
export default async function Page() {
  const data1 = await getData()
  const data2 = await getData() // Uses memoized result
}

7. React Cache:
import { cache } from 'react'

const getUser = cache(async (id) => {
  const user = await db.user.findUnique({ where: { id } })
  return user
})

// Multiple calls with same ID use cached result

8. Route Segment Config:
// app/dashboard/page.js
export const revalidate = 3600 // Revalidate every hour
export const dynamic = 'force-static' // or 'force-dynamic'

export default async function Dashboard() {
  const data = await fetchData()
  return <div>{data}</div>
}

9. Middleware Caching:
// middleware.js
export function middleware(request) {
  const response = NextResponse.next()
  
  response.headers.set(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  )
  
  return response
}

Cache-Control Headers:
- public: Can be cached by browsers and CDNs
- private: Only cached by browser
- max-age=60: Cache for 60 seconds
- s-maxage=60: CDN cache duration
- stale-while-revalidate=120: Serve stale while revalidating
- immutable: Never revalidate (for hashed assets)

Strategies Summary: [web:62]
- SSG: Build-time cache (fastest)
- ISR: Periodic revalidation
- SSR with Cache-Control: Per-request caching
- SWR: Client-side cache with revalidation
- App Router: Default caching with opt-out

=======================================

44. ROLE OF BABEL AND SWC IN NEXT.JS
--------------------------------------

Babel and SWC are JavaScript compilers/transpilers used in Next.js. [web:61][web:64]

Babel (Legacy):
- JavaScript transpiler written in JavaScript
- Transforms modern JS to browser-compatible code
- Used in Next.js 11 and earlier by default
- Slower compilation
- Large plugin ecosystem

SWC (Current): [web:61][web:64]
- Rust-based compiler (much faster than Babel)
- Default in Next.js 12+
- 17x faster than Babel
- Built-in minification
- Smaller bundle sizes

What They Do:

1. Transpilation:
// Your code (ES6+)
const greeting = (name) => `Hello ${name}`

// Compiled output (ES5)
var greeting = function(name) {
  return "Hello " + name
}

2. JSX Transformation:
// Your code
<div className="box">Hello</div>

// Compiled
React.createElement('div', { className: 'box' }, 'Hello')

3. TypeScript Compilation:
// .tsx file
const Component: React.FC = () => <div>Hello</div>

// Compiled to JavaScript

4. Minification:
// Before
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// After (minified)
function t(e){return e.reduce((e,t)=>e+t.price,0)}

SWC Configuration:
// next.config.js
module.exports = {
  swcMinify: true, // Default in Next.js 13+
  
  compiler: {
    // Remove console in production
    removeConsole: {
      exclude: ['error', 'warn']
    },
    
    // React strict mode
    reactRemoveProperties: true,
    
    // Styled Components support
    styledComponents: true
  }
}

Babel Configuration (if needed):
// .babelrc (disables SWC)
{
  "presets": ["next/babel"],
  "plugins": ["custom-plugin"]
}

When to Use Babel:
- Need specific Babel plugins not in SWC
- Legacy projects
- Custom transformations

When to Use SWC (Recommended):
- All new projects (default)
- Need faster builds
- Want smaller bundles
- Standard Next.js features

Build Speed Comparison:
Babel: 10 seconds
SWC: 0.6 seconds (17x faster)

Next.js uses SWC for:
- JSX/TSX compilation
- TypeScript compilation
- Minification
- Module transformation
- Dead code elimination

=======================================

45. HOW TO HANDLE MEMORY LEAKS AND PERFORMANCE ISSUES
------------------------------------------------------

Common causes and solutions for memory leaks and performance problems.

Memory Leaks:

1. Event Listeners Not Cleaned Up:
// Bad
useEffect(() => {
  window.addEventListener('resize', handleResize)
  // Missing cleanup
}, [])

// Good
useEffect(() => {
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])

2. Subscriptions Not Unsubscribed:
useEffect(() => {
  const subscription = observable.subscribe(data => setData(data))
  
  return () => subscription.unsubscribe()
}, [])

3. Timers Not Cleared:
// Bad
useEffect(() => {
  setInterval(() => updateData(), 1000)
}, [])

// Good
useEffect(() => {
  const interval = setInterval(() => updateData(), 1000)
  
  return () => clearInterval(interval)
}, [])

4. Large Objects in State:
// Bad - keeps entire dataset in memory
const [data, setData] = useState(hugeArray)

// Good - paginate or virtualize
const [page, setPage] = useState(0)
const visibleData = data.slice(page * 10, (page + 1) * 10)

5. Image References:
// Revoke object URLs
const [imageUrl, setImageUrl] = useState(null)

useEffect(() => {
  const url = URL.createObjectURL(file)
  setImageUrl(url)
  
  return () => URL.revokeObjectURL(url)
}, [file])

Performance Issues:

1. Unnecessary Re-renders:
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive render * /}</div>
})

// Use useMemo for expensive calculations
const sortedData = useMemo(
  () => data.sort((a, b) => a.value - b.value),
  [data]
)

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])

2. Large Lists (Use Virtualization):
import { FixedSizeList } from 'react-window'

function LargeList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  )
}

3. Heavy Computations:
// Move to Web Worker
// worker.js
self.onmessage = (e) => {
  const result = heavyComputation(e.data)
  self.postMessage(result)
}

// Component
const worker = new Worker('worker.js')
worker.postMessage(data)
worker.onmessage = (e) => setResult(e.data)

4. Database Query Optimization:
// Bad - fetches all data
const users = await db.user.findMany()

// Good - select only needed fields
const users = await db.user.findMany({
  select: { id: true, name: true },
  take: 10
})

5. Monitor Performance:
// React DevTools Profiler
import { Profiler } from 'react'

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} took ${actualDuration}ms`)
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>

// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getLCP(console.log)

Debugging Tools:
- Chrome DevTools Memory Profiler
- React DevTools Profiler
- Next.js built-in analytics
- Lighthouse performance audit

Prevention Checklist:
✅ Clean up effects (listeners, subscriptions, timers)
✅ Memoize expensive computations
✅ Virtualize long lists
✅ Optimize images
✅ Use code splitting
✅ Monitor bundle size
✅ Profile components regularly

=======================================

46. STRATEGIES FOR HANDLING LARGE DATASETS
--------------------------------------------

Large datasets require special handling to maintain performance.

1. Pagination:
// Server-side pagination
export async function getServerSideProps({ query }) {
  const page = parseInt(query.page) || 1
  const limit = 20
  const offset = (page - 1) * limit
  
  const { items, total } = await fetchItems({ limit, offset })
  
  return {
    props: {
      items,
      currentPage: page,
      totalPages: Math.ceil(total / limit)
    }
  }
}

function Page({ items, currentPage, totalPages }) {
  return (
    <div>
      {items.map(item => <Item key={item.id} {...item} />)}
      <Pagination current={currentPage} total={totalPages} />
    </div>
  )
}

2. Infinite Scroll:
'use client'
import { useEffect, useState } from 'react'

function InfiniteList() {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    loadMore()
  }, [page])
  
  const loadMore = async () => {
    setLoading(true)
    const newItems = await fetch(`/api/items?page=${page}`)
      .then(r => r.json())
    setItems([...items, ...newItems])
    setLoading(false)
  }
  
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setPage(page + 1)
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return <div>{items.map(item => <Item key={item.id} {...item} />)}</div>
}

3. Virtual Scrolling:
import { FixedSizeList } from 'react-window'

function VirtualizedList({ data }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={data.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          <Item data={data[index]} />
        </div>
      )}
    </FixedSizeList>
  )
}

4. Server-Side Filtering/Searching:
// API route
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const category = searchParams.get('category')
  
  const items = await db.items.findMany({
    where: {
      name: { contains: search },
      category: category
    },
    take: 50
  })
  
  return NextResponse.json(items)
}

5. Cursor-based Pagination:
// More efficient for large datasets
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor')
  
  const items = await db.items.findMany({
    take: 20,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: 'asc' }
  })
  
  const nextCursor = items[items.length - 1]?.id
  
  return NextResponse.json({ items, nextCursor })
}

6. Data Aggregation:
// Instead of fetching all records for stats
const stats = await db.orders.aggregate({
  _sum: { total: true },
  _avg: { total: true },
  _count: true
})

7. Streaming Response:
export async function GET() {
  const stream = new ReadableStream({
    async start(controller) {
      const items = await fetchLargeDataset()
      
      for (const item of items) {
        controller.enqueue(`data: ${JSON.stringify(item)}\n\n`)
        await new Promise(r => setTimeout(r, 100))
      }
      
      controller.close()
    }
  })
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  })
}

8. Caching with Redis:
import Redis from 'ioredis'
const redis = new Redis()

export async function GET(request) {
  const cacheKey = 'large-dataset'
  
  // Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    return NextResponse.json(JSON.parse(cached))
  }
  
  // Fetch from database
  const data = await fetchLargeDataset()
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(data))
  
  return NextResponse.json(data)
}

9. Database Indexing:
// Ensure database has proper indexes
// Example in Prisma schema
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String
  
  @@index([email])
  @@index([name])
}

10. Select Only Needed Fields:
// Bad - fetches everything
const users = await db.user.findMany()

// Good - only needed fields
const users = await db.user.findMany({
  select: {
    id: true,
    name: true,
    email: true
  }
})

Best Practices:
✅ Use pagination or infinite scroll
✅ Virtualize long lists with react-window
✅ Implement server-side filtering
✅ Cache frequently accessed data
✅ Use cursor-based pagination for large tables
✅ Index database columns used in queries
✅ Select only necessary fields
✅ Consider data aggregation over full fetches
✅ Stream large responses
✅ Monitor query performance

=======================================
* /


/*
=======================================
STYLING & UI - ANSWERS
=======================================

47. HOW TO HANDLE CSS IN NEXT.JS
----------------------------------

Next.js supports multiple CSS styling approaches. [web:66][web:67]

1. Global CSS:
// styles/globals.css
body {
  margin: 0;
  font-family: sans-serif;
}

// app/layout.js or pages/_app.js
import '@/styles/globals.css'

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>
}

2. CSS Modules:
// components/Button.module.css
.button {
  background: blue;
  color: white;
  padding: 10px 20px;
}

.primary {
  background: green;
}

// components/Button.js
import styles from './Button.module.css'

export default function Button() {
  return (
    <button className={`${styles.button} ${styles.primary}`}>
      Click Me
    </button>
  )
}

3. Tailwind CSS: [web:68]
// Install
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
module.exports = {
  content: [
    './app/** /*.{js,ts,jsx,tsx}',
    './components/** /*.{js,ts,jsx,tsx}'
  ]
}

// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Usage
<div className="bg-blue-500 text-white p-4">Content</div>

4. Styled-JSX (Next.js built-in):
export default function Component() {
  return (
    <div>
      <h1>Styled JSX</h1>
      <style jsx>{`
        h1 {
          color: red;
          font-size: 24px;
        }
      `}</style>
    </div>
  )
}

5. CSS-in-JS (Styled Components, Emotion):
// Install
npm install styled-components

// components/Button.js
import styled from 'styled-components'

const StyledButton = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
  
  &:hover {
    background: darkblue;
  }
`

export default function Button() {
  return <StyledButton>Click Me</StyledButton>
}

6. Sass/SCSS:
// Install
npm install sass

// styles/component.module.scss
.container {
  .title {
    color: blue;
    
    &:hover {
      color: darkblue;
    }
  }
}

// Component
import styles from './component.module.scss'

Recommendation: Use Tailwind CSS or CSS Modules for most projects

=======================================

48. DIFFERENCE BETWEEN CSS MODULES AND GLOBAL CSS
---------------------------------------------------

CSS Modules:
- Scoped to component
- Class names automatically hashed
- No naming conflicts
- Better for component-based styling
- Must import to use

// Button.module.css
.button {
  background: blue;
}

// Compiled to: .Button_button__a1b2c3
import styles from './Button.module.css'
<button className={styles.button}>Click</button>

Global CSS:
- Applied to entire application
- Can cause naming conflicts
- Good for base styles, resets, fonts
- Available everywhere without import

// globals.css
body {
  margin: 0;
  font-family: sans-serif;
}

.button {
  background: blue;
}

// Usage (no import needed for classes)
<button className="button">Click</button>

Key Differences:

1. Scope:
CSS Modules: Component-scoped, locally scoped
Global CSS: Application-wide, globally scoped

2. Naming:
CSS Modules: Automatic unique names, no conflicts
Global CSS: Manual naming, risk of conflicts

3. Import:
CSS Modules: Must import in each file
Global CSS: Import once in _app.js or layout.js

4. Class Names:
CSS Modules: 
  styles.button → Button_button__hash
Global CSS: 
  className="button" → button (unchanged)

5. Use Cases:
CSS Modules:
- Component-specific styles
- Reusable components
- Large applications
- Preventing naming conflicts

Global CSS:
- CSS resets
- Typography
- Global utilities
- Base styles

Combining Both:
// globals.css
@tailwind base;
@tailwind components;

body {
  font-family: var(--font-inter);
}

// Component.module.css
.card {
  border: 1px solid #ddd;
  padding: 20px;
}

// Component.js
import styles from './Component.module.css'

export default function Component() {
  return (
    <div className={styles.card}>
      {/* Global styles apply here * /}
    </div>
  )
}

Best Practice: Use global CSS for base styles, CSS Modules for components

=======================================

49. HOW TO INTEGRATE TAILWIND CSS WITH NEXT.JS
--------------------------------------------------

Tailwind CSS integrates seamlessly with Next.js. [web:68][web:67]

Installation:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

This creates:
- tailwind.config.js
- postcss.config.js

Configuration:
// tailwind.config.js
module.exports = {
  content: [
    './pages/** /*.{js,ts,jsx,tsx,mdx}',
    './components/** /*.{js,ts,jsx,tsx,mdx}',
    './app/** /*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#1a202c'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}

Add Tailwind Directives:
// styles/globals.css or app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utilities * /
@layer components {
  .btn-primary {
    @apply bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600;
  }
}

Import Global CSS:
// app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}

// Or pages/_app.js
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

Usage:
export default function Component() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-blue-500">
        Hello Tailwind
      </h1>
      <button className="btn-primary">
        Click Me
      </button>
    </div>
  )
}

With CSS Modules:
// component.module.css
.card {
  @apply border border-gray-200 rounded-lg p-6 shadow-md;
}

.title {
  @apply text-2xl font-bold text-gray-800;
}

Custom Plugins:
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}

Dark Mode:
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}

// Usage
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-black dark:text-white">Content</h1>
</div>

Responsive Design:
<div className="w-full md:w-1/2 lg:w-1/3">
  <p className="text-sm sm:text-base md:text-lg lg:text-xl">
    Responsive text
  </p>
</div>

JIT (Just-In-Time) Mode (default in v3):
- Generates styles on-demand
- Faster build times
- Smaller CSS files
- All variants enabled

=======================================

50. WHAT ARE STYLED-JSX AND HOW DO THEY WORK
----------------------------------------------

styled-jsx is Next.js's built-in CSS-in-JS solution. [web:70]

Basic Usage:
export default function Component() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>Styled with JSX</p>
      
      <style jsx>{`
        h1 {
          color: blue;
          font-size: 32px;
        }
        p {
          color: gray;
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

Scoped Styles (default):
function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      
      <style jsx>{`
        .card {
          border: 1px solid #ddd;
          padding: 20px;
        }
        /* Only applies to this component * /
      `}</style>
    </div>
  )
}

Global Styles:
export default function Layout({ children }) {
  return (
    <div>
      {children}
      
      <style jsx global>{`
        body {
          margin: 0;
          font-family: sans-serif;
        }
        /* Applies globally * /
      `}</style>
    </div>
  )
}

Dynamic Styles:
export default function Button({ primary }) {
  return (
    <button>
      Click Me
      
      <style jsx>{`
        button {
          background: ${primary ? 'blue' : 'gray'};
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </button>
  )
}

With Props:
function Alert({ type, message }) {
  const colors = {
    success: 'green',
    error: 'red',
    warning: 'orange'
  }
  
  return (
    <div className="alert">
      {message}
      
      <style jsx>{`
        .alert {
          background: ${colors[type]};
          color: white;
          padding: 15px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}

External Styles:
import css from 'styled-jsx/css'

const buttonStyles = css`
  .button {
    background: blue;
    color: white;
  }
`

export default function Button() {
  return (
    <button className="button">
      Click
      <style jsx>{buttonStyles}</style>
    </button>
  )
}

One Tag Targeting:
export default function Component() {
  return (
    <div>
      <p>Paragraph</p>
      
      <style jsx>{`
        p :global(strong) {
          color: red; /* Targets <strong> inside <p> * /
        }
      `}</style>
    </div>
  )
}

Advantages:
- Built into Next.js (no installation)
- Full CSS support
- Scoped by default
- Dynamic styling with JavaScript
- No class name conflicts

Disadvantages:
- Less popular than styled-components
- Syntax can be verbose
- Limited TypeScript support
- String-based (no autocompletion)

When to Use:
✅ Want built-in solution
✅ Small to medium projects
✅ Need dynamic styles
✅ Don't want external dependencies

When NOT to Use:
❌ Need better DX (use styled-components)
❌ Want type safety (use CSS Modules + TypeScript)
❌ Prefer utility-first (use Tailwind)

=======================================

51. HOW TO IMPLEMENT CSS-IN-JS SOLUTIONS IN NEXT.JS
------------------------------------------------------

CSS-in-JS allows writing CSS with JavaScript using libraries like styled-components, Emotion, etc.

1. Styled Components:

Installation:
npm install styled-components

Configuration for App Router:
// next.config.js
module.exports = {
  compiler: {
    styledComponents: true
  }
}

// app/lib/registry.tsx
'use client'
import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({ children }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}

// app/layout.js
import StyledComponentsRegistry from './lib/registry'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

Usage:
'use client'
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

export default function Component() {
  return (
    <Container>
      <Button primary>Primary</Button>
      <Button>Secondary</Button>
    </Container>
  )
}

2. Emotion:

Installation:
npm install @emotion/react @emotion/styled

Usage:
'use client'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
`

const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
`

export default function Component() {
  return (
    <div css={containerStyle}>
      <Button>Click Me</Button>
    </div>
  )
}

3. Theme Support:

Styled Components:
'use client'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#1a202c'
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
}

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

// Usage
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.medium};
`

4. Advanced Patterns:

Component Variants:
const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  
  ${props => props.variant === 'primary' && css`
    background: blue;
    color: white;
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: gray;
    color: white;
  `}
  
  ${props => props.size === 'large' && css`
    padding: 15px 30px;
    font-size: 18px;
  `}
`

Extending Styles:
const BaseButton = styled.button`
  padding: 10px 20px;
  border: none;
`

const PrimaryButton = styled(BaseButton)`
  background: blue;
  color: white;
`

Comparison:

Styled Components:
✅ Most popular
✅ Great TypeScript support
✅ Theming built-in
✅ Server-side rendering support
❌ Requires configuration
❌ Bundle size

Emotion:
✅ Smaller bundle
✅ Better performance
✅ Framework agnostic
❌ Less community support

CSS Modules:
✅ Zero runtime
✅ Better performance
✅ Works everywhere
❌ No dynamic styling
❌ Separate files

Tailwind:
✅ Utility-first
✅ Fast development
✅ Small production bundle
❌ Learning curve
❌ Verbose JSX

Recommendation: Use Tailwind or CSS Modules for better performance; styled-components for complex theming needs

=======================================
SEO & META TAGS - ANSWERS
=======================================

52. HOW TO OPTIMIZE SEO IN NEXT.JS
--------------------------------------

Next.js provides excellent SEO capabilities through server-side rendering and metadata APIs. [web:71][web:74]

1. Use Metadata API (App Router):
// app/layout.js
export const metadata = {
  title: 'My Website',
  description: 'Website description',
  keywords: ['next.js', 'react', 'seo']
}

2. Server-Side Rendering:
// Ensures content is in HTML for crawlers
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id)
  return {
    title: post.title,
    description: post.excerpt
  }
}

3. Semantic HTML:
<article>
  <header>
    <h1>Article Title</h1>
    <time dateTime="2024-01-01">January 1, 2024</time>
  </header>
  <main>Content</main>
</article>

4. Image Optimization:
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Descriptive alt text for SEO"
  width={1200}
  height={630}
  priority
/>

5. Sitemap Generation:
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]
}

6. Robots.txt:
// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: 'https://example.com/sitemap.xml'
  }
}

7. Canonical URLs:
export const metadata = {
  alternates: {
    canonical: 'https://example.com/page'
  }
}

8. Open Graph Tags:
export const metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    images: ['https://example.com/og-image.jpg']
  }
}

9. Structured Data (JSON-LD):
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Article Title',
    author: {
      '@type': 'Person',
      name: 'John Doe'
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>Content</article>
    </>
  )
}

10. Performance Optimization:
- Use next/image for images
- Implement lazy loading
- Minimize JavaScript bundles
- Use ISR for dynamic content
- Enable compression

SEO Checklist:
✅ Unique title and description per page
✅ Semantic HTML structure
✅ Alt text for images
✅ Mobile-friendly design
✅ Fast page load (Core Web Vitals)
✅ Sitemap and robots.txt
✅ Canonical URLs
✅ Structured data
✅ Open Graph tags
✅ Internal linking

=======================================

53. HOW TO IMPLEMENT META TAGS USING next/head
-----------------------------------------------

next/head is used in Pages Router to add meta tags. [web:71]

Basic Usage:
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta name="description" content="Page description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>Page content</main>
    </>
  )
}

SEO Meta Tags:
<Head>
  <title>Complete Page Title | Site Name</title>
  <meta name="description" content="Detailed page description" />
  <meta name="keywords" content="keyword1, keyword2, keyword3" />
  <meta name="author" content="Author Name" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://example.com/page" />
</Head>

Open Graph Tags:
<Head>
  <meta property="og:title" content="Page Title" />
  <meta property="og:description" content="Page description" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Site Name" />
</Head>

Twitter Cards:
<Head>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@username" />
  <meta name="twitter:title" content="Page Title" />
  <meta name="twitter:description" content="Description" />
  <meta name="twitter:image" content="https://example.com/image.jpg" />
</Head>

Dynamic Meta Tags:
export default function BlogPost({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | My Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content={post.coverImage} />
      </Head>
      
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  )
}

With getServerSideProps:
export async function getServerSideProps({ params }) {
  const post = await fetchPost(params.slug)
  return { props: { post } }
}

Reusable SEO Component:
// components/SEO.js
import Head from 'next/head'

export default function SEO({ title, description, image, url }) {
  const siteTitle = 'My Website'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}

// Usage
<SEO
  title="Blog Post Title"
  description="Post description"
  image="https://example.com/image.jpg"
  url="https://example.com/blog/post"
/>

Note: In App Router, use Metadata API instead of next/head

=======================================

54. WHAT IS THE METADATA API IN NEXT.JS APP ROUTER
----------------------------------------------------

The Metadata API is the modern way to handle SEO in the App Router. [web:71][web:74]

Static Metadata:
// app/page.js
export const metadata = {
  title: 'Home Page',
  description: 'Welcome to my website',
  keywords: ['next.js', 'react', 'web development']
}

export default function Page() {
  return <h1>Home</h1>
}

Dynamic Metadata:
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage]
    }
  }
}

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  return <article>{post.content}</article>
}

Complete Metadata Object:
export const metadata = {
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  authors: [{ name: 'John Doe', url: 'https://johndoe.com' }],
  creator: 'John Doe',
  publisher: 'Publisher Name',
  
  // Open Graph
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    url: 'https://example.com',
    siteName: 'Site Name',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OG Image'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
    creator: '@username',
    images: ['https://example.com/twitter-image.jpg']
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png'
  },
  
  // Alternate URLs
  alternates: {
    canonical: 'https://example.com/page',
    languages: {
      'en-US': 'https://example.com/en-US',
      'fr-FR': 'https://example.com/fr-FR'
    }
  },
  
  // Verification
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code'
  }
}

Template Title:
// app/layout.js
export const metadata = {
  title: {
    template: '%s | My Website',
    default: 'My Website'
  }
}

// app/about/page.js
export const metadata = {
  title: 'About' // Becomes "About | My Website"
}

Metadata from Parent:
// Child inherits and extends parent metadata
// app/blog/layout.js
export const metadata = {
  title: 'Blog'
}

// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  return {
    title: 'Post Title', // Inherits template from root layout
    description: 'Post description'
  }
}

File-based Metadata:
// Special files automatically become metadata
app/
  favicon.ico
  icon.png
  apple-icon.png
  opengraph-image.jpg
  twitter-image.jpg

// Or generate dynamically
// app/opengraph-image.js
export default function Image() {
  return new ImageResponse(
    <div style={{ fontSize: 128, background: 'white' }}>
      Hello World
    </div>
  )
}

=======================================

55. HOW TO IMPLEMENT OPEN GRAPH TAGS
---------------------------------------

Open Graph tags control how content appears when shared on social media. [web:71]

Pages Router (next/head):
import Head from 'next/head'

export default function Page() {
  return (
    <>
      <Head>
        {/* Basic OG tags * /}
        <meta property="og:title" content="Page Title" />
        <meta property="og:description" content="Page description" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/page" />
        <meta property="og:type" content="website" />
        
        {/* Additional tags * /}
        <meta property="og:site_name" content="Site Name" />
        <meta property="og:locale" content="en_US" />
      </Head>
      
      <main>Content</main>
    </>
  )
}

App Router (Metadata API):
// app/page.js
export const metadata = {
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://example.com',
    siteName: 'Site Name',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image description'
      }
    ],
    locale: 'en_US',
    type: 'website'
  }
}

Dynamic OG Tags:
// app/blog/[slug]/page.js
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name]
    }
  }
}

Article-specific OG tags:
export const metadata = {
  openGraph: {
    type: 'article',
    publishedTime: '2024-01-01T00:00:00.000Z',
    modifiedTime: '2024-01-02T00:00:00.000Z',
    authors: ['Author Name'],
    section: 'Technology',
    tags: ['Next.js', 'React', 'SEO']
  }
}

Dynamic OG Images:
// app/blog/[slug]/opengraph-image.js
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const post = await fetchPost(params.slug)
  
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {post.title}
      </div>
    ),
    { ...size }
  )
}

OG Image Best Practices:
- Size: 1200x630px (Facebook, LinkedIn)
- Format: JPG or PNG
- File size: < 5MB
- Aspect ratio: 1.91:1
- Include branding
- Readable text

Testing OG Tags:
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector
- Open Graph Check

=======================================

56. HOW TO GENERATE DYNAMIC SITEMAPS IN NEXT.JS
------------------------------------------------

Sitemaps help search engines discover and index your pages.

App Router (Recommended):
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]
}

Dynamic Sitemap with Database:
// app/sitemap.js
export default async function sitemap() {
  const posts = await fetchAllPosts()
  
  const postUrls = posts.map(post => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7
  }))
  
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    ...postUrls
  ]
}

Multiple Sitemaps:
// app/sitemap.js (index)
export default function sitemap() {
  return [
    {
      url: 'https://example.com/sitemap/posts.xml',
      lastModified: new Date()
    },
    {
      url: 'https://example.com/sitemap/products.xml',
      lastModified: new Date()
    }
  ]
}

// app/sitemap/posts/route.js
export async function GET() {
  const posts = await fetchPosts()
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${posts.map(post => `
        <url>
          <loc>https://example.com/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}

Pages Router (Manual):
// pages/api/sitemap.xml.js
export default async function handler(req, res) {
  const posts = await fetchAllPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://example.com</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${posts.map(post => `
        <url>
          <loc>https://example.com/blog/${post.slug}</loc>
          <lastmod>${post.updatedAt}</lastmod>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`
  
  res.setHeader('Content-Type', 'application/xml')
  res.write(sitemap)
  res.end()
}

Submit to Search Engines:
- Add to robots.txt
- Submit to Google Search Console
- Submit to Bing Webmaster Tools

robots.txt:
// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/']
    },
    sitemap: 'https://example.com/sitemap.xml'
  }
}

=======================================

57. HOW TO IMPLEMENT STRUCTURED DATA (JSON-LD)
------------------------------------------------

Structured data helps search engines understand your content. [web:72][web:75]

Basic JSON-LD:
// app/page.js
export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Company Name',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-555-5555',
      contactType: 'Customer Service'
    }
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>Content</main>
    </>
  )
}

Article Schema:
export default function BlogPost({ post }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.website
    },
    publisher: {
      '@type': 'Organization',
      name: 'Publisher Name',
      logo: {
        '@type': 'ImageObject',
        url: 'https://example.com/logo.png'
      }
    },
    description: post.excerpt
  }
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{post.title}</h1>
        <div>{post.content}</div>
      </article>
    </>
  )
}

Product Schema:
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Product Name',
  image: 'https://example.com/product.jpg',
  description: 'Product description',
  brand: {
    '@type': 'Brand',
    name: 'Brand Name'
  },
  offers: {
    '@type': 'Offer',
    url: 'https://example.com/product',
    priceCurrency: 'USD',
    price: '99.99',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Store Name'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '24'
  }
}

Breadcrumb Schema:
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://example.com'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://example.com/blog'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Post Title',
      item: 'https://example.com/blog/post'
    }
  ]
}

FAQ Schema:
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Next.js is a React framework for production.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do I install Next.js?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Run npx create-next-app@latest'
      }
    }
  ]
}

Reusable Component:
// components/StructuredData.js
export default function StructuredData({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Usage
<StructuredData data={jsonLd} />

Testing Structured Data:
- Google Rich Results Test
- Schema Markup Validator
- Structured Data Testing Tool

Common Schema Types:
- Article, BlogPosting, NewsArticle
- Product, Offer
- Organization, LocalBusiness
- Person
- Recipe
- Event
- FAQ, HowTo
- Breadcrumb
- Review, Rating

=======================================
* /


/*
=======================================
AUTHENTICATION & SECURITY - ANSWERS
=======================================

58. HOW TO IMPLEMENT AUTHENTICATION IN NEXT.JS
------------------------------------------------

Authentication can be implemented using various strategies. [web:77][web:78]

1. Using NextAuth.js (Recommended):
// Install
npm install next-auth

// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await validateUser(credentials.email, credentials.password)
        if (user) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

2. Client-Side Usage:
'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginButton() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') return <div>Loading...</div>
  
  if (session) {
    return (
      <div>
        <p>Welcome {session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }
  
  return <button onClick={() => signIn()}>Sign In</button>
}

3. Server-Side Usage:
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return <div>Protected content for {session.user.email}</div>
}

4. Protecting Routes with Middleware:
// middleware.js
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}

5. Manual JWT Authentication:
// lib/auth.js
import jwt from 'jsonwebtoken'

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return null
  }
}

// Login API route
export async function POST(request) {
  const { email, password } = await request.json()
  const user = await authenticateUser(email, password)
  
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  
  const token = generateToken(user)
  
  return NextResponse.json(
    { user: { id: user.id, email: user.email } },
    {
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`
      }
    }
  )
}

=======================================

59. WHAT IS NEXTAUTH.JS AND HOW TO USE IT
-------------------------------------------

NextAuth.js is the most popular authentication library for Next.js. [web:76][web:79][web:80]

Installation:
npm install next-auth

Setup (App Router):
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Validate credentials against your database
        const user = await db.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (user && await verifyPassword(credentials.password, user.password)) {
          return { id: user.id, email: user.email, name: user.name }
        }
        
        return null
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    
    async session({ session, token }) {
      session.user.id = token.id
      session.user.role = token.role
      return session
    }
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error'
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

Session Provider:
// app/providers.js
'use client'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

// app/layout.js
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

Client Component Usage:
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Profile() {
  const { data: session, status } = useSession()
  
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  
  if (!session) {
    return (
      <div>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign In</button>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
    )
  }
  
  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <img src={session.user.image} alt="Profile" />
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

Server Component Usage:
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }
  
  return <div>Welcome {session.user.name}</div>
}

With Database (Prisma Adapter):
npm install @next-auth/prisma-adapter

// app/api/auth/[...nextauth]/route.js
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [/* ... * /]
}

Benefits:
✅ Built for Next.js
✅ Multiple OAuth providers
✅ JWT or database sessions
✅ TypeScript support
✅ Easy integration
✅ Secure by default

=======================================

60. HOW TO PROTECT API ROUTES WITH AUTHENTICATION
---------------------------------------------------

Protecting API routes ensures only authenticated users can access them.

Pages Router:
// pages/api/protected.js
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  // User is authenticated
  return res.status(200).json({ data: 'Protected data', user: session.user })
}

App Router (Route Handlers):
// app/api/protected/route.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.json({ data: 'Protected data', user: session.user })
}

Using Middleware:
// middleware.js
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional logic here
    console.log('Token:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/api/protected/:path*', '/api/admin/:path*']
}

Custom JWT Verification:
// app/api/protected/route.js
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  
  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 })
  }
  
  const user = verifyToken(token)
  
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
  
  return NextResponse.json({ data: 'Protected data', user })
}

Helper Function Pattern:
// lib/apiAuth.js
export async function requireAuth(handler) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    req.user = session.user
    return handler(req, res)
  }
}

// pages/api/protected.js
import { requireAuth } from '@/lib/apiAuth'

async function handler(req, res) {
  // req.user is available here
  return res.json({ user: req.user })
}

export default requireAuth(handler)

=======================================

61. HOW TO IMPLEMENT ROLE-BASED ACCESS CONTROL (RBAC)
-------------------------------------------------------

RBAC restricts access based on user roles.

Database Schema (Prisma):
model User {
  id       String   @id @default(cuid())
  email    String   @unique
  name     String?
  role     Role     @default(USER)
}

enum Role {
  USER
  ADMIN
  MODERATOR
}

NextAuth Configuration:
// app/api/auth/[...nextauth]/route.js
export const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
}

Middleware Protection:
// middleware.js
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    
    // Admin only routes
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    
    // Moderator or Admin routes
    if (path.startsWith('/moderate') && 
        !['ADMIN', 'MODERATOR'].includes(token?.role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/moderate/:path*', '/dashboard/:path*']
}

Server Component Protection:
// app/admin/page.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/unauthorized')
  }
  
  return <div>Admin Dashboard</div>
}

API Route Protection:
// app/api/admin/route.js
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  return NextResponse.json({ data: 'Admin data' })
}

Reusable Authorization Hook:
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useRequireRole(allowedRoles) {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/login')
    } else if (!allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized')
    }
  }, [session, status, router, allowedRoles])
  
  return { session, status }
}

// Usage
function AdminComponent() {
  const { session } = useRequireRole(['ADMIN'])
  
  if (!session) return <div>Loading...</div>
  
  return <div>Admin Content</div>
}

Component-Level Authorization:
'use client'
export function CanAccess({ roles, children, fallback = null }) {
  const { data: session } = useSession()
  
  if (!session || !roles.includes(session.user.role)) {
    return fallback
  }
  
  return children
}

// Usage
<CanAccess roles={['ADMIN', 'MODERATOR']} fallback={<p>Access denied</p>}>
  <AdminPanel />
</CanAccess>

=======================================

62. HOW TO HANDLE CSRF PROTECTION IN NEXT.JS
---------------------------------------------

CSRF (Cross-Site Request Forgery) protection prevents unauthorized actions. [web:81][web:84]

Built-in CSRF Protection (NextAuth):
NextAuth.js has built-in CSRF protection for authentication routes.

// Automatically included
export const authOptions = {
  // CSRF protection enabled by default
}

Manual CSRF Token Implementation:
// lib/csrf.js
import { randomBytes } from 'crypto'

export function generateCsrfToken() {
  return randomBytes(32).toString('hex')
}

export function verifyCsrfToken(token, storedToken) {
  return token === storedToken
}

// API route to generate token
// app/api/csrf-token/route.js
import { NextResponse } from 'next/server'
import { generateCsrfToken } from '@/lib/csrf'

export async function GET() {
  const token = generateCsrfToken()
  
  return NextResponse.json(
    { csrfToken: token },
    {
      headers: {
        'Set-Cookie': `csrf-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`
      }
    }
  )
}

Using CSRF in Forms:
'use client'
import { useState, useEffect } from 'react'

export default function Form() {
  const [csrfToken, setCsrfToken] = useState('')
  
  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken))
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <input type="text" name="data" />
      <button type="submit">Submit</button>
    </form>
  )
}

Verifying CSRF Token:
// app/api/submit/route.js
import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const headersList = headers()
  const cookieStore = cookies()
  
  const csrfTokenFromHeader = headersList.get('X-CSRF-Token')
  const csrfTokenFromCookie = cookieStore.get('csrf-token')?.value
  
  if (!csrfTokenFromHeader || csrfTokenFromHeader !== csrfTokenFromCookie) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
  }
  
  // Process request
  return NextResponse.json({ success: true })
}

SameSite Cookie Strategy:
// Set cookies with SameSite=Strict
response.headers.set(
  'Set-Cookie',
  'session=value; HttpOnly; Secure; SameSite=Strict; Path=/'
)

Additional Security Measures:
1. Use HTTPS in production
2. Set SameSite cookie attribute
3. Verify Origin/Referer headers
4. Use short-lived tokens
5. Implement rate limiting

=======================================

63. BEST PRACTICES FOR HANDLING SECRETS AND SENSITIVE DATA
-----------------------------------------------------------

Proper secret management is crucial for security. [web:81][web:84]

1. Environment Variables:
// .env.local (never commit this file)
DATABASE_URL="postgresql://user:password@localhost:5432/db"
JWT_SECRET="your-secret-key-here"
NEXTAUTH_SECRET="nextauth-secret"
API_KEY="api-key-here"

// next.config.js
module.exports = {
  env: {
    // Only expose public variables
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  }
}

// Usage
const secret = process.env.JWT_SECRET // Server-side only
const publicUrl = process.env.NEXT_PUBLIC_API_URL // Client-side accessible

2. .gitignore Configuration:
.env*.local
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

3. Server-Only Code:
// lib/server-only-utils.js
import 'server-only' // Ensures this file never bundles for client

export async function getSecretData() {
  const apiKey = process.env.SECRET_API_KEY
  return fetch('https://api.example.com', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })
}

4. Separate Public/Private Variables:
// Public (accessible from browser)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_ANALYTICS_ID="UA-XXXXX"

// Private (server-only)
DATABASE_URL="..."
JWT_SECRET="..."
PRIVATE_API_KEY="..."

5. Use Key Management Services:
// For production, use services like:
- AWS Secrets Manager
- Google Secret Manager
- HashiCorp Vault
- Azure Key Vault

// Example with AWS
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

async function getSecret() {
  const client = new SecretsManagerClient({ region: 'us-east-1' })
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: 'my-secret' })
  )
  return JSON.parse(response.SecretString)
}

6. Validate Environment Variables:
// lib/env.js
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url()
})

export const env = envSchema.parse(process.env)

7. Never Log Secrets:
// Bad
console.log('Token:', process.env.JWT_SECRET)

// Good
console.log('Token:', '***')

8. Rotate Secrets Regularly:
- Change secrets periodically
- Invalidate old tokens
- Update in production safely

9. Use Different Secrets Per Environment:
// .env.development.local
DATABASE_URL="postgresql://localhost:5432/dev"

// .env.production.local
DATABASE_URL="postgresql://prod-server:5432/prod"

10. Server Actions Security:
'use server'

export async function sensitiveAction() {
  const apiKey = process.env.PRIVATE_API_KEY // Safe - runs on server
  return await fetch('https://api.example.com', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  })
}

Security Checklist:
✅ Never commit .env files
✅ Use NEXT_PUBLIC_ prefix only for public vars
✅ Validate environment variables on startup
✅ Use HTTPS in production
✅ Rotate secrets regularly
✅ Use key management services for production
✅ Never log sensitive data
✅ Use 'server-only' package for server code
✅ Separate dev/prod secrets
✅ Implement proper access controls

=======================================
ERROR HANDLING & DEBUGGING - ANSWERS
=======================================

64. HOW TO CREATE A CUSTOM 404 PAGE
-------------------------------------

Pages Router:
// pages/404.js
export default function Custom404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  )
}

// With layout
import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link href="/">Return to Homepage</Link>
    </div>
  )
}

App Router:
// app/not-found.js
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

Programmatic 404:
// app/blog/[slug]/page.js
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }) {
  const post = await fetchPost(params.slug)
  
  if (!post) {
    notFound() // Triggers not-found.js
  }
  
  return <article>{post.content}</article>
}

Styled 404 Page:
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link 
          href="/" 
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

=======================================

65. HOW TO IMPLEMENT CUSTOM ERROR PAGES (_error.js)
-----------------------------------------------------

Pages Router:
// pages/_error.js
function Error({ statusCode }) {
  return (
    <div>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </h1>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

Custom Error Page:
function Error({ statusCode, message }) {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Error {statusCode}</h1>
      <p>{message || 'An unexpected error occurred'}</p>
      <a href="/">Go back home</a>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  let statusCode = 500
  let message = 'Internal Server Error'
  
  if (res) {
    statusCode = res.statusCode
  } else if (err) {
    statusCode = err.statusCode || 500
    message = err.message
  }
  
  return { statusCode, message }
}

500 Error Page:
// pages/500.js
export default function Custom500() {
  return (
    <div>
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
    </div>
  )
}

=======================================

66. HOW TO HANDLE ERROR BOUNDARIES IN NEXT.JS
------------------------------------------------

Error boundaries catch JavaScript errors in components. [web:82][web:85]

Class Component Error Boundary:
// components/ErrorBoundary.js
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo)
    // Log to error reporting service
    // logErrorToService(error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}

export default ErrorBoundary

Usage:
// pages/_app.js
import ErrorBoundary from '@/components/ErrorBoundary'

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

Multiple Error Boundaries:
export default function Layout() {
  return (
    <div>
      <Header />
      
      <ErrorBoundary fallback={<div>Sidebar error</div>}>
        <Sidebar />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>Content error</div>}>
        <Content />
      </ErrorBoundary>
    </div>
  )
}

=======================================

67. WHAT IS error.js IN THE APP ROUTER
----------------------------------------

error.js creates error UI for route segments in App Router. [web:82]

Basic Error Page:
// app/error.js
'use client' // Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

Nested Error Handling:
// app/dashboard/error.js
'use client'

export default function DashboardError({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Dashboard Error</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </div>
  )
}

With Logging:
'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to reporting service
    console.error('Error:', error)
    // sendToErrorReporting(error)
  }, [error])
  
  return (
    <div>
      <h2>Error occurred</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

Global Error (Wraps Root Layout):
// app/global-error.js
'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Something went wrong globally!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

Error Hierarchy:
app/
  error.js              → Catches errors in app/*
  dashboard/
    error.js            → Catches errors in dashboard/*
    settings/
      error.js          → Catches errors in settings/*

=======================================

68. HOW TO DEBUG NEXT.JS APPLICATIONS
---------------------------------------

Debugging techniques and tools for Next.js.

1. Console Logging:
// Server Component (logs in terminal)
export default async function Page() {
  const data = await fetchData()
  console.log('Server data:', data) // Terminal output
  return <div>{data}</div>
}

// Client Component (logs in browser)
'use client'
export default function Component() {
  console.log('Client render') // Browser console
  return <div>Content</div>
}

2. VS Code Debugger:
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}

3. React DevTools:
- Install React DevTools browser extension
- Inspect component tree
- View props and state
- Profile performance

4. Network Tab Debugging:
- Check API requests/responses
- Verify headers and payloads
- Monitor loading times

5. Source Maps:
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true // Enable in production
}

6. Error Logging:
// lib/logger.js
export function logError(error, context) {
  console.error('Error:', error)
  console.error('Context:', context)
  
  // Send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureException(error)
  }
}

7. Performance Debugging:
import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

8. Bundle Analysis:
npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({})

// Run
ANALYZE=true npm run build

9. Debug Rendering:
'use client'
import { useEffect } from 'react'

export default function Component() {
  useEffect(() => {
    console.log('Component mounted')
    return () => console.log('Component unmounted')
  }, [])
  
  console.log('Component rendering')
  return <div>Content</div>
}

10. Lighthouse Audit:
- Open Chrome DevTools
- Go to Lighthouse tab
- Run performance audit
- Review recommendations

Tools:
- React DevTools
- Chrome DevTools
- VS Code Debugger
- Next.js built-in error overlay
- Vercel Analytics
- Sentry (error tracking)
- LogRocket (session replay)

=======================================
* /


/*
=======================================
DEPLOYMENT & CONFIGURATION - ANSWERS
=======================================

69. HOW TO CONFIGURE ENVIRONMENT VARIABLES IN NEXT.JS
-------------------------------------------------------

Environment variables configure your app for different environments. [web:86][web:88][web:89]

1. Environment Variable Files:
.env.local          → All environments (highest priority, never commit)
.env.development    → Development only
.env.production     → Production only
.env.test           → Test environment
.env                → Default for all environments (can commit)

Priority (highest to lowest):
1. .env.local
2. .env.[environment].local
3. .env.[environment]
4. .env

2. Basic Usage:
// .env.local
DATABASE_URL="postgresql://localhost:5432/mydb"
JWT_SECRET="my-secret-key"
API_KEY="secret-api-key"

// Server-side usage (safe)
export default async function Page() {
  const dbUrl = process.env.DATABASE_URL
  const data = await fetchFromDB(dbUrl)
  return <div>{data}</div>
}

3. Public Variables (Client-side):
// .env.local
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_ANALYTICS_ID="UA-XXXXX"

// Client component
'use client'
export default function Component() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL // Available in browser
  return <div>API: {apiUrl}</div>
}

4. Loading in next.config.js:
// next.config.js
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY
  }
}

5. Programmatic Access:
// lib/env.js
export const env = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  apiUrl: process.env.NEXT_PUBLIC_API_URL
}

// Usage
import { env } from '@/lib/env'
const connection = createConnection(env.databaseUrl)

6. Type-Safe Environment Variables:
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    JWT_SECRET: string
    NEXT_PUBLIC_API_URL: string
  }
}

// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NEXT_PUBLIC_API_URL: z.string().url()
})

export const env = envSchema.parse(process.env)

7. Runtime Variables (App Router):
// app/api/route.js
export async function GET() {
  const secret = process.env.API_SECRET // Available at runtime
  return Response.json({ status: 'ok' })
}

Important Rules:
✅ Prefix with NEXT_PUBLIC_ for client access
✅ Never commit .env.local files
✅ Server variables NOT accessible in browser
✅ Environment variables are replaced at build time
✅ Restart dev server after changing .env

=======================================

70. DEPLOYMENT STRATEGIES FOR NEXT.JS APPLICATIONS
----------------------------------------------------

Next.js supports multiple deployment strategies. [web:91]

1. Vercel (Recommended):
- Zero-config deployment
- Automatic HTTPS
- Preview deployments
- Edge Network
- Analytics built-in

Deploy:
npm install -g vercel
vercel

2. Self-Hosted (Node.js Server):
// Build application
npm run build

// Start production server
npm start

// Or with PM2
pm2 start npm --name "nextjs" -- start

// package.json
{
  "scripts": {
    "build": "next build",
    "start": "next start -p 3000"
  }
}

3. Docker Container: [web:91]
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

# Build and run
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app

4. Static Export (SSG Only):
// next.config.js
module.exports = {
  output: 'export'
}

// Build
npm run build
# Outputs to 'out' folder

// Deploy to any static host (Netlify, GitHub Pages, S3)

5. Serverless (AWS Lambda, etc.):
// Use Serverless Framework or AWS CDK
npm install -g serverless
serverless deploy

6. Edge Runtime (Vercel Edge Functions):
export const runtime = 'edge'

export async function GET() {
  return new Response('Hello from Edge')
}

7. Incremental Static Regeneration (ISR):
export async function generateStaticParams() {
  return [{ slug: 'post-1' }, { slug: 'post-2' }]
}

export const revalidate = 60 // Revalidate every 60 seconds

Comparison:

Vercel:
✅ Easiest deployment
✅ Automatic scaling
✅ Preview deployments
✅ Built-in CDN
❌ Vendor lock-in
❌ Can be expensive at scale

Self-Hosted (Node.js):
✅ Full control
✅ Cost-effective
✅ No vendor lock-in
❌ Manual scaling
❌ Requires DevOps knowledge

Docker:
✅ Portable
✅ Works anywhere
✅ Isolated environment
❌ More complex setup
❌ Need container orchestration

Static Export:
✅ Cheapest (host anywhere)
✅ Fast (CDN)
✅ Secure (no server)
❌ No SSR/ISR
❌ No API routes
❌ Limited features

=======================================

71. DEPLOYING NEXT.JS ON VERCEL VS OTHER PLATFORMS
---------------------------------------------------

Vercel Deployment:

1. Install Vercel CLI:
npm install -g vercel

2. Deploy:
# From project directory
vercel

# Production deployment
vercel --prod

3. Configuration:
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database-url"
  },
  "regions": ["iad1"],
  "functions": {
    "api/** /*.js": {
      "maxDuration": 30
    }
  }
}

4. GitHub Integration:
- Connect repository to Vercel
- Automatic deployments on push
- Preview URLs for pull requests

AWS Deployment:

1. Using Amplify:
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish

2. Using EC2:
# On EC2 instance
git clone your-repo
cd your-repo
npm install
npm run build
pm2 start npm --name "nextjs" -- start

3. Using ECS (Docker):
# Build Docker image
docker build -t nextjs-app .

# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.region.amazonaws.com
docker tag nextjs-app:latest <account>.dkr.ecr.region.amazonaws.com/nextjs-app:latest
docker push <account>.dkr.ecr.region.amazonaws.com/nextjs-app:latest

# Deploy to ECS
aws ecs update-service --cluster my-cluster --service nextjs-service --force-new-deployment

4. Using S3 + CloudFront (Static Export):
# Build static export
npm run build

# Upload to S3
aws s3 sync out/ s3://my-bucket/ --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"

Netlify Deployment:

1. Install CLI:
npm install -g netlify-cli

2. Deploy:
netlify deploy

# Production
netlify deploy --prod

3. Configuration:
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

Railway Deployment:

1. Install CLI:
npm install -g @railway/cli

2. Deploy:
railway login
railway init
railway up

DigitalOcean App Platform:

1. Connect GitHub repository
2. Configure build settings:
   - Build Command: npm run build
   - Run Command: npm start
3. Deploy

Comparison:

Vercel:
✅ Best Next.js support (made by same team)
✅ Zero config
✅ Automatic preview deployments
✅ Edge Network
✅ Built-in analytics
❌ More expensive at scale
❌ Vendor lock-in

AWS:
✅ More control
✅ Better for large scale
✅ Cheaper at scale
✅ Integrates with AWS services
❌ More complex setup
❌ Requires AWS knowledge

Netlify:
✅ Good DX
✅ Generous free tier
✅ Easy CI/CD
❌ Less optimized for Next.js
❌ Some features limited

Railway:
✅ Simple deployment
✅ Good for small projects
✅ Affordable
❌ Smaller community
❌ Limited regions

=======================================

72. WHAT IS next.config.js AND WHAT CAN YOU CONFIGURE
-------------------------------------------------------

next.config.js is the configuration file for Next.js. [web:87][web:92]

Basic Structure:
// next.config.js
/** @type {import('next').NextConfig} * /
const nextConfig = {
  // Configuration options
}

module.exports = nextConfig

Common Configurations:

1. Images:
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    minimumCacheTTL: 60
  }
}

2. Redirects and Rewrites:
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      },
      {
        source: '/blog/:slug',
        destination: '/news/:slug',
        permanent: false
      }
    ]
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://external-api.com/:path*'
      }
    ]
  }
}

3. Headers:
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ]
  }
}

4. Environment Variables:
module.exports = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    API_URL: 'https://api.example.com'
  }
}

5. Base Path and Asset Prefix:
module.exports = {
  basePath: '/docs',
  assetPrefix: 'https://cdn.example.com'
}

6. Output Configuration:
module.exports = {
  output: 'standalone', // For Docker
  // output: 'export', // For static export
}

7. Compiler Options:
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
    reactRemoveProperties: true
  }
}

8. React Strict Mode:
module.exports = {
  reactStrictMode: true
}

9. TypeScript:
module.exports = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json'
  }
}

10. Page Extensions:
module.exports = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']
}

11. Trailing Slash:
module.exports = {
  trailingSlash: true // Adds trailing slash to URLs
}

12. Compression:
module.exports = {
  compress: true // Enable gzip compression
}

13. PoweredByHeader:
module.exports = {
  poweredByHeader: false // Remove X-Powered-By header
}

14. Generate Build ID:
module.exports = {
  generateBuildId: async () => {
    return process.env.GIT_COMMIT_SHA || 'my-build-id'
  }
}

Complete Example:
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com' }
    ]
  },
  
  async redirects() {
    return [
      { source: '/old', destination: '/new', permanent: true }
    ]
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
        ]
      }
    ]
  },
  
  env: {
    CUSTOM_VAR: process.env.CUSTOM_VAR
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
}

module.exports = nextConfig

=======================================

73. HOW TO IMPLEMENT CUSTOM WEBPACK CONFIGURATION
---------------------------------------------------

Customize webpack config for advanced use cases. [web:92][web:95]

Basic Webpack Customization:
// next.config.js
const path = require('path')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config: current webpack config
    // buildId: unique build identifier
    // dev: true in development
    // isServer: true for server bundle
    // defaultLoaders: Next.js default loaders
    // webpack: webpack module
    
    // Modify and return config
    return config
  }
}

1. Add Webpack Alias:
module.exports = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'components')
    config.resolve.alias['@lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['@styles'] = path.join(__dirname, 'styles')
    
    return config
  }
}

// Usage
import Button from '@components/Button'
import { api } from '@lib/api'

2. Add Custom Loader:
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    return config
  }
}

// Now import SVGs as React components
import Logo from './logo.svg'
<Logo />

3. Add Webpack Plugin:
const webpack = require('webpack')

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.CUSTOM_VAR': JSON.stringify('value')
        })
      )
    }
    
    return config
  }
}

4. Bundle Analyzer:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  webpack: (config) => {
    // Additional webpack config
    return config
  }
})

5. Ignore Certain Packages:
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false
      }
    }
    
    return config
  }
}

6. Add Custom Module:
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })
    
    return config
  }
}

7. Modify Output:
module.exports = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.output.filename = 'static/chunks/[name].[contenthash].js'
    }
    
    return config
  }
}

8. Add External Dependencies:
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('some-large-library')
    }
    
    return config
  }
}

9. Resolve Extensions:
module.exports = {
  webpack: (config) => {
    config.resolve.extensions.push('.ts', '.tsx', '.mdx')
    
    return config
  }
}

10. Custom Optimization:
module.exports = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2
          }
        }
      }
    }
    
    return config
  }
}

Complete Example:
const path = require('path')
const webpack = require('webpack')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add aliases
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    
    // Add custom loaders
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    
    // Add plugins
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react'
      })
    )
    
    // Ignore certain files
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      }
    }
    
    return config
  }
}

Important: Always return the modified config

=======================================

74. HOW TO SET UP ENVIRONMENT-SPECIFIC CONFIGURATIONS
-------------------------------------------------------

Manage configurations for different environments. [web:90]

1. Multiple .env Files:
.env.development      → Development
.env.production       → Production
.env.staging          → Staging
.env.local            → Local overrides

// .env.development
DATABASE_URL="postgresql://localhost:5432/dev"
API_URL="http://localhost:8000"
DEBUG="true"

// .env.production
DATABASE_URL="postgresql://prod-server:5432/prod"
API_URL="https://api.example.com"
DEBUG="false"

2. Dynamic Config Loading:
// next.config.js
const getConfig = () => {
  const env = process.env.NODE_ENV
  
  if (env === 'production') {
    return {
      basePath: '',
      assetPrefix: 'https://cdn.example.com',
      compress: true
    }
  }
  
  if (env === 'development') {
    return {
      compress: false,
      reactStrictMode: true
    }
  }
  
  return {}
}

module.exports = getConfig()

3. Custom Environment Scripts:
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:staging": "ENVIRONMENT=staging next build",
    "build:production": "ENVIRONMENT=production next build",
    "start": "next start",
    "start:staging": "ENVIRONMENT=staging next start"
  }
}

4. Load Different .env Files:
// next.config.js
require('dotenv').config({
  path: `.env.${process.env.ENVIRONMENT || 'development'}`
})

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    DATABASE_URL: process.env.DATABASE_URL
  }
}

// Run with custom environment
ENVIRONMENT=staging npm run build

5. Config File Per Environment:
// config/development.js
module.exports = {
  api: {
    url: 'http://localhost:8000',
    timeout: 5000
  },
  features: {
    enableAnalytics: false,
    debugMode: true
  }
}

// config/production.js
module.exports = {
  api: {
    url: 'https://api.example.com',
    timeout: 10000
  },
  features: {
    enableAnalytics: true,
    debugMode: false
  }
}

// config/index.js
const env = process.env.NODE_ENV || 'development'
module.exports = require(`./${env}`)

// Usage
import config from '@/config'
fetch(config.api.url)

6. Type-Safe Config:
// lib/config.ts
type Environment = 'development' | 'staging' | 'production'

interface Config {
  apiUrl: string
  dbUrl: string
  features: {
    analytics: boolean
    debug: boolean
  }
}

const configs: Record<Environment, Config> = {
  development: {
    apiUrl: 'http://localhost:8000',
    dbUrl: 'postgresql://localhost:5432/dev',
    features: { analytics: false, debug: true }
  },
  staging: {
    apiUrl: 'https://staging-api.example.com',
    dbUrl: process.env.DATABASE_URL!,
    features: { analytics: true, debug: true }
  },
  production: {
    apiUrl: 'https://api.example.com',
    dbUrl: process.env.DATABASE_URL!,
    features: { analytics: true, debug: false }
  }
}

const env = (process.env.NODE_ENV || 'development') as Environment
export const config = configs[env]

7. Runtime Config (Deprecated, use env vars):
// next.config.js
module.exports = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL
  },
  serverRuntimeConfig: {
    dbUrl: process.env.DATABASE_URL
  }
}

// Usage (Pages Router only)
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

8. Feature Flags:
// lib/features.ts
export const features = {
  newDashboard: process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD === 'true',
  betaFeatures: process.env.NEXT_PUBLIC_BETA_FEATURES === 'true'
}

// Usage
import { features } from '@/lib/features'

if (features.newDashboard) {
  return <NewDashboard />
}

9. Docker Multi-Stage Build:
# Dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG ENVIRONMENT=production
ENV NODE_ENV=${ENVIRONMENT}

RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]

# Build for different environments
docker build --build-arg ENVIRONMENT=staging -t app:staging .
docker build --build-arg ENVIRONMENT=production -t app:production .

Best Practices:
✅ Use .env files for secrets
✅ Use config files for app settings
✅ Never commit sensitive data
✅ Validate environment variables on startup
✅ Use TypeScript for type-safe config
✅ Document required environment variables
✅ Use feature flags for gradual rollouts
✅ Keep configs simple and maintainable

=======================================
* /


/*
=======================================
ADVANCED TOPICS - ANSWERS
=======================================

75. HOW TO IMPLEMENT PROGRESSIVE WEB APP (PWA) FEATURES
--------------------------------------------------------

PWAs provide native app-like experience on the web. [web:97]

1. Install next-pwa:
npm install next-pwa

2. Configure next.config.js:
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  // Your Next.js config
})

3. Create manifest.json:
// public/manifest.json
{
  "name": "My Next.js PWA",
  "short_name": "NextPWA",
  "description": "A Progressive Web App built with Next.js",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

4. Add to layout/head:
// app/layout.js
export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My PWA'
  }
}

5. Offline Support:
// Service worker auto-generated by next-pwa
// Caches pages, images, and assets

6. Install Prompt:
'use client'
import { useEffect, useState } from 'react'

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])
  
  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA installed')
    }
    
    setDeferredPrompt(null)
  }
  
  if (!deferredPrompt) return null
  
  return <button onClick={handleInstall}>Install App</button>
}

7. Push Notifications:
// Request permission
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission()
  
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.ready
    await registration.showNotification('Hello!', {
      body: 'This is a push notification',
      icon: '/icon-192x192.png'
    })
  }
}

PWA Features:
✅ Offline functionality
✅ Add to home screen
✅ Push notifications
✅ Background sync
✅ App-like experience
✅ Fast loading

=======================================

76. HOW TO INTEGRATE GRAPHQL IN NEXT.JS APPLICATIONS
-------------------------------------------------------

GraphQL provides efficient data fetching. [web:96][web:100]

1. Install Apollo Client:
npm install @apollo/client graphql

2. Setup Apollo Client:
// lib/apollo-client.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'https://api.example.com/graphql'
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined'
})

3. App Router Setup:
// app/providers.js
'use client'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/apollo-client'

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

// app/layout.js
import { ApolloWrapper } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  )
}

4. Client Component Query:
'use client'
import { useQuery, gql } from '@apollo/client'

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author {
        name
      }
    }
  }
`

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By {post.author.name}</small>
        </article>
      ))}
    </div>
  )
}

5. Server Component Query:
// app/posts/page.js
import { client } from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`

export default async function Posts() {
  const { data } = await client.query({ query: GET_POSTS })
  
  return (
    <div>
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}

6. Mutations:
'use client'
import { useMutation, gql } from '@apollo/client'

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

export default function CreatePost() {
  const [createPost, { data, loading, error }] = useMutation(CREATE_POST)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    await createPost({
      variables: {
        title: formData.get('title'),
        content: formData.get('content')
      }
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit" disabled={loading}>Create</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}

7. With TypeScript:
import { TypedDocumentNode, gql } from '@apollo/client'

interface Post {
  id: string
  title: string
  content: string
}

interface PostsData {
  posts: Post[]
}

const GET_POSTS: TypedDocumentNode<PostsData> = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`

=======================================

77. HOW TO HANDLE FILE UPLOADS IN NEXT.JS
------------------------------------------

File uploads can be handled server-side or with cloud storage. [web:101]

1. Basic File Upload (API Route):
// app/api/upload/route.js
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const filename = `${Date.now()}-${file.name}`
  const filepath = path.join(process.cwd(), 'public/uploads', filename)
  
  await writeFile(filepath, buffer)
  
  return NextResponse.json({ 
    success: true, 
    url: `/uploads/${filename}` 
  })
}

2. Client Component:
'use client'
import { useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return
    
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await res.json()
      setUploadedUrl(data.url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0])} 
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadedUrl && <img src={uploadedUrl} alt="Uploaded" />}
    </form>
  )
}

3. AWS S3 Upload:
// Install AWS SDK
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

// app/api/upload/s3/route.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export async function POST(request) {
  const { filename, contentType } = await request.json()
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `uploads/${Date.now()}-${filename}`,
    ContentType: contentType
  })
  
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  
  return NextResponse.json({ uploadUrl })
}

// Client usage
const handleUpload = async (file) => {
  // Get presigned URL
  const res = await fetch('/api/upload/s3', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type
    })
  })
  
  const { uploadUrl } = await res.json()
  
  // Upload directly to S3
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type }
  })
}

4. Multiple Files:
export async function POST(request) {
  const formData = await request.formData()
  const files = formData.getAll('files')
  
  const uploadedFiles = await Promise.all(
    files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${file.name}`
      await writeFile(`public/uploads/${filename}`, buffer)
      return { filename, url: `/uploads/${filename}` }
    })
  )
  
  return NextResponse.json({ files: uploadedFiles })
}

5. With Cloudinary:
npm install cloudinary

// app/api/upload/cloudinary/route.js
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'uploads' },
      (error, result) => {
        if (error) reject(error)
        else resolve(NextResponse.json({ url: result.secure_url }))
      }
    ).end(buffer)
  })
}

=======================================

78. STRATEGIES FOR IMPLEMENTING MICRO-FRONTENDS
-------------------------------------------------

Micro-frontends split large apps into smaller, independently deployable parts. [web:104]

1. Next.js Multi-Zones:
// Main app (main-app)
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:path*',
        destination: 'https://blog.example.com/:path*'
      },
      {
        source: '/shop/:path*',
        destination: 'https://shop.example.com/:path*'
      }
    ]
  }
}

// Blog app (separate Next.js app)
// next.config.js
module.exports = {
  basePath: '/blog'
}

// Shop app (separate Next.js app)
// next.config.js
module.exports = {
  basePath: '/shop'
}

2. Module Federation:
npm install @module-federation/nextjs-mf

// Host app next.config.js
const { NextFederationPlugin } = require('@module-federation/nextjs-mf')

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            shop: 'shop@http://localhost:3001/_next/static/chunks/remoteEntry.js'
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true }
          }
        })
      )
    }
    return config
  }
}

// Remote app next.config.js
config.plugins.push(
  new NextFederationPlugin({
    name: 'shop',
    filename: 'static/chunks/remoteEntry.js',
    exposes: {
      './ProductList': './components/ProductList'
    }
  })
)

// Usage in host
import dynamic from 'next/dynamic'

const ProductList = dynamic(() => import('shop/ProductList'), {
  ssr: false
})

3. Iframe Approach:
export default function MicroFrontend({ src }) {
  return (
    <iframe
      src={src}
      style={{ width: '100%', height: '100%', border: 'none' }}
      sandbox="allow-scripts allow-same-origin"
    />
  )
}

4. Component-Level Integration:
// Shared component library
// packages/ui/Button.js
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

// App 1 uses: import { Button } from '@company/ui'
// App 2 uses: import { Button } from '@company/ui'

Strategies:
- Multi-Zones: Separate Next.js apps under one domain
- Module Federation: Share components at runtime
- Monorepo: Share code via packages
- Iframe: Fully isolated apps
- Web Components: Framework-agnostic components

=======================================

79. HOW TO IMPLEMENT WEBSOCKET CONNECTIONS
--------------------------------------------

WebSockets enable real-time bidirectional communication.

1. Using Socket.io (Client):
npm install socket.io-client

// lib/socket.js
import { io } from 'socket.io-client'

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
  autoConnect: false
})

// Component
'use client'
import { useEffect, useState } from 'react'
import { socket } from '@/lib/socket'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  useEffect(() => {
    socket.connect()
    
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message])
    })
    
    return () => {
      socket.off('message')
      socket.disconnect()
    }
  }, [])
  
  const sendMessage = () => {
    socket.emit('message', input)
    setInput('')
  }
  
  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

2. Socket.io Server (Custom Server):
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })
  
  const io = new Server(server)
  
  io.on('connection', (socket) => {
    console.log('Client connected')
    
    socket.on('message', (data) => {
      io.emit('message', data)
    })
    
    socket.on('disconnect', () => {
      console.log('Client disconnected')
    })
  })
  
  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000')
  })
})

3. Native WebSocket:
'use client'
import { useEffect, useState } from 'react'

export default function WebSocketComponent() {
  const [ws, setWs] = useState(null)
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080')
    
    websocket.onopen = () => {
      console.log('Connected')
    }
    
    websocket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data])
    }
    
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
    
    websocket.onclose = () => {
      console.log('Disconnected')
    }
    
    setWs(websocket)
    
    return () => websocket.close()
  }, [])
  
  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message)
    }
  }
  
  return (
    <div>
      {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      <button onClick={() => sendMessage('Hello')}>Send</button>
    </div>
  )
}

4. Using Pusher (Managed Service):
npm install pusher-js

// lib/pusher.js
import Pusher from 'pusher-js'

export const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
})

// Component
'use client'
import { useEffect, useState } from 'react'
import { pusher } from '@/lib/pusher'

export default function RealtimeComponent() {
  const [messages, setMessages] = useState([])
  
  useEffect(() => {
    const channel = pusher.subscribe('chat')
    
    channel.bind('message', (data) => {
      setMessages((prev) => [...prev, data])
    })
    
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])
  
  return <div>{/* Render messages * /}</div>
}

=======================================

80. HOW TO INTEGRATE A CMS WITH NEXT.JS
------------------------------------------

CMS integration allows content management separate from code. [web:102]

1. Headless CMS (Contentful):
npm install contentful

// lib/contentful.js
import { createClient } from 'contentful'

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

// app/blog/page.js
import { client } from '@/lib/contentful'

export default async function Blog() {
  const entries = await client.getEntries({ content_type: 'blogPost' })
  
  return (
    <div>
      {entries.items.map(post => (
        <article key={post.sys.id}>
          <h2>{post.fields.title}</h2>
          <p>{post.fields.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

2. Strapi:
// lib/strapi.js
export async function fetchAPI(path) {
  const res = await fetch(`${process.env.STRAPI_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
  })
  return res.json()
}

// app/posts/page.js
import { fetchAPI } from '@/lib/strapi'

export default async function Posts() {
  const { data } = await fetchAPI('/api/posts?populate=*')
  
  return (
    <div>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.attributes.title}</h2>
          <div>{post.attributes.content}</div>
        </article>
      ))}
    </div>
  )
}

3. Sanity:
npm install @sanity/client next-sanity

// lib/sanity.js
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true
})

// app/blog/page.js
import { client } from '@/lib/sanity'

export default async function Blog() {
  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    slug,
    body
  }`)
  
  return (
    <div>
      {posts.map(post => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </article>
      ))}
    </div>
  )
}

4. WordPress (Headless):
// lib/wordpress.js
export async function fetchPosts() {
  const res = await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/posts`)
  return res.json()
}

5. Prismic:
npm install @prismicio/client @prismicio/next

// lib/prismic.js
import * as prismic from '@prismicio/client'

export const client = prismic.createClient(process.env.PRISMIC_REPOSITORY_NAME)

=======================================

81. HOW TO IMPLEMENT A/B TESTING IN NEXT.JS
---------------------------------------------

A/B testing compares variations to optimize user experience. [web:102][web:105]

1. Using GrowthBook:
npm install @growthbook/growthbook-react

// lib/growthbook.js
import { GrowthBook } from '@growthbook/growthbook-react'

export const gb = new GrowthBook({
  apiHost: 'https://cdn.growthbook.io',
  clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  enableDevMode: process.env.NODE_ENV === 'development'
})

// app/providers.js
'use client'
import { GrowthBookProvider } from '@growthbook/growthbook-react'
import { gb } from '@/lib/growthbook'
import { useEffect } from 'react'

export function ABTestProvider({ children }) {
  useEffect(() => {
    gb.loadFeatures()
  }, [])
  
  return <GrowthBookProvider growthbook={gb}>{children}</GrowthBookProvider>
}

// Component
'use client'
import { useFeature } from '@growthbook/growthbook-react'

export default function Hero() {
  const feature = useFeature('new-hero-design')
  
  if (feature.on) {
    return <NewHeroDesign />
  }
  
  return <OldHeroDesign />
}

2. Manual Implementation with Middleware:
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const variant = request.cookies.get('ab-test-variant')?.value
  
  if (!variant) {
    const newVariant = Math.random() < 0.5 ? 'A' : 'B'
    const response = NextResponse.next()
    response.cookies.set('ab-test-variant', newVariant)
    return response
  }
  
  return NextResponse.next()
}

// Component
'use client'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function ABTestComponent() {
  const [variant, setVariant] = useState(null)
  
  useEffect(() => {
    setVariant(Cookies.get('ab-test-variant'))
  }, [])
  
  if (variant === 'A') return <VariantA />
  if (variant === 'B') return <VariantB />
  
  return null
}

3. Using Vercel Edge Config:
// Track experiment
const trackExperiment = async (variant) => {
  await fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      event: 'experiment_viewed',
      variant
    })
  })
}

=======================================

82. BEST PRACTICES FOR ORGANIZING CODE STRUCTURE IN LARGE PROJECTS
--------------------------------------------------------------------

Proper structure improves maintainability and scalability.

Recommended Structure:
project/
  ├── app/                      # App Router (Next.js 13+)
  │   ├── (auth)/              # Route group
  │   │   ├── login/
  │   │   └── register/
  │   ├── (dashboard)/         # Route group
  │   │   ├── layout.js
  │   │   ├── page.js
  │   │   └── settings/
  │   ├── api/                 # API routes
  │   │   ├── auth/
  │   │   └── users/
  │   ├── layout.js
  │   └── page.js
  ├── components/              # Reusable components
  │   ├── ui/                  # UI components
  │   │   ├── Button.js
  │   │   └── Input.js
  │   ├── features/            # Feature-specific
  │   │   ├── auth/
  │   │   └── dashboard/
  │   └── layouts/             # Layout components
  ├── lib/                     # Utilities & configs
  │   ├── api.js
  │   ├── auth.js
  │   ├── db.js
  │   └── utils.js
  ├── hooks/                   # Custom React hooks
  │   ├── useAuth.js
  │   └── useUser.js
  ├── types/                   # TypeScript types
  │   ├── user.ts
  │   └── post.ts
  ├── styles/                  # Global styles
  │   └── globals.css
  ├── public/                  # Static assets
  └── config/                  # Configuration files

Feature-Based Structure (Alternative):
project/
  ├── features/
  │   ├── auth/
  │   │   ├── components/
  │   │   ├── hooks/
  │   │   ├── api/
  │   │   └── types/
  │   ├── posts/
  │   │   ├── components/
  │   │   ├── hooks/
  │   │   └── api/
  │   └── users/

Best Practices:
✅ Group by feature, not by type
✅ Keep components small and focused
✅ Colocate related files
✅ Use barrel exports (index.js)
✅ Separate business logic from UI
✅ Use TypeScript for type safety
✅ Create shared component library
✅ Implement proper error boundaries

=======================================

83. HOW TO IMPLEMENT FEATURE FLAGS
-------------------------------------

Feature flags enable/disable features without deployment.

1. Simple Environment-Based:
// lib/features.js
export const features = {
  newDashboard: process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD === 'true',
  betaMode: process.env.NEXT_PUBLIC_BETA_MODE === 'true'
}

// Usage
import { features } from '@/lib/features'

if (features.newDashboard) {
  return <NewDashboard />
}

2. Using GrowthBook (see #81)

3. Custom Implementation:
// lib/featureFlags.js
const flags = {
  development: {
    newFeature: true,
    experimentalUI: true
  },
  production: {
    newFeature: false,
    experimentalUI: false
  }
}

export function isFeatureEnabled(feature) {
  const env = process.env.NODE_ENV
  return flags[env]?.[feature] ?? false
}

4. User-Based Flags:
export function isFeatureEnabledForUser(feature, user) {
  // Admin users get all features
  if (user.role === 'admin') return true
  
  // Beta users get beta features
  if (feature.startsWith('beta_') && user.betaTester) {
    return true
  }
  
  // Check user-specific flags
  return user.features?.includes(feature) ?? false
}

5. Remote Config (Firebase):
npm install firebase

// lib/firebase.js
import { getRemoteConfig, getValue } from 'firebase/remote-config'

const remoteConfig = getRemoteConfig()

export async function getFeatureFlag(key) {
  const value = getValue(remoteConfig, key)
  return value.asBoolean()
}

=======================================

84. BENEFITS AND LIMITATIONS OF NEXT.JS FOR LARGE-SCALE APPLICATIONS
----------------------------------------------------------------------

Benefits:
✅ Server-Side Rendering (SEO-friendly)
✅ Static Site Generation (performance)
✅ API Routes (full-stack framework)
✅ Automatic code splitting
✅ Built-in optimization (images, fonts)
✅ File-based routing (intuitive)
✅ TypeScript support
✅ Fast refresh (great DX)
✅ Edge runtime support
✅ Vercel deployment (easy)
✅ Large ecosystem
✅ Active community

Limitations:
❌ Vendor lock-in (optimized for Vercel)
❌ Learning curve (SSR/SSG concepts)
❌ Build times can be slow (large apps)
❌ Limited backend capabilities
❌ File-based routing limitations
❌ State management complexity (SSR)
❌ Debugging can be challenging
❌ Bundle size (framework overhead)
❌ Migration costs (from other frameworks)

When to Use Next.js:
✅ SEO-critical applications
✅ Content-heavy websites
✅ E-commerce platforms
✅ Marketing sites
✅ Blogs and documentation
✅ Dashboards with public pages

When NOT to Use:
❌ Highly interactive SPAs
❌ Real-time applications (prefer native WebSockets)
❌ Microservices architecture
❌ Mobile-first apps (consider React Native)
❌ Backend-heavy applications

=======================================

85. HOW TO HANDLE BACKGROUND JOBS AND SCHEDULED TASKS
--------------------------------------------------------

Background jobs run independently of user requests.

1. Using Vercel Cron Jobs:
// app/api/cron/route.js
export async function GET(request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Run background job
  await sendDailyEmails()
  await cleanupOldData()
  
  return Response.json({ success: true })
}

// vercel.json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 0 * * *"
    }
  ]
}

2. Using BullMQ (Redis Queue):
npm install bullmq ioredis

// lib/queue.js
import { Queue, Worker } from 'bullmq'

const connection = {
  host: process.env.REDIS_HOST,
  port: 6379
}

export const emailQueue = new Queue('emails', { connection })

// Worker (separate process)
new Worker('emails', async (job) => {
  await sendEmail(job.data)
}, { connection })

// Usage
emailQueue.add('welcome', { 
  to: 'user@example.com', 
  subject: 'Welcome' 
})

3. Node-Cron (Self-Hosted):
npm install node-cron

// lib/cron.js
import cron from 'node-cron'

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily job')
  await cleanupDatabase()
})

4. External Task Scheduler (Trigger.dev):
npm install @trigger.dev/sdk

// jobs/daily-report.js
import { eventTrigger } from '@trigger.dev/sdk'

export const dailyReport = eventTrigger({
  id: 'daily-report',
  name: 'Daily Report',
  on: eventTrigger({
    name: 'daily.report',
    schema: z.object({})
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info('Generating daily report')
    await generateReport()
  }
})

Best Practices:
✅ Use job queues for reliability
✅ Implement retry logic
✅ Monitor job failures
✅ Use idempotent operations
✅ Log job execution
✅ Handle timeouts gracefully
✅ Separate concerns (API vs jobs)

=======================================
* /


/*
=======================================
TESTING - ANSWERS
=======================================

86. HOW TO TEST NEXT.JS APPLICATIONS
-------------------------------------

Next.js testing involves multiple testing levels. [web:107][web:108]

1. Setup Jest with React Testing Library:
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  testMatch: [
    '** /__tests__/** /*.test.[jt]s?(x)',
    '** /?(*.)+(spec|test).[jt]s?(x)'
  ]
}

module.exports = createJestConfig(customJestConfig)

// jest.setup.js
import '@testing-library/jest-dom'

// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}

2. Unit Testing Components:
// components/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  test('applies custom className', () => {
    render(<Button className="custom">Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('custom')
  })
})

3. Integration Testing:
// __tests__/pages/index.test.js
import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' })
  })
)

describe('Home Page', () => {
  test('renders home page', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('Welcome')).toBeInTheDocument()
    })
  })
  
  test('fetches and displays data', async () => {
    render(<Home />)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled()
      expect(screen.getByText('test')).toBeInTheDocument()
    })
  })
})

4. Testing with User Interactions:
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'

test('form submission', async () => {
  const user = userEvent.setup()
  const onSubmit = jest.fn()
  
  render(<Form onSubmit={onSubmit} />)
  
  await user.type(screen.getByLabelText('Email'), 'test@example.com')
  await user.type(screen.getByLabelText('Password'), 'password123')
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    })
  })
})

5. Snapshot Testing:
test('component matches snapshot', () => {
  const { asFragment } = render(<Component />)
  expect(asFragment()).toMatchSnapshot()
})

Testing Levels:
- Unit Tests: Individual components/functions
- Integration Tests: Multiple components together
- E2E Tests: Full user workflows (see #89)

=======================================

87. TESTING LIBRARIES THAT WORK WELL WITH NEXT.JS
---------------------------------------------------

Popular testing libraries for Next.js: [web:107][web:108][web:113]

1. Jest (Unit/Integration Testing):
npm install -D jest jest-environment-jsdom

Features:
✅ Snapshot testing
✅ Mocking capabilities
✅ Code coverage
✅ Fast parallel execution
✅ Built-in assertions

// Example test
describe('utils', () => {
  test('formatDate formats correctly', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toBe('January 1, 2024')
  })
})

2. React Testing Library:
npm install -D @testing-library/react @testing-library/jest-dom

Features:
✅ User-centric testing
✅ Accessible queries
✅ No implementation details
✅ Good practices enforced

// Example
import { render, screen } from '@testing-library/react'

test('login form', () => {
  render(<LoginForm />)
  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
})

3. Vitest (Alternative to Jest):
npm install -D vitest @vitejs/plugin-react

Features:
✅ Faster than Jest
✅ Native ESM support
✅ Compatible with Jest API
✅ Better TypeScript support

// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  }
})

4. Cypress (E2E Testing):
npm install -D cypress

Features:
✅ Real browser testing
✅ Time travel debugging
✅ Automatic waiting
✅ Screenshots/videos

// cypress/e2e/login.cy.js
describe('Login', () => {
  it('logs in successfully', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type('user@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})

5. Playwright (E2E Testing):
npm install -D @playwright/test

Features:
✅ Multi-browser support
✅ Fast execution
✅ Better debugging
✅ Auto-wait mechanisms

// tests/example.spec.ts
import { test, expect } from '@playwright/test'

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle(/My App/)
})

6. Mock Service Worker (API Mocking):
npm install -D msw

Features:
✅ Network-level mocking
✅ Works in browser and Node
✅ Realistic API responses

// mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: 1, name: 'John Doe' })
  })
]

7. Testing Library User Event:
npm install -D @testing-library/user-event

Features:
✅ Realistic user interactions
✅ Async by default
✅ Better than fireEvent

import userEvent from '@testing-library/user-event'

test('typing', async () => {
  const user = userEvent.setup()
  render(<Input />)
  await user.type(screen.getByRole('textbox'), 'Hello')
})

Recommended Stack:
✅ Jest + React Testing Library (Unit/Integration)
✅ Playwright or Cypress (E2E)
✅ MSW (API Mocking)
✅ Vitest (Optional Jest alternative)

=======================================

88. HOW TO TEST API ROUTES
---------------------------

Testing API routes ensures backend functionality works correctly.

1. Testing Pages Router API Routes:
// pages/api/users.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ users: [] })
  }
  res.status(405).end()
}

// __tests__/api/users.test.js
import handler from '@/pages/api/users'

test('GET /api/users returns users', async () => {
  const req = { method: 'GET' }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    end: jest.fn()
  }
  
  await handler(req, res)
  
  expect(res.status).toHaveBeenCalledWith(200)
  expect(res.json).toHaveBeenCalledWith({ users: [] })
})

test('POST /api/users returns 405', async () => {
  const req = { method: 'POST' }
  const res = {
    status: jest.fn().mockReturnThis(),
    end: jest.fn()
  }
  
  await handler(req, res)
  
  expect(res.status).toHaveBeenCalledWith(405)
  expect(res.end).toHaveBeenCalled()
})

2. Testing App Router Route Handlers:
// app/api/users/route.js
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ users: [] })
}

// __tests__/api/users.test.js
import { GET } from '@/app/api/users/route'

test('GET /api/users returns users', async () => {
  const response = await GET()
  const data = await response.json()
  
  expect(response.status).toBe(200)
  expect(data).toEqual({ users: [] })
})

3. Testing with Database Mocking:
import { GET } from '@/app/api/posts/route'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    post: {
      findMany: jest.fn()
    }
  }
}))

test('GET /api/posts returns posts from database', async () => {
  const mockPosts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' }
  ]
  
  prisma.post.findMany.mockResolvedValue(mockPosts)
  
  const response = await GET()
  const data = await response.json()
  
  expect(data.posts).toEqual(mockPosts)
  expect(prisma.post.findMany).toHaveBeenCalled()
})

4. Testing with Request Parameters:
import { GET } from '@/app/api/users/[id]/route'

test('GET /api/users/:id returns specific user', async () => {
  const mockRequest = new Request('http://localhost:3000/api/users/1')
  const response = await GET(mockRequest, { params: { id: '1' } })
  const data = await response.json()
  
  expect(data.user.id).toBe('1')
})

5. Integration Testing with Supertest:
npm install -D supertest

// __tests__/api/integration.test.js
import request from 'supertest'

test('API integration test', async () => {
  const response = await request('http://localhost:3000')
    .get('/api/users')
    .expect(200)
  
  expect(response.body).toHaveProperty('users')
})

6. Testing with Authentication:
import { GET } from '@/app/api/protected/route'

test('protected route requires auth', async () => {
  const mockRequest = new Request('http://localhost:3000/api/protected', {
    headers: {
      cookie: 'token=invalid'
    }
  })
  
  const response = await GET(mockRequest)
  
  expect(response.status).toBe(401)
})

test('protected route with valid auth', async () => {
  const mockRequest = new Request('http://localhost:3000/api/protected', {
    headers: {
      cookie: 'token=valid-token'
    }
  })
  
  const response = await GET(mockRequest)
  
  expect(response.status).toBe(200)
})

7. Testing Error Handling:
test('API handles errors gracefully', async () => {
  prisma.post.findMany.mockRejectedValue(new Error('Database error'))
  
  const response = await GET()
  
  expect(response.status).toBe(500)
  
  const data = await response.json()
  expect(data.error).toBeDefined()
})

=======================================

89. HOW TO IMPLEMENT E2E TESTING IN NEXT.JS
----------------------------------------------

End-to-end testing validates entire user workflows. [web:106][web:111][web:114]

1. Setup Playwright:
npm install -D @playwright/test

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
})

2. Basic E2E Tests:
// e2e/example.spec.ts
import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/My App/)
  await expect(page.getByRole('heading')).toContainText('Welcome')
})

test('navigation works', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /about/i }).click()
  await expect(page).toHaveURL('/about')
})

3. Testing Forms:
test('login form submission', async ({ page }) => {
  await page.goto('/login')
  
  await page.fill('input[name="email"]', 'user@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText(/welcome/i)).toBeVisible()
})

4. Testing with Authentication:
// e2e/auth.setup.ts
import { test as setup } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  await page.goto('/login')
  await page.fill('input[name="email"]', 'user@example.com')
  await page.fill('input[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  
  await page.waitForURL('/dashboard')
  await page.context().storageState({ path: authFile })
})

// e2e/authenticated.spec.ts
import { test, expect } from '@playwright/test'

test.use({ storageState: 'playwright/.auth/user.json' })

test('authenticated user can access dashboard', async ({ page }) => {
  await page.goto('/dashboard')
  await expect(page.getByRole('heading')).toContainText('Dashboard')
})

5. API Testing with Playwright:
test('API endpoint returns data', async ({ request }) => {
  const response = await request.get('/api/users')
  expect(response.ok()).toBeTruthy()
  
  const data = await response.json()
  expect(data.users).toBeDefined()
})

6. Setup Cypress (Alternative):
npm install -D cypress

// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {}
  }
})

// cypress/e2e/spec.cy.js
describe('Homepage', () => {
  it('loads successfully', () => {
    cy.visit('/')
    cy.contains('Welcome').should('be.visible')
  })
  
  it('navigates to about page', () => {
    cy.visit('/')
    cy.get('a').contains('About').click()
    cy.url().should('include', '/about')
  })
})

7. Testing Dynamic Routes:
test('blog post page loads', async ({ page }) => {
  await page.goto('/blog/my-first-post')
  
  await expect(page.getByRole('heading', { level: 1 }))
    .toContainText('My First Post')
  
  await expect(page.getByText(/Published on/i)).toBeVisible()
})

8. Visual Regression Testing:
test('homepage visual regression', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('homepage.png')
})

9. Testing Accessibility:
npm install -D @axe-core/playwright

import { injectAxe, checkA11y } from 'axe-playwright'

test('homepage is accessible', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page)
})

Best Practices:
✅ Test critical user journeys
✅ Keep tests independent
✅ Use data-testid for stable selectors
✅ Mock external APIs
✅ Run tests in CI/CD
✅ Test across browsers
✅ Use page object pattern for complex apps

=======================================

90. TESTING STRATEGIES FOR SERVER COMPONENTS
----------------------------------------------

Server Components require different testing approaches. [web:112][web:115]

1. Testing Server Components with Jest:
// app/page.js (Server Component)
export default async function HomePage() {
  const data = await fetchData()
  
  return (
    <div>
      <h1>Home</h1>
      <p>{data.message}</p>
    </div>
  )
}

// __tests__/page.test.js
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock the fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Test message' })
  })
)

test('HomePage renders data', async () => {
  // Await the Server Component
  const component = await HomePage()
  render(component)
  
  expect(screen.getByText('Home')).toBeInTheDocument()
  expect(screen.getByText('Test message')).toBeInTheDocument()
})

2. Testing with Vitest:
// __tests__/page.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Page from '@/app/page'

describe('Page', () => {
  test('renders server component', async () => {
    // Mock data fetching
    vi.mock('@/lib/api', () => ({
      fetchData: vi.fn().mockResolvedValue({ data: 'test' })
    }))
    
    const component = await Page()
    render(component)
    
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})

3. Testing Data Fetching Logic Separately:
// lib/data.js
export async function getUserData(id) {
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

// __tests__/lib/data.test.js
import { getUserData } from '@/lib/data'

global.fetch = jest.fn()

test('getUserData fetches user', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({ id: 1, name: 'John' })
  })
  
  const user = await getUserData(1)
  
  expect(fetch).toHaveBeenCalledWith('/api/users/1')
  expect(user).toEqual({ id: 1, name: 'John' })
})

4. Testing Server Actions:
// app/actions.js
'use server'

export async function createPost(formData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  const post = await db.post.create({
    data: { title, content }
  })
  
  return post
}

// __tests__/actions.test.js
import { createPost } from '@/app/actions'
import { db } from '@/lib/db'

jest.mock('@/lib/db', () => ({
  db: {
    post: {
      create: jest.fn()
    }
  }
}))

test('createPost creates a post', async () => {
  const formData = new FormData()
  formData.append('title', 'Test Post')
  formData.append('content', 'Test Content')
  
  db.post.create.mockResolvedValue({
    id: 1,
    title: 'Test Post',
    content: 'Test Content'
  })
  
  const result = await createPost(formData)
  
  expect(db.post.create).toHaveBeenCalledWith({
    data: {
      title: 'Test Post',
      content: 'Test Content'
    }
  })
  
  expect(result.id).toBe(1)
})

5. Integration Testing with MSW:
// mocks/handlers.js
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/posts', () => {
    return HttpResponse.json({
      posts: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' }
      ]
    })
  })
]

// __tests__/page.test.js
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('page fetches and displays posts', async () => {
  const component = await PostsPage()
  render(component)
  
  expect(screen.getByText('Post 1')).toBeInTheDocument()
  expect(screen.getByText('Post 2')).toBeInTheDocument()
})

6. Snapshot Testing:
test('server component matches snapshot', async () => {
  const component = await HomePage()
  const { asFragment } = render(component)
  
  expect(asFragment()).toMatchSnapshot()
})

7. Testing with Database:
import { prisma } from '@/lib/prisma'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE posts;`
})

test('page displays posts from database', async () => {
  await prisma.post.create({
    data: { title: 'Test Post', content: 'Content' }
  })
  
  const component = await PostsPage()
  render(component)
  
  expect(screen.getByText('Test Post')).toBeInTheDocument()
})

8. E2E Testing (Preferred for Server Components):
// e2e/posts.spec.ts
import { test, expect } from '@playwright/test'

test('posts page displays posts', async ({ page }) => {
  await page.goto('/posts')
  
  await expect(page.getByRole('heading', { name: /posts/i })).toBeVisible()
  await expect(page.getByText('Test Post')).toBeVisible()
})

Testing Strategy Recommendations:

For Server Components:
✅ Extract data fetching to separate functions and test those
✅ Mock external API calls
✅ Use E2E tests for full integration
✅ Test Server Actions separately
✅ Prefer integration tests over unit tests

For Client Components:
✅ Use React Testing Library
✅ Test user interactions
✅ Mock API calls with MSW
✅ Test component behavior

Mixed Approach:
✅ Unit test utilities and pure functions
✅ Integration test API routes
✅ E2E test critical user flows
✅ Component test complex UI logic

Tools Summary:
- Jest/Vitest: Unit and integration tests
- React Testing Library: Component testing
- Playwright/Cypress: E2E testing
- MSW: API mocking
- Testing Library User Event: User interactions

=======================================
*/
