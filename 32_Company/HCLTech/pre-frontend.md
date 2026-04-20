# HCL Tech — Senior Technical Lead Interview Preparation Guide

### React.js · HTML · CSS · JavaScript · System Design · Leadership

> **Role:** Senior Technical Lead — React.js, HTML, CSS | **Experience:** 5 Years | **Company:** HCL Technologies

---

## How to Use This Guide

* Each question includes a **Interview-Ready Definition** — a crisp paragraph you can say directly in the interview.
* **Simple Explanation** breaks down the concept in plain language.
* **Code Examples** show it in action where applicable.
* **Key Points** summarize what the interviewer is really testing.

---

# SECTION 1: REACT.JS (24 Questions)

---

## Q1. What is the Virtual DOM and how does React's reconciliation algorithm work?

### Interview-Ready Definition

> "The Virtual DOM is a lightweight, in-memory JavaScript representation of the real DOM. When a component's state or props change, React creates a new Virtual DOM tree, compares it with the previous one using a diffing algorithm, and then applies only the minimal set of changes to the actual DOM. This process is called reconciliation, and it's what makes React fast and efficient."

### Simple Explanation

Updating the real DOM directly is expensive — every change can trigger layout recalculations, repaints, and reflows in the browser. React avoids this by first making all changes to a virtual (in-memory) copy of the DOM, figuring out the smallest possible update, and then applying that to the real DOM in one go.

### How Diffing Works

React follows two key heuristics to make diffing O(n) instead of O(n³):

1. **Different element types → destroy and rebuild.** If `<div>` changes to `<span>`, React doesn't try to patch it — it tears the old tree down and builds fresh.
2. **Keys identify list items.** When rendering lists, React uses `key` props to match old and new items — so it knows which item was removed, added, or moved.

### Example

```jsx
// Before state change
<ul>
  <li key="a">Apple</li>
  <li key="b">Banana</li>
</ul>

// After state change
<ul>
  <li key="a">Apple</li>
  <li key="c">Cherry</li>  {/* React sees key "b" removed, key "c" added */}
</ul>
```

### Key Points

* Virtual DOM is a JS object — operations on it are fast.
* Reconciliation only updates what changed — not the entire DOM.
* Keys are critical for list performance.

---

## Q2. Explain React Fiber and why it was introduced.

### Interview-Ready Definition

> "React Fiber is a complete rewrite of React's core reconciliation engine introduced in React 16. The original stack-based reconciler was synchronous — once it started rendering, it couldn't be paused. Fiber solves this by breaking rendering work into small units that can be paused, prioritized, resumed, or discarded. This enables features like Concurrent Mode, Suspense, and smooth animations without blocking the main thread."

### Simple Explanation

Imagine React is painting a wall. The old way: once started, it can't stop until the entire wall is done — even if you urgently need to answer the door. Fiber is like being able to pause the painting, answer the door, and come back.

### Before Fiber (Stack Reconciler)

* Rendering was one big synchronous task.
* Long renders would block the browser, causing dropped frames and janky UI.
* No way to prioritize urgent updates (like typing in an input) over non-urgent ones (like loading a list).

### After Fiber

* Rendering is broken into **work units** (fibers).
* React can pause between units and check if there's higher-priority work.
* Introduces the concept of **lanes** (priority levels) for scheduling.

### Key Points

* Fiber enables **concurrent rendering** — React can work on multiple renders simultaneously.
* It's the foundation for `useTransition`, `useDeferredValue`, and `Suspense`.
* As a developer, you don't interact with Fiber directly — it's an internal engine change.

---

## Q3. What are all React Hooks and when would you use each?

### Interview-Ready Definition

> "React Hooks are functions that let you use state, lifecycle, and other React features inside functional components. They were introduced in React 16.8 to replace class components for most use cases and to enable better logic reuse across components."

### Complete Hooks Reference

| Hook                 | Purpose                          | When to Use                                |
| -------------------- | -------------------------------- | ------------------------------------------ |
| `useState`         | Local state management           | Any component-level data that changes      |
| `useEffect`        | Side effects, lifecycle          | API calls, subscriptions, DOM manipulation |
| `useContext`       | Consume context                  | Read shared data (theme, auth, locale)     |
| `useReducer`       | Complex state logic              | Multiple related state transitions         |
| `useCallback`      | Memoize a function               | Prevent child re-renders, stable refs      |
| `useMemo`          | Memoize a computed value         | Expensive calculations                     |
| `useRef`           | DOM reference or mutable value   | Focus management, store previous value     |
| `useLayoutEffect`  | Sync DOM read/write before paint | Avoid visual flicker on DOM measurements   |
| `useId`            | Unique accessible IDs            | Form labels, aria attributes               |
| `useTransition`    | Mark update as non-urgent        | Keep UI responsive during heavy updates    |
| `useDeferredValue` | Defer a value update             | Defer expensive child renders              |

### Example — useCallback vs useMemo

```jsx
const filteredList = useMemo(
  () => items.filter(item => item.active),
  [items]
); // Caches the RESULT (value)

const handleClick = useCallback(
  () => console.log(id),
  [id]
); // Caches the FUNCTION reference
```

---

## Q4. Difference between `useCallback` and `useMemo` — when would you use each?

### Interview-Ready Definition

> "`useMemo` caches the result of a computation and returns it — use it to avoid re-running expensive calculations. `useCallback` caches a function definition itself — use it to give a child component a stable function reference so it doesn't re-render unnecessarily. The key distinction is: `useMemo` returns a value, `useCallback` returns a function."

### Simple Explanation

Both hooks exist to avoid unnecessary work. The difference is *what* they're caching.

```jsx
// useMemo — caches a VALUE (runs the function, stores the result)
const sortedUsers = useMemo(() => {
  return users.sort((a, b) => a.name.localeCompare(b.name)); // expensive sort
}, [users]);

// useCallback — caches a FUNCTION (stores the function itself)
const handleDelete = useCallback((id) => {
  setUsers(prev => prev.filter(u => u.id !== id));
}, []); // stable reference, won't change between renders
```

### When Does useCallback Matter?

```jsx
// Without useCallback — Button re-renders every time Parent renders
// because handleClick is a new function object each time
const Parent = () => {
  const handleClick = () => doSomething(); // new reference every render
  return <MemoizedButton onClick={handleClick} />;
};

// With useCallback — Button only re-renders when dependency changes
const Parent = () => {
  const handleClick = useCallback(() => doSomething(), []);
  return <MemoizedButton onClick={handleClick} />;
};
```

### Key Points

* Only use these when you have a measurable performance problem — premature optimization adds code complexity.
* `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

---

## Q5. How does `useEffect` cleanup work? What happens if you don't clean up?

### Interview-Ready Definition

> "When you return a function from `useEffect`, React calls it as a cleanup before the component unmounts or before the effect runs again on the next render. Cleanup is essential to prevent memory leaks, stale event listeners, duplicate subscriptions, and the infamous 'Can't perform a React state update on an unmounted component' warning."

### Simple Explanation

Think of useEffect like renting an apartment. When you move in (mount), you set things up. When you leave (unmount or before re-running the effect), you clean up — turn off the lights, cancel your internet service.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  // Cleanup — runs on unmount OR before next effect
  return () => {
    clearInterval(timer); // Cancel the timer
  };
}, []); // Empty deps = run once on mount
```

### What Happens Without Cleanup?

```jsx
// BUG — no cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // If you navigate away and come back, a new listener is added EVERY TIME
  // Eventually you have 10 listeners all firing at once
}, []);

// CORRECT — with cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Key Points

* Cleanup runs **before** the next effect, not after.
* Always clean up: intervals, timeouts, event listeners, WebSocket connections, API abort controllers.
* Use `AbortController` to cancel in-flight fetch requests on unmount.

---

## Q6. Explain controlled vs uncontrolled components.

### Interview-Ready Definition

> "In a controlled component, the form element's value is driven entirely by React state — the component is the single source of truth. In an uncontrolled component, the DOM itself manages the form data, and you access it using a `ref` when needed. Controlled components are predictable and easier to validate; uncontrolled components are simpler for quick forms or third-party library integrations."

### Controlled Component Example

```jsx
const [name, setName] = useState('');

