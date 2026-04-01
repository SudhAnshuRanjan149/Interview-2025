/*
==============================================
SCSS INTERVIEW QUESTIONS - MOST ASKED
==============================================

BASICS & FUNDAMENTALS
==============================================
1. What is SCSS? How is it different from CSS and SASS?
2. What are the advantages of using SCSS over regular CSS?
3. Explain the two syntaxes in Sass (.sass vs .scss)
4. How do you compile SCSS to CSS?
5. What is the difference between @import and @use in SCSS?

VARIABLES
==============================================
6. How do you declare and use variables in SCSS?
7. What is variable scope in SCSS?
8. Can you reassign variables in SCSS? Explain !default flag
9. What are global vs local variables in SCSS?
10. How do CSS custom properties differ from SCSS variables?

NESTING
==============================================
11. How does nesting work in SCSS? What are its benefits?
12. What is the parent selector (&) and how is it used?
13. What are the drawbacks of deep nesting?
14. How do you nest media queries in SCSS?
15. Explain nested properties in SCSS

MIXINS
==============================================
16. What are mixins in SCSS? How do you create and use them?
17. How do you pass arguments to mixins?
18. What are default parameter values in mixins?
19. Explain variable arguments (@content) in mixins
20. What's the difference between @mixin and @function?

FUNCTIONS
==============================================
21. What are built-in functions in SCSS? Name some common ones
22. How do you create custom functions in SCSS?
23. What's the difference between mixins and functions?
24. Explain color manipulation functions in SCSS
25. What are math functions in SCSS?

INHERITANCE & EXTEND
==============================================
26. What is @extend in SCSS? How does it work?
27. What's the difference between @extend and @mixin?
28. What are placeholder selectors (%) in SCSS?
29. What are the performance implications of @extend?
30. When should you use @extend vs @mixin?

PARTIALS & IMPORTS
==============================================
31. What are partials in SCSS?
32. How do you name and import partial files?
33. What's the difference between @import and @use?
34. Explain @forward in SCSS
35. How do you organize SCSS file structure in large projects?

OPERATORS
==============================================
36. What operators are available in SCSS?
37. How do you perform mathematical operations in SCSS?
38. What are comparison operators in SCSS?
39. Explain string concatenation in SCSS
40. How do you handle units in SCSS calculations?

CONTROL DIRECTIVES
==============================================
41. What is @if directive in SCSS?
42. How do you use @else and @else if in SCSS?
43. What is @for loop in SCSS? Explain through and to
44. What is @each loop in SCSS?
45. What is @while loop in SCSS?

MAPS & LISTS
==============================================
46. What are lists in SCSS? How do you work with them?
47. What are maps in SCSS? How are they different from lists?
48. How do you access map values?
49. What are common map functions in SCSS?
50. How do you iterate over maps?

ADVANCED CONCEPTS
==============================================
51. What is interpolation (#{}) in SCSS?
52. How do you use @at-root directive?
53. What is @debug, @warn, and @error in SCSS?
54. Explain !important in SCSS context
55. What are CSS modules and how do they relate to SCSS?

BEST PRACTICES
==============================================
56. What are SCSS naming conventions (BEM, SMACSS)?
57. How do you structure SCSS for maintainability?
58. What's the 7-1 pattern in SCSS architecture?
59. How do you avoid specificity issues in SCSS?
60. What are performance best practices in SCSS?

RESPONSIVE DESIGN
==============================================
61. How do you create responsive mixins in SCSS?
62. What's the best way to handle breakpoints in SCSS?
63. How do you manage media queries in SCSS?
64. Explain mobile-first vs desktop-first approach in SCSS
65. How do you create fluid typography with SCSS?

REAL-WORLD SCENARIOS
==============================================
66. How do you create a theming system with SCSS?
67. How do you implement dark mode with SCSS?
68. How do you create utility classes with SCSS?
69. How do you handle vendor prefixes in SCSS?
70. How do you optimize SCSS for production?

INTEGRATION & TOOLING
==============================================
71. How do you integrate SCSS with React/Vue/Angular?
72. What are SCSS preprocessor options (dart-sass, node-sass)?
73. How do you set up SCSS in Webpack/Vite?
74. What are source maps in SCSS compilation?
75. How do you use SCSS with CSS frameworks like Bootstrap?
* /



/*
==============================================
BASICS & FUNDAMENTALS - SHORT ANSWERS
==============================================

1. What is SCSS? How is it different from CSS and SASS?
==============================================

SCSS (Sassy CSS) is a CSS preprocessor that adds programming features to CSS.

DIFFERENCES:
- CSS: Standard styling language, no variables or nesting
- SCSS: CSS + variables, nesting, mixins, functions (uses {} and ;)
- SASS: Same features as SCSS but uses indentation instead of {}

Key Point: All valid CSS is valid SCSS, but SCSS must be compiled to CSS
* /

// CSS
.button { background: blue; }
.button:hover { background: darkblue; }

// SCSS
$color: blue;
.button {
  background: $color;
  &:hover { background: darken($color, 10%); }
}

// SASS (indented syntax)
// $color: blue
// .button
//   background: $color
//   &:hover
//     background: darken($color, 10%)

/*
==============================================
2. What are the advantages of using SCSS over regular CSS?
==============================================

1. VARIABLES - Reusable values
* /
$primary: #3498db;
$spacing: 8px;
.button { 
  background: $primary; 
  padding: $spacing * 2; 
}

/*
2. NESTING - Better organization
* /
.nav {
  ul { list-style: none; }
  li { display: inline; }
  a { 
    color: white;
    &:hover { color: blue; }
  }
}

/*
3. MIXINS - Reusable code blocks
* /
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container { @include flex-center; }

/*
4. FUNCTIONS - Dynamic calculations
* /
@function rem($px) { @return ($px / 16) * 1rem; }
.text { font-size: rem(18); }

/*
5. OPERATORS - Math operations
* /
.column { width: 100% / 3; }

/*
6. CONTROL DIRECTIVES - Logic
* /
@if $theme == 'dark' { background: black; }

/*
==============================================
3. Explain the two syntaxes in Sass (.sass vs .scss)
==============================================

SCSS (.scss) - Sassy CSS
- Uses {} and ;
- CSS-compatible
- More popular
* /
$color: blue;
.button {
  background: $color;
  &:hover {
    background: darken($color, 10%);
  }
}

/*
SASS (.sass) - Indented Syntax
- No {} or ;
- Python-like indentation
- More concise

Example (in comment):
$color: blue
.button
  background: $color
  &:hover
    background: darken($color, 10%)

Recommendation: Use SCSS (industry standard)

==============================================
4. How do you compile SCSS to CSS?
==============================================

METHOD 1: Command Line (Dart Sass)
* /
// npm install -g sass
// sass input.scss output.css
// sass --watch input.scss:output.css

/*
METHOD 2: Build Tools
* /
// Webpack: npm install sass-loader sass
// Vite: npm install -D sass
// Create React App: npm install sass

/*
METHOD 3: package.json script
* /
{
  "scripts": {
    "sass": "sass scss:css --watch"
  }
}

/*
METHOD 4: VS Code Extension
- Live Sass Compiler extension
- Auto-compiles on save

==============================================
5. What is the difference between @import and @use in SCSS?
==============================================

@import (OLD - Deprecated)
- Global namespace (pollution risk)
- Imports multiple times (duplicates code)
- No explicit dependencies
* /
@import 'variables';
.button { background: $primary-color; } // Direct access

/*
@use (NEW - Recommended)
- Namespaced (no conflicts)
- Loads only once
- Private members support
* /
@use 'variables';
.button { background: variables.$primary-color; } // Must use namespace

// Custom namespace
@use 'variables' as v;
.button { background: v.$primary-color; }

// Configure module
@use 'library' with (
  $primary-color: red
);

// Key Difference: @use is modular and safer, @import is global and deprecated

/*
==============================================
VARIABLES - SHORT ANSWERS
==============================================

6. How do you declare and use variables in SCSS?
==============================================

DECLARATION: $variable-name: value;
* /
$primary-color: #3498db;
$font-size: 16px;
$spacing: 8px;

// USAGE: Direct in properties
.button {
  background: $primary-color;
  font-size: $font-size;
  padding: $spacing * 2;
}

// TYPES: Numbers, strings, colors, booleans, lists, maps
$border: 1px solid black;  // List
$colors: ('primary': blue, 'secondary': gray);  // Map

// INTERPOLATION: In selectors and property names
$side: 'left';
.box {
  margin-#{$side}: 10px;  // margin-left: 10px
}

/*
==============================================
7. What is variable scope in SCSS?
==============================================

GLOBAL SCOPE: Defined at root level, accessible everywhere
* /
$global-color: blue;
.element { color: $global-color; } // ✓ Works

/*
LOCAL SCOPE: Defined in block, accessible in block and nested children
* /
.container {
  $local-padding: 20px;  // Local
  padding: $local-padding;  // ✓ Works
  
  .child {
    margin: $local-padding;  // ✓ Works (inherits from parent)
  }
}
.other { 
  // padding: $local-padding;  // ✗ Error! Not accessible
}

/*
VARIABLE SHADOWING: Local overrides global
* /
$color: blue;  // Global
.element {
  $color: red;  // Local (shadows global)
  color: $color;  // red
}
.other { color: $color; } // blue (global unchanged)

/*
MODIFY GLOBAL FROM LOCAL: Use !global flag
* /
$counter: 0;
.item { $counter: $counter + 1 !global; } // Modifies global

/*
==============================================
8. Can you reassign variables in SCSS? Explain !default flag
==============================================

YES, variables can be reassigned
* /
$color: blue;
.box { background: $color; }  // blue

$color: red;  // Reassign
.card { background: $color; }  // red

/*
!default FLAG: Assign ONLY if variable is not already defined
* /
$color: blue !default;  // Assigns blue

$existing: red;
$existing: blue !default;  // IGNORED (keeps red)

/*
USE CASE: Library defaults that users can override
* /
// Library file
$lib-primary: blue !default;
$lib-spacing: 8px !default;

// User can override BEFORE importing
$lib-primary: red;  // Override
@use 'library';  // Uses red instead of blue

/*
!default vs Normal:
- $var: value;           → Always assigns
- $var: value !default;  → Only if undefined
* /

/*
==============================================
9. What are global vs local variables in SCSS?
==============================================

GLOBAL: Defined at root, accessible everywhere
* /
$global-size: 16px;  // Global

.header { font-size: $global-size; }  // ✓
.footer { font-size: $global-size; }  // ✓

/*
LOCAL: Defined in block, accessible only in that block and children
* /
.container {
  $local-margin: 20px;  // Local
  margin: $local-margin;  // ✓
  
  .nested { padding: $local-margin; }  // ✓
}
.other { 
  // margin: $local-margin;  // ✗ Error
}

/*
SCOPE RULES:
1. Local can access global
2. Children can access parent's local
3. Siblings cannot access each other's local
4. Local shadows global with same name
* /
$value: 100;  // Global
.box {
  $value: 200;  // Local (shadows)
  width: $value + px;  // 200px
}
.card { width: $value + px; } // 100px (global)

/*
==============================================
10. How do CSS custom properties differ from SCSS variables?
==============================================

SCSS VARIABLES: Compiled at build time
* /
$color: blue;
.box { background: $color; }  // Compiles to: background: blue;

/*
CSS CUSTOM PROPERTIES: Runtime variables
* /
:root { --color: blue; }
.box { background: var(--color); }  // Stays in CSS

/*
KEY DIFFERENCES:

1. DYNAMIC CHANGES
   - CSS vars: Can change with JavaScript ✓
   - SCSS vars: Fixed after compilation ✗

2. SCOPE & CASCADE
   - CSS vars: Inherit through DOM ✓
   - SCSS vars: Lexical scope only ✗

3. BROWSER SUPPORT
   - CSS vars: Modern browsers only
   - SCSS vars: All browsers (compiles away)

4. MEDIA QUERIES
* /
:root { --size: 16px; }
@media (max-width: 768px) {
  :root { --size: 14px; }  // CSS vars can change ✓
}

$size: 16px;
@media (max-width: 768px) {
  // Can't change $size dynamically ✗
}

/*
BEST PRACTICE: Use both together
* /
$base: 8px;
:root {
  --spacing-sm: #{$base};      // SCSS generates
  --spacing-md: #{$base * 2};  // CSS var for runtime
}
.element { padding: var(--spacing-md); }

/*
==============================================
NESTING - SHORT ANSWERS
==============================================

11. How does nesting work in SCSS? What are its benefits?
==============================================

BASIC NESTING: Write selectors inside parent
* /
.header {
  background: #333;
  
  h1 { color: white; }      // .header h1
  p { color: #ccc; }        // .header p
}

/*
BENEFITS:

1. BETTER ORGANIZATION - Mirrors HTML structure
* /
.card {
  .card-header { padding: 10px; }
  .card-body { padding: 20px; }
  .card-footer { border-top: 1px solid #ddd; }
}

/*
2. LESS REPETITION - Write parent once
* /
.button {
  background: blue;
  &:hover { background: darkblue; }
  &:active { transform: scale(0.98); }
  &.disabled { opacity: 0.5; }
}

/*
3. NESTED MEDIA QUERIES
* /
.sidebar {
  width: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
}

/*
==============================================
12. What is the parent selector (&) and how is it used?
==============================================

& represents the parent selector

PSEUDO-CLASSES:
* /
.button {
  background: blue;
  &:hover { background: darkblue; }    // .button:hover
  &:active { transform: scale(0.98); } // .button:active
  &:focus { outline: 2px solid blue; } // .button:focus
}

/*
COMPOUND SELECTORS:
* /
.alert {
  padding: 15px;
  &.alert-success { background: green; }  // .alert.alert-success
  &.alert-danger { background: red; }     // .alert.alert-danger
}

/*
BEM NAMING:
* /
.block {
  &__element { padding: 10px; }           // .block__element
  &--modifier { font-weight: bold; }      // .block--modifier
}

/*
PARENT CONTEXT:
* /
.button {
  background: blue;
  .sidebar & { width: 100%; }            // .sidebar .button
  .dark-theme & { background: #444; }    // .dark-theme .button
}

/*
CONCATENATION:
* /
.box {
  &-header { background: #f5f5f5; }      // .box-header
  &-body { padding: 20px; }              // .box-body
}

/*
==============================================
13. What are the drawbacks of deep nesting?
==============================================

PROBLEM 1: SPECIFICITY ISSUES - Hard to override
* /
.header {
  .nav {
    .menu {
      .item {
        .link { color: blue; }  // .header .nav .menu .item .link (too specific!)
      }
    }
  }
}
// Try to override:
.link { color: red; }  // ✗ Won't work (specificity too low)

/*
PROBLEM 2: LARGE CSS OUTPUT
* /
// Deep nesting creates long selectors
.page .content .article .section .title { } // Inefficient

/*
PROBLEM 3: PERFORMANCE - Browser must match long selectors
* /

/*
PROBLEM 4: READABILITY - Hard to understand
* /
.a {
  .b {
    .c {
      .d {
        .e {
          .f { color: red; } // Where am I?
        }
      }
    }
  }
}

/*
BEST PRACTICE: Limit to 3-4 levels max
* /
.card {
  .card-header {
    .title { font-size: 20px; }  // OK (3 levels)
  }
}

/*
SOLUTION: Use BEM or flatten structure
* /
.card { }
.card__header { }
.card__title { }  // Flat, single class (better)

/*
==============================================
14. How do you nest media queries in SCSS?
==============================================

BASIC NESTED MEDIA QUERY:
* /
.sidebar {
  width: 300px;
  padding: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 5px;
  }
}

/*
NESTED ELEMENTS WITH MEDIA QUERIES:
* /
.header {
  height: 80px;
  
  @media (max-width: 768px) {
    height: 60px;
  }
  
  .logo {
    width: 150px;
    
    @media (max-width: 768px) {
      width: 100px;
    }
  }
}

/*
USING VARIABLES FOR BREAKPOINTS:
* /
$tablet: 768px;
$mobile: 480px;

.container {
  width: 1200px;
  
  @media (max-width: $tablet) {
    width: 100%;
  }
  
  @media (max-width: $mobile) {
    padding: 10px;
  }
}

/*
MIXIN FOR BREAKPOINTS (Best Practice):
* /
@mixin tablet {
  @media (max-width: 768px) { @content; }
}

@mixin mobile {
  @media (max-width: 480px) { @content; }
}

.element {
  font-size: 18px;
  
  @include tablet {
    font-size: 16px;
  }
  
  @include mobile {
    font-size: 14px;
  }
}

/*
==============================================
15. Explain nested properties in SCSS
==============================================

NESTED PROPERTIES: Group properties with same prefix
* /

// Instead of writing:
.box {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
}

// Write as nested:
.box {
  font: {
    family: Arial, sans-serif;
    size: 16px;
    weight: bold;
    style: italic;
  }
}

/*
MARGIN EXAMPLE:
* /
.element {
  margin: {
    top: 10px;
    right: 15px;
    bottom: 10px;
    left: 15px;
  }
}

/*
BORDER EXAMPLE:
* /
.card {
  border: {
    width: 2px;
    style: solid;
    color: #333;
    radius: 8px;
  }
}

/*
BACKGROUND EXAMPLE:
* /
.hero {
  background: {
    color: #f5f5f5;
    image: url('hero.jpg');
    size: cover;
    position: center;
    repeat: no-repeat;
  }
}

/*
COMBINING WITH VALUES:
* /
.box {
  border: 1px solid {  // Can combine shorthand with nested
    color: #333;
  };
}

/*
COMPILES TO:
* /
// .box {
//   font-family: Arial, sans-serif;
//   font-size: 16px;
//   font-weight: bold;
//   margin-top: 10px;
//   margin-right: 15px;
//   border-width: 2px;
//   border-style: solid;
// }

/*
USE CASE: When you have many properties with same prefix
Better readability for complex property groups
* /


/*
==============================================
MIXINS - SHORT ANSWERS
==============================================

16. What are mixins in SCSS? How do you create and use them?
==============================================

MIXINS: Reusable blocks of CSS that can accept parameters

CREATE: Use @mixin keyword
* /
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-style {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/*
USE: Use @include keyword
* /
.container {
  @include flex-center;
  height: 100vh;
}

.btn {
  @include button-style;
  background: blue;
  color: white;
}

/*
COMPILES TO:
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
* /

/*
==============================================
17. How do you pass arguments to mixins?
==============================================

BASIC ARGUMENTS: Define parameters in parentheses
* /
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.box {
  @include size(100px, 50px);
}

/*
MULTIPLE ARGUMENTS:
* /
@mixin button($bg-color, $text-color, $padding) {
  background: $bg-color;
  color: $text-color;
  padding: $padding;
}

.primary-btn {
  @include button(blue, white, 10px 20px);
}

.secondary-btn {
  @include button(gray, black, 8px 16px);
}

/*
COMPILES TO:
.primary-btn {
  background: blue;
  color: white;
  padding: 10px 20px;
}
* /

/*
==============================================
18. What are default parameter values in mixins?
==============================================

DEFAULT VALUES: Use colon after parameter
* /
@mixin box-shadow($x: 0, $y: 2px, $blur: 4px, $color: rgba(0,0,0,0.1)) {
  box-shadow: $x $y $blur $color;
}

// Use all defaults
.card {
  @include box-shadow;
}

// Override some parameters
.modal {
  @include box-shadow(0, 5px, 20px);
}

// Override with named arguments
.tooltip {
  @include box-shadow($color: rgba(0,0,0,0.3), $blur: 10px);
}

/*
COMMON PATTERN:
* /
@mixin border-radius($radius: 4px) {
  border-radius: $radius;
}

.box { @include border-radius; }           // Uses 4px
.circle { @include border-radius(50%); }   // Uses 50%

/*
==============================================
19. Explain variable arguments (@content) in mixins
==============================================

@content: Allows passing a block of styles to mixin
* /
@mixin mobile {
  @media (max-width: 768px) {
    @content;  // Injects content here
  }
}

.sidebar {
  width: 300px;
  
  @include mobile {
    width: 100%;
    padding: 10px;
  }
}

/*
COMPILES TO:
.sidebar { width: 300px; }
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    padding: 10px;
  }
}
* /

/*
PRACTICAL EXAMPLES:
* /
@mixin hover-lift {
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    @content;  // Additional hover styles
  }
}

.card {
  @include hover-lift {
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
}

/*
THEME MIXIN:
* /
@mixin theme($theme-name) {
  .theme-#{$theme-name} & {
    @content;
  }
}

.button {
  background: blue;
  
  @include theme(dark) {
    background: #333;
    color: white;
  }
}

/*
==============================================
20. What's the difference between @mixin and @function?
==============================================

@mixin: Returns CSS styles (multiple properties)
* /
@mixin button-reset {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.btn {
  @include button-reset;  // Outputs CSS
}

/*
@function: Returns a single calculated VALUE
* /
@function calculate-rem($pixels) {
  @return ($pixels / 16) * 1rem;
}

.text {
  font-size: calculate-rem(18);  // Returns value: 1.125rem
}

/*
KEY DIFFERENCES:

1. OUTPUT:
   - Mixin: CSS properties
   - Function: Single value

2. USAGE:
   - Mixin: @include
   - Function: Direct call

3. RETURN:
   - Mixin: No @return
   - Function: Must have @return
* /

// ✓ Mixin for styles
@mixin card-style {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

// ✓ Function for calculations
@function double($value) {
  @return $value * 2;
}

.card {
  @include card-style;
  width: double(100px);  // 200px
}

/*
==============================================
FUNCTIONS - SHORT ANSWERS
==============================================

21. What are built-in functions in SCSS? Name some common ones
==============================================

COLOR FUNCTIONS:
* /
$base-color: #3498db;

.element {
  // Lighten/Darken
  background: lighten($base-color, 20%);
  border: 1px solid darken($base-color, 15%);
  
  // Saturate/Desaturate
  color: saturate($base-color, 30%);
  outline: 1px solid desaturate($base-color, 20%);
  
  // Adjust hue
  box-shadow: 0 0 10px adjust-hue($base-color, 45deg);
  
  // Transparency
  background: rgba($base-color, 0.5);
  color: transparentize($base-color, 0.3);
  border-color: opacify($base-color, 0.2);
  
  // Mix colors
  background: mix(red, blue, 50%);
}

/*
STRING FUNCTIONS:
* /
$name: 'hello';
.class {
  content: to-upper-case($name);      // 'HELLO'
  content: to-lower-case('WORLD');    // 'world'
  content: str-length($name);         // 5
  content: str-index($name, 'e');     // 2
  content: str-insert($name, 'X', 3); // 'heXllo'
}

/*
NUMBER FUNCTIONS:
* /
.math {
  width: percentage(0.5);     // 50%
  height: round(10.6px);      // 11px
  margin: ceil(10.2px);       // 11px
  padding: floor(10.8px);     // 10px
  font-size: abs(-16px);      // 16px
  line-height: min(1.5, 2);   // 1.5
  width: max(100px, 200px);   // 200px
}

/*
LIST FUNCTIONS:
* /
$list: 10px 20px 30px;
.item {
  margin: nth($list, 2);         // 20px
  padding: length($list);        // 3
  width: append($list, 40px);    // 10px 20px 30px 40px
}

/*
MAP FUNCTIONS:
* /
$colors: ('primary': blue, 'secondary': gray);
.element {
  background: map-get($colors, 'primary');    // blue
  border: map-has-key($colors, 'tertiary');   // false
}

/*
==============================================
22. How do you create custom functions in SCSS?
==============================================

SYNTAX: @function name($params) { @return value; }
* /
@function calculate-rem($pixels) {
  @return ($pixels / 16) * 1rem;
}

.text {
  font-size: calculate-rem(18);  // 1.125rem
  margin: calculate-rem(24);     // 1.5rem
}

/*
MULTIPLE PARAMETERS:
* /
@function calculate-percentage($target, $container) {
  @return ($target / $container) * 100%;
}

.column {
  width: calculate-percentage(300px, 1200px);  // 25%
}

/*
DEFAULT PARAMETERS:
* /
@function spacing($multiplier: 1, $base: 8px) {
  @return $multiplier * $base;
}

.box {
  padding: spacing(2);      // 16px (2 * 8px)
  margin: spacing(3, 10px); // 30px (3 * 10px)
}

/*
CONDITIONAL LOGIC:
* /
@function contrast-color($bg-color) {
  @if (lightness($bg-color) > 50%) {
    @return black;
  } @else {
    @return white;
  }
}

.button {
  background: blue;
  color: contrast-color(blue);  // white
}

/*
==============================================
23. What's the difference between mixins and functions?
==============================================

MIXINS: Output CSS properties
* /
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flex-center;  // Outputs 3 CSS properties
}

/*
FUNCTIONS: Return single value for use in property
* /
@function double($value) {
  @return $value * 2;
}

.box {
  width: double(100px);  // Returns: 200px
}

/*
COMPARISON TABLE:

Feature      | @mixin                | @function
-------------|----------------------|------------------
Purpose      | Output CSS styles    | Calculate values
Usage        | @include mixin-name  | function-name()
Return       | No @return           | Must @return
Output       | Multiple properties  | Single value
Use in       | Selector block       | Property value

WHEN TO USE:
- Mixin: Need multiple CSS properties
- Function: Need calculated value
* /

// ✓ Use mixin for styles
@mixin card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

// ✓ Use function for calculations
@function grid-width($columns) {
  @return (100% / 12) * $columns;
}

/*
==============================================
24. Explain color manipulation functions in SCSS
==============================================

LIGHTEN/DARKEN: Adjust brightness
* /
$blue: #3498db;

.box {
  background: $blue;
  border: 1px solid darken($blue, 10%);    // Darker
  color: lighten($blue, 20%);              // Lighter
}

/*
SATURATE/DESATURATE: Adjust color intensity
* /
.element {
  background: saturate($blue, 30%);        // More vivid
  border: 1px solid desaturate($blue, 20%); // More gray
}

/*
ADJUST-HUE: Change color on color wheel
* /
.item {
  background: adjust-hue($blue, 45deg);    // Shift hue
}

/*
TRANSPARENCY:
* /
.modal {
  background: rgba($blue, 0.5);            // 50% opacity
  border: transparentize($blue, 0.7);      // Make more transparent
  color: opacify(rgba($blue, 0.3), 0.2);   // Make more opaque
}

/*
MIX COLORS:
* /
.gradient {
  background: mix(red, blue, 50%);         // 50% red, 50% blue
  border: mix($blue, white, 80%);          // 80% blue, 20% white
}

/*
SCALE COLOR:
* /
.card {
  background: scale-color($blue, $lightness: 30%);   // Lighter
  border: scale-color($blue, $saturation: -20%);     // Less saturated
}

/*
COMPLEMENT: Opposite on color wheel
* /
.contrast {
  background: $blue;
  color: complement($blue);                // Orange (opposite)
}

/*
GRAYSCALE: Remove all saturation
* /
.disabled {
  background: grayscale($blue);            // Gray version
}

/*
INVERT: Reverse color
* /
.inverted {
  background: invert($blue);               // Inverted color
}

/*
==============================================
25. What are math functions in SCSS?
==============================================

ROUNDING FUNCTIONS:
* /
.element {
  width: round(10.6px);     // 11px (nearest integer)
  height: ceil(10.2px);     // 11px (round up)
  margin: floor(10.8px);    // 10px (round down)
}

/*
ABSOLUTE VALUE:
* /
.box {
  margin: abs(-20px);       // 20px (positive)
}

/*
MIN/MAX:
* /
.container {
  width: min(500px, 100%);  // Smaller value
  height: max(300px, 50vh); // Larger value
}

/*
PERCENTAGE:
* /
.column {
  width: percentage(0.5);   // 50%
  width: percentage(1/3);   // 33.33333%
}

/*
RANDOM:
* /
.element {
  opacity: random();        // Random 0-1
  width: random(100) + px;  // Random 1-100
}

/*
COMPARISON:
* /
@function get-size($small) {
  @if comparable(10px, 1em) {
    @return 10px;
  }
}

/*
UNIT FUNCTIONS:
* /
.box {
  $value: 16px;
  content: unit($value);          // 'px'
  content: unitless(16);          // true
  content: unitless(16px);        // false
}

/*
PRACTICAL EXAMPLE:
* /
@function clamp-value($value, $min, $max) {
  @return max($min, min($value, $max));
}

.text {
  font-size: clamp-value(18px, 12px, 24px);  // 18px (within range)
}

/*
==============================================
INHERITANCE & EXTEND - SHORT ANSWERS
==============================================

26. What is @extend in SCSS? How does it work?
==============================================

@extend: Share styles between selectors
* /
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button {
  @extend .button;      // Inherits all .button styles
  background: blue;
  color: white;
}

.secondary-button {
  @extend .button;      // Also inherits .button styles
  background: gray;
  color: black;
}

/*
COMPILES TO:
.button, .primary-button, .secondary-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button {
  background: blue;
  color: white;
}

Note: Selectors are grouped together (efficient)
* /

/*
==============================================
27. What's the difference between @extend and @mixin?
==============================================

@extend: Groups selectors (DRY in CSS output)
* /
.button-base {
  padding: 10px 20px;
  border: none;
}

.btn-primary { @extend .button-base; background: blue; }
.btn-secondary { @extend .button-base; background: gray; }

// Compiles to:
// .button-base, .btn-primary, .btn-secondary { padding: 10px 20px; border: none; }

/*
@mixin: Duplicates styles (each selector gets copy)
* /
@mixin button-base {
  padding: 10px 20px;
  border: none;
}

.btn-primary { @include button-base; background: blue; }
.btn-secondary { @include button-base; background: gray; }

// Compiles to:
// .btn-primary { padding: 10px 20px; border: none; background: blue; }
// .btn-secondary { padding: 10px 20px; border: none; background: gray; }

/*
COMPARISON:

Feature        | @extend              | @mixin
---------------|----------------------|----------------------
Output         | Groups selectors     | Duplicates styles
CSS Size       | Smaller              | Larger
Parameters     | No                   | Yes
@content       | No                   | Yes
Use Case       | Static inheritance   | Dynamic with params
* /

/*
==============================================
28. What are placeholder selectors (%) in SCSS?
==============================================

PLACEHOLDER: Won't appear in CSS unless extended
Syntax: %placeholder-name
* /
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-btn {
  @extend %button-base;
  background: blue;
}

.secondary-btn {
  @extend %button-base;
  background: gray;
}

/*
COMPILES TO (no .button-base in output):
.primary-btn, .secondary-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
* /

/*
VS REGULAR CLASS:
* /
.button-base {           // Will appear in CSS even if unused
  padding: 10px 20px;
}

%button-base {           // Won't appear unless extended
  padding: 10px 20px;
}

/*
USE CASE: Shared styles that shouldn't be used directly
* /
%clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}

/*
==============================================
29. What are the performance implications of @extend?
==============================================

POSITIVE: Smaller CSS file (grouped selectors)
* /
%btn-base { padding: 10px; }
.btn-1 { @extend %btn-base; }
.btn-2 { @extend %btn-base; }
.btn-3 { @extend %btn-base; }

// Output: .btn-1, .btn-2, .btn-3 { padding: 10px; }
// More efficient than duplicating

/*
NEGATIVE 1: Specificity issues
* /
.widget .button { background: blue; }

.alert-button {
  @extend .button;  // Still needs .widget ancestor to work
}

/*
NEGATIVE 2: Unexpected selector combinations
* /
.button { padding: 10px; }
.button:hover { background: blue; }

.alert-btn { @extend .button; }

// Generates: .alert-btn:hover (might be unexpected)

/*
NEGATIVE 3: Large selector chains
* /
.a .b .c { color: red; }
.x { @extend .c; }

// Generates: .a .b .c, .a .b .x { color: red; }
// Can create bloated selectors

/*
BEST PRACTICES:
1. Use placeholders (%) not classes
2. Avoid extending nested selectors
3. Keep extends shallow (1-2 levels)
4. Use mixins for parameters
* /

/*
==============================================
30. When should you use @extend vs @mixin?
==============================================

USE @extend WHEN:
1. Sharing static styles (no parameters)
* /
%card-base {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-card { @extend %card-base; }
.user-card { @extend %card-base; }

/*
2. Need smaller CSS output
3. Simple inheritance
* /

/*
USE @mixin WHEN:
1. Need parameters
* /
@mixin button($bg, $color) {
  background: $bg;
  color: $color;
  padding: 10px 20px;
}

.primary { @include button(blue, white); }
.secondary { @include button(gray, black); }

/*
2. Need @content block
* /
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

/*
3. Dynamic calculations
* /
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}

/*
DECISION TREE:

Need parameters? → YES → Use @mixin
                → NO ↓
                
Need @content? → YES → Use @mixin
               → NO ↓
               
Static styles? → YES → Use @extend (with %)

RECOMMENDATION: Prefer @mixin in most cases (more flexible)
Only use @extend for truly static shared styles
* /


/*
==============================================
PARTIALS & IMPORTS - SHORT ANSWERS
==============================================

31. What are partials in SCSS?
==============================================

PARTIALS: SCSS files that contain snippets of CSS
- Not compiled to separate CSS files
- Meant to be imported into other SCSS files
- Help organize and modularize styles
* /

// Example partials:
// _variables.scss  - Contains variables
// _mixins.scss     - Contains mixins
// _buttons.scss    - Contains button styles
// _layout.scss     - Contains layout styles

/*
WHY USE PARTIALS:
1. Better organization
2. Reusable code
3. Easier maintenance
4. Team collaboration
* /

/*
==============================================
32. How do you name and import partial files?
==============================================

NAMING: Start filename with underscore (_)
* /

// _variables.scss
$primary-color: #3498db;
$font-size: 16px;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// _buttons.scss
.button {
  padding: 10px 20px;
  border-radius: 4px;
}

/*
IMPORTING: Use @use or @import (omit underscore and extension)
* /

// main.scss
@use 'variables';        // imports _variables.scss
@use 'mixins';           // imports _mixins.scss
@use 'buttons';          // imports _buttons.scss

// Use with namespace
.element {
  color: variables.$primary-color;
  @include mixins.flex-center;
}

/*
OLD WAY (@import - deprecated):
* /
@import 'variables';     // No namespace needed
@import 'mixins';
@import 'buttons';

/*
FILE STRUCTURE:
scss/
├── _variables.scss
├── _mixins.scss
├── _buttons.scss
├── _layout.scss
└── main.scss (imports all partials)
* /

/*
==============================================
33. What's the difference between @import and @use?
==============================================

@import (OLD - Deprecated):
- Global namespace
- Can import multiple times (duplicates)
- No configuration
* /
@import 'colors';
.box { background: $primary; }  // Direct access

/*
@use (NEW - Recommended):
- Namespaced (prevents conflicts)
- Loads once (no duplicates)
- Can configure with 'with'
* /
@use 'colors';
.box { background: colors.$primary; }  // Must use namespace

// Custom namespace
@use 'colors' as c;
.box { background: c.$primary; }

// No namespace (like @import)
@use 'colors' as *;
.box { background: $primary; }

/*
CONFIGURATION:
* /
@use 'library' with (
  $primary-color: red,
  $spacing: 16px
);

/*
KEY DIFFERENCES:

@import                  | @use
------------------------|------------------------
Global scope            | Namespaced
Loads multiple times    | Loads once
No configuration        | Configure with 'with'
Being deprecated        | Current standard
Variables everywhere    | Must use namespace
* /

/*
==============================================
34. Explain @forward in SCSS
==============================================

@forward: Re-export members from another module
Creates a "public API" for your library
* /

// _colors.scss
$primary: blue;
$secondary: gray;

// _typography.scss
$font-size: 16px;
$font-family: Arial;

// _index.scss (public API file)
@forward 'colors';        // Re-export colors
@forward 'typography';    // Re-export typography

/*
USAGE:
* /
// main.scss
@use 'index';  // Gets everything from colors and typography

.element {
  color: index.$primary;           // from colors
  font-size: index.$font-size;     // from typography
}

/*
FORWARD WITH PREFIX:
* /
// _index.scss
@forward 'colors' as color-*;     // Adds prefix to all members
@forward 'typography' as type-*;

// main.scss
@use 'index';
.element {
  color: index.$color-primary;    // Prefixed
  font-size: index.$type-font-size; // Prefixed
}

/*
FORWARD WITH HIDING:
* /
@forward 'module' hide $private-var;  // Don't forward specific member

/*
FORWARD WITH SHOWING:
* /
@forward 'module' show $public-var;   // Only forward specific member

/*
USE CASE: Creating a library/framework
* /
// bootstrap/_index.scss
@forward 'variables';
@forward 'mixins';
@forward 'buttons';
@forward 'forms';

// User imports once
@use 'bootstrap';

/*
==============================================
35. How do you organize SCSS file structure in large projects?
==============================================

7-1 PATTERN (Most Popular):
7 folders, 1 main file
* /

scss/
├── abstracts/          // Variables, mixins, functions
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── _functions.scss
│
├── base/              // Reset, typography, base styles
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _base.scss
│
├── components/        // Buttons, cards, etc.
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   └── _modal.scss
│
├── layout/           // Header, footer, grid
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _sidebar.scss
│   └── _grid.scss
│
├── pages/            // Page-specific styles
│   ├── _home.scss
│   ├── _about.scss
│   └── _contact.scss
│
├── themes/           // Theme variations
│   ├── _dark.scss
│   └── _light.scss
│
├── vendors/          // External libraries
│   ├── _bootstrap.scss
│   └── _normalize.scss
│
└── main.scss         // Main file imports all

/*
MAIN.SCSS:
* /
// Abstracts
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'abstracts/functions';

// Base
@use 'base/reset';
@use 'base/typography';

// Layout
@use 'layout/header';
@use 'layout/footer';

// Components
@use 'components/buttons';
@use 'components/cards';

// Pages
@use 'pages/home';

// Themes
@use 'themes/dark';

/*
ALTERNATIVE: COMPONENT-BASED (Modern Approach)
* /
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.scss
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.scss
│
├── styles/
│   ├── _variables.scss
│   ├── _mixins.scss
│   └── global.scss

/*
BEST PRACTICES:
1. One component = one file
2. Use clear naming conventions
3. Group related styles
4. Keep partials small and focused
5. Use index files for folders
* /

/*
==============================================
OPERATORS - SHORT ANSWERS
==============================================

36. What operators are available in SCSS?
==============================================

ARITHMETIC OPERATORS: + - * / %
* /
.box {
  width: 100px + 50px;           // 150px
  height: 200px - 50px;          // 150px
  padding: 10px * 2;             // 20px
  margin: 60px / 3;              // 20px
  font-size: 17px % 5;           // 2px (remainder)
}

/*
COMPARISON OPERATORS: == != < > <= >=
* /
$width: 100px;

@if $width == 100px { }          // Equal
@if $width != 50px { }           // Not equal
@if $width > 50px { }            // Greater than
@if $width < 200px { }           // Less than
@if $width >= 100px { }          // Greater or equal
@if $width <= 100px { }          // Less or equal

/*
LOGICAL OPERATORS: and or not
* /
$mobile: true;
$tablet: false;

@if $mobile and not $tablet { }  // Both conditions
@if $mobile or $tablet { }       // Either condition
@if not $tablet { }              // Negation

/*
STRING OPERATORS: + (concatenation)
* /
$prefix: 'custom-';
$name: 'button';

.#{$prefix}#{$name} { }          // .custom-button

/*
COLOR OPERATORS: + - * /
* /
$color1: #010101;
$color2: #020202;

.element {
  color: $color1 + $color2;      // #030303
}

/*
LIST OPERATORS: , (comma) or space
* /
$list1: 10px 20px;
$list2: 30px, 40px;

/*
==============================================
37. How do you perform mathematical operations in SCSS?
==============================================

BASIC MATH: +, -, *, /, %
* /
$base: 16px;

.element {
  width: $base * 2;              // 32px
  height: $base * 3;             // 48px
  padding: $base / 2;            // 8px
  margin: $base + 10px;          // 26px
  font-size: $base - 2px;        // 14px
}

/*
DIVISION: Use math.div() or wrap in parentheses
* /
@use 'sass:math';

.box {
  width: math.div(100px, 3);     // 33.33333px (recommended)
  width: (100px / 3);            // 33.33333px (legacy)
  width: 100px / 3;              // Not calculated (CSS division)
}

/*
CALCULATIONS WITH VARIABLES:
* /
$container-width: 1200px;
$columns: 12;

.column {
  width: math.div($container-width, $columns);  // 100px per column
}

/*
UNIT CONVERSIONS:
* /
.element {
  width: 100px + 50;             // 150px (adds unit)
  height: 10% + 5%;              // 15%
  // width: 100px + 10%;         // ✗ Error (incompatible units)
}

/*
ORDER OF OPERATIONS (PEMDAS):
* /
.box {
  width: 10px + 5px * 2;         // 20px (multiplication first)
  width: (10px + 5px) * 2;       // 30px (parentheses first)
}

/*
PRACTICAL EXAMPLES:
* /
$spacing-unit: 8px;

.card {
  padding: $spacing-unit * 2;              // 16px
  margin: $spacing-unit * 4;               // 32px
  border-radius: math.div($spacing-unit, 2); // 4px
}

/*
PERCENTAGE CALCULATIONS:
* /
@function percentage($target, $context) {
  @return math.div($target, $context) * 100%;
}

.column {
  width: percentage(300px, 1200px);  // 25%
}

/*
==============================================
38. What are comparison operators in SCSS?
==============================================

EQUALITY: == (equal), != (not equal)
* /
$theme: 'dark';

@if $theme == 'dark' {
  background: black;
}

@if $theme != 'light' {
  color: white;
}

/*
RELATIONAL: < > <= >=
* /
$screen-width: 768px;
$breakpoint: 992px;

@if $screen-width < $breakpoint {
  // Mobile styles
}

@if $screen-width > 480px {
  // Tablet and up
}

@if $screen-width >= 768px {
  // Tablet and desktop
}

@if $screen-width <= 992px {
  // Up to desktop
}

/*
WITH NUMBERS:
* /
$font-size: 16px;

@if $font-size > 14px {
  line-height: 1.5;
} @else {
  line-height: 1.3;
}

/*
WITH STRINGS:
* /
$position: 'top';

@if $position == 'top' {
  top: 0;
} @else if $position == 'bottom' {
  bottom: 0;
}

/*
LOGICAL COMBINATIONS:
* /
$width: 1024px;
$height: 768px;

@if $width > 768px and $height > 600px {
  // Desktop resolution
}

@if $width < 768px or $height < 600px {
  // Mobile or small screen
}

/*
PRACTICAL EXAMPLE:
* /
@mixin responsive-font($size) {
  font-size: $size;
  
  @if $size > 20px {
    line-height: 1.4;
  } @else if $size > 16px {
    line-height: 1.5;
  } @else {
    line-height: 1.6;
  }
}

/*
==============================================
39. Explain string concatenation in SCSS
==============================================

CONCATENATION: Joining strings with +
* /
$prefix: 'btn';
$variant: 'primary';

.#{$prefix}-#{$variant} {         // .btn-primary
  background: blue;
}

/*
INTERPOLATION: #{} for dynamic values
* /
$side: 'left';
$size: 10px;

.element {
  margin-#{$side}: #{$size};      // margin-left: 10px
}

/*
STRING CONCATENATION:
* /
$base-path: '/images/';
$filename: 'logo.png';

.logo {
  background-image: url($base-path + $filename);  // url(/images/logo.png)
  // Or with interpolation:
  background-image: url('#{$base-path}#{$filename}');
}

/*
DYNAMIC CLASS NAMES:
* /
$sizes: 'sm', 'md', 'lg';

@each $size in $sizes {
  .button-#{$size} {              // .button-sm, .button-md, .button-lg
    padding: 10px;
  }
}

/*
CONCATENATE WITH NUMBERS:
* /
$index: 1;
$name: 'item';

.#{$name}-#{$index} {             // .item-1
  order: $index;
}

/*
UNQUOTED STRINGS:
* /
$font: Arial;
$fallback: sans-serif;

.text {
  font-family: $font, $fallback;  // Arial, sans-serif
}

/*
QUOTED STRINGS:
* /
$font-name: 'Roboto';

.text {
  font-family: $font-name + ', sans-serif';  // "Roboto, sans-serif"
  // Better with interpolation:
  font-family: #{$font-name}, sans-serif;    // Roboto, sans-serif
}

/*
==============================================
40. How do you handle units in SCSS calculations?
==============================================

SAME UNITS: Can add/subtract
* /
.element {
  width: 100px + 50px;            // 150px ✓
  height: 10em + 5em;             // 15em ✓
  margin: 20% + 10%;              // 30% ✓
}

/*
DIFFERENT UNITS: Cannot add/subtract
* /
.element {
  // width: 100px + 10em;         // ✗ Error (incompatible)
  // height: 50% + 20px;          // ✗ Error (incompatible)
}

/*
MULTIPLICATION: One value must be unitless
* /
.element {
  width: 10px * 2;                // 20px ✓
  height: 2 * 10px;               // 20px ✓
  // width: 10px * 2px;           // ✗ Error (both have units)
}

/*
DIVISION: Result keeps unit
* /
@use 'sass:math';

.element {
  width: math.div(100px, 2);      // 50px ✓
  height: math.div(20px, 5px);    // 4 (unitless) ✓
}

/*
UNIT FUNCTIONS:
* /
$value: 16px;

.element {
  content: unit($value);          // 'px'
  width: unitless(16);            // true
  width: unitless(16px);          // false
}

/*
REMOVING UNITS:
* /
@function strip-unit($number) {
  @return math.div($number, ($number * 0 + 1));
}

$size: 16px;
.element {
  font-size: strip-unit($size);   // 16 (no unit)
}

/*
ADDING UNITS:
* /
$number: 16;
.element {
  font-size: $number * 1px;       // 16px
  width: $number * 1%;            // 16%
}

/*
CONVERSION:
* /
@function px-to-rem($px, $base: 16px) {
  @return math.div($px, $base) * 1rem;
}

.text {
  font-size: px-to-rem(18px);     // 1.125rem
}

/*
PRACTICAL EXAMPLE:
* /
$base-spacing: 8px;

.card {
  padding: $base-spacing * 2;                    // 16px
  margin: $base-spacing * 3;                     // 24px
  border-width: math.div($base-spacing, 4);      // 2px
  width: percentage(math.div(300, 1200));        // 25%
}

/*
==============================================
CONTROL DIRECTIVES - SHORT ANSWERS
==============================================

41. What is @if directive in SCSS?
==============================================

@if: Conditional execution of styles
* /
$theme: 'dark';

.app {
  @if $theme == 'dark' {
    background: black;
    color: white;
  }
}

/*
WITH VARIABLES:
* /
$enable-shadows: true;

.card {
  padding: 20px;
  
  @if $enable-shadows {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

/*
NUMERIC COMPARISONS:
* /
$screen-width: 768px;

.container {
  @if $screen-width < 768px {
    width: 100%;
  }
}

/*
PRACTICAL EXAMPLE:
* /
@mixin button-style($type) {
  padding: 10px 20px;
  
  @if $type == 'primary' {
    background: blue;
    color: white;
  }
  
  @if $type == 'secondary' {
    background: gray;
    color: black;
  }
}

/*
==============================================
42. How do you use @else and @else if in SCSS?
==============================================

@else: Default case when @if is false
* /
$theme: 'light';

.app {
  @if $theme == 'dark' {
    background: black;
    color: white;
  } @else {
    background: white;
    color: black;
  }
}

/*
@else if: Multiple conditions
* /
$size: 'medium';

.button {
  @if $size == 'small' {
    padding: 5px 10px;
    font-size: 12px;
  } @else if $size == 'medium' {
    padding: 10px 20px;
    font-size: 16px;
  } @else if $size == 'large' {
    padding: 15px 30px;
    font-size: 20px;
  } @else {
    padding: 10px 20px;  // Default
  }
}

/*
NESTED CONDITIONS:
* /
$type: 'button';
$variant: 'primary';

.element {
  @if $type == 'button' {
    cursor: pointer;
    
    @if $variant == 'primary' {
      background: blue;
    } @else {
      background: gray;
    }
  }
}

/*
PRACTICAL EXAMPLE:
* /
@function text-color($bg-color) {
  @if lightness($bg-color) > 50% {
    @return black;  // Light background
  } @else {
    @return white;  // Dark background
  }
}

.card {
  background: #3498db;
  color: text-color(#3498db);  // white
}

/*
==============================================
43. What is @for loop in SCSS? Explain through and to
==============================================

@for: Iterate with counter variable

THROUGH: Includes end value (inclusive)
* /
@for $i from 1 through 3 {
  .column-#{$i} {
    width: $i * 25%;
  }
}

// Generates:
// .column-1 { width: 25%; }
// .column-2 { width: 50%; }
// .column-3 { width: 75%; }

/*
TO: Excludes end value (exclusive)
* /
@for $i from 1 to 4 {
  .item-#{$i} {
    order: $i;
  }
}

// Generates: .item-1, .item-2, .item-3 (not .item-4)

/*
PRACTICAL EXAMPLES:
* /

// Grid columns
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

// Z-index layers
@for $i from 1 through 5 {
  .layer-#{$i} {
    z-index: $i * 10;
  }
}

// Animation delays
@for $i from 1 through 4 {
  .fade-in-#{$i} {
    animation-delay: $i * 0.1s;
  }
}

/*
DIFFERENCE:
through: 1 through 3 → 1, 2, 3 (includes 3)
to:      1 to 3     → 1, 2 (excludes 3)
* /

/*
==============================================
44. What is @each loop in SCSS?
==============================================

@each: Iterate over list or map

LIST ITERATION:
* /
$colors: red, green, blue;

@each $color in $colors {
  .bg-#{$color} {
    background: $color;
  }
}

// Generates:
// .bg-red { background: red; }
// .bg-green { background: green; }
// .bg-blue { background: blue; }

/*
MAP ITERATION:
* /
$theme-colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745,
  'danger': #dc3545
);

@each $name, $color in $theme-colors {
  .btn-#{$name} {
    background: $color;
  }
}

// Generates: .btn-primary, .btn-secondary, etc.

/*
MULTIPLE VALUES:
* /
$sizes: (
  'sm' 12px 8px,
  'md' 16px 12px,
  'lg' 20px 16px
);

@each $name, $font, $padding in $sizes {
  .text-#{$name} {
    font-size: $font;
    padding: $padding;
  }
}

/*
PRACTICAL EXAMPLES:
* /

// Social icons
$socials: twitter, facebook, instagram, linkedin;

@each $social in $socials {
  .icon-#{$social} {
    background-image: url('/icons/#{$social}.svg');
  }
}

// Spacing utilities
$spacings: 0, 5, 10, 15, 20, 25;

@each $space in $spacings {
  .m-#{$space} { margin: #{$space}px; }
  .p-#{$space} { padding: #{$space}px; }
}

/*
==============================================
45. What is @while loop in SCSS?
==============================================

@while: Loop while condition is true
* /
$i: 1;

@while $i <= 5 {
  .item-#{$i} {
    width: $i * 20px;
  }
  $i: $i + 1;
}

// Generates: .item-1 through .item-5

/*
PRACTICAL EXAMPLES:
* /

// Exponential scale
$scale: 1;
$i: 1;

@while $i <= 5 {
  .scale-#{$i} {
    transform: scale($scale);
  }
  $scale: $scale * 1.5;
  $i: $i + 1;
}

// Fibonacci sequence
$a: 0;
$b: 1;
$count: 0;

@while $count < 6 {
  .fib-#{$count} {
    width: #{$a}px;
  }
  $temp: $a + $b;
  $a: $b;
  $b: $temp;
  $count: $count + 1;
}

/*
WARNING: Be careful with @while - can create infinite loops!
Always ensure counter increments and condition eventually becomes false
* /

/*
COMPARISON OF LOOPS:

@for:   Best for sequential numbers
@each:  Best for lists and maps
@while: Best for complex conditions (use sparingly)

Recommendation: Use @for or @each in most cases
* /



/*
==============================================
MAPS & LISTS - SHORT ANSWERS
==============================================

46. What are lists in SCSS? How do you work with them?
==============================================

LISTS: Ordered collection of values (like arrays)
Two types: comma-separated or space-separated
* /

// Comma-separated
$colors: red, green, blue;
$fonts: 'Arial', 'Helvetica', sans-serif;

// Space-separated
$padding: 10px 20px 10px 20px;
$margin: 5px 10px;

/*
LIST FUNCTIONS:
* /

// length() - Get list length
$colors: red, green, blue;
.element {
  content: length($colors);           // 3
}

// nth() - Access item by index (starts at 1)
.element {
  color: nth($colors, 2);             // green
}

// append() - Add item to list
$new-colors: append($colors, yellow); // red, green, blue, yellow

// join() - Combine lists
$list1: red, green;
$list2: blue, yellow;
$combined: join($list1, $list2);     // red, green, blue, yellow

// index() - Find position of value
$position: index($colors, green);    // 2

/*
PRACTICAL EXAMPLES:
* /

// Iterate over list
$sizes: 12px, 14px, 16px, 18px, 20px;

@each $size in $sizes {
  $index: index($sizes, $size);
  .text-#{$index} {
    font-size: $size;
  }
}

// Multi-value lists
$shadows: (
  0 2px 4px rgba(0,0,0,0.1),
  0 4px 8px rgba(0,0,0,0.2),
  0 8px 16px rgba(0,0,0,0.3)
);

/*
==============================================
47. What are maps in SCSS? How are they different from lists?
==============================================

MAPS: Key-value pairs (like objects/dictionaries)
* /
$theme-colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745,
  'danger': #dc3545
);

$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px
);

/*
LISTS vs MAPS:

LISTS:
- Ordered collection
- Access by index (position)
- Values only
* /
$list: red, green, blue;
$value: nth($list, 2);  // green

/*
MAPS:
- Key-value pairs
- Access by key (name)
- Structured data
* /
$map: ('primary': blue, 'secondary': gray);
$value: map-get($map, 'primary');  // blue

/*
WHEN TO USE:

Lists:
- Simple collections
- Multiple values for one property
- Ordered data
* /
$fonts: Arial, Helvetica, sans-serif;
$padding: 10px 20px;

/*
Maps:
- Named values
- Configuration
- Complex data structures
* /
$config: (
  'font-size': 16px,
  'line-height': 1.5,
  'color': black
);

/*
==============================================
48. How do you access map values?
==============================================

MAP-GET: Access value by key
* /
$colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745
);

.button {
  background: map-get($colors, 'primary');     // #007bff
}

/*
WITH SASS:MATH MODULE:
* /
@use 'sass:map';

.element {
  color: map.get($colors, 'success');          // #28a745
}

/*
NESTED MAPS:
* /
$theme: (
  'colors': (
    'primary': blue,
    'secondary': gray
  ),
  'spacing': (
    'sm': 8px,
    'md': 16px
  )
);

// Access nested value
.element {
  $color-map: map-get($theme, 'colors');
  background: map-get($color-map, 'primary');  // blue
}

/*
DEFAULT VALUE (if key doesn't exist):
* /
.element {
  color: map-get($colors, 'warning') or orange;  // orange (fallback)
}

/*
PRACTICAL EXAMPLE:
* /
$button-config: (
  'padding': 10px 20px,
  'border-radius': 4px,
  'font-size': 16px
);

.button {
  padding: map-get($button-config, 'padding');
  border-radius: map-get($button-config, 'border-radius');
  font-size: map-get($button-config, 'font-size');
}

/*
==============================================
49. What are common map functions in SCSS?
==============================================

MAP-GET: Retrieve value
* /
$colors: ('primary': blue, 'secondary': gray);
.box { background: map-get($colors, 'primary'); }

/*
MAP-HAS-KEY: Check if key exists
* /
@if map-has-key($colors, 'tertiary') {
  .element { color: map-get($colors, 'tertiary'); }
} @else {
  .element { color: black; }
}

/*
MAP-KEYS: Get all keys as list
* /
$keys: map-keys($colors);  // ('primary', 'secondary')

/*
MAP-VALUES: Get all values as list
* /
$values: map-values($colors);  // (blue, gray)

/*
MAP-MERGE: Combine two maps
* /
$colors1: ('primary': blue);
$colors2: ('secondary': gray);
$all-colors: map-merge($colors1, $colors2);
// Result: ('primary': blue, 'secondary': gray)

/*
MAP-REMOVE: Remove key
* /
$updated: map-remove($colors, 'secondary');
// Result: ('primary': blue)

/*
PRACTICAL EXAMPLE:
* /
$base-theme: (
  'bg': white,
  'text': black,
  'border': gray
);

$dark-overrides: (
  'bg': black,
  'text': white
);

$dark-theme: map-merge($base-theme, $dark-overrides);
// Result: ('bg': black, 'text': white, 'border': gray)

/*
WITH SASS:MAP MODULE:
* /
@use 'sass:map';

.element {
  color: map.get($colors, 'primary');
  @if map.has-key($colors, 'tertiary') { }
}

/*
==============================================
50. How do you iterate over maps?
==============================================

@EACH with key and value:
* /
$colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745,
  'danger': #dc3545
);

@each $name, $color in $colors {
  .bg-#{$name} {
    background: $color;
  }
  
  .text-#{$name} {
    color: $color;
  }
}

/*
Generates:
.bg-primary { background: #007bff; }
.text-primary { color: #007bff; }
.bg-secondary { background: #6c757d; }
...
* /

/*
PRACTICAL EXAMPLES:
* /

// Button variants
$button-styles: (
  'primary': (blue, white),
  'secondary': (gray, black),
  'success': (green, white)
);

@each $name, $colors in $button-styles {
  .btn-#{$name} {
    background: nth($colors, 1);
    color: nth($colors, 2);
  }
}

// Breakpoints
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px
);

@each $name, $width in $breakpoints {
  @media (min-width: $width) {
    .container-#{$name} {
      max-width: $width;
    }
  }
}

// Spacing utilities
$spacings: (
  '0': 0,
  '1': 4px,
  '2': 8px,
  '3': 16px,
  '4': 24px,
  '5': 32px
);

@each $key, $value in $spacings {
  .m-#{$key} { margin: $value; }
  .mt-#{$key} { margin-top: $value; }
  .mb-#{$key} { margin-bottom: $value; }
  .p-#{$key} { padding: $value; }
}

/*
NESTED MAPS:
* /
$theme: (
  'light': (
    'bg': white,
    'text': black
  ),
  'dark': (
    'bg': black,
    'text': white
  )
);

@each $theme-name, $theme-colors in $theme {
  .theme-#{$theme-name} {
    background: map-get($theme-colors, 'bg');
    color: map-get($theme-colors, 'text');
  }
}

/*
==============================================
ADVANCED CONCEPTS - SHORT ANSWERS
==============================================

51. What is interpolation (#{}) in SCSS?
==============================================

INTERPOLATION: Insert dynamic values into selectors, property names, and strings
Syntax: #{}
* /

// In selectors
$name: 'button';
.#{$name} {              // .button
  padding: 10px;
}

// In property names
$side: 'left';
.element {
  margin-#{$side}: 10px; // margin-left: 10px
}

// In property values
$base-url: '/images';
.logo {
  background: url('#{$base-url}/logo.png');
}

// In strings
$version: '2.0';
.element {
  content: 'Version #{$version}';  // "Version 2.0"
}

/*
DYNAMIC CLASS NAMES:
* /
$sizes: 'sm', 'md', 'lg';

@each $size in $sizes {
  .btn-#{$size} {        // .btn-sm, .btn-md, .btn-lg
    padding: 10px;
  }
}

/*
WITH CALCULATIONS:
* /
$columns: 12;
@for $i from 1 through $columns {
  .col-#{$i} {           // .col-1 through .col-12
    width: #{($i / $columns) * 100%};
  }
}

/*
MEDIA QUERIES:
* /
$breakpoint: 768px;
@media (max-width: #{$breakpoint}) {
  .container { width: 100%; }
}

/*
BEM NAMING:
* /
$block: 'card';
.#{$block} {                    // .card
  &__header {                   // .card__header
    padding: 10px;
  }
  &--featured {                 // .card--featured
    border: 2px solid gold;
  }
}

/*
==============================================
52. How do you use @at-root directive?
==============================================

@AT-ROOT: Emit styles at root level (escape nesting)
* /
.parent {
  color: blue;
  
  @at-root .child {
    color: red;
  }
}

/*
Compiles to:
.parent { color: blue; }
.child { color: red; }  (not .parent .child)
* /

/*
WITH PARENT SELECTOR:
* /
.component {
  background: white;
  
  @at-root {
    .theme-dark & {      // .theme-dark .component
      background: black;
    }
  }
}

/*
ESCAPING MEDIA QUERIES:
* /
.button {
  padding: 10px;
  
  @media (max-width: 768px) {
    padding: 5px;
    
    @at-root (without: media) {
      .mobile-only {
        display: block;
      }
    }
  }
}

/*
PRACTICAL USE CASE: Modifier classes
* /
.card {
  padding: 20px;
  
  &__header {
    background: #f5f5f5;
    
    @at-root {
      .card--dark & {    // .card--dark .card__header
        background: #333;
      }
    }
  }
}

/*
WITH SELECTORS:
* /
.wrapper {
  .item {
    color: blue;
    
    @at-root {
      #{selector-append('.container', &)} {  // .container .wrapper .item
        color: red;
      }
    }
  }
}

/*
==============================================
53. What is @debug, @warn, and @error in SCSS?
==============================================

@DEBUG: Print values during compilation (for debugging)
* /
$primary-color: #007bff;
@debug "Primary color: #{$primary-color}";  // Shows in console

@function calculate-rem($px) {
  @debug "Converting #{$px} to rem";
  @return ($px / 16) * 1rem;
}

/*
@WARN: Show warning message (doesn't stop compilation)
* /
@mixin button($size) {
  @if $size < 10px {
    @warn "Button size #{$size} is very small!";
  }
  font-size: $size;
}

.btn {
  @include button(8px);  // Shows warning but still compiles
}

/*
@ERROR: Stop compilation with error message
* /
@function divide($a, $b) {
  @if $b == 0 {
    @error "Cannot divide by zero!";
  }
  @return $a / $b;
}

// $width: divide(100px, 0);  // Stops compilation

/*
PRACTICAL EXAMPLES:
* /

// Validate mixin arguments
@mixin breakpoint($name) {
  $valid-breakpoints: 'sm', 'md', 'lg', 'xl';
  
  @if not index($valid-breakpoints, $name) {
    @error "Invalid breakpoint: #{$name}. Use: #{$valid-breakpoints}";
  }
  
  @media (min-width: 768px) {
    @content;
  }
}

// Type checking
@mixin padding($value) {
  @if type-of($value) != 'number' {
    @error "Padding must be a number, got: #{type-of($value)}";
  }
  
  padding: $value;
}

// Deprecation warnings
@mixin old-mixin {
  @warn "old-mixin is deprecated. Use new-mixin instead.";
  padding: 10px;
}

/*
SUMMARY:
@debug  - Development info (always shows)
@warn   - Warnings (doesn't stop)
@error  - Critical issues (stops compilation)
* /

/*
==============================================
54. Explain !important in SCSS context
==============================================

!IMPORTANT: Same as CSS, forces priority
* /
.element {
  color: blue !important;
}

/*
WITH VARIABLES:
* /
$color: red;
.box {
  background: $color !important;  // background: red !important;
}

/*
IN MIXINS:
* /
@mixin text-style {
  font-size: 16px !important;
  color: black !important;
}

.text {
  @include text-style;
}

/*
DYNAMIC !IMPORTANT:
* /
@mixin important-text($important: false) {
  @if $important {
    color: red !important;
  } @else {
    color: red;
  }
}

.normal { @include important-text; }
.forced { @include important-text(true); }

/*
WITH INTERPOLATION (doesn't work as expected):
* /
$important: '!important';
.element {
  // color: red #{$important};  // Won't work properly
}

/*
BEST PRACTICES:

1. AVOID whenever possible
* /
// ✗ Bad
.element {
  color: red !important;
}

// ✓ Good - Use specificity
.container .element {
  color: red;
}

/*
2. Only use for:
   - Overriding third-party CSS
   - Utility classes
   - Critical styles
* /
// Utility classes (acceptable)
.text-center { text-align: center !important; }
.d-none { display: none !important; }
.text-red { color: red !important; }

/*
3. Document why you used it
* /
.override {
  // !important needed to override Bootstrap default
  padding: 20px !important;
}

/*
==============================================
55. What are CSS modules and how do they relate to SCSS?
==============================================

CSS MODULES: Scoped CSS where class names are locally scoped
Not a SCSS feature, but works with SCSS
* /

// Button.module.scss
.button {
  padding: 10px 20px;
  background: blue;
  
  &:hover {
    background: darkblue;
  }
}

.primary {
  composes: button;      // CSS Modules feature
  background: blue;
}

/*
USAGE IN JAVASCRIPT:
* /
// import styles from './Button.module.scss';
// <button className={styles.button}>Click</button>

/*
GENERATED OUTPUT:
Class names are hashed to avoid conflicts:
.Button_button__a1b2c { padding: 10px 20px; }
* /

/*
GLOBAL STYLES:
* /
:global {
  .global-class {
    color: red;
  }
}

// Or
:global(.another-global) {
  margin: 10px;
}

/*
LOCAL SCOPE (default):
* /
:local {
  .scoped-class {
    padding: 10px;
  }
}

/*
SCSS FEATURES WORK NORMALLY:
* /
$primary-color: blue;

.button {
  background: $primary-color;  // ✓ Works
  
  &:hover {                    // ✓ Works
    background: darken($primary-color, 10%);
  }
}

@mixin button-style {          // ✓ Works
  padding: 10px 20px;
}

/*
BENEFITS:
1. No naming conflicts (scoped)
2. Explicit dependencies
3. Dead code elimination
4. Still use SCSS features
* /

/*
REACT EXAMPLE:
* /
// Button.module.scss
.button {
  $bg: blue;
  background: $bg;
  padding: 10px 20px;
  
  &Primary {                   // .buttonPrimary
    background: darken($bg, 10%);
  }
}

// Button.jsx
// import styles from './Button.module.scss';
// <button className={styles.button}>
//   <span className={styles.buttonPrimary}>Primary</span>
// </button>

/*
==============================================
BEST PRACTICES - SHORT ANSWERS
==============================================

56. What are SCSS naming conventions (BEM, SMACSS)?
==============================================

BEM (Block Element Modifier):
Block: Standalone component
Element: Part of block
Modifier: Variation
* /

// Block
.card {
  padding: 20px;
  
  // Element (__)
  &__header {
    background: #f5f5f5;
  }
  
  &__title {
    font-size: 20px;
  }
  
  &__body {
    padding: 15px;
  }
  
  // Modifier (--)
  &--featured {
    border: 2px solid gold;
  }
  
  &--large {
    padding: 30px;
  }
}

/*
HTML:
<div class="card card--featured">
  <div class="card__header">
    <h2 class="card__title">Title</h2>
  </div>
  <div class="card__body">Content</div>
</div>
* /

/*
SMACSS (Scalable and Modular Architecture):
5 categories: Base, Layout, Module, State, Theme
* /

// Base - element selectors
html, body {
  margin: 0;
  padding: 0;
}

// Layout - major page sections (prefix: l-)
.l-header {
  height: 80px;
}

.l-sidebar {
  width: 300px;
}

// Module - reusable components
.button {
  padding: 10px 20px;
}

.card {
  background: white;
}

// State - states of modules (prefix: is-)
.is-active {
  background: blue;
}

.is-hidden {
  display: none;
}

.is-disabled {
  opacity: 0.5;
}

// Theme - color schemes (prefix: theme-)
.theme-dark {
  background: black;
  color: white;
}

/*
OTHER CONVENTIONS:

ITCSS (Inverted Triangle):
1. Settings - variables
2. Tools - mixins, functions
3. Generic - reset, normalize
4. Elements - bare HTML
5. Objects - layout patterns
6. Components - UI components
7. Utilities - helpers
* /

/*
OOCSS (Object-Oriented CSS):
Separate structure from skin
* /
// Structure
.box {
  padding: 20px;
  margin: 10px;
}

// Skin
.box-primary {
  background: blue;
  border: 1px solid darkblue;
}

/*
==============================================
57. How do you structure SCSS for maintainability?
==============================================

1. MODULAR ARCHITECTURE - Separate concerns
* /
scss/
├── abstracts/
│   ├── _variables.scss    // All variables
│   ├── _mixins.scss       // All mixins
│   └── _functions.scss    // All functions
│
├── base/
│   ├── _reset.scss        // CSS reset
│   └── _typography.scss   // Base typography
│
├── components/
│   ├── _button.scss       // One file per component
│   ├── _card.scss
│   └── _modal.scss
│
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   └── _grid.scss
│
└── main.scss              // Import everything

/*
2. USE PARTIAL FILES - Keep files small and focused
* /
// _button.scss - Single responsibility
.button {
  // Only button-related styles
}

/*
3. CONSISTENT NAMING - Use BEM or chosen convention
* /
.block {
  &__element { }
  &--modifier { }
}

/*
4. VARIABLES FOR EVERYTHING - No magic numbers
* /
// ✓ Good
$spacing-unit: 8px;
.element { padding: $spacing-unit * 2; }

// ✗ Bad
.element { padding: 16px; }

/*
5. LIMIT NESTING - Max 3-4 levels
* /
// ✓ Good
.card {
  &__header {
    &__title { }
  }
}

// ✗ Bad (too deep)
.page {
  .section {
    .container {
      .card {
        .header {
          .title { }  // 6 levels!
        }
      }
    }
  }
}

/*
6. ORGANIZE PROPERTIES - Group related properties
* /
.element {
  // Positioning
  position: relative;
  top: 0;
  left: 0;
  
  // Box model
  display: block;
  width: 100px;
  padding: 10px;
  margin: 20px;
  
  // Typography
  font-size: 16px;
  color: black;
  
  // Visual
  background: white;
  border: 1px solid gray;
}

/*
7. COMMENT SECTIONS - Explain complex code
* /
// =====================================
// Button Component
// =====================================
.button {
  // Base styles for all buttons
}

/*
8. USE @USE INSTEAD OF @IMPORT
* /
@use 'variables';
@use 'mixins';

/*
==============================================
58. What's the 7-1 pattern in SCSS architecture?
==============================================

7 folders + 1 main file
* /

scss/
│
├── abstracts/              // 1. Tools and helpers
│   ├── _variables.scss     //    Variables
│   ├── _mixins.scss        //    Mixins
│   ├── _functions.scss     //    Functions
│   └── _placeholders.scss  //    Placeholders
│
├── base/                   // 2. Foundation
│   ├── _reset.scss         //    Reset/normalize
│   ├── _typography.scss    //    Typography rules
│   └── _base.scss          //    Base styles
│
├── components/             // 3. Components
│   ├── _button.scss        //    Buttons
│   ├── _card.scss          //    Cards
│   ├── _form.scss          //    Forms
│   └── _modal.scss         //    Modals
│
├── layout/                 // 4. Layout
│   ├── _header.scss        //    Header
│   ├── _footer.scss        //    Footer
│   ├── _sidebar.scss       //    Sidebar
│   └── _grid.scss          //    Grid system
│
├── pages/                  // 5. Page-specific
│   ├── _home.scss          //    Home page
│   ├── _about.scss         //    About page
│   └── _contact.scss       //    Contact page
│
├── themes/                 // 6. Themes
│   ├── _dark.scss          //    Dark theme
│   ├── _light.scss         //    Light theme
│   └── _admin.scss         //    Admin theme
│
├── vendors/                // 7. Third-party
│   ├── _bootstrap.scss     //    Bootstrap overrides
│   └── _normalize.scss     //    Normalize
│
└── main.scss               // Main file (imports all)

/*
MAIN.SCSS structure:
* /
// 1. Abstracts (no output)
@use 'abstracts/variables';
@use 'abstracts/mixins';
@use 'abstracts/functions';

// 2. Vendors
@use 'vendors/normalize';

// 3. Base
@use 'base/reset';
@use 'base/typography';

// 4. Layout
@use 'layout/header';
@use 'layout/footer';
@use 'layout/grid';

// 5. Components
@use 'components/button';
@use 'components/card';
@use 'components/form';

// 6. Pages
@use 'pages/home';

// 7. Themes
@use 'themes/dark';

/*
WHY 7-1 PATTERN:
1. Clear organization
2. Easy to find files
3. Scalable for large projects
4. Team-friendly
5. Industry standard
* /

/*
==============================================
59. How do you avoid specificity issues in SCSS?
==============================================

1. AVOID DEEP NESTING - Max 3 levels
* /
// ✗ Bad (high specificity)
.page .section .container .card .title {
  font-size: 20px;
}

// ✓ Good (flat)
.card__title {
  font-size: 20px;
}

/*
2. USE BEM - Single class selectors
* /
// ✓ Low specificity
.button { }
.button--primary { }
.button__icon { }

// ✗ High specificity
.header .nav ul li a.button { }

/*
3. AVOID IDs - Use classes
* /
// ✗ Bad
#header { }

// ✓ Good
.header { }

/*
4. DON'T QUALIFY SELECTORS
* /
// ✗ Bad
div.card { }
a.button { }

// ✓ Good
.card { }
.button { }

/*
5. USE CHILD SELECTORS SPARINGLY
* /
// ✗ Avoid
.nav ul li a { }

// ✓ Better
.nav__link { }

/*
6. LEVERAGE PLACEHOLDERS
* /
%button-base {
  padding: 10px;
}

.btn-primary {
  @extend %button-base;  // Same specificity
}

/*
7. UTILITY CLASSES LAST
* /
// Utility classes can use !important (acceptable)
.text-center { text-align: center !important; }

/*
SPECIFICITY ORDER (low to high):
1. Elements:           p, div (0,0,1)
2. Classes:            .button (0,1,0)
3. IDs:                #header (1,0,0)
4. Inline:             style="" (1,0,0,0)
5. !important:         Overrides all
* /

/*
==============================================
60. What are performance best practices in SCSS?
==============================================

1. MINIMIZE OUTPUT - Use @extend for repeated styles
* /
%button-base {
  padding: 10px 20px;
  border: none;
}

.btn-1 { @extend %button-base; }
.btn-2 { @extend %button-base; }
// Output: .btn-1, .btn-2 { padding: 10px 20px; border: none; }

/*
2. LIMIT NESTING - Reduces selector complexity
* /
// ✗ Bad (complex selector)
.a .b .c .d .e { }

// ✓ Good (simple)
.component__element { }

/*
3. AVOID @import - Use @use (loads once)
* /
@use 'variables';  // Loads once
// @import 'variables';  // Can load multiple times

/*
4. COMPILE IN PRODUCTION - Use compressed output
* /
// sass input.scss output.css --style=compressed

/*
5. REMOVE UNUSED CODE - Audit regularly
* /
// Delete unused variables, mixins, components

/*
6. USE NATIVE CSS WHEN POSSIBLE
* /
// ✓ Native CSS custom properties (when appropriate)
:root {
  --primary: blue;
}

/*
7. OPTIMIZE SELECTORS - Keep specificity low
* /
// ✗ Slow
.page .section .card .title { }

// ✓ Fast
.card__title { }

/*
8. MINIMIZE CALC OPERATIONS
* /
// ✗ Runtime calculation
.box {
  width: calc(100% - 20px);
}

// ✓ Build-time (when possible)
$width: 100% - 20px;
.box {
  width: $width;
}

/*
9. COMPRESS IMAGES/ASSETS REFERENCED
* /
.hero {
  background: url('optimized-image.jpg');  // Use compressed images
}

/*
10. SPLIT CSS FOR CODE SPLITTING
* /
// Load critical CSS inline
// Load non-critical CSS async

/*
11. USE AUTOPREFIXER - Let tools handle vendor prefixes
* /
// Don't write manually:
// -webkit-transform: scale(1);
// -moz-transform: scale(1);
// transform: scale(1);

// Write once:
transform: scale(1);
// Let autoprefixer add prefixes

/*
12. AUDIT COMPILED CSS SIZE
* /
// Check output file size
// Remove duplicate/unused code
// Use tools like PurgeCSS

/*
COMPILATION FLAGS:
* /
// Development
// sass input.scss output.css --style=expanded --source-map

// Production
// sass input.scss output.css --style=compressed --no-source-map

/*
SUMMARY:
1. Minimize output size
2. Optimize selectors
3. Use @use not @import
4. Compress for production
5. Remove unused code
6. Keep nesting shallow
7. Use native CSS when possible
* /

/*
==============================================
RESPONSIVE DESIGN - SHORT ANSWERS
==============================================

61. How do you create responsive mixins in SCSS?
==============================================

BASIC BREAKPOINT MIXIN:
* /
@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

// Usage
.container {
  width: 1200px;
  
  @include desktop {
    width: 1000px;
  }
  
  @include tablet {
    width: 750px;
  }
  
  @include mobile {
    width: 100%;
  }
}

/*
PARAMETRIC BREAKPOINT MIXIN:
* /
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'small' {
    @media (max-width: 576px) { @content; }
  }
  @else if $breakpoint == 'medium' {
    @media (max-width: 768px) { @content; }
  }
  @else if $breakpoint == 'large' {
    @media (max-width: 992px) { @content; }
  }
}

.element {
  font-size: 18px;
  
  @include respond-to('medium') {
    font-size: 16px;
  }
}

/*
ADVANCED MIXIN WITH MAP:
* /
$breakpoints: (
  'xs': 0,
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px
);

@mixin breakpoint($size) {
  $breakpoint: map-get($breakpoints, $size);
  
  @if $breakpoint {
    @media (min-width: $breakpoint) {
      @content;
    }
  } @else {
    @error "Invalid breakpoint: #{$size}";
  }
}

// Usage
.sidebar {
  display: none;
  
  @include breakpoint('md') {
    display: block;
    width: 300px;
  }
}

/*
MIN-MAX MIXIN:
* /
@mixin between($min, $max) {
  @media (min-width: $min) and (max-width: $max) {
    @content;
  }
}

.hero {
  height: 600px;
  
  @include between(768px, 1024px) {
    height: 400px;
  }
}

/*
==============================================
62. What's the best way to handle breakpoints in SCSS?
==============================================

METHOD 1: Centralized breakpoint map
* /
$breakpoints: (
  'xs': 0,
  'sm': 576px,
  'md': 768px,
  'lg': 992px,
  'xl': 1200px,
  'xxl': 1400px
);

@function breakpoint($name) {
  @return map-get($breakpoints, $name);
}

@mixin respond-above($name) {
  @media (min-width: breakpoint($name)) {
    @content;
  }
}

@mixin respond-below($name) {
  @media (max-width: breakpoint($name) - 1) {
    @content;
  }
}

// Usage
.container {
  width: 100%;
  
  @include respond-above('md') {
    width: 750px;
  }
  
  @include respond-above('lg') {
    width: 970px;
  }
}

/*
METHOD 2: Semantic breakpoint names
* /
@mixin phone {
  @media (max-width: 599px) { @content; }
}

@mixin tablet-portrait {
  @media (min-width: 600px) and (max-width: 899px) { @content; }
}

@mixin tablet-landscape {
  @media (min-width: 900px) and (max-width: 1199px) { @content; }
}

@mixin desktop {
  @media (min-width: 1200px) { @content; }
}

/*
METHOD 3: Container queries (modern approach)
* /
@mixin container($width) {
  @container (min-width: $width) {
    @content;
  }
}

/*
BEST PRACTICES:
1. Define once, use everywhere
2. Use meaningful names
3. Mobile-first approach
4. Document breakpoints
* /

// _breakpoints.scss
// xs: 0-575px    - Mobile portrait
// sm: 576-767px  - Mobile landscape
// md: 768-991px  - Tablet
// lg: 992-1199px - Desktop
// xl: 1200px+    - Large desktop

/*
==============================================
63. How do you manage media queries in SCSS?
==============================================

METHOD 1: Nested media queries (recommended)
* /
.sidebar {
  width: 300px;
  background: white;
  
  @media (max-width: 1024px) {
    width: 250px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  .title {
    font-size: 20px;
    
    @media (max-width: 768px) {
      font-size: 18px;
    }
  }
}

/*
METHOD 2: Mixin-based (DRY)
* /
$tablet: 768px;
$mobile: 576px;

@mixin tablet {
  @media (max-width: $tablet) { @content; }
}

@mixin mobile {
  @media (max-width: $mobile) { @content; }
}

.card {
  padding: 30px;
  
  @include tablet {
    padding: 20px;
  }
  
  @include mobile {
    padding: 10px;
  }
}

/*
METHOD 3: Centralized media query manager
* /
@mixin mq($breakpoint, $type: 'max') {
  $breakpoints: (
    'mobile': 576px,
    'tablet': 768px,
    'desktop': 1024px
  );
  
  $value: map-get($breakpoints, $breakpoint);
  
  @if $type == 'max' {
    @media (max-width: $value) { @content; }
  } @else if $type == 'min' {
    @media (min-width: $value) { @content; }
  }
}

.element {
  @include mq('tablet', 'max') {
    width: 100%;
  }
}

/*
METHOD 4: Content-based breakpoints
* /
@mixin when-narrow {
  @media (max-width: 40em) { @content; }
}

@mixin when-wide {
  @media (min-width: 64em) { @content; }
}

/*
ORGANIZATION PATTERN:
* /
// Component with all breakpoints together
.navigation {
  // Desktop styles
  display: flex;
  height: 80px;
  
  // Tablet
  @media (max-width: 1024px) {
    height: 60px;
  }
  
  // Mobile
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
}

/*
==============================================
64. Explain mobile-first vs desktop-first approach in SCSS
==============================================

MOBILE-FIRST: Start with mobile, add styles for larger screens
Use min-width media queries
* /

// Mobile styles (default, no media query)
.container {
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

// Tablet and up (min-width)
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
    font-size: 16px;
  }
}

// Desktop and up (min-width)
@media (min-width: 1024px) {
  .container {
    width: 970px;
    padding: 30px;
    font-size: 18px;
  }
}

/*
MOBILE-FIRST MIXIN:
* /
@mixin tablet-up {
  @media (min-width: 768px) { @content; }
}

@mixin desktop-up {
  @media (min-width: 1024px) { @content; }
}

.card {
  padding: 10px;        // Mobile default
  
  @include tablet-up {
    padding: 20px;      // Enhanced for tablet
  }
  
  @include desktop-up {
    padding: 30px;      // Enhanced for desktop
  }
}

/*
DESKTOP-FIRST: Start with desktop, override for smaller screens
Use max-width media queries
* /

// Desktop styles (default, no media query)
.container {
  width: 1200px;
  padding: 30px;
  font-size: 18px;
}

// Tablet and down (max-width)
@media (max-width: 1023px) {
  .container {
    width: 750px;
    padding: 20px;
    font-size: 16px;
  }
}

// Mobile and down (max-width)
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
}

/*
DESKTOP-FIRST MIXIN:
* /
@mixin tablet-down {
  @media (max-width: 1023px) { @content; }
}

@mixin mobile-down {
  @media (max-width: 767px) { @content; }
}

.sidebar {
  width: 300px;         // Desktop default
  
  @include tablet-down {
    width: 250px;       // Simplified for tablet
  }
  
  @include mobile-down {
    width: 100%;        // Full width for mobile
  }
}

/*
COMPARISON:

Mobile-First (Recommended):
✓ Better performance (mobile loads less CSS)
✓ Progressive enhancement
✓ Matches user behavior (mobile traffic)
* /
.element {
  font-size: 14px;                    // Base (mobile)
  @media (min-width: 768px) {
    font-size: 16px;                  // Add for larger
  }
}

/*
Desktop-First (Legacy):
✗ Mobile loads unnecessary CSS
✗ Graceful degradation
* /
.element {
  font-size: 18px;                    // Base (desktop)
  @media (max-width: 767px) {
    font-size: 14px;                  // Override for smaller
  }
}

/*
==============================================
65. How do you create fluid typography with SCSS?
==============================================

METHOD 1: Clamp function (modern)
* /
.heading {
  // min: 16px, preferred: 4vw, max: 32px
  font-size: clamp(16px, 4vw, 32px);
}

/*
METHOD 2: Calc with viewport units
* /
$min-font: 16px;
$max-font: 32px;
$min-vw: 320px;
$max-vw: 1200px;

.text {
  font-size: calc(#{$min-font} + (#{$max-font} - #{$min-font}) * 
              ((100vw - #{$min-vw}) / (#{$max-vw} - #{$min-vw})));
}

/*
METHOD 3: SCSS Function (recommended)
* /
@function fluid-size($min, $max, $min-vw: 320px, $max-vw: 1200px) {
  $factor: 1 / ($max-vw - $min-vw) * ($max - $min);
  $calc-value: unquote("#{ $min - ($min-vw * $factor) } + #{ 100vw * $factor }");
  
  @return clamp(#{$min}, #{$calc-value}, #{$max});
}

.heading {
  font-size: fluid-size(16px, 32px);
  margin: fluid-size(10px, 40px);
}

/*
METHOD 4: Mixin for fluid typography
* /
@mixin fluid-type($min-size, $max-size, $min-width: 320px, $max-width: 1200px) {
  font-size: $min-size;
  
  @media (min-width: $min-width) {
    font-size: calc(#{$min-size} + (#{strip-unit($max-size)} - #{strip-unit($min-size)}) * 
                    ((100vw - #{$min-width}) / #{strip-unit($max-width - $min-width)}));
  }
  
  @media (min-width: $max-width) {
    font-size: $max-size;
  }
}

@function strip-unit($number) {
  @return $number / ($number * 0 + 1);
}

.title {
  @include fluid-type(20px, 48px);
}

/*
METHOD 5: Typography scale
* /
$font-sizes: (
  'xs': (12px, 14px),
  'sm': (14px, 16px),
  'md': (16px, 20px),
  'lg': (20px, 28px),
  'xl': (28px, 40px)
);

@mixin font-size($size) {
  $values: map-get($font-sizes, $size);
  font-size: nth($values, 1);
  
  @media (min-width: 768px) {
    font-size: nth($values, 2);
  }
}

.heading {
  @include font-size('xl');  // 28px -> 40px
}

/*
PRACTICAL EXAMPLE:
* /
// Typography system
h1 { font-size: clamp(24px, 5vw, 48px); }
h2 { font-size: clamp(20px, 4vw, 36px); }
h3 { font-size: clamp(18px, 3vw, 28px); }
p  { font-size: clamp(14px, 2vw, 18px); }

/*
==============================================
REAL-WORLD SCENARIOS - SHORT ANSWERS
==============================================

66. How do you create a theming system with SCSS?
==============================================

METHOD 1: CSS Custom Properties (recommended)
* /
// Define themes
$themes: (
  'light': (
    'bg': #ffffff,
    'text': #000000,
    'primary': #007bff,
    'border': #dee2e6
  ),
  'dark': (
    'bg': #1a1a1a,
    'text': #ffffff,
    'primary': #4dabf7,
    'border': #495057
  )
);

// Generate CSS variables
@each $theme, $colors in $themes {
  [data-theme='#{$theme}'] {
    @each $name, $color in $colors {
      --color-#{$name}: #{$color};
    }
  }
}

// Usage
.card {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/*
METHOD 2: Mixin-based theming
* /
@mixin theme($theme-name) {
  [data-theme='#{$theme-name}'] & {
    @content;
  }
}

.button {
  background: blue;
  color: white;
  
  @include theme('dark') {
    background: #333;
    border: 1px solid #555;
  }
  
  @include theme('high-contrast') {
    background: black;
    border: 2px solid yellow;
  }
}

/*
METHOD 3: Map-based theme system
* /
$light-theme: (
  'primary': #007bff,
  'secondary': #6c757d,
  'bg': white,
  'text': black
);

$dark-theme: (
  'primary': #4dabf7,
  'secondary': #868e96,
  'bg': #1a1a1a,
  'text': white
);

@function theme-color($key, $theme: 'light') {
  $themes: (
    'light': $light-theme,
    'dark': $dark-theme
  );
  
  $theme-map: map-get($themes, $theme);
  @return map-get($theme-map, $key);
}

/*
METHOD 4: Complete theming system
* /
// _themes.scss
:root {
  // Light theme (default)
  --color-primary: #007bff;
  --color-bg: #ffffff;
  --color-text: #000000;
  --spacing: 16px;
}

[data-theme='dark'] {
  --color-primary: #4dabf7;
  --color-bg: #1a1a1a;
  --color-text: #ffffff;
}

// Apply theme
body {
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--spacing);
}

/*
JavaScript to switch:
document.documentElement.setAttribute('data-theme', 'dark');
* /

/*
==============================================
67. How do you implement dark mode with SCSS?
==============================================

METHOD 1: Data attribute (recommended)
* /
:root {
  --bg: #ffffff;
  --text: #000000;
  --card-bg: #f8f9fa;
}

[data-theme='dark'] {
  --bg: #1a1a1a;
  --text: #ffffff;
  --card-bg: #2d2d2d;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card-bg);
}

/*
METHOD 2: Prefers-color-scheme (system preference)
* /
:root {
  --bg: #ffffff;
  --text: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #ffffff;
  }
}

/*
METHOD 3: Class-based toggle
* /
$light-bg: #ffffff;
$light-text: #000000;
$dark-bg: #1a1a1a;
$dark-text: #ffffff;

body {
  background: $light-bg;
  color: $light-text;
  
  &.dark-mode {
    background: $dark-bg;
    color: $dark-text;
  }
}

/*
METHOD 4: Mixin approach
* /
@mixin dark-mode {
  @media (prefers-color-scheme: dark) {
    @content;
  }
  
  [data-theme='dark'] & {
    @content;
  }
}

.card {
  background: white;
  color: black;
  
  @include dark-mode {
    background: #2d2d2d;
    color: white;
  }
}

/*
COMPLETE DARK MODE SYSTEM:
* /
// _colors.scss
$colors-light: (
  'bg-primary': #ffffff,
  'bg-secondary': #f8f9fa,
  'text-primary': #000000,
  'text-secondary': #6c757d,
  'border': #dee2e6
);

$colors-dark: (
  'bg-primary': #1a1a1a,
  'bg-secondary': #2d2d2d,
  'text-primary': #ffffff,
  'text-secondary': #adb5bd,
  'border': #495057
);

// Generate CSS variables
:root {
  @each $name, $color in $colors-light {
    --#{$name}: #{$color};
  }
}

[data-theme='dark'] {
  @each $name, $color in $colors-dark {
    --#{$name}: #{$color};
  }
}

// Usage
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

/*
==============================================
68. How do you create utility classes with SCSS?
==============================================

SPACING UTILITIES:
* /
$spacings: (0, 4, 8, 12, 16, 20, 24, 32, 40, 48);

@each $size in $spacings {
  .m-#{$size} { margin: #{$size}px !important; }
  .mt-#{$size} { margin-top: #{$size}px !important; }
  .mb-#{$size} { margin-bottom: #{$size}px !important; }
  .ml-#{$size} { margin-left: #{$size}px !important; }
  .mr-#{$size} { margin-right: #{$size}px !important; }
  
  .p-#{$size} { padding: #{$size}px !important; }
  .pt-#{$size} { padding-top: #{$size}px !important; }
  .pb-#{$size} { padding-bottom: #{$size}px !important; }
  .pl-#{$size} { padding-left: #{$size}px !important; }
  .pr-#{$size} { padding-right: #{$size}px !important; }
}

/*
TEXT UTILITIES:
* /
$text-aligns: left, center, right, justify;

@each $align in $text-aligns {
  .text-#{$align} {
    text-align: $align !important;
  }
}

$font-weights: (
  'light': 300,
  'normal': 400,
  'medium': 500,
  'bold': 700
);

@each $name, $weight in $font-weights {
  .font-#{$name} {
    font-weight: $weight !important;
  }
}

/*
COLOR UTILITIES:
* /
$colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745,
  'danger': #dc3545
);

@each $name, $color in $colors {
  .text-#{$name} { color: $color !important; }
  .bg-#{$name} { background: $color !important; }
  .border-#{$name} { border-color: $color !important; }
}

/*
DISPLAY UTILITIES:
* /
$displays: none, block, inline, inline-block, flex, grid;

@each $display in $displays {
  .d-#{$display} {
    display: $display !important;
  }
}

/*
FLEXBOX UTILITIES:
* /
.d-flex { display: flex !important; }
.flex-row { flex-direction: row !important; }
.flex-column { flex-direction: column !important; }
.justify-start { justify-content: flex-start !important; }
.justify-center { justify-content: center !important; }
.justify-between { justify-content: space-between !important; }
.items-center { align-items: center !important; }

/*
RESPONSIVE UTILITIES:
* /
$breakpoints: (
  'sm': 576px,
  'md': 768px,
  'lg': 992px
);

@each $bp-name, $bp-value in $breakpoints {
  @media (min-width: $bp-value) {
    .d-#{$bp-name}-none { display: none !important; }
    .d-#{$bp-name}-block { display: block !important; }
    .d-#{$bp-name}-flex { display: flex !important; }
  }
}

/*
==============================================
69. How do you handle vendor prefixes in SCSS?
==============================================

METHOD 1: Autoprefixer (recommended - don't write manually)
* /
// Write standard CSS
.element {
  transform: scale(1.2);
  transition: all 0.3s;
}

// Autoprefixer adds prefixes automatically in build process
// No need to write them manually!

/*
METHOD 2: Mixin for vendor prefixes (legacy/manual)
* /
@mixin transform($value) {
  -webkit-transform: $value;
  -moz-transform: $value;
  -ms-transform: $value;
  transform: $value;
}

@mixin transition($value) {
  -webkit-transition: $value;
  -moz-transition: $value;
  transition: $value;
}

.element {
  @include transform(rotate(45deg));
  @include transition(all 0.3s ease);
}

/*
METHOD 3: Generic prefix mixin
* /
@mixin prefix($property, $value, $prefixes: (webkit, moz, ms)) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.box {
  @include prefix(transform, scale(1.5), (webkit, moz));
}

/*
MODERN APPROACH (Recommended):
* /
// 1. Install autoprefixer
// npm install autoprefixer

// 2. Configure in postcss.config.js
// module.exports = {
//   plugins: [
//     require('autoprefixer')
//   ]
// }

// 3. Write standard CSS
.element {
  display: flex;
  transform: translateX(10px);
}

// Autoprefixer handles everything!

/*
BROWSERSLIST CONFIGURATION:
* /
// package.json
{
  "browserslist": [
    "last 2 versions",
    "> 1%",
    "not dead"
  ]
}

/*
==============================================
70. How do you optimize SCSS for production?
==============================================

1. COMPRESS OUTPUT:
* /
// sass input.scss output.css --style=compressed

/*
2. REMOVE SOURCE MAPS:
* /
// sass input.scss output.css --no-source-map

/*
3. PURGE UNUSED CSS:
* /
// Using PurgeCSS
// npm install @fullhuman/postcss-purgecss

// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/** /*.html', './src/** /*.jsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
}

/*
4. OPTIMIZE SELECTORS:
* /
// ✗ Bad (high specificity, long selector)
.page .section .container .card .title { }

// ✓ Good (low specificity, short selector)
.card__title { }

/*
5. USE @USE INSTEAD OF @IMPORT:
* /
@use 'variables';  // Loads once
@use 'mixins';

/*
6. MINIMIZE NESTING:
* /
// ✗ Bad (too deep)
.a {
  .b {
    .c {
      .d { }
    }
  }
}

// ✓ Good (max 3 levels)
.component {
  &__element { }
}

/*
7. USE PLACEHOLDER SELECTORS:
* /
%button-base {
  padding: 10px 20px;
}

.btn-1 { @extend %button-base; }  // Grouped in output

/*
8. REMOVE UNUSED VARIABLES/MIXINS:
* /
// Audit and remove unused code

/*
9. SPLIT CODE FOR CODE-SPLITTING:
* /
// main.scss (critical)
// components.scss (lazy load)

/*
10. PRODUCTION BUILD SCRIPT:
* /
// package.json
{
  "scripts": {
    "build:css": "sass src/scss:dist/css --style=compressed --no-source-map",
    "build:optimize": "npm run build:css && purgecss --css dist/css/*.css --content src/** /*.html --output dist/css"
  }
}

/*
COMPLETE OPTIMIZATION WORKFLOW:
* /
// 1. Write SCSS
// 2. Compile with compression
// 3. Run autoprefixer
// 4. Purge unused CSS
// 5. Minify (if not already)
// 6. Generate hash for cache busting

/*
==============================================
INTEGRATION & TOOLING - SHORT ANSWERS
==============================================

71. How do you integrate SCSS with React/Vue/Angular?
==============================================

REACT (Create React App):
* /
// 1. Install sass
// npm install sass

// 2. Import in component
// import './Button.scss';

// Button.jsx
// import React from 'react';
// import './Button.scss';
//
// function Button() {
//   return <button className="btn btn--primary">Click</button>;
// }

// Button.scss
.btn {
  padding: 10px 20px;
  
  &--primary {
    background: blue;
    color: white;
  }
}

/*
REACT (CSS Modules):
* /
// Button.module.scss
.button {
  padding: 10px 20px;
  background: blue;
}

// Button.jsx
// import styles from './Button.module.scss';
//
// function Button() {
//   return <button className={styles.button}>Click</button>;
// }

/*
VUE 3:
* /
// <template>
//   <div class="component">
//     <h1 class="title">Hello</h1>
//   </div>
// </template>
//
// <style lang="scss" scoped>
// $primary: blue;
//
// .component {
//   .title {
//     color: $primary;
//   }
// }
// </style>

/*
ANGULAR:
* /
// angular.json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}

// Component
// @Component({
//   selector: 'app-button',
//   templateUrl: './button.component.html',
//   styleUrls: ['./button.component.scss']
// })

// button.component.scss
.button {
  padding: 10px 20px;
  
  &:hover {
    background: darken(blue, 10%);
  }
}

/*
NEXT.JS:
* /
// 1. Install sass
// npm install sass

// 2. Import in pages/_app.js
// import '../styles/globals.scss';

// 3. Use CSS Modules
// import styles from './Button.module.scss';

/*
==============================================
72. What are SCSS preprocessor options (dart-sass, node-sass)?
==============================================

DART SASS (Recommended - Official):
* /
// Install
// npm install sass

// Features:
// - Official implementation
// - Actively maintained
// - @use and @forward support
// - Better error messages
// - Faster compilation
// - Pure JavaScript (no native dependencies)

// Usage
// sass input.scss output.css

/*
NODE-SASS (Deprecated):
* /
// Install
// npm install node-sass

// Issues:
// - No longer maintained
// - No @use/@forward support
// - C++ binding (installation issues)
// - Slower development

// Don't use for new projects!

/*
COMPARISON:

Feature          | Dart Sass        | Node-Sass
-----------------|------------------|------------------
Status           | Active ✓         | Deprecated ✗
@use/@forward    | Yes ✓            | No ✗
Performance      | Fast             | Faster (but deprecated)
Installation     | Easy (pure JS)   | Complex (native)
Future           | Recommended      | Avoid
* /

/*
MIGRATION FROM NODE-SASS:
* /
// 1. Uninstall node-sass
// npm uninstall node-sass

// 2. Install sass (dart-sass)
// npm install sass

// 3. Update scripts (usually automatic)
// "scripts": {
//   "sass": "sass src/scss:dist/css"
// }

// 4. Update imports to @use
// Old: @import 'variables';
// New: @use 'variables';

/*
==============================================
73. How do you set up SCSS in Webpack/Vite?
==============================================

WEBPACK SETUP:
* /
// 1. Install dependencies
// npm install sass sass-loader css-loader style-loader

// 2. webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',      // 3. Inject CSS into DOM
          'css-loader',        // 2. Turns CSS into JS
          'sass-loader'        // 1. Compiles SCSS to CSS
        ]
      }
    ]
  }
};

// 3. Import in entry
// import './styles/main.scss';

/*
WEBPACK with MiniCssExtractPlugin (production):
* /
// npm install mini-css-extract-plugin

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,  // Extract to file
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};

/*
VITE SETUP:
* /
// 1. Install sass
// npm install -D sass

// 2. vite.config.js (optional configuration)
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
}

// 3. Import in main.js
// import './styles/main.scss';

// That's it! Vite handles SCSS automatically

/*
VITE with path aliases:
* /
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/variables" as *;`
      }
    }
  }
});

/*
==============================================
74. What are source maps in SCSS compilation?
==============================================

SOURCE MAPS: Link compiled CSS back to original SCSS
Helps with debugging in browser DevTools
* /

// Generate source map
// sass input.scss output.css --source-map

// Output files:
// output.css
// output.css.map

/*
IN BROWSER DEVTOOLS:
Instead of seeing:
  line 45 in output.css

You see:
  line 12 in _button.scss
* /

/*
WEBPACK CONFIGURATION:
* /
module.exports = {
  devtool: 'source-map',  // or 'inline-source-map' for dev
  
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};

/*
VITE CONFIGURATION:
* /
export default {
  css: {
    devSourcemap: true  // Enable in development
  }
};

/*
PRODUCTION:
* /
// Disable source maps for production
// sass input.scss output.css --no-source-map

// Webpack production
module.exports = {
  devtool: false,  // Disable source maps
  // or
  devtool: 'hidden-source-map'  // For error reporting only
};

/*
SOURCE MAP TYPES:

Development:
- source-map: Full, separate file
- inline-source-map: Embedded in CSS
- eval-source-map: Fast rebuild

Production:
- none: No source maps
- hidden-source-map: For error reporting
* /

/*
==============================================
75. How do you use SCSS with CSS frameworks like Bootstrap?
==============================================

METHOD 1: Import Bootstrap SCSS
* /
// 1. Install Bootstrap
// npm install bootstrap

// 2. Import in your SCSS
// main.scss
@import '~bootstrap/scss/bootstrap';

// Or customize variables first
$primary: #ff6b6b;
$border-radius: 8px;

@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

// Import only needed components
@import '~bootstrap/scss/root';
@import '~bootstrap/scss/reboot';
@import '~bootstrap/scss/grid';
@import '~bootstrap/scss/buttons';

/*
METHOD 2: Override Bootstrap variables
* /
// custom.scss
$primary: #007bff;
$secondary: #6c757d;
$font-family-base: 'Roboto', sans-serif;
$border-radius: 8px;

@import '~bootstrap/scss/bootstrap';

// Your custom styles
.custom-button {
  @extend .btn;
  @extend .btn-primary;
  border-radius: $border-radius * 2;
}

/*
METHOD 3: Use Bootstrap mixins
* /
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.custom-container {
  @include make-container();
  @include make-container-max-widths();
}

.custom-row {
  @include make-row();
}

.custom-col {
  @include make-col-ready();
  @include make-col(6);
  
  @include media-breakpoint-up(md) {
    @include make-col(4);
  }
}

/*
METHOD 4: Partial Bootstrap import
* /
// Only import what you need
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

// Utilities API
@import '~bootstrap/scss/utilities/api';

// Components you need
@import '~bootstrap/scss/grid';
@import '~bootstrap/scss/buttons';
@import '~bootstrap/scss/forms';

/*
WITH VITE:
* /
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/functions";
                         @import "bootstrap/scss/variables";
                         @import "bootstrap/scss/mixins";`
      }
    }
  }
}

/*
OVERRIDE THEME COLORS:
* /
$theme-colors: (
  'primary': #007bff,
  'secondary': #6c757d,
  'success': #28a745,
  'custom': #ff6b6b  // Add custom color
);

@import '~bootstrap/scss/bootstrap';

// Now you can use .btn-custom, .bg-custom, etc.

/*
USE BOOTSTRAP FUNCTIONS:
* /
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.element {
  // Use Bootstrap's color functions
  background: theme-color('primary');
  padding: spacer(3);  // Bootstrap spacing
  
  @include media-breakpoint-up(md) {
    padding: spacer(5);
  }
}

/*
BEST PRACTICES:
1. Import only what you need
2. Customize variables before importing
3. Use Bootstrap mixins for consistency
4. Don't override Bootstrap classes directly
5. Create custom classes that extend Bootstrap

*/
