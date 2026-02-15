/*

MASTER REACT.JS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — REACT BASICS & CORE CONCEPTS
========================================================
1. What is React and why is it used?  
2. What problems does React solve?  
3. What is the difference between React and other frameworks like Angular/Vue?  
4. What is JSX and why do we use it?  
5. What is a component in React?  
6. What is the difference between functional and class components?  
7. What are props in React?  
8. What are default props and propTypes?  
9. What is state in React?  
10. What is one-way data binding in React?  

========================================================
SECTION 2 — COMPONENT LIFECYCLE & CLASS COMPONENTS
========================================================
11. What are React lifecycle methods?  
12. What is the mounting phase and which lifecycle methods belong to it?  
13. What is the updating phase?  
14. What is the unmounting phase?  
15. What is componentDidMount and when is it used?  
16. What is shouldComponentUpdate and why use it?  
17. What is getDerivedStateFromProps?  
18. What is componentDidCatch and error boundaries?  
19. How does setState work internally?  
20. What is the difference between setState() and forceUpdate()?  

========================================================
SECTION 3 — FUNCTION COMPONENTS & HOOKS
========================================================
21. What are React Hooks?  
22. What rules must be followed when using hooks?  
23. What is useState and how does state updating work?  
24. What is useEffect and when is it triggered?  
25. What is the difference between useEffect and useLayoutEffect?  
26. What is useRef and what problems does it solve?  
27. What is useMemo and why is memoization important?  
28. What is useCallback and how does it help performance?  
29. What is useContext and how does the Context API work?  
30. What is useReducer and when should you use it over useState?  
31. What is useImperativeHandle?  
32. What is useTransition and when to use concurrent features?  
33. What is useDeferredValue?  

========================================================
SECTION 4 — REACT COMPONENT ARCHITECTURE
========================================================
34. What is component composition?  
35. What is the difference between controlled and uncontrolled components?  
36. What is lifting state up?  
37. What are higher-order components (HOC)?  
38. What are render props?  
39. What is the container–presentational component pattern?  
40. What is the compound component pattern?  
41. What is the provider pattern?  
42. What is the difference between props drilling and context usage?  

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

========================================================
SECTION 6 — REACT ROUTING
========================================================
52. What is React Router?  
53. What is the difference between BrowserRouter and HashRouter?  
54. What are Route and Switch (or Routes in v6)?  
55. What is useNavigate and how do you programmatically navigate?  
56. What are nested routes?  
57. What are protected routes and how do you implement them?  
58. What is code splitting in React Router?  

========================================================
SECTION 7 — FORMS & VALIDATION
========================================================
59. What are controlled components?  
60. What are uncontrolled components?  
61. What is useFormik or Formik library?  
62. What is Yup validation?  
63. What is React Hook Form and why is it performant?  

========================================================
SECTION 8 — PERFORMANCE OPTIMIZATION
========================================================
64. What causes unnecessary re-renders in React?  
65. What is React.memo and when should you use it?  
66. What is memoization in React and how does it work?  
67. What is virtualization and how does react-window or react-virtualized work?  
68. What is the difference between useMemo and useCallback?  
69. How does React batching work?  
70. What is concurrency in React 18?  
71. What is Suspense and how does it help with async rendering?  

========================================================
SECTION 9 — ERROR HANDLING & DEBUGGING
========================================================
72. What are error boundaries?  
73. How does React handle errors in components?  
74. What is componentDidCatch?  
75. How do you debug React applications?  
76. What tools can be used for profiling React performance?  

========================================================
SECTION 10 — REACT DOM & RENDERING
========================================================
77. What is ReactDOM and how does rendering work?  
78. What is reconciliation in React?  
79. What is the virtual DOM and how does it differ from the real DOM?  
80. What is diffing in React?  
81. What is hydration in React?  
82. What is server-side rendering (SSR)?  
83. What is static site generation (SSG)?  
84. What is React Fiber?  

========================================================
SECTION 11 — NEXT.JS & ECOSYSTEM (Optional but Important)
========================================================
85. What is Next.js and why is it used?  
86. What is the difference between SSR, SSG, and ISR in Next.js?  
87. What are API routes in Next.js?  
88. How does file-based routing work?  
89. What are middleware and edge functions?  
90. What is getStaticProps, getServerSideProps, and getStaticPaths?  

========================================================
SECTION 12 — TESTING IN REACT
========================================================
91. What is Jest and how is it used in React?  
92. What is React Testing Library (RTL)?  
93. What is the difference between unit, integration, and E2E testing?  
94. What tools are used for E2E testing (Cypress, Playwright)?  
95. What is snapshot testing?  

========================================================
SECTION 13 — ADVANCED REACT PATTERNS
========================================================
96. What is the uncontrolled component pattern?  
97. What is the controlled component pattern?  
98. What are custom hooks and when should you create one?  
99. What is the pub-sub (observer) pattern in React?  
100. What is the state machine pattern (XState) in React?  
101. What is state colocation and why does it matter?  
102. What is React Portal and when do you use it?  

========================================================
SECTION 14 — SECURITY, DEPLOYMENT & REAL-WORLD USAGE
========================================================
103. What is Cross-Site Scripting (XSS) in React and how do you prevent it?  
104. What is dangerouslySetInnerHTML and why should you avoid it?  
105. What are environment variables in React?  
106. How do you deploy a React app? (Netlify, Vercel, AWS, etc.)  
107. What is code splitting and lazy loading in React?  
108. What is tree shaking in React apps?  

========================================================
SECTION 15 — REACT INTERNALS & ADVANCED MECHANISMS
========================================================
109. What is React Fiber and why was it introduced?  
110. What are lanes in React 18?  
111. How does React schedule rendering updates?  
112. What is the difference between legacy mode and concurrent mode?  
113. How does React handle state batching internally?  
114. What is the role of keys in lists and how does React use them?  
115. Why should keys not be array indices in lists?  

========================================================

*/



