/*

========================================================
SECTION 5 — REACT STATE MANAGEMENT
========================================================
43. What is the Context API and when should you use it?  
44. What problems does Redux solve?  
45. What is the Redux data flow and unidirectional architecture?  
46. What are actions, reducers, and the store in Redux?  
47. What is Redux middleware?  
48. What is Redux Thunk and how does asynchronous dispatch work?  
49. What is Redux Saga and how does it differ from Thunk?  
50. What is Zustand, Recoil, or Jotai (modern state managers)?  
51. What is MobX and how does observable state work?  

*/





/**
43. What is the Context API and when should you use it?
-------------------------------------------------------

The Context API is a built-in React feature for sharing data across the component tree
without prop drilling. It creates a "global" state for a subtree of components.

Core concepts:
--------------

1. createContext: Creates a context object
2. Provider: Makes data available to descendants
3. Consumer/useContext: Reads data from context

Basic usage:
------------

// 1. Create context
const ThemeContext = createContext('light'); // default value

// 2. Provide value to tree
function App() {
  const [theme, setTheme] = useState('dark');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Content />
      <Footer />
    </ThemeContext.Provider>
  );
}

// 3. Consume value anywhere in tree
function Header() {
  const theme = useContext(ThemeContext);
  
  return (
    <header className={theme}>
      <h1>My App</h1>
    </header>
  );
}

// Or with Consumer (older pattern)
function Header() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <header className={theme}>
          <h1>My App</h1>
        </header>
      )}
    </ThemeContext.Consumer>
  );
}

Complete example with custom provider:
---------------------------------------

const AuthContext = createContext(null);

// Provider component with state and methods
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in on mount
    checkAuthStatus()
      .then(user => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  
  const login = async (credentials) => {
    const user = await loginAPI(credentials);
    setUser(user);
    localStorage.setItem('token', user.token);
  };
  
  const logout = () => {
    logoutAPI();
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}

// Usage
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

When to use Context:
--------------------

✅ Theme (light/dark mode)
✅ Authentication (user data, login/logout)
✅ Internationalization (language, locale)
✅ Feature flags
✅ UI preferences (sidebar collapsed, font size)
✅ Global notifications/toasts
✅ Data that many components need (avoid prop drilling)

When NOT to use Context:
-------------------------

❌ Frequently changing values (causes many re-renders)
❌ Performance-critical state
❌ Complex state logic (use Redux, Zustand instead)
❌ Server state (use React Query, SWR instead)
❌ Simple parent-child communication (use props)

Example - Theme Context:
-------------------------

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [fontSize, setFontSize] = useState('medium');
  
  const theme = {
    mode,
    colors: mode === 'light' 
      ? { bg: '#fff', text: '#000' }
      : { bg: '#000', text: '#fff' },
    fontSize: fontSize === 'small' ? '14px' : '16px'
  };
  
  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    mode,
    fontSize,
    setMode,
    setFontSize,
    toggleMode
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function Button() {
  const { theme } = useTheme();
  
  return (
    <button style={{ 
      background: theme.colors.bg,
      color: theme.colors.text,
      fontSize: theme.fontSize
    }}>
      Click me
    </button>
  );
}

Performance optimization:
-------------------------

Problem: All consumers re-render when any part of context changes

// Bad: Everything re-renders on any change
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [settings, setSettings] = useState({});
  
  // New object every render!
  const value = { user, setUser, theme, setTheme, settings, setSettings };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

Solution 1: Memoize the value

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  // Only create new object when dependencies change
  const value = useMemo(() => ({
    user,
    setUser,
    theme,
    setTheme
  }), [user, theme]);
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

Solution 2: Split into multiple contexts

const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();

function AppProvider({ children }) {
  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <SettingsContext.Provider value={settingsValue}>
          {children}
        </SettingsContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Component only re-renders when its specific context changes
function UserProfile() {
  const user = useContext(UserContext); // Only user changes trigger re-render
  return <div>{user.name}</div>;
}

Solution 3: Context selectors (third-party library)

import { createContext, useContextSelector } from 'use-context-selector';

const AppContext = createContext();

function Component() {
  // Only re-renders when user.name specifically changes
  const userName = useContextSelector(AppContext, state => state.user.name);
  
  return <div>{userName}</div>;
}

Multiple contexts pattern:
--------------------------

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <NotificationProvider>
            <Router>
              <Routes />
            </Router>
          </NotificationProvider>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Cleaner with composition
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes />
      </Router>
    </AppProviders>
  );
}

Context with reducer:
---------------------

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const clearCart = () => dispatch({ type: 'CLEAR' });
  
  const total = state.items.reduce((sum, item) => sum + item.price, 0);
  
  const value = useMemo(() => ({
    items: state.items,
    total,
    addItem,
    removeItem,
    clearCart
  }), [state.items, total]);
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

Best practices:
---------------

1. Always provide custom hook:

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

2. Memoize context value:

const value = useMemo(() => ({ state, actions }), [state]);

3. Split contexts by concern:

// Instead of one AppContext
<UserProvider />
<ThemeProvider />
<CartProvider />

4. Default values for better DX:

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {
    throw new Error('ThemeProvider not found');
  }
});

5. Co-locate related code:

// features/auth/AuthContext.js
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => { ... };
export const useAuth = () => useContext(AuthContext);

Summary:

Context API:
- Built-in React solution for sharing state
- Avoids prop drilling
- Provider makes data available to tree
- useContext hook consumes data
- Best for global, infrequently changing data
- Optimize with useMemo and split contexts
- Not suitable for frequently changing state
- Modern alternative to prop drilling
*/


