# React Interview Questions - Intermediate Level (Q56-Q60 Detailed Answers)

## 56. What is useLayoutEffect hook?

**Answer:**

`useLayoutEffect` is like `useEffect` but it **runs synchronously BEFORE the browser paints** (displays) the screen. Use it when you need to measure or change the DOM before the user sees it.

### Simple Analogy:

Think of it like preparing a room:
- **useEffect** = Paint the wall, THEN measure it
- **useLayoutEffect** = Measure the wall FIRST, THEN paint it

With useLayoutEffect, the user never sees the "wrong" measurement.

### Timing Difference:

```
useEffect Timeline:
  1. Component renders
  ↓
  2. Browser paints (user sees page)
  ↓
  3. useEffect runs
  ↓
  4. If useEffect changes DOM, page flickers

useLayoutEffect Timeline:
  1. Component renders
  ↓
  2. useLayoutEffect runs (before paint!)
  ↓
  3. Browser paints (user sees correct version)
  ↓
  4. No flicker!
```

### Real Example 1 - Measuring DOM Element:

```javascript
import { useLayoutEffect, useRef, useState } from 'react';

function MeasureComponent() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  
  // useLayoutEffect - measure BEFORE paint
  useLayoutEffect(() => {
    console.log('Measuring element...');
    // Get the height while DOM is ready but not painted yet
    const elementHeight = ref.current.offsetHeight;
    setHeight(elementHeight);
    
    console.log('Height measured:', elementHeight);
  }, []); // Run once on mount
  
  return (
    <div>
      <div ref={ref} style={{ fontSize: '20px' }}>
        <p>This is some content</p>
        <p>Height: {height}px</p>
      </div>
    </div>
  );
}
```

**Timeline:**
```
1. Component renders
2. ref.current.offsetHeight is calculated (correct size)
3. setHeight(elementHeight) called
4. Browser paints page
5. User sees correct height immediately (no flicker)
```

### Real Example 2 - Tooltip Positioning:

```javascript
import { useLayoutEffect, useRef, useState } from 'react';

function TooltipExample() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);
  
  useLayoutEffect(() => {
    if (targetRef.current && tooltipRef.current) {
      // Measure both elements BEFORE paint
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate position
      const top = targetRect.top - tooltipRect.height - 10;
      const left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
      
      // Set position before paint
      setPosition({ top, left });
    }
  }, []);
  
  return (
    <div>
      <button ref={targetRef}>Hover me</button>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
          background: 'black',
          color: 'white',
          padding: '5px'
        }}
      >
        Tooltip text
      </div>
    </div>
  );
}
```

**Why useLayoutEffect?**
- Tooltip position calculated before paint
- User never sees tooltip in wrong position
- With useEffect, tooltip might flicker

### useEffect vs useLayoutEffect Comparison:

```javascript
// ❌ Using useEffect (might flicker)
function FlickerExample() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    // This runs AFTER paint
    // Page already displayed with height=0
    // Then height updates, page re-renders
    // User sees flicker
    setHeight(ref.current.offsetHeight);
  }, []);
  
  return (
    <div ref={ref} style={{ height: `${height}px` }}>
      Content
    </div>
  );
}

// ✅ Using useLayoutEffect (no flicker)
function NoFlickerExample() {
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  
  useLayoutEffect(() => {
    // This runs BEFORE paint
    // Height measured and set before display
    // User sees correct height immediately
    setHeight(ref.current.offsetHeight);
  }, []);
  
  return (
    <div ref={ref} style={{ height: `${height}px` }}>
      Content
    </div>
  );
}
```

### Performance Warning:

⚠️ **useLayoutEffect blocks painting** - use sparingly!

```javascript
// ❌ BAD - blocks painting for 1 second
useLayoutEffect(() => {
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // Do nothing for 1 second
  }
  setData(expensiveCalculation());
}, []);

// ✅ GOOD - use useEffect for non-blocking operations
useEffect(() => {
  setData(expensiveCalculation());
}, []);
```

### When to Use:

✅ **Measuring DOM elements**  
✅ **Positioning elements** (tooltips, popovers)  
✅ **Animations** (initial calculations)  
✅ **When you need synchronous measurements**  

❌ **API calls** - Use useEffect  
❌ **Setting data** - Use useEffect  
❌ **Expensive calculations** - Use useEffect  

---

## 57. What is useImperativeHandle hook?

**Answer:**

`useImperativeHandle` lets **parent components directly call methods on child components**. It's like giving the parent a remote control for the child.

### Simple Analogy:

Think of it like a **remote control for a TV**:
- Without it: Parent can only pass props (limited control)
- With it: Parent can call methods like `play()`, `pause()`, `changeChannel()`

