# Deloitte USI — Top 50 Frontend Interview Questions & Answers
### For 5 Years Experience | React.js / Next.js / JavaScript
### Written in Simple, Beginner-Friendly Language

---

> **How to use this guide:** Each question has a plain English explanation, a real-world analogy, and a code example where needed. Even if you're a beginner, you should be able to understand every answer here.

---

## Table of Contents

1. [JavaScript (Questions 1–12)](#javascript)
2. [React (Questions 13–25)](#react)
3. [Next.js (Questions 26–32)](#nextjs)
4. [CSS / HTML (Questions 33–40)](#csshtml)
5. [DSA / Logic (Questions 41–46)](#dsa)
6. [System Design (Questions 47–50)](#system-design)

---

## JavaScript

---

### Q1. Explain event loop, call stack, microtasks vs macrotasks with an example ⭐ Frequently Asked

**Simple explanation:**

JavaScript runs one thing at a time (it's single-threaded). Imagine a chef in a kitchen — the chef can only cook one dish at a time. But they have helpers (the browser) who can do side tasks like setting a timer or fetching data.

- **Call Stack** = the chef's current task list (last in, first out)
- **Event Loop** = the manager who keeps checking: "Is the chef free? Is there something waiting to be done?"
- **Microtasks** = urgent tasks (like Promises) — done BEFORE the next macro task
- **Macrotasks** = regular tasks (like setTimeout) — done AFTER microtasks

**Execution order: Call Stack → Microtasks → Macrotasks**

```javascript
console.log("1 - Start");             // Call Stack

setTimeout(() => {
  console.log("4 - setTimeout");      // Macrotask (runs last)
}, 0);

Promise.resolve().then(() => {
  console.log("3 - Promise");         // Microtask (runs before macrotask)
});

console.log("2 - End");               // Call Stack

// Output order: 1, 2, 3, 4
```

**Real world analogy:** You're at a restaurant. You place an order (macrotask). But while waiting, the waiter brings you water immediately (microtask). Water comes before food, even though both were requested.

---

### Q2. What is closure? Show a real bug caused by stale closure ⭐ Frequently Asked

**Simple explanation:**

A closure is when a function "remembers" the variables from its outer scope, even after that outer function has finished running.

Think of it like this: You moved out of your parents' house (outer function finished), but you still remember your home address (the variable).

```javascript
// Basic closure example
function makeCounter() {
  let count = 0;             // This variable is "remembered"
  return function() {
    count++;
    console.log(count);
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

**Stale closure bug (very common in React useEffect):**

```javascript
// BUG: Stale closure — count is always 0
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // This always logs 0! (stale closure)
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps means count is captured at 0 and never updated
}

// FIX: Use functional update or add count to dependency array
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1); // Use previous value instead
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

---

### Q3. Implement debounce and throttle from scratch ⭐ Frequently Asked

**Simple explanation:**

- **Debounce** = "Wait until the person stops typing, THEN search." (fires once after a pause)
- **Throttle** = "Only allow one search every 2 seconds no matter how fast they type." (fires at regular intervals)

**Analogy:** Debounce is like an elevator door that waits until everyone steps in before closing. Throttle is like a bus that departs every 10 minutes no matter how many people are waiting.

```javascript
// DEBOUNCE — waits for the user to stop, then fires
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);               // Reset the timer each time
    timer = setTimeout(() => {
      fn.apply(this, args);            // Fire after the pause
    }, delay);
  };
}

// Usage
const handleSearch = debounce((value) => {
  console.log("Searching for:", value);
}, 500);

// THROTTLE — fires at most once per interval
function throttle(fn, limit) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= limit) {     // Only fire if enough time passed
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log("Scroll event fired");
}, 1000);
```

---

### Q4. Difference between var, let, const — hoisting & TDZ

**Simple explanation:**

| | var | let | const |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisted? | Yes (as undefined) | Yes (but not usable) | Yes (but not usable) |
| Re-assignable? | Yes | Yes | No |
| Re-declarable? | Yes | No | No |

**TDZ (Temporal Dead Zone):** The period between when `let`/`const` is hoisted and when it's actually defined. Accessing it in this period throws a ReferenceError.

```javascript
// var — hoisted and initialized as undefined
console.log(name); // undefined (no error)
var name = "Ravi";

// let — hoisted but NOT usable (TDZ)
console.log(age);  // ReferenceError: Cannot access 'age' before initialization
let age = 25;

// const — must be assigned at declaration, cannot be changed
const PI = 3.14;
PI = 3;  // TypeError: Assignment to constant variable

// Block scope example
{
  let x = 10;
  var y = 20;
}
console.log(y); // 20 (var leaks out)
console.log(x); // ReferenceError (let stays inside block)
```

---

### Q5. Implement Promise.all, Promise.race, Promise.allSettled from scratch ⭐ Frequently Asked

**Simple explanation:**

- **Promise.all** — Wait for ALL promises. If even one fails, the whole thing fails.
- **Promise.race** — Whichever promise finishes first (success or fail), use that result.
- **Promise.allSettled** — Wait for ALL promises. Show success/failure for each one.

**Analogy:** Imagine ordering food from 3 restaurants:
- `.all` = Only eat when ALL restaurants deliver (one late = whole dinner ruined)
- `.race` = Eat from whichever restaurant delivers first
- `.allSettled` = Wait for all, then see which ones arrived and which ones didn't

```javascript
// Custom Promise.all
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject); // One failure = entire rejection
    });
  });
}

// Custom Promise.race
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}

// Custom Promise.allSettled
function myPromiseAllSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: "fulfilled", value }))
        .catch(reason => ({ status: "rejected", reason }))
    )
  );
}
```

---

### Q6. What is prototypal inheritance? How does the prototype chain work?

**Simple explanation:**

In JavaScript, every object has a hidden link to another object called its "prototype." If you ask an object for a property it doesn't have, JavaScript looks at its prototype, then that prototype's prototype, and so on — this chain is the **prototype chain**.

**Analogy:** If you don't have a pen, you ask your friend. If your friend doesn't have one, they ask their friend. This chain continues until someone has a pen (or nobody does — which is `null`).

```javascript
// Every function has a .prototype property
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound."

// dog doesn't have 'speak' directly, but JavaScript finds it via the chain:
// dog -> Animal.prototype -> Object.prototype -> null

// Modern syntax (ES6 Classes — same thing under the hood)
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`); // Overrides parent method
  }
}

const d = new Dog("Rex");
d.speak(); // "Rex barks."
```

---

### Q7. Explain currying and write a curry() utility function

**Simple explanation:**

Currying transforms a function that takes multiple arguments into a series of functions that each take one argument.

**Analogy:** Instead of ordering a complete meal all at once (`order("burger", "fries", "coke")`), you place one item at a time: `order("burger")("fries")("coke")`.

```javascript
// Without currying
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// With currying
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3); // 6

// Generic curry() utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);       // Enough args? Call the function
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs)); // Wait for more
    };
  };
}