return (
  <input
    value={name}                          // State drives the value
    onChange={e => setName(e.target.value)} // Every keystroke updates state
  />
);
// React ALWAYS knows the current value
```

### Uncontrolled Component Example

```jsx
const inputRef = useRef();

const handleSubmit = () => {
  console.log(inputRef.current.value); // Access value only when needed
};

return <input ref={inputRef} defaultValue="initial" />;
// DOM manages its own value — React doesn't track each keystroke
```

### When to Use Each

| Scenario                             | Recommendation        |
| ------------------------------------ | --------------------- |
| Form validation on keystroke         | Controlled            |
| Conditional field display            | Controlled            |
| File input (`<input type="file">`) | Uncontrolled (always) |
| Integrating with non-React library   | Uncontrolled          |
| Quick, simple form                   | Either                |

---

## Q7. What is prop drilling and how do you solve it?

### Interview-Ready Definition

> "Prop drilling occurs when you pass data through multiple layers of intermediate components that don't use the data themselves — they just pass it down to a deeply nested child. It leads to tightly coupled, hard-to-maintain code. Solutions include React's Context API for shared state, external state managers like Redux or Zustand, or component composition patterns."

### Simple Explanation

```jsx
// PROBLEM — Prop drilling
// App → Dashboard → Sidebar → UserAvatar needs the user object
// Dashboard and Sidebar don't use `user`, they just pass it along

const App = () => <Dashboard user={user} />;
const Dashboard = ({ user }) => <Sidebar user={user} />;
const Sidebar = ({ user }) => <UserAvatar user={user} />;
const UserAvatar = ({ user }) => <img src={user.avatar} />;
```

### Solution 1 — Context API

```jsx
const UserContext = createContext(null);

const App = () => (
  <UserContext.Provider value={user}>
    <Dashboard />   {/* No need to pass user as prop */}
  </UserContext.Provider>
);

const UserAvatar = () => {
  const user = useContext(UserContext); // Access directly
  return <img src={user.avatar} />;
};
```

### Solution 2 — Component Composition

```jsx
// Pass components as children instead of data
const App = () => (
  <Dashboard>
    <UserAvatar user={user} /> {/* UserAvatar lives here, not deep inside */}
  </Dashboard>
);
const Dashboard = ({ children }) => <Sidebar>{children}</Sidebar>;
```

---

## Q8. Explain Redux flow. When would you choose Redux over Context?

### Interview-Ready Definition

> "Redux follows a unidirectional data flow: a component dispatches an action, the reducer receives the current state and the action, computes and returns a new state, and the store notifies subscribed components to re-render. Redux is ideal for large-scale applications with complex state shared across many components, where you need features like middleware, time-travel debugging, or predictable state management across a large team."

### Redux Flow Diagram

```
Component → dispatch(action) → Middleware (Thunk/Saga) → Reducer → New State → Store → Component re-renders
```

### Simple Code Example (Redux Toolkit)

```jsx
// 1. Create a slice (reducer + actions together)
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
  }
});

// 2. Dispatch action from component
const dispatch = useDispatch();
dispatch(counterSlice.actions.increment());

// 3. Select state in component
const count = useSelector(state => state.counter.value);
```

### Redux vs Context — Decision Guide

| Factor           | Use Context          | Use Redux                    |
| ---------------- | -------------------- | ---------------------------- |
| App size         | Small-medium         | Large enterprise             |
| State complexity | Simple (theme, auth) | Complex, many transitions    |
| Async handling   | Basic                | Complex (Saga, Thunk)        |
| DevTools         | Not needed           | Time-travel debugging needed |
| Team size        | Small                | Large, multiple teams        |

---

## Q9. How do you optimize React app performance?

### Interview-Ready Definition

> "React performance optimization involves a combination of rendering optimization, code splitting, and asset optimization. Key techniques include memoization with `React.memo`, `useMemo`, and `useCallback`; code splitting with `React.lazy` and `Suspense`; virtualizing long lists; proper state colocation; and using production builds. The first step is always to profile and identify the actual bottleneck."

### Techniques with Examples

**1. React.memo — Prevent unnecessary re-renders**

```jsx
const ExpensiveChild = React.memo(({ data }) => {
  return <div>{data.name}</div>;
});
// Only re-renders if `data` prop actually changes (shallow compare)
```

**2. Code Splitting — Load only what's needed**

```jsx
const HeavyDashboard = React.lazy(() => import('./Dashboard'));

const App = () => (
  <Suspense fallback={<Spinner />}>
    <HeavyDashboard />
  </Suspense>
);
```

**3. List Virtualization — Render only visible items**

```jsx
import { FixedSizeList } from 'react-window';

// Renders only ~10 visible rows instead of all 10,000
<FixedSizeList height={500} itemCount={10000} itemSize={35}>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</FixedSizeList>
```

**4. State Colocation — Keep state where it's used**

```jsx
// BAD — unnecessary state at top level causes full tree re-renders
const App = () => {
  const [inputValue, setInputValue] = useState('');
  return <SearchInput value={inputValue} onChange={setInputValue} />;
};

// GOOD — state lives in the component that needs it
const SearchInput = () => {
  const [inputValue, setInputValue] = useState(''); // Only SearchInput re-renders
  return <input value={inputValue} onChange={e => setInputValue(e.target.value)} />;
};
```

---

## Q10. What is `React.memo` and when does it fail to prevent re-renders?

### Interview-Ready Definition

> "`React.memo` is a higher-order component that wraps a functional component and performs a shallow comparison of its props. If the props haven't changed, the component skips re-rendering. However, it fails when props include object or array literals created inline — because they are new references on every render — or when callback functions are passed without `useCallback`."

### When It Works

```jsx
const Button = React.memo(({ label }) => {
  console.log('Rendering Button');
  return <button>{label}</button>;
});

// Parent re-renders, but Button only re-renders if `label` changes
```

### When It Fails (and how to fix it)

```jsx
// FAIL — new object reference every render
<MemoComponent style={{ color: 'red' }} /> // {} !== {} in JS

// FAIL — new function reference every render
<MemoComponent onClick={() => doSomething()} />

// FIX — stable references
const style = useMemo(() => ({ color: 'red' }), []);
const handleClick = useCallback(() => doSomething(), []);
<MemoComponent style={style} onClick={handleClick} />
```

### Custom Comparator

```jsx
const MyComponent = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // Return true to SKIP re-render
});
```

---

## Q11. Explain Error Boundaries and their limitations.

### Interview-Ready Definition

> "Error Boundaries are React class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They are implemented using `static getDerivedStateFromError` (to update state and show fallback) and `componentDidCatch` (to log error details). They do NOT catch errors in event handlers, async code, or server-side rendering."

### Implementation

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo); // Send to Sentry, etc.
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please refresh.</h2>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>
```

### What Error Boundaries DON'T Catch

```jsx
// ❌ Event handlers — use try/catch here
const handleClick = () => {
  try {
    riskyOperation();
  } catch (error) {
    setError(error.message);
  }
};

// ❌ Async code (use .catch() or try/catch in async functions)
// ❌ Server-side rendering
// ❌ Errors in the boundary itself
```

---

## Q12. What is `React.lazy` and Suspense? How do you implement code splitting?

### Interview-Ready Definition

> "`React.lazy` enables dynamic imports — the component's JavaScript bundle is only downloaded when the component is first rendered, not on initial page load. `Suspense` wraps lazy components and renders a fallback UI (like a spinner) while the bundle is loading. Together they implement route-level or component-level code splitting, reducing initial bundle size and improving page load performance."

### Route-Level Code Splitting

```jsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

const App = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Suspense>
);
```

### Key Points

* The `import()` call is what actually does the code splitting — Webpack/Vite splits the bundle at that point.
* Always wrap `lazy` components in `Suspense`.
* Use multiple `Suspense` boundaries for granular loading states.
* `React.lazy` only works with  **default exports** .

---

## Q13. Explain the Context API — performance pitfalls and best practices.

### Interview-Ready Definition

> "React's Context API allows you to share data across the component tree without prop drilling. However, every component consuming a context re-renders whenever the context value changes — even if it only uses a part of the value that didn't change. Best practices include splitting contexts by concern, memoizing context values, and using `useReducer` with context for complex state."

### The Performance Problem

