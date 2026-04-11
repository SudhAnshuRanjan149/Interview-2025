# Complete Next.js Guide — From Beginner to Advanced

> Covers Next.js 14/15 (App Router). Written in plain English so anyone can follow along.

---

## Table of Contents

1. [Introduction to Next.js](#1-introduction-to-nextjs)
2. [Hello World](#2-hello-world)
3. [Project Structure](#3-project-structure)
4. [Before We Start](#4-before-we-start)
5. [Routing](#5-routing)
6. [Nested Routes](#6-nested-routes)
7. [Dynamic Routes](#7-dynamic-routes)
8. [Nested Dynamic Routes](#8-nested-dynamic-routes)
9. [Catch-all Segments](#9-catch-all-segments)
10. [Not Found Page](#10-not-found-page)
11. [File Colocation](#11-file-colocation)
12. [Private Folders](#12-private-folders)
13. [Route Groups](#13-route-groups)
14. [Layouts](#14-layouts)
15. [Nested Layouts](#15-nested-layouts)
16. [Multiple Root Layouts](#16-multiple-root-layouts)
17. [Routing Metadata](#17-routing-metadata)
18. [title Metadata](#18-title-metadata)
19. [Linking Component Navigation](#19-linking-component-navigation)
20. [Active Links](#20-active-links)
21. [params and searchParams](#21-params-and-searchparams)
22. [Navigating Programmatically](#22-navigating-programmatically)
23. [Templates](#23-templates)
24. [Loading UI](#24-loading-ui)
25. [Error Handling](#25-error-handling)
26. [Recovering from Errors](#26-recovering-from-errors)
27. [Handling Errors in Nested Routes](#27-handling-errors-in-nested-routes)
28. [Handling Errors in Layouts](#28-handling-errors-in-layouts)
29. [Handling Global Errors](#29-handling-global-errors)
30. [Parallel Routes](#30-parallel-routes)
31. [Unmatched Routes](#31-unmatched-routes)
32. [Conditional Routes](#32-conditional-routes)
33. [Intercepting Routes](#33-intercepting-routes)
34. [Parallel Intercepting Routes](#34-parallel-intercepting-routes)
35. [Route Handlers](#35-route-handlers)
36. [GET Request](#36-get-request)
37. [POST Request](#37-post-request)
38. [Dynamic Route Handlers](#38-dynamic-route-handlers)
39. [PATCH Request](#39-patch-request)
40. [DELETE Request](#40-delete-request)
41. [URL Query Parameters](#41-url-query-parameters)
42. [Headers in Route Handlers](#42-headers-in-route-handlers)
43. [Cookies in Route Handlers](#43-cookies-in-route-handlers)
44. [Redirects in Route Handlers](#44-redirects-in-route-handlers)
45. [Caching in Route Handlers](#45-caching-in-route-handlers)
46. [Middleware](#46-middleware)
47. [Rendering](#47-rendering)
48. [Client-side Rendering (CSR)](#48-client-side-rendering-csr)
49. [Server-side Rendering (SSR)](#49-server-side-rendering-ssr)
50. [Suspense SSR](#50-suspense-ssr)
51. [React Server Components](#51-react-server-components)
52. [Server and Client Components](#52-server-and-client-components)
53. [Rendering Lifecycle in RSCs](#53-rendering-lifecycle-in-rscs)
54. [Static Rendering](#54-static-rendering)
55. [Dynamic Rendering](#55-dynamic-rendering)
56. [generateStaticParams](#56-generatestaticparams)
57. [dynamicParams](#57-dynamicparams)
58. [Streaming](#58-streaming)
59. [Server and Client Composition Patterns](#59-server-and-client-composition-patterns)
60. [Server-only Code](#60-server-only-code)
61. [Third Party Packages](#61-third-party-packages)
62. [Context Providers](#62-context-providers)
63. [Client-only Code](#63-client-only-code)
64. [Client Component Placement](#64-client-component-placement)
65. [Interleaving Server and Client Components](#65-interleaving-server-and-client-components)
66. [Data Fetching](#66-data-fetching)
67. [Fetching Data in Client Components](#67-fetching-data-in-client-components)
68. [Fetching Data with Server Components](#68-fetching-data-with-server-components)
69. [Loading and Error States](#69-loading-and-error-states)
70. [Sequential Data Fetching](#70-sequential-data-fetching)
71. [Parallel Data Fetching](#71-parallel-data-fetching)
72. [Fetching From a Database](#72-fetching-from-a-database)
73. [Data Mutations](#73-data-mutations)
74. [Forms with Server Actions](#74-forms-with-server-actions)
75. [useFormStatus Hook](#75-useformstatus-hook)
76. [useActionState Hook](#76-useactionstate-hook)
77. [Separating Server Actions](#77-separating-server-actions)
78. [useFormStatus vs useActionState](#78-useformstatus-vs-useactionstate)
79. [Update Server Action](#79-update-server-action)
80. [Delete Server Action](#80-delete-server-action)
81. [Optimistic Updates with useOptimistic Hook](#81-optimistic-updates-with-useoptimistic-hook)
82. [Form Component](#82-form-component)
83. [Authentication](#83-authentication)
84. [Clerk Setup](#84-clerk-setup)
85. [Sign in and Sign out](#85-sign-in-and-sign-out)
86. [Profile Settings](#86-profile-settings)
87. [Conditional UI Rendering](#87-conditional-ui-rendering)
88. [Protecting Routes](#88-protecting-routes)
89. [Read Session and User Data](#89-read-session-and-user-data)
90. [Role Based Access Control](#90-role-based-access-control)
91. [Customizing Clerk Components](#91-customizing-clerk-components)
92. [Deploying Next.js Apps](#92-deploying-nextjs-apps)

---

## 1. Introduction to Next.js

### What is Next.js?

Think of Next.js as a supercharged version of React. React alone is just a library for building UI — it doesn't tell you how to handle routing, data fetching, or server-side logic. Next.js takes React and adds all those missing pieces on top.

In simpler words: **React builds your UI, Next.js builds your entire web application.**

### Why use Next.js over plain React?

| Feature | Plain React | Next.js |
|---|---|---|
| Routing | You set it up yourself (react-router) | Built-in, file-based |
| SEO | Poor (page is empty until JS loads) | Excellent (server renders HTML) |
| API routes | Need a separate backend | Built-in Route Handlers |
| Performance | You optimize it yourself | Many optimizations built-in |
| Image optimization | Manual | Built-in `<Image>` component |

### Key things Next.js gives you

- **File-based routing** — Create a file, get a route. No router configuration.
- **Server Components** — Render components on the server, send only HTML to the browser.
- **Server Actions** — Run server-side code directly from your forms/components.
- **Built-in optimizations** — Images, fonts, scripts are automatically optimized.
- **Full-stack in one project** — Frontend and backend code live together.

### App Router vs Pages Router

Next.js has two routing systems:

- **Pages Router** — The old way (still works, files go in `pages/` folder).
- **App Router** — The new way (files go in `app/` folder). This guide focuses on the App Router introduced in Next.js 13 and matured in 14/15.

> **Bottom line:** Next.js lets you build fast, SEO-friendly, full-stack web apps using React, without setting up a million tools yourself.

---

## 2. Hello World

### Creating your first Next.js app

Open your terminal and run:

```bash
npx create-next-app@latest my-app
```

You'll get a few questions:
- Would you like to use TypeScript? → Yes (recommended)
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Your choice
- Would you like to use the `src/` directory? → No (keep it simple)
- Would you like to use App Router? → **Yes** (this is what we're learning)

Then:

```bash
cd my-app
npm run dev
```

Open `http://localhost:3000` in your browser. You'll see the Next.js welcome page.

### Your first page

Open `app/page.tsx` (or `app/page.js`). Replace everything with:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Hello, World!</h1>
      <p>My first Next.js page.</p>
    </main>
  );
}
```

Save the file. Your browser updates instantly — that's **hot reloading**.

### What just happened?

- `app/page.tsx` is the **home page** (`/` route).
- The function you export is a React component — Next.js renders it on the server and sends HTML to the browser.
- No routing setup required. The file location IS the route.

---

## 3. Project Structure

### What each folder/file does

After creating a Next.js app, your project looks like this:

```
my-app/
├── app/                  ← Your pages and layouts live here
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx        ← Root layout (wraps every page)
│   └── page.tsx          ← Home page (route: /)
├── public/               ← Static files (images, icons, etc.)
├── next.config.ts        ← Next.js configuration
├── package.json          ← Project dependencies
├── tsconfig.json         ← TypeScript configuration
└── tailwind.config.ts    ← Tailwind config (if you chose Tailwind)
```

### The `app/` folder — the heart of your app

Everything inside `app/` is either:
- A **page** (`page.tsx`) — renders a UI at a URL
- A **layout** (`layout.tsx`) — wraps pages with shared UI (header, footer, etc.)
- A **loading** file (`loading.tsx`) — shows while a page loads
- An **error** file (`error.tsx`) — shows when something goes wrong
- A **route handler** (`route.ts`) — acts as an API endpoint

### The `public/` folder

Put static files here — images, SVGs, fonts, robots.txt. They're accessible at `/filename`. For example, `public/logo.png` → accessible at `http://localhost:3000/logo.png`.

### `next.config.ts`

This is where you configure Next.js behavior — things like allowed image domains, environment variables, redirects, etc.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // your config here
}

export default nextConfig
```

> **Mental model:** The `app/` folder is your map. Every folder = a route segment. Every `page.tsx` = a page the user can visit.

---

## 4. Before We Start

### Things to know before diving deep

Before you continue, here are a few concepts that will make everything else click:

#### Server Components vs Client Components

By default, **every component in Next.js App Router is a Server Component**. This means:
- It runs on the server
- It can directly access databases, file systems, secrets
- It cannot use `useState`, `useEffect`, or browser APIs

If you need interactivity (clicks, typing, state), add `'use client'` at the top of the file:

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

#### TypeScript basics you'll need

Next.js works great with TypeScript. You'll see types like:

```tsx
// Props type
type Props = {
  params: { id: string }
}

// Async component
export default async function Page({ params }: Props) {
  // ...
}
```

Don't worry if this looks unfamiliar — the patterns repeat and you'll get comfortable quickly.

#### File naming conventions in App Router

| File name | Purpose |
|---|---|
| `page.tsx` | The UI for that route |
| `layout.tsx` | Wrapper shared across pages |
| `loading.tsx` | Loading skeleton/spinner |
| `error.tsx` | Error UI |
| `not-found.tsx` | 404 page |
| `route.ts` | API endpoint |
| `template.tsx` | Like layout but re-mounts on navigation |

#### Environment Variables

Create a `.env.local` file at the root:

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=https://api.example.com
```

- Variables starting with `NEXT_PUBLIC_` are available in the browser.
- All others are server-only (never sent to browser).

---

## 5. Routing

### How routing works in Next.js App Router

Next.js uses **file-system based routing**. The folder structure inside `app/` directly maps to URLs.

- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/blog/page.tsx` → `/blog`
- `app/contact/page.tsx` → `/contact`

**To create a new route, just create a folder with a `page.tsx` inside it.**

### Example

```
app/
├── page.tsx          → /
├── about/
│   └── page.tsx      → /about
├── blog/
│   └── page.tsx      → /blog
└── contact/
    └── page.tsx      → /contact
```

### Creating a route

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>We build awesome apps.</p>
    </div>
  );
}
```

Visit `http://localhost:3000/about` and you'll see this page.

### Important rule

Only files named `page.tsx` (or `page.js`) become publicly accessible routes. A folder without a `page.tsx` is not a route — it's just a folder.

> **Think of it like this:** Every folder is a segment of the URL. Every `page.tsx` is the door that opens that URL to visitors.

---

## 6. Nested Routes

### What are nested routes?

Nested routes are routes within routes — URLs with multiple segments like `/blog/articles` or `/dashboard/settings/profile`.

### How to create them

Just nest folders inside each other:

```
app/
└── dashboard/
    ├── page.tsx           → /dashboard
    ├── settings/
    │   └── page.tsx       → /dashboard/settings
    └── analytics/
        └── page.tsx       → /dashboard/analytics
```

### Example

```tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return <h1>Dashboard Home</h1>;
}

// app/dashboard/settings/page.tsx
export default function Settings() {
  return <h1>Settings</h1>;
}

// app/dashboard/analytics/page.tsx
export default function Analytics() {
  return <h1>Analytics</h1>;
}
```

These are completely independent pages. Visiting `/dashboard` shows the dashboard, `/dashboard/settings` shows settings.

### Real-world example

```
app/
└── products/
    ├── page.tsx              → /products (list all products)
    └── reviews/
        └── page.tsx          → /products/reviews (all reviews)
```

> **Mental model:** Nesting folders = nesting URL segments. It's that straightforward.

---

## 7. Dynamic Routes

### What are dynamic routes?

Sometimes you don't know the URL ahead of time. For example, `/blog/my-first-post`, `/blog/learning-nextjs`, `/users/123`, `/users/456` — the last part changes based on data.

Dynamic routes handle this with **square brackets**: `[slug]` or `[id]`.

### How to create a dynamic route

Create a folder with square brackets around the name:

```
app/
└── blog/
    ├── page.tsx              → /blog
    └── [slug]/
        └── page.tsx          → /blog/anything-here
```

### Accessing the dynamic value

The dynamic part is available via the `params` prop:

```tsx
// app/blog/[slug]/page.tsx
type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  
  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>You are reading: {slug}</p>
    </div>
  );
}
```

> **Note:** In Next.js 15, `params` is now a Promise, so you need to `await` it.

### Example URLs this handles

- `/blog/hello-world` → `slug = "hello-world"`
- `/blog/nextjs-tips` → `slug = "nextjs-tips"`
- `/blog/123` → `slug = "123"`

### Real-world usage — fetching data

```tsx
// app/products/[id]/page.tsx
type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  
  // Fetch product from your API/database
  const product = await fetch(`https://api.example.com/products/${id}`)
    .then(res => res.json())

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
```

---

## 8. Nested Dynamic Routes

### Combining nesting with dynamic segments

You can nest dynamic routes — useful for things like `/users/123/posts/456`.

```
app/
└── users/
    └── [userId]/
        ├── page.tsx                    → /users/123
        └── posts/
            └── [postId]/
                └── page.tsx            → /users/123/posts/456
```

### Accessing multiple dynamic params

```tsx
// app/users/[userId]/posts/[postId]/page.tsx
type Props = {
  params: Promise<{
    userId: string
    postId: string
  }>
}

export default async function UserPost({ params }: Props) {
  const { userId, postId } = await params

  return (
    <div>
      <h1>User: {userId}</h1>
      <h2>Post: {postId}</h2>
    </div>
  );
}
```

### Real-world example — e-commerce

```
app/
└── store/
    └── [categoryId]/
        ├── page.tsx                       → /store/electronics
        └── products/
            └── [productId]/
                └── page.tsx               → /store/electronics/products/iphone-15
```

```tsx
// app/store/[categoryId]/products/[productId]/page.tsx
type Props = {
  params: Promise<{
    categoryId: string
    productId: string
  }>
}

export default async function ProductDetail({ params }: Props) {
  const { categoryId, productId } = await params

  const product = await fetchProduct(categoryId, productId)

  return (
    <article>
      <p>Category: {categoryId}</p>
      <h1>{product.name}</h1>
    </article>
  )
}
```

---

## 9. Catch-all Segments

### What are catch-all segments?

Sometimes you want one route to match any number of URL segments. For example, a documentation site might have:
- `/docs/getting-started`
- `/docs/api/reference/hooks`
- `/docs/guides/deployment/vercel`

Instead of creating folders for every possible path, use **catch-all segments**: `[...slug]`

### Syntax

```
app/
└── docs/
    └── [...slug]/
        └── page.tsx    → matches /docs/anything/and/everything/here
```

### Accessing catch-all params

The `slug` will be an **array** of strings:

```tsx
// app/docs/[...slug]/page.tsx
type Props = {
  params: Promise<{ slug: string[] }>
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params
  // slug is an array: ['api', 'reference', 'hooks']

  return (
    <div>
      <p>Path: {slug.join(' / ')}</p>
      <p>Segments: {slug.length}</p>
    </div>
  );
}
```

| URL | `slug` value |
|---|---|
| `/docs/intro` | `['intro']` |
| `/docs/api/hooks` | `['api', 'hooks']` |
| `/docs/a/b/c/d` | `['a', 'b', 'c', 'd']` |

### Optional catch-all: `[[...slug]]`

Double brackets make the catch-all **optional** — it also matches the parent route itself:

```
app/
└── docs/
    └── [[...slug]]/
        └── page.tsx    → matches /docs AND /docs/anything/here
```

| URL | `slug` value |
|---|---|
| `/docs` | `undefined` or `[]` |
| `/docs/intro` | `['intro']` |

---

## 10. Not Found Page

### What is the Not Found page?

When a user visits a URL that doesn't exist, you want to show a friendly "Page Not Found" message instead of a blank screen or generic error.

### Creating a custom 404 page

Create a file called `not-found.tsx` inside the `app/` folder:

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 — Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
}
```

This automatically shows up for any unmatched route.

### Triggering 404 programmatically

Sometimes a page exists but the data doesn't (e.g., `/products/999` but product 999 was deleted). Use `notFound()` from Next.js:

```tsx
// app/products/[id]/page.tsx
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await fetchProduct(id)

  if (!product) {
    notFound() // Renders the not-found.tsx page
  }

  return <h1>{product.name}</h1>
}
```

### Nested not-found pages

You can have `not-found.tsx` inside nested folders too. Next.js will use the closest one to the failing route:

```
app/
├── not-found.tsx              ← Global 404
└── products/
    ├── not-found.tsx          ← Only for /products/* routes
    └── [id]/
        └── page.tsx
```

---

## 11. File Colocation

### What is file colocation?

File colocation means keeping related files (components, styles, tests, utilities) next to the pages that use them, inside the `app/` folder — rather than in a separate `components/` folder far away.

### Why is this useful?

In large projects, hunting for a component that belongs to the `/dashboard` route across a huge `components/` folder is painful. Colocation keeps things organized by feature.

### How it works

Only `page.tsx`, `layout.tsx`, `route.ts`, and similar **special files** become routes. Regular component files placed in `app/` folders are **not** exposed as routes.

```
app/
└── dashboard/
    ├── page.tsx          ← Route: /dashboard
    ├── StatsCard.tsx     ← Not a route, just a component
    ├── chart.utils.ts    ← Utility functions
    └── dashboard.css     ← Styles
```

You can import `StatsCard.tsx` from `page.tsx` without any issues.

### Example

```tsx
// app/dashboard/StatsCard.tsx
type Props = {
  title: string
  value: number
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

// app/dashboard/page.tsx
import StatsCard from './StatsCard'

export default function Dashboard() {
  return (
    <div>
      <StatsCard title="Users" value={1200} />
      <StatsCard title="Revenue" value={45000} />
    </div>
  )
}
```

> **Rule of thumb:** If a file is only used by one route, colocate it. If it's shared by many routes, put it in a top-level `components/` or `lib/` folder.

---

## 12. Private Folders

### What are private folders?

Private folders are folders that Next.js completely ignores for routing. You create them by prefixing the folder name with an underscore: `_folderName`.

### Why use them?

Sometimes you want to put helper files, utilities, or internal components inside `app/` but you don't want Next.js to accidentally treat them as routes.

### How to create one

Just prefix the folder name with `_`:

```
app/
├── page.tsx
├── _components/           ← Private folder — not a route
│   ├── Button.tsx
│   └── Modal.tsx
├── _utils/                ← Private folder — not a route
│   └── formatDate.ts
└── about/
    └── page.tsx
```

Visiting `/_components` in the browser will give you a 404.

### Example

```tsx
// app/_utils/formatDate.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// app/blog/[slug]/page.tsx
import { formatDate } from '../../_utils/formatDate'

export default function BlogPost() {
  const date = new Date()
  return <p>Published on: {formatDate(date)}</p>
}
```

### Private folders vs Route Groups

- `_folder` — Private (ignored by router entirely)
- `(folder)` — Route Group (also ignored by router but for organizational/layout purposes)

---

## 13. Route Groups

### What are route groups?

Route groups let you organize routes into groups **without affecting the URL structure**. You create them by wrapping the folder name in parentheses: `(groupName)`.

### Why use them?

Two main reasons:
1. **Organization** — Group related routes together (auth routes, marketing routes, app routes)
2. **Different layouts for the same URL level** — Routes in different groups can have different layouts

### Basic example — organizing without affecting URLs

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx      → /about
│   └── blog/
│       └── page.tsx      → /blog
└── (app)/
    ├── dashboard/
    │   └── page.tsx      → /dashboard
    └── settings/
        └── page.tsx      → /settings
```

The `(marketing)` and `(app)` folders are invisible to the URL. The routes are `/about`, `/blog`, `/dashboard`, `/settings` — no `/marketing/` or `/app/` in the URL.

### Using route groups for separate layouts

```
app/
├── (auth)/
│   ├── layout.tsx        ← Auth-specific layout (centered, no navbar)
│   ├── login/
│   │   └── page.tsx      → /login
│   └── register/
│       └── page.tsx      → /register
└── (main)/
    ├── layout.tsx        ← Main app layout (with navbar, sidebar)
    ├── dashboard/
    │   └── page.tsx      → /dashboard
    └── profile/
        └── page.tsx      → /profile
```

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '400px' }}>
        {children}
      </div>
    </div>
  )
}
```

---

## 14. Layouts

### What is a layout?

A layout is UI that is **shared across multiple pages** — things like a navigation bar, sidebar, footer, or a shell around the main content.

In Next.js, you create a layout by creating a `layout.tsx` file. The `children` prop represents whatever page is currently being shown inside it.

### Root layout (required)

Every Next.js app must have a root layout at `app/layout.tsx`. It wraps every single page in your app:

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>My App Logo | Home | About</nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 My App</footer>
      </body>
    </html>
  )
}
```

### How layouts work

When you visit `/about`:
1. `app/layout.tsx` renders (with nav and footer)
2. Inside it, `app/about/page.tsx` renders as `{children}`

The layout **doesn't re-render** when you navigate between pages. Only the `{children}` part changes. This makes navigation feel instant.

### Key points

- Layouts **must** accept a `children` prop
- The root layout **must** include `<html>` and `<body>` tags
- Layouts **persist** across page navigation (they don't re-mount)
- You can have layouts at any level of your folder structure

---

## 15. Nested Layouts

### What are nested layouts?

You can have layouts at every level of your folder structure. They **nest inside each other**, wrapping deeper and deeper content.

### Example

```
app/
├── layout.tsx             ← Root layout (wraps everything)
├── page.tsx               → /
└── dashboard/
    ├── layout.tsx         ← Dashboard layout (wraps all dashboard pages)
    ├── page.tsx           → /dashboard
    ├── settings/
    │   └── page.tsx       → /dashboard/settings
    └── analytics/
        └── page.tsx       → /dashboard/analytics
```

### The layouts wrap like Russian dolls

When visiting `/dashboard/settings`:
1. `app/layout.tsx` renders (global nav, html, body)
2. Inside it, `app/dashboard/layout.tsx` renders (dashboard sidebar)
3. Inside that, `app/dashboard/settings/page.tsx` renders

```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>Global Navigation</nav>
        {children}
      </body>
    </html>
  )
}

// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <aside>Dashboard Sidebar</aside>
      <section>{children}</section>
    </div>
  )
}

// app/dashboard/settings/page.tsx
export default function Settings() {
  return <h1>Settings</h1>
}
```

The user sees: **Global Nav** → **Dashboard Sidebar** → **Settings content**

---

## 16. Multiple Root Layouts

### What are multiple root layouts?

Sometimes different sections of your app need completely different HTML structures. For example:
- Marketing pages might have a colorful, animated design
- The main app might have a clean dashboard look
- Auth pages might be centered with no navigation

You can achieve this using **Route Groups**, each with its own `layout.tsx`.

### Important: Remove the single root layout

To use multiple root layouts, each root-level route group needs its own `layout.tsx` that includes `<html>` and `<body>` tags. You remove the single `app/layout.tsx` (or you keep it only if you want a true shared root).

### Example setup

```
app/
├── (marketing)/
│   ├── layout.tsx          ← Has <html>, <body>, marketing fonts/styles
│   ├── page.tsx            → /
│   └── about/
│       └── page.tsx        → /about
└── (app)/
    ├── layout.tsx          ← Has <html>, <body>, app-specific setup
    ├── dashboard/
    │   └── page.tsx        → /dashboard
    └── settings/
        └── page.tsx        → /settings
```

```tsx
// app/(marketing)/layout.tsx
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Georgia, serif', background: '#fff5f0' }}>
        <header>🚀 My Product — Beautiful Marketing Site</header>
        {children}
        <footer>Made with love</footer>
      </body>
    </html>
  )
}

// app/(app)/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'monospace', background: '#1a1a2e' }}>
        <nav>Dashboard Navigation</nav>
        {children}
      </body>
    </html>
  )
}
```

> **Note:** When navigating between different root layout groups (e.g., from `/` to `/dashboard`), a **full page load** happens because the HTML structure changes. This is expected behavior.

---

## 17. Routing Metadata

### What is routing metadata?

Metadata is information about your page that appears in:
- The browser tab title
- Search engine results (SEO)
- Social media previews (Twitter cards, Open Graph for Facebook/LinkedIn)

Next.js gives you a clean, type-safe way to set this metadata per page.

### Two ways to define metadata

**Option 1: Static metadata (fixed values)**

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | My App',
  description: 'Learn more about our team and mission.',
  keywords: ['about', 'team', 'mission'],
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our team.',
    images: ['/images/about-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us',
  }
}

export default function AboutPage() {
  return <h1>About Us</h1>
}
```

**Option 2: Dynamic metadata (based on data)**

```tsx
// app/products/[id]/page.tsx
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await fetchProduct(id)

  return {
    title: `${product.name} | My Store`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  // page content...
}
```

### Where metadata can be defined

You can export `metadata` from:
- `app/layout.tsx` (applies to all pages in that layout)
- `app/page.tsx` (applies to that specific page)
- Any `page.tsx` or `layout.tsx` in nested routes

Deeper metadata **overrides** parent metadata for the same fields.

---

## 18. title Metadata

### The `title` field in detail

The `title` is the most important piece of metadata. It appears in the browser tab and in search results. Next.js gives you a powerful **template system** for titles.

### Simple title

```tsx
export const metadata = {
  title: 'Home Page',
}
```

### Title template

Set a template in the root layout so all pages automatically get a consistent format like "Page Name | My App":

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My App',   // %s = the child page's title
    default: 'My App',         // Used when no title is set
  },
}
```

Now in child pages:

```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About Us',  // Becomes: "About Us | My App"
}

// app/blog/page.tsx
export const metadata = {
  title: 'Blog',  // Becomes: "Blog | My App"
}
```

### Using `absolute` to ignore the template

If one page needs a completely custom title that ignores the template:

```tsx
// app/special/page.tsx
export const metadata = {
  title: {
    absolute: 'Special Page — No Template Applied',
  },
}
```

### Summary of title options

| Option | What it does |
|---|---|
| `title: 'string'` | Simple static title |
| `title.template` | Pattern applied to child page titles (`%s`) |
| `title.default` | Fallback when no title is provided |
| `title.absolute` | Ignores template, uses exactly this string |

---

## 19. Linking Component Navigation

### How to navigate between pages

In a normal HTML website, you use `<a href="/about">`. In Next.js, **always use the `<Link>` component** instead. Here's why:

- `<a>` does a **full page reload** — slow, resets all state
- `<Link>` does **client-side navigation** — instant, preserves state, prefetches pages

### Basic usage

```tsx
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  )
}
```

### Linking to dynamic routes

```tsx
// Linking to /products/123
<Link href="/products/123">View Product</Link>

// With a variable
const productId = 123
<Link href={`/products/${productId}`}>View Product</Link>

// Using href object (more explicit)
<Link href={{ pathname: '/products/[id]', query: { id: 123 } }}>
  View Product
</Link>
```

### Replacing history instead of pushing

By default, navigation **pushes** to browser history (back button works). Use `replace` to replace instead:

```tsx
<Link href="/dashboard" replace>
  Go to Dashboard (replaces history)
</Link>
```

### Prefetching

Next.js automatically prefetches linked pages when they're visible in the viewport (in production mode). This makes navigation feel instant. You can disable it:

```tsx
<Link href="/heavy-page" prefetch={false}>
  Heavy Page
</Link>
```

---

## 20. Active Links

### What are active links?

An "active" link is one that corresponds to the current page — usually highlighted differently in a navigation menu so users know where they are.

### How to detect the current route

Use the `usePathname()` hook from `next/navigation`:

```tsx
// app/_components/Navbar.tsx
'use client'  // usePathname is a client hook

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav>
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            fontWeight: pathname === link.href ? 'bold' : 'normal',
            color: pathname === link.href ? '#0070f3' : '#333',
            textDecoration: 'none',
            margin: '0 10px',
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
```

### With CSS classes (Tailwind example)

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}
    >
      {children}
    </Link>
  )
}
```

### Partial matching for nested routes

If you want `/blog` to be active for both `/blog` and `/blog/my-post`:

```tsx
const isActive = pathname === href || pathname.startsWith(href + '/')
```

---

## 21. params and searchParams

### What are params and searchParams?

These are two different ways URL information reaches your page:

- **`params`** — Dynamic route segments (`/products/[id]` → `{ id: '123' }`)
- **`searchParams`** — Query string (`/search?q=nextjs&page=2` → `{ q: 'nextjs', page: '2' }`)

### Using `params`

Already covered in dynamic routes. In Next.js 15, params is a Promise:

```tsx
// app/products/[id]/page.tsx
type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  return <h1>Product ID: {id}</h1>
}
```

### Using `searchParams`

Also a Promise in Next.js 15:

```tsx
// app/search/page.tsx
type Props = {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {q || 'none'}</p>
      <p>Page: {page || '1'}</p>
    </div>
  )
}
```

Visit `/search?q=nextjs&page=2` → shows "Query: nextjs, Page: 2"

### Using both together

```tsx
// app/shop/[category]/page.tsx
type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ sort?: string; limit?: string }>
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { category } = await params
  const { sort = 'popular', limit = '20' } = await searchParams

  const products = await fetchProducts({ category, sort, limit: parseInt(limit) })

  return (
    <div>
      <h1>Category: {category}</h1>
      <p>Sorted by: {sort}</p>
      {/* render products */}
    </div>
  )
}
```

### In Client Components

In client components, use `useSearchParams()` hook:

```tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return <p>Searching for: {query}</p>
}
```

---

## 22. Navigating Programmatically

### What is programmatic navigation?

Sometimes you need to navigate to a different page in response to an action that isn't a link click — like after form submission, after login, or after a timer.

### Using `useRouter` in Client Components

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // ... do login logic
    const success = await loginUser()

    if (success) {
      router.push('/dashboard')    // Navigate to dashboard
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  )
}
```

### `router` methods

| Method | What it does |
|---|---|
| `router.push('/path')` | Navigate to path, add to history |
| `router.replace('/path')` | Navigate, replace current history entry |
| `router.back()` | Go back (like browser back button) |
| `router.forward()` | Go forward |
| `router.refresh()` | Re-fetch server data for current page |
| `router.prefetch('/path')` | Prefetch a page for faster navigation |

### Redirecting from Server Components

In server components (and server actions), use `redirect()` instead:

```tsx
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')  // Redirects before rendering
  }

  return <h1>Welcome, {user.name}!</h1>
}
```

### Redirect after form submission (Server Action)

```tsx
'use server'

import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const post = await savePost(title)
  redirect(`/posts/${post.id}`)  // Go to the new post
}
```

---

## 23. Templates

### What are templates?

Templates are similar to layouts, but with one key difference:
- **Layouts** persist between route changes (they don't re-mount)
- **Templates** create a **fresh instance** every time you navigate to a route that uses them

### When to use templates?

Use templates when you need:
- **Fresh state** on every navigation (e.g., a form that should reset when going back to the page)
- **Entry animations** that replay on every visit
- `useEffect` to run on every navigation (not just first load)
- `useState` to reset on navigation

### Creating a template

Name the file `template.tsx`:

```tsx
// app/dashboard/template.tsx
export default function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      {children}
    </div>
  )
}
```

### Layout vs Template in action

```
app/
└── dashboard/
    ├── layout.tsx      ← Re-used (doesn't re-mount on navigation)
    ├── template.tsx    ← New instance on every navigation
    ├── page.tsx
    └── settings/
        └── page.tsx
```

When you navigate from `/dashboard` to `/dashboard/settings`:
- `layout.tsx` stays mounted (sidebar doesn't re-render)
- `template.tsx` unmounts and remounts (animation replays)

### Practical example — page transition animation

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    setOpacity(1)  // This runs on EVERY navigation
  }, [])

  return (
    <div style={{ opacity, transition: 'opacity 0.3s ease' }}>
      {children}
    </div>
  )
}
```

---

## 24. Loading UI

### What is loading UI?

When a page is fetching data, you want to show a loading spinner or skeleton instead of a blank screen. Next.js makes this simple with `loading.tsx`.

### Creating a loading file

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div className="spinner" />
      <p>Loading dashboard...</p>
    </div>
  )
}
```

That's it. Next.js automatically shows this while the page is loading and swaps it with the real content when ready.

### How it works behind the scenes

Next.js wraps your page in a `<Suspense>` boundary automatically. Your `loading.tsx` is the fallback shown during that suspension.

### Skeleton loading example

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return (
    <div>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          marginBottom: '20px',
          padding: '20px',
          background: '#f0f0f0',
          borderRadius: '8px',
          animation: 'pulse 1.5s infinite'
        }}>
          <div style={{ width: '60%', height: '20px', background: '#ddd', marginBottom: '10px' }} />
          <div style={{ width: '100%', height: '12px', background: '#ddd', marginBottom: '6px' }} />
          <div style={{ width: '80%', height: '12px', background: '#ddd' }} />
        </div>
      ))}
    </div>
  )
}
```

### Loading at different levels

```
app/
├── loading.tsx               ← Global loading (whole app)
└── dashboard/
    ├── loading.tsx           ← Dashboard-specific loading
    └── analytics/
        ├── loading.tsx       ← Analytics-specific loading
        └── page.tsx
```

Each `loading.tsx` applies only to the pages at its level and below, until a more specific one is found.

---

## 25. Error Handling

### What is error handling in Next.js?

When something goes wrong (network error, database error, uncaught exception), you want to show a helpful error page instead of a crash. Create an `error.tsx` file to handle this.

### Creating an error file

```tsx
// app/dashboard/error.tsx
'use client'  // Error components MUST be client components

import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Key points

- `error.tsx` **must** be a Client Component (add `'use client'`)
- It receives two props:
  - `error` — The Error object
  - `reset` — A function to retry rendering the page
- The `digest` property on the error is a hash that helps identify the error in server logs

### How it works

`error.tsx` wraps the `page.tsx` at the same level in an error boundary. If `page.tsx` throws, `error.tsx` catches it and displays instead.

```
app/dashboard/
├── layout.tsx    ← NOT caught by error.tsx (see below)
├── error.tsx     ← Catches errors in page.tsx
└── page.tsx      ← If this throws, error.tsx shows
```

---

## 26. Recovering from Errors

### The `reset` function

The `error.tsx` component receives a `reset` function as a prop. Calling it attempts to re-render the failed component — useful when the error might be temporary (like a network hiccup).

```tsx
// app/dashboard/error.tsx
'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  return (
    <div>
      <h2>Oops! Something broke.</h2>
      <p style={{ color: 'gray' }}>{error.message}</p>
      
      <div>
        <button onClick={reset}>
          🔄 Try Again
        </button>
        <a href="/">Go Home</a>
      </div>
    </div>
  )
}
```

### What `reset` actually does

`reset` attempts to re-render the **segment** that failed (the `page.tsx` wrapped by this `error.tsx`). It doesn't reload the whole page — just the errored part.

### Combining reset with router.refresh()

Sometimes the error is stale data. Use `router.refresh()` before `reset()` to also re-fetch server data:

```tsx
'use client'

import { useRouter } from 'next/navigation'

type Props = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  const router = useRouter()

  function handleReset() {
    router.refresh()   // Re-fetch server data
    reset()            // Re-render the component
  }

  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={handleReset}>Try Again</button>
    </div>
  )
}
```

---

## 27. Handling Errors in Nested Routes

### How error boundaries work in nested routes

Error boundaries only catch errors **within their own segment** (the `page.tsx` at the same level). They **don't** catch errors from:
- Parent layouts
- Their own `layout.tsx`

### The "bubbling" behavior

If a route doesn't have its own `error.tsx`, the error bubbles up to the nearest parent `error.tsx`:

```
app/
├── error.tsx                     ← Catches errors from any nested page
├── dashboard/
│   ├── error.tsx                 ← Catches errors in dashboard/page.tsx
│   ├── page.tsx
│   └── analytics/
│       └── page.tsx              ← No error.tsx here → bubbles up to dashboard/error.tsx
```

### Granular error boundaries

The more specific the `error.tsx`, the more specific the error handling:

```
app/
├── error.tsx                     ← Global fallback
└── dashboard/
    ├── error.tsx                 ← Dashboard-level errors
    ├── page.tsx
    ├── settings/
    │   ├── error.tsx             ← Only settings errors
    │   └── page.tsx
    └── analytics/
        └── page.tsx              ← Uses dashboard/error.tsx
```

### Best practice

Have at least a global `app/error.tsx` as a safety net. Add more specific error files for sections where errors are more likely (data-heavy pages, external API calls).

---

## 28. Handling Errors in Layouts

### The problem with layouts and errors

`error.tsx` at the same level as a `layout.tsx` **cannot catch errors thrown in that layout**. This is because the error boundary wraps the page content, but the layout itself is outside the boundary.

```
dashboard/
├── layout.tsx    ← If THIS throws, dashboard/error.tsx WON'T catch it
├── error.tsx     ← Only catches errors from page.tsx below
└── page.tsx
```

### Solution: Put the error.tsx one level up

To catch errors from `dashboard/layout.tsx`, place `error.tsx` one level higher:

```
app/
├── error.tsx          ← This WILL catch errors from dashboard/layout.tsx
└── dashboard/
    ├── layout.tsx     ← Error here is caught by app/error.tsx
    ├── error.tsx      ← Only catches dashboard/page.tsx errors
    └── page.tsx
```

### Practical example

If your dashboard layout fetches user session and throws if unauthenticated:

```tsx
// app/dashboard/layout.tsx
import { getSession } from '@/lib/session'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  
  if (!session) {
    throw new Error('Not authenticated')  // app/error.tsx will catch this
  }

  return (
    <div>
      <nav>Dashboard nav for {session.user.name}</nav>
      {children}
    </div>
  )
}
```

---

## 29. Handling Global Errors

### What is global error handling?

The root `app/error.tsx` handles errors for most pages, but it **cannot catch errors in the root layout** (`app/layout.tsx`). For that, you need `app/global-error.tsx`.

### Creating a global error handler

```tsx
// app/global-error.tsx
'use client'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  return (
    // Must include <html> and <body> because it replaces the root layout
    <html>
      <body>
        <div style={{ textAlign: 'center', padding: '100px' }}>
          <h1>Something went terribly wrong</h1>
          <p>{error.message}</p>
          <button onClick={reset}>Try to recover</button>
        </div>
      </body>
    </html>
  )
}
```

### Key differences from regular `error.tsx`

| Feature | `error.tsx` | `global-error.tsx` |
|---|---|---|
| Where | Any route segment | Only in `app/` root |
| Catches | Page errors | Root layout errors + fallback |
| Must include `<html><body>` | No | Yes (replaces root layout) |
| Production only | No | Yes |

### The error hierarchy (full picture)

```
global-error.tsx     ← Catches root layout.tsx errors
  └── app/error.tsx  ← Catches app-level page errors
        └── dashboard/error.tsx  ← Catches dashboard page errors
```

> **Tip:** `global-error.tsx` only activates in production. In development, you see the error overlay instead.

---

## 30. Parallel Routes

### What are parallel routes?

Parallel routes let you render **multiple pages simultaneously** in the same layout. Think of a dashboard that shows a stats panel, a recent activity feed, and a notifications widget — all loading independently at the same time.

### How to create parallel routes

Use the `@folderName` syntax (called "slots"):

```
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx
    ├── @stats/
    │   └── page.tsx        ← Slot: stats
    ├── @activity/
    │   └── page.tsx        ← Slot: activity
    └── @notifications/
        └── page.tsx        ← Slot: notifications
```

### Using slots in the layout

The layout receives each slot as a prop:

```tsx
// app/dashboard/layout.tsx
type Props = {
  children: React.ReactNode
  stats: React.ReactNode
  activity: React.ReactNode
  notifications: React.ReactNode
}

export default function DashboardLayout({ children, stats, activity, notifications }: Props) {
  return (
    <div>
      <div className="main-content">{children}</div>
      <div className="sidebar">
        <div>{stats}</div>
        <div>{activity}</div>
        <div>{notifications}</div>
      </div>
    </div>
  )
}
```

```tsx
// app/dashboard/@stats/page.tsx
export default async function StatsPanel() {
  const stats = await fetchStats()  // Each loads independently
  return <div>Users: {stats.users}</div>
}

// app/dashboard/@activity/page.tsx
export default async function ActivityFeed() {
  const feed = await fetchActivity()
  return <ul>{feed.map(item => <li key={item.id}>{item.text}</li>)}</ul>
}
```

### Why this is powerful

Each slot:
- Loads independently (no slot waiting for another)
- Can have its own `loading.tsx` and `error.tsx`
- Can be navigated independently

---

## 31. Unmatched Routes

### The problem with parallel routes and navigation

When you have parallel routes (slots), navigating between pages can leave some slots in an "unmatched" state — the slot doesn't have a matching page for the current URL.

### The `default.tsx` file

To handle unmatched slots, create a `default.tsx` file in the slot folder. This acts as a fallback when the slot has no matching page:

```tsx
// app/dashboard/@notifications/default.tsx
export default function NotificationsDefault() {
  return <div>No notifications to show for this view.</div>
}
```

### Practical example

```
app/
└── dashboard/
    ├── layout.tsx
    ├── page.tsx                     → /dashboard (both slots load)
    ├── @stats/
    │   ├── page.tsx                 ← Shows at /dashboard
    │   └── default.tsx             ← Shows when stats is unmatched
    └── @activity/
        ├── page.tsx                 ← Shows at /dashboard
        ├── default.tsx             ← Shows when activity is unmatched
        └── detailed/
            └── page.tsx            ← /dashboard/detailed (stats slot unmatched → uses default.tsx)
```

When visiting `/dashboard/detailed`:
- `@activity/detailed/page.tsx` renders
- `@stats` has no `detailed` page → falls back to `@stats/default.tsx`

### When to use `default.tsx`

Always create a `default.tsx` in slots that might not have a matching page for every URL in your app. Without it, navigating to an unmatched URL causes a 404 even if other parts of the page are fine.

---

## 32. Conditional Routes

### What are conditional routes?

Conditional routes use parallel routes to show completely different UI based on a condition — like showing different dashboards for admin vs regular users, or different views based on user state.

### Example: Different UI based on authentication

```
app/
└── dashboard/
    ├── layout.tsx
    ├── @authenticated/
    │   ├── default.tsx     ← Empty/null
    │   └── page.tsx        ← Full dashboard
    └── @unauthenticated/
        ├── default.tsx     ← Empty/null
        └── page.tsx        ← Login prompt
```

```tsx
// app/dashboard/layout.tsx
import { getUser } from '@/lib/auth'

type Props = {
  authenticated: React.ReactNode
  unauthenticated: React.ReactNode
}

export default async function DashboardLayout({ authenticated, unauthenticated }: Props) {
  const user = await getUser()

  return (
    <div>
      {user ? authenticated : unauthenticated}
    </div>
  )
}
```

```tsx
// app/dashboard/@authenticated/page.tsx
export default function AuthenticatedDashboard() {
  return <h1>Welcome to your dashboard!</h1>
}

// app/dashboard/@unauthenticated/page.tsx
export default function UnauthenticatedView() {
  return (
    <div>
      <h1>Please log in</h1>
      <a href="/login">Login</a>
    </div>
  )
}
```

### Another use case: Role-based UI

```tsx
// app/admin/layout.tsx
export default async function AdminLayout({ admin, viewer }: { admin: React.ReactNode; viewer: React.ReactNode }) {
  const user = await getUser()
  return user.role === 'admin' ? admin : viewer
}
```

---

## 33. Intercepting Routes

### What are intercepting routes?

Intercepting routes let you show a route's content **within the context of another route** — the most common example is opening a photo in a modal overlay while keeping the underlying page visible. The URL changes (so it's shareable/bookmarkable), but the UI shows it as a modal on top of the current page.

Think of how Instagram shows a post in a modal when you click on it in the feed, but if you share that URL and open it directly, it shows the full post page.

### The `(.)` syntax

| Syntax | Matches |
|---|---|
| `(.)folder` | Same level |
| `(..)folder` | One level up |
| `(..)(..)folder` | Two levels up |
| `(...)folder` | From app root |

### Example: Photo gallery with modal

```
app/
├── feed/
│   ├── page.tsx                          → /feed (shows photo grid)
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx                  → Intercepts /photo/[id] when coming from /feed
└── photo/
    └── [id]/
        └── page.tsx                      → /photo/123 (full page, direct access)
```

```tsx
// app/feed/(.)photo/[id]/page.tsx
// This runs when navigating to /photo/123 FROM within /feed

import Modal from '@/components/Modal'
import PhotoView from '@/components/PhotoView'

type Props = {
  params: Promise<{ id: string }>
}

export default async function InterceptedPhoto({ params }: Props) {
  const { id } = await params
  const photo = await fetchPhoto(id)

  return (
    <Modal>
      <PhotoView photo={photo} />
    </Modal>
  )
}

// app/photo/[id]/page.tsx
// This runs when visiting /photo/123 DIRECTLY (or on refresh)
export default async function PhotoPage({ params }: Props) {
  const { id } = await params
  const photo = await fetchPhoto(id)

  return (
    <div>
      <h1>Photo {id}</h1>
      <img src={photo.url} alt={photo.title} />
    </div>
  )
}
```

---

## 34. Parallel Intercepting Routes

### Combining parallel routes with intercepting routes

This combination is powerful for building modal UIs. Use a `@modal` slot alongside intercepting routes for a clean modal pattern:

```
app/
├── layout.tsx                            ← Accepts @modal slot
├── page.tsx                              → / (main content)
├── @modal/
│   ├── default.tsx                       ← null (no modal by default)
│   └── (.)photo/
│       └── [id]/
│           └── page.tsx                  ← Renders modal content
└── photo/
    └── [id]/
        └── page.tsx                      → /photo/123 (direct access)
```

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        {modal}  {/* Renders on top when intercepted */}
      </body>
    </html>
  )
}

// app/@modal/default.tsx
export default function ModalDefault() {
  return null  // No modal shown by default
}

// app/@modal/(.)photo/[id]/page.tsx
import Modal from '@/components/Modal'

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const photo = await fetchPhoto(id)

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  )
}
```

```tsx
// app/components/Modal.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={() => router.back()}
    >
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
```

**Result:** Clicking a photo shows a modal (URL changes to `/photo/123`). Refreshing the page shows the full photo page. Clicking outside the modal calls `router.back()` to return.

---

## 35. Route Handlers

### What are Route Handlers?

Route Handlers are Next.js's way of creating **API endpoints** — server-side code that handles HTTP requests. They're the replacement for the old `pages/api/` directory.

Think of them as mini-backend endpoints living inside your Next.js project.

### Creating a route handler

Create a `route.ts` file (not `page.tsx`) in any folder under `app/`:

```
app/
└── api/
    └── users/
        └── route.ts     → /api/users
```

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]

  return NextResponse.json(users)
}
```

Visit `http://localhost:3000/api/users` and you'll get the JSON response.

### Important rule

A folder can have either a `page.tsx` OR a `route.ts`, not both. They'd conflict on the same URL.

### Supported HTTP methods

```ts
// app/api/products/route.ts

export async function GET(request: Request) { }
export async function POST(request: Request) { }
export async function PUT(request: Request) { }
export async function PATCH(request: Request) { }
export async function DELETE(request: Request) { }
export async function HEAD(request: Request) { }
export async function OPTIONS(request: Request) { }
```

---

## 36. GET Request

### Handling GET requests

GET requests fetch data. They're the most common type of API request.

```ts
// app/api/posts/route.ts
import { NextResponse } from 'next/server'

// Simulated database
const posts = [
  { id: 1, title: 'Hello World', content: 'My first post' },
  { id: 2, title: 'Next.js Tips', content: 'Learning Next.js' },
]

export async function GET() {
  return NextResponse.json(posts, { status: 200 })
}
```

### GET with error handling

```ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetchFromDatabase()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
```

### Reading the Request object

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.url           // Full URL
  const headers = request.headers   // Request headers
  
  return NextResponse.json({ url })
}
```

### Calling this from a client component

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function PostsList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

---

## 37. POST Request

### Handling POST requests

POST requests send data to the server — creating new records, submitting forms, etc.

```ts
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()  // Parse JSON body

    // Validate the data
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Save to database (pseudocode)
    const newPost = await createPost({
      title: body.title,
      content: body.content,
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
```

### Calling POST from the frontend

```tsx
async function handleCreatePost(title: string, content: string) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })

  if (!response.ok) {
    throw new Error('Failed to create post')
  }

  const post = await response.json()
  console.log('Created:', post)
}
```

### Parsing different request body types

```ts
// JSON body
const json = await request.json()

// Form data
const formData = await request.formData()
const name = formData.get('name')

// Plain text
const text = await request.text()
```

---

## 38. Dynamic Route Handlers

### Route handlers with dynamic segments

Just like pages, route handlers can have dynamic segments:

```
app/
└── api/
    └── posts/
        ├── route.ts          → /api/posts
        └── [id]/
            └── route.ts      → /api/posts/123
```

```ts
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params

  const post = await fetchPostById(id)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
```

### Full CRUD for a resource

```ts
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type Context = { params: Promise<{ id: string }> }

// GET /api/posts/123
export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

// PATCH /api/posts/123
export async function PATCH(req: NextRequest, { params }: Context) {
  const { id } = await params
  const body = await req.json()
  const updated = await db.post.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}

// DELETE /api/posts/123
export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params
  await db.post.delete({ where: { id } })
  return NextResponse.json({ message: 'Deleted successfully' })
}
```

---

## 39. PATCH Request

### What is PATCH vs PUT?

- **PUT** — Replace the entire resource with new data
- **PATCH** — Update only specific fields of a resource

PATCH is preferred for partial updates:

```ts
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type Context = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Context) {
  const { id } = await params

  try {
    const body = await request.json()
    
    // Only update fields that were provided
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.bio && { bio: body.bio }),
        updatedAt: new Date(),
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
```

### Calling PATCH from the frontend

```ts
async function updateUser(id: string, changes: Partial<User>) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
  return res.json()
}

// Usage - only update the name, leave everything else unchanged
await updateUser('123', { name: 'New Name' })
```

---

## 40. DELETE Request

### Handling DELETE requests

```ts
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type Context = { params: Promise<{ id: string }> }

export async function DELETE(_request: NextRequest, { params }: Context) {
  const { id } = await params

  try {
    // Check if it exists first
    const post = await db.post.findUnique({ where: { id } })
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    await db.post.delete({ where: { id } })

    return NextResponse.json(
      { message: `Post ${id} deleted successfully` },
      { status: 200 }  // Or 204 with no body
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
```

### Calling DELETE from the frontend

```tsx
'use client'

async function deletePost(id: string) {
  const confirmed = confirm('Are you sure you want to delete this post?')
  if (!confirmed) return

  const res = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })

  if (res.ok) {
    console.log('Post deleted')
    // Refresh the page or update state
  }
}
```

### Status codes for DELETE

- `200 OK` — Deleted, returns some data about what was deleted
- `204 No Content` — Deleted, returns nothing (most RESTful)
- `404 Not Found` — Item didn't exist

---

## 41. URL Query Parameters

### Reading query parameters in Route Handlers

Query parameters are the `?key=value` part of URLs, like `/api/posts?page=2&limit=10`.

```ts
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Get individual params
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('q') || ''

  const pageNum = parseInt(page)
  const limitNum = parseInt(limit)
  const offset = (pageNum - 1) * limitNum

  const posts = await db.post.findMany({
    where: search ? { title: { contains: search } } : {},
    skip: offset,
    take: limitNum,
  })

  const total = await db.post.count()

  return NextResponse.json({
    posts,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    }
  })
}
```

### Example URLs

- `/api/posts` → page 1, limit 10, no search
- `/api/posts?page=2` → page 2, limit 10
- `/api/posts?q=nextjs&limit=5` → search "nextjs", limit 5

### Checking if a param exists

```ts
const hasSort = searchParams.has('sort')       // Boolean
const allCategories = searchParams.getAll('category')  // Array (for ?category=a&category=b)
```

---

## 42. Headers in Route Handlers

### Reading request headers

Headers carry metadata about the request — authorization tokens, content types, custom information.

```ts
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  // Method 1: From the request object
  const authHeader = request.headers.get('Authorization')
  const contentType = request.headers.get('Content-Type')
  const userAgent = request.headers.get('User-Agent')

  // Method 2: Using Next.js headers() function
  const headersList = await headers()
  const auth = headersList.get('Authorization')

  if (!auth || !auth.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = auth.split(' ')[1]
  // Verify token...

  return NextResponse.json({ message: 'Access granted' })
}
```

### Setting response headers

```ts
export async function GET() {
  const data = { message: 'Hello' }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      'X-Custom-Header': 'my-value',
      'Access-Control-Allow-Origin': '*',  // CORS
    }
  })
}
```

### Common headers you'll work with

| Header | Purpose |
|---|---|
| `Authorization` | Auth tokens (`Bearer <token>`) |
| `Content-Type` | Type of data being sent |
| `Cookie` | Session/cookie data |
| `X-Forwarded-For` | Real IP address (behind proxy) |
| `User-Agent` | Browser/client info |

---

## 43. Cookies in Route Handlers

### Reading and setting cookies

Cookies are small pieces of data stored in the browser and sent with every request. They're commonly used for sessions and authentication.

```ts
// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Reading cookies
export async function GET(request: NextRequest) {
  // Method 1: From request object
  const token = request.cookies.get('session')?.value

  // Method 2: Using Next.js cookies() function
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  const theme = cookieStore.get('theme')?.value || 'light'

  if (!session) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
  }

  return NextResponse.json({ theme, hasSession: true })
}

// Setting cookies
export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  const user = await validateUser(username, password)

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true, user })

  // Set a cookie on the response
  response.cookies.set({
    name: 'session',
    value: user.sessionToken,
    httpOnly: true,           // Can't be accessed by JavaScript (safer)
    secure: true,             // Only sent over HTTPS
    sameSite: 'strict',       // CSRF protection
    maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
    path: '/',
  })

  return response
}

// Deleting cookies (logout)
export async function DELETE() {
  const response = NextResponse.json({ message: 'Logged out' })
  response.cookies.delete('session')
  return response
}
```

---

## 44. Redirects in Route Handlers

### Redirecting from Route Handlers

Sometimes you want an API endpoint to redirect the user to another URL — useful for OAuth flows, short links, or post-action redirects.

```ts
// app/api/redirect/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const shortCode = searchParams.get('code')

  if (!shortCode) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  // Look up where this short code points to
  const url = await lookupShortUrl(shortCode)

  if (!url) {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 })
  }

  // Redirect to the real URL
  return NextResponse.redirect(url)
}
```

### Redirect types

```ts
// Temporary redirect (307) — method preserved, use for most cases
return NextResponse.redirect(new URL('/new-path', request.url))

// Permanent redirect (308) — tells browsers/search engines URL has moved forever
return NextResponse.redirect(new URL('/new-path', request.url), { status: 308 })

// Redirect with old 301/302 status codes
return NextResponse.redirect(new URL('/new-path', request.url), { status: 301 })
```

### OAuth example

```ts
// app/api/auth/github/route.ts
export async function GET() {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email`

  return NextResponse.redirect(githubAuthUrl)
}
```

---

## 45. Caching in Route Handlers

### How Route Handlers handle caching

By default in Next.js:
- **GET handlers** — are NOT cached (they're dynamic by default in Next.js 15)
- **POST, PATCH, DELETE** — never cached

### Opting into caching for GET requests

```ts
// app/api/products/route.ts
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'  // Cache this route

export async function GET() {
  const products = await fetchProducts()
  return NextResponse.json(products)
}
```

### Revalidating cached data

```ts
// Revalidate every 60 seconds (like ISR for pages)
export const revalidate = 60

export async function GET() {
  const data = await fetchData()
  return NextResponse.json(data)
}
```

### Manual cache control with headers

```ts
export async function GET() {
  const data = await fetchData()

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      // Cache for 5 minutes, serve stale for 10 minutes while revalidating
    }
  })
}
```

### When NOT to cache

If your endpoint returns user-specific data (user profile, order history), **don't cache** it. Use dynamic behavior:

```ts
export const dynamic = 'force-dynamic'  // Never cache

export async function GET(request: NextRequest) {
  const user = await getCurrentUser()
  return NextResponse.json(user.profile)
}
```

---

## 46. Middleware

### What is Middleware?

Middleware is code that runs **before any request** is processed. It sits between the incoming request and your pages/API routes. You can use it to:

- Redirect users (e.g., if not logged in)
- Rewrite URLs
- Set headers
- Handle authentication
- A/B testing

### Creating Middleware

Create a file called `middleware.ts` at the **root** of your project (not inside `app/`):

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Example: redirect /old-blog to /blog
  if (pathname.startsWith('/old-blog')) {
    return NextResponse.redirect(new URL('/blog', request.url))
  }

  // Example: Add a custom header to all responses
  const response = NextResponse.next()
  response.headers.set('X-Custom-Header', 'Hello from middleware')
  return response
}
```

### Configuring which routes use middleware

Use the `config` export with a `matcher` pattern:

```ts
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for auth token
  const token = request.cookies.get('session')?.value

  if (!token) {
    // Redirect to login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Only run on these routes:
export const config = {
  matcher: [
    '/dashboard/:path*',   // All dashboard routes
    '/profile/:path*',     // All profile routes
    '/admin/:path*',       // All admin routes
  ]
}
```

### Common middleware patterns

```ts
// 1. Redirect based on condition
if (pathname === '/') {
  return NextResponse.redirect(new URL('/home', request.url))
}

// 2. Rewrite URL (user sees /blog, but actually gets /v2/blog)
if (pathname.startsWith('/blog')) {
  return NextResponse.rewrite(new URL('/v2/blog', request.url))
}

// 3. Add headers
const res = NextResponse.next()
res.headers.set('X-Frame-Options', 'DENY')
return res

// 4. Read cookies and pass info via headers
const res = NextResponse.next()
const userId = getUserIdFromToken(request.cookies.get('token')?.value)
res.headers.set('X-User-Id', userId)
return res
```

> **Important:** Middleware runs on the **Edge Runtime** by default — it's fast and lightweight, but can't use Node.js APIs directly.

---

## 47. Rendering

### What does "rendering" mean?

Rendering is the process of turning your React components (JavaScript + JSX) into actual HTML that the browser can display. **Where and when** this rendering happens is the core concept behind Next.js's performance features.

### The three places rendering can happen

1. **Client** (browser) — JavaScript runs in the user's browser to generate HTML
2. **Server** — HTML is generated on the server before being sent to the browser
3. **Build time** — HTML is generated once when you deploy, then served as static files

### Why does it matter?

| Rendering type | HTML available immediately? | SEO | Interactivity | Good for |
|---|---|---|---|---|
| Client-side (CSR) | No (empty initially) | Poor | Yes | User dashboards, private pages |
| Server-side (SSR) | Yes | Excellent | Yes | Dynamic public pages |
| Static (SSG) | Yes | Excellent | Yes | Blogs, docs, marketing |

### Next.js's approach

Next.js is unique because it lets you **mix all three** — some pages can be static, some server-rendered, and some client-side, all in the same app. You don't have to pick just one.

---

## 48. Client-side Rendering (CSR)

### What is CSR?

Client-side rendering means the browser downloads an empty HTML page + JavaScript, then the JavaScript runs and builds the page content. The user sees a blank screen (or loading spinner) until JavaScript executes.

### When does CSR happen in Next.js?

When you mark a component with `'use client'` and it fetches data with `useEffect`, it's doing client-side rendering for that data fetch.

```tsx
// app/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard-data')
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>

  return <div>{/* render data */}</div>
}
```

### Advantages of CSR

- Interactive immediately (no full-page reloads)
- Great for user-specific, frequently changing data
- Reduces server load

### Disadvantages of CSR

- Poor SEO (search engines may not see your content)
- Slower perceived initial load (blank screen first)
- Requires JavaScript to be enabled

### When to use CSR in Next.js

- Private, authenticated pages (don't need SEO)
- Highly interactive UIs (real-time updates, live searches)
- User-specific data that changes constantly

> **In Next.js App Router:** Most pages should be Server Components. Use Client Components (`'use client'`) only when you need interactivity or browser APIs.

---

## 49. Server-side Rendering (SSR)

### What is SSR?

Server-side rendering means the server generates the full HTML for a page **on each request** and sends it to the browser. The browser gets a fully rendered page immediately, then React "hydrates" it (attaches event listeners to make it interactive).

### SSR in Next.js App Router

In the App Router, **Server Components are the default** — they render on the server. But traditional SSR (rendering on every request) happens when you make your page **dynamic**.

```tsx
// app/news/page.tsx
// This is a Server Component by default — no 'use client'

export default async function NewsPage() {
  // This runs on the server on every request
  const news = await fetch('https://api.news.com/latest', {
    cache: 'no-store'  // Don't cache — always fresh (SSR behavior)
  }).then(res => res.json())

  return (
    <div>
      <h1>Latest News</h1>
      {news.articles.map((article: any) => (
        <article key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </article>
      ))}
    </div>
  )
}
```

`cache: 'no-store'` tells Next.js to fetch fresh data on every request — this is SSR behavior.

### Advantages of SSR

- Full HTML sent to browser — great SEO
- Always fresh data
- Works without JavaScript (progressive enhancement)

### Disadvantages of SSR

- Slower than static (server work on every request)
- Higher server costs under load
- Slower Time To First Byte (TTFB) vs static

### When to use SSR

- News, stock prices, live scores — data that changes by the second
- E-commerce product pages with live inventory
- Personalized content based on cookies/session (without full client-side fetch)

---

## 50. Suspense SSR

### The problem with traditional SSR

Old-style SSR has a sequential bottleneck:
1. Server fetches ALL data
2. Server renders ALL HTML
3. Sends everything to browser
4. Browser downloads ALL JavaScript
5. React hydrates EVERYTHING

If one slow data fetch blocks the others, the whole page is delayed.

### Suspense SSR to the rescue

React's `<Suspense>` lets you render HTML in **chunks**. Fast parts are sent immediately; slow parts send a fallback (loading spinner) and stream in when ready.

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import QuickStats from './QuickStats'
import SlowAnalytics from './SlowAnalytics'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* This renders immediately (fast data) */}
      <Suspense fallback={<p>Loading stats...</p>}>
        <QuickStats />
      </Suspense>

      {/* This streams in when ready (slow data) */}
      <Suspense fallback={<p>Loading analytics...</p>}>
        <SlowAnalytics />
      </Suspense>
    </div>
  )
}

// QuickStats fetches fast data
async function QuickStats() {
  const stats = await fetchQuickStats() // Fast query
  return <div>Users: {stats.users}</div>
}

// SlowAnalytics fetches slow data (heavy computation)
async function SlowAnalytics() {
  const analytics = await fetchAnalytics() // Slow query (2-3 seconds)
  return <div>Revenue: ${analytics.revenue}</div>
}
```

**Result:** User sees the page structure and quick stats immediately. The slow analytics section shows a spinner and then pops in when ready. No waiting for all data before showing anything!

---

## 51. React Server Components

### What are React Server Components (RSC)?

React Server Components are components that **run only on the server** and never send JavaScript to the browser. They were created by the React team and are deeply integrated into Next.js App Router.

### What makes them special?

```tsx
// This is a Server Component (no 'use client' = server by default)
import { db } from '@/lib/database'
import { readFile } from 'fs/promises'  // Node.js API — works here!
import 'server-only'  // Ensures this only runs on server

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Direct database access — no API needed!
  const post = await db.post.findUnique({ where: { slug } })

  // Reading files — only possible on server
  const template = await readFile('./templates/blog.html', 'utf-8')

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
```

### What RSCs can do that client components cannot

- Direct database queries
- Access file system
- Use environment variables (secret keys)
- Import large server-side libraries (no bundle size impact)
- Access backend services directly

### What RSCs cannot do

- Use `useState`, `useEffect`, or any React hooks
- Use browser APIs (`window`, `document`, `localStorage`)
- Attach event listeners (`onClick`, `onChange`)
- Be used in useEffect or similar

### Zero JavaScript bundle impact

A Server Component's code **never appears in the browser's JavaScript bundle**. A 100KB markdown parsing library used in an RSC costs the user nothing in download size.

---

## 52. Server and Client Components

### The fundamental distinction

| Feature | Server Component | Client Component |
|---|---|---|
| Default in App Router | ✅ Yes | ❌ No (need `'use client'`) |
| Runs on | Server only | Server (initial) + Client |
| `useState` / `useEffect` | ❌ No | ✅ Yes |
| Database access | ✅ Yes | ❌ No |
| Browser APIs | ❌ No | ✅ Yes |
| Event handlers (`onClick`) | ❌ No | ✅ Yes |
| In JS bundle | ❌ No | ✅ Yes |

### When to use each

**Use Server Components for:**
- Fetching data
- Accessing databases or file systems
- Using secret API keys
- Large dependencies (markdown parsers, chart libs)

**Use Client Components for:**
- Click, hover, form interactions
- `useState`, `useReducer`, `useEffect`
- Browser APIs (`localStorage`, `geolocation`)
- Third-party libraries that need browser environment

### Example side by side

```tsx
// Server Component — app/blog/page.tsx
import PostCard from './PostCard'

export default async function BlogPage() {
  const posts = await db.post.findMany()  // Direct DB access

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Client Component — app/blog/LikeButton.tsx
'use client'

import { useState } from 'react'

export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  
  return (
    <button onClick={() => setLikes(l => l + 1)}>
      ❤️ {likes}
    </button>
  )
}
```

---

## 53. Rendering Lifecycle in RSCs

### How RSCs render — step by step

Understanding the lifecycle helps you debug and optimize:

**1. On the server:**
- Next.js identifies which components are Server Components (no `'use client'`)
- Server Components are executed: data fetched, HTML generated
- The output is a special format called **RSC Payload** (not raw HTML)
- Client Component code is noted but not executed yet

**2. Sending to the browser:**
- Next.js generates the initial HTML (for fast first paint)
- The RSC Payload is also streamed to the browser
- Client Component JavaScript bundles are included

**3. In the browser:**
- HTML is displayed immediately (fast!)
- React receives the RSC Payload
- Client Components are **hydrated** (JavaScript attaches, making them interactive)
- Page is now fully interactive

### The tree structure

```
App (Server)
├── Layout (Server)
│   ├── Nav (Server — no interactivity needed)
│   └── {children}
│       └── Dashboard (Server)
│           ├── StatsCard (Server — pure display)
│           ├── LikeButton (Client — needs onClick)
│           └── Chart (Client — needs browser APIs)
```

### Re-rendering

- **Server Components** only re-render when you call `router.refresh()` or navigate to the route again
- **Client Components** re-render on state changes, like normal React

### The RSC Payload

Think of the RSC Payload as a JSON-like description of your UI tree. When you navigate between pages, Next.js fetches just the RSC Payload (not full HTML), which is much faster than a full page reload.

---

## 54. Static Rendering

### What is Static Rendering?

Static rendering means Next.js generates the HTML at **build time** (when you run `npm run build`). The generated HTML files are then served instantly to every user — no server computation needed per request.

This is the **fastest possible** rendering — serving a pre-built HTML file from a CDN.

### Static rendering is the default

In Next.js App Router, if your page doesn't use any dynamic data (no cookies, no request headers, no real-time database queries), it's automatically statically rendered at build time.

```tsx
// app/about/page.tsx — This will be statically rendered
export default function About() {
  return (
    <div>
      <h1>About Our Company</h1>
      <p>We were founded in 2020...</p>
    </div>
  )
}
```

### Static with data fetching (SSG equivalent)

```tsx
// app/blog/page.tsx — Statically rendered with data
export default async function BlogPage() {
  // This fetch happens at BUILD TIME, not on each request
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

### Incremental Static Regeneration (ISR)

Regenerate static pages in the background after a set time:

```tsx
// app/products/page.tsx
export const revalidate = 3600  // Regenerate every 1 hour

export default async function ProductsPage() {
  const products = await fetch('https://api.example.com/products').then(r => r.json())
  return <div>{/* products list */}</div>
}
```

### When is static rendering ideal?

- Marketing pages (About, Pricing, Features)
- Blogs, documentation
- Product listings (with ISR for updates)
- Any page where content doesn't change per user or per second

---

## 55. Dynamic Rendering

### What is Dynamic Rendering?

Dynamic rendering means the page is generated on the server **for each incoming request**. This is necessary when the page content depends on:
- Request-specific data (cookies, headers)
- Real-time data (current stock prices, live scores)
- User-specific data (profile, private dashboard)

### How Next.js decides

Next.js automatically switches to dynamic rendering when it detects:

```tsx
// Using cookies() → triggers dynamic rendering
import { cookies } from 'next/headers'
const session = await cookies()

// Using headers() → triggers dynamic rendering
import { headers } from 'next/headers'
const headersList = await headers()

// Using fetch with cache: 'no-store' → triggers dynamic rendering
const data = await fetch(url, { cache: 'no-store' })

// Using searchParams in a page → triggers dynamic rendering
export default async function Page({ searchParams }) {
  const { q } = await searchParams  // Makes page dynamic
}
```

### Forcing dynamic rendering

```tsx
// Force a page to always be dynamic (rendered per request)
export const dynamic = 'force-dynamic'

export default async function Page() {
  const data = await fetch('https://api.example.com/data')
  // ...
}
```

### Forcing static rendering (ignore dynamic signals)

```tsx
// Force static even if it would normally be dynamic
export const dynamic = 'force-static'
```

### The `dynamic` export options

| Value | Behavior |
|---|---|
| `'auto'` (default) | Next.js decides based on usage |
| `'force-dynamic'` | Always dynamic (per-request) |
| `'force-static'` | Always static (ignores cookies, headers, etc.) |
| `'error'` | Throw error if dynamic functions are used |

---

## 56. generateStaticParams

### What is `generateStaticParams`?

When you have dynamic routes like `/blog/[slug]`, Next.js doesn't know at build time which slugs exist. `generateStaticParams` tells Next.js which dynamic values to pre-render at build time.

Think of it like telling Next.js: "Here's the list of all blog posts — please generate static HTML for each one."

### Basic usage

```tsx
// app/blog/[slug]/page.tsx

// Tell Next.js which slugs exist
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json())

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}

// Page component (same file)
type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await fetch(`https://api.example.com/posts/${slug}`).then(r => r.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  )
}
```

### How it works

1. At build time, `generateStaticParams` runs and returns `[{ slug: 'hello-world' }, { slug: 'nextjs-tips' }]`
2. Next.js pre-renders `/blog/hello-world` and `/blog/nextjs-tips` as static HTML
3. These pages are served instantly from a CDN

### With multiple dynamic segments

```tsx
// app/store/[categoryId]/[productId]/page.tsx

export async function generateStaticParams() {
  const categories = await fetchCategories()
  const params = []

  for (const category of categories) {
    const products = await fetchProducts(category.id)
    for (const product of products) {
      params.push({
        categoryId: category.id,
        productId: product.id,
      })
    }
  }

  return params
}
```

---

## 57. dynamicParams

### What happens when a URL isn't pre-generated?

If you use `generateStaticParams` to pre-generate `/blog/hello-world` and `/blog/nextjs-tips`, what happens when someone visits `/blog/new-post` that wasn't in the list?

By default, Next.js will **generate it on demand** (dynamic rendering for that request), then cache it for future visitors.

### Controlling this with `dynamicParams`

```tsx
// app/blog/[slug]/page.tsx

// Default behavior: true — unknown slugs are rendered on demand
export const dynamicParams = true

// OR: false — unknown slugs return 404
export const dynamicParams = false

export async function generateStaticParams() {
  // Only these slugs will work
  return [
    { slug: 'hello-world' },
    { slug: 'nextjs-tips' },
  ]
}
```

### When to use `dynamicParams = false`?

- When you want strict control over which URLs exist
- E-commerce with a fixed product catalog — no product outside the catalog should exist
- Prevents malicious scanning for non-existent routes

### When to use `dynamicParams = true`? (default)

- Blogs where new posts can be added without rebuilding
- Large catalogs where pre-generating everything is too slow
- Any site where content grows dynamically

---

## 58. Streaming

### What is Streaming?

Streaming means sending the HTML response to the browser **in chunks** instead of waiting for everything to be ready before sending anything.

**Without streaming:** Wait for all data → Send all HTML → User sees page
**With streaming:** Send what's ready now → Stream in the rest as it becomes available

This dramatically improves the perceived performance — users see something useful faster.

### How to use Streaming in Next.js

Use React's `<Suspense>` to wrap components that take time to load:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import UserProfile from './UserProfile'
import RecentOrders from './RecentOrders'
import Recommendations from './Recommendations'

export default function Dashboard() {
  return (
    <div>
      {/* Fast — user info is fetched quickly */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile />
      </Suspense>

      {/* Medium — some database work */}
      <Suspense fallback={<div>Loading orders...</div>}>
        <RecentOrders />
      </Suspense>

      {/* Slow — ML-based recommendations */}
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <Recommendations />
      </Suspense>
    </div>
  )
}
```

### What the user experience looks like

1. Instant: Page structure + "Loading..." spinners for all sections
2. 100ms later: UserProfile appears (fast query)
3. 500ms later: RecentOrders appears
4. 2000ms later: Recommendations appears

No blank screens. Progressive rendering.

### Combining with `loading.tsx`

`loading.tsx` is essentially a `<Suspense>` wrapper around your entire page:

```
page renders → immediately shows loading.tsx → page data loads → shows real content
```

For more granular control, use `<Suspense>` inside your page component as shown above.

---

## 59. Server and Client Composition Patterns

### How to structure components correctly

The key rule: **Server Components can import and render Client Components, but Client Components cannot import and render Server Components.**

### Pattern 1: Server Component wraps Client Component

```tsx
// app/page.tsx (Server Component)
import InteractiveCounter from './InteractiveCounter'  // Client Component
import { fetchData } from '@/lib/data'

export default async function Page() {
  const data = await fetchData()  // Server-side data fetch

  return (
    <div>
      <h1>Welcome</h1>
      <p>Items: {data.count}</p>
      <InteractiveCounter initialCount={data.count} />  {/* Pass data as props */}
    </div>
  )
}
```

### Pattern 2: Passing Server Components as children to Client Components

```tsx
// ServerComponent.tsx (Server)
export default async function ServerComponent() {
  const data = await fetchData()
  return <div>Server data: {data.value}</div>
}

// ClientWrapper.tsx (Client)
'use client'
import { useState } from 'react'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children}  {/* Server Component rendered as children! */}
    </div>
  )
}

// app/page.tsx (Server)
import ClientWrapper from './ClientWrapper'
import ServerComponent from './ServerComponent'

export default function Page() {
  return (
    <ClientWrapper>
      <ServerComponent />  {/* This works! Server component as child of client */}
    </ClientWrapper>
  )
}
```

### Pattern 3: Avoid moving Server Components into Client boundaries

```tsx
// ❌ WRONG — This makes ServerComponent run on the client
'use client'
import ServerComponent from './ServerComponent'

export default function ClientComponent() {
  return <ServerComponent />  // ServerComponent becomes a client component!
}

// ✅ CORRECT — Pass it as a prop/children instead (see Pattern 2)
```

---

## 60. Server-only Code

### The problem

You might have utility functions that access secrets, databases, or sensitive data. If these accidentally end up in client components, they could expose sensitive information.

### Using the `server-only` package

```bash
npm install server-only
```

```ts
// lib/secretUtils.ts
import 'server-only'  // Throws a build error if this is imported in a client component

export async function getSecretData() {
  const secret = process.env.SECRET_API_KEY  // Never expose this to the client
  return await fetchWithSecret(secret)
}
```

If someone tries to import this in a `'use client'` component, they get a **build-time error** instead of a silent security hole.

### Environment variables as guards

Variables without `NEXT_PUBLIC_` prefix are automatically server-only:

```ts
// .env.local
DATABASE_URL=postgresql://...          // Server only
SECRET_KEY=super-secret-123           // Server only
NEXT_PUBLIC_API_URL=https://api.com   // Available in browser
```

Accessing `process.env.DATABASE_URL` in a client component returns `undefined` — it's never sent to the browser.

### When to use `server-only`

- Database utility functions
- Auth token verification
- Secret API clients (payment processors, internal APIs)
- Functions that read from the file system

---

## 61. Third Party Packages

### The challenge with third-party packages

Many npm packages were written before React Server Components existed. They might use `useState`, `useEffect`, or browser APIs internally — which means they **can't work in Server Components**.

### The problem

```tsx
// app/page.tsx (Server Component by default)
import { SomeChart } from 'some-chart-library'  // Uses useEffect internally

export default function Page() {
  return <SomeChart data={data} />  // Error! Server Component can't use hooks
}
```

### Solution 1: Wrap in a Client Component

```tsx
// app/_components/ChartWrapper.tsx
'use client'

import { SomeChart } from 'some-chart-library'

export default function ChartWrapper({ data }: { data: any[] }) {
  return <SomeChart data={data} />
}

// app/page.tsx (Server Component)
import ChartWrapper from './_components/ChartWrapper'

export default async function Page() {
  const data = await fetchData()
  return <ChartWrapper data={data} />
}
```

### Solution 2: Check if the library supports RSC

Some libraries now export server-safe versions. Check their docs for:
- `'use client'` directives in their source
- RSC compatibility notes
- Server-compatible alternatives

### Libraries that work fine in Server Components

- Data fetching utilities (axios, ky — for server fetches)
- Pure utility libraries (date-fns, lodash, zod)
- Database ORMs (Prisma, Drizzle)

### Libraries that need `'use client'`

- UI component libraries (unless they've added RSC support)
- Animation libraries (Framer Motion — though it has some server support)
- Chart libraries (recharts, chart.js)
- Maps (Leaflet, Google Maps React)

---

## 62. Context Providers

### The problem with Context in Next.js

React Context (`createContext`, `useContext`) is a Client-side feature. You can't create or provide context in a Server Component.

But you often want to wrap your entire app in a context provider (theme, auth, cart, etc.).

### Solution: Wrap the provider in a Client Component

```tsx
// app/_components/ThemeProvider.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type Theme = 'light' | 'dark'
const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

```tsx
// app/layout.tsx (Server Component)
import { ThemeProvider } from './_components/ThemeProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Provider is a Client Component but can wrap Server Components */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// Any Client Component deep in the tree
'use client'
import { useTheme } from '../_components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return <button onClick={toggle}>Current: {theme}</button>
}
```

> **Key insight:** You pass `{children}` to the provider. Those children can be Server Components! The provider wraps them without converting them to Client Components.

---

## 63. Client-only Code

### Some code should only run in the browser

Just as `server-only` prevents server code from leaking to the client, `client-only` prevents browser-specific code from accidentally running on the server (which would cause crashes).

### Using the `client-only` package

```bash
npm install client-only
```

```ts
// lib/analytics.ts
import 'client-only'  // Error if imported in a Server Component

export function trackEvent(name: string) {
  window.analytics.track(name)  // Uses browser's window object
}

export function getStoredPreferences() {
  return JSON.parse(localStorage.getItem('preferences') || '{}')
}
```

### Common client-only APIs

These only exist in the browser — using them in Server Components causes errors:

```ts
// These are browser-only:
window.location.href
document.getElementById('...')
localStorage.getItem('...')
sessionStorage
navigator.geolocation
navigator.userAgent
```

### Using `typeof window !== 'undefined'` as an alternative

If you can't mark a whole file as client-only but need to use browser APIs conditionally:

```ts
export function getWindowWidth() {
  if (typeof window === 'undefined') {
    return 0  // Return default for server
  }
  return window.innerWidth
}
```

---

## 64. Client Component Placement

### The "push to the leaves" principle

One of the most important performance patterns in Next.js: **keep Client Components as small and as deep in the component tree as possible.**

### Why this matters

Every `'use client'` declaration creates a "client boundary" — everything below it in the tree becomes a client component. The more server components you have, the less JavaScript you send to the browser.

### Bad pattern — client component too high up

```tsx
// app/page.tsx
'use client'  // ❌ Makes the WHOLE page a client component!

import { useState } from 'react'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <header>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
        {/* This entire header — including all its children — is now client-side */}
      </header>
      <main>
        {/* All this content is unnecessary JS bundle weight */}
        <article>Long article content...</article>
      </main>
    </div>
  )
}
```

### Good pattern — extract interactive part

```tsx
// app/_components/MenuButton.tsx
'use client'  // ✅ Only the button is a client component

import { useState } from 'react'

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close' : 'Open'} Menu
    </button>
  )
}

// app/page.tsx — Server Component!
import MenuButton from './_components/MenuButton'

export default async function Page() {
  const article = await fetchArticle()  // Server-side!

  return (
    <div>
      <header>
        <MenuButton />  {/* Only this is client-side */}
      </header>
      <main>
        <article>{article.content}</article>  {/* Static, no JS needed */}
      </main>
    </div>
  )
}
```

**Result:** 90% of the page is static HTML, 10% (just the button) needs JavaScript.

---

## 65. Interleaving Server and Client Components

### The rules of mixing Server and Client Components

Understanding these rules prevents confusing bugs:

**Rule 1:** Server Components can render Client Components ✅
```tsx
// Server Component
import ClientButton from './ClientButton'
export default function Page() {
  return <ClientButton />  // ✅ Works
}
```

**Rule 2:** Client Components cannot directly import Server Components ❌
```tsx
'use client'
import ServerData from './ServerData'  // ❌ ServerData becomes client-side!
export default function ClientComp() {
  return <ServerData />
}
```

**Rule 3:** You CAN pass Server Components to Client Components via props/children ✅
```tsx
// app/page.tsx (Server)
import Modal from './Modal'  // Client
import ServerContent from './ServerContent'  // Server

export default function Page() {
  return (
    <Modal>
      <ServerContent />  {/* ✅ Passed as children — stays server! */}
    </Modal>
  )
}
```

### Practical example — modal with server content

```tsx
// components/Modal.tsx (Client)
'use client'

import { useState } from 'react'

export default function Modal({ trigger, children }: {
  trigger: React.ReactNode
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}  {/* Server Component content renders here! */}
          </div>
        </div>
      )}
    </>
  )
}

// app/products/[id]/page.tsx (Server)
import Modal from '@/components/Modal'
import ProductDetails from './ProductDetails'  // Server Component

export default async function ProductPage({ params }: Props) {
  const { id } = await params

  return (
    <Modal trigger={<button>View Details</button>}>
      <ProductDetails id={id} />  {/* Server Component — fetches from DB */}
    </Modal>
  )
}
```

---

## 66. Data Fetching

### The two main approaches

Next.js App Router gives you two very different ways to fetch data, each suited to different situations:

1. **Server Components** — Fetch directly on the server (recommended for most data)
2. **Client Components** — Fetch in the browser after the page loads

### The golden rule

> Fetch data as close to where you use it as possible, and prefer the server when possible.

### Why prefer server-side fetching?

- No API round trips (code runs where the data lives)
- No loading spinners for initial data
- Secrets stay on the server
- Better SEO
- Faster for users

### Next.js extended `fetch`

Next.js extends the native `fetch` API with extra options for caching and revalidation:

```ts
// No cache (always fresh — SSR behavior)
const data = await fetch(url, { cache: 'no-store' })

// Cache indefinitely (static — SSG behavior)
const data = await fetch(url, { cache: 'force-cache' })

// Cache for N seconds then revalidate (ISR behavior)
const data = await fetch(url, { next: { revalidate: 60 } })
```

### Request deduplication

If multiple Server Components on the same page fetch the same URL, Next.js automatically deduplicates — the network request only happens once:

```tsx
// Both of these components request the same URL
// Next.js only makes ONE network request
async function UserAvatar() {
  const user = await fetch('/api/user')  // Request 1
  return <img src={user.avatar} />
}

async function UserName() {
  const user = await fetch('/api/user')  // Deduplicated! Uses cached result
  return <span>{user.name}</span>
}
```

---

## 67. Fetching Data in Client Components

### When to fetch on the client

Fetch on the client when:
- Data changes frequently and needs to stay fresh without full page reloads
- Data is user-triggered (search results as user types)
- Data is truly private/personalized and SEO doesn't matter

### Using `useEffect` + `fetch`

The basic pattern:

```tsx
'use client'

import { useState, useEffect } from 'react'

type User = { id: number; name: string; email: string }

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const res = await fetch(`/api/users/${userId}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

### Using SWR (recommended for client-side fetching)

SWR is a library by Vercel that handles loading states, caching, and revalidation automatically:

```bash
npm install swr
```

```tsx
'use client'

import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function UserProfile({ userId }: { userId: string }) {
  const { data: user, error, isLoading } = useSWR(`/api/users/${userId}`, fetcher)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading user</p>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

SWR also handles: automatic refetching on window focus, deduplication, optimistic updates, and more.

---

## 68. Fetching Data with Server Components

### The recommended way — async Server Components

```tsx
// app/products/page.tsx — Server Component (default)

type Product = {
  id: number
  name: string
  price: number
  category: string
}

export default async function ProductsPage() {
  // This runs on the SERVER — no API route needed!
  const products: Product[] = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }  // Revalidate every hour
  }).then(res => res.json())

  return (
    <div>
      <h1>Products ({products.length})</h1>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Direct database access (no fetch needed!)

```tsx
// app/blog/page.tsx
import { db } from '@/lib/db'  // Your database client (Prisma, Drizzle, etc.)

export default async function BlogPage() {
  // Direct database query — no API route needed!
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: { id: true, title: true, slug: true, createdAt: true }
  })

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <time>{post.createdAt.toDateString()}</time>
        </article>
      ))}
    </div>
  )
}
```

### Fetching in nested Server Components

Data can be fetched at any level of the component tree:

```tsx
// app/dashboard/page.tsx
import { UserCard } from './UserCard'
import { RecentActivity } from './RecentActivity'

export default async function Dashboard() {
  return (
    <div>
      <UserCard />        {/* Fetches its own user data */}
      <RecentActivity />  {/* Fetches its own activity data */}
    </div>
  )
}

// Each component fetches exactly what it needs
async function UserCard() {
  const user = await db.user.findFirst()
  return <div>{user?.name}</div>
}

async function RecentActivity() {
  const activities = await db.activity.findMany({ take: 5 })
  return <ul>{activities.map(a => <li key={a.id}>{a.description}</li>)}</ul>
}
```

---

## 69. Loading and Error States

### Handling loading and errors in Server Components

With `loading.tsx` and `error.tsx`, you get automatic loading and error states per route segment.

But for more granular control inside a page, use `<Suspense>` and error boundaries within the component:

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <Suspense fallback={<StatsLoading />}>
        <Stats />
      </Suspense>

      <ErrorBoundary fallback={<div>Failed to load chart</div>}>
        <Suspense fallback={<ChartLoading />}>
          <Charts />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function StatsLoading() {
  return (
    <div>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          width: '200px', height: '100px',
          background: '#eee', borderRadius: '8px',
          display: 'inline-block', margin: '8px',
          animation: 'pulse 1.5s infinite'
        }} />
      ))}
    </div>
  )
}
```

### Skeleton components

Good practice: create dedicated skeleton components that match the shape of the real content:

```tsx
// app/blog/loading.tsx
export default function BlogLoading() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ marginBottom: '24px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
          {/* Skeleton title */}
          <div style={{ width: '70%', height: '24px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '12px' }} />
          {/* Skeleton text lines */}
          <div style={{ width: '100%', height: '14px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ width: '85%', height: '14px', background: '#e5e7eb', borderRadius: '4px' }} />
        </div>
      ))}
    </div>
  )
}
```

---

## 70. Sequential Data Fetching

### What is sequential fetching?

Sequential fetching means one fetch waits for another to finish before starting — they run one after the other.

```tsx
// ❌ Sequential (each waits for the previous)
export default async function Page({ params }: Props) {
  const { id } = await params

  const user = await fetchUser(id)              // Wait for user...
  const posts = await fetchUserPosts(user.id)   // THEN fetch posts
  const comments = await fetchComments(posts[0].id)  // THEN fetch comments

  // Total time = user time + posts time + comments time
}
```

### When is sequential OK?

When the second request **depends on** the result of the first:

```tsx
export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  // Must get the post first to know the author ID
  const post = await db.post.findUnique({ where: { slug } })
  if (!post) return notFound()

  // This NEEDS post.authorId, so it must be sequential
  const author = await db.user.findUnique({ where: { id: post.authorId } })

  return (
    <article>
      <h1>{post.title}</h1>
      <p>By {author?.name}</p>
    </article>
  )
}
```

### Avoiding unnecessary sequential fetching

If requests are **independent**, run them in parallel (see next topic). Sequential fetching for independent data is a common performance mistake:

```tsx
// ❌ Unnecessarily sequential
const user = await fetchUser()       // 200ms
const products = await fetchProducts() // 300ms
// Total: 500ms

// ✅ Parallel
const [user, products] = await Promise.all([
  fetchUser(),       // \
  fetchProducts(),   //  > Run together: 300ms total
])
```

---

## 71. Parallel Data Fetching

### Running fetches simultaneously

When data requests are independent of each other, run them in parallel using `Promise.all`:

```tsx
// app/dashboard/page.tsx
export default async function Dashboard() {
  // ✅ All three fetch simultaneously — total time = slowest of the three
  const [user, orders, notifications] = await Promise.all([
    fetchUser(),          // 200ms
    fetchOrders(),        // 400ms
    fetchNotifications(), // 100ms
    // Total: 400ms (not 700ms!)
  ])

  return (
    <div>
      <UserCard user={user} />
      <OrdersList orders={orders} />
      <NotificationBell count={notifications.unread} />
    </div>
  )
}
```

### Starting fetches early with initiation pattern

Kick off the fetches before you need the results:

```tsx
export default async function ProductPage({ params }: Props) {
  const { id } = await params

  // Start BOTH fetches immediately (don't await yet)
  const productPromise = fetchProduct(id)
  const reviewsPromise = fetchReviews(id)

  // Now await both — they've been running in parallel since we called them
  const [product, reviews] = await Promise.all([productPromise, reviewsPromise])

  return (
    <div>
      <h1>{product.name}</h1>
      <ReviewsList reviews={reviews} />
    </div>
  )
}
```

### Using Suspense for parallel streaming

For even better UX, let components fetch their own data in parallel with Suspense:

```tsx
// Each component fetches independently, in parallel
export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<p>Loading user...</p>}>
        <UserSection />      {/* Fetches user data */}
      </Suspense>
      <Suspense fallback={<p>Loading orders...</p>}>
        <OrdersSection />    {/* Fetches orders data — runs in parallel! */}
      </Suspense>
    </div>
  )
}
```

---

## 72. Fetching From a Database

### Direct database access in Server Components

One of the biggest wins of Next.js Server Components: **you can query your database directly** — no API route needed.

### Setting up Prisma (popular ORM)

```bash
npm install prisma @prisma/client
npx prisma init
```

```ts
// lib/db.ts — Database client singleton
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
```

### Using Prisma in Server Components

```tsx
// app/users/page.tsx
import { db } from '@/lib/db'

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { posts: true } } }
  })

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Email</th><th>Posts</th></tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user._count.posts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### With Drizzle ORM (alternative)

```ts
// lib/db.ts with Drizzle
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle(client, { schema })

// In your page:
const users = await db.select().from(schema.users)
```

---

## 73. Data Mutations

### What are data mutations?

Data mutations are operations that **change data** — creating, updating, or deleting records. In a web app, these are triggered by user actions: submitting a form, clicking a button, etc.

### The old way (API routes)

```
User submits form → Client sends POST to /api/posts → Server creates post → Client shows result
```

### The new way (Server Actions)

```
User submits form → Server Action runs directly → Post created → Page updates
```

No separate API route needed!

### Three approaches to mutations in Next.js

**1. Server Actions (recommended)** — Form submission and button clicks that run server code
**2. Route Handlers** — Traditional REST API for external clients
**3. Client-side state** — For purely local UI state (no persistence)

### When to use each

| Approach | Use when |
|---|---|
| Server Actions | Form submissions, button actions in your own app |
| Route Handlers | Building a public API, mobile app backend |
| Client state | UI-only state (accordion open/closed, modal visibility) |

---

## 74. Forms with Server Actions

### What are Server Actions?

Server Actions are functions that run on the server, triggered directly from the browser — no API endpoint needed. They're the cleanest way to handle form submissions in Next.js.

### Basic example

```tsx
// app/contact/page.tsx

// Server Action — runs on the server when form is submitted
async function submitContact(formData: FormData) {
  'use server'  // This marks it as a server action

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Validate
  if (!name || !email || !message) {
    throw new Error('All fields are required')
  }

  // Save to database
  await db.contactSubmission.create({
    data: { name, email, message }
  })

  // Send email notification
  await sendEmail({ to: 'admin@example.com', name, email, message })
}

// Page component
export default function ContactPage() {
  return (
    <form action={submitContact}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required />
      <button type="submit">Send Message</button>
    </form>
  )
}
```

### How it works

1. User fills out form and clicks "Send Message"
2. Browser sends form data to Next.js
3. Next.js runs `submitContact` on the server
4. Server saves to DB, sends email
5. Page updates (can use `revalidatePath` to refresh data)

### Revalidating data after mutation

```tsx
import { revalidatePath } from 'next/cache'

async function createPost(formData: FormData) {
  'use server'

  await db.post.create({
    data: { title: formData.get('title') as string }
  })

  revalidatePath('/blog')  // Refresh the blog page's data
}
```

### Redirecting after mutation

```tsx
import { redirect } from 'next/navigation'

async function createPost(formData: FormData) {
  'use server'

  const post = await db.post.create({
    data: { title: formData.get('title') as string }
  })

  redirect(`/blog/${post.slug}`)  // Go to the new post
}
```

---

## 75. useFormStatus Hook

### What is `useFormStatus`?

`useFormStatus` is a React hook that tells you the current status of a parent `<form>`. Use it to show loading states while a form is submitting.

### Basic usage

```tsx
'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  )
}

// Use in a form with a Server Action
export default function ContactForm() {
  async function submitForm(formData: FormData) {
    'use server'
    await saveContact(formData)
  }

  return (
    <form action={submitForm}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      {/* SubmitButton must be INSIDE the form to access its status */}
      <SubmitButton />
    </form>
  )
}
```

### The `useFormStatus` properties

```ts
const { pending, data, method, action } = useFormStatus()
// pending  — Boolean: true while form is submitting
// data     — FormData being submitted
// method   — 'get' or 'post'
// action   — The action function/URL
```

### Important rule

`useFormStatus` must be used in a **child** of the form — not in the same component as the form:

```tsx
// ❌ WRONG — same component as the form
function Form() {
  const { pending } = useFormStatus()  // Always returns { pending: false }
  return <form>...</form>
}

// ✅ CORRECT — child of the form
function SubmitButton() {
  const { pending } = useFormStatus()  // Works correctly!
  return <button disabled={pending}>Submit</button>
}
```

---

## 76. useActionState Hook

### What is `useActionState`?

`useActionState` (formerly `useFormState`) lets you manage the state returned from a Server Action — like error messages, success messages, or any return value.

### Basic usage

```tsx
'use client'

import { useActionState } from 'react'

// Server Action that returns state
async function createUser(prevState: any, formData: FormData) {
  'use server'

  const name = formData.get('name') as string
  const email = formData.get('email') as string

  if (!name || !email) {
    return { error: 'Name and email are required' }
  }

  try {
    await db.user.create({ data: { name, email } })
    return { success: true, message: 'User created successfully!' }
  } catch (error) {
    return { error: 'Email already exists' }
  }
}

// Client Component using the action
export default function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, null)

  return (
    <form action={formAction}>
      {state?.error && (
        <p style={{ color: 'red' }}>{state.error}</p>
      )}
      {state?.success && (
        <p style={{ color: 'green' }}>{state.message}</p>
      )}

      <input name="name" placeholder="Name" />
      <input name="email" type="email" placeholder="Email" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

### How `useActionState` works

```ts
const [state, formAction, isPending] = useActionState(actionFn, initialState)
// state      — The current state (returned by actionFn or initialState)
// formAction — Pass this to <form action={formAction}>
// isPending  — Boolean: true while action is running
```

The Server Action receives `prevState` as its first argument and `formData` as its second.

---

## 77. Separating Server Actions

### Why put Server Actions in separate files?

For large applications, mixing Server Actions inline in components gets messy. Separating them:
- Makes them reusable across multiple components
- Easier to test
- Cleaner code organization

### Creating a dedicated actions file

```ts
// app/actions/posts.ts
'use server'  // At the file level — all functions here are Server Actions

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title.trim()) {
    throw new Error('Title is required')
  }

  const post = await db.post.create({
    data: { title, content }
  })

  revalidatePath('/blog')
  redirect(`/blog/${post.slug}`)
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get('title') as string

  await db.post.update({
    where: { id },
    data: { title, updatedAt: new Date() }
  })

  revalidatePath('/blog')
  revalidatePath(`/blog/${id}`)
}

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } })
  revalidatePath('/blog')
  redirect('/blog')
}
```

### Importing and using the actions

```tsx
// app/blog/new/page.tsx
import { createPost } from '@/app/actions/posts'

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Publish Post</button>
    </form>
  )
}

// app/blog/[id]/edit/page.tsx
import { updatePost } from '@/app/actions/posts'

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const updatePostWithId = updatePost.bind(null, id)  // Pre-fill the ID

  return (
    <form action={updatePostWithId}>
      <input name="title" placeholder="Post title" />
      <button type="submit">Update Post</button>
    </form>
  )
}
```

---

## 78. useFormStatus vs useActionState

### What's the difference?

These two hooks solve different problems:

| Hook | Problem it solves | What it provides |
|---|---|---|
| `useFormStatus` | "Is the form currently submitting?" | `pending`, `data`, `method`, `action` |
| `useActionState` | "What did the server action return?" | `state`, `formAction`, `isPending` |

### `useFormStatus`

- Lives in a child component of `<form>`
- Knows about ANY form submission (not tied to a specific action)
- Good for: styling the submit button, showing spinners

```tsx
'use client'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? '...' : 'Submit'}</button>
}
```

### `useActionState`

- Lives in the component that creates the form
- Knows what the Server Action returned
- Good for: showing validation errors, success messages

```tsx
'use client'
import { useActionState } from 'react'

function MyForm() {
  const [state, action, pending] = useActionState(myServerAction, null)
  return (
    <form action={action}>
      {state?.error && <p>{state.error}</p>}
      <input name="field" />
      <button type="submit" disabled={pending}>Submit</button>
    </form>
  )
}
```

### Use them together for best UX

```tsx
'use client'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      {pending ? <span>Saving...</span> : 'Save'}
    </button>
  )
}

export default function Form() {
  const [state, action] = useActionState(saveData, null)
  return (
    <form action={action}>
      {state?.error && <p className="error">{state.error}</p>}
      <input name="data" />
      <SubmitButton />   {/* Uses useFormStatus for the button state */}
    </form>
  )
}
```

---

## 79. Update Server Action

### Updating existing records

```ts
// app/actions/users.ts
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateUser(userId: string, formData: FormData) {
  const name = formData.get('name') as string
  const bio = formData.get('bio') as string

  // Validate
  if (!name.trim()) {
    return { error: 'Name cannot be empty' }
  }

  try {
    const updated = await db.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        bio: bio?.trim() || null,
        updatedAt: new Date(),
      }
    })

    // Refresh the page that shows this user
    revalidatePath(`/users/${userId}`)

    return { success: true, user: updated }
  } catch (error) {
    return { error: 'Failed to update profile' }
  }
}
```

### Using it in an edit form

```tsx
// app/users/[id]/edit/page.tsx
'use client'

import { useActionState } from 'react'
import { updateUser } from '@/app/actions/users'

export default function EditUserForm({ userId, currentUser }: {
  userId: string
  currentUser: { name: string; bio: string }
}) {
  const updateUserWithId = updateUser.bind(null, userId)
  const [state, action, pending] = useActionState(updateUserWithId, null)

  return (
    <form action={action}>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state?.success && <p style={{ color: 'green' }}>Profile updated!</p>}

      <div>
        <label>Name</label>
        <input name="name" defaultValue={currentUser.name} required />
      </div>

      <div>
        <label>Bio</label>
        <textarea name="bio" defaultValue={currentUser.bio} />
      </div>

      <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
```

---

## 80. Delete Server Action

### Deleting records safely

```ts
// app/actions/posts.ts
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

export async function deletePost(postId: string) {
  // Security check — make sure the user owns this post
  const user = await getCurrentUser()

  const post = await db.post.findUnique({ where: { id: postId } })

  if (!post) {
    throw new Error('Post not found')
  }

  if (post.authorId !== user.id) {
    throw new Error('You can only delete your own posts')
  }

  await db.post.delete({ where: { id: postId } })

  revalidatePath('/blog')
  redirect('/blog')
}
```

### Delete button with confirmation

```tsx
// components/DeleteButton.tsx
'use client'

import { deletePost } from '@/app/actions/posts'
import { useTransition } from 'react'

export default function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this post?')) return

    startTransition(async () => {
      await deletePost(postId)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      style={{ color: 'red' }}
    >
      {isPending ? 'Deleting...' : 'Delete Post'}
    </button>
  )
}
```

### Using form + Server Action for delete (no JS required)

```tsx
// Works even without JavaScript!
import { deletePost } from '@/app/actions/posts'

export default function DeleteForm({ postId }: { postId: string }) {
  const deleteWithId = deletePost.bind(null, postId)

  return (
    <form action={deleteWithId}>
      <button type="submit" style={{ color: 'red' }}>
        Delete Post
      </button>
    </form>
  )
}
```

---

## 81. Optimistic Updates with useOptimistic Hook

### What are optimistic updates?

An optimistic update means you **immediately show the expected result** in the UI before the server confirms it. If the server fails, you roll back to the previous state.

This makes apps feel much faster — clicking "Like" immediately shows +1 instead of waiting for the server.

### Using `useOptimistic`

```tsx
'use client'

import { useOptimistic, useTransition } from 'react'
import { toggleLike } from '@/app/actions/likes'

type Props = {
  postId: string
  initialLikes: number
  initiallyLiked: boolean
}

export default function LikeButton({ postId, initialLikes, initiallyLiked }: Props) {
  const [isPending, startTransition] = useTransition()
  
  const [optimisticState, setOptimisticLike] = useOptimistic(
    { likes: initialLikes, liked: initiallyLiked },
    (currentState, newLiked: boolean) => ({
      liked: newLiked,
      likes: newLiked ? currentState.likes + 1 : currentState.likes - 1
    })
  )

  function handleLike() {
    const newLiked = !optimisticState.liked

    startTransition(async () => {
      setOptimisticLike(newLiked)  // Update UI immediately
      await toggleLike(postId, newLiked)  // Then update server
    })
  }

  return (
    <button onClick={handleLike} disabled={isPending}>
      {optimisticState.liked ? '❤️' : '🤍'} {optimisticState.likes}
    </button>
  )
}
```

### Optimistic update for a list

```tsx
'use client'

import { useOptimistic } from 'react'
import { addTodo } from '@/app/actions/todos'

type Todo = { id: string; text: string; sending?: boolean }

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo]
  )

  async function handleSubmit(formData: FormData) {
    const text = formData.get('text') as string
    const optimisticTodo = { id: Date.now().toString(), text, sending: true }

    addOptimisticTodo(optimisticTodo)  // Show immediately
    await addTodo(text)                // Save to server
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="text" placeholder="New todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
            {todo.text}
            {todo.sending && ' (saving...)'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## 82. Form Component

### Next.js's enhanced `<Form>` component

Next.js 15 introduced a built-in `<Form>` component that extends the HTML `<form>` with additional features:

- **Prefetching** — Prefetches the loading UI for the target page
- **Client-side navigation** — Uses client-side navigation on submission (GET forms)
- **Progressive enhancement** — Works without JavaScript

### Basic usage

```tsx
import Form from 'next/form'

export default function SearchPage() {
  return (
    <Form action="/search">
      <input name="q" placeholder="Search..." />
      <button type="submit">Search</button>
    </Form>
  )
}
```

When submitted, navigates to `/search?q=<user input>` using client-side navigation.

### GET form (navigation/search)

```tsx
// app/page.tsx
import Form from 'next/form'

export default function HomePage() {
  return (
    <div>
      <h1>Search Products</h1>
      <Form action="/products">
        <input name="q" placeholder="Search products..." />
        <select name="category">
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        <button type="submit">Search</button>
      </Form>
    </div>
  )
}

// app/products/page.tsx
type Props = {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { q, category } = await searchParams
  const products = await searchProducts({ query: q, category })

  return (
    <div>
      <p>Results for: {q}</p>
      {/* render products */}
    </div>
  )
}
```

### POST form (mutations) — same as regular form with Server Action

```tsx
import Form from 'next/form'
import { createPost } from '@/app/actions/posts'

export default function NewPostForm() {
  return (
    <Form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Publish</button>
    </Form>
  )
}
```

---

## 83. Authentication

### What is authentication?

Authentication is the process of verifying **who a user is**. It answers the question: "Are you who you say you are?"

- **Authentication** → Login (proving identity)
- **Authorization** → Permissions (what you're allowed to do)

### Authentication options in Next.js

| Option | Best for |
|---|---|
| **Clerk** | Quick setup, full-featured, great DX |
| **NextAuth.js / Auth.js** | Open source, flexible, many providers |
| **Lucia** | Lightweight, self-hosted |
| **Custom JWT** | Full control, more work |

### General authentication flow

1. User enters credentials (email + password, or clicks "Login with Google")
2. Server verifies credentials
3. Server creates a **session** (stored in DB) or **JWT** (self-contained token)
4. Session/token stored in a **cookie**
5. Every subsequent request sends the cookie
6. Server reads cookie → knows who the user is

### What we'll cover

The next several topics cover **Clerk** — the most beginner-friendly authentication solution for Next.js with a great free tier.

---

## 84. Clerk Setup

### What is Clerk?

Clerk is a complete authentication platform — it handles user registration, login, sessions, social logins, MFA, and more. You get beautiful pre-built UI components and a simple API.

### Installation

```bash
npm install @clerk/nextjs
```

### Get your API keys

1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. Copy your API keys

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx

# Optional: redirect URLs after sign in/out
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Wrap your app with ClerkProvider

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Create sign-in and sign-up pages

```
app/
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx
└── sign-up/
    └── [[...sign-up]]/
        └── page.tsx
```

```tsx
// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <SignIn />
    </div>
  )
}

// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <SignUp />
    </div>
  )
}
```

---

## 85. Sign in and Sign out

### Adding sign-in/out buttons

Clerk provides pre-built buttons:

```tsx
// app/_components/Navbar.tsx
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav>
      <a href="/">My App</a>

      {/* Show when user is NOT signed in */}
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      </SignedOut>

      {/* Show when user IS signed in */}
      <SignedIn>
        <UserButton afterSignOutUrl="/" />  {/* Avatar + dropdown with sign out */}
      </SignedIn>
    </nav>
  )
}
```

### Individual sign in/out buttons

```tsx
// Custom sign in button
<SignInButton>
  <button className="btn-primary">Login</button>
</SignInButton>

// Custom sign out button
<SignOutButton>
  <button className="btn-secondary">Logout</button>
</SignOutButton>
```

### Redirecting after sign in/out

In your `.env.local`:

```env
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/
```

Or programmatically:

```tsx
<SignInButton afterSignInUrl="/dashboard">
  <button>Sign In</button>
</SignInButton>

<SignOutButton redirectUrl="/">
  <button>Sign Out</button>
</SignOutButton>
```

---

## 86. Profile Settings

### The UserProfile component

Clerk provides a full profile management page:

```tsx
// app/profile/[[...profile]]/page.tsx
import { UserProfile } from '@clerk/nextjs'

export default function ProfilePage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <UserProfile />
    </div>
  )
}
```

This gives users a UI to:
- Update name, profile picture
- Manage email addresses
- Change password
- Connect social accounts
- Manage active sessions

### Accessing user data

```tsx
// Server Component
import { currentUser } from '@clerk/nextjs/server'

export default async function Dashboard() {
  const user = await currentUser()

  if (!user) return <p>Not logged in</p>

  return (
    <div>
      <img src={user.imageUrl} alt="Profile" width={64} height={64} />
      <h1>Welcome, {user.firstName}!</h1>
      <p>Email: {user.emailAddresses[0].emailAddress}</p>
    </div>
  )
}
```

```tsx
// Client Component
'use client'
import { useUser } from '@clerk/nextjs'

export default function ProfileCard() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return <p>Loading...</p>
  if (!user) return <p>Not logged in</p>

  return (
    <div>
      <h2>{user.fullName}</h2>
      <p>{user.primaryEmailAddress?.emailAddress}</p>
    </div>
  )
}
```

---

## 87. Conditional UI Rendering

### Showing different UI based on auth state

Clerk provides `<SignedIn>` and `<SignedOut>` components:

```tsx
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/pricing">Pricing</a>

      <SignedIn>
        {/* Only visible when logged in */}
        <a href="/dashboard">Dashboard</a>
        <a href="/my-posts">My Posts</a>
        <UserButton />
      </SignedIn>

      <SignedOut>
        {/* Only visible when logged out */}
        <SignInButton><button>Login</button></SignInButton>
      </SignedOut>
    </nav>
  )
}
```

### Conditional in Server Components

```tsx
import { auth } from '@clerk/nextjs/server'

export default async function HomePage() {
  const { userId } = await auth()

  return (
    <div>
      <h1>Welcome</h1>
      {userId ? (
        <a href="/dashboard">Go to Dashboard</a>
      ) : (
        <a href="/sign-in">Sign in to get started</a>
      )}
    </div>
  )
}
```

### Show premium features only to paid users

```tsx
import { currentUser } from '@clerk/nextjs/server'

export default async function FeaturesPage() {
  const user = await currentUser()
  const isPaid = user?.publicMetadata?.plan === 'pro'

  return (
    <div>
      <h1>Features</h1>
      
      <div>
        <h2>Free Features</h2>
        {/* Always visible */}
      </div>

      {isPaid ? (
        <div>
          <h2>Pro Features</h2>
          {/* Only for paid users */}
        </div>
      ) : (
        <div>
          <p>Upgrade to Pro to unlock these features</p>
          <a href="/pricing">Upgrade</a>
        </div>
      )}
    </div>
  )
}
```

---

## 88. Protecting Routes

### Middleware-based protection (recommended)

The best way to protect multiple routes at once is with Middleware:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define which routes are protected
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/settings(.*)',
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()  // Redirects to sign-in if not authenticated
  }
})

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'],
}
```

### Page-level protection

```tsx
// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return <h1>Dashboard</h1>
}
```

### Or use `auth().protect()`

```tsx
import { auth } from '@clerk/nextjs/server'

export default async function ProtectedPage() {
  await auth().protect()  // Automatically redirects if not signed in
  
  return <h1>You are authenticated!</h1>
}
```

---

## 89. Read Session and User Data

### In Server Components

```tsx
// Using auth() — lightweight, just userId and sessionId
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  const { userId, sessionId, orgId } = await auth()

  if (!userId) return <p>Not authenticated</p>

  return <p>User ID: {userId}</p>
}

// Using currentUser() — full user object
import { currentUser } from '@clerk/nextjs/server'

export default async function ProfilePage() {
  const user = await currentUser()

  return (
    <div>
      <p>Name: {user?.fullName}</p>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
      <p>Created: {user?.createdAt}</p>
    </div>
  )
}
```

### In Client Components

```tsx
'use client'

import { useAuth, useUser } from '@clerk/nextjs'

export default function ClientProfile() {
  // useAuth — gives auth state
  const { isLoaded, isSignedIn, userId } = useAuth()

  // useUser — gives full user object
  const { user, isLoaded: userLoaded } = useUser()

  if (!isLoaded || !userLoaded) return <p>Loading...</p>
  if (!isSignedIn) return <p>Please sign in</p>

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Name: {user?.fullName}</p>
      <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
    </div>
  )
}
```

### In Route Handlers

```ts
// app/api/me/route.ts
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await currentUser()

  return NextResponse.json({
    id: user?.id,
    name: user?.fullName,
    email: user?.emailAddresses[0]?.emailAddress,
  })
}
```

---

## 90. Role Based Access Control

### What is RBAC?

Role-Based Access Control means users have roles (admin, editor, viewer) and can only do what their role permits.

### Setting up roles with Clerk

Store roles in user's `publicMetadata` (set from Clerk dashboard or via API):

```ts
// Set a user's role (from admin dashboard or Server Action with Clerk SDK)
await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: { role: 'admin' }
})
```

### Checking roles in middleware

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()

  // Protect general routes
  if (isProtectedRoute(req) && !userId) {
    await auth.protect()
  }

  // Protect admin routes — check role
  if (isAdminRoute(req)) {
    if (!userId || sessionClaims?.metadata?.role !== 'admin') {
      return Response.redirect(new URL('/unauthorized', req.url))
    }
  }
})
```

### Checking roles in Server Components

```tsx
import { auth, currentUser } from '@clerk/nextjs/server'

export default async function AdminPage() {
  const user = await currentUser()
  const role = user?.publicMetadata?.role as string

  if (role !== 'admin') {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need admin privileges to view this page.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, Admin {user?.firstName}!</p>
    </div>
  )
}
```

### Role-based UI

```tsx
// Show different UI based on role
const user = await currentUser()
const role = user?.publicMetadata?.role as string

return (
  <div>
    <h1>Dashboard</h1>
    
    {role === 'admin' && (
      <div>
        <a href="/admin/users">Manage Users</a>
        <a href="/admin/settings">System Settings</a>
      </div>
    )}
    
    {(role === 'admin' || role === 'editor') && (
      <div>
        <a href="/posts/new">Create Post</a>
        <a href="/posts/manage">Manage Posts</a>
      </div>
    )}
    
    {/* Available to all signed-in users */}
    <a href="/profile">My Profile</a>
  </div>
)
```

---

## 91. Customizing Clerk Components

### Appearance prop

Clerk's pre-built components (`<SignIn>`, `<SignUp>`, `<UserProfile>`) accept an `appearance` prop for customization:

```tsx
import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <SignIn
      appearance={{
        // Overall theme variables
        variables: {
          colorPrimary: '#0070f3',
          colorBackground: '#ffffff',
          colorText: '#1a1a1a',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '8px',
        },
        // Target specific elements
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm',
          card: 'shadow-lg',
          headerTitle: 'text-2xl font-bold',
          formFieldInput: 'border-gray-300 rounded-md',
        }
      }}
    />
  )
}
```

### Setting appearance globally in ClerkProvider

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

const clerkAppearance = {
  variables: {
    colorPrimary: '#7c3aed',  // Purple brand color
  },
  elements: {
    formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Custom sign-in/sign-up pages using Clerk hooks

For maximum control, build completely custom auth forms:

```tsx
'use client'

import { useSignIn } from '@clerk/nextjs'
import { useState } from 'react'

export default function CustomSignIn() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        window.location.href = '/dashboard'
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Sign in failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign In</button>
    </form>
  )
}
```

---

## 92. Deploying Next.js Apps

### Deploying to Vercel (easiest)

Vercel is made by the same team as Next.js — it's the simplest deployment option:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Add your environment variables (same as `.env.local`)
5. Click "Deploy"

That's literally it. Vercel auto-detects Next.js and configures everything.

### Environment variables on Vercel

In your Vercel dashboard → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_xxxxx
CLERK_SECRET_KEY = sk_live_xxxxx
DATABASE_URL = postgresql://...
```

### Building for production locally

```bash
npm run build    # Creates optimized production build
npm run start    # Starts production server
```

Check the build output — Next.js tells you which pages are static (○), dynamic (λ), or SSR.

### Deploying to other platforms

**Netlify:**
```bash
npm install -D @netlify/plugin-nextjs
```
Push to GitHub → Connect to Netlify → Auto-deploys.

**Railway / Render (Node.js servers):**
```bash
# Dockerfile example
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Self-hosted VPS (DigitalOcean, AWS EC2, etc.):**

```bash
# On your server
git clone your-repo
npm install
npm run build
npm run start

# With PM2 for process management
npm install -g pm2
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```

### Using a custom server? Use standalone output

```ts
// next.config.ts
const nextConfig = {
  output: 'standalone'  // Minimizes production bundle
}
```

### Static export (for static hosting like GitHub Pages)

If your app is entirely static:

```ts
// next.config.ts
const nextConfig = {
  output: 'export'  // Generates static HTML/CSS/JS
}
```

```bash
npm run build  # Outputs to /out folder
```

Upload the `/out` folder to any static host.

### Environment checklist before deploying

- [ ] All environment variables are set in production
- [ ] Database is production-ready (not localhost)
- [ ] API keys are production keys (not test keys)
- [ ] `NEXT_PUBLIC_*` variables for client-side code are set
- [ ] No hardcoded localhost URLs
- [ ] Error monitoring set up (Sentry, etc.)
- [ ] Analytics configured

### Preview deployments

Vercel automatically creates a preview URL for every pull request — great for testing before merging.

---

## Quick Reference Cheat Sheet

### File Naming

| File | Purpose |
|---|---|
| `page.tsx` | Route page |
| `layout.tsx` | Shared layout |
| `loading.tsx` | Loading state |
| `error.tsx` | Error state |
| `not-found.tsx` | 404 page |
| `route.ts` | API endpoint |
| `template.tsx` | Re-mounting layout |
| `default.tsx` | Parallel route fallback |
| `middleware.ts` | Request interception |
| `global-error.tsx` | Root layout error |

### Folder Conventions

| Pattern | Meaning |
|---|---|
| `folder/` | Route segment |
| `[param]/` | Dynamic segment |
| `[...slug]/` | Catch-all segment |
| `[[...slug]]/` | Optional catch-all |
| `(group)/` | Route group (no URL impact) |
| `_folder/` | Private folder (not a route) |
| `@slot/` | Parallel route slot |
| `(.)folder/` | Intercepting route (same level) |
| `(..)folder/` | Intercepting route (one level up) |

### Key Imports

```ts
// Navigation
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { redirect, notFound } from 'next/navigation'

// Server utilities
import { cookies, headers } from 'next/headers'

// Route handlers
import { NextRequest, NextResponse } from 'next/server'

// Cache control
import { revalidatePath, revalidateTag } from 'next/cache'

// Metadata
import type { Metadata } from 'next'

// React
import { Suspense } from 'react'
import { useFormStatus } from 'react-dom'
import { useActionState, useOptimistic, useTransition } from 'react'
```

---

*This guide covers Next.js 14/15 with the App Router. For the latest updates, always refer to the [official Next.js documentation](https://nextjs.org/docs).*