// Usage
const add = curry((a, b, c) => a + b + c);
console.log(add(1)(2)(3));   // 6
console.log(add(1, 2)(3));   // 6
console.log(add(1)(2, 3));   // 6
```

---

### Q8. Deep clone an object without JSON.parse/stringify ⭐ Frequently Asked

**Simple explanation:**

Copying an object with `=` only copies the reference (like copying a link to a Google Doc, not the Doc itself). Deep cloning creates a completely separate copy.

`JSON.parse(JSON.stringify(obj))` has limitations — it breaks for functions, `undefined`, `Date`, circular references, etc.

```javascript
function deepClone(obj) {
  // Handle null, primitives
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Date
  if (obj instanceof Date) return new Date(obj.getTime());

  // Handle Array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Handle plain Object
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]); // Recursively clone each value
    }
  }
  return cloned;
}

// Test
const original = { name: "Ravi", address: { city: "Pune" } };
const clone = deepClone(original);
clone.address.city = "Mumbai";

console.log(original.address.city); // "Pune" — unchanged!
console.log(clone.address.city);    // "Mumbai"
```

---

### Q9. Flatten a deeply nested array without Array.flat()

**Simple explanation:**

Sometimes arrays contain arrays inside arrays (like a folder inside a folder inside a folder). Flattening means pulling everything out into one flat list.

```javascript
// Input:  [1, [2, [3, [4, 5]]]]
// Output: [1, 2, 3, 4, 5]

function flatten(arr) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      return result.concat(flatten(item)); // Go deeper if it's an array
    }
    return result.concat(item);            // Otherwise just add it
  }, []);
}

console.log(flatten([1, [2, [3, [4, 5]]]])); // [1, 2, 3, 4, 5]

// Iterative approach using a stack
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);  // Push inner items back to process
    } else {
      result.unshift(item);
    }
  }
  return result;
}
```

---

### Q10. What are WeakMap and WeakSet? Practical use cases?

**Simple explanation:**

- **Map** = A key-value store where keys can be anything. Keys are kept forever.
- **WeakMap** = Same, but keys MUST be objects, and if the object is no longer used anywhere else, it gets automatically garbage collected (deleted from memory).

**Analogy:** A regular Map is like a permanent storage unit — items stay forever. A WeakMap is like a locker that automatically empties when you stop visiting the building.

```javascript
// WeakMap use case: storing private data for an object
const privateData = new WeakMap();

class User {
  constructor(name, password) {
    // Store sensitive data separately — not on the object itself
    privateData.set(this, { password });
    this.name = name;
  }
  checkPassword(input) {
    return privateData.get(this).password === input;
  }
}

const user = new User("Ravi", "secret123");
console.log(user.name);                    // "Ravi"
console.log(user.password);               // undefined (private!)
console.log(user.checkPassword("secret123")); // true

// When 'user' is garbage collected, the WeakMap entry is also cleared automatically
```

---

### Q11. Explain async/await error handling — try/catch vs .catch()

**Simple explanation:**

When doing async operations (like fetching data from an API), things can go wrong (network error, server down). We need to handle these failures gracefully.

```javascript
// Method 1: try/catch with async/await (cleaner, recommended)
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null; // Return fallback value
  }
}

// Method 2: .catch() chaining
fetch("/api/users/1")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

// Handling multiple async operations
async function loadDashboard() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(1),
      fetchPosts(1),
      fetchComments(1),
    ]);
    return { user, posts, comments };
  } catch (error) {
    console.error("Dashboard load failed:", error);
  }
}
```

---

### Q12. Write a memoize() function that caches results ⭐ Frequently Asked

**Simple explanation:**

Memoization is like having a memory. If you've calculated something before with the same inputs, instead of recalculating, you return the saved result instantly.

**Analogy:** If someone asks you "What is 1234 × 5678?", you calculate it the first time. If they ask again, you just remember the answer — you don't redo the math.

```javascript
function memoize(fn) {
  const cache = new Map();  // Store results here

  return function(...args) {
    const key = JSON.stringify(args);  // Create a unique key from arguments

    if (cache.has(key)) {
      console.log("Cache hit! Returning saved result.");
      return cache.get(key);           // Return cached result
    }

    const result = fn.apply(this, args);
    cache.set(key, result);            // Save result for next time
    return result;
  };
}

