# React Interview Questions - Intermediate Level (Detailed Answers)

## 26. What is useEffect hook?

**Answer:**

`useEffect` is a hook that lets you perform **side effects** in functional components. Side effects are actions that happen outside the component (like fetching data, updating DOM, setting timers, etc.).

### What are Side Effects?

Things that affect the world outside your component:
- ✅ Fetching data from API
- ✅ Updating document title
- ✅ Setting timers/intervals
- ✅ Subscribing to events
- ✅ Saving to localStorage

### Simple Analogy:

Think of useEffect like **"Do something after the component renders"**.

### Basic Syntax:

```javascript
useEffect(() => {
  // This code runs after component renders
  console.log('Component rendered!');
});
```

### Real Example:

```javascript
import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // This runs after every render
    document.title = `Count: ${count}`;
    console.log('Title updated to:', count);
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### When Component Renders vs When useEffect Runs:

```
1. Component renders → Shows count: 0
2. useEffect runs → Updates document title to "Count: 0"
3. User clicks button
4. count changes to 1
5. Component re-renders → Shows count: 1
6. useEffect runs → Updates document title to "Count: 1"
```

---

## 27. When does useEffect run?

**Answer:**

`useEffect` runs at different times depending on whether it has dependencies.

### No Dependencies:

```javascript
useEffect(() => {
  console.log('Runs after EVERY render');
});
```

**Runs:** After every single render

### Empty Dependencies Array:

```javascript
useEffect(() => {
  console.log('Runs only ONCE');
}, []);
```

**Runs:** Only once when component first mounts

### With Dependencies:

```javascript
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);
```

**Runs:** After render AND when `count` changes

### Complete Example:

```javascript
function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  
  // Runs once on mount
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // Runs when userId changes
  useEffect(() => {
    console.log('Fetching user:', userId);
    // Fetch user data here
  }, [userId]);
  
  // Runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });
  
  return (
    <div>
      <button onClick={() => setUserId(userId + 1)}>
        Load User {userId}
      </button>
    </div>
  );
}
```

### Timeline Example:

```
Component mounts
├─ Renders (shows userId: 1)
├─ useEffect with [] runs (logs "Component mounted")
└─ useEffect with [userId] runs (logs "Fetching user: 1")

User clicks button (userId changes to 2)
├─ Component re-renders
├─ useEffect with [] DOES NOT run (only runs once)
└─ useEffect with [userId] runs (logs "Fetching user: 2")
```

---

## 28. How do you cleanup in useEffect?

**Answer:**

Return a function from useEffect to **cleanup** (remove) side effects before the component unmounts or before the effect runs again.

### Why Cleanup?

- Stop subscriptions
- Clear timers
- Remove event listeners
- Cancel API requests

### Basic Syntax:

```javascript
useEffect(() => {
  // Setup
  console.log('Effect runs');
  
  // Cleanup function
  return () => {
    console.log('Cleanup runs');
  };
});
```

### Real Example - Timer:

```javascript
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Setup - start timer
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup - stop timer
    return () => {
      clearInterval(interval);
      console.log('Timer stopped');
    };
  }, []); // Only setup/cleanup once
  
  return <p>Time: {seconds}s</p>;
}
```

### Example - Event Listener:

```javascript
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    // Setup - add listener
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup - remove listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <p>Window width: {width}px</p>;
}
```

### Cleanup Timing:

```javascript
useEffect(() => {
  console.log('Effect setup');
  
  return () => {
    console.log('Cleanup runs');
  };
}, [dependency]);
```

**When cleanup runs:**
1. Before the effect runs again (if dependency changes)
2. Before component unmounts
3. When component is removed from page

### Multiple Cleanups:

```javascript
function DataSubscription() {
  useEffect(() => {
    // Setup 1 - subscribe to data
    const unsubscribe = subscribeToData();
    
    // Setup 2 - start timer
    const timer = setTimeout(() => {
      console.log('Timer done');
    }, 5000);
    
    // Cleanup - clean up both
    return () => {
      unsubscribe(); // Stop subscription
      clearTimeout(timer); // Stop timer
    };
  }, []);
}
```

---

## 29. What are dependencies in useEffect?

**Answer:**

Dependencies are **values that the effect depends on**. When they change, the effect runs again.

### Dependency Array:

```javascript
useEffect(() => {
  // Effect code
}, [dependency1, dependency2]); // Dependencies here
```

### Three Cases:

**No dependencies (runs every render):**
```javascript
useEffect(() => {
  console.log('Runs after every render');
});
```

**Empty array (runs once on mount):**
```javascript
useEffect(() => {
  console.log('Runs only once');
}, []);
```

**With dependencies (runs when they change):**
```javascript
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);
```

### Real Example:

```javascript
function UserProfile() {
  const [userId, setUserId] = useState(1);
  const [userName, setUserName] = useState('');
  
  // Fetch user data when userId changes
  useEffect(() => {
    console.log('Fetching user:', userId);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUserName(data.name));
  }, [userId]); // Only depends on userId
  
  return (
    <div>
      <p>User: {userName}</p>
      <button onClick={() => setUserId(userId + 1)}>Next User</button>
    </div>
  );
}
```

### What NOT to Include:

```javascript
// ❌ WRONG - includes functions created inside
useEffect(() => {
  const fetchData = () => { /* ... */ };
  fetchData();
}, [fetchData]); // This will re-run every render!