/**
 * 1. What is React and why is it used?
 * --------------------------------------
 * React is a JavaScript library for building user interfaces.
 * It is used because:
 * - It efficiently updates the UI using a Virtual DOM.
 * - It breaks the UI into reusable components.
 * - It makes state-driven UI predictable and easy to manage.
 * - It supports declarative programming: you describe UI → React renders it.
 *
 *
 * 2. What problems does React solve?
 * ------------------------------------
 * React solves:
 * - DOM manipulation complexity → Virtual DOM makes updates fast.
 * - Spaghetti code from UI updates → State-driven rendering.
 * - Difficulty in reusing UI → Component-based architecture.
 * - Hard-to-maintain large apps → predictable unidirectional data flow.
 * - Performance issues → diffing + selective updates.
 *
 *
 * 3. Difference between React and Angular/Vue
 * ---------------------------------------------
 * React:
 * - Library focused only on UI
 * - Flexible, add your own routing/state tools
 * - Uses JSX
 *
 * Angular:
 * - Full framework (routing, HTTP, DI included)
 * - Uses TypeScript heavily
 * - More rigid structure
 *
 * Vue:
 * - More lightweight than Angular, more structured than React
 * - Uses templates instead of JSX by default
 * - Includes built-in tools (but still smaller than Angular)
 *
 * Summary:
 * React → flexible library  
 * Vue → middle ground  
 * Angular → full framework  
 *
 *
 * 4. What is JSX and why do we use it?
 * ---------------------------------------
 * JSX = JavaScript XML.
 * It allows writing HTML-like syntax inside JavaScript.
 *
 * Why use JSX:
 * - More readable UI code
 * - Easier to see component structure
 * - Enables embedding JS expressions inside UI
 *
 * JSX is compiled to React.createElement() calls.
 *
 *
 * 5. What is a component in React?
 * -----------------------------------
 * A component is a reusable, independent piece of UI.
 *
 * Characteristics:
 * - Accepts input (props)
 * - Has its own logic
 * - Returns UI (JSX)
 *
 * Types:
 * - Functional components
 * - Class components
 *
 * React apps = trees of components.
 *
 *
 * 6. Difference between functional and class components
 * --------------------------------------------------------
 * Functional components:
 * - Simple JavaScript functions
 * - Use Hooks for state and lifecycle
 * - Modern React standard
 *
 * Class components:
 * - Use ES6 classes
 * - Use this.state and lifecycle methods
 * - Older style (still works but less preferred)
 *
 * Functional components are smaller, cleaner, and easier to test.
 *
 *
 * 7. What are props in React?
 * ------------------------------
 * Props = input data passed from parent to child components.
 *
 * Characteristics:
 * - Read-only
 * - Immutable inside the child
 * - Used to customize component behavior/UI
 *
 * Example:
 * <Card title="Hello" />
 *
 *
 * 8. What are default props and propTypes?
 * -------------------------------------------
 * defaultProps:
 * - Provides fallback values for props if not passed.
 * - Example:
 *   MyComp.defaultProps = { color: "blue" };
 *
 * propTypes:
 * - Type-checking for props during development.
 * - Helps catch bugs early.
 * - Example:
 *   MyComp.propTypes = { name: PropTypes.string };
 *
 *
 * 9. What is state in React?
 * ----------------------------
 * State:
 * - Data that changes over time and triggers re-rendering.
 * - Managed inside the component.
 *
 * Functional example:
 * const [count, setCount] = useState(0);
 *
 * Props = external input  
 * State = internal data  
 *
 *
 * 10. What is one-way data binding in React?
 * --------------------------------------------
 * React uses unidirectional (one-way) data flow:
 * - Data flows from parent → child
 * - UI re-renders when state/props change
 *
 * Benefits:
 * - Easier debugging
 * - Predictable updates
 * - Clear data ownership
 *
 * Child components cannot modify parent state directly; they send events upward.
 */




/**
 * 11. What are React lifecycle methods?
 * ---------------------------------------
 * Lifecycle methods are special class component methods that run at specific
 * points in a component’s life:
 * - Mounting (component appears)
 * - Updating (state/props change)
 * - Unmounting (component removed)
 * - Error handling
 *
 * Functional components use Hooks instead (useEffect).
 *
 *
 * 12. What is the mounting phase and which lifecycle methods belong to it?
 * --------------------------------------------------------------------------
 * Mounting = when a component is created and inserted into the DOM.
 *
 * Methods (class components):
 * - constructor()
 * - static getDerivedStateFromProps()
 * - render()
 * - componentDidMount()
 *
 * componentDidMount() runs after the component appears on the screen.
 *
 *
 * 13. What is the updating phase?
 * ---------------------------------
 * Updating = when a component re-renders because:
 * - props changed
 * - state changed
 *
 * Lifecycle methods:
 * - static getDerivedStateFromProps()
 * - shouldComponentUpdate()
 * - render()
 * - getSnapshotBeforeUpdate()
 * - componentDidUpdate()
 *
 *
 * 14. What is the unmounting phase?
 * -----------------------------------
 * Unmounting = when a component is removed from the DOM.
 *
 * Method:
 * - componentWillUnmount()
 *
 * Used for cleanup (timers, subscriptions).
 *
 *
 * 15. What is componentDidMount and when is it used?
 * -----------------------------------------------------
 * componentDidMount() runs once after the component is inserted into the DOM.
 *
 * Common uses:
 * - Fetch API calls
 * - DOM manipulations
 * - Initial subscriptions
 * - Setting timers
 *
 * Equivalent in Hooks: useEffect(() => { ... }, []);
 *
 *
 * 16. What is shouldComponentUpdate and why use it?
 * ----------------------------------------------------
 * shouldComponentUpdate(nextProps, nextState)
 * Controls whether the component should re-render.
 *
 * Return:
 * - true → allow re-render
 * - false → skip rendering
 *
 * Used for:
 * - Performance optimization to avoid unnecessary renders
 *
 * Functional equivalent: React.memo or useMemo/useCallback patterns.
 *
 *
 * 17. What is getDerivedStateFromProps?
 * ---------------------------------------
 * static getDerivedStateFromProps(props, state)
 * Runs before rendering on mount and update.
 *
 * Purpose:
 * - Sync state with props when necessary
 *
 * Constraints:
 * - Must be static
 * - Cannot access this
 * - Should rarely be used
 *
 *
 * 18. What is componentDidCatch and error boundaries?
 * ------------------------------------------------------
 * componentDidCatch(error, info):
 * - Catches runtime errors in child components.
 *
 * Error boundaries:
 * - Special components that catch JavaScript errors and prevent the UI from breaking.
 * - Must include:
 *   - static getDerivedStateFromError()
 *   - componentDidCatch()
 *
 * They display fallback UI instead of crashing the entire app.
 *
 *
 * 19. How does setState work internally?
 * ----------------------------------------
 * setState():
 * - Is asynchronous (batched updates for performance)
 * - Schedules an update, does not update immediately
 * - Merges new state with existing state (in class components)
 * - Triggers re-rendering
 *
 * In functional components:
 * - useState updates replace the value (not merge)
 * - Also asynchronous and batched
 *
 *
 * 20. Difference between setState() and forceUpdate()
 * ------------------------------------------------------
 * setState():
 * - Updates state and triggers a re-render
 * - React may batch updates
 * - Should be used for normal UI updates
 *
 * forceUpdate():
 * - Forces the component to re-render even if state/props didn't change
 * - Bypasses shouldComponentUpdate
 * - Rarely recommended because it breaks React’s predictable data flow
 *
 * Summary:
 * setState → normal state-driven update  
 * forceUpdate → manual forced re-render  
 */