// Test with slow Fibonacci
function slowFib(n) {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(slowFib);
console.log(fastFib(40)); // Calculated (slow first time)
console.log(fastFib(40)); // Cache hit! Instant second time
```

---

## React

---

### Q13. Explain Virtual DOM and React's reconciliation/diffing algorithm ⭐ Frequently Asked

**Simple explanation:**

The real DOM (the actual HTML on screen) is slow to update. React uses a **Virtual DOM** — a lightweight JavaScript copy of the real DOM — to figure out the minimum changes needed.

**Analogy:** Instead of repainting your entire house every time you move furniture, you first plan the changes on paper (Virtual DOM), then only move the specific pieces that need moving.

**How it works:**
1. You update state → React creates a new Virtual DOM tree
2. React **diffs** (compares) the new tree vs the old tree
3. React calculates the minimum number of changes needed
4. Only those changes are applied to the real DOM

```javascript
// React handles this automatically — you just write JSX
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>           {/* Only this <p> re-renders, not the whole page */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Key rule:** Always use unique `key` props in lists so React can track which items changed:

```javascript
// BAD — React can't tell which item changed
{items.map((item, index) => <li key={index}>{item}</li>)}

// GOOD — React knows exactly which item is which
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

---

### Q14. useMemo vs useCallback — differences and when to use each ⭐ Frequently Asked

**Simple explanation:**

Both are performance optimization hooks that prevent unnecessary recalculations:

- **useMemo** = Remembers a **calculated value**
- **useCallback** = Remembers a **function**

**Analogy:**
- `useMemo` is like saving the final answer in your notebook so you don't recalculate it
- `useCallback` is like bookmarking a calculation method so you don't recreate it

```javascript
import { useMemo, useCallback, useState } from 'react';

function ProductList({ products, onSelect }) {
  // useMemo: only recalculate expensive total when 'products' changes
  const totalPrice = useMemo(() => {
    console.log("Calculating total...");
    return products.reduce((sum, p) => sum + p.price, 0);
  }, [products]); // Recalculate only when products changes

  // useCallback: only recreate this function when 'onSelect' changes
  const handleClick = useCallback((id) => {
    onSelect(id);
  }, [onSelect]); // Same function reference = no unnecessary child re-renders

  return (
    <div>
      <p>Total: ₹{totalPrice}</p>
      {products.map(p => (
        <button key={p.id} onClick={() => handleClick(p.id)}>
          {p.name}
        </button>
      ))}
    </div>
  );
}
```

**When to use:**
- `useMemo` → Expensive calculations (sorting, filtering large arrays)
- `useCallback` → Functions passed to child components wrapped in `React.memo`
- **Don't overuse!** The optimization itself has a small cost.

---

### Q15. Build a custom useDebounce hook ⭐ Frequently Asked

**Simple explanation:**

Instead of searching every time the user presses a key, we wait until they stop typing for a moment. This custom hook makes that easy to reuse across components.

```javascript
import { useState, useEffect } from 'react';

// The custom hook
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: if value changes before timer fires, reset it
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// How to use it in a component
function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Wait 500ms after typing stops

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Searching for:", debouncedQuery); // API call here
    }
  }, [debouncedQuery]); // Only runs when debounced value changes

  return (
    <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

---

### Q16. How do Error Boundaries work? Can hooks be used inside them?

**Simple explanation:**

An Error Boundary is like a safety net in React. If a component crashes (throws an error during render), the Error Boundary catches it and shows a friendly fallback UI instead of crashing the entire app.

**Analogy:** Like a fuse box in your house — if one circuit has a problem, only that circuit turns off. The rest of the house still has power.

```javascript
// Error Boundaries must be CLASS components (hooks don't work here)
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when a child component throws an error
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Good place to log the error to a service
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please refresh the page.</h2>;
    }
    return this.props.children; // Render children normally if no error
  }
}

// Usage — wraps the part that might crash
function App() {
  return (
    <ErrorBoundary>
      <UserProfile />   {/* If this crashes, ErrorBoundary catches it */}
    </ErrorBoundary>
  );
}
```

**Can hooks be used inside Error Boundaries?** No. Error Boundaries must be class components because they rely on `getDerivedStateFromError` and `componentDidCatch` lifecycle methods, which have no hook equivalents yet.

---

### Q17. Implement a Higher-Order Component for authentication guard ⭐ Frequently Asked

**Simple explanation:**

A Higher-Order Component (HOC) is a function that takes a component and returns a new, enhanced component. Think of it like a decorator or wrapper.

**Analogy:** A VIP badge check at a concert. Before you enter any VIP area (component), the security (HOC) checks your badge. If you have it, you get in. If not, you're redirected.

```javascript
// The HOC — takes a component, returns a protected version
function withAuth(WrappedComponent) {
  return function AuthGuard(props) {
    const isLoggedIn = localStorage.getItem("token"); // Check authentication

    if (!isLoggedIn) {
      // Not logged in? Redirect to login page
      return <Navigate to="/login" replace />;
    }

    // Logged in? Render the original component with all its props
    return <WrappedComponent {...props} />;
  };
}

// Usage — wrap any component that needs protection
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile = withAuth(Profile);

// In your router
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/profile" element={<ProtectedProfile />} />
    </Routes>
  );
}
```

---

### Q18. What is React.memo? When does it NOT help performance?

**Simple explanation:**

`React.memo` wraps a component so that it only re-renders if its **props actually changed**. By default, when a parent re-renders, ALL its children re-render too — even if nothing changed for them.

```javascript
// Without React.memo — re-renders even when name didn't change
function ChildCard({ name }) {
  console.log("ChildCard rendered");
  return <div>{name}</div>;
}

// With React.memo — skips re-render if name prop is same
const ChildCard = React.memo(function({ name }) {
  console.log("ChildCard rendered");
  return <div>{name}</div>;
});

// When does React.memo NOT help?
// 1. When you pass a new object/array/function as a prop on every render
function Parent() {
  const [count, setCount] = useState(0);

  // BAD: New object created on every render → memo is useless
  const style = { color: "red" };

  // FIX: Move outside component or use useMemo
  // const style = useMemo(() => ({ color: "red" }), []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <ChildCard name="Ravi" style={style} />
    </>
  );
}
```

**When React.memo helps:** Pure display components that receive primitive props (strings, numbers, booleans).

---

### Q19. Explain useReducer vs useState — which for complex state?

**Simple explanation:**

- **useState** = Simple counter, toggle, single value. Like a light switch.
- **useReducer** = Multiple related values, complex logic, multiple actions. Like a traffic control system.

```javascript
// useState — simple toggle
const [isOpen, setIsOpen] = useState(false);

// useReducer — shopping cart with multiple actions
const initialState = { items: [], total: 0, loading: false };

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const item = state.items.find(i => i.id === action.payload);
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - item.price,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <div>
      <p>Total: ₹{state.total}</p>
      <button onClick={() => dispatch({ type: "ADD_ITEM", payload: { id: 1, name: "Shirt", price: 500 } })}>
        Add Shirt
      </button>
    </div>
  );
}
```

**Rule of thumb:** Use `useReducer` when you have 3+ related state values or complex update logic.

---

### Q20. What is prop drilling? How do you solve it — Context vs Redux? ⭐ Frequently Asked

**Simple explanation:**

Prop drilling is when you pass data through many layers of components, even though the middle layers don't need it — they're just passing it along.

**Analogy:** Sending a letter through 5 people just to reach the 6th person. The people in between just pass it along without reading it.

```javascript
// PROBLEM: Prop drilling — theme passed through every layer
function App() {
  const theme = "dark";
  return <Page theme={theme} />;
}
function Page({ theme }) {
  return <Header theme={theme} />;    // Page doesn't use theme, just passes it
}
function Header({ theme }) {
  return <Button theme={theme} />;   // Header doesn't use theme, just passes it
}
function Button({ theme }) {
  return <button className={theme}>Click</button>; // Finally used here!
}

// SOLUTION 1: Context API (good for small-medium apps)
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}
function Button() {
  const theme = useContext(ThemeContext); // Access directly — no drilling!
  return <button className={theme}>Click</button>;
}

// SOLUTION 2: Redux (good for large apps with complex state)
// useSelector hook to read, useDispatch to update
```

---

### Q21. Build a custom useFetch hook with loading, error, data states ⭐ Frequently Asked

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component

    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { isMounted = false; }; // Cleanup
  }, [url]);

  return { data, loading, error };
}

