/*

MASTER TYPESCRIPT INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — TYPESCRIPT BASICS & INTRODUCTION
========================================================
1. What is TypeScript and how is it different from JavaScript?  
2. Why do developers prefer TypeScript over JavaScript?  
3. What is static typing?  
4. What is a TypeScript compiler (tsc)?  
5. What is the role of tsconfig.json?  
6. What are TypeScript's strict mode options?  
7. What is type inference?  
8. What is structural typing (duck typing)?  
9. How do you compile TypeScript to JavaScript?  
10. What JavaScript versions does TypeScript target?

========================================================
SECTION 2 — BASIC TYPES & TYPE SYSTEM
========================================================
11. What are primitive types in TypeScript?  
12. How do you use union types?  
13. What are literal types?  
14. What is the difference between unknown and any?  
15. What is never type used for?  
16. What is void type?  
17. What is type narrowing?  
18. How do you use type guards?  
19. What is optional chaining in TypeScript?  
20. What are non-null assertions?

========================================================
SECTION 3 — INTERFACES & TYPE ALIASES
========================================================
21. What is an interface in TypeScript?  
22. What is a type alias?  
23. What is the difference between interface and type?  
24. What are readonly properties in interfaces?  
25. What are optional properties in interfaces?  
26. How do you extend interfaces?  
27. What is declaration merging in TypeScript?  
28. What are index signatures?  
29. When to use interface vs type alias?  
30. What is excess property checking?

========================================================
SECTION 4 — FUNCTIONS & ADVANCED TYPING
========================================================
31. How do you type functions in TypeScript?  
32. What are function overloads?  
33. What are generics?  
34. How do you define generic functions?  
35. What are generic constraints?  
36. What are default generic types?  
37. What is keyof operator?  
38. What is typeof in TypeScript?  
39. What is infer keyword?  
40. What is conditional typing?

========================================================
SECTION 5 — CLASSES, OOP & DECORATORS
========================================================
41. What are classes in TypeScript?  
42. What are access modifiers (public, private, protected)?  
43. What are readonly class members?  
44. What are abstract classes?  
45. How do you implement interfaces in classes?  
46. What are static properties and methods?  
47. What are decorators in TypeScript?  
48. What are class decorators?  
49. What are method and property decorators?  
50. How do experimental decorators work?

========================================================
SECTION 6 — MODULES, NAMESPACES & COMPILATION
========================================================
51. What is the difference between modules and namespaces?  
52. How do you use ES modules in TypeScript?  
53. What are import and export in TypeScript?  
54. What is module resolution in TypeScript?  
55. What is baseUrl and paths in tsconfig.json?  
56. What is isolatedModules option?  
57. How do you compile TypeScript in a monorepo?  
58. What is declaration file (.d.ts)?  
59. What is DefinitelyTyped (@types/* packages)?  
60. What is composite project and project references?

========================================================
SECTION 7 — TYPESCRIPT WITH REACT & NEXT.JS
========================================================
61. How do you type React components with TypeScript?  
62. What is the type for React props?  
63. What is the type for React state?  
64. How do you type custom hooks?  
65. What is the difference between FC and function components?  
66. How do you type events (MouseEvent, ChangeEvent)?  
67. How do you type context in React?  
68. What is JSX.Element vs ReactNode?  
69. How do you type Next.js server components?  
70. How do you type Next.js API routes?

========================================================
SECTION 8 — UTILITY TYPES
========================================================
71. What is Partial<T>?  
72. What is Required<T>?  
73. What is Readonly<T>?  
74. What is Pick<T, K>?  
75. What is Omit<T, K>?  
76. What is Record<K, T>?  
77. What is ReturnType<T>?  
78. What is InstanceType<T>?  
79. What is NonNullable<T>?  
80. How do you create custom utility types?

========================================================
SECTION 9 — ERROR HANDLING, TOOLING & BEST PRACTICES
========================================================
81. How do you handle errors in TypeScript?  
82. How do you enable strict type checking?  
83. How do you avoid using "any"?  
84. What are best practices for TypeScript folder structure?  
85. How do you use ESLint with TypeScript?  
86. How do you use Prettier with TypeScript?  
87. How do you debug TypeScript in VSCode?  
88. How do you ensure type safety when using 3rd-party libraries?  
89. What is a discriminated union?  
90. What are some common anti-patterns in TypeScript?

========================================================
SECTION 10 — ADVANCED TYPESCRIPT CONCEPTS
========================================================
91. What is mapped typing?  
92. What are template literal types?  
93. What is index access type (T[K])?  
94. What are recursive types?  
95. What are advanced conditional types?  
96. What is readonly tuple type?  
97. What is tuple inference?  
98. What is opaque type or branded type?  
99. What is type-level programming?  
100. How do you optimize TypeScript compilation for large projects?

========================================================

*/