/**
44. What problems does Redux solve?
-----------------------------------

Redux is a predictable state container for JavaScript apps. It solves specific problems
that arise when managing complex application state.

Problems Redux solves:
-----------------------

Problem 1: Shared state across distant components
--------------------------------------------------

Without Redux:
- Prop drilling through many levels
- State scattered across components
- Hard to keep components in sync

function App() {
  const [cart, setCart] = useState([]);
  
  return (
    <div>
      <Header cart={cart} />
      <Sidebar cart={cart} />
      <ProductList cart={cart} setCart={setCart} />
      <Footer cart={cart} />
    </div>
  );
}

// Every component needs cart, lots of prop drilling

With Redux:
- Single source of truth (store)
- Any component can access state
- Automatic synchronization

// Components access cart directly from store
function Header() {
  const cart = useSelector(state => state.cart);
  return <div>Items: {cart.length}</div>;
}

function ProductList() {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(addToCart(item))}>Add</button>;
}

Problem 2: Predictable state updates
-------------------------------------

Without Redux:
- setState scattered everywhere
- Hard to track how state changes
- Difficult to debug state mutations

const [user, setUser] = useState(null);

// State updated in many places
const login = () => setUser({ ...data });
const updateProfile = () => setUser({ ...user, ...updates });
const logout = () => setUser(null);

With Redux:
- All state changes go through actions
- Reducers are pure functions
- State history and time-travel debugging

// Clear, trackable actions
dispatch({ type: 'USER_LOGIN', payload: userData });
dispatch({ type: 'USER_UPDATE_PROFILE', payload: updates });
dispatch({ type: 'USER_LOGOUT' });

// Reducer handles all state transitions
function userReducer(state = null, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return action.payload;
    case 'USER_UPDATE_PROFILE':
      return { ...state, ...action.payload };
    case 'USER_LOGOUT':
      return null;
    default:
      return state;
  }
}

Problem 3: Complex state logic
-------------------------------

Without Redux:
- Complex useState and useEffect combinations
- Hard to test state logic
- Business logic mixed with UI

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };
  
  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });
  
  // Lots of logic in component
}

With Redux:
- Centralized state logic
- Easy to test reducers
- Clear separation of concerns

// Reducer (pure, testable)
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(t => 
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
}

// Component is simple
function TodoApp() {
  const todos = useSelector(selectFilteredTodos);
  const dispatch = useDispatch();
  
  return (
    <div>
      <button onClick={() => dispatch(addTodo(text))}>Add</button>
      {todos.map(t => <Todo key={t.id} todo={t} />)}
    </div>
  );
}

Problem 4: State persistence and hydration
-------------------------------------------

With Redux:
- Easy to save/restore state
- Server-side rendering support
- State snapshots for debugging

// Save state to localStorage
store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
});

// Restore state on load
const persistedState = JSON.parse(localStorage.getItem('state'));
const store = createStore(reducer, persistedState);

Problem 5: DevTools and debugging
----------------------------------

Redux DevTools provides:
- Time-travel debugging (replay actions)
- State diff visualization
- Action history
- State snapshots
- Import/export state

// See every action and state change in DevTools
dispatch({ type: 'ADD_TODO', payload: todo });
// DevTools shows: action, prev state, next state, diff

Problem 6: Middleware and side effects
---------------------------------------

Redux middleware allows:
- Async actions (API calls)
- Logging
- Analytics
- Error tracking

// Redux Thunk for async
const fetchUsers = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USERS_START' });
  
  try {
    const users = await api.getUsers();
    dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
  } catch (error) {
    dispatch({ type: 'FETCH_USERS_ERROR', error });
  }
};

// Middleware for logging
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

Problem 7: Code splitting and lazy loading
-------------------------------------------

Redux supports:
- Dynamic reducer injection
- Feature-based state slices
- Code splitting with lazy reducers

// Load reducers dynamically
store.injectReducer('featureX', featureXReducer);

Problem 8: Testing
------------------

Redux makes testing easier:
- Reducers are pure functions (easy to test)
- Actions are plain objects (easy to assert)
- Components can be tested with mock store

// Test reducer
test('adds todo', () => {
  const state = [];
  const action = { type: 'ADD_TODO', payload: { id: 1, text: 'test' } };
  const newState = todosReducer(state, action);
  
  expect(newState).toEqual([{ id: 1, text: 'test' }]);
});

// Test component with mock store
test('renders todos', () => {
  const store = mockStore({ todos: [...] });
  render(
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
  
  expect(screen.getByText('Todo 1')).toBeInTheDocument();
});

When to use Redux:
------------------

✅ Large app with complex state
✅ State shared across many components
✅ Frequent state updates
✅ Need time-travel debugging
✅ Team wants strict patterns
✅ Complex async workflows
✅ State persistence required
✅ SSR (server-side rendering)

When NOT to use Redux:
----------------------

❌ Simple app with local state
❌ Learning React (learn React first)
❌ Small team, quick prototype
❌ Most state is server cache (use React Query instead)
❌ Overkill for your use case

Redux vs alternatives:
----------------------

Redux:
+ Strict patterns, predictable
+ Great DevTools
+ Large ecosystem
- Boilerplate
- Learning curve

Context API:
+ Built into React
+ Simple
- Performance issues with frequent updates
- No DevTools

Zustand:
+ Less boilerplate
+ Simple API
+ Good performance
- Smaller ecosystem

React Query:
+ Perfect for server state
+ Caching, refetching
- Not for client state

MobX:
+ Less boilerplate
+ Observable-based
- Different paradigm

Summary:

Redux solves:
- Shared state across distant components
- Predictable state updates
- Complex state logic
- State persistence
- Powerful debugging with DevTools
- Middleware for side effects
- Testing
- Code organization

Use when you need structure, predictability, and debugging tools for complex state.
*/


/**
45. What is the Redux data flow and unidirectional architecture?
----------------------------------------------------------------

Redux follows a strict unidirectional (one-way) data flow. Data always flows in the
same direction, making state changes predictable and easier to debug.

The Redux cycle:
----------------

1. User interacts with UI
2. Component dispatches an action
3. Action goes to reducers via store
4. Reducer returns new state
5. Store updates state
6. Components re-render with new state

Visual flow:
------------

     ┌─────────────────────────────────────────┐
     │                                         │
     │              Redux Store                │
     │          (Single source of truth)       │
     │                                         │
     └────┬────────────────────────────────┬───┘
          │                                │
          │ (5) Subscribe                  │ (3) Dispatch
          │     to state                   │     action
          ↓                                │
     ┌────────────┐                        │
     │            │                        │
     │   React    │                        │
     │ Components │                        │
     │    (View)  │                        │
     │            │                        │
     └────┬───────┘                        │
          │                                │
          │ (1) User                       │
          │     interaction                │
          ↓                                │
     ┌────────────┐                   ┌────┴──────┐
     │            │  (2) Create       │           │
     │   Event    │─────action────────▶  Actions  │
     │  Handler   │                   │           │
     └────────────┘                   └────┬──────┘
                                           │
                                           │
                                      ┌────▼──────┐
                                      │           │
                                      │ Reducers  │
                                      │  (Pure    │
                                      │ functions)│
                                      │           │
                                      └───────────┘
                                           │
                                           │ (4) Return
                                           │     new state
                                           │
                                      ┌────▼──────┐
                                      │           │
                                      │   Store   │
                                      │  updates  │
                                      │   state   │
                                      └───────────┘

Step-by-step example:
---------------------

// 1. Initial state
const initialState = {
  todos: [],
  filter: 'all'
};

// 2. Reducer (pure function that handles state updates)
function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    default:
      return state;
  }
}

// 3. Create store
import { createStore } from 'redux';
const store = createStore(todosReducer);

// 4. Component dispatches action (user clicks button)
function TodoInput() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    // Dispatch action to store
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text,
        completed: false
      }
    });
    setText('');
  };
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
}

// 5. Store calls reducer with current state and action
// Reducer returns new state

// 6. Store saves new state

// 7. All subscribed components re-render
function TodoList() {
  // Component subscribes to store
  const todos = useSelector(state => state.todos);
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

Detailed flow breakdown:
-------------------------

Step 1: User interaction
------------------------

<button onClick={() => dispatch(addTodo('Buy milk'))}>
  Add Todo
</button>

Step 2: Action creators
------------------------

// Action creator function
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: Date.now(),
      text,
      completed: false
    }
  };
}

// Dispatch the action
dispatch(addTodo('Buy milk'));

Step 3: Action dispatched to store
-----------------------------------

// Redux internally does:
store.dispatch({
  type: 'ADD_TODO',
  payload: { id: 1, text: 'Buy milk', completed: false }
});

Step 4: Middleware (if any)
----------------------------

// Middleware can intercept actions
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action); // Pass to next middleware or reducer
  console.log('next state', store.getState());
  return result;
};

Step 5: Reducer processes action
---------------------------------

function todosReducer(state = initialState, action) {
  // Current state: { todos: [] }
  // Action: { type: 'ADD_TODO', payload: {...} }
  
  switch (action.type) {
    case 'ADD_TODO':
      // Return NEW state object (immutable)
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
  
  // New state: { todos: [{ id: 1, text: 'Buy milk', completed: false }] }
}

Step 6: Store updates state
----------------------------

// Redux saves the new state returned by reducer
// Previous state is replaced with new state

Step 7: Components re-render
-----------------------------

// All components using useSelector re-render
function TodoList() {
  const todos = useSelector(state => state.todos);
  // Component re-renders with new todos array
  
  return <ul>{todos.map(...)}</ul>;
}

Why unidirectional flow?
-------------------------

Benefits:
1. Predictable: State changes are traceable
2. Debuggable: Can track every action and state change
3. Testable: Pure reducers are easy to test
4. Time-travel: Can replay actions to reproduce bugs
5. Maintainable: Clear data flow, easy to understand

Compare to two-way binding (Angular 1):
---------------------------------------

// Two-way binding (bidirectional)
<input ng-model="username" />
// Input changes model, model changes input
// Hard to track what changed and why

// Redux (unidirectional)
<input
  value={username}
  onChange={e => dispatch(updateUsername(e.target.value))}
/>
// Explicit action, clear data flow

Multiple reducers (combining reducers):
---------------------------------------

// Split reducers by feature
function todosReducer(state = [], action) {
  // Handles todos state
}

function filterReducer(state = 'all', action) {
  // Handles filter state
}

function userReducer(state = null, action) {
  // Handles user state
}

// Combine into root reducer
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  user: userReducer
});

// State shape:
// {
//   todos: [...],
//   filter: 'all',
//   user: {...}
// }

Flow with multiple reducers:
-----------------------------

1. Action dispatched: dispatch({ type: 'ADD_TODO', payload: todo })

2. Store sends action to ALL reducers:
   - todosReducer gets action
   - filterReducer gets action
   - userReducer gets action

3. Each reducer processes action:
   - todosReducer: returns new todos state
   - filterReducer: returns unchanged filter state
   - userReducer: returns unchanged user state

4. Store combines all reducer outputs:
   {
     todos: [new todo added],  // Changed
     filter: 'all',             // Unchanged
     user: {...}                // Unchanged
   }

5. Components re-render if their selected state changed

Async flow (with middleware):
------------------------------

// 1. Dispatch async action creator (thunk)
dispatch(fetchTodos());

// 2. Thunk middleware intercepts
function fetchTodos() {
  return async (dispatch) => {
    // Dispatch loading action
    dispatch({ type: 'FETCH_TODOS_START' });
    
    try {
      // Fetch data
      const response = await api.getTodos();
      
      // Dispatch success action
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
    } catch (error) {
      // Dispatch error action
      dispatch({ type: 'FETCH_TODOS_ERROR', error });
    }
  };
}

// 3. Each dispatch goes through normal flow:
//    Action → Middleware → Reducer → Store → Components

Redux data flow principles:
----------------------------

1. Single source of truth:
   - One store holds entire app state
   - State is a single JavaScript object

2. State is read-only:
   - Only way to change state is to dispatch an action
   - No direct mutations: state.todos.push(todo) ❌

3. Changes made with pure functions:
   - Reducers are pure: same input → same output
   - No side effects in reducers
   - Return new state objects (immutability)

4. Unidirectional flow:
   - Data flows one way: Action → Reducer → Store → View
   - View cannot directly modify state

Example with full flow:
------------------------

// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id
});

// Reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

// Store
const store = createStore(todosReducer);

// Component
function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

function TodoApp() {
  const todos = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  return (
    <div>
      {/* 1. User types and clicks * /}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => {
        // 2. Dispatch action
        dispatch(addTodo(text));
        setText('');
      }}>
        Add
      </button>
      
      {/* 7. Component re-renders with new state * /}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => dispatch(toggleTodo(todo.id))}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

Summary:

Redux unidirectional flow:
1. UI dispatches action
2. Action sent to store
3. Store calls reducer with current state and action
4. Reducer returns new state
5. Store saves new state
6. Subscribed components re-render
7. Cycle repeats

Key principles:
- Single source of truth (one store)
- State is read-only (dispatch actions to change)
- Pure reducers (no side effects)
- Unidirectional data flow (predictable, debuggable)
*/