// Usage in a component
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{data?.name}</div>;
}
```

---

### Q22. Explain React Fiber and Concurrent Mode

**Simple explanation:**

**React Fiber** (introduced in React 16) is a complete rewrite of React's internal rendering engine. It allows React to:
- **Pause** rendering work and come back to it later
- **Prioritize** urgent updates (like user input) over less urgent ones (like loading data)
- **Split** large render work into small chunks

**Concurrent Mode** builds on Fiber to let React work on multiple tasks simultaneously without blocking the UI.

**Analogy:** Old React was like a chef who HAD to finish cooking a 10-course meal before doing anything else. Fiber is like a chef who can pause mid-meal to quickly make a snack (urgent task), then return to the main meal.

```javascript
// Concurrent features in React 18
import { useTransition, useDeferredValue } from 'react';

function SearchResults({ query }) {
  // Mark search results update as non-urgent
  const deferredQuery = useDeferredValue(query);

  // isPending = true while the deferred update is happening
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    startTransition(() => {
      // This update is marked as non-urgent — UI stays responsive
      setQuery(e.target.value);
    });
  };

  return (
    <>
      {isPending && <Spinner />}
      <Results query={deferredQuery} />
    </>
  );
}
```

---

### Q23. What are React Portals? Show a modal implementation

**Simple explanation:**

Normally, React renders components inside their parent's DOM node. Portals let you render a component outside its parent — like rendering a modal at the top of `<body>` even though the component that triggers it is deep inside the page.

**Analogy:** You're in a hotel room (nested component) but you want to post a notice on the hotel entrance (top-level DOM). A Portal lets you do that.

```javascript
import ReactDOM from 'react-dom';

// Modal component that renders at document.body level
function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "white", padding: "2rem", borderRadius: "8px" }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body  // Renders directly inside <body>, outside parent hierarchy
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Hello from Portal!</h2>
        </Modal>
      )}
    </div>
  );
}
```

---

### Q24. useEffect cleanup — when and why is it needed? ⭐ Frequently Asked

**Simple explanation:**

When a component unmounts (leaves the screen), things it started (like timers, subscriptions, event listeners) don't automatically stop. The cleanup function inside `useEffect` is where you stop those things to prevent memory leaks.

**Analogy:** When you leave a hotel room, you turn off the lights, AC, and TV. You don't leave them running after you're gone. The cleanup function is that "turning off" step.

```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    console.log("Connecting to room:", roomId);
    const connection = createConnection(roomId); // Start connection
    connection.connect();

    // CLEANUP: Runs when component unmounts or roomId changes
    return () => {
      console.log("Disconnecting from room:", roomId);
      connection.disconnect(); // Stop connection to prevent memory leak
    };
  }, [roomId]); // Re-runs when roomId changes
}

// Common cleanup scenarios:
useEffect(() => {
  // 1. Clear timers
  const timer = setInterval(() => { /* ... */ }, 1000);
  return () => clearInterval(timer);
}, []);

useEffect(() => {
  // 2. Remove event listeners
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

useEffect(() => {
  // 3. Cancel fetch requests
  const controller = new AbortController();
  fetch("/api/data", { signal: controller.signal }).then(/* ... */);
  return () => controller.abort();
}, []);
```

---

### Q25. Fetch data from an API, show it in a child component, add a reload button ⭐ Frequently Asked

```javascript
// This is a very common live coding question at Deloitte USI

import { useState, useEffect } from 'react';

// Child component — just displays the data
function UserCard({ user }) {
  if (!user) return null;
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </div>
  );
}

// Parent component — handles data fetching
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError("Failed to load user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Auto-fetch on mount
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserCard user={user} />
      <button onClick={fetchUser} disabled={loading}>
        {loading ? "Reloading..." : "Reload"}
      </button>
    </div>
  );
}
```

---

## Next.js

---

### Q26. SSR vs SSG vs ISR vs CSR — differences and when to use each ⭐ Frequently Asked

**Simple explanation:**

| Method | Full Form | When HTML is created | Best for |
|---|---|---|---|
| CSR | Client-Side Rendering | In the browser, after JS loads | Dashboards, user-specific pages |
| SSR | Server-Side Rendering | On the server, on every request | Real-time data (stock prices, live feeds) |
| SSG | Static Site Generation | At build time, once | Blogs, docs, marketing pages |
| ISR | Incremental Static Regeneration | At build, then periodically updated | E-commerce, news (fast + fresh) |

**Analogy:** Imagine a restaurant menu:
- **CSR** = No menu printed, chef describes it verbally each time
- **SSR** = Print a fresh menu for every customer, every time
- **SSG** = Print menus once at the start of the day
- **ISR** = Print menus at the start, but reprint every hour

```javascript
// SSR — runs on every request
export async function getServerSideProps() {
  const res = await fetch("https://api.stockprice.com/TATAMOTORS");
  const data = await res.json();
  return { props: { price: data } };
}

