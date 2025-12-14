/*

MASTER JAVASCRIPT INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — JAVASCRIPT BASICS & FUNDAMENTALS
========================================================
1. What is JavaScript and how is it different from Java?  
2. What are the different data types in JavaScript?  
3. What is the difference between var, let, and const?  
4. What are primitive vs reference types?  
5. What is type coercion in JavaScript?  
6. What is the difference between == and ===?  
7. What is NaN and how do you check for it?  
8. What is the typeof operator and what are its limitations?  
9. What is the difference between null and undefined?  
10. What are truthy and falsy values in JavaScript?  

========================================================
SECTION 2 — OPERATORS, EXPRESSIONS & CONTROL FLOW
========================================================
11. What are arithmetic, logical, and comparison operators?  
12. What are short-circuit evaluations?  
13. What is the ternary operator and when to use it?  
14. What are loops available in JavaScript (for, while, for…in, for…of)?  
15. What is the difference between for…in and for…of?  
16. What is switch-case and how does fall-through work?  

========================================================
SECTION 3 — FUNCTIONS & SCOPE
========================================================
17. What are function declarations vs function expressions?  
18. What is an arrow function and how is it different?  
19. What is scope in JavaScript?  
20. What is the difference between global scope and block scope?  
21. What is lexical scope?  
22. What is the scope chain?  
23. What are closures and how do they work?  
24. What is a pure function?  
25. What is hoisting in JavaScript?  
26. What is the call stack in JavaScript?  

========================================================
SECTION 4 — JAVASCRIPT OBJECTS & PROTOTYPES
========================================================
27. What are objects in JavaScript?  
28. What is prototypal inheritance?  
29. What is the prototype chain?  
30. What is Object.create()?  
31. What are getters and setters in JavaScript?  
32. What is the difference between a constructor function and a class?  
33. What is the this keyword and how does its binding work?  
34. What is implicit, explicit, default, and new binding of this?  
35. What are call(), apply(), and bind()?  

========================================================
SECTION 5 — EVENTS & EVENT LOOP
========================================================
36. What is the event loop in JavaScript?  
37. What are microtasks and macrotasks?  
38. What is the difference between setTimeout, setInterval, and requestAnimationFrame?  
39. What are event handlers and event listeners?  
40. What is event delegation and why is it useful?  
41. What is event bubbling and capturing?  
42. What is the difference between addEventListener options like capture and passive?  

========================================================
SECTION 6 — ARRAYS, STRINGS & BUILT-IN OBJECTS
========================================================
43. What are common array methods (map, filter, reduce, etc.)?  
44. What is the difference between slice and splice?  
45. What is Array.from() and Array.of()?  
46. What are string methods (slice, substring, substr)?  
47. What is the difference between forEach and map?  
48. What is the Set object and how is it different from an array?  
49. What is the Map object and how is it different from an object?  

========================================================
SECTION 7 — ASYNCHRONOUS JAVASCRIPT
========================================================
50. What is synchronous vs asynchronous code?  
51. What is a callback function?  
52. What is callback hell?  
53. What are Promises in JavaScript?  
54. What are then(), catch(), and finally()?  
55. What is async/await and how does it simplify Promises?  
56. What is Promise.all, Promise.race, Promise.any, Promise.allSettled?  
57. What is fetch() API?  
58. What are AJAX and XHR?  
59. What is the difference between microtasks and macrotasks?  

========================================================
SECTION 8 — MODULES & CODE ORGANIZATION
========================================================
60. What are ES6 modules?  
61. What is the difference between default and named exports?  
62. What is tree shaking?  
63. What are IIFEs (Immediately Invoked Function Expressions)?  
64. What is the revealing module pattern?  

========================================================
SECTION 9 — ERROR HANDLING & DEBUGGING
========================================================
65. What is try…catch and how does it work?  
66. What are different types of JavaScript errors?  
67. What is the stack trace?  
68. What is strict mode and why is it used?  
69. How do you debug JavaScript using browser devtools?  

========================================================
SECTION 10 — DOM & BROWSER APIs
========================================================
70. What is the DOM (Document Object Model)?  
71. What are DOM selectors such as getElementById, querySelector?  
72. What are DOM manipulation methods like append, remove, cloneNode?  
73. What is the difference between innerHTML, textContent, innerText?  
74. What is the BOM (Browser Object Model)?  
75. What are common BOM functions (alert, prompt, confirm)?  
76. What is localStorage vs sessionStorage?  
77. What is the difference between cookies and storage APIs?  
78. What is the history API in browsers?  
79. What is the fetch API and how does it work?  

========================================================
SECTION 11 — OBJECT-ORIENTED JAVASCRIPT (OOP)
========================================================
80. What is OOP in JavaScript?  
81. What are the four pillars of OOP (encapsulation, inheritance, abstraction, polymorphism)?  
82. What are ES6 classes?  
83. What are class fields and private fields (#)?  
84. What is super() in JavaScript classes?  
85. What are static methods and properties?  

========================================================
SECTION 12 — FUNCTIONS (ADVANCED)
========================================================
86. What is currying in JavaScript?  
87. What is partial application?  
88. What is function composition?  
89. What is memoization?  
90. What is debounce and throttle?  

========================================================
SECTION 13 — ADVANCED JAVASCRIPT TOPICS
========================================================
91. What is the difference between deep copy and shallow copy?  
92. What is JSON and how do you parse/stringify it?  
93. What is event-driven architecture?  
94. What is functional programming in JavaScript?  
95. What are generators and iterators?  
96. What is the difference between Symbol.iterator and Symbol.asyncIterator?  
97. What is prototype pollution?  
98. What are WeakMap and WeakSet?  
99. What is BigInt?  
100. What is the difference between eval and Function constructor?  

========================================================
SECTION 14 — PERFORMANCE OPTIMIZATION
========================================================
101. How do you optimize JavaScript performance?  
102. What is debouncing and throttling?  
103. What is the cost of DOM manipulation?  
104. What is requestIdleCallback?  
105. What is web worker and when should you use it?  
106. How does garbage collection work in JavaScript?  

========================================================
SECTION 15 — SECURITY IN JAVASCRIPT
========================================================
107. What is XSS (Cross-Site Scripting)?  
108. What is CSRF and how does JavaScript relate to it?  
109. What is CORS (Cross-Origin Resource Sharing)?  
110. What is same-origin policy?  
111. What are secure coding practices in JavaScript?  

========================================================
SECTION 16 — JS RUNTIME, COMPILATION & ENGINE INTERNALS
========================================================
112. What is the JavaScript engine (V8, SpiderMonkey)?  
113. What is JIT (Just-in-Time) compilation?  
114. What are hidden classes and inline caching?  
115. What is memory heap and call stack?  
116. What is the execution context in JavaScript?  
117. What is the difference between the global and function execution context?  
118. What are creation and execution phases?  
119. How does JavaScript garbage collection work?  
120. What is tail-call optimization?  

========================================================

*/



