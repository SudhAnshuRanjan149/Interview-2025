# React Interview Questions - Intermediate Level (Q46-Q55 Detailed Answers)

## 46. What is Context API?

**Answer:**

**Context API** is React's built-in way to share data between components without passing props through every level. It's like a "global storage" that any component can access.

### Simple Analogy:

Think of Context API like a **shared office bulletin board**:
- Instead of each person telling everyone the announcement individually
- You post it once on the bulletin board
- Everyone reads it from the board when they need it

### Problem Without Context API:

```javascript
// Data travels through many levels (prop drilling)
function App() {
  const theme = 'dark';
  return <Level1 theme={theme} />;
}

function Level1({ theme }) {
  return <Level2 theme={theme} />;
}

function Level2({ theme }) {
  return <Level3 theme={theme} />;
}

function Level3({ theme }) {
  return <Level4 theme={theme} />;
}

function Level4({ theme }) {
  // Finally uses theme after passing through 3 levels!
  return <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
    Content
  </div>;
}
```

**Problem:** Theme passes through Level1, Level2, Level3 even though they don't use it!

### Solution With Context API:

```javascript
import { createContext, useContext } from 'react';

// Step 1: Create context
const ThemeContext = createContext();

// Step 2: Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useContext(useState('light'));
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Create custom hook to use context
function useTheme() {
  return useContext(ThemeContext);
}

// Step 4: Use in your app
function App() {
  return (
    <ThemeProvider>
      <Level1 />
    </ThemeProvider>
  );
}

function Level1() {
  return <Level2 />;
}

function Level2() {
  return <Level3 />;
}

function Level3() {
  return <Level4 />;
}

function Level4() {
  // Gets theme directly from context!
  const { theme } = useTheme();
  return <div style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
    Content
  </div>;
}
```

### When to Use Context API:

✅ **Theme** (dark/light mode)  
✅ **User information** (logged-in user)  
✅ **Language** (i18n/internationalization)  
✅ **Global settings**  

❌ **Frequently changing data** - Can cause unnecessary re-renders  
❌ **Complex logic** - Use Redux instead  

---

## 47. How do you create a context?

**Answer:**

Creating a context is a 3-step process: create, provide, consume.

### Step 1: Create Context

```javascript
import { createContext } from 'react';

// Create a context object
const NotificationContext = createContext();
```

### Step 2: Create Provider Component

```javascript
import { useState, createContext } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    
    // Remove after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };
  
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  const value = {
    notifications,
    addNotification,
    removeNotification
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
```

### Step 3: Create Custom Hook to Use Context

```javascript
import { useContext, createContext } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  
  return context;
}
```

### Real Example - User Authentication Context:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is logged in on mount
  useEffect(() => {
    checkLoginStatus();
  }, []);
  
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    fetch('/api/logout', { method: 'POST' });
  };
  
  const value = { user, loading, error, login, logout };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
```

### Usage:

```javascript
function App() {
  return (
    <AuthProvider>
      <Header />
      <Main />
    </AuthProvider>
  );
}

function Header() {
  const { user, logout } = useAuth();
  
  return (
    <header>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </header>
  );
}
```

---

## 48. How do you use useContext?

**Answer:**

`useContext` is the hook that lets you access context values created with `createContext`.

### Simple Syntax:

```javascript
const value = useContext(SomeContext);
```

### Real Example - Using Theme Context:

```javascript
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Card() {
  // Get value from context
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h2>My Card</h2>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

### Using with Multiple Contexts:

```javascript
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { UserContext } from './UserContext';

function Dashboard() {
  // Get from multiple contexts
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  
  return (
    <div style={{
      background: theme === 'dark' ? '#333' : '#fff'
    }}>
      <h1>Welcome, {user.name}</h1>
      <p>Current theme: {theme}</p>
    </div>
  );
}
```

### Using Custom Hook (Recommended):

```javascript
// Instead of:
const { theme } = useContext(ThemeContext);

// Better:
const { theme } = useTheme(); // Custom hook

// Why? Custom hook handles error checking:
function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}
```

---

## 49. How do you provide context?

**Answer:**

Providing context means wrapping your app (or part of it) with the Context Provider.

### Step 1: Import Provider

```javascript
import { ThemeProvider } from './context/ThemeContext';
```

### Step 2: Wrap Components

```javascript
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}
```

### Real Example - Multiple Providers:

```javascript
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <Header />
          <Main />
          <Footer />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

### Where to Provide:

```javascript
// Option 1: At root level (everywhere has access)
function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}