// SSG — runs once at build time
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/blog-posts");
  const posts = await res.json();
  return { props: { posts } };
}

// ISR — regenerate every 60 seconds
export async function getStaticProps() {
  const posts = await fetchPosts();
  return {
    props: { posts },
    revalidate: 60, // Re-generate page every 60 seconds
  };
}
```

---

### Q27. App Router vs Pages Router — key differences in Next.js 13+ ⭐ Frequently Asked

**Simple explanation:**

Next.js 13 introduced a new "App Router" as the modern way to build apps. The old "Pages Router" still works but is considered legacy.

| Feature | Pages Router | App Router |
|---|---|---|
| Folder | `/pages` | `/app` |
| Default component type | Client | Server |
| Layouts | `_app.js` (global only) | `layout.js` (nested layouts) |
| Data fetching | `getServerSideProps` / `getStaticProps` | `async/await` directly in component |
| Loading states | Manual | `loading.js` file |

```javascript
// Pages Router (old way)
// pages/users/[id].js
export async function getServerSideProps({ params }) {
  const user = await fetchUser(params.id);
  return { props: { user } };
}
export default function UserPage({ user }) {
  return <div>{user.name}</div>;
}

// App Router (new way — simpler!)
// app/users/[id]/page.js
async function UserPage({ params }) {
  const user = await fetchUser(params.id); // Fetch directly in component
  return <div>{user.name}</div>;
}
export default UserPage;
```

---

### Q28. What are Server Components? How do they differ from Client Components? ⭐ Frequently Asked

**Simple explanation:**

- **Server Components** = Run only on the server. Zero JavaScript sent to the browser. Great for data fetching and static UI.
- **Client Components** = Run in the browser. Can use `useState`, `useEffect`, event handlers.

**Analogy:** Server Components are like a chef who prepares the plate in the kitchen (server) and brings you the finished dish. Client Components are like a buffet where you interact with the food yourself.

```javascript
// SERVER COMPONENT (default in App Router) — no 'use client' directive
// app/UserList/page.js
async function UserList() {
  // Can directly fetch data — no useEffect needed!
  const users = await fetch("https://api.example.com/users").then(r => r.json());

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// CLIENT COMPONENT — add 'use client' at the top
"use client";
import { useState } from "react";

function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false); // useState needs browser

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "Liked!" : "Like"}
    </button>
  );
}

// You can mix them — Server Component wraps Client Component
async function BlogPost({ id }) {
  const post = await fetchPost(id); // Server-side fetch
  return (
    <article>
      <h1>{post.title}</h1>
      <LikeButton postId={id} />  {/* Client Component inside Server Component */}
    </article>
  );
}
```

---

### Q29. Implement route protection using Next.js Middleware

**Simple explanation:**

Middleware runs before a page is loaded. It's perfect for checking authentication — redirect users to login if they're not logged in, before they even see the protected page.

```javascript
// middleware.js — place at root of your project
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    // Not logged in? Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // All good, proceed
}

// Which routes this middleware runs on
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

---

### Q30. How does Next.js caching work — fetch cache, revalidate, tags?

**Simple explanation:**

Next.js automatically caches fetch requests. You control how long the cache is valid and how to refresh it.

```javascript
// No caching — always fresh data (like SSR)
const data = await fetch("/api/data", { cache: "no-store" });

// Cache forever — use on next build (like SSG)
const data = await fetch("/api/data", { cache: "force-cache" });

// Cache, but refresh every 60 seconds (like ISR)
const data = await fetch("/api/data", { next: { revalidate: 60 } });

// Cache with a tag — allows on-demand revalidation
const data = await fetch("/api/posts", { next: { tags: ["posts"] } });

// On-demand revalidation via API route
// app/api/revalidate/route.js
import { revalidateTag } from "next/cache";
export async function POST() {
  revalidateTag("posts"); // Clears cache for all fetches tagged "posts"
  return Response.json({ revalidated: true });
}
```

---

### Q31. Explain streaming with Suspense in the App Router

**Simple explanation:**

Instead of waiting for ALL data to load before showing anything, streaming lets you show parts of the page as they become ready — like loading WhatsApp where the header appears instantly while messages load.

```javascript
// app/dashboard/page.js
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>

      {/* Shows instantly */}
      <QuickStats />

      {/* Shows skeleton while RecentOrders loads */}
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />       {/* This component fetches slow data */}
      </Suspense>

      {/* Shows skeleton while Recommendations loads */}
      <Suspense fallback={<p>Loading recommendations...</p>}>
        <Recommendations />   {/* This component fetches even slower data */}
      </Suspense>
    </main>
  );
}

// Each async component fetches its own data
async function RecentOrders() {
  const orders = await fetchOrders(); // Slow API call
  return <OrderList orders={orders} />;
}
```

---

### Q32. How do API routes work? When to use vs a separate backend?

**Simple explanation:**

Next.js lets you create backend API endpoints right inside your frontend project using the `/api` folder (Pages Router) or route handlers (App Router).

```javascript
// App Router — app/api/users/route.js
import { NextResponse } from "next/server";

// GET /api/users
export async function GET() {
  const users = await db.getUsers();
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();
  const newUser = await db.createUser(body);
  return NextResponse.json(newUser, { status: 201 });
}

// GET /api/users/[id] — app/api/users/[id]/route.js
export async function GET(request, { params }) {
  const user = await db.getUser(params.id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}
```

**Use Next.js API Routes when:** Small app, BFF (Backend for Frontend) pattern, handling form submissions, webhook endpoints.

**Use a separate backend when:** Large-scale app, multiple client types (mobile + web), complex business logic, microservices architecture.

---

## CSS / HTML

---

### Q33. Explain the CSS box model — content, padding, border, margin ⭐ Frequently Asked

**Simple explanation:**

Every HTML element is a rectangular box made of 4 layers (from inside out):

1. **Content** = The actual text/image
2. **Padding** = Space between content and border (inside the element)
3. **Border** = The edge/frame
4. **Margin** = Space outside the border (between elements)