```jsx
// BAD — one big context; any change re-renders ALL consumers
const AppContext = createContext({ user, theme, cart, notifications });

// GOOD — separate contexts by update frequency
const UserContext = createContext(user);         // Rarely changes
const ThemeContext = createContext(theme);       // User preference
const CartContext = createContext(cart);         // Changes often
```

### Memoizing Context Value

```jsx
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Without useMemo — new object every render, all consumers re-render
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

---

## Q14. What are Higher-Order Components (HOC) and Render Props? How do hooks replace them?

### Interview-Ready Definition

> "A Higher-Order Component is a function that takes a component and returns an enhanced version of it, adding extra functionality. Render Props is a pattern where a component receives a function as a prop and calls it to render its output, sharing stateful logic. Both were common before hooks. Custom hooks now provide the same logic-reuse capability with less nesting and no 'wrapper hell'."

### HOC Example

```jsx
// HOC — withAuth adds authentication check
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isLoggedIn } = useContext(AuthContext);
    if (!isLoggedIn) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };
};

const ProtectedDashboard = withAuth(Dashboard);
```

### Custom Hook Equivalent (Modern Approach)

```jsx
// Same logic, much simpler — just a custom hook
const useAuth = () => {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) throw new Error('Not authenticated');
  return { isLoggedIn };
};

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  return <div>Welcome!</div>;
};
```

---

## Q15. How does React's `key` prop work in lists? Why shouldn't you use array index as key?

### Interview-Ready Definition

> "The `key` prop is a unique identifier that React uses to track which list items have changed, been added, or been removed during reconciliation. Using array index as a key is problematic because when items are reordered, added, or removed, the index values shift — causing React to incorrectly match old components to new items, leading to UI bugs, wrong state, and unnecessary re-renders."

### The Index Key Problem

```jsx
// BAD — using index as key
const todos = ['Buy milk', 'Walk dog', 'Code React'];
todos.map((todo, index) => <TodoItem key={index} text={todo} />);

// If you delete 'Buy milk', the list becomes:
// index 0: 'Walk dog' — React thinks this is the SAME as old index 0 item
// Old component's internal state (if any) is preserved — WRONG!

// GOOD — use stable unique ID
todos.map(todo => <TodoItem key={todo.id} text={todo.text} />);
```

### When Index Key is OK

* The list is **static** (never reordered, filtered, or items deleted).
* Items have no internal state.

---

## Q16. What is `useReducer` and when is it preferable to `useState`?

### Interview-Ready Definition

> "`useReducer` is a React hook that manages state through a reducer function — a pure function that takes the current state and an action, and returns the next state. It's preferable to `useState` when state logic is complex, involves multiple sub-values, or when multiple actions need to trigger state transitions in a predictable, testable way."

### Example — Shopping Cart

```jsx
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload], total: state.total + action.payload.price };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

// Usage
dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Apple', price: 50 } });
dispatch({ type: 'REMOVE_ITEM', payload: 1 });
```

### useState vs useReducer

| Scenario                | useState   | useReducer              |
| ----------------------- | ---------- | ----------------------- |
| Single value            | ✅         | Overkill                |
| Multiple related fields | Possible   | ✅ Better               |
| Complex transitions     | Gets messy | ✅ Cleaner              |
| Testable state logic    | Hard       | ✅ Easy (pure function) |

---

## Q17. Explain React portals and when to use them.

### Interview-Ready Definition

> "React portals allow you to render a child component into a different DOM node than the parent component, while keeping it part of the React component tree. This means events still bubble up through the React tree normally. Portals are typically used for modals, tooltips, and dropdowns where the component needs to visually escape a parent's `overflow: hidden` or `z-index` stacking context."

### Implementation

```jsx
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  // Renders into document.body, not inside the parent component's DOM
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">{children}</div>
    </div>,
    document.body // Target DOM node
  );
};
```

### Why Not Just Use CSS?

Sometimes the parent has `overflow: hidden` or a low `z-index` — no CSS trick can fix that. A portal escapes the DOM structure entirely.

---

## Q18. What is the difference between `useLayoutEffect` and `useEffect`?

### Interview-Ready Definition

> "`useEffect` fires asynchronously after the browser has painted the screen — it doesn't block visual updates. `useLayoutEffect` fires synchronously after DOM mutations but before the browser paints — same timing as the old `componentDidMount`/`componentDidUpdate`. Use `useLayoutEffect` when you need to measure DOM elements and re-render synchronously to prevent visual flickering."

### Example — Tooltip Positioning

```jsx
const Tooltip = ({ targetRef, text }) => {
  const tooltipRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Measure the target element's position
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left });
    // This happens BEFORE paint — no flicker!
  }, []);

  return <div ref={tooltipRef} style={position}>{text}</div>;
};
```

### Rule of Thumb

* Default to `useEffect` always.
* Switch to `useLayoutEffect` only when you see a visual flicker caused by a layout measurement + state update cycle.

---

## Q19. How would you implement pagination or infinite scroll in React?

### Interview-Ready Definition

> "Pagination involves tracking the current page in state and fetching the appropriate slice of data from the API. Infinite scroll uses the `IntersectionObserver` API to detect when a sentinel element enters the viewport, triggering a fetch for the next page and appending results to the existing list. Libraries like TanStack Query simplify both patterns with built-in caching and pagination support."

### Pagination Implementation

```jsx
const [page, setPage] = useState(1);
const [data, setData] = useState([]);

useEffect(() => {
  fetchProducts({ page, limit: 10 }).then(res => setData(res.data));
}, [page]);

return (
  <div>
    {data.map(item => <ProductCard key={item.id} {...item} />)}
    <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
    <button onClick={() => setPage(p => p + 1)}>Next</button>
  </div>
);
```

### Infinite Scroll with IntersectionObserver

```jsx
const sentinelRef = useRef();

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && hasMore) fetchNextPage();
    },
    { threshold: 1.0 }
  );
  if (sentinelRef.current) observer.observe(sentinelRef.current);
  return () => observer.disconnect();
}, [hasMore]);

return (
  <div>
    {items.map(item => <Card key={item.id} {...item} />)}
    <div ref={sentinelRef} /> {/* Invisible trigger element at bottom */}
    {loading && <Spinner />}
  </div>
);
```

---

## Q20. Explain Concurrent Mode and React 18 features.

### Interview-Ready Definition

> "React 18 introduced Concurrent Mode, which allows React to prepare multiple versions of the UI simultaneously and interrupt rendering to handle more urgent updates. Key features include automatic batching of state updates, the `startTransition` API for marking non-urgent updates, `useDeferredValue` for deferring expensive renders, and `Suspense` support for data fetching on the server."

### Automatic Batching (React 18)

```jsx
// React 17 — only batched in React event handlers
setTimeout(() => {
  setCount(c => c + 1); // Causes re-render
  setFlag(f => !f);     // Causes another re-render (2 total)
}, 1000);

// React 18 — batched everywhere automatically
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);     // Only 1 re-render — automatic batching!
}, 1000);
```

### useTransition — Keep UI Responsive

```jsx
const [isPending, startTransition] = useTransition();
const [query, setQuery] = useState('');
const [results, setResults] = useState([]);

const handleSearch = (e) => {
  setQuery(e.target.value); // Urgent — update input immediately

  startTransition(() => {
    setResults(filterLargeList(e.target.value)); // Non-urgent — can be interrupted
  });
};
```

---

## Q21. How do you handle forms in React — libraries and approach?

### Interview-Ready Definition

> "For simple forms, React's controlled components with `useState` work well. For complex forms with validation, I prefer React Hook Form because it uses uncontrolled inputs under the hood, minimizing re-renders, and integrates cleanly with schema validators like Zod or Yup. The key principles are: single source of truth for form state, validation on blur or submit, clear error display, and proper loading/error state management."

### React Hook Form Example

```jsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

---

## Q22. What are React design patterns you've used in production?

### Interview-Ready Definition

> "In production React applications, I regularly apply patterns like Container/Presentational separation, Compound Components for flexible APIs, Custom Hooks for logic reuse, and the Provider pattern for shared state. These patterns improve maintainability, testability, and code organization in large teams."

### Compound Components Pattern

