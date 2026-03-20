/**
useCallback Hook - Comprehensive Notes
======================================

useCallback is a hook that memoizes a callback function. It returns a memoized version 
of the callback that only changes if one of the dependencies has changed. This is useful 
for optimizing performance when passing callbacks to child components that use React.memo 
or have callbacks in dependency arrays.

SYNTAX
------
const memoizedCallback = useCallback(
  (args) => {
    // callback code
  },
  [dependencies]
);

PARAMETERS
----------
1. Callback function: The function you want to memoize
2. Dependency array: When to re-create the callback
   - Omit: Function re-created on every render (don't do this!)
   - []: Function created once and never changes
   - [dep1, dep2]: Function re-created when dependencies change

RETURNS
-------
A memoized callback function with a stable reference.

WHY useCallback MATTERS
-----------------------

In JavaScript, functions are reference types. Each time a component renders, new functions 
are created even if they have identical code:

function Component() {
  const handleClick = () => console.log('clicked');
  // 'handleClick' is a NEW function on every render
}

This causes problems when:
1. Passing callback to React.memo'd child component
   - Child re-renders even though logic is identical
   - Defeats the purpose of React.memo optimization

2. Including callback in dependency array
   - useEffect/useCallback re-run unnecessarily
   - Can cause infinite loops or wasted computations

3. Using as Map/Set key
   - Creates duplicate entries

WHEN TO USE useCallback
----------------------

✅ USE when:
- Passing callback to optimized child component (React.memo)
- Callback is dependency in useEffect or other hooks
- Callback is used in useMemo dependency array
- Creating callback inside custom hook
- Callback is computationally expensive

❌ DON'T use when:
- Callback is simple and not causing performance issues
- Not passing to child component
- Child component doesn't use React.memo
- Creates more code complexity than benefit
- Over-optimizing for imaginary performance gains

RELATIONSHIP WITH React.memo
----------------------------

useCallback + React.memo are a powerful combination:

WITHOUT useCallback:
function Parent() {
  const handleClick = () => console.log('click');
  return <Child onClick={handleClick} />; // New function every render
}

const Child = React.memo(function Child({ onClick }) {
  // Re-renders anyway because onClick is a new reference
  return <button onClick={onClick}>Click</button>;
});

WITH useCallback:
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  return <Child onClick={handleClick} />; // Same function reference
}

const Child = React.memo(function Child({ onClick }) {
  // No re-render if onClick reference is same
  return <button onClick={onClick}>Click</button>;
});

DEPENDENCY ARRAY RULES
---------------------

Must include all values from component scope used in callback:

❌ WRONG - Missing dependencies:
const handler = useCallback(() => {
  console.log(count); // 'count' used but not in deps!
}, []); // Will use stale 'count' value

✅ RIGHT - All dependencies included:
const handler = useCallback(() => {
  console.log(count);
}, [count]); // Re-creates when count changes

⚠️ COMMON MISTAKE - Including unnecessary dependencies:
const handler = useCallback(() => {
  handleClick(); // This function changes, causing handler to recreate
}, [handleClick]); // Creates circular dependency!

PERFORMANCE IMPLICATIONS
------------------------

Memory:
- useCallback stores the function and dependency array in memory
- Small overhead for each memoized callback
- Worth it when preventing child re-renders

CPU:
- Saves re-renders of child components
- More complex closures may have slight execution cost
- Overall: Usually saves more than it costs

Premature optimization:
- Don't add useCallback everywhere
- Profile first, optimize based on real bottlenecks
- Most components don't benefit from it

useCallback vs Inline Functions
-------------------------------

INLINE (every render creates new function):
function Component() {
  return <Child onClick={() => console.log('click')} />;
}

useCallback (single function reference):
function Component() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);
  return <Child onClick={handleClick} />;
}

Trade-off:
- Inline: Simpler code, but creates new functions
- useCallback: More code, but maintains reference

CLOSURE BEHAVIOR
---------------

useCallback captures variables in its closure:

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  // This callback closes over 'count'
  const handleClick = useCallback(() => {
    console.log('Count:', count); // Uses captured value
  }, [count]); // Must include in deps when dependency changes

  return <button onClick={handleClick}>Count: {count}</button>;
}

If 'count' omitted from dependencies, callback always sees initial value!

COMPARISON WITH useMemo
-----------------------

useMemo caches the RESULT of a computation:
  const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);

useCallback caches the CALLBACK ITSELF:
  const memoizedCallback = useCallback(() => { ... }, [deps]);

// Equivalent to:
const memoizedCallback = useMemo(() => (...) => { ... }, [deps]);

COMMON PATTERNS
---------------

1. Simple event handler:
   const handleClick = useCallback(() => {
     setCount(prev => prev + 1);
   }, []);

2. Handler with arguments:
   const handleDelete = useCallback((id) => {
     setItems(prev => prev.filter(item => item.id !== id));
   }, []);

3. Handler using other state:
   const handleMultiply = useCallback(() => {
     setValue(v => v * multiplier);
   }, [multiplier]);

4. Combining with other hooks:
   const handleClick = useCallback(() => { ... }, [deps]);
   useEffect(() => {
     // Can safely use handleClick
     element.addEventListener('click', handleClick);
     return () => element.removeEventListener('click', handleClick);
   }, [handleClick]);

5. Custom hook abstraction:
   function useCounter(initialCount) {
     const [count, setCount] = useState(initialCount);
     const increment = useCallback(() => {
       setCount(prev => prev + 1);
     }, []);
     return { count, increment };
   }

DEBUGGING
---------

1. Check if callback re-creating unnecessarily:
   const memoizedFn = useCallback(() => {
     console.log('Function created');
   }, [deps]);

2. Use React DevTools to check re-renders
3. Profile with browser DevTools Performance tab
4. useCallback in custom hook to ensure stable reference

GOTCHAS AND COMMON MISTAKES
--------------------------

1. Omitting dependencies:
   ❌ const handler = useCallback(() => console.log(count), []);
   ✅ const handler = useCallback(() => console.log(count), [count]);

2. Creating object/array literals in dependency array:
   ❌ const handler = useCallback(() => {}, [{ a: 1 }]); // Always new
   ✅ const handler = useCallback(() => {}, []); // Move objects outside

3. Forgetting React.memo on child component:
   // useCallback alone doesn't help if child always re-renders
   const Child = React.memo(({ onClick }) => ...);

4. Over-optimizing:
   // Don't use useCallback for every callback
   // Use it strategically where it matters

5. Async functions in useCallback:
   ❌ const handler = useCallback(async () => { ... }, [deps]);
   ✅ const handler = useCallback(() => {
       asyncFunction(); // Call async function inside
     }, [deps]);

VERSION HISTORY
---------------

- React 16.8: Introduced useCallback
- React 18: Behavior unchanged in concurrent features
- No breaking changes in subsequent versions

BEST PRACTICES
--------------

1. Use useCallback + React.memo together for child optimization
2. Include all dependencies - use ESLint rule: exhaustive-deps
3. Don't optimize prematurely - measure first
4. Keep dependency arrays simple and explicit
5. Use TypeScript for better callback typing
6. Extract complex logic to custom hook
7. Consider alternative: Move state/logic closer to where it's needed
8. Profile performance to ensure optimization helps
9. Document why useCallback is used (for future maintainers)
10. Remember: useCallback is for STABILITY, not for preventing execution

WHEN NOT TO USE useCallback
----------------------------

1. Simple components without child optimization
2. Callbacks that change on every render anyway
3. Performance isn't measured as a problem
4. Adds significant code complexity
5. Dependencies constantly changing
6. Micro-optimization that doesn't matter

REAL WORLD EXAMPLE
------------------

Good use case:
- Parent component with list of items
- Each item has delete button (callback with ID argument)
- Item component wrapped in React.memo
- Without useCallback: every parent render → all items re-render
- With useCallback: parent render → items don't re-render (optimized)

Poor use case:
- Simple form input with onChange handler
- Inline function is fine, no child optimization needed
- Adding useCallback adds unnecessary complexity

KEY TAKEAWAY
-----------

useCallback doesn't make functions faster to EXECUTE. It makes function REFERENCES stable,
preventing unnecessary re-renders of child components that depend on that reference.

It's about optimization at the component level, not execution level.
*/

export const UseCallbackNotes = () => (
  <div style={{ padding: '20px', fontFamily: 'monospace', lineHeight: '1.6' }}>
    <h2>useCallback - Complete Documentation</h2>
    <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
      {`const memoizedCallback = useCallback(
  (args) => {
    // callback implementation
  },
  [dependencies]
);

Memoizes a callback function
- Returns: Memoized callback with stable reference
- Dependencies: When to recreate the function
- Used with: React.memo'd children, hook dependencies
- Benefits: Prevents unnecessary re-renders
- Trade-off: Adds memory overhead, code complexity

⚠️ Only use if:
1. Passing to React.memo'd child component
2. Used in dependency array of hooks
3. Performance is actually an issue (measure first!)

Key insight: Maintains REFERENCE stability, not execution speed`}
    </pre>
  </div>
);

export default UseCallbackNotes;
