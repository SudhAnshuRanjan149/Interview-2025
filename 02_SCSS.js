/*

MASTER SCSS / SASS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS — From Basic → Advanced — Section Wise)

========================================================
SECTION 1 — SCSS BASICS & CORE CONCEPTS
========================================================
1. What is SCSS/SASS and how does it improve plain CSS?  
2. What is the difference between SASS (.sass) and SCSS (.scss) syntax?  
3. How do you install and compile SCSS into CSS?  
4. What is a preprocessor in CSS?  
5. What are the benefits of using SCSS in large-scale projects?  
6. What is nesting in SCSS and how should it be used responsibly?  
7. What are variables in SCSS?  
8. What naming conventions are used for variables?  
9. What are partials in SCSS and how do you use @import?  
10. What is the difference between @use and @import in modern SCSS?  

========================================================
SECTION 2 — VARIABLES, MIXINS & FUNCTIONS
========================================================
11. What are mixins in SCSS and how do you define them?  
12. What is the @include directive?  
13. What are SCSS functions and how do they work?  
14. What is the difference between SCSS mixins and functions?  
15. What is the @mixin argument pattern?  
16. What are default arguments in mixins?  
17. What is the @return statement in functions?  
18. How do you use SCSS lists and maps?  
19. What is the map-get() function?  
20. What is the difference between list functions and map functions?  

========================================================
SECTION 3 — CONTROL DIRECTIVES & LOGIC
========================================================
21. What is @if, @else, and @else if in SCSS?  
22. What is @for and how does loop iteration work?  
23. What is @each and how does it differ from @for?  
24. What is @while and when should it be used?  
25. What are conditional mixins?  
26. How do loops help generate repetitive CSS (e.g., grid systems)?  

========================================================
SECTION 4 — NESTING & SELECTOR MANAGEMENT
========================================================
27. What is deep nesting and why should it be avoided?  
28. What is the parent selector (&) in SCSS?  
29. How do you create nested pseudo-classes with &?  
30. How do you reference child selectors using nesting?  
31. What are placeholder selectors (%placeholder)?  
32. What is @extend and how does it work?  
33. What are the drawbacks of using @extend?  
34. What is selector inheritance in SCSS?  

========================================================
SECTION 5 — MODULAR SCSS STRUCTURE
========================================================
35. What is the 7-1 pattern in SCSS architecture?  
36. What are base, components, layout, utilities, and abstracts folders?  
37. How do you structure a scalable SCSS codebase?  
38. What is the purpose of abstracts/_variables.scss and abstracts/_mixins.scss?  
39. What is the difference between partials and modules?  
40. How do you manage SCSS imports for large projects?  

========================================================
SECTION 6 — BUILT-IN SASS MODULES
========================================================
41. What are SASS modules and why were they introduced?  
42. How do you use the @use rule with namespace prefixes?  
43. What are the built-in SASS modules (math, color, string, list, map, selector)?  
44. What is the math.div() function and why is division deprecated?  
45. How do you adjust color using color functions (darken, lighten, mix)?  
46. What is the difference between lighten() vs adjust-color()?  
47. What does the selector module do?  

========================================================
SECTION 7 — ADVANCED SCSS CONCEPTS
========================================================
48. What is interpolation (#{} syntax) in SCSS?  
49. How do you dynamically generate class names using interpolation?  
50. What are silent classes and how are they used?  
51. What are placeholders (%) and how do they differ from mixins?  
52. What is an SCSS map and how can you use it for themes?  
53. What is the difference between extend inheritance vs mixin reusability?  
54. How do you create responsive mixins in SCSS?  
55. What are breakpoint mixins and how are they used?  
56. What are theme maps in SCSS and how do they support dark mode?  

========================================================
SECTION 8 — PERFORMANCE & MAINTAINABILITY
========================================================
57. What are common SCSS anti-patterns to avoid?  
58. How do you avoid nesting more than 3–4 levels deep?  
59. How does SCSS compilation affect CSS size?  
60. What is the impact of @extend on CSS performance?  
61. What is the difference between DRY (Don't Repeat Yourself) and WET (Write Everything Twice) in SCSS?  
62. How do you modularize SCSS to improve maintainability?  
63. How do you lint SCSS using stylelint or sass-lint?  

========================================================
SECTION 9 — SCSS IN REAL-WORLD FRONTEND WORKFLOWS
========================================================
64. How do you integrate SCSS with React (CRA, Vite, Next.js)?  
65. How do you integrate SCSS with Angular or Vue?  
66. What is CSS Modules with SCSS?  
67. What is the difference between SCSS and styled-components?  
68. How does SCSS work with Webpack or Vite bundling?  
69. What is the role of node-sass and sass (Dart Sass)?  
70. How do you enable source maps for SCSS?  

========================================================
SECTION 10 — MIGRATION, TOOLING & COMPATIBILITY
========================================================
71. What is the difference between Ruby Sass, LibSass, and Dart Sass?  
72. Why was LibSass deprecated and what should developers use now?  
73. What is the migration path from @import to @use and @forward?  
74. How do you set up a SCSS build pipeline?  
75. What is the purpose of postcss alongside SCSS?  
76. How do you use autoprefixer with SCSS output?  

========================================================
SECTION 11 — SECURITY & BEST PRACTICES
========================================================
77. What security considerations exist in SCSS (e.g., user input in interpolation)?  
78. What are best practices for structuring SCSS variables?  
79. What are naming conventions like BEM and how do they work with SCSS?  
80. How do you avoid CSS specificity issues using SCSS techniques?  

========================================================
SECTION 12 — PRACTICAL & SCENARIO-BASED QUESTIONS
========================================================
81. How would you create a theme system using SCSS?  
82. How would you generate utility classes from SCSS maps?  
83. How would you implement a grid system using SCSS loops?  
84. How would you organize SCSS in a large enterprise application?  
85. How would you write SCSS that supports dark mode?  
86. How do you create responsive typography using SCSS functions?  
87. How do you debug SCSS compilation issues?  
88. How do you optimize SCSS for production?  

========================================================

*/