```jsx
// Flexible API — user controls the structure
<Select value={selected} onChange={setSelected}>
  <Select.Option value="apple">Apple</Select.Option>
  <Select.Option value="banana">Banana</Select.Option>
</Select>

// Implementation using Context internally
const SelectContext = createContext();
const Select = ({ children, value, onChange }) => (
  <SelectContext.Provider value={{ value, onChange }}>
    <div className="select">{children}</div>
  </SelectContext.Provider>
);
Select.Option = ({ value, children }) => {
  const { value: selected, onChange } = useContext(SelectContext);
  return (
    <div onClick={() => onChange(value)} className={selected === value ? 'selected' : ''}>
      {children}
    </div>
  );
};
```

---

## Q23. How do you test React components?

### Interview-Ready Definition

> "I use React Testing Library (RTL) combined with Jest for unit and integration testing. RTL's philosophy is to test components the way users interact with them — by querying DOM elements the way a user or assistive technology would, not by testing implementation details. For E2E testing, I use Cypress or Playwright. API calls are mocked using Mock Service Worker (MSW)."

### Example Test

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

test('shows error when submitting empty form', async () => {
  render(<LoginForm />);

  const submitButton = screen.getByRole('button', { name: /login/i });
  await userEvent.click(submitButton);

  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});

test('calls onSubmit with correct values', async () => {
  const mockSubmit = jest.fn();
  render(<LoginForm onSubmit={mockSubmit} />);

  await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@test.com');
  await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));

  expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password123' });
});
```

---

## Q24. How would you migrate a class-based React app to functional components with hooks?

### Interview-Ready Definition

> "Migration should be incremental — never attempt a big-bang rewrite. The strategy is to convert one component at a time, starting with leaf (childless) components. Map lifecycle methods to hooks, replace `this.state` with `useState` or `useReducer`, extract shared logic into custom hooks, and add tests before each conversion so you have a safety net."

### Lifecycle Mapping

```jsx
// CLASS COMPONENT
class UserProfile extends React.Component {
  state = { user: null, loading: true };

  componentDidMount() {
    fetchUser(this.props.id).then(user => this.setState({ user, loading: false }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      fetchUser(this.props.id).then(user => this.setState({ user }));
    }
  }

  componentWillUnmount() {
    this.cancelToken.cancel();
  }
}

// FUNCTIONAL EQUIVALENT
const UserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(id, { signal: controller.signal })
      .then(data => { setUser(data); setLoading(false); });
    return () => controller.abort(); // cleanup = componentWillUnmount
  }, [id]); // Re-runs when id changes = componentDidUpdate
};
```

---

# SECTION 2: JAVASCRIPT (12 Questions)

---

## Q25. Explain closures and give a practical React use case.

### Interview-Ready Definition

> "A closure is a function that retains access to variables from its outer (enclosing) scope even after that outer function has finished executing. In JavaScript, every function creates a closure. In React, closures are fundamental to how event handlers, useEffect callbacks, and custom hooks work — but they also cause the common 'stale closure' bug."

### Simple Explanation

```javascript
function makeCounter() {
  let count = 0; // This variable is 'closed over'

  return function increment() {
    count++;
    console.log(count);
  };
}

const counter = makeCounter(); // makeCounter() has finished, but...
counter(); // 1 — increment still has access to `count`!
counter(); // 2
```

### Stale Closure Bug in React

```jsx
// BUG — stale closure
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Always logs 0! Captured at creation time.
    setCount(count + 1); // Always sets to 0 + 1 = 1
  }, 1000);
  return () => clearInterval(timer);
}, []); // count NOT in deps — stale closure

// FIX — functional update (doesn't need to close over `count`)
setCount(prev => prev + 1); // Always uses latest value
```

---

## Q26. What is the event loop, call stack, and microtask queue?

### Interview-Ready Definition

> "JavaScript is single-threaded and uses an event loop to handle asynchronous operations. The call stack executes synchronous code. When async operations complete, their callbacks are placed in queues. Microtasks (Promises, queueMicrotask) are processed completely before the next macrotask (setTimeout, setInterval). This is why a resolved Promise always runs before a setTimeout with 0ms delay."

### Execution Order Example

```javascript
console.log('1 - Start');           // Synchronous

setTimeout(() => {
  console.log('4 - setTimeout');    // Macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log('3 - Promise');       // Microtask queue
});

console.log('2 - End');             // Synchronous

// Output: 1 → 2 → 3 → 4
// Why? Sync code first, then all microtasks, then macrotasks
```

### Visual Mental Model

```
Call Stack → empties → Microtask Queue → empties → Macrotask Queue → one task → Microtasks → ...
```

---

## Q27. Difference between `var`, `let`, `const` — scoping and hoisting.

### Interview-Ready Definition

> "`var` is function-scoped and is hoisted with an initial value of `undefined`, which often leads to confusing bugs. `let` and `const` are block-scoped and are also hoisted but remain in a Temporal Dead Zone (TDZ) until their declaration — accessing them before declaration throws a `ReferenceError`. `const` additionally requires initialization and cannot be reassigned, though object properties can still be mutated."

```javascript
// var — function scoped, hoisted as undefined
console.log(x); // undefined (not an error)
var x = 5;
if (true) { var x = 10; } // Same `x` — function scoped
console.log(x); // 10 — surprising!

// let — block scoped, TDZ
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;
if (true) { let y = 10; } // Different `y` — block scoped
console.log(y); // 5

// const — block scoped, must be initialized, no reassignment
const obj = { name: 'John' };
obj.name = 'Jane'; // ✅ Property mutation is fine
obj = {};          // ❌ TypeError: Assignment to constant variable
```

---

## Q28. Explain Promises, `async/await`, and error handling patterns.

### Interview-Ready Definition

> "A Promise represents a value that will be available in the future — it can be pending, fulfilled, or rejected. `async/await` is syntactic sugar over Promises that allows writing asynchronous code in a synchronous style, making it easier to read and debug. For parallel requests, `Promise.all` fails fast on the first rejection, while `Promise.allSettled` waits for all and returns all results regardless of success or failure."

```javascript
// Promise chain
fetchUser(id)
  .then(user => fetchPosts(user.id))
  .then(posts => setPosts(posts))
  .catch(error => setError(error.message))
  .finally(() => setLoading(false));

// async/await equivalent — much more readable
const loadUserData = async (id) => {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    setPosts(posts);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Parallel requests
const [user, posts, comments] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
  fetchComments(id)
]); // All 3 run simultaneously — faster!

// Promise.allSettled — get all results even if some fail
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(result => {
  if (result.status === 'fulfilled') console.log(result.value);
  if (result.status === 'rejected') console.log(result.reason);
});
```

---

## Q29. What is `this` in JavaScript and how does it behave in arrow functions?

### Interview-Ready Definition

> "In JavaScript, `this` is a runtime binding that depends on how a function is called — not where it's defined. Regular functions have their own `this` determined by the call site. Arrow functions do not have their own `this` — they inherit it lexically from the enclosing scope where they are defined. This makes arrow functions ideal for callbacks where you want to preserve the outer `this`."

```javascript
const obj = {
  name: 'HCL',

  // Regular function — this = obj (called as obj.greet())
  greet: function() {
    console.log(this.name); // 'HCL'
  },

  // Arrow function — this = outer scope (window or undefined in strict mode)
  greetArrow: () => {
    console.log(this.name); // undefined!
  },

  // Practical use — arrow function inside regular function
  greetDelayed: function() {
    setTimeout(() => {
      console.log(this.name); // 'HCL' — inherits from greetDelayed's this
    }, 1000);
  }
};
```

---

## Q30. Explain ES6+ features you use daily.

```javascript
// Destructuring
const { name, age = 25 } = user;           // Object with default
const [first, ...rest] = items;             // Array with rest

// Spread/Rest
const merged = { ...defaults, ...overrides }; // Object spread
const combined = [...arr1, ...arr2];          // Array spread

// Optional chaining & Nullish coalescing
const city = user?.address?.city ?? 'Unknown'; // Safe access + fallback

// Template literals
const msg = `Hello ${name}, you have ${count} messages`;

// Array methods
const adults = users.filter(u => u.age >= 18);
const names = users.map(u => u.name);
const total = orders.reduce((sum, o) => sum + o.amount, 0);
const found = users.find(u => u.id === targetId);

// Object shorthand
const name = 'React';
const obj = { name }; // Instead of { name: name }