**Analogy:** Think of a picture frame:
- Picture = Content
- Space between picture and frame = Padding
- The frame itself = Border
- Gap between this frame and another = Margin

```css
.box {
  width: 200px;          /* Content width */
  padding: 20px;         /* Inside space */
  border: 5px solid black;
  margin: 10px;          /* Outside space */
}

/* Without box-sizing: the total width = 200 + 20*2 + 5*2 = 250px */

/* box-sizing: border-box = width INCLUDES padding and border */
* {
  box-sizing: border-box;  /* Total width stays 200px — most projects use this */
}
```

---

### Q34. Flexbox vs CSS Grid — when to use which? ⭐ Frequently Asked

**Simple explanation:**

- **Flexbox** = One-dimensional layout (row OR column). Great for aligning items in a single line.
- **CSS Grid** = Two-dimensional layout (rows AND columns). Great for page layouts.

**Analogy:**
- Flexbox = A bookshelf (items in a row)
- Grid = A spreadsheet (rows and columns together)

```css
/* FLEXBOX — navigation bar (single row) */
.navbar {
  display: flex;
  align-items: center;        /* Vertical center */
  justify-content: space-between; /* Horizontal spacing */
  gap: 16px;
}

/* FLEXBOX — card list (wrapping row) */
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card { flex: 1 1 300px; }  /* Grow/shrink, min 300px */

/* CSS GRID — page layout */
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
}
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

---

### Q35. What is CSS specificity? How are conflicts resolved? ⭐ Frequently Asked

**Simple explanation:**

When multiple CSS rules target the same element, specificity decides which one wins. It's like a point system.

| Selector | Points |
|---|---|
| Inline style (`style="..."`) | 1000 |
| ID (`#header`) | 100 |
| Class (`.btn`), attribute, pseudo-class | 10 |
| Element (`div`, `p`), pseudo-element | 1 |

```css
/* Specificity: 1 point */
p { color: black; }

/* Specificity: 10 points — wins over element selector */
.text { color: blue; }

/* Specificity: 100 points — wins over class */
#title { color: green; }

/* Specificity: 110 points (100 + 10) */
#title .subtitle { color: red; }

/* !important — overrides everything (avoid unless necessary) */
p { color: purple !important; }
```

**Conflict resolution order (when specificity is equal): last rule wins.**

```html
<!-- Inline style wins over all (1000 points) -->
<p style="color: red;" class="text" id="title">Hello</p>
<!-- Color = red (inline style) -->
```

---

### Q36. Implement a responsive navbar with hamburger menu using CSS

```css
/* Base styles */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a1a2e;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s;
}

/* Mobile styles */
@media (max-width: 768px) {
  .hamburger { display: flex; } /* Show hamburger on mobile */

  .nav-links {
    display: none;               /* Hide links on mobile */
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #1a1a2e;
    padding: 1rem;
  }

  .nav-links.open { display: flex; } /* Show when menu is open */
}
```

```javascript
// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
```

---

### Q37. What are CSS custom properties (variables) and how do you use them?

**Simple explanation:**

CSS variables let you define a value once and reuse it everywhere. When you change the variable, all places using it update automatically — perfect for themes.

```css
/* Define variables on :root (global scope) */
:root {
  --primary-color: #0070f3;
  --secondary-color: #6c757d;
  --font-size-base: 16px;
  --border-radius: 8px;
  --spacing-md: 1rem;
}

/* Use variables with var() */
.button {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  padding: var(--spacing-md);
}

/* Override for dark theme */
[data-theme="dark"] {
  --primary-color: #3a9ff5;
  --background: #121212;
  --text-color: #ffffff;
}
```

---

### Q38. Explain BEM methodology and why it matters for large codebases

**Simple explanation:**

BEM stands for **Block, Element, Modifier**. It's a naming convention for CSS classes that makes your code self-documenting and avoids naming conflicts.

- **Block** = Standalone component (`card`, `button`, `navbar`)
- **Element** = Part of a block, uses `__` (`card__title`, `button__icon`)
- **Modifier** = Variation/state, uses `--` (`button--primary`, `card--featured`)

```html
<!-- BEM in action -->
<div class="card card--featured">
  <img class="card__image" src="..." />
  <div class="card__body">
    <h3 class="card__title">Product Name</h3>
    <p class="card__description">Description here</p>
    <button class="button button--primary">Buy Now</button>
    <button class="button button--secondary">Save</button>
  </div>
</div>
```

```css
.card { }                /* Block */
.card--featured { }     /* Modifier — special version of card */
.card__title { }        /* Element — title inside card */
.card__body { }         /* Element — body inside card */

.button { }             /* Block */
.button--primary { }    /* Modifier — primary style */
.button--secondary { }  /* Modifier — secondary style */
```

---

### Q39. How does z-index and stacking context work?

**Simple explanation:**

`z-index` controls which element appears on top when elements overlap. But it only works within the same "stacking context." A new stacking context is created by certain CSS properties.

**Analogy:** Floors of a building. z-index is the floor number. But two separate buildings (stacking contexts) don't share floor numbers.

```css
/* z-index only works on positioned elements */
.element {
  position: relative; /* or absolute, fixed, sticky */
  z-index: 10;
}

/* Common stacking context creators */
.parent {
  transform: translateX(0);  /* Creates new stacking context */
  opacity: 0.99;             /* Creates new stacking context */
  position: relative;
  z-index: 1;
}

.child {
  position: absolute;
  z-index: 9999; /* High z-index, but trapped inside parent's stacking context */
}

/* A sibling with z-index: 2 on parent will appear ABOVE .child,
   even though child has z-index 9999 */
```

---

### Q40. Semantic HTML — why it matters for accessibility and SEO ⭐ Frequently Asked

**Simple explanation:**

Semantic HTML uses tags that describe the meaning of the content, not just how it looks. This helps screen readers, search engines, and developers understand the page structure.

```html
<!-- BAD — non-semantic HTML (just divs everywhere) -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="title">My Post</div>
    <div class="text">Content here...</div>
  </div>
</div>

<!-- GOOD — semantic HTML -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>My Post</h1>
    <p>Content here...</p>
  </article>
  <aside>Related posts</aside>
</main>
<footer>© 2025</footer>
```