/**
 * 1. What is JavaScript and how is it different from Java?
 * ----------------------------------------------------------
 * JavaScript:
 * - Interpreted, dynamic, prototype-based language.
 * - Runs in browsers and servers (Node.js).
 * - Weakly typed.
 *
 * Java:
 * - Compiled, static, class-based language.
 * - Requires JVM to run.
 * - Strongly typed.
 *
 * Differences:
 * - Syntax may look similar but languages are unrelated.
 * - JS is dynamic; Java is static.
 * - JS uses prototypes; Java uses classes.
 *
 *
 * 2. What are the different data types in JavaScript?
 * -----------------------------------------------------
 * Primitive types:
 * - string
 * - number
 * - boolean
 * - null
 * - undefined
 * - bigint
 * - symbol
 *
 * Reference types:
 * - object
 * - array
 * - function
 *
 *
 * 3. What is the difference between var, let, and const?
 * --------------------------------------------------------
 * var:
 * - Function-scoped
 * - Hoisted (initialized as undefined)
 * - Allows redeclaration
 *
 * let:
 * - Block-scoped
 * - Hoisted but in temporal dead zone
 * - No redeclaration
 *
 * const:
 * - Block-scoped
 * - Immutable binding (value can mutate, not reassign)
 * - No redeclaration
 *
 *
 * 4. What are primitive vs reference types?
 * --------------------------------------------
 * Primitive types:
 * - Stored by value
 * - Immutable
 *
 * Reference types:
 * - Stored as references to memory
 * - Mutable
 *
 * Example:
 * let a = { x: 1 };
 * let b = a;   // both reference the same object
 *
 *
 * 5. What is type coercion in JavaScript?
 * -----------------------------------------
 * Type coercion = converting one data type to another automatically or manually.
 *
 * Types:
 * - Implicit: "5" * 2 → 10
 * - Explicit: Number("5")
 *
 * Coercion mainly happens with +, ==, and template strings.
 *
 *
 * 6. What is the difference between == and ===?
 * ------------------------------------------------
 * == (loose equality):
 * - Performs type coercion before comparison.
 * Example: "5" == 5 → true
 *
 * === (strict equality):
 * - No type coercion, type + value must match.
 * Example: "5" === 5 → false
 *
 *
 * 7. What is NaN and how do you check for it?
 * ---------------------------------------------
 * NaN = Not-a-Number.
 * - Result of invalid numeric operations: Number("abc")
 * - NaN !== NaN (only value not equal to itself)
 *
 * Correct check:
 * Number.isNaN(value)
 *
 *
 * 8. What is the typeof operator and what are its limitations?
 * --------------------------------------------------------------
 * typeof returns data type of a value.
 *
 * Examples:
 * typeof 5 → "number"
 * typeof "hi" → "string"
 *
 * Limitations:
 * typeof null → "object" (historical bug)
 * typeof arrays → "object"
 * typeof functions → "function" (but technically objects)
 *
 *
 * 9. What is the difference between null and undefined?
 * -------------------------------------------------------
 * null:
 * - Intentional absence of value.
 * - Manually assigned.
 *
 * undefined:
 * - Variable declared but not assigned.
 * - Default value of missing properties.
 *
 *
 * 10. What are truthy and falsy values in JavaScript?
 * ------------------------------------------------------
 * Falsy values:
 * - false
 * - 0
 * - ""
 * - null
 * - undefined
 * - NaN
 *
 * Truthy values:
 * - Everything else (objects, arrays, non-empty strings, numbers except 0)
 */



/**
 * 11. What are arithmetic, logical, and comparison operators?
 * -------------------------------------------------------------
 * Arithmetic operators:
 * +, -, *, /, %, ** (exponent), ++, --
 *
 * Logical operators:
 * && (AND), || (OR), ! (NOT)
 *
 * Comparison operators:
 * ==, ===, !=, !==, >, <, >=, <=
 *
 *
 * 12. What are short-circuit evaluations?
 * -----------------------------------------
 * Logical AND (&&):
 * - Returns first falsy value, else returns last value.
 * Example: false && "x" → false
 *
 * Logical OR (||):
 * - Returns first truthy value.
 * Example: null || "default" → "default"
 *
 * Practical use:
 * - Default values
 * - Conditional execution
 *
 *
 * 13. What is the ternary operator and when to use it?
 * -------------------------------------------------------
 * condition ? valueIfTrue : valueIfFalse
 *
 * Example:
 * const msg = age > 18 ? "Adult" : "Minor";
 *
 * Use for:
 * - Short conditional assignments
 * - Inline expressions
 *
 *
 * 14. Loops available in JavaScript (for, while, for…in, for…of)
 * ----------------------------------------------------------------
 * for:
 * for (let i = 0; i < n; i++) {}
 *
 * while:
 * while (condition) {}
 *
 * for…in:
 * - Iterates over object keys.
 *
 * for…of:
 * - Iterates over iterable values (arrays, strings, maps).
 *
 *
 * 15. Difference between for…in and for…of
 * ------------------------------------------
 * for…in:
 * - Iterates keys.
 * - For objects.
 * - Example:
 * for (let key in obj) {}
 *
 * for…of:
 * - Iterates values.
 * - For arrays, strings, sets, maps.
 * - Example:
 * for (let value of arr) {}
 *
 *
 * 16. What is switch-case and how does fall-through work?
 * ----------------------------------------------------------
 * switch evaluates a value and matches cases.
 *
 * Example:
 * switch(x) {
 *   case 1: ...; break;
 *   case 2: ...; break;
 *   default: ...
 * }
 *
 * Fall-through:
 * - If break is omitted, execution continues to the next case.
 * - Used intentionally for grouping cases.
 */



