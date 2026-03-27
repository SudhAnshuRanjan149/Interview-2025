# React Interview Questions - Advanced Level Part 1 (Q61-Q80 Detailed Answers)

## 61. What is reconciliation in React?

**Answer:**

**Reconciliation** is the process React uses to determine what changed and update the page. It's React's algorithm for comparing old and new component trees.

### Simple Analogy:

Imagine you have a **to-do list on paper**. When you make changes, instead of rewriting the entire list, you just note the differences (add, remove, update items). Reconciliation is React's way of doing this.

### How Reconciliation Works:

```
Old Component Tree:
├── App
│   ├── Header (id: 1)
│   └── List (id: 2)

New Component Tree:
├── App
│   ├── Header (id: 1) ← Same
│   ├── List (id: 2) ← Same
│   └── Footer (new)

React says: "Header and List are same, just add Footer"
Only Footer gets added to page!
```

### Real Example:

```javascript
function TodoList() {
  const [items, setItems] = React.useState(['A', 'B', 'C']);
  
  const addItem = () => {
    // Before: ['A', 'B', 'C']
    // After: ['A', 'B', 'C', 'D']
    setItems([...items, 'D']);
    
    // React reconciles (compares):
    // - 'A' is still there ✓
    // - 'B' is still there ✓
    // - 'C' is still there ✓
    // - New 'D' added → Update page
  };
  
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

### Why Reconciliation?

✅ Makes React fast - only updates what changed  
✅ Don't need to manually update DOM  
✅ Keeps page responsive  

---

## 62. What is the virtual DOM?

**Answer:**

The **Virtual DOM** is a lightweight JavaScript copy of the real DOM that React keeps in memory.

### Real DOM vs Virtual DOM:

| Aspect | Real DOM | Virtual DOM |
|--------|----------|-------------|
| **What** | Actual page elements | JavaScript object |
| **Speed** | Slow to update | Fast (just JS) |
| **Where** | Browser | React memory |
| **Direct access** | Browser manipulates | React manages |

### How Virtual DOM Works:

```
Step 1: Component renders → Virtual DOM created
Step 2: State changes → New Virtual DOM created
Step 3: React compares them (diffing)
Step 4: Only different parts update in Real DOM
Step 5: Page updates

Result: Only necessary changes made to real page!
```

### Real Example:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// First render:
// Virtual DOM:
// <div>
//   <p>Count: 0</p>
//   <button>+</button>
// </div>

// User clicks button (count = 1):
// New Virtual DOM:
// <div>
//   <p>Count: 1</p>
//   <button>+</button>
// </div>

// React compares: Only <p> changed!
// Real DOM updates: Only <p> text changes to "Count: 1"
```

### Why Virtual DOM?

✅ **Fast** - updating JavaScript object is much faster than updating real DOM  
✅ **Efficient** - batch updates together  
✅ **Abstraction** - developers don't worry about DOM manipulation  

### Real vs Virtual DOM Performance:

```javascript
// WITHOUT Virtual DOM (traditional JS)
document.getElementById('counter').innerHTML = '0';
document.getElementById('counter').innerHTML = '1'; // Whole thing re-renders
document.getElementById('counter').innerHTML = '2'; // Whole thing re-renders
// This is slow!

// WITH Virtual DOM (React)
// React keeps track of changes in JS first
// Then makes one efficient update to real DOM
```

---

## 63. How does diffing algorithm work?

**Answer:**

**Diffing** is React's process of comparing two Virtual DOMs to find what changed.

### What is Diffing?

Diffing = Finding differences (Diff = Difference)

### Simple Example:

```
Old: <h1>Hello Alice</h1>
New: <h1>Hello Bob</h1>

Diffing compares: "Alice" → "Bob" changed!
Update only that part
```

### Diffing Rules:

### Rule 1: Different Element Types = Different Tree

```javascript
// ❌ These are different!
<div>Content</div>  // Old
<span>Content</span> // New

// React re-renders entire thing
```

### Rule 2: Same Element Type = Compare Props

```javascript
// ✅ These might be the same
<div className="old">  // Old
<div className="new">  // New

// React checks props and updates only className
```