/* ============================================================



/**
 * 21. What are React Hooks?
 * ---------------------------
 * Hooks are functions that let functional components use state, lifecycle logic,
 * and other React features without classes.
 *
 * Examples:
 * - useState
 * - useEffect
 * - useMemo
 * - useCallback
 * - useRef
 * - useReducer
 *
 *
 * 22. What rules must be followed when using hooks?
 * ---------------------------------------------------
 * React enforces two rules:
 * 1. Only call hooks at the top level (not inside loops, conditions, or nested functions).
 * 2. Only call hooks from:
 *    - React functional components
 *    - Custom hooks
 *
 * Reason:
 * - React relies on consistent hook order to track state.
 *
 *
 * 23. What is useState and how does state updating work?
 * --------------------------------------------------------
 * useState allows components to store internal state.
 *
 * Example:
 * const [count, setCount] = useState(0);
 *
 * State updating:
 * - Asynchronous (batched)
 * - Replaces the value (not merged like class components)
 * - Triggers a rerender when changed
 *
 * Functional update:
 * setCount(prev => prev + 1);
 *
 *
 * 24. What is useEffect and when is it triggered?
 * -------------------------------------------------
 * useEffect runs side effects after rendering.
 *
 * Examples of side effects:
 * - Fetching data
 * - Event listeners
 * - Updating document title
 *
 * Triggers:
 * - After render (async)
 * - Re-runs based on dependency array
 *
 * Patterns:
 * useEffect(() => {...}, []);        // run once on mount  
 * useEffect(() => {...}, [value]);  // run when value changes  
 *
 *
 * 25. Difference between useEffect and useLayoutEffect
 * ------------------------------------------------------
 * useEffect:
 * - Runs AFTER the browser paints the screen
 * - Non-blocking
 *
 * useLayoutEffect:
 * - Runs BEFORE the browser paints
 * - Useful for:
 *   - Measuring DOM size/position
 *   - Synchronous layout adjustments
 *
 * useLayoutEffect blocks rendering → use sparingly.
 *
 *
 * 26. What is useRef and what problems does it solve?
 * ------------------------------------------------------
 * useRef stores a mutable value that does NOT trigger rerenders.
 *
 * Common uses:
 * - Accessing DOM elements
 * - Storing instance variables
 * - Keeping values between renders without causing update loops
 *
 * Example:
 * const inputRef = useRef();
 * inputRef.current.focus();
 *
 *
 * 27. What is useMemo and why is memoization important?
 * --------------------------------------------------------
 * useMemo memoizes expensive calculations.
 *
 * Example:
 * const result = useMemo(() => heavyCalc(a, b), [a, b]);
 *
 * Memoization benefits:
 * - Improves performance by avoiding unnecessary recalculations
 * - Helps prevent unnecessary child rerenders when values are stable
 *
 *
 * 28. What is useCallback and how does it help performance?
 * -----------------------------------------------------------
 * useCallback memoizes functions.
 *
 * Example:
 * const handleClick = useCallback(() => { ... }, [value]);
 *
 * Why?
 * - Prevents functions from being recreated every rerender
 * - Useful when passing callbacks to memoized children
 *
 *
 * 29. What is useContext and how does the Context API work?
 * ------------------------------------------------------------
 * useContext reads values from a React context without prop drilling.
 *
 * Steps:
 * - Create context: const MyContext = createContext();
 * - Provide value with <MyContext.Provider>
 * - Consume inside component: const value = useContext(MyContext)
 *
 * Useful for:
 * - Theme
 * - Authentication
 * - User preferences
 *
 *
 * 30. What is useReducer and when use it over useState?
 * --------------------------------------------------------
 * useReducer manages more complex state with a reducer function.
 *
 * Example:
 * const [state, dispatch] = useReducer(reducer, initialState);
 *
 * Use when:
 * - State logic is complex
 * - Multiple sub-values need updating
 * - You want predictable state transitions (Redux-like pattern)
 *
 *
 * 31. What is useImperativeHandle?
 * -----------------------------------
 * useImperativeHandle customizes what is exposed when using ref on a component.
 *
 * Used with forwardRef:
 * useImperativeHandle(ref, () => ({
 *   focusInput: () => inputRef.current.focus()
 * }));
 *
 * Useful for:
 * - Exposing controlled methods to parent components
 *
 *
 * 32. What is useTransition and when to use concurrent features?
 * ----------------------------------------------------------------
 * useTransition enables marking state updates as “transition updates.”
 *
 * Example:
 * const [isPending, startTransition] = useTransition();
 *
 * startTransition(() => {
 *   setState(heavyStateChange);
 * });
 *
 * Benefits:
 * - UI stays responsive during slow updates
 * - Used for concurrent rendering (React 18+)
 *
 *
 * 33. What is useDeferredValue?
 * --------------------------------
 * useDeferredValue delays updating a value so the UI remains responsive.
 *
 * Example:
 * const deferredSearch = useDeferredValue(searchTerm);
 *
 * Useful for:
 * - Search filtering
 * - Expensive computations
 * - When immediate updates would slow down UI
 *
 * It’s like debouncing but built directly into React’s concurrent rendering.
 */



/**
 * 34. What is component composition?
 * -------------------------------------
 * Component composition is the technique of combining smaller components into
 * larger, reusable UI pieces.
 *
 * Example:
 * <Card>
 *   <CardHeader />
 *   <CardBody />
 * </Card>
 *
 * React encourages composition over inheritance.
 *
 *
 * 35. Difference between controlled and uncontrolled components
 * --------------------------------------------------------------
 * controlled components:
 * - React manages the input’s value via state.
 * - Example:
 *   <input value={value} onChange={e => setValue(e.target.value)} />
 *
 * uncontrolled components:
 * - The DOM manages the input’s value.
 * - Access via ref instead of state.
 * - Example:
 *   <input ref={inputRef} />
 *
 * Controlled = React owns data  
 * Uncontrolled = DOM owns data  
 *
 *
 * 36. What is lifting state up?
 * -------------------------------
 * Lifting state up means moving shared state to the closest common parent
 * so child components can share and sync data.
 *
 * Example:
 * Parent holds state → passes down via props → children send updates upward.
 *
 *
 * 37. What are higher-order components (HOC)?
 * ---------------------------------------------
 * HOC = function that takes a component and returns a new enhanced component.
 *
 * Example:
 * const withLogger = (Component) => (props) => { ... }
 *
 * Uses:
 * - Reuse logic
 * - Inject props
 * - Add behavior (analytics, permissions)
 *
 * HOCs are used less today due to Hooks.
 *
 *
 * 38. What are render props?
 * ----------------------------
 * Render props is a pattern where a component receives a function as a prop
 * and uses it to render UI.
 *
 * Example:
 * <DataLoader render={(data) => <List items={data} />} />
 *
 * Benefits:
 * - Share logic while customizing UI
 *
 *
 * 39. What is the container–presentational component pattern?
 * -------------------------------------------------------------
 * Presentational components:
 * - UI-focused
 * - Receive data via props
 * - No business logic
 *
 * Container components:
 * - Handle state, fetching, logic
 * - Pass data to presentational components
 *
 * Separation of concerns → cleaner architecture.
 *
 *
 * 40. What is the compound component pattern?
 * ---------------------------------------------
 * Parent component controls shared logic; child components access that context.
 *
 * Example:
 * <Tabs>
 *   <Tabs.List />
 *   <Tabs.Panel />
 * </Tabs>
 *
 * Benefits:
 * - Flexible API
 * - All children share internal state
 *
 *
 * 41. What is the provider pattern?
 * -----------------------------------
 * Provider pattern uses Context to share state globally without prop drilling.
 *
 * Example:
 * <ThemeContext.Provider value={theme}>
 *   <App />
 * </ThemeContext.Provider>
 *
 * Useful for:
 * - Themes
 * - Auth
 * - Language
 *
 *
 * 42. Difference between props drilling and context usage
 * ---------------------------------------------------------
 * props drilling:
 * - Passing props through multiple intermediate components just to reach a child.
 * - Harder to maintain as tree grows.
 *
 * context usage:
 * - Provides values directly to any child without drilling.
 * - Components subscribe using useContext.
 *
 * Summary:
 * Props drilling = deep passing  
 * Context = global access  
 */




