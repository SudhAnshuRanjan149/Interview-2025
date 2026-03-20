/**
useEffect Hook - Comprehensive Notes
====================================

useEffect is a hook for handling side effects in function components. Side effects are 
operations that affect things outside the component: data fetching, subscriptions, DOM 
manipulation, timers, logging, analytics, etc.

SYNTAX
------
useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);

PARAMETERS
----------
1. Effect function: Runs after render. Can return cleanup function.
2. Dependency array (optional): Controls when effect runs
   - No array: Runs after every render (rare, be careful)
   - []: Runs only once on mount
   - [dep1, dep2]: Runs when dependencies change

RETURNS
-------
Cleanup function (optional) that runs:
- Before effect re-runs (when dependencies change)
- Before component unmounts

TIMING OF EXECUTION
-------------------

React render flow:
1. Component renders (JSX executed)
2. React commits changes to DOM
3. Browser paints (user sees updates)
4. useEffect runs (after paint, non-blocking)

This is different from useLayoutEffect which runs BEFORE paint.

Execution order in component:
  Render → DOM update → Paint → useEffect

WHEN useEffect RUNS
-------------------

1. After every render (no dependency array):

useEffect(() => {
  console.log('Runs after every render');
});

Issue: Runs constantly, can cause performance problems
Use case: Rare, usually you want controlled execution

2. Only on mount (empty dependency array):

useEffect(() => {
  console.log('Runs once on mount');
  
  return () => {
    console.log('Cleanup on unmount');
  };
}, []); // ← empty array

Equivalent to componentDidMount + componentWillUnmount
Use case: Initial data fetching, subscriptions setup

3. When dependencies change (specific dependencies):

useEffect(() => {
  console.log('Runs when userId changes');
  fetchUser(userId);
}, [userId]); // ← depends on userId

React compares dependency values using Object.is
If any dependency changed, effect runs
If all dependencies same, effect skipped
Use case: Most common, react to specific changes

CLEANUP FUNCTION
----------------

Return a function from effect that runs cleanup:

useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer ticking');
  }, 1000);
  
  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);

Cleanup runs:
- Before effect re-runs (if dependencies changed)
- Before component unmounts
- NOT after every render (only when effect re-runs)

Common cleanup tasks:
- Remove event listeners
- Clear timers
- Cancel async requests
- Unsubscribe from subscriptions
- Close connections

WHY CLEANUP IS IMPORTANT
------------------------

Without cleanup, you get memory leaks:

BAD ❌:

useEffect(() => {
  const subscription = store.subscribe(listener);
  // No cleanup! Subscription never unsubscribed
}, []);

After component unmounts, listener still running → memory leak

GOOD ✅:

useEffect(() => {
  const subscription = store.subscribe(listener);
  
  return () => subscription.unsubscribe(); // Cleanup
}, []);

Subscription properly cleaned up on unmount.

DEPENDENCY ARRAY GOTCHAS
------------------------

1. Missing dependencies (stale closure):

function Profile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // ❌ Missing userId!
  
  // If userId changes, effect doesn't re-run
  // Old userId used forever → stale data
}

Fix:
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]); // ✅ Include all used values

2. Object/array dependencies cause infinite loops:

const options = { id: userId }; // New object every render

useEffect(() => {
  fetchData(options);
}, [options]); // ❌ options is new object every render
// Effect runs every render → infinite loop

Fix - use primitive dependencies:
useEffect(() => {
  const options = { id: userId }; // Create inside effect
  fetchData(options);
}, [userId]); // ✅ Depend on primitive

Or use useMemo:
const options = useMemo(() => ({ id: userId }), [userId]);

useEffect(() => {
  fetchData(options);
}, [options]); // ✅ Stable reference

3. ESLint exhaustive-deps warning:

ESLint plugin warns about missing dependencies:
npm install eslint-plugin-react-hooks

useEffect(() => {
  fetchUser(userId);
}, []); // ⚠️ Warning: userId should be in dependency array

Always fix these warnings. If you need to suppress:

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchUser(userId);
}, []); // Document WHY you're ignoring

COMMON USE CASES
----------------

1. Data fetching:

useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  }
  
  fetchData();
}, []);

2. Event listeners:

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

3. Subscriptions:

useEffect(() => {
  const subscription = someAPI.subscribe(data => {
    setData(data);
  });
  
  return () => {
    subscription.unsubscribe();
  };
}, []);

4. Timers and intervals:

useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Timer fired');
  }, 1000);
  
  return () => clearTimeout(timer);
}, []);

5. DOM manipulation:

useEffect(() => {
  document.title = `Page: ${title}`;
  
  return () => {
    document.title = 'Default Title';
  };
}, [title]);

6. LocalStorage syncing:

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

7. External state syncing:

useEffect(() => {
  store.setState(value);
}, [value]);

8. Measuring layout (usually useLayoutEffect instead):

useEffect(() => {
  const height = ref.current.offsetHeight;
  setHeight(height);
}, []);

MULTIPLE EFFECTS
----------------

Split different concerns into separate effects:

function UserProfile({ userId }) {
  // Effect 1: Fetch user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect 2: Update document title
  useEffect(() => {
    document.title = user?.name || 'Loading...';
  }, [user]);
  
  // Effect 3: Send analytics
  useEffect(() => {
    trackPageView(userId);
  }, [userId]);
}

Benefits:
- Each effect responsible for one thing
- Each has specific dependencies
- Easier to understand and debug
- Easier to add/remove effects

CONDITIONAL LOGIC IN EFFECTS
-----------------------------

Don't call hooks conditionally, but you can add logic inside:

function Example({ userId }) {
  useEffect(() => {
    if (!userId) {
      return; // Early exit
    }
    
    fetchUser(userId);
  }, [userId]);
  
  return <div>...</div>;
}

ASYNC/AWAIT IN EFFECTS
----------------------

Can't make effect function async directly:

// ❌ DON'T do this:
useEffect(async () => {
  const data = await fetch(...);
}, []);

Instead, define async function inside:

// ✅ DO this:
useEffect(() => {
  async function fetchData() {
    const response = await fetch(...);
    setData(await response.json());
  }
  
  fetchData();
}, []);

Or use IIFE (Immediately Invoked Function Expression):

useEffect(() => {
  (async () => {
    const data = await fetch(...);
    setData(await data.json());
  })();
}, []);

PREVENTING MEMORY LEAKS
------------------------

Use ref flag to track if component mounted:

useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) { // Only update if component still mounted
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);

Or use AbortController:

useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(...)
    .catch(err => {
      if (err.name !== 'AbortError') {
        // Handle actual error
      }
    });
  
  return () => controller.abort();
}, []);

PERFORMANCE CONSIDERATIONS
--------------------------

1. Effects run after paint, non-blocking
2. Multiple effects run in order defined
3. Heavy effects can make visual updates feel slow
4. Use useMemo/useCallback to optimize effect dependencies
5. Consider moving expensive calculations outside render

DEBUGGING
---------

1. Add console.logs to see when effect runs
2. Check dependency array for missing values
3. Use ESLint plugin to catch issues
4. React DevTools shows when effects run
5. Check that cleanup functions work properly

BEST PRACTICES
--------------

1. Always include all used variables in dependencies
2. Use ESLint plugin: eslint-plugin-react-hooks
3. Separate effects for separate concerns
4. Clean up subscriptions and listeners
5. Handle loading and error states
6. Be careful with infinite loops
7. Prefer primitive values in dependencies
8. Document why dependencies are what they are
9. Test that cleanup works (by unmounting)
10. Consider custom hooks for reusable effect logic

VERSION HISTORY
---------------

- React 16.8: Introduced useEffect
- React 16.9: Deprecated componentWillReceiveProps in favor of useEffect
- React 18: No breaking changes
- Behavior consistent through React 19+
*/

export const UseEffectNotes = () => (
    <div style={{ padding: '20px', fontFamily: 'monospace', lineHeight: '1.6' }}>
        <h2>useEffect - Complete Documentation</h2>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`useEffect(() => {
  // Side effect code
  
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);

Handles side effects after render
- Runs after paint (non-blocking)
- Dependency array controls when it runs:
  • No array: Every render
  • []: Once on mount
  • [deps]: When dependencies change
- Return cleanup function for cleanup logic
- Always include all dependencies used in effect`}
        </pre>
    </div>
);

export default UseEffectNotes;