/**
46. What are actions, reducers, and the store in Redux?
-------------------------------------------------------

These are the three core building blocks of Redux.

Actions:
--------

Definition:
Plain JavaScript objects that describe "what happened" in your app. They are the ONLY
way to send data to the store.

Structure:
{
  type: 'ACTION_TYPE',  // Required: string describing the action
  payload: data         // Optional: data for the action
}

Examples:

// Simple action
{
  type: 'INCREMENT'
}

// Action with data
{
  type: 'ADD_TODO',
  payload: {
    id: 1,
    text: 'Buy milk',
    completed: false
  }
}

// Action with multiple fields
{
  type: 'USER_LOGIN',
  payload: { username: 'alice', token: 'abc123' }
}

Action creators:

// Function that creates and returns an action
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: Date.now(),
      text,
      completed: false
    }
  };
}

// Usage
dispatch(addTodo('Buy milk'));
// Same as: dispatch({ type: 'ADD_TODO', payload: {...} })

Benefits of action creators:
- Encapsulate action creation logic
- Reusable
- Easier to test
- Can add logic (generate IDs, timestamps, etc.)

Action types as constants:

// Define action types as constants (prevent typos)
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,  // No typos!
    payload: { text }
  };
}

// In reducer
function todosReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:  // Same constant
      return [...state, action.payload];
    default:
      return state;
  }
}

Reducers:
---------

Definition:
Pure functions that take the current state and an action, and return a new state.

Signature:
(previousState, action) => newState

Rules:
1. MUST be pure (no side effects)
2. MUST NOT mutate state (return new objects)
3. MUST return state for unknown actions (default case)

Basic reducer:

function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ADD':
      return state + action.payload;
    default:
      return state;  // MUST return state
  }
}

Complex reducer:

function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      // DON'T mutate: state.push(action.payload) ❌
      // DO return new array:
      return [...state, action.payload];  // ✅
    
    case 'TOGGLE_TODO':
      // Return new array with modified item
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }  // New object
          : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, text: action.text }
          : todo
      );
    
    default:
      return state;
  }
}

Nested state:

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,  // Spread root
        user: {
          ...state.user,  // Spread user
          profile: {
            ...state.user.profile,  // Spread profile
            ...action.payload  // Update fields
          }
        }
      };
    default:
      return state;
  }
}

Combining reducers:

import { combineReducers } from 'redux';

// Feature reducers
function todosReducer(state = [], action) {
  // handles todos
}

function filterReducer(state = 'all', action) {
  // handles filter
}

function userReducer(state = null, action) {
  // handles user
}

// Combine into root reducer
const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  user: userReducer
});

// State shape:
// {
//   todos: [],
//   filter: 'all',
//   user: null
// }

// Each reducer only sees its slice of state
// todosReducer only sees state.todos
// filterReducer only sees state.filter

Store:
------

Definition:
The single object that holds the entire application state. It brings actions and
reducers together.

Creating a store:

import { createStore } from 'redux';

const store = createStore(reducer);

Store methods:

1. getState():
   Returns current state

const state = store.getState();
console.log(state);  // { todos: [], filter: 'all' }

2. dispatch(action):
   Dispatches an action to trigger state change

store.dispatch({ type: 'ADD_TODO', payload: todo });
store.dispatch(addTodo('Buy milk'));  // With action creator

3. subscribe(listener):
   Registers a callback that runs after every action

const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState());
});

// Later: stop listening
unsubscribe();

4. replaceReducer(nextReducer):
   Replaces the reducer (hot reloading, code splitting)

store.replaceReducer(newReducer);

Complete example:
-----------------

// 1. Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// 2. Action creators
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      text,
      completed: false
    }
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

// 3. Reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
}

// 4. Create store
import { createStore } from 'redux';
const store = createStore(todosReducer);

// 5. Subscribe to changes
store.subscribe(() => {
  console.log('Current state:', store.getState());
});

// 6. Dispatch actions
store.dispatch(addTodo('Buy milk'));
// Logs: Current state: [{ id: 1, text: 'Buy milk', completed: false }]

store.dispatch(addTodo('Walk dog'));
// Logs: Current state: [{ id: 1, ...}, { id: 2, text: 'Walk dog', ...}]

store.dispatch(toggleTodo(1));
// Logs: Current state: [{ id: 1, text: 'Buy milk', completed: true }, ...]

With React:
-----------

// Provide store to app
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

// Access state with useSelector
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Dispatch actions with useDispatch
import { useDispatch } from 'react-redux';

function TodoInput() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    dispatch(addTodo(text));
    setText('');
  };
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

Modern Redux Toolkit:
---------------------

Redux Toolkit simplifies actions and reducers:

import { createSlice, configureStore } from '@reduxjs/toolkit';

// Slice combines actions and reducer
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // Immer allows "mutation" syntax
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

// Auto-generated action creators
export const { addTodo, toggleTodo } = todosSlice.actions;

// Reducer
export default todosSlice.reducer;

// Store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
});

Summary:

Actions:
- Plain objects describing "what happened"
- Only way to send data to store
- Have `type` (required) and usually `payload`
- Created by action creator functions

Reducers:
- Pure functions: (state, action) => newState
- MUST NOT mutate state
- Handle different action types with switch
- Return current state for unknown actions
- Can be combined with combineReducers

Store:
- Single source of truth
- Holds entire app state
- Created with createStore(reducer)
- Methods: getState(), dispatch(), subscribe()
- Provided to React with <Provider>

Together they form Redux's core architecture for predictable state management.
*/