// Option 2: At specific level (only children have access)
function PageA() {
  return (
    <ThemeProvider>
      <Header /> {/* Has access */}
      <Content /> {/* Has access */}
    </ThemeProvider>
  );
}

function PageB() {
  // This page doesn't have ThemeProvider!
  // Can't use useTheme() here
}
```

---

## 50. When should you use Context API?

**Answer:**

Context API is great for some things but not others.

### ✅ GOOD Use Cases:

**1. Theme (dark/light mode)**
```javascript
// Perfect because:
// - Changes rarely
// - Needed in many places
// - Doesn't need to be very fast

const { theme, toggleTheme } = useTheme();
```

**2. User Authentication**
```javascript
// Perfect because:
// - Set once on login
// - Used throughout app
// - Doesn't change frequently

const { user, logout } = useAuth();
```

**3. Global Settings**
```javascript
// Perfect because:
// - Set once
// - Used in many places
// - Rarely changes

const { fontSize, language } = useSettings();
```

**4. User Preferences**
```javascript
// Perfect because:
// - Personalized per user
// - Used in many components
// - Changes occasionally

const { sidebarOpen, notifications } = usePreferences();
```

### ❌ BAD Use Cases:

**1. Frequently Changing Data**
```javascript
// ❌ BAD - causes re-renders of entire tree
// Every time count changes, ALL consumers re-render
const { count, setCount } = useCounter();

// Better: Use useState in component or Redux
```

**2. Real-time Data**
```javascript
// ❌ BAD - Context wasn't designed for this
// Updates 60 times per second (mouse position)
const { mouseX, mouseY } = useMouseTracker();

// Better: Use useState with event listeners
```

**3. Complex State Logic**
```javascript
// ❌ BAD - Context doesn't scale well
// Too many actions, complex reducers
// Hard to debug

// Better: Use Redux or Zustand
```

### Performance Comparison:

```javascript
// Fast - value doesn't change often
<ThemeContext.Provider value={{ theme: 'dark' }}>
  {children}
</ThemeContext.Provider>

// Slow - causes re-renders every time
<CounterContext.Provider value={{ count, setCount }}>
  {children}
</CounterContext.Provider>

// Very Slow - updates every millisecond
<MouseContext.Provider value={{ x: 234, y: 456 }}>
  {children}
</MouseContext.Provider>
```

### Decision Tree:

```
Is the data used in many components?
├─ No → Use useState locally
└─ Yes → Does it change frequently?
    ├─ Yes → Use Redux/Zustand
    └─ No → Use Context API ✓
```

---

## 51. What is the purpose of useCallback?

**Answer:**

`useCallback` prevents child components from re-rendering unnecessarily by keeping function references the same.

### The Problem:

```javascript
function Parent() {
  // This creates NEW function every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  // Re-renders even though function logic didn't change
  return <button onClick={onClick}>Click</button>;
}
```

### The Solution:

```javascript
import { useCallback } from 'react';

function Parent() {
  // Function stays the SAME between renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = never changes
  
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  // Only re-renders when onClick actually changes
  return <button onClick={onClick}>Click</button>;
}
```

### When to Use:

✅ Passing function to `React.memo` component  
✅ Using function as dependency in useEffect  
✅ Function used in expensive computations  

❌ Simple event handlers  
❌ Callbacks not passed to children  

### Real Example:

```javascript
import { useCallback, useState, memo } from 'react';

function SearchApp() {
  const [query, setQuery] = useState('');
  
  // This function reference stays the same
  const handleSearch = useCallback((searchTerm) => {
    console.log('Searching:', searchTerm);
    fetch(`/api/search?q=${searchTerm}`);
  }, []); // Never changes, so SearchResults doesn't re-render
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchResults onSearch={handleSearch} />
    </div>
  );
}