/**
 * 17. What are function declarations vs function expressions?
 * --------------------------------------------------------------
 * Function declaration:
 * - Defined with the `function` keyword.
 * - Hoisted (available before definition).
 *
 * Example:
 * function add(a, b) { return a + b; }
 *
 * Function expression:
 * - Assigned to a variable.
 * - Not fully hoisted (only variable is hoisted, not the function value).
 *
 * Example:
 * const add = function(a, b) { return a + b; };
 *
 *
 * 18. What is an arrow function and how is it different?
 * ---------------------------------------------------------
 * Arrow function:
 * - Shorter syntax.
 * - Lexically binds `this` (inherits from parent).
 * - Cannot be used as constructor.
 * - No `arguments` object.
 *
 * Example:
 * const add = (a, b) => a + b;
 *
 * Differences:
 * - Arrow functions do NOT have their own `this`.
 * - Cannot use `new`.
 *
 *
 * 19. What is scope in JavaScript?
 * ----------------------------------
 * Scope defines where variables are accessible.
 *
 * Types:
 * - Global scope
 * - Function scope
 * - Block scope (let/const)
 *
 * Scope prevents variable collisions and controls visibility.
 *
 *
 * 20. Difference between global scope and block scope
 * ------------------------------------------------------
 * Global scope:
 * - Variables accessible everywhere.
 *
 * Block scope:
 * - Variables defined inside `{}` with let/const.
 *
 * Example:
 * if (true) { let x = 10; }  
 * x → not accessible
 *
 *
 * 21. What is lexical scope?
 * -----------------------------
 * Lexical scope means inner functions can access variables defined in their parent scope.
 *
 * Example:
 * function outer() {
 *   const x = 10;
 *   function inner() { console.log(x); }
 * }
 *
 * Scope is determined by where code is written, not by runtime.
 *
 *
 * 22. What is the scope chain?
 * ------------------------------
 * Scope chain is the chain of parent scopes that JavaScript checks when resolving variables.
 *
 * Variable lookup:
 * - First local scope
 * - Then outer scope
 * - Then global scope
 *
 *
 * 23. What are closures and how do they work?
 * ---------------------------------------------
 * Closure = a function that remembers the variables from its outer scope even after the outer function has finished executing.
 *
 * Example:
 * function counter() {
 *   let count = 0;
 *   return function() { return ++count; };
 * }
 *
 * const c = counter();
 * c(); // remembers count
 *
 * Closures allow:
 * - Private variables
 * - Encapsulation
 * - Persistent state
 *
 *
 * 24. What is a pure function?
 * -------------------------------
 * A pure function:
 * - Same input → same output
 * - No side effects (no modifying external variables, no DOM changes, etc.)
 *
 * Example:
 * function add(a, b) { return a + b; }
 *
 * Not pure:
 * function addToTotal(a) { total += a; }
 *
 *
 * 25. What is hoisting in JavaScript?
 * -------------------------------------
 * Hoisting = moving variable and function declarations to the top of their scope during compilation.
 *
 * - var declarations hoisted (initialized as undefined)
 * - let/const hoisted but in Temporal Dead Zone (not usable before definition)
 * - Function declarations hoisted completely
 *
 * Example:
 * console.log(x); // undefined
 * var x = 10;
 *
 *
 * 26. What is the call stack in JavaScript?
 * -------------------------------------------
 * Call stack = data structure tracking function execution.
 *
 * Execution flow:
 * - A function is called → pushed onto stack
 * - Function returns → popped off stack
 *
 * Example:
 * function a() { b(); }
 * function b() { c(); }
 * function c() {}
 *
 * a() → b() → c() → return
 *
 * If stack grows too large → "Maximum call stack size exceeded"
 */



/**
 * 27. What are objects in JavaScript?
 * -------------------------------------
 * Objects are collections of key–value pairs.
 *
 * Example:
 * const obj = { name: "John", age: 30 };
 *
 * Features:
 * - Keys are strings or symbols.
 * - Values can be any type (functions, arrays, other objects).
 * - Objects are reference types (stored by reference).
 *
 *
 * 28. What is prototypal inheritance?
 * --------------------------------------
 * JavaScript uses prototypes instead of classes for inheritance.
 *
 * Each object has an internal [[Prototype]] that links to another object.
 * When accessing a property:
 * - JS checks the object first
 * - If not found → checks prototype
 *
 * Example:
 * const parent = { greet() { console.log("hi"); } };
 * const child = Object.create(parent);
 * child.greet(); // inherited
 *
 *
 * 29. What is the prototype chain?
 * -----------------------------------
 * Prototype chain = the chain of linked prototypes JS follows when looking up properties.
 *
 * Example lookup flow:
 * child → parent → Object.prototype → null
 *
 * If a property is not found anywhere in the chain → undefined.
 *
 *
 * 30. What is Object.create()?
 * -------------------------------
 * Object.create(proto) creates a new object using the provided prototype.
 *
 * Example:
 * const parent = { x: 1 };
 * const child = Object.create(parent);
 *
 * Features:
 * - Directly sets prototype
 * - Useful for prototypal inheritance without classes
 *
 *
 * 31. What are getters and setters in JavaScript?
 * ------------------------------------------------
 * Getters → retrieve computed or wrapped values.
 * Setters → intercept assignment and update internal values.
 *
 * Example:
 * const person = {
 *   _age: 20,
 *   get age() { return this._age; },
 *   set age(v) { if(v > 0) this._age = v; }
 * };
 *
 * Getters allow computed access; setters allow validation or side-effects.
 *
 *
 * 32. What is the difference between a constructor function and a class?
 * -------------------------------------------------------------------------
 * Constructor function:
 * function Person(name) { this.name = name; }
 * Person.prototype.greet = function() {}
 *
 * Class (syntactic sugar over prototype system):
 * class Person {
 *   constructor(name) { this.name = name; }
 *   greet() {}
 * }
 *
 * Differences:
 * - Classes are cleaner and more readable
 * - Classes have strict mode by default
 * - Class methods are non-enumerable
 * - Class syntax cannot be hoisted (must be declared before use)
 *
 *
 * 33. What is the this keyword and how does its binding work?
 * --------------------------------------------------------------
 * this refers to the current execution context.
 *
 * Value depends on how a function is called, not where it's written.
 *
 * Examples:
 * obj.method() → this = obj  
 * standaloneFunction() → this = undefined (strict mode)  
 * new Constructor() → this = new object  
 *
 *
 * 34. What is implicit, explicit, default, and new binding of this?
 * --------------------------------------------------------------------
 * Implicit binding:
 * obj.method() → this = obj
 *
 * Explicit binding:
 * Using call(), apply(), bind():
 * func.call(obj)
 * func.apply(obj)
 *
 * Default binding:
 * Standalone function → this = global object (non-strict)  
 * Standalone + strict mode → this = undefined
 *
 * new binding:
 * new Func() → this = newly created instance
 *
 *
 * 35. What are call(), apply(), and bind()?
 * -------------------------------------------
 * call():
 * - Calls function immediately
 * - Arguments passed individually
 * func.call(obj, arg1, arg2)
 *
 * apply():
 * - Same as call but accepts arguments as array
 * func.apply(obj, [arg1, arg2])
 *
 * bind():
 * - Returns a NEW function with permanently bound this
 * const fn = func.bind(obj);
 *
 * Summary:
 * call → immediate  
 * apply → immediate (array args)  
 * bind → later execution  
 */