/**
 * 43. What is the Context API and when should you use it?
 * ---------------------------------------------------------
 * The Context API allows sharing data across the component tree without
 * passing props manually at every level.
 *
 * Use it when:
 * - Many components need the same data (theme, auth, language)
 * - Avoiding props drilling
 *
 * Not ideal for:
 * - High-frequency updates (can cause rerendering)
 *
 *
 * 44. What problems does Redux solve?
 * -------------------------------------
 * Redux solves:
 * - Hard-to-manage state in large apps
 * - Inconsistent state updates
 * - Prop drilling across the tree
 * - Debugging difficulty
 *
 * Redux provides:
 * - Single source of truth (store)
 * - Predictable updates (reducers)
 * - Time-travel debugging
 *
 *
 * 45. What is the Redux data flow and unidirectional architecture?
 * ------------------------------------------------------------------
 * Redux follows one-way data flow:
 *
 * UI → dispatch(action)  
 * → reducer produces new state  
 * → store updates  
 * → UI re-renders
 *
 * This makes state predictable, traceable, and easier to debug.
 *
 *
 * 46. What are actions, reducers, and the store in Redux?
 * ---------------------------------------------------------
 * actions:
 * - Plain JS objects describing “what happened.”
 * Example: { type: "ADD_TODO", payload: "Buy milk" }
 *
 * reducers:
 * - Pure functions returning new state based on actions.
 * Example:
 * function reducer(state, action) {
 *   switch(action.type) { ... }
 * }
 *
 * store:
 * - Holds app state
 * - Provides dispatch() and subscribe()
 *
 *
 * 47. What is Redux middleware?
 * -------------------------------
 * Middleware sits between dispatching an action and reaching the reducer.
 *
 * Uses:
 * - Logging
 * - Async operations
 * - Modifying or filtering actions
 *
 * Middleware signature:
 * store => next => action => { ... }
 *
 *
 * 48. What is Redux Thunk and how does asynchronous dispatch work?
 * -----------------------------------------------------------------
 * Redux Thunk allows writing async action creators.
 *
 * Normally, actions must be plain objects.
 * Thunk allows actions to be functions:
 *
 * function fetchData() {
 *   return async (dispatch) => {
 *     dispatch({ type: "LOAD_START" });
 *     const data = await fetch(...);
 *     dispatch({ type: "LOAD_SUCCESS", payload: data });
 *   };
 * }
 *
 * Thunk enables:
 * - async/await logic
 * - conditional dispatching
 *
 *
 * 49. What is Redux Saga and how does it differ from Thunk?
 * ------------------------------------------------------------
 * Redux Saga uses generator functions to handle async logic.
 *
 * Saga:
 * - More powerful for complex workflows
 * - Can cancel, debounce, throttle async operations
 *
 * Differences:
 * - Thunk → functions, easier, simple apps
 * - Saga → generators, more complex, enterprise apps
 *
 *
 * 50. What is Zustand, Recoil, or Jotai (modern state managers)?
 * ---------------------------------------------------------------
 * Newer lightweight state management solutions:
 *
 * Zustand:
 * - Minimal state management using hooks
 * - No boilerplate
 *
 * Recoil:
 * - Designed by Facebook for React
 * - Atom-based state, better dependency tracking
 *
 * Jotai:
 * - Primitive atom states (very small, simple)
 *
 * These solve Redux boilerplate and improve ease-of-use.
 *
 *
 * 51. What is MobX and how does observable state work?
 * ------------------------------------------------------
 * MobX uses observables to track state and automatically update components.
 *
 * Core idea:
 * - “Anything that can be derived from state should be derived automatically.”
 *
 * observable:
 * - Wraps state so MobX can track changes.
 *
 * autorun:
 * - Runs reactions automatically when state changes.
 *
 * Compared to Redux:
 * - MobX → mutable state, reactive, very automatic
 * - Redux → immutable state, explicit updates, predictable
 */



/**
 * 52. What is React Router?
 * ----------------------------
 * React Router is a client-side routing library for React.
 * It lets your app:
 * - Change views without reloading the page
 * - Map URLs to components
 * - Handle navigation declaratively
 *
 * Works by manipulating the browser history API.
 *
 *
 * 53. Difference between BrowserRouter and HashRouter
 * -----------------------------------------------------
 * BrowserRouter:
 * - Uses HTML5 history API (clean URLs: /home, /about)
 * - Requires server setup to handle all routes
 *
 * HashRouter:
 * - Uses URL hash (#) portion (/#/home)
 * - Works without server configuration
 * - Useful for static hosting (GitHub Pages)
 *
 *
 * 54. What are Route and Switch (or Routes in v6)?
 * ---------------------------------------------------
 * Route:
 * - Maps a path to a component.
 *
 * Example (v6):
 * <Route path="/about" element={<About />} />
 *
 * Switch (v5) / Routes (v6):
 * - Ensures only one matching route renders.
 * - v6's <Routes> replaces <Switch>.
 *
 *
 * 55. What is useNavigate and how do you programmatically navigate?
 * -------------------------------------------------------------------
 * useNavigate is a React Router hook for navigation.
 *
 * Example:
 * const navigate = useNavigate();
 * navigate("/dashboard");
 *
 * Replaces history.push in older versions.
 *
 *
 * 56. What are nested routes?
 * -----------------------------
 * Nested routes are routes defined inside parent routes.
 *
 * Example:
 * <Route path="dashboard" element={<Dashboard />}>
 *   <Route path="settings" element={<Settings />} />
 * </Route>
 *
 * Allows nested UI layouts and shared wrappers.
 *
 *
 * 57. What are protected routes and how do you implement them?
 * --------------------------------------------------------------
 * Protected routes restrict access based on auth or permissions.
 *
 * Example pattern:
 * function ProtectedRoute({ children }) {
 *   return isLoggedIn ? children : <Navigate to="/login" />;
 * }
 *
 * <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
 *
 * Ensures only authorized users see certain pages.
 *
 *
 * 58. What is code splitting in React Router?
 * ---------------------------------------------
 * Code splitting loads route components lazily so users only download what they need.
 *
 * Example:
 * const About = React.lazy(() => import("./About"));
 *
 * <Route path="/about" element={
 *   <Suspense fallback={<Loading />}>
 *     <About />
 *   </Suspense>
 * } />
 *
 * Benefits:
 * - Better performance
 * - Smaller initial bundle size
 */