/**
SECTION 1 — TYPESCRIPT BASICS & INTRODUCTION
============================================
*/

//////////////////////////////////////////////////
// 1. What is TypeScript and how is it different from JavaScript?
//////////////////////////////////////////////////

/**
TypeScript is a superset of JavaScript that adds a static type system and additional tooling on top of plain JS.

Key points:
- Superset:
  - Every valid JavaScript file is also valid TypeScript (possibly with some type errors, but syntactically valid).
  - You can gradually adopt it in an existing JS codebase.

- Main differences:
  - TypeScript adds:
    - Static typing (types for variables, parameters, return values).
    - Interfaces, generics, enums, advanced type operators.
    - Compile-time checks (errors before running the code).
  - JavaScript:
    - Dynamically typed.
    - Type errors only appear at runtime (if at all).

- Compilation step:
  - TypeScript is not directly executed by the browser or Node.
  - It must be compiled/transpiled to JavaScript.
  - The compiler (tsc) removes types and outputs clean JS.

- Tooling benefits:
  - Better IntelliSense/autocomplete.
  - Safer refactoring (types catch breakages).
  - Easier navigation (go-to-definition, find usages).
  - Stronger contracts between modules/APIs.

- Runtime behavior:
  - TypeScript types do not exist at runtime.
  - The generated JavaScript runs exactly like JS you would write manually (modulo downlevel transforms like for async/await, etc. based on target).

- Ecosystem:
  - Works seamlessly with all JS libraries.
  - For untyped libraries, you can use @types packages or write your own declaration files.

In short:
TypeScript = JavaScript + types + tooling.
You still ship JavaScript, but with far fewer bugs and much better DX.
*/


//////////////////////////////////////////////////
// 2. Why do developers prefer TypeScript over JavaScript?
//////////////////////////////////////////////////

/**
Developers often choose TypeScript because it makes large and complex applications safer and easier to maintain.

Main reasons:
1) Early error detection:
   - Type errors are caught at compile-time instead of in production.
   - Mis-typed properties, wrong function arguments, incorrect return values are flagged by the compiler.

2) Better IDE support:
   - Types enable rich IntelliSense/autocomplete.
   - Go-to-definition, find references, and renaming are more reliable.
   - Documentation and types show up inline, improving productivity.

3) Refactoring confidence:
   - When changing APIs, renaming functions, or restructuring modules, the compiler reveals all broken call sites.
   - Safer long-term evolution of the codebase.

4) Improved readability and documentation:
   - Types act as executable documentation.
   - Function signatures and interfaces clearly express intent.
   - Easier for new developers to understand the code.

5) Large-scale application benefits:
   - For big teams, types standardize contracts between modules and services.
   - Reduces “what does this function accept / return?” questions.
   - Encourages better architecture and domain modeling.

6) Advanced type features:
   - Generics, union types, discriminated unions, template literal types, etc.
   - Let you express very precise constraints (e.g., “this function only accepts a subset of keys”).

7) Gradual adoption:
   - You can start with a .js codebase and migrate file-by-file to .ts.
   - Mixed JS/TS projects are supported.

8) Ecosystem momentum:
   - Many modern frameworks (Angular, NestJS, large React codebases) are largely TS-first.
   - Most popular libraries ship TypeScript types.

Overall:
TypeScript helps prevent bugs, improves DX, and scales much better for large/frontline production systems than plain JS.
*/