### Rule 3: Keys Help Identify Elements

```javascript
// Without keys - React gets confused
<li>A</li>  // Index 0
<li>B</li>  // Index 1
<li>C</li>  // Index 2

// Add new item:
<li>X</li>  // Index 0 - wait, which is which?
<li>A</li>  // Index 1
<li>B</li>  // Index 2
<li>C</li>  // Index 3

// With keys - React knows
<li key="a">A</li>
<li key="b">B</li>
<li key="c">C</li>

// Add new:
<li key="x">X</li>  // Clearly new
<li key="a">A</li>  // Still same A
<li key="b">B</li>  // Still same B
```

### Complete Diffing Example:

```javascript
function UserCard({ user, showEmail }) {
  return (
    <div className={user.premium ? 'premium' : 'regular'}>
      <h2>{user.name}</h2>
      {showEmail && <p>{user.email}</p>}
    </div>
  );
}

// Render 1:
// user = { name: 'Alice', premium: false }
// showEmail = true
// Result:
// <div className="regular">
//   <h2>Alice</h2>
//   <p>alice@example.com</p>
// </div>

// Render 2 (user.premium changed to true):
// Old: className="regular"
// New: className="premium"
// Diffing finds: className changed!
// Update: <div className="premium">...</div>

// Render 3 (showEmail changed to false):
// Old: <p>alice@example.com</p> exists
// New: <p> doesn't exist
// Diffing finds: <p> removed!
// Update: Remove <p> from page
```

### Algorithm Efficiency:

React's diffing is **O(n) complexity** (compared to O(n³) for general tree comparison):

```
Normal tree comparison: Check every possible match
React diffing: 
  1. Different element types = new tree
  2. Keys help identify elements
  3. Props/children only checked for same elements
Result: Much faster!
```

---

## 64. What is fiber architecture?

**Answer:**

**Fiber** is React's internal structure that allows it to do work in small chunks and pause/resume rendering.

### What was the Problem?

Before Fiber, React would:
1. Start rendering a component tree
2. Cannot stop until done
3. If rendering takes long, page freezes

```
Rendering: [==============================] (stops everything!)
User clicks: ❌ Doesn't respond (React busy)
```

### What Fiber Solves:

Fiber lets React:
1. Break rendering into small pieces
2. Pause and resume work
3. Prioritize urgent updates

```
Rendering: [==] pause [==] pause [==] done
User clicks: ✅ Responds immediately!
```

### How Fiber Works:

```javascript
// React breaks rendering into chunks called "fibers"
// Each fiber represents one piece of work

Fiber 1: Render Header
  ↓ (pause if urgent work needed)
Fiber 2: Render List
  ↓ (pause if urgent work needed)
Fiber 3: Render Footer
  ↓ (all done!)
```

### Real Example:

```javascript
function HeavyComponent() {
  // Expensive calculation
  const result = Array(10000000).fill(0).map(x => x + 1);
  
  return <div>{result.length}</div>;
}

// Before Fiber: Page freezes during calculation
// With Fiber: React breaks it into chunks, page stays responsive
```

### Priority Levels (Fiber Enables This):

```
Urgent (User input): High priority
Normal (Page update): Medium priority
Background (Prefetch): Low priority

React schedules them:
[Urgent] → [Normal] → [Background]
```

### Key Points:

✅ Fiber is **internal implementation detail** (you don't use it directly)  
✅ Makes React responsive  
✅ Enables concurrent rendering  
✅ Introduced in React 16  

---

## 65. What are batched updates?

**Answer:**

**Batching** is when React groups multiple state updates together and renders once instead of multiple times.

### Problem - Without Batching:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState([]);
  
  const handleClick = () => {
    setCount(count + 1);    // Update 1 → Re-render
    setItems([...items, 'new']); // Update 2 → Re-render
  };
  
  // Without batching: 2 re-renders!
  // Page updates twice = Slower
}
```

### Solution - With Batching:

```javascript
// React 18+ batches these together
const handleClick = () => {
  setCount(count + 1);
  setItems([...items, 'new']);
};
// Result: 1 re-render (not 2!)
```

### Real Example:

```javascript
function Form() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState(0);
  
  const handleSubmit = () => {
    // All three updates batch together
    setName('Alice');
    setEmail('alice@example.com');
    setAge(25);
  };
  
  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
      {/* React renders once with all three updates */}
    </div>
  );
}
```

### When Batching Happens:

✅ React event handlers  
✅ setState calls  
✅ Promises (React 18+)  

❌ setTimeout (without React 18+)  
❌ setInterval  

### Automatic Batching Timeline:

```
React 16-17: Selective batching
React 18+: Automatic batching everywhere!