// Modules
export default function Component() {}
export const helper = () => {};
import Component, { helper } from './module';
```

---

## Q31. Difference between `==` and `===` in JavaScript.

### Interview-Ready Definition

> "`===` (strict equality) compares both value AND type without any type coercion. `==` (loose equality) coerces types before comparing, which leads to surprising results. Always use `===` in modern JavaScript. One notable exception: `null == undefined` is `true` with `==`, which is sometimes used intentionally to check for either."

```javascript
0 == false       // true  (false coerces to 0)
0 === false      // false (different types)
'' == false      // true  (both coerce to 0)
'' === false     // false
null == undefined // true  (special rule)
null === undefined // false
NaN == NaN       // false (NaN is not equal to itself)
NaN === NaN      // false (always use Number.isNaN() instead)
```

---

## Q32. What is debouncing vs throttling? When would you use each?

### Interview-Ready Definition

> "Debouncing delays function execution until a specified time has passed since the last call — it resets the timer on every call. Throttling limits function execution to at most once per specified time interval. Use debouncing for search inputs (wait until the user stops typing). Use throttling for scroll/resize handlers (limit API calls to a maximum rate)."

```javascript
// Debounce — wait 300ms after the LAST call
const debouncedSearch = debounce((query) => {
  fetchSearchResults(query);
}, 300);

input.addEventListener('input', e => debouncedSearch(e.target.value));
// User types "react hooks" quickly — only ONE API call after they stop

// Throttle — call at most once per 200ms
const throttledScroll = throttle(() => {
  updateScrollPosition();
}, 200);

window.addEventListener('scroll', throttledScroll);
// User scrolls for 2 seconds — ~10 calls max, not hundreds
```

### Simple Implementation

```javascript
// Debounce
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
```

---

## Q33. Explain deep vs shallow copy in JavaScript.

```javascript
// SHALLOW COPY — top level copied, nested objects are still references
const original = { name: 'John', address: { city: 'Mumbai' } };

const shallow1 = { ...original };          // Spread
const shallow2 = Object.assign({}, original); // Object.assign

shallow1.name = 'Jane';          // ✅ original.name unchanged
shallow1.address.city = 'Delhi'; // ❌ original.address.city also changes!

// DEEP COPY — full recursive copy
const deep1 = structuredClone(original);  // Modern (Chrome 98+, Node 17+)
deep1.address.city = 'Delhi'; // ✅ original.address.city unchanged

// JSON method — simple but has limitations
const deep2 = JSON.parse(JSON.stringify(original));
// ❌ Loses: undefined, functions, Date objects, Set, Map, circular refs
```

---

## Q34. What are generators and iterators?

### Interview-Ready Definition

> "A generator is a special function (denoted by `function*`) that can pause its execution and return multiple values over time using the `yield` keyword. It returns an iterator — an object with a `.next()` method. Generators are used in Redux-Saga for managing complex async workflows in a readable, testable way."

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Redux-Saga use case — readable async flows
function* fetchUserSaga(action) {
  try {
    const user = yield call(fetchUser, action.id); // Pauses here
    yield put(setUser(user));                       // Resumes, dispatches action
  } catch (error) {
    yield put(setError(error.message));
  }
}
```

---

## Q35. Explain prototype chain and inheritance in JavaScript.

### Interview-Ready Definition

> "Every JavaScript object has an internal `[[Prototype]]` link pointing to another object. When you access a property, JavaScript first looks on the object itself, then walks up the prototype chain until it finds it or reaches `Object.prototype` (which has `null` as its prototype). ES6 `class` syntax is syntactic sugar over this prototype-based inheritance."

```javascript
const animal = {
  breathe() { return 'breathing'; }
};

const dog = Object.create(animal); // dog's prototype IS animal
dog.bark = function() { return 'woof'; };

dog.bark();    // ✅ Found on dog itself
dog.breathe(); // ✅ Found on dog's prototype (animal)

// ES6 class — same thing, nicer syntax
class Animal {
  breathe() { return 'breathing'; }
}

class Dog extends Animal {
  bark() { return 'woof'; }
}

const rex = new Dog();
rex.bark();    // Own method
rex.breathe(); // Inherited from Animal.prototype
```

---

## Q36. What is a `WeakMap` and when would you use it?

### Interview-Ready Definition

> "A `WeakMap` is a collection of key-value pairs where keys must be objects and are held as weak references. This means if the key object is garbage collected, the corresponding entry is automatically removed. `WeakMap` is ideal for storing metadata associated with DOM nodes or objects without causing memory leaks — because when those objects are removed, the related data is cleaned up automatically."

```javascript
// Use case: store private component data without memory leaks
const cache = new WeakMap();

function processComponent(componentNode) {
  if (cache.has(componentNode)) {
    return cache.get(componentNode); // Reuse cached result
  }

  const result = expensiveComputation(componentNode);
  cache.set(componentNode, result);
  return result;
}

// When componentNode is removed from DOM and garbage collected,
// its cache entry is automatically cleaned up — no manual cleanup needed!
// Map would hold a reference and prevent garbage collection.
```

---

# SECTION 3: CSS & HTML (12 Questions)

---

## Q37. Explain the CSS Box Model. What is `box-sizing: border-box`?

### Interview-Ready Definition

> "Every HTML element is a rectangular box composed of four layers: content (innermost), padding (space inside the border), border, and margin (outermost space between elements). By default, CSS uses `content-box` sizing where `width` and `height` apply only to the content area — adding padding or border increases the element's actual rendered size. `border-box` changes this so that `width` and `height` include padding and border, making layout calculations much more intuitive."

```css
/* Default: content-box */
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width = 200 + 20*2 + 5*2 = 250px — SURPRISING! */
}

/* border-box: width includes padding + border */
* {
  box-sizing: border-box; /* Apply globally — best practice */
}
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Actual rendered width = exactly 200px — PREDICTABLE! */
}
```

---

## Q38. Flexbox vs CSS Grid — when do you use each?

### Interview-Ready Definition

> "Flexbox is a one-dimensional layout system for arranging items in a row or a column. It excels at distributing space and aligning items along a single axis. CSS Grid is a two-dimensional layout system for creating row-and-column structures simultaneously. Use Flexbox for component internals (navigation bars, button groups) and Grid for page-level layouts (card grids, dashboards)."

```css
/* FLEXBOX — Navigation bar (1D: items in a row) */
.navbar {
  display: flex;
  justify-content: space-between; /* Horizontal distribution */
  align-items: center;            /* Vertical centering */
  gap: 16px;
}

/* CSS GRID — Card gallery (2D: rows AND columns) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
/* Creates responsive columns that auto-fit based on available width */
```

### Common Flexbox Properties

* `flex-direction`: row | column | row-reverse | column-reverse
* `justify-content`: flex-start | flex-end | center | space-between | space-around
* `align-items`: stretch | flex-start | flex-end | center | baseline
* `flex-grow`, `flex-shrink`, `flex-basis` (shorthand: `flex`)

---

## Q39. Explain CSS specificity and how it is calculated.

### Interview-Ready Definition

> "CSS specificity determines which style rule wins when multiple rules target the same element. It is calculated as a three-part score: (ID selectors, Class/Attribute/Pseudo-class selectors, Element/Pseudo-element selectors). Higher specificity wins regardless of source order. Inline styles beat all, and `!important` beats everything. The key to maintainable CSS is keeping specificity as flat and low as possible."

```css
/* Specificity scores: (IDs, Classes, Elements) */
p                  { color: black; }   /* (0, 0, 1) */
.text              { color: blue; }    /* (0, 1, 0) */
#header            { color: green; }  /* (1, 0, 0) */
#header .text p    { color: red; }    /* (1, 1, 1) */
<p style="color: orange">            /* Inline: (1, 0, 0, 0) */

/* BEM keeps specificity flat — all single class selectors */
.card { }
.card__title { }
.card--featured { }
```

---

## Q40. Explain the CSS cascade and how it works.

### Interview-Ready Definition

> "The CSS cascade is the algorithm that determines which CSS rules apply when multiple rules target the same element. It evaluates rules in priority order: importance (`!important`), then origin (author styles, user agent stylesheet, user styles), then specificity, then source order (last declared wins). Understanding the cascade is essential for debugging why a style isn't being applied."