//////////////////////////////////////////////////
// 3. What is static typing?
//////////////////////////////////////////////////

/**
Static typing means that variable types are known and checked at compile-time, not at runtime.

Concept:
- In statically typed systems:
  - The type of every expression is determined before the program runs.
  - The compiler enforces that operations on values respect their types.
  - Type errors are surfaced as compile-time errors.

In TypeScript:
- You can explicitly annotate types:
  - let count: number = 0;
  - function greet(name: string): string { ... }

- Or rely on type inference:
  - let name = "John"; // inferred as string

Benefits:
1) Early feedback:
   - Incorrect operations (like adding number + string where not allowed) are caught before deployment.

2) Self-documentation:
   - Types express the data shape.
   - Easier to understand function contracts.

3) Tooling:
   - IDEs know the shape of objects and available methods.

4) Safer refactoring:
   - Changing a type signature reveals all affected code.

Contrast with dynamic typing:
- JavaScript:
  - Types exist only at runtime.
  - You can assign any kind of value to any variable.
  - Errors may appear only when executing that code path.

TypeScript’s static type system:
- Is structural (based on shape).
- Is erased at compile-time (no runtime overhead).
- Is optional and gradual; you can loosen types when needed (any, unknown).
*/


//////////////////////////////////////////////////
// 4. What is a TypeScript compiler (tsc)?
//////////////////////////////////////////////////

/**
The TypeScript compiler (tsc) is the CLI tool that:
- Parses your .ts / .tsx files.
- Runs type checking.
- Transpiles TypeScript into plain JavaScript.

Key responsibilities:
1) Type checking:
   - Reads your code and associated declaration files.
   - Validates that types are used correctly.
   - Emits compile-time errors if something is wrong.

2) Emitting JavaScript:
   - Strips all type annotations.
   - Converts newer syntax (depending on target) to older JS if needed:
     - e.g., converts optional chaining, nullish coalescing, async/await, classes, etc.

3) Using configuration:
   - Controlled via tsconfig.json.
   - Options include:
     - "target": JS output version (ES5, ES6, ESNext).
     - "module": module system (commonjs, esnext).
     - "strict": strict type checks.
     - "outDir": output directory.
     - "rootDir": source directory.
     - "baseUrl" and "paths": module resolution.

Usage:
- Globally or locally installed via npm:
  - npx tsc
  - npx tsc --watch
- Common commands:
  - tsc              // compiles according to tsconfig.json
  - tsc file.ts      // single file compile
  - tsc --noEmit     // type-check only

Integration:
- Often integrated into build systems:
  - Webpack, esbuild, Vite, Rollup via loaders/plugins.
- CI pipelines:
  - Run tsc --noEmit to enforce type safety.

In short:
tsc is the engine that turns TypeScript into JavaScript while enforcing type rules.
*/


//////////////////////////////////////////////////
// 5. What is the role of tsconfig.json?
//////////////////////////////////////////////////

/**
tsconfig.json is the configuration file that tells the TypeScript compiler:
- What files to include/exclude.
- Which language/emit options to use.
- How strict the type checking should be.

Key sections:
1) compilerOptions:
   - "target": output JS version (e.g., "ES5", "ES2017", "ESNext").
   - "module": module format ("commonjs", "esnext", etc.).
   - "strict": enable all strict type-checking options.
   - "outDir": where compiled JS files go.
   - "rootDir": where source TS files live.
   - "jsx": how to handle JSX ("react-jsx", "preserve").
   - "baseUrl" and "paths": custom module resolution.
   - "moduleResolution": "node", "bundler", etc.
   - "noImplicitAny": disallow implicit any.
   - "esModuleInterop": smooth default import behavior for CommonJS.

2) include / exclude:
   - "include": which folders/globs to compile (e.g., ["src"]).
   - "exclude": which to skip (e.g., ["node_modules", "dist"]).

3) files:
   - Explicit list of files, rarely used for large projects.

4) references:
   - For project references / composite projects in monorepos.

Example:
- With tsconfig.json in place, running tsc without arguments uses it automatically.

Benefits:
- Central place for project-wide compiler settings.
- Different tsconfigs for different builds (e.g., tsconfig.build.json).
- Makes builds reproducible and consistent across environments.
*/