/**
 * 36. What is the event loop in JavaScript?
 * -------------------------------------------
 * The event loop allows JavaScript (single-threaded) to handle async tasks.
 *
 * Flow:
 * - Call stack runs synchronous code.
 * - Async tasks go to Web APIs.
 * - When completed, callbacks move to task queues.
 * - Event loop pushes them back to call stack when it is empty.
 *
 * Result:
 * - Non-blocking async behavior in JS.
 *
 *
 * 37. What are microtasks and macrotasks?
 * -----------------------------------------
 * Microtasks:
 * - High-priority tasks.
 * - Examples:
 *   - Promise callbacks
 *   - queueMicrotask()
 *   - MutationObserver
 *
 * Macrotasks:
 * - Lower priority tasks.
 * - Examples:
 *   - setTimeout
 *   - setInterval
 *   - requestAnimationFrame
 *   - I/O callbacks
 *
 * Order:
 * - JS runs all microtasks after each macrotask cycle.
 *
 *
 * 38. Difference between setTimeout, setInterval, and requestAnimationFrame
 * ---------------------------------------------------------------------------
 * setTimeout(fn, delay)
 * - Runs function once after delay.
 * - Accuracy not guaranteed under heavy load.
 *
 * setInterval(fn, delay)
 * - Repeats function every delay.
 * - Can overlap if callback is slow.
 *
 * requestAnimationFrame(fn)
 * - Runs before browser repaints (usually 60 FPS).
 * - Best for animations.
 *
 *
 * 39. What are event handlers and event listeners?
 * --------------------------------------------------
 * Event handler:
 * - Assigned directly.
 * - Example:
 *   element.onclick = function() {};
 * - Only one handler allowed per event type.
 *
 * Event listener:
 * - Using addEventListener().
 * - Allows multiple listeners.
 *
 * Example:
 * element.addEventListener("click", fn);
 *
 *
 * 40. What is event delegation and why is it useful?
 * -----------------------------------------------------
 * Event delegation:
 * - Attach one listener on a parent instead of multiple children.
 *
 * Example:
 * parent.addEventListener("click", e => {
 *   if (e.target.matches(".item")) { ... }
 * });
 *
 * Useful for:
 * - Fewer listeners → better performance
 * - Handling dynamically added elements
 *
 *
 * 41. What is event bubbling and capturing?
 * -------------------------------------------
 * Bubbling:
 * - Event goes from target → up to parents.
 *
 * Capturing:
 * - Event travels from parent → down to target.
 *
 * Order:
 * capturing → target → bubbling
 *
 *
 * 42. Difference between addEventListener options like capture and passive
 * -------------------------------------------------------------------------
 * capture: true
 * - Listener runs in capturing phase.
 *
 * passive: true
 * - Listener will NOT call preventDefault().
 * - Improves scroll performance.
 *
 * Example:
 * element.addEventListener("scroll", fn, { passive: true });
 */


/**
 * 43. What are common array methods (map, filter, reduce, etc.)?
 * ----------------------------------------------------------------
 * map():
 * - Transforms each element and returns a new array.
 * arr.map(x => x * 2)
 *
 * filter():
 * - Returns array of elements that satisfy condition.
 * arr.filter(x => x > 10)
 *
 * reduce():
 * - Accumulates values to a single result.
 * arr.reduce((sum, x) => sum + x, 0)
 *
 * forEach():
 * - Iterates over items (no return).
 *
 * find():
 * - Returns first matching element.
 *
 * some() / every():
 * - Boolean checks over array.
 *
 * includes():
 * - Checks if value exists.
 *
 *
 * 44. What is the difference between slice and splice?
 * -------------------------------------------------------
 * slice(start, end):
 * - Returns a NEW array.
 * - Does NOT modify original.
 *
 * splice(start, count, ...items):
 * - Modifies original array.
 * - Removes/replaces/adds elements.
 *
 * Example:
 * arr.splice(1, 2) // remove 2 items starting at index 1
 *
 *
 * 45. What is Array.from() and Array.of()?
 * -------------------------------------------
 * Array.from():
 * - Converts array-like or iterable objects into arrays.
 * Array.from("abc") → ["a", "b", "c"]
 *
 * Array.of():
 * - Creates array from arguments.
 * Array.of(3) → [3]
 *
 *
 * 46. What are string methods (slice, substring, substr)?
 * ---------------------------------------------------------
 * slice(start, end):
 * - Allows negative indexes.
 * - Extracts part of string.
 *
 * substring(start, end):
 * - Negative values treated as 0.
 * - Swaps arguments if start > end.
 *
 * substr(start, length):
 * - Takes length instead of end.
 * - Deprecated but still functional.
 *
 *
 * 47. What is the difference between forEach and map?
 * ------------------------------------------------------
 * forEach:
 * - Executes callback for each element.
 * - Does NOT return new array.
 *
 * map:
 * - Executes callback and RETURNS new array.
 * - Used for transformations.
 *
 *
 * 48. What is the Set object and how is it different from an array?
 * -------------------------------------------------------------------
 * Set:
 * - Stores unique values only.
 * - No indexing.
 * - Faster lookups for existence.
 *
 * Example:
 * const s = new Set([1,2,2,3]) → {1,2,3}
 *
 * Differences from array:
 * - Cannot access by index
 * - No duplicates
 * - Has methods: add(), delete(), has()
 *
 *
 * 49. What is the Map object and how is it different from an object?
 * --------------------------------------------------------------------
 * Map:
 * - Key–value pairs where keys can be ANY type (objects, functions, etc.)
 * - Preserves insertion order
 * - Size property available
 *
 * Example:
 * const m = new Map();
 * m.set(obj, 10);
 *
 * Differences from object:
 * - Object keys are strings/symbols only
 * - Map is optimized for frequent additions/removals
 * - Map has built-in iteration
 */



/**
 * 50. What is synchronous vs asynchronous code?
 * ------------------------------------------------
 * Synchronous code:
 * - Executes line by line.
 * - Blocks further execution until the current task finishes.
 *
 * Asynchronous code:
 * - Executes without blocking the main thread.
 * - Uses callbacks, Promises, async/await.
 *
 * Example:
 * setTimeout(() => console.log("async"), 1000);
 *
 *
 * 51. What is a callback function?
 * ---------------------------------
 * A callback is a function passed as an argument to another function.
 *
 * Example:
 * function greet(cb) { cb("Hello"); }
 * greet(msg => console.log(msg));
 *
 * Used for async operations: timers, events, XHR.
 *
 *
 * 52. What is callback hell?
 * ----------------------------
 * Nested callbacks that become deeply indented and hard to manage.
 *
 * Example:
 * doA(() => {
 *   doB(() => {
 *     doC(() => {
 *       ...
 *     });
 *   });
 * });
 *
 * Problems:
 * - Hard to read
 * - Hard to debug
 * - Hard to handle errors
 *
 *
 * 53. What are Promises in JavaScript?
 * --------------------------------------
 * Promise = object representing a future value.
 *
 * States:
 * - pending
 * - fulfilled
 * - rejected
 *
 * Example:
 * const p = new Promise((res, rej) => res(10));
 *
 *
 * 54. What are then(), catch(), and finally()?
 * ----------------------------------------------
 * then():
 * - Handles resolved value.
 *
 * catch():
 * - Handles rejected value.
 *
 * finally():
 * - Runs regardless of success/failure.
 *
 * Example:
 * fetchData()
 *   .then(data => ...)
 *   .catch(err => ...)
 *   .finally(() => console.log("done"));
 *
 *
 * 55. What is async/await and how does it simplify Promises?
 * ------------------------------------------------------------
 * async/await allows writing async code like synchronous code.
 *
 * Example:
 * async function run() {
 *   try {
 *     const data = await fetchData();
 *   } catch (e) {}
 * }
 *
 * Benefits:
 * - Cleaner
 * - Easier error handling with try/catch
 * - Avoids chaining multiple .then()
 *
 *
 * 56. What is Promise.all, Promise.race, Promise.any, Promise.allSettled?
 * -------------------------------------------------------------------------
 * Promise.all():
 * - Resolves when ALL promises resolve.
 * - Rejects if ANY promise rejects.
 *
 * Promise.race():
 * - Resolves/rejects with FIRST settled promise.
 *
 * Promise.any():
 * - Resolves with first fulfilled promise.
 * - Ignores rejections (rejects only if all fail).
 *
 * Promise.allSettled():
 * - Waits for all promises to finish.
 * - Returns array of statuses regardless of success/failure.
 *
 *
 * 57. What is fetch() API?
 * ---------------------------
 * fetch() is a promise-based API for making HTTP requests.
 *
 * Example:
 * fetch(url)
 *   .then(res => res.json())
 *   .then(data => ...)
 *
 * Replaces older XHR.
 *
 *
 * 58. What are AJAX and XHR?
 * ----------------------------
 * AJAX:
 * - Asynchronous JavaScript and XML.
 * - Technique to load data without reloading page.
 *
 * XHR (XMLHttpRequest):
 * - Older API for making HTTP requests.
 * - fetch() is modern alternative.
 *
 *
 * 59. What is the difference between microtasks and macrotasks?
 * ---------------------------------------------------------------
 * Microtasks:
 * - Promise callbacks
 * - queueMicrotask()
 * - MutationObserver
 * - Run immediately after current execution, before rendering.
 *
 * Macrotasks:
 * - setTimeout
 * - setInterval
 * - requestAnimationFrame
 * - Events
 *
 * Order:
 * - JS executes microtasks BEFORE macrotasks.
 */



