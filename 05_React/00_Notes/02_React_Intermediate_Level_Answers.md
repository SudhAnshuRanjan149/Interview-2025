# React Interview Questions - Intermediate Level (Q26-Q35 Detailed Answers)

## 26. What is useEffect hook?

**Answer:**

`useEffect` is a hook that lets you perform **side effects** in functional components. Side effects are actions that happen outside the component (like fetching data, updating DOM, setting timers, etc.).

### Simple Analogy:

Think of useEffect like **"Do something after the page is displayed"**. Just like how you might paint a wall and then check if it looks good, useEffect lets you do something after React displays your component.

### What are Side Effects?

Side effects are things that affect the world outside your component:

✅ **Fetching data from API** - Getting information from internet  
✅ **Updating document title** - Changing browser tab name  
✅ **Setting timers** - Making something happen later  
✅ **Subscribing to events** - Listening for things happening  
✅ **Saving to localStorage** - Storing data on computer  

### Real World Example:

Imagine a weather app:

```javascript
import { useState, useEffect } from 'react';

function WeatherApp() {
  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState('New York');
  
  // This is useEffect!
  useEffect(() => {
    // This code runs AFTER the component displays
    console.log('Component is now visible! Fetching weather...');
    
    // Fetch weather data from internet
    fetch(`https://api.weather.com/temp?city=${city}`)
      .then(response => response.json())
      .then(data => {
        console.log('Got weather data:', data);
        setTemperature(data.temp);
      });
  });
  
  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>Temperature: {temperature}°C</p>
      <button onClick={() => setCity('London')}>Show London</button>
    </div>
  );
}
```

### Step-by-Step Flow:

```
1. Component function runs
   ↓
2. JSX is created (what to show)
   ↓
3. Page displays to user
   ↓
4. useEffect runs! (side effect happens here)
   ↓
5. Data from API is received
   ↓
6. setState updates component
   ↓
7. Component re-renders with new data
```

### Why useEffect Exists:

Without useEffect, you might try to fetch data like this:

```javascript
// ❌ WRONG - Don't do this!
function App() {
  const [data, setData] = useState(null);
  
  // This runs DURING render
  // Could cause infinite loops or errors!
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
  
  return <div>{data}</div>;
}
```

With useEffect, it's safe:

```javascript
// ✅ CORRECT - Do this!
function App() {
  const [data, setData] = useState(null);
  
  // This runs AFTER render
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data}</div>;
}
```

### Common useEffect Scenarios:

**Scenario 1: Fetch data when component loads**
```javascript
useEffect(() => {
  console.log('Component loaded! Getting data...');
  fetchUserData();
}, []); // Empty array = run once
```

**Scenario 2: Update title when name changes**
```javascript
useEffect(() => {
  document.title = `Hello, ${name}!`;
}, [name]); // Run whenever name changes
```

**Scenario 3: Do something every time**
```javascript
useEffect(() => {
  console.log('Component rendered!');
}); // No dependency array = run every time
```

---

## 27. When does useEffect run?

**Answer:**

useEffect doesn't always run at the same time. It depends on the **dependency array**.

### Three Different Behaviors:

### Behavior 1: Run After EVERY Render (No Dependencies)

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // No dependency array = runs after EVERY render
  useEffect(() => {
    console.log('Component rendered! Count is:', count);
    document.title = `Count: ${count}`;
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Timeline:**
```
Initial render:
  ↓ Component displays
  ↓ useEffect runs
  ↓ Title becomes "Count: 0"

User clicks button:
  ↓ count becomes 1
  ↓ Component re-renders
  ↓ useEffect runs
  ↓ Title becomes "Count: 1"

User clicks button again:
  ↓ count becomes 2
  ↓ Component re-renders
  ↓ useEffect runs
  ↓ Title becomes "Count: 2"