```css
/* Priority order (high to low) */
/* 1. !important in author styles */
.error { color: red !important; }

/* 2. Inline styles */
/* <div style="color: blue"> */

/* 3. ID selectors */
#main { color: green; }

/* 4. Class/attribute selectors */
.text { color: purple; }

/* 5. Element selectors */
p { color: black; }

/* 6. Source order — later wins */
.box { color: blue; }
.box { color: red; } /* This wins — declared later */
```

---

## Q41. Explain CSS positioning — static, relative, absolute, fixed, sticky.

### Interview-Ready Definition

> "CSS provides five positioning modes. `static` is the default — elements flow in document order. `relative` offsets an element from its natural position without removing it from document flow, and creates a positioning context for child elements. `absolute` removes the element from flow and positions it relative to the nearest positioned ancestor. `fixed` positions relative to the viewport and stays on scroll. `sticky` is a hybrid — it stays in flow until a scroll threshold, then acts like `fixed`."

```css
/* relative — offset from normal position, stays in flow */
.relative-box {
  position: relative;
  top: 20px; left: 20px; /* Moves visually, but space is still reserved */
}

/* absolute — removed from flow, positioned to nearest non-static ancestor */
.parent { position: relative; } /* Positioning context */
.absolute-child {
  position: absolute;
  top: 0; right: 0; /* Top-right corner of .parent */
}

/* sticky — sticks when reaching threshold */
.sticky-header {
  position: sticky;
  top: 0; /* Sticks when 0px from top of viewport */
  z-index: 100;
}
```

---

## Q42. How do you make a website responsive? Media queries and mobile-first design.

### Interview-Ready Definition

> "Responsive design uses fluid grids, flexible images, and CSS media queries to adapt layouts to different screen sizes. Mobile-first means writing base styles for the smallest screen and progressively adding complexity with `min-width` media queries. This approach ensures good performance on mobile since mobile devices don't load unnecessary desktop styles."

```css
/* Mobile-first — base styles are for mobile */
.container {
  padding: 1rem;
  font-size: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

```html
<!-- Required viewport meta tag -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## Q43. CSS Selectors — combinators and pseudo-classes/elements.

```css
/* Combinators */
div p        { }  /* Descendant — any p inside div */
div > p      { }  /* Child — direct p children of div */
div + p      { }  /* Adjacent sibling — p immediately after div */
div ~ p      { }  /* General sibling — all p siblings after div */

/* Pseudo-classes — element state */
a:hover         { } /* Mouse over */
input:focus     { } /* Has focus */
li:first-child  { } /* First child */
li:last-child   { } /* Last child */
li:nth-child(2) { } /* Specific position */
li:nth-child(odd)  { } /* Odd items */
p:not(.excluded)   { } /* Does NOT match selector */

/* Pseudo-elements — virtual elements */
p::before    { content: '→ '; } /* Insert before content */
p::after     { content: ' ←'; } /* Insert after content */
p::first-line { font-weight: bold; } /* Style first line */
::placeholder { color: #999; }  /* Input placeholder text */
::selection   { background: yellow; } /* Text selection */
```

---

## Q44. What are CSS custom properties (variables)?

### Interview-Ready Definition

> "CSS custom properties (also called CSS variables) are entities defined with a `--` prefix and accessed via `var()`. Unlike Sass variables that are resolved at compile time, CSS variables are live in the browser — they cascade, can be changed at runtime with JavaScript, and respect the element's scope. They are ideal for implementing design tokens, theming, and runtime theme switching like dark mode."

```css
/* Define on :root — globally accessible */
:root {
  --primary-color: #3498db;
  --spacing-md: 1rem;
  --border-radius: 8px;
  --font-size-base: 16px;
}

/* Use with var() — with optional fallback */
.button {
  background: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base, 16px); /* fallback if var not defined */
}

/* Dark mode — just override the variables */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #5dade2;
    --bg-color: #1a1a2e;
    --text-color: #ffffff;
  }
}

/* JavaScript runtime change */
document.documentElement.style.setProperty('--primary-color', '#e74c3c');
```

---

## Q45. CSS animation vs CSS transition — when to use each.

```css
/* TRANSITION — smooth change between two states (triggered by state change) */
.button {
  background: blue;
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

/* ANIMATION — multi-step sequence with @keyframes (can auto-play) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-title { animation: fadeIn 0.5s ease-out forwards; }
.spinner    { animation: spin 1s linear infinite; }
```

---

## Q46. Explain Block Formatting Context (BFC) and when it's useful.

### Interview-Ready Definition

> "A Block Formatting Context (BFC) is an isolated layout environment where block-level elements are arranged. Elements inside a BFC do not affect elements outside it. Creating a BFC solves common CSS problems like: containing floated children (preventing parent height collapse), preventing margin collapse between parent and child, and stopping text from wrapping around floated elements."

```css
/* How to create a BFC */
.container {
  overflow: hidden;       /* Most common way */
  /* OR */
  display: flow-root;     /* Modern, explicit way — no side effects */
  /* OR */
  display: flex;
  /* OR */
  position: absolute;
}

/* Problem 1 — Containing floats (without BFC, parent height collapses to 0) */
.parent {
  overflow: hidden; /* Creates BFC — parent wraps around floated children */
}

/* Problem 2 — Preventing margin collapse */
.parent {
  overflow: hidden; /* BFC prevents child margins from escaping parent */
}
.child {
  margin-top: 20px; /* Without BFC, this would collapse with parent's margin */
}
```

---

## Q47. What are semantic HTML elements and why do they matter?

### Interview-Ready Definition

> "Semantic HTML uses elements that carry meaning about the content's role in the document — like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`. They benefit accessibility (screen readers announce them appropriately), SEO (search engines understand page structure), and maintainability (code is self-documenting). Always prefer semantic elements over generic `<div>` and `<span>` containers."

```html
<!-- NON-SEMANTIC — all divs, no meaning -->
<div id="header">
  <div id="nav"><div class="nav-item">Home</div></div>
</div>
<div id="main">
  <div class="post">
    <div class="post-title">Article Title</div>
  </div>
</div>

<!-- SEMANTIC — structure has meaning -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
    <figure>
      <img src="diagram.png" alt="Architecture diagram showing three-tier layout">
      <figcaption>Three-tier architecture</figcaption>
    </figure>
  </article>
  <aside>Related articles</aside>
</main>
<footer>
  <p><small>© 2025 HCL Technologies</small></p>
</footer>
```

---

## Q48. How do you optimize CSS for performance?

### Interview-Ready Definition

> "CSS performance optimization includes minimizing CSS size, reducing rendering overhead, and ensuring critical styles load first. Key techniques are: minifying and removing unused CSS, using `transform` and `opacity` for animations (they don't trigger layout), implementing Critical CSS for above-the-fold content, using CSS containment, and avoiding deeply nested selectors."

```css
/* Use transform/opacity for animations — GPU-accelerated, no reflow */
.animating-box {
  transition: transform 0.3s ease; /* ✅ GPU composited */
  /* NOT: left/top/width/height — these cause expensive layout recalculation */
}

/* CSS containment — tell browser this element's layout is isolated */
.widget {
  contain: layout style; /* Reduces scope of style calculations */
}

/* Critical CSS — inline in <head> for above-fold content */
/* <style> body { font-family: sans-serif; } .hero { ... } </style> */
/* Then load full stylesheet asynchronously */
<link rel="stylesheet" href="full.css" media="print" onload="this.media='all'">

/* Avoid deeply nested selectors */
/* BAD — slow, hard to override */
.page .sidebar .widget .widget-title a:hover { color: blue; }

/* GOOD — flat, fast */
.widget-title-link:hover { color: blue; }
```

---

# SECTION 4: SYSTEM DESIGN (6 Questions)

---

## Q49. Design a scalable React application architecture for a large enterprise app.

### Interview-Ready Definition

> "A scalable React architecture for enterprise applications uses feature-based folder organization, a shared component library, a centralized state management strategy, an abstracted API layer, and automated CI/CD pipelines. The goal is to enable multiple teams to work independently without stepping on each other, while maintaining consistency across the application."

### Folder Structure