### Basic Syntax:

```javascript
useImperativeHandle(ref, () => ({
  method1: () => { /* ... */ },
  method2: () => { /* ... */ }
}));
```

### Real Example 1 - Input Focus:

```javascript
import { useRef, useImperativeHandle, forwardRef } from 'react';

// Child component with forwardRef
const FocusableInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  
  // Expose methods to parent through ref
  useImperativeHandle(ref, () => ({
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
  const inputRef = useRef(null);
  
  return (
    <div>
      <FocusableInput ref={inputRef} />
      
      {/* Call methods on child through ref */}
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

**What Happens:**
```
User clicks "Focus Input":
  ↓ inputRef.current.focus() is called
  ↓ Method from useImperativeHandle executes
  ↓ Input element gets focus

User clicks "Clear Input":
  ↓ inputRef.current.clear() is called
  ↓ Input value is cleared

User clicks "Get Value":
  ↓ inputRef.current.getValue() is called
  ↓ Returns input value to parent
```

### Real Example 2 - Media Player Control:

```javascript
import { useRef, useImperativeHandle, forwardRef } from 'react';

const MediaPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
    },
    pause: () => {
      videoRef.current.pause();
    },
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    getCurrentTime: () => {
      return videoRef.current.currentTime;
    },
    getDuration: () => {
      return videoRef.current.duration;
    }
  }));
  
  return (
    <video
      ref={videoRef}
      src="movie.mp4"
      width="400"
      height="300"
    />
  );
});

// Parent component
function VideoApp() {
  const playerRef = useRef(null);
  
  return (
    <div>
      <MediaPlayer ref={playerRef} />
      
      <button onClick={() => playerRef.current.play()}>
        Play
      </button>
      
      <button onClick={() => playerRef.current.pause()}>
        Pause
      </button>
      
      <button onClick={() => playerRef.current.seek(30)}>
        Jump to 30s
      </button>
      
      <button onClick={() => {
        console.log('Time:', playerRef.current.getCurrentTime());
        console.log('Duration:', playerRef.current.getDuration());
      }}>
        Show Info
      </button>
    </div>
  );
}
```

### Real Example 3 - Form Control:

```javascript
import { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const AdvancedForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  useImperativeHandle(ref, () => ({
    submit: () => {
      console.log('Submitting:', formData);
      // Send to server
    },
    reset: () => {
      setFormData({ name: '', email: '', message: '' });
    },
    setValues: (values) => {
      setFormData(values);
    },
    getValues: () => {
      return formData;
    }
  }));
  
  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        placeholder="Message"
      />
    </form>
  );
});

// Parent component
function FormController() {
  const formRef = useRef(null);
  
  return (
    <div>
      <AdvancedForm ref={formRef} />
      
      <button onClick={() => formRef.current.submit()}>
        Submit
      </button>
      
      <button onClick={() => formRef.current.reset()}>
        Reset
      </button>
      
      <button onClick={() => {
        formRef.current.setValues({
          name: 'John',
          email: 'john@example.com',
          message: 'Hello'
        });
      }}>
        Fill Form
      </button>
    </div>
  );
}
```

### When to Use:

✅ **DOM measurement and positioning**  
✅ **Managing focus, text selection**  
✅ **Triggering animations**  
✅ **Controlling media playback**  
✅ **Form management**  

❌ **Most data passing** - Use props  
❌ **Event handling** - Use callbacks  

---

## 58. What are custom hooks?

**Answer:**

**Custom hooks** are JavaScript functions that use other hooks and extract component logic into reusable functions. They start with the word "use".

### Simple Analogy:

Think of custom hooks like **recipes**:
- Regular hooks (useState, useEffect) = Basic ingredients
- Custom hooks = Complete recipes made from ingredients
- You can share and reuse recipes

### Why Custom Hooks?

```javascript
// ❌ WITHOUT custom hook - logic scattered
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  return <div>{user?.name}</div>;
}

function ProductsList() {
  // Same logic repeated!
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  return <div>{products?.length} products</div>;
}
```

**Problem:** Logic repeated! Hard to maintain!

### ✅ WITH Custom Hook:

```javascript
// Custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Use it everywhere!
function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user');
  return <div>{user?.name}</div>;
}

function ProductsList() {
  const { data: products, loading, error } = useFetch('/api/products');
  return <div>{products?.length} products</div>;
}

function CommentsList() {
  const { data: comments, loading, error } = useFetch('/api/comments');
  return <div>{comments?.length} comments</div>;
}
```

**Benefit:** Logic written once, reused everywhere!

---

## 59. How do you create a custom hook?

**Answer:**

Creating a custom hook is simple: extract hook logic into a function that starts with "use".

### Step-by-Step Example 1 - useCounter:

```javascript
import { useState } from 'react';