```

### Behavior 2: Run Only ONCE (Empty Dependency Array)

```javascript
function UserProfile() {
  const [user, setUser] = useState(null);
  
  // Empty array = runs only ONCE when component first appears
  useEffect(() => {
    console.log('Component loaded! Fetching user...');
    
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // Empty dependency array is KEY
  
  return (
    <div>
      {user ? <h1>Hello, {user.name}!</h1> : <p>Loading...</p>}
    </div>
  );
}
```

**Timeline:**
```
First time component appears:
  ↓ Component displays
  ↓ useEffect runs (fetches data)
  ↓ Data received
  ↓ Component updates

User navigates away and comes back:
  ↓ Component displays again
  ↓ useEffect does NOT run (it only runs once!)
  ↓ Uses data from first time
```

### Behavior 3: Run When Something Changes (Dependencies Specified)

```javascript
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  
  // Dependencies array = runs when searchTerm changes
  useEffect(() => {
    console.log('searchTerm changed! New value:', searchTerm);
    
    if (searchTerm === '') {
      setResults([]);
      return;
    }
    
    // Search for users
    fetch(`/api/search?q=${searchTerm}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [searchTerm]); // Only when searchTerm changes!
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Timeline:**
```
Component loads:
  ↓ searchTerm is empty ""
  ↓ useEffect runs (but searchTerm is empty, so nothing happens)

User types "Ali":
  ↓ searchTerm changes to "A"
  ↓ useEffect runs (searches for "A")

User types "Ali":
  ↓ searchTerm changes to "Al"
  ↓ useEffect runs (searches for "Al")

User types "Ali":
  ↓ searchTerm changes to "Ali"
  ↓ useEffect runs (searches for "Ali")

User deletes to "Al":
  ↓ searchTerm changes to "Al"
  ↓ useEffect runs again
```

### Real Example - Combining Multiple Effects:

```javascript
function YouTubePlayer() {
  const [videoId, setVideoId] = useState('dQw4w9WgXcQ');
  const [autoplay, setAutoplay] = useState(false);
  
  // Effect 1: Run once when component loads
  useEffect(() => {
    console.log('YouTube player loaded!');
    // Initialize player
  }, []);
  
  // Effect 2: Run when videoId changes
  useEffect(() => {
    console.log('Loading video:', videoId);
    // Load new video
  }, [videoId]);
  
  // Effect 3: Run when autoplay changes
  useEffect(() => {
    console.log('Autoplay:', autoplay ? 'ON' : 'OFF');
    // Update autoplay setting
  }, [autoplay]);
  
  return (
    <div>
      <video autoplay={autoplay} />
      <input
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button onClick={() => setAutoplay(!autoplay)}>
        Toggle Autoplay
      </button>
    </div>
  );
}
```

---

## 28. How do you cleanup in useEffect?

**Answer:**

Cleanup means **stopping** side effects before the component disappears or before the effect runs again.

### Simple Analogy:

Think of cleanup like **turning off the lights when you leave a room**. If you don't, you waste electricity!

### Common Things to Cleanup:

- ❌ **Timers** - Stop them so they don't run forever
- ❌ **Subscriptions** - Unsubscribe from updates
- ❌ **Event listeners** - Remove them so they don't pile up
- ❌ **API requests** - Cancel them if component is gone

### Real Example - Timer That Needs Cleanup:

```javascript
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    if (!isRunning) return; // Don't run timer if stopped
    
    console.log('Starting timer...');
    
    // Setup: Create timer
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup: Stop timer
    return () => {
      console.log('Stopping timer...');
      clearInterval(interval);
    };
  }, [isRunning]); // Re-setup when isRunning changes
  
  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
```

**What Happens:**

```
Component loads:
  ↓ isRunning is false
  ↓ useEffect runs but returns early (no setup, no cleanup)

User clicks "Start":
  ↓ isRunning becomes true
  ↓ useEffect runs
  ↓ Timer starts (interval created)
  ↓ Every second, seconds increases

User clicks "Stop":
  ↓ isRunning becomes false
  ↓ Cleanup function runs!
  ↓ clearInterval called
  ↓ Timer stops

Component unmounts:
  ↓ Cleanup function runs (automatic)
  ↓ Timer is stopped
```

### Real Example - Event Listener Cleanup:

```javascript
function WindowSizeTracker() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    // Setup: Create listener function
    const handleResize = () => {
      console.log('Window resized!');
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    
    console.log('Adding resize listener...');
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove listener
    return () => {
      console.log('Removing resize listener...');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Only setup/cleanup once
  
  return (
    <p>Window: {windowWidth}x{windowHeight}px</p>
  );
}
```

**Without cleanup (BUG):**
```javascript
// ❌ WRONG - Don't do this!
function BadExample() {
  useEffect(() => {
    // Listener added every render!
    window.addEventListener('resize', handleResize);
    // Never removed!
  }); // No dependency array
  
  // If component re-renders 100 times,
  // you have 100 listeners doing the same thing!
  // Memory leak!
}
```

**With cleanup (GOOD):**
```javascript
// ✅ CORRECT - Do this!
function GoodExample() {
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Setup/cleanup once
  
  // Only one listener, properly removed
}
```

### Real Example - API Request Cleanup:

```javascript
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false; // Track if component unmounted
    
    console.log('Fetching user', userId);
    
    // Setup: Fetch data
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          // Only update if component still exists
          setUser(data);
          setLoading(false);
        }
      });
    
    // Cleanup: Mark as cancelled
    return () => {
      console.log('Component unmounted, cancelling fetch');
      cancelled = true;
    };
  }, [userId]);
  
  if (loading) return <p>Loading...</p>;
  return <h1>{user.name}</h1>;
}
```

**Why this matters:**

```
Scenario 1 (Good):
  ↓ User loads with id=1
  ↓ Fetch starts for user 1
  ↓ User navigates to id=2
  ↓ Cleanup runs, cancelled=true
  ↓ Old fetch finishes, but data ignored
  ↓ New fetch runs for user 2
  ↓ New data displayed