/**
47. What is Redux middleware?
-----------------------------

Middleware is code that intercepts actions between dispatch and reducer, allowing you
to extend Redux with custom functionality like logging, async operations, routing, etc.

Think of it as a chain of functions that process actions before they reach reducers.

Conceptual flow:
----------------

Without middleware:
dispatch(action) → reducer → new state

With middleware:
dispatch(action) → middleware1 → middleware2 → middleware3 → reducer → new state

Each middleware can:
- Inspect actions
- Modify actions
- Stop actions (not pass them forward)
- Dispatch new actions
- Perform side effects (API calls, logging, etc.)

Middleware signature:
---------------------

const middleware = store => next => action => {
  // Code before action reaches reducer
  
  const result = next(action);  // Pass to next middleware or reducer
  
  // Code after action processed
  
  return result;
};

// Explanation:
// store: { getState, dispatch }
// next: function to pass action to next middleware
// action: the dispatched action object

Example: Logger middleware
---------------------------

const logger = store => next => action => {
  console.log('Dispatching action:', action);
  console.log('Current state:', store.getState());
  
  const result = next(action);  // Let action continue
  
  console.log('New state:', store.getState());
  
  return result;
};

// Usage
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

// Now every action is logged
store.dispatch({ type: 'INCREMENT' });
// Logs:
// Dispatching action: { type: 'INCREMENT' }
// Current state: { count: 0 }
// New state: { count: 1 }

Example: Crash reporter middleware
-----------------------------------

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    console.error('Caught an exception!', error);
    // Send to error tracking service
    errorTracking.report(error, {
      action,
      state: store.getState()
    });
    throw error;
  }
};

Example: Analytics middleware
------------------------------

const analytics = store => next => action => {
  // Track user actions
  if (action.type === 'USER_LOGIN') {
    trackEvent('User Login', {
      userId: action.payload.id,
      timestamp: Date.now()
    });
  }
  
  if (action.type === 'PURCHASE_COMPLETE') {
    trackEvent('Purchase', {
      amount: action.payload.total,
      items: action.payload.items.length
    });
  }
  
  return next(action);
};

Example: Action validator middleware
-------------------------------------

const actionValidator = store => next => action => {
  if (!action.type) {
    console.error('Action must have a type!', action);
    return;  // Don't pass invalid action forward
  }
  
  if (typeof action.type !== 'string') {
    console.error('Action type must be a string!', action);
    return;
  }
  
  return next(action);
};

Applying multiple middleware:
------------------------------

import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    crashReporter,
    analytics,
    actionValidator
  )
);

// Order matters! Actions flow through middleware in order:
// dispatch → logger → crashReporter → analytics → validator → reducer

Built-in middleware examples:
------------------------------

1. Redux Thunk (async actions):

// Allows dispatching functions instead of objects
const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  
  return next(action);
};

// Usage
const fetchUser = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_START' });
    
    const user = await api.getUser(id);
    
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
  };
};

dispatch(fetchUser(123));  // Dispatching a function!

2. Redux Logger (development):

import logger from 'redux-logger';

const store = createStore(
  reducer,
  applyMiddleware(logger)
);

// Automatically logs all actions with colored output

3. Redux Promise:

// Handles promises as actions
const promiseMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    action.payload.then(
      result => store.dispatch({ ...action, payload: result }),
      error => store.dispatch({ ...action, payload: error, error: true })
    );
    return;
  }
  
  return next(action);
};

Custom middleware examples:
----------------------------

Example 1: API middleware

const api = store => next => action => {
  if (action.type !== 'API_REQUEST') {
    return next(action);
  }
  
  const { endpoint, method, body, onSuccess, onError } = action.payload;
  
  fetch(endpoint, { method, body: JSON.stringify(body) })
    .then(res => res.json())
    .then(data => store.dispatch({ type: onSuccess, payload: data }))
    .catch(error => store.dispatch({ type: onError, payload: error }));
};

// Usage
dispatch({
  type: 'API_REQUEST',
  payload: {
    endpoint: '/api/users',
    method: 'POST',
    body: { name: 'Alice' },
    onSuccess: 'CREATE_USER_SUCCESS',
    onError: 'CREATE_USER_ERROR'
  }
});

Example 2: Local storage sync

const localStorageMiddleware = store => next => action => {
  const result = next(action);
  
  // Save state to localStorage after every action
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
  
  return result;
};

Example 3: Debounce middleware

const debounce = store => next => action => {
  if (!action.meta || !action.meta.debounce) {
    return next(action);
  }
  
  clearTimeout(action.meta.debounce.timer);
  
  action.meta.debounce.timer = setTimeout(() => {
    next(action);
  }, action.meta.debounce.delay);
};

// Usage
dispatch({
  type: 'SEARCH',
  payload: query,
  meta: {
    debounce: { delay: 500 }
  }
});

Example 4: Router middleware

const routerMiddleware = store => next => action => {
  if (action.type === 'NAVIGATE') {
    window.history.pushState({}, '', action.payload.url);
  }
  
  return next(action);
};

Middleware composition (chaining):
-----------------------------------

// Multiple middleware process action in sequence

const middleware1 = store => next => action => {
  console.log('Middleware 1: before');
  const result = next(action);
  console.log('Middleware 1: after');
  return result;
};

const middleware2 = store => next => action => {
  console.log('Middleware 2: before');
  const result = next(action);
  console.log('Middleware 2: after');
  return result;
};

applyMiddleware(middleware1, middleware2);

// Output when dispatching:
// Middleware 1: before
// Middleware 2: before
// (reducer processes action)
// Middleware 2: after
// Middleware 1: after

Redux Toolkit's configureStore:
--------------------------------

import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      logger,
      analytics
    )
});

// getDefaultMiddleware includes:
// - redux-thunk (for async)
// - Immutability check (development)
// - Serializ ability check (development)

When to use middleware:
-----------------------

✅ Async operations (API calls)
✅ Logging and debugging
✅ Analytics tracking
✅ Error reporting
✅ Action transformation
✅ Side effects (routing, local storage)
✅ Action validation
✅ Rate limiting/debouncing

Common middleware patterns:
---------------------------

1. Conditional execution:

const conditionalMiddleware = store => next => action => {
  if (condition) {
    return next(action);
  }
  // Skip action
};

2. Action transformation:

const transformMiddleware = store => next => action => {
  const transformedAction = {
    ...action,
    timestamp: Date.now()
  };
  return next(transformedAction);
};

3. Dispatching additional actions:

const sideEffectMiddleware = store => next => action => {
  if (action.type === 'USER_LOGIN') {
    // Dispatch additional action
    store.dispatch({ type: 'FETCH_USER_PROFILE', id: action.payload.id });
  }
  
  return next(action);
};

4. Async operations:

const asyncMiddleware = store => next => action => {
  if (action.type === 'ASYNC_ACTION') {
    someAsyncOperation()
      .then(result => store.dispatch({ type: 'SUCCESS', payload: result }))
      .catch(error => store.dispatch({ type: 'ERROR', payload: error }));
    return;
  }
  
  return next(action);
};

Summary:

Middleware:
- Intercepts actions between dispatch and reducer
- Extends Redux functionality
- Signature: store => next => action => {}
- Can inspect, modify, stop, or dispatch actions
- Applied with applyMiddleware()
- Common uses: async, logging, analytics, error tracking
- Order matters (forms a chain)
- Redux Toolkit includes thunk middleware by default
*/