Before React 18:
setTimeout(() => {
  setCount(1);
  setItems([]);
}, 1000);
// Two renders!

After React 18:
setTimeout(() => {
  setCount(1);
  setItems([]);
}, 1000);
// One render! (automatically batched)
```

### Benefits:

✅ Fewer re-renders  
✅ Better performance  
✅ More predictable behavior  

---

## 66. What is strict mode?

**Answer:**

**Strict Mode** is a development tool that highlights potential problems in your React code. It doesn't affect production.

### Purpose:

- Find bugs during development
- Warn about unsafe methods
- Check for performance issues

### Enable Strict Mode:

```javascript
import React from 'react';

function App() {
  return (
    <React.StrictMode>
      <YourApp />
    </React.StrictMode>
  );
}
```

### What Strict Mode Checks:

### 1. Unsafe Lifecycle Methods

```javascript
// ❌ Unsafe
class MyComponent extends React.Component {
  componentWillMount() {
    // Strict mode warns about this
  }
}

// ✅ Use this instead
class MyComponent extends React.Component {
  componentDidMount() {
    // Safe
  }
}
```

### 2. Side Effects in Render

```javascript
// ❌ Strict mode warns
function Component() {
  // Don't do this in render!
  fetch('/api/data');
  
  return <div>Data</div>;
}

// ✅ Use useEffect
function Component() {
  React.useEffect(() => {
    fetch('/api/data');
  }, []);
  
  return <div>Data</div>;
}
```

### 3. Double Rendering

```javascript
// In development with Strict Mode, components render TWICE
// This helps find bugs related to state

function Counter() {
  const [count, setCount] = React.useState(0);
  
  // In Strict Mode:
  // First render: count = 0
  // Second render: count = 0 (again!)
  // This helps find bugs
  
  return <p>{count}</p>;
}
```

### Real Example:

```javascript
// Let's say you have a bug
let globalCounter = 0;