// Memoized component - only re-renders if props change
const SearchResults = memo(function SearchResults({ onSearch }) {
  console.log('SearchResults rendered');
  return <div>Search results here</div>;
});
```

---

## 52. When should you use useMemo?

**Answer:**

Use `useMemo` when you have **expensive calculations** that shouldn't run every render.

### When to Use:

✅ **Filtering/sorting large arrays**
```javascript
const filteredUsers = useMemo(() => {
  return users.filter(u => u.active);
}, [users]);
```

✅ **Complex calculations**
```javascript
const stats = useMemo(() => {
  return calculateStats(data);
}, [data]);
```

✅ **Creating objects for dependencies**
```javascript
const obj = useMemo(() => ({
  x: position.x,
  y: position.y
}), [position.x, position.y]);
```

### When NOT to Use:

❌ **Simple calculations**
```javascript
// Don't need useMemo for this
const doubled = useMemo(() => count * 2, [count]);
```

❌ **Just storing values**
```javascript
// useMemo is overkill
const value = useMemo(() => 'hello', []);
```

❌ **Overusing**
```javascript
// Memoizing everything is slower!
const sum = useMemo(() => a + b, [a, b]); // No need
```

### Real Example:

```javascript
import { useMemo, useState } from 'react';

function StudentAnalytics() {
  const [students] = useState(generateLargeStudentList());
  const [selectedGrade, setSelectedGrade] = useState('all');
  
  // Only recalculate when selectedGrade changes
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    let filtered = students;
    if (selectedGrade !== 'all') {
      filtered = students.filter(s => s.grade === selectedGrade);
    }
    
    return {
      count: filtered.length,
      averageScore: filtered.reduce((sum, s) => sum + s.score, 0) / filtered.length,
      topStudent: filtered.sort((a, b) => b.score - a.score)[0]
    };
  }, [students, selectedGrade]);
  
  return (
    <div>
      <select onChange={(e) => setSelectedGrade(e.target.value)}>
        <option value="all">All Grades</option>
        <option value="A">Grade A</option>
        <option value="B">Grade B</option>
      </select>
      
      <p>Total: {statistics.count}</p>
      <p>Average Score: {statistics.averageScore.toFixed(2)}</p>
      <p>Top Student: {statistics.topStudent.name}</p>
    </div>
  );
}
```

---

## 53. What are performance issues in React?

**Answer:**

Common performance problems and their causes.

### Issue 1: Unnecessary Re-renders

```javascript
// ❌ Problem - parent re-render causes all children to re-render
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild /> {/* Re-renders even though props didn't change! */}
    </>
  );
}

// Solution - memoize child
const ExpensiveChild = React.memo(function ExpensiveChild() {
  return <div>Expensive to render</div>;
});
```

### Issue 2: Missing Dependencies

```javascript
// ❌ Problem - effect runs every render
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(); // Fetches every render!
  }); // No dependency array
}

// Solution - add dependencies
useEffect(() => {
  fetchUser();
}, []); // Run only once
```

### Issue 3: Large Lists

```javascript
// ❌ Problem - renders 10,000 items immediately
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => <UserItem key={user.id} user={user} />)}
    </ul>
  );
}

// Solution - virtualization
import { FixedSizeList } from 'react-window';

function OptimizedUserList({ users }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={users.length}
      itemSize={50}
    >
      {({ index, style }) => (
        <div style={style}>
          <UserItem user={users[index]} />
        </div>
      )}
    </FixedSizeList>
  );
}
```

### Issue 4: Expensive Calculations in Render

```javascript
// ❌ Problem - calculates every render
function Report({ data }) {
  const statistics = calculateComplexStats(data); // Slow!
  
  return <div>{statistics.average}</div>;
}

// Solution - memoize
const statistics = useMemo(() => {
  return calculateComplexStats(data);
}, [data]);
```

### Issue 5: Not Splitting Code

```javascript
// ❌ Problem - one large bundle
import App from './App';

// Solution - lazy load
const App = lazy(() => import('./App'));

<Suspense fallback={<div>Loading...</div>}>
  <App />