/**
48. What is Redux Thunk and how does asynchronous dispatch work?
----------------------------------------------------------------

Redux Thunk is middleware that allows you to dispatch functions (thunks) instead of
plain action objects. These functions can perform async operations and dispatch
actions when ready.

Problem without Thunk:
----------------------

// Actions must be plain objects
dispatch({ type: 'INCREMENT' });  // ✅ Works

// Can't dispatch async operations
dispatch(async () => {  // ❌ Doesn't work
  const data = await fetch('/api/data');
  return { type: 'FETCH_SUCCESS', payload: data };
});

Solution with Thunk:
--------------------

Redux Thunk lets you dispatch functions that receive `dispatch` and `getState`:

// Thunk action creator (returns a function, not an object)
const fetchUser = (userId) => {
  return async (dispatch, getState) => {
    // Can dispatch actions
    dispatch({ type: 'FETCH_USER_START' });
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };
};

// Dispatch the thunk
dispatch(fetchUser(123));

How Thunk works internally:
----------------------------

// Simplified Thunk middleware implementation
const thunk = store => next => action => {
  // If action is a function, call it with dispatch and getState
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  
  // Otherwise, pass action to next middleware
  return next(action);
};

Installation and setup:
-----------------------

// Install
npm install redux-thunk

// Apply middleware
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

// With Redux Toolkit (thunk included by default)
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer
  // thunk middleware automatically included
});

Basic async example:
--------------------

// Action types
const FETCH_USERS_START = 'FETCH_USERS_START';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

// Thunk action creator
const fetchUsers = () => {
  return async (dispatch) => {
    // Start loading
    dispatch({ type: FETCH_USERS_START });
    
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      // Success
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: users
      });
    } catch (error) {
      // Error
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: error.message
      });
    }
  };
};

// Reducer
const initialState = {
  users: [],
  loading: false,
  error: null
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_START:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// Component
function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers());  // Dispatch thunk
  }, [dispatch]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

Using getState for conditional logic:
--------------------------------------

const fetchUserIfNeeded = (userId) => {
  return (dispatch, getState) => {
    const state = getState();
    const user = state.users.byId[userId];
    
    // Only fetch if user not already in state
    if (!user) {
      dispatch(fetchUser(userId));
    }
  };
};

Chaining thunks:
----------------

const login = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_START' });
    
    const user = await loginAPI(credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    
    // Dispatch another thunk after login
    dispatch(fetchUserProfile(user.id));
    dispatch(fetchUserSettings(user.id));
  };
};

Returning values from thunks:
------------------------------

const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_START' });
    
    const user = await api.getUser(userId);
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    
    return user;  // Can return value
  };
};

// Component can use returned value
const handleClick = async () => {
  const user = await dispatch(fetchUser(123));
  console.log('Fetched user:', user);
};

Error handling patterns:
-------------------------

Pattern 1: Try/catch in thunk

const fetchData = () => {
  return async (dispatch) => {
    try {
      const data = await api.getData();
      dispatch({ type: 'SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.message });
    }
  };
};

Pattern 2: Global error handler

const apiMiddleware = store => next => action => {
  try {
    return next(action);
  } catch (error) {
    store.dispatch({ type: 'GLOBAL_ERROR', payload: error });
  }
};

Pattern 3: Error action creator

const handleError = (error) => ({
  type: 'ERROR',
  payload: { message: error.message, stack: error.stack }
});

const fetchData = () => {
  return async (dispatch) => {
    try {
      const data = await api.getData();
      dispatch({ type: 'SUCCESS', payload: data });
    } catch (error) {
      dispatch(handleError(error));
    }
  };
};

Advanced patterns:
------------------

Pattern 1: Debounced search

let searchTimer;

const searchUsers = (query) => {
  return (dispatch) => {
    clearTimeout(searchTimer);
    
    searchTimer = setTimeout(() => {
      dispatch(fetchSearchResults(query));
    }, 500);
  };
};

Pattern 2: Polling

const startPolling = () => {
  return (dispatch) => {
    const poll = () => {
      dispatch(fetchData());
      setTimeout(poll, 5000);  // Poll every 5 seconds
    };
    
    poll();
  };
};

Pattern 3: Optimistic updates

const updateTodo = (id, updates) => {
  return async (dispatch) => {
    // Optimistically update UI
    dispatch({ type: 'UPDATE_TODO_OPTIMISTIC', id, updates });
    
    try {
      await api.updateTodo(id, updates);
      dispatch({ type: 'UPDATE_TODO_SUCCESS', id, updates });
    } catch (error) {
      // Revert on error
      dispatch({ type: 'UPDATE_TODO_REVERT', id });
      dispatch({ type: 'UPDATE_TODO_ERROR', error });
    }
  };
};

Pattern 4: Sequential async operations

const setupUserAccount = (userData) => {
  return async (dispatch) => {
    // Step 1: Create user
    const user = await api.createUser(userData);
    dispatch({ type: 'USER_CREATED', payload: user });
    
    // Step 2: Create profile
    const profile = await api.createProfile(user.id);
    dispatch({ type: 'PROFILE_CREATED', payload: profile });
    
    // Step 3: Send welcome email
    await api.sendWelcomeEmail(user.email);
    dispatch({ type: 'WELCOME_EMAIL_SENT' });
  };
};

Pattern 5: Parallel async operations

const loadDashboard = () => {
  return async (dispatch) => {
    dispatch({ type: 'LOAD_DASHBOARD_START' });
    
    // Fetch multiple things in parallel
    const [users, posts, comments] = await Promise.all([
      api.getUsers(),
      api.getPosts(),
      api.getComments()
    ]);
    
    dispatch({ type: 'USERS_LOADED', payload: users });
    dispatch({ type: 'POSTS_LOADED', payload: posts });
    dispatch({ type: 'COMMENTS_LOADED', payload: comments });
    
    dispatch({ type: 'LOAD_DASHBOARD_COMPLETE' });
  };
};

Testing thunks:
---------------

// Test with mock dispatch
test('fetchUsers dispatches correct actions', async () => {
  const dispatch = jest.fn();
  const thunk = fetchUsers();
  
  await thunk(dispatch);
  
  expect(dispatch).toHaveBeenCalledWith({ type: 'FETCH_USERS_START' });
  expect(dispatch).toHaveBeenCalledWith({
    type: 'FETCH_USERS_SUCCESS',
    payload: expect.any(Array)
  });
});

// Test with redux-mock-store
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);

test('fetchUsers', async () => {
  const store = mockStore({});
  
  await store.dispatch(fetchUsers());
  
  const actions = store.getActions();
  expect(actions[0]).toEqual({ type: 'FETCH_USERS_START' });
  expect(actions[1].type).toBe('FETCH_USERS_SUCCESS');
});

Modern alternative (RTK Query):
--------------------------------

Redux Toolkit includes RTK Query, which handles async state automatically:

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users'
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user
      })
    })
  })
});

// Auto-generated hooks
const { useGetUsersQuery, useCreateUserMutation } = api;

// Component
function Users() {
  const { data, isLoading, error } = useGetUsersQuery();
  // No thunks needed!
}

When to use Thunk:
------------------

✅ Async operations (API calls)
✅ Access to current state (getState)
✅ Conditional dispatching
✅ Complex async workflows
✅ Legacy Redux code

When to use alternatives:
-------------------------

- RTK Query: Server state, caching, automatic refetching
- Redux Saga: Complex async flows, cancellation, debouncing
- Redux Observable: RxJS-based reactive programming

Summary:

Redux Thunk:
- Middleware for async actions
- Dispatch functions instead of objects
- Functions receive dispatch and getState
- Simple solution for most async needs
- Included in Redux Toolkit by default
- Good for: API calls, conditional logic, sequential operations
- Alternative: RTK Query for server state
*/