// Step 1: Create function starting with "use"
function useCounter(initialValue = 0) {
  // Step 2: Use other hooks inside
  const [count, setCount] = useState(initialValue);
  
  // Step 3: Create helper functions
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  // Step 4: Return what you want to expose
  return { count, increment, decrement, reset };
}

// Step 5: Use your custom hook!
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

### Step-by-Step Example 2 - useLocalStorage:

```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

// Use it
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');
  
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Saved name: {name}</p>
    </div>
  );
}
```

**What Happens:**
```
1. Page loads
2. useLocalStorage reads from localStorage
3. Shows saved name
4. User types new name
5. setName is called
6. useEffect runs and saves to localStorage
7. On page reload, saved name is restored
```

### Example 3 - useForm:

```javascript
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  return {
    values,
    handleChange,
    resetForm,
    setValues,
    errors,
    setErrors
  };
}

// Use it
function LoginForm() {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', values);
    resetForm();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
      <button onClick={resetForm}>Reset</button>
    </form>
  );
}
```

### Rules for Custom Hooks:

1. **Must start with "use"** - So React knows it's a hook
2. **Can use other hooks** - useState, useEffect, etc.
3. **Only call at top level** - Same rules as regular hooks
4. **Only call from React functions** - Components or other hooks

---

## 60. What is React.lazy and code splitting?

**Answer:**

**Code splitting** breaks your app into smaller pieces that load on demand. `React.lazy` is a function that lets you lazy-load components.

### Problem Without Code Splitting:

```javascript
// Everything in one bundle
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  const [page, setPage] = useState('home');
  
  // User downloads ALL pages even if they only visit home!
  // Bundle size: 500KB
  // Initial load: 2 seconds
}
```

### Solution - React.lazy & Code Splitting:

```javascript
import { lazy, Suspense } from 'react';

// Load components only when needed
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  const [page, setPage] = useState('home');
  
  // User downloads only Home page initially
  // Bundle size: 100KB
  // Initial load: 0.3 seconds
  // Other pages load when user navigates
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {page === 'home' && <Home />}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
      {page === 'dashboard' && <Dashboard />}
    </Suspense>
  );
}
```

### Real Example - Route-Based Code Splitting:

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load each route
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const ProductsPage = lazy(() => import('./pages/Products'));
const ContactPage = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**Timeline:**
```
Initial load:
  1. Download Home page code only (50KB)
  2. Show page in 0.3 seconds

User clicks "About":
  1. Download About page code (40KB)
  2. Show "Loading..." while downloading
  3. Show About page

User clicks "Products":
  1. Download Products page code (60KB)
  2. Show "Loading..." while downloading
  3. Show Products page

User clicks "Contact":
  1. Download Contact page code (30KB)
  2. Show "Loading..." while downloading
  3. Show Contact page

Total downloaded: 180KB (spread over time, not all at once!)
```

### Real Example - Modal Code Splitting:

```javascript
import { lazy, Suspense, useState } from 'react';

// Lazy load modal
const DeleteConfirmModal = lazy(() => import('./modals/DeleteConfirm'));

function UserList() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => setShowDeleteModal(true)}>
        Delete User
      </button>
      
      {/* Only load modal code when needed */}
      {showDeleteModal && (
        <Suspense fallback={<p>Loading modal...</p>}>
          <DeleteConfirmModal onClose={() => setShowDeleteModal(false)} />
        </Suspense>
      )}
    </div>
  );
}
```

### Benefits of Code Splitting:

✅ **Smaller initial bundle** - Faster page load  
✅ **Better performance** - Load what's needed  
✅ **Saved bandwidth** - Users don't download unused code  
✅ **Improved UX** - Page appears faster  

### Bundle Size Comparison:

```
Without code splitting:
  Total: 500KB
  Initial: 500KB
  Load time: 2 seconds

With code splitting:
  Total: 500KB (same)
  Initial: 100KB (80% smaller!)
  Load time: 0.3 seconds (6x faster!)
```

---

## Complete Summary of Q56-Q60

You now understand:

✅ **useLayoutEffect** - Sync effects before paint  
✅ **useImperativeHandle** - Direct child control  
✅ **Custom hooks** - Reusable logic extraction  
✅ **Creating custom hooks** - How to build them  
✅ **React.lazy & code splitting** - Load on demand  

**You've completed the Intermediate Level (Q26-Q60)!** 🎉

---

## What's Next?

You're ready for **Advanced Level (Q61-Q100)** which covers:
- Reconciliation and Virtual DOM
- Fiber architecture
- Performance optimization
- State management libraries (Redux, Zustand)
- Server-side rendering
- And much more!
