# Next.js Interview Questions - Advanced Level Part 2 (Questions 76-100)

## 76. How do you set headers in Route Handlers?

**Answer:**

Headers tell the browser how to handle the response. Set them in Route Handlers to control caching, security, and content type.

### Simple Example:

**app/api/data/route.js:**
```javascript
export async function GET() {
  const data = { message: 'Hello' };
  
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

### Security Headers:

**app/api/secure/route.js:**
```javascript
export async function GET() {
  return new Response('Secure data', {
    headers: {
      'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
      'X-Frame-Options': 'DENY', // Prevent clickjacking
      'X-XSS-Protection': '1; mode=block', // XSS protection
      'Strict-Transport-Security': 'max-age=31536000', // HTTPS only
      'Content-Security-Policy': "default-src 'self'" // CSP policy
    }
  });
}
```

### Custom Headers:

**app/api/custom/route.js:**
```javascript
export async function GET() {
  return new Response('Data', {
    headers: {
      'X-Custom-Header': 'my-value',
      'X-Request-ID': crypto.randomUUID(),
      'X-Powered-By': 'Next.js'
    }
  });
}
```

### CORS Headers:

**app/api/cors/route.js:**
```javascript
export async function GET(request) {
  return new Response(JSON.stringify({ data: 'value' }), {
    headers: {
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json'
    }
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
```

---

## 77. Explain streaming responses.

**Answer:**

Streaming responses send data in chunks instead of waiting for everything. Users see data appear gradually!

### Without Streaming:

```
Processing: [==========] (3 seconds)
User waits...
Then: BOOM! Entire response loads
```

### With Streaming:

```
[Data chunk 1] → User sees it
[Data chunk 2] → User sees it
[Data chunk 3] → User sees it
More natural, feels faster
```

### Implementation:

**app/api/stream/route.js:**
```javascript
export async function GET() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send first chunk
      controller.enqueue(encoder.encode('Starting...\n'));
      
      // Simulate work
      await new Promise(resolve => setTimeout(resolve, 1000));
      controller.enqueue(encoder.encode('Processing...\n'));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      controller.enqueue(encoder.encode('Done!\n'));
      
      controller.close();
    }
  });
  
  return new Response(stream);
}
```

### Streaming Large Files:

**app/api/download/route.js:**
```javascript
import fs from 'fs';

export async function GET() {
  const file = fs.createReadStream('./large-file.json');
  
  return new Response(file, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="data.json"'
    }
  });
}
```

### Server Components with Streaming:

**app/page.js:**
```javascript
import { Suspense } from 'react';

async function SlowData() {
  // Takes 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));
  return <p>Slow data loaded!</p>;
}

export default function Page() {
  return (
    <div>
      <h1>Streamed Page</h1>
      
      {/* Show immediately */}
      <p>Fast content</p>
      
      {/* Stream this part */}
      <Suspense fallback={<p>Loading slow data...</p>}>
        <SlowData />
      </Suspense>
    </div>
  );
}
```

---

## 78. What is `NextRequest` and `NextResponse`?

**Answer:**

`NextRequest` and `NextResponse` are Next.js versions of Web API's `Request` and `Response`, with extra features.

### NextRequest:

**middleware.js:**
```javascript
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Access request properties
  console.log('URL:', request.nextUrl.pathname);
  console.log('Method:', request.method);
  console.log('Headers:', request.headers);
  
  // Access cookies
  const token = request.cookies.get('auth-token');
  
  // Access query parameters
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
}
```

### NextResponse:

**middleware.js:**
```javascript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Create response
  const response = NextResponse.next();
  
  // Set cookies
  response.cookies.set('visited', 'true', {
    maxAge: 86400 // 1 day
  });
  
  // Set headers
  response.headers.set('x-custom', 'value');
  
  // Redirect
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return response;
}
```

### Real Example - Request/Response:

**middleware.js:**
```javascript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Log request
  const requestId = crypto.randomUUID();
  response.headers.set('x-request-id', requestId);
  
  // Track which pages users visit
  console.log(`[${requestId}] ${request.method} ${request.nextUrl.pathname}`);
  
  return response;
}