/**
 * 59. What are controlled components?
 * -------------------------------------
 * Controlled components are form inputs whose values are fully managed by React state.
 *
 * Example:
 * const [value, setValue] = useState("");
 * <input value={value} onChange={e => setValue(e.target.value)} />
 *
 * Characteristics:
 * - React controls the input value
 * - UI always reflects state
 * - Ideal for validation and real-time processing
 *
 *
 * 60. What are uncontrolled components?
 * ---------------------------------------
 * Uncontrolled components store their values in the DOM instead of React state.
 *
 * Example:
 * const inputRef = useRef();
 * <input ref={inputRef} />
 *
 * Characteristics:
 * - DOM manages the input value
 * - Access via refs (inputRef.current.value)
 * - Good for simple forms and minimal rerenders
 *
 *
 * 61. What is useFormik or Formik library?
 * -------------------------------------------
 * Formik is a React library that simplifies form management:
 *
 * Features:
 * - Handles form state (values, errors, touched)
 * - Validation integration (Yup)
 * - Handles change/submit events
 *
 * useFormik is a hook version:
 * const formik = useFormik({
 *   initialValues: { name: "" },
 *   onSubmit: values => ...
 * });
 *
 * Formik reduces boilerplate and centralizes form logic.
 *
 *
 * 62. What is Yup validation?
 * -----------------------------
 * Yup is a schema-based validation library used with Formik or standalone.
 *
 * Example schema:
 * const schema = Yup.object({
 *   email: Yup.string().email().required(),
 *   age: Yup.number().min(18)
 * });
 *
 * Features:
 * - Declarative schemas
 * - Nested objects
 * - Async validation
 *
 *
 * 63. What is React Hook Form and why is it performant?
 * --------------------------------------------------------
 * React Hook Form is a lightweight form library that uses uncontrolled inputs
 * for maximum performance.
 *
 * Key advantages:
 * - Uses refs instead of state → fewer rerenders
 * - Minimal overhead
 * - Built-in validation
 * - Great for large forms
 *
 * Example:
 * const { register, handleSubmit } = useForm();
 *
 * <input {...register("username")} />
 *
 * Why performant:
 * - Does NOT rerender entire form on every keystroke
 * - Only updates specific fields as needed
 */



/**
 * 64. What causes unnecessary re-renders in React?
 * ---------------------------------------------------
 * Common causes:
 * - Parent component re-renders → children re-render by default
 * - Inline functions recreated on every render
 * - Inline objects/arrays recreated each render
 * - Changing props references without value changes
 * - Context value changes
 * - Passing new callback references
 *
 *
 * 65. What is React.memo and when should you use it?
 * -----------------------------------------------------
 * React.memo is a higher-order component that memoizes the result of a functional
 * component, preventing re-renders if props haven't changed.
 *
 * Example:
 * export default React.memo(MyComponent);
 *
 * Use when:
 * - Component is pure (depends only on props)
 * - Component is expensive to render
 *
 * Avoid when:
 * - Component is simple (memo adds overhead)
 *
 *
 * 66. What is memoization in React and how does it work?
 * --------------------------------------------------------
 * Memoization = caching the result of a calculation so it isn’t recomputed unless inputs change.
 *
 * In React:
 * - useMemo memoizes values
 * - useCallback memoizes functions
 * - React.memo memoizes components
 *
 * Concept:
 * input → compute → cache → reuse next render  
 *
 *
 * 67. What is virtualization and how do react-window/react-virtualized work?
 * ----------------------------------------------------------------------------
 * Virtualization = rendering only the visible portion of a long list instead
 * of rendering thousands of DOM nodes at once.
 *
 * react-window / react-virtualized:
 * - Calculate visible area
 * - Render only items within the viewport
 * - Dynamically mount/unmount elements as the user scrolls
 *
 * Benefits:
 * - Huge performance improvement
 * - Low memory usage
 *
 *
 * 68. Difference between useMemo and useCallback
 * ------------------------------------------------
 * useMemo:
 * - Memoizes a value (return result of a function)
 *
 * useCallback:
 * - Memoizes a function itself
 *
 * Example:
 * useMemo(() => computeValue(a), [a]);       // returns computed result  
 * useCallback(() => handleClick(id), [id]);  // returns memoized function  
 *
 *
 * 69. How does React batching work?
 * -----------------------------------
 * Batching groups multiple state updates into a single re-render.
 *
 * Example:
 * setCount(c => c + 1);
 * setCount(c => c + 1);
 * → React re-renders once.
 *
 * React 18:
 * - Batching applies to ALL updates (including async operations)
 *
 * Benefits:
 * - Better performance
 * - Fewer re-renders
 *
 *
 * 70. What is concurrency in React 18?
 * --------------------------------------
 * React 18 introduced concurrent rendering:
 * - React can pause, interrupt, resume, and abandon renders
 * - Keeps UI responsive during heavy updates
 *
 * Enabled through features like:
 * - useTransition
 * - Suspense improvements
 * - selective hydration
 *
 * Purpose:
 * - Smooth UI
 * - Avoid blocking the main thread
 *
 *
 * 71. What is Suspense and how does it help with async rendering?
 * ----------------------------------------------------------------
 * Suspense lets React wait for async resources (like lazy-loaded components)
 * before rendering UI.
 *
 * Example:
 * <Suspense fallback={<Loading />}>
 *   <LazyComponent />
 * </Suspense>
 *
 * Suspense helps:
 * - Show fallback UI during async operations
 * - Improve user experience during loading
 * - Integrate with concurrent rendering for smoother transitions
 */