/**
 * 60. What are ES6 modules?
 * ----------------------------
 * ES6 modules allow splitting JavaScript into reusable files.
 *
 * Features:
 * - Import/export syntax
 * - Static structure (checked at compile time)
 * - Always in strict mode
 *
 * Example:
 * export function add() {}
 * import { add } from "./file.js";
 *
 *
 * 61. What is the difference between default and named exports?
 * ---------------------------------------------------------------
 * Named export:
 * export const a = 1;
 * export function fn() {}
 *
 * Import:
 * import { a, fn } from "./file.js";
 *
 * Default export:
 * export default function() {}
 *
 * Import:
 * import something from "./file.js";
 *
 * Differences:
 * - Only one default export allowed.
 * - Named exports must match their names.
 *
 *
 * 62. What is tree shaking?
 * ---------------------------
 * Tree shaking removes unused exports from bundles.
 *
 * Example:
 * // file.js
 * export function used() {}
 * export function unused() {}
 *
 * If only `used()` is imported, bundlers remove `unused()`.
 *
 * Requirements:
 * - ES6 module syntax (static imports)
 *
 *
 * 63. What are IIFEs (Immediately Invoked Function Expressions)?
 * ----------------------------------------------------------------
 * IIFE = function executed immediately after creation.
 *
 * Example:
 * (function() {
 *   console.log("runs instantly");
 * })();
 *
 * Purpose:
 * - Create private scope
 * - Avoid polluting global variables
 *
 *
 * 64. What is the revealing module pattern?
 * --------------------------------------------
 * Pattern that exposes only selected properties/methods while keeping others private.
 *
 * Example:
 * const counter = (function() {
 *   let value = 0;
 *   function add() { value++; }
 *   function get() { return value; }
 *
 *   return { add, get }; // reveal public API
 * })();
 *
 * Purpose:
 * - Encapsulation
 * - Cleaner API
 * - Hiding internal details
 */



/**
 * 65. What is try…catch and how does it work?
 * ----------------------------------------------
 * try…catch handles runtime errors without stopping script execution.
 *
 * Structure:
 * try {
 *   // code that may throw an error
 * } catch (err) {
 *   // handles the error
 * } finally {
 *   // optional, runs always
 * }
 *
 * Notes:
 * - Only catches errors that happen inside the try block.
 * - Does NOT catch syntax errors before execution.
 *
 *
 * 66. What are different types of JavaScript errors?
 * -----------------------------------------------------
 * SyntaxError:
 * - Invalid JavaScript syntax.
 *
 * ReferenceError:
 * - Accessing a variable that doesn’t exist.
 *
 * TypeError:
 * - Using a value of the wrong type (calling non-function, etc.)
 *
 * RangeError:
 * - Invalid numeric range (e.g., recursion too deep).
 *
 * EvalError:
 * - Related to eval() misuse (rare today).
 *
 * URIError:
 * - Incorrect use of encodeURI/decodeURI.
 *
 *
 * 67. What is the stack trace?
 * ------------------------------
 * A stack trace shows the sequence of function calls at the moment an error occurs.
 *
 * Example:
 * Error: Something broke
 *   at c()
 *   at b()
 *   at a()
 *
 * Useful for:
 * - Debugging
 * - Finding where errors originated
 *
 *
 * 68. What is strict mode and why is it used?
 * ----------------------------------------------
 * "use strict"; enables a restricted JavaScript mode.
 *
 * Effects:
 * - Prevents using undeclared variables.
 * - Makes silent errors throw exceptions.
 * - Disallows reserved keywords for variables.
 * - Changes `this` in functions to `undefined` (not global).
 *
 * Benefits:
 * - Cleaner, safer code.
 * - Avoids accidental global variable creation.
 *
 *
 * 69. How do you debug JavaScript using browser devtools?
 * ---------------------------------------------------------
 * Common debugging tools:
 *
 * 1. console.log()
 * - Print values for inspection.
 *
 * 2. Breakpoints
 * - Pause execution at specific lines.
 *
 * 3. Step through code
 * - Step over, step into, step out.
 *
 * 4. Watch expressions
 * - Track variable values during execution.
 *
 * 5. Call stack panel
 * - Inspect call history.
 *
 * 6. Network tab
 * - Debug API requests.
 *
 * 7. Sources tab
 * - Inspect files and set breakpoints.
 *
 * Devtools provide powerful tools to understand code behavior in real-time.
 */