/**
49. What is Redux Saga and how does it differ from Thunk?
---------------------------------------------------------

Redux Saga is middleware that handles side effects using generator functions. It
provides more control over async flows than Thunk, with features like cancellation,
debouncing, parallel execution, and testing.

Key differences: Thunk vs Saga
-------------------------------

Redux Thunk:
- Dispatches functions
- Uses async/await or promises
- Simple, straightforward
- Limited control over async flows
- Good for simple async operations

Redux Saga:
- Uses generator functions (function*)
- Declarative effects (put, call, take, etc.)
- Advanced async control (cancel, debounce, race, throttle)
- Testable without mocking
- Better for complex async workflows

Basic Saga example:
-------------------

// Saga (generator function)
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUserSaga(action) {
  try {
    // put = dispatch action
    yield put({ type: 'FETCH_USER_START' });
    
    // call = call function (API, etc.)
    const user = yield call(api.getUser, action.payload.userId);
    
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', payload: error.message });
  }
}

// Watcher saga
function* watchFetchUser() {
  // takeEvery = listen for every FETCH_USER action
  yield takeEvery('FETCH_USER', fetchUserSaga);
}

// Root saga
function* rootSaga() {
  yield all([
    watchFetchUser(),
    // other sagas...
  ]);
}

// Setup
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// Dispatch normal action (saga intercepts it)
dispatch({ type: 'FETCH_USER', payload: { userId: 123 } });

Same example with Thunk:
-------------------------

const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_START' });
    
    try {
      const user = await api.getUser(userId);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', payload: error.message });
    }
  };
};

dispatch(fetchUser(123));

Saga effects:
-------------

1. call - Call function (API, etc.)

yield call(api.getUser, userId);
// Equivalent to: await api.getUser(userId)

2. put - Dispatch action

yield put({ type: 'SUCCESS', payload: data });
// Equivalent to: dispatch({ type: 'SUCCESS', payload: data })

3. take - Wait for action

const action = yield take('USER_LOGIN');
// Pauses until USER_LOGIN action dispatched

4. takeEvery - Listen to every action

yield takeEvery('FETCH_USER', fetchUserSaga);
// Runs fetchUserSaga for every FETCH_USER action

5. takeLatest - Cancel previous, take latest

yield takeLatest('SEARCH', searchSaga);
// If SEARCH dispatched while previous still running, cancel previous

6. select - Get state

const user = yield select(state => state.user);
// Equivalent to: getState().user

7. fork - Non-blocking call (run in background)

yield fork(backgroundTask);
// Continues without waiting

8. spawn - Detached fork

yield spawn(independentTask);
// Runs independently, errors don't bubble up

9. cancel - Cancel task

const task = yield fork(longRunningTask);
yield cancel(task);  // Stop it

10. race - Race multiple effects

const { response, timeout } = yield race({
  response: call(api.getData),
  timeout: delay(5000)
});

11. all - Run in parallel

const [users, posts] = yield all([
  call(api.getUsers),
  call(api.getPosts)
]);

12. delay - Wait for time

yield delay(1000);  // Wait 1 second

Advanced Saga patterns:
-----------------------

Pattern 1: Debouncing

function* searchSaga(action) {
  // Wait 500ms before executing
  yield delay(500);
  const results = yield call(api.search, action.payload);
  yield put({ type: 'SEARCH_SUCCESS', payload: results });
}

function* watchSearch() {
  yield debounce(500, 'SEARCH', searchSaga);
  // Auto-debounces: waits 500ms after last action
}

Pattern 2: Cancellation

function* backgroundSync() {
  while (true) {
    const data = yield call(api.sync);
    yield put({ type: 'SYNC_SUCCESS', payload: data });
    yield delay(5000);  // Sync every 5 seconds
  }
}

function* watchSync() {
  while (true) {
    yield take('START_SYNC');
    const syncTask = yield fork(backgroundSync);
    
    yield take('STOP_SYNC');
    yield cancel(syncTask);  // Stop syncing
  }
}

Pattern 3: Racing effects

function* fetchWithTimeout() {
  const { data, timeout } = yield race({
    data: call(api.getData),
    timeout: delay(5000)
  });
  
  if (timeout) {
    yield put({ type: 'FETCH_TIMEOUT' });
  } else {
    yield put({ type: 'FETCH_SUCCESS', payload: data });
  }
}

Pattern 4: Retry logic

function* fetchWithRetry() {
  for (let i = 0; i < 3; i++) {
    try {
      const data = yield call(api.getData);
      yield put({ type: 'SUCCESS', payload: data });
      return;
    } catch (error) {
      if (i < 2) {
        yield delay(1000 * (i + 1));  // Exponential backoff
      }
    }
  }
  
  yield put({ type: 'ERROR', payload: 'Failed after 3 retries' });
}

Pattern 5: Polling

function* pollData() {
  while (true) {
    try {
      const data = yield call(api.getData);
      yield put({ type: 'DATA_UPDATED', payload: data });
      yield delay(3000);  // Poll every 3 seconds
    } catch (error) {
      yield put({ type: 'POLL_ERROR', payload: error });
      break;
    }
  }
}

function* watchPolling() {
  while (true) {
    yield take('START_POLLING');
    const pollingTask = yield fork(pollData);
    
    yield take('STOP_POLLING');
    yield cancel(pollingTask);
  }
}

Pattern 6: Parallel requests

function* loadDashboard() {
  try {
    // Fetch in parallel
    const [users, posts, stats] = yield all([
      call(api.getUsers),
      call(api.getPosts),
      call(api.getStats)
    ]);
    
    yield put({ type: 'DASHBOARD_LOADED', payload: { users, posts, stats } });
  } catch (error) {
    yield put({ type: 'DASHBOARD_ERROR', payload: error });
  }
}

Pattern 7: Sequential flow with dependencies

function* setupUser() {
  // Step 1: Create user
  const user = yield call(api.createUser, userData);
  yield put({ type: 'USER_CREATED', payload: user });
  
  // Step 2: Create profile (depends on user.id)
  const profile = yield call(api.createProfile, user.id);
  yield put({ type: 'PROFILE_CREATED', payload: profile });
  
  // Step 3: Send email
  yield call(api.sendEmail, user.email);
  yield put({ type: 'SETUP_COMPLETE' });
}

Pattern 8: Optimistic updates with rollback

function* updateTodo(action) {
  const { id, updates } = action.payload;
  
  // Get original for rollback
  const original = yield select(state => 
    state.todos.find(t => t.id === id)
  );
  
  // Optimistic update
  yield put({ type: 'UPDATE_TODO_OPTIMISTIC', id, updates });
  
  try {
    yield call(api.updateTodo, id, updates);
    yield put({ type: 'UPDATE_TODO_SUCCESS' });
  } catch (error) {
    // Rollback on error
    yield put({ type: 'UPDATE_TODO_ROLLBACK', id, original });
    yield put({ type: 'UPDATE_TODO_ERROR', error });
  }
}

Testing Sagas:
--------------

Sagas are easy to test without mocking:

import { call, put } from 'redux-saga/effects';

function* fetchUser(action) {
  const user = yield call(api.getUser, action.userId);
  yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
}

// Test
test('fetchUser saga', () => {
  const gen = fetchUser({ userId: 123 });
  
  // Test API call
  expect(gen.next().value).toEqual(
    call(api.getUser, 123)
  );
  
  // Test dispatch
  expect(gen.next(mockUser).value).toEqual(
    put({ type: 'FETCH_USER_SUCCESS', payload: mockUser })
  );
  
  // Test done
  expect(gen.next().done).toBe(true);
});

Compare: Testing Thunk (needs mocking):

test('fetchUser thunk', async () => {
  const dispatch = jest.fn();
  const mockApi = jest.fn().mockResolvedValue(mockUser);
  
  await fetchUser(123)(dispatch);
  
  expect(mockApi).toHaveBeenCalledWith(123);
  expect(dispatch).toHaveBeenCalledWith({ 
    type: 'FETCH_USER_SUCCESS', 
    payload: mockUser 
  });
});

When to use Saga vs Thunk:
---------------------------

Use Redux Saga when:
✅ Complex async workflows
✅ Need cancellation
✅ Debouncing/throttling
✅ Polling
✅ Racing conditions
✅ Advanced testing requirements
✅ Background tasks
✅ Sequential/parallel orchestration

Use Redux Thunk when:
✅ Simple async operations
✅ Quick API calls
✅ Learning Redux
✅ Small/medium apps
✅ Team unfamiliar with generators
✅ Less boilerplate needed

Comparison table:
-----------------

Feature          | Thunk           | Saga
-----------------|-----------------|------------------
Learning curve   | Low             | High (generators)
Boilerplate      | Low             | High
Testability      | Needs mocking   | Pure, easy
Cancellation     | Manual          | Built-in
Debouncing       | Manual          | Built-in (debounce)
Polling          | Manual          | Built-in (while loop)
Racing           | Promise.race    | race() effect
Parallel         | Promise.all     | all() effect
Sequential       | async/await     | yield
Code style       | Imperative      | Declarative

Migration example:
------------------

// Thunk
const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: 'START' });
  try {
    const user = await api.getUser(id);
    dispatch({ type: 'SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
};

// Equivalent Saga
function* fetchUserSaga(action) {
  yield put({ type: 'START' });
  try {
    const user = yield call(api.getUser, action.payload.id);
    yield put({ type: 'SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'ERROR', payload: error });
  }
}

function* watchFetchUser() {
  yield takeEvery('FETCH_USER', fetchUserSaga);
}

Summary:

Redux Saga:
- Uses generator functions (function*)
- Declarative effects (call, put, take, etc.)
- Advanced async control (cancel, race, debounce)
- Easy to test (no mocking)
- Better for complex workflows
- Steeper learning curve
- More boilerplate

Redux Thunk:
- Simple async/await
- Less boilerplate
- Easier to learn
- Good for simple cases
- Needs mocking for tests

Choose Saga for complex apps with advanced async needs.
Choose Thunk for simple apps or when learning Redux.
*/