/**
 * 72. What are error boundaries?
 * --------------------------------
 * Error boundaries are special React components that catch JavaScript errors
 * in their child components and prevent the entire UI from crashing.
 *
 * Requirements:
 * - Must be a class component
 * - Must implement:
 *   - static getDerivedStateFromError()
 *   - componentDidCatch()
 *
 * They display fallback UI instead of breaking the whole app.
 *
 *
 * 73. How does React handle errors in components?
 * ------------------------------------------------
 * React does NOT catch all errors automatically.
 *
 * What React can handle:
 * - Rendering errors inside components
 * - Lifecycle method errors
 * - Errors inside event handlers (but you must manually handle them)
 *
 * What React cannot catch:
 * - Errors inside asynchronous code (setTimeout, fetch)
 * - Errors in event handlers (unless manually caught)
 * - Errors outside React tree
 *
 * Error boundaries intercept errors during rendering and show fallback UI.
 *
 *
 * 74. What is componentDidCatch?
 * --------------------------------
 * componentDidCatch(error, info) is a lifecycle method used in error boundaries.
 *
 * Example:
 * componentDidCatch(error, info) {
 *   logError(error, info);
 * }
 *
 * It:
 * - Logs error details
 * - Does NOT render fallback UI (that's handled by getDerivedStateFromError)
 *
 *
 * 75. How do you debug React applications?
 * ------------------------------------------
 * Common methods:
 * - React DevTools:
 *   - Inspect components
 *   - View props and state
 *   - Debug re-renders
 *
 * - Browser DevTools:
 *   - Breakpoints
 *   - Network tab (API debugging)
 *   - Performance tab
 *
 * - Console logs (strategic)
 * - Profiling renders using the DevTools "Profiler" tab
 * - Adding boundaries to isolate problems
 * - ESLint rules for React
 *
 *
 * 76. Tools for profiling React performance
 * -------------------------------------------
 * Primary tools:
 * - React DevTools Profiler:
 *   - Measures render time
 *   - Shows which components re-render unnecessarily
 *
 * - Chrome Performance Profiler:
 *   - CPU usage
 *   - Layout + paint measurements
 *
 * - Why Did You Render (WDYR):
 *   - Detects unnecessary re-renders
 *
 * - Flame charts:
 *   - Visualize component render costs
 *
 * These tools help diagnose performance bottlenecks and optimize components.
 */



/**
 * 77. What is ReactDOM and how does rendering work?
 * ---------------------------------------------------
 * ReactDOM is the package responsible for rendering React components
 * into the browser's REAL DOM.
 *
 * Example:
 * ReactDOM.createRoot(document.getElementById("root")).render(<App />);
 *
 * Rendering flow:
 * - React creates a virtual DOM tree
 * - Compares it to previous tree (diffing)
 * - Updates only changed parts of real DOM
 *
 *
 * 78. What is reconciliation in React?
 * --------------------------------------
 * Reconciliation is the process React uses to:
 * - Compare the new virtual DOM with the previous one
 * - Determine minimal required updates
 * - Efficiently update only changed parts of the UI
 *
 * Reconciliation = diffing + updating.
 *
 *
 * 79. What is the virtual DOM and how does it differ from the real DOM?
 * -----------------------------------------------------------------------
 * Virtual DOM:
 * - A lightweight JavaScript representation of the real DOM.
 * - React updates the virtual DOM first, computes differences,
 *   and then updates the real DOM efficiently.
 *
 * Real DOM:
 * - Browser-rendered document structure.
 * - Very slow to update frequently.
 *
 * Benefits of virtual DOM:
 * - Batch updates
 * - Fewer direct DOM operations
 * - Better performance for complex UIs
 *
 *
 * 80. What is diffing in React?
 * -------------------------------
 * Diffing is React’s algorithm for comparing two virtual DOM trees.
 *
 * Key rules:
 * - Different element types → replace entire subtree
 * - Same type → update only changed props
 * - Lists → use keys to minimize DOM movement
 *
 * Result:
 * - Fast detection of what actually changed
 *
 *
 * 81. What is hydration in React?
 * ---------------------------------
 * Hydration is the process of attaching React event listeners and internal
 * structures to HTML already rendered on the server.
 *
 * Used in:
 * - Server-side rendering (SSR)
 *
 * Example:
 * ReactDOM.hydrateRoot(document.getElementById("root"), <App />);
 *
 * Browser receives HTML → React hydrates → app becomes interactive.
 *
 *
 * 82. What is server-side rendering (SSR)?
 * ------------------------------------------
 * SSR renders React components into HTML on the server, then sends pre-built
 * HTML to the browser.
 *
 * Benefits:
 * - Faster first paint
 * - Better SEO (search engines see full HTML)
 *
 * After load:
 * - React hydrates the page for interactivity.
 *
 * Tools:
 * - Next.js
 * - Remix
 *
 *
 * 83. What is static site generation (SSG)?
 * -------------------------------------------
 * SSG pre-builds HTML at build time (not per request).
 *
 * Benefits:
 * - Extremely fast (just serving static files)
 * - Great for blogs, documentation, marketing sites
 *
 * Tools:
 * - Next.js getStaticProps
 * - Gatsby
 *
 * Difference from SSR:
 * - SSR renders per request
 * - SSG renders once at build time
 *
 *
 * 84. What is React Fiber?
 * ---------------------------
 * React Fiber is the internal engine (reconciliation algorithm)
 * introduced in React 16+ to improve rendering.
 *
 * Fiber enables:
 * - Interruptible rendering
 * - Prioritized updates
 * - Scheduling work across frames
 * - Concurrent features (React 18)
 *
 * Think of Fiber as:
 * - A rewrite of React’s core algorithm
 * - A way to split rendering work into small chunks
 *
 * Result:
 * - Smoother UI
 * - Better performance for complex applications
 */