```
src/
├── features/           # Feature modules (team boundaries)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── api/
│   └── dashboard/
├── shared/             # Shared across features
│   ├── components/     # Design system components
│   ├── hooks/          # Global custom hooks
│   ├── utils/
│   └── types/
├── services/           # API abstraction layer
├── store/              # Global state (Redux/Zustand)
└── pages/              # Route-level components (lazy loaded)
```

### Key Architectural Decisions

* **State** : Redux Toolkit for complex global state; React Query for server state; local `useState` for UI state.
* **Routing** : React Router with route-level code splitting.
* **API Layer** : Axios instance with interceptors for auth, error handling, and retry logic.
* **Component Library** : Storybook for documentation and visual testing.
* **Monorepo** : Nx or Turborepo for multi-app projects sharing the same component library.
* **Testing** : RTL + Jest for unit/integration; Cypress for E2E; Chromatic for visual regression.

---

## Q50. How do you improve web app performance? (Core Web Vitals focus)

### Interview-Ready Definition

> "Core Web Vitals are Google's metrics for user experience: LCP (Largest Contentful Paint — loading), INP (Interaction to Next Paint — interactivity), and CLS (Cumulative Layout Shift — visual stability). Improving them involves optimizing images, reducing JavaScript bundle size, deferring non-critical resources, and ensuring layout stability by reserving space for dynamic content."

### LCP Optimization (target < 2.5s)

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/hero.webp">

<!-- Lazy load below-fold images -->
<img src="product.webp" loading="lazy" width="400" height="300" alt="Product">

<!-- Use modern image formats -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

### INP/FID Optimization (target < 200ms)

* Code split aggressively — reduce initial JS bundle size.
* Defer non-critical JS with `async`/`defer`.
* Move heavy computation to Web Workers.
* Use `useTransition` in React for non-urgent state updates.

### CLS Optimization (target < 0.1)

```css
/* Always set explicit dimensions on images */
img { width: 400px; height: 300px; } /* or aspect-ratio */

/* Reserve space for ads, embeds */
.ad-slot { min-height: 250px; }
```

---

## Q51. Explain micro-frontends — when and how would you implement them?

### Interview-Ready Definition

> "Micro-frontends extend the microservices concept to the frontend — splitting a large application into smaller, independently developed and deployed frontend applications. Each team owns their piece from UI to API. They are best suited for organizations with 30+ frontend engineers, multiple autonomous teams, and the need for independent release cycles. The most modern approach uses Module Federation in Webpack 5."

### When to Use (and When Not To)

| Use micro-frontends when...    | Don't use when...                   |
| ------------------------------ | ----------------------------------- |
| Multiple large teams           | Small/medium team                   |
| Independent deployments needed | Single team, cohesive product       |
| Legacy + new tech integration  | Shared state is complex             |
| Different tech stacks per team | Performance overhead not acceptable |

### Module Federation Example

```javascript
// webpack.config.js — Host app
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    checkout: 'checkout@http://localhost:3001/remoteEntry.js',
    analytics: 'analytics@http://localhost:3002/remoteEntry.js',
  },
});

// Usage in Host
const CheckoutWidget = React.lazy(() => import('checkout/Widget'));
```

---

## Q52. How would you implement authentication and authorization in a React app?

### Interview-Ready Definition

> "Authentication verifies who the user is; authorization determines what they can access. In a React app, I implement auth using JWTs stored in HTTP-only cookies (never localStorage — XSS vulnerability), with an auth context for app-wide state, protected routes for access control, and interceptors for automatic token refresh. Authorization is enforced both client-side (UI elements) and server-side (API endpoints)."

### Implementation Pattern

```jsx
// Auth Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    // Token is in HTTP-only cookie — set by server
    setUser(data.user);
  };

  const logout = () => {
    authService.logout(); // Clears cookie server-side
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Protected Route
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && !user.roles.includes(requiredRole)) return <Navigate to="/unauthorized" />;
  return children;
};

// Axios interceptor for token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await authService.refreshToken(); // Get new access token
      return axiosInstance(error.config); // Retry original request
    }
    return Promise.reject(error);
  }
);
```

---

## Q53. How do you handle API calls, loading states, and error states in React?

### Interview-Ready Definition

> "I use TanStack Query (React Query) for all server state management — it handles caching, background refetching, loading and error states, and pagination out of the box. For custom cases, I wrap API logic in custom hooks that expose `data`, `isLoading`, `error`, and `refetch`. A centralized Axios instance with interceptors handles authentication and global error reporting."

```jsx
// TanStack Query approach — clean, powerful
const { data: users, isLoading, error, refetch } = useQuery({
  queryKey: ['users', filters],
  queryFn: () => fetchUsers(filters),
  staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  retry: 2,                  // Retry failed requests twice
});

if (isLoading) return <SkeletonList />;
if (error) return <ErrorMessage error={error} onRetry={refetch} />;
return <UserList users={users} />;

// Mutation with optimistic update
const { mutate: updateUser } = useMutation({
  mutationFn: (updates) => patchUser(updates),
  onMutate: async (updates) => {
    // Optimistically update cache before server responds
    await queryClient.cancelQueries(['users']);
    queryClient.setQueryData(['users'], old => old.map(u =>
      u.id === updates.id ? { ...u, ...updates } : u
    ));
  },
  onError: (err, variables, context) => {
    queryClient.setQueryData(['users'], context.previousUsers); // Rollback
  },
  onSettled: () => queryClient.invalidateQueries(['users']),
});
```

---

## Q54. Describe your approach to building a reusable component library.

### Interview-Ready Definition

> "A reusable component library starts with design tokens — shared constants for colors, spacing, typography — implemented as CSS custom properties. Components are built with accessibility, flexibility, and semantic versioning in mind. Storybook provides living documentation. The library is published to an internal npm registry and versioned carefully to avoid breaking changes for consuming teams."

### Process & Principles

1. **Design Tokens First** — Define color palette, spacing scale, typography in CSS variables.
2. **Component API Design** — Flexible props; favor composition over configuration.
3. **Accessibility Built-in** — ARIA roles, keyboard navigation, focus management in every component.
4. **Storybook** — Document every component with all variants, states, and usage examples.
5. **Testing** — RTL unit tests + visual regression with Chromatic.
6. **Semantic Versioning** — `MAJOR.MINOR.PATCH`. Breaking API changes = major bump.
7. **Changelog** — Every release documents what changed and migration steps.

```jsx
// Good component API — flexible, composable
const Button = ({
  variant = 'primary',      // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'medium',          // 'small' | 'medium' | 'large'
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...rest                   // Spread HTML button props
}) => (
  <button
    className={`btn btn--${variant} btn--${size}`}
    disabled={disabled || isLoading}
    aria-busy={isLoading}
    {...rest}
  >
    {leftIcon && <span className="btn__icon">{leftIcon}</span>}
    {isLoading ? <Spinner size="small" /> : children}
    {rightIcon && <span className="btn__icon">{rightIcon}</span>}
  </button>
);
```

---

# SECTION 5: LEADERSHIP (6 Questions)

---

## Q55. How do you conduct code reviews? What do you look for?

### Interview-Ready Definition

> "Effective code reviews are about knowledge transfer, catching bugs, and improving code quality — not about finding fault. I look for correctness, readability, performance, security, and test coverage. I use a constructive, questioning tone ('Have you considered...?' rather than 'This is wrong'). Automated tools handle style enforcement, so human review focuses on logic and design decisions."

### Code Review Checklist

**Correctness:** Does it do what it's supposed to? Are edge cases handled? Are error states managed?

**React-Specific:** No unnecessary re-renders, proper cleanup in useEffect, keys in lists, no prop drilling when Context would be cleaner, correct dependency arrays.

**Security:** No sensitive data in localStorage or logs, user inputs sanitized, no XSS vulnerabilities (dangerouslySetInnerHTML used safely), proper CORS handling.

**Performance:** No heavy computations in render, images optimized, no memory leaks.

**Tests:** Are tests included? Do they test behavior, not implementation?

**Naming:** Are variable, function, and component names self-explanatory?

### Code Review Tone Examples

```
❌ "This is wrong, you should use useCallback here."
✅ "This callback is created fresh on every render — would wrapping it in useCallback help here? The child component is memoized, so it might avoid some re-renders."

❌ "Why didn't you clean up this effect?"
✅ "I noticed the subscription in useEffect doesn't have a cleanup return. If the component unmounts before the async call resolves, we might get a memory leak — worth adding a cleanup?"
```