**Why it matters:**
- **SEO:** Google understands your content better
- **Accessibility:** Screen readers announce "navigation" or "article" to blind users
- **Maintainability:** Easier for developers to read and understand
- **ARIA:** Less need for ARIA roles when using semantic tags

---

## DSA / Logic

---

### Q41. Two Sum — find two numbers that add to target (HashMap approach) ⭐ Frequently Asked

**Simple explanation:**

Given an array of numbers and a target, find two numbers that add up to the target. Return their indices.

**Approach:** As you go through each number, check if its "complement" (target - current number) was seen before. If yes, you found the pair!

```javascript
// Brute Force — O(n²) time
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// Optimal — O(n) time using HashMap
function twoSum(nums, target) {
  const seen = new Map(); // { number: index }

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]; // What number do we need?

    if (seen.has(complement)) {
      return [seen.get(complement), i]; // Found the pair!
    }

    seen.set(nums[i], i); // Remember this number and its index
  }
}

// Test
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1] → 2 + 7 = 9
console.log(twoSum([3, 2, 4], 6));       // [1, 2] → 2 + 4 = 6
```

**Time complexity:** O(n) — single pass through the array
**Space complexity:** O(n) — for the HashMap

---

### Q42. Reverse a string and check if it's a palindrome ⭐ Frequently Asked

**Simple explanation:**

A palindrome reads the same forwards and backwards (like "racecar", "madam", "level").

```javascript
// Reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// OR using a loop
function reverseStringManual(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

// Check palindrome — method 1
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, ""); // Remove spaces/punctuation
  return cleaned === cleaned.split("").reverse().join("");
}

// Check palindrome — method 2 (two pointers, more efficient)
function isPalindromeTwoPointers(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false; // Mismatch found
    left++;
    right--;
  }
  return true;
}

// Tests
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false
```

---

### Q43. Find the most frequent element in an array

```javascript
function mostFrequent(arr) {
  const count = {};

  // Count occurrences
  for (const item of arr) {
    count[item] = (count[item] || 0) + 1;
  }

  // Find the maximum
  let maxCount = 0;
  let mostFrequentItem = null;

  for (const [item, freq] of Object.entries(count)) {
    if (freq > maxCount) {
      maxCount = freq;
      mostFrequentItem = item;
    }
  }

  return { item: mostFrequentItem, count: maxCount };
}

// Tests
console.log(mostFrequent([1, 2, 2, 3, 3, 3, 4]));
// { item: "3", count: 3 }

console.log(mostFrequent(["apple", "banana", "apple", "cherry", "apple"]));
// { item: "apple", count: 3 }
```

---

### Q44. FizzBuzz with a twist — output as an array, skip multiples of 7 ⭐ Frequently Asked

**Simple explanation:**

Classic FizzBuzz: Print "Fizz" for multiples of 3, "Buzz" for multiples of 5, "FizzBuzz" for both. The twist: return as array, and skip multiples of 7.

```javascript
function fizzBuzz(n) {
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (i % 7 === 0) continue; // Skip multiples of 7

    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    } else if (i % 3 === 0) {
      result.push("Fizz");
    } else if (i % 5 === 0) {
      result.push("Buzz");
    } else {
      result.push(String(i));
    }
  }

  return result;
}

console.log(fizzBuzz(20));
// ["1","2","Fizz","4","Buzz","Fizz","8","9","Buzz","11","Fizz","13","Buzz","FizzBuzz","16","17","Fizz","19","Buzz"]
// (7, 14 are skipped)
```

---

### Q45. Flatten a nested object `{a:{b:{c:1}}}` to `{"a.b.c":1}` ⭐ Frequently Asked

**Simple explanation:**

Convert a deeply nested object into a single-level object where the keys are the full paths joined by dots.

```javascript
function flattenObject(obj, prefix = "", result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = prefix ? `${prefix}.${key}` : key; // Build the key path

    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], newKey, result); // Recurse into nested object
    } else {
      result[newKey] = obj[key]; // Add leaf value
    }
  }
  return result;
}

// Tests
console.log(flattenObject({ a: { b: { c: 1 } } }));
// { "a.b.c": 1 }

console.log(flattenObject({ name: "Ravi", address: { city: "Pune", pin: 411001 } }));
// { "name": "Ravi", "address.city": "Pune", "address.pin": 411001 }

console.log(flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } }));
// { "a": 1, "b.c": 2, "b.d.e": 3 }
```

---

### Q46. Find duplicates in an array without extra space

```javascript
// Method 1: Using a Set (simple, O(n) space)
function findDuplicatesSet(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  return [...duplicates];
}

// Method 2: Sorting first (O(1) extra space)
function findDuplicatesSort(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const duplicates = [];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] && duplicates[duplicates.length - 1] !== sorted[i]) {
      duplicates.push(sorted[i]);
    }
  }
  return duplicates;
}

// Method 3: For arrays with values 1 to n (in-place, true O(1) extra space)
function findDuplicatesInPlace(arr) {
  const duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    const index = Math.abs(arr[i]) - 1;
    if (arr[index] < 0) {
      duplicates.push(Math.abs(arr[i])); // Already visited = duplicate
    } else {
      arr[index] = -arr[index]; // Mark as visited
    }
  }
  return duplicates;
}

console.log(findDuplicatesSet([1, 2, 3, 2, 4, 3, 5])); // [2, 3]
```

---

## System Design

---

### Q47. Design a scalable folder structure for a large Next.js enterprise app ⭐ Frequently Asked