/**
50. What is Zustand, Recoil, or Jotai (modern state managers)?
--------------------------------------------------------------

These are modern state management libraries that provide simpler alternatives to Redux
with less boilerplate and better DX (developer experience).

Zustand:
--------

Lightweight state management with a hooks-based API. No providers, no boilerplate.

Installation:
npm install zustand

Basic usage:

import create from 'zustand';

// Create store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// Use in component
function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}

Features:

1. No providers needed:
   // No <Provider> wrapper!
   function App() {
     return <Counter />;
   }

2. Async actions built-in:
   const useStore = create((set) => ({
     users: [],
     fetchUsers: async () => {
       const response = await fetch('/api/users');
       const users = await response.json();
       set({ users });
     }
   }));

3. Middleware:
   import { persist } from 'zustand/middleware';
   
   const useStore = create(
     persist(
       (set) => ({
         count: 0,
         increment: () => set((state) => ({ count: state.count + 1 }))
       }),
       { name: 'counter-storage' }  // localStorage key
     )
   );

4. Devtools:
   import { devtools } from 'zustand/middleware';
   
   const useStore = create(
     devtools((set) => ({
       count: 0,
       increment: () => set((state) => ({ count: state.count + 1 }))
     }))
   );

5. Slices pattern:
   const createUserSlice = (set) => ({
     user: null,
     setUser: (user) => set({ user })
   });
   
   const createTodosSlice = (set) => ({
     todos: [],
     addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] }))
   });
   
   const useStore = create((set) => ({
     ...createUserSlice(set),
     ...createTodosSlice(set)
   }));

Recoil:
-------

Facebook's experimental state management focused on atomic state and derived state.

Installation:
npm install recoil

Basic usage:

import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atom (piece of state)
const countState = atom({
  key: 'countState',  // Unique ID
  default: 0
});

// Selector (derived state)
const doubledState = selector({
  key: 'doubledState',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  }
});

// Wrap app with RecoilRoot
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

// Use in component
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  const doubled = useRecoilValue(doubledState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

Features:

1. Atomic state:
   const userState = atom({
     key: 'user',
     default: null
   });
   
   const themeState = atom({
     key: 'theme',
     default: 'light'
   });

2. Derived state (selectors):
   const filteredTodosState = selector({
     key: 'filteredTodos',
     get: ({ get }) => {
       const todos = get(todosState);
       const filter = get(filterState);
       
       return todos.filter(todo => {
         if (filter === 'completed') return todo.completed;
         if (filter === 'active') return !todo.completed;
         return true;
       });
     }
   });

3. Async selectors:
   const userInfoState = selector({
     key: 'userInfo',
     get: async ({ get }) => {
       const userId = get(userIdState);
       const response = await fetch(`/api/users/${userId}`);
       return response.json();
     }
   });

4. Atom families (dynamic atoms):
   const todoState = atomFamily({
     key: 'todo',
     default: (id) => ({
       id,
       text: '',
       completed: false
     })
   });
   
   // Use
   const [todo1, setTodo1] = useRecoilState(todoState(1));
   const [todo2, setTodo2] = useRecoilState(todoState(2));

5. Suspense support:
   function UserProfile() {
     const user = useRecoilValue(userInfoState);  // Suspends while loading
     
     return <div>{user.name}</div>;
   }
   
   function App() {
     return (
       <Suspense fallback={<Loading />}>
         <UserProfile />
       </Suspense>
     );
   }

Jotai:
------

Primitive and flexible state management inspired by Recoil but simpler.

Installation:
npm install jotai

Basic usage:

import { atom, useAtom } from 'jotai';

// Create atom
const countAtom = atom(0);

// Use in component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

Features:

1. No keys required (unlike Recoil):
   const countAtom = atom(0);  // That's it!

2. Derived atoms:
   const doubledAtom = atom((get) => get(countAtom) * 2);

3. Write-only atoms:
   const incrementAtom = atom(
     null,  // No read
     (get, set) => set(countAtom, get(countAtom) + 1)
   );
   
   // Use
   const increment = useSetAtom(incrementAtom);
   <button onClick={increment}>+</button>

4. Async atoms:
   const userAtom = atom(async (get) => {
     const userId = get(userIdAtom);
     const response = await fetch(`/api/users/${userId}`);
     return response.json();
   });

5. Atom families:
   import { atomFamily } from 'jotai/utils';
   
   const todoAtomFamily = atomFamily((id) =>
     atom({ id, text: '', completed: false })
   );

6. Utils:
   import { atomWithStorage } from 'jotai/utils';
   
   const darkModeAtom = atomWithStorage('darkMode', false);

Comparison:
-----------

Zustand:
+ Simplest API
+ No providers
+ Built-in middleware
+ Great TypeScript support
- Less opinionated structure

Recoil:
+ Atomic state model
+ Powerful selectors
+ Suspense integration
+ Good for complex derived state
- Experimental
- Requires Provider
- More boilerplate

Jotai:
+ Minimal API
+ No keys (unlike Recoil)
+ TypeScript-first
+ Primitive and composable
- Smaller ecosystem

Redux:
+ Battle-tested
+ Huge ecosystem
+ DevTools
+ Middleware
- Most boilerplate
- Steeper learning curve

Feature comparison:
-------------------

Feature          | Zustand | Recoil  | Jotai   | Redux
-----------------|---------|---------|---------|--------
Provider         | No      | Yes     | Optional| Yes
Boilerplate      | Low     | Medium  | Low     | High
DevTools         | Yes     | Yes     | Yes     | Yes
Async            | Built-in| Selector| Atom    | Middleware
Derived state    | Manual  | Selector| Atom    | Manual/Reselect
Bundle size      | 1.2KB   | 79KB    | 3KB     | 3KB(+libs)
Learning curve   | Low     | Medium  | Low     | High

When to use which:
------------------

Zustand:
✅ Small to medium apps
✅ Want simplicity
✅ Don't need atomic state
✅ Quick setup

Recoil:
✅ Complex derived state
✅ Need Suspense integration
✅ Facebook ecosystem
✅ Experimental features OK

Jotai:
✅ TypeScript projects
✅ Minimal bundle size
✅ Want atomic state (simpler than Recoil)
✅ Flexible architecture

Redux:
✅ Large enterprise apps
✅ Team knows Redux
✅ Need strict patterns
✅ Extensive debugging needs

Summary:

Modern state managers offer:
- Less boilerplate than Redux
- Hooks-based APIs
- Better TypeScript support
- Smaller bundle sizes
- Simpler setup

Choose based on:
- Team familiarity
- App complexity
- Bundle size requirements
- Feature needs (Suspense, middleware, etc.)
*/