//////////////////////////////////////////////////
// 6. What are TypeScript's strict mode options?
//////////////////////////////////////////////////

/**
Strict mode in TypeScript is a set of compiler options that make type checking much stricter, catching more potential bugs.

The master switch:
- "strict": true
  - Enables a group of strict options.

Main options (commonly included under strict):
1) noImplicitAny:
   - Disallow variables / parameters that implicitly become any.
   - Forces you to add types or rely on inference.
   - Prevents silent “anything goes” situations.

2) strictNullChecks:
   - null and undefined are NOT assignable to other types by default.
   - You must explicitly allow them via union types (e.g., string | null).
   - Eliminates many runtime null/undefined errors.

3) strictFunctionTypes:
   - Checks function parameter bivariance more strictly.
   - Prevents assigning functions with incompatible signatures.

4) strictBindCallApply:
   - Type-checks usage of Function.prototype.bind/call/apply.

5) strictPropertyInitialization:
   - In classes, ensures that non-optional properties are initialized
     in the constructor or marked as definitely assigned with !.

6) noImplicitThis:
   - Disallows this having type any.
   - Encourages you to properly type this in functions/methods.

7) alwaysStrict:
   - Emits "use strict" in JS output.

Additional related options:
- noImplicitReturns:
  - Forces every code path in a function to return a value.
- noUnusedLocals / noUnusedParameters:
  - Warns about dead code / unused variables.

Best practice:
- Turn "strict": true on for new projects.
- For legacy code, gradually turn on strict options one by one.
*/


//////////////////////////////////////////////////
// 7. What is type inference?
//////////////////////////////////////////////////

/**
Type inference is TypeScript’s ability to automatically determine the type of a variable or expression without explicit annotations.

Examples:
- Variable initialization:
  - let x = 5;        // inferred as number
  - const name = "A"; // inferred as "A" (string literal) or string depending on context.

- Function return type:
  - function add(a: number, b: number) {
      return a + b;
    }
    // return type inferred as number.

- Contextual typing:
  - const handler = (event) => { ... }
    // In certain contexts (like event listeners), TypeScript infers event type.

Benefits:
1) Less boilerplate:
   - You don’t need to annotate everything.
   - Clean code with strong types.

2) Increased safety:
   - Even without annotations, you still get type checks based on inferred types.

3) Literal inference:
   - const user = { name: "John", age: 30 };
     // user: { name: string; age: number }

   - const arr = [1, 2, 3];
     // number[]

Control:
- const vs let:
  - const tends to produce narrower (literal) types.
- as const:
  - Makes literals fully readonly and narrows as much as possible.

Important:
- If TypeScript cannot infer a type, it may fall back to any (depending on noImplicitAny).
- Good inference reduces the need for explicit types, but for public APIs it’s often better to annotate anyway.
*/


//////////////////////////////////////////////////
// 8. What is structural typing (duck typing)?
//////////////////////////////////////////////////