```
my-app/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Route group — auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/            # Route group — protected pages
│   │   ├── layout.tsx          # Shared dashboard layout
│   │   ├── overview/page.tsx
│   │   └── reports/page.tsx
│   ├── api/                    # API routes
│   │   └── users/route.ts
│   ├── layout.tsx              # Root layout
│   └── globals.css
│
├── components/                 # Reusable UI components
│   ├── ui/                     # Generic: Button, Input, Modal
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── features/               # Feature-specific: UserCard, OrderTable
│       ├── users/UserCard.tsx
│       └── orders/OrderTable.tsx
│
├── lib/                        # Utilities and helpers
│   ├── api.ts                  # API client / fetch helpers
│   ├── auth.ts                 # Auth logic
│   └── utils.ts                # General utilities
│
├── hooks/                      # Custom React hooks
│   ├── useDebounce.ts
│   ├── useFetch.ts
│   └── useAuth.ts
│
├── store/                      # State management (Redux/Zustand)
│   ├── slices/cartSlice.ts
│   └── index.ts
│
├── types/                      # TypeScript type definitions
│   ├── user.ts
│   └── product.ts
│
├── constants/                  # App-wide constants
│   └── routes.ts
│
└── public/                     # Static assets
    ├── icons/
    └── images/
```

---

### Q48. How would you optimize a React app with slow renders? ⭐ Frequently Asked

**Step-by-step approach:**

**Step 1 — Profile first, optimize second**
```javascript
// Use React DevTools Profiler to find slow components
// Look for components with high render times or frequent renders
```

**Step 2 — Prevent unnecessary re-renders**
```javascript
// Wrap pure components in React.memo
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});

// Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => b.price - a.price),
  [items]
);

// Memoize callbacks passed to children
const handleDelete = useCallback((id) => {
  dispatch({ type: "DELETE", id });
}, [dispatch]);
```

**Step 3 — Code splitting and lazy loading**
```javascript
const HeavyChart = React.lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <HeavyChart />
    </Suspense>
  );
}
```

**Step 4 — Virtualize long lists**
```javascript
import { FixedSizeList } from "react-window";

function VirtualList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

---

### Q49. Explain Core Web Vitals — LCP, CLS, INP — and how to improve each ⭐ Frequently Asked

**Simple explanation:**

Core Web Vitals are Google's 3 key metrics for measuring real-world user experience. They directly affect your Google search ranking.

| Metric | Full Name | Measures | Good Score |
|---|---|---|---|
| LCP | Largest Contentful Paint | How fast main content loads | < 2.5 seconds |
| CLS | Cumulative Layout Shift | How much the page jumps around | < 0.1 |
| INP | Interaction to Next Paint | How fast the page responds to clicks | < 200ms |

```javascript
// Improve LCP (Largest Contentful Paint)
// 1. Preload the hero image
<link rel="preload" as="image" href="/hero.jpg" />

// 2. Use Next.js Image component (auto-optimizes)
import Image from "next/image";
<Image src="/hero.jpg" priority width={1200} height={600} alt="Hero" />

// 3. Use proper image formats (WebP instead of PNG/JPEG)

// Improve CLS (Cumulative Layout Shift)
// 1. Always set width and height on images
<img src="photo.jpg" width="400" height="300" />

// 2. Reserve space for ads/embeds
.ad-container {
  min-height: 250px;  /* Reserve space before ad loads */
}

// 3. Don't inject content above existing content dynamically

// Improve INP (Interaction to Next Paint)
// 1. Use useTransition for non-urgent state updates
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setSearchResults(filtered); // Mark as non-urgent
});

// 2. Debounce rapid user input
const debouncedSearch = useDebounce(query, 300);

// 3. Break up long JavaScript tasks
// Instead of one big computation, use setTimeout/scheduler
```

---

### Q50. Design a real-time dashboard with live data — architecture walkthrough

**Scenario:** A sales dashboard that shows live order count, revenue, and recent orders updated in real time.

**Architecture:**

```
Browser (React/Next.js)
       ↕ WebSocket / Server-Sent Events
   Next.js API Route / Backend
       ↕ Database (PostgreSQL / MongoDB)
       ↕ Redis (caching + pub/sub)
```

**Implementation:**

```javascript
// 1. Server-Sent Events (SSE) for live data — simpler than WebSockets
// app/api/live-orders/route.ts
export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(async () => {
        const stats = await getDashboardStats();
        const data = `data: ${JSON.stringify(stats)}\n\n`;
        controller.enqueue(new TextEncoder().encode(data));
      }, 2000); // Push update every 2 seconds

      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

// 2. React hook to consume SSE
function useLiveDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const source = new EventSource("/api/live-orders");

    source.onmessage = (event) => {
      setStats(JSON.parse(event.data));
    };

    source.onerror = () => {
      source.close();
    };

    return () => source.close(); // Cleanup on unmount
  }, []);

  return stats;
}

// 3. Dashboard component
function Dashboard() {
  const stats = useLiveDashboard();

  return (
    <div>
      <h1>Live Dashboard</h1>
      {stats ? (
        <>
          <MetricCard title="Total Orders" value={stats.orderCount} />
          <MetricCard title="Revenue" value={`₹${stats.revenue}`} />
          <RecentOrdersTable orders={stats.recentOrders} />
        </>
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
}
```

**Key design decisions:**
- Use **SSE** (not WebSocket) for server → browser only, one-direction data
- Use **React Query** for caching and background refetch as a fallback
- Use **Redis** to cache dashboard aggregations — don't hit DB on every event
- Use **React.memo** + **useMemo** to avoid re-rendering unchanged metric cards
- Add **skeleton loading** for initial state before first data arrives

---

## Quick Revision Cheat Sheet

| Topic | Key Concept |
|---|---|
| Event Loop | Microtasks (Promises) run before Macrotasks (setTimeout) |
| Closure | Function remembers outer scope variables |
| Debounce | Fires after user stops — search bars |
| Throttle | Fires at fixed intervals — scroll events |
| Virtual DOM | Lightweight JS copy, React diffs it, updates only changed parts |
| useMemo | Caches computed values |
| useCallback | Caches function references |
| SSR | Fresh HTML every request — real-time data |
| SSG | HTML at build time — blogs, docs |
| ISR | SSG + periodic rebuild — e-commerce |
| Flexbox | 1D layout — rows or columns |
| Grid | 2D layout — rows AND columns |
| BEM | Block__Element--Modifier naming for CSS |
| LCP | Load speed (< 2.5s) |
| CLS | Layout stability (< 0.1) |
| INP | Interaction responsiveness (< 200ms) |

---

*Good luck with your Deloitte USI interview! Prepared with love for 5 YOE Frontend Developers.*