Scenario 2 (Bad - without cleanup):
  ↓ User loads with id=1
  ↓ Fetch starts for user 1
  ↓ User navigates to id=2
  ↓ NO cleanup!
  ↓ Fetch for user 2 starts
  ↓ Fetch for user 1 finishes
  ↓ Old data overwrites new data!
  ↓ Wrong user displayed
```

---

## 29. What are dependencies in useEffect?

**Answer:**

Dependencies are **the values that your effect cares about**. If any dependency changes, the effect runs again.

### Simple Analogy:

Think of dependencies like **"When should I re-do this task?"**

For example: "Re-wash my car when the weather gets muddy (muddy = dependency)"

### Understanding Dependencies:

### No Dependencies = Every Render

```javascript
useEffect(() => {
  console.log('This runs after EVERY single render!');
});
```

**If you render 100 times, this logs 100 times!**

### Empty Array = Once

```javascript
useEffect(() => {
  console.log('This runs only once when component first loads');
}, []);
```

**Component renders 100 times, but this only logs once!**

### With Dependencies = When They Change

```javascript
useEffect(() => {
  console.log('This runs when count changes:', count);
}, [count]);
```

**Component renders 100 times
- But effect only runs when count actually changes**

### Real Example - Search Feature:

```javascript
function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState('all');
  
  // Only search when searchTerm OR category changes
  // NOT when other things change
  useEffect(() => {
    console.log(`Searching "${searchTerm}" in ${category}`);
    
    // API call
    fetch(`/api/search?q=${searchTerm}&cat=${category}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [searchTerm, category]); // Two dependencies!
  
  const [sortBy, setSortBy] = useState('popularity'); // Changes, but effect doesn't re-run
  
  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All Grades</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="popularity">Sort by Popularity</option>
        <option value="price">Sort by Price</option>
      </select>
      
      <ul>
        {results.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**What Happens:**

```
User types in search box:
  ↓ searchTerm changes
  ↓ useEffect runs (because searchTerm is in dependencies)
  ↓ Search results update

User changes sort order:
  ↓ sortBy changes
  ↓ useEffect does NOT run (sortBy not in dependencies)
  ↓ Same results stay displayed

User changes category:
  ↓ category changes
  ↓ useEffect runs (because category is in dependencies)
  ↓ Search results update
```

### Common Mistakes:

**Mistake 1: Missing Dependency (Bug!)**
```javascript
// ❌ WRONG
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Count is:', count); // Depends on count!
  }, []); // But dependency array is empty!
  
  // Effect always shows count as 0
  // Even when count changes to 5, it still logs 0
}
```

**Mistake 2: Too Many Dependencies (Inefficient)**
```javascript
// ❌ WRONG - Effect runs too often
function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    // Search for users
    fetchUsers(query);
  }, [query, theme, results, ...otherStuff]); // Too many!
  
  // Effect runs even when theme or results change
  // But we only care about query!
}
```

**Correct:**
```javascript
// ✅ CORRECT
useEffect(() => {
  fetchUsers(query);
}, [query]); // Only query matters
```

### Real Example - Student Grade Tracker:

```javascript
function StudentGrades() {
  const [studentId, setStudentId] = useState(1);
  const [subject, setSubject] = useState('math');
  const [grades, setGrades] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // Fetch grades only when studentId or subject changes
  // NOT when theme changes
  useEffect(() => {
    console.log(`Loading ${subject} grades for student ${studentId}`);
    
    fetch(`/api/grades?student=${studentId}&subject=${subject}`)
      .then(res => res.json())
      .then(data => setGrades(data));
  }, [studentId, subject]); // Only these matter
  
  return (
    <div style={{ background: darkMode ? '#333' : '#fff' }}>
      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="1">Student 1</option>
        <option value="2">Student 2</option>
      </select>
      
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="math">Math</option>
        <option value="english">English</option>
      </select>
      
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme (doesn't refetch!)
      </button>
      
      <ul>
        {grades.map(grade => (
          <li key={grade.id}>{grade.score}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 30. What is useContext hook?

**Answer:**

`useContext` lets you access **shared data** from any component without having to pass it through every component in between.

### The Problem - Passing Props Through Many Layers:

Imagine a family tree:

```
Grandparent (has money)
  ↓
Parent (passes money)
  ↓
Child (receives money)
  ↓
Grandchild (needs money but has to go through everyone)
```

In React (without Context):

```javascript
function Grandparent() {
  const money = 100;
  return <Parent money={money} />;
}

function Parent(props) {
  return <Child money={props.money} />;
}

function Child(props) {
  return <Grandchild money={props.money} />;
}

function Grandchild(props) {
  return <p>I have ${props.money}!</p>;
}
```

**Problem:** Grandparent had to pass money through Parent and Child, even though they don't use it!

### The Solution - useContext:

```javascript
import { createContext, useContext } from 'react';

// Create a "box" to hold the money
const MoneyContext = createContext();

// Put money in the box
function Grandparent() {
  const money = 100;
  return (
    <MoneyContext.Provider value={money}>
      <Parent />
    </MoneyContext.Provider>
  );
}

// Parent doesn't care about money
function Parent() {
  return <Child />;
}

// Child doesn't care about money either
function Child() {
  return <Grandchild />;
}

// Grandchild gets money directly from box!
function Grandchild() {
  const money = useContext(MoneyContext);
  return <p>I have ${money}!</p>;
}
```

**Benefit:** Parent and Child don't need to know about money!

### Real Example - Dark Mode Switcher:

```javascript
import { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component (put theme in a box)
function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use context easily
function useTheme() {
  return useContext(ThemeContext);
}

// Top component
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

// Header - Uses theme from context
function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <header style={{ background: isDarkMode ? '#333' : '#fff' }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  );
}

// Main - Uses theme from context
function Main() {
  const { isDarkMode } = useTheme();
  
  return (
    <main style={{ background: isDarkMode ? '#222' : '#fff' }}>
      <p>This respects the theme!</p>
    </main>
  );
}

// Footer - Uses theme from context
function Footer() {
  const { isDarkMode } = useTheme();
  
  return (
    <footer style={{ background: isDarkMode ? '#333' : '#fff' }}>
      <p>Footer also respects theme!</p>
    </footer>
  );
}
```

### Real Example - User Authentication:

```javascript
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  
  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

// Any component can access user info
function Profile() {
  const { user, isLoggedIn, logout } = useUser();
  
  if (!isLoggedIn) {
    return <p>Please login</p>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function Navbar() {
  const { isLoggedIn, user } = useUser();
  
  return (
    <nav>
      {isLoggedIn ? (
        <p>Logged in as {user.name}</p>
      ) : (
        <p>Not logged in</p>
      )}
    </nav>
  );
}
```

### When to Use Context:

✅ **User information** (logged-in user, preferences)  
✅ **Theme** (dark mode, color scheme)  
✅ **Language** (English, Spanish, etc.)  
✅ **Global settings** (font size, etc.)  

❌ **Frequent updates** - Context can be slow  
❌ **Complex logic** - Use Redux instead  

---

## 31. What is useReducer hook?

**Answer:**

`useReducer` is for managing **complex state** - when you have multiple related state values and complicated update logic.

### Simple Analogy:

Think of useReducer like a **state machine**:
- You have a current state
- You send an action (what happened)
- A reducer decides the new state
- State updates

Like a vending machine:
- Current state: showing menu
- Action: user presses button
- Reducer decides: dispense item, show thank you
- New state: dispensing

### useState vs useReducer:

**Use useState for:**
- Single values (count, name, etc.)
- Simple updates

**Use useReducer for:**
- Multiple related values
- Complex update logic

### Real Example - Simple Todo App:

```javascript
import { useReducer } from 'react';

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }],
        filter: state.filter
      };
    
    case 'DELETE_TODO':
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
        filter: state.filter
      };
    
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, done: !todo.done }
            : todo
        ),
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
}

// Component
function TodoApp() {
  const initialState = {
    todos: [],
    filter: 'all'
  };
  
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const handleAddTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
  
  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };
  
  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  const handleSetFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };
  
  // Filter todos
  let filteredTodos = state.todos;
  if (state.filter === 'completed') {
    filteredTodos = state.todos.filter(t => t.done);
  } else if (state.filter === 'pending') {
    filteredTodos = state.todos.filter(t => !t.done);
  }
  
  return (
    <div>
      <h1>My Todos</h1>
      
      {/* Add todo */}
      <input
        type="text"
        placeholder="What to do?"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleAddTodo(e.target.value);
            e.target.value = '';
          }
        }}
      />
      
      {/* Filter buttons */}
      <div>
        <button onClick={() => handleSetFilter('all')}>
          All ({state.todos.length})
        </button>
        <button onClick={() => handleSetFilter('pending')}>
          Pending ({state.todos.filter(t => !t.done).length})
        </button>
        <button onClick={() => handleSetFilter('completed')}>
          Done ({state.todos.filter(t => t.done).length})
        </button>
      </div>
      
      {/* Todo list */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.done ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

### How It Works Step-by-Step:

```
Initial state: { todos: [], filter: 'all' }

User types "Learn React" and presses Enter:
  ↓ dispatch({ type: 'ADD_TODO', payload: 'Learn React' })
  ↓ Reducer receives this action
  ↓ Reducer adds new todo to array
  ↓ New state: { todos: [{id: 123, text: 'Learn React', done: false}], filter: 'all' }
  ↓ Component re-renders with new state

User clicks checkbox on "Learn React":
  ↓ dispatch({ type: 'TOGGLE_TODO', payload: 123 })
  ↓ Reducer receives this action
  ↓ Reducer finds todo with id 123 and toggles done to true
  ↓ New state updated
  ↓ Component re-renders, shows strikethrough

User clicks Delete:
  ↓ dispatch({ type: 'DELETE_TODO', payload: 123 })
  ↓ Reducer receives this action
  ↓ Reducer removes todo from array
  ↓ New state updated
  ↓ Component re-renders, todo gone
```

---

## 32. What is useCallback hook?

**Answer:**

`useCallback` **remembers** a function so it doesn't create a new one every time the component renders.

### The Problem:

```javascript
function Parent() {
  // This creates a NEW handleClick function every render!
  const handleClick = () => {
    console.log('Clicked!');
  };
  
  // Child receives different function reference each time
  // So Child re-renders even if nothing important changed
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  console.log('Child rendered'); // Logs every time parent renders!
  return <button onClick={onClick}>Click me</button>;
}
```

**Result:** Parent renders 10 times → Child re-renders 10 times (unnecessary!)

### The Solution - useCallback:

```javascript
import { useCallback } from 'react';

function Parent() {
  // This function keeps the SAME reference (unless dependencies change)
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty array = always same function
  
  // Child receives same function reference
  // So Child only re-renders when its props actually matter
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  console.log('Child rendered'); // Only logs when onClick actually changes
  return <button onClick={onClick}>Click me</button>;
}
```

**Result:** Parent renders 10 times → Child renders only 1 time!

### Real Example - Search Component:

```javascript
import { useCallback, useState } from 'react';

function SearchApp() {
  const [query, setQuery] = useState('');
  
  // Without useCallback (BAD):
  // SearchResults re-renders every time SearchApp renders
  // Even though onSearch function logic never changes
  
  // With useCallback (GOOD):
  // SearchResults only re-renders when query changes
  const handleSearch = useCallback((searchTerm) => {
    console.log('Searching for:', searchTerm);
    fetch(`/api/search?q=${searchTerm}`)
      .then(res => res.json())
      .then(results => console.log(results));
  }, [query]); // Re-create function only if query changes
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <SearchResults onSearch={handleSearch} />
    </div>
  );
}

function SearchResults({ onSearch }) {
  console.log('SearchResults rendered');
  // This component doesn't re-render unnecessarily now!
  return <div>Results will appear here</div>;
}
```

### When to Use useCallback:

✅ Passing function to optimized child component  
✅ Using function as dependency in useEffect  
✅ Expensive computations in function  

❌ Simple callbacks  
❌ Not passed to children  

---

## 33. What is useMemo hook?

**Answer:**

`useMemo` **remembers** a computed value so expensive calculations don't run every render.

### The Problem:

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  
  // This expensive calculation runs EVERY render!
  // Even when name changes (count didn't change)
  const expensiveValue = fibonacci(40); // Takes 1 second!
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Fibonacci(40): {expensiveValue}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Problem:**
- User changes name
- Component re-renders
- fibonacci(40) runs AGAIN (wasted 1 second)
- But count didn't change, so result is same as before!

### The Solution - useMemo:

```javascript
import { useMemo, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  
  // Only calculate when count changes
  const expensiveValue = useMemo(() => {
    return fibonacci(count);
  }, [count]); // Only when count changes!
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Fibonacci({count}): {expensiveValue}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

**Benefit:**
- User changes name
- Component re-renders
- fibonacci is NOT called (no calculation waste!)
- Old result is reused
- Page stays responsive

### Real Example - Filtering Large List:

```javascript
import { useMemo, useState } from 'react';

function StudentList() {
  const [students] = useState(Array(10000).fill().map((_, i) => ({
    id: i,
    name: `Student ${i}`,
    grade: Math.random() > 0.5 ? 'A' : 'B'
  })));
  
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Only filter when grade changes
  const filteredStudents = useMemo(() => {
    console.log('Filtering students...');
    
    let result = students;
    
    if (selectedGrade !== 'all') {
      result = result.filter(s => s.grade === selectedGrade);
    }
    
    return result;
  }, [students, selectedGrade]); // Not sortBy!
  
  // Separate sort logic
  const sortedStudents = useMemo(() => {
    console.log('Sorting students...');
    
    if (sortBy === 'name') {
      return [...filteredStudents].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    // ... other sort options
    
    return filteredStudents;
  }, [filteredStudents, sortBy]);
  
  return (
    <div>
      <select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
        <option value="all">All Grades</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="grade">Sort by Grade</option>
      </select>
      
      <ul>
        {sortedStudents.map(student => (
          <li key={student.id}>{student.name} - {student.grade}</li>
        ))}
      </ul>
    </div>
  );
}
```

### When to Use useMemo:

✅ Expensive calculations (filtering, sorting big lists)  
✅ Creating objects/arrays for dependencies  
✅ Performance critical code  

❌ Simple calculations  
❌ Don't overuse - has small overhead  

---

## 34. What is useRef hook?

**Answer:**

`useRef` lets you **directly access** DOM elements and store values that don't cause re-renders.

### Simple Analogy:

Think of useRef like a **permanent sticky note** on your component that survives re-renders.

### Use Case 1: Access DOM Elements:

```javascript
import { useRef } from 'react';

function TextInput() {
  // Create a ref
  const inputRef = useRef(null);
  
  const focusInput = () => {
    // Access the input element directly
    inputRef.current.focus(); // Move focus to input
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
```

**What Happens:**
```
User clicks button:
  ↓ focusInput called
  ↓ inputRef.current gives us the actual DOM element
  ↓ We call .focus() on it
  ↓ Input gets keyboard focus (cursor appears)
```

### Real Example - Video Player:

```javascript
import { useRef, useState } from 'react';

function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div>
      <video
        ref={videoRef}
        src="movie.mp4"
        width="400"
        height="300"
      />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
```

### Use Case 2: Store Values Between Renders:

```javascript
import { useRef, useState } from 'react';

function StopWatch() {
  const [seconds, setSeconds] = useState(0);
  
  // Store interval ID so we can stop it later
  const intervalRef = useRef(null);
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  const reset = () => {
    clearInterval(intervalRef.current);
    setSeconds(0);
  };
  
  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**Why useRef?**
- intervalRef stores the interval ID
- ID persists between renders
- We can use it in stop() function later

### Use Case 3: Track Previous Value:

```javascript
import { useRef, useEffect, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  // Store previous count
  const previousCountRef = useRef();
  
  useEffect(() => {
    // After every render, save current count as previous
    previousCountRef.current = count;
  }, [count]); // Run after count changes
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Timeline:**
```
Initial:
  ↓ Current: 0, Previous: undefined

Click button:
  ↓ count becomes 1
  ↓ Component re-renders
  ↓ Display Current: 1, Previous: 0
  ↓ useEffect runs
  ↓ previousCountRef.current = 1 (saved)

Click button:
  ↓ count becomes 2
  ↓ Component re-renders
  ↓ Display Current: 2, Previous: 1
  ↓ useEffect runs
  ↓ previousCountRef.current = 2 (saved)
```

### useRef vs useState:

| Feature | useRef | useState |
|---------|--------|----------|
| **Re-render** | NO | YES |
| **Mutable** | YES | NO (immutable) |
| **Persists** | YES (across renders) | YES (across renders) |
| **Use** | DOM access, internal values | Data to display |

---

## 35. What are the rules of hooks?

**Answer:**

Hooks have special rules. Breaking these rules causes bugs!

### Rule 1: Only Call Hooks at Top Level

**❌ WRONG - Inside a loop:**
```javascript
function App() {
  const items = [1, 2, 3];
  
  for (let i = 0; i < items.length; i++) {
    const [state, setState] = useState(0); // ❌ WRONG!
  }
}
```

**❌ WRONG - Inside an if statement:**
```javascript
function App() {
  if (someCondition) {
    const [state, setState] = useState(0); // ❌ WRONG!
  }
}
```

**✅ CORRECT - At top level:**
```javascript
function App() {
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState('');
  
  if (someCondition) {
    // OK to USE the hooks here, just don't declare new ones
    setState1(5);
  }
}
```

### Why This Rule Exists:

React depends on **call order** of hooks:

```
Render 1:
  Hook 1: useState → name
  Hook 2: useState → age
  Hook 3: useEffect → fetch

React remembers: "First hook is name, second is age, third is effect"
```

If you call hooks conditionally:

```
Render 1:
  Hook 1: useState → name
  Hook 2: useState → age
  Hook 3: useEffect → fetch

Render 2 (with if condition):
  if (condition) {
    Hook 1: useState → name // OK
  }
  Hook 2: useState ??? // React thinks this is age, but order changed!
  Hook 3: useEffect → fetch // Wrong!

React gets confused!
```

### Rule 2: Only Call Hooks from React Functions

**❌ WRONG - Regular function:**
```javascript
function regularFunction() {
  const [state, setState] = useState(0); // ❌ WRONG!
}
```

**✅ CORRECT - React component:**
```javascript
function MyComponent() {
  const [state, setState] = useState(0); // ✅ CORRECT
}
```

**✅ CORRECT - Custom hook:**
```javascript
function useCustomHook() {
  const [state, setState] = useState(0); // ✅ CORRECT
  return state;
}
```

### Rule 3: Use ESLint Plugin to Catch Errors:

```bash
npm install --save-dev eslint-plugin-react-hooks
```

**.eslintrc.json:**
```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

**Now ESLint warns you:**
```
Error: React Hook "useState" is called in a loop
Error: React Hook "useEffect" has a missing dependency
```

### Real Example - What Breaks:

```javascript
// ❌ BROKEN CODE
function App() {
  if (useAuth()) { // ❌ Calling hook inside if!
    const [name, setName] = useState('');
  }
  
  for (let i = 0; i < 3; i++) { // ❌ Calling hook inside loop!
    const [item, setItem] = useState('');
  }
}
```

### Real Example - What Works:

```javascript
// ✅ CORRECT CODE
function App() {
  // All hooks at top level
  const isAuthed = useAuth(); // Call hook, use result later
  const [name, setName] = useState('');
  const [items, setItems] = useState([]); // Single hook for array
  
  // Now use the values
  if (isAuthed) {
    // Use name and setName
  }
  
  for (let i = 0; i < 3; i++) {
    // Use items and setItems
  }
}
```

### Summary:

1. **Always declare hooks at the top of your component**
2. **Never call hooks inside loops, conditions, or nested functions**
3. **Only call hooks inside React components and custom hooks**
4. **Use the ESLint plugin to catch mistakes**

---

## Complete Summary of Q26-Q35

You now understand:

✅ **useEffect** - Run code after rendering  
✅ **When useEffect runs** - Based on dependencies  
✅ **Cleanup in useEffect** - Stop side effects  
✅ **Dependencies** - Control when effects run  
✅ **useContext** - Access shared data  
✅ **useReducer** - Complex state management  
✅ **useCallback** - Remember functions  
✅ **useMemo** - Remember computed values  
✅ **useRef** - Access DOM elements  
✅ **Rules of hooks** - How to use hooks correctly  

**These 10 hooks are the foundation of modern React development!** 🎉