export const config = {
  matcher: ['/:path*']
};
```

---

## 79-80. How do you handle cookies and request headers in middleware?

**Answer:**

### Handling Cookies:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get cookie
  const userToken = request.cookies.get('auth-token')?.value;
  
  // Check authentication
  if (!userToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Set cookie in response
  const response = NextResponse.next();
  response.cookies.set('visited-page', request.nextUrl.pathname, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 86400 * 7 // 7 days
  });
  
  return response;
}
```

### Handling Headers:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Read incoming headers
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  
  console.log('User-Agent:', userAgent);
  console.log('Referer:', referer);
  
  // Create response with custom headers
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-pathname', request.nextUrl.pathname);
  response.headers.set('x-user-agent', userAgent || 'unknown');
  
  // Remove sensitive headers
  response.headers.delete('x-powered-by');
  
  return response;
}
```

### Real Example - Request Logging:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Detailed request logging
  const log = {
    timestamp: new Date().toISOString(),
    method: request.method,
    pathname: request.nextUrl.pathname,
    userAgent: request.headers.get('user-agent'),
    ip: request.ip || request.headers.get('x-forwarded-for'),
    referer: request.headers.get('referer')
  };
  
  console.log('Request:', JSON.stringify(log, null, 2));
  
  return response;
}

export const config = {
  matcher: ['/api/:path*']
};
```

---

## 81-82. Explain Context API and global state management

**Answer:**

Context API shares data across components without prop drilling. State management libraries like Redux handle more complex scenarios.

### Simple Context Setup:

**lib/UserContext.js:**
```javascript
'use client';

import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
}
```

### Use in Layout:

**app/layout.js:**
```javascript
import { UserProvider } from '@/lib/UserContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
```

### Use in Components:

**app/profile/page.js:**
```javascript
'use client';

import { useUser } from '@/lib/UserContext';

export default function Profile() {
  const { user, logout } = useUser();
  
  if (!user) {
    return <p>Not logged in</p>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Theme Context Example:

**lib/ThemeContext.js:**
```javascript
'use client';

import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## 83. What is `getInitialProps`?

**Answer:**

`getInitialProps` is a **deprecated** method that was used for data fetching before `getStaticProps` and `getServerSideProps`. Don't use it in new projects!

### Old Way (Deprecated):

```javascript
function Page({ data }) {
  return <h1>{data}</h1>;
}

Page.getInitialProps = async () => {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { data };
};

export default Page;
```

### Modern Way (Use These Instead):

**For static pages:**
```javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data }, revalidate: 3600 };
}
```

**For dynamic pages:**
```javascript
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}
```

---

## 84-85. TypeScript in Next.js and API routes

**Answer:**

### Enable TypeScript:

Just create `.ts` or `.tsx` files. Next.js handles the rest!

**app/page.tsx:**
```typescript
export default function Home(): JSX.Element {
  return <h1>Hello TypeScript</h1>;
}
```

### TypeScript Components:

**app/components/Card.tsx:**
```typescript
interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export default function Card({ title, description, onClick }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}
```

### TypeScript API Routes:

**app/api/users/route.ts:**
```typescript
import { NextRequest, NextResponse } from 'next/server';

interface User {
  id: number;
  name: string;
  email: string;
}

export async function GET(): Promise<NextResponse<User[]>> {
  const users: User[] = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ];
  
  return NextResponse.json(users);
}

export async function POST(request: NextRequest): Promise<NextResponse<User>> {
  const body: Partial<User> = await request.json();
  
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Missing fields' },
      { status: 400 }
    );
  }
  
  const newUser: User = {
    id: 3,
    name: body.name,
    email: body.email
  };
  
  return NextResponse.json(newUser, { status: 201 });
}
```

### TypeScript with Server Components:

**app/products/[id]/page.tsx:**
```typescript
import { notFound } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface PageProps {
  params: { id: string };
}

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://api.example.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

---

## 86-87. `next.config.js` and webpack configuration

**Answer:**

`next.config.js` customizes Next.js build and runtime behavior.

### Basic Configuration:

**next.config.js:**
```javascript
module.exports = {
  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  
  // Environment variables
  env: {
    CUSTOM_VAR: 'value'
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true
      }
    ];
  },
  
  // Rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/docs/:path*',
          destination: 'https://docs.example.com/:path*'
        }
      ]
    };
  }
};
```

### Custom Webpack:

**next.config.js:**
```javascript
module.exports = {
  webpack: (config, { isServer }) => {
    // Add custom webpack plugin
    config.module.rules.push({
      test: /\.custom$/,
      use: 'custom-loader'
    });
    
    // Optimize chunks
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              filename: 'chunks/vendor.js',
              test: /node_modules/,
              priority: 10
            },
            // Common chunk
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              filename: 'chunks/common.js'
            }
          }
        }
      };
    }
    
    return config;
  }
};
```

---

## 88. What is SWR (Stale-While-Revalidate)?

**Answer:**

SWR is a data fetching library that caches data and revalidates in background. Shows cached data immediately, updates when fresh data arrives!

### Installation:

```bash
npm install swr
```

### Basic Usage:

**app/posts/page.js:**
```javascript
'use client';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Posts() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  
  return (
    <ul>
      {data.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### With Revalidation:

**app/dashboard/page.js:**
```javascript
'use client';

import useSWR from 'swr';

export default function Dashboard() {
  const { data, mutate } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: true, // Revalidate when window focused
    revalidateOnReconnect: true, // Revalidate when reconnected
    refreshInterval: 5000 // Revalidate every 5 seconds
  });
  
  return (
    <div>
      <h1>User: {data?.name}</h1>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
}
```

### Error Handling:

**app/data/page.js:**
```javascript
'use client';

import useSWR from 'swr';

export default function Data() {
  const { data, error, isValidating } = useSWR('/api/data', fetcher);
  
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => location.reload()}>Retry</button>
      </div>
    );
  }
  
  return <div>{isValidating ? 'Updating...' : data}</div>;
}
```

---

## 89. How do you implement ISR with on-demand revalidation?

**Answer:**

On-demand revalidation updates content immediately instead of waiting for revalidate time.

### Step 1: Create Revalidation API:

**app/api/revalidate/route.js:**
```javascript
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Verify secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  const path = request.nextUrl.searchParams.get('path');
  
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }
  
  return NextResponse.json({ error: 'Path required' }, { status: 400 });
}
```

### Step 2: Create Post in Database:

**app/api/posts/route.js:**
```javascript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Save to database
  const newPost = await db.posts.create({
    title: body.title,
    content: body.content
  });
  
  // Revalidate posts page immediately
  revalidatePath('/posts');
  
  return NextResponse.json(newPost, { status: 201 });
}
```

### Step 3: Use in Page:

**app/posts/page.js:**
```javascript
export const revalidate = 3600; // Revalidate every hour

async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { tags: ['posts'] }
  });
  return res.json();
}

export default async function Posts() {
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

---

## 90. What is the purpose of `getServerSideProps` context?

**Answer:**

The context object contains useful information about the current request.

### Context Properties:

**pages/example/[id].js:**
```javascript
export async function getServerSideProps(context) {
  const {
    params,        // Route parameters: { id: '123' }
    query,         // Query string: { page: '1' }
    req,           // HTTP request object
    res,           // HTTP response object
    resolvedUrl    // Full URL with query: /example/123?page=1
  } = context;
  
  // Access cookies
  const token = req.cookies.authToken;
  
  // Access headers
  const userAgent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'];
  
  // Set headers in response
  res.setHeader('Cache-Control', 'public, s-maxage=10');
  
  // Access params and query
  const id = params.id;
  const page = query.page || 1;
  
  return {
    props: { id, page, userAgent }
  };
}

export default function Page({ id, page, userAgent }) {
  return (
    <div>
      <h1>Item {id}</h1>
      <p>Page: {page}</p>
      <p>Browser: {userAgent}</p>
    </div>
  );
}
```

---

## 91. How do you handle large file uploads?

**Answer:**

Handle large files with chunked uploads and streaming.

### Simple File Upload:

**app/api/upload/route.js:**
```javascript
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }
  
  // Convert to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Save file
  const path = join(process.cwd(), 'public/uploads', file.name);
  await writeFile(path, buffer);
  
  return Response.json({ success: true, filename: file.name });
}
```

### Chunked Upload:

**app/api/upload-chunk/route.js:**
```javascript
import { appendFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  const formData = await request.formData();
  const chunk = formData.get('chunk');
  const chunkIndex = formData.get('chunkIndex');
  const totalChunks = formData.get('totalChunks');
  const filename = formData.get('filename');
  
  const bytes = await chunk.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Save chunk
  const chunkPath = join(
    process.cwd(),
    'public/uploads/chunks',
    `${filename}.${chunkIndex}`
  );
  
  await appendFile(chunkPath, buffer);
  
  // If all chunks received, combine them
  if (parseInt(chunkIndex) === parseInt(totalChunks) - 1) {
    // Combine chunks into final file
    // ... implementation
  }
  
  return Response.json({ received: true });
}
```

### Upload Progress (Client):

**app/upload/page.js:**
```javascript
'use client';

