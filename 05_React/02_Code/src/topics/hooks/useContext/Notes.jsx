/**
useContext Hook - Comprehensive Notes
=====================================

useContext is a hook that lets you subscribe to React Context without introducing 
nesting. Context allows you to pass data through the component tree without having 
to pass props down manually at every level (prop drilling).

SYNTAX
------
const value = useContext(MyContext);

PARAMETERS
----------
- MyContext: A context object created with React.createContext()

RETURNS
-------
The current context value (whatever was passed to the Provider's value prop)

CONTEXT API BASICS
------------------

Creating a Context:
  const MyContext = React.createContext(defaultValue);

Creating a Provider:
  function MyProvider({ children }) {
    const [value, setValue] = useState(initialValue);
    
    return (
      <MyContext.Provider value={{ value, setValue }}>
        {children}
      </MyContext.Provider>
    );
  }

Using Context with useContext:
  function Component() {
    const { value, setValue } = useContext(MyContext);
    return <div>{value}</div>;
  }

PROBLEM SOLVED: PROP DRILLING
-----------------------------

Without Context (Prop Drilling):
  function App() {
    const [theme, setTheme] = useState('light');
    return <Page theme={theme} setTheme={setTheme} />;
  }

  function Page({ theme, setTheme }) {
    return <Header theme={theme} setTheme={setTheme} />;
  }

  function Header({ theme, setTheme }) {
    return <Button theme={theme} setTheme={setTheme} />;
  }

  function Button({ theme, setTheme }) {
    return <button>Toggle ({theme})</button>;
  }

With Context:
  function App() {
    const [theme, setTheme] = useState('light');
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Page />
      </ThemeContext.Provider>
    );
  }

  function Button() {
    const { theme, setTheme } = useContext(ThemeContext);
    return <button>Toggle ({theme})</button>;
  }

COMMON USE CASES
----------------

1. Theme (light/dark mode)
   - Pass theme colors, sizes, fonts throughout app
   - Single place to manage theme state

2. Authentication
   - Store user info, login status, token
   - Access in any component without prop drilling

3. Localization (i18n)
   - Store current language
   - Provide translation function

4. UI State
   - Modals, notifications, dropdowns
   - Global visibility state

5. App Settings
   - User preferences
   - Feature flags

6. Shopping Cart
   - Global cart state across multiple pages
   - Add/remove items from anywhere

7. Notifications
   - Toast messages, alerts
   - Accessible from any component

BEST PRACTICES
--------------

1. Create separate contexts for different concerns:
   const ThemeContext = createContext();
   const AuthContext = createContext();
   const NotificationContext = createContext();

2. Create custom hooks for context:
   function useTheme() {
     const context = useContext(ThemeContext);
     if (!context) {
       throw new Error('useTheme must be inside ThemeProvider');
     }
     return context;
   }

3. Split providers into separate components:
   function App() {
     return (
       <ThemeProvider>
         <AuthProvider>
           <NotificationProvider>
             <AppContent />
           </NotificationProvider>
         </AuthProvider>
       </ThemeProvider>
     );
   }

4. Use composition to combine multiple providers:
   function CombinedProviders({ children }) {
     return (
       <ThemeProvider>
         <AuthProvider>
           {children}
         </AuthProvider>
       </ThemeProvider>
     );
   }

5. Memoize context value to prevent unnecessary re-renders:
   const value = useMemo(() => ({
     theme,
     toggleTheme
   }), [theme]);

6. Split into smaller contexts:
   Instead of: <AppContext.Provider value={{theme, auth, notifications}}>
   Do: 
     <ThemeProvider>
       <AuthProvider>
         <NotificationProvider>

DEFAULT VALUES
--------------

Provide meaningful defaults when creating context:

❌ Less useful:
  const MyContext = createContext();

✅ Better - with default shape:
  const MyContext = createContext({
    value: null,
    setValue: () => {}
  });

Or with TypeScript interface:
  interface MyContextType {
    value: string;
    setValue: (value: string) => void;
  }
  const MyContext = createContext<MyContextType | undefined>(undefined);

PERFORMANCE CONSIDERATIONS
--------------------------

Issue: Re-renders on every change

When context value changes, ALL consumers re-render:

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Every consumer re-renders when count OR name changes
  return (
    <Context.Provider value={{ count, name }}>
      <Component /> // Re-renders even if only using 'name'
    </Context.Provider>
  );
}

Solutions:

1. Split contexts by concern:
   function App() {
     return (
       <CountContext.Provider value={{count, setCount}}>
         <NameContext.Provider value={{name, setName}}>
           <Component />
         </NameContext.Provider>
       </CountContext.Provider>
     );
   }

2. Memoize the value:
   const value = useMemo(() => ({ count, name }), [count, name]);
   return (
     <Context.Provider value={value}>
       <Component />
     </Context.Provider>
   );

3. Use useCallback for functions:
   const handleClick = useCallback(() => {
     setCount(prev => prev + 1);
   }, []);

4. Use state management library (Redux, Zustand) for complex state

WHEN NOT TO USE CONTEXT
-----------------------

❌ DON'T use for:
- Frequently changing values (updates thousands of times/second)
- Form input values (use local state instead)
- Animation values (should use refs or local state)
- Simple prop passing (1-2 levels deep)
- Already have good alternative (Redux, Zustand)

✅ USE state management library if:
- Very complex state logic
- Frequent updates needed
- Need time-travel debugging
- Sharing state across many routes/pages
- Need middleware capabilities

CONTEXT WITH HOOKS
------------------

Combining contexts with other hooks:

1. useContext + useReducer:
   function MyProvider({ children }) {
     const [state, dispatch] = useReducer(reducer, initialState);
     
     return (
       <MyContext.Provider value={{ state, dispatch }}>
         {children}
       </MyContext.Provider>
     );
   }

2. useContext + useCallback:
   function MyProvider({ children }) {
     const [data, setData] = useState(...);
     
     const updateData = useCallback((newData) => {
       setData(newData);
     }, []);
     
     const value = useMemo(() => ({
       data,
       updateData
     }), [data, updateData]);
     
     return (
       <MyContext.Provider value={value}>
         {children}
       </MyContext.Provider>
     );
   }

3. useContext + localStorage:
   function MyProvider({ children }) {
     const [data, setData] = useState(() => {
       const saved = localStorage.getItem('data');
       return saved ? JSON.parse(saved) : initialValue;
     });
     
     useEffect(() => {
       localStorage.setItem('data', JSON.stringify(data));
     }, [data]);
     
     return (
       <MyContext.Provider value={{ data, setData }}>
         {children}
       </MyContext.Provider>
     );
   }

DEBUGGING CONTEXT
-----------------

1. Check Provider is wrapping component:
   // ❌ This won't work - MyComponent outside MyProvider
   function App() {
     return <MyComponent />;
   }
   
   function MyComponent() {
     const value = useContext(MyContext); // Error: undefined
   }

   // ✅ Correct
   function App() {
     return (
       <MyProvider>
         <MyComponent />
       </MyProvider>
     );
   }

2. Verify default value or Provider value exists:
   // Check if context value is undefined
   function MyComponent() {
     const value = useContext(MyContext);
     console.log('Context value:', value);
     if (!value) {
       return <div>Error: Not inside provider</div>;
     }
     return <div>{value}</div>;
   }

3. React DevTools:
   - Shows component tree with Provider hierarchy
   - Can inspect context values in real-time

CUSTOM HOOK PATTERN
-------------------

Create custom hook for better DX:

function useMyContext() {
  const context = useContext(MyContext);
  
  if (context === undefined) {
    throw new Error('useMyContext must be used inside MyProvider');
  }
  
  return context;
}

Usage:
function Component() {
  const { value, setValue } = useMyContext(); // Type-safe, error if not in provider
}

TESTING CONTEXT
---------------

import { render } from '@testing-library/react';

// Create test provider
function TestProvider({ children }) {
  const [value, setValue] = useState('test');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Test with context
test('component uses context', () => {
  render(
    <TestProvider>
      <MyComponent />
    </TestProvider>
  );
  // assertions
});

GOTCHAS
-------

1. Context doesn't make component re-render if parent doesn't:
   - If parent of Provider doesn't re-render, Provider updates won't notify children

2. Value === comparison:
   - If value object is recreated each render, all consumers re-render
   - Use useMemo to memoize value

3. Multiple providers can be nested:
   - Order matters for override
   - Inner provider overrides outer provider

4. useContext returns default value when outside provider:
   - Will use createContext default value
   - Check for undefined/null

5. Context doesn't have performance optimization built-in:
   - All consumers re-render when value changes
   - Must manually optimize with memoization

REAL WORLD PATTERNS
-------------------

Pattern 1: Theme switcher
const [theme, setTheme] = useState('light');
return (
  <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
);

Pattern 2: Auth state
const [auth, setAuth] = useState(null);
const login = useCallback(async (credentials) => {
  const user = await api.login(credentials);
  setAuth(user);
}, []);

return (
  <AuthContext.Provider value={{ auth, login, logout }}>
    {children}
  </AuthContext.Provider>
);

Pattern 3: Combining with localStorage
function MyProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('key');
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(data));
  }, [data]);

  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
}

COMPARISON WITH PROP DRILLING
-----------------------------

Prop Drilling: Good for 1-2 levels, becomes tedious after that

useContext: Great for cross-cutting concerns (theme, auth, notifications)

State Management (Redux/Zustand):
- Better for very complex state
- Better performance optimization
- Easier debugging and time-travel
- Overkill for simple cases

KEY TAKEAWAY
-----------

useContext provides a clean way to pass data through component tree without prop drilling.

Best for:
- Theme/UI state
- Authentication
- Localization
- Global notifications
- App-wide settings

Remember:
- Split contexts by concern
- Memoize values to prevent unnecessary re-renders
- Create custom hooks for better DX
- Use useReducer + useContext for complex state
- Consider state management library for very complex apps
*/

export const UseContextNotes = () => (
  <div style={{ padding: '20px', fontFamily: 'monospace', lineHeight: '1.6' }}>
    <h2>useContext - Complete Documentation</h2>
    <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
      {`const value = useContext(MyContext);

Provides access to context value without nesting
- Returns: Value from Context.Provider
- Solves: Prop drilling problem
- Uses: React.createContext() for setup

Steps to use:
1. Create context: const MyContext = createContext()
2. Create provider: function MyProvider({ children })
3. Wrap app: <MyProvider><App /></MyProvider>
4. Use hook: const value = useContext(MyContext)

Common use cases:
- Theme/Dark mode
- Authentication
- Localization
- UI state (modals, notifications)
- Shopping cart
- App settings

Performance tips:
- Memoize context value (useMemo)
- Split contexts by concern
- Avoid unnecessary re-renders

⚠️ All consumers re-render when context value changes
⚠️ Check that component is inside Provider
⚠️ Don't use for frequently changing values`}
    </pre>
  </div>
);

export default UseContextNotes;
