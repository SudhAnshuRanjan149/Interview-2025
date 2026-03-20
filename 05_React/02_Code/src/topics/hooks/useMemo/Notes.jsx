/**
useMemo Hook - Comprehensive Notes
==================================

useMemo is a hook that memoizes a computed value. It takes a function and a dependency array,
and returns a memoized value that only gets recalculated when one of the dependencies changes.
This is used for performance optimization by avoiding expensive calculations on every render.

SYNTAX
------
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);

PARAMETERS
----------
1. Compute function: Returns the value you want to memoize
2. Dependency array: When to recalculate the value
   - Omit: Recalculates on every render (don't do this!)
   - []: Calculates once and never changes
   - [dep1, dep2]: Recalculates when dependencies change

RETURNS
-------
The memoized value (can be any type: number, string, object, array, etc.)

WHY useMemo MATTERS
-------------------

In React, expensive calculations slow down renders:

function Component({ a, b }) {
  // This calculation runs on EVERY render (wasteful!)
  const expensiveValue = complexCalculation(a, b);
  
  return <div>{expensiveValue}</div>;
}

With useMemo, the calculation only runs when needed:

function Component({ a, b }) {
  // Only calculates when a or b changes
  const expensiveValue = useMemo(
    () => complexCalculation(a, b),
    [a, b]
  );
  
  return <div>{expensiveValue}</div>;
}

WHEN TO USE useMemo
-------------------

✅ USE when:
- Calculation is genuinely expensive (data filtering, sorting, transformation)
- Derived state that should only update when source changes
- Memoizing objects/arrays for dependency arrays of other hooks
- Value is passed to child component wrapped in React.memo
- In custom hooks to ensure stable returned values
- Building lookup tables or cached data structures

❌ DON'T use when:
- Calculation is simple and fast (JSON.parse is fine in most cases)
- Only used once or rarely
- Dependencies change on every render anyway
- Not causing measurable performance problems
- Creates code complexity that's not justified
- You haven't profiled to confirm it's slow

DEPENDENCY ARRAY RULES
---------------------

All values from component scope used in the compute function must be in the array:

❌ WRONG - Missing dependencies:
const result = useMemo(() => {
  return data.map(item => item * multiplier);
}, [data]); // 'multiplier' used but not in dependencies!

✅ RIGHT - All dependencies included:
const result = useMemo(() => {
  return data.map(item => item * multiplier);
}, [data, multiplier]);

⚠️ Problem with object/array dependencies:
const result = useMemo(() => {
  return processData(data);
}, [data]); // If 'data' is recreated each render, this never helps!

SOLUTION - Memoize dependencies too:
const memoizedData = useMemo(() => createData(), []);
const result = useMemo(() => {
  return processData(memoizedData);
}, [memoizedData]); // Now stable reference

useMemo vs useCallback
---------------------

useCallback memoizes a FUNCTION:
  const handler = useCallback(() => { ... }, [deps]);

useMemo memoizes a VALUE (or function):
  const value = useMemo(() => expensiveCalculation(), [deps]);
  const handler = useMemo(() => () => { ... }, [deps]); // Equivalent to useCallback

// They're equivalent for functions:
const memoFunc1 = useCallback(() => ..., [deps]);
const memoFunc2 = useMemo(() => () => ..., [deps]);
// memoFunc1 and memoFunc2 behave the same way

Key difference:
- useCallback is specifically for functions (clearer intent)
- useMemo is for any value

COMMON PATTERNS
---------------

1. Filtering/Sorting Arrays:
   const filtered = useMemo(() => {
     return data
       .filter(item => item.status === 'active')
       .sort((a, b) => a.name.localeCompare(b.name));
   }, [data]);

2. Computing Statistics:
   const stats = useMemo(() => ({
     total: data.length,
     sum: data.reduce((a, b) => a + b, 0),
     average: data.reduce((a, b) => a + b, 0) / data.length
   }), [data]);

3. Derived State:
   const userSummary = useMemo(() => ({
     name: user.firstName + ' ' + user.lastName,
     age: new Date().getFullYear() - user.birthYear,
     isAdult: (new Date().getFullYear() - user.birthYear) >= 18
   }), [user]);

4. Building Lookup Maps:
   const userMap = useMemo(() => {
     return users.reduce((map, user) => {
       map[user.id] = user;
       return map;
     }, {});
   }, [users]);

5. Expensive Transformations:
   const processedData = useMemo(() => {
     return data
       .map(item => ({ ...item, processed: heavyTransform(item) }))
       .filter(item => item.processed.valid);
   }, [data]);

6. Memoizing Objects for Dependency Arrays:
   const config = useMemo(() => ({
     api: 'https://api.example.com',
     timeout: 5000
   }), []);

   useEffect(() => {
     // config reference stays same, effect doesn't re-run
     initializeApi(config);
   }, [config]);

PERFORMANCE CONSIDERATIONS
--------------------------

Memory:
- useMemo stores the computed value in memory
- Dependency array stored in memory
- Trade-off: Memory for CPU efficiency

CPU:
- Saves re-computation on renders where dependencies haven't changed
- Adds small overhead for tracking dependencies
- Net positive when calculation is expensive

Profiling:
- Use React DevTools Profiler to measure
- Check "Highlight updates when components render"
- Look for unnecessary recalculations
- Only optimize if there's real performance gain

DEBUGGING
---------

1. Verify dependencies are correct:
   const result = useMemo(() => {
     console.log('Computing...', dep1, dep2);
     return computation();
   }, [dep1, dep2]);

2. Check if memoization is actually helping:
   // Before: renders 10x per second
   // After adding useMemo: renders 10x per second
   // No improvement = bad optimization

3. Check if dependencies are stable:
   // If dependencies are recreated each render, useMemo doesn't help
   const data = useMemo(() => computeData(), []);
   const result = useMemo(() => process(data), [data]);

GOTCHAS AND COMMON MISTAKES
---------------------------

1. Omitting dependencies:
   ❌ const result = useMemo(() => sort(data), []); // Stale data!
   ✅ const result = useMemo(() => sort(data), [data]);

2. Including function dependencies that change:
   ❌ const result = useMemo(() => process(helper()), [helper]);
   ✅ const helper = useCallback(() => ..., []);
      const result = useMemo(() => process(helper()), [helper]);

3. Memoizing simple calculations:
   ❌ const double = useMemo(() => count * 2, [count]);
   ✅ const double = count * 2; // No need to memoize!

4. Forgetting to memoize dependencies:
   ❌ const result = useMemo(() => process(newArray), [newArray]);
      // 'newArray' is created each render, so useMemo never helps
   
   ✅ const data = useMemo(() => createArray(), []);
      const result = useMemo(() => process(data), [data]);

5. Using with unstable dependency objects:
   ❌ useEffect(() => { ... }, [config]); // Recreates each render
   ✅ const config = useMemo(() => ({ ... }), []);
      useEffect(() => { ... }, [config]);

6. Not considering memory impact:
   - Storing large cached values adds memory overhead
   - Measure before over-optimizing

VERSION HISTORY
---------------

- React 16.8: Introduced useMemo
- React 18: No breaking changes, same behavior
- No changes in subsequent versions

RELATIONSHIP WITH OTHER HOOKS
-----------------------------

useMemo + React.memo:
- useMemo memoizes values
- React.memo memoizes components
- Together: Prevent unnecessary re-renders

useMemo + useCallback:
- Both are memoization strategies
- useCallback is specialized for functions
- useMemo is general purpose

useMemo + useEffect:
- useMemo prepares stable data for useEffect dependencies
- Prevents effect from running unnecessarily

BEST PRACTICES
--------------

1. Measure performance before adding useMemo
2. Use ESLint plugin: eslint-plugin-react-hooks (exhaustive-deps)
3. Keep dependency arrays simple and explicit
4. Prefer simpler solutions if possible (move calculation outside component)
5. Combine with React.memo for child optimization
6. Document why useMemo is used for future maintainers
7. Use TypeScript for better type safety on memoized values
8. Consider alternative: useCallback if it's a function
9. Remember: useMemo is about STABILITY and EFFICIENCY, not functionality
10. Profile and measure - real performance matters, not assumptions

REAL WORLD EXAMPLE
------------------

E-commerce product filter:

function ProductList({ products, filters }) {
  // Without memoization: re-filters on every render
  const filtered = products.filter(p => 
    filters.every(f => f.check(p))
  );

  return <div>{filtered.map(p => <Product key={p.id} {...p} />)}</div>;
}

With memoization:
function ProductList({ products, filters }) {
  // With memoization: only re-filters when products or filters change
  const filtered = useMemo(() => {
    return products.filter(p => 
      filters.every(f => f.check(p))
    );
  }, [products, filters]);

  return <div>{filtered.map(p => <Product key={p.id} {...p} />)}</div>;
}

KEY TAKEAWAY
-----------

useMemo is for MEMOIZING COMPUTED VALUES.
Use it when:
- Computation is expensive
- You want to prevent unnecessary recalculations
- You need a stable reference (for dependencies or React.memo)

Don't use it for:
- Simple, fast calculations
- Every value (adds complexity)
- Without measuring (premature optimization)

Rule of thumb: Add useMemo when you observe performance problems, not preemptively.
*/

export const UseMemoNotes = () => (
  <div style={{ padding: '20px', fontFamily: 'monospace', lineHeight: '1.6' }}>
    <h2>useMemo - Complete Documentation</h2>
    <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
      {`const memoizedValue = useMemo(
  () => expensiveCalculation(a, b),
  [a, b]
);

Memoizes a computed value
- Returns: Memoized value from compute function
- Dependencies: When to recalculate
- Benefits: Avoid expensive recalculations
- Trade-off: Memory overhead, code complexity

When to use:
1. Expensive calculations (filtering, sorting, transformations)
2. Memoizing objects/arrays for dependency arrays
3. Derived state that updates conditionally
4. With React.memo'd child components
5. In custom hooks for stable returned values

Key insight: Prevents RE-CALCULATION, not re-rendering.
Only helps if:
- Calculation is genuinely expensive
- Dependencies are stable
- Result is actually used

Remember: Profile first, optimize based on real bottlenecks!`}
    </pre>
  </div>
);

export default UseMemoNotes;