import { useState } from 'react';

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024; // 1MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
    
    setUploading(true);
    
    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', i);
      formData.append('totalChunks', totalChunks);
      formData.append('filename', file.name);
      
      await fetch('/api/upload-chunk', { method: 'POST', body: formData });
      
      setProgress(((i + 1) / totalChunks) * 100);
    }
    
    setUploading(false);
  };
  
  return (
    <div>
      <input type="file" onChange={handleUpload} disabled={uploading} />
      <progress value={progress} max="100"></progress>
      <p>{Math.round(progress)}%</p>
    </div>
  );
}
```

---

## 92. What is Edge Runtime in Next.js?

**Answer:**

Edge Runtime runs code on Vercel's global edge network, closest to users, for ultra-low latency.

### Enable Edge Runtime:

**app/api/fast/route.js:**
```javascript
export const runtime = 'edge';

export async function GET(request) {
  return new Response('Fast response from edge!', {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

### When Request Reaches You:

```
User in Tokyo
  ↓
Tokyo Edge Server (1ms) ← Responds here!
  ↓
Or if needed: Origin Server (100ms+)
```

### Edge Use Cases:

**Geolocation:**
```javascript
export const runtime = 'edge';

export async function GET(request) {
  const country = request.geo?.country;
  
  return new Response(`You are in: ${country}`);
}
```

**Authentication:**
```javascript
export const runtime = 'edge';

export async function GET(request) {
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  return new Response('Welcome!');
}
```

**Redirects:**
```javascript
export const runtime = 'edge';

export async function GET(request) {
  const country = request.geo?.country;
  
  if (country === 'CN') {
    return Response.redirect('https://example.cn');
  }
  
  return Response.redirect('https://example.com');
}
```

---

## 93. How do you use environment variables in client-side code?

**Answer:**

Only variables prefixed with `NEXT_PUBLIC_` are accessible in the browser. Other variables are server-only!

### Environment Files:

**.env.local:**
```
# Server only (not in browser)
DATABASE_URL=postgresql://user:pass@localhost/db
API_KEY=secret-key-123

# Client and server (visible in browser)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
```

### Server-Side Code:

**app/api/data/route.js:**
```javascript
export async function GET() {
  // Works fine - server only
  const dbUrl = process.env.DATABASE_URL;
  const apiKey = process.env.API_KEY;
  
  console.log('DB:', dbUrl); // Safe
  
  return Response.json({ data: 'value' });
}
```

### Client-Side Code:

**app/page.js:**
```javascript
'use client';

export default function Home() {
  return (
    <div>
      {/* Works - NEXT_PUBLIC_ prefix */}
      <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
      
      {/* Works - NEXT_PUBLIC_ prefix */}
      <p>API: {process.env.NEXT_PUBLIC_API_URL}</p>
      
      {/* Doesn't work - no NEXT_PUBLIC_ prefix */}
      {/* process.env.DATABASE_URL is undefined here */}
    </div>
  );
}
```

### Best Practice Pattern:

**lib/config.js:**
```javascript
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App'
};
```

**Use in components:**
```javascript
import { config } from '@/lib/config';

export default function Component() {
  return <h1>{config.appName}</h1>;
}
```

---

## 94. What is the purpose of `_middleware.ts`?

**Answer:**

`_middleware.ts` is **deprecated** in Next.js 12+. Use `middleware.js` or `middleware.ts` in project root instead!

### Old Way (Deprecated):

```
pages/
└── _middleware.ts
```

### New Way (Recommended):

```
middleware.ts (in project root)
```

**middleware.ts:**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
```

---

## 95. How do you implement A/B testing?

**Answer:**

A/B testing shows different versions to different users to measure which performs better.

### Method 1 - Using Cookies:

**middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Check if user has variant cookie
  let variant = request.cookies.get('ab-variant')?.value;
  
  if (!variant) {
    // Randomly assign variant
    variant = Math.random() > 0.5 ? 'A' : 'B';
    response.cookies.set('ab-variant', variant, {
      maxAge: 86400 * 30 // 30 days
    });
  }
  
  // Add header for use in app
  response.headers.set('X-AB-Variant', variant);
  
  return response;
}

export const config = {
  matcher: ['/']
};
```

### Method 2 - In Component:

**app/page.js:**
```javascript
'use client';

import { getCookie } from 'cookies-next';

export default function Home() {
  const variant = getCookie('ab-variant');
  
  return (
    <div>
      {variant === 'A' ? (
        <h1>Version A - Blue Button</h1>
      ) : (
        <h1>Version B - Green Button</h1>
      )}
    </div>
  );
}
```

### Method 3 - Server Component:

**app/page.js:**
```javascript
import { cookies } from 'next/headers';

export default function Home() {
  const cookieStore = cookies();
  const variant = cookieStore.get('ab-variant')?.value || 'A';
  
  return (
    <div>
      {variant === 'A' ? (
        <div>Version A Content</div>
      ) : (
        <div>Version B Content</div>
      )}
    </div>
  );
}
```

---

## 96. What are some performance monitoring tools?

**Answer:**

### 1. Web Vitals:

```javascript
// app/_app.js or _document.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric) {
  // Send to analytics
  console.log(metric);
}
```

### 2. Lighthouse:

Built into Chrome DevTools. Press F12 → Lighthouse tab.

### 3. Vercel Analytics:

```bash
npm install @vercel/analytics
```

**app/layout.js:**
```javascript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 4. PageSpeed Insights:

Visit: https://pagespeed.web.dev/

### 5. Custom Monitoring:

**lib/monitor.js:**
```javascript
export function reportPerformance() {
  const perfData = window.performance.timing;
  
  const metrics = {
    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
    loadComplete: perfData.loadEventEnd - perfData.navigationStart,
    timeToFirstByte: perfData.responseStart - perfData.navigationStart
  };
  
  // Send to backend
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify(metrics)
  });
}
```

---

## 97. How do you deploy Next.js applications?

**Answer:**

### Option 1: Vercel (Recommended)

Vercel is made by Next.js creators, easiest deployment.

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically on push!

**Vercel Dashboard:** https://vercel.com

### Option 2: Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t my-nextjs-app .
docker run -p 3000:3000 my-nextjs-app
```

### Option 3: Self-Hosted (AWS, DigitalOcean, etc.)

```bash
# Build
npm run build

# Start
npm start
```

### Option 4: Netlify

```bash
npm install -D @netlify/plugin-nextjs
```

**netlify.toml:**
```toml
[build]
command = "npm run build"
functions = "netlify/functions"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Environment Setup:

Create `.env.production`:
```
NEXT_PUBLIC_API_URL=https://api.production.com
DATABASE_URL=production-db-url
```

---

## 98. What is `Suspense` in Next.js?

**Answer:**

`Suspense` lets you show a loading state while waiting for data from Server Components.

### Basic Suspense:

**app/page.js:**
```javascript
import { Suspense } from 'react';

function SlowComponent() {
  throw new Promise(resolve => setTimeout(resolve, 3000));
}

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      
      <Suspense fallback={<p>Loading...</p>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

### Multiple Suspense Boundaries:

**app/page.js:**
```javascript
import { Suspense } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<p>Loading header...</p>}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<p>Loading sidebar...</p>}>
        <Sidebar />
      </Suspense>
      
      <Suspense fallback={<p>Loading content...</p>}>
        <MainContent />
      </Suspense>
    </div>
  );
}
```

This way, each section loads independently!

---

## 99. Explain Vercel deployment best practices.

**Answer:**

### 1. Environment Variables:

Set in Vercel Dashboard → Settings → Environment Variables

```
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=***
API_SECRET=***
```

### 2. Preview Deployments:

Every pull request gets preview URL automatically!

```
PR #123 → https://my-app-pr-123.vercel.app
```

### 3. Production Deployment:

Push to main branch → automatic production deploy

### 4. Performance:

- Use Image component
- Enable Web Analytics
- Monitor Core Web Vitals

**next.config.js:**
```javascript
module.exports = {
  swcMinify: true, // SWC faster than Terser
  compress: true,
  poweredByHeader: false
};
```

### 5. Security:

- Never commit `.env.local`
- Use HTTPS only
- Set security headers

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 100. What are common performance optimization techniques in Next.js?

**Answer:**

### 1. Image Optimization:

```javascript
import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/image.jpg"
      alt="desc"
      width={500}
      height={300}
      quality={75}
      priority={true}
    />
  );
}
```

### 2. Dynamic Imports:

```javascript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
```

### 3. Font Optimization:

```javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
```

### 4. Script Optimization:

```javascript
import Script from 'next/script';

<Script src="analytics.js" strategy="afterInteractive" />
```

### 5. Static Generation:

```javascript
export async function getStaticProps() {
  return { props: {}, revalidate: 3600 };
}
```

### 6. Code Splitting:

Next.js does this automatically!

### 7. Link Prefetching:

```javascript
<Link href="/about" prefetch={true}>About</Link>
```

### 8. Minimize JavaScript:

```javascript
// next.config.js
module.exports = {
  swcMinify: true
};
```

### 9. Monitor Metrics:

```javascript
export function reportWebVitals(metric) {
  console.log(metric);
}
```

### 10. Cache Strategy:

```javascript
// Cache fetch results
export async function getStaticProps() {
  const data = await fetch('url', {
    next: { revalidate: 3600 }
  });
}
```

---

## Summary of Part 2 (Questions 76-100)

These 25 advanced questions cover:
- ✅ Route Handlers and headers
- ✅ Streaming responses
- ✅ Request/Response handling
- ✅ State management
- ✅ TypeScript integration
- ✅ Configuration and optimization
- ✅ File uploads and edge runtime
- ✅ Monitoring and deployment
- ✅ Performance best practices

---

## Complete Next.js Learning Path

**Basic (Q 1-20):** Routing, rendering, components  
**Intermediate (Q 21-50):** Advanced data fetching, middleware, authentication  
**Advanced Part 1 (Q 51-75):** App Router, Server Components, caching  
**Advanced Part 2 (Q 76-100):** Production deployment, optimization, monitoring  

**You now have complete knowledge of Next.js from beginner to expert level!** 🚀