/**
Structural typing means types are compatible based on their shape (properties), not by their explicit name or declaration.

TypeScript’s type system is structural:
- Two types are considered compatible if their members match, regardless of how/where they were declared.

Example:
* /

type Person = {
  name: string;
  age: number;
};

type User = {
  name: string;
  age: number;
};

function printPerson(p: Person) {
  console.log(p.name, p.age);
}

const user: User = { name: "Alice", age: 25 };

// This is allowed because User has the same structure as Person
printPerson(user);

/**
Here, Person and User are structurally equivalent:
- Same properties with same types.
- No nominal/name-based constraint.

Key properties:
- Extra property checks:
  - When assigning object literals, TypeScript does excess property checking
    which can reject objects with extra unexpected properties.
- Assigning variables:
  - When assigning one variable typed as A to B, TS checks if A has at least
    the required properties of B.

Duck typing idea:
- “If it walks like a duck and quacks like a duck, treat it as a duck.”
- You don’t care about the declared type name, only that it has the required members.

Implications:
- Easier integration with plain JS objects.
- Very flexible, but can mask some bugs if you rely on shape compatibility too broadly.
- Discriminated unions and branded types are sometimes used to approximate nominal typing when needed.
*/


//////////////////////////////////////////////////
// 9. How do you compile TypeScript to JavaScript?
//////////////////////////////////////////////////

/**
Compiling TypeScript to JavaScript is done via the TypeScript compiler or other build tools.

Core ways:
1) Using tsc directly:
   - Install TypeScript:
     - npm install --save-dev typescript
   - Create tsconfig.json:
     - npx tsc --init
   - Compile:
     - npx tsc         // uses tsconfig.json
     - npx tsc --watch // watch mode for development
   - Output:
     - .js files in outDir (e.g., /dist) based on config.

2) Single-file compile:
   - npx tsc src/index.ts
   - Outputs src/index.js (unless configured otherwise).

3) Using bundlers:
   - Webpack + ts-loader or babel-loader with @babel/preset-typescript.
   - Vite, esbuild, Rollup with TypeScript support.
   - These tools:
     - Compile TS → JS.
     - Bundle modules.
     - Optionally run type checking via a separate tsc or fork-ts-checker-webpack plugin.

4) Type-check only:
   - npx tsc --noEmit
   - Useful in CI to enforce type safety while using some other tool for transpilation.

5) Targeting different JS versions:
   - In tsconfig.json:
     - "target": "ES5" | "ES2015" | "ES2017" | "ESNext"
   - TypeScript downlevels features as needed for older targets.

Common pipeline:
- src/*.ts or src/*.tsx
- tsc (or bundler) → dist/*.js
- Node.js or browser consumes the JS output.

Key point:
- Types only exist at compile time; they are removed in the generated JavaScript.
*/


//////////////////////////////////////////////////
// 10. What JavaScript versions does TypeScript target?
//////////////////////////////////////////////////

/**
TypeScript can target multiple JavaScript versions using the "target" compiler option.

Supported targets (commonly used):
- "ES3"     (very old, rarely used now)
- "ES5"     (widest browser compatibility, older IE)
- "ES6" / "ES2015"
- "ES2016"
- "ES2017"
- "ES2018"
- "ES2019"
- "ES2020"
- "ES2021"
- "ES2022"
- "ESNext" (latest JS features, no downlevel transformations for most syntax)

What target controls:
- Syntax transformations:
  - For example, if you target "ES5":
    - class → function + prototype
    - async/await → generator-based helpers + Promises
    - optional chaining → series of checks
  - For higher targets, less transformation; more “native” modern JS.

- Library typings (lib option):
  - Often used with target to include correct ambient types:
    - e.g., "lib": ["DOM", "ES2017"]

How to set:
- tsconfig.json:
  {
    "compilerOptions": {
      "target": "ES2017",
      "module": "commonjs"
    }
  }

Best practices:
- For Node.js:
  - Choose a target that matches the runtime support (e.g., ES2019+ for modern Node).
- For browsers:
  - Use ES2015+ with appropriate bundler and transpilation strategy.
- For libraries:
  - Often compile to a lower target (e.g., ES2015) for maximal compatibility,
    or emit multiple builds with different targets.

In summary:
TypeScript lets you write code with modern syntax and types, then compiles down to the JS version required by your environment.
*/