/**
 * 70. What is the DOM (Document Object Model)?
 * ----------------------------------------------
 * DOM is a tree representation of an HTML document.
 * JavaScript uses the DOM to:
 * - Access elements
 * - Modify structure and content
 * - Listen to events
 *
 * Example tree:
 * document → html → body → div → p
 *
 *
 * 71. What are DOM selectors such as getElementById, querySelector?
 * -------------------------------------------------------------------
 * getElementById(id)
 * - Selects one element by ID.
 *
 * getElementsByClassName(class)
 * - Returns live HTMLCollection.
 *
 * getElementsByTagName(tag)
 * - Returns live HTMLCollection.
 *
 * querySelector(selector)
 * - Selects first match of CSS selector.
 *
 * querySelectorAll(selector)
 * - Returns static NodeList of all matches.
 *
 *
 * 72. What are DOM manipulation methods like append, remove, cloneNode?
 * ------------------------------------------------------------------------
 * append(child)
 * - Adds node to end of parent.
 *
 * prepend(child)
 * - Adds at beginning.
 *
 * remove()
 * - Deletes node from DOM.
 *
 * cloneNode(deep)
 * - Creates a copy of an element.
 * - deep=true copies children too.
 *
 * insertBefore(node, reference)
 * replaceChild(newNode, oldNode)
 *
 *
 * 73. Difference between innerHTML, textContent, innerText
 * ----------------------------------------------------------
 * innerHTML:
 * - Parses HTML.
 * - Can insert tags.
 * - Risky (XSS).
 *
 * textContent:
 * - Inserts plain text only.
 * - Fast and safe.
 *
 * innerText:
 * - Similar to textContent but:
 *   - Aware of CSS (ignores hidden elements)
 *   - Slower
 *
 *
 * 74. What is the BOM (Browser Object Model)?
 * ---------------------------------------------
 * BOM represents browser-level objects:
 * - window
 * - location
 * - history
 * - screen
 * - navigator
 *
 * Used to control the browser environment.
 *
 *
 * 75. What are common BOM functions (alert, prompt, confirm)?
 * --------------------------------------------------------------
 * alert(msg)
 * - Shows message dialog.
 *
 * prompt(msg)
 * - Shows input dialog; returns user text.
 *
 * confirm(msg)
 * - Yes/No dialog; returns boolean.
 *
 *
 * 76. What is localStorage vs sessionStorage?
 * ----------------------------------------------
 * localStorage:
 * - Persistent storage (stays after browser close)
 * - 5–10 MB limit
 *
 * sessionStorage:
 * - Cleared when tab closes
 * - Similar API as localStorage
 *
 * Methods:
 * setItem(key, value)
 * getItem(key)
 * removeItem(key)
 * clear()
 *
 *
 * 77. What is the difference between cookies and storage APIs?
 * --------------------------------------------------------------
 * cookies:
 * - Sent to server on every request
 * - Small size (~4KB)
 * - Expiration supported
 * - Can store auth tokens
 *
 * localStorage/sessionStorage:
 * - Not sent to server automatically
 * - Larger size
 * - Used for client-side state
 *
 *
 * 78. What is the history API in browsers?
 * ------------------------------------------
 * Allows manipulation of browser history without reloading.
 *
 * Methods:
 * history.pushState(data, title, url)
 * history.replaceState(data, title, url)
 *
 * Used by SPA frameworks (React Router).
 *
 *
 * 79. What is the fetch API and how does it work?
 * -------------------------------------------------
 * fetch() is a modern Promise-based API for HTTP requests.
 *
 * Example:
 * fetch("/api")
 *   .then(res => res.json())
 *   .then(data => console.log(data));
 *
 * Steps:
 * - fetch returns a Promise
 * - res.json() extracts JSON body
 */



/**
 * 80. What is OOP in JavaScript?
 * --------------------------------
 * OOP (Object-Oriented Programming) in JS is based on:
 * - Objects
 * - Prototypes
 * - Classes (syntactic sugar)
 *
 * JavaScript uses prototypal inheritance instead of classical inheritance.
 *
 * OOP in JS enables:
 * - Modular code
 * - Reusable components
 * - Data + behavior bundling
 *
 *
 * 81. What are the four pillars of OOP?
 * ---------------------------------------
 * Encapsulation:
 * - Bundling data and methods inside objects.
 * - Hiding internal details.
 *
 * Inheritance:
 * - Objects can inherit properties/methods from prototypes or classes.
 *
 * Abstraction:
 * - Showing only essential features and hiding complexity.
 *
 * Polymorphism:
 * - Methods with the same name behave differently in subclasses.
 *
 *
 * 82. What are ES6 classes?
 * ----------------------------
 * ES6 classes are syntactic sugar over JS's prototypal inheritance.
 *
 * Example:
 * class Person {
 *   constructor(name) { this.name = name; }
 *   greet() { console.log("Hi"); }
 * }
 *
 * Features:
 * - Cleaner syntax
 * - Constructor method
 * - Extends for inheritance
 * - Static methods
 *
 *
 * 83. What are class fields and private fields (#)?
 * ----------------------------------------------------
 * Public fields:
 * class Person {
 *   age = 20;  // public instance field
 * }
 *
 * Private fields (#):
 * class Person {
 *   #secret = "hidden";
 *   getSecret() { return this.#secret; }
 * }
 *
 * Private fields:
 * - Not accessible outside the class.
 * - Enforced by JavaScript engine.
 *
 *
 * 84. What is super() in JavaScript classes?
 * --------------------------------------------
 * super() calls the parent class constructor.
 *
 * Example:
 * class Animal { constructor(name) { this.name = name; } }
 *
 * class Dog extends Animal {
 *   constructor(name, breed) {
 *     super(name);  // calls Animal constructor
 *     this.breed = breed;
 *   }
 * }
 *
 * Also used to call parent class methods: super.methodName().
 *
 *
 * 85. What are static methods and properties?
 * ---------------------------------------------
 * Static properties/methods belong to the class itself, not instances.
 *
 * Example:
 * class MathUtil {
 *   static add(a, b) { return a + b; }
 * }
 *
 * Usage:
 * MathUtil.add(2, 3);  // works
 *
 * new MathUtil().add()  // ❌ static methods not available on instances
 *
 * Purpose:
 * - Utility functions
 * - Shared constants
 */



/**
 * 86. What is currying in JavaScript?
 * -------------------------------------
 * Currying transforms a function with multiple arguments
 * into a sequence of functions with one argument each.
 *
 * Example:
 * function add(a) {
 *   return function(b) {
 *     return function(c) {
 *       return a + b + c;
 *     }
 *   }
 * }
 * add(1)(2)(3); // 6
 *
 * Benefits:
 * - Reusability
 * - Function customization
 * - Better functional composition
 *
 *
 * 87. What is partial application?
 * -----------------------------------
 * Partial application pre-fills some function arguments
 * and returns a new function expecting the remaining ones.
 *
 * Example:
 * function multiply(a, b) { return a * b; }
 * const double = multiply.bind(null, 2);
 * double(5); // 10
 *
 * Difference from currying:
 * - Currying transforms function shape.
 * - Partial application preloads some arguments.
 *
 *
 * 88. What is function composition?
 * -----------------------------------
 * Combining multiple functions so the output of one becomes input of another.
 *
 * Example:
 * const compose = (f, g) => x => f(g(x));
 *
 * const add1 = x => x + 1;
 * const double = x => x * 2;
 *
 * compose(add1, double)(5); // add1(double(5)) → 11
 *
 * Purpose:
 * - Build complex logic from small pure functions.
 *
 *
 * 89. What is memoization?
 * ---------------------------
 * Memoization caches function results based on inputs.
 *
 * Example:
 * function memo(fn) {
 *   const cache = {};
 *   return function(x) {
 *     if (cache[x]) return cache[x];
 *     return (cache[x] = fn(x));
 *   };
 * }
 *
 * Benefits:
 * - Avoid recalculating expensive functions
 * - Improves performance
 *
 *
 * 90. What is debounce and throttle?
 * -------------------------------------
 * debounce:
 * - Delays function execution until user stops triggering it.
 * - Useful for search inputs, resize events.
 *
 * Example:
 * const debounce = (fn, delay) => {
 *   let timer;
 *   return (...args) => {
 *     clearTimeout(timer);
 *     timer = setTimeout(() => fn(...args), delay);
 *   };
 * };
 *
 * throttle:
 * - Ensures function runs at most once within a given period.
 * - Useful for scroll events.
 *
 * Example:
 * const throttle = (fn, limit) => {
 *   let lastCall = 0;
 *   return (...args) => {
 *     const now = Date.now();
 *     if (now - lastCall >= limit) {
 *       lastCall = now;
 *       fn(...args);
 *     }
 *   };
 * };
 */