// ✅ CORRECT - move function outside
const fetchData = () => { /* ... */ };

useEffect(() => {
  fetchData();
}, []); // Now it only runs once
```

### Common Mistake - Infinite Loop:

```javascript
// ❌ WRONG - infinite loop!
function App() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    // This updates items
    setItems([...items, 'new item']);
  }, [items]); // This runs again when items changes!
}
```

**Timeline:**
1. Effect runs, updates items
2. items changes, so effect runs again
3. Effect runs, updates items again
4. items changes again... infinite loop!

### Complete Example:

```javascript
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  // Only fetch when searchTerm changes
  useEffect(() => {
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }
    
    console.log('Searching for:', searchTerm);
    
    // Fetch API
    fetch(`/api/search?q=${searchTerm}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [searchTerm]); // Depend on searchTerm
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 30. What is useContext hook?

**Answer:**

`useContext` is a hook that lets you **access context values** without prop drilling (passing props through many levels).

### The Problem - Prop Drilling:

```javascript
// Component A
function App() {
  const user = { name: 'Alice' };
  return <ComponentB user={user} />;
}

// Component B
function ComponentB(props) {
  return <ComponentC user={props.user} />;
}

// Component C
function ComponentC(props) {
  return <ComponentD user={props.user} />;
}

// Component D - finally uses it
function ComponentD(props) {
  return <p>User: {props.user.name}</p>;
}
```

**Problem:** Too many props passed through intermediate components!

### Solution - useContext:

```javascript
// Create context
const UserContext = React.createContext();

// Provide at top
function App() {
  const user = { name: 'Alice' };
  return (
    <UserContext.Provider value={user}>
      <ComponentB />
    </UserContext.Provider>
  );
}

// Use anywhere
function ComponentD() {
  const user = useContext(UserContext); // Direct access!
  return <p>User: {user.name}</p>;
}
```

### Step by Step:

**1. Create context:**
```javascript
const ThemeContext = React.createContext();
```

**2. Provide value:**
```javascript
function App() {
  const theme = 'dark';
  
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}
```

**3. Use anywhere:**
```javascript
function Header() {
  const theme = useContext(ThemeContext);
  return <header style={{ background: theme }}>Header</header>;
}

function Main() {
  const theme = useContext(ThemeContext);
  return <main style={{ background: theme }}>Main</main>;
}
```

### Real Example - User Context:

```javascript
// Create context
const UserContext = React.createContext();

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use context
export function useUser() {
  return React.useContext(UserContext);
}

// App component
function App() {
  return (
    <UserProvider>
      <Header />
      <Profile />
    </UserProvider>
  );
}

// Use it anywhere
function Header() {
  const { user } = useUser();
  return <h1>Welcome, {user?.name}</h1>;
}

function Profile() {
  const { user, setUser } = useUser();
  return (
    <button onClick={() => setUser({ name: 'Bob' })}>
      Change User
    </button>
  );
}
```

---

## 31. What is useReducer hook?

**Answer:**

`useReducer` is a hook for managing **complex state** with multiple related values. It's like useState but for complicated logic.

### When to Use:

- Multiple state values that depend on each other
- Complex state updates
- When you have many related state changes

### Basic Syntax:

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Simple Example - Counter:

```javascript
function Counter() {
  // Define reducer function
  const reducer = (state, action) => {
    if (action.type === 'INCREMENT') {
      return { count: state.count + 1 };
    }
    if (action.type === 'DECREMENT') {
      return { count: state.count - 1 };
    }
    return state;
  };
  
  // Use reducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

### Real Example - Todo List:

```javascript
function TodoApp() {
  // Reducer function
  const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          todos: [...state.todos, { id: Date.now(), text: action.payload }],
          filter: state.filter
        };
      case 'DELETE_TODO':
        return {
          todos: state.todos.filter(todo => todo.id !== action.payload),
          filter: state.filter
        };
      case 'SET_FILTER':
        return {
          todos: state.todos,
          filter: action.payload
        };
      default:
        return state;
    }
  };
  
  // Initial state
  const initialState = { todos: [], filter: 'all' };
  
  // Use reducer
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
  
  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };
  
  return (
    <div>
      <button onClick={() => addTodo('Learn React')}>Add Todo</button>
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Reducer Patterns:

```javascript
// Pattern 1: Switch statement
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Pattern 2: If statements
const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  }
  if (action.type === 'DECREMENT') {
    return state - 1;
  }
  return state;
};

// Pattern 3: Object handlers
const handlers = {
  INCREMENT: (state) => state + 1,
  DECREMENT: (state) => state - 1
};

const reducer = (state, action) => {
  return handlers[action.type]?.(state) ?? state;
};
```

---

## 32. What is useCallback hook?

**Answer:**

`useCallback` **remembers** a function so it has the same reference on every render (unless dependencies change).

### Why Use It?

Prevents unnecessary re-renders of child components that receive the function as props.

### Problem It Solves:

```javascript
function Parent() {
  // This function is created NEW every render
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // Child gets a NEW function reference every time
  // So Child re-renders even if nothing changed!
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  console.log('Child rendered'); // Logs every time parent renders
  return <button onClick={onClick}>Click</button>;
}
```

### Solution - useCallback:

```javascript
import { useCallback } from 'react';

function Parent() {
  // This function has the SAME reference on every render
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = remember forever
  
  // Child gets the SAME function reference
  // So Child doesn't re-render unnecessarily
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  console.log('Child rendered'); // Logs only once now!
  return <button onClick={onClick}>Click</button>;
}
```

### Syntax:

```javascript
const memoizedFunction = useCallback(() => {
  // Function code
}, [dependencies]);
```

### Real Example - Search with Debounce:

```javascript
function SearchApp() {
  const [query, setQuery] = React.useState('');
  
  // This function keeps same reference
  // Only recreates if query changes
  const handleSearch = useCallback((searchTerm) => {
    console.log('Searching for:', searchTerm);
    // API call here
  }, [query]); // Recreate if query changes
  
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults onSearch={handleSearch} />
    </div>
  );
}
```

### When to Use:

✅ Passing callbacks to optimized child components  
✅ Using function as dependency in useEffect  
✅ Expensive function calculations  
❌ Don't overuse - minor performance impact for most cases  

---

## 33. What is useMemo hook?

**Answer:**

`useMemo` **remembers** a computed value so expensive calculations don't run every render.

### Problem - Expensive Calculations:

```javascript
function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('Alice');
  
  // This runs EVERY render, even when name doesn't change
  const expensiveValue = fibonacci(count); // Takes time!
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Fibonacci: {expensiveValue}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // Slow!
}
```

**Problem:** Fibonacci is calculated every time, even when count doesn't change!

### Solution - useMemo:

```javascript
function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('Alice');
  
  // Only recalculate when count changes
  const expensiveValue = React.useMemo(() => {
    return fibonacci(count);
  }, [count]); // Only depends on count
  
  return (
    <div>
      <p>Fibonacci: {expensiveValue}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### Syntax:

```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // Recalculate when a or b changes
```

### Real Example - Filter Large List:

```javascript
function UserList({ users, selectedFilter }) {
  // Only filter when users or selectedFilter changes
  const filteredUsers = React.useMemo(() => {
    console.log('Filtering...');
    return users.filter(user => user.type === selectedFilter);
  }, [users, selectedFilter]);
  
  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### When to Use:

✅ Expensive calculations  
✅ Filtering/sorting large lists  
✅ Creating objects/arrays used as dependencies  
❌ Simple calculations  
❌ Rendering changes  

---

## 34. What is useRef hook?

**Answer:**

`useRef` lets you access DOM elements or store values that **don't cause re-renders** when changed.

### Use Cases:

1. Access DOM elements directly
2. Store mutable values
3. Keep values between renders

### Accessing DOM Elements:

```javascript
function TextInput() {
  const inputRef = React.useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus(); // Direct DOM access!
  };
  
  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

### Storing Mutable Values:

```javascript
function Stopwatch() {
  const [time, setTime] = React.useState(0);
  const intervalRef = React.useRef(null); // Remember interval ID
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current); // Stop using remembered ID
  };
  
  return (
    <div>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Keeping Previous Value:

```javascript
function Counter() {
  const [count, setCount] = React.useState(0);
  const prevCountRef = React.useRef();
  
  React.useEffect(() => {
    prevCountRef.current = count; // Remember previous value
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### useRef vs useState:

| Feature | useRef | useState |
|---------|--------|----------|
| **Re-render** | No | Yes |
| **Mutable** | Yes | No |
| **Persists** | Across renders | Across renders |
| **Use** | DOM access, internal values | Display data |

---

## 35. What are the rules of hooks?

**Answer:**

Hooks have special rules to work correctly. Break them and your code will have bugs!

### Rule 1: Only Call Hooks at Top Level

❌ WRONG - Inside loops:
```javascript
function App() {
  for (let i = 0; i < 10; i++) {
    const [state, setState] = useState(0); // WRONG!
  }
}
```

❌ WRONG - Inside conditions:
```javascript
function App() {
  if (condition) {
    const [state, setState] = useState(0); // WRONG!
  }
}
```

✅ CORRECT - At top level:
```javascript
function App() {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState('');
  
  if (condition) {
    // OK - use hook here, just don't declare it here
    setState1(5);
  }
}
```

### Rule 2: Only Call Hooks from React Functions

❌ WRONG - Regular JavaScript function:
```javascript
function regularFunction() {
  const [state, setState] = useState(0); // WRONG!
}
```

✅ CORRECT - React component:
```javascript
function MyComponent() {
  const [state, setState] = useState(0); // CORRECT
}
```

✅ CORRECT - Custom hook:
```javascript
function useCustomHook() {
  const [state, setState] = useState(0); // CORRECT
  return state;
}
```

### Rule 3: Use ESLint Plugin

Install plugin to catch hook violations:
```bash
npm install --save-dev eslint-plugin-react-hooks
```

Then add to `.eslintrc`:
```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error"
  }
}
```

### Why These Rules Exist?

React relies on **hook call order**:

```javascript
// First render
const [name, setName] = useState(''); // Hook 1
const [age, setAge] = useState(0);    // Hook 2
const [email, setEmail] = useState(''); // Hook 3

// React remembers: Hook 1 = name, Hook 2 = age, Hook 3 = email
```

If you call hooks conditionally:

```javascript
// Problem render (conditional hook)
if (condition) {
  const [name, setName] = useState(''); // Hook 1 (might not run!)
}
const [age, setAge] = useState(0); // Hook 2 (now Hook 1!)
const [email, setEmail] = useState(''); // Hook 3 (now Hook 2!)

// React gets confused - wrong state values!
```

### Summary of Rules:

1. **Only at top level** - Not in loops or conditions
2. **Only in React functions** - Components and custom hooks
3. **Custom hooks start with `use`** - So linter can find them

---

## 36. What are controlled components?

**Answer:**

**Controlled components** are form elements (input, textarea, select) where React controls the value.

### What Does "Controlled" Mean?

React "controls" the value by:
1. Storing value in state
2. Updating state on change
3. Setting input value from state

### Simple Example:

```javascript
function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* React controls this input */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      
      {/* React controls this too */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### Flow:

```
1. User types "hello@example.com"
2. onChange event fires
3. setEmail updates state
4. Component re-renders
5. Input value is updated from state
```

### With Select:

```javascript
function CountrySelector() {
  const [country, setCountry] = React.useState('US');
  
  return (
    <select value={country} onChange={(e) => setCountry(e.target.value)}>
      <option value="US">United States</option>
      <option value="UK">United Kingdom</option>
      <option value="CA">Canada</option>
    </select>
  );
}
```

### With Checkbox:

```javascript
function SubscribeForm() {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  
  return (
    <label>
      <input
        type="checkbox"
        checked={isSubscribed}
        onChange={(e) => setIsSubscribed(e.target.checked)}
      />
      Subscribe to newsletter
    </label>
  );
}
```

### Benefits:

✅ Always know input value  
✅ Easy validation  
✅ Can disable/enable buttons  
✅ Real-time feedback  

---

## 37. What are uncontrolled components?

**Answer:**

**Uncontrolled components** are form elements where the DOM itself stores the value (React doesn't control it).

### How It Works:

```javascript
function LoginForm() {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Get value from DOM directly
    console.log('Email:', emailRef.current.value);
    console.log('Password:', passwordRef.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* No value prop, no onChange */}
      <input ref={emailRef} type="email" placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Controlled vs Uncontrolled:

| Aspect | Controlled | Uncontrolled |
|--------|-----------|-------------|
| **Value stored** | React state | DOM |
| **Getting value** | From state | From DOM ref |
| **Updating** | onChange event | Direct manipulation |
| **Default** | value prop | defaultValue |
| **Validation** | Real-time | On submit |

### Default Value:

```javascript
function Form() {
  const inputRef = React.useRef(null);
  
  return (
    <>
      {/* defaultValue sets initial value, not controlled by React */}
      <input ref={inputRef} type="text" defaultValue="Hello" />
      <button onClick={() => console.log(inputRef.current.value)}>
        Get Value
      </button>
    </>
  );
}
```

### When to Use:

**Use Controlled:**
✅ Need to validate in real-time  
✅ Disable buttons based on input  
✅ Show error messages  

**Use Uncontrolled:**
✅ Simple forms  
✅ Integration with non-React code  
✅ File inputs (can't be controlled)  

---

## 38. What is Higher Order Component (HOC)?

**Answer:**

An **HOC** is a function that takes a component and returns a new enhanced component. It's a pattern for reusing component logic.

### Simple Analogy:

Think of HOC like a **wrapper or decorator**. You wrap a component to add extra features.

### Basic Syntax:

```javascript
// HOC function
function withFeature(WrappedComponent) {
  return function EnhancedComponent(props) {
    // Add new logic here
    const newProp = 'Enhanced!';
    
    // Return wrapped component with new prop
    return <WrappedComponent {...props} feature={newProp} />;
  };
}

// Use it
const MyComponent = (props) => <p>{props.feature}</p>;
const EnhancedComponent = withFeature(MyComponent);
```

### Real Example - Authentication HOC:

```javascript
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    if (!isLoggedIn) {
      return <p>Please login first</p>;
    }
    
    return <WrappedComponent {...props} user={{ name: 'Alice' }} />;
  };
}

// Original component
function Dashboard(props) {
  return <h1>Welcome, {props.user.name}</h1>;
}

// Enhanced component with auth
const ProtectedDashboard = withAuth(Dashboard);

// Use it
<ProtectedDashboard /> // Shows login message if not logged in
```

### Example - With Theme:

```javascript
const ThemeContext = React.createContext();

function withTheme(WrappedComponent) {
  return function ThemedComponent(props) {
    const [theme, setTheme] = React.useState('light');
    
    return (
      <ThemeContext.Provider value={theme}>
        <div style={{ background: theme === 'light' ? 'white' : 'black' }}>
          <WrappedComponent {...props} theme={theme} />
        </div>
      </ThemeContext.Provider>
    );
  };
}

const ThemedApp = withTheme(App);
```

### Use Cases:

✅ Authentication  
✅ Theme providers  
✅ Data fetching  
✅ Props manipulation  

---

## 39. What are render props?

**Answer:**

**Render props** is a pattern where a component accepts a function as a prop to control what it renders.

### Basic Concept:

```javascript
function DataProvider({ render }) {
  const [data, setData] = React.useState('Hello');
  
  // Call the function prop to render
  return render(data);
}

// Use it - pass a function as prop
<DataProvider render={(data) => <p>{data}</p>} />
```

### Complete Example:

```javascript
function MouseTracker({ render }) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Call render function with position
  return render(position);
}

// Use with render prop
<MouseTracker
  render={(position) => (
    <p>
      Mouse at: {position.x}, {position.y}
    </p>
  )}
/>
```

### With Children as Function:

```javascript
function DataFetcher({ url, children }) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  // Pass data and loading to children function
  return children(data, loading);
}

// Use with children
<DataFetcher url="/api/users">
  {(users, loading) => (
    loading ? <p>Loading...</p> : (
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    )
  )}
</DataFetcher>
```

### Render Props vs HOC:

| Aspect | Render Props | HOC |
|--------|-------------|-----|
| **Syntax** | Prop function | Wrapping component |
| **Learning** | Easier | Slightly harder |
| **Debugging** | Easier to trace | Extra component layer |
| **Use** | For UI logic | For cross-cutting logic |

---

## 40-45. Brief Overview Questions

### 40. What is compound component pattern?

Components that work together - parent provides state, children display it.

```javascript
function Tabs({ children }) {
  const [active, setActive] = React.useState(0);
  return React.cloneElement(children, { active, setActive });
}

function TabButton({ label, index, active, setActive }) {
  return (
    <button onClick={() => setActive(index)}>
      {label}
    </button>
  );
}
```

### 41. What is container/presentational pattern?

**Container:** Manages state and logic  
**Presentational:** Just displays data  

```javascript
// Container
function UserContainer() {
  const [user, setUser] = React.useState(null);
  return <UserPresentation user={user} />;
}

// Presentational
function UserPresentation({ user }) {
  return <div>{user?.name}</div>;
}
```

### 42. What are error boundaries?

Components that catch errors in child components.

```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }
    return this.props.children;
  }
}
```

### 43. How do you handle errors in React?

Try-catch, error boundaries, or error states.

### 44. What is Suspense in React?

Lets you wait for async operations to complete before rendering.

```javascript
const LazyComponent = React.lazy(() => import('./Component'));

<Suspense fallback={<p>Loading...</p>}>
  <LazyComponent />
</Suspense>
```

### 45. What is React.memo?

Memoizes component to prevent unnecessary re-renders.

```javascript
const MyComponent = React.memo(function Component(props) {
  return <div>{props.name}</div>;
});
```

---

## Summary of Intermediate Level

You now understand:

✅ useEffect and when it runs  
✅ Cleanup functions  
✅ Dependencies  
✅ useContext for context access  
✅ useReducer for complex state  
✅ useCallback for function memoization  
✅ useMemo for value memoization  
✅ useRef for DOM and mutable values  
✅ Rules of hooks  
✅ Controlled components  
✅ Uncontrolled components  
✅ HOC pattern  
✅ Render props pattern  
✅ And more...

**Next:** Continue with questions 46-60 for more advanced patterns and Context API!