function Counter() {
  const [count, setCount] = React.useState(0);
  
  globalCounter++; // ❌ Mutating global state!
  
  // Without Strict Mode:
  // Render: globalCounter = 1
  
  // With Strict Mode:
  // Render 1: globalCounter = 1
  // Render 2: globalCounter = 2 (oops!)
  // Developers see the problem!
}
```

### Key Points:

✅ Only works in **development**  
✅ Doesn't affect production  
✅ Helps find bugs early  
✅ Double renders are intentional  
✅ Safe to use in all apps  

---

## 67. What is React Fiber? (Revisited)

**Answer:**

Fiber is the new reconciliation engine in React 16+. It's already covered in Q64, but here's the practical impact.

### Why Developers Should Care:

```javascript
// With Fiber, this doesn't freeze the page anymore
function ComplexCalculation() {
  // Even heavy calculations don't block interactions
  const data = expensiveCalculation();
  
  // Before Fiber: Page freezes
  // With Fiber: Page stays responsive
}
```

### Practical Impact:

### Before Fiber (React 15):

```
Rendering started
[===================================] (can't stop!)
Page frozen while rendering
User can't click anything
Rendering done
```

### After Fiber (React 16+):

```
Rendering started
[===] pause [===] pause [===] done
Page responsive, user can click anytime
React resumes when ready
```

### How This Helps:

```javascript
function App() {
  const [data, setData] = React.useState([]);
  
  // User types while page is rendering
  // Fiber prioritizes user input
  // Page stays responsive!
}
```

---

## 68. What is server-side rendering (SSR)?

**Answer:**

**Server-Side Rendering** means the server generates HTML and sends it to the browser (instead of sending empty HTML and letting JavaScript render).

### Without SSR (Client-Side):

```
Browser requests: GET /page
Server responds: Empty HTML + JavaScript
Browser downloads JS
Browser runs JS → Creates components → Renders page
User sees page

Problem: Takes time to see content!
```

### With SSR (Server-Side):

```
Browser requests: GET /page
Server runs React → Generates HTML with content
Server sends: Complete HTML with content
Browser displays immediately
Browser downloads JS → Attaches interactivity

Result: See content immediately!
```

### Real Example:

```javascript
// Server code (Node.js with Express)
import React from 'react';
import { renderToString } from 'react-dom/server';

app.get('/', (req, res) => {
  // Render on SERVER
  const html = renderToString(<App />);
  
  // Send complete HTML to browser
  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        ${html}
      </body>
    </html>
  `);
});
```

### Benefits of SSR:

✅ **Faster initial load** - See content immediately  
✅ **Better SEO** - Search engines see content  
✅ **Works without JavaScript** - Shows content anyway  

### Drawbacks of SSR:

❌ More complex setup  
❌ Server needs more power  
❌ Harder to debug  

### Comparison:

| Aspect | CSR | SSR |
|--------|-----|-----|
| **Initial load** | Slower | Faster |
| **SEO** | Hard | Easy |
| **Complexity** | Simple | Complex |
| **Server load** | Low | High |

---

## 69. What is static site generation (SSG)?

**Answer:**

**Static Site Generation** means the pages are built once at build time and served as static files.

### How SSG Works:

```
Build time:
1. Run React components
2. Generate HTML files
3. Save as static files

Runtime:
1. User requests page
2. Server sends pre-built HTML file
3. Page loads instantly!
```

### Real Example:

```javascript
// Blog site with SSG
// At build time:
// - Blog post 1 → post1.html
// - Blog post 2 → post2.html
// - Blog post 3 → post3.html

// When user visits:
// /blog/1 → Serves pre-built post1.html (instant!)
```

### SSG With Data:

```javascript
// pages/blog/[slug].js (Next.js example)
export async function getStaticProps({ params }) {
  // Runs at build time
  const post = await getPostData(params.slug);
  
  return {
    props: { post },
    revalidate: 3600 // Rebuild every hour
  };
}

export async function getStaticPaths() {
  // Get all blog post slugs
  const posts = await getAllPosts();
  
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export default function BlogPost({ post }) {
  return <article>{post.content}</article>;
}
```

### SSG vs SSR vs CSR:

| Aspect | CSR | SSR | SSG |
|--------|-----|-----|-----|
| **Build time** | No | No | Yes |
| **Runtime** | Browser | Server | Static |
| **Speed** | Medium | Medium | Fast |
| **Dynamic** | Yes | Yes | No |
| **Use** | Apps | Apps + SEO | Blogs, Docs |

### When to Use SSG:

✅ Blogs  
✅ Documentation  
✅ News sites  
✅ Portfolio  

❌ Real-time data  
❌ User-specific content  

---

## 70. What is client-side rendering (CSR)?

**Answer:**

**Client-Side Rendering** means the browser downloads JavaScript and renders the page in the browser (not on server).

### How CSR Works:

```
Browser requests: GET /page
Server sends: Empty HTML + JavaScript bundle
Browser downloads JavaScript
Browser runs JavaScript
React renders components
Page appears

Traditional web: CSR
Modern SPAs: Usually CSR
```

### Real Example:

```javascript
// Traditional React App (CSR)
// public/index.html
<html>
  <body>
    <div id="root"></div>
    <script src="app.js"></script>
  </body>
</html>

// src/index.js
ReactDOM.render(<App />, document.getElementById('root'));

// User visits: Shows empty page first
// JavaScript loads and runs
// Page renders
```

### Benefits of CSR:

✅ Simple setup  
✅ Rich interactivity  
✅ No server load  

### Drawbacks of CSR:

❌ Slower initial load (white screen)  
❌ Bad for SEO  
❌ Requires JavaScript  

### CSR Timeline:

```
Time 0: User visits
Time 1: HTML downloaded (empty)
Time 2: JavaScript downloaded (big file)
Time 3: JavaScript runs
Time 4: Page renders (user finally sees it!)

Total: Could be 5+ seconds
```

### SSR Timeline:

```
Time 0: User visits
Time 1: Complete HTML downloaded (ready to show!)
Time 2: JavaScript runs for interactivity

Total: 2-3 seconds
```

### Modern Trend:

Today, most apps use **hybrid approaches**:
- Initial page: SSR (fast load)
- Interactivity: CSR (rich features)
- Pre-built pages: SSG (super fast)

---

## 71. What is concurrent rendering?

**Answer:**

**Concurrent rendering** means React can work on multiple tasks at the same time by pausing and resuming work.

### Simple Analogy:

Think of it like **multitasking**:
- **Without**: You must finish task 1 completely before task 2
- **With concurrency**: You can pause task 1, do urgent task 2, then resume task 1

### How Concurrent Rendering Works:

```
Task 1: Render big list (low priority)
[===] pause → see user typed in input (high priority!)
[===] resume → go back to rendering list
```

### Real Example:

```javascript
function SearchUsers() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState([]);
  
  // User typing: High priority (must respond fast)
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Respond immediately
  };
  
  // Filtering large list: Low priority
  const filteredResults = React.useMemo(() => {
    return results.filter(r => r.includes(searchTerm));
  }, [searchTerm]);
  
  // With concurrent rendering:
  // - User typing update happens immediately
  // - Filtering happens in background
  // - No lag!
}
```

### Enabling Concurrent Features:

```javascript
import { startTransition } from 'react';

function SearchApp() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // High priority: Update input immediately
    setSearchTerm(value);
    
    // Low priority: Do expensive search
    startTransition(() => {
      // Do expensive search
      performSearch(value);
    });
  };
}
```

### Benefits:

✅ App stays responsive  
✅ User feels like it's instant  
✅ No "frozen screen" feeling  

---

## 72. What is time slicing?

**Answer:**

**Time slicing** is when React breaks rendering work into small chunks and spreads it over time so the browser can respond to user input.

### Problem Without Time Slicing:

```javascript
function App() {
  // Rendering 1000 list items
  const [items, setItems] = React.useState(
    Array(1000).fill(0).map((_, i) => i)
  );
  
  // Without time slicing:
  // [========== RENDERING EVERYTHING ===========] (page freezes!)
  // User can't click for 5 seconds!
}
```

### Solution With Time Slicing:

```javascript
// With time slicing (React 16+):
// [===] render items 1-10
// [  ] pause - let browser respond to user
// [===] render items 11-20
// [  ] pause - check for user input
// [===] render items 21-30
// ... and so on

// Result: Page stays responsive!
```

### Real Implementation:

```javascript
function HeavyList({ items }) {
  // Before time slicing: Page freezes
  // After time slicing: Renders in chunks
  
  return (
    <ul>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// With 1000 items:
// Without time slicing: Freezes for 5 seconds
// With time slicing: Smooth, responsive
```

### How Time Slicing Works:

```
Available browser time per frame: ~16ms (60fps)

React says:
- 13ms for rendering
- 3ms for user input

Timeline:
0ms: Start rendering chunk
13ms: Pause rendering
13ms: Handle user input (click, type, etc.)
16ms: Next frame starts
16ms: Continue rendering next chunk
```

---

## 73. What are priority levels in React?

**Answer:**

React has different **priority levels** for updates. High priority updates run first.

### Priority Levels:

### 1. Immediate (Urgent):

```javascript
// User input events
onClick={() => setCount(count + 1)}; // Run now!
```

### 2. Transition (Normal):

```javascript
import { startTransition } from 'react';

startTransition(() => {
  // Can wait if user is typing
  setFilter('active');
});
```

### 3. Deferred (Background):

```javascript
// Low priority, background updates
setPrefetchedData(data);
```

### Real Example:

```javascript
function SearchApp() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [results, setResults] = React.useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Priority 1: Update input (Immediate)
    // User must see their typing instantly!
    setSearchTerm(value);
    
    // Priority 2: Update search results (Transition)
    // Can wait a bit if user keeps typing
    startTransition(() => {
      const searchResults = performSearch(value);
      setResults(searchResults);
    });
  };
  
  return (
    <div>
      <input value={searchTerm} onChange={handleChange} />
      <ul>
        {results.map(result => <li key={result.id}>{result.name}</li>)}
      </ul>
    </div>
  );
}
```

### React Priority Ladder:

```
Immediate (User input)
    ↓ (Higher priority)
Transition (Normal updates)
    ↓ (Lower priority)
Deferred (Background work)
```

---

## 74. What is automatic batching?

**Answer:**

Automatic batching groups multiple state updates together in React 18+.

### Already Covered in Q65

This is essentially the same concept. React 18 makes batching the default everywhere:

```javascript
// React 18+ - automatic batching in ALL cases
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // Even in setTimeout, these batch together!
  setTimeout(() => {
    setCount(count + 1);
    setItems([...items, 'new']);
  }, 1000);
  
  // Result: One re-render (not two!)
}
```

### Before React 18:

```javascript
// Only batched in React event handlers
setTimeout(() => {
  setCount(count + 1); // Re-render
  setItems([]); // Re-render
}); // Two renders total
```

### After React 18:

```javascript
// Batched everywhere
setTimeout(() => {
  setCount(count + 1);
  setItems([]);
}); // One render total!
```

### Benefits:

✅ Better performance  
✅ Less re-renders  
✅ Simpler mental model  

---

## 75. What is incremental static regeneration (ISR)?

**Answer:**

**Incremental Static Regeneration** means you can update static pages without rebuilding the entire site.

### Problem Without ISR:

```
Static Site Generation (SSG):
- Build time: Generate all pages
- Site has 10,000 pages
- Rebuild takes 10 minutes
- User adds new post: Must wait 10 minutes for rebuild!
- Not practical for frequently updated content
```

### Solution - ISR:

```
Incremental Static Regeneration:
- Build time: Generate popular pages
- Other pages: Generate on first request
- Revalidate (rebuild) every X seconds
- New posts appear within X seconds (not 10 minutes!)
- Much faster updates!
```

### Real Example:

```javascript
// pages/blog/[slug].js (Next.js)
export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);
  
  return {
    props: { post },
    revalidate: 60 // Regenerate every 60 seconds
  };
}

// Timeline:
// Second 0: User visits /blog/my-post
// - Page cached from build
// Second 30: User visits again → Still cached
// Second 65: User visits again
//   - Old page served
//   - Background: React regenerates new page
// Second 66: Next visitor gets fresh page!
```

### Use Cases:

✅ Blogs (posts updated occasionally)  
✅ E-commerce (products change)  
✅ News sites (new articles added)  

---

## 76. What is hydration?

**Answer:**

**Hydration** is when the browser "waters" the server-rendered HTML with JavaScript to make it interactive.

### Analogy:

Think of a dry clay pot. Adding water ("hydration") makes it workable. Similarly:
- **Dry HTML**: Server-rendered, no interactivity
- **Hydrated**: Add JavaScript, becomes interactive

### How Hydration Works:

```
Step 1: Browser gets HTML from server (rendered)
Step 2: Browser downloads JavaScript
Step 3: React attaches event listeners
Step 4: Component becomes interactive (hydrated!)

Result: Page was instantly visible AND interactive
```

### Real Example:

```javascript
// Server sends this HTML:
// <div>
//   <button>Click me</button>
// </div>

// User sees button immediately (HTML rendered)
// But button doesn't work yet (no JavaScript)

// JavaScript loads and React hydrates:
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Count: {count}</p>
    </div>
  );
}

// Hydrate the app
ReactDOM.hydrate(<App />, document.getElementById('root'));
// Now button works!
```

### Why Hydration?

✅ Instant visible content (HTML from server)  
✅ Becomes interactive quickly (JS adds functionality)  
✅ Best of both worlds!  

### Timeline:

```
With CSR only:
0ms: User visits
500ms: JavaScript downloads
1000ms: React renders (page appears!)
1500ms: Page interactive
⏱️ Total: 1.5 seconds

With SSR + Hydration:
0ms: User visits
100ms: HTML appears (page visible immediately!)
400ms: JavaScript downloads
500ms: React hydrates (page interactive!)
⏱️ Total: 0.5 seconds (3x faster!)
```

---

## 77. What is code splitting?

**Answer:**

**Code splitting** breaks your JavaScript into smaller chunks and loads them only when needed.

### Problem - Without Code Splitting:

```
App has:
- Home page (50KB)
- About page (40KB)
- Admin dashboard (200KB)
- Settings (30KB)

Without splitting:
User downloads ALL 320KB
Even if they only need Home (50KB)!
Waste of bandwidth and time!
```

### Solution - Code Splitting:

```
Chunks:
- Home (50KB) - Load immediately
- About (40KB) - Load on demand
- Admin (200KB) - Load on demand
- Settings (30KB) - Load on demand

User visiting home:
- Downloads 50KB (just home)
- If they go to admin: Downloads 200KB then
- Saves bandwidth!
```

### Implementation:

```javascript
// Dynamic import - code splitting!
const AdminDashboard = React.lazy(() => import('./AdminDashboard'));

function App() {
  const [page, setPage] = React.useState('home');
  
  return (
    <>
      <nav>
        <button onClick={() => setPage('admin')}>Admin</button>
      </nav>
      
      {page === 'admin' && (
        <Suspense fallback={<p>Loading...</p>}>
          <AdminDashboard />
        </Suspense>
      )}
    </>
  );
}

// AdminDashboard only loads when user clicks Admin!
```

### Build Output With Code Splitting:

```
Without splitting:
app.js (320KB) ← Download all at once

With splitting:
app.js (100KB) ← Main code
admin.js (200KB) ← Loaded on demand
about.js (40KB) ← Loaded on demand

Initial download: 100KB (instead of 320KB!)
```

### When to Use:

✅ Large admin sections  
✅ Optional features  
✅ Heavy libraries  
✅ Routes that aren't visited often  

---

## 78. What is tree shaking?

**Answer:**

**Tree shaking** removes unused code from your bundle, like shaking a tree to remove dead leaves.

### Simple Example:

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

// app.js
import { add } from './math.js';

console.log(add(5, 3)); // Only use add()
```

### Without Tree Shaking:

```
Bundle includes:
- add() ✓ (used)
- subtract() ✗ (not used, but included anyway!)
- multiply() ✗ (not used, but included anyway!)

Bundle size: 5KB (includes dead code)
```

### With Tree Shaking:

```
Bundle includes:
- add() ✓ (used)

Bundle size: 2KB (removed dead code!)
```

### Requirements for Tree Shaking:

✅ **ES6 modules** (import/export)
```javascript
// ✓ Works with tree shaking
import { myFunction } from './module.js';

// ✗ Doesn't work
const myModule = require('./module.js');
```

✅ **Side-effect free code**
```javascript
// ✓ Can be tree shaken (no side effects)
export const add = (a, b) => a + b;

// ✗ Can't be tree shaken (has side effects)
export const config = (window.MY_VAR = {});
```

### Modern Setup:

Most modern tools handle tree shaking automatically:
- **Webpack** (webpack 2+)
- **Rollup**
- **Create React App** (built-in)
- **Next.js** (built-in)

```javascript
// Your code - just write normally
import { heavyLibrary } from 'library';

// Webpack automatically removes unused exports
// You don't need to do anything!
```

---

## 79. How do you implement infinite scroll?

**Answer:**

**Infinite scroll** loads more content as user scrolls to bottom of page.

### How It Works:

```
User sees items 1-10
    ↓ Scrolls down
User sees items 11-20
    ↓ Scrolls down more
User sees items 21-30
    ↓ Scrolls down more (no load screen!)
... and on and on
```

### Simple Implementation:

```javascript
function InfiniteScroll() {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const observerRef = React.useRef(null);
  
  // Load more items
  const loadMore = async () => {
    const newItems = await fetch(`/api/items?page=${page}`).then(r => r.json());
    setItems([...items, ...newItems]);
    setPage(page + 1);
  };
  
  // Detect when user scrolls to bottom
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, [page]);
  
  return (
    <div>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      {/* This element triggers loading when visible */}
      <div ref={observerRef}>Loading more...</div>
    </div>
  );
}
```

### How It Works:

```
1. IntersectionObserver watches "Loading more..." div
2. When user scrolls and div becomes visible
3. loadMore() is called
4. New items are fetched
5. Added to list
6. Observer still watches (next load triggers when scrolled again)
```

### Real World Example:

```javascript
function TwitterFeed() {
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef(null);
  
  const fetchMoreTweets = React.useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const moreTweets = await fetch('/api/tweets').then(r => r.json());
    setTweets(prev => [...prev, ...moreTweets]);
    setLoading(false);
  }, [loading]);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        fetchMoreTweets();
      }
    }, { threshold: 0.1 });
    
    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }
    
    return () => observer.disconnect();
  }, [loading, fetchMoreTweets]);
  
  return (
    <div>
      {tweets.map(tweet => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
      <div ref={bottomRef}>
        {loading && <p>Loading more tweets...</p>}
      </div>
    </div>
  );
}
```

---

## 80. How do you implement debouncing in React?

**Answer:**

**Debouncing** delays a function call until user stops doing an action (like stops typing).

### Why Debounce?

```javascript
function SearchUsers() {
  const [query, setQuery] = React.useState('');
  
  // Without debouncing:
  // User types: "R" → API call
  // User types: "Re" → API call
  // User types: "Rea" → API call
  // User types: "Reac" → API call
  // User types: "React" → API call
  // 5 unnecessary API calls!
  
  // With debouncing:
  // User types: "React"
  // Wait 500ms after they stop typing
  // Then make 1 API call
}
```

### Simple Debounce Implementation:

```javascript
function SearchUsers() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const timeoutRef = React.useRef(null);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear previous timeout
    clearTimeout(timeoutRef.current);
    
    // Set new timeout
    timeoutRef.current = setTimeout(async () => {
      // API call only after 500ms of no typing!
      const data = await fetch(`/api/search?q=${value}`).then(r => r.json());
      setResults(data);
    }, 500);
  };
  
  return (
    <div>
      <input value={query} onChange={handleSearch} placeholder="Search..." />
      <ul>
        {results.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

### Custom Debounce Hook:

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  
  React.useEffect(() => {
    // Set timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cleanup previous timer
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Use it
function SearchApp() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  React.useEffect(() => {
    // This runs only when debouncedQuery changes (after 500ms)
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Timeline Example:

```
User interaction:
0ms: Type "R"
100ms: Type "Re"
200ms: Type "Rea"
300ms: Type "Reac"
400ms: Type "React"
500ms: STOPS typing
900ms: Debounce triggers → API call!

Result: 1 API call instead of 5!
```

### Real World Use Cases:

✅ Search bars  
✅ Auto-save on input  
✅ API calls on input  
✅ Window resize handlers  

---

## Summary of Advanced Part 1 (Q61-Q80)

You now understand:

✅ Reconciliation - How React compares trees  
✅ Virtual DOM - In-memory copy for fast updates  
✅ Diffing algorithm - Finding what changed  
✅ Fiber architecture - Breaking work into chunks  
✅ Batched updates - Grouping updates  
✅ Strict mode - Development tool for finding bugs  
✅ SSR - Server renders HTML  
✅ SSG - Pre-built static HTML  
✅ CSR - Browser renders  
✅ Concurrent rendering - Multi-tasking  
✅ Time slicing - Breaking work over time  
✅ Priority levels - Urgent vs background work  
✅ ISR - Update static pages without rebuild  
✅ Hydration - Add JS to server HTML  
✅ Code splitting - Load code on demand  
✅ Tree shaking - Remove dead code  
✅ Infinite scroll - Load more on scroll  
✅ Debouncing - Delay function calls  

**Next:** Continue with questions 81-100 for implementation patterns and state management libraries!
