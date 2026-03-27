# React Interview Questions - Advanced Level Part 3 (Q101-Q120 Detailed Answers)

## 101. What is useDebugValue hook?

**Answer:**

`useDebugValue` displays a label for custom hooks in React DevTools for debugging purposes.

### Simple Analogy:

Think of `useDebugValue` like adding a **label on a box** so you know what's inside when you look at it.

### Basic Syntax:

```javascript
useDebugValue(value);
useDebugValue(value, format);
```

### Real Example - Custom Hook:

```javascript
function useFormInput(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  
  // Shows label in DevTools
  React.useDebugValue(value);
  
  return [value, setValue];
}

// In DevTools, you'll see: "useFormInput: 'John'"
```

### With Formatter:

```javascript
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = React.useState(null);
  
  // Format the display in DevTools
  React.useDebugValue(
    isOnline,
    isOnline => isOnline ? '🟢 Online' : '🔴 Offline'
  );
  
  React.useEffect(() => {
    // Subscribe to friend status
  }, [friendID]);
  
  return isOnline;
}

// In DevTools: "useFriendStatus: 🟢 Online" or "🔴 Offline"
```

### Real Use Case:

```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  // Show in DevTools what's stored
  React.useDebugValue({ key, value: storedValue });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}
```

### When to Use:

✅ Custom hooks you want to debug  
✅ Complex custom hooks  
✅ When you need to inspect hook values  

---

## 102. What is useLayoutEffect used for?

**Answer:**

`useLayoutEffect` runs **synchronously after DOM mutations but before browser paint**. Use when you need to measure or manipulate the DOM.

### Timing Difference:

| Hook | When | Use For |
|------|------|---------|
| **useEffect** | After paint (async) | Most side effects, API calls |
| **useLayoutEffect** | Before paint (sync) | DOM measurements, positioning |

### Real World Analogy:

- **useEffect**: Paint the wall, then check the color
- **useLayoutEffect**: Check the wall measurements, then paint

### Basic Example:

```javascript
function MeasureComponent() {
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef(null);
  
  // This runs BEFORE browser repaints
  React.useLayoutEffect(() => {
    // Measure the DOM element
    const elementHeight = ref.current.offsetHeight;
    setHeight(elementHeight);
    
    // Re-render with correct height before user sees it
  }, []);
  
  return (
    <div ref={ref}>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Real Example - Tooltip Positioning:

```javascript
function Tooltip({ content, targetRef }) {
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const tooltipRef = React.useRef(null);
  
  React.useLayoutEffect(() => {
    if (targetRef.current && tooltipRef.current) {
      // Get target position
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate tooltip position
      const top = targetRect.top - tooltipRect.height - 10;
      const left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      
      // Update position BEFORE paint
      setPosition({ top, left });
    }
  }, [targetRef]);
  
  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`
      }}
    >
      {content}
    </div>
  );
}
```

### useEffect vs useLayoutEffect:

```javascript
// useEffect (after paint - might flicker)
function FlickerExample() {
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    // Might see default value, then update
    setWidth(ref.current.offsetWidth);
  }, []);
  
  return <div ref={ref} style={{ width }}>Content</div>;
}

// useLayoutEffect (before paint - no flicker)
function NoFlickerExample() {
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef(null);
  
  React.useLayoutEffect(() => {
    // Updates before user sees anything
    setWidth(ref.current.offsetWidth);
  }, []);
  
  return <div ref={ref} style={{ width }}>Content</div>;
}
```

### Performance Note:

⚠️ **useLayoutEffect blocks paint** - Use sparingly!

---

## 103. What is useImperativeHandle used for?

**Answer:**

`useImperativeHandle` lets parent components call methods on child components directly. It exposes imperative methods.

### Simple Analogy:

Think of it like giving a **remote control** to the parent component so it can call methods on the child.

### Basic Syntax:

```javascript
useImperativeHandle(ref, () => ({
  method1: () => { /* ... */ },
  method2: () => { /* ... */ }
}));
```

### Example - Input Focus:

```javascript
// Child component
const FocusableInput = React.forwardRef((props, ref) => {
  const inputRef = React.useRef(null);
  
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));
  
  return <input ref={inputRef} type="text" />;
});

// Parent component
function App() {
  const inputRef = React.useRef(null);
  
  return (
    <div>
      <FocusableInput ref={inputRef} />
      
      <button onClick={() => inputRef.current.focus()}>
        Focus Input
      </button>
      
      <button onClick={() => inputRef.current.clear()}>
        Clear Input
      </button>
      
      <button onClick={() => console.log(inputRef.current.getValue())}>
        Get Value
      </button>
    </div>
  );
}
```

### Real Example - Media Player:

```javascript
const MediaPlayer = React.forwardRef((props, ref) => {
  const videoRef = React.useRef(null);
  
  React.useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    seek: (time) => { videoRef.current.currentTime = time; },
    getCurrentTime: () => videoRef.current.currentTime,
    getDuration: () => videoRef.current.duration
  }));
  
  return (
    <video ref={videoRef} src="video.mp4" />
  );
});

function VideoApp() {
  const playerRef = React.useRef(null);
  
  return (
    <div>
      <MediaPlayer ref={playerRef} />
      
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.seek(30)}>Go to 30s</button>
    </div>
  );
}
```

### When to Use:

✅ DOM measurement and positioning  
✅ Managing focus, text selection, or media playback  
✅ Triggering animations  

❌ Most regular props passing  

---

## 104. How do you create reusable custom hooks?

**Answer:**

Custom hooks are functions that extract component logic into reusable functions starting with `use`.

### Simple Custom Hook:

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Use it
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Real Example - useFetch Hook:

```javascript
function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    let isMounted = true; // Prevent state update after unmount
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => { isMounted = false; }; // Cleanup
  }, [url]);
  
  return { data, loading, error };
}

// Use it
function UsersList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### More Custom Hooks:

**useLocalStorage:**
```javascript
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Use it
function App() {
  const [name, setName] = useLocalStorage('name', 'John');
  
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

**useWindowSize:**
```javascript
function useWindowSize() {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
```

---

## 105. What patterns are used in custom hooks?

**Answer:**

Common patterns for organizing and using custom hooks effectively.

### Pattern 1: State Encapsulation

```javascript
function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  
  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  
  return { value, toggle, setTrue, setFalse };
}
```

### Pattern 2: Effect Hooks

```javascript
function usePrevious(value) {
  const ref = React.useRef();
  
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}
```

### Pattern 3: Combining Hooks

```javascript
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = React.useState('idle');
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  
  const execute = React.useCallback(async () => {
    setStatus('pending');
    try {
      const result = await asyncFunction();
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);
  
  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return { execute, status, data, error };
}
```

---

## 106. What is useTransition hook?

**Answer:**

`useTransition` marks state updates as non-urgent so the UI stays responsive while processing happens in background.

### Problem It Solves:

```javascript
function SearchApp() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  
  // Typing 1000 items causes lag!
  const handleChange = (e) => {
    setQuery(e.target.value);
    setResults(performExpensiveSearch(e.target.value));
  };
}
```

### Solution - useTransition:

```javascript
import { useTransition } from 'react';

function SearchApp() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // High priority: Update input immediately
    setQuery(value);
    
    // Low priority: Do expensive search
    startTransition(() => {
      setResults(performExpensiveSearch(value));
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Searching...</p>}
      {/* Results appear smoothly */}
    </div>
  );
}
```

### Real Example - Filter List:

```javascript
function FilterableList({ items }) {
  const [filter, setFilter] = React.useState('');
  const [isPending, startTransition] = useTransition();
  
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const handleFilterChange = (e) => {
    const value = e.target.value;
    
    // Update input immediately
    setFilter(value);
    
    // Filter in background
    startTransition(() => {
      // Expensive filtering happens here
    });
  };
  
  return (
    <div>
      <input
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter..."
      />
      {isPending && <p>Filtering...</p>}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 107. What is useDeferredValue hook?

**Answer:**

`useDeferredValue` lets you defer updating a value until urgent updates are done. Similar to `useTransition` but for values instead of state updates.

### Difference from useTransition:

| Hook | Purpose |
|------|---------|
| **useTransition** | Defer state updates |
| **useDeferredValue** | Defer a value |

### Real Example:

```javascript
import { useDeferredValue } from 'react';

function SearchComponent() {
  const [query, setQuery] = React.useState('');
  
  // Defer the query value
  const deferredQuery = useDeferredValue(query);
  
  // Expensive search uses deferred value
  const results = React.useMemo(() => {
    return performSearch(deferredQuery);
  }, [deferredQuery]);
  
  return (
    <div>
      {/* Input is always responsive */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* Shows results with deferred value */}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Timeline:

```
User types: "React"
├─ query updated immediately
└─ deferredQuery waits until urgent updates done

Result: Input responsive, list updates smoothly
```

---

## 108. What is useId hook?

**Answer:**

`useId` generates unique IDs for accessibility and form labels.

### Problem It Solves:

```javascript
// ❌ Bad - IDs might clash
function Form() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />
    </div>
  );
}
```

### Solution - useId:

```javascript
import { useId } from 'react';

function Form() {
  const emailId = useId();
  const passwordId = useId();
  
  return (
    <div>
      <label htmlFor={emailId}>Email</label>
      <input id={emailId} />
      
      <label htmlFor={passwordId}>Password</label>
      <input id={passwordId} type="password" />
    </div>
  );
}
```

### Real Example - Reusable Component:

```javascript
function Checkbox({ label }) {
  const id = useId();
  
  return (
    <div>
      <input id={id} type="checkbox" />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

// Can use multiple times without ID conflicts
<Checkbox label="Accept terms" />
<Checkbox label="Subscribe to newsletter" />
<Checkbox label="Remember me" />
```

---

## 109. What is useInsertionEffect hook?

**Answer:**

`useInsertionEffect` runs before DOM mutations, useful for injecting styles with CSS-in-JS libraries.

### When to Use:

CSS-in-JS libraries use it to inject styles before React renders the component.

```javascript
function App() {
  React.useInsertionEffect(() => {
    // Inject styles before render
    const style = document.createElement('style');
    style.textContent = `
      .my-component {
        color: blue;
      }
    `;
    document.head.appendChild(style);
  }, []);
  
  return <div className="my-component">Styled</div>;
}
```

### Real Example - styled-components:

```javascript
// styled-components uses useInsertionEffect internally
const StyledDiv = styled.div`
  color: blue;
  font-size: 16px;
`;

function App() {
  return <StyledDiv>Styled text</StyledDiv>;
}
```

---

## 110. What is useSyncExternalStore hook?

**Answer:**

`useSyncExternalStore` subscribes to external data sources (like Redux stores) with proper synchronization.

### Real Example - Redux Store:

```javascript
import { useSyncExternalStore } from 'react';
import store from './reduxStore';

function Component() {
  const state = useSyncExternalStore(
    // Subscribe to store
    (listener) => store.subscribe(listener),
    // Get snapshot
    () => store.getState(),
    // Optional: server snapshot
    () => store.getInitialState()
  );
  
  return <div>{state.count}</div>;
}
```

---

## 111. What is automatic batching in React 18?

**Answer:**

React 18 automatically batches multiple state updates into one re-render.

### Without Automatic Batching (React 17):

```javascript
setTimeout(() => {
  setCount(1);    // Re-render
  setItems([]);   // Re-render
}, 1000);
// 2 re-renders
```

### With Automatic Batching (React 18):

```javascript
setTimeout(() => {
  setCount(1);
  setItems([]);
}, 1000);
// 1 re-render!
```

### Benefits:

✅ Better performance  
✅ Fewer re-renders  
✅ Smoother animations  

---

## 112. What is Suspense for data fetching?

**Answer:**

Suspense lets you wait for data to load before rendering component.

### Basic Usage:

```javascript
import { Suspense } from 'react';

const UserProfile = React.lazy(() => import('./UserProfile'));

function App() {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserProfile />
    </Suspense>
  );
}
```

### With Data Fetching:

```javascript
function DataComponent() {
  return (
    <Suspense fallback={<p>Loading data...</p>}>
      <AsyncData />
    </Suspense>
  );
}

// Component throws promise while fetching
function AsyncData() {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    throw fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
}
```

---

## 113. How do startTransition work?

**Answer:**

`startTransition` marks updates as non-urgent, letting React prioritize user input.

### Basic Pattern:

```javascript
import { startTransition } from 'react';

function Component() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Urgent
    setQuery(value);
    
    // Non-urgent
    startTransition(() => {
      setResults(expensiveSearch(value));
    });
  };
}
```

### With useTransition:

```javascript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setResults(search(query));
});

if (isPending) return <p>Searching...</p>;
```

---

## 114. What is the difference between useTransition and useDeferredValue?

**Answer:**

| Feature | useTransition | useDeferredValue |
|---------|---------------|------------------|
| **Purpose** | Defer state updates | Defer value updates |
| **Control** | You control when to update | React automatically defers |
| **Use** | Forms, searches | Expensive computations |
| **Returns** | `[isPending, startTransition]` | Deferred value |

### useTransition Example:

```javascript
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setState(newValue);
});
```

### useDeferredValue Example:

```javascript
const deferredValue = useDeferredValue(value);
// Use deferredValue instead of value
```

---

## 115. When should you use concurrent features?

**Answer:**

Use concurrent features when:

✅ **UI has expensive updates** - Large list filtering  
✅ **Need to stay responsive** - Search, sorting  
✅ **Want smooth animations** - Transitions  
✅ **Background work needed** - Prefetching  

Don't use when:

❌ **Simple state updates** - Buttons, toggles  
❌ **No performance issues** - No need to optimize  

---

## 116. What are React DevTools?

**Answer:**

React DevTools is a browser extension that helps debug React applications.

### Features:

✅ **Component tree** - See component hierarchy  
✅ **Props/state inspection** - View current values  
✅ **Hook inspection** - See hook values  
✅ **Trace renders** - Find why components re-render  
✅ **Performance profiling** - Measure performance  

### Installation:

```
Chrome: React Developer Tools extension
Firefox: React Developer Tools extension
```

### Usage:

```javascript
// Open DevTools → Components tab
// Click component to see:
// - Props
// - State
// - Hooks
// - Source code
```

---

## 117. How do you debug React applications?

**Answer:**

### Method 1: React DevTools

```javascript
// In DevTools Components tab:
// 1. Click component
// 2. View props/state/hooks
// 3. See re-render reasons
```

### Method 2: Console.log

```javascript
function Component() {
  const [state, setState] = React.useState(0);
  
  console.log('Component rendered, state:', state);
  
  return <div>{state}</div>;
}
```

### Method 3: Debugger

```javascript
function Component() {
  const [state, setState] = React.useState(0);
  
  debugger; // Execution pauses here
  
  return <div>{state}</div>;
}
```

### Method 4: Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}
```

---

## 118. What are accessibility considerations in React?

**Answer:**

Making apps usable for everyone, including people with disabilities.

### Semantic HTML:

```javascript
// ✅ Good
<button onClick={handleClick}>Submit</button>
<label htmlFor="email">Email</label>
<input id="email" />

// ❌ Bad
<div onClick={handleClick}>Submit</div>
<div>Email</div>
<div></div>
```

### ARIA Attributes:

```javascript
function Modal() {
  return (
    <div
      role="dialog"
      aria-label="Confirm action"
      aria-modal="true"
    >
      <p>Are you sure?</p>
    </div>
  );
}
```

### Keyboard Navigation:

```javascript
function Menu() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Handle activation
    }
  };
  
  return (
    <button
      role="menuitem"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      Menu
    </button>
  );
}
```

### Focus Management:

```javascript
function Modal() {
  const closeRef = React.useRef(null);
  
  React.useEffect(() => {
    // Focus close button when modal opens
    closeRef.current?.focus();
  }, []);
  
  return (
    <div>
      <button ref={closeRef}>Close</button>
    </div>
  );
}
```

---

## 119. What are best practices in React?

**Answer:**

### 1. Use Functional Components

```javascript
// ✅ Preferred
function Component() {
  return <div>Content</div>;
}

// ❌ Older style
class Component extends React.Component {
  render() {
    return <div>Content</div>;
  }
}
```

### 2. Use Hooks

```javascript
// ✅ Modern
const [count, setCount] = React.useState(0);

// ❌ Older style
this.state = { count: 0 };
this.setState({ count: 1 });
```

### 3. Keys in Lists

```javascript
// ✅ Good - unique ID
{items.map(item => <li key={item.id}>{item.name}</li>)}

// ❌ Bad - index as key
{items.map((item, idx) => <li key={idx}>{item.name}</li>)}
```

### 4. Lift State Up

```javascript
// ✅ Good - shared parent
function Parent() {
  const [shared, setShared] = React.useState(0);
  return (
    <>
      <ChildA shared={shared} />
      <ChildB setShared={setShared} />
    </>
  );
}

// ❌ Bad - duplicate state
function ChildA() {
  const [state, setState] = React.useState(0);
}
function ChildB() {
  const [state, setState] = React.useState(0);
}
```

### 5. PropTypes or TypeScript

```javascript
// ✅ Type checking
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
```

### 6. Memoize Expensive Computations

```javascript
// ✅ Optimize
const expensiveValue = React.useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// ❌ Wasteful
const expensiveValue = computeExpensiveValue(a, b);
```

### 7. Extract Components

```javascript
// ✅ Good - reusable
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad - all in one place
function App() {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 120. What are common mistakes to avoid in React?

**Answer:**

### Mistake 1: Modifying State Directly

```javascript
// ❌ Wrong
state.count = 5;

// ✅ Correct
setState(5);
```

### Mistake 2: Infinite useEffect Loop

```javascript
// ❌ Infinite loop
useEffect(() => {
  setState(state + 1);
}, [state]); // state changes, effect runs, setState called, state changes...

// ✅ Correct
useEffect(() => {
  // Only run once
}, []);
```

### Mistake 3: Missing Dependencies

```javascript
// ❌ Missing dependency
useEffect(() => {
  console.log(count); // depends on count
}, []); // but not in dependencies!

// ✅ Correct
useEffect(() => {
  console.log(count);
}, [count]);
```

### Mistake 4: Index as Key

```javascript
// ❌ Bad - breaks when list reorders
{items.map((item, idx) => <li key={idx}>{item}</li>)}

// ✅ Good - use unique ID
{items.map(item => <li key={item.id}>{item}</li>)}
```

### Mistake 5: Forgetting Cleanup

```javascript
// ❌ Memory leak
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []); // No cleanup!

// ✅ Correct
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### Mistake 6: Calling Hooks Conditionally

```javascript
// ❌ Wrong - hook call order breaks
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ Correct - declare all hooks
const [state, setState] = useState(condition ? 1 : 0);
```

### Mistake 7: Not Validating Props

```javascript
// ❌ Silently fails if wrong type
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

// ✅ Catch bugs early
Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
```

### Mistake 8: Creating Functions in Render

```javascript
// ❌ New function every render
<button onClick={() => handleClick()}>Click</button>

// ✅ Same reference
const handleClick = useCallback(() => {
  // handle click
}, []);
<button onClick={handleClick}>Click</button>
```

### Mistake 9: Too Many State Variables

```javascript
// ❌ Scattered state
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');

// ✅ Related state together
const [user, setUser] = useState({
  firstName: '',
  lastName: '',
  email: ''
});
```

### Mistake 10: Catching Errors Silently

```javascript
// ❌ Silent failure
fetch('/api/data').then(res => res.json());

// ✅ Handle errors
fetch('/api/data')
  .then(res => {
    if (!res.ok) throw new Error('Failed');
    return res.json();
  })
  .catch(error => console.error(error));
```

---

## Summary of React 18+ & Best Practices (Q101-Q120)

You now understand:

✅ useDebugValue - Debug custom hooks  
✅ useLayoutEffect - DOM measurements before paint  
✅ useImperativeHandle - Expose imperative methods  
✅ Creating reusable custom hooks  
✅ Hook patterns and composition  
✅ useTransition - Defer urgent updates  
✅ useDeferredValue - Defer values  
✅ useId - Generate unique IDs  
✅ useInsertionEffect - Inject styles  
✅ useSyncExternalStore - External stores  
✅ Automatic batching - Group updates  
✅ Suspense for data - Wait for async  
✅ startTransition - Mark non-urgent work  
✅ React DevTools - Debug applications  
✅ Accessibility - Make apps usable for all  
✅ Best practices - Code quality patterns  
✅ Common mistakes - What to avoid  

---

## Complete React Interview Coverage (120 Questions)

**Basic Level (Q1-25):** Core React concepts  
**Intermediate Level (Q26-60):** Patterns and hooks  
**Advanced Level Part 1 (Q61-80):** Rendering and performance  
**Advanced Level Part 2 (Q81-100):** Implementation and state management  
**Advanced Level Part 3 (Q101-120):** React 18+ hooks and best practices  

**Total: 120 comprehensive React interview questions with complete answers!** 🚀

Congratulations on preparing for React interviews! This comprehensive guide covers everything from basics to advanced concepts!