</Suspense>
```

---

## 54. How do you optimize re-renders?

**Answer:**

Strategies to prevent unnecessary re-renders.

### Strategy 1: React.memo

```javascript
// Memoize component - only re-render if props change
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

### Strategy 2: useCallback

```javascript
const handleClick = useCallback(() => {
  // Function reference stays same
}, [dependencies]);
```

### Strategy 3: useMemo

```javascript
const filteredList = useMemo(() => {
  // Calculation happens only when dependencies change
  return items.filter(item => item.active);
}, [items]);
```

### Strategy 4: Key in Lists

```javascript
// ✅ Correct - unique, stable keys
{items.map(item => <Item key={item.id} item={item} />)}

// ❌ Wrong - index as key can cause bugs
{items.map((item, idx) => <Item key={idx} item={item} />)}
```

### Strategy 5: Avoid Inline Objects

```javascript
// ❌ Creates new object every render
<Component style={{ color: 'red' }} />

// ✅ Reuse object
const style = { color: 'red' };
<Component style={style} />
```

### Real Example - Optimized List:

```javascript
import { useState, useCallback, useMemo, memo } from 'react';

// Memoized item component
const UserItem = memo(function UserItem({ user, onSelect }) {
  return (
    <li onClick={() => onSelect(user.id)}>
      {user.name}
    </li>
  );
});

function UserList() {
  const [users] = useState(generateUsers());
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('');
  
  // Memoize callback
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);
  
  // Memoize filtered list
  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);
  
  return (
    <>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      <ul>
        {filteredUsers.map(user => (
          <UserItem
            key={user.id}
            user={user}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </>
  );
}
```

---

## 55. What is lazy loading?

**Answer:**

**Lazy loading** means loading components or data **only when needed**, not all at once.

### Types of Lazy Loading:

### 1. Code Splitting (Load components on demand):

```javascript
import { lazy, Suspense } from 'react';

// Instead of importing normally
// import HeavyComponent from './HeavyComponent';

// Use lazy
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**Timeline:**
```
Initial load:
  ↓ Download only basic app code (small file)

User visits page with HeavyComponent:
  ↓ Download HeavyComponent code (larger file)
  ↓ Show "Loading..." while downloading
  ↓ Show component when ready
```

### 2. Lazy Load Images:

```javascript
function ImageGallery() {
  return (
    <div>
      {/* Load image when visible */}
      <img src="image.jpg" loading="lazy" alt="Gallery" />
      
      {/* Load image immediately (visible above fold) */}
      <img src="hero.jpg" alt="Hero" />
    </div>
  );
}
```

### 3. Infinite Scroll (Load data on scroll):

```javascript
import { useEffect, useRef, useState } from 'react';

function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  
  // Load more when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    });
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Fetch more items
  useEffect(() => {
    fetch(`/api/items?page=${page}`)
      .then(res => res.json())
      .then(data => setItems(prev => [...prev, ...data]));
  }, [page]);
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div ref={observerRef}>Loading more...</div>
    </div>
  );
}
```

### 4. Route-based Lazy Loading:

```javascript
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Each page loads only when visited
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

**Benefit:**
```
Without lazy loading:
  Bundle size: 500KB
  Initial load: 2 seconds

With lazy loading:
  Initial bundle: 100KB (only homepage)
  Initial load: 0.5 seconds
  Other pages load when visited
```

### Benefits of Lazy Loading:

✅ **Faster initial load** - Smaller initial bundle  
✅ **Better performance** - Only load what's needed  
✅ **Improved UX** - Page appears faster  
✅ **Saves bandwidth** - Users don't download unused code  

---

## Complete Summary of Q46-Q55

You now understand:

✅ **Context API** - Global state without prop drilling  
✅ **Creating context** - Step-by-step process  
✅ **Using useContext** - Accessing context values  
✅ **Providing context** - Wrapping with Provider  
✅ **When to use Context** - Best practices  
✅ **useCallback purpose** - Prevent re-renders  
✅ **When to use useMemo** - Expensive calculations  
✅ **Performance issues** - Common problems  
✅ **Optimizing re-renders** - Best practices  
✅ **Lazy loading** - Load on demand  

**These concepts help you build fast, scalable React applications!** 🚀