---

## Q56. How do you estimate and break down a React project for your team?

### Interview-Ready Definition

> "I estimate by first fully understanding requirements, then breaking work into small, independently completable tasks. I use story points for relative complexity (not hours), add 20-30% buffer for unknowns, and identify dependencies and blockers early. Daily standups surface issues, and I re-estimate mid-sprint if scope changes significantly."

### Estimation Process

1. **Discovery** — Review designs, discuss requirements, identify ambiguities. Resolve before estimating.
2. **Component Breakdown** — List every UI component needed. Atomic → Molecular → Organism (Atomic Design).
3. **API Contract** — Identify API endpoints needed. Flag unknowns (BE dependency).
4. **Story Sizing:**
   * 1 point: Simple component, no logic (e.g., Avatar, Badge)
   * 2 points: Component with state/basic logic (e.g., Toggle, Accordion)
   * 3 points: Complex component with API call (e.g., Search with debounce)
   * 5 points: Feature with multiple components + state management
   * 8+ points: Should be broken down further
5. **Buffer** — Add 20% for unknowns, bug fixes, code reviews, deployment.
6. **Definition of Done** — Code reviewed, tests written, accessibility checked, deployed to staging.

---

## Q57. How do you handle technical debt in a codebase?

### Interview-Ready Definition

> "Technical debt is inevitable — the question is whether it's conscious and managed or unconscious and accumulating silently. I maintain a debt backlog, categorize issues by impact on delivery, and negotiate dedicated time with stakeholders. I apply the Boy Scout Rule — always leave code a little better than you found it — and use metrics like bundle size, test coverage, and Lighthouse scores as objective debt indicators."

### Debt Management Strategy

**Categorize debt by impact:**

* 🔴  **Critical** : Causes bugs, blocks features, security risks — fix immediately.
* 🟡  **Significant** : Slows development, hard to extend — schedule in upcoming sprints.
* 🟢  **Cosmetic** : Naming, formatting, dead code — fix opportunistically.

**Make debt visible:**

```markdown
## Tech Debt Backlog (example)
| Issue | Impact | Effort | Priority |
|-------|--------|--------|----------|
| Migrate class components to hooks | Medium | Large | 🟡 |
| Remove unused Redux actions | Low | Small | 🟢 |
| Upgrade React Query v3 to v5 | High | Medium | 🟡 |
| Fix XSS vulnerability in comment rendering | High | Small | 🔴 |
```

**Negotiate time:** Frame debt reduction as a business benefit — "Fixing this will reduce our feature delivery time by 20%" is more compelling than "the code is messy."

---

## Q58. Describe how you would mentor junior developers on your team.

### Interview-Ready Definition

> "Effective mentoring is about creating the right environment for growth — not just transferring knowledge. I combine structured pairing sessions, constructive code review feedback, weekly 1:1s focused on their goals, and progressively challenging assignments. I prioritize psychological safety: juniors should never feel embarrassed to ask questions."

### Mentoring Framework

**Structured Onboarding (Week 1-2):**

* Codebase walkthrough — explain architecture decisions, not just what, but why.
* Assign a small, well-defined first task with a clear PR to review as a model.
* Pair program through the first bug fix together.

**Ongoing Development:**

* Weekly 1:1s: half technical Q&A, half career goals discussion.
* Progressive challenges: start with isolated components, move to features with API calls, then to architectural decisions.
* Code review mentoring: explain the reasoning behind every suggestion.
* "Rubber duck" culture: encourage them to explain the problem out loud before asking — often solves itself.

**Knowledge Sharing:**

* Internal tech talks — juniors present a topic they just learned.
* Shared Notion/Confluence pages for common patterns and gotchas.
* Open Slack channel for questions — public, so everyone benefits from answers.

---

## Q59. How do you handle disagreements on technical decisions with peers or management?

### Interview-Ready Definition

> "Technical disagreements are healthy — they surface trade-offs that might otherwise be missed. My approach is to lead with data and concrete examples, understand the other person's constraints, propose a time-boxed spike or proof-of-concept to validate assumptions objectively, and once a decision is made, commit to it fully — even if I disagreed — and document the reasoning for future reference."

### Process

1. **Listen first** — understand their position and constraints (cost, timeline, team familiarity).
2. **State your concern clearly** — "My concern is X because it will cause Y — I've seen it in Z project."
3. **Bring data** — benchmarks, past incidents, industry standards, security implications.
4. **Propose a PoC** — "Can we spend 2 days building a prototype of both approaches and compare?"
5. **Document the decision** — Use an Architectural Decision Record (ADR):

```markdown
## ADR-007: State Management — Redux vs Zustand

**Status:** Decided
**Context:** New dashboard feature needs shared state across 10+ components.
**Options Considered:**
- Redux Toolkit: Team familiar, powerful devtools, verbose
- Zustand: Lightweight, less boilerplate, smaller learning curve

**Decision:** Zustand
**Reasoning:** Team was spending 40% of feature time on Redux boilerplate.
Zustand's API is simpler for our use case. Can add Redux if complexity grows.
**Consequences:** Need team training session. Existing Redux code stays until migration.
```

---

## Q60. How do you ensure accessibility (a11y) standards across a React project?

### Interview-Ready Definition

> "Accessibility is not a feature you add at the end — it must be built into the development process from day one. I enforce it through semantic HTML as the foundation, ARIA only when HTML semantics aren't sufficient, automated linting with `eslint-plugin-jsx-a11y`, programmatic testing with `axe-core`, manual keyboard and screen reader testing, and making accessibility part of the Definition of Done."

### Accessibility Checklist

**Semantic HTML (Foundation)**

```jsx
// ❌ Wrong — div with click handler, not keyboard accessible
<div onClick={handleDelete}>Delete</div>

// ✅ Correct — button is keyboard and screen-reader accessible
<button onClick={handleDelete}>Delete</button>
```

**ARIA — Only When Needed**

```jsx
// Use ARIA to enhance, not replace, semantic HTML
<button
  aria-label="Delete item"  /* When text is not descriptive enough */
  aria-pressed={isActive}   /* For toggle buttons */
  aria-expanded={isOpen}    /* For accordion/dropdown */
  aria-describedby="error-msg"
/>
<span id="error-msg" role="alert">This field is required</span>
```

**Keyboard Navigation**

```jsx
// Trap focus inside modals
const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (isOpen) modalRef.current.focus();
  }, [isOpen]);

  return (
    <div role="dialog" aria-modal="true" ref={modalRef} tabIndex={-1}>
      {/* Content */}
    </div>
  );
};
```

**Automated Testing**

```jsx
import { axe } from 'jest-axe';
test('LoginForm has no accessibility violations', async () => {
  const { container } = render(<LoginForm />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

**WCAG Standards:**

* Color contrast: 4.5:1 minimum for normal text (AA level).
* Focus indicators: visible focus ring on all interactive elements.
* Alt text: every `<img>` has meaningful `alt` attribute.
* Form labels: every input has an associated `<label>` or `aria-label`.

---

# QUICK REFERENCE — Most Asked Topics at HCL

## HCL Interview Pattern (Based on Glassdoor Reports)

1. **Round 1 (Technical)** — Deep React, JavaScript, CSS questions. Expect code output questions and live coding.
2. **Round 2 (Technical Lead)** — System design, architecture, past project discussions.
3. **Round 3 (HR/Leadership)** — Behavioural, leadership style, salary negotiation.

## Top 10 Must-Know Topics

1. Virtual DOM + Reconciliation + React Fiber
2. All React Hooks — especially useEffect cleanup, useMemo, useCallback
3. Redux flow — actions, reducers, middleware, selector
4. JavaScript Event Loop + Promises + async/await
5. CSS Flexbox vs Grid + Responsive Design
6. Performance optimization — React.memo, code splitting, virtualization
7. Closures + Stale closure bug in React
8. CSS Specificity + Cascade
9. Authentication patterns (JWT, HTTP-only cookies, protected routes)
10. Leadership — code review approach, mentoring, technical decisions

---

*Prepared for: HCL Tech Senior Technical Lead — React.js, HTML, CSS Interview*
*Experience Level: 5 Years | Questions: 60 | Categories: 5*