/**
 * 91. What is the difference between deep copy and shallow copy?
 * ----------------------------------------------------------------
 * Shallow copy:
 * - Copies only the first level.
 * - Nested objects remain referenced.
 *
 * Example:
 * const a = { x: 1, y: { z: 2 } };
 * const b = { ...a };  // shallow
 * b.y.z = 99;  // changes a.y.z also
 *
 * Deep copy:
 * - Copies all nested levels.
 * - No shared references.
 *
 * Example:
 * const deep = JSON.parse(JSON.stringify(a));
 *
 *
 * 92. What is JSON and how do you parse/stringify it?
 * ------------------------------------------------------
 * JSON = JavaScript Object Notation (data format).
 *
 * Parse:
 * JSON.parse('{"x":1}');
 *
 * Stringify:
 * JSON.stringify({ x: 1 });
 *
 * Used for:
 * - API data
 * - Storage
 *
 *
 * 93. What is event-driven architecture?
 * -----------------------------------------
 * Architecture where components communicate via events.
 *
 * Flow:
 * - A component emits an event.
 * - Other components listen and react.
 *
 * JS examples:
 * - DOM events
 * - Node.js (EventEmitter)
 * - Publish/subscribe systems
 *
 *
 * 94. What is functional programming in JavaScript?
 * ---------------------------------------------------
 * FP is a style centered on:
 * - Pure functions
 * - No side effects
 * - Immutability
 * - Higher-order functions
 *
 * FP benefits:
 * - Predictable code
 * - Easier testing
 *
 *
 * 95. What are generators and iterators?
 * -----------------------------------------
 * Iterator:
 * - Object with next() method returning { value, done }.
 *
 * Generator:
 * - Function that can pause and resume using yield.
 *
 * Example:
 * function* gen() {
 *   yield 1;
 *   yield 2;
 * }
 * const it = gen();
 * it.next(); // {value:1, done:false}
 *
 *
 * 96. Difference between Symbol.iterator and Symbol.asyncIterator
 * -----------------------------------------------------------------
 * Symbol.iterator:
 * - Enables synchronous iteration (for...of).
 *
 * Symbol.asyncIterator:
 * - Enables async iteration (for await...of).
 *
 * Async iterator returns Promises inside next().
 *
 *
 * 97. What is prototype pollution?
 * -----------------------------------
 * Security vulnerability where attacker modifies Object.prototype.
 *
 * Example:
 * Object.prototype.hacked = true;
 *
 * Consequences:
 * - All objects inherit malicious properties.
 * - Can break logic or cause exploits.
 *
 * Avoid:
 * - Never merge untrusted objects into global objects.
 *
 *
 * 98. What are WeakMap and WeakSet?
 * -----------------------------------
 * WeakMap:
 * - Keys must be objects.
 * - Keys are weakly referenced (garbage-collected if no references).
 *
 * WeakSet:
 * - Stores objects only.
 * - Also weakly referenced.
 *
 * Benefits:
 * - Avoid memory leaks
 *
 *
 * 99. What is BigInt?
 * ----------------------
 * BigInt represents integers larger than Number.MAX_SAFE_INTEGER.
 *
 * Example:
 * const a = 9007199254740993n;
 * const b = 2n;
 * a + b; // BigInt arithmetic
 *
 *
 * 100. What is the difference between eval and Function constructor?
 * -------------------------------------------------------------------
 * eval():
 * - Executes code in the current scope.
 * - Unsafe; exposes risks (XSS).
 *
 * Function constructor:
 * - Creates new function from string.
 * const f = new Function("a", "b", "return a+b");
 *
 * Differences:
 * - Function runs in its own scope.
 * - eval has access to local scope.
 *
 * eval → dangerous  
 * Function constructor → safer but still avoid when possible  
 */



/**
 * 101. How do you optimize JavaScript performance?
 * ---------------------------------------------------
 * Common optimizations:
 * - Minimize DOM manipulation (expensive).
 * - Use event delegation.
 * - Use async/await + Promise APIs efficiently.
 * - Avoid blocking the main thread with heavy loops.
 * - Use memoization for expensive computations.
 * - Use debouncing/throttling for events (scroll, resize).
 * - Cache repeated values (avoid recalculating).
 * - Reduce unnecessary re-renders in frameworks (React).
 * - Bundle optimization → tree shaking, code splitting.
 * - Avoid deep cloning frequently.
 *
 *
 * 102. What is debouncing and throttling?
 * -----------------------------------------
 * Debouncing:
 * - Runs function only after user stops triggering event.
 * - Useful for search, resize.
 *
 * Throttling:
 * - Ensures function runs at fixed intervals.
 * - Useful for scroll, mousemove.
 *
 * Example debouncing:
 * const debounce = (fn, delay) => {
 *   let timer;
 *   return (...args) => {
 *     clearTimeout(timer);
 *     timer = setTimeout(() => fn(...args), delay);
 *   };
 * };
 *
 * Example throttle:
 * const throttle = (fn, limit) => {
 *   let last = 0;
 *   return (...args) => {
 *     const now = Date.now();
 *     if (now - last >= limit) {
 *       last = now;
 *       fn(...args);
 *     }
 *   };
 * };
 *
 *
 * 103. What is the cost of DOM manipulation?
 * --------------------------------------------
 * DOM updates are slow because:
 * - Browser must recalculate layout
 * - Repaint elements
 * - Possibly trigger reflow
 *
 * Minimizing cost:
 * - Batch DOM updates.
 * - Use DocumentFragment for multiple insertions.
 * - Avoid reading DOM layout repeatedly (causes forced reflow).
 * - Cache selectors.
 *
 *
 * 104. What is requestIdleCallback?
 * ------------------------------------
 * requestIdleCallback(fn) schedules a callback when the browser is idle.
 *
 * Example:
 * requestIdleCallback(() => {
 *   heavyTask();
 * });
 *
 * Use when:
 * - You want to run non-urgent tasks without blocking UI.
 *
 * Browser may delay or skip if device is busy, so tasks should be optional or low priority.
 *
 *
 * 105. What is web worker and when should you use it?
 * ------------------------------------------------------
 * Web Worker:
 * - Runs JavaScript in a background thread.
 * - Prevents blocking the main UI thread.
 *
 * Example:
 * const worker = new Worker("worker.js");
 * worker.postMessage(data);
 *
 * Use for:
 * - Heavy calculations
 * - Image processing
 * - Large data parsing
 * - Avoiding UI freezes
 *
 * Workers cannot access DOM directly.
 *
 *
 * 106. How does garbage collection work in JavaScript?
 * ------------------------------------------------------
 * JavaScript uses automatic garbage collection based on reachability.
 *
 * Principle:
 * - If an object cannot be reached from root (global scope), it is garbage-collected.
 *
 * Reachable objects:
 * - Variables currently in scope
 * - Objects referenced by closures
 * - DOM nodes referenced by JS variables
 *
 * Memory leaks happen when:
 * - Unnecessary references remain
 * - Large data stored globally
 * - Detached DOM nodes still referenced
 *
 * GC Algorithm:
 * - Mark & Sweep
 *   - Mark reachable objects
 *   - Sweep away unreachable ones
 */