/**
 * 85. What is Next.js and why is it used?
 * -----------------------------------------
 * Next.js is a React framework providing:
 * - Server-side rendering (SSR)
 * - Static site generation (SSG)
 * - API routes
 * - File-based routing
 * - Image optimization
 * - Performance optimizations
 *
 * Why it's used:
 * - SEO friendly
 * - Faster initial load
 * - Built-in routing & server-side logic
 * - Great developer experience
 *
 *
 * 86. Difference between SSR, SSG, and ISR in Next.js
 * ------------------------------------------------------
 * SSR (Server-Side Rendering):
 * - HTML generated on every request.
 * - getServerSideProps runs on each request.
 * - Always fresh data but slower.
 *
 * SSG (Static Site Generation):
 * - HTML generated at build time.
 * - Uses getStaticProps.
 * - Fastest but not updated unless rebuilt.
 *
 * ISR (Incremental Static Regeneration):
 * - Combination of static + periodic regeneration.
 * - getStaticProps + revalidate.
 * - Regenerates pages in the background after a time interval.
 *
 * Summary:
 * SSR → real-time  
 * SSG → build-time  
 * ISR → scheduled rebuild  
 *
 *
 * 87. What are API routes in Next.js?
 * --------------------------------------
 * API routes let you create backend endpoints inside the Next.js project.
 *
 * Located inside:
 * /pages/api/*.js  (Next.js 12 and earlier)
 * /app/api/*       (Next.js 13+)
 *
 * Example:
 * export default function handler(req, res) {
 *   res.status(200).json({ message: "Hello API" });
 * }
 *
 * Benefits:
 * - No need for separate backend server
 * - Can use server-side logic like fetching secrets
 *
 *
 * 88. How does file-based routing work?
 * ---------------------------------------
 * Next.js generates routes based on folder/file names.
 *
 * Example:
 * pages/index.js       → "/"  
 * pages/about.js       → "/about"  
 * pages/blog/[id].js   → dynamic route "/blog/:id"
 *
 * No need for React Router.
 *
 *
 * 89. What are middleware and edge functions?
 * ---------------------------------------------
 * Middleware (Next.js 12+):
 * - Runs before a request is completed.
 * - Used for auth checks, redirects, rewrites.
 * - Runs on the edge (fast).
 *
 * Edge functions:
 * - Serverless functions deployed globally at edge locations.
 * - Extremely fast, low latency.
 *
 *
 * 90. What is getStaticProps, getServerSideProps, and getStaticPaths?
 * ---------------------------------------------------------------------
 * getStaticProps:
 * - Used for SSG.
 * - Runs at build time.
 * - Returns props for the page component.
 *
 * getServerSideProps:
 * - Used for SSR.
 * - Runs on every request.
 * - Good for dynamic, real-time data.
 *
 * getStaticPaths:
 * - Used with dynamic routes in SSG.
 * - Defines which paths should be pre-rendered.
 *
 * Example:
 * export async function getStaticPaths() {
 *   return {
 *     paths: [{ params: { id: "1" }}],
 *     fallback: false
 *   };
 * }
 *
 * Combined:
 * - getStaticPaths chooses pages
 * - getStaticProps provides the data
 */



/**
 * 91. What is Jest and how is it used in React?
 * -----------------------------------------------
 * Jest is a JavaScript testing framework created by Facebook.
 * It is widely used for React because:
 * - It supports mocks, spies, and assertions
 * - It runs tests fast with parallel execution
 * - Works seamlessly with React Testing Library
 *
 * Example:
 * test("adds numbers", () => {
 *   expect(1 + 2).toBe(3);
 * });
 *
 *
 * 92. What is React Testing Library (RTL)?
 * -------------------------------------------
 * RTL is a library for testing React components based on user behavior.
 *
 * Key principles:
 * - Test components the way users interact with them
 * - Avoid testing implementation details
 *
 * Example:
 * render(<Button />);
 * fireEvent.click(screen.getByText("Submit"));
 *
 * RTL focuses on:
 * - Accessibility
 * - Realistic interaction
 *
 *
 * 93. Difference between unit, integration, and E2E testing
 * -----------------------------------------------------------
 * Unit testing:
 * - Tests individual functions/components in isolation.
 * - Example: a single React component's rendering.
 *
 * Integration testing:
 * - Tests multiple components/modules working together.
 * - Example: form component + validation working together.
 *
 * End-to-End (E2E) testing:
 * - Tests entire application flow in a browser environment.
 * - Simulates real user interactions.
 * - Example: user logs in → dashboard loads → logout.
 *
 *
 * 94. Tools for E2E testing (Cypress, Playwright)
 * -------------------------------------------------
 * Cypress:
 * - Runs in the browser
 * - Easy to use UI
 * - Great debugging experience
 *
 * Playwright:
 * - Multi-browser automation (Chromium, Firefox, WebKit)
 * - Faster and more reliable headless execution
 * - Better for large-scale automation pipelines
 *
 * Both:
 * - Test full user flows
 * - Click buttons, fill forms, navigate pages
 *
 *
 * 95. What is snapshot testing?
 * -------------------------------
 * Snapshot testing compares a component’s rendered output to a previously saved version.
 *
 * Example:
 * const tree = renderer.create(<App />).toJSON();
 * expect(tree).toMatchSnapshot();
 *
 * If the output changes, Jest flags a mismatch.
 *
 * Good for:
 * - Detecting unintended UI changes
 *
 * Not good for:
 * - Frequently changing UI
 * - Large components with unstable output
 */




/**
 * 96. What is the uncontrolled component pattern?
 * -------------------------------------------------
 * Uncontrolled components rely on the DOM to store form values instead of React state.
 *
 * Example:
 * const inputRef = useRef();
 * <input ref={inputRef} />
 *
 * Value accessed using:
 * inputRef.current.value
 *
 * Benefits:
 * - Fewer rerenders
 * - Simpler for large forms
 *
 * Drawback:
 * - Harder to validate or sync UI with internal data
 *
 *
 * 97. What is the controlled component pattern?
 * -----------------------------------------------
 * Controlled components use React state as the single source of truth for form values.
 *
 * Example:
 * const [name, setName] = useState("");
 * <input value={name} onChange={e => setName(e.target.value)} />
 *
 * Benefits:
 * - Real-time validation
 * - UI always mirrors state
 * - Predictable behavior
 *
 * Drawback:
 * - More rerenders than uncontrolled forms
 *
 *
 * 98. What are custom hooks and when should you create one?
 * -----------------------------------------------------------
 * Custom hooks are reusable logic extracted into a function that uses React hooks.
 *
 * Example:
 * function useFetch(url) {
 *   const [data, setData] = useState(null);
 *   useEffect(() => fetch(url).then(r => r.json()).then(setData), [url]);
 *   return data;
 * }
 *
 * Use when:
 * - Multiple components share the same logic
 * - You want cleaner, modular components
 *
 *
 * 99. What is the pub-sub (observer) pattern in React?
 * ------------------------------------------------------
 * Pub-sub = Publish/Subscribe pattern.
 *
 * Concept:
 * - Publisher broadcasts events
 * - Subscribers respond to those events
 *
 * In React:
 * - Can be implemented via event emitters or external libraries (RxJS)
 * - Useful for cross-component communication without prop drilling
 *
 * Not typical in React because Context or state managers often replace it.
 *
 *
 * 100. What is the state machine pattern (XState) in React?
 * -----------------------------------------------------------
 * XState is a library implementing finite state machines and statecharts.
 *
 * Benefits:
 * - Predictable state transitions
 * - No invalid states
 * - Visual diagrams of app behavior
 *
 * Example:
 * idle → loading → success | error
 *
 * Good for:
 * - Forms
 * - Multi-step wizards
 * - Complex business logic
 *
 *
 * 101. What is state colocation and why does it matter?
 * -------------------------------------------------------
 * State colocation = keeping state as close as possible to where it's used.
 *
 * Benefits:
 * - Reduces unnecessary prop drilling
 * - Fewer rerenders
 * - Clearer component responsibilities
 * - Easier debugging
 *
 * Bad practice:
 * - Putting too much state globally (Context/Redux) when local state is enough
 *
 *
 * 102. What is React Portal and when do you use it?
 * ---------------------------------------------------
 * React Portal allows rendering a component outside the normal DOM hierarchy
 * of its parent.
 *
 * Example:
 * ReactDOM.createPortal(
 *   <Modal />,
 *   document.getElementById("modal-root")
 * );
 *
 * Use cases:
 * - Modals
 * - Tooltips
 * - Dropdowns
 * - Overlays
 *
 * Why:
 * - Avoid z-index issues
 * - Properly place UI elements visually while keeping React structure intact
 */