/**
51. What is MobX and how does observable state work?
----------------------------------------------------

MobX is a state management library based on reactive programming and observables.
It automatically tracks dependencies and updates components when observable state changes.

Core Philosophy:
"Anything that can be derived from the application state, should be derived. Automatically."

Unlike Redux (manual actions/reducers), MobX uses observables that automatically
trigger reactions when state changes.

Installation:
-------------

npm install mobx mobx-react-lite

Core Concepts:
--------------

1. Observable: State that MobX tracks
2. Actions: Functions that modify observables
3. Computed: Derived values that auto-update
4. Reactions: Side effects that run when observables change
5. Observer: React components that auto re-render

How Observable State Works:
----------------------------

MobX uses ES6 Proxies to intercept property access and modifications.
When you read an observable, MobX records the dependency.
When you write to an observable, MobX notifies all dependents.

Think of it like a spreadsheet:
- Cells are observables
- Formulas are computed values
- When a cell changes, formulas automatically recalculate

Basic Example:
--------------

import { makeObservable, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react-lite';

// Create observable store (class-based)
class CounterStore {
  count = 0;
  
  constructor() {
    makeObservable(this, {
      count: observable,      // Make count trackable
      increment: action,      // Mark as action
      decrement: action,
      doubleCount: computed   // Derived value
    });
  }
  
  increment() {
    this.count += 1;  // Direct mutation! (MobX allows this)
  }
  
  decrement() {
    this.count -= 1;
  }
  
  get doubleCount() {
    return this.count * 2;  // Auto-recalculates when count changes
  }
}

// Create store instance
const counterStore = new CounterStore();

// Observer component (auto re-renders when observables change)
const Counter = observer(() => {
  return (
    <div>
      <h1>Count: {counterStore.count}</h1>
      <h2>Double: {counterStore.doubleCount}</h2>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
    </div>
  );
});

// Component only re-renders when observables it READS change
// If Counter didn't use doubleCount, it wouldn't re-render when doubleCount changes

Modern MobX 6 Syntax (makeAutoObservable):
-------------------------------------------

import { makeAutoObservable } from 'mobx';

class TodoStore {
  todos = [];
  filter = 'all';
  
  constructor() {
    // Automatically makes everything observable/action/computed
    makeAutoObservable(this);
  }
  
  addTodo(text) {
    this.todos.push({
      id: Date.now(),
      text,
      completed: false
    });
  }
  
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;  // Direct mutation
    }
  }
  
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
  
  setFilter(filter) {
    this.filter = filter;
  }
  
  // Computed value (auto-updates)
  get filteredTodos() {
    switch (this.filter) {
      case 'completed':
        return this.todos.filter(t => t.completed);
      case 'active':
        return this.todos.filter(t => !t.completed);
      default:
        return this.todos;
    }
  }
  
  get stats() {
    return {
      total: this.todos.length,
      completed: this.todos.filter(t => t.completed).length,
      active: this.todos.filter(t => !t.completed).length
    };
  }
}

// Create store
const todoStore = new TodoStore();

// Provider pattern (optional, for multiple stores)
import { createContext, useContext } from 'react';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = new TodoStore();
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return store;
};

// Components
const TodoList = observer(() => {
  const store = useStore();
  
  return (
    <div>
      <h2>Todos ({store.stats.total})</h2>
      <div>
        <button onClick={() => store.setFilter('all')}>All</button>
        <button onClick={() => store.setFilter('active')}>Active</button>
        <button onClick={() => store.setFilter('completed')}>Completed</button>
      </div>
      
      <ul>
        {store.filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      
      <p>Active: {store.stats.active} | Completed: {store.stats.completed}</p>
    </div>
  );
});

const TodoItem = observer(({ todo }) => {
  const store = useStore();
  
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => store.toggleTodo(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => store.deleteTodo(todo.id)}>Delete</button>
    </li>
  );
});

const TodoInput = observer(() => {
  const store = useStore();
  const [text, setText] = useState('');
  
  const handleSubmit = () => {
    if (text.trim()) {
      store.addTodo(text);
      setText('');
    }
  };
  
  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && handleSubmit()}
      />
      <button onClick={handleSubmit}>Add Todo</button>
    </div>
  );
});

Reactions (Side Effects):
--------------------------

import { autorun, reaction, when } from 'mobx';

// 1. autorun: Runs immediately and whenever observables change
const dispose = autorun(() => {
  console.log('Count changed:', counterStore.count);
  // Automatically tracks counterStore.count dependency
});

// Stop tracking
dispose();

// 2. reaction: Runs only when specific data changes
const dispose2 = reaction(
  // Data function (what to track)
  () => todoStore.todos.length,
  // Effect function (what to do)
  (length) => {
    console.log('Todos count changed:', length);
    localStorage.setItem('todosCount', length);
  }
);

// 3. when: Runs once when condition becomes true
when(
  // Predicate
  () => todoStore.todos.length > 10,
  // Effect
  () => {
    console.log('You have more than 10 todos!');
  }
);

// Async when
await when(() => userStore.isLoggedIn);
console.log('User is now logged in');

Async Actions:
--------------

import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
  users = [];
  loading = false;
  error = null;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  async fetchUsers() {
    this.loading = true;
    this.error = null;
    
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      // Use runInAction for async state updates
      runInAction(() => {
        this.users = users;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
        this.loading = false;
      });
    }
  }
  
  // Alternative: flow (generator function)
  fetchUsers = flow(function* () {
    this.loading = true;
    this.error = null;
    
    try {
      const response = yield fetch('/api/users');
      const users = yield response.json();
      
      // No runInAction needed with flow
      this.users = users;
      this.loading = false;
    } catch (error) {
      this.error = error.message;
      this.loading = false;
    }
  });
}

const UserList = observer(() => {
  const store = useStore();
  
  useEffect(() => {
    store.fetchUsers();
  }, [store]);
  
  if (store.loading) return <div>Loading...</div>;
  if (store.error) return <div>Error: {store.error}</div>;
  
  return (
    <ul>
      {store.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
});

Observable Arrays, Objects, Maps, Sets:
----------------------------------------

import { observable, makeObservable } from 'mobx';

class DataStore {
  // Observable array
  items = observable.array([1, 2, 3]);
  
  // Observable object
  user = observable.object({
    name: 'Alice',
    age: 30
  });
  
  // Observable Map
  usersById = observable.map();
  
  // Observable Set
  tags = observable.set(['react', 'mobx']);
  
  constructor() {
    makeObservable(this);
  }
  
  addItem(item) {
    this.items.push(item);  // Triggers observers
  }
  
  updateUser(key, value) {
    this.user[key] = value;  // Triggers observers
  }
  
  addUser(id, user) {
    this.usersById.set(id, user);  // Triggers observers
  }
  
  addTag(tag) {
    this.tags.add(tag);  // Triggers observers
  }
}

Computed Values with Arguments:
--------------------------------

class ProductStore {
  products = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  // Computed with parameter (use function)
  getProductsByCategory(category) {
    return this.products.filter(p => p.category === category);
  }
  
  // Or use computedFn from mobx-utils
  getProductsByCategory = computedFn((category) => {
    return this.products.filter(p => p.category === category);
  });
}

Local Observable State (without store):
----------------------------------------

import { useLocalObservable } from 'mobx-react-lite';

const Counter = observer(() => {
  const state = useLocalObservable(() => ({
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    get doubleCount() {
      return this.count * 2;
    }
  }));
  
  return (
    <div>
      <h1>{state.count}</h1>
      <h2>{state.doubleCount}</h2>
      <button onClick={() => state.increment()}>+</button>
      <button onClick={() => state.decrement()}>-</button>
    </div>
  );
});

MobX vs Redux:
--------------

MobX:
✅ Less boilerplate (no actions/reducers)
✅ Direct mutations allowed (store.count++)
✅ Automatic dependency tracking
✅ Object-oriented
✅ Computed values built-in
✅ Better for rapid development
❌ Less predictable (implicit reactivity)
❌ Smaller ecosystem
❌ Can be "magical" (harder to debug)

Redux:
✅ Predictable (explicit actions)
✅ Time-travel debugging
✅ Strict patterns
✅ Huge ecosystem
✅ Better for large teams
❌ More boilerplate
❌ Immutable updates required
❌ Manual optimization (useMemo, reselect)

Code Comparison:
----------------

// Redux
const ADD_TODO = 'ADD_TODO';

const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

function todosReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];  // Immutable
    default:
      return state;
  }
}

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  
  return (
    <button onClick={() => dispatch(addTodo('New todo'))}>
      Add
    </button>
  );
};

// MobX
class TodoStore {
  todos = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addTodo(text) {
    this.todos.push({  // Mutable!
      id: Date.now(),
      text,
      completed: false
    });
  }
}

const TodoList = observer(() => {
  const store = useStore();
  
  return (
    <button onClick={() => store.addTodo('New todo')}>
      Add
    </button>
  );
});

Performance Optimization:
-------------------------

// MobX automatically optimizes re-renders
// Only components that read changed observables re-render

const TodoApp = observer(() => {
  const store = useStore();
  
  return (
    <div>
      <TodoStats />  {/* Only re-renders if stats change * /}
      <TodoList />   {/* Only re-renders if todos change * /}
      <TodoFilter /> {/* Only re-renders if filter changes * /}
    </div>
  );
});

// Fine-grained control with observer on specific parts
const TodoItem = ({ todo }) => {
  return (
    <li>
      {/* Only this span re-renders when todo.text changes * /}
      {observer(() => <span>{todo.text}</span>)}
      
      {/* Only this input re-renders when todo.completed changes * /}
      {observer(() => (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => todo.completed = !todo.completed}
        />
      ))}
    </li>
  );
};

DevTools:
---------

// Install mobx-react-devtools
import { configure } from 'mobx';

// Enable strict mode (recommended)
configure({
  enforceActions: 'always',  // Require actions for state changes
  computedRequiresReaction: true,  // Computed must be read by reaction
  reactionRequiresObservable: true,  // Reactions must access observables
  observableRequiresReaction: true  // Observables must be read by reactions
});

When to Use MobX:
-----------------

✅ Rapid development, less boilerplate
✅ Object-oriented codebase
✅ Complex computed values
✅ Prefer automatic reactivity
✅ Coming from Vue/Angular
✅ Small to medium apps
✅ Need fine-grained reactivity

When NOT to use MobX:
---------------------

❌ Need strict patterns (use Redux)
❌ Large team needs predictability
❌ Time-travel debugging required
❌ Team unfamiliar with OOP/observables
❌ Want explicit action tracking

Summary:

MobX = Automatic reactive state management
- Observables: Tracked state
- Actions: Functions that modify state
- Computed: Derived values (auto-update)
- Reactions: Side effects (auto-run)
- Observer: Components that auto re-render
- Less boilerplate than Redux
- Direct mutations allowed
- Automatic dependency tracking
- Great for rapid development
*/