/**
 * 107. What is XSS (Cross-Site Scripting)?
 * ------------------------------------------
 * XSS is an attack where malicious JavaScript is injected into a webpage
 * and executed in the victim's browser.
 *
 * Causes:
 * - Inserting unescaped user input into HTML (innerHTML)
 * - Unsanitized URL/query parameters
 * - Insecure templates
 *
 * Effects:
 * - Stealing cookies
 * - Session hijacking
 * - Redirecting users
 *
 * Prevention:
 * - Never inject raw HTML from users
 * - Use textContent instead of innerHTML
 * - Sanitize input/output
 * - Enable Content Security Policy (CSP)
 *
 *
 * 108. What is CSRF and how does JavaScript relate to it?
 * ----------------------------------------------------------
 * CSRF (Cross-Site Request Forgery):
 * - Attacker tricks the user’s browser into performing an action
 *   on another site where they're authenticated.
 *
 * Example:
 * If user is logged in on bank.com,
 * attacker makes browser send a POST request to transfer money.
 *
 * JavaScript relation:
 * - CSRF happens because browser automatically includes cookies.
 * - Not caused by JS but blocked using:
 *   - CSRF tokens
 *   - SameSite cookies
 *   - Requiring custom headers (e.g., X-CSRF-Token)
 *
 *
 * 109. What is CORS (Cross-Origin Resource Sharing)?
 * -----------------------------------------------------
 * CORS controls whether a web page can make requests to a different domain.
 *
 * Browser blocks cross-origin requests by default.
 *
 * Server must send headers:
 * Access-Control-Allow-Origin: https://example.com
 * Access-Control-Allow-Methods: GET, POST
 *
 * Purpose:
 * - Prevent unauthorized cross-site requests
 * - Allow safe API access between domains
 *
 *
 * 110. What is same-origin policy?
 * ----------------------------------
 * Same-origin policy restricts interactions between documents from different origins.
 *
 * Two URLs are same-origin if protocol + domain + port match.
 *
 * Prevents:
 * - Accessing DOM of another site
 * - Reading responses from another site
 *
 * Allows:
 * - Form submissions
 * - Script/image loading
 *
 *
 * 111. What are secure coding practices in JavaScript?
 * ------------------------------------------------------
 * Common best practices:
 *
 * 1. Avoid innerHTML
 * - Use textContent unless necessary.
 *
 * 2. Validate and sanitize all input
 * - Prevent XSS/DOM injection.
 *
 * 3. Use HTTPS always
 * - Prevent MITM attacks.
 *
 * 4. Use Content Security Policy (CSP)
 * - Restrict where scripts can load from.
 *
 * 5. Avoid eval() and Function()
 * - Can execute malicious code.
 *
 * 6. Use SameSite cookies for CSRF protection
 *
 * 7. Escape output in HTML, URLs, JS context
 *
 * 8. Limit sensitive data exposure
 * - Do not store secrets in frontend.
 *
 * 9. Keep dependencies updated
 * - Avoid known vulnerabilities.
 *
 * 10. Use strict mode
 * - Catches unsafe operations.
 */




/**
 * 112. What is the JavaScript engine (V8, SpiderMonkey)?
 * --------------------------------------------------------
 * A JavaScript engine reads, optimizes, and executes JavaScript code.
 *
 * Examples:
 * - V8 → Chrome, Node.js
 * - SpiderMonkey → Firefox
 * - JavaScriptCore → Safari
 *
 * Engine components:
 * - Parser (creates AST)
 * - Interpreter (runs code)
 * - JIT compiler (optimizes code)
 * - Garbage collector
 *
 *
 * 113. What is JIT (Just-in-Time) compilation?
 * ----------------------------------------------
 * JIT compiles JavaScript during execution, not ahead of time.
 *
 * Flow:
 * - Interpreter runs code and gathers usage info.
 * - Hot code paths are compiled into optimized machine code.
 * - If assumptions fail, engine de-optimizes and falls back.
 *
 * Benefits:
 * - Faster performance
 * - Dynamic optimization based on real usage
 *
 *
 * 114. What are hidden classes and inline caching?
 * ---------------------------------------------------
 * Hidden classes:
 * - Internal structures engines use to store object shapes.
 * - Similar to classes in traditional OOP but dynamic.
 *
 * Example:
 * const obj = { x: 1, y: 2 };
 * Engine assigns a hidden class like C1.
 *
 * If properties are added in different order, hidden classes differ → slower.
 *
 * Inline caching:
 * - Optimization where engine caches the result of property lookups.
 *
 * Example:
 * obj.x
 * After first access, engine stores where “x” is located.
 *
 * Benefits:
 * - Speeds up repeated operations
 *
 *
 * 115. What is memory heap and call stack?
 * ------------------------------------------
 * Memory heap:
 * - Stores objects, functions, closures.
 * - Large, high-flexibility memory area.
 *
 * Call stack:
 * - Stores function execution frames.
 * - Follows LIFO order.
 *
 * Example:
 * a() → b() → c() → pop → pop → pop
 *
 *
 * 116. What is the execution context in JavaScript?
 * ----------------------------------------------------
 * Execution context = environment in which JS code is evaluated.
 *
 * Types:
 * - Global execution context
 * - Function execution context
 * - Eval execution context
 *
 * Contains:
 * - Variable environment
 * - Lexical environment
 * - this binding
 *
 *
 * 117. Difference between global and function execution context?
 * ----------------------------------------------------------------
 * Global execution context:
 * - Created once when script starts.
 * - window/globalThis is this.
 * - Contains global variables and functions.
 *
 * Function execution context:
 * - Created on each function call.
 * - Has its own variable environment.
 * - this depends on call style.
 *
 *
 * 118. What are creation and execution phases?
 * ----------------------------------------------
 * Creation phase:
 * - Creates variable environment
 * - Creates lexical environment
 * - Sets this binding
 * - Hoists variables and functions
 *
 * Execution phase:
 * - Executes code line by line
 * - Assigns values to variables
 * - Performs operations
 *
 *
 * 119. How does JavaScript garbage collection work?
 * ---------------------------------------------------
 * JS uses reachability-based garbage collection.
 *
 * Algorithm:
 * - Mark & Sweep:
 *   - Mark reachable objects (from global, closures, call stack)
 *   - Sweep unreachable ones (free memory)
 *
 * Memory leaks occur when:
 * - Unused references remain
 * - Detached DOM nodes still referenced
 *
 *
 * 120. What is tail-call optimization?
 * ---------------------------------------
 * Tail-call optimization (TCO) optimizes recursive functions
 * when the final action of a function is returning another function call.
 *
 * Example:
 * function sum(n, acc = 0) {
 *   if (n === 0) return acc;
 *   return sum(n - 1, acc + n); // tail call
 * }
 *
 * Benefits:
 * - Prevents stack overflow
 * - Reuses the same stack frame
 *
 * TCO is part of ES6 spec but not widely implemented in browsers.
 */