/**
 * 103. What is Cross-Site Scripting (XSS) in React and how do you prevent it?
 * ----------------------------------------------------------------------------
 * XSS occurs when malicious scripts are injected into the browser.
 *
 * React prevents XSS by:
 * - Escaping all values rendered inside JSX by default.
 *
 * Example:
 * <div>{userInput}</div>  // automatically escaped
 *
 * To prevent XSS:
 * - Do NOT inject raw HTML
 * - Sanitize any data coming from external sources
 * - Avoid dangerous DOM APIs
 *
 *
 * 104. What is dangerouslySetInnerHTML and why should you avoid it?
 * -------------------------------------------------------------------
 * dangerouslySetInnerHTML allows rendering raw HTML directly into the DOM.
 *
 * Example:
 * <div dangerouslySetInnerHTML={{ __html: "<p>Hello</p>" }} />
 *
 * Why dangerous:
 * - Bypasses React's built-in XSS protections
 * - Executes malicious scripts if data is untrusted
 *
 * Use only when:
 * - Rendering sanitized HTML (Markdown, CMS content)
 *
 *
 * 105. What are environment variables in React?
 * -----------------------------------------------
 * Environment variables store sensitive or environment-specific configuration.
 *
 * In Create React App:
 * Variables must start with REACT_APP_
 *
 * Example:
 * REACT_APP_API_URL=https://api.com
 *
 * Access:
 * process.env.REACT_APP_API_URL
 *
 * Used for:
 * - API endpoints
 * - Feature flags
 * - Keys (BUT never store secrets in client-side code)
 *
 *
 * 106. How do you deploy a React app? (Netlify, Vercel, AWS, etc.)
 * -----------------------------------------------------------------
 * Common deployment platforms:
 *
 * Netlify:
 * - Drag-and-drop build folder
 * - Git-based deployments
 *
 * Vercel:
 * - Best for Next.js but works with React
 * - Automatic deployments + preview URLs
 *
 * GitHub Pages:
 * - Simple static hosting
 *
 * AWS Amplify / S3 + CloudFront:
 * - Scalable, production-ready static hosting
 *
 * Deployment steps:
 * - Build: npm run build
 * - Upload build/ folder to hosting
 *
 *
 * 107. What is code splitting and lazy loading in React?
 * --------------------------------------------------------
 * Code splitting divides the bundle into smaller chunks, loading only what is needed.
 *
 * lazy():
 * const About = React.lazy(() => import("./About"));
 *
 * Suspense shows fallback while loading:
 * <Suspense fallback={<Loading />}>
 *   <About />
 * </Suspense>
 *
 * Benefits:
 * - Faster initial load
 * - Smaller bundle size
 *
 *
 * 108. What is tree shaking in React apps?
 * ------------------------------------------
 * Tree shaking removes unused code during bundling.
 *
 * Tools:
 * - Webpack
 * - ESBuild
 * - Rollup
 *
 * Example:
 * import { A, B } from "lib";
 * Only `A` is used → bundler removes `B`.
 *
 * Benefits:
 * - Smaller bundle size
 * - Faster load and better performance
 */



/**
 * 109. What is React Fiber and why was it introduced?
 * ------------------------------------------------------
 * React Fiber is the internal reconciliation engine (React rewrite in v16+).
 *
 * Why introduced:
 * - To enable interruptible rendering
 * - To prioritize updates
 * - To split rendering into small units (fibers)
 * - To support concurrent features (React 18)
 *
 * React Fiber = advanced scheduling + smarter rendering.
 *
 *
 * 110. What are lanes in React 18?
 * ----------------------------------
 * Lanes represent priority levels for updates.
 *
 * Purpose:
 * - Give important updates priority (e.g., typing)
 * - Allow delaying less important updates (e.g., background data loading)
 * - Manage concurrent rendering more efficiently
 *
 * Lanes = React's internal update priority system.
 *
 *
 * 111. How does React schedule rendering updates?
 * -------------------------------------------------
 * React uses:
 * - Fiber architecture → break tasks into units
 * - Lanes → assign priority
 * - Scheduler → pause/resume/abort rendering
 *
 * Update flow:
 * - React marks which fiber needs updating
 * - Schedules work based on priority
 * - Performs work during idle time or microtasks
 * - Can interrupt rendering to keep UI responsive
 *
 *
 * 112. Difference between legacy mode and concurrent mode
 * ---------------------------------------------------------
 * Legacy mode:
 * - Synchronous rendering
 * - Once render starts, it cannot be paused
 * - Older React behavior (pre v18)
 *
 * Concurrent mode (React 18):
 * - Asynchronous rendering
 * - React can pause, resume, restart work
 * - Enables transitions, Suspense streaming, selective hydration
 *
 * Result:
 * Concurrent mode → smoother UI for heavy operations.
 *
 *
 * 113. How does React handle state batching internally?
 * --------------------------------------------------------
 * Batching = grouping multiple state updates into one render.
 *
 * Before React 18:
 * - Batching happened only inside event handlers.
 *
 * React 18:
 * - Automatic batching everywhere (async calls, promises, timeouts)
 *
 * Internal process:
 * - React collects updates in a queue
 * - Applies them together at the end of the event loop
 *
 * Benefits:
 * - Fewer renders
 * - Better performance
 *
 *
 * 114. What is the role of keys in lists and how does React use them?
 * ----------------------------------------------------------------------
 * Keys help React identify which list items:
 * - Stayed the same
 * - Were added
 * - Were removed
 *
 * Used during diffing:
 * - React matches old and new elements by keys
 * - Minimizes DOM operations
 *
 * Example:
 * items.map(item => <li key={item.id}>{item.name}</li>)
 *
 *
 * 115. Why should keys not be array indices in lists?
 * ------------------------------------------------------
 * Using array index as key causes issues when:
 * - Items are reordered
 * - Items are inserted/removed
 *
 * Why:
 * - React associates DOM nodes incorrectly
 * - Leads to UI bugs (wrong input values, transitions breaking)
 * - Poor performance because React re-renders too much
 *
 * Good keys:
 * - Unique IDs
 * - Stable values from data
 *
 * Bad keys:
 * - array indices
 * - random values generated on every render
 */
