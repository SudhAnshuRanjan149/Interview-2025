/*

MASTER CSS INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS – From Basic → Advanced)

========================================================
SECTION 1 — CSS BASICS & CORE FUNDAMENTALS
========================================================
1. What is CSS and why is it used?  
2. What are the different ways to apply CSS (inline, internal, external)?  
3. What is the syntax of a CSS rule?  
4. What are CSS selectors and how do they work?  
5. What are the different types of selectors in CSS?  
6. What is the difference between class selector and ID selector?  
7. What are attribute selectors in CSS?  
8. What are pseudo-classes and pseudo-elements?  
9. What is the universal selector in CSS and when is it used?  
10. What is specificity in CSS and how is it calculated?  
11. What is the cascade in CSS and how does it determine final styles?  
12. What is the !important rule and when should you avoid it?  
13. What are CSS comments and how are they written?  
14. What is the difference between `display: none` and `visibility: hidden`?  
15. What is the difference between `block`, `inline`, and `inline-block` elements?  

========================================================
SECTION 2 — CSS COLORS, UNITS, AND VALUES
========================================================
16. What are the different units in CSS (px, em, rem, vw, vh, %)?  
17. How do absolute units differ from relative units?  
18. What is the difference between em and rem?  
19. What are CSS color formats (hex, rgb, rgba, hsl)?  
20. What is opacity and how does it differ from rgba alpha?  

========================================================
SECTION 3 — CSS BOX MODEL
========================================================
21. What is the CSS box model?  
22. What are content, padding, border, and margin?  
23. What is `box-sizing: content-box` vs `box-sizing: border-box`?  
24. What is margin collapsing and when does it occur?  
25. What is the difference between padding and margin?  

========================================================
SECTION 4 — LAYOUT: FLOATS, POSITIONING, DISPLAY
========================================================
26. What is the float property and how does float-based layout work?  
27. What is clearfix and why is it needed?  
28. What are the different CSS position values (static, relative, absolute, fixed, sticky)?  
29. What is stacking context in CSS?  
30. What is z-index and how does it work?  
31. What are inline, block, and inline-block display types?  
32. What is the difference between `overflow: hidden`, `scroll`, and `auto`?  

========================================================
SECTION 5 — FLEXBOX (MODERN LAYOUT)
========================================================
33. What is Flexbox and when should it be used?  
34. What are flex container and flex items?  
35. What do justify-content, align-items, and align-content do?  
36. What is flex-grow, flex-shrink, and flex-basis?  
37. What is the shorthand flex property?  
38. What is flex-direction and how does it affect layout?  
39. What are flex-wrap and flex-flow?  
40. How does align-self differ from align-items?  

========================================================
SECTION 6 — CSS GRID (ADVANCED LAYOUT)
========================================================
41. What is CSS Grid and how is it different from Flexbox?  
42. What are grid-template-columns and grid-template-rows?  
43. What is the repeat() function in CSS Grid?  
44. What are grid areas and how are they defined?  
45. What is auto-fit vs auto-fill?  
46. How do minmax() and fractional units (fr) work?  
47. What are implicit vs explicit grid tracks?  
48. How does grid-template-areas simplify layouts?  

========================================================
SECTION 7 — RESPONSIVE DESIGN & MEDIA QUERIES
========================================================
49. What is responsive web design?  
50. What are media queries and how do you use them?  
51. What are breakpoints and how do you choose them?  
52. What is mobile-first design?  
53. What is the difference between min-width and max-width media queries?  
54. How do viewport units (vh, vw) help with responsive design?  

========================================================
SECTION 8 — TYPOGRAPHY & FONTS
========================================================
55. What are web-safe fonts?  
56. What is the @font-face rule?  
57. What is the difference between serif and sans-serif fonts?  
58. What are font-weight, font-style, and font-variant?  
59. What is line-height and how is it calculated?  
60. What is letter-spacing and word-spacing?  
61. What is text-overflow and how does ellipsis work?  

========================================================
SECTION 9 — TRANSFORMS, TRANSITIONS & ANIMATIONS
========================================================
62. What is transform and what are translate, rotate, scale, skew?  
63. What are CSS transitions and how do they work?  
64. What is transition-timing-function?  
65. What are CSS animations and keyframes?  
66. What is the difference between animation and transition?  
67. What is animation-fill-mode and animation-iteration-count?  
68. What is hardware acceleration in CSS animations?  

========================================================
SECTION 10 — CSS EFFECTS & ADVANCED VISUALS
========================================================
69. What is the difference between opacity and visibility?  
70. What are box-shadow and text-shadow?  
71. What are gradients (linear, radial, conic) in CSS?  
72. What is filter: blur, brightness, contrast, grayscale, etc.?  
73. What is backdrop-filter and when is it used?  
74. What is object-fit and object-position?  

========================================================
SECTION 11 — CSS VARIABLES & FUNCTIONS
========================================================
75. What are CSS custom properties (variables)?  
76. What is the var() function and how do fallbacks work?  
77. What are calc(), min(), max(), and clamp() functions?  
78. What is the difference between root variables and component-level variables?  

========================================================
SECTION 12 — SASS / PREPROCESSORS (Optional Advanced)
========================================================
79. What are CSS preprocessors?  
80. What is SASS/SCSS and why is it used?  
81. What are nesting, variables, mixins, and extends in SASS?  
82. What are partials and imports in SCSS?  
83. What are functions and loops in SCSS?  

========================================================
SECTION 13 — ARCHITECTURE, BEM & ORGANIZATION
========================================================
84. What is the BEM naming methodology (Block, Element, Modifier)?  
85. What is the difference between OOCSS, SMACSS, and BEM?  
86. What are utility classes and when should you use them?  
87. What is CSS architecture and why is it important for maintainability?  
88. How do you avoid CSS specificity wars?  

========================================================
SECTION 14 — PERFORMANCE OPTIMIZATION
========================================================
89. How does CSS affect page performance?  
90. What are critical CSS and above-the-fold CSS?  
91. What is CSS unloading and why should unused CSS be removed?  
92. What is render-blocking CSS and how do you avoid it?  
93. How does the browser compute style, layout, paint, and composite?  
94. What triggers reflow and repaint in CSS?  

========================================================
SECTION 15 — ADVANCED TOPICS & CSS BEHAVIORS
========================================================
95. What is the stacking context and what creates it?  
96. What are containing blocks and how are they determined?  
97. What is the difference between relative and absolute positioning?  
98. How does overflow create new block formatting contexts?  
99. What is isolation: isolate and why is it used?  
100. What is will-change and how does it affect performance?  
101. What is pointer-events in CSS?  
102. What is the difference between visibility, display, and opacity?  

========================================================

*/


// -----------------------------------------------------------
// -----------------------------------------------------------


/*

1. What is CSS and why is it used?

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation 
and visual formatting of HTML documents [web:15]. It controls how web pages look by 
defining styles for elements like colors, fonts, spacing, layouts, and positioning [web:15].

Why it's used:
- Separates content (HTML) from presentation (CSS) for better organization
- Enables consistent styling across multiple web pages
- Allows responsive design for different screen sizes
- Improves maintainability and reduces code duplication
- Enhances user experience through visual design
- Reduces page load time by caching external CSS files

Example:
Without CSS, web pages would be plain text with default browser styling.
With CSS, you can transform a basic HTML page into a visually appealing website.



2. What are the different ways to apply CSS (inline, internal, external)?

There are three methods to apply CSS to HTML [web:1]:

a) Inline CSS:
   - Applied directly to HTML elements using the "style" attribute
   - Highest specificity but not recommended for multiple uses
   - Syntax: <p style="color: blue; font-size: 16px;">Text</p>
   - Use case: Quick styling or overriding styles in specific cases

b) Internal CSS:
   - Written inside <style> tags in the <head> section of HTML
   - Applies to that single HTML document only
   - Syntax:
     <head>
       <style>
         p { color: blue; }
       </style>
     </head>
   - Use case: Single-page websites or page-specific styles

c) External CSS:
   - Separate .css file linked to HTML using <link> tag
   - Can be reused across multiple HTML pages
   - Syntax:
     <head>
       <link rel="stylesheet" href="styles.css">
     </head>
   - Use case: Multi-page websites (most common and recommended approach)

Priority order (highest to lowest): Inline > Internal > External



3. What is the syntax of a CSS rule?

A CSS rule consists of two main parts [web:15]:

Syntax Structure:
selector {
  property: value;
  property: value;
}

Components:
1. Selector: Targets the HTML element(s) to style
2. Declaration Block: Enclosed in curly braces { }
3. Property: The style attribute you want to change (e.g., color, font-size)
4. Value: The setting you want to apply to the property
5. Semicolon: Separates multiple declarations (required after each declaration)

Example:
h1 {
  color: red;
  font-size: 24px;
  text-align: center;
}

In this example:
- Selector: h1
- Declaration block: Everything inside { }
- Properties: color, font-size, text-align
- Values: red, 24px, center



4. What are CSS selectors and how do they work?

CSS selectors are patterns used to target and select HTML elements that you want to 
style [web:15]. They define which elements a CSS rule applies to.

How they work:
The browser matches selectors against elements in the DOM (Document Object Model) and 
applies the corresponding styles to matching elements [web:15].

Basic examples:

Element selector:
p { color: blue; }
Selects all <p> elements

Class selector:
.highlight { background: yellow; }
Selects all elements with class="highlight"

ID selector:
#header { font-size: 20px; }
Selects the element with id="header"

Selectors can be combined and nested for more specific targeting:
div p { color: red; }
Selects all <p> elements inside <div> elements

.container .item { margin: 10px; }
Selects elements with class="item" inside elements with class="container"



5. What are the different types of selectors in CSS?

Main types of CSS selectors [web:15][web:17]:

1. Universal Selector (*)
   Selects all elements
   * { margin: 0; }

2. Element/Type Selector
   Selects all elements of a specific type
   p { color: blue; }

3. Class Selector (.)
   Selects elements with a specific class
   .btn { padding: 10px; }

4. ID Selector (#)
   Selects a single element with a specific ID
   #main { width: 100%; }

5. Attribute Selector ([])
   Selects elements based on attributes
   input[type="text"] { border: 1px solid; }

6. Descendant Selector (space)
   Selects elements nested inside another
   div p { margin: 5px; }

7. Child Selector (>)
   Selects direct children only
   ul > li { list-style: none; }

8. Adjacent Sibling Selector (+)
   Selects immediate next sibling
   h1 + p { font-weight: bold; }

9. General Sibling Selector (~)
   Selects all siblings after the element
   h1 ~ p { color: gray; }

10. Pseudo-class Selector (:)
    Selects elements in a specific state
    a:hover { color: red; }

11. Pseudo-element Selector (::)
    Selects specific parts of elements
    p::first-line { text-transform: uppercase; }

12. Grouping Selector (,)
    Applies same style to multiple selectors
    h1, h2, h3 { font-family: Arial; }



6. What is the difference between class selector and ID selector?

Class Selector (.className) [web:15][web:16]:
- Denoted by a dot (.) prefix
- Can be used multiple times on a page
- Multiple elements can have the same class
- An element can have multiple classes
- Lower specificity than ID selector
- Reusable and more flexible
- Syntax: .button { color: blue; }
- HTML: <div class="button">Click</div>

ID Selector (#idName) [web:15][web:16]:
- Denoted by a hash (#) prefix
- Should be unique per page (one element only)
- An element can have only one ID
- Higher specificity than class selector
- Less reusable, more specific
- Often used for JavaScript targeting
- Syntax: #header { background: gray; }
- HTML: <div id="header">Header</div>

Specificity comparison:
#myId has higher priority than .myClass when both target the same element

Best practice:
Use classes for styling (reusable)
Use IDs for unique elements or JavaScript hooks



7. What are attribute selectors in CSS?

Attribute selectors target HTML elements based on the presence or value of their 
attributes [web:15].

Types of attribute selectors:

1. [attribute]
   Selects elements with the specified attribute
   input[required] { border: 2px solid red; }

2. [attribute="value"]
   Exact match
   input[type="text"] { padding: 5px; }

3. [attribute~="value"]
   Contains word (space-separated)
   div[class~="active"] { color: green; }

4. [attribute|="value"]
   Starts with value or value followed by hyphen
   p[lang|="en"] { font-style: italic; }

5. [attribute^="value"]
   Starts with value
   a[href^="https"] { color: blue; }

6. [attribute$="value"]
   Ends with value
   img[src$=".jpg"] { border: 1px solid; }

7. [attribute*="value"]
   Contains value anywhere
   a[href*="google"] { font-weight: bold; }

8. [attribute="value" i]
   Case-insensitive matching
   input[type="Email" i] { background: yellow; }

Attribute selectors are useful for targeting form elements, links, and elements 
with custom data attributes.



8. What are pseudo-classes and pseudo-elements?

Pseudo-classes and pseudo-elements are special selectors that target elements based 
on state or position [web:17][web:20].

Pseudo-classes (single colon :) [web:17][web:20]:
- Target elements in a specific state or position
- Do not create new elements in the DOM
- Syntax: selector:pseudo-class { property: value; }

Common pseudo-classes:
:hover - Element is being hovered over
:active - Element is being activated (clicked)
:focus - Element has focus
:visited - Visited links
:first-child - First child of parent
:last-child - Last child of parent
:nth-child(n) - Nth child of parent
:not(selector) - Elements that don't match selector
:checked - Checked checkboxes/radio buttons
:disabled - Disabled form elements

Example:
button:hover { background: blue; }
li:first-child { font-weight: bold; }

Pseudo-elements (double colon ::) [web:17][web:20]:
- Target specific parts of an element
- Create virtual elements not in the DOM
- Syntax: selector::pseudo-element { property: value; }

Common pseudo-elements:
::before - Insert content before element
::after - Insert content after element
::first-letter - First letter of text
::first-line - First line of text
::selection - Text selected by user
::placeholder - Placeholder text in inputs

Example:
p::first-letter { font-size: 2em; }
.icon::before { content: "→"; }

Key difference:
Pseudo-classes select existing elements in certain states
Pseudo-elements select or create parts of elements



9. What is the universal selector in CSS and when is it used?

The universal selector is represented by an asterisk (*) and matches all elements 
in the document [web:15].

Syntax:
* {
  property: value;
}

Common uses:

1. CSS Reset - Remove default browser styles
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }

2. Apply base styles to all elements
   * {
     font-family: Arial, sans-serif;
   }

3. Target all children of a specific element
   .container * {
     color: gray;
   }

4. Debugging - Visualize all elements
   * {
     border: 1px solid red;
   }

Performance considerations:
- Has the lowest specificity (0,0,0)
- Can impact performance if overused on large pages
- Modern browsers handle it efficiently in most cases

When to use:
- CSS resets and normalizations
- Setting box-sizing or font globally
- Development/debugging purposes

When to avoid:
- Overusing for specific styling (use more targeted selectors)
- Complex nested universal selectors



10. What is specificity in CSS and how is it calculated?

Specificity is an algorithm that determines which CSS rule applies when multiple rules 
target the same element [web:15]. It's calculated as a weight value to resolve conflicts.

Specificity hierarchy (highest to lowest) [web:15][web:16]:
1. Inline styles (style attribute)
2. IDs
3. Classes, attributes, pseudo-classes
4. Elements, pseudo-elements

Calculation format: (inline, IDs, classes/attributes/pseudo-classes, elements) [web:14][web:15]

Specificity values:
- Inline style: (1,0,0,0) = 1000 points
- ID selector: (0,1,0,0) = 100 points
- Class/attribute/pseudo-class: (0,0,1,0) = 10 points
- Element/pseudo-element: (0,0,0,1) = 1 point
- Universal selector (*): (0,0,0,0) = 0 points

Examples:

h1 
= 0,0,0,1 (1 point)

.header 
= 0,0,1,0 (10 points)

#main 
= 0,1,0,0 (100 points)

div p 
= 0,0,0,2 (2 points)

.nav ul li 
= 0,0,1,2 (12 points)

#header .nav a 
= 0,1,1,1 (111 points)

<p style="color: red;"> 
= 1,0,0,0 (1000 points)

When multiple rules have the same specificity, the last one declared wins (cascade).

!important overrides all specificity (but should be avoided).

Best practice: Keep specificity low and use classes for better maintainability.



11. What is the cascade in CSS and how does it determine final styles?

The "cascade" is the algorithm that determines which CSS rules apply when multiple 
rules target the same element [web:15][web:19]. It's the "C" in CSS.

The cascade considers three factors in this order [web:15][web:16][web:19]:

1. Importance (Origin and !important)
   Priority order (highest to lowest):
   - Transition declarations
   - User agent !important (browser defaults with !important)
   - User !important (user custom styles with !important)
   - Author !important (developer styles with !important)
   - Animation declarations
   - Author styles (developer normal styles)
   - User styles (user custom normal styles)
   - User agent styles (browser defaults)

2. Specificity
   If rules have same importance, specificity determines winner
   Higher specificity = higher priority
   Calculation: (inline, IDs, classes, elements)

3. Source Order
   If importance and specificity are equal, last rule wins
   Later declarations override earlier ones

Example of cascade in action:

p { color: blue; }        // Specificity: 0,0,0,1
p { color: red; }         // Same specificity, but comes later - WINS (red)

.text { color: green; }   // Specificity: 0,0,1,0 - WINS over p (green)
p { color: red; }         // Specificity: 0,0,0,1

#main { color: yellow; }  // Specificity: 0,1,0,0 - WINS (yellow)
.text { color: green; }   // Specificity: 0,0,1,0

p { color: blue !important; }  // !important - WINS regardless of specificity

How it determines final styles:
1. Browser collects all CSS rules that match an element
2. Sorts them by importance (origin and !important)
3. If tied, sorts by specificity
4. If still tied, uses source order (last wins)
5. Applies the winning rule's properties



12. What is the !important rule and when should you avoid it?

The !important rule is a declaration that gives a CSS property the highest priority, 
overriding normal cascade and specificity rules [web:15][web:16].

Syntax:
selector {
  property: value !important;
}

Example:
p {
  color: blue !important;
}

#main p {
  color: red;  // This won't apply, even with higher specificity 
}


How it works:
- Overrides any other declaration, regardless of specificity
- Only another !important rule with equal/higher specificity can override it
- Creates a separate layer in the cascade with highest priority

When should you avoid it [web:15]:

1. Breaks natural cascade flow
   Makes CSS harder to debug and maintain

2. Creates specificity wars
   Developers add more !important to override, creating cascading problems

3. Reduces code reusability
   Hard to override styles in specific contexts

4. Makes debugging difficult
   Unclear why certain styles aren't applying

5. Violates separation of concerns
   Mixing content and presentation priorities

When it's acceptable to use:

1. Utility classes that must always apply
   .hidden { display: none !important; }

2. Overriding third-party CSS (last resort)
   When you can't modify external stylesheets

3. Testing and debugging
   Temporarily force a style to isolate issues

4. User accessibility overrides
   User stylesheets for accessibility needs

Best practice:
Avoid !important. Instead:
- Use proper specificity
- Better CSS architecture
- More specific selectors when needed
- Proper cascade understanding
*/

/*
13. What are CSS comments and how are they written?

CSS comments are notes in the code that browsers ignore when rendering the page. 
They're used for documentation, explanation, or temporarily disabling code.

Syntax:
CSS uses only one comment style - multi-line comments with /* and */

/* This is a single-line comment */

/*
This is a
multi-line
comment
*/

/* 

Examples:

// Header Styles 
header {
  background: blue;
  / * padding: 20px; * /  // Temporarily disabled
}

// Navigation Menu
.nav {
  display: flex; // Use flexbox for layout 
}

*/

/*

Important notes:
- Comments cannot be nested in CSS
- Everything between / * and * / is ignored
- Can appear anywhere in the stylesheet
- Don't affect performance (removed during minification)



CSS does NOT support:
// Single-line comments (this is NOT valid in CSS)
# Hash comments (this is NOT valid in CSS)

Use cases:
1. Explain complex code or reasoning
2. Section organization in large stylesheets
3. TODO notes for future changes
4. Temporarily disable rules during debugging
5. Credit attribution and documentation
6. Version information and change logs

Best practices:
- Keep comments concise and relevant
- Update comments when code changes
- Don't over-comment obvious code
- Use comments for "why" not "what"
- Remove or update commented-out code before production
*/

/*
14. What is the difference between `display: none` and `visibility: hidden`?

Both properties hide elements, but they behave differently in layout and accessibility 
[web:11].

display: none [web:11]:
- Completely removes element from the document flow
- Element takes up NO space on the page
- Not accessible to screen readers
- Cannot be interacted with
- Child elements are also hidden and removed from flow
- Triggers reflow/repaint when toggled
- Affects layout of surrounding elements

Example:
.hidden {
  display: none;
}
Result: Element disappears completely, other elements shift to fill space

visibility: hidden [web:11]:
- Hides element but maintains its space in the layout
- Element still takes up space on the page
- Not visible but space is reserved
- Cannot be interacted with
- Child elements can override with visibility: visible
- Only triggers repaint when toggled (not reflow)
- Does NOT affect layout of surrounding elements

Example:
.invisible {
  visibility: hidden;
}
Result: Element is invisible but leaves empty space where it would be

Comparison table:

Property         | display: none | visibility: hidden
-----------------|---------------|-------------------
Visible          | No            | No
Takes up space   | No            | Yes
DOM present      | Yes           | Yes
Screen readers   | No            | No
Children visible | No            | Can be (with visibility: visible)
Performance      | Reflow        | Repaint only
Layout shift     | Yes           | No

When to use each:

display: none:
- Conditionally show/hide content
- Mobile vs desktop layouts
- Collapsible menus and accordions
- When you want elements to flow differently

visibility: hidden:
- Maintain consistent layout
- Animated transitions (with JavaScript)
- Preserve spacing for loading states
- When you need to override on children

Alternative for accessibility:
For screen reader-only content, use:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}
*/

/*
15. What is the difference between `block`, `inline`, and `inline-block` elements?

The display property controls how elements behave in the layout flow [web:11].

block [web:11]:
- Takes up full width available (100% of parent)
- Starts on a new line
- Can set width, height, margin, and padding (all sides)
- Stacks vertically
- Forces line break before and after
- Default for: div, p, h1-h6, section, header, footer, ul, ol, li

Example:
<div>Block 1</div>
<div>Block 2</div>

Renders as:
Block 1
Block 2

Behavior:
.block {
  display: block;
  width: 200px;      // * Width applies 
  height: 100px;     // * Height applies 
  margin: 20px;      // * All margins apply 
  padding: 10px;     // * All padding applies 
}

inline [web:11]:
- Takes only the width needed for content
- Does NOT start on a new line
- Width and height properties are IGNORED
- Only horizontal margin/padding (left/right) are respected
- Vertical margin/padding don't affect layout
- Flows with text
- Default for: span, a, strong, em, img, button, input, label

Example:
<span>Inline 1</span>
<span>Inline 2</span>

Renders as:
Inline 1 Inline 2

Behavior:
.inline {
  display: inline;
  width: 200px;      // * IGNORED 
  height: 100px;     // * IGNORED 
  margin: 20px;      // * Only left/right apply 
  padding: 10px;     // * Only left/right affect layout 
}

inline-block [web:11]:
- Combines features of both block and inline
- Flows inline (doesn't break line) like inline elements
- Can set width, height, margin, padding like block elements
- Respects all spacing properties
- Useful for creating horizontal layouts
- Default for: (none by default, must be set explicitly)

Example:
<div style="display: inline-block;">Box 1</div>
<div style="display: inline-block;">Box 2</div>

Renders as:
Box 1 Box 2

Behavior:
.inline-block {
  display: inline-block;
  width: 200px;      // * Width applies 
  height: 100px;     // * Height applies 
  margin: 20px;      // * All margins apply 
  padding: 10px;     // * All padding applies 
}

Comparison:

Feature              | block    | inline   | inline-block
---------------------|----------|----------|-------------
New line             | Yes      | No       | No
Full width default   | Yes      | No       | No
Set width/height     | Yes      | No       | Yes
Vertical margin      | Yes      | No       | Yes
Horizontal margin    | Yes      | Yes      | Yes
Vertical padding     | Yes      | Visual*  | Yes
Horizontal padding   | Yes      | Yes      | Yes

*inline vertical padding shows visually but doesn't affect layout flow

Common use cases:

block:
- Main content sections
- Containers and wrappers
- Headings and paragraphs
- Layout structure

inline:
- Text styling (bold, italic)
- Links within text
- Small icons in text
- Form labels

inline-block:
- Navigation menus (horizontal)
- Image galleries
- Button groups
- Grid-like layouts (before flexbox/grid)
- Cards in a row
*/


/**
16. What are the different units in CSS (px, em, rem, vw, vh, %)?

CSS uses various units to define lengths, sizes, and spacing. These units can be broadly classified as absolute and relative.

Commonly used units in the question:

1) px (pixels)
- An absolute unit that represents a dot on the screen.
- Fixed size: does not scale based on parent or root font-size.
- Example: font-size: 16px; margin: 20px;
- Good for precise control, but less flexible for responsive design.

2) em
- A relative unit based on the font-size of the current element (or its parent if not set on the current element).
- 1em = current element’s font-size.
- Example:
  body { font-size: 16px; }
  p { font-size: 1.5em; }  // 1.5 * 16px = 24px
- Scales with the context and can compound when nested.

3) rem (root em)
- A relative unit based on the root (html) element’s font-size.
- 1rem = font-size of html element (commonly 16px by default).
- Example:
  html { font-size: 16px; }
  h1 { font-size: 2rem; }  // 32px regardless of nesting
- More predictable than em because it does not compound with nesting.

4) vw (viewport width)
- Relative to the width of the viewport (browser window).
- 1vw = 1% of viewport width.
- Example:
  .hero { font-size: 5vw; }  // 5% of viewport width
- Useful for responsive typography or full-width sections.

5) vh (viewport height)
- Relative to the height of the viewport.
- 1vh = 1% of viewport height.
- Example:
  .full-screen { height: 100vh; }  // full viewport height
- Often used for full-screen hero sections or modals.

6) % (percentage)
- Relative to the size of the parent element (for most properties like width, padding, etc.).
- Example:
  .box { width: 50%; }  // 50% of parent’s width
- Allows components to scale with their containers.

In practice:
- Use px when you need fixed, pixel-perfect control.
- Use em/rem for scalable typography and spacing.
- Use vw/vh for viewport-based responsive layouts.
- Use % for relative layout within parent containers.
*/


/**
17. How do absolute units differ from relative units?

CSS length units can be divided into two categories: absolute units and relative units.

1) Absolute units:
- Represent fixed physical lengths that do not change based on context (screen size, parent font-size, etc.).
- Examples: px, cm, mm, in, pt, pc
- px (pixels) is the most commonly used absolute unit on screens.
- These units do not scale automatically with user preferences or parent elements.
- Example:
  div {
    font-size: 16px;
    margin: 20px;
  }
- Behavior: The size remains consistent across the document regardless of surrounding elements (assuming same zoom level).

2) Relative units:
- Represent sizes relative to some other value (such as font-size of parent/root, viewport size, etc.).
- Examples: em, rem, %, vw, vh, vmin, vmax, ch, ex
- These units change when the reference value changes.
- Example:
  html { font-size: 16px; }
  body { font-size: 1rem; }       // 16px
  .box { font-size: 2em; }        // relative to parent’s font-size
  .container { width: 50%; }      // relative to parent width
  .hero { height: 100vh; }        // relative to viewport height

Key differences:
- Absolute units give fixed sizes and are easier to reason about but less responsive.
- Relative units scale with context, improving responsiveness and accessibility (e.g., when user changes default font size).
- For modern web design, relative units (rem, %, vw/vh) are preferred for layout and typography, with px reserved for fine tuning.
*/


/**
18. What is the difference between em and rem?

Both em and rem are relative units, mainly used for font sizes and spacing, but they differ in what they are relative to.

1) em:
- Relative to the font-size of the current element (or its parent if the element doesn’t define font-size).
- 1em = current computed font-size of the element.
- em values compound when nested.

Example:
html { font-size: 16px; }
body { font-size: 1em; }       // 16px
.container { font-size: 1.25em; } // 1.25 * 16px = 20px
.child { font-size: 1.5em; }   // 1.5 * 20px = 30px (compounding)

Pros:
- Allows relative scaling based on the component’s context.
Cons:
- Can become hard to predict in deep nesting due to compounding.

2) rem (root em):
- Relative to the font-size of the root (html) element only.
- 1rem = html font-size (often 16px by default).
- Does NOT compound with nesting.

Example:
html { font-size: 16px; }
.container { font-size: 1.25rem; }  // 20px, regardless of parent
.child { font-size: 1.5rem; }       // 24px, always based on html

Pros:
- Predictable and easy to reason about.
- Changing html font-size scales the entire site consistently.
Cons:
- Less context-specific control compared to em (but usually preferable).

Practical guideline:
- Use rem for global, consistent typography and spacing.
- Use em for component-level relative sizing (e.g., padding relative to the component’s font-size).
*/


/**
19. What are CSS color formats (hex, rgb, rgba, hsl)?

CSS supports several color formats to define colors. Commonly used ones include hex, rgb, rgba, hsl, and hsla.

1) Hex (hexadecimal):
- Syntax: #RRGGBB or #RGB or #RRGGBBAA (in modern browsers).
- RR, GG, BB are hexadecimal values (00 to FF) representing red, green, blue.
- Example:
  color: #ff0000;  // red
  color: #00ff00;  // green
  color: #0000ff;  // blue
- Short form:
  color: #f00;     // same as #ff0000

2) rgb (red, green, blue):
- Syntax: rgb(r, g, b)
- r, g, b are integers from 0 to 255, or percentages.
- Example:
  color: rgb(255, 0, 0);    // red
  color: rgb(0, 255, 0);    // green
  color: rgb(0, 0, 255);    // blue
  color: rgb(100%, 0%, 0%); // also red

3) rgba (red, green, blue, alpha):
- Syntax: rgba(r, g, b, a)
- r, g, b: 0–255 (or percentages), a: alpha channel (opacity) from 0 to 1.
- Example:
  color: rgba(255, 0, 0, 0.5);  // semi-transparent red
- Allows setting transparency directly on the color.

4) hsl (hue, saturation, lightness):
- Syntax: hsl(h, s, l)
- h: hue (0–360 degrees), s: saturation (0%–100%), l: lightness (0%–100%).
- Example:
  color: hsl(0, 100%, 50%);    // red
  color: hsl(120, 100%, 50%);  // green
  color: hsl(240, 100%, 50%);  // blue
- Often more intuitive for adjusting colors (e.g., tweaking lightness or saturation).

5) hsla (hue, saturation, lightness, alpha):
- Syntax: hsla(h, s, l, a)
- Adds alpha transparency to hsl.
- Example:
  color: hsla(0, 100%, 50%, 0.5);  // semi-transparent red

Summary:
- hex and rgb: convenient for solid colors.
- rgba and hsla: useful when transparency is needed.
- hsl/hsla: more intuitive for color adjustments.
*/


/**
20. What is opacity and how does it differ from rgba alpha?

Both opacity and rgba alpha control transparency, but they behave differently and affect different scopes.

1) opacity property:
- A CSS property that defines the transparency of an entire element, including its content and children.
- Syntax: opacity: value;
- value: 0 (fully transparent) to 1 (fully opaque).
- Example:
  .box {
    background: red;
    opacity: 0.5;
  }
- Effect:
  - The box and all its child elements become semi-transparent.
  - Text, images, borders inside also inherit the same transparency.
  - Opacity is applied at the element level, after all child elements are rendered.

2) rgba alpha channel:
- alpha is the 4th parameter in rgba(r, g, b, a) (or hsla).
- Controls transparency of the color itself, not of the entire element.
- Syntax: color: rgba(r, g, b, a);
- a: 0 (fully transparent) to 1 (fully opaque).
- Example:
  .box {
    background: rgba(255, 0, 0, 0.5); // semi-transparent red background
    color: #000;                       // text remains fully opaque
  }
- Effect:
  - Only the background color becomes semi-transparent.
  - Child elements and text can remain fully opaque if they don’t use transparent colors.
  - Transparency is applied per color, not to the entire element box.

Key differences:

Scope:
- opacity: applies to the entire element and all descendants.
- rgba alpha: applies only to the property using that color (e.g., background-color, border-color).

Use cases:
- Use opacity when you want the whole element, including its content, to fade or become transparent (e.g., fade-out effects).
- Use rgba alpha when only the background or a specific color should be translucent while keeping text or other parts fully visible.

Common pattern:
- Prefer rgba/hsla for backgrounds to avoid dimming text unintentionally.
- Use opacity for global visual effects like transitions, overlays, and fading.
*/


/**
21. What is the CSS box model?

The CSS box model is a fundamental concept that describes how every HTML element is 
rendered as a rectangular box on a web page [web:21][web:23]. It defines the structure 
and spacing of elements.

The box model consists of four layers (from inside to outside) [web:21][web:22][web:23]:

1. Content - The innermost area where text, images, or other content is displayed
2. Padding - Transparent space around the content, inside the border
3. Border - A frame that wraps around the padding and content
4. Margin - Transparent space outside the border, creating distance from other elements

Visual representation:
┌─────────────────────────────────────┐
│          MARGIN (transparent)        │
│  ┌───────────────────────────────┐  │
│  │    BORDER (visible line)      │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  PADDING (transparent)  │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │
│  │  │  │  (text, images)   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

Total element width = content width + left padding + right padding + left border + right border + left margin + right margin

Total element height = content height + top padding + bottom padding + top border + bottom border + top margin + bottom margin

The box model is crucial for:
- Understanding element sizing and spacing
- Creating precise layouts
- Controlling spacing between elements
- Debugging layout issues using browser DevTools
*/


/**
22. What are content, padding, border, and margin?

These are the four components of the CSS box model [web:21][web:22][web:23]:

1. Content:
- The innermost area of the box where actual content appears (text, images, videos, etc.)
- Controlled by the width and height properties
- Example:
  .box {
    width: 200px;
    height: 100px;
  }
- The content area dimensions are 200px × 100px

2. Padding:
- Transparent space between the content and the border [web:22][web:26]
- Creates breathing room inside the element
- Inherits the background color of the element
- Controlled by padding properties: padding-top, padding-right, padding-bottom, padding-left
- Example:
  .box {
    padding: 20px;              // all sides
    padding: 10px 20px;         // top/bottom left/right
    padding: 10px 20px 30px 40px; // top right bottom left
  }
- Padding increases the total size of the element (in content-box model)

3. Border:
- A visible line that wraps around the padding and content [web:22][web:23]
- Can be styled with width, style (solid, dashed, dotted), and color
- Controlled by border properties
- Example:
  .box {
    border: 2px solid black;
    border-top: 1px dashed red;
    border-radius: 5px;         // rounded corners
  }
- Border adds to the total element size (in content-box model)

4. Margin:
- Transparent space outside the border [web:22][web:26]
- Creates separation between elements
- Completely transparent (shows parent's background)
- Can have negative values (unlike padding)
- Controlled by margin properties: margin-top, margin-right, margin-bottom, margin-left
- Example:
  .box {
    margin: 20px;               // all sides
    margin: 10px auto;          // top/bottom 10px, left/right auto (centers block)
    margin: -10px;              // negative margin (overlaps)
  }
- Margins can collapse (see question 24)

Key differences:
- Content: the actual element content
- Padding: space inside, around content
- Border: visible boundary
- Margin: space outside, between elements
*/


/**
23. What is `box-sizing: content-box` vs `box-sizing: border-box`?

The box-sizing property determines how the total width and height of an element are 
calculated [web:22][web:23].

1. box-sizing: content-box (default) [web:22][web:29]:
- Width and height apply ONLY to the content area
- Padding and border are ADDED to the specified width/height
- This is the default behavior in CSS

Example:
.box {
  box-sizing: content-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
}

Calculation:
- Content width: 200px (as specified)
- Content height: 100px (as specified)
- Total width: 200px + 20px (left padding) + 20px (right padding) + 5px (left border) + 5px (right border) = 250px
- Total height: 100px + 20px (top padding) + 20px (bottom padding) + 5px (top border) + 5px (bottom border) = 150px

Problem: Adding padding or border increases the element's total size, which can break layouts.

2. box-sizing: border-box [web:22][web:29]:
- Width and height include content, padding, AND border
- Padding and border are SUBTRACTED from the specified width/height
- Content area shrinks to accommodate padding and border

Example:
.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
}

Calculation:
- Total width: 200px (as specified, fixed)
- Total height: 100px (as specified, fixed)
- Content width: 200px - 20px (left padding) - 20px (right padding) - 5px (left border) - 5px (right border) = 150px
- Content height: 100px - 20px (top padding) - 20px (bottom padding) - 5px (top border) - 5px (bottom border) = 50px

Benefit: Element stays at the specified size regardless of padding/border changes.

Best practice:
Most developers use border-box globally for predictable sizing:

* {
  box-sizing: border-box;
}

Why border-box is preferred:
- More intuitive (width means total width)
- Easier to create responsive layouts
- Padding and border changes don't break layout
- Matches how designers think about element sizes

Note: Margin is NEVER included in either model - it's always outside the element's box.
*/


/**
24. What is margin collapsing and when does it occur?

Margin collapsing is a behavior where the vertical margins of adjacent block-level 
elements combine (collapse) into a single margin instead of adding together [web:27].

How it works:
When two vertical margins meet, instead of adding them, the browser uses the larger 
of the two margins.

When margin collapsing occurs:

1. Adjacent siblings:
<div style="margin-bottom: 30px;">Box 1</div>
<div style="margin-top: 20px;">Box 2</div>

Result: Gap between boxes is 30px (NOT 50px)
The larger margin (30px) is used.

2. Parent and first/last child:
<div style="margin-top: 40px;">
  <p style="margin-top: 20px;">First paragraph</p>
</div>

Result: The margins collapse to 40px (the larger one)
The parent's and child's top margins merge.

3. Empty blocks:
<div style="margin-top: 20px; margin-bottom: 30px;"></div>

Result: The element's own top and bottom margins collapse to 30px.

When margin collapsing does NOT occur:

1. Horizontal margins (left/right) - only vertical margins collapse
2. Margins with floated elements
3. Absolutely or fixed positioned elements
4. Inline-block elements
5. Elements with overflow other than visible
6. Flex or grid container children
7. When there's padding or border between margins
8. Root element (html)

Example preventing collapse:
Parent with padding or border:
<div style="padding-top: 1px;">
  <p style="margin-top: 20px;">Paragraph</p>
</div>

Now the margins don't collapse because padding separates them.

How to prevent margin collapsing:
- Use padding instead of margin
- Add border or padding to parent
- Use flexbox or grid layout
- Use display: inline-block
- Add overflow: auto to parent
- Use clearfix techniques

Why it exists:
Margin collapsing was designed to create consistent spacing between text elements 
(like paragraphs) without doubling up margins unnecessarily.
*/


/**
25. What is the difference between padding and margin?

Padding and margin both create space, but they work differently and serve different 
purposes [web:21][web:22][web:26].

PADDING [web:22][web:26]:

Location:
- Inside the element, between content and border
- Part of the element's clickable/hoverable area

Background:
- Inherits the element's background color/image
- Visible if element has a background

Syntax:
.box {
  padding: 20px;              // all sides
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 15px;
}

Properties:
- Cannot be negative
- Increases element's total size (with content-box)
- Affects the element's background area
- Does not collapse

Use cases:
- Create space inside buttons, cards, containers
- Prevent content from touching borders
- Increase clickable area for better UX
- Create breathing room within elements


MARGIN [web:22][web:26]:

Location:
- Outside the element, beyond the border
- Creates space between elements
- Not part of the element itself

Background:
- Always transparent
- Shows the parent element's background

Syntax:
.box {
  margin: 20px;               // all sides
  margin: 0 auto;             // center horizontally
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
}

Properties:
- Can be negative (to overlap elements)
- Does not affect element's size
- Transparent - no background color
- Can collapse vertically (see question 24)
- auto value can center elements

Use cases:
- Create space between elements
- Center elements (margin: 0 auto)
- Adjust element positioning
- Create whitespace in layouts
- Overlap elements (negative margins)


Key differences summary:

| Aspect           | Padding                    | Margin                      |
|------------------|----------------------------|----------------------------|
| Location         | Inside element             | Outside element            |
| Background       | Shows element background   | Transparent                |
| Clickable area   | Yes, included              | No, not part of element    |
| Negative values  | Not allowed                | Allowed                    |
| Collapsing       | Never                      | Vertical margins can       |
| Affects size     | Yes (content-box)          | No                         |
| auto value       | Not applicable             | Can center elements        |

Visual example:
┌─────────────────────────────────────┐
│   MARGIN (spacing between elements)  │
│  ┌───────────────────────────────┐  │
│  │         BORDER               │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ PADDING (inner spacing) │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │
│  │  │  │  (text, images)   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

When to use which:
- Use padding when you want space inside an element (affects background, click area)
- Use margin when you want space between elements (separation from neighbors)
*/


/**
26. What is the float property and how does float-based layout work?

The float property was originally designed for wrapping text around images, but became 
widely used for creating multi-column layouts before flexbox and grid [web:31][web:34].

Float values:
- float: left - Element floats to the left side of its container
- float: right - Element floats to the right side
- float: none - Default, no floating (element stays in normal flow)

How float works [web:31][web:34]:
When an element is floated:
1. It's removed from the normal document flow
2. It shifts to the left or right side of its container
3. Text and inline elements wrap around it
4. Other floated elements stack horizontally beside it
5. The parent container may collapse if it only contains floated children

Example:
.sidebar {
  float: left;
  width: 30%;
}
.main-content {
  float: right;
  width: 70%;
}

Result: Two-column layout with sidebar on left, content on right

Float-based layout problems:
1. Parent collapse - Parents don't automatically contain floated children
2. Layout breaks - Requires clearfix techniques to work properly
3. Complex to maintain - Requires extra markup or CSS tricks
4. Not responsive-friendly - Harder to reflow on different screen sizes

Modern alternative:
Flexbox and CSS Grid have largely replaced float for layouts. Use float only for its 
original purpose (text wrapping around images) or legacy code maintenance.

Example of text wrapping (proper use):
img {
  float: left;
  margin: 0 15px 15px 0;
}

This makes text flow around the image naturally.
*/


/**
27. What is clearfix and why is it needed?

Clearfix is a CSS technique used to fix the "parent collapse" problem that occurs when 
a container has only floated children [web:31][web:34][web:35].

The problem:
When all children of a container are floated, the parent's height collapses to zero 
because floated elements are removed from the normal document flow.

Example of the problem:
<div class="container">
  <div style="float: left;">Box 1</div>
  <div style="float: right;">Box 2</div>
</div>

Result: The .container has 0 height, causing layout issues.

Solutions - Clearfix techniques:

1. Modern clearfix method (recommended) [web:31][web:33]:
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

Apply to parent:
<div class="clearfix">
  <div style="float: left;">Box 1</div>
  <div style="float: right;">Box 2</div>
</div>

How it works:
- Creates a pseudo-element after the container's content
- clear: both forces it below all floated elements
- display: table creates a block formatting context
- Parent expands to contain the pseudo-element (and thus the floats)

2. Overflow method [web:34][web:35]:
.container {
  overflow: hidden;  / * or overflow: auto * /
}

How it works:
- Creates a new block formatting context
- Forces parent to contain floated children
- Simpler but can hide overflowing content or add unwanted scrollbars

3. Old-school clearfix (legacy) [web:34]:
<div class="container">
  <div style="float: left;">Box 1</div>
  <div style="float: right;">Box 2</div>
  <div style="clear: both;"></div>  <!-- Extra empty div -->
</div>

Problems:
- Adds unnecessary HTML markup
- Not semantic
- Harder to maintain

Why clearfix is needed:
- Prevents parent collapse when using floats
- Maintains proper document flow
- Ensures backgrounds and borders show correctly on parent
- Allows subsequent elements to appear below floated content

Modern context:
With flexbox and grid, clearfix is rarely needed in new projects. However, it's still 
important for:
- Maintaining legacy codebases
- Working with older CMS themes
- Understanding historical CSS techniques
- Text wrapping scenarios with floated images
*/


/**
28. What are the different CSS position values (static, relative, absolute, fixed, sticky)?

The position property determines how an element is positioned in the document.

1. position: static (default):
- Elements follow normal document flow
- Top, right, bottom, left, and z-index have NO effect
- Default positioning for all elements

Example:
.box {
  position: static;  // This is the default, usually not explicitly set
}

Use case: Default behavior, rarely set explicitly


2. position: relative:
- Element remains in normal document flow
- Can be offset using top, right, bottom, left (relative to its original position)
- Creates a positioning context for absolute children
- Original space is preserved (other elements don't shift)

Example:
.box {
  position: relative;
  top: 20px;      // Moves 20px down from original position
  left: 30px;     // Moves 30px right from original position
}

Use case:
- Minor positioning adjustments
- Creating positioning context for absolute children
- Anchoring absolutely positioned elements


3. position: absolute:
- Removed from normal document flow
- Positioned relative to nearest positioned ancestor (relative, absolute, fixed, sticky)
- If no positioned ancestor, positioned relative to initial containing block (viewport)
- Other elements behave as if it doesn't exist

Example:
.container {
  position: relative;  // Positioning context
}
.box {
  position: absolute;
  top: 10px;           // 10px from top of .container
  right: 10px;         // 10px from right of .container
}

Use case:
- Tooltips and dropdowns
- Overlays and modals
- Icon badges on elements
- Custom positioning within containers


4. position: fixed:
- Removed from normal document flow
- Positioned relative to the viewport (browser window)
- Stays in the same position even when scrolling
- Not affected by parent elements

Example:
.header {
  position: fixed;
  top: 0;            // Sticks to top of viewport
  left: 0;
  width: 100%;
}

Use case:
- Fixed headers and navigation bars
- Floating action buttons
- Cookie consent banners
- Chat widgets
- Sticky sidebars


5. position: sticky [web:36][web:39]:
- Hybrid between relative and fixed
- Acts as relative until scrolling reaches a threshold
- Then becomes fixed at that position
- Returns to relative when scrolling back
- Must specify at least one of: top, right, bottom, or left

Example:
.table-header {
  position: sticky;
  top: 0;            // Becomes fixed when reaching top of viewport
  background: white;
}

Use case:
- Table headers that stick while scrolling
- Section headings in long pages
- Navigation that sticks after scrolling past hero section

Common issues with sticky [web:39]:
- Parent must have sufficient height
- Parent cannot have overflow: hidden, scroll, or auto
- Needs a threshold value (top, bottom, etc.)
- Z-index issues may hide it behind other elements

Summary comparison:

Position   | In Flow? | Offset From          | Scrolls?
-----------|----------|----------------------|---------
static     | Yes      | N/A                  | Yes
relative   | Yes      | Original position    | Yes
absolute   | No       | Positioned ancestor  | Yes
fixed      | No       | Viewport             | No
sticky     | Yes/No   | Scroll container     | Yes/No

All positioned elements (except static) can use z-index for stacking order.
*/


/**
29. What is stacking context in CSS?

A stacking context is a three-dimensional conceptualization of HTML elements along an 
imaginary z-axis relative to the user [web:36]. It determines the order in which elements 
are painted on the screen when they overlap.

How stacking works:
Elements in the same stacking context are layered according to their z-index values and 
source order. A stacking context creates a boundary - elements inside cannot be 
interleaved with elements from outside the context.

What creates a stacking context [web:36]:

1. Root element (html) - always creates a stacking context
2. Elements with position: absolute or relative AND z-index other than auto
3. Elements with position: fixed or sticky
4. Flex items with z-index other than auto
5. Grid items with z-index other than auto
6. Elements with opacity less than 1
7. Elements with transform (other than none)
8. Elements with filter, perspective, clip-path, mask properties
9. Elements with isolation: isolate
10. Elements with mix-blend-mode other than normal
11. Elements with will-change property

Stacking order within a context (bottom to top):
1. Background and borders of the stacking context element
2. Positioned elements with negative z-index
3. Non-positioned block elements (in source order)
4. Non-positioned floated elements
5. Inline elements
6. Positioned elements with z-index: auto or z-index: 0
7. Positioned elements with positive z-index

Example demonstrating stacking context:

.parent {
  position: relative;
  z-index: 1;        // Creates stacking context
}
.child {
  position: absolute;
  z-index: 9999;     // Only matters within .parent's context
}
.sibling {
  position: relative;
  z-index: 2;        // Will appear above .parent (and .child)
}

Result: Even though .child has z-index: 9999, it's confined to .parent's stacking 
context (z-index: 1). The .sibling (z-index: 2) will appear above everything in .parent.

Common gotcha [web:36]:
You cannot make a child element appear above an element outside its stacking context 
by simply increasing z-index. You must adjust the parent's z-index or remove the 
stacking context boundary.

Why stacking contexts matter:
- Solve z-index conflicts and layering issues
- Create isolated rendering layers
- Optimize browser painting and compositing
- Control overlay and modal behavior
- Debug why z-index isn't working as expected

Debugging tip:
Use browser DevTools to visualize the stacking context tree and understand why elements 
layer in unexpected ways.
*/


/**
30. What is z-index and how does it work?

Z-index is a CSS property that controls the stacking order (vertical layering) of 
positioned elements along the z-axis [web:36].

Syntax:
.element {
  z-index: value;  // Can be positive, negative, 0, or auto
}

Values:
- auto (default) - Element follows natural stacking order
- Integer - Positive or negative number (e.g., -1, 0, 1, 100, 9999)
- Higher values appear above lower values

Key requirement:
Z-index ONLY works on positioned elements (position: relative, absolute, fixed, sticky) 
or flex/grid items. It has NO effect on static elements [web:36].

Example:
.box1 {
  position: relative;
  z-index: 1;        // Behind box2
}
.box2 {
  position: relative;
  z-index: 2;        // Above box1
}
.box3 {
  position: relative;
  z-index: -1;       // Behind both (and potentially behind parent)
}

How z-index works:

1. Same stacking context:
Higher z-index appears on top.

.front {
  position: relative;
  z-index: 10;       // Appears above .back
}
.back {
  position: relative;
  z-index: 5;
}

2. Different stacking contexts:
Parent's z-index determines children's layer, regardless of children's z-index.

.parent-low {
  position: relative;
  z-index: 1;
}
.child-high {
  position: relative;
  z-index: 9999;     // Still below .parent-high's children
}
.parent-high {
  position: relative;
  z-index: 2;
}

Result: Everything in .parent-high appears above everything in .parent-low.

3. No z-index specified (z-index: auto):
Elements stack in source order (later in HTML = on top).

Common z-index values and conventions [web:36]:

-1          - Behind parent elements
0 or auto   - Default layer
1-9         - Minor layering (tooltips, dropdowns)
10-99       - UI components (modals, overlays)
100-999     - Important UI (sticky headers, nav bars)
1000+       - Top-level overlays (notifications, alerts)
9999        - Emergency override (use sparingly)

Best practices:

1. Use meaningful scale:
Don't use arbitrary huge numbers. Use 10, 20, 30 instead of 1000, 2000, 3000.

2. Define z-index variables:
:root {
  --z-dropdown: 100;
  --z-modal: 200;
  --z-tooltip: 300;
}

3. Avoid z-index wars:
Don't keep incrementing to fix issues. Understand stacking contexts instead.

4. Document your z-index hierarchy:
Comment your intentions for future maintainers.

Common problems and solutions:

Problem: "My z-index: 9999 doesn't work!"
Solution: Element must be positioned (not static) or be a flex/grid item.

Problem: "Child with high z-index appears below unrelated element"
Solution: Parent created a stacking context with lower z-index. Adjust parent's z-index.

Problem: "Modal appears behind sticky header"
Solution: Ensure modal has higher z-index than header, or place modal outside header's 
stacking context [web:36].

Example fix [web:36]:
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.modal {
  position: fixed;
  z-index: 101;      // Above header
}

Z-index debugging:
- Use browser DevTools to inspect computed z-index values
- Check if element is positioned
- Examine parent elements for stacking contexts
- Visualize the stacking context tree
*/


/**
31. What are inline, block, and inline-block display types?

This question was already answered in detail in question 15. Here's a concise summary:

block:
- Takes full width of parent
- Starts on new line
- Respects width, height, all margin and padding
- Examples: div, p, h1-h6, section

inline:
- Takes only content width
- Flows with text (no line break)
- Ignores width and height
- Only horizontal margin/padding affect layout
- Examples: span, a, strong, em

inline-block:
- Flows inline (no line break)
- Respects width, height, all margin and padding
- Combines benefits of both
- Must be set explicitly

Comparison:
Feature         | block | inline | inline-block
----------------|-------|--------|-------------
New line        | Yes   | No     | No
Set width/height| Yes   | No     | Yes
All margins     | Yes   | No     | Yes
All padding     | Yes   | Visual*| Yes

*inline padding shows but doesn't push other elements vertically

Use cases:
- block: Sections, containers, structural layout
- inline: Text styling, links within paragraphs
- inline-block: Horizontal navigation, image galleries, button groups

For detailed explanation with examples, refer to the answer for question 15.
*/


/**
32. What is the difference between `overflow: hidden`, `scroll`, and `auto`?

The overflow property controls what happens when content is too large for its container 
[web:37][web:40].

1. overflow: visible (default):
- Content overflows the container boundaries
- No clipping, content is fully visible
- Can cause layout issues
- No scrollbars

Example:
.box {
  width: 200px;
  height: 100px;
  overflow: visible;  // Content spills out
}

Use case: Default behavior, rarely set explicitly


2. overflow: hidden [web:37][web:40]:
- Clips content that exceeds container boundaries
- Hidden content is NOT accessible (cannot scroll to it)
- No scrollbars appear
- Creates a new block formatting context (useful for clearfix)

Example:
.box {
  width: 200px;
  height: 100px;
  overflow: hidden;    // Content is cut off
}

Use cases:
- Hide overflowing content intentionally
- Clearfix for floated elements
- Prevent layout breaking
- Image cropping effects
- Creating block formatting context

Side effects:
- Content is permanently hidden (users cannot access it)
- Can hide important information
- May cut off shadows, outlines, or positioned children


3. overflow: scroll [web:37][web:40]:
- Clips content but adds scrollbars to access it
- ALWAYS shows scrollbars (even if content doesn't overflow)
- Scrollbars appear on both axes (horizontal and vertical) by default

Example:
.box {
  width: 200px;
  height: 100px;
  overflow: scroll;    // Always shows scrollbars
}

Use cases:
- When you always want scrollbars for consistency
- Creating custom scrollable containers
- Ensuring scroll area is visible to users

Problems:
- Shows unnecessary scrollbars when content fits
- Can look cluttered
- Different scrollbar styles across browsers/OS


4. overflow: auto [web:37][web:40]:
- Clips content like hidden
- Shows scrollbars ONLY when content overflows
- Automatically determines if scrollbars are needed
- Most flexible and user-friendly option

Example:
.box {
  width: 200px;
  height: 100px;
  overflow: auto;      // Scrollbars only when needed
}

Use cases:
- Responsive containers (most common choice)
- Dynamic content where size varies
- Clean UI with conditional scrolling
- Text areas with variable content

Controlling axes separately:
overflow-x: hidden;   // Horizontal only
overflow-y: auto;     // Vertical only

Common patterns:
.chat-window {
  overflow-y: auto;   // Vertical scroll when needed
  overflow-x: hidden; // Never scroll horizontally
}

.horizontal-scroll {
  overflow-x: auto;   // Horizontal scroll when needed
  overflow-y: hidden; // No vertical scroll
  white-space: nowrap;
}

Comparison summary [web:37][web:40]:

Property       | Clips? | Scrollbars      | Access to content?
---------------|--------|-----------------|-------------------
visible        | No     | Never           | Always
hidden         | Yes    | Never           | No
scroll         | Yes    | Always (both)   | Yes
auto           | Yes    | When needed     | Yes

Best practices:
- Use auto for most responsive scenarios
- Use hidden for intentional cropping or clearfix
- Avoid scroll (use auto instead for better UX)
- Consider overflow-x and overflow-y separately for better control

Common use cases:
- Modal/dialog content: overflow-y: auto
- Horizontal galleries: overflow-x: auto, overflow-y: hidden
- Code blocks: overflow: auto
- Image containers: overflow: hidden
- Clearfix: overflow: hidden (creates block formatting context)
*/


/**
33. What is Flexbox and when should it be used?

Flexbox (Flexible Box Layout Module) is a CSS layout model designed for one-dimensional 
layouts [web:42][web:45]. It provides an efficient way to distribute space and align 
items within a container, even when their size is unknown or dynamic.

What Flexbox is [web:42][web:45]:
- A one-dimensional layout system (works with either rows OR columns, not both at once)
- Designed for distributing space along a single axis
- Provides powerful alignment capabilities
- Makes items flexible - they can grow, shrink, or maintain specific sizes
- Handles unknown or dynamic content sizes effectively

Key characteristics [web:42][web:43]:
- Items can flex their sizes to respond to available space
- Items can be aligned with respect to their container or each other
- Items can be dynamically reordered without changing HTML
- Simplifies complex layouts that were previously done with floats or positioning
- Works in both horizontal (row) and vertical (column) directions

When to use Flexbox [web:41][web:46][web:49]:

1. Navigation bars and menus
   - Horizontal or vertical navigation
   - Spacing items evenly
   - Aligning items to edges

2. Form layouts
   - Aligning labels, inputs, and buttons
   - Making input fields grow while buttons stay fixed size

3. Card layouts (one-dimensional)
   - Row of cards that wrap to next line
   - Cards taking up available space

4. Media objects
   - Image alongside text content
   - Flipping image position

5. Centering content
   - Vertically and horizontally centering elements
   - Much easier than traditional methods

6. Flexible spacing
   - Distributing space between or around items
   - Equal-height columns with different content

7. Small UI components
   - Buttons groups, icon sets, tags
   - Items that need flexible sizing

8. Sticky footers
   - Pushing footer to bottom of page
   - Making content area grow

When NOT to use Flexbox [web:46][web:48]:

1. Two-dimensional layouts (use CSS Grid instead)
   - Complex page layouts with rows AND columns
   - Grid-based designs

2. Rigid grid structures
   - When you need precise control over both axes
   - Image galleries with strict grid alignment

3. Page-level layouts (Grid is better)
   - Overall page structure
   - Header, sidebar, main content, footer arrangement

Advantages [web:43][web:45]:
- Simplified layouts (no more float hacks)
- Built-in responsive design support
- Easy vertical alignment (finally!)
- Dynamic element reordering
- Equal-height columns naturally
- Flexible and adaptable to content

Modern usage:
Flexbox is now widely supported and considered the standard for one-dimensional layouts. 
Often used in combination with CSS Grid (Grid for page layout, Flexbox for components).
*/


/**
34. What are flex container and flex items?

Flexbox works with two types of elements: the flex container and flex items [web:42][web:44].

Flex Container [web:42][web:44]:
- The parent element that has display: flex or display: inline-flex applied
- Creates a flex formatting context for its direct children
- Controls the overall layout direction and alignment
- Has specific properties that affect all flex items

Creating a flex container:
.container {
  display: flex;        // Block-level flex container
}

or

.container {
  display: inline-flex; // Inline-level flex container
}

Flex container properties [web:42][web:45]:
- flex-direction - Direction of main axis (row, column, etc.)
- flex-wrap - Whether items wrap to new lines
- flex-flow - Shorthand for flex-direction and flex-wrap
- justify-content - Alignment along main axis
- align-items - Alignment along cross axis
- align-content - Alignment of wrapped lines
- gap, row-gap, column-gap - Spacing between items

Flex Items [web:42][web:44]:
- The direct children of a flex container
- Automatically become flex items (no special class needed)
- Can be sized, aligned, and ordered individually
- Float, clear, and vertical-align have no effect on flex items

Example:
<div class="container">        <!-- Flex container -->
  <div class="item">1</div>    <!-- Flex item -->
  <div class="item">2</div>    <!-- Flex item -->
  <div class="item">3</div>    <!-- Flex item -->
</div>

.container {
  display: flex;
}

Flex item properties [web:42][web:45]:
- flex-grow - How much item grows relative to others
- flex-shrink - How much item shrinks relative to others
- flex-basis - Initial size before growing/shrinking
- flex - Shorthand for grow, shrink, and basis
- align-self - Override container's align-items for specific item
- order - Change visual order without changing HTML

Important notes:

1. Only direct children become flex items:
<div class="container">
  <div class="item">Flex item</div>
  <div class="item">
    <p>NOT a flex item (it's a grandchild)</p>
  </div>
</div>

2. Flex items establish their own formatting context:
- They can have position: relative and use z-index
- Their margins don't collapse
- They respect their own display properties for their children

3. display property on flex items:
- Block, inline, inline-block become essentially the same
- Flex items behave like block-level boxes by default
- But you can make a flex item itself a flex container (nested flexbox)

Nested flex containers:
.outer-container {
  display: flex;           // Flex container
}
.inner-container {
  display: flex;           // Flex item AND flex container
}

Example structure:
<div class="outer-container">              <!-- Flex container -->
  <div class="inner-container">            <!-- Flex item + Flex container -->
    <div class="nested-item">1</div>       <!-- Flex item of inner container -->
    <div class="nested-item">2</div>       <!-- Flex item of inner container -->
  </div>
  <div class="item">Sibling item</div>     <!-- Flex item of outer container -->
</div>

Understanding the relationship:
Container controls: overall layout, direction, wrapping, item distribution
Items control: their own sizing, growth, shrinkage, individual alignment
*/


/**
35. What do justify-content, align-items, and align-content do?

These three properties control alignment in flexbox, but work on different axes and 
scenarios [web:42][web:45].

AXES in Flexbox:
- Main axis: Direction set by flex-direction (row = horizontal, column = vertical)
- Cross axis: Perpendicular to main axis (if main = row, cross = column)

1. justify-content [web:42][web:44]:
Controls alignment along the MAIN axis (horizontal if row, vertical if column)
Applied to: flex container

Values:
- flex-start (default) - Items packed at start
- flex-end - Items packed at end
- center - Items centered
- space-between - First item at start, last at end, equal space between
- space-around - Equal space around each item (half space at edges)
- space-evenly - Equal space between items and at edges

Examples (assuming flex-direction: row):

justify-content: flex-start;
[1][2][3]________________

justify-content: flex-end;
________________[1][2][3]

justify-content: center;
________[1][2][3]________

justify-content: space-between;
[1]______[2]______[3]

justify-content: space-around;
___[1]______[2]______[3]___

justify-content: space-evenly;
____[1]____[2]____[3]____

Usage:
.container {
  display: flex;
  justify-content: center;  // Center items horizontally (if row)
}


2. align-items [web:42][web:44]:
Controls alignment along the CROSS axis for ALL items
Applied to: flex container

Values:
- stretch (default) - Items stretch to fill container height
- flex-start - Items aligned at start of cross axis
- flex-end - Items aligned at end of cross axis
- center - Items centered on cross axis
- baseline - Items aligned by their text baseline

Examples (assuming flex-direction: row, items have different heights):

align-items: stretch;
┌────────────────┐
│ [1]  [2]  [3] │  // All items stretch to container height
└────────────────┘

align-items: flex-start;
[1]  [2]  [3]      // Items at top
                   
                   

align-items: center;
                   
[1]  [2]  [3]      // Items vertically centered
                   

align-items: flex-end;
                   
                   
[1]  [2]  [3]      // Items at bottom

Usage:
.container {
  display: flex;
  align-items: center;  // Center items vertically (if row)
}

Perfect centering (both axes):
.container {
  display: flex;
  justify-content: center;  // Horizontal center
  align-items: center;      // Vertical center
}


3. align-content [web:42][web:44]:
Controls alignment of MULTIPLE LINES when items wrap
Applied to: flex container
Only works when: flex-wrap: wrap AND there are multiple lines

Values:
- stretch (default) - Lines stretch to fill space
- flex-start - Lines packed at start
- flex-end - Lines packed at end
- center - Lines centered
- space-between - First line at start, last at end, equal space between
- space-around - Equal space around each line
- space-evenly - Equal space between lines and at edges

Example (flex-direction: row, flex-wrap: wrap):

align-content: flex-start;
[1][2][3][4]
[5][6]
______________  // Lines at top of container

align-content: center;
______________
[1][2][3][4]
[5][6]         // Lines centered vertically
______________

align-content: space-between;
[1][2][3][4]
______________
[5][6]         // Maximum space between lines

Usage:
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;  // Distribute wrapped lines
}

Key differences summary:

Property         | Axis         | Affects           | Requires wrapping?
-----------------|--------------|-------------------|-------------------
justify-content  | Main axis    | All items         | No
align-items      | Cross axis   | All items         | No
align-content    | Cross axis   | Multiple lines    | Yes (wrap)

Common confusion:
- align-items: aligns items within a single line
- align-content: aligns the lines themselves (multiple rows/columns)

Real-world analogy:
- justify-content: How to arrange books on a shelf (left, center, spaced out)
- align-items: How to align books vertically (top, middle, bottom of shelf)
- align-content: How to space multiple shelves in a bookcase
*/


/**
36. What is flex-grow, flex-shrink, and flex-basis?

These three properties control how flex items size themselves in the available space 
[web:42][web:45]. They're applied to flex items (not the container).

1. flex-basis [web:42][web:45]:
Sets the initial size of a flex item before growing or shrinking
Similar to width (for row) or height (for column), but more flexible

Values:
- auto (default) - Size based on content or width/height property
- <length> - Specific size (200px, 10em, etc.)
- <percentage> - Percentage of container size
- 0 - No base size (item starts at zero and grows)

Example:
.item {
  flex-basis: 200px;  // Item starts at 200px wide (if flex-direction: row)
}

.item {
  flex-basis: 0;      // Item starts with no width, will grow if flex-grow > 0
}

.item {
  flex-basis: auto;   // Use item's content size or width property
}


2. flex-grow [web:42][web:45]:
Controls how much a flex item grows relative to other flex items when there's extra space
Accepts a unitless number (0 or positive)

Values:
- 0 (default) - Item doesn't grow, stays at flex-basis size
- Positive number - Item grows proportionally

Example:
.container {
  display: flex;
  width: 600px;
}
.item-1 {
  flex-grow: 1;       // Gets 1 part of extra space
  flex-basis: 100px;
}
.item-2 {
  flex-grow: 2;       // Gets 2 parts of extra space (twice as much as item-1)
  flex-basis: 100px;
}
.item-3 {
  flex-grow: 0;       // Doesn't grow, stays 100px
  flex-basis: 100px;
}

Calculation:
- Total basis: 100 + 100 + 100 = 300px
- Extra space: 600 - 300 = 300px
- Total grow factor: 1 + 2 + 0 = 3
- item-1 grows: 300px × (1/3) = 100px → final: 200px
- item-2 grows: 300px × (2/3) = 200px → final: 300px
- item-3 grows: 0px → final: 100px

Common pattern - equal width items:
.item {
  flex-grow: 1;  // All items share space equally
}


3. flex-shrink [web:42][web:45]:
Controls how much a flex item shrinks relative to others when there's not enough space
Accepts a unitless number (0 or positive)

Values:
- 1 (default) - Item shrinks proportionally
- 0 - Item doesn't shrink, stays at flex-basis size
- Higher number - Shrinks more than items with lower values

Example:
.container {
  display: flex;
  width: 400px;
}
.item-1 {
  flex-shrink: 1;     // Shrinks normally
  flex-basis: 200px;
}
.item-2 {
  flex-shrink: 2;     // Shrinks twice as fast as item-1
  flex-basis: 200px;
}
.item-3 {
  flex-shrink: 0;     // Never shrinks, stays 200px
  flex-basis: 200px;
}

Result: Container is 400px, but total basis is 600px (overflow by 200px)
Items 1 and 2 shrink to fit, item-3 stays at 200px

Prevent shrinking:
.item {
  flex-shrink: 0;  // Item never gets smaller than flex-basis
}

How they work together [web:42]:

Scenario 1: Extra space available
- Items start at flex-basis size
- Extra space distributed according to flex-grow values
- flex-shrink doesn't apply

Scenario 2: Not enough space
- Items start at flex-basis size
- Space deficit absorbed according to flex-shrink values
- flex-grow doesn't apply

Scenario 3: Exact fit
- Items stay at flex-basis size
- Neither grow nor shrink properties apply

Common patterns:

Equal width items:
.item {
  flex-grow: 1;
  flex-basis: 0;
}

Fixed size, no growing/shrinking:
.item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 200px;
}

Flexible input field with fixed button:
.input {
  flex-grow: 1;      // Grows to fill space
  flex-shrink: 1;    // Can shrink if needed
}
.button {
  flex-grow: 0;      // Doesn't grow
  flex-shrink: 0;    // Doesn't shrink (stays button size)
}

Note: It's usually better to use the flex shorthand (next question) rather than setting 
these individually.
*/


/**
37. What is the shorthand flex property?

The flex property is a shorthand for flex-grow, flex-shrink, and flex-basis combined 
[web:42][web:45]. It's applied to flex items.

Syntax:
.item {
  flex: <flex-grow> <flex-shrink> <flex-basis>;
}

Full example:
.item {
  flex: 1 1 200px;
  
  // Equivalent to:
  // flex-grow: 1;
  // flex-shrink: 1;
  // flex-basis: 200px;
}

Common shorthand values [web:42]:

1. flex: initial (default)
   Equivalent to: flex: 0 1 auto
   - flex-grow: 0 (doesn't grow)
   - flex-shrink: 1 (can shrink)
   - flex-basis: auto (based on content/width)
   Use case: Items stay their natural size but can shrink if needed

2. flex: auto
   Equivalent to: flex: 1 1 auto
   - flex-grow: 1 (grows to fill space)
   - flex-shrink: 1 (can shrink)
   - flex-basis: auto (based on content/width)
   Use case: Fully flexible items that respect their content size

3. flex: none
   Equivalent to: flex: 0 0 auto
   - flex-grow: 0 (doesn't grow)
   - flex-shrink: 0 (doesn't shrink)
   - flex-basis: auto (based on content/width)
   Use case: Inflexible items that stay their natural size

4. flex: <positive-number>
   Example: flex: 1
   Equivalent to: flex: 1 1 0
   - flex-grow: <number>
   - flex-shrink: 1
   - flex-basis: 0
   Use case: Items share space equally, ignoring content size

Single value patterns:

flex: 1;
// Same as: flex: 1 1 0;
// Most common pattern for equal-width items

flex: 2;
// Same as: flex: 2 1 0;
// This item takes twice as much space as flex: 1 items

Two value patterns:

flex: 1 200px;
// Same as: flex: 1 1 200px;
// Unitless = grow/shrink, with unit = basis

flex: 2 0;
// Same as: flex: 2 1 0;
// Both unitless numbers = grow and shrink

Three value pattern:

flex: 2 1 300px;
// Explicitly sets all three:
// flex-grow: 2
// flex-shrink: 1
// flex-basis: 300px

Real-world examples:

Equal width columns:
.column {
  flex: 1;  // All columns share space equally
}

Sidebar with flexible main content:
.sidebar {
  flex: 0 0 250px;  // Fixed 250px width, no grow/shrink
}
.main {
  flex: 1;          // Takes remaining space
}

Form with flexible input:
.label {
  flex: 0 0 100px;  // Fixed 100px width
}
.input {
  flex: 1;          // Grows to fill space
}
.button {
  flex: 0 0 auto;   // Size based on content (button text)
}

Responsive card layout:
.card {
  flex: 1 1 300px;  // Minimum 300px, can grow/shrink
}

Why use shorthand [web:42]:
1. More concise and readable
2. Sets sensible defaults (flex: 1 is easier than flex: 1 1 0)
3. Prevents bugs from forgetting a property
4. Recommended by CSS specs and best practices

Best practice:
Always use the flex shorthand instead of individual properties. It's clearer and less 
error-prone. The only exception is when you need to override just one value.
*/


/**
38. What is flex-direction and how does it affect layout?

flex-direction defines the main axis direction of a flex container, determining how flex 
items are laid out [web:42][web:44][web:45]. It's applied to the flex container.

Values:

1. flex-direction: row (default)
   Main axis: horizontal (left to right)
   Cross axis: vertical (top to bottom)
   Items arranged horizontally
   
   Visual:
   [1] [2] [3] [4]

2. flex-direction: row-reverse
   Main axis: horizontal (right to left)
   Cross axis: vertical (top to bottom)
   Items arranged horizontally in reverse order
   
   Visual:
   [4] [3] [2] [1]

3. flex-direction: column
   Main axis: vertical (top to bottom)
   Cross axis: horizontal (left to right)
   Items arranged vertically
   
   Visual:
   [1]
   [2]
   [3]
   [4]

4. flex-direction: column-reverse
   Main axis: vertical (bottom to top)
   Cross axis: horizontal (left to right)
   Items arranged vertically in reverse order
   
   Visual:
   [4]
   [3]
   [2]
   [1]

Example usage:
.container {
  display: flex;
  flex-direction: row;  // Horizontal layout (default)
}

How it affects other properties [web:42]:

The main axis direction determines how other flexbox properties work:

With flex-direction: row:
- justify-content: controls horizontal alignment
- align-items: controls vertical alignment
- flex-basis: acts like width

With flex-direction: column:
- justify-content: controls vertical alignment
- align-items: controls horizontal alignment
- flex-basis: acts like height

Example showing the difference:

Horizontal (row):
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;    // Centers horizontally
  align-items: center;        // Centers vertically
}

Vertical (column):
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;    // Centers vertically
  align-items: center;        // Centers horizontally
}

Real-world use cases:

Navigation bar (horizontal):
.nav {
  display: flex;
  flex-direction: row;
}

Sidebar layout (vertical):
.sidebar {
  display: flex;
  flex-direction: column;
}

Mobile-first responsive design:
.container {
  display: flex;
  flex-direction: column;  // Stack items vertically on mobile
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;   // Horizontal layout on larger screens
  }
}

Card with vertical content:
.card {
  display: flex;
  flex-direction: column;
}
.card-image { }
.card-title { }
.card-description { flex: 1; }  // Grows to fill space
.card-button { }

Reverse order for visual reordering:
.container {
  flex-direction: row-reverse;  // Visually reverse without changing HTML
}

Important notes:

1. Direction changes what "main axis" and "cross axis" mean
2. HTML order vs visual order: -reverse values change visual order but not DOM order 
   (affects tab order and screen readers)
3. Accessibility consideration: Use -reverse carefully as it can confuse keyboard 
   navigation and screen readers
4. Can be changed with media queries for responsive design

Best practices:
- Use row for horizontal layouts (navigation, toolbars)
- Use column for vertical layouts (cards, forms, sidebars)
- Use -reverse sparingly (mainly for RTL languages or specific design needs)
- Consider accessibility when changing visual order
- Combine with media queries for responsive layouts
*/


/**
39. What are flex-wrap and flex-flow?

These properties control how flex items wrap to new lines when there's not enough space 
[web:42][web:44][web:45].

1. flex-wrap [web:42][web:44]:
Controls whether flex items are forced into a single line or wrap to multiple lines
Applied to: flex container

Values:

a) flex-wrap: nowrap (default)
   All items forced into one line
   Items may shrink or overflow container
   
   Visual (items overflow if needed):
   [1][2][3][4][5][6][7][8]

b) flex-wrap: wrap
   Items wrap to next line when there's not enough space
   New lines created in the cross axis direction
   
   Visual:
   [1][2][3][4]
   [5][6][7][8]

c) flex-wrap: wrap-reverse
   Items wrap to new lines in reverse cross axis direction
   First line appears at bottom
   
   Visual:
   [5][6][7][8]
   [1][2][3][4]

Example:
.container {
  display: flex;
  flex-wrap: wrap;     // Allow items to wrap
  width: 500px;
}
.item {
  flex: 0 0 150px;     // Fixed 150px width
}

Result: With 500px container, 3 items fit per row, 4th item wraps to next line

Real-world use cases:

Responsive card grid:
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.card {
  flex: 0 0 300px;     // Minimum 300px, wraps when needed
}

Tag cloud:
.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tag {
  flex: 0 0 auto;      // Size based on content, wraps naturally
}

Responsive navigation:
.nav {
  display: flex;
  flex-wrap: wrap;     // Items wrap on small screens
}


2. flex-flow [web:42][web:44]:
Shorthand for flex-direction and flex-wrap combined
Applied to: flex container

Syntax:
.container {
  flex-flow: <flex-direction> <flex-wrap>;
}

Examples:

flex-flow: row nowrap;
// Same as:
// flex-direction: row;
// flex-wrap: nowrap;
// (This is the default)

flex-flow: column wrap;
// Same as:
// flex-direction: column;
// flex-wrap: wrap;

flex-flow: row-reverse wrap-reverse;
// Same as:
// flex-direction: row-reverse;
// flex-wrap: wrap-reverse;

Single value (direction only):
flex-flow: column;
// Same as: flex-flow: column nowrap;

Common patterns:

Horizontal wrapping layout:
.container {
  flex-flow: row wrap;
}

Vertical wrapping layout (rare):
.container {
  flex-flow: column wrap;
}

Responsive image gallery:
.gallery {
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
}
.image {
  flex: 1 1 200px;     // Minimum 200px, grows to fill row
  max-width: 300px;    // Don't grow too large
}

When wrapping occurs [web:42]:

flex-wrap: nowrap:
- Items shrink to fit (if flex-shrink > 0)
- Or overflow container (if flex-shrink: 0)
- Single line always

flex-wrap: wrap:
- Items wrap when:
  * Their total flex-basis exceeds container size
  * They can't shrink enough to fit
  * Container is too narrow
- Creates multiple lines as needed

Effect on other properties:

When flex-wrap: wrap creates multiple lines:
- align-content becomes relevant (controls line spacing)
- align-items still controls items within each line
- Each line acts like a mini flex container

Example:
.container {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;  // Space between wrapped lines
  align-items: center;            // Center items within each line
}

Best practices:

1. Use flex-wrap: wrap for responsive layouts
   Items naturally reflow to new lines

2. Use flex-flow shorthand for cleaner code
   .container { flex-flow: row wrap; }
   instead of two separate properties

3. Combine with gap for spacing
   .container {
     flex-flow: row wrap;
     gap: 20px;
   }

4. Consider min-width or flex-basis
   Give items minimum size before wrapping

5. Test with different content amounts
   Ensure wrapping works with more or fewer items

Common mistake:
Forgetting to set flex-wrap: wrap and wondering why items don't wrap (default is nowrap).
*/


/**
40. How does align-self differ from align-items?

align-self and align-items both control alignment on the cross axis, but they target 
different scopes [web:42][web:45].

align-items [web:42][web:44]:
- Applied to: flex container
- Affects: ALL flex items within the container
- Sets the default cross-axis alignment for all items
- Container-level property

Syntax:
.container {
  display: flex;
  align-items: center;  // All items centered on cross axis
}


align-self [web:42][web:44]:
- Applied to: individual flex items
- Affects: only that specific item
- Overrides the container's align-items for that item
- Item-level property

Syntax:
.item {
  align-self: flex-end;  // This item aligned differently
}

Values (both properties accept the same values):
- auto (default for align-self) - Inherits container's align-items value
- stretch - Stretch to fill container
- flex-start - Align to start of cross axis
- flex-end - Align to end of cross axis
- center - Center on cross axis
- baseline - Align by text baseline

Example showing the difference:

.container {
  display: flex;
  align-items: center;      // All items centered by default
  height: 200px;
}

.item {
  // This item is centered (follows container's align-items)
}

.item-special {
  align-self: flex-end;     // This item overrides, aligned to bottom
}

HTML:
<div class="container">
  <div class="item">Centered</div>
  <div class="item">Centered</div>
  <div class="item-special">Bottom</div>
  <div class="item">Centered</div>
</div>

Visual (assuming flex-direction: row):
────────────────────────────
                            
[Centered] [Centered] [Bottom]
                      [Centered]
────────────────────────────

Real-world use cases:

1. Featured item in a list:
.container {
  display: flex;
  align-items: flex-start;    // All items at top
}
.featured-item {
  align-self: center;         // Featured item centered
}

2. Form with different alignments:
.form-row {
  display: flex;
  align-items: center;        // Most items centered
}
.error-message {
  align-self: flex-start;     // Error message at top
}
.submit-button {
  align-self: flex-end;       // Button at bottom
}

3. Card layout with variable content:
.card {
  display: flex;
  flex-direction: column;
  align-items: stretch;       // All content full width
}
.card-button {
  align-self: center;         // Button centered, not full width
}

4. Mixed alignment in navigation:
.nav {
  display: flex;
  align-items: center;        // Nav items centered
}
.nav-logo {
  align-self: flex-start;     // Logo at top
}

Complete example with multiple overrides:

.container {
  display: flex;
  align-items: flex-start;    // Default: items at top
  height: 300px;
}

.item-1 {
  // Uses flex-start (container default)
}

.item-2 {
  align-self: center;         // Centered vertically
}

.item-3 {
  align-self: flex-end;       // At bottom
}

.item-4 {
  align-self: stretch;        // Stretches full height
}

Visual:
────────────────────────────
[item-1]              [item-4]
                      [item-4]
         [item-2]     [item-4]
                      [item-4]
                [item-3][item-4]
────────────────────────────

Key differences summary:

Property     | Applied to     | Affects        | Purpose
-------------|----------------|----------------|---------------------------
align-items  | Flex container | All items      | Set default for all items
align-self   | Flex item      | Single item    | Override default for one item

Priority:
align-self (on item) > align-items (on container)

Best practices:

1. Set align-items on container for general alignment
   .container { align-items: center; }

2. Use align-self for exceptions
   .special-item { align-self: flex-end; }

3. Don't overuse align-self on every item
   If most items need the same alignment, use align-items

4. align-self: auto is useful
   Resets to container's align-items value

5. Great for responsive designs
   @media (max-width: 768px) {
     .mobile-special {
       align-self: stretch;
     }
   }

Common pattern - stretching all except one:
.container {
  display: flex;
  align-items: stretch;      // All items stretch
}
.no-stretch {
  align-self: center;        // Except this one
}

Remember: These properties only work on the cross axis. For main axis individual 
alignment, use auto margins or justify-content (which affects all items, not individual).
*/


/**
41. What is CSS Grid and how is it different from Flexbox?

CSS Grid (Grid Layout Module) is a two-dimensional layout system designed for creating 
complex web layouts with both rows and columns [web:42][web:48].

What is CSS Grid:
- A two-dimensional layout system (handles rows AND columns simultaneously)
- Creates grid-based layouts with precise control over placement
- Allows items to span multiple rows and columns
- Provides named grid areas for semantic layouts
- Works with both horizontal and vertical alignment at once

Key characteristics:
- Grid lines define rows and columns
- Grid cells are the intersections of rows and columns
- Grid tracks are the spaces between grid lines (rows or columns)
- Grid areas are rectangular spaces made up of one or more cells
- Items can be placed anywhere in the grid, overlapping if needed

Creating a grid:
.container {
  display: grid;              // Creates grid container
  grid-template-columns: 1fr 1fr 1fr;  // 3 equal columns
  grid-template-rows: 100px auto;       // 2 rows
  gap: 20px;                            // Spacing between cells
}

CSS Grid vs Flexbox [web:45][web:48]:

Dimensionality:
- Grid: Two-dimensional (rows AND columns)
- Flexbox: One-dimensional (row OR column, not both)

Layout approach:
- Grid: Layout-first (define grid structure, then place items)
- Flexbox: Content-first (items determine layout based on their size)

Use cases:
- Grid: Page layouts, complex 2D layouts, precise positioning
- Flexbox: Component layouts, 1D distributions, flexible item sizing

Control:
- Grid: Explicit control over both axes, precise placement
- Flexbox: Control over single axis, flexible spacing

Item placement:
- Grid: Can place items anywhere, can overlap
- Flexbox: Items flow in sequence, harder to overlap

When to use Grid [web:48]:
1. Page-level layouts (header, sidebar, main, footer)
2. Image galleries with rows and columns
3. Complex dashboards
4. Magazine-style layouts
5. Any layout requiring alignment in both dimensions
6. When you need items to line up in rows AND columns

When to use Flexbox [web:41][web:48]:
1. Navigation bars
2. Card layouts in a single row/column
3. Centering content
4. Distributing space among items
5. Form layouts
6. Small UI components

Grid vs Flexbox comparison:

Feature              | Grid           | Flexbox
---------------------|----------------|------------------
Dimensions           | 2D             | 1D
Layout direction     | Both           | Main axis only
Item placement       | Explicit       | Sequential
Overlapping          | Easy           | Difficult
Alignment control    | Both axes      | Main + cross axis
Best for             | Page layouts   | Components
Browser support      | Modern browsers| Wider support

Often used together [web:45]:
Grid for page structure, Flexbox for components within grid cells.

Example combining both:
.page {
  display: grid;                        // Grid for page layout
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 40px;
}

.header {
  display: flex;                        // Flexbox for header content
  justify-content: space-between;
  align-items: center;
}

Advantages of Grid:
- True 2D layouts without hacks
- Gap property for spacing (cleaner than margins)
- Named grid areas for readable code
- Fractional units (fr) for flexible sizing
- Items can span multiple tracks
- Precise control over placement

Advantages of Flexbox:
- Simpler for one-dimensional layouts
- Better for dynamic/unknown content sizes
- Easier to learn initially
- Better browser support (if supporting older browsers)
- More intuitive for component-level layouts

Modern best practice:
Use Grid for overall page structure and two-dimensional layouts.
Use Flexbox for one-dimensional components and flexible spacing.
They complement each other, not compete.
*/


/**
42. What are grid-template-columns and grid-template-rows?

These properties define the structure of a CSS Grid by specifying the size and number 
of columns and rows [web:42][web:44].

grid-template-columns [web:42][web:44]:
Defines the number and width of columns in the grid
Applied to: grid container

Syntax:
.container {
  display: grid;
  grid-template-columns: <track-size> <track-size> ...;
}

Examples:

1. Fixed pixel widths:
.grid {
  grid-template-columns: 100px 200px 150px;  // 3 columns with specific widths
}

2. Fractional units (fr):
.grid {
  grid-template-columns: 1fr 2fr 1fr;  // 3 columns: 25%, 50%, 25%
}

3. Mix of units:
.grid {
  grid-template-columns: 200px 1fr 200px;  // Fixed sidebars, flexible middle
}

4. Percentage:
.grid {
  grid-template-columns: 25% 50% 25%;  // 3 columns with percentages
}

5. Auto:
.grid {
  grid-template-columns: auto 1fr auto;  // Size based on content, middle flexible
}

6. Multiple columns:
.grid {
  grid-template-columns: 100px 100px 100px 100px;  // 4 equal columns
}


grid-template-rows [web:42][web:44]:
Defines the number and height of rows in the grid
Applied to: grid container

Syntax:
.container {
  display: grid;
  grid-template-rows: <track-size> <track-size> ...;
}

Examples:

1. Fixed heights:
.grid {
  grid-template-rows: 60px auto 40px;  // Header, content, footer
}

2. Fractional units:
.grid {
  grid-template-rows: 1fr 2fr;  // First row gets 1/3, second gets 2/3
}

3. Mix of units:
.grid {
  grid-template-rows: 100px 1fr 50px;  // Fixed header/footer, flexible middle
}

Track sizing keywords and functions:

1. Fixed sizes:
   - px, em, rem, %, etc.
   - grid-template-columns: 200px 300px;

2. fr (fractional unit):
   - Represents a fraction of available space
   - grid-template-columns: 1fr 2fr;  // Second column twice as wide

3. auto:
   - Size based on content
   - grid-template-columns: auto auto;

4. min-content:
   - Minimum size without overflow
   - grid-template-columns: min-content 1fr;

5. max-content:
   - Size based on largest content
   - grid-template-columns: max-content 1fr;

6. minmax(min, max):
   - Range of acceptable sizes
   - grid-template-columns: minmax(100px, 1fr) 1fr;

7. repeat():
   - Repeat pattern
   - grid-template-columns: repeat(3, 1fr);  // 3 equal columns

Real-world examples:

Holy grail layout:
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  // Left sidebar, main, right sidebar
  grid-template-rows: 60px 1fr 40px;        // Header, content, footer
  gap: 10px;
}

Dashboard layout:
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr 300px;   // Sidebar, main, widget area
  grid-template-rows: 80px 1fr;             // Header, content
}

Image gallery:
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);    // 4 equal columns
  grid-template-rows: repeat(3, 200px);     // 3 rows at 200px each
  gap: 15px;
}

Responsive columns (mobile-first):
.grid {
  grid-template-columns: 1fr;  // Single column on mobile
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;  // 2 columns on tablets
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  // 3 columns on desktop
  }
}

Advanced patterns:

Asymmetric columns:
.grid {
  grid-template-columns: 2fr 1fr 1fr;  // First column takes 50%, others 25% each
}

Fixed outer, flexible middle:
.grid {
  grid-template-columns: 100px 1fr 100px;  // Common for sidebars
}

Content-sized columns with min width:
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

Important notes:

1. Number of track sizes = number of columns/rows:
   grid-template-columns: 1fr 1fr 1fr;  // Creates exactly 3 columns

2. Items beyond defined tracks create implicit tracks:
   If you define 3 columns but have 6 items, a second row is automatically created

3. Can combine with grid-template-areas for named layouts

4. Gap spacing doesn't affect track sizes:
   gap: 20px;  // Adds space between tracks but doesn't change track widths

5. Use repeat() to avoid repetition:
   grid-template-columns: repeat(12, 1fr);  // 12-column grid (like Bootstrap)

Best practices:
- Use fr units for flexible layouts
- Combine fixed and flexible tracks for control
- Use repeat() for uniform tracks
- Use minmax() for responsive sizing
- Name lines for semantic placement (covered in later questions)
*/


/**
43. What is the repeat() function in CSS Grid?

The repeat() function is a CSS Grid notation that allows you to repeat column or row 
definitions, making code more concise and maintainable [web:44].

Syntax:
repeat(<count>, <track-list>)

Components:
- count: Number of times to repeat (or auto-fill/auto-fit)
- track-list: The track size(s) to repeat

Basic examples:

1. Repeat identical tracks:
.grid {
  grid-template-columns: repeat(4, 100px);
  
  // Equivalent to:
  // grid-template-columns: 100px 100px 100px 100px;
}

2. Repeat with fractional units:
.grid {
  grid-template-columns: repeat(3, 1fr);
  
  // Equivalent to:
  // grid-template-columns: 1fr 1fr 1fr;
}

3. Repeat with different sizes:
.grid {
  grid-template-columns: repeat(2, 100px 200px);
  
  // Equivalent to:
  // grid-template-columns: 100px 200px 100px 200px;
}

4. Repeat multiple values:
.grid {
  grid-template-columns: repeat(3, 1fr 2fr);
  
  // Equivalent to:
  // grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr;
  // Creates 6 columns alternating between 1fr and 2fr
}

Advanced usage:

1. Combining with other values:
.grid {
  grid-template-columns: 100px repeat(3, 1fr) 100px;
  
  // Equivalent to:
  // grid-template-columns: 100px 1fr 1fr 1fr 100px;
  // Fixed edges, flexible middle
}

2. Multiple repeat() functions:
.grid {
  grid-template-columns: repeat(2, 100px) repeat(3, 1fr);
  
  // Equivalent to:
  // grid-template-columns: 100px 100px 1fr 1fr 1fr;
}

3. Nested patterns:
.grid {
  grid-template-columns: repeat(2, 50px 100px 150px);
  
  // Equivalent to:
  // grid-template-columns: 50px 100px 150px 50px 100px 150px;
}

Auto-repeat with auto-fill and auto-fit:

1. auto-fill:
   Creates as many tracks as will fit, even if empty

.grid {
  grid-template-columns: repeat(auto-fill, 100px);
}

Behavior:
- Container width: 450px
- Result: 4 columns of 100px (one empty if only 3 items)
- Empty tracks are preserved

2. auto-fit:
   Creates tracks but collapses empty ones

.grid {
  grid-template-columns: repeat(auto-fit, 100px);
}

Behavior:
- Container width: 450px
- Result: 4 columns of 100px, but empty ones collapse to 0
- Only occupied tracks take space

Real-world examples:

12-column grid (like Bootstrap):
.grid {
  grid-template-columns: repeat(12, 1fr);
  gap: 15px;
}

Responsive image gallery:
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

Result: Creates as many 200px+ columns as fit, wraps automatically

Equal-height rows:
.grid {
  grid-template-rows: repeat(3, 150px);
  gap: 10px;
}

Checkerboard pattern:
.grid {
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
}

Dashboard with uniform cards:
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fill, 200px);
  gap: 20px;
}

Practical patterns:

Equal columns:
grid-template-columns: repeat(4, 1fr);

Fixed-width columns that wrap:
grid-template-columns: repeat(auto-fit, 200px);

Responsive without media queries:
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

Alternating column widths:
grid-template-columns: repeat(3, 1fr 2fr);

Advantages of repeat():

1. Concise code:
   repeat(10, 1fr) vs 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr

2. Easy to modify:
   Change repeat(4, 1fr) to repeat(5, 1fr) instead of adding another 1fr

3. Maintainable:
   Update one value instead of multiple

4. Powerful with auto-fill/auto-fit:
   Creates truly responsive grids without media queries

5. Works with complex patterns:
   repeat(3, 100px 200px) creates alternating widths

Limitations:

1. Cannot use different values in single repeat():
   Not possible: repeat(3, 100px 200px 300px) where each repetition is different

2. auto-fill/auto-fit must use fixed or minmax():
   Works: repeat(auto-fit, 200px)
   Works: repeat(auto-fit, minmax(200px, 1fr))
   Doesn't work: repeat(auto-fit, 1fr)

Best practices:
- Use repeat() for uniform grids
- Combine with minmax() for responsive layouts
- Use auto-fit for collapsing empty tracks
- Use auto-fill when you want consistent grid even with fewer items
- Simplifies media query requirements
*/


/**
44. What are grid areas and how are they defined?

Grid areas are rectangular spaces within a CSS Grid that can span multiple rows and 
columns [web:42]. They provide semantic naming for layout regions.

Two ways to define grid areas:

METHOD 1: Using grid-area on items (numeric placement)

Define by specifying grid lines:
.item {
  grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
}

Example:
.header {
  grid-area: 1 / 1 / 2 / 4;
  // Starts at row line 1, column line 1
  // Ends at row line 2, column line 4
  // Spans 1 row, 3 columns
}

Grid line numbering:
Lines start at 1, not 0
Negative numbers count from the end

Visual reference (3x3 grid):
     1   2   3   4
   ┌───┬───┬───┐
 1 │   │   │   │
   ├───┼───┼───┤
 2 │   │   │   │
   ├───┼───┼───┤
 3 │   │   │   │
   └───┴───┴───┘
 4

Shorthand variations:
grid-area: 1 / 1 / 3 / 3;      // Full syntax
grid-area: 1 / 1 / span 2 / span 2;  // Using span
grid-area: header;              // Using named area (Method 2)

METHOD 2: Using grid-template-areas (named areas)

Define named areas in the container:
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

Then assign items to named areas:
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

Rules for grid-template-areas:
- Each string represents a row
- Each word represents a cell
- Same name creates a merged area
- Use . (dot) for empty cells
- All rows must have same number of columns
- Areas must be rectangular (no L-shapes or complex shapes)

Empty cells with dots:
grid-template-areas:
  "header header header"
  "sidebar main ."        // Empty cell in top-right
  "footer footer footer";

Real-world examples:

1. Holy grail layout:
.page {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  gap: 10px;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

2. Dashboard layout:
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 60px 200px 200px;
  grid-template-areas:
    "header header header header"
    "chart chart analytics analytics"
    "stats stats stats activity";
  gap: 15px;
}

3. Responsive layout with empty space:
.container {
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "title title ."
    "content content image";
}

4. Magazine-style layout:
.magazine {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hero hero hero sidebar"
    "article1 article1 article2 sidebar"
    "article3 article4 article4 sidebar";
}

Spanning multiple areas:

Using numbers:
.large-item {
  grid-area: 1 / 1 / 3 / 3;  // Spans 2 rows and 2 columns
}

Using span keyword:
.large-item {
  grid-row: 1 / span 2;      // Start at row 1, span 2 rows
  grid-column: 1 / span 2;   // Start at column 1, span 2 columns
}

Individual placement properties:
.item {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
}

Responsive grid areas:

Mobile-first approach:
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

@media (min-width: 768px) {
  .container {
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  }
}

@media (min-width: 1024px) {
  .container {
    grid-template-columns: 200px 1fr 200px;
    grid-template-areas:
      "header header header"
      "sidebar main aside"
      "footer footer footer";
  }
}

Advantages of named grid areas:

1. Semantic and readable:
   grid-area: header; is clearer than grid-area: 1 / 1 / 2 / 4;

2. Visual representation in code:
   The grid-template-areas ASCII art shows the layout structure

3. Easy reorganization:
   Change layout by rearranging names in grid-template-areas

4. No need to calculate line numbers

5. Self-documenting code

Best practices:
- Use named areas for page-level layouts
- Use numeric placement for fine-tuned positioning
- Keep area names semantic (header, main, sidebar)
- Use media queries to reorganize named areas for responsive design
- Validate that all areas are rectangular shapes
*/


/**
45. What is auto-fit vs auto-fill?

auto-fit and auto-fill are keywords used with repeat() in CSS Grid to create responsive 
layouts without media queries [web:44]. Both create automatic column counts, but handle 
empty space differently.

Syntax:
grid-template-columns: repeat(auto-fill, <track-size>);
grid-template-columns: repeat(auto-fit, <track-size>);

Commonly used with minmax():
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

auto-fill [web:44]:
Creates as many tracks as will fit in the container, keeping empty tracks

Behavior:
- Fills the container with as many columns as possible
- Empty tracks remain in the grid (preserve space)
- Items don't grow beyond their max size if there are empty tracks
- Grid structure stays consistent regardless of item count

Example:
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

Scenario: Container is 1000px wide, items are 200px min
- Result: Creates 4 columns (200px each + gaps)
- If only 3 items: 3 items at 200px each, 1 empty column preserved
- Items stay at 200px, don't expand to fill space

Visual with 3 items:
[Item 1] [Item 2] [Item 3] [Empty]
200px    200px    200px    200px


auto-fit [web:44]:
Creates tracks but collapses empty ones, allowing items to grow

Behavior:
- Fills the container with columns
- Empty tracks collapse to 0 width
- Items grow to fill available space
- Grid adjusts based on actual item count

Example:
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

Scenario: Container is 1000px wide, items are 200px min
- Result: Creates 4 columns initially
- If only 3 items: Empty column collapses, 3 items expand to fill space
- Items grow beyond 200px to use available width

Visual with 3 items:
[  Item 1  ] [  Item 2  ] [  Item 3  ]
   ~333px       ~333px       ~333px


Side-by-side comparison:

Container: 800px wide
Track size: minmax(150px, 1fr)
3 items

auto-fill:
[Item1] [Item2] [Item3] [Empty] [Empty]
150px   150px   150px   150px   150px
(5 tracks created, 2 are empty but preserved)

auto-fit:
[    Item1    ] [    Item2    ] [    Item3    ]
    ~266px          ~266px          ~266px
(5 tracks created, 2 empty ones collapsed, items grow)

When to use each:

Use auto-fill when:
1. You want consistent item sizes
2. You need to preserve grid structure even with fewer items
3. You're aligning grids across multiple rows/sections
4. Items should not grow beyond their maximum size

Example - consistent card sizes:
.card-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
  // Cards always stay 250px, never grow
}

Use auto-fit when:
1. You want items to fill available space
2. Flexible sizing is acceptable
3. Grid should adapt to item count
4. Better use of screen real estate is desired

Example - flexible image gallery:
.gallery {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  // Images grow to fill space when fewer items
}

Real-world examples:

Responsive product grid (auto-fit):
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

Result: Products always fill the row, growing as needed

Fixed-size icon grid (auto-fill):
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  gap: 10px;
}

Result: Icons stay 60px, empty spaces remain

Flexible blog post grid (auto-fit):
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

Dashboard widgets (auto-fill for alignment):
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  gap: 15px;
}

Key differences summary:

Feature          | auto-fill      | auto-fit
-----------------|----------------|------------------
Empty tracks     | Preserved      | Collapsed
Item growth      | Limited to max | Can exceed max
Use of space     | Leaves gaps    | Fills available
Consistent sizing| Yes            | No (flexible)
Best for         | Fixed sizes    | Flexible layouts

Important notes:

1. Both require fixed or minmax() sizing:
   Works: repeat(auto-fit, 200px)
   Works: repeat(auto-fit, minmax(200px, 1fr))
   Doesn't work: repeat(auto-fit, 1fr)

2. With minmax(min, max):
   - auto-fill: items stay closer to min
   - auto-fit: items grow toward max

3. Container size matters:
   Behavior changes based on available width

4. Gap affects calculations:
   Gaps reduce available space for tracks

Best practices:
- Use auto-fit for most responsive grids (better space utilization)
- Use auto-fill when you need consistent alignment across sections
- Combine with minmax() for flexible min/max sizing
- Test with different item counts to verify behavior
- Consider using max-width on grid container to prevent items growing too large
*/


/**
46. How do minmax() and fractional units (fr) work?

These are two essential CSS Grid functions for creating flexible, responsive layouts.

minmax() function:

Defines a size range for grid tracks, with a minimum and maximum value [web:42][web:44].

Syntax:
minmax(min, max)

Parameters:
- min: Minimum size (can be px, %, em, rem, fr, auto, min-content, max-content)
- max: Maximum size (same units, plus fr)

Basic examples:

1. Fixed minimum, flexible maximum:
.grid {
  grid-template-columns: minmax(200px, 1fr);
}

Result: Column is at least 200px, grows to fill available space

2. Flexible minimum, fixed maximum:
.grid {
  grid-template-columns: minmax(100px, 300px);
}

Result: Column is between 100px and 300px based on content/space

3. Multiple columns with minmax:
.grid {
  grid-template-columns: minmax(150px, 1fr) minmax(150px, 1fr) minmax(150px, 1fr);
}

Result: 3 columns, each at least 150px, sharing remaining space equally

Common patterns with minmax():

Responsive cards without media queries:
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

Result: Creates as many 250px+ columns as fit, wraps automatically

Fixed minimum, content-based maximum:
.grid {
  grid-template-columns: minmax(200px, max-content) 1fr;
}

Result: First column at least 200px, grows to fit content, second takes rest

Flexible rows with minimum height:
.grid {
  grid-template-rows: minmax(100px, auto);
}

Result: Row at least 100px tall, grows with content


Fractional units (fr):

Represents a fraction of the available space in the grid container [web:42][web:44].

Characteristics:
- Distributes remaining space after fixed-size tracks
- Works like flex-grow but for Grid
- 1fr means "1 fraction of available space"

Basic examples:

1. Equal distribution:
.grid {
  grid-template-columns: 1fr 1fr 1fr;
}

Result: 3 equal-width columns sharing all available space

2. Proportional distribution:
.grid {
  grid-template-columns: 1fr 2fr 1fr;
}

Result: 4 total parts - first column gets 25%, middle gets 50%, last gets 25%

3. Mixed with fixed sizes:
.grid {
  grid-template-columns: 200px 1fr 200px;
}

Result: Fixed 200px sidebars, middle column takes remaining space

How fr works:

Calculation process:
1. Subtract fixed-size tracks (px, %, etc.)
2. Divide remaining space by total fr units
3. Assign proportional space to fr tracks

Example:
Container: 1000px
Columns: 100px 1fr 2fr 100px

Calculation:
- Fixed tracks: 100px + 100px = 200px
- Remaining space: 1000px - 200px = 800px
- Total fr units: 1fr + 2fr = 3fr
- 1fr = 800px / 3 = ~266.67px
- Final sizes: 100px, 266.67px, 533.33px, 100px

minmax() with fr:

Combining both provides powerful responsive layouts:

1. Minimum size with fractional growth:
.grid {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}

Result: Each column at least 200px, shares remaining space equally

2. Asymmetric with constraints:
.grid {
  grid-template-columns: minmax(150px, 1fr) minmax(200px, 2fr);
}

Result: First column 150px-1fr, second column 200px-2fr (grows twice as fast)

3. Responsive without breaking:
.grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

Result: Columns wrap at 250px, grow to fill space

Real-world examples:

Sidebar layout:
.container {
  display: grid;
  grid-template-columns: minmax(200px, 250px) minmax(500px, 1fr);
  gap: 20px;
}

Result: Sidebar 200-250px, main content at least 500px and grows

Dashboard with flexible widgets:
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(200px, auto));
  gap: 20px;
}

Result: Widgets at least 300x200px, wrap and grow as needed

Blog layout:
.blog {
  display: grid;
  grid-template-columns: minmax(300px, 2fr) minmax(200px, 1fr);
}

Result: Main content grows faster than sidebar, both have minimums

Gallery with consistent sizing:
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
  gap: 15px;
}

Result: Images always 200px (min = max), creates consistent grid

Differences and use cases:

minmax():
- Provides boundaries for track sizing
- Prevents tracks from becoming too small or too large
- Essential for responsive layouts
- Works with any length units

fr units:
- Distributes remaining space proportionally
- Flexible and adaptive
- Works after fixed-size calculations
- Cannot be used as minimum in minmax()

Limitations:

1. fr as minimum in minmax():
   Invalid: minmax(1fr, 500px)  // fr cannot be minimum
   Valid: minmax(200px, 1fr)    // fr can be maximum

2. fr doesn't work with overflow:
   If content is larger than fr allocation, it may overflow

3. minmax() max cannot be less than min:
   Invalid: minmax(500px, 300px)
   Valid: minmax(300px, 500px)

Best practices:
- Use minmax() for responsive layouts with constraints
- Use fr for flexible space distribution
- Combine both: minmax(200px, 1fr) for minimum size with flexibility
- Use repeat(auto-fit, minmax()) for truly responsive grids
- Test with different content sizes to ensure proper behavior
- Consider max-width on container to prevent excessive growth
*/


/**
47. What are implicit vs explicit grid tracks?

CSS Grid has two types of tracks: those you explicitly define and those automatically 
created by the browser [web:42].

Explicit Grid Tracks [web:42]:

Tracks you explicitly define using grid-template-columns and grid-template-rows
You control their size and number

Example:
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  // 3 explicit columns
  grid-template-rows: 100px auto;           // 2 explicit rows
}

Result: Creates a 3x2 grid (6 cells) that you've explicitly defined

What makes them explicit:
- Defined by grid-template-columns or grid-template-rows
- Sizes are specified by you
- You control exactly how many tracks exist
- Predictable and intentional structure


Implicit Grid Tracks [web:42]:

Tracks automatically created by the browser when items are placed outside the explicit grid
You don't directly control their count, but can control their size

Example:
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;  // 2 explicit columns
  grid-template-rows: 100px;       // 1 explicit row
}

<div class="container">
  <div>Item 1</div>  <!-- Row 1, Col 1 -->
  <div>Item 2</div>  <!-- Row 1, Col 2 -->
  <div>Item 3</div>  <!-- Row 2, Col 1 - IMPLICIT ROW CREATED -->
  <div>Item 4</div>  <!-- Row 2, Col 2 -->
</div>

Result: Grid creates a second row automatically to accommodate items 3 and 4

When implicit tracks are created:

1. More items than explicit cells:
   If you have 6 items but only defined 4 cells, extra rows/columns are created

2. Manual placement outside explicit grid:
.item {
  grid-row: 5;  // Placed in row 5, but only 2 rows explicitly defined
}

Browser creates implicit rows 3, 4, and 5

3. Items with span extending beyond explicit grid:
.item {
  grid-row: 1 / span 4;  // Spans 4 rows, but only 2 defined
}

Browser creates implicit rows 3 and 4

Controlling implicit track sizes:

Use grid-auto-rows and grid-auto-columns to set implicit track sizes [web:42]

grid-auto-rows:
Controls the height of implicit rows

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px;      // Explicit row: 100px
  grid-auto-rows: 80px;           // Implicit rows: 80px each
}

grid-auto-columns:
Controls the width of implicit columns

.container {
  display: grid;
  grid-template-rows: 100px 100px;
  grid-auto-columns: 150px;       // Implicit columns: 150px each
}

Using minmax() with implicit tracks:
.container {
  grid-auto-rows: minmax(100px, auto);  // At least 100px, grows with content
}

Multiple values for implicit tracks:
.container {
  grid-auto-rows: 100px 200px;  // Alternates between 100px and 200px
}

Result: 1st implicit row 100px, 2nd implicit row 200px, 3rd implicit row 100px, etc.

grid-auto-flow:

Controls how auto-placed items flow into the grid [web:42]

Values:
- row (default): Fills rows first, creates implicit rows as needed
- column: Fills columns first, creates implicit columns as needed
- dense: Attempts to fill gaps (can reorder items visually)

Example:
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;  // Items flow horizontally, new rows created
}

grid-auto-flow: column:
.container {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-auto-flow: column;  // Items flow vertically, new columns created
}

Real-world examples:

Gallery with known columns, flexible rows:
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  // 4 explicit columns
  grid-auto-rows: 200px;                   // All rows (implicit) 200px
  gap: 15px;
}

Result: Always 4 columns, rows added automatically as needed

Masonry-style layout:
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);  // Flexible height rows
  gap: 20px;
}

Timeline (vertical flow):
.timeline {
  display: grid;
  grid-template-rows: 100px 100px;     // First 2 rows explicit
  grid-auto-rows: 80px;                 // Rest are 80px
  grid-auto-flow: row;
}

Horizontal scrolling list:
.horizontal-list {
  display: grid;
  grid-template-rows: 100px;
  grid-auto-flow: column;              // Creates columns implicitly
  grid-auto-columns: 200px;
  overflow-x: auto;
}

Comparison:

Feature              | Explicit              | Implicit
---------------------|----------------------|-------------------------
Definition           | You define           | Browser creates
Control over count   | Full control         | Depends on content
Size control         | grid-template-*      | grid-auto-*
Predictability       | Predictable          | Dynamic
Use case             | Known structure      | Unknown item count

Common patterns:

Known columns, unknown rows (most common):
.grid {
  grid-template-columns: repeat(3, 1fr);  // Known columns
  grid-auto-rows: minmax(150px, auto);    // Flexible rows
}

Known rows, unknown columns:
.grid {
  grid-template-rows: repeat(3, 100px);
  grid-auto-columns: 200px;
  grid-auto-flow: column;
}

Flexible both ways:
.grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
}

Best practices:
- Define explicit grid for main structure
- Use grid-auto-rows/columns for repeating patterns with unknown counts
- Set sensible defaults for implicit tracks
- Use minmax() with implicit tracks for flexibility
- Consider grid-auto-flow for unconventional layouts
- Test with varying numbers of items
*/


/**
48. How does grid-template-areas simplify layouts?

grid-template-areas provides a visual, semantic way to define CSS Grid layouts using 
named areas [web:42][web:44]. It makes code more readable and maintainable.

Syntax:
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

How it simplifies layouts:

1. Visual representation in code:
The grid-template-areas property creates ASCII art that mirrors your layout

Traditional numeric approach:
.header {
  grid-row: 1 / 2;
  grid-column: 1 / 4;
}
.sidebar {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}
.main {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
}
// ... hard to visualize the layout

With grid-template-areas:
.container {
  grid-template-areas:
    "header  header  header"    // Instantly see layout structure
    "sidebar main    aside"
    "footer  footer  footer";
}

2. Semantic naming:
Names describe what areas contain, not numeric positions

.header { grid-area: header; }    // Clear and semantic
vs
.header { grid-row: 1; grid-column: 1 / -1; }  // Requires calculation

3. Easy reorganization:
Changing layout is just rearranging names in grid-template-areas

Mobile to desktop transformation:

Mobile (single column):
.container {
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

Desktop (multi-column):
@media (min-width: 768px) {
  .container {
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
  }
}

Layout change without touching individual item styles!

4. Self-documenting code:
The grid structure is immediately obvious to anyone reading the code

.app {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header   header   header"
    "nav      content  widgets"
    "footer   footer   footer";
}

Anyone can instantly understand: header spans top, nav on left, content in middle, etc.

Real-world examples:

1. Blog layout:
.blog {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 100px 1fr 80px;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }

2. Dashboard with multiple areas:
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 60px 200px 200px 100px;
  grid-template-areas:
    "top     top     top     top"
    "chart1  chart1  stats   stats"
    "chart2  users   users   activity"
    "footer  footer  footer  footer";
  gap: 15px;
}

3. Product page:
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "images  info"
    "images  description"
    "images  reviews";
}

4. Magazine layout:
.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 200px);
  grid-template-areas:
    "hero   hero   hero   hero   ads    ads"
    "hero   hero   hero   hero   ads    ads"
    "art1   art1   art2   art2   art3   art3"
    "art4   art5   art5   art6   art6   art6";
}

5. Empty cells with dots:
.layout {
  grid-template-areas:
    "logo    nav     nav     ."
    "sidebar content content ."
    "footer  footer  footer  footer";
}

The dot (.) represents an empty cell

Advantages of grid-template-areas:

1. Easier to understand:
   Visual representation beats numeric grid lines

2. Easier to modify:
   Rearrange layout by moving names around

3. Better for responsive design:
   Change entire layout structure in media queries

4. Cleaner HTML/CSS relationship:
   Clear connection between HTML structure and visual layout

5. Reduces errors:
   Less math, fewer mistakes with grid line numbers

6. Team-friendly:
   Designers and developers can more easily discuss layout

Responsive example showing simplification:

Mobile-first layout:
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "nav"
    "content"
    "sidebar"
    "footer";
}

Tablet:
@media (min-width: 768px) {
  .container {
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "header  header"
      "nav     content"
      "sidebar content"
      "footer  footer";
  }
}

Desktop:
@media (min-width: 1024px) {
  .container {
    grid-template-columns: 200px 1fr 250px;
    grid-template-areas:
      "header  header  header"
      "nav     content sidebar"
      "footer  footer  footer";
  }
}

Notice: HTML never changes, only grid-template-areas in CSS

Rules and constraints:

1. Must be rectangular:
   Valid:   "a a b"
            "a a c"
   Invalid: "a b b"  // Creates L-shape (not rectangular)
            "a a b"

2. Same number of columns per row:
   Valid:   "a b c"
            "d e f"
   Invalid: "a b c"
            "d e"    // Different column counts

3. Names must be consistent:
   Can't split an area name across non-contiguous cells

4. Use dots for empty cells:
   "header header ."
   ". main sidebar"

5. Names are case-sensitive:
   "Header" ≠ "header"

Best practices:
- Use grid-template-areas for page-level layouts
- Keep area names semantic and descriptive
- Align names in code for visual clarity (use spaces)
- Combine with grid-template-columns/rows for sizing
- Use for responsive reorganization (change areas in media queries)
- Reserve for layouts where visual structure is complex
- Document unusual layouts with comments
*/


/**
49. What is responsive web design?

Responsive web design (RWD) is a web design approach that makes web pages adapt and render 
well on all screen sizes and devices while ensuring good usability [web:51][web:54][web:57].

Definition [web:52][web:54][web:58]:
A design philosophy where a website's layout, images, and content automatically adjust 
to fit the screen size, resolution, and orientation of the device being used. The same 
HTML is served to all devices, with CSS controlling how content is displayed.

Core concept [web:55][web:59]:
Instead of creating separate websites for desktop, tablet, and mobile, responsive design 
uses one codebase that intelligently responds to different viewing environments.

Key principles of responsive web design [web:51][web:52][web:56]:

1. Fluid/Flexible Grids:
   - Use relative units (%, em, rem, fr) instead of fixed pixels
   - Layouts scale proportionally to screen size
   - Elements resize based on viewport width

2. Flexible Images and Media:
   - Images scale within their containers
   - Use max-width: 100% to prevent overflow
   - Responsive image techniques (srcset, picture element)

3. Media Queries:
   - Apply different styles based on device characteristics
   - Adjust layout at specific breakpoints
   - Target screen width, height, orientation, resolution

4. Mobile-First Approach [web:51][web:52]:
   - Design for smallest screens first
   - Progressively enhance for larger screens
   - Prioritizes mobile users (majority of web traffic)

5. Viewport Meta Tag:
   - Controls how pages scale on mobile devices
   - <meta name="viewport" content="width=device-width, initial-scale=1.0">

Goals of responsive design [web:51][web:55][web:57]:

1. Optimal user experience across all devices
2. Visual consistency while adapting layout
3. Improved accessibility and usability
4. Single codebase (easier to maintain)
5. Better SEO (Google recommends responsive design)
6. Faster load times (no redirects to mobile sites)
7. Cost-effective (one site instead of multiple)

Responsive vs Adaptive design [web:52][web:55]:

Responsive:
- Fluid and dynamic adaptation
- One flexible layout
- Uses relative sizing and media queries
- Smooth transitions between breakpoints
- Single codebase
- Google-recommended approach

Adaptive:
- Multiple fixed layouts
- Server detects device and serves appropriate version
- Static layouts at specific breakpoints
- Distinct designs per device
- More complex to maintain
- Better control over specific device experiences

Technologies used [web:54][web:59]:

1. CSS Flexbox and Grid for flexible layouts
2. CSS media queries for breakpoints
3. Viewport units (vw, vh, vmin, vmax)
4. Relative units (%, em, rem)
5. CSS frameworks (Bootstrap, Tailwind)
6. Responsive images (srcset, sizes, picture element)
7. JavaScript for advanced responsive features

Example basic structure:

HTML:
<meta name="viewport" content="width=device-width, initial-scale=1.0">

CSS:
.container {
  width: 90%;                    // Flexible width
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;    // Mobile: single column
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;  // Tablet: two columns
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);  // Desktop: three columns
  }
}

Why responsive design matters [web:51][web:52][web:57]:

1. Mobile traffic dominance:
   Over 50% of web traffic comes from mobile devices

2. SEO benefits:
   Google prioritizes mobile-friendly sites in search rankings

3. User expectations:
   Users expect seamless experiences across devices

4. Maintenance efficiency:
   One codebase is easier to update than multiple versions

5. Future-proof:
   Adapts to new device sizes without redesign

6. Cost-effective:
   Less expensive than maintaining separate mobile/desktop sites

Common responsive patterns [web:52]:

1. Column drop: Columns stack vertically on smaller screens
2. Mostly fluid: Margins adjust, content stays centered
3. Layout shifter: Dramatic layout changes at breakpoints
4. Tiny tweaks: Minor adjustments, same overall structure
5. Off canvas: Navigation hides in drawer on mobile

Best practices [web:51][web:52][web:58]:

- Start with mobile design first
- Use flexible grids and layouts
- Set content-based breakpoints (not device-specific)
- Optimize images for different screen sizes
- Test on real devices, not just browser resize
- Prioritize performance (mobile connections are slower)
- Ensure touch-friendly interface (larger tap targets)
- Maintain visual consistency across devices
- Use progressive enhancement
- Consider accessibility for all users
*/


/**
50. What are media queries and how do you use them?

Media queries are CSS techniques that apply styles based on device characteristics like 
screen width, height, orientation, and resolution [web:54][web:55][web:59].

Syntax:
@media <media-type> and (<media-feature>) {
  // CSS rules
}

Basic structure:
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
  }
}

Components of media queries:

1. @media keyword: Declares a media query
2. Media type (optional): screen, print, all, speech
3. Media features: Conditions to test (width, height, orientation, etc.)
4. Logical operators: and, not, only, comma (or)

Media types:

all: All devices (default if not specified)
screen: Computer screens, tablets, smartphones
print: Print preview and printed pages
speech: Screen readers

@media print {
  .no-print { display: none; }
}

Common media features:

1. width / height:
   Exact viewport dimensions
   @media (width: 768px) { }

2. min-width / min-height:
   Minimum viewport size
   @media (min-width: 768px) { }

3. max-width / max-height:
   Maximum viewport size
   @media (max-width: 767px) { }

4. orientation:
   Portrait or landscape
   @media (orientation: landscape) { }

5. aspect-ratio:
   Width-to-height ratio
   @media (aspect-ratio: 16/9) { }

6. resolution:
   Screen pixel density
   @media (min-resolution: 2dppx) { }  // Retina displays

7. prefers-color-scheme:
   User's system theme preference
   @media (prefers-color-scheme: dark) { }

8. prefers-reduced-motion:
   User's motion preference
   @media (prefers-reduced-motion: reduce) { }

How to use media queries:

1. Inline in CSS:
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

2. Multiple conditions with 'and':
@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    width: 90%;
  }
}

3. Multiple queries with comma (OR):
@media (max-width: 768px), (orientation: portrait) {
  .layout {
    flex-direction: column;
  }
}

4. Using 'not' to exclude:
@media not screen and (min-width: 768px) {
  // Applies to non-screen or width < 768px
}

5. In <link> tag (separate stylesheet):
<link rel="stylesheet" media="(max-width: 768px)" href="mobile.css">

Real-world examples:

Mobile-first approach (recommended):
// Base styles for mobile
.container {
  width: 100%;
  padding: 15px;
}

// Tablet and up
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

// Desktop and up
@media (min-width: 1024px) {
  .container {
    width: 1000px;
    padding: 30px;
  }
}

Desktop-first approach:
// Base styles for desktop
.container {
  width: 1200px;
}

// Tablet and smaller
@media (max-width: 1023px) {
  .container {
    width: 90%;
  }
}

// Mobile and smaller
@media (max-width: 767px) {
  .container {
    width: 100%;
  }
}

Responsive navigation:
.nav {
  display: flex;
  justify-content: space-between;
}

.nav-toggle {
  display: none;  // Hidden on desktop
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
  }
  
  .nav-menu {
    display: none;  // Hidden by default on mobile
  }
  
  .nav-menu.active {
    display: block;  // Show when toggled
  }
  
  .nav-toggle {
    display: block;  // Show hamburger menu
  }
}

Responsive grid:
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

Dark mode support:
:root {
  --bg-color: white;
  --text-color: black;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

Print styles:
@media print {
  header, nav, footer, .no-print {
    display: none;  // Hide non-essential elements
  }
  
  body {
    font-size: 12pt;
    color: black;
    background: white;
  }
  
  a[href]::after {
    content: " (" attr(href) ")";  // Show URLs for links
  }
}

Retina display images:
@media (min-resolution: 2dppx) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: 200px 100px;
  }
}

Range syntax (modern):
Old syntax:
@media (min-width: 768px) and (max-width: 1023px) { }

New range syntax:
@media (768px <= width <= 1023px) { }

Best practices:

1. Use mobile-first approach (min-width)
2. Keep breakpoints content-based, not device-specific
3. Test on real devices
4. Use em/rem for breakpoints (respects user font settings)
5. Avoid too many breakpoints (3-5 is typical)
6. Group related media queries together
7. Consider orientation, not just width
8. Don't forget print styles
9. Use prefers-color-scheme for dark mode
10. Optimize for performance (avoid complex queries)
*/


/**
51. What are breakpoints and how do you choose them?

Breakpoints are specific viewport widths where a website's layout changes to accommodate 
different screen sizes [web:52][web:55][web:58].

Definition:
The "points" at which media queries activate to change the design and layout of a website, 
ensuring optimal display across various devices.

How breakpoints work:
@media (min-width: 768px) {
  // Styles apply when viewport is 768px or wider
}

The value 768px is the breakpoint where the design transitions.

Common breakpoint ranges [web:52]:

Small devices (Mobile):
- 320px - 480px
- Typical breakpoint: 480px

Medium devices (Tablets):
- 481px - 768px
- Typical breakpoint: 768px

Large devices (Laptops/Desktops):
- 769px - 1024px
- Typical breakpoint: 1024px

Extra large devices (Large Desktops):
- 1025px - 1200px+
- Typical breakpoint: 1200px

Popular framework breakpoints:

Bootstrap 5:
- xs: < 576px (Extra small)
- sm: ≥ 576px (Small)
- md: ≥ 768px (Medium)
- lg: ≥ 992px (Large)
- xl: ≥ 1200px (Extra large)
- xxl: ≥ 1400px (Extra extra large)

Tailwind CSS:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

How to choose breakpoints [web:52][web:55]:

1. Content-based approach (RECOMMENDED) [web:52]:
Let your content determine breakpoints, not specific devices

Method:
- Start with mobile design
- Gradually increase viewport width
- Add breakpoint when design breaks or looks suboptimal
- Continue until desktop size

Example:
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
}

// Content looks cramped, add breakpoint
@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

// Cards too wide, add another breakpoint
@media (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

2. Device-based approach (AVOID):
Targeting specific devices (iPhone, iPad, etc.)

Problems:
- New devices constantly release with different sizes
- Not future-proof
- Ignores user preferences (zoom, text size)
- Creates maintenance issues

3. Hybrid approach (PRACTICAL):
Start with common ranges, adjust based on content

Basic structure:
// Mobile-first base styles
.container { width: 100%; }

// Small tablets: 600px
@media (min-width: 600px) {
  .container { width: 90%; }
}

// Tablets/small laptops: 900px
@media (min-width: 900px) {
  .container { width: 80%; max-width: 1200px; }
}

// Large screens: 1200px
@media (min-width: 1200px) {
  .container { max-width: 1400px; }
}

Factors to consider when choosing breakpoints:

1. Your content needs:
   How many columns make sense at different widths?

2. User analytics:
   What devices actually visit your site?

3. Design constraints:
   What layouts work best for your design?

4. Readability:
   Text line length (45-75 characters is optimal)

5. Touch targets:
   Elements need to be at least 44x44px on mobile

6. Navigation patterns:
   When to switch from hamburger to horizontal nav

Best practices for breakpoints [web:52]:

1. Use relative units (em/rem) instead of pixels:
   Respects user's font size preferences

// Instead of px
@media (min-width: 768px) { }

// Use em (768px / 16px = 48em)
@media (min-width: 48em) { }

2. Limit number of breakpoints:
   Too many create complexity; 3-5 is typically sufficient

3. Mobile-first breakpoints (min-width):
@media (min-width: 600px) { }  // Small tablets+
@media (min-width: 900px) { }  // Tablets/laptops+
@media (min-width: 1200px) { }  // Desktops+

4. Avoid overlapping breakpoints:
BAD:
@media (max-width: 768px) { }
@media (min-width: 768px) { }  // Conflict at exactly 768px

GOOD:
@media (max-width: 767px) { }
@media (min-width: 768px) { }

5. Consider orientation:
@media (max-width: 768px) and (orientation: landscape) {
  // Special handling for landscape tablets
}

6. Test between breakpoints:
Don't just test at exact breakpoint values

7. Document your breakpoints:
:root {
  --breakpoint-sm: 600px;
  --breakpoint-md: 900px;
  --breakpoint-lg: 1200px;
}

Real-world breakpoint strategy:

Minimal approach (3 breakpoints):
// Mobile: default
body { font-size: 16px; }

// Tablet: 768px
@media (min-width: 768px) {
  body { font-size: 17px; }
}

// Desktop: 1024px
@media (min-width: 1024px) {
  body { font-size: 18px; }
}

Comprehensive approach (5 breakpoints):
// Mobile: default (< 600px)
.grid { grid-template-columns: 1fr; }

// Small: 600px
@media (min-width: 600px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

// Medium: 768px
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

// Large: 1024px
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

// Extra large: 1280px
@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(5, 1fr); }
}

Content-based example (navigation):
nav { / * Mobile hamburger menu * / }

// Content fits horizontally at 640px
@media (min-width: 640px) {
  nav { / * Horizontal menu * / }
}

Common mistakes to avoid:

1. Too many breakpoints (hard to maintain)
2. Device-specific targeting (not future-proof)
3. Inconsistent breakpoint values across project
4. Not testing actual content at breakpoints
5. Forgetting about landscape orientation
6. Ignoring user zoom levels
7. Pixel-perfect obsession (embrace fluidity)

Testing breakpoints:
- Use browser DevTools responsive mode
- Test on real devices
- Check at values between breakpoints
- Test with different text sizes
- Verify touch interactions on mobile
- Check with slow network connections
*/


/**
52. What is mobile-first design?

Mobile-first design is an approach where you design and code for mobile devices first, 
then progressively enhance for larger screens [web:51][web:52][web:54].

Core concept [web:52]:
Start with the smallest, most constrained viewport and add complexity as screen size 
increases, rather than starting with desktop and removing features for mobile.

Philosophy:
Design begins with mobile constraints (limited space, touch interactions, slower 
connections), ensuring the core experience works on mobile. Then enhance with additional 
features and layout for tablets and desktops.

Mobile-first CSS approach:

Uses min-width media queries (progressive enhancement)

// Base styles: Mobile (no media query needed)
.container {
  width: 100%;
  padding: 15px;
}

.nav {
  flex-direction: column;
}

// Tablet and up (768px+)
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
  
  .nav {
    flex-direction: row;
  }
}

// Desktop and up (1024px+)
@media (min-width: 1024px) {
  .container {
    width: 1000px;
    padding: 30px;
  }
}

Desktop-first approach (for comparison):

Uses max-width media queries (graceful degradation)

// Base styles: Desktop
.container {
  width: 1200px;
  padding: 30px;
}

.nav {
  flex-direction: row;
}

// Tablet and smaller (1023px-)
@media (max-width: 1023px) {
  .container {
    width: 90%;
    padding: 20px;
  }
}

// Mobile and smaller (767px-)
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 15px;
  }
  
  .nav {
    flex-direction: column;
  }
}

Why mobile-first [web:51][web:52]:

1. Mobile dominates web traffic:
   Over 50% of users access websites from mobile devices

2. Forces prioritization:
   Limited space requires focusing on essential content first

3. Better performance:
   Base CSS is lighter, enhancements load only when needed

4. Progressive enhancement:
   Start with functional core, add features for capable devices

5. Easier to scale up than down:
   Adding features is simpler than removing them

6. Future-proof:
   New devices often have mobile-like constraints

7. Google prioritizes mobile:
   Mobile-first indexing means Google ranks based on mobile version

Mobile-first design process [web:52]:

1. Content strategy:
   Identify core content and features
   Prioritize based on mobile user needs

2. Design for smallest screen:
   Create mockups for mobile (320-375px width)
   Focus on touch interactions
   Optimize for thumb-friendly zones

3. Progressive enhancement:
   Design tablet version (add features/space)
   Design desktop version (maximize space)

4. Code mobile-first:
   Write base CSS for mobile
   Add media queries with min-width
   Layer complexity as screen grows

Mobile-first considerations:

1. Content prioritization:
   What's most important on small screens?
   
Mobile:
- Logo
- Primary navigation (hamburger)
- Key call-to-action
- Essential content

Desktop:
- All of above
- Secondary navigation
- Sidebars
- Additional features
- More imagery

2. Touch-friendly interface:
Tap targets: Minimum 44x44px
Spacing: Adequate space between interactive elements
Gestures: Swipe, pinch, tap patterns

3. Performance optimization:
Smaller images for mobile
Lazy loading
Reduced JavaScript
Critical CSS inline

4. Typography:
Base: 16px minimum for readability
Line height: 1.5-1.6 for mobile
Line length: 45-60 characters

Real-world examples:

Navigation pattern:
// Mobile: Hamburger menu
.nav {
  display: none;
}

.nav-toggle {
  display: block;
}

.nav.active {
  display: block;
}

// Desktop: Horizontal menu (768px+)
@media (min-width: 768px) {
  .nav {
    display: flex;
  }
  
  .nav-toggle {
    display: none;
  }
}

Grid layout:
// Mobile: Single column
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

// Tablet: Two columns (600px+)
@media (min-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

// Desktop: Three columns (900px+)
@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}

Hero section:
// Mobile: Stacked content
.hero {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.hero-image {
  width: 100%;
  margin-bottom: 20px;
}

// Desktop: Side-by-side (768px+)
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
    align-items: center;
    padding: 40px;
  }
  
  .hero-image {
    width: 50%;
    margin-bottom: 0;
    margin-right: 40px;
  }
}

Mobile-first vs Desktop-first comparison:

Aspect          | Mobile-first         | Desktop-first
----------------|----------------------|--------------------
Media queries   | min-width           | max-width
Philosophy      | Progressive enhance | Graceful degradation
CSS load        | Lighter base        | Heavier base
Default styles  | Mobile              | Desktop
Complexity      | Adds features       | Removes features
Performance     | Better on mobile    | Better on desktop
Trend           | Industry standard   | Legacy approach

Best practices [web:52]:

1. Always start mobile design/development first
2. Use min-width media queries
3. Prioritize content ruthlessly for mobile
4. Optimize images and assets for mobile
5. Test on real mobile devices frequently
6. Consider touch interactions from the start
7. Keep mobile CSS as the base, enhancement in media queries
8. Focus on core functionality first
9. Embrace constraints as design opportunities
10. Monitor mobile analytics and performance

Common mistakes:

1. Hiding content on mobile instead of prioritizing
2. Making tap targets too small
3. Loading desktop-sized images on mobile
4. Ignoring mobile network speeds
5. Not testing on real devices
6. Treating mobile as an afterthought
7. Creating separate mobile site instead of responsive
*/


/**
53. What is the difference between min-width and max-width media queries?

min-width and max-width are media query conditions that target different viewport sizes, 
leading to different design philosophies.

min-width [web:52]:

Applies styles when viewport is equal to or wider than the specified value
Used for mobile-first approach (progressive enhancement)

Syntax:
@media (min-width: 768px) {
  // Styles apply when viewport is 768px or wider
}

How it works:
- Base styles = mobile (no media query)
- Add features/complexity as screen gets larger
- Builds up from smallest to largest

Example:
// Mobile: default (< 768px)
.container {
  width: 100%;
  padding: 15px;
}

// Tablet and larger (≥ 768px)
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

// Desktop and larger (≥ 1024px)
@media (min-width: 1024px) {
  .container {
    width: 1000px;
    padding: 30px;
  }
}

Reading min-width queries:
"If the viewport is AT LEAST 768px wide, apply these styles"


max-width:

Applies styles when viewport is equal to or narrower than the specified value
Used for desktop-first approach (graceful degradation)

Syntax:
@media (max-width: 767px) {
  // Styles apply when viewport is 767px or narrower
}

How it works:
- Base styles = desktop (no media query)
- Remove features/simplify as screen gets smaller
- Strips down from largest to smallest

Example:
// Desktop: default (> 1023px)
.container {
  width: 1200px;
  padding: 30px;
}

// Tablet and smaller (≤ 1023px)
@media (max-width: 1023px) {
  .container {
    width: 90%;
    padding: 20px;
  }
}

// Mobile and smaller (≤ 767px)
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 15px;
  }
}

Reading max-width queries:
"If the viewport is AT MOST 767px wide, apply these styles"

Key differences:

Aspect              | min-width                | max-width
--------------------|--------------------------|---------------------------
Direction           | Mobile to desktop        | Desktop to mobile
Philosophy          | Progressive enhancement  | Graceful degradation
Base styles         | Mobile                   | Desktop
Complexity          | Adds features up         | Removes features down
Modern practice     | Recommended              | Legacy approach
CSS weight          | Lighter base             | Heavier base
Performance         | Better for mobile        | Can be slower on mobile
Reading             | "At least X wide"        | "At most X wide"

Combining both (targeting ranges):

Using both to target specific viewport ranges:

// Styles only between 768px and 1023px
@media (min-width: 768px) and (max-width: 1023px) {
  .tablet-only {
    display: block;
  }
}

Practical comparison:

Mobile-first with min-width:
// Mobile (default)
.nav {
  display: none;  // Hidden by default
}

.menu-toggle {
  display: block;  // Hamburger visible
}

// Desktop (768px+)
@media (min-width: 768px) {
  .nav {
    display: flex;  // Show horizontal menu
  }
  
  .menu-toggle {
    display: none;  // Hide hamburger
  }
}

Desktop-first with max-width:
// Desktop (default)
.nav {
  display: flex;  // Horizontal menu visible
}

.menu-toggle {
  display: none;  // Hamburger hidden
}

// Mobile (767px and below)
@media (max-width: 767px) {
  .nav {
    display: none;  // Hide menu
  }
  
  .menu-toggle {
    display: block;  // Show hamburger
  }
}

Result is the same, but approach differs

Why min-width is preferred [web:52]:

1. Mobile-first philosophy:
   Aligns with modern web usage patterns

2. Performance:
   Base CSS is lighter for mobile devices
   Additional styles load only when needed

3. Progressive enhancement:
   Start with core functionality, add features

4. Future-proof:
   New small devices don't require updates

5. Easier reasoning:
   Building up is more intuitive than stripping down

6. Better maintainability:
   Adding features is clearer than removing them

When to use each:

Use min-width (recommended):
- New projects
- Mobile-first design
- When most traffic is mobile
- Modern responsive websites
- Progressive web apps

Use max-width:
- Legacy desktop-first projects
- When retrofitting old site
- Specific desktop-only features
- Print stylesheets

Use both together:
- Targeting specific device ranges
- Complex responsive behavior
- Overlapping breakpoints

Breakpoint overlap issue:

PROBLEM:
@media (max-width: 768px) { }
@media (min-width: 768px) { }

At exactly 768px, both apply! Can cause conflicts.

SOLUTION:
@media (max-width: 767px) { }  // Up to 767px
@media (min-width: 768px) { }  // 768px and up

Or use min-width only:
@media (min-width: 768px) { }  // 768px and up (no overlap)

Real-world pattern:

Mobile-first complete example:
// Base: Mobile
body {
  font-size: 16px;
  padding: 10px;
}

.container {
  width: 100%;
}

.sidebar {
  display: none;  // Hidden on mobile
}

// Small tablets (600px+)
@media (min-width: 600px) {
  body {
    font-size: 17px;
    padding: 15px;
  }
}

// Tablets (768px+)
@media (min-width: 768px) {
  .container {
    max-width: 750px;
    margin: 0 auto;
  }
  
  .sidebar {
    display: block;  // Show sidebar
  }
}

// Desktops (1024px+)
@media (min-width: 1024px) {
  body {
    font-size: 18px;
    padding: 20px;
  }
  
  .container {
    max-width: 1000px;
  }
}

Best practices:

1. Use min-width for new projects (mobile-first)
2. Be consistent - don't mix approaches randomly
3. Avoid breakpoint overlaps (use 767px with 768px)
4. Document your breakpoint strategy
5. Test at exact breakpoint values and between them
6. Consider using CSS custom properties for breakpoints
7. Use relative units (em/rem) instead of px for accessibility
*/


/**
54. How do viewport units (vh, vw) help with responsive design?

Viewport units are CSS length units relative to the size of the viewport (browser window), 
making them powerful for responsive layouts [web:54][web:59].

Viewport unit types:

1. vw (viewport width):
   1vw = 1% of viewport width
   
Example:
.full-width {
  width: 100vw;  // Always full viewport width
}

.half-width {
  width: 50vw;  // Half of viewport width
}

2. vh (viewport height):
   1vh = 1% of viewport height
   
Example:
.full-height {
  height: 100vh;  // Always full viewport height
}

.hero {
  height: 80vh;  // 80% of viewport height
}

3. vmin (viewport minimum):
   1vmin = 1% of viewport's smaller dimension (width or height)
   
Example:
.square {
  width: 50vmin;   // 50% of smaller dimension
  height: 50vmin;  // Always square regardless of orientation
}

4. vmax (viewport maximum):
   1vmax = 1% of viewport's larger dimension
   
Example:
.cover {
  width: 100vmax;   // Covers larger dimension
  height: 100vmax;
}

How they help with responsive design:

1. Full-viewport sections without JavaScript:
.hero {
  height: 100vh;  // Always fills viewport height
  display: flex;
  align-items: center;
  justify-content: center;
}

Result: Hero section always fills screen, regardless of device

2. Responsive typography:
h1 {
  font-size: calc(2rem + 2vw);  // Scales with viewport
}

Result: Text grows/shrinks with viewport width

3. Aspect ratio maintenance:
.video-container {
  width: 100vw;
  height: 56.25vw;  // 16:9 aspect ratio (9/16 = 0.5625)
}

4. Modal overlays:
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

5. Responsive spacing:
.section {
  padding: 5vh 5vw;  // Scales with viewport
}

Practical examples:

Full-screen hero section:
.hero {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  text-align: center;
}

.hero h1 {
  font-size: 8vw;  // Responsive heading
}

Sticky footer with flexible content:
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;  // Takes remaining space
}

.footer {
  height: 10vh;
}

Responsive image galleries:
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30vw, 1fr));
  gap: 2vw;
}

Split-screen layout:
.split-screen {
  display: flex;
  height: 100vh;
}

.left-panel {
  width: 40vw;
}

.right-panel {
  width: 60vw;
}

Responsive cards with minimum size:
.card {
  width: 90vw;
  max-width: 400px;  // Prevent getting too wide
  height: 50vh;
  max-height: 600px;  // Prevent getting too tall
}

Advantages of viewport units:

1. No media queries needed for basic scaling
2. Truly fluid layouts that scale smoothly
3. Perfect for full-screen sections
4. Great for responsive typography
5. Simpler than percentage calculations
6. Work well with flexbox and grid

Limitations and gotchas:

1. Mobile browser address bars:
   100vh includes address bar, which may hide when scrolling
   
Solution:
.hero {
  height: 100vh;
  height: 100dvh;  // Dynamic viewport height (new)
}

2. Horizontal scrollbars:
   100vw includes scrollbar width
   
Solution:
.full-width {
  width: 100%;  // Use percentage instead
}

Or:
body {
  overflow-x: hidden;  // Prevent horizontal scroll
}

3. Text can become too small or large:
   Needs min/max constraints
   
Solution:
h1 {
  font-size: 5vw;
  min-font-size: 1.5rem;
  max-font-size: 3rem;
}

Or using clamp():
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

4. Accessibility concerns:
   Viewport-based text can be too small for some users
   
Solution: Always test with browser zoom

New viewport units (modern browsers):

svh (Small Viewport Height):
Smallest possible viewport height (with UI expanded)

lvh (Large Viewport Height):
Largest possible viewport height (with UI retracted)

dvh (Dynamic Viewport Height):
Dynamically adjusts as UI expands/retracts

Example:
.hero {
  height: 100dvh;  // Adjusts for mobile browser UI
}

Combining with calc():

Responsive spacing:
.section {
  padding: calc(2rem + 2vh) calc(1rem + 2vw);
}

Responsive grid gap:
.grid {
  gap: calc(10px + 1vw);
}

Offset full-viewport:
.content {
  width: calc(100vw - 40px);  // Full width minus fixed sidebar
}

Best practices:

1. Use vh for full-height sections:
   .hero { height: 100vh; }

2. Avoid vw for text unless clamped:
   font-size: clamp(1rem, 2vw, 2rem);

3. Combine with max-width for containers:
   width: 90vw; max-width: 1200px;

4. Consider mobile browsers (use dvh when supported):
   height: 100dvh;

5. Test on different devices:
   Viewport units behave differently across devices

6. Use vmin/vmax for orientation-agnostic sizing:
   Good for icons and small elements

7. Pair with CSS Grid/Flexbox:
   Creates powerful responsive layouts

8. Add fallbacks for older browsers:
   height: 600px;  // Fallback
   height: 100vh;  // Modern

Real-world pattern - Responsive landing page:
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 5vh 5vw;
}

.landing h1 {
  font-size: clamp(2rem, 6vw, 5rem);
  margin-bottom: 2vh;
}

.landing p {
  font-size: clamp(1rem, 2vw, 1.5rem);
  max-width: 60ch;  // Readable line length
}

.cta {
  margin-top: 5vh;
  padding: 2vh 4vw;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
}

Viewport units are powerful tools for responsive design when used appropriately with 
proper constraints and fallbacks.
*/


/**
55. What are web-safe fonts?

Web-safe fonts are fonts that are pre-installed on most operating systems and devices, 
ensuring consistent display across different platforms without requiring font downloads.

Definition:
Fonts commonly available across Windows, macOS, Linux, iOS, and Android systems that can 
be reliably used without worrying about availability on user devices.

Common web-safe fonts:

Serif fonts:
- Times New Roman (Windows, macOS, iOS, Android)
- Georgia (Windows, macOS, iOS, Android)
- Garamond (Windows, macOS)

Sans-serif fonts:
- Arial (Windows, macOS, iOS, Android)
- Helvetica (macOS, iOS)
- Verdana (Windows, macOS)
- Tahoma (Windows, macOS)
- Trebuchet MS (Windows, macOS)

Monospace fonts:
- Courier New (Windows, macOS, iOS, Android)
- Courier (macOS, iOS)
- Monaco (macOS)
- Consolas (Windows)

Cursive/Display fonts:
- Comic Sans MS (Windows, macOS)
- Brush Script MT (Windows, macOS)

Why web-safe fonts matter:

1. Guaranteed availability:
   Users see intended fonts without downloads

2. Performance:
   No external font files to load
   Faster page rendering

3. Fallback reliability:
   When custom fonts fail, these work

4. Cross-platform consistency:
   Similar appearance across devices

Using web-safe fonts:

Basic usage:
body {
  font-family: Arial, sans-serif;
}

Font stack (fallback chain):
body {
  font-family: Arial, Helvetica, sans-serif;
}

Reading font stacks:
Browser tries Arial first, if unavailable tries Helvetica, 
if unavailable uses system sans-serif font

Complete font stack examples:

Serif stack:
body {
  font-family: Georgia, "Times New Roman", Times, serif;
}

Sans-serif stack:
body {
  font-family: Arial, Helvetica, "Helvetica Neue", sans-serif;
}

Monospace stack:
code {
  font-family: "Courier New", Courier, Monaco, monospace;
}

System font stack (modern approach):
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
               Roboto, "Helvetica Neue", Arial, sans-serif;
}

This uses native system fonts for optimal performance

Best practices for font stacks:

1. Always include generic family:
   font-family: Arial, sans-serif;  // Good
   font-family: Arial;               // Bad (no fallback)

2. Quote multi-word font names:
   font-family: "Times New Roman", serif;  // Correct
   font-family: Times New Roman, serif;    // Incorrect

3. Order by preference:
   Most preferred first, generic last

4. Test fallbacks:
   Ensure fallback fonts maintain design integrity

5. Consider similar fonts:
   Group fonts with similar characteristics
   font-family: Helvetica, Arial, sans-serif;  // Similar weights/styles

Limitations of web-safe fonts:

1. Limited variety:
   Only ~10-15 reliably safe fonts

2. Design constraints:
   Less creative freedom

3. Platform differences:
   Fonts render slightly differently across systems

4. Dated appearance:
   Many look generic or dated

Modern alternatives:

1. Web fonts (@font-face):
   Load custom fonts from server
   @font-face {
     font-family: "Custom Font";
     src: url("font.woff2") format("woff2");
   }

2. Google Fonts:
   Free hosted web fonts
   <link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">

3. Variable fonts:
   Single file with multiple weights/styles
   Reduces HTTP requests

4. System font stack:
   Uses device's native fonts (best performance)

When to use web-safe fonts:

1. Performance-critical sites:
   No font download overhead

2. Government/corporate sites:
   Where reliability trumps design

3. Text-heavy sites:
   Where readability is paramount

4. Fallback fonts:
   Always include in font stacks

5. Email templates:
   Email clients have limited font support

6. Legacy browser support:
   Older browsers may not support web fonts

Common web-safe font combinations:

Headings + Body:
h1, h2, h3 {
  font-family: Georgia, serif;
}

body {
  font-family: Arial, sans-serif;
}

Professional/Corporate:
body {
  font-family: Verdana, Geneva, sans-serif;
}

Technical/Code:
body {
  font-family: "Trebuchet MS", sans-serif;
}

code {
  font-family: "Courier New", monospace;
}

Modern strategy (hybrid approach):

body {
  font-family: "Custom Font", Arial, sans-serif;
}

@font-face {
  font-family: "Custom Font";
  src: url("custom.woff2") format("woff2");
  font-display: swap;  // Show fallback while loading
}

This loads custom font but falls back to Arial if unavailable or slow to load.

Platform-specific considerations:

Windows default:
font-family: Arial, sans-serif;

macOS default:
font-family: Helvetica, Arial, sans-serif;

Cross-platform:
font-family: Arial, Helvetica, sans-serif;

Generic font families (fallbacks):

serif: Fonts with decorative strokes (Times New Roman, Georgia)
sans-serif: Clean fonts without strokes (Arial, Helvetica)
monospace: Fixed-width fonts (Courier, Consolas)
cursive: Handwriting-style fonts (Comic Sans, Brush Script)
fantasy: Decorative fonts (Impact, Papyrus)

Example:
font-family: "Custom Font", Arial, sans-serif;

If "Custom Font" fails → try Arial
If Arial fails → browser chooses any sans-serif font
*/


/**
56. What is the @font-face rule?

@font-face is a CSS rule that allows you to define and load custom fonts from external 
files, enabling the use of non-standard fonts on websites.

Basic syntax:
@font-face {
  font-family: "Custom Font Name";
  src: url("path/to/font.woff2") format("woff2");
}

Then use the font:
body {
  font-family: "Custom Font Name", Arial, sans-serif;
}

Complete @font-face declaration:

@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2"),
       url("myfont.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face properties:

1. font-family (required):
   Name you'll use to reference the font
   @font-face {
     font-family: "Roboto";
   }

2. src (required):
   Location and format of font file
   @font-face {
     src: url("font.woff2") format("woff2");
   }

3. font-weight:
   Specifies which weight this file represents
   @font-face {
     font-weight: 700;  // Bold
   }

4. font-style:
   Normal or italic
   @font-face {
     font-style: italic;
   }

5. font-display:
   Controls how font loads
   @font-face {
     font-display: swap;
   }

6. unicode-range:
   Specifies which characters the font should be used for
   @font-face {
     unicode-range: U+0000-00FF;  // Latin characters
   }

Font file formats:

WOFF2 (Web Open Font Format 2):
- Best compression (30% smaller than WOFF)
- Best browser support (modern browsers)
- Recommended primary format
- .woff2 extension

WOFF (Web Open Font Format):
- Good compression
- Wide browser support
- Fallback for older browsers
- .woff extension

TTF/OTF (TrueType/OpenType):
- Uncompressed
- Larger file size
- Universal support
- .ttf or .otf extension

EOT (Embedded OpenType):
- IE 9 and below only
- Rarely needed now
- .eot extension

Multiple font weights and styles:

For a complete font family with different weights and styles:

// Regular
@font-face {
  font-family: "Roboto";
  src: url("roboto-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
}

// Bold
@font-face {
  font-family: "Roboto";
  src: url("roboto-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
}

// Italic
@font-face {
  font-family: "Roboto";
  src: url("roboto-italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
}

// Bold Italic
@font-face {
  font-family: "Roboto";
  src: url("roboto-bold-italic.woff2") format("woff2");
  font-weight: 700;
  font-style: italic;
}

Usage:
body {
  font-family: "Roboto", sans-serif;
  font-weight: 400;  // Uses roboto-regular.woff2
}

strong {
  font-weight: 700;  // Uses roboto-bold.woff2
}

em {
  font-style: italic;  // Uses roboto-italic.woff2
}

font-display property values:

auto (default):
Browser default behavior (usually block)

block:
Hide text briefly (3s), then show with font
Can cause FOIT (Flash of Invisible Text)
@font-face {
  font-display: block;
}

swap:
Show fallback immediately, swap when font loads
Best for performance and UX (recommended)
@font-face {
  font-display: swap;
}

fallback:
Brief hide (100ms), show fallback, swap if font loads quickly
Balanced approach

optional:
Brief hide (100ms), only use font if already cached
Good for optional decorative fonts

Example using font-display:
@font-face {
  font-family: "OpenSans";
  src: url("opensans.woff2") format("woff2");
  font-display: swap;  // Show fallback immediately
}

Multiple source formats for browser compatibility:

@font-face {
  font-family: "MyFont";
  src: url("myfont.eot");  // IE9 Compat Mode
  src: url("myfont.eot?#iefix") format("embedded-opentype"),  // IE6-8
       url("myfont.woff2") format("woff2"),  // Modern browsers
       url("myfont.woff") format("woff"),    // All browsers
       url("myfont.ttf") format("truetype");  // Safari, Android
}

Modern simplified version (WOFF2 only):
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
  font-display: swap;
}

Local font loading:

Check if font is already installed before downloading:

@font-face {
  font-family: "Arial";
  src: local("Arial"),  // Try local first
       url("arial.woff2") format("woff2");  // Download if not found
}

Unicode-range for optimization:

Load only needed characters:

@font-face {
  font-family: "MyFont";
  src: url("latin.woff2") format("woff2");
  unicode-range: U+0000-00FF;  // Latin characters only
}

@font-face {
  font-family: "MyFont";
  src: url("cyrillic.woff2") format("woff2");
  unicode-range: U+0400-04FF;  // Cyrillic characters
}

Real-world example - Complete setup:

@font-face {
  font-family: "Montserrat";
  src: url("../fonts/montserrat-regular.woff2") format("woff2"),
       url("../fonts/montserrat-regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Montserrat";
  src: url("../fonts/montserrat-bold.woff2") format("woff2"),
       url("../fonts/montserrat-bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Montserrat", -apple-system, Arial, sans-serif;
}

Best practices:

1. Use WOFF2 format (best compression and support)
2. Always include font-display: swap for better UX
3. Provide fallback fonts in font stack
4. Host fonts yourself for GDPR compliance and performance
5. Preload critical fonts:
   <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
6. Subset fonts to include only needed characters
7. Use variable fonts when possible (single file, multiple weights)
8. Test fallback fonts to minimize layout shift

Performance considerations:

1. Font file size:
   WOFF2 provides best compression

2. Minimize font variants:
   Only load weights/styles you actually use

3. Font subsetting:
   Include only needed characters (reduces file size)

4. Font loading strategy:
   Use font-display: swap to show text immediately

5. Preload fonts:
   <link rel="preload"> for faster loading

6. Self-host fonts:
   Avoid third-party requests for privacy and speed

Common sources for web fonts:

- Google Fonts (free, hosted)
- Adobe Fonts (subscription)
- Font Squirrel (free, for self-hosting)
- Fonts.com (commercial)
- MyFonts (commercial)
- Self-converted fonts (with proper licensing)

Variable fonts (modern approach):

Single file with multiple weights/widths:

@font-face {
  font-family: "InterVariable";
  src: url("inter-variable.woff2") format("woff2-variations");
  font-weight: 100 900;  // Supports all weights in range
  font-display: swap;
}

Usage:
h1 {
  font-family: "InterVariable";
  font-weight: 350;  // Any value between 100-900 works
}

Advantages of @font-face:

1. Custom typography for brand identity
2. Better design control
3. Thousands of fonts available
4. Cross-platform consistency
5. No reliance on system fonts

Disadvantages:

1. Performance impact (additional file downloads)
2. FOIT/FOUT (Flash of Invisible/Unstyled Text)
3. Licensing costs for some fonts
4. Browser compatibility considerations
5. Need to optimize and maintain font files
*/


/**
57. What is the difference between serif and sans-serif fonts?

Serif and sans-serif are two major categories of typefaces distinguished by the presence 
or absence of decorative strokes (serifs) at the ends of letterforms.

Serif fonts:

Definition:
Fonts with small decorative strokes (serifs) at the ends of letter strokes, giving a 
more traditional, formal appearance.

Characteristics:
- Decorative "feet" or lines at letter ends
- Originated from carved Roman letters
- More traditional and classical look
- Better readability in long print text
- Creates visual flow connecting letters

Common serif fonts:
- Times New Roman
- Georgia
- Garamond
- Palatino
- Baskerville
- Merriweather
- Playfair Display

Visual features:
Letters like 'I', 'l', 'T' have horizontal strokes at top/bottom
Letter 'a' often has a tail
More variation in stroke thickness (thick and thin parts)

Example in CSS:
body {
  font-family: Georgia, "Times New Roman", serif;
}

Sans-serif fonts:

Definition:
"Sans" means "without" in French, so sans-serif fonts lack the decorative strokes at 
letter ends, resulting in clean, modern lines.

Characteristics:
- Clean, simple letterforms
- More modern and contemporary look
- Uniform stroke thickness
- Better for screen reading
- More legible at small sizes on screens

Common sans-serif fonts:
- Arial
- Helvetica
- Verdana
- Open Sans
- Roboto
- Lato
- Montserrat

Visual features:
Letters have clean, straight ends
Uniform stroke width throughout
Simpler, geometric shapes
More consistent letter spacing

Example in CSS:
body {
  font-family: Arial, Helvetica, sans-serif;
}

Key differences:

Feature           | Serif                    | Sans-serif
------------------|--------------------------|-------------------------
Decorative strokes| Yes (serifs)            | No (clean ends)
Appearance        | Traditional, formal      | Modern, clean
Best for          | Print, long text        | Screens, UI elements
Readability       | Better in print         | Better on screens
Personality       | Classic, elegant        | Contemporary, minimal
Stroke variation  | Thick and thin          | Uniform
First impression  | Formal, established     | Casual, friendly
Usage context     | Books, newspapers       | Websites, apps

When to use serif fonts:

1. Print materials:
   Books, magazines, newspapers
   Better readability in printed long-form text

2. Traditional brands:
   Law firms, financial institutions, luxury brands
   Conveys trust, establishment, tradition

3. Headings on web:
   Can create elegant contrast with sans-serif body text

4. Historical or classical contexts:
   Museums, historical sites, academic institutions

5. Long-form articles:
   Can work well for body text in articles

Example usage:
h1, h2, h3 {
  font-family: Georgia, serif;
}

body {
  font-family: Arial, sans-serif;
}

When to use sans-serif fonts:

1. Screen reading:
   Websites, mobile apps, digital interfaces
   Cleaner rendering on screens, especially at small sizes

2. Modern brands:
   Tech companies, startups, contemporary businesses
   Conveys innovation, simplicity, accessibility

3. UI elements:
   Buttons, forms, navigation
   Better legibility at small sizes

4. Short text:
   Headlines, captions, labels
   Clear and impactful

5. Accessibility:
   Generally easier to read for dyslexic users

Example usage:
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
}

.button {
  font-family: "Roboto", sans-serif;
}

Combining serif and sans-serif (font pairing):

Common pattern - serif headings, sans-serif body:
h1, h2, h3, h4 {
  font-family: "Playfair Display", Georgia, serif;
}

body, p {
  font-family: "Open Sans", Arial, sans-serif;
}

This creates visual hierarchy and interest

Opposite pattern - sans-serif headings, serif body:
h1, h2, h3 {
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 700;
}

body {
  font-family: Georgia, "Times New Roman", serif;
}

Less common but can work for traditional sites

Other font categories:

Monospace (fixed-width):
- Each character has same width
- Used for code, terminal output
- Examples: Courier New, Consolas, Monaco
code, pre {
  font-family: "Courier New", monospace;
}

Cursive (handwriting-style):
- Mimics handwriting
- Examples: Comic Sans, Brush Script
.handwriting {
  font-family: "Comic Sans MS", cursive;
}

Fantasy (decorative):
- Highly stylized, decorative
- Examples: Impact, Papyrus
- Use sparingly
.decorative {
  font-family: Impact, fantasy;
}

Screen vs print considerations:

Print (often prefer serif):
- Higher resolution
- Serifs guide eye along lines
- Traditional publishing uses serif

Screen (often prefer sans-serif):
- Lower resolution (historically)
- Sans-serif clearer at small sizes
- Less pixel distortion
- Modern trend in web design

Modern high-resolution screens blur this distinction

Current web design trends:

1. Sans-serif dominant:
   Most modern websites use sans-serif for body text

2. Serif for personality:
   Used in headings or specific sections for character

3. System fonts popular:
   -apple-system, BlinkMacSystemFont for native feel

4. Variable fonts growing:
   Offers flexibility without multiple files

Accessibility considerations:

1. Sans-serif generally more accessible:
   - Clearer character differentiation
   - Better for dyslexic readers
   - Clearer at various sizes

2. Avoid highly decorative fonts for body text:
   - Can reduce readability
   - Harder for people with visual impairments

3. Consider OpenDyslexic or similar:
   Specialized fonts designed for readability

Real-world examples:

News sites (often serif):
.article-title {
  font-family: "Times New Roman", serif;
}

Tech company sites (sans-serif):
body {
  font-family: "Inter", "Segoe UI", sans-serif;
}

E-commerce (mixed):
h1 {
  font-family: Georgia, serif;  // Product names
}

body {
  font-family: Arial, sans-serif;  // Descriptions, UI
}

Best practices:

1. Choose based on context and audience
2. Test readability on actual screens
3. Ensure sufficient contrast and sizing
4. Consider brand personality
5. Pair fonts thoughtfully (contrast but complement)
6. Don't use too many different fonts (2-3 max)
7. Prioritize readability over aesthetics
8. Test with actual users
*/


/**
58. What are font-weight, font-style, and font-variant?

These CSS properties control different aspects of font appearance.

font-weight:

Controls the thickness or boldness of font characters.

Values:

Numeric (100-900):
- 100 (Thin/Hairline)
- 200 (Extra Light/Ultra Light)
- 300 (Light)
- 400 (Normal/Regular) - default
- 500 (Medium)
- 600 (Semi Bold/Demi Bold)
- 700 (Bold)
- 800 (Extra Bold/Ultra Bold)
- 900 (Black/Heavy)

Keywords:
- normal (equivalent to 400)
- bold (equivalent to 700)
- lighter (relative to parent)
- bolder (relative to parent)

Examples:
p {
  font-weight: normal;  // Regular weight (400)
}

strong {
  font-weight: bold;  // Bold (700)
}

h1 {
  font-weight: 300;  // Light
}

.heavy {
  font-weight: 900;  // Very bold
}

.relative {
  font-weight: bolder;  // Bolder than parent
}

How font-weight works:

The actual weight depends on available font files:

@font-face {
  font-family: "Roboto";
  src: url("roboto-regular.woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Roboto";
  src: url("roboto-bold.woff2");
  font-weight: 700;
}

body {
  font-family: "Roboto";
  font-weight: 400;  // Uses roboto-regular.woff2
}

strong {
  font-weight: 700;  // Uses roboto-bold.woff2
}

If weight not available, browser synthesizes it (may look poor)

Variable fonts support any value:
h1 {
  font-weight: 450;  // Any value between 100-900 with variable fonts
}

Relative values (lighter/bolder):
parent {
  font-weight: 400;
}

child {
  font-weight: bolder;  // Becomes 700
}


font-style:

Controls whether text is italicized or displayed normally.

Values:
- normal (default) - Upright text
- italic - True italic (designed italic version)
- oblique - Slanted version of normal font
- oblique <angle> - Custom slant angle (e.g., oblique 10deg)

Examples:
p {
  font-style: normal;  // Default upright
}

em {
  font-style: italic;  // Italicized
}

.slanted {
  font-style: oblique;  // Slanted
}

.custom-slant {
  font-style: oblique 15deg;  // 15 degree slant
}

Difference between italic and oblique:

Italic:
- True italic font (separately designed)
- Different letterforms (not just slanted)
- Letters may have different shapes
- Better typography

@font-face {
  font-family: "Roboto";
  src: url("roboto-italic.woff2");
  font-style: italic;
}

em {
  font-style: italic;  // Uses roboto-italic.woff2
}

Oblique:
- Slanted version of regular font
- Same letterforms, just tilted
- Used when true italic not available
- Browser synthesizes if needed

.oblique {
  font-style: oblique;  // Browser slants the normal font
}

Common usage:
em, i {
  font-style: italic;
}

cite {
  font-style: italic;
}

.normal-style {
  font-style: normal;  // Override italic
}


font-variant:

Controls variant forms of the font, primarily small caps.

Values:
- normal (default)
- small-caps - Lowercase letters as smaller capitals
- all-small-caps - All letters as small caps
- petite-caps - Smaller version of small caps
- all-petite-caps
- unicase - Mix of uppercase and lowercase
- titling-caps - Caps designed for titles

CSS shorthand properties:
- font-variant-caps
- font-variant-numeric
- font-variant-ligatures
- font-variant-alternates
- font-variant-east-asian

Examples:

Basic small-caps:
.small-caps {
  font-variant: small-caps;
}

Result: "Hello World" displays as "HELLO WORLD" but lowercase letters are smaller

Advanced font-variant properties:

font-variant-caps:
.caps {
  font-variant-caps: small-caps;
}

font-variant-numeric (numeric features):
.numbers {
  font-variant-numeric: oldstyle-nums;  // Old-style numerals
}

.fractions {
  font-variant-numeric: diagonal-fractions;  // Diagonal fractions like ½
}

.tabular {
  font-variant-numeric: tabular-nums;  // Fixed-width numbers (for tables)
}

font-variant-ligatures (connected letters):
.ligatures {
  font-variant-ligatures: common-ligatures;  // fi, fl ligatures
}

.no-ligatures {
  font-variant-ligatures: no-common-ligatures;  // Disable ligatures
}

Combining multiple properties:

Using individual properties:
h1 {
  font-weight: 700;
  font-style: italic;
  font-variant: small-caps;
}

Using font shorthand:
h1 {
  font: italic small-caps 700 2rem/1.5 "Georgia", serif;
}

Shorthand order:
font: [font-style] [font-variant] [font-weight] font-size/line-height font-family;

Only font-size and font-family are required

Examples:
font: 16px Arial;  // Minimal
font: italic 700 20px/1.5 Georgia;  // With style and weight
font: small-caps bold 1.5em "Times New Roman", serif;  // With variant

Real-world examples:

Headings with various weights:
h1 {
  font-weight: 900;  // Very heavy
  font-style: normal;
}

h2 {
  font-weight: 700;  // Bold
  font-style: normal;
}

h3 {
  font-weight: 600;  // Semi-bold
  font-style: normal;
}

Emphasis and citations:
em, .emphasis {
  font-weight: normal;
  font-style: italic;
}

strong, .strong {
  font-weight: 700;
  font-style: normal;
}

cite {
  font-style: italic;
  font-weight: normal;
}

Sophisticated typography:
.intro {
  font-variant: small-caps;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.price {
  font-variant-numeric: tabular-nums;  // Aligned numbers
  font-weight: 700;
}

Button styles:
.button {
  font-weight: 600;
  font-style: normal;
  font-variant: normal;
}

.button-primary {
  font-weight: 700;
}

Best practices:

1. Use numeric font-weight for precision:
   font-weight: 600; instead of font-weight: bold;

2. Ensure font files exist for weights:
   Don't specify font-weight: 300 if you haven't loaded light font

3. Use italic for emphasis:
   em { font-style: italic; }

4. Don't overuse bold:
   Too much bold text reduces its effectiveness

5. Consider performance:
   Each font weight/style requires separate file download

6. Test font rendering:
   Some weights look different across browsers/OS

7. Use font-variant for special effects:
   Small-caps for acronyms or stylistic purposes

8. Variable fonts for flexibility:
   Support any weight value without multiple files

Accessibility considerations:

1. Ensure sufficient weight contrast:
   Thin fonts (100-300) can be hard to read

2. Don't rely solely on weight for meaning:
   Use semantic HTML + ARIA when needed

3. Test with screen magnification:
   Very bold or thin text can be problematic

4. Maintain readability:
   Italic text in long paragraphs reduces readability
*/


/**
59. What is line-height and how is it calculated?

line-height controls the vertical spacing between lines of text, determining the height 
of each line box.

Definition:
The distance between baselines of consecutive lines of text. It affects readability, 
visual rhythm, and overall text density.

Syntax:
selector {
  line-height: value;
}

Values:

1. Unitless number (recommended):
   line-height: 1.5;
   Multiplies the element's font-size
   Inherits as the multiplier, not computed value

2. Length units (px, em, rem):
   line-height: 24px;
   line-height: 1.5em;
   Fixed spacing, can cause issues in children

3. Percentage:
   line-height: 150%;
   Relative to element's font-size
   Inherits as computed value

4. normal (default):
   line-height: normal;
   Browser default (usually 1.2)

Examples:

Unitless (best practice):
p {
  font-size: 16px;
  line-height: 1.5;  // 16px * 1.5 = 24px line height
}

Length units:
p {
  font-size: 16px;
  line-height: 24px;  // Fixed 24px
}

Percentage:
p {
  font-size: 16px;
  line-height: 150%;  // 16px * 150% = 24px
}

How line-height is calculated:

With unitless value (recommended):
element {
  font-size: 20px;
  line-height: 1.6;
}

Calculation: 20px × 1.6 = 32px line height

child-element {
  font-size: 14px;
  // Inherits line-height: 1.6 (not 32px)
  // Calculated as: 14px × 1.6 = 22.4px
}

With em/percentage:
element {
  font-size: 20px;
  line-height: 1.6em;  // or 160%
}

Calculation: 20px × 1.6 = 32px line height

child-element {
  font-size: 14px;
  // Inherits computed value: 32px (not 1.6)
  // Result: 32px line height (may be too large)
}

Why unitless is preferred:
It inherits the ratio, not the computed value, making it more flexible for nested 
elements with different font sizes.

Visual representation:

line-height: 1 (tight)
Line one
Line two
Line three

line-height: 1.5 (comfortable)
Line one

Line two

Line three

line-height: 2 (loose)
Line one


Line two


Line three

Relationship to font-size:

Total line height = font-size × line-height

Font-size: 16px, line-height: 1.5
Total: 16px × 1.5 = 24px

Extra space: 24px - 16px = 8px
Top padding: 8px / 2 = 4px
Bottom padding: 8px / 2 = 4px

The extra 8px is distributed equally above and below the text.

Optimal line-height values:

Body text:
- 1.4 to 1.6 for comfortable reading
- 1.5 is common default

body {
  line-height: 1.5;
}

Headings:
- 1.1 to 1.3 for tighter spacing
- Larger text needs less line-height

h1 {
  line-height: 1.2;
}

Long-form content:
- 1.6 to 1.8 for easier reading

article p {
  line-height: 1.7;
}

Buttons/UI elements:
- 1 to 1.2 for compact appearance

button {
  line-height: 1;
}

Code blocks:
- 1.4 to 1.6 for code readability

code, pre {
  line-height: 1.5;
}

Real-world examples:

Comfortable paragraph:
p {
  font-size: 16px;
  line-height: 1.6;  // 25.6px total
  max-width: 65ch;   // Optimal line length
}

Tight headings:
h1 {
  font-size: 48px;
  line-height: 1.1;  // 52.8px total
  font-weight: 700;
}

h2 {
  font-size: 36px;
  line-height: 1.2;  // 43.2px total
}

Centered text:
.centered {
  text-align: center;
  line-height: 1.8;  // More generous spacing
}

Multi-line button:
.button {
  padding: 10px 20px;
  line-height: 1.5;  // Allows text to wrap
}

Single-line button:
.button-compact {
  padding: 10px 20px;
  line-height: 1;    // Tight, single-line
}

Using line-height for vertical centering:

Single line of text:
.box {
  height: 50px;
  line-height: 50px;  // Vertically centers text
  text-align: center;
}

Note: Only works for single lines

Problems with fixed line-height:

parent {
  font-size: 16px;
  line-height: 24px;  // Fixed
}

child {
  font-size: 12px;
  // Inherits 24px (too much space)
}

.large-child {
  font-size: 24px;
  // Inherits 24px (too tight, text overlaps)
}

Solution: Use unitless values

Factors affecting optimal line-height:

1. Font size:
   Larger fonts need proportionally less line-height

2. Line length:
   Longer lines need more line-height

3. Font family:
   Some fonts need more vertical space

4. x-height:
   Fonts with large x-height may need more space

5. Purpose:
   Reading vs display text

Line-height in font shorthand:

font: [font-size]/[line-height] [font-family];

Examples:
font: 16px/1.5 Arial, sans-serif;
// font-size: 16px, line-height: 1.5

font: 1.2em/1.6 Georgia, serif;
// font-size: 1.2em, line-height: 1.6

font: bold 20px/1.4 "Helvetica Neue", sans-serif;

Best practices:

1. Use unitless values:
   line-height: 1.5; (not 1.5em or 150%)

2. Set on body element:
   body { line-height: 1.5; }
   Inherits throughout document

3. Adjust for context:
   Headings, body text, buttons need different values

4. Consider readability:
   1.5-1.6 for body text is comfortable

5. Test with actual content:
   Different fonts may need different values

6. Avoid line-height: 1:
   Too tight for most body text

7. Don't go below 1.2:
   Text becomes hard to read

8. Match to design system:
   Consistent line-heights improve visual harmony

Accessibility considerations:

WCAG recommends:
- Minimum line-height of 1.5 for body text
- Minimum 1.5× font size for paragraphs

line-height: 1.5; meets this requirement

Insufficient line-height:
- Makes text harder to track
- Reduces comprehension
- Problematic for dyslexic readers

Common patterns:

Design system:
:root {
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-loose: 1.8;
}

h1, h2, h3 {
  line-height: var(--line-height-tight);
}

body, p {
  line-height: var(--line-height-normal);
}

.lead {
  line-height: var(--line-height-loose);
}

Responsive line-height:
body {
  line-height: 1.5;
}

@media (min-width: 768px) {
  body {
    line-height: 1.6;  // More space on larger screens
  }
}
*/


/**
60. What is letter-spacing and word-spacing?

letter-spacing and word-spacing control horizontal spacing between characters and words.

letter-spacing (tracking):

Controls space between individual characters.

Syntax:
selector {
  letter-spacing: value;
}

Values:
- normal (default) - No extra spacing
- Length units (px, em, rem) - Add/subtract space
- Positive values increase space
- Negative values decrease space

Examples:

Normal (default):
p {
  letter-spacing: normal;  // No extra spacing
}

Positive spacing (looser):
h1 {
  letter-spacing: 2px;  // Add 2px between each character
}

.spaced {
  letter-spacing: 0.1em;  // Add 10% of font-size
}

Negative spacing (tighter):
.tight {
  letter-spacing: -1px;  // Reduce by 1px
}

.condensed {
  letter-spacing: -0.05em;  // Reduce by 5%
}

How letter-spacing works:

text {
  letter-spacing: 0;
}
Result: HELLO

text {
  letter-spacing: 5px;
}
Result: H E L L O

text {
  letter-spacing: -2px;
}
Result: HELLO (characters closer)

Use cases for letter-spacing:

1. Uppercase text (always needs more space):
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;  // Uppercase looks cramped without this
}

2. Headings for impact:
h1 {
  font-size: 48px;
  letter-spacing: -0.02em;  // Slightly tighter for large text
}

3. Small caps:
.small-caps {
  font-variant: small-caps;
  letter-spacing: 0.1em;  // Small caps need more space
}

4. Buttons and labels:
.button {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

5. Logo text:
.logo {
  letter-spacing: 0.15em;  // Distinctive spacing
}

6. Monospace code:
code {
  font-family: monospace;
  letter-spacing: -0.02em;  // Slightly tighten monospace
}


word-spacing:

Controls space between words (spaces, not all characters).

Syntax:
selector {
  word-spacing: value;
}

Values:
- normal (default) - Standard word spacing
- Length units (px, em, rem)
- Positive values increase space between words
- Negative values decrease space

Examples:

Normal (default):
p {
  word-spacing: normal;
}

Increased word spacing:
.loose-words {
  word-spacing: 5px;  // Add 5px between words
}

.spaced-words {
  word-spacing: 0.3em;  // Add 30% of font-size
}

Decreased word spacing:
.tight-words {
  word-spacing: -2px;  // Reduce by 2px
}

How word-spacing works:

text {
  word-spacing: 0;
}
Result: Hello World Example

text {
  word-spacing: 10px;
}
Result: Hello     World     Example

text {
  word-spacing: -3px;
}
Result: Hello  World  Example (closer words)

Use cases for word-spacing:

1. Poetry or creative text:
.poem {
  word-spacing: 0.5em;  // More space for emphasis
}

2. Justified text adjustment:
.justified {
  text-align: justify;
  word-spacing: 0.1em;  // Help with justification
}

3. Titles with specific spacing:
.title {
  word-spacing: 0.3em;
  letter-spacing: 0.05em;
}

4. Rarely used in practice:
word-spacing is less common than letter-spacing

Combining letter-spacing and word-spacing:

.stylized-heading {
  text-transform: uppercase;
  letter-spacing: 0.15em;  // More space between letters
  word-spacing: 0.5em;      // More space between words
  font-weight: 700;
}

Result: L E T T E R     S P A C I N G

Practical examples:

Navigation menu:
.nav-link {
  text-transform: uppercase;
  letter-spacing: 0.05em;  // Readable uppercase
  font-size: 14px;
}

Card titles:
.card-title {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

Tagline or subtitle:
.tagline {
  letter-spacing: 0.2em;
  word-spacing: 0.3em;
  font-variant: small-caps;
}

Tight logo text:
.logo-text {
  font-weight: 900;
  letter-spacing: -0.05em;  // Tighter for impact
  font-size: 32px;
}

Code blocks:
pre, code {
  font-family: "Courier New", monospace;
  letter-spacing: 0;
  word-spacing: normal;
}

Best practices for letter-spacing:

1. Always add space to uppercase text:
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;  // Minimum
}

2. Use em units for scalability:
letter-spacing: 0.1em; (scales with font-size)
Not: letter-spacing: 2px; (fixed, doesn't scale)

3. Negative spacing with caution:
Can reduce readability if too tight

4. Large text = less spacing:
h1 {
  letter-spacing: -0.02em;  // Slight negative for large text
}

5. Small text = more spacing:
.small-text {
  font-size: 12px;
  letter-spacing: 0.02em;  // Slight positive for small text
}

6. Test readability:
Excessive letter-spacing reduces readability

Best practices for word-spacing:

1. Use sparingly:
word-spacing is less commonly needed

2. Avoid large values:
word-spacing: 20px;  // Too much, hard to read

3. Consider line-length:
Longer lines may benefit from slight word-spacing

4. Test with justified text:
word-spacing can help with text-align: justify

5. Usually keep at normal:
p {
  word-spacing: normal;  // Default is usually best
}

Accessibility considerations:

1. Don't overdo letter-spacing:
- Too much space reduces word recognition
- Can slow reading speed

2. WCAG recommends:
- Letter-spacing at least 0.12 times font size
- Word-spacing at least 0.16 times font size
- Should be adjustable by user

3. Avoid negative word-spacing:
- Makes text harder to read
- Problematic for dyslexic readers

4. Test with screen readers:
- Excessive spacing may affect pronunciation

Common patterns:

Design system:
:root {
  --letter-spacing-tight: -0.05em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-wider: 0.1em;
  --letter-spacing-widest: 0.15em;
}

.heading {
  letter-spacing: var(--letter-spacing-tight);
}

.button {
  letter-spacing: var(--letter-spacing-wide);
}

.logo {
  letter-spacing: var(--letter-spacing-widest);
}

Responsive spacing:
.heading {
  letter-spacing: 0.05em;
}

@media (min-width: 768px) {
  .heading {
    letter-spacing: 0.1em;  // More space on larger screens
  }
}

Comparison summary:

Property        | Affects            | Common use
----------------|--------------------|---------------------------------
letter-spacing  | Character spacing  | Uppercase, headings, logos
word-spacing    | Word spacing       | Rare, creative typography

Both properties:
- Accept length units (px, em, rem)
- Can be positive or negative
- Inherit to children
- Affect text layout and flow

Neither property:
- Changes font itself
- Affects line breaks (except word-spacing with justify)
- Works on vertical spacing (use line-height)
*/


/**
61. What is text-overflow and how does ellipsis work?

text-overflow controls how overflowing text is displayed when it exceeds its container.

Definition:
A CSS property that specifies how hidden overflow content should be signaled to users, 
typically using an ellipsis (...) to indicate clipped text.

Syntax:
selector {
  text-overflow: value;
}

Values:
- clip (default) - Text is clipped at boundary
- ellipsis - Displays "..." to indicate clipped text
- <string> - Custom string (limited browser support)

Important prerequisite properties:

text-overflow ONLY works when THREE properties are set:

1. white-space: nowrap; (or pre, pre-line)
2. overflow: hidden; (or auto, scroll)
3. text-overflow: ellipsis;

Example (complete setup):
.truncate {
  white-space: nowrap;      // Prevent text wrapping
  overflow: hidden;         // Hide overflow
  text-overflow: ellipsis;  // Show ellipsis
}

Without these three together, text-overflow has NO effect.

How it works:

Without text-overflow:
<div style="width: 200px; overflow: hidden;">
  This is a very long text that will overflow the container
</div>

Result: "This is a very long text that w" (abruptly cut off)

With text-overflow: clip (default):
.clip {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

Result: "This is a very long text that w" (same, clipped without indication)

With text-overflow: ellipsis:
.ellipsis {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

Result: "This is a very long text th..." (ellipsis shows there's more)

Real-world examples:

Single-line truncation (most common):
.card-title {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

Flexible width:
.product-name {
  max-width: 250px;  // Use max-width instead of fixed width
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

In flexbox:
.flex-item {
  flex: 1;
  min-width: 0;            // Important for flex items!
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

In grid:
.grid-item {
  min-width: 0;            // Important for grid items!
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

Multi-line truncation (more complex):

CSS-only multi-line ellipsis (modern browsers):

.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 3;           // Number of lines
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;         // Optional, works in some browsers
}

Result: Shows 3 lines of text with ellipsis on the last line

Example:
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

"This is a long description that spans multiple lines and will be truncated after two..."

Cross-browser multi-line (fallback):

.multi-line-fallback {
  max-height: 4.5em;         // 3 lines × 1.5 line-height
  line-height: 1.5;
  overflow: hidden;
  position: relative;
}

.multi-line-fallback::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  padding-left: 5px;
}

Common use cases:

1. Card titles:
.card-title {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

2. Table cells:
td {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

3. Navigation items:
.nav-item {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

4. File names:
.filename {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

5. Product descriptions:
.product-desc {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

Utility class (reusable):

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

Usage:
<div class="truncate" style="width: 200px;">
  Long text here that will be truncated
</div>

With tooltips for full text:

HTML:
<div class="truncate" title="Full text here">
  Long text that gets truncated
</div>

CSS:
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: help;
}

Hover shows full text in browser tooltip

JavaScript-enhanced version:

<div class="truncate" data-full-text="Complete text here">
  Long text
</div>

CSS:
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tooltip {
  position: relative;
}

.tooltip:hover::after {
  content: attr(data-full-text);
  position: absolute;
  background: black;
  color: white;
  padding: 5px;
  border-radius: 4px;
  white-space: normal;
  max-width: 300px;
}

Common mistakes:

1. Forgetting white-space: nowrap:
.wrong {
  overflow: hidden;
  text-overflow: ellipsis;  // Won't work without nowrap
}

2. Not setting width or max-width:
.wrong {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  // Won't work without constrained width
}

3. Using with display: inline:
.wrong {
  display: inline;          // Doesn't work with inline
  text-overflow: ellipsis;
}

4. Forgetting min-width: 0 in flex/grid:
.flex-item {
  // Without min-width: 0, overflow may not work
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

Best practices:

1. Always use all three required properties:
white-space, overflow, text-overflow

2. Use max-width for flexibility:
max-width: 250px; (better than fixed width: 250px;)

3. Provide way to see full text:
Use title attribute or expandable UI

4. Test with varying content:
Ensure works with short and long text

5. Consider accessibility:
Screen readers should access full text

6. Use semantic HTML:
Don't truncate important content unnecessarily

7. Add min-width: 0 to flex/grid items:
Ensures overflow works correctly

8. Test in different browsers:
-webkit-line-clamp has varying support

Accessibility considerations:

1. Use title attribute:
<p class="truncate" title="Full text">Truncated</p>

2. Provide full text alternative:
Hidden text for screen readers

3. Consider expandable UI:
"Read more" button instead of permanent truncation

4. Don't truncate critical information:
Error messages, labels should be fully visible

5. Test with screen readers:
Ensure full content is accessible

Browser support:

text-overflow: ellipsis:
Excellent support across all modern browsers

-webkit-line-clamp:
Good modern browser support, but non-standard
Needs -webkit- prefix

Custom string:
Limited support, avoid in production

Alternative: JavaScript solutions:

For more control, use JavaScript libraries:
- Clamp.js
- Shave
- Dotdotdot

These provide better multi-line support and cross-browser consistency.
*/


/**
62. What is transform and what are translate, rotate, scale, skew?

The transform property applies 2D or 3D transformations to elements, allowing you to 
move, rotate, scale, and skew them without affecting the document flow.

Definition:
transform modifies the visual rendering of an element by applying geometric 
transformations in a coordinate space.

Basic syntax:
selector {
  transform: function(value);
}

Key characteristic:
Transformed elements don't affect the position of surrounding elements (unlike margin/
padding). They're transformed visually but occupy their original space in the layout.

Main transform functions:

1. translate() - Move element:

translate(x, y) - Move horizontally and vertically
translateX(x) - Move horizontally only
translateY(y) - Move vertically only
translateZ(z) - Move along z-axis (3D)
translate3d(x, y, z) - Move in 3D space

Syntax:
.element {
  transform: translate(50px, 100px);  // Right 50px, down 100px
}

.element {
  transform: translateX(50px);  // Right 50px
}

.element {
  transform: translateY(-30px);  // Up 30px
}

Values:
- Length units: px, em, rem, etc.
- Percentages: Relative to element's own dimensions

Examples:
.move-right {
  transform: translateX(100px);  // Move 100px right
}

.move-up {
  transform: translateY(-50px);  // Move 50px up
}

.move-both {
  transform: translate(50px, -30px);  // Right 50px, up 30px
}

.center-trick {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  // Perfect centering
}

Use cases:
- Positioning elements precisely
- Creating hover effects
- Centering absolutely positioned elements
- Animations and transitions


2. rotate() - Rotate element:

rotate(angle) - Rotate clockwise around center
rotateX(angle) - Rotate around X-axis (3D)
rotateY(angle) - Rotate around Y-axis (3D)
rotateZ(angle) - Same as rotate() (around Z-axis)
rotate3d(x, y, z, angle) - Rotate around custom axis

Syntax:
.element {
  transform: rotate(45deg);  // Rotate 45 degrees clockwise
}

Angle units:
- deg (degrees): 0deg to 360deg
- rad (radians): 0rad to 6.28rad
- grad (gradians): 0grad to 400grad
- turn: 0turn to 1turn (full rotation)

Examples:
.rotate-45 {
  transform: rotate(45deg);  // 45 degrees clockwise
}

.rotate-negative {
  transform: rotate(-90deg);  // 90 degrees counterclockwise
}

.rotate-full {
  transform: rotate(360deg);  // Full rotation
}

.rotate-half {
  transform: rotate(0.5turn);  // 180 degrees
}

.flip-horizontal {
  transform: rotateY(180deg);  // Flip around Y-axis
}

.flip-vertical {
  transform: rotateX(180deg);  // Flip around X-axis
}

Use cases:
- Loading spinners
- Card flip effects
- Icon rotations
- Decorative elements
- Arrow indicators


3. scale() - Resize element:

scale(x, y) - Scale width and height
scaleX(x) - Scale width only
scaleY(y) - Scale height only
scaleZ(z) - Scale depth (3D)
scale3d(x, y, z) - Scale in 3D

Syntax:
.element {
  transform: scale(1.5);  // 150% of original size (both dimensions)
}

Values:
- 1 = original size (100%)
- 0.5 = half size (50%)
- 2 = double size (200%)
- 0 = collapsed (invisible)

Examples:
.scale-up {
  transform: scale(1.5);  // 150% larger
}

.scale-down {
  transform: scale(0.8);  // 80% of original
}

.scale-x-only {
  transform: scaleX(2);  // Double width, same height
}

.scale-y-only {
  transform: scaleY(0.5);  // Half height, same width
}

.scale-different {
  transform: scale(1.5, 0.8);  // 150% width, 80% height
}

.flip-mirror {
  transform: scaleX(-1);  // Mirror horizontally
}

Use cases:
- Hover zoom effects
- Image thumbnails
- Button interactions
- Loading indicators
- Image flips (negative scale)


4. skew() - Slant element:

skew(x-angle, y-angle) - Skew both axes
skewX(angle) - Skew horizontally
skewY(angle) - Skew vertically

Syntax:
.element {
  transform: skew(10deg, 5deg);  // Slant 10deg horizontally, 5deg vertically
}

Examples:
.skew-x {
  transform: skewX(20deg);  // Slant horizontally
}

.skew-y {
  transform: skewY(10deg);  // Slant vertically
}

.skew-both {
  transform: skew(15deg, 5deg);  // Slant both directions
}

.parallelogram {
  width: 200px;
  height: 100px;
  background: blue;
  transform: skewX(20deg);
}

Use cases:
- Parallelogram shapes
- Decorative effects
- Diagonal elements
- Creative layouts
- Less common than other transforms


Combining multiple transforms:

Multiple transforms in one property:
.element {
  transform: translate(50px, 100px) rotate(45deg) scale(1.5);
}

Order matters:
.order1 {
  transform: translate(100px, 0) rotate(45deg);
  // Move then rotate
}

.order2 {
  transform: rotate(45deg) translate(100px, 0);
  // Rotate then move (moves in rotated direction!)
}

Common patterns:

Hover zoom:
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);  // Slight zoom on hover
}

Rotation animation:
.spinner {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

Slide in from left:
.slide-in {
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.slide-in.active {
  transform: translateX(0);
}

Perfect centering:
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

Card flip:
.card {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card:hover {
  transform: rotateY(180deg);
}

3D transforms:

Enable 3D space:
.container {
  perspective: 1000px;  // Required for 3D effect
}

.element {
  transform: rotateX(45deg) rotateY(45deg);
  transform-style: preserve-3d;
}

Transform origin:

Change the point around which transformation occurs:

.element {
  transform-origin: center center;  // Default
  transform: rotate(45deg);
}

.top-left {
  transform-origin: top left;
  transform: rotate(45deg);  // Rotates around top-left corner
}

.bottom-right {
  transform-origin: 100% 100%;  // Bottom-right corner
  transform: scale(1.5);  // Scales from bottom-right
}

Values:
- Keywords: top, bottom, left, right, center
- Percentages: 0% 0% (top-left), 50% 50% (center), 100% 100% (bottom-right)
- Length: 20px 30px

Performance considerations:

GPU-accelerated properties (fast):
- transform: translate()
- transform: scale()
- transform: rotate()
- opacity

These trigger compositing, not layout or paint

Non-accelerated properties (slower):
- top, left, right, bottom
- width, height
- margin, padding

These trigger layout recalculation

Best practice: Use transform for animations, not top/left

Best practices:

1. Use translate instead of top/left for positioning:
   transform: translateX(50px); (GPU accelerated)
   Not: left: 50px; (triggers layout)

2. Combine transforms in single property:
   transform: translate(50px, 0) rotate(45deg) scale(1.2);

3. Use transform-origin when needed:
   Default center works for most cases

4. Add will-change for complex animations:
   will-change: transform;

5. Use 3D transforms sparingly:
   Can be memory intensive

6. Test on mobile devices:
   Transform performance varies

7. Remember order matters:
   translate then rotate ≠ rotate then translate

Browser support:
Excellent for 2D transforms across all modern browsers
3D transforms require prefixes for older browsers

Common use cases summary:

translate: Moving elements, centering, slide animations
rotate: Spinners, indicators, decorative rotations
scale: Hover effects, zoom, image previews
skew: Decorative effects, parallelograms (rare)
*/


/**
63. What are CSS transitions and how do they work?

CSS transitions allow you to smoothly animate changes in CSS property values over a 
specified duration, creating fluid visual effects without JavaScript.

Definition:
Transitions enable gradual changes between two states of an element when a property 
value changes, rather than instant jumps.

Basic syntax:
selector {
  transition: property duration timing-function delay;
}

Four transition properties:

1. transition-property - Which properties to animate
2. transition-duration - How long the transition takes
3. transition-timing-function - Speed curve of the transition
4. transition-delay - Delay before transition starts

Complete example:
.button {
  background: blue;
  transition: background 0.3s ease 0s;
}

.button:hover {
  background: red;  // Animates from blue to red in 0.3s
}

Individual properties:

transition-property:
Specifies which CSS properties should transition

Values:
- all (default) - All animatable properties
- none - No transitions
- property-name - Specific property (background, transform, opacity, etc.)
- Multiple properties - Comma-separated

Examples:
.element {
  transition-property: all;  // Animate all changing properties
}

.specific {
  transition-property: background;  // Only background
}

.multiple {
  transition-property: background, transform, opacity;  // Multiple
}

.none {
  transition-property: none;  // Disable transitions
}


transition-duration:
How long the transition takes

Values:
- Time in seconds (s) or milliseconds (ms)
- 0s (default) - Instant, no animation

Examples:
.fast {
  transition-duration: 0.2s;  // 200ms - Quick
}

.medium {
  transition-duration: 0.5s;  // 500ms - Moderate
}

.slow {
  transition-duration: 1s;  // 1000ms - Slow
}

.multiple {
  transition-property: background, transform;
  transition-duration: 0.3s, 0.6s;  // Different durations
}


transition-timing-function:
Speed curve of the transition (covered in detail in question 64)

Common values:
- ease (default) - Slow start, fast middle, slow end
- linear - Constant speed
- ease-in - Slow start, then fast
- ease-out - Fast start, then slow
- ease-in-out - Slow start and end
- cubic-bezier(n,n,n,n) - Custom curve

Examples:
.ease {
  transition-timing-function: ease;
}

.linear {
  transition-timing-function: linear;
}


transition-delay:
Delay before transition starts

Values:
- Time in seconds or milliseconds
- 0s (default) - No delay
- Can be negative (starts mid-transition)

Examples:
.delayed {
  transition-delay: 0.5s;  // Wait 0.5s before starting
}

.no-delay {
  transition-delay: 0s;  // Start immediately
}

.staggered-1 {
  transition-delay: 0.1s;
}

.staggered-2 {
  transition-delay: 0.2s;
}

.staggered-3 {
  transition-delay: 0.3s;
}


Shorthand syntax:

Complete shorthand:
transition: property duration timing-function delay;

Examples:
.button {
  transition: background 0.3s ease 0s;
}

.short {
  transition: all 0.5s;  // Property and duration only
}

.multiple {
  transition: 
    background 0.3s ease,
    transform 0.5s ease-in-out,
    opacity 0.2s linear;
}

Minimum shorthand:
.minimal {
  transition: 0.3s;  // Duration only (applies to all properties)
}

How transitions work:

Without transition:
.box {
  background: blue;
}

.box:hover {
  background: red;  // Instant color change
}

With transition:
.box {
  background: blue;
  transition: background 0.5s;
}

.box:hover {
  background: red;  // Smooth color change over 0.5s
}

Transitionable properties:

Not all CSS properties can be transitioned. Property must have intermediate values.

Animatable:
- opacity: 0 to 1
- color, background-color: Any color to any color
- width, height: Any length to any length
- transform: Any transform to any transform
- top, left, right, bottom: Any length to any length
- margin, padding: Any length to any length
- font-size: Any length to any length

Not animatable:
- display: none to block (no intermediate values)
- visibility: hidden to visible (discrete, but can transition)
- font-family: Cannot interpolate between fonts

Workaround for display:
.element {
  opacity: 0;
  transition: opacity 0.3s;
  // Don't use display: none, use visibility or opacity
}

.element.active {
  opacity: 1;
}

Real-world examples:

Button hover effect:
.button {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0);
}

Link underline animation:
.link {
  position: relative;
  text-decoration: none;
  color: blue;
}

.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: blue;
  transition: width 0.3s ease;
}

.link:hover::after {
  width: 100%;
}

Card hover zoom:
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

Smooth color change:
.element {
  background: linear-gradient(to right, blue, purple);
  transition: opacity 0.5s ease;
}

.element:hover {
  opacity: 0.8;
}

Sidebar slide:
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.sidebar.open {
  transform: translateX(0);
}

Menu dropdown:
.dropdown {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.dropdown.open {
  max-height: 500px;
}

Transition events in JavaScript:

.element {
  transition: opacity 0.5s;
}

element.addEventListener('transitionend', (e) => {
  console.log(`Transition finished: ${e.propertyName}`);
});

Events:
- transitionstart - When transition begins
- transitionend - When transition completes
- transitionrun - When transition is queued
- transitioncancel - When transition is cancelled

Best practices:

1. Keep transitions short (0.2s - 0.5s):
   Longer feels sluggish

2. Use appropriate timing functions:
   ease-out for entrances, ease-in for exits

3. Transition performance-friendly properties:
   transform and opacity (GPU accelerated)
   Avoid width, height, margin (trigger layout)

4. Don't transition everything:
   transition: all; can cause unexpected animations

5. Provide visual feedback:
   Transitions should enhance UX, not hinder it

6. Test on slower devices:
   What's smooth on desktop may lag on mobile

7. Use transition for state changes:
   Hover, focus, active, class toggles

8. Consider accessibility:
   Some users prefer reduced motion
   @media (prefers-reduced-motion: reduce) {
     * {
       transition-duration: 0.01ms !important;
     }
   }

9. Don't overuse:
   Too many transitions are distracting

10. Match duration to distance:
    Larger movements need longer durations

Common pitfalls:

1. Transitioning layout properties:
   Causes reflow, performance issues
   Use transform instead

2. Forgetting vendor prefixes (legacy):
   Modern browsers don't need them

3. Chaining too many transitions:
   Can feel slow and unresponsive

4. Transitioning display:
   Cannot be transitioned, use opacity/visibility

5. Not considering state restoration:
   Ensure transitions work in both directions

Performance tips:

Fast (GPU accelerated):
transform, opacity

Slow (triggers layout/paint):
width, height, top, left, margin, padding

Optimal pattern:
.element {
  transition: transform 0.3s, opacity 0.3s;
}

.element:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

Accessibility:

Respect user preferences:
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0s !important;
  }
}

Or:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
*/


/**
64. What is transition-timing-function?

transition-timing-function defines the speed curve of a transition, controlling how the 
intermediate values are calculated over the duration.

Definition:
Specifies the acceleration curve for a transition, determining how the transition 
progresses from start to finish.

Syntax:
selector {
  transition-timing-function: value;
}

Built-in timing functions:

1. linear:
   Constant speed from start to finish
   No acceleration or deceleration

.linear {
  transition: transform 1s linear;
}

Visual: ────────────
Speed curve is flat, equal speed throughout

Use cases:
- Loading indicators
- Progress bars
- Color transitions
- When you want mechanical, constant motion


2. ease (default):
   Slow start, speeds up, then slows down at the end
   Most natural-feeling transition

.ease {
  transition: transform 1s ease;
}

Visual: ╱───╲
Gentle acceleration and deceleration

Use cases:
- General purpose (default for a reason)
- Hover effects
- Most UI transitions


3. ease-in:
   Starts slowly, accelerates toward the end
   Also called "slow start"

.ease-in {
  transition: transform 1s ease-in;
}

Visual: ╱────
Gradual acceleration

Use cases:
- Elements exiting the screen
- Closing modals
- Fade-out effects
- When element is leaving focus


4. ease-out:
   Starts quickly, decelerates toward the end
   Also called "slow end"

.ease-out {
  transition: transform 1s ease-out;
}

Visual: ────╲
Quick start, gentle landing

Use cases:
- Elements entering the screen
- Opening modals
- Fade-in effects
- When element is gaining focus
- Most hover effects


5. ease-in-out:
   Starts slowly, speeds up in middle, slows down at end
   Symmetric curve

.ease-in-out {
  transition: transform 1s ease-in-out;
}

Visual: ╱──╲
Smooth acceleration and deceleration

Use cases:
- Smooth, polished animations
- When element moves and returns
- Looping animations


cubic-bezier() function:

Creates custom timing functions using Bézier curves

Syntax:
cubic-bezier(x1, y1, x2, y2)

Parameters:
- x1, y1: First control point (0 to 1)
- x2, y2: Second control point (can exceed 0-1 for bounce effects)

Examples:
.custom {
  transition: transform 1s cubic-bezier(0.4, 0.0, 0.2, 1);
}

Built-in equivalents:
ease = cubic-bezier(0.25, 0.1, 0.25, 1)
linear = cubic-bezier(0, 0, 1, 1)
ease-in = cubic-bezier(0.42, 0, 1, 1)
ease-out = cubic-bezier(0, 0, 0.58, 1)
ease-in-out = cubic-bezier(0.42, 0, 0.58, 1)

Popular custom cubic-bezier values:

Material Design standard:
cubic-bezier(0.4, 0.0, 0.2, 1)

Fast out, slow in:
cubic-bezier(0.4, 0.0, 0.6, 1)

Fast out, linear in:
cubic-bezier(0.4, 0.0, 1, 1)

Ease out back:
cubic-bezier(0.34, 1.56, 0.64, 1)  // Slight overshoot

Ease in back:
cubic-bezier(0.6, -0.28, 0.735, 0.045)  // Slight "wind up"


steps() function:

Creates stepped timing, jumping from value to value rather than smooth interpolation

Syntax:
steps(number, jump-term)

Parameters:
- number: How many steps
- jump-term: start, end, both, none

Examples:
.steps {
  transition: transform 1s steps(5);  // 5 discrete steps
}

.steps-start {
  transition: transform 1s steps(5, start);  // Jump at start of each step
}

.steps-end {
  transition: transform 1s steps(5, end);  // Jump at end of each step (default)
}

Use cases:
- Sprite animations
- Loading indicators with discrete states
- Typewriter effects
- Frame-by-frame animations

Shorthand keywords:
step-start = steps(1, start)
step-end = steps(1, end)

Real-world examples:

Button hover (ease-out):
.button {
  background: blue;
  transform: scale(1);
  transition: 
    background 0.3s ease-out,
    transform 0.2s ease-out;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}

Rationale: ease-out feels responsive and natural for interactive elements

Modal entrance (ease-out):
.modal {
  opacity: 0;
  transform: translateY(-50px);
  transition: 
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

.modal.open {
  opacity: 1;
  transform: translateY(0);
}

Rationale: Elements entering should start fast and slow down (ease-out)

Modal exit (ease-in):
.modal.closing {
  transition: 
    opacity 0.2s ease-in,
    transform 0.2s ease-in;
  opacity: 0;
  transform: translateY(-50px);
}

Rationale: Elements exiting should accelerate away (ease-in)

Loading spinner (linear):
.spinner {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

Rationale: Constant speed feels mechanical and predictable

Bounce effect (custom cubic-bezier):
.bounce {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bounce:hover {
  transform: scale(1.2);
}

Rationale: Negative and >1 values create overshoot/bounce

Elastic effect:
.elastic {
  transition: transform 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.elastic:hover {
  transform: translateX(20px);
}

Comparing timing functions visually:

Linear:
Progress: ├──────────┤
Time:     0s      1s

Ease:
Progress: ├╱────╲────┤
Time:     0s      1s

Ease-in:
Progress: ├╱─────────┤
Time:     0s      1s

Ease-out:
Progress: ├──────╲───┤
Time:     0s      1s

Ease-in-out:
Progress: ├╱───╲─────┤
Time:     0s      1s

Choosing the right timing function:

Entering elements: ease-out
- Modals, tooltips, dropdowns
- Start fast, slow landing feels natural

Exiting elements: ease-in
- Closing, hiding, removing
- Accelerate away from view

Looping animations: linear or ease-in-out
- Spinners: linear
- Pulsing: ease-in-out

Interactive elements: ease-out
- Buttons, links, cards
- Responsive feel

Smooth, polished: ease-in-out
- Smooth start and end
- Professional feel

Tools for creating custom curves:

1. Cubic-bezier.com
   Interactive tool for visualizing and creating curves

2. Easings.net
   Gallery of easing functions with cubic-bezier values

3. Browser DevTools
   Chrome/Firefox have built-in cubic-bezier editors

Multiple timing functions:

Different timing for different properties:
.element {
  transition: 
    transform 0.3s ease-out,
    opacity 0.5s linear,
    background 0.4s ease-in-out;
}

Best practices:

1. Use ease-out for most UI interactions:
   Feels most responsive

2. Match timing to motion:
   Fast movements → shorter duration
   Slow movements → longer duration

3. Use linear for mechanical animations:
   Loading spinners, progress bars

4. Ease-in for exits, ease-out for entrances:
   Natural flow

5. Test on real devices:
   Timing feels different at different frame rates

6. Don't overuse complex curves:
   Simpler is usually better

7. Consider context:
   Playful app → bouncy animations
   Professional app → smooth, subtle animations

8. Use cubic-bezier for custom effects:
   But start with built-ins first

Performance note:
All timing functions have similar performance. The timing function doesn't affect GPU 
acceleration; the properties being transitioned do.

Accessibility:
Respect reduced motion preferences:
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    transition-timing-function: linear !important;
  }
}
*/


/**
65. What are CSS animations and keyframes?

CSS animations allow you to create complex, multi-step animations using keyframes, 
defining how an element should change over time without JavaScript.

Definition:
CSS animations enable elements to gradually change from one style to another at specified 
intervals, controlled by keyframe rules.

Two parts to CSS animations:

1. @keyframes rule - Defines the animation sequence
2. animation properties - Applies the animation to elements

@keyframes syntax:

Define animation sequence:
@keyframes animation-name {
  from {
    / * Starting styles * /
  }
  to {
    / * Ending styles * /
  }
}

Or with percentages:
@keyframes animation-name {
  0% {
    / * Starting styles * /
  }
  50% {
    / * Middle styles * /
  }
  100% {
    / * Ending styles * /
  }
}

Applying animation:
.element {
  animation: animation-name duration timing-function delay iteration-count direction fill-mode;
}

Basic examples:

Simple fade in:
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-element {
  animation: fadeIn 1s;
}

Sliding animation:
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-element {
  animation: slideIn 0.5s ease-out;
}

Rotation:
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 2s linear infinite;
}

Multi-step animations:

Using percentages:
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0);
  }
}

.bouncing-element {
  animation: bounce 1s ease-in-out infinite;
}

Complex multi-step:
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  25% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  75% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

Multiple properties:
@keyframes complexAnimation {
  0% {
    background: red;
    transform: translateX(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    background: yellow;
    transform: translateX(100px) rotate(180deg);
    opacity: 1;
  }
  100% {
    background: green;
    transform: translateX(200px) rotate(360deg);
    opacity: 0.5;
  }
}

Multiple keyframe points:
@keyframes waveAnimation {
  0%, 100% {
    transform: translateY(0);
  }
  10%, 30% {
    transform: translateY(-10px);
  }
  20%, 40% {
    transform: translateY(-5px);
  }
}

Animation properties:

1. animation-name:
   Name of @keyframes to use
   .element { animation-name: fadeIn; }

2. animation-duration:
   How long animation takes
   .element { animation-duration: 2s; }

3. animation-timing-function:
   Speed curve (ease, linear, etc.)
   .element { animation-timing-function: ease-in-out; }

4. animation-delay:
   Delay before animation starts
   .element { animation-delay: 0.5s; }

5. animation-iteration-count:
   How many times to repeat
   .element { animation-iteration-count: infinite; }

6. animation-direction:
   Forward, backward, alternate
   .element { animation-direction: alternate; }

7. animation-fill-mode:
   Styles before/after animation
   .element { animation-fill-mode: forwards; }

8. animation-play-state:
   Running or paused
   .element { animation-play-state: paused; }

Shorthand syntax:
animation: name duration timing-function delay iteration-count direction fill-mode;

Example:
.element {
  animation: slideIn 1s ease-out 0.5s 1 normal forwards;
}

Minimal:
.element {
  animation: fadeIn 2s;
}

Real-world examples:

Loading spinner:
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

Pulse animation:
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.notification {
  animation: pulse 2s ease-in-out infinite;
}

Shake animation:
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.error-input {
  animation: shake 0.5s;
}

Fade in up:
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content {
  animation: fadeInUp 0.6s ease-out;
}

Typing indicator (dots):
@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.dot {
  animation: typing 1.4s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

Background color transition:
@keyframes colorChange {
  0% { background: #3498db; }
  25% { background: #e74c3c; }
  50% { background: #f39c12; }
  75% { background: #2ecc71; }
  100% { background: #3498db; }
}

.animated-bg {
  animation: colorChange 10s ease-in-out infinite;
}

Floating animation:
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.floating-icon {
  animation: float 3s ease-in-out infinite;
}

Controlling animations with JavaScript:

Start/stop animation:
element.style.animationPlayState = 'paused';
element.style.animationPlayState = 'running';

Add animation dynamically:
element.style.animation = 'fadeIn 1s';

Listen for animation events:
element.addEventListener('animationstart', () => {
  console.log('Animation started');
});

element.addEventListener('animationend', () => {
  console.log('Animation ended');
});

element.addEventListener('animationiteration', () => {
  console.log('Animation repeated');
});

Multiple animations:

Apply multiple animations to one element:
.element {
  animation: 
    rotate 2s linear infinite,
    pulse 1s ease-in-out infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

Best practices:

1. Use transform and opacity:
   GPU accelerated, best performance

2. Keep animations short:
   0.2s - 0.8s for UI interactions
   Longer animations feel sluggish

3. Name keyframes descriptively:
   @keyframes slideInFromLeft { }
   Not: @keyframes animation1 { }

4. Avoid animating layout properties:
   Don't animate: width, height, margin, padding
   Use: transform, opacity

5. Use will-change for complex animations:
   .element {
     will-change: transform, opacity;
   }

6. Provide reduced motion alternative:
   @media (prefers-reduced-motion: reduce) {
     * {
       animation-duration: 0.01ms !important;
     }
   }

7. Test on various devices:
   Animations may lag on slower devices

8. Don't overuse:
   Too many animations are distracting

Performance considerations:

Fast (GPU accelerated):
- transform
- opacity

Slow (triggers reflow/repaint):
- width, height
- top, left
- margin, padding
- color, background

Optimal keyframes:
@keyframes goodPerformance {
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(100px);
    opacity: 1;
  }
}

Accessibility:

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}

Browser support:
Excellent in all modern browsers. Legacy browsers need prefixes:
@-webkit-keyframes fadeIn { }
@keyframes fadeIn { }
*/


/**
66. What is the difference between animation and transition?

Animations and transitions both create motion in CSS, but they have different purposes, 
capabilities, and use cases.

Key differences:

TRIGGERS:

Transition:
- Requires a trigger (hover, focus, class change, etc.)
- Animates from one state to another when property changes
- Cannot start automatically on page load

Example:
.button {
  background: blue;
  transition: background 0.3s;
}

.button:hover {
  background: red;  // Triggers transition
}

Animation:
- Can start automatically (no trigger needed)
- Can loop infinitely
- Runs as soon as element is rendered (or after delay)

Example:
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.element {
  animation: pulse 2s infinite;  // Starts immediately, loops forever
}


KEYFRAMES:

Transition:
- Only two states: start and end
- Cannot define intermediate steps
- Smooth interpolation between two values

.box {
  opacity: 0;
  transition: opacity 0.5s;
}

.box.visible {
  opacity: 1;  // Only start and end
}

Animation:
- Multiple keyframes (unlimited steps)
- Full control over intermediate states
- Can create complex sequences

@keyframes complex {
  0% { transform: translateX(0); }
  25% { transform: translateX(100px) rotate(45deg); }
  50% { transform: translateX(200px) rotate(90deg); }
  75% { transform: translateX(100px) rotate(135deg); }
  100% { transform: translateX(0) rotate(180deg); }
}


CONTROL:

Transition:
- Simple: duration, timing, delay
- Limited control
- Always plays forward
- Plays once per trigger

.element {
  transition: transform 0.5s ease-in-out;
}

Animation:
- Complex: duration, timing, delay, iteration, direction, fill-mode
- Full control over playback
- Can play forward, backward, alternate
- Can loop infinitely or specific count

.element {
  animation: slideIn 1s ease-out 0.5s infinite alternate both;
}


LOOPING:

Transition:
- Cannot loop
- Plays once per state change
- To repeat, must toggle state again

.box {
  transition: transform 1s;
}

// Must manually trigger again to repeat

Animation:
- Can loop infinitely
- Can specify iteration count
- Automatic looping

.spinner {
  animation: rotate 2s linear infinite;  // Loops forever
}


AUTO-START:

Transition:
- Requires user interaction or JavaScript
- Reactive (responds to changes)

Animation:
- Starts automatically when element is rendered
- Proactive (runs on its own)

.loader {
  animation: spin 1s linear infinite;  // Starts immediately on page load
}


Comparison table:

Feature              | Transition                | Animation
---------------------|---------------------------|---------------------------
Keyframes            | 2 (start, end)           | Unlimited
Trigger              | Required                  | Optional (auto-start)
Looping              | No                        | Yes (infinite or count)
Direction            | Forward only              | Forward, reverse, alternate
Automatic            | No                        | Yes
Intermediate steps   | No                        | Yes
Complexity           | Simple                    | Complex
Use case             | Interactive state changes | Standalone motion


When to use transitions:

1. Hover effects:
.button {
  background: blue;
  transition: background 0.3s;
}

.button:hover {
  background: darkblue;
}

2. Focus states:
.input {
  border: 1px solid gray;
  transition: border-color 0.2s;
}

.input:focus {
  border-color: blue;
}

3. Toggle states:
.dropdown {
  max-height: 0;
  transition: max-height 0.3s;
}

.dropdown.open {
  max-height: 500px;
}

4. Simple state changes:
.modal {
  opacity: 0;
  transition: opacity 0.3s;
}

.modal.visible {
  opacity: 1;
}

5. Interactive UI elements:
Buttons, links, cards, inputs where user interaction triggers change


When to use animations:

1. Loading indicators:
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

2. Attention-grabbers:
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.notification {
  animation: pulse 2s infinite;
}

3. Page load animations:
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.content {
  animation: fadeIn 0.5s;
}

4. Complex sequences:
@keyframes complexPath {
  0% { transform: translate(0, 0); }
  25% { transform: translate(100px, 0); }
  50% { transform: translate(100px, 100px); }
  75% { transform: translate(0, 100px); }
  100% { transform: translate(0, 0); }
}

5. Continuous effects:
Background animations, ambient movement, looping graphics


Can you use both together? Yes!

Element with transition AND animation:
.element {
  / * Animation runs automatically * /
  animation: float 3s ease-in-out infinite;
  
  / * Transition for hover * /
  transition: background 0.3s;
  background: blue;
}

.element:hover {
  background: red;  / * Transition activates * /
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

Converting between them:

Transition to animation:
// Transition version
.box {
  opacity: 0;
  transition: opacity 0.5s;
}

.box.visible {
  opacity: 1;
}

// Animation equivalent
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.box.visible {
  animation: fadeIn 0.5s forwards;
}

Animation to transition:
// Animation version
@keyframes grow {
  from { transform: scale(1); }
  to { transform: scale(1.2); }
}

.box:hover {
  animation: grow 0.3s forwards;
}

// Transition equivalent (simpler!)
.box {
  transform: scale(1);
  transition: transform 0.3s;
}

.box:hover {
  transform: scale(1.2);
}

Best practices:

Use transitions for:
- Interactive elements (buttons, links, cards)
- Simple state changes
- Hover, focus, active states
- UI feedback
- Simpler code and better performance

Use animations for:
- Loading indicators
- Auto-playing effects
- Complex multi-step sequences
- Looping effects
- Page load animations
- Attention-grabbing elements

General rules:
1. If it needs a trigger → use transition
2. If it should loop or auto-start → use animation
3. If it's simple (A to B) → use transition
4. If it's complex (A to B to C to D) → use animation
5. Transitions are generally simpler and more performant for basic cases

Performance:
Both transitions and animations perform equally well when animating transform and 
opacity. The properties being animated matter more than transition vs animation.
*/


/**
67. What is animation-fill-mode and animation-iteration-count?

These properties control how animations behave before, during, and after execution.

animation-iteration-count:

Specifies how many times an animation should repeat.

Values:
- <number> - Specific count (1, 2, 3, etc.)
- infinite - Loops forever

Syntax:
.element {
  animation-iteration-count: value;
}

Examples:

Play once (default):
.element {
  animation: fadeIn 1s;
  animation-iteration-count: 1;  // Default
}

Play twice:
.element {
  animation-iteration-count: 2;
}

Play three times:
.heading {
  animation: bounce 0.5s ease-out;
  animation-iteration-count: 3;
}

Loop forever:
.spinner {
  animation: rotate 2s linear;
  animation-iteration-count: infinite;
}

Fractional counts:
.element {
  animation-iteration-count: 2.5;  // Plays 2.5 times
}

Shorthand:
.element {
  animation: fadeIn 1s infinite;  // Iteration count in shorthand
}

Real-world examples:

Loading spinner (infinite):
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}

Shake error input (3 times):
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%, 75% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
}

.input-error {
  animation: shake 0.3s;
  animation-iteration-count: 3;
}

Pulse notification (infinite):
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

.notification-badge {
  animation: pulse 2s ease-in-out infinite;
}

Bounce once:
.button {
  animation: bounce 0.5s;
  animation-iteration-count: 1;
}


animation-fill-mode:

Specifies how styles are applied before and after animation execution.

Values:
- none (default) - No styles applied outside animation
- forwards - Retains final keyframe styles after animation
- backwards - Applies first keyframe styles before animation (during delay)
- both - Applies both forwards and backwards behavior

Syntax:
.element {
  animation-fill-mode: value;
}

Understanding fill-mode:

Timeline:
[Delay] → [Animation] → [After]

none (default):
- Before animation: element's normal styles
- During delay: element's normal styles
- During animation: animated styles
- After animation: returns to normal styles

forwards:
- Before animation: element's normal styles
- During animation: animated styles
- After animation: retains final keyframe styles

backwards:
- Before animation (during delay): first keyframe styles
- During animation: animated styles
- After animation: returns to normal styles

both:
- Before animation (during delay): first keyframe styles
- During animation: animated styles
- After animation: retains final keyframe styles

Examples:

none (default):
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  opacity: 0.5;  // Normal state
  animation: fadeIn 1s;
  animation-fill-mode: none;
}

// Before: opacity 0.5
// During: animates from 0 to 1
// After: returns to opacity 0.5


forwards (most common):
.element {
  opacity: 0;  // Initial state
  animation: fadeIn 1s;
  animation-fill-mode: forwards;
}

// Before: opacity 0
// During: animates from 0 to 1
// After: stays at opacity 1 (retains final keyframe)


backwards (with delay):
.element {
  opacity: 0.5;
  animation: fadeIn 1s 2s;  // 2s delay
  animation-fill-mode: backwards;
}

// Before animation starts (during 2s delay): opacity 0 (first keyframe)
// During animation: animates from 0 to 1
// After: returns to opacity 0.5


both (common for delayed animations):
.element {
  opacity: 0.5;
  animation: fadeIn 1s 2s;
  animation-fill-mode: both;
}

// During delay: opacity 0 (first keyframe)
// During animation: animates from 0 to 1
// After: stays at opacity 1 (final keyframe)

Real-world examples:

Fade in and stay (forwards):
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content {
  opacity: 0;  // Hidden initially
  animation: fadeIn 0.6s ease-out;
  animation-fill-mode: forwards;  // Stays visible after animation
}

Modal entrance with delay (both):
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  animation: modalEnter 0.3s ease-out 0.1s;
  animation-fill-mode: both;
  // Applies 'from' styles during delay
  // Retains 'to' styles after animation
}

Slide in from left and stay:
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.sidebar {
  transform: translateX(-100%);  // Off-screen initially
  animation: slideInLeft 0.4s ease-out;
  animation-fill-mode: forwards;  // Stays on-screen
}

Loading complete indicator:
@keyframes success {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.checkmark {
  animation: success 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  animation-fill-mode: forwards;
}

Combining both properties:

Shorthand syntax:
animation: name duration timing-function delay iteration-count direction fill-mode;

Examples:

Loop forever with forwards fill:
.element {
  animation: pulse 2s ease-in-out 0s infinite normal forwards;
}

Three times with both fill:
.element {
  animation: shake 0.3s ease 0.2s 3 normal both;
}

Common patterns:

Auto-start, play once, keep final state:
@keyframes intro {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: intro 0.6s ease-out forwards;
}

Infinite loop:
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: rotate 1s linear infinite;
  // fill-mode doesn't matter with infinite
}

Delayed start with both:
.element {
  animation: fadeIn 0.5s ease-out 1s both;
  // During 1s delay: applies 'from' keyframe
  // After animation: retains 'to' keyframe
}

Practical usage:

Staggered list items:
.item {
  opacity: 0;
  animation: fadeInUp 0.5s ease-out forwards;
}

.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }
.item:nth-child(4) { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

Result: Items fade in one by one and stay visible

Success/error messages:
.message {
  opacity: 0;
  transform: translateX(100%);
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Message slides in and stays visible

Best practices:

1. Use forwards when element should keep final state:
   animation-fill-mode: forwards;

2. Use both when animation has delay:
   animation-fill-mode: both;

3. Use infinite for continuous animations:
   animation-iteration-count: infinite;

4. Specific count for repeated but finite animations:
   animation-iteration-count: 3;

5. Consider performance with infinite:
   Continuous animations consume resources

6. Test fill-mode with delays:
   Backwards and both only matter with delays

7. Use none (default) when element should reset:
   For temporary effects that should disappear

Common mistakes:

1. Forgetting forwards:
   Element snaps back to original state after animation

2. Using infinite with forwards:
   Forwards doesn't matter when looping infinitely

3. Not considering delay with backwards:
   Element may flash before animation starts

4. Overusing infinite loops:
   Too many can cause performance issues

JavaScript control:

element.style.animationIterationCount = 'infinite';
element.style.animationFillMode = 'forwards';

element.addEventListener('animationend', () => {
  // Animation completed all iterations
});

element.addEventListener('animationiteration', () => {
  // Animation completed one iteration
});
*/


/**
68. What is hardware acceleration in CSS animations?

Hardware acceleration is a technique where the browser offloads certain CSS animations 
to the GPU (Graphics Processing Unit) instead of the CPU, resulting in smoother, more 
performant animations.

Definition:
Hardware acceleration occurs when browsers use the GPU to handle graphics-intensive 
tasks like transforms and opacity changes, freeing up the CPU for other work.

How it works:

CPU (Central Processing Unit):
- Handles general computing tasks
- Layout calculations
- JavaScript execution
- Slower for graphics

GPU (Graphics Processing Unit):
- Specialized for graphics
- Parallel processing
- Faster for visual effects
- Hardware optimized for transforms and compositing

When browser detects certain CSS properties, it creates a separate compositing layer 
on the GPU, allowing animations to run smoothly without blocking the main thread.

Properties that trigger hardware acceleration:

GPU-accelerated (fast):
1. transform (all functions)
   - translate, translateX, translateY, translate3d
   - rotate, rotateX, rotateY, rotateZ, rotate3d
   - scale, scaleX, scaleY, scaleZ, scale3d
   - skew, skewX, skewY
   - matrix, matrix3d

2. opacity
   - Changes between 0 and 1

3. filter (most effects)
   - blur, brightness, contrast, grayscale, etc.

Non-accelerated (slow):
- width, height
- top, left, right, bottom
- margin, padding
- border
- background (non-transform)
- color
- font-size

Forcing hardware acceleration:

Use 3D transforms (even for 2D animations):

Method 1: translate3d
.element {
  transform: translate3d(0, 0, 0);  // Triggers GPU layer
}

Method 2: translateZ
.element {
  transform: translateZ(0);  // Minimal 3D transform
}

Method 3: will-change property (modern approach)
.element {
  will-change: transform;  // Hints browser to optimize
}

Why it works:
3D transforms always create a compositing layer on the GPU, even if the Z-axis is 0.

Examples of optimization:

Slow (CPU-bound):
.box {
  transition: left 0.3s;
}

.box:hover {
  left: 100px;  // Triggers layout recalculation, slow
}

Fast (GPU-accelerated):
.box {
  transition: transform 0.3s;
}

.box:hover {
  transform: translateX(100px);  // GPU-accelerated, fast
}

Result: Same visual effect, but GPU version is much smoother

Slide animation comparison:

Slow version:
@keyframes slideInSlow {
  from { left: -100%; }
  to { left: 0; }
}

.element {
  position: relative;
  animation: slideInSlow 0.5s;
}

Fast version (hardware accelerated):
@keyframes slideInFast {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.element {
  animation: slideInFast 0.5s;
}

Fade animation comparison:

Slow version:
.element {
  background: rgba(0, 0, 0, 0);
  transition: background 0.3s;
}

.element:hover {
  background: rgba(0, 0, 0, 0.5);
}

Fast version:
.element::before {
  content: '';
  position: absolute;
  inset: 0;
  background: black;
  opacity: 0;
  transition: opacity 0.3s;
}

.element:hover::before {
  opacity: 0.5;
}

will-change property:

Modern way to hint browser about upcoming animations.

Syntax:
.element {
  will-change: property-name;
}

Values:
- auto (default) - No hint
- property-name - Specific property (transform, opacity, etc.)
- Multiple: will-change: transform, opacity;

Examples:

Optimize transform:
.box {
  will-change: transform;
  transition: transform 0.3s;
}

.box:hover {
  transform: scale(1.2);
}

Optimize opacity:
.fade-element {
  will-change: opacity;
  transition: opacity 0.5s;
}

Multiple properties:
.complex {
  will-change: transform, opacity;
}

When to use will-change:

Good:
.slider-item {
  will-change: transform;  // About to be animated
}

.slider-item.animating {
  transform: translateX(100px);
}

When done:
element.style.willChange = 'auto';  // Clear after animation

Bad (overuse):
* {
  will-change: transform;  // Don't do this! Memory intensive
}

Best practices for will-change:

1. Use sparingly:
   Only for elements that will definitely animate

2. Add before animation:
   .element:hover {
     will-change: transform;
   }

3. Remove after animation:
   element.addEventListener('animationend', () => {
     element.style.willChange = 'auto';
   });

4. Don't use on too many elements:
   Creates memory overhead

5. Don't use globally:
   * { will-change: transform; } is bad

Rendering pipeline:

Three stages of rendering:

1. Layout (reflow):
   Calculate element positions and sizes
   Triggered by: width, height, margin, padding, top, left, etc.
   Slowest

2. Paint:
   Fill in pixels (colors, borders, shadows)
   Triggered by: color, background, border-color, etc.
   Moderate speed

3. Composite:
   Combine layers
   Triggered by: transform, opacity
   Fastest (GPU accelerated)

Goal: Trigger only composite (transform, opacity) for animations

Visual comparison:

Animating left (Layout → Paint → Composite):
.slow {
  transition: left 0.3s;  // All 3 stages
}

Animating transform (Composite only):
.fast {
  transition: transform 0.3s;  // Only composite
}

Result: transform is 10-100x faster

Real-world optimization examples:

Sidebar slide (optimized):
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.sidebar.open {
  transform: translateX(0);
}

Modal fade (optimized):
.modal {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  will-change: opacity;
}

.modal.visible {
  opacity: 1;
  pointer-events: auto;
}

Dropdown menu (optimized):
.dropdown {
  transform: translateY(-10px);
  opacity: 0;
  transition: transform 0.2s, opacity 0.2s;
  will-change: transform, opacity;
}

.dropdown.open {
  transform: translateY(0);
  opacity: 1;
}

Card hover (optimized):
.card {
  transition: transform 0.3s, box-shadow 0.3s;
  will-change: transform;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

Detecting GPU acceleration:

Browser DevTools:
1. Chrome: Rendering → Layer borders (shows composited layers)
2. Firefox: Developer Tools → Performance → Enable paint flashing
3. Safari: Develop → Show Compositing Borders

Composited layers appear with colored borders

Performance tips:

1. Use transform instead of position:
   transform: translateX(100px); Not: left: 100px;

2. Use opacity for fade effects:
   opacity: 0; Not: background: transparent;

3. Use scale for size changes:
   transform: scale(1.2); Not: width: 120%;

4. Add will-change before complex animations:
   But remove after!

5. Limit number of animated elements:
   Too many GPU layers consume memory

6. Profile animations:
   Use browser DevTools to identify bottlenecks

7. Test on mobile devices:
   GPU capabilities vary significantly

8. Avoid animating shadows directly:
   Use opacity on pseudo-element with shadow instead

Common pitfalls:

1. Overusing will-change:
   Memory overhead, slower performance

2. Animating layout properties:
   width, height, margin, padding are slow

3. Too many simultaneous animations:
   Overwhelms GPU

4. Forgetting to remove will-change:
   Wastes memory

5. Animating on low-end devices:
   Test on actual target devices

Accessibility:

Respect user preferences:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

Browser support:
Hardware acceleration is supported in all modern browsers with varying capabilities.
Mobile GPUs are generally less powerful than desktop GPUs.

Summary:
Hardware acceleration makes animations smoother by using the GPU instead of CPU. Use 
transform and opacity for best performance, avoid animating layout properties, and use 
will-change sparingly for complex animations.
*/


/**
69. What is the difference between opacity and visibility?

opacity and visibility both hide elements, but they work differently and have distinct 
use cases and behaviors.

opacity:

Controls transparency of an element and all its descendants.

Syntax:
.element {
  opacity: value;  // 0 to 1
}

Values:
- 0 = Fully transparent (invisible)
- 0.5 = 50% transparent (semi-transparent)
- 1 = Fully opaque (default, fully visible)

How it works:
Changes transparency level while keeping element in normal flow. Element still occupies 
space and can still be interacted with even when opacity: 0.

Examples:
.invisible {
  opacity: 0;  // Invisible but still there
}

.semi-transparent {
  opacity: 0.5;  // Half transparent
}

.visible {
  opacity: 1;  // Fully visible
}

Transition with opacity:
.fade {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade.visible {
  opacity: 1;
}


visibility:

Controls whether element is visible or hidden.

Syntax:
.element {
  visibility: value;
}

Values:
- visible (default) = Element is visible
- hidden = Element is hidden but occupies space
- collapse = For table rows/columns, removes them from layout

How it works:
Hides element but maintains its space in the layout. Element cannot be interacted with 
when hidden.

Examples:
.hidden {
  visibility: hidden;  // Hidden but space preserved
}

.visible {
  visibility: visible;  // Visible (default)
}

Table-specific:
tr {
  visibility: collapse;  // Removes row from table layout
}

Key differences:

Feature                | opacity: 0              | visibility: hidden
-----------------------|-------------------------|-------------------------
Visibility             | Invisible               | Hidden
Space occupied         | Yes                     | Yes
Clickable/interactive  | Yes (still receives events) | No (no events)
Affects children       | Yes (all transparent)   | Yes (all hidden)
Child override         | No                      | Yes (can show children)
Transitions            | Smooth (animatable)     | Discrete (instant)
Screen readers         | Reads content           | Ignores content
Performance            | GPU accelerated         | Standard
Values                 | 0 to 1 (gradual)        | visible/hidden (binary)
Inheritance            | Opacity value           | Can be overridden

Detailed comparisons:

1. Interactivity:

opacity: 0 (still interactive):
.button {
  opacity: 0;  // Invisible but still clickable!
}

<button class="button">Click me</button>
// Button can still be clicked even though invisible

visibility: hidden (not interactive):
.button {
  visibility: hidden;  // Hidden and NOT clickable
}

// Button cannot be clicked


2. Child elements:

opacity (affects all children):
.parent {
  opacity: 0.5;  // All children also 50% transparent
}

.child {
  opacity: 1;  // Cannot override, still 50% transparent relative to background
}

visibility (children can override):
.parent {
  visibility: hidden;  // Parent hidden
}

.child {
  visibility: visible;  // Child can be visible while parent is hidden!
}

<div class="parent">
  Hidden parent
  <div class="child">Visible child!</div>
</div>


3. Transitions:

opacity (smooth transitions):
.fade {
  opacity: 1;
  transition: opacity 0.3s;
}

.fade.hidden {
  opacity: 0;  // Smoothly fades out
}

visibility (instant, but can use with transition delay):
.element {
  visibility: visible;
  transition: visibility 0s 0.3s;  // Delay before hiding
}

.element.hidden {
  visibility: hidden;
  transition: visibility 0s;  // Hide immediately
}


4. Performance:

opacity:
- GPU accelerated
- Triggers composite layer
- Very fast

visibility:
- Standard rendering
- Triggers repaint only
- Fast, but not GPU accelerated


Real-world use cases:

Use opacity:

1. Fade animations:
.modal {
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;  // Prevent interaction when invisible
}

.modal.active {
  opacity: 1;
  pointer-events: auto;
}

2. Image hover effects:
.image-overlay {
  opacity: 0;
  transition: opacity 0.3s;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

3. Loading states:
.content {
  opacity: 0.5;  // Dimmed during loading
  pointer-events: none;
}

.content.loaded {
  opacity: 1;
  pointer-events: auto;
}

4. Disabled states:
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}


Use visibility:

1. Tooltip show/hide (instant):
.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0s 0.2s;
}

.tooltip.show {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s, visibility 0s;
}

2. Accessible hidden content:
.sr-only {
  visibility: hidden;  // Hidden from view
}

.sr-only:focus {
  visibility: visible;  // Shows on focus
}

3. Print styles:
@media print {
  .no-print {
    visibility: hidden;  // Hide from print
  }
}

4. Complex show/hide with child control:
.dropdown {
  visibility: hidden;
}

.dropdown.open {
  visibility: visible;
}

.dropdown-item {
  visibility: visible;  // Individual control
}


Combining both:

Common pattern - smooth fade with visibility:
.modal {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s, visibility 0s 0.3s;
}

.modal.show {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0s;
}

How it works:
- Showing: visibility becomes visible immediately, opacity fades in over 0.3s
- Hiding: opacity fades out over 0.3s, then visibility becomes hidden after 0.3s delay

This prevents invisible elements from blocking interactions


Comparison with display: none:

Feature          | opacity: 0    | visibility: hidden | display: none
-----------------|---------------|-------------------|------------------
Space occupied   | Yes           | Yes               | No
Interactive      | Yes           | No                | No
Transitions      | Smooth        | Instant           | Cannot transition
DOM present      | Yes           | Yes               | Yes
Rendering        | Rendered      | Not rendered      | Not rendered
Screen readers   | Reads         | Ignores           | Ignores
Child override   | No            | Yes               | No
Layout impact    | None          | None              | Reflows layout

Best practices:

1. Use opacity for fade effects:
   Smooth transitions, GPU accelerated

2. Use visibility to prevent interaction:
   When element should not receive clicks/events

3. Combine for best results:
   visibility + opacity for smooth fades without interaction issues

4. Add pointer-events: none with opacity: 0:
   Prevents invisible elements from blocking clicks

5. Consider accessibility:
   Screen readers treat them differently

6. Use visibility for print styles:
   Better than display for hiding print elements

7. Use visibility for child overrides:
   Show specific children of hidden parent

8. Performance matters:
   opacity is GPU accelerated, prefer for animations

Common patterns:

Fade in/out with no interaction when hidden:
.element {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s 0.3s;
  pointer-events: none;
}

.element.active {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s, visibility 0s;
  pointer-events: auto;
}

Accessibility - hide visually but keep for screen readers:
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

Don't use opacity: 0 or visibility: hidden for this purpose

Loading overlay:
.loading-overlay {
  opacity: 0;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s, visibility 0s 0.3s;
}

.loading-overlay.active {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s;
}

JavaScript control:

element.style.opacity = '0';
element.style.visibility = 'hidden';

// Better: toggle class
element.classList.toggle('hidden');

Accessibility considerations:

Screen readers:
- opacity: 0 → Content still read by screen readers
- visibility: hidden → Content ignored by screen readers
- display: none → Content ignored by screen readers

Choose based on whether content should be accessible to screen readers when hidden.
*/


/**
70. What are box-shadow and text-shadow?

box-shadow and text-shadow add shadow effects to elements and text, creating depth and 
visual interest.

box-shadow:

Adds shadow effects around an element's box.

Syntax:
.element {
  box-shadow: offset-x offset-y blur-radius spread-radius color inset;
}

Parameters:
1. offset-x: Horizontal offset (positive = right, negative = left)
2. offset-y: Vertical offset (positive = down, negative = up)
3. blur-radius: Blur amount (optional, default 0)
4. spread-radius: Shadow size (optional, default 0)
5. color: Shadow color (optional, default currentColor)
6. inset: Inner shadow (optional)

Basic examples:

Simple shadow:
.box {
  box-shadow: 10px 10px;
  // 10px right, 10px down, no blur, black shadow
}

With blur:
.box {
  box-shadow: 10px 10px 5px;
  // 10px right, 10px down, 5px blur
}

With blur and spread:
.box {
  box-shadow: 10px 10px 5px 2px;
  // Spread adds 2px to shadow size
}

With color:
.box {
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
  // Semi-transparent black shadow
}

Complete syntax:
.box {
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.5);
}

Directional shadows:

Right and down (default):
.shadow-bottom-right {
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
}

Left and down:
.shadow-bottom-left {
  box-shadow: -10px 10px 5px rgba(0, 0, 0, 0.3);
}

Right and up:
.shadow-top-right {
  box-shadow: 10px -10px 5px rgba(0, 0, 0, 0.3);
}

Left and up:
.shadow-top-left {
  box-shadow: -10px -10px 5px rgba(0, 0, 0, 0.3);
}

Centered (no offset):
.shadow-centered {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

Special shadow types:

Inset shadow (inner shadow):
.inset-shadow {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  // Shadow inside the box
}

No shadow (remove):
.no-shadow {
  box-shadow: none;
}

Multiple shadows:
.multiple-shadows {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
}

Layered effect:
.layered {
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07);
}

Real-world box-shadow examples:

Material Design elevation:
.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.card-2 {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.card-3 {
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

Button hover effect:
.button {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s;
}

.button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.button:active {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

Floating card:
.floating-card {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

Glowing effect:
.glow {
  box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
}

Neumorphism (soft shadows):
.neumorphic {
  background: #e0e0e0;
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}

Inset input field:
.input-inset {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}


text-shadow:

Adds shadow effects to text characters.

Syntax:
.element {
  text-shadow: offset-x offset-y blur-radius color;
}

Parameters:
1. offset-x: Horizontal offset
2. offset-y: Vertical offset
3. blur-radius: Blur amount (optional)
4. color: Shadow color (optional)

Note: text-shadow does NOT have spread-radius or inset

Basic examples:

Simple text shadow:
.text {
  text-shadow: 2px 2px;
  // 2px right, 2px down, no blur
}

With blur:
.text {
  text-shadow: 2px 2px 4px;
}

With color:
.text {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

Multiple text shadows:
.text {
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.5),
    -2px -2px 4px rgba(255, 255, 255, 0.5);
}

Real-world text-shadow examples:

Subtle depth:
h1 {
  color: #333;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

3D text effect:
.text-3d {
  color: #fff;
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #c9c9c9,
    3px 3px 0 #bbb,
    4px 4px 0 #b9b9b9,
    5px 5px 0 #aaa,
    6px 6px 5px rgba(0, 0, 0, 0.5);
}

Glowing text:
.glow-text {
  color: #fff;
  text-shadow: 
    0 0 10px #fff,
    0 0 20px #fff,
    0 0 30px #00f,
    0 0 40px #00f;
}

Embossed text:
.embossed {
  color: #333;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.8);
}

Engraved text:
.engraved {
  color: #666;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
}

Outline text:
.outline {
  color: white;
  text-shadow: 
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;
}

Long shadow (trendy effect):
.long-shadow {
  text-shadow: 
    1px 1px 0 #ccc,
    2px 2px 0 #ccc,
    3px 3px 0 #ccc,
    4px 4px 0 #ccc,
    5px 5px 0 #ccc;
}

Neon sign effect:
.neon {
  color: #fff;
  text-shadow: 
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #0fa,
    0 0 82px #0fa,
    0 0 92px #0fa,
    0 0 102px #0fa,
    0 0 151px #0fa;
}

Differences between box-shadow and text-shadow:

Feature         | box-shadow              | text-shadow
----------------|-------------------------|-------------------------
Applies to      | Element box             | Text characters only
spread-radius   | Yes                     | No
inset           | Yes                     | No
Transitions     | Yes                     | Yes
Multiple        | Yes                     | Yes
Performance     | Standard                | Standard

Performance considerations:

1. Blur is expensive:
   Large blur values slow rendering
   box-shadow: 0 0 100px; // Slow

2. Multiple shadows:
   Each shadow adds rendering cost
   Limit to 3-5 for performance

3. Animated shadows:
   Can cause performance issues
   Use transform/opacity instead when possible

4. Fixed shadows are fast:
   box-shadow: 10px 10px 0 black; // No blur, fast

Best practices:

1. Use subtle shadows for depth:
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

2. Avoid pure black:
   Use rgba(0, 0, 0, 0.3) instead of #000

3. Match shadow to light source:
   Consistent direction throughout UI

4. Increase shadow on interaction:
   .card:hover { box-shadow: 0 8px 16px rgba(0,0,0,0.2); }

5. Layer shadows for realism:
   Multiple shadows with different blur/opacity

6. Use spread sparingly:
   Usually 0 or very small values look best

7. Don't overdo it:
   Too many shadows look cluttered

8. Consider performance:
   Limit blur size and shadow count

9. Test accessibility:
   Ensure text remains readable with shadows

10. Use CSS variables:
    --shadow: 0 2px 4px rgba(0,0,0,0.1);
    box-shadow: var(--shadow);

Accessibility:

1. Ensure contrast:
   Text shadows should not reduce readability

2. Don't rely on shadows alone:
   Use color, borders, spacing for differentiation

3. Test with high contrast mode:
   Shadows may be removed in accessibility modes

Common patterns:

Card elevation system:
:root {
  --shadow-1: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-2: 0 3px 6px rgba(0,0,0,0.16);
  --shadow-3: 0 10px 20px rgba(0,0,0,0.19);
  --shadow-4: 0 14px 28px rgba(0,0,0,0.25);
  --shadow-5: 0 19px 38px rgba(0,0,0,0.30);
}

.card {
  box-shadow: var(--shadow-2);
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: var(--shadow-3);
}

Interactive button:
.button {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
*/


/**
71. What are gradients (linear, radial, conic) in CSS?

CSS gradients create smooth color transitions between two or more colors, used as 
background images.

Types of gradients:
1. Linear gradient - Colors along a straight line
2. Radial gradient - Colors radiating from a center point
3. Conic gradient - Colors rotating around a center point

Linear Gradient:

Creates color transition along a straight line.

Basic syntax:
background: linear-gradient(direction, color1, color2, ...);

Simple examples:

Top to bottom (default):
.gradient {
  background: linear-gradient(red, blue);
  // Red at top, blue at bottom
}

Left to right:
.gradient {
  background: linear-gradient(to right, red, blue);
}

Diagonal:
.gradient {
  background: linear-gradient(to bottom right, red, blue);
}

With angle:
.gradient {
  background: linear-gradient(45deg, red, blue);
}

Angle values:
- 0deg = to top
- 90deg = to right
- 180deg = to bottom
- 270deg = to left
- 45deg = diagonal

Multiple colors:
.gradient {
  background: linear-gradient(red, yellow, green, blue);
}

Color stops (specific positions):
.gradient {
  background: linear-gradient(
    red 0%,
    yellow 25%,
    green 75%,
    blue 100%
  );
}

Sharp transitions (no stop gap):
.stripes {
  background: linear-gradient(
    90deg,
    red 0%, red 33%,
    white 33%, white 66%,
    blue 66%, blue 100%
  );
}

Real-world linear gradient examples:

Subtle background:
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

Button gradient:
.button {
  background: linear-gradient(to right, #f093fb 0%, #f5576c 100%);
}

Hero section:
.hero {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
}

Overlay effect:
.overlay {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

Animated gradient:
.animated-bg {
  background: linear-gradient(270deg, #ff6ec4, #7873f5, #4facfe);
  background-size: 600% 600%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

Striped pattern:
.stripes {
  background: linear-gradient(
    45deg,
    #606c88 25%,
    transparent 25%,
    transparent 75%,
    #606c88 75%,
    #606c88
  );
  background-size: 40px 40px;
}


Radial Gradient:

Creates color transition radiating from a center point.

Basic syntax:
background: radial-gradient(shape size at position, color1, color2, ...);

Simple examples:

Center outward (default):
.gradient {
  background: radial-gradient(red, blue);
  // Red at center, blue at edges
}

Ellipse shape (default):
.gradient {
  background: radial-gradient(ellipse, red, blue);
}

Circle shape:
.gradient {
  background: radial-gradient(circle, red, blue);
}

Positioned:
.gradient {
  background: radial-gradient(circle at top left, red, blue);
}

Sized:
.gradient {
  background: radial-gradient(circle 200px, red, blue);
  // 200px radius circle
}

Size keywords:
- closest-side
- closest-corner
- farthest-side
- farthest-corner (default)

.gradient {
  background: radial-gradient(circle closest-side, red, blue);
}

With color stops:
.gradient {
  background: radial-gradient(
    circle at center,
    red 0%,
    yellow 50%,
    blue 100%
  );
}

Real-world radial gradient examples:

Spotlight effect:
.spotlight {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 70%
  );
}

Vignette effect:
.vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

Button glow:
.button {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

Circular avatar border:
.avatar {
  background: radial-gradient(circle, transparent 60%, #3498db 60%);
}

Radial burst:
.burst {
  background: radial-gradient(
    circle at center,
    #fff 0%,
    #fff 10%,
    transparent 10%,
    transparent 20%,
    #fff 20%,
    #fff 30%,
    transparent 30%
  );
}


Conic Gradient:

Creates color transition rotating around a center point (like a pie chart).

Basic syntax:
background: conic-gradient(from angle at position, color1, color2, ...);

Simple examples:

Default (starts at top):
.gradient {
  background: conic-gradient(red, yellow, green, blue, red);
}

Starting angle:
.gradient {
  background: conic-gradient(from 45deg, red, blue);
}

Positioned:
.gradient {
  background: conic-gradient(at 25% 25%, red, blue);
}

With color stops:
.gradient {
  background: conic-gradient(
    red 0deg,
    yellow 90deg,
    green 180deg,
    blue 270deg,
    red 360deg
  );
}

Sharp transitions:
.pie {
  background: conic-gradient(
    red 0deg 120deg,
    yellow 120deg 240deg,
    blue 240deg 360deg
  );
}

Real-world conic gradient examples:

Pie chart:
.pie-chart {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    #3498db 0deg 120deg,
    #e74c3c 120deg 240deg,
    #f39c12 240deg 360deg
  );
}

Loading spinner:
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: conic-gradient(
    transparent 0deg 270deg,
    #3498db 270deg 360deg
  );
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

Checkerboard pattern:
.checkerboard {
  background: conic-gradient(
    from 45deg,
    black 0deg 90deg,
    white 90deg 180deg,
    black 180deg 270deg,
    white 270deg 360deg
  );
  background-size: 40px 40px;
}

Color wheel:
.color-wheel {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: conic-gradient(
    red,
    yellow,
    lime,
    cyan,
    blue,
    magenta,
    red
  );
}

Progress circle:
.progress {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: conic-gradient(
    #3498db 0deg 216deg,  / * 60% = 216deg * /
    #ecf0f1 216deg 360deg
  );
}


Repeating Gradients:

Automatically repeats gradient pattern.

Repeating linear:
.stripes {
  background: repeating-linear-gradient(
    45deg,
    #606c88,
    #606c88 10px,
    #3f4c6b 10px,
    #3f4c6b 20px
  );
}

Repeating radial:
.rings {
  background: repeating-radial-gradient(
    circle,
    #3498db,
    #3498db 20px,
    #2980b9 20px,
    #2980b9 40px
  );
}

Repeating conic:
.sunburst {
  background: repeating-conic-gradient(
    from 0deg,
    #3498db 0deg 10deg,
    #2980b9 10deg 20deg
  );
}

Practical patterns:

Striped progress bar:
.progress-bar {
  background: repeating-linear-gradient(
    45deg,
    #3498db,
    #3498db 10px,
    #2980b9 10px,
    #2980b9 20px
  );
}

Diagonal lines:
.diagonal {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255,255,255,.1) 10px,
    rgba(255,255,255,.1) 20px
  );
}

Combining multiple gradients:

Layered gradients:
.complex {
  background: 
    linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
}

Gradient with image:
.hero {
  background: 
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('background.jpg');
  background-size: cover;
}

Best practices:

1. Use for backgrounds, not borders:
   Gradients work best as backgrounds

2. Subtle is better:
   Avoid harsh color combinations

3. Consider performance:
   Complex gradients can impact rendering

4. Use color stops for control:
   Precise positioning of colors

5. Test accessibility:
   Ensure text remains readable on gradients

6. Use CSS variables:
   --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
   background: var(--gradient);

7. Fallback colors:
   background: #667eea;  / * Fallback * /
   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

8. Don't overuse:
   Too many gradients can look dated

Tools for creating gradients:

- CSS Gradient Generator (cssgradient.io)
- UI Gradients (uigradients.com)
- Gradient Hunt (gradienthunt.com)
- Coolors gradient maker

Browser support:
Excellent support in all modern browsers. Conic gradients are newest but widely supported.
*/


/**
72. What is filter: blur, brightness, contrast, grayscale, etc.?

The CSS filter property applies visual effects (like blur, brightness, contrast) to 
elements, similar to photo editing software filters.

Syntax:
.element {
  filter: function(value);
}

Can combine multiple filters:
.element {
  filter: blur(5px) brightness(1.2) contrast(1.5);
}

Filter functions:

1. blur():

Applies Gaussian blur effect.

Syntax:
filter: blur(radius);

Values:
- 0 = No blur (default)
- Length units (px, rem, em)

Examples:
.blur-slight {
  filter: blur(2px);  // Slight blur
}

.blur-medium {
  filter: blur(5px);  // Medium blur
}

.blur-heavy {
  filter: blur(10px);  // Heavy blur
}

Use cases:
- Loading states
- Background images
- Focus effects
- Privacy overlays


2. brightness():

Adjusts brightness/lightness.

Syntax:
filter: brightness(amount);

Values:
- 0 = Completely black
- 1 = Original (default)
- >1 = Brighter

Examples:
.dark {
  filter: brightness(0.5);  // 50% darker
}

.normal {
  filter: brightness(1);  // Normal
}

.bright {
  filter: brightness(1.5);  // 50% brighter
}

.very-bright {
  filter: brightness(2);  // 200% brightness
}

Use cases:
- Hover effects
- Dimming backgrounds
- Image adjustments
- Light/dark mode


3. contrast():

Adjusts contrast.

Syntax:
filter: contrast(amount);

Values:
- 0 = Gray (no contrast)
- 1 = Original (default)
- >1 = More contrast

Examples:
.low-contrast {
  filter: contrast(0.5);  // 50% contrast
}

.normal {
  filter: contrast(1);  // Normal
}

.high-contrast {
  filter: contrast(1.5);  // 150% contrast
}

.extreme {
  filter: contrast(2);  // 200% contrast
}

Use cases:
- Emphasizing images
- Accessibility adjustments
- Photo effects
- Brand styling


4. grayscale():

Converts to grayscale (black and white).

Syntax:
filter: grayscale(amount);

Values:
- 0 = Full color (default)
- 1 (or 100%) = Completely grayscale

Examples:
.color {
  filter: grayscale(0);  // Full color
}

.partial-gray {
  filter: grayscale(0.5);  // 50% grayscale
}

.full-gray {
  filter: grayscale(1);  // Completely grayscale
}

// Can use percentage
.gray {
  filter: grayscale(100%);
}

Use cases:
- Hover effects (color on hover)
- Disabled states
- Black and white photos
- Memorial/tribute pages


5. sepia():

Applies warm, brown tone (vintage photo effect).

Syntax:
filter: sepia(amount);

Values:
- 0 = No sepia (default)
- 1 (or 100%) = Full sepia

Examples:
.no-sepia {
  filter: sepia(0);
}

.vintage {
  filter: sepia(0.8);  // 80% sepia
}

.full-sepia {
  filter: sepia(1);
}

Use cases:
- Vintage aesthetics
- Old photo effects
- Warm color schemes


6. saturate():

Adjusts color saturation.

Syntax:
filter: saturate(amount);

Values:
- 0 = Completely desaturated (grayscale)
- 1 = Original (default)
- >1 = More saturated

Examples:
.desaturated {
  filter: saturate(0);  // Grayscale
}

.normal {
  filter: saturate(1);  // Normal
}

.vibrant {
  filter: saturate(2);  // 200% saturation
}

.extreme {
  filter: saturate(5);  // Very vibrant
}

Use cases:
- Vibrant images
- Muted backgrounds
- Color adjustments
- Brand consistency


7. hue-rotate():

Rotates colors around the color wheel.

Syntax:
filter: hue-rotate(angle);

Values:
- 0deg = Original (default)
- 360deg = Full rotation (back to original)

Examples:
.no-rotation {
  filter: hue-rotate(0deg);
}

.slight-shift {
  filter: hue-rotate(90deg);  // Quarter rotation
}

.opposite-colors {
  filter: hue-rotate(180deg);  // Opposite colors
}

.full-rotation {
  filter: hue-rotate(360deg);  // Back to start
}

Use cases:
- Color variations
- Theme switching
- Creative effects
- Animations


8. invert():

Inverts colors (negative effect).

Syntax:
filter: invert(amount);

Values:
- 0 = Original (default)
- 1 (or 100%) = Completely inverted

Examples:
.normal {
  filter: invert(0);
}

.partial {
  filter: invert(0.5);  // 50% inverted
}

.negative {
  filter: invert(1);  // Full inversion
}

// Dark mode hack
.dark-mode img {
  filter: invert(1);
}

Use cases:
- Dark mode adjustments
- Negative photo effects
- Accessibility
- Creative designs


9. opacity():

Similar to opacity property but as a filter.

Syntax:
filter: opacity(amount);

Values:
- 0 = Fully transparent
- 1 (or 100%) = Fully opaque (default)

Examples:
.transparent {
  filter: opacity(0);
}

.semi-transparent {
  filter: opacity(0.5);  // 50% opacity
}

.opaque {
  filter: opacity(1);
}

Note: Prefer opacity property over filter: opacity() for performance


10. drop-shadow():

Adds shadow (similar to box-shadow but follows element's shape).

Syntax:
filter: drop-shadow(offset-x offset-y blur-radius color);

Examples:
.shadow {
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5));
}

.text-shadow-effect {
  filter: drop-shadow(2px 2px 4px black);
}

Difference from box-shadow:
- box-shadow: Shadow around box
- drop-shadow: Shadow follows transparent areas

Example with PNG:
.png-image {
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  // Shadow follows PNG's shape, not box
}

Combining multiple filters:

Multiple filters in order:
.photo {
  filter: brightness(1.1) contrast(1.2) saturate(1.3);
}

Creative combination:
.vintage-photo {
  filter: 
    sepia(0.8) 
    contrast(1.2) 
    brightness(0.9)
    saturate(0.7);
}

Dark mode effect:
.dark-image {
  filter: 
    invert(1) 
    hue-rotate(180deg) 
    brightness(0.9)
    contrast(0.9);
}

Real-world examples:

Image hover effect:
.image {
  filter: grayscale(1);
  transition: filter 0.3s;
}

.image:hover {
  filter: grayscale(0);
}

Loading state:
.loading {
  filter: blur(5px) brightness(0.8);
}

Disabled button:
.button:disabled {
  filter: grayscale(1) opacity(0.5);
}

Focus effect:
.card {
  filter: blur(0);
  transition: filter 0.3s;
}

.card:not(:hover) {
  filter: blur(2px) brightness(0.8);
}

Instagram-style filters:

Clarendon:
.clarendon {
  filter: contrast(1.2) saturate(1.35);
}

Gingham:
.gingham {
  filter: brightness(1.05) hue-rotate(-10deg);
}

Moon:
.moon {
  filter: grayscale(1) contrast(1.1) brightness(1.1);
}

Lark:
.lark {
  filter: contrast(0.9) saturate(1.1);
}

Reyes:
.reyes {
  filter: sepia(0.22) brightness(1.1) contrast(0.85) saturate(0.75);
}

Animated filters:

Pulse glow:
@keyframes glow {
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.5));
  }
  50% {
    filter: brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,1));
  }
}

.glowing {
  animation: glow 2s infinite;
}

Color shift:
@keyframes colorShift {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

.rainbow {
  animation: colorShift 10s linear infinite;
}

Performance considerations:

1. Blur is expensive:
   Large blur values slow rendering

2. Combine filters:
   filter: blur(5px) brightness(1.2);
   Faster than separate elements

3. Use will-change:
   .element {
     will-change: filter;
   }

4. Avoid animating filters on many elements:
   Can cause performance issues

5. Test on mobile:
   Filters more expensive on mobile devices

Browser support:
Excellent support in all modern browsers. Some filters (like backdrop-filter) have 
limited support.

Accessibility:

1. Don't remove all color:
   Maintain sufficient contrast

2. Provide alternatives:
   Users may disable filters

3. Test with high contrast mode:
   Filters may be ignored

4. Consider motion sensitivity:
   Animated filters can trigger motion sickness

Best practices:

1. Use for enhancement, not critical functionality
2. Combine filters for creative effects
3. Animate filters smoothly with transitions
4. Test performance on target devices
5. Provide fallbacks for unsupported browsers
6. Use CSS variables for consistency
7. Consider accessibility impacts
8. Don't overuse - can look gimmicky

CSS variables pattern:
:root {
  --filter-hover: brightness(1.1) contrast(1.1);
  --filter-disabled: grayscale(1) opacity(0.5);
}

.image:hover {
  filter: var(--filter-hover);
}

.button:disabled {
  filter: var(--filter-disabled);
}
*/


/**
73. What is backdrop-filter and when is it used?

backdrop-filter applies filter effects (blur, brightness, etc.) to the area BEHIND an 
element, creating frosted glass or blurred background effects.

Definition:
backdrop-filter affects the backdrop (background) of an element, not the element itself. 
It's commonly used for translucent overlays, modals, and modern UI effects.

Syntax:
.element {
  backdrop-filter: function(value);
}

Key difference from filter:
- filter: Affects the element and its content
- backdrop-filter: Affects only what's behind the element

Backdrop filter functions:

Uses same functions as filter:
- blur()
- brightness()
- contrast()
- grayscale()
- sepia()
- saturate()
- hue-rotate()
- invert()
- opacity()
- drop-shadow()

Most common: blur()

Basic blur example:

.glass-effect {
  background: rgba(255, 255, 255, 0.1);  // Semi-transparent background
  backdrop-filter: blur(10px);           // Blur what's behind
}

Result: Frosted glass effect

Complete example:

.modal {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

Common use cases:

1. Frosted glass effect (most popular):

.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

2. Navigation bar with blur:

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

3. Modal overlay:

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
}

.modal-content {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
}

4. Card with glass effect:

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) brightness(1.2);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

5. Search bar overlay:

.search-overlay {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: 20px;
  border-radius: 8px;
}

6. macOS/iOS style blur:

.apple-blur {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

Combining multiple backdrop filters:

.complex-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: 
    blur(10px)
    brightness(1.2)
    saturate(150%)
    contrast(1.1);
}

Dark theme variant:

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px) brightness(0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

Real-world examples:

Windows 11 style acrylic:
.acrylic {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(30px) saturate(125%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

Notification toast:
.toast {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

Sidebar menu:
.sidebar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

Image overlay text:
.image-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: white;
  padding: 20px;
}

Credit card design:
.credit-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

Performance considerations:

1. Expensive operation:
   backdrop-filter is computationally intensive

2. Limit blur radius:
   blur(10px) is reasonable, blur(100px) is slow

3. Avoid on many elements:
   Use sparingly, only where needed

4. Mobile performance:
   Can be significantly slower on mobile devices

5. Fixed/absolute positioning works best:
   Backdrop needs something behind it to blur

6. Use will-change sparingly:
   .glass {
     will-change: backdrop-filter;
   }

Browser support:

Good modern browser support:
- Chrome/Edge: ✓ (since 2019)
- Safari: ✓ (with -webkit- prefix)
- Firefox: ✓ (since 2021)

Fallback required:
.glass {
  background: rgba(255, 255, 255, 0.9);  / * Fallback * /
  backdrop-filter: blur(10px);
  
  / * Webkit prefix for Safari * /
  -webkit-backdrop-filter: blur(10px);
}

Feature detection:
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .glass {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) and not (-webkit-backdrop-filter: blur(10px)) {
  .glass {
    background: rgba(255, 255, 255, 0.9);  / * Opaque fallback * /
  }
}

Best practices:

1. Always provide fallback:
   Solid or semi-transparent background

2. Use with semi-transparent backgrounds:
   Backdrop-filter needs something behind it

3. Combine with borders:
   Enhances glass effect

4. Add box-shadow:
   Creates depth and separation

5. Use fixed/absolute positioning:
   Works best with positioned elements

6. Test on target devices:
   Performance varies significantly

7. Don't overuse:
   Can slow down page significantly

8. Consider alternatives:
   Sometimes solid colors perform better

Common mistakes:

1. Forgetting semi-transparent background:
   backdrop-filter: blur(10px);  / * No effect without transparent bg * /

2. Using on too many elements:
   Performance degradation

3. Not providing fallback:
   Unsupported browsers show nothing

4. Too large blur radius:
   blur(100px) is very slow

5. Expecting it to work on inline elements:
   Needs block-level or positioned elements

Complete pattern example:

.glass-component {
  / * Fallback for unsupported browsers * /
  background: rgba(255, 255, 255, 0.9);
  
  / * Modern glass effect * /
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  
  / * Enhancement * /
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

Accessibility:

1. Ensure text remains readable:
   Blurred backgrounds can reduce contrast

2. Test with screen readers:
   Should not affect functionality

3. Provide high contrast alternative:
   For users who prefer/need high contrast

4. Don't rely solely on blur:
   Use color, borders for differentiation

When to use backdrop-filter:

Good use cases:
- Navigation bars
- Modals and overlays
- Cards over images
- Modern UI elements
- Tooltips and popovers
- Notification toasts

Avoid for:
- Entire page backgrounds
- Large sections
- Low-end devices
- Critical UI elements (fallback needed)
- When solid backgrounds work fine

Alternative approaches:

If backdrop-filter not supported or too slow:
1. Use opaque backgrounds
2. Use images with pre-applied blur
3. Use SVG filters
4. Use canvas for custom effects
*/


/**
74. What is object-fit and object-position?

object-fit and object-position control how replaced elements (images, videos) are sized 
and positioned within their container.

object-fit:

Defines how content should be resized to fit its container.

Syntax:
img {
  object-fit: value;
}

Works on:
- <img>
- <video>
- <iframe>
- Other replaced elements

Values:

1. fill (default):
   Stretches content to fill container, may distort

img {
  width: 300px;
  height: 200px;
  object-fit: fill;  // Image stretched to 300x200, may distort
}

2. contain:
   Scales content to fit inside container while maintaining aspect ratio
   May leave empty space

img {
  width: 300px;
  height: 200px;
  object-fit: contain;  // Image fits inside, no cropping, may have letterboxing
}

3. cover:
   Scales content to fill container while maintaining aspect ratio
   May crop content

img {
  width: 300px;
  height: 200px;
  object-fit: cover;  // Image fills container, may crop sides
}

4. none:
   Content keeps original size, may overflow or leave space

img {
  width: 300px;
  height: 200px;
  object-fit: none;  // Image at original size, cropped if larger
}

5. scale-down:
   Uses none or contain, whichever results in smaller size

img {
  width: 300px;
  height: 200px;
  object-fit: scale-down;  // Uses contain if image is larger, none if smaller
}

Visual comparison:

Original image: 1600x900px
Container: 300x300px

fill:
┌──────────────┐
│  Stretched!  │  // Distorted to fit
└──────────────┘

contain:
┌──────────────┐
│              │  // Black bars top/bottom
│    Image     │
│              │
└──────────────┘

cover:
┌──────────────┐
│ Imag│// Sides cropped
└──────────────┘

none:
┌──────────────┐
│Ima│// Original size, overflow cropped
└──────────────┘


object-position:

Defines how content is positioned within its container.

Syntax:
img {
  object-position: x y;
}

Values:
- Keywords: top, right, bottom, left, center
- Percentages: 0% 0%, 50% 50%, 100% 100%
- Length: 10px 20px, 2rem 3rem

Default:
object-position: 50% 50%;  // Centered (default)

Examples:

Center (default):
img {
  object-fit: cover;
  object-position: center;  // or 50% 50%
}

Top center:
img {
  object-fit: cover;
  object-position: top;  // or 50% 0%
}

Bottom right:
img {
  object-fit: cover;
  object-position: bottom right;  // or 100% 100%
}

Custom position:
img {
  object-fit: cover;
  object-position: 30% 40%;
}

With length units:
img {
  object-fit: cover;
  object-position: 10px 20px;
}

Real-world examples:

1. Profile avatars (square crop):

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;  // Fills circle, crops if needed
  object-position: center;  // Face centered
}

2. Card images (consistent height):

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;  // Maintains aspect ratio, fills space
  object-position: center;
}

3. Hero image (full width, consistent height):

.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center 30%;  // Focus on top 30% of image
}

4. Thumbnail gallery:

.thumbnail {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center;
  border: 2px solid #ddd;
}

5. Video player (fill container):

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

6. Logo (contain without distortion):

.logo {
  width: 200px;
  height: 100px;
  object-fit: contain;  // Fits inside without cropping
  object-position: left center;  // Aligned to left
}

7. Product images (show full product):

.product-image {
  width: 100%;
  height: 300px;
  object-fit: contain;  // Show entire product
  object-position: center;
  background: white;  // Background for empty space
}

8. Background-style image:

.banner-image {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  object-position: center 20%;  // Focus on important part
}

Responsive patterns:

Different fit on different sizes:
.image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

@media (min-width: 768px) {
  .image {
    height: 300px;
    object-fit: contain;
  }
}

Different position on mobile:
.hero-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: 80% center;  // Focus on right side on mobile
}

@media (min-width: 768px) {
  .hero-image {
    height: 500px;
    object-position: center;  // Centered on desktop
  }
}

Combining with other properties:

Complete image styling:
.image-container {
  width: 300px;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s;
}

.image-container:hover img {
  transform: scale(1.1);
}

With aspect ratio:
.aspect-box {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.aspect-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

Common use cases by object-fit value:

fill:
- When distortion is acceptable
- Rare in practice
- Legacy layouts

contain:
- Logos
- Product images
- Icons
- When showing full content is critical
- Profile pictures (circular crops)

cover:
- Hero images
- Card images
- Thumbnails
- Backgrounds
- When consistent dimensions needed

none:
- When original size required
- Specific cropping scenarios
- Rare in practice

scale-down:
- Responsive images
- When image might be smaller than container
- Flexible layouts

Positioning strategies:

For portraits (tall images):
img {
  object-fit: cover;
  object-position: center top;  // Keep faces visible
}

For landscapes:
img {
  object-fit: cover;
  object-position: center;  // Standard centering
}

For specific subjects:
img {
  object-fit: cover;
  object-position: 70% 30%;  // Focus on right side, upper area
}

Accessibility considerations:

1. Provide alt text:
   <img src="..." alt="Description" style="object-fit: cover">

2. Ensure critical content visible:
   Don't crop important parts

3. Test with different images:
   Various aspect ratios should work

4. Consider loading states:
   Show placeholder while loading

Browser support:

Excellent support in all modern browsers:
- Chrome: ✓
- Firefox: ✓
- Safari: ✓
- Edge: ✓

Legacy fallback:
For IE11 (if needed), use polyfill or background images

Best practices:

1. Set container dimensions:
   .container {
     width: 300px;
     height: 200px;
   }
   
   img {
     width: 100%;
     height: 100%;
     object-fit: cover;
   }

2. Use cover for thumbnails:
   Consistent sizing, no distortion

3. Use contain for logos:
   Show full logo without cropping

4. Center by default:
   object-position: center works for most cases

5. Test with various images:
   Different aspect ratios should look good

6. Add background color:
   For contain (fills empty space)
   
   .image-box {
     background: #f0f0f0;
   }
   
   img {
     object-fit: contain;
   }

7. Combine with aspect-ratio:
   Modern responsive approach

8. Use transition for effects:
   img {
     transition: transform 0.3s;
   }
   
   img:hover {
     transform: scale(1.05);
   }

Common mistakes:

1. Not setting container dimensions:
   object-fit needs defined width/height

2. Using fill (distortion):
   Usually looks bad

3. Not considering mobile:
   Different positioning may be needed

4. Forgetting background color:
   Contain leaves empty space

5. Not testing various images:
   Works with one image, breaks with others

Complete pattern example:

.image-card {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
}

.image-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.image-card:hover img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .image-card img {
    height: 200px;
  }
}

Alternative: background-image

Before object-fit, background images were used:

.image-box {
  width: 300px;
  height: 200px;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
}

Now prefer <img> with object-fit for:
- Better accessibility (alt text)
- Better SEO
- Semantic HTML
- Easier lazy loading
*/


/**
75. What are CSS custom properties (variables)?

CSS custom properties (also called CSS variables) are entities defined by CSS authors that 
store specific values to be reused throughout a document [web:61].

Definition:
Custom properties are author-defined values with custom names prefixed by --, which can 
be referenced anywhere in CSS using the var() function [web:63].

Basic syntax:

Declaring a variable:
.element {
  --main-color: #3498db;
  --spacing: 16px;
  --font-stack: "Helvetica Neue", Arial, sans-serif;
}

Using a variable:
.element {
  color: var(--main-color);
  padding: var(--spacing);
  font-family: var(--font-stack);
}

Naming rules:

Valid names:
--primary-color: blue;
--main-bg: #fff;
--spacing-large: 2rem;
--font-size-1: 14px;
--breakpoint-md: 768px;

Invalid names:
-primary-color: blue;     // Must have TWO dashes
primary-color: blue;       // No dashes
--Primary-Color: blue;     // Case-sensitive (different from --primary-color)

Note: Custom property names are case-sensitive
--myColor and --MyColor are different variables

Where to declare variables:

Global variables (most common):
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #333;
  --spacing-unit: 8px;
}

:root is equivalent to html but has higher specificity

Component-level variables:
.card {
  --card-padding: 20px;
  --card-border-radius: 8px;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  padding: var(--card-padding);
}

Element-specific variables:
.button {
  --button-bg: blue;
  background: var(--button-bg);
}

.button.danger {
  --button-bg: red;  // Overrides for this variant
}

Dynamic variables with inline styles:
<div style="--dynamic-color: purple;">
  <p style="color: var(--dynamic-color);">Purple text</p>
</div>

Value types:

Colors:
:root {
  --primary: #3498db;
  --secondary: rgb(46, 204, 113);
  --accent: rgba(231, 76, 60, 0.8);
  --highlight: hsl(48, 89%, 60%);
}

Sizes:
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

Percentages:
:root {
  --sidebar-width: 20%;
  --content-width: 80%;
  --overlay-opacity: 0.5;
}

Strings (for font families):
:root {
  --font-primary: "Inter", sans-serif;
  --font-secondary: Georgia, serif;
  --font-mono: "Fira Code", monospace;
}

Numbers (for calculations):
:root {
  --multiplier: 1.5;
  --base-size: 16;
  --grid-columns: 12;
}

Multiple values:
:root {
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  --transition: all 0.3s ease;
  --border: 1px solid #ddd;
}

Inheritance:

Variables inherit down the DOM tree:
:root {
  --text-color: black;
}

body {
  color: var(--text-color);  // Uses black
}

.dark-section {
  --text-color: white;  // Override for this section
}

.dark-section p {
  color: var(--text-color);  // Uses white (inherited from parent)
}

Real-world examples:

Design system with variables:
:root {
  / * Colors * /
  --color-primary: #3498db;
  --color-primary-dark: #2980b9;
  --color-primary-light: #5dade2;
  
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  --color-warning: #f39c12;
  --color-success: #27ae60;
  
  / * Grayscale * /
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-300: #e0e0e0;
  --gray-400: #bdbdbd;
  --gray-500: #9e9e9e;
  
  / * Typography * /
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-family-heading: Georgia, serif;
  --font-family-mono: "Courier New", monospace;
  
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  
  / * Spacing * /
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  
  / * Shadows * /
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  / * Border radius * /
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
  
  / * Transitions * /
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}

Using the design system:
.button {
  background: var(--color-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.button:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}

Theme switching (dark mode):
:root {
  --bg-primary: white;
  --bg-secondary: #f5f5f5;
  --text-primary: #333;
  --text-secondary: #666;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #f5f5f5;
  --text-secondary: #aaa;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.card {
  background: var(--bg-secondary);
}

Responsive variables:
:root {
  --container-width: 100%;
  --font-size: 14px;
  --spacing: 8px;
}

@media (min-width: 768px) {
  :root {
    --container-width: 720px;
    --font-size: 16px;
    --spacing: 12px;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-width: 960px;
    --font-size: 18px;
    --spacing: 16px;
  }
}

.container {
  max-width: var(--container-width);
  padding: var(--spacing);
  font-size: var(--font-size);
}

Component variants:
.button {
  --button-bg: var(--color-primary);
  --button-color: white;
  
  background: var(--button-bg);
  color: var(--button-color);
  padding: var(--space-3) var(--space-6);
}

.button--secondary {
  --button-bg: var(--color-secondary);
}

.button--outline {
  --button-bg: transparent;
  --button-color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

Advantages of CSS variables:

1. Real-time updates:
   Changes cascade instantly (no recompilation needed)

2. Can be modified with JavaScript:
   document.documentElement.style.setProperty('--primary-color', 'red');

3. Scoped to elements:
   Different values in different parts of DOM

4. Cascade and inherit:
   Follow normal CSS cascade rules

5. Work in media queries:
   Can change at breakpoints

6. Browser DevTools support:
   Easy to debug and test

7. No build step required:
   Native CSS feature

8. Better performance than preprocessors:
   For dynamic values

JavaScript integration:

Get variable value:
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

Set variable value:
document.documentElement.style.setProperty('--primary-color', '#ff0000');

// On specific element
element.style.setProperty('--local-var', '20px');

Remove variable:
document.documentElement.style.removeProperty('--primary-color');

Dynamic theme switching:
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
};

CSS:
:root {
  --bg: white;
  --text: black;
}

[data-theme="dark"] {
  --bg: #1a1a1a;
  --text: white;
}

Limitations:

1. Cannot be used in media queries:
   @media (min-width: var(--breakpoint)) { }  // Doesn't work

2. Cannot be used in selectors:
   .class-var(--name) { }  // Doesn't work

3. Strings need careful handling:
   Cannot directly concatenate
   --url: "image.jpg";
   background: url(var(--url));  // Doesn't work as expected

4. Some properties don't accept variables:
   Most properties work, but some edge cases exist

Best practices:

1. Use meaningful names:
   --primary-color: blue;  // Good
   --c1: blue;             // Bad

2. Group related variables:
   Keep colors together, spacing together, etc.

3. Use :root for globals:
   Global variables in :root

4. Prefix by category:
   --color-primary, --spacing-md, --font-size-lg

5. Document your variables:
   Especially in large projects

6. Use fallback values:
   var(--primary-color, blue)

7. Don't overuse:
   Not everything needs to be a variable

8. Consider naming conventions:
   Consistent naming across project

Browser support [web:61]:
Excellent support in all modern browsers (since 2016-2017). No support in IE11.
*/


/**
76. What is the var() function and how do fallbacks work?

The var() function is used to access CSS custom property (variable) values [web:61][web:65].

Basic syntax:
property: var(--variable-name);

Complete syntax with fallback:
property: var(--variable-name, fallback-value);

Basic usage:

Simple var():
:root {
  --primary-color: #3498db;
}

.element {
  color: var(--primary-color);  // Uses #3498db
}

Multiple uses:
:root {
  --spacing: 16px;
}

.box {
  padding: var(--spacing);
  margin: var(--spacing);
  gap: var(--spacing);
}

Fallback values [web:65]:

Single fallback:
.element {
  color: var(--primary-color, blue);
  // If --primary-color is not defined, use blue
}

Multiple fallbacks (nested):
.element {
  color: var(--primary-color, var(--secondary-color, var(--fallback-color, blue)));
  // Tries --primary-color
  // If not found, tries --secondary-color
  // If not found, tries --fallback-color
  // If not found, uses blue
}

When fallbacks are used:

1. Variable is not defined:
.element {
  color: var(--undefined-var, red);  // Uses red
}

2. Variable has invalid value:
:root {
  --color: this-is-not-a-color;
}

.element {
  color: var(--color, blue);  // Uses blue (invalid value)
}

3. Variable is in different scope:
.parent {
  --local-var: 20px;
}

.other-element {
  padding: var(--local-var, 10px);  // Uses 10px (out of scope)
}

When fallbacks are NOT used:

Variable defined as empty:
:root {
  --color: ;  // Empty but defined
}

.element {
  color: var(--color, blue);  // Uses empty value, not blue
}

Variable defined but wrong type:
:root {
  --size: auto;
}

.element {
  width: var(--size, 100px);  // Uses auto, not 100px (auto is valid)
}

Types of fallback values:

Simple values:
color: var(--primary, red);
padding: var(--spacing, 16px);
font-size: var(--font-size, 1rem);

Complex values:
box-shadow: var(--shadow, 0 2px 4px rgba(0,0,0,0.1));
background: var(--gradient, linear-gradient(to right, blue, purple));
transform: var(--transform, translateX(0) scale(1));

Another variable as fallback:
.element {
  color: var(--primary-color, var(--default-color));
  // If --primary-color not defined, use --default-color
}

Multiple properties in fallback:
font-family: var(--custom-font, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
// If --custom-font not defined, uses entire font stack

Real-world fallback examples:

Theme with fallbacks:
:root {
  --theme-primary: #3498db;
  --theme-secondary: #2ecc71;
}

.button {
  background: var(--button-bg, var(--theme-primary, #0066cc));
  // Tries: --button-bg → --theme-primary → #0066cc
}

Responsive spacing:
.container {
  padding: var(--container-padding, var(--spacing-lg, 2rem));
}

@media (max-width: 768px) {
  :root {
    --container-padding: 1rem;
  }
}

Component with local override:
.card {
  --card-bg: white;
  --card-padding: 20px;
  
  background: var(--card-bg);
  padding: var(--card-padding);
}

.card-header {
  padding: var(--header-padding, var(--card-padding, 16px));
  // Tries: --header-padding → --card-padding → 16px
}

Safe color system:
:root {
  --safe-primary: #3498db;
  --safe-danger: #e74c3c;
  --safe-success: #27ae60;
}

.alert {
  background: var(--alert-bg, var(--safe-primary, #0066cc));
  // Always has a working color
}

.alert-danger {
  --alert-bg: var(--danger-color, var(--safe-danger, #cc0000));
}

Complex fallback chains:

Multi-level theming:
:root {
  --global-spacing: 16px;
}

.section {
  --section-spacing: 24px;
}

.card {
  padding: var(--card-spacing, var(--section-spacing, var(--global-spacing, 1rem)));
  // Hierarchy: card → section → global → hardcoded
}

Brand color system:
:root {
  --brand-primary: #3498db;
  --brand-accent: #e74c3c;
}

.component {
  --component-color: var(--override-color, var(--brand-primary, blue));
}

// Usage
<div class="component" style="--override-color: purple;">
  // Uses purple
</div>

<div class="component">
  // Uses --brand-primary (#3498db)
</div>

Using calc() with var():

Calculations with variables:
:root {
  --base-spacing: 8px;
}

.element {
  padding: calc(var(--base-spacing) * 2);  // 16px
  margin: calc(var(--base-spacing) * 3);   // 24px
}

With fallback:
.element {
  width: calc(var(--custom-width, 100px) * 2);
  // If --custom-width defined: uses it * 2
  // If not: uses 100px * 2 = 200px
}

Nested calculations:
:root {
  --multiplier: 2;
  --base: 10px;
}

.element {
  padding: calc(var(--base, 8px) * var(--multiplier, 1));
  // 10px * 2 = 20px
}

Invalid value handling:

Invalid at use time:
:root {
  --gap: 20px;
}

.element {
  display: grid;
  gap: var(--gap);  // Works: 20px is valid for gap
}

.element {
  display: grid;
  gap: var(--undefined-gap);  // Invalid: variable doesn't exist
  // Browser uses initial value for gap (which is 0)
}

Type mismatch:
:root {
  --number: 50;  // Just a number, no unit
}

.element {
  width: var(--number);  // Invalid: width needs unit
  // Browser ignores this rule
}

.element {
  width: calc(var(--number) * 1px);  // Valid: 50px
}

JavaScript and fallbacks:

Set variable:
document.documentElement.style.setProperty('--primary', '#ff0000');

Get variable (with fallback):
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary') || '#0066cc';

Check if variable exists:
const computedValue = getComputedStyle(element).getPropertyValue('--my-var');
if (computedValue) {
  // Variable is defined
} else {
  // Variable not defined or empty
}

Best practices for fallbacks:

1. Always provide fallbacks for critical styles:
   color: var(--text-color, #333);  // Always readable

2. Use sensible defaults:
   padding: var(--spacing, 1rem);  // Reasonable fallback

3. Chain fallbacks for theming:
   var(--component-color, var(--theme-color, var(--default-color)))

4. Keep fallbacks simple:
   Avoid overly complex fallback chains

5. Document expected variables:
   / * Requires: --primary-color (fallback: blue) * /
   background: var(--primary-color, blue);

6. Test with missing variables:
   Ensure fallbacks work correctly

7. Use same unit in fallback:
   padding: var(--spacing, 16px);  // Both are lengths

8. Consider performance:
   Excessive nesting can impact performance

Common patterns:

Progressive enhancement:
.element {
  / * Fallback for old browsers * /
  color: blue;
  / * Modern approach * /
  color: var(--primary-color, blue);
}

Scoped component variables:
.button {
  --btn-bg: var(--primary-color, #0066cc);
  --btn-color: var(--primary-text, white);
  --btn-padding: var(--spacing-md, 12px);
  
  background: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
}

Safe color contrast:
.text {
  color: var(--text-color, #333);
  background: var(--bg-color, white);
  / * Ensures readability even if variables fail * /
}

Limitations:

1. Cannot use in media queries:
   @media (min-width: var(--breakpoint)) { }  // Doesn't work

2. Cannot use in selectors:
   var() only works in property values

3. Commas in fallback values:
   font-family: var(--font, Arial, sans-serif);
   // Entire "Arial, sans-serif" is the fallback

4. Whitespace matters:
   var(--size,10px) // Works
   var( --size , 10px ) // Also works

Browser support:
Same as CSS custom properties - excellent in all modern browsers.
*/


/**
77. What are calc(), min(), max(), and clamp() functions? [web:66][web:69]

These are CSS math functions that perform calculations to determine property values.

calc() function:

Performs mathematical calculations with different units.

Syntax:
property: calc(expression);

Basic operations:

Addition:
width: calc(100% - 80px);
padding: calc(1rem + 10px);

Subtraction:
margin-left: calc(50% - 150px);  // Center a 300px element
width: calc(100vw - 2rem);

Multiplication:
font-size: calc(16px * 1.5);  // 24px
padding: calc(var(--base-spacing) * 2);

Division:
width: calc(100% / 3);
font-size: calc(20px / 2);  // 10px

Complex calculations:
width: calc((100% - 40px) / 3);
padding: calc((100vh - 600px) / 2);

Mixing units:
width: calc(100% - 50px);        // Percentage and pixels
height: calc(100vh - 5rem);       // Viewport and rem
margin: calc(2em + 10px);         // Em and pixels
padding: calc(var(--spacing) * 2 + 10px);  // Variable, multiply, and add

Operator requirements:

Spaces required around + and -:
calc(100% - 80px)   // Correct
calc(100%-80px)     // Invalid

Spaces optional for * and /:
calc(100% / 3)      // Correct
calc(100%/3)        // Also correct

Real-world calc() examples:

Responsive sidebar layout:
.sidebar {
  width: 300px;
}

.main-content {
  width: calc(100% - 300px);  // Rest of the width
}

Centered element:
.modal {
  width: 600px;
  margin-left: calc(50% - 300px);  // (50% - half of width)
}

Aspect ratio box (before aspect-ratio property):
.box {
  width: 100%;
  height: 0;
  padding-bottom: calc(100% * (9 / 16));  // 16:9 aspect ratio
}

Responsive font size:
.text {
  font-size: calc(16px + 0.5vw);  // Grows with viewport
}

Grid with gaps:
.grid-item {
  width: calc((100% - 40px) / 3);  // 3 columns with 20px gaps
}

Container with safe spacing:
.container {
  width: calc(100% - 2rem);
  max-width: calc(1200px - 2rem);
  margin: 0 auto;
}


min() function [web:66]:

Returns the smallest value from a list.

Syntax:
property: min(value1, value2, ...);

Basic examples:

Width constraint:
.element {
  width: min(500px, 100%);
  // Uses 500px on large screens, 100% on small screens
}

Font size with maximum:
.heading {
  font-size: min(5vw, 48px);
  // Grows with viewport but never exceeds 48px
}

Multiple values:
.box {
  width: min(300px, 50%, 90vw);
  // Uses smallest of the three
}

Real-world min() examples:

Responsive container:
.container {
  width: min(1200px, 100% - 2rem);
  // Never exceeds 1200px, maintains 1rem margin on small screens
}

Flexible padding:
.card {
  padding: min(5vw, 3rem);
  // Responsive padding that doesn't get too large
}

Image sizing:
img {
  max-width: min(100%, 800px);
  height: auto;
}

Responsive text:
p {
  font-size: min(calc(14px + 0.5vw), 18px);
  // Grows responsively but caps at 18px
}


max() function [web:66]:

Returns the largest value from a list.

Syntax:
property: max(value1, value2, ...);

Basic examples:

Minimum width:
.element {
  width: max(200px, 50%);
  // Uses 200px minimum, grows with container
}

Font size with minimum:
.text {
  font-size: max(16px, 1rem);
  // Never smaller than 16px
}

Multiple values:
.box {
  height: max(300px, 50vh, 400px);
  // Uses largest of the three
}

Real-world max() examples:

Minimum button size:
.button {
  min-width: max(120px, 20%);
  // At least 120px wide
}

Readable line length:
.article {
  max-width: max(45ch, 50%);
  // At least 45 characters wide
}

Touch-friendly target:
.touch-target {
  min-width: max(44px, 100%);
  min-height: max(44px, 100%);
  // Ensures minimum 44px for accessibility
}

Safe spacing:
.element {
  margin-bottom: max(1rem, 2vh);
  // Responsive but not too small
}


clamp() function [web:66][web:69]:

Returns a value clamped between a minimum and maximum [web:66].

Syntax [web:69]:
property: clamp(MIN, VAL, MAX);

- MIN: Minimum value
- VAL: Preferred/ideal value
- MAX: Maximum value

How it works:
- If VAL < MIN, returns MIN
- If VAL > MAX, returns MAX
- Otherwise, returns VAL

Basic examples:

Fluid font size:
.heading {
  font-size: clamp(1.5rem, 5vw, 3rem);
  // Minimum 1.5rem, ideal 5vw, maximum 3rem
}

Fluid width:
.container {
  width: clamp(300px, 50%, 1200px);
  // Min 300px, ideal 50%, max 1200px
}

Fluid spacing:
.section {
  padding: clamp(1rem, 5%, 3rem);
}

Real-world clamp() examples:

Responsive typography:
h1 {
  font-size: clamp(2rem, 4vw + 1rem, 5rem);
  // Smoothly scales between 2rem and 5rem
}

h2 {
  font-size: clamp(1.5rem, 3vw + 0.5rem, 3rem);
}

p {
  font-size: clamp(1rem, 2vw, 1.25rem);
}

Fluid container:
.container {
  width: clamp(320px, 90%, 1200px);
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
}

Responsive grid gap:
.grid {
  display: grid;
  gap: clamp(1rem, 2vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

Card spacing:
.card {
  padding: clamp(1rem, 3%, 2.5rem);
  margin-bottom: clamp(1rem, 2vh, 2rem);
}

Accessible touch targets:
.button {
  min-height: clamp(44px, 10vw, 60px);
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
}

Combining functions:

calc() with variables:
.element {
  width: calc(var(--container-width) - var(--sidebar-width));
}

min() with calc():
.box {
  width: min(calc(100% - 2rem), 1200px);
}

max() with calc():
.text {
  font-size: max(calc(1rem + 0.5vw), 18px);
}

clamp() with calc():
.heading {
  font-size: clamp(1.5rem, calc(1rem + 2vw), 3rem);
}

All combined:
.container {
  width: clamp(
    320px,
    calc(100% - 2rem),
    min(1200px, 90vw)
  );
}

Nested functions:
.element {
  padding: max(
    1rem,
    min(5vw, 3rem)
  );
}

.responsive {
  font-size: clamp(
    1rem,
    calc(1rem + ((1vw - 0.32rem) * 0.625)),
    1.25rem
  );
}

Best practices:

1. Use clamp() for fluid typography:
   font-size: clamp(1rem, 2vw, 2rem);

2. Use min() for max constraints:
   width: min(100%, 1200px);

3. Use max() for min constraints:
   width: max(200px, 50%);

4. Use calc() for precision:
   width: calc(100% - 300px);

5. Combine for complex layouts:
   padding: clamp(1rem, 5%, max(2rem, 3vw));

6. Test across viewport sizes:
   Ensure values work at all sizes

7. Consider accessibility:
   Don't scale text too small

8. Use with CSS variables:
   Makes maintenance easier

Common patterns:

Fluid typography system:
:root {
  --font-size-sm: clamp(0.875rem, 1.5vw, 1rem);
  --font-size-base: clamp(1rem, 2vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 2.5vw, 1.5rem);
  --font-size-xl: clamp(1.5rem, 3vw, 2.5rem);
}

Responsive spacing:
:root {
  --space-xs: clamp(0.25rem, 1vw, 0.5rem);
  --space-sm: clamp(0.5rem, 2vw, 1rem);
  --space-md: clamp(1rem, 3vw, 2rem);
  --space-lg: clamp(2rem, 5vw, 4rem);
}

Perfect centering:
.centered {
  margin-inline: max(0px, calc((100% - 1200px) / 2));
}

Browser support:
- calc(): Excellent support (all modern browsers)
- min(), max(), clamp(): Good modern browser support (2020+)
*/


/**
78. What is the difference between root variables and component-level variables?

Root variables and component-level variables differ in scope, purpose, and where they're 
defined [web:67].

:root variables (Global):

Definition [web:67]:
Variables defined in :root selector are globally available throughout the entire document.

Syntax:
:root {
  --global-color: blue;
  --global-spacing: 16px;
}

Characteristics:

1. Global scope:
Available to all elements in the document

:root {
  --primary-color: #3498db;
}

header {
  background: var(--primary-color);  // Works
}

footer {
  background: var(--primary-color);  // Works
}

.card {
  border-color: var(--primary-color);  // Works
}

2. High specificity:
:root has higher specificity than html

3. Single source of truth:
One place to define global values

4. Theme and design system:
Ideal for app-wide design tokens

:root {
  / * Colors * /
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  
  / * Typography * /
  --font-family: system-ui, sans-serif;
  --font-size-base: 16px;
  
  / * Spacing * /
  --spacing-unit: 8px;
  
  / * Layout * /
  --container-max-width: 1200px;
  --sidebar-width: 250px;
}

5. Can be overridden:
Component-level variables can override root variables [web:67]

:root {
  --text-color: black;
}

.dark-section {
  --text-color: white;  // Override for this section
}


Component-level variables (Local/Scoped):

Definition:
Variables defined on specific selectors, scoped to that element and its descendants.

Syntax:
.component {
  --local-color: red;
  --local-spacing: 10px;
}

Characteristics:

1. Scoped to element:
Only available within the element and its children

.card {
  --card-padding: 20px;
  --card-bg: white;
}

.card-header {
  padding: var(--card-padding);  // Works (inside .card)
}

.other-component {
  padding: var(--card-padding);  // Doesn't work (outside .card)
}

2. Encapsulation:
Changes don't affect other components

.button {
  --button-color: blue;
}

.button-text {
  color: var(--button-color);  // Uses blue
}

.card-text {
  color: var(--button-color);  // Doesn't work (outside .button)
}

3. Component variants:
Different values for different instances

.button {
  --btn-bg: var(--color-primary);
  background: var(--btn-bg);
}

.button--danger {
  --btn-bg: var(--color-danger);  // Override for this variant
}

.button--success {
  --btn-bg: var(--color-success);  // Different override
}

4. Can reference global variables:
Component variables can use :root variables

:root {
  --primary-color: #3498db;
}

.card {
  --card-border: var(--primary-color);  // References global
  border-color: var(--card-border);
}

5. Cascade and inheritance:
Follow normal CSS cascade rules

.parent {
  --spacing: 20px;
}

.child {
  margin: var(--spacing);  // Inherits 20px from parent
}

.child.special {
  --spacing: 40px;  // Override for this specific child
}

Key differences table:

Aspect               | :root variables              | Component variables
---------------------|------------------------------|---------------------------
Scope                | Global (entire document)     | Local (element + children)
Defined in           | :root selector               | Component selectors
Purpose              | Design system, theme         | Component-specific values
Reusability          | Used everywhere              | Used in specific context
Naming convention    | Generic (--primary-color)    | Specific (--card-padding)
Override frequency   | Less often                   | More often (variants)
Inheritance          | All elements inherit         | Only descendants inherit
Specificity          | Highest (root level)         | Based on selector
Use case             | Brand colors, typography     | Component state, variants

Real-world comparison:

Using :root variables:
:root {
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --spacing-md: 16px;
  --border-radius: 4px;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

.card {
  border: 1px solid var(--color-primary);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
}

Using component-level variables:
.button {
  --btn-bg: var(--color-primary);
  --btn-padding: var(--spacing-md);
  --btn-radius: var(--border-radius);
  
  background: var(--btn-bg);
  padding: var(--btn-padding);
  border-radius: var(--btn-radius);
}

.button--large {
  --btn-padding: calc(var(--spacing-md) * 1.5);
  --btn-radius: calc(var(--border-radius) * 2);
}

.button--outline {
  --btn-bg: transparent;
  border: 2px solid var(--color-primary);
}

Best practices - when to use each:

Use :root variables for:

1. Design tokens [web:67]:
:root {
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --font-family: system-ui, sans-serif;
}

2. Global spacing scale:
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
}

3. Typography system:
:root {
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
}

4. Theme values:
:root {
  --bg-primary: white;
  --text-primary: #333;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #f5f5f5;
}

5. Breakpoints (as numbers):
:root {
  --breakpoint-sm: 640;
  --breakpoint-md: 768;
  --breakpoint-lg: 1024;
}

Use component-level variables for:

1. Component variants:
.alert {
  --alert-bg: var(--color-info);
  --alert-border: var(--color-info);
  
  background: var(--alert-bg);
  border-left: 4px solid var(--alert-border);
}

.alert--warning {
  --alert-bg: var(--color-warning);
  --alert-border: var(--color-warning);
}

2. Component state:
.button {
  --btn-opacity: 1;
  opacity: var(--btn-opacity);
}

.button:hover {
  --btn-opacity: 0.9;
}

.button:disabled {
  --btn-opacity: 0.5;
}

3. Local calculations:
.grid {
  --grid-columns: 3;
  --grid-gap: 1rem;
  
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}

4. Dynamic inline styles:
<div class="card" style="--card-color: purple;">
  <p style="color: var(--card-color);">Purple text</p>
</div>

5. Component customization:
.modal {
  --modal-width: 600px;
  --modal-max-height: 80vh;
  
  width: var(--modal-width);
  max-height: var(--modal-max-height);
}

Combined approach (recommended):

:root {
  / * Global design tokens * /
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --spacing-unit: 8px;
}

.card {
  / * Component-specific variables referencing global * /
  --card-bg: white;
  --card-padding: calc(var(--spacing-unit) * 2);
  --card-border-color: var(--color-primary);
  
  / * Usage * /
  background: var(--card-bg);
  padding: var(--card-padding);
  border: 1px solid var(--card-border-color);
}

.card--highlighted {
  / * Variant override * /
  --card-border-color: var(--color-secondary);
  --card-padding: calc(var(--spacing-unit) * 3);
}

Naming conventions:

:root variables:
--color-primary
--spacing-md
--font-size-lg
--breakpoint-desktop

Component variables:
--card-padding
--button-bg
--modal-width
--nav-height

Accessibility benefits [web:67]:

Dynamic updates [web:67]:
:root {
  --font-size: 16px;
}

// User preference
document.documentElement.style.setProperty('--font-size', '20px');
// All components using var(--font-size) update immediately

Component isolation:
.button {
  --btn-focus-color: var(--color-primary);
}

.button:focus {
  outline-color: var(--btn-focus-color);
}

// Easy to change for accessibility
.high-contrast {
  --btn-focus-color: #000;
}

Browser support:
Both work identically - same CSS custom properties feature.
Excellent support in all modern browsers.
*/


/**
79. What are CSS preprocessors? [web:72]

CSS preprocessors are scripting languages that extend CSS capabilities and compile into 
standard CSS [web:72].

Definition:
A CSS preprocessor is a program that processes input written in a preprocessor-specific 
syntax and produces standard CSS as output [web:72].

Purpose [web:72]:
While CSS has improved significantly with custom properties, logical properties, and math 
functions, preprocessors still help with speeding up workflow, optimizing code, improving 
performance, and preparing for scaling [web:72].

How preprocessors work:

1. Write code in preprocessor syntax:
   .scss, .sass, .less, .styl files

2. Compile/process the code:
   Preprocessor converts it to .css

3. Browser receives standard CSS:
   No browser-side processing needed

Workflow:
Write SCSS → Compile → Generate CSS → Browser reads CSS

Popular CSS preprocessors [web:72]:

1. Sass/SCSS (most popular):
   - Full-featured
   - Large community
   - Two syntaxes (Sass and SCSS)

2. Less:
   - JavaScript-based
   - Similar to CSS syntax
   - Faster compile time [web:75]

3. Stylus:
   - Flexible syntax
   - Python-like indentation
   - Less popular now

4. PostCSS:
   - JavaScript-based
   - Plugin system
   - Modern approach

Features that preprocessors add:

1. Variables:
   Store reusable values

// SCSS
$primary-color: #3498db;
$spacing: 16px;

.button {
  color: $primary-color;
  padding: $spacing;
}

2. Nesting [web:71]:
   Write nested selectors

// SCSS
.nav {
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    display: inline-block;
  }
}

3. Mixins [web:71]:
   Reusable blocks of code

// SCSS
@mixin border-radius($radius) {
  border-radius: $radius;
}

.button {
  @include border-radius(5px);
}

4. Functions:
   Calculate values

// SCSS
@function double($value) {
  @return $value * 2;
}

.box {
  padding: double(10px); // 20px
}

5. Inheritance/Extends [web:71]:
   Share styles between selectors

// SCSS
%button-base {
  padding: 10px 20px;
  border: none;
}

.button-primary {
  @extend %button-base;
  background: blue;
}

6. Partials and imports [web:77]:
   Split code into multiple files

// _variables.scss
$primary: blue;

// main.scss
@import 'variables';

7. Operators:
   Mathematical operations

// SCSS
.container {
  width: 100% / 3;
  padding: 10px + 5px;
}

8. Control directives:
   If/else statements, loops

// SCSS
@for $i from 1 through 3 {
  .col-#{$i} {
    width: 100% / $i;
  }
}

Advantages of preprocessors:

1. DRY principle (Don't Repeat Yourself):
   Reuse code with variables and mixins

2. Better organization:
   Split into multiple files, modular structure

3. Maintainability:
   Easier to update and manage large projects

4. Powerful features:
   Logic, loops, functions not in vanilla CSS

5. Faster development:
   Write less code, more productivity

6. Code readability:
   Nesting and organization improve clarity

7. Consistency:
   Variables ensure design consistency

8. Dynamic generation:
   Generate CSS programmatically

Disadvantages:

1. Compilation required:
   Need build tools

2. Learning curve:
   Additional syntax to learn

3. Debugging difficulty:
   Source maps needed for debugging

4. Compilation time:
   Extra step in development [web:75]

5. Team adoption:
   Everyone needs to know the preprocessor

6. Overuse risks:
   Too much nesting/complexity can hurt

7. Native CSS catching up [web:73][web:74]:
   CSS now has variables, nesting, and more [web:73]

Modern CSS vs Preprocessors [web:73][web:74]:

Native CSS now has [web:73]:
- CSS Custom Properties (variables)
- CSS Nesting
- calc(), min(), max(), clamp()
- Color functions
- :is(), :where(), :has()

Still need preprocessors for [web:74]:
- Mixins
- Functions
- Loops
- Complex inheritance
- Partials/imports
- Build-time calculations

When to use preprocessors:

Good use cases:
- Large projects with complex styles
- Design systems
- Component libraries
- Teams with preprocessor expertise
- Need for mixins and functions
- Complex calculations

May not need if:
- Small projects
- Modern CSS features sufficient
- Team unfamiliar with preprocessors
- Want to avoid build step

Setting up a preprocessor:

Command-line compilation:
npm install -g sass
sass input.scss output.css

Watch mode:
sass --watch input.scss:output.css

Build tools integration:
- Webpack with sass-loader
- Vite with native Sass support
- Gulp with gulp-sass
- Parcel (automatic)

Example workflow:

Project structure:
scss/
  ├── _variables.scss
  ├── _mixins.scss
  ├── _base.scss
  ├── _components.scss
  └── main.scss
css/
  └── main.css (compiled)

main.scss:
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';

Compile command:
sass scss/main.scss css/main.css

Browser usage:
<link rel="stylesheet" href="css/main.css">

Future of preprocessors [web:73][web:74]:

Native CSS evolving [web:73]:
CSS is adopting preprocessor features, reducing need for preprocessing [web:73][web:74]

Still valuable for:
- Mixins (no CSS equivalent)
- Functions (limited in CSS)
- Complex logic (no CSS equivalent)
- Build-time optimizations

Hybrid approach:
Use native CSS features where possible, preprocessors for advanced features

Best practices:

1. Don't over-nest:
   Max 3-4 levels deep

2. Use variables wisely:
   Only for values used multiple times

3. Keep mixins simple:
   Focused, single-purpose mixins

4. Organize with partials:
   Split into logical files

5. Document your code:
   Comments for complex logic

6. Use source maps:
   For easier debugging

7. Follow naming conventions:
   Consistent variable/mixin names

8. Avoid excessive abstractions:
   Keep it understandable
*/


/**
80. What is SASS/SCSS and why is it used? [web:71][web:72]

Sass (Syntactically Awesome Style Sheets) is the most popular CSS preprocessor that adds 
powerful features to CSS [web:71][web:72].

Two syntaxes:

1. SASS (original syntax):
   - Indentation-based
   - No braces or semicolons
   - .sass extension

// Sass syntax
.button
  padding: 10px 20px
  background: blue
  
  &:hover
    background: darkblue

2. SCSS (Sassy CSS):
   - CSS-like syntax
   - Uses braces and semicolons
   - .scss extension
   - More popular

// SCSS syntax
.button {
  padding: 10px 20px;
  background: blue;
  
  &:hover {
    background: darkblue;
  }
}

Most developers prefer SCSS because it's CSS-compatible.

History [web:72]:

Originally written in Ruby, but deprecated in 2019 [web:72]. Now written in Dart (Dart Sass) 
and available as npm package for easier integration [web:72].

Installation:

npm install -g sass

Or in project:
npm install --save-dev sass

Compiling SCSS:

Command line:
sass input.scss output.css

Watch mode:
sass --watch scss:css

In package.json:
{
  "scripts": {
    "sass": "sass scss/main.scss css/main.css",
    "sass:watch": "sass --watch scss:css"
  }
}

Why SCSS is used:

1. Variables:
Better than CSS variables for compile-time values

$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;
$base-spacing: 16px;

.button {
  color: $primary-color;
  font-family: $font-stack;
  padding: $base-spacing;
}

2. Nesting [web:71]:
Write hierarchical CSS

.nav {
  background: white;
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  li {
    display: inline-block;
    
    a {
      text-decoration: none;
      padding: 10px 15px;
      
      &:hover {
        color: blue;
      }
    }
  }
}

3. Mixins [web:71]:
Reusable blocks of code with parameters

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-variant($bg, $color) {
  background: $bg;
  color: $color;
  
  &:hover {
    background: darken($bg, 10%);
  }
}

.card {
  @include flex-center;
}

.button-primary {
  @include button-variant(blue, white);
}

4. Functions:
Calculate and return values

@function calculate-rem($px) {
  @return #{$px / 16}rem;
}

.text {
  font-size: calculate-rem(18px); // 1.125rem
}

5. Inheritance (@extend) [web:71]:
Share styles between selectors

%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background: blue;
  color: white;
}

.button-secondary {
  @extend %button-base;
  background: gray;
  color: white;
}

6. Partials [web:72][web:77]:
Split code into multiple files [web:77]

_variables.scss
_mixins.scss
_base.scss
_components.scss
main.scss

7. Built-in functions [web:72]:
Color manipulation, math, string operations [web:72]

$base-color: #3498db;

.element {
  background: lighten($base-color, 20%);
  border-color: darken($base-color, 10%);
  color: complement($base-color);
}

8. Control directives [web:72]:
If/else, loops [web:72]

@if $theme == 'dark' {
  background: black;
} @else {
  background: white;
}

@for $i from 1 through 4 {
  .col-#{$i} {
    width: 100% / $i;
  }
}

Real-world SCSS example:

// _variables.scss
$primary: #3498db;
$secondary: #2ecc71;
$danger: #e74c3c;

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;

// _mixins.scss
@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

@mixin button-style($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: $spacing-md $spacing-lg;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: darken($bg, 10%);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

// components.scss
.button {
  @include button-style($primary);
  
  &--secondary {
    @include button-style($secondary);
  }
  
  &--danger {
    @include button-style($danger);
  }
}

.container {
  width: 100%;
  padding: $spacing-md;
  
  @include respond-to($breakpoint-md) {
    max-width: 720px;
    margin: 0 auto;
  }
  
  @include respond-to($breakpoint-lg) {
    max-width: 960px;
  }
}

Advantages over plain CSS:

1. Better code organization:
   Partials keep code modular

2. Reusability:
   Mixins and functions reduce duplication

3. Maintainability:
   Variables make updates easier

4. Powerful features:
   Logic and loops not possible in CSS

5. Design systems:
   Perfect for building component libraries

6. Team consistency:
   Shared variables ensure uniformity

7. Compile-time optimization:
   Dead code elimination, minification

Disadvantages:

1. Compilation required:
   Extra build step

2. Learning curve:
   Need to learn Sass syntax

3. Debugging complexity:
   Need source maps

4. Compile time [web:75]:
   Sass is slower than Less [web:75]

5. Over-engineering risk:
   Easy to make code too complex

When to use SCSS:

Good for:
- Large applications
- Design systems
- Component libraries
- Teams already using it
- Complex styling logic

Consider alternatives if:
- Small project
- Native CSS sufficient
- No build tooling
- Team unfamiliar with Sass

SCSS vs native CSS [web:73]:

Native CSS now has [web:73]:
- Custom properties (variables)
- CSS nesting [web:73]
- calc(), min(), max()
- Color functions

SCSS still offers:
- Mixins (no CSS equivalent)
- Functions
- Loops and conditionals
- Partials/imports
- Compile-time optimizations

Best practices:

1. Use SCSS over Sass syntax:
   More familiar to CSS developers

2. Don't over-nest:
   Max 3 levels deep

3. Use variables for design tokens:
   Colors, spacing, typography

4. Create reusable mixins:
   For common patterns

5. Organize with partials:
   Logical file structure

6. Use @use over @import:
   Modern module system

7. Enable source maps:
   Easier debugging

8. Lint your SCSS:
   Use stylelint with SCSS plugins
*/


/**
81. What are nesting, variables, mixins, and extends in SASS? [web:71]

These are core features that make Sass powerful for writing maintainable CSS [web:71].

1. Nesting [web:71]:

Allows writing CSS selectors nested within one another, reflecting HTML hierarchy [web:71].

Basic nesting:
.nav {
  background: white;
  padding: 10px;
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    display: inline-block;
  }
  
  a {
    color: blue;
    text-decoration: none;
  }
}

Compiles to:
.nav {
  background: white;
  padding: 10px;
}
.nav ul {
  margin: 0;
  padding: 0;
}
.nav li {
  display: inline-block;
}
.nav a {
  color: blue;
  text-decoration: none;
}

Parent selector (&):
Refers to parent selector

.button {
  background: blue;
  
  &:hover {
    background: darkblue;
  }
  
  &:active {
    background: navy;
  }
  
  &--large {
    padding: 20px 40px;
  }
  
  &__icon {
    margin-right: 8px;
  }
}

Compiles to:
.button {
  background: blue;
}
.button:hover {
  background: darkblue;
}
.button:active {
  background: navy;
}
.button--large {
  padding: 20px 40px;
}
.button__icon {
  margin-right: 8px;
}

Nesting properties:
.text {
  font: {
    family: Arial;
    size: 16px;
    weight: bold;
  }
  
  border: {
    top: 1px solid black;
    bottom: 1px solid black;
  }
}

Best practices for nesting:
- Don't nest more than 3-4 levels deep
- Avoid overly specific selectors
- Use & for pseudo-classes and BEM modifiers

Good nesting:
.card {
  padding: 20px;
  
  &__header {
    font-weight: bold;
  }
  
  &__body {
    padding: 10px 0;
  }
}

Bad nesting (too deep):
.nav {
  ul {
    li {
      a {
        span {
          // Too deep! Creates .nav ul li a span
        }
      }
    }
  }
}


2. Variables:

Store reusable values with $ prefix.

Declaring variables:
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, Arial, sans-serif;
$base-spacing: 16px;
$border-radius: 4px;

Using variables:
.button {
  background: $primary-color;
  font-family: $font-stack;
  padding: $base-spacing;
  border-radius: $border-radius;
}

.card {
  border: 1px solid $primary-color;
  padding: $base-spacing * 2; // Can use in calculations
}

Variable scope:
$global-var: blue; // Global scope

.component {
  $local-var: red; // Local scope (only inside .component)
  color: $local-var;
}

.other {
  color: $global-var; // Works
  // color: $local-var; // Error: undefined variable
}

Variable interpolation:
$side: top;
$size: 20px;

.box {
  margin-#{$side}: $size; // margin-top: 20px;
}

Variable types:
// Numbers
$width: 100px;
$multiplier: 1.5;

// Strings
$font-family: 'Roboto';
$image-path: '../images/';

// Colors
$primary: #3498db;
$secondary: rgb(46, 204, 113);

// Booleans
$is-rounded: true;

// Null
$optional-value: null;

// Lists (space or comma separated)
$font-stack: Helvetica, Arial, sans-serif;
$spacing-values: 5px 10px 15px 20px;

// Maps (key-value pairs)
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

Using maps:
$theme-colors: (
  primary: #3498db,
  secondary: #2ecc71,
  success: #27ae60,
  danger: #e74c3c
);

.button {
  background: map-get($theme-colors, primary);
}

@each $name, $color in $theme-colors {
  .button-#{$name} {
    background: $color;
  }
}


3. Mixins [web:71]:

Reusable blocks of CSS declarations, can accept parameters [web:71].

Basic mixin:
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav ul {
  @include reset-list;
}

Mixin with parameters:
@mixin button-style($bg-color, $text-color: white) {
  background: $bg-color;
  color: $text-color;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button-primary {
  @include button-style(blue);
}

.button-secondary {
  @include button-style(gray, black);
}

Mixin with default values:
@mixin box-shadow($x: 0, $y: 2px, $blur: 4px, $color: rgba(0,0,0,0.1)) {
  box-shadow: $x $y $blur $color;
}

.card {
  @include box-shadow; // Uses defaults
}

.elevated-card {
  @include box-shadow(0, 8px, 16px, rgba(0,0,0,0.2));
}

Mixin with @content:
Allows passing a block of styles

@mixin respond-to($breakpoint) {
  @media (min-width: $breakpoint) {
    @content;
  }
}

.container {
  width: 100%;
  
  @include respond-to(768px) {
    max-width: 720px;
  }
  
  @include respond-to(1024px) {
    max-width: 960px;
  }
}

Real-world mixin examples:

Flexbox centering:
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

.modal {
  @include flex-center(column);
}

Responsive font:
@mixin responsive-font($min, $max, $min-vw, $max-vw) {
  font-size: clamp($min, calc($min + ($max - $min) * ((100vw - $min-vw) / ($max-vw - $min-vw))), $max);
}

h1 {
  @include responsive-font(24px, 48px, 320px, 1200px);
}

Truncate text:
@mixin truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title {
  @include truncate;
}


4. @extend / Inheritance [web:71][web:79]:

Allows one selector to inherit styles from another [web:71][web:79].

Basic extend:
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @extend .button;
  background: blue;
  color: white;
}

.button-secondary {
  @extend .button;
  background: gray;
  color: white;
}

Compiles to:
.button, .button-primary, .button-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  background: blue;
  color: white;
}

.button-secondary {
  background: gray;
  color: white;
}

Placeholder selectors (%):
Best practice - use % for extends only

%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @extend %button-base;
  background: blue;
}

.button-secondary {
  @extend %button-base;
  background: gray;
}

Compiles to:
.button-primary, .button-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  background: blue;
}

.button-secondary {
  background: gray;
}

Note: %button-base doesn't appear in output (placeholder only)

When to use @extend vs @mixin [web:79]:

Use @extend when [web:79]:
- Selectors are thematically related [web:79]
- Sharing static styles
- Want grouped selectors in output
- No dynamic values needed

%message-base {
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.message-success {
  @extend %message-base;
  background: green;
}

.message-error {
  @extend %message-base;
  background: red;
}

Use @mixin when [web:79]:
- Need dynamic values [web:79]
- Not thematically related [web:79]
- Want to inject logic
- Need @content block

@mixin alert($bg, $border) {
  background: $bg;
  border-left: 4px solid $border;
  padding: 15px;
}

.alert-warning {
  @include alert(#fff3cd, #ffc107);
}

Danger of @extend:

Can create unexpected selectors:
.button {
  padding: 10px;
}

.button .icon {
  margin-right: 5px;
}

.special-button {
  @extend .button; // Creates .special-button .icon too!
}

Output:
.button, .special-button {
  padding: 10px;
}

.button .icon, .special-button .icon {
  margin-right: 5px;
}

This can lead to unexpected styles. Use placeholders (%) to avoid this.

Best practices:

Nesting:
- Max 3-4 levels
- Use & for pseudo-classes
- Reflect HTML structure

Variables:
- Use meaningful names
- Group related variables
- Use maps for collections
- Prefix with $ always

Mixins [web:76]:
- Keep focused and simple [web:76]
- Use parameters for flexibility
- Provide default values
- Use @content for complex cases
- Can nest mixins inside mixins [web:76]

Extends [web:79]:
- Use placeholders (%) not classes
- Only extend thematically related selectors [web:79]
- Be aware of selector bloat
- Prefer mixins for most cases [web:79]
*/


/**
82. What are partials and imports in SCSS? [web:72][web:77]

Partials and imports allow splitting SCSS code into multiple files for better organization 
[web:72][web:77].

Partials [web:77]:

Definition:
Partial files contain reusable CSS snippets (variables, mixins, functions, styles) that 
are imported into other SCSS files [web:77].

Naming convention:
Partial files start with underscore (_):
- _variables.scss
- _mixins.scss
- _base.scss
- _components.scss

Why underscore?
Tells Sass compiler not to compile this file into separate CSS. Only compiled when 
imported into main file.

Without underscore:
variables.scss → compiles to → variables.css (not wanted)

With underscore:
_variables.scss → not compiled separately (only when imported)

Creating partials:

_variables.scss:
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;
$base-spacing: 16px;

_mixins.scss:
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-style($bg) {
  background: $bg;
  padding: $base-spacing;
  border: none;
}

_base.scss:
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-stack;
  line-height: 1.6;
}

_components.scss:
.button {
  @include button-style($primary-color);
  color: white;
  border-radius: 4px;
}

.card {
  padding: $base-spacing * 2;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}


@import (legacy) [web:77]:

Imports partial files into main SCSS file [web:77].

Syntax:
@import 'filename';

Note: No underscore or extension needed in import

main.scss:
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';

// Can now use variables and mixins from imported files

.special-button {
  @include button-style($secondary-color);
}

Import rules:
1. Omit underscore: @import 'variables', not @import '_variables'
2. Omit extension: @import 'variables', not @import 'variables.scss'
3. Order matters: Import variables before using them

Wrong order:
@import 'components'; // Error: $primary-color undefined
@import 'variables';

Correct order:
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';

Multiple imports:
@import 'variables', 'mixins', 'base';


@use (modern approach):

Replacement for @import, better module system.

Syntax:
@use 'filename';

Advantages over @import:
- Namespace protection
- Better performance
- Explicit dependencies
- Only loads once

Using @use:

_variables.scss:
$primary: #3498db;
$secondary: #2ecc71;

main.scss:
@use 'variables';

.button {
  background: variables.$primary; // Must use namespace
}

Custom namespace:
@use 'variables' as v;

.button {
  background: v.$primary;
}

No namespace:
@use 'variables' as *;

.button {
  background: $primary; // No namespace needed
}

@use with mixins:
_mixins.scss:
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

main.scss:
@use 'mixins';

.container {
  @include mixins.flex-center;
}


@forward:

Makes members from one module available when file is imported/used.

_index.scss (barrel file):
@forward 'variables';
@forward 'mixins';
@forward 'functions';

main.scss:
@use 'index'; // Gets all forwarded modules

.button {
  background: index.$primary-color;
  @include index.button-style;
}


Project structure with partials [web:80]:

Organized structure:
scss/
  ├── abstracts/
  │   ├── _variables.scss
  │   ├── _mixins.scss
  │   ├── _functions.scss
  │   └── _index.scss
  ├── base/
  │   ├── _reset.scss
  │   ├── _typography.scss
  │   └── _index.scss
  ├── components/
  │   ├── _buttons.scss
  │   ├── _cards.scss
  │   ├── _forms.scss
  │   └── _index.scss
  ├── layout/
  │   ├── _header.scss
  │   ├── _footer.scss
  │   ├── _grid.scss
  │   └── _index.scss
  ├── pages/
  │   ├── _home.scss
  │   ├── _about.scss
  │   └── _index.scss
  └── main.scss

main.scss:
@use 'abstracts';
@use 'base';
@use 'components';
@use 'layout';
@use 'pages';

Index files (_index.scss):

abstracts/_index.scss:
@forward 'variables';
@forward 'mixins';
@forward 'functions';

This allows:
@use 'abstracts'; // Instead of importing each file separately

Benefits of partials and imports [web:77]:

1. Modularity [web:77]:
Breaking styles into smaller files makes code easier to manage [web:77]

2. Reusability [web:77]:
Partials can be reused across different projects [web:77]

3. Maintainability [web:77]:
Update specific sections without affecting others [web:77]

4. Readability [web:77]:
Organized structure improves clarity and team collaboration [web:77]

5. Performance:
@use loads files only once

6. Team workflow:
Different team members can work on different files

7. Testing:
Easier to test individual components

Real-world example:

_variables.scss:
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

$spacing: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px
);

_mixins.scss:
@use 'variables' as v;

@mixin respond-to($breakpoint) {
  @media (min-width: map-get(v.$breakpoints, $breakpoint)) {
    @content;
  }
}

@mixin button-variant($color-name) {
  $color: map-get(v.$colors, $color-name);
  background: $color;
  
  &:hover {
    background: darken($color, 10%);
  }
}

_buttons.scss:
@use 'mixins' as m;
@use 'variables' as v;

.button {
  padding: map-get(v.$spacing, md);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &--primary {
    @include m.button-variant('primary');
  }
  
  &--secondary {
    @include m.button-variant('secondary');
  }
  
  @include m.respond-to('md') {
    padding: map-get(v.$spacing, lg);
  }
}

main.scss:
@use 'variables';
@use 'mixins';
@use 'buttons';

Best practices:

1. Use meaningful names:
   _variables.scss, not _vars.scss

2. One partial per component/concept:
   _buttons.scss, _cards.scss

3. Use index files:
   Group related partials

4. Import in logical order:
   Variables → Mixins → Base → Components

5. Prefer @use over @import:
   Modern and more maintainable

6. Keep partials focused:
   Single responsibility

7. Use folders for organization:
   Group related partials

8. Document imports:
   Comment complex dependencies

9. Avoid deep nesting:
   In both selectors and file structure

10. Test compilation:
    Ensure all imports resolve correctly
*/


/**
83. What are functions and loops in SCSS? [web:72]

SCSS provides programming features like functions and loops for dynamic CSS generation 
[web:72].

Functions:

Custom functions that calculate and return values.

Syntax:
@function function-name($parameters) {
  // calculations
  @return value;
}

Basic function:
@function double($value) {
  @return $value * 2;
}

.box {
  padding: double(10px); // 20px
  margin: double(5px);   // 10px
}

Function with type checking:
@function calculate-rem($px) {
  @if type-of($px) != 'number' {
    @error 'Value must be a number';
  }
  
  @return #{$px / 16}rem;
}

.text {
  font-size: calculate-rem(18); // 1.125rem
}

Functions with multiple parameters:
@function calculate-grid-width($columns, $total: 12, $gap: 0px) {
  $width: ($columns / $total) * 100%;
  
  @if $gap > 0 {
    $width: calc(#{$width} - #{$gap});
  }
  
  @return $width;
}

.col-6 {
  width: calculate-grid-width(6); // 50%
}

.col-4 {
  width: calculate-grid-width(4, 12, 20px); // calc(33.333% - 20px)
}

Real-world function examples:

Spacing scale:
@function spacing($multiplier) {
  $base: 8px;
  @return $base * $multiplier;
}

.card {
  padding: spacing(2);    // 16px
  margin: spacing(3);     // 24px
  gap: spacing(1);        // 8px
}

Tint/Shade colors:
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}

$primary: #3498db;

.button {
  background: $primary;
  
  &:hover {
    background: shade($primary, 20%);
  }
  
  &:active {
    background: shade($primary, 30%);
  }
}

Strip unit:
@function strip-unit($value) {
  @return $value / ($value * 0 + 1);
}

$width: 100px;
$number: strip-unit($width); // 100

Clamp function:
@function clamp-value($min, $val, $max) {
  @return max($min, min($val, $max));
}

.element {
  width: clamp-value(200px, 50%, 800px);
}


Built-in Sass functions [web:72]:

Color functions:
$base-color: #3498db;

.element {
  // Lighten/Darken
  background: lighten($base-color, 20%);
  border: darken($base-color, 10%);
  
  // Saturate/Desaturate
  color: saturate($base-color, 30%);
  outline: desaturate($base-color, 20%);
  
  // Adjust hue
  box-shadow: adjust-hue($base-color, 45deg);
  
  // Complement
  border-color: complement($base-color);
  
  // Mix colors
  background: mix(red, blue, 50%); // 50% red, 50% blue
  
  // Transparency
  background: rgba($base-color, 0.5);
  background: transparentize($base-color, 0.3);
  background: opacify(rgba($base-color, 0.5), 0.2);
}

Math functions:
.box {
  width: percentage(0.5);        // 50%
  padding: round(10.6px);        // 11px
  margin: ceil(10.2px);          // 11px
  height: floor(10.8px);         // 10px
  top: abs(-20px);               // 20px
  left: min(10px, 20px, 5px);    // 5px
  right: max(10px, 20px, 5px);   // 20px
}

String functions:
$string: "hello-world";

.element {
  // to-upper-case($string) → "HELLO-WORLD"
  // to-lower-case($string) → "hello-world"
  // str-length($string) → 11
  // str-index($string, "world") → 7
  // str-slice($string, 1, 5) → "hello"
}

List functions:
$list: 10px 20px 30px 40px;

.element {
  // length($list) → 4
  // nth($list, 2) → 20px
  // index($list, 30px) → 3
  // append($list, 50px) → 10px 20px 30px 40px 50px
  // join($list, (60px 70px)) → 10px 20px 30px 40px 60px 70px
}

Map functions:
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c
);

.button {
  background: map-get($colors, primary);
  // map-has-key($colors, 'primary') → true
  // map-keys($colors) → ("primary", "secondary", "danger")
  // map-values($colors) → (#3498db, #2ecc71, #e74c3c)
}


Loops [web:72]:

@for loop:
Iterate specific number of times

@for $i from 1 through 4 {
  .col-#{$i} {
    width: 100% / $i;
  }
}

Compiles to:
.col-1 { width: 100%; }
.col-2 { width: 50%; }
.col-3 { width: 33.333%; }
.col-4 { width: 25%; }

From X to Y (exclusive):
@for $i from 1 to 4 { // 1, 2, 3 (not 4)
  .item-#{$i} {
    order: $i;
  }
}

@each loop:
Iterate through list or map

List iteration:
$sizes: small, medium, large;

@each $size in $sizes {
  .button-#{$size} {
    @if $size == small {
      padding: 8px 16px;
    } @else if $size == medium {
      padding: 12px 24px;
    } @else {
      padding: 16px 32px;
    }
  }
}

Map iteration:
$colors: (
  primary: #3498db,
  secondary: #2ecc71,
  danger: #e74c3c,
  warning: #f39c12
);

@each $name, $color in $colors {
  .alert-#{$name} {
    background: lighten($color, 40%);
    border-left: 4px solid $color;
    color: darken($color, 20%);
  }
}

Compiles to:
.alert-primary {
  background: #d6eaf8;
  border-left: 4px solid #3498db;
  color: #1f618d;
}
// ... and so on

Multiple values:
$icons: (
  checkmark: "\2713",
  cross: "\2717",
  star: "\2605"
);

@each $name, $code in $icons {
  .icon-#{$name}::before {
    content: $code;
  }
}

@while loop:
Loop while condition is true (rare in practice)

$i: 1;

@while $i <= 4 {
  .col-#{$i} {
    width: 100% / $i;
  }
  
  $i: $i + 1;
}

Real-world loop examples:

Spacing utilities:
$spacings: (
  0: 0,
  1: 4px,
  2: 8px,
  3: 12px,
  4: 16px,
  5: 24px,
  6: 32px
);

@each $name, $size in $spacings {
  .m-#{$name} { margin: $size; }
  .mt-#{$name} { margin-top: $size; }
  .mr-#{$name} { margin-right: $size; }
  .mb-#{$name} { margin-bottom: $size; }
  .ml-#{$name} { margin-left: $size; }
  
  .p-#{$name} { padding: $size; }
  .pt-#{$name} { padding-top: $size; }
  .pr-#{$name} { padding-right: $size; }
  .pb-#{$name} { padding-bottom: $size; }
  .pl-#{$name} { padding-left: $size; }
}

Grid system:
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
  
  .offset-#{$i} {
    margin-left: percentage($i / 12);
  }
}

Responsive breakpoints:
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@each $name, $width in $breakpoints {
  @media (min-width: $width) {
    @for $i from 1 through 12 {
      .col-#{$name}-#{$i} {
        width: percentage($i / 12);
      }
    }
  }
}

Z-index scale:
$z-layers: (
  modal: 1000,
  dropdown: 100,
  header: 50,
  default: 1,
  below: -1
);

@each $name, $value in $z-layers {
  .z-#{$name} {
    z-index: $value;
  }
}

Font sizes:
@for $i from 1 through 6 {
  h#{$i} {
    font-size: 3rem - ($i * 0.3rem);
    margin-bottom: 1rem;
  }
}

Button states:
$button-states: (
  default: (bg: #3498db, hover: #2980b9),
  success: (bg: #2ecc71, hover: #27ae60),
  danger: (bg: #e74c3c, hover: #c0392b),
  warning: (bg: #f39c12, hover: #e67e22)
);

@each $state, $colors in $button-states {
  .button-#{$state} {
    background: map-get($colors, bg);
    
    &:hover {
      background: map-get($colors, hover);
    }
  }
}

Combining functions and loops:

@function get-color($name) {
  $colors: (
    primary: #3498db,
    secondary: #2ecc71
  );
  @return map-get($colors, $name);
}

$variants: primary, secondary;

@each $variant in $variants {
  .button-#{$variant} {
    background: get-color($variant);
    
    &:hover {
      background: darken(get-color($variant), 10%);
    }
  }
}

Best practices:

Functions:
1. Return single value
2. Name descriptively
3. Add error checking
4. Document parameters
5. Keep pure (no side effects)

Loops:
1. Use @each for lists/maps
2. Use @for for numerical ranges
3. Avoid @while (usually unnecessary)
4. Don't over-generate
5. Consider file size
6. Comment complex loops

Performance:
1. Generate only needed classes
2. Avoid excessive loops
3. Consider if CSS custom properties better
4. Test compiled output size
5. Use with caution in production

Modern alternatives [web:73]:
Native CSS is adding features that reduce need for preprocessor functions and loops, but 
they're still valuable for build-time generation [web:73].
*/


/**
84. What is the BEM naming methodology (Block, Element, Modifier)? [web:82][web:85]

BEM is a popular CSS naming convention that helps create reusable components and maintain 
scalable, organized code [web:82][web:85].

Definition [web:85]:
BEM (Block Element Modifier) is a methodology that helps achieve reusable components and 
code sharing in front-end development [web:85].

Three parts of BEM:

1. Block:
Independent, reusable component [web:83]

Naming: .block-name

Examples:
.header
.nav
.button
.card
.form
.menu

HTML:
<div class="card">
  <!-- Card content -->
</div>

CSS:
.card {
  background: white;
  border: 1px solid #ddd;
  padding: 20px;
}

2. Element [web:83]:
Parts of a block that have no standalone meaning [web:83]

Naming: .block__element

Examples:
.card__header
.card__body
.card__footer
.nav__item
.nav__link
.button__icon

HTML:
<div class="card">
  <div class="card__header">
    <h2 class="card__title">Title</h2>
  </div>
  <div class="card__body">
    <p class="card__text">Content</p>
  </div>
  <div class="card__footer">
    <button class="card__button">Click</button>
  </div>
</div>

CSS:
.card__header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.card__title {
  font-size: 24px;
  margin: 0;
}

.card__body {
  padding: 15px 0;
}

.card__footer {
  border-top: 1px solid #eee;
  padding-top: 10px;
}

3. Modifier:
Flags that change appearance, behavior, or state [web:83]

Naming: .block--modifier or .block__element--modifier

Examples:
.button--primary
.button--large
.card--featured
.card__title--large
.nav__link--active

HTML:
<button class="button button--primary">Primary</button>
<button class="button button--secondary">Secondary</button>
<button class="button button--large">Large Button</button>

<div class="card card--featured">
  <h2 class="card__title card__title--large">Featured</h2>
</div>

CSS:
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

.button--primary {
  background: blue;
  color: white;
}

.button--secondary {
  background: gray;
  color: white;
}

.button--large {
  padding: 15px 30px;
  font-size: 18px;
}

Real-world BEM examples:

Navigation menu:
<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item">
      <a class="nav__link nav__link--active" href="#">Home</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">About</a>
    </li>
    <li class="nav__item nav__item--highlighted">
      <a class="nav__link" href="#">Featured</a>
    </li>
  </ul>
</nav>

CSS:
.nav {
  background: white;
  border-bottom: 1px solid #ddd;
}

.nav__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav__item {
  padding: 0 10px;
}

.nav__item--highlighted {
  background: yellow;
}

.nav__link {
  color: #333;
  text-decoration: none;
  padding: 10px 15px;
  display: block;
}

.nav__link--active {
  color: blue;
  font-weight: bold;
}

Form component:
<form class="form form--login">
  <div class="form__group">
    <label class="form__label">Email</label>
    <input class="form__input" type="email">
  </div>
  
  <div class="form__group form__group--error">
    <label class="form__label">Password</label>
    <input class="form__input form__input--invalid" type="password">
    <span class="form__error">Password is required</span>
  </div>
  
  <button class="form__submit form__submit--primary">Login</button>
</form>

CSS:
.form {
  max-width: 400px;
}

.form--login {
  background: white;
  padding: 30px;
}

.form__group {
  margin-bottom: 20px;
}

.form__group--error {
  border-left: 3px solid red;
  padding-left: 10px;
}

.form__label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form__input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
}

.form__input--invalid {
  border-color: red;
}

.form__error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.form__submit {
  padding: 10px 20px;
  border: none;
}

.form__submit--primary {
  background: blue;
  color: white;
}

BEM with preprocessors [web:82]:

SCSS makes BEM more readable [web:82]:

.card {
  border: 1px solid #ddd;
  
  &__header {
    background-color: #f8f9fa;
    
    &__title {
      font-size: 18px;
    }
  }
  
  &__body {
    padding: 15px;
  }
  
  &__button {
    background-color: #007bff;
    
    &--secondary {
      background-color: #6c757d;
    }
  }
}

Compiles to:
.card { border: 1px solid #ddd; }
.card__header { background-color: #f8f9fa; }
.card__header__title { font-size: 18px; }
.card__body { padding: 15px; }
.card__button { background-color: #007bff; }
.card__button--secondary { background-color: #6c757d; }

BEM principles [web:81]:

1. Don't use ID selectors or tag selectors [web:81]

Bad:
#header { }
div.card { }

Good:
.header { }
.card { }

2. Minimize nested selectors [web:81]

Bad:
.card .card__header .card__title { }

Good:
.card__title { }

3. Use consistent naming [web:81]

4. Work in terms of blocks, elements, modifiers [web:81]

5. Reuse blocks [web:81]

Advantages of BEM [web:82]:

1. Clear component structure [web:82]:
Easy to understand relationships

2. Reduced specificity issues [web:82]:
All selectors same specificity (single class) [web:82]

Research shows 62% fewer specificity-related bugs with BEM [web:82]

3. Reusable components:
Blocks are independent

4. Scalability:
Works well for large projects [web:82]

5. Self-documenting:
Names explain purpose

6. No nesting conflicts:
Unique class names prevent collisions

7. Easy to maintain:
Clear naming makes updates simpler

Common BEM patterns:

State modifiers:
.button--disabled
.nav__link--active
.card--loading
.form__input--focused

Size modifiers:
.button--small
.button--medium
.button--large
.card--compact
.card--expanded

Variant modifiers:
.button--primary
.button--secondary
.button--danger
.alert--success
.alert--warning
.alert--error

Best practices:

1. Keep elements one level deep:
   .card__header__title // Don't do this
   .card-header__title  // Better (separate block)

2. Don't chain modifiers:
   .button.button--primary.button--large // Works but verbose
   Better: Create .button--primary-large if needed

3. Use meaningful names:
   .btn__txt // Bad
   .button__text // Good

4. Don't overuse modifiers:
   Sometimes a new block is better

5. Elements belong to blocks:
   Can't reuse .card__title outside .card context

6. Modifiers always paired with base:
   class="button button--primary" // Correct
   class="button--primary" // Wrong

Limitations:

1. Verbose class names:
   .navigation__list-item__link--active

2. Long HTML:
   Multiple classes per element

3. Not always intuitive:
   Learning curve for new developers

4. Can be over-engineered:
   Simple sites may not need BEM

When to use BEM:

Good for:
- Large applications
- Component libraries
- Teams with multiple developers
- Long-term maintainability

Consider alternatives for:
- Small projects
- Rapid prototyping
- Personal sites
*/


/**
85. What is the difference between OOCSS, SMACSS, and BEM? [web:86]

These are different CSS methodologies for organizing and structuring stylesheets [web:86].

OOCSS (Object-Oriented CSS) [web:86]:

Principles:
1. Separate structure from skin [web:86]
2. Separate container from content

Separate structure from skin:
Structure: Layout, positioning
Skin: Visual styling (colors, fonts)

Example [web:86]:
<!-- Structure -->
.button {
  padding: 10px 20px;
  display: inline-block;
  border: none;
}

<!-- Skin -->
.button--primary {
  background: blue;
  color: white;
}

.button--secondary {
  background: gray;
  color: white;
}

HTML:
<button class="button button--primary">Primary</button>
<button class="button button--secondary">Secondary</button>

Separate container from content:
Don't depend on location

Bad:
.sidebar .widget {
  width: 100px;
}

Good:
.widget {
  width: 100px;
}

Can use widget anywhere, not just in sidebar

Advantages [web:86]:
- High reusability [web:86]
- Reduces redundancy
- Maintainable

Use cases [web:86]:
Projects requiring high reusability [web:86]

Example:
.media {
  display: flex;
}

.media__img {
  margin-right: 10px;
}

.media__body {
  flex: 1;
}

Can reuse for comments, articles, profiles, etc.


SMACSS (Scalable and Modular Architecture for CSS) [web:86]:

Categories of styles [web:86]:

1. Base:
Default element styles

html, body {
  margin: 0;
  padding: 0;
}

h1 { font-size: 2rem; }
a { color: blue; }

2. Layout:
Major page sections (prefix: l-)

.l-header { }
.l-sidebar { }
.l-footer { }
.l-container { }

3. Module:
Reusable components (no prefix)

.card { }
.button { }
.nav { }
.form { }

4. State:
How things look in different states (prefix: is-, has-)

.is-active { }
.is-hidden { }
.is-collapsed { }
.has-error { }

5. Theme:
Typography, colors (prefix: theme-)

.theme-dark { }
.theme-light { }

Example SMACSS structure:

/ * Base * /
body {
  font-family: Arial;
  line-height: 1.6;
}

/ * Layout * /
.l-container {
  max-width: 1200px;
  margin: 0 auto;
}

.l-sidebar {
  width: 300px;
  float: left;
}

/ * Module * /
.card {
  background: white;
  border: 1px solid #ddd;
}

.card-title {
  font-size: 20px;
}

/ * State * /
.is-hidden {
  display: none;
}

.card.is-active {
  border-color: blue;
}

/ * Theme * /
.theme-dark .card {
  background: #333;
  color: white;
}

Advantages [web:86]:
- Flexible [web:86]
- Good for categorizing
- Clear organization

Disadvantages [web:86]:
- Less prescriptive than BEM [web:86]
- Can lead to inconsistency [web:86]


BEM (Block Element Modifier) [web:85]:

Structure [web:86]:
Block, Element, Modifier [web:86]

.block { }
.block__element { }
.block--modifier { }
.block__element--modifier { }

Example:
.card { }
.card__header { }
.card__title { }
.card__body { }
.card--featured { }
.card__title--large { }

Advantages [web:86]:
- Clear naming conventions
- Excellent for large projects [web:86]
- Reduces specificity issues

Disadvantages [web:86]:
- Can be verbose [web:86]
- Long class names


Comparison table [web:86]:

Feature        | BEM           | OOCSS          | SMACSS
---------------|---------------|----------------|------------------
Structure      | Block/Element/Modifier | Separate structure/skin | Categories
Naming         | .block__element--modifier | .object .object-modifier | .l-, .is-, etc.
Reusability    | High          | High [web:86]  | Moderate [web:86]
Learning curve | Moderate      | Moderate       | Moderate
Verbosity      | High          | Low            | Medium
Specificity    | Single class  | Multiple classes | Varies
Best for       | Large projects| Reusable patterns | Mixed approach

Strengths and weaknesses [web:86]:

BEM [web:86]:
Strengths: Clear conventions, great for large projects [web:86]
Weaknesses: Verbose [web:86]

OOCSS [web:86]:
Strengths: Modularity, reusability [web:86]
Weaknesses: Mindset shift required [web:86]

SMACSS [web:86]:
Strengths: Flexibility [web:86]
Weaknesses: Less prescriptive, potential inconsistency [web:86]

Real-world comparison:

Button component:

BEM:
<button class="button button--primary button--large">
  <span class="button__icon"></span>
  <span class="button__text">Click me</span>
</button>

.button { }
.button--primary { }
.button--large { }
.button__icon { }
.button__text { }

OOCSS:
<button class="btn btn-primary btn-lg">
  <span class="btn-icon"></span>
  <span class="btn-text">Click me</span>
</button>

.btn { / * structure * / }
.btn-primary { / * skin * / }
.btn-lg { / * skin * / }

SMACSS:
<button class="button button-primary is-large">
  <span class="button-icon"></span>
  <span class="button-text">Click me</span>
</button>

.button { / * module * / }
.button-primary { / * module variant * / }
.is-large { / * state * / }

Combining approaches [web:82]:

Many teams use hybrid approaches [web:82]:

Base (SMACSS) → Objects (OOCSS with BEM) → Components (BEM) → Utilities [web:82]

Example:
/ * Base * /
html { font-size: 16px; }

/ * Objects (OOCSS) * /
.media { display: flex; }
.media__img { margin-right: 10px; }

/ * Components (BEM) * /
.card { background: white; }
.card__header { }
.card--featured { }

/ * Utilities * /
.u-text-center { text-align: center; }
.u-mt-2 { margin-top: 16px; }

Choosing the right methodology [web:86]:

Use BEM if:
- Large, complex project
- Multiple developers
- Need strict naming
- Component-focused

Use OOCSS if:
- High reusability needed
- Building design system
- Multiple similar components
- Semantic approach

Use SMACSS if:
- Need flexibility
- Mixed team preferences
- Gradual adoption
- Category-based thinking

Use hybrid if:
- Want best of all
- Large team with varied needs
- Evolving project
*/


/**
86. What are utility classes and when should you use them? [web:87][web:90]

Utility classes are single-purpose CSS classes that do one thing [web:87][web:90].

Definition [web:87]:
Utility classes apply a single style rule transparently named [web:87].

Examples:

Basic utilities:
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.float-left { float: left; }
.float-right { float: right; }
.clearfix::after { clear: both; }

.hidden { display: none; }
.block { display: block; }
.flex { display: flex; }

.mt-1 { margin-top: 4px; }
.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 16px; }

.p-1 { padding: 4px; }
.p-2 { padding: 8px; }
.p-3 { padding: 16px; }

Color utilities:
.text-primary { color: #3498db; }
.text-secondary { color: #2ecc71; }
.text-danger { color: #e74c3c; }

.bg-white { background: white; }
.bg-gray { background: #f5f5f5; }
.bg-dark { background: #333; }

Usage example:

<div class="flex justify-center items-center p-4 bg-gray">
  <div class="text-center mt-3">
    <h1 class="text-2xl font-bold text-primary">Title</h1>
    <p class="text-sm text-gray mt-2">Description</p>
  </div>
</div>

Advantages of utility classes [web:87]:

1. DRY (Don't Repeat Yourself) [web:87]:
Apply .float-left everywhere instead of repeating float: left; [web:87]

2. Consistency [web:87]:
Reuse color utilities ensures consistent design [web:87]

3. No new CSS:
New patterns can be built with existing utilities [web:87]

4. Rapid development:
Faster than writing custom CSS

5. Smaller CSS file:
Reuse instead of duplication

6. Predictable:
Know exactly what each class does

Disadvantages [web:87]:

1. Less semantic HTML [web:87]:
Class names don't reflect component relationships [web:87]

2. Repetition in HTML [web:87]:
Same classes repeated across elements [web:87]

3. HTML bloat:
Many classes per element

4. Harder to read:
Long class strings

5. Global dependencies [web:87]:
Changing utility affects all usage [web:87]

6. Breaks separation of concerns:
Styling in markup

Utility classes vs component classes [web:87]:

Component classes [web:87]:
.button {
  padding: 10px 20px;
  background: blue;
  color: white;
  border: none;
  border-radius: 4px;
}

<button class="button">Click me</button>

Utility classes [web:87]:
.px-4 { padding-left: 16px; padding-right: 16px; }
.py-2 { padding-top: 8px; padding-bottom: 8px; }
.bg-blue { background: blue; }
.text-white { color: white; }
.border-none { border: none; }
.rounded { border-radius: 4px; }

<button class="px-4 py-2 bg-blue text-white border-none rounded">
  Click me
</button>

Comparison [web:87]:

Aspect                  | Component classes      | Utility classes
------------------------|------------------------|------------------
Implementation          | New CSS per pattern    | Existing classes [web:87]
Maintenance location    | In stylesheets         | In HTML [web:87]
Repetition              | In CSS [web:87]        | In HTML [web:87]
Scope                   | Component-scoped       | Global [web:87]
Class names             | Semantic [web:87]      | Descriptive [web:87]
Changes affect          | One component          | All usage [web:87]

When to use utility classes [web:87]:

Good use cases [web:87]:

1. Common patterns:
Spacing, text alignment, colors used everywhere

2. Prototyping:
Rapid UI development

3. One-off adjustments:
Small tweaks without new CSS

4. Design system:
Consistent spacing/colors

5. Responsive utilities:
.hidden-mobile, .block-desktop

6. Helper classes:
.clearfix, .sr-only (screen reader only)

Avoid utilities for [web:87]:

1. Unique patterns [web:87]:
Don't plan to reuse exact same way [web:87]

2. Complex components:
Component classes better

3. When filesize critical [web:87]:
Can increase HTML size [web:87]

4. Semantic importance:
When component names add value [web:87]

Best practices [web:87]:

1. Use for systematic patterns:
Spacing, colors, typography

2. Combine with components:
Use both approaches

3. Document utilities:
Especially in large projects

4. Use naming conventions:
Consistent prefixes (u-, .is-, etc.)

5. Consider build tools:
PurgeCSS to remove unused

6. Don't abuse:
Not everything needs utilities

Modern utility-first frameworks:

Tailwind CSS [web:86]:
Complete utility-first framework [web:86]

<div class="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
  <h1 class="text-2xl font-bold text-gray-800">Title</h1>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Button
  </button>
</div>

Advantages [web:86]:
- High customization [web:86]
- Rapid styling [web:86]
- Very high reusability [web:86]

Disadvantages [web:86]:
- Learning curve [web:86]
- Requires learning specific classes [web:86]

Hybrid approach (recommended) [web:87]:

Combine component and utility classes:

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
}

<div class="card p-4 mb-3">
  <h2 class="text-lg font-bold mb-2">Card Title</h2>
  <p class="text-sm text-gray">Card content</p>
  <div class="flex justify-end mt-3">
    <button class="btn btn-primary">Action</button>
  </div>
</div>

Benefits:
- Semantic component names
- Flexible spacing with utilities
- Best of both worlds

Utility class organization:

Spacing scale:
.m-0 { margin: 0; }
.m-1 { margin: 4px; }
.m-2 { margin: 8px; }
.m-3 { margin: 16px; }
.m-4 { margin: 24px; }

.mt-1 { margin-top: 4px; }
.mr-1 { margin-right: 4px; }
.mb-1 { margin-bottom: 4px; }
.ml-1 { margin-left: 4px; }

.mx-1 { margin-left: 4px; margin-right: 4px; }
.my-1 { margin-top: 4px; margin-bottom: 4px; }

Typography:
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 24px; }

.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-bold { font-weight: 700; }

Layout:
.flex { display: flex; }
.grid { display: grid; }
.block { display: block; }
.inline { display: inline; }
.hidden { display: none; }

.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

Performance consideration:

With utilities, HTML grows but CSS stays small.
With components, CSS grows but HTML stays small.

Choose based on project needs.
*/


/**
87. What is CSS architecture and why is it important for maintainability?

CSS architecture is the organization and structure of stylesheets for maintainable, 
scalable projects.

Definition:
CSS architecture refers to the approach, methodology, and file structure used to organize 
and maintain CSS code across a project.

Why CSS architecture matters:

1. Maintainability:
Easy to find and update styles

Without structure:
/ * 10,000 lines of CSS in one file *c/
.button { } / * Where is this? * /
.blue-button { } / * Is this used? * /
div.content p.text { } / * Too specific! * /

With structure:
components/
  _buttons.scss
  _cards.scss
  _forms.scss

2. Scalability:
Handle growing projects

Poor architecture:
- One massive file
- No organization
- Duplicate code
- Hard to add features

Good architecture:
- Modular files
- Clear structure
- Reusable components
- Easy to extend

3. Team collaboration:
Multiple developers can work simultaneously

Clear structure:
components/
  _header.scss    ← Developer A
  _footer.scss    ← Developer B
  _sidebar.scss   ← Developer C

4. Performance:
Organized code is easier to optimize

5. Consistency:
Enforces design patterns

6. Debugging:
Easier to locate and fix issues

7. Reusability:
Components can be reused across project

8. Reduces specificity wars:
Structured approach prevents conflicts

Key principles of CSS architecture:

1. Modularity:
Break into small, focused files

Bad:
styles.css (5000 lines)

Good:
base/
  _reset.scss
  _typography.scss
components/
  _buttons.scss
  _cards.scss
layout/
  _header.scss
  _footer.scss

2. Reusability:
Create reusable components

.button {
  / * Base button styles * /
}

.button--primary { / * Reusable variant * / }
.button--secondary { / * Reusable variant * / }

3. Predictability:
Consistent naming and patterns

// Predictable naming
.card { }
.card__header { }
.card__body { }

// Predictable structure
all components in components/
all layouts in layout/

4. Low specificity:
Avoid overly specific selectors

Bad:
body div.container section#main article.post p.text { }

Good:
.post-text { }

5. Separation of concerns:
Structure, layout, skin separated

6. DRY (Don't Repeat Yourself):
Variables, mixins for shared values

Common CSS architectures:

1. ITCSS (Inverted Triangle CSS):

Layers from generic to specific:
settings → tools → generic → elements → objects → components → utilities

settings/
  _variables.scss
  _colors.scss
tools/
  _mixins.scss
  _functions.scss
generic/
  _reset.scss
  _box-sizing.scss
elements/
  _typography.scss
  _links.scss
objects/
  _container.scss
  _grid.scss
components/
  _buttons.scss
  _cards.scss
utilities/
  _spacing.scss
  _text.scss

Benefits:
- Manages specificity naturally
- Clear hierarchy
- Scales well

2. Atomic Design:

Hierarchy: Atoms → Molecules → Organisms → Templates → Pages

atoms/
  _buttons.scss
  _inputs.scss
  _labels.scss
molecules/
  _form-field.scss
  _search-bar.scss
organisms/
  _header.scss
  _form.scss
templates/
  _page-layout.scss
pages/
  _home.scss
  _about.scss

3. 7-1 Pattern:

7 folders, 1 main file:

sass/
  abstracts/
    _variables.scss
    _mixins.scss
  base/
    _reset.scss
    _typography.scss
  components/
    _buttons.scss
    _cards.scss
  layout/
    _header.scss
    _footer.scss
  pages/
    _home.scss
    _about.scss
  themes/
    _dark.scss
    _light.scss
  vendors/
    _bootstrap.scss
  main.scss  ← imports all

main.scss:
@import 'abstracts/variables';
@import 'abstracts/mixins';
@import 'base/reset';
@import 'base/typography';
@import 'layout/header';
@import 'layout/footer';
@import 'components/buttons';
@import 'components/cards';
@import 'pages/home';

File organization strategies:

By component type:
components/
  buttons/
    _button.scss
    _button-group.scss
  cards/
    _card.scss
    _card-grid.scss
  forms/
    _input.scss
    _select.scss

By feature:
features/
  auth/
    _login-form.scss
    _signup-form.scss
  dashboard/
    _dashboard-header.scss
    _dashboard-sidebar.scss

By page:
pages/
  _home.scss
  _about.scss
  _contact.scss

Naming conventions:

Files:
_variables.scss (partial)
_mixins.scss (partial)
main.scss (entry point)

Classes:
Use methodology (BEM, OOCSS, etc.)

Variables:
$color-primary
$spacing-unit
$breakpoint-md

Mixins:
@mixin button-style
@mixin respond-to

Best practices:

1. Use preprocessor:
SASS/SCSS for organization

2. Follow a methodology:
BEM, OOCSS, SMACSS, or hybrid

3. Document your code:
Comments for complex sections

4. Use variables:
Design tokens for consistency

5. Create style guide:
Document components and usage

6. Lint your CSS:
Enforce standards

7. Use build tools:
Automate compilation, minification

8. Keep files small:
Max 200-300 lines per file

9. Avoid deep nesting:
Max 3-4 levels

10. Review regularly:
Refactor and optimize

Common pitfalls:

1. No structure:
Everything in one file

2. Over-nesting:
.nav ul li a span { } (too specific)

3. No naming convention:
Inconsistent class names

4. Duplicate code:
Not using variables/mixins

5. Global namespace pollution:
No component isolation

6. Tight coupling:
Components depend on location

7. Magic numbers:
Hardcoded values without explanation

8. No documentation:
Hard for others to understand

Architecture checklist:

✓ Clear file structure
✓ Naming convention chosen
✓ Variables for design tokens
✓ Mixins for reusable patterns
✓ Components are modular
✓ Low specificity
✓ Minimal nesting
✓ Documented code
✓ Linting configured
✓ Build process setup

Benefits of good architecture:

1. Faster development
2. Easier maintenance
3. Better collaboration
4. Fewer bugs
5. Consistent design
6. Better performance
7. Easier testing
8. Smoother onboarding
9. Reduced technical debt
10. Higher quality code
*/


/**
88. How do you avoid CSS specificity wars? [web:82]

Specificity wars occur when selectors compete to apply styles, causing conflicts and 
requiring increasingly specific selectors [web:82].

Understanding specificity:

Specificity calculation:
Inline styles: 1,0,0,0
IDs: 0,1,0,0
Classes, attributes, pseudo-classes: 0,0,1,0
Elements, pseudo-elements: 0,0,0,1

Examples:
div { }                    → 0,0,0,1
.button { }                → 0,0,1,0
#header { }                → 0,1,0,0
div.button { }             → 0,0,1,1
#header .button { }        → 0,1,1,0
style="color: red"         → 1,0,0,0

Specificity war example:

.button {
  background: blue;  / * 0,0,1,0 * /
}

/ * Later in code, tries to override * /
.button {
  background: red;  / * 0,0,1,0 - doesn't work, same specificity * /
}

/ * Developer increases specificity * /
.header .button {
  background: red;  / * 0,0,2,0 - works! * /
}

/ * Another developer needs to override * /
#main .header .button {
  background: green;  / * 0,1,2,0 - works! * /
}

/ * Gets worse... * /
body #main .header .button {
  background: yellow;  / * 0,1,2,1 - works! * /
}

/ * Eventually... * /
div#main .header .button {
  background: orange !important;  / * Nuclear option! * /
}

This is a specificity war - bad!

Strategies to avoid specificity wars:

1. Use single class selectors [web:81]:

Bad:
.nav ul li a { }  / * 0,0,1,3 * /

Good:
.nav__link { }  / * 0,0,1,0 * /

BEM keeps all selectors at same specificity (single class) [web:82]

2. Avoid IDs for styling [web:81]:

Bad:
#header { }  / * 0,1,0,0 - too specific! * /

Good:
.header { }  / * 0,0,1,0 * /

IDs for JavaScript/anchors only:
<div id="main-nav" class="nav">

/ * Style with class * /
.nav { }

3. Don't use !important:

Bad:
.button {
  background: blue !important;  / * Nuclear option * /
}

Good:
.button {
  background: blue;
}

Only use !important for:
- Utility classes that must override
- Third-party overrides (last resort)

4. Minimize nesting [web:81]:

Bad:
.header {
  .nav {
    ul {
      li {
        a {  / * Too nested! * /
          color: blue;
        }
      }
    }
  }
}

Good:
.nav__link {
  color: blue;
}

Rule: Max 3-4 levels deep

5. Follow a naming methodology:

BEM [web:82]:
All single class selectors = same specificity [web:82]

.block { }           / * 0,0,1,0 * /
.block__element { }  / * 0,0,1,0 * /
.block--modifier { } / * 0,0,1,0 * /

No conflicts!

6. Use classes for everything:

Not elements or IDs:
p { }           / * 0,0,0,1 * /
#sidebar { }    / * 0,1,0,0 * /

Use classes:
.text { }       / * 0,0,1,0 * /
.sidebar { }    / * 0,0,1,0 * /

7. Avoid descendant selectors:

Bad:
.sidebar .widget .title { }  / * 0,0,3,0 * /

Good:
.widget__title { }  / * 0,0,1,0 * /

8. Use specific class names:

Instead of location-dependent:

Bad:
.sidebar .button { }  / * Depends on location * /

Good:
.button--small { }  / * Describes itself * /

9. Layer with specificity in mind:

Base layer (lowest specificity):
p { color: black; }  / * 0,0,0,1 * /

Component layer:
.text { color: gray; }  / * 0,0,1,0 * /

Utility layer (can be higher):
.text-center { text-align: center !important; }  / * Intentional * /

10. Use CSS custom properties:

Instead of overriding:

Bad:
.button { background: blue; }
.header .button { background: red; }  / * Specificity increase * /

Good:
.button {
  background: var(--button-bg, blue);
}

.header {
  --button-bg: red;  / * Override variable * /
}

Specificity-safe patterns:

Modifier pattern:
.button { background: blue; }
.button--primary { background: red; }  / * Same specificity * /
.button--secondary { background: gray; }

<button class="button button--primary">

State pattern:
.button { background: blue; }
.button.is-active { background: red; }  / * 0,0,2,0 - intentional * /

Context with CSS variables:
.theme-dark {
  --button-bg: #333;
  --button-color: white;
}

.button {
  background: var(--button-bg, blue);
  color: var(--button-color, white);
}

Architectural approaches:

ITCSS (Inverted Triangle):
Organizes CSS by specificity

Low specificity:
settings (variables)
tools (mixins)
generic (resets)
elements (h1, p, a)

Medium specificity:
objects (.media, .layout)
components (.button, .card)

High specificity:
utilities (.text-center !important)

This prevents specificity conflicts by design

Tools to help:

1. CSS Specificity Calculator:
Check selector specificity

2. Stylelint:
Lint rules to limit specificity

// .stylelintrc
{
  "rules": {
    "selector-max-id": 0,  // No IDs
    "selector-max-specificity": "0,2,0",  // Max specificity
    "selector-max-compound-selectors": 3  // Max nesting
  }
}

3. Browser DevTools:
Inspect which rules are overriding

Real-world example:

Without strategy (specificity war):
.button { background: blue; }  / * 0,0,1,0 * /
.nav .button { background: red; }  / * 0,0,2,0 * /
.header .nav .button { background: green; }  / * 0,0,3,0 * /
#main .header .nav .button { background: yellow; }  / * 0,1,3,0 * /

With BEM strategy (no war):
.button { background: blue; }  / * 0,0,1,0 * /
.button--nav { background: red; }  / * 0,0,1,0 * /
.button--header { background: green; }  / * 0,0,1,0 * /

All same specificity, order matters or use modifiers

Quick fixes for existing wars:

1. Refactor to single classes:
.header__button instead of .header .button

2. Use :where() for zero specificity:
:where(.button) { }  / * 0,0,0,0 * /

3. Use :is() carefully:
:is(.header, .footer) .button { }  / * Takes highest specificity * /

4. Layer with @layer (CSS Cascade Layers):
@layer base {
  .button { background: blue; }
}

@layer components {
  .button { background: red; }  / * Overrides base * /
}

Prevention checklist:

✓ Use classes, not IDs
✓ Single class selectors
✓ Follow BEM or similar
✓ Avoid deep nesting
✓ No !important (except utilities)
✓ Document exceptions
✓ Use linting rules
✓ Review selectors regularly
✓ Train team on specificity
✓ Use CSS custom properties

*/


/**
89. How does CSS affect page performance?

CSS significantly impacts page performance at multiple stages of page loading and rendering.

Performance impact areas:

1. File size and download time:

Large CSS files slow download:
- Bigger CSS = longer download time
- More HTTP requests = slower
- Blocks rendering until downloaded

Bad:
styles.css (500KB) - takes 2-3 seconds on slow connection

Good:
main.css (50KB) - loads quickly
Minified and compressed

Optimization:
- Minify CSS (remove whitespace, comments)
- Compress with gzip/brotli
- Remove unused CSS
- Split into multiple files strategically

2. Render-blocking [web:95][web:96]:

CSS blocks page rendering [web:95][web:96]
Browser waits for CSS before painting [web:95]

Without CSS optimization:
Download HTML → Download ALL CSS → Parse → Render
(2-3 seconds delay) [web:95]

With optimization:
Download HTML → Inline critical CSS → Render visible content → Load rest
(Instant rendering) [web:95]

3. Parser performance:

Complex selectors slow parsing:

Slow:
div > ul > li > a:nth-child(3) { }
.nav .dropdown .menu .item .link { }

Fast:
.nav-link { }
.menu-item { }

4. Layout calculations:

Expensive properties trigger reflows:
- width, height changes
- padding, margin changes
- position changes
- display changes

These force browser to recalculate entire layout

5. Paint performance:

Some properties are expensive to paint:
- box-shadow with large blur
- Large gradients
- Complex clip-paths
- Filter effects

6. Memory usage:

Excessive CSS rules consume memory:
- Large stylesheets
- Many unused rules
- Complex selectors

Performance metrics affected by CSS:

1. First Contentful Paint (FCP) [web:92][web:95]:
Time until first content renders [web:92]
Blocked by CSS [web:95]

Impact: 47% of users expect page load in 2 seconds [web:95]

2. Largest Contentful Paint (LCP) [web:95]:
Time until largest content element renders [web:95]
Critical CSS optimization accelerates LCP [web:95]

3. Time to Interactive (TTI):
CSS parsing delays interactivity

4. Cumulative Layout Shift (CLS):
Improper CSS causes layout shifts

Real-world performance issues:

Issue 1: Render-blocking CSS
Problem:
<head>
  <link rel="stylesheet" href="styles.css"> <!-- 500KB, blocks rendering -->
</head>

Solution:
<head>
  <style>
    / * Inline critical CSS (5-10KB) * /
    .header { background: white; }
    .hero { height: 600px; }
  </style>
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>

Issue 2: Unused CSS
Problem:
// Loading entire Bootstrap (200KB)
// Only using 10% of it

Solution:
// Use only needed components
// Or use PurgeCSS to remove unused

Issue 3: Complex selectors
Problem:
.nav ul li:nth-child(odd) a[href^="http"]:hover { }

Solution:
.nav-link--odd:hover { }

Issue 4: Excessive rules
Problem:
// 10,000 rules in one file
// Browser parses all even if unused

Solution:
// Split into modules
// Load only what's needed

CSS optimization techniques:

1. Minimize file size:
- Minify CSS
- Remove unused rules
- Use shorthand properties
- Compress with gzip/brotli

Before minification:
.button {
  margin-top: 10px;
  margin-right: 15px;
  margin-bottom: 10px;
  margin-left: 15px;
}

After minification:
.button{margin:10px 15px}

2. Reduce complexity:
- Simplify selectors
- Avoid deep nesting
- Use classes not tags

3. Split strategically:
- Critical CSS inline
- Above-the-fold CSS priority
- Below-the-fold lazy load

4. Use efficient properties:
- transform instead of left/top
- opacity instead of visibility
- will-change for animations

5. Avoid expensive operations:
- Limit box-shadow blur
- Reduce gradient complexity
- Minimize filter usage

6. Leverage caching:
- Set long cache headers
- Use content-based naming (styles.a1b2c3.css)
- Cache-bust on changes

Performance measurement:

Use browser DevTools:
1. Network tab → CSS download time
2. Performance tab → Parse time
3. Lighthouse → CSS metrics

Lighthouse checks:
- Eliminate render-blocking resources [web:96]
- Remove unused CSS
- Minify CSS
- Defer non-critical CSS

Real-world impact:

Before optimization:
- FCP: 3.2s
- LCP: 4.5s
- CSS: 500KB
- Render-blocking: Yes

After optimization:
- FCP: 0.8s [web:95]
- LCP: 1.2s [web:95]
- CSS: 50KB (critical inline)
- Render-blocking: No [web:95]

Result: 53% users won't abandon page [web:95]
*/


/**
90. What are critical CSS and above-the-fold CSS? [web:91][web:92][web:93]

Critical CSS is the minimal CSS needed to render visible content without scrolling 
[web:91][web:93].

Definition [web:93]:
Critical CSS is the minimal set of Cascading Style Sheets (CSS) needed for above-the-fold 
content [web:93].

Above-the-fold [web:92][web:95]:
Content visible in the viewport without scrolling [web:92][web:95]
First 600-800px of page typically [web:95]

Visual example:

┌─────────────────────┐
│     HEADER          │ ← Above the fold
│                     │   (Critical CSS needed)
│     HERO            │
│                     │
├─────────────────────┤ ← Fold line
│                     │
│     CONTENT         │ ← Below the fold
│                     │   (Non-critical CSS)
│     FOOTER          │
└─────────────────────┘

Why critical CSS matters [web:91][web:93][web:95]:

1. Faster rendering [web:93]:
Eliminates render-blocking [web:95]
Content displays immediately [web:95]

2. Better user experience [web:93]:
Improves perceived speed [web:93]
Reduces bounce rate [web:95]

Statistics [web:95]:
- 47% expect page load in 2 seconds [web:95]
- 53% abandon if >3 seconds [web:95]

3. Improved Core Web Vitals [web:95]:
- Better FCP (First Contentful Paint) [web:95]
- Better LCP (Largest Contentful Paint) [web:95]
- Reduced layout shifts [web:95]

4. SEO benefits:
Google rewards fast pages

How critical CSS works [web:91][web:92]:

Traditional approach (slow):
1. Download HTML
2. Find <link rel="stylesheet"> tag
3. Download entire CSS file (200KB+)
4. Parse all CSS
5. Render page
Total: 2-3 seconds [web:95]

Critical CSS approach (fast) [web:91]:
1. Download HTML with inline critical CSS
2. Render visible content immediately
3. Load remaining CSS asynchronously
Total: 0.5-1 second [web:95]

Implementation example:

<head>
  <!-- Inline critical CSS (5-15KB) -->
  <style>
    / * Critical styles for header * /
    .header {
      background: white;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    / * Critical styles for hero * /
    .hero {
      height: 600px;
      background: linear-gradient(to right, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .hero__title {
      font-size: 48px;
      color: white;
    }
    
    / * Critical layout * /
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
  </style>
  
  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>

What to include in critical CSS [web:92][web:94]:

Essential styles [web:92][web:94]:
1. Header styles
2. Navigation (if visible)
3. Hero/banner section
4. First section of content
5. Layout structure (grid, flexbox)
6. Typography for visible text
7. Critical images/backgrounds

Don't include [web:94]:
- Footer styles
- Content below fold
- Hover states
- Animations
- Print styles
- Styles for hidden elements

Extracting critical CSS [web:95]:

Manual extraction:
1. Open page in browser
2. Identify above-the-fold elements
3. Copy relevant CSS
4. Inline in <head>

Automated tools [web:95]:

1. Penthouse [web:95]:
npm install penthouse

const penthouse = require('penthouse');

penthouse({
  url: 'https://example.com',
  css: './styles.css',
  width: 1920,
  height: 1080
}).then(criticalCss => {
  // criticalCss contains only above-fold styles
});

2. Critical (npm package) [web:95]:
npm install critical

const critical = require('critical');

critical.generate({
  base: 'dist/',
  src: 'index.html',
  target: 'index-critical.html',
  inline: true,
  width: 1920,
  height: 1080
});

3. Critters (webpack plugin) [web:95]:
const Critters = require('critters-webpack-plugin');

module.exports = {
  plugins: [
    new Critters({
      preload: 'swap'
    })
  ]
};

4. Online tools:
- Critical Path CSS Generator
- Jonas Ohlsson's Critical CSS Generator

Loading strategies [web:96]:

Strategy 1: Inline critical, async load rest [web:96]
<head>
  <style>/ * Critical CSS * /</style>
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>

Strategy 2: Media queries for async loading [web:96]
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">

Strategy 3: JavaScript-based loading
<head>
  <style>/ * Critical CSS * /</style>
  <script>
    // Load non-critical CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles.css';
    document.head.appendChild(link);
  </script>
</head>

Viewport considerations [web:95]:

Different devices have different above-the-fold areas [web:95]:

Mobile (375x667):
Smaller viewport, less critical CSS needed

Tablet (768x1024):
Medium viewport

Desktop (1920x1080):
Larger viewport, more critical CSS

Solution [web:95]:
Extract critical CSS for multiple viewports [web:95]
Or use most common (mobile-first)

Best practices [web:94][web:95]:

1. Keep critical CSS small [web:94]:
Target 14-15KB or less [web:95]
Avoids HTTP slow start issues

2. Prioritize important content [web:94]:
Header, navigation, hero section [web:94]

3. Test on real devices:
Verify what's actually visible

4. Automate extraction [web:95]:
Use build tools for consistency [web:95]

5. Update with design changes:
Re-extract when layout changes

6. Monitor performance:
Measure FCP and LCP improvements [web:95]

7. Avoid layout shifts [web:98]:
Include sizing for images/containers [web:98]

8. Use resource hints:
<link rel="preload"> for fonts, images

Common mistakes [web:98]:

1. Including too much CSS [web:98]:
Results in large inline CSS, slower HTML download

2. Missing critical styles [web:98]:
Causes FOUC (Flash of Unstyled Content)

3. Breaking responsive design [web:98]:
Forgetting media queries in critical CSS

4. Not testing thoroughly [web:98]:
Different devices show different content

Real-world example:

Before critical CSS:
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css"> <!-- 200KB, blocks rendering -->
</head>
<body>
  <header>...</header>
  <main>...</main>
</body>
</html>

Render time: 2.5 seconds
FCP: 2.5s
LCP: 3.2s

After critical CSS:
<!DOCTYPE html>
<html>
<head>
  <style>
    / * 12KB of critical CSS inlined * /
    .header { background: white; height: 80px; }
    .hero { height: 600px; background: url(hero.jpg); }
    / * ... more critical styles ... * /
  </style>
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
<body>
  <header>...</header>
  <main>...</main>
</body>
</html>

Render time: 0.8 seconds [web:95]
FCP: 0.8s [web:95]
LCP: 1.2s [web:95]

Improvement: 68% faster! [web:95]

WordPress example [web:91]:

WordPress-specific critical CSS [web:91]:
- Theme styles for header
- Navigation menu
- Featured image
- First paragraph/content

Plugins for WordPress [web:91]:
- WP Rocket (automatic critical CSS) [web:91]
- Autoptimize
- Flying Press

Performance impact [web:95][web:96]:

Before optimization [web:96]:
PageSpeed score: 31%
Render-blocking: Yes
FCP: 3.2s

After optimization [web:96]:
PageSpeed score: 41% (10% improvement) [web:96]
Render-blocking: No
FCP: 0.9s

Result: Dramatically reduced render-blocking and improved LCP [web:95]
*/


/**
91. What is CSS minification and why should unused CSS be removed?

CSS minification removes unnecessary characters and unused CSS reduces file size and 
improves performance.

CSS Minification:

Definition:
Process of removing all unnecessary characters from CSS without changing functionality.

What gets removed:
1. Whitespace (spaces, tabs, newlines)
2. Comments
3. Unnecessary semicolons
4. Redundant values
5. Color values optimization

Before minification:
/ * Button styles * /
.button {
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
}

.button:hover {
  background-color: #2980b9;
}

After minification:
.button{background:#3498db;color:#fff;padding:10px 20px;border:none;border-radius:4px;font-size:16px}.button:hover{background:#2980b9}

Size reduction: ~60-70% smaller

Benefits of minification:

1. Smaller file size:
Original: 1000KB → Minified: 300KB
Faster download time

2. Reduced bandwidth:
Less data transferred
Lower hosting costs

3. Faster parsing:
Browser parses smaller file faster

4. Better caching:
Smaller files cache more effectively

Minification tools:

Command-line:
npm install -g cssnano
cssnano input.css output.min.css

Or:
npm install -g clean-css-cli
cleancss -o output.min.css input.css

Build tools:

Webpack:
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
};

Gulp:
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
  return gulp.src('src/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

PostCSS:
const postcss = require('postcss');
const cssnano = require('cssnano');

postcss([cssnano])
  .process(css)
  .then(result => {
    // result.css = minified CSS
  });


Removing Unused CSS:

Definition:
Eliminating CSS rules that aren't used on your pages.

Problem:

Typical website:
- Bootstrap CSS: 200KB
- Custom styles: 100KB
- Total: 300KB

Actually used:
- Only 30KB (10%) is actually applied

Wasted: 270KB (90%) downloaded but never used!

Why unused CSS accumulates:

1. Framework bloat:
Importing entire Bootstrap when only using buttons

2. Legacy code:
Old styles from previous designs

3. Removed features:
Deleted HTML but kept CSS

4. Third-party plugins:
Each adds its own CSS

5. Copy-paste:
Duplicated styles

Impact of unused CSS:

1. Larger files:
Slower download time

2. Wasted bandwidth:
Users download unnecessary code

3. Slower parsing:
Browser parses unused rules

4. Memory usage:
More rules consume more memory

5. Harder maintenance:
More code to search through

Detecting unused CSS:

Chrome DevTools Coverage:
1. Open DevTools
2. Cmd+Shift+P → "Show Coverage"
3. Click reload
4. See unused CSS highlighted in red

Example output:
styles.css: 85% unused (200KB wasted)
bootstrap.css: 92% unused (180KB wasted)

Tools to remove unused CSS:

1. PurgeCSS (most popular):
npm install purgecss

const PurgeCSS = require('purgecss');

const purgecss = new PurgeCSS({
  content: ['** /*.html', '** /*.js'],
  css: ['** /*.css']
});

const result = await purgecss.purge();

Before: 200KB
After: 15KB
Saved: 92.5%

2. UnCSS:
npm install uncss

const uncss = require('uncss');

uncss(['index.html'], (error, output) => {
  // output = CSS with unused rules removed
});

3. PurifyCSS:
npm install purify-css

const purify = require('purify-css');

purify(['*.js', '*.html'], ['*.css'], {
  output: 'purified.css'
});

Integration with build tools:

Webpack with PurgeCSS:
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');

module.exports = {
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync('src/** /*', { nodir: true })
    })
  ]
};

Next.js:
// next.config.js
module.exports = {
  purgecss: {
    content: [
      './pages/** /*.{js,jsx,ts,tsx}',
      './components/** /*.{js,jsx,ts,tsx}'
    ]
  }
};

Tailwind CSS (built-in):
// tailwind.config.js
module.exports = {
  content: [
    './pages/** /*.{js,ts,jsx,tsx}',
    './components/** /*.{js,ts,jsx,tsx}'
  ],
  // Automatically removes unused utility classes
};

Best practices:

1. Use PurgeCSS in production:
Development: Keep all CSS for flexibility
Production: Remove unused CSS

2. Safelist dynamic classes:
// PurgeCSS config
{
  safelist: [
    'active',
    'is-open',
    /^bg-/,  // Keep all bg-* classes
    /data-theme/
  ]
}

3. Check third-party CSS:
Audit Bootstrap, Font Awesome, etc.
Only import what you need

4. Regular audits:
Quarterly review of unused CSS

5. Measure impact:
Before/after file sizes

6. Test thoroughly:
Ensure no visual regressions

Cautions:

1. Dynamic classes:
May accidentally remove needed CSS

Bad:
<!-- Dynamic class added by JS -->
<div class="alert-${type}"></div>

PurgeCSS might remove .alert-success if not in HTML

Solution: Safelist dynamic patterns

2. Third-party components:
Some plugins inject styles dynamically

3. Print styles:
May be flagged as unused

4. Pseudo-classes:
:hover, :focus might be removed

Real-world example:

Before optimization:
styles.css: 450KB
- Bootstrap: 200KB (using 10%)
- Font Awesome: 80KB (using 5%)
- Custom CSS: 170KB (using 40%)

After minification + unused removal:
styles.min.css: 45KB
- Bootstrap: 20KB
- Font Awesome: 4KB
- Custom CSS: 21KB

Result:
- 90% reduction (450KB → 45KB)
- 2 seconds faster load time
- Better PageSpeed score

Combined approach:

1. Remove unused CSS (450KB → 120KB)
2. Minify remaining CSS (120KB → 45KB)
3. Compress with gzip (45KB → 12KB)

Final result: 97% smaller!

Performance metrics:

Before:
- Download time: 3.5s (slow 3G)
- Parse time: 180ms
- FCP: 4.2s
- PageSpeed: 45

After:
- Download time: 0.4s
- Parse time: 25ms
- FCP: 1.1s
- PageSpeed: 89

Maintenance benefits:

1. Faster debugging:
Less code to search

2. Easier updates:
Clear what's actually used

3. Better team understanding:
Only relevant code present

4. Reduced technical debt:
No legacy code confusion

Automated workflow:

// package.json
{
  "scripts": {
    "build:css": "npm run purge && npm run minify",
    "purge": "purgecss --css src/** /*.css --content src/** /*.html --output dist/",
    "minify": "cleancss -o dist/style.min.css dist/style.css"
  }
}

CI/CD integration:
1. Build time: Remove unused CSS
2. Minify result
3. Generate source maps
4. Deploy optimized CSS

Monitoring:

Track over time:
- CSS file size
- % unused CSS
- Load time impact

Tools:
- Lighthouse (unused CSS audit)
- WebPageTest
- Chrome DevTools Coverage

Conclusion:

Minification + unused CSS removal = 
Fast, efficient, maintainable CSS
*/


/**
92. What is render-blocking CSS and how do you avoid it? [web:95][web:96][web:99]

Render-blocking CSS prevents the browser from displaying content until CSS is downloaded 
and parsed [web:95][web:96][web:99].

Definition [web:99]:
Render-blocking resources are elements, typically CSS and JavaScript files, that hinder 
the rendering or display of a webpage [web:99].

How CSS blocks rendering [web:96]:

Browser rendering process:
1. Download HTML
2. Find <link rel="stylesheet">
3. **STOP rendering** ← Blocked here [web:96]
4. Download CSS file
5. Parse CSS
6. Build CSSOM (CSS Object Model)
7. Combine with DOM
8. **Finally render** [web:96]

Why CSS blocks rendering:

Browser needs CSS before rendering to avoid FOUC (Flash of Unstyled Content)

Without blocking:
1. Show unstyled HTML (ugly!)
2. CSS loads
3. Page re-renders (jarring!)

With blocking:
1. Wait for CSS
2. Show styled page once (smooth)

Trade-off: Wait longer but better UX

Problem with render-blocking:

Example [web:95]:
<head>
  <link rel="stylesheet" href="styles.css">  <!-- 300KB, blocks rendering -->
</head>

Timeline [web:95]:
0ms: HTML downloaded
100ms: CSS request sent
2500ms: CSS downloaded ← **Page blank for 2.5 seconds!** [web:95]
2600ms: Page rendered

User sees white screen for 2.5 seconds [web:95]
53% will abandon page [web:95]

How to avoid render-blocking CSS [web:96][web:99]:

Strategy 1: Inline critical CSS [web:96][web:99]

Inline essential styles in <head> [web:96]:

<head>
  <style>
    / * Critical CSS (5-15KB) - renders immediately * /
    .header { background: white; height: 80px; }
    .hero { min-height: 600px; }
    / * Only above-the-fold styles * /
  </style>
  
  <!-- Load rest asynchronously -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>

Result [web:96]:
- Visible content renders immediately
- Full styles load in background
- Eliminates render-blocking [web:96]

Strategy 2: Defer non-critical CSS [web:96][web:99]

Load non-critical CSS asynchronously [web:96]:

Method 1 - Media query trick [web:96]:
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">

How it works:
- media="print" makes it non-render-blocking
- onload changes to media="all" after loading

Method 2 - Preload with JavaScript:
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

Method 3 - JavaScript loading:
<script>
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'styles.css';
  document.head.appendChild(link);
</script>

Strategy 3: Split CSS by media queries [web:96]

Load screen-specific CSS separately [web:96]:

<link rel="stylesheet" href="core.css">
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)" onload="this.media='all'">
<link rel="stylesheet" href="desktop.css" media="(min-width: 769px)" onload="this.media='all'">
<link rel="stylesheet" href="print.css" media="print">

Benefits:
- Mobile users don't download desktop CSS
- Desktop users don't download mobile CSS
- Faster for all [web:96]

Strategy 4: Minimize and compress CSS [web:99]

Reduce CSS file size [web:99]:

Before:
styles.css: 300KB (unminified)

After:
styles.min.css: 90KB (minified)
styles.min.css.gz: 25KB (gzipped)

Commands:
// Minify
cssnano input.css output.min.css

// Enable gzip on server
AddOutputFilterByType DEFLATE text/css

Strategy 5: Remove unused CSS [web:99]

Eliminate dead code [web:99]:

Before:
bootstrap.css: 200KB (using 10%)

After:
custom.css: 20KB (only used styles)

Use PurgeCSS:
purgecss --css styles.css --content index.html --output dist/

Strategy 6: Use CDN [web:99]

Content Delivery Network for faster delivery [web:99]:

<link rel="stylesheet" href="https://cdn.example.com/styles.css">

Benefits [web:99]:
- Geographically closer servers
- Better caching
- Parallel downloads

Strategy 7: Leverage browser caching [web:99]

Cache CSS files [web:99]:

Server configuration:
# Apache
<FilesMatch "\.(css)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Nginx
location ~* \.css$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

Use versioned filenames:
styles.a1b2c3.css (cache-busted on changes)

Strategy 8: HTTP/2 Server Push:

Push critical CSS with HTML:

// Server configuration
Link: </critical.css>; rel=preload; as=style

Browser receives CSS before requesting it

Complete example [web:96]:

Before (render-blocking):
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">  <!-- 300KB, blocks -->
</head>
<body>
  <header>...</header>
  <main>...</main>
</body>
</html>

Performance [web:96]:
PageSpeed: 31%
FCP: 3.2s
Render-blocking: Yes

After (optimized) [web:96]:
<!DOCTYPE html>
<html>
<head>
  <!-- Critical CSS inline -->
  <style>
    .header{background:#fff;height:80px}
    .hero{min-height:600px;background:url(hero.jpg)}
    / * 12KB critical CSS * /
  </style>
  
  <!-- Async load remaining CSS -->
  <link rel="preload" href="styles.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.min.css"></noscript>
  
  <!-- Preload web fonts -->
  <link rel="preload" href="fonts.woff2" as="font" type="font/woff2" crossorigin>
</head>
<body>
  <header>...</header>
  <main>...</main>
</body>
</html>

Performance [web:96]:
PageSpeed: 41% (10% improvement) [web:96]
FCP: 0.9s
Render-blocking: No [web:96]

Best practices [web:99]:

1. Prioritize above-the-fold content [web:99]
Extract and inline critical CSS [web:99]

2. Defer non-essential resources [web:99]
Load below-fold CSS asynchronously [web:99]

3. Minimize CSS [web:99]
Remove whitespace and comments [web:99]

4. Compress CSS [web:99]
Enable gzip/brotli [web:99]

5. Remove unused CSS [web:99]
Use PurgeCSS or similar [web:99]

6. Use CDN [web:99]
Faster global delivery [web:99]

7. Leverage caching [web:99]
Long cache times for CSS [web:99]

8. Split by media queries [web:96]
Load only relevant CSS [web:96]

9. Monitor performance:
Regular Lighthouse audits

10. Test on real connections:
Simulate slow 3G/4G

Tools for optimization:

1. Lighthouse:
Identifies render-blocking resources [web:96]

2. WebPageTest:
Visualizes blocking timeline

3. Critical (npm package):
Extracts critical CSS automatically

4. Chrome DevTools:
Coverage tab shows unused CSS

5. webpack/Vite plugins:
Automate optimization in build

Measuring success:

Before optimization:
- Render-blocking CSS: 3 files, 450KB
- FCP: 3.5s
- LCP: 4.2s
- PageSpeed: 35

After optimization:
- Render-blocking CSS: 0 files
- Critical CSS: 12KB inline
- FCP: 0.8s
- LCP: 1.1s
- PageSpeed: 89

Result: 77% faster FCP!

Common mistakes:

1. Inlining too much CSS:
Keep inline CSS under 15KB

2. Not providing fallback:
Always include <noscript> tag

3. Forgetting fonts:
Fonts also block rendering

4. Not testing:
Verify no visual regressions

5. Ignoring mobile:
Mobile networks are slower, optimization more critical
*/


/**
93. How does the browser compute style, layout, paint, and composite? [web:97][web:100]

The browser rendering pipeline has four main stages that transform HTML/CSS into pixels 
on screen.

Rendering Pipeline Overview:

1. Style (Recalculate Style)
2. Layout (Reflow)
3. Paint (Repaint)
4. Composite

┌─────────┐    ┌────────┐    ┌───────┐    ┌───────────┐
│ Style   │ -> │ Layout │ -> │ Paint │ -> │ Composite │ -> Display
└─────────┘    └────────┘    └───────┘    └───────────┘

1. Style (Recalculate Style):

What happens:
Browser calculates which CSS rules apply to each element

Process:
1. Parse CSS
2. Build CSSOM (CSS Object Model)
3. Match selectors to DOM elements
4. Calculate computed styles
5. Handle inheritance and cascade

Example:
<div class="container">
  <p class="text">Hello</p>
</div>

CSS:
.container { color: blue; }
.text { font-size: 16px; }

Browser computes:
- <p> gets color: blue (inherited)
- <p> gets font-size: 16px (direct)
- <p> gets default display: block
- ... calculates all properties

Performance impact:
- Complex selectors slower
- More rules = longer calculation

Expensive:
div > ul > li > a:nth-child(3) { }
.nav .dropdown .menu .item { }

Efficient:
.nav-link { }

Triggers:
- Adding/removing classes
- Changing CSS
- DOM manipulation
- :hover, :focus states


2. Layout (Reflow) [web:97][web:100]:

What happens [web:100]:
Browser calculates position and size of each element [web:100]

Process:
1. Calculate element dimensions
2. Calculate positions
3. Handle floats, flexbox, grid
4. Determine overflow
5. Build layout tree

Example:
.box {
  width: 300px;      ← Layout calculation
  height: 200px;     ← Layout calculation
  padding: 20px;     ← Affects size
  position: absolute;← Affects position
  top: 50px;         ← Position calculation
  left: 100px;       ← Position calculation
}

What triggers layout (reflow) [web:97]:

Geometric property changes [web:97]:
- width, height
- padding, margin
- border
- position, top, left, right, bottom
- font-size
- display
- float, clear

DOM changes [web:97]:
- Adding/removing elements [web:97]
- Changing content
- Moving elements [web:97]

Window changes [web:97]:
- Resizing window [web:97]
- Changing font [web:97]
- Scrolling (sometimes)

Performance impact [web:100]:
Reflow is expensive [web:100]
Browser recalculates layout of entire rendering tree [web:100]
Can impact rendering performance significantly [web:100]

Example - triggering reflow:
element.style.width = '300px';  // Triggers layout
element.style.height = '200px'; // Triggers layout again

Better - batch changes:
element.style.cssText = 'width: 300px; height: 200px;';


3. Paint (Repaint) [web:97][web:100]:

What happens [web:97][web:100]:
Browser fills in pixels with colors, images, borders, shadows [web:97]

Process:
1. Create paint records
2. Rasterize vectors to pixels
3. Fill backgrounds
4. Draw borders
5. Apply shadows
6. Draw text
7. Render images

What triggers paint (repaint) [web:97]:

Visual property changes [web:100]:
- color
- background, background-color
- border-color
- visibility
- outline
- box-shadow
- text-decoration

Does NOT trigger layout [web:97]:
Only affects appearance, not geometry [web:97]

Example:
element.style.backgroundColor = 'red';  // Paint only, no layout

Performance impact [web:100]:
Lower than reflow [web:100]
Only affects element's appearance [web:100]
Doesn't recalculate positions [web:100]

Expensive paint operations:
- Large box-shadows with big blur
- Gradients
- Border-radius on large elements
- Transparency


4. Composite:

What happens:
Browser combines layers and draws final image

Process:
1. Divide page into layers
2. Paint each layer
3. Upload layers to GPU
4. Composite layers together
5. Display final result

Layers created for:
- transform
- opacity
- will-change
- 3D transforms
- Video, Canvas, WebGL
- Fixed position elements

GPU-accelerated properties:
- transform
- opacity
- filter (some)

Example - GPU-accelerated animation:
.box {
  transform: translateX(0);
  transition: transform 0.3s;
}

.box:hover {
  transform: translateX(100px);  // GPU-composited, very fast
}

Complete rendering example:

Change CSS:
element.style.width = '400px';
element.style.backgroundColor = 'blue';

Pipeline:
1. Style: Recalculate computed styles
2. Layout: Recalculate size/position (width changed)
3. Paint: Redraw with new color
4. Composite: Update layers on screen

Change only color:
element.style.backgroundColor = 'red';

Pipeline:
1. Style: Recalculate computed styles
2. Layout: ❌ Skipped (no geometric change)
3. Paint: Redraw with new color
4. Composite: Update layers

Change only transform:
element.style.transform = 'translateX(100px)';

Pipeline:
1. Style: ❌ Skipped (handled by compositor)
2. Layout: ❌ Skipped
3. Paint: ❌ Skipped
4. Composite: ✓ Update composite layer only (fastest!)

Property performance chart:

Best (Composite only):
- transform: translate, scale, rotate
- opacity

Good (Skip layout):
- color
- background
- box-shadow

Expensive (Full pipeline):
- width, height
- padding, margin
- position, top, left
- font-size
- display

Optimization strategies:

1. Use transform instead of position:
Bad:
element.style.left = '100px';  // Layout + Paint + Composite

Good:
element.style.transform = 'translateX(100px)';  // Composite only

2. Use opacity for fading:
Bad:
element.style.visibility = 'hidden';  // Paint + Composite

Good:
element.style.opacity = '0';  // Composite only

3. Batch DOM changes:
Bad:
element.style.width = '100px';   // Layout
element.style.height = '100px';  // Layout again
element.style.border = '1px';    // Layout again

Good:
element.classList.add('resized');

.resized {
  width: 100px;
  height: 100px;
  border: 1px;
}

4. Use will-change for animations:
.box {
  will-change: transform;  // Creates composite layer
}

.box:hover {
  transform: scale(1.1);  // Already on GPU
}

5. Read then write DOM:
Bad (thrashing):
element.style.width = '100px';
const width = element.offsetWidth;  // Forces layout
element.style.height = '100px';
const height = element.offsetHeight; // Forces layout again

Good:
const width = element.offsetWidth;   // Read
const height = element.offsetHeight; // Read
element.style.width = '100px';       // Write
element.style.height = '100px';      // Write

6. Use requestAnimationFrame:
Bad:
setInterval(() => {
  element.style.transform = `translateX(${x}px)`;
}, 16);

Good:
function animate() {
  element.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}

Browser DevTools:

Performance tab:
- Shows Style, Layout, Paint, Composite times
- Identifies bottlenecks
- Flame chart visualization

Rendering tab:
- Paint flashing
- Layout shift regions
- Layer borders
- Frame rendering stats

Understanding the pipeline helps optimize CSS for smooth, performant user experiences.
*/


/**
94. What triggers reflow and repaint in CSS? [web:97][web:100]

Reflow and repaint are two different rendering operations with different performance 
costs [web:97][web:100].

Reflow (Layout) [web:97][web:100]:

Definition [web:97][web:100]:
Recalculating element positions and geometries [web:100]

What triggers reflow [web:97]:

1. Geometric property changes [web:97][web:100]:
- width, height
- padding, margin, border
- position (relative, absolute, fixed)
- top, left, right, bottom
- display
- float, clear
- font-size, font-family, font-weight [web:97]
- text-align
- vertical-align
- min-height, max-height
- min-width, max-width
- line-height
- white-space

2. DOM manipulations [web:97]:
- Adding/removing elements [web:97]
- Changing content (textContent, innerHTML)
- Moving elements [web:97]
- Animating DOM nodes [web:97]

3. Window operations [web:97]:
- Resizing window [web:97]
- Scrolling (sometimes)
- Changing font [web:97]

4. Reading layout properties:
- offsetWidth, offsetHeight
- offsetTop, offsetLeft
- clientWidth, clientHeight
- scrollWidth, scrollHeight
- getComputedStyle()
- getBoundingClientRect()

Examples triggering reflow:

element.style.width = '300px';      // Reflow
element.style.padding = '20px';     // Reflow
element.style.display = 'none';     // Reflow
element.style.fontSize = '20px';    // Reflow [web:97]

element.appendChild(newElement);    // Reflow
element.remove();                   // Reflow

window.onresize = () => {};         // Reflow [web:97]

const width = element.offsetWidth;  // Forces reflow

Performance impact [web:97][web:100]:
Reflow overhead is higher [web:97][web:100]
Browser recalculates layout of entire rendering tree [web:97][web:100]
Can significantly impact rendering performance [web:100]


Repaint (Paint) [web:97][web:100]:

Definition [web:100]:
Updating element appearance without changing layout [web:100]

What triggers repaint [web:97][web:100]:

Visual properties only [web:100]:
- color
- background, background-color, background-image
- border-color, border-style
- outline, outline-color
- visibility
- box-shadow
- border-radius
- text-decoration
- cursor

Examples triggering repaint:

element.style.color = 'red';              // Repaint only
element.style.backgroundColor = 'blue';    // Repaint only
element.style.visibility = 'hidden';       // Repaint only
element.style.boxShadow = '0 0 5px red';  // Repaint only

Performance impact [web:100]:
Lower overhead than reflow [web:100]
Only affects appearance, not layout [web:100]
Relatively fast operation [web:100]


Difference between reflow and repaint [web:100]:

Aspect          | Reflow                | Repaint
----------------|-----------------------|----------------------
Affects         | Size, position [web:100] | Appearance [web:100]
Calculation     | Layout tree [web:100] | Pixels only [web:100]
Performance     | Higher overhead [web:100] | Lower overhead [web:100]
Triggers        | Geometric changes     | Visual changes

Key rule:
- Reflow always triggers repaint [web:100]
- Repaint doesn't trigger reflow [web:100]

Example:
element.style.width = '300px';  // Reflow + Repaint
element.style.color = 'red';    // Repaint only


Properties that trigger neither:

GPU-accelerated properties:
- transform
- opacity (when on composite layer)

Example:
element.style.transform = 'translateX(100px)';  // Composite only (fastest)
element.style.opacity = '0.5';                  // Composite only (if layered)

These bypass Layout and Paint, only update Composite layer


Layout Thrashing:

Definition:
Repeatedly reading and writing DOM properties, causing multiple reflows

Bad example (thrashing):
// Read-write-read-write pattern = multiple forced reflows
element.style.width = '100px';              // Write (reflow queued)
const width = element.offsetWidth;          // Read (forces reflow)
element.style.height = '100px';             // Write (reflow queued)
const height = element.offsetHeight;        // Read (forces reflow)
element.style.padding = '10px';             // Write (reflow queued)
const padding = getComputedStyle(element);  // Read (forces reflow)

Result: 3 forced reflows!

Good example (batched):
// Read-read-read-write-write-write pattern = 1 reflow
const width = element.offsetWidth;          // Read
const height = element.offsetHeight;        // Read  
const padding = getComputedStyle(element);  // Read

element.style.width = '100px';              // Write
element.style.height = '100px';             // Write
element.style.padding = '10px';             // Write

Result: 1 reflow (browser batches writes)


Optimization strategies [web:100]:

1. Minimize DOM manipulations [web:100]:

Bad:
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div);  // 1000 reflows!
}

Good [web:100]:
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);  // 1 reflow

2. Use CSS for animations [web:100]:

Bad:
let x = 0;
setInterval(() => {
  element.style.left = x++ + 'px';  // Reflow every 16ms
}, 16);

Good [web:100]:
element.style.transform = 'translateX(100px)';  // Composite only
element.style.transition = 'transform 0.3s';

Or use transform and opacity:
@keyframes move {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

element.style.animation = 'move 1s';

3. Batch style changes:

Bad:
element.style.width = '100px';   // Reflow
element.style.height = '100px';  // Reflow
element.style.border = '1px';    // Reflow

Good:
// Option 1: cssText
element.style.cssText = 'width:100px; height:100px; border:1px';  // 1 reflow

// Option 2: className
element.className = 'resized';  // 1 reflow

.resized {
  width: 100px;
  height: 100px;
  border: 1px;
}

4. Read then write:

Bad:
element.style.width = '100px';
const width = element.offsetWidth;  // Forces reflow
element.style.height = '100px';

Good:
const width = element.offsetWidth;   // Read
element.style.width = '100px';       // Write
element.style.height = '100px';      // Write

5. Use requestAnimationFrame [web:100]:

Bad:
function animate() {
  element.style.top = (element.offsetTop + 1) + 'px';  // Read + Write
  setTimeout(animate, 16);
}

Good [web:100]:
function animate() {
  element.style.transform = `translateY(${y++}px)`;
  requestAnimationFrame(animate);
}

requestAnimationFrame ensures browser can batch operations [web:100]

6. Detach element during manipulation:

Bad:
for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px';  // 100 reflows
}

Good:
const parent = element.parentNode;
parent.removeChild(element);  // Detach

for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px';  // No reflow (detached)
}

parent.appendChild(element);  // 1 reflow

7. Cache layout values:

Bad:
function updateElements() {
  elements.forEach(el => {
    el.style.left = container.offsetWidth / 2 + 'px';  // Reads every iteration
  });
}

Good:
function updateElements() {
  const width = container.offsetWidth;  // Read once
  elements.forEach(el => {
    el.style.left = width / 2 + 'px';
  });
}

8. Use DocumentFragment:

const fragment = document.createDocumentFragment();
// Build complex structure in fragment
fragment.appendChild(element1);
fragment.appendChild(element2);
// One reflow when appending to DOM
document.body.appendChild(fragment);

9. Avoid triggering reflow in loops:

Bad:
elements.forEach(el => {
  el.style.width = el.offsetWidth * 2 + 'px';  // Read in loop
});

Good:
const widths = elements.map(el => el.offsetWidth);  // Read all
elements.forEach((el, i) => {
  el.style.width = widths[i] * 2 + 'px';  // Write all
});

10. Use will-change sparingly:

.animated {
  will-change: transform;  // Creates layer, avoids reflow during animation
}

But remove after animation:
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});

Measuring reflow/repaint:

Chrome DevTools:
1. Performance tab → Record
2. Look for "Layout" (reflow) and "Paint" events
3. Identify expensive operations

Rendering tab:
- Paint flashing: Shows repainted regions
- Layout shift regions: Shows layout changes

Summary:

Reflow triggers [web:97][web:100]:
width, height, padding, margin, position, display, font-size

Repaint triggers [web:100]:
color, background, border-color, visibility, box-shadow

Neither (best):
transform, opacity (on composite layer)

Optimize by:
- Batching changes [web:100]
- Reading then writing [web:100]
- Using transform/opacity [web:100]
- requestAnimationFrame [web:100]
- Minimizing DOM manipulations [web:100]

*/


/**
95. What is the stacking context and what creates it? [web:101][web:103][web:105]

Stacking context is a three-dimensional conceptualization of HTML elements along the 
z-axis [web:101].

Definition [web:101]:
Stacking context determines how elements are layered on top of one another along the 
z-axis (the "depth" dimension) [web:101].

Think of it as layers of transparent sheets stacked on top of each other [web:103].

Visual representation:

Screen (closest to user)
    ↑
    |  Element with z-index: 100
    |  Element with z-index: 10
    |  Element with z-index: 1
    ↓
Background (farthest from user)

How stacking works:

Without z-index:
<div>First</div>
<div>Second</div>  ← Appears on top (later in DOM)
<div>Third</div>   ← Appears on top of both

With z-index [web:104]:
<div style="z-index: 10">Third in DOM</div>  ← Shows on top
<div style="z-index: 5">Second</div>
<div style="z-index: 1">First</div>

Important: z-index only works on positioned elements [web:104][web:105]
(position: relative, absolute, fixed, sticky) [web:105]

What creates a stacking context [web:105]:

1. Root element (<html>):
Always creates a stacking context

2. Positioned elements with z-index [web:105]:
position: relative/absolute/fixed/sticky with z-index ≠ auto

.element {
  position: relative;
  z-index: 1;  / * Creates stacking context * /
}

3. Opacity less than 1 [web:105]:
.element {
  opacity: 0.99;  / * Creates stacking context * /
}

4. Transform:
.element {
  transform: translateX(0);  / * Creates stacking context * /
}

5. Filter:
.element {
  filter: blur(5px);  / * Creates stacking context * /
}

6. Will-change:
.element {
  will-change: transform;  / * Creates stacking context * /
}

7. Isolation:
.element {
  isolation: isolate;  / * Creates stacking context * /
}

8. Mix-blend-mode:
.element {
  mix-blend-mode: multiply;  / * Creates stacking context * /
}

9. Clip-path:
.element {
  clip-path: circle(50%);  / * Creates stacking context * /
}

10. Mask:
.element {
  mask: url(mask.svg);  / * Creates stacking context * /
}

11. Perspective:
.element {
  perspective: 1000px;  / * Creates stacking context * /
}

12. Flex/Grid items with z-index:
.container {
  display: flex;
}

.flex-item {
  z-index: 1;  / * Creates stacking context (no position needed!) * /
}

13. Position: fixed or sticky:
.element {
  position: fixed;  / * Creates stacking context * /
}

Complete list example:

/ * All of these create stacking contexts * /
.stacking-context-1 { position: relative; z-index: 1; }
.stacking-context-2 { opacity: 0.99; }
.stacking-context-3 { transform: scale(1); }
.stacking-context-4 { filter: blur(0); }
.stacking-context-5 { will-change: transform; }
.stacking-context-6 { isolation: isolate; }
.stacking-context-7 { mix-blend-mode: multiply; }
.stacking-context-8 { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
.stacking-context-9 { perspective: 1000px; }
.stacking-context-10 { position: fixed; }

Stacking context behavior [web:103][web:105]:

Key rule: Each stacking context is self-contained [web:105]
Child elements can't escape their parent's stacking context [web:103]

Example problem [web:103]:

<div class="parent" style="z-index: 1">
  <div class="child" style="z-index: 999999">Child</div>
</div>
<div class="other" style="z-index: 2">Other</div>

Result: "Other" appears above "Child" even though Child has z-index: 999999!

Why? [web:103]
- Parent creates stacking context with z-index: 1
- Child is trapped inside parent's context
- Parent (z-index: 1) is below Other (z-index: 2)
- So everything inside Parent appears below Other [web:103]

Stacking order within a context [web:101]:

From bottom to top:
1. Background and borders of creating element
2. Negative z-index children (z-index: -1, -2, etc.)
3. Block-level boxes in normal flow
4. Floated boxes
5. Inline boxes in normal flow
6. z-index: 0 or auto (positioned)
7. Positive z-index children (z-index: 1, 2, etc.)

Example:

<div class="context">
  <div style="z-index: -1">Negative</div>  ← Bottom
  <div>Normal flow</div>
  <div style="z-index: 0">Zero</div>
  <div style="z-index: 1">One</div>
  <div style="z-index: 10">Ten</div>  ← Top
</div>

Real-world examples:

Modal overlay problem [web:103]:

Bad:
<div class="header" style="z-index: 100">
  <div class="dropdown" style="z-index: 9999">
    <!-- Trapped inside header context! -->
  </div>
</div>
<div class="modal" style="z-index: 1000">
  <!-- Should be on top, but might not be -->
</div>

Solution [web:103]:
Portal modals to document.body or use CSS isolation

Tooltip issue:

<div class="card" style="opacity: 0.95">  <!-- Creates context -->
  <div class="tooltip" style="z-index: 9999">
    <!-- Can't escape card's stacking context -->
  </div>
</div>

Solution:
Remove opacity from parent or portal tooltip

Debugging stacking contexts [web:103]:

Chrome DevTools:
1. Inspect element
2. In Elements panel, look for "Creating a stacking context"
3. Shows which property created it

Common issues [web:103]:

1. Hidden z-index conflicts:
Element has opacity/transform creating unexpected context

2. z-index not working:
Element not positioned (position: static)

3. Can't override z-index:
Element trapped in parent stacking context

4. Hover states breaking:
Creating new stacking context on hover changes layering

Best practices:

1. Minimize stacking contexts:
Only create when necessary

2. Use isolation: isolate:
Explicitly create contexts when needed

3. Consistent z-index scale:
Use 10, 20, 30 not random numbers

4. Document z-index hierarchy:
// z-index scale
// Modal: 1000
// Dropdown: 100
// Tooltip: 200
// Header: 10

5. Avoid unnecessarily high z-index:
z-index: 999999 is usually a code smell

6. Use CSS variables:
:root {
  --z-dropdown: 100;
  --z-modal: 1000;
  --z-tooltip: 200;
}

.dropdown { z-index: var(--z-dropdown); }

Z-index scale example:

:root {
  --z-negative: -1;
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}

Testing stacking contexts:

// Check if element creates stacking context
function createsStackingContext(element) {
  const style = getComputedStyle(element);
  
  return (
    style.opacity !== '1' ||
    style.transform !== 'none' ||
    style.filter !== 'none' ||
    style.perspective !== 'none' ||
    style.clipPath !== 'none' ||
    style.mask !== 'none' ||
    style.mixBlendMode !== 'normal' ||
    style.isolation === 'isolate' ||
    (style.position !== 'static' && style.zIndex !== 'auto') ||
    style.position === 'fixed' ||
    style.position === 'sticky'
  );
}
*/


/**
96. What are containing blocks and how are they determined? [web:106][web:109]

A containing block is the rectangle that defines the positioning and sizing context for 
an element [web:109].

Definition [web:109]:
The size and position of an element are often impacted by its containing block [web:109].
Most often it's the content area of the nearest block-level ancestor [web:109].

Purpose:

Containing blocks determine:
- Percentage-based dimensions (width, height)
- Percentage-based positioning (top, left, right, bottom)
- Offset calculations for positioned elements

Example:
.child {
  width: 50%;     / * 50% of containing block width * /
  height: 50%;    / * 50% of containing block height * /
  top: 10%;       / * 10% from top of containing block * /
}

How containing blocks are determined [web:106]:

Rule 1: position: static or relative

Containing block = content box of nearest block-level ancestor

<div class="container">        <!-- Containing block -->
  <div class="child"></div>    <!-- position: static/relative -->
</div>

Block-level ancestors:
- display: block, list-item, table, flex, grid
- NOT inline, inline-block, inline-flex

Example:
<article>                  <!-- Block-level -->
  <p>                      <!-- Block-level -->
    <span>                 <!-- Inline (skipped) -->
      <strong class="child" style="position: relative; width: 50%">
        <!-- Containing block is <p> (nearest block-level) -->
      </strong>
    </span>
  </p>
</article>

Rule 2: position: absolute [web:106]

Containing block = padding box of nearest positioned ancestor [web:106]
(ancestor with position: relative/absolute/fixed/sticky)

<div style="position: relative; padding: 20px">  <!-- Containing block -->
  <div style="position: absolute; top: 0; left: 0">
    <!-- Positioned relative to parent's padding box -->
  </div>
</div>

If no positioned ancestor exists, containing block = initial containing block (viewport) 
[web:106]

<body>                                    <!-- position: static -->
  <div style="position: absolute">        <!-- Containing block = viewport -->
  </div>
</body>

Example with nested positioning [web:106]:

<div id="div1" style="position: absolute">  <!-- C.B. = viewport -->
  <p id="p1">                               <!-- C.B. = div1 -->
    <em id="em1" style="position: absolute">  <!-- C.B. = div1 -->
      <strong id="strong1">                   <!-- C.B. = em1 -->
      </strong>
    </em>
  </p>
</div>

Rule 3: position: fixed

Containing block = viewport (continuous media) or page area (paged media)

<div style="position: fixed; top: 0; right: 0">
  <!-- Always positioned relative to viewport -->
</div>

Exception: If ancestor has transform/perspective/filter/will-change, that becomes 
containing block

<div style="transform: translateZ(0)">   <!-- Containing block -->
  <div style="position: fixed">
    <!-- Fixed relative to transformed parent, not viewport! -->
  </div>
</div>

Rule 4: position: sticky

Containing block = nearest scrolling ancestor

<div style="overflow: auto; height: 500px">  <!-- Containing block -->
  <div style="position: sticky; top: 0">
    <!-- Sticks within scrolling container -->
  </div>
</div>

Rule 5: transform, filter, or perspective

Element becomes containing block for fixed/absolute descendants

<div style="transform: rotate(0deg)">    <!-- Containing block -->
  <div style="position: absolute">
    <!-- Positioned relative to transformed parent -->
  </div>
</div>

Containing block dimensions:

For width/height calculations:

position: static/relative:
Containing block = content box width/height

<div style="width: 500px; padding: 20px">  <!-- Content width = 500px -->
  <div style="width: 50%">                 <!-- 250px (50% of 500px) -->
  </div>
</div>

position: absolute:
Containing block = padding box width/height

<div style="width: 500px; padding: 20px; position: relative">
  <!-- Padding box = 500px + 20px*2 = 540px -->
  <div style="position: absolute; width: 50%">
    <!-- 270px (50% of 540px) -->
  </div>
</div>

position: fixed:
Containing block = viewport dimensions

<div style="position: fixed; width: 50%">
  <!-- 50% of viewport width -->
</div>

Real-world examples:

Centering with absolute positioning:

<div class="container" style="position: relative; width: 800px; height: 600px">
  <!-- Containing block: 800x600 -->
  
  <div class="modal" style="position: absolute; width: 400px; height: 300px;
                             left: 50%; top: 50%;
                             transform: translate(-50%, -50%)">
    <!-- left: 50% = 400px from left edge
         top: 50% = 300px from top edge
         Transform shifts back by half its own size -->
  </div>
</div>

Sidebar layout:

<div class="page" style="position: relative">  <!-- Containing block -->
  <aside style="position: absolute; left: 0; top: 0; width: 250px; height: 100%">
    <!-- Height: 100% of page -->
  </aside>
  
  <main style="margin-left: 250px">
    Content
  </main>
</div>

Sticky header:

<div class="scroll-container" style="height: 100vh; overflow: auto">
  <!-- Containing block for sticky -->
  
  <header style="position: sticky; top: 0">
    <!-- Sticks within scroll-container -->
  </header>
  
  <div style="height: 2000px">
    Long content
  </div>
</div>

Common gotchas:

1. Transform breaks position: fixed [web:106]:

Bad:
<div style="transform: translateX(0)">
  <div style="position: fixed; top: 0; left: 0">
    <!-- NOT fixed to viewport! Fixed to transformed parent -->
  </div>
</div>

2. Percentage height requires explicit parent height:

<div style="height: auto">
  <div style="height: 50%">  <!-- Doesn't work! Parent has auto height -->
  </div>
</div>

Solution:
<div style="height: 500px">
  <div style="height: 50%">  <!-- Works! 250px -->
  </div>
</div>

3. Inline elements as containing blocks:

<span>                               <!-- Inline (not a containing block) -->
  <div style="position: relative; width: 50%">
    <!-- Containing block skips to next block-level ancestor -->
  </div>
</span>

4. Margin not part of containing block:

<div style="width: 500px; padding: 20px; margin: 30px; position: relative">
  <!-- Containing block width = 540px (includes padding, not margin) -->
  <div style="position: absolute; width: 100%">
    <!-- 540px, NOT 600px -->
  </div>
</div>

Debugging containing blocks:

Visual test:
.container {
  position: relative;
  outline: 2px solid red;  / * Visualize containing block * /
}

.child {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 255, 0.3);
}

Console test:
function getContainingBlock(element) {
  const position = getComputedStyle(element).position;
  
  if (position === 'fixed') {
    return document.documentElement;  // Viewport
  }
  
  if (position === 'absolute') {
    let parent = element.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      if (style.position !== 'static') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return document.documentElement;  // Initial containing block
  }
  
  // static or relative
  let parent = element.parentElement;
  while (parent) {
    const display = getComputedStyle(parent).display;
    if (display.includes('block') || display.includes('flex') || 
        display.includes('grid')) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}

Best practices:

1. Use position: relative on parents:
Establish containing blocks explicitly

2. Understand percentage calculations:
Know which box model component is used

3. Be aware of transform effects:
Transform creates containing block for fixed

4. Use explicit heights for % height:
Parent needs defined height

5. Document containing block relationships:
Comment complex positioning

Summary table:

Position  | Containing Block
----------|------------------
static    | Content box of nearest block ancestor [web:109]
relative  | Content box of nearest block ancestor [web:109]
absolute  | Padding box of nearest positioned ancestor [web:106]
fixed     | Viewport (or transformed ancestor)
sticky    | Nearest scrolling ancestor
*/


/**
97. What is the difference between relative and absolute positioning?

Relative and absolute positioning determine how elements are positioned and what their 
containing block is.

position: relative

Definition:
Element positioned relative to its normal position in document flow

Characteristics:

1. Stays in document flow:
Space reserved for element

<div>First</div>
<div style="position: relative; top: 20px">Second (space reserved)</div>
<div>Third</div>

Visual:
First
[empty space where Second would be]
  Second (shifted 20px down)
Third

2. Offsets from normal position:
top, right, bottom, left shift from where it would normally be

.element {
  position: relative;
  top: 20px;      / * 20px down from normal position * /
  left: 30px;     / * 30px right from normal position * /
}

3. Doesn't affect other elements:
Other elements ignore the offset

<div>First</div>
<div style="position: relative; top: 50px">Second</div>
<div>Third</div>  <!-- Still positioned where it would normally be -->

Result: Second may overlap Third

4. Creates containing block:
For absolutely positioned descendants

<div style="position: relative">         <!-- Containing block -->
  <div style="position: absolute">       <!-- Positioned within parent -->
  </div>
</div>

5. Creates stacking context:
When z-index is set

.element {
  position: relative;
  z-index: 1;     / * Creates stacking context * /
}

position: absolute

Definition:
Element removed from document flow and positioned relative to nearest positioned ancestor

Characteristics:

1. Removed from flow:
NO space reserved

<div>First</div>
<div style="position: absolute; top: 20px">Second (no space)</div>
<div>Third</div>  <!-- Moves up as if Second doesn't exist -->

Visual:
First
Third
  Second (overlaid, no space reserved)

2. Positioned relative to containing block:
Not its normal position

.element {
  position: absolute;
  top: 20px;      / * 20px from top of containing block * /
  left: 30px;     / * 30px from left of containing block * /
}

3. Containing block = nearest positioned ancestor:
Ancestor with position: relative/absolute/fixed/sticky

<body>                                  <!-- position: static (not positioned) -->
  <div style="position: relative">      <!-- Containing block! -->
    <div style="position: absolute; top: 0; left: 0">
      <!-- Positioned at top-left of parent -->
    </div>
  </div>
</body>

If no positioned ancestor, uses viewport:

<body>                                  <!-- position: static -->
  <div style="position: absolute; top: 0; left: 0">
    <!-- Positioned at top-left of viewport -->
  </div>
</body>

4. Shrinks to fit content:
Width defaults to content width (not 100%)

<div style="position: absolute">
  <span>Short text</span>  <!-- div shrinks to text width -->
</div>

5. Can be centered with auto margins:

.element {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 300px;   / * Centers horizontally * /
}

Side-by-side comparison:

Aspect              | position: relative      | position: absolute
--------------------|-------------------------|-------------------------
Document flow       | Stays in flow          | Removed from flow
Space reserved      | Yes                    | No
Offset relative to  | Normal position        | Containing block
Affects siblings    | No (they ignore offset)| Yes (they move up)
Width default       | 100% of parent         | Shrinks to content
Containing block    | Same as static         | Nearest positioned ancestor

Visual examples:

Relative positioning:

<div class="container">
  <div class="box box1">Box 1</div>
  <div class="box box2" style="position: relative; top: 20px; left: 20px">Box 2</div>
  <div class="box box3">Box 3</div>
</div>

Result:
┌────────┐
│ Box 1  │
└────────┘
   [space for Box 2]
      ┌────────┐
      │ Box 2  │  ← Shifted, space reserved
      └────────┘
┌────────┐
│ Box 3  │  ← In normal position
└────────┘

Absolute positioning:

<div class="container" style="position: relative; height: 200px">
  <div class="box box1">Box 1</div>
  <div class="box box2" style="position: absolute; top: 20px; left: 20px">Box 2</div>
  <div class="box box3">Box 3</div>
</div>

Result:
Container (position: relative)
┌─────────────────────┐
│┌────────┐           │
││ Box 1  │           │
│└────────┘           │
│┌────────┐           │
││ Box 3  │  ← Moved up (no space for Box 2)
│└────────┘           │
│   ┌────────┐        │
│   │ Box 2  │  ← Overlaid, no space reserved
│   └────────┘        │
└─────────────────────┘

Real-world use cases:

position: relative:

1. Create containing block for absolute children:
.card {
  position: relative;  / * Just to establish containing block * /
}

.card__badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

2. Slight adjustments:
.icon {
  position: relative;
  top: 2px;  / * Align with text baseline * /
}

3. Layering with z-index:
.dropdown-trigger {
  position: relative;
  z-index: 10;
}

position: absolute:

1. Overlays and modals:
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

2. Corner badges:
.card {
  position: relative;
}

.card__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  border-radius: 50%;
}

3. Centered content:
.container {
  position: relative;
  height: 400px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

4. Tooltips:
.button {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

5. Full-size overlays:
.parent {
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;  / * top: 0; right: 0; bottom: 0; left: 0 * /
}

Common patterns:

Pattern 1: Absolute within relative
<div style="position: relative">        <!-- Containing block -->
  <img src="image.jpg">
  <div style="position: absolute; bottom: 0; left: 0; right: 0">
    Caption overlay
  </div>
</div>

Pattern 2: Relative for z-index only
.element {
  position: relative;
  z-index: 10;
  / * No offset, just for stacking * /
}

Pattern 3: Absolute centering
.parent {
  position: relative;
  width: 500px;
  height: 300px;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
}

Pattern 4: Stretching to fill parent
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  / * Fills entire parent * /
}

Common mistakes:

1. Forgetting containing block:

Bad:
<div>                                   <!-- No position set -->
  <div style="position: absolute; top: 0">
    <!-- Positioned relative to viewport, not parent! -->
  </div>
</div>

Good:
<div style="position: relative">       <!-- Containing block -->
  <div style="position: absolute; top: 0">
    <!-- Positioned relative to parent -->
  </div>
</div>

2. Expecting absolute to maintain width:

<div style="width: 500px">
  <div style="position: absolute">
    <!-- Width shrinks to content, NOT 500px! -->
  </div>
</div>

Fix:
<div style="position: absolute; width: 100%">
  <!-- Explicitly set width -->
</div>

3. Relative offset affecting siblings:

Mistake: Thinking relative offset moves other elements
Reality: Other elements ignore the offset

4. Absolute without height on parent:

<div style="position: relative">      <!-- height: auto -->
  <div style="position: absolute; height: 100%">
    <!-- height: 100% of what? Parent has no height! -->
  </div>
</div>

Fix:
<div style="position: relative; height: 400px">
  <div style="position: absolute; height: 100%">
    <!-- Now 400px -->
  </div>
</div>

When to use which:

Use position: relative when:
- Creating containing block for absolute children
- Slight positioning adjustments
- Need z-index but stay in flow
- Creating stacking context

Use position: absolute when:
- Overlays and modals
- Corner badges or icons
- Tooltips and popovers
- Content that should not affect layout
- Precise positioning needed

Modern alternatives:

Instead of position for centering:
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

Instead of absolute for layout:
.parent {
  display: grid;
  grid-template-areas: "header" "content" "footer";
}

But position still essential for:
- Overlays
- Dropdowns
- Tooltips
- Badges
- Sticky headers (position: sticky)
- Modals
*/


/**
98. How does overflow create new block formatting contexts?

The overflow property creates a Block Formatting Context (BFC) when set to anything 
except visible.

Block Formatting Context (BFC):

Definition:
Independent layout environment where elements layout without affecting outside elements

What creates a BFC:

1. Root element (<html>)
2. Floats (float ≠ none)
3. Absolute/fixed positioning
4. Inline-blocks
5. Table cells
6. display: flow-root
7. **overflow: hidden, auto, scroll** ← Most common
8. Flex items
9. Grid items
10. Contain: layout, content, paint

overflow and BFC:

These create BFC:
overflow: hidden;
overflow: auto;
overflow: scroll;
overflow: clip;

This does NOT create BFC:
overflow: visible;  / * Default * /

Effects of BFC created by overflow:

1. Contains floats:

Without BFC (overflow: visible):
<div class="container">
  <div style="float: left; width: 100px; height: 100px">Float</div>
</div>
<!-- Container height: 0 (float escapes) -->

With BFC (overflow: hidden):
<div class="container" style="overflow: hidden">
  <div style="float: left; width: 100px; height: 100px">Float</div>
</div>
<!-- Container height: 100px (float contained) -->

Visual:

Without BFC:
┌──────────────┐
└──────────────┘  ← Container has 0 height
┌──────┐
│Float │ ← Float escapes
└──────┘

With BFC:
┌──────────────┐
│┌──────┐      │
││Float │      │ ← Float contained
│└──────┘      │
└──────────────┘  ← Container wraps float

2. Prevents margin collapse:

Without BFC:
<div class="parent">
  <div style="margin-top: 20px">Child</div>
</div>
<!-- Parent's margin collapses with child's margin -->

With BFC:
<div class="parent" style="overflow: hidden">
  <div style="margin-top: 20px">Child</div>
</div>
<!-- Margins don't collapse -->

Example:

Without BFC:
.parent {
  margin-top: 30px;
}

.child {
  margin-top: 20px;  / * Collapses with parent * /
}
/ * Result: 30px total margin (larger wins), not 50px * /

With BFC:
.parent {
  margin-top: 30px;
  overflow: hidden;  / * Creates BFC * /
}

.child {
  margin-top: 20px;
}
/ * Result: 30px + 20px = 50px total * /

3. Excludes external floats:

<div style="float: left; width: 100px">Float</div>
<div style="overflow: hidden">
  This text doesn't wrap around the float
</div>

Without overflow:
┌──────┐
│Float │ Text wraps
└──────┘ around float

With overflow: hidden (BFC):
┌──────┐ ┌────────────┐
│Float │ │Text stays  │
└──────┘ │in its box  │
         └────────────┘

Real-world examples:

Clear floats (old technique):

.clearfix {
  overflow: hidden;  / * Creates BFC, contains floats * /
}

<div class="clearfix">
  <div style="float: left">Float 1</div>
  <div style="float: left">Float 2</div>
</div>
<!-- Container wraps floats -->

Modern alternative:
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

Two-column layout with float:

<div style="float: left; width: 200px">Sidebar</div>
<div style="overflow: hidden">
  <!-- Content doesn't wrap around sidebar -->
  Main content
</div>

Prevent margin collapse:

.card {
  overflow: hidden;  / * Prevent margin collapse * /
  padding: 20px;
}

.card > *:first-child {
  margin-top: 20px;  / * Won't collapse with card * /
}

Contain child floats:

.image-gallery {
  overflow: hidden;  / * Wraps floated images * /
}

.image-gallery img {
  float: left;
  width: 200px;
  margin: 10px;
}

Different overflow values:

overflow: hidden:
- Creates BFC ✓
- Clips overflowing content
- No scrollbars

.container {
  overflow: hidden;
  width: 300px;
  height: 200px;
}
/ * Content outside 300x200 is clipped * /

overflow: auto:
- Creates BFC ✓
- Shows scrollbars if content overflows
- Preferred for most cases

.container {
  overflow: auto;
  max-height: 400px;
}
/ * Scrollbar appears if content > 400px * /

overflow: scroll:
- Creates BFC ✓
- Always shows scrollbars (even if no overflow)

.container {
  overflow: scroll;  / * Always shows scrollbars * /
}

overflow: clip:
- Creates BFC ✓
- Clips content (like hidden)
- Disables programmatic scrolling

.container {
  overflow: clip;
}

overflow-x and overflow-y:

.container {
  overflow-x: hidden;  / * Horizontal BFC * /
  overflow-y: auto;    / * Vertical BFC * /
}

Modern alternative: display: flow-root

Explicitly create BFC without overflow side effects:

.container {
  display: flow-root;  / * Creates BFC, no clipping * /
}

Benefits:
- No unintended clipping
- No scrollbars
- Semantic (intent clear)
- Modern browsers only

Comparison:

overflow: hidden:
+ Creates BFC
- Clips content
- May hide important content

display: flow-root:
+ Creates BFC
+ No clipping
+ Semantic
- Newer property (IE not supported)

Common use cases:

1. Containing floats:
.container {
  overflow: hidden;  / * or display: flow-root * /
}

2. Preventing margin collapse:
.card {
  overflow: hidden;
  padding: 20px;
}

3. Creating column that excludes floats:
.sidebar { float: left; width: 200px; }
.content { overflow: hidden; }

4. Scrollable containers:
.chat-messages {
  overflow-y: auto;
  max-height: 500px;
}

5. Horizontal scrolling:
.carousel {
  overflow-x: auto;
  white-space: nowrap;
}

Best practices:

1. Prefer display: flow-root:
For BFC without side effects (modern browsers)

2. Use overflow: auto for scrolling:
Better than overflow: scroll (no unnecessary scrollbars)

3. Be careful with overflow: hidden:
May clip important content (tooltips, dropdowns)

4. Consider modern layout:
Flexbox/Grid often better than float + overflow

5. Test overflow behavior:
Ensure content not accidentally clipped

Debugging BFC:

Check if element creates BFC:
function createsBFC(element) {
  const style = getComputedStyle(element);
  
  return (
    style.display === 'flow-root' ||
    style.display === 'inline-block' ||
    style.display.includes('flex') ||
    style.display.includes('grid') ||
    style.position === 'absolute' ||
    style.position === 'fixed' ||
    style.float !== 'none' ||
    (style.overflow !== 'visible' && style.overflow !== 'clip')
  );
}

Visual debugging:
.bfc {
  outline: 2px solid red;  / * Highlight BFC containers * /
}

Summary:

overflow creates BFC when:
- overflow: hidden, auto, scroll, clip
- NOT overflow: visible

BFC effects:
- Contains floats
- Prevents margin collapse
- Excludes external floats
- Creates independent layout

Modern alternative:
- display: flow-root (preferred)
*/


/**
99. What is isolation: isolate and why is it used?

The isolation property controls whether an element creates a new stacking context.

isolation: isolate

Syntax:
.element {
  isolation: isolate;  / * Creates stacking context * /
}

Values:
- auto: Does not create stacking context (default)
- isolate: Creates new stacking context

Purpose:

Explicitly create a stacking context without side effects.

What it does:

1. Creates stacking context:
Establishes new z-index context

2. Isolates blending:
With mix-blend-mode, contains blending to parent

3. No other effects:
Unlike opacity, transform, etc., it ONLY creates stacking context

Comparison to other methods:

Creating stacking context:

Method 1 - opacity:
.element {
  opacity: 0.99;  / * Creates context, but affects transparency * /
}
Side effect: Element becomes transparent

Method 2 - transform:
.element {
  transform: translateZ(0);  / * Creates context, GPU layer * /
}
Side effect: GPU compositing, fixed position children behavior changes

Method 3 - z-index + position:
.element {
  position: relative;
  z-index: 1;  / * Creates context * /
}
Side effect: Changes positioning context

Method 4 - isolation (best):
.element {
  isolation: isolate;  / * Creates context, NO side effects * /
}
No side effects!

Why use isolation: isolate:

1. Explicit intent:
Makes it clear you want a stacking context

2. No side effects:
Doesn't change appearance or behavior

3. Contain z-index conflicts:
Prevent z-index wars

4. Control blend modes:
Contain mix-blend-mode effects

Use case 1: Contain z-index scope

Problem:
<div class="parent">
  <div style="z-index: 100">Child 1</div>
  <div style="z-index: 10">Child 2</div>
</div>
<div class="other" style="z-index: 50">Other</div>

Without isolation:
- Child 1 (z-index: 100) appears above Other (z-index: 50)
- Leaks out of parent context

With isolation:
<div class="parent" style="isolation: isolate">
  <div style="z-index: 100">Child 1</div>
  <div style="z-index: 10">Child 2</div>
</div>
<div class="other" style="z-index: 50">Other</div>

Result:
- Child z-indexes contained within parent
- Parent treated as single unit in outer stacking context
- More predictable layering

Use case 2: Control mix-blend-mode

Without isolation:
<div class="parent">
  <div class="bg">Background</div>
  <div style="mix-blend-mode: multiply">
    <!-- Blends with EVERYTHING below, including body -->
  </div>
</div>

With isolation:
<div class="parent" style="isolation: isolate">
  <div class="bg">Background</div>
  <div style="mix-blend-mode: multiply">
    <!-- Only blends with .bg, isolated to parent -->
  </div>
</div>

Example:
<div class="card" style="background: white; isolation: isolate">
  <div class="overlay" style="mix-blend-mode: multiply; background: blue">
    <!-- Blends only with card background -->
  </div>
</div>

Use case 3: Component isolation

Component-based architecture:

.component {
  isolation: isolate;  / * Self-contained stacking * /
}

.component__layer1 { z-index: 1; }
.component__layer2 { z-index: 2; }
.component__layer3 { z-index: 3; }

Benefits:
- Component z-indexes don't leak
- No conflicts with other components
- Easier to reason about

React/Vue example:
.modal {
  isolation: isolate;  / * Modal's z-indexes self-contained * /
}

.modal__backdrop { z-index: 1; }
.modal__dialog { z-index: 2; }
.modal__close { z-index: 3; }

Use case 4: Prevent z-index escalation

Bad practice (z-index war):
.dropdown { z-index: 100; }
.modal { z-index: 1000; }
.tooltip { z-index: 10000; }
.notification { z-index: 100000; }  / * Getting out of hand! * /

Better with isolation:
.dropdown-container {
  isolation: isolate;  / * Dropdown z-indexes contained * /
}

.dropdown__trigger { z-index: 1; }
.dropdown__menu { z-index: 2; }

.modal-container {
  isolation: isolate;  / * Modal z-indexes contained * /
}

.modal__backdrop { z-index: 1; }
.modal__content { z-index: 2; }

Real-world examples:

Card component:
.card {
  isolation: isolate;  / * Self-contained stacking * /
  position: relative;
}

.card__image { z-index: 1; }
.card__overlay { z-index: 2; }
.card__badge { z-index: 3; }

Dropdown menu:
.dropdown {
  isolation: isolate;
  position: relative;
}

.dropdown__trigger { z-index: 1; }
.dropdown__menu {
  z-index: 2;
  position: absolute;
}

Image gallery with overlay:
.gallery {
  isolation: isolate;
  background: white;
}

.gallery__image { z-index: 1; }
.gallery__overlay {
  z-index: 2;
  mix-blend-mode: multiply;  / * Only blends within gallery * /
}

Design system:
:root {
  / * Global z-index scale * /
  --z-base: 0;
  --z-dropdown: 100;
  --z-modal: 1000;
}

.component {
  isolation: isolate;  / * Component uses local z-index * /
}

.component__layer1 { z-index: 1; }
.component__layer2 { z-index: 2; }

.modal {
  z-index: var(--z-modal);  / * Global z-index * /
  isolation: isolate;  / * But internal layers isolated * /
}

Browser support:

Excellent support in modern browsers:
- Chrome 41+
- Firefox 36+
- Safari 8+
- Edge 79+

Not supported: IE11

Polyfill:
For older browsers, use alternative methods:

.component {
  position: relative;
  z-index: 0;  / * Creates stacking context in old browsers * /
}

Best practices:

1. Use for components:
Each major component should be isolated

2. Document intent:
Comment why isolation is used

.modal {
  isolation: isolate;  / * Contain modal z-indexes * /
}

3. Combine with CSS custom properties:
.component {
  isolation: isolate;
  --local-z-base: 0;
  --local-z-overlay: 10;
  --local-z-top: 20;
}

4. Prefer over opacity/transform:
When you only need stacking context

5. Use in design systems:
Standard part of component architecture

Debugging:

Check if creates stacking context:
const style = getComputedStyle(element);
if (style.isolation === 'isolate') {
  console.log('Creates stacking context via isolation');
}

Visual debugging:
.isolated {
  outline: 2px dashed blue;  / * Highlight isolated components * /
}

Common mistakes:

1. Forgetting it creates stacking context:
Affects z-index behavior of descendants

2. Overusing:
Not every element needs isolation

3. Not documenting:
Other developers may not understand why it's used

4. Mixing strategies:
Inconsistent use of isolation vs other methods

Summary:

isolation: isolate:
- Creates stacking context
- No visual side effects
- Isolates z-index scope
- Contains blend modes
- Best practice for components

Use when:
- Building reusable components
- Preventing z-index conflicts
- Controlling blend modes
- Explicit stacking context needed
*/


/**
100. What is will-change and how does it affect performance? [web:107][web:110]

The will-change CSS property hints to browsers that an element will change, allowing 
optimization [web:110].

Definition [web:110]:
will-change hints to browsers how an element is expected to change [web:110]. Browsers 
may set up optimizations before the element actually changes [web:110].

Syntax:

.element {
  will-change: transform;  / * Optimize for transform changes * /
}

Values:
- auto: No particular optimization
- scroll-position: Element will scroll
- contents: Element's contents will change
- <custom-property>: Specific property will change (transform, opacity, etc.)

Common properties:
.element {
  will-change: transform;
  will-change: opacity;
  will-change: left, top;
  will-change: scroll-position;
  will-change: contents;
}

How it works [web:107]:

Without will-change:
1. Change CSS property
2. Browser recalculates layout/paint
3. Creates GPU layer (if needed)
4. Renders change
5. Tears down layer

With will-change [web:107]:
1. Browser creates GPU layer in advance [web:107]
2. Element ready for changes
3. Change CSS property
4. GPU composites changes (fast!) [web:107]
5. No layout/paint recalculation needed

Result: Dramatically faster animations [web:107]

Performance impact [web:107]:

Real-world example from BitListen [web:107]:

Without will-change:
.floatableDiv {
  position: absolute;
}

Performance: Framerate drops, janky animation [web:107]

With will-change [web:107]:
.floatableDiv {
  position: absolute;
  will-change: transform;
}

Performance: 120fps, buttery smooth! [web:107]
Never dropped below 120fps during profiling [web:107]

Dramatic improvement with one line of CSS [web:107]!

When to use will-change [web:107]:

Good use cases:

1. Transform animations:
.animated-element {
  will-change: transform;
  transition: transform 0.3s;
}

.animated-element:hover {
  transform: scale(1.1);
}

2. Opacity transitions:
.fade-element {
  will-change: opacity;
  transition: opacity 0.3s;
}

3. JavaScript animations:
// Before animation starts
element.style.willChange = 'transform';

// Animate
element.style.transform = `translateX(${x}px)`;

// After animation ends
element.style.willChange = 'auto';

4. Scroll-driven animations:
.parallax {
  will-change: transform;
}

window.addEventListener('scroll', () => {
  parallax.style.transform = `translateY(${scrollY * 0.5}px)`;
});

5. Frequently changing elements [web:107]:
Carousel items, draggable elements, video players

When NOT to use will-change [web:107]:

1. Static elements [web:107]:
Don't use on elements that never change [web:107]

Bad:
.header {
  will-change: transform;  / * Header never animates! * /
}

2. Too many elements:
Creates too many GPU layers, hurts performance

Bad:
* {
  will-change: transform;  / * Every element! Bad! * /
}

3. Premature optimization:
Only use when you have performance problems

4. Long-term application:
Should be temporary, applied before animation, removed after

Performance costs [web:107]:

will-change uses resources [web:107]:
- Creates GPU layer
- Uses GPU memory
- Increases memory usage

Trade-off [web:107]:
- Moving elements: will-change helps [web:107]
- Static elements: will-change hurts [web:107]

Browser smart enough to composite static elements only once [web:107]

Best practices [web:110]:

1. Apply before changes start [web:110]:
Give browser time to optimize [web:110]

Good:
.element:hover {
  will-change: transform;
}

.element:active {
  transform: scale(0.95);
}

2. Remove after changes end [web:110]:
Don't leave permanently [web:110]

element.addEventListener('mouseenter', () => {
  element.style.willChange = 'transform';
});

element.addEventListener('mouseleave', () => {
  element.style.willChange = 'auto';
});

3. Use sparingly [web:110]:
Only on elements that actually change [web:110]

4. Don't use in stylesheets for many elements:
Apply dynamically via JavaScript

Bad:
.list-item {
  will-change: transform;  / * 1000 list items = 1000 layers! * /
}

Good:
// Only apply to item being dragged
function startDrag(item) {
  item.style.willChange = 'transform';
}

function endDrag(item) {
  item.style.willChange = 'auto';
}

5. Monitor memory usage:
Too many will-change can exhaust GPU memory

Real-world examples:

Carousel [web:107]:
.carousel-item {
  position: absolute;
  will-change: transform;  / * Items frequently move * /
}

.carousel-item:not(.active) {
  will-change: auto;  / * Remove from inactive items * /
}

Drag and drop:
const draggable = document.querySelector('.draggable');

draggable.addEventListener('pointerdown', () => {
  draggable.style.willChange = 'transform';
});

draggable.addEventListener('pointermove', (e) => {
  draggable.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

draggable.addEventListener('pointerup', () => {
  draggable.style.willChange = 'auto';
});

Hover animation:
.card {
  transition: transform 0.3s;
}

.card:hover {
  will-change: transform;  / * Apply on hover * /
  transform: translateY(-10px);
}

Scroll animation:
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.willChange = 'transform, opacity';
      entry.target.classList.add('animate');
    } else {
      entry.target.style.willChange = 'auto';
    }
  });
});

animatedElements.forEach(el => observer.observe(el));

Properties that benefit most:

GPU-accelerated properties:
will-change: transform;     / * Best benefit * /
will-change: opacity;       / * Best benefit * /
will-change: filter;        / * Good benefit * /

Layout properties (less benefit):
will-change: width;         / * Still triggers layout * /
will-change: height;        / * Still triggers layout * /

Measuring impact:

Chrome DevTools Performance tab:
1. Record animation without will-change
2. Look for layout/paint times
3. Add will-change
4. Record again
5. Compare frame rates [web:107]

Rendering tab:
- FPS meter shows frame rate improvement
- Layer borders show GPU layers created

Common mistakes:

1. Applying to everything:
* { will-change: transform; }  / * Bad! * /

2. Never removing:
.element { will-change: transform; }  / * Permanent! Bad! * /

3. Not giving browser time:
element.style.willChange = 'transform';
element.style.transform = 'translateX(100px)';  / * Too soon! * /
Better:
element.style.willChange = 'transform';
requestAnimationFrame(() => {
  element.style.transform = 'translateX(100px)';  / * Give time to optimize * /
});

4. Using for one-time changes:
If element only animates once, may not be worth it

Alternatives:

Modern approach (if will-change not needed):

Use transform and opacity:
.element {
  transform: translateZ(0);  / * Force GPU layer * /
  / * Old hack, but works * /
}

Or just use good animation properties:
.element {
  / * transform and opacity are fast without will-change * /
  transition: transform 0.3s, opacity 0.3s;
}

Browser support [web:110]:

Excellent support:
- Chrome 36+
- Firefox 36+
- Safari 9.1+
- Edge 79+

Not supported: IE11

Graceful degradation:
@supports (will-change: transform) {
  .element {
    will-change: transform;
  }
}

Summary:

will-change:
- Hints to browser about future changes
- Creates GPU layer in advance [web:107]
- Dramatically improves animation performance [web:107]
- Uses memory/GPU resources [web:107]

Use for:
- Frequently animated elements [web:107]
- Transform/opacity changes
- Scroll-driven animations
- Drag and drop

Don't use:
- On static elements [web:107]
- On too many elements
- Permanently
- Without testing

Best practice:
Apply before animation, remove after [web:110]
*/


/**
101. What is pointer-events in CSS?

The pointer-events property controls whether an element can be a target of mouse events.

Syntax:

.element {
  pointer-events: none;  / * Ignore mouse events * /
}

Values:

1. auto (default):
Element responds to mouse events normally

.element {
  pointer-events: auto;  / * Can click, hover, etc. * /
}

2. none:
Element doesn't respond to mouse events

.element {
  pointer-events: none;  / * Ignores clicks, hovers * /
}

Mouse events pass through to elements below

How it works:

With pointer-events: auto (default):
<div class="overlay">
  <div class="content">Click me</div>
</div>

Clicks on overlay trigger overlay events

With pointer-events: none:
<div class="overlay" style="pointer-events: none">
  <div class="content">Click me</div>
</div>

Clicks pass through overlay to elements below

Visual:

┌────────────────┐
│ Overlay        │ ← pointer-events: none (clicks pass through)
│  ┌──────────┐  │
│  │ Content  │  │ ← Can still be clicked
│  └──────────┘  │
└────────────────┘
     ↓
┌────────────────┐
│ Element below  │ ← Receives clicks through overlay
└────────────────┘

Use cases:

1. Overlays that shouldn't block clicks:

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;  / * Clicks pass through * /
}

.overlay__content {
  pointer-events: auto;  / * But modal is clickable * /
}

HTML:
<div class="overlay">
  <div class="overlay__content">
    <button>Click me</button>  <!-- Works! -->
  </div>
</div>
<!-- Clicks outside modal pass through overlay -->

2. Disabled buttons/inputs:

.button:disabled {
  opacity: 0.5;
  pointer-events: none;  / * Can't click * /
  cursor: not-allowed;
}

3. Loading states:

.loading {
  position: relative;
  pointer-events: none;  / * Prevent interaction while loading * /
  opacity: 0.6;
}

.loading::after {
  content: "";
  position: absolute;
  / * spinner styles * /
}

<form class="loading">
  <input>  <!-- Can't interact while loading -->
  <button>Submit</button>  <!-- Can't click -->
</form>

4. Decorative elements:

.decoration {
  position: absolute;
  pointer-events: none;  / * Don't interfere with content below * /
}

<div class="container">
  <div class="decoration"></div>  <!-- Clicks pass through -->
  <button>Click me</button>  <!-- Still clickable -->
</div>

5. Transparent overlays:

.glass-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  pointer-events: none;  / * Don't block underlying content * /
}

6. SVG click targets:

<svg>
  <rect class="background" pointer-events="none" />
  <circle class="interactive" pointer-events="auto" />
</svg>

7. Tooltips during drag:

.dragging .tooltip {
  pointer-events: none;  / * Tooltip doesn't interfere with drag * /
}

8. Semi-transparent overlays:

.page-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;  / * Can still click page elements * /
}

.page-mask.active {
  pointer-events: auto;  / * Block clicks when active * /
}

Effects on events:

Events affected by pointer-events: none:
- click
- dblclick
- mousedown, mouseup
- mouseover, mouseout
- mouseenter, mouseleave
- hover (CSS :hover pseudo-class)
- contextmenu
- drag events

Events NOT affected:
- Keyboard events (keydown, keyup)
- Focus events
- Scroll events (on the element itself)

Example:
<input style="pointer-events: none">
<!-- Can't click, but can still tab to focus! -->

Inheritance:

pointer-events is inherited:

.parent {
  pointer-events: none;
}

.child {
  / * Inherits pointer-events: none * /
}

Override for specific children:
.parent {
  pointer-events: none;
}

.child {
  pointer-events: auto;  / * Re-enable for this child * /
}

Real-world patterns:

Modal with clickable content:
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;  / * Backdrop doesn't block * /
}

.modal-content {
  pointer-events: auto;  / * Content is interactive * /
  background: white;
  padding: 20px;
}

<div class="modal-backdrop">
  <div class="modal-content">
    <h2>Modal Title</h2>
    <button>Close</button>  <!-- Works! -->
  </div>
</div>

Disabled form during submission:
form.submitting {
  pointer-events: none;
  opacity: 0.6;
  position: relative;
}

form.submitting::after {
  content: "Submitting...";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

Draggable element:
.draggable {
  cursor: move;
}

.draggable.dragging {
  opacity: 0.7;
  pointer-events: none;  / * Ignore events on dragged element * /
}

Click-through overlay with specific targets:
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.overlay__highlight {
  pointer-events: auto;  / * Only highlights clickable * /
  background: rgba(255, 255, 0, 0.3);
}

Cursor interaction:

pointer-events affects cursor:

.element {
  cursor: pointer;
  pointer-events: none;
}
/ * cursor: pointer has no effect (no pointer events) * /

Common mistake:
.button {
  pointer-events: none;
  cursor: not-allowed;  / * Won't show! * /
}

Solution - use wrapper:
<div style="cursor: not-allowed">
  <button style="pointer-events: none">Disabled</button>
</div>

Performance:

pointer-events: none is performant:
- Browser skips hit-testing for element
- Slightly faster rendering
- Good for complex overlays

Browser support:

Excellent support:
- All modern browsers
- IE11+

Limitations in SVG:
SVG has more pointer-events values:
- visiblePainted, visibleFill, visibleStroke
- painted, fill, stroke
- all

But for HTML, only auto and none are widely used

Accessibility concerns:

Keyboard navigation still works:

<button style="pointer-events: none">
  <!-- Can't click, but can still tab + Enter -->
</button>

To fully disable:
<button disabled>
  <!-- Can't click OR keyboard activate -->
</button>

Screen readers:
pointer-events doesn't affect screen readers
Use aria-disabled or disabled attribute

Best practices:

1. Don't rely solely on pointer-events:
Use disabled attribute for form controls

2. Provide visual feedback:
Add opacity or cursor changes

.disabled {
  pointer-events: none;
  opacity: 0.5;
  filter: grayscale(100%);
}

3. Consider keyboard users:
Ensure keyboard navigation still works (or doesn't)

4. Use for overlays and decorations:
Perfect for non-interactive visual elements

5. Re-enable for children when needed:
Parent can have pointer-events: none, children auto

6. Document usage:
Comment why pointer-events is used

Testing:

// Check if element responds to clicks
function isInteractive(element) {
  const style = getComputedStyle(element);
  return style.pointerEvents !== 'none';
}

// Test clicking through element
element.style.pointerEvents = 'none';
// Click should pass through to element below

Summary:

pointer-events:
- Controls mouse event targeting
- none: clicks pass through
- auto: normal behavior (default)

Use for:
- Click-through overlays
- Disabled elements
- Loading states
- Decorative elements
- Complex layered UIs

Gotchas:
- Doesn't affect keyboard events
- Doesn't change cursor (need wrapper)
- Is inherited
- Doesn't replace disabled attribute
*/


/**
102. What is the difference between visibility, display, and opacity?

These three properties hide elements but with different effects on layout, interaction, 
and accessibility.

Comparison table:

Property    | Visible | Space Reserved | Screen Readers | Animatable | Events
------------|---------|----------------|----------------|------------|--------
display     | Yes/No  | No (none)      | No (none)      | No*        | Yes/No
visibility  | Yes/No  | Yes            | No (hidden)    | Yes        | No
opacity     | Yes/No  | Yes            | Yes            | Yes        | Yes

* display can't be animated directly, but can transition

display Property:

Values:
- block, inline, flex, grid, etc.: Element visible
- none: Element hidden

Behavior:

display: none:
.hidden {
  display: none;
}

Effects:
- Element removed from layout flow
- No space reserved
- Can't be animated
- Not read by screen readers
- No events (can't click)

Example:
<div>First</div>
<div style="display: none">Second (hidden)</div>
<div>Third</div>

Layout:
First
Third  ← Moved up, no space for Second

Use cases:
- Toggle elements in/out
- Responsive design (hide on mobile)
- Conditional rendering

.menu {
  display: none;
}

.menu.open {
  display: block;
}

visibility Property:

Values:
- visible: Element visible (default)
- hidden: Element hidden
- collapse: For table rows/columns

Behavior:

visibility: hidden:
.invisible {
  visibility: hidden;
}

Effects:
- Element hidden but space reserved
- Can be animated
- Not read by screen readers
- No events (can't click)

Example:
<div>First</div>
<div style="visibility: hidden">Second (invisible)</div>
<div>Third</div>

Layout:
First
[empty space where Second is]
Third  ← Stays in place

Children can override:
<div style="visibility: hidden">
  Parent hidden
  <div style="visibility: visible">
    But child visible!
  </div>
</div>

Use cases:
- Preserve layout while hiding
- Animated hide/show
- Tooltips (keep space)

.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.3s, opacity 0.3s;
}

.tooltip.show {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.3s;
}

opacity Property:

Values:
- 0: Fully transparent (hidden)
- 0.5: Semi-transparent
- 1: Fully opaque (default)

Behavior:

opacity: 0:
.transparent {
  opacity: 0;
}

Effects:
- Element transparent but space reserved
- Can be animated smoothly
- Read by screen readers
- Events still work (can click invisible element!)

Example:
<div>First</div>
<div style="opacity: 0">Second (transparent)</div>
<div>Third</div>

Layout:
First
[invisible Second, but takes space]
Third  ← Stays in place

Can still interact:
<button style="opacity: 0">
  <!-- Invisible but still clickable! -->
</button>

Use cases:
- Fade animations
- Hover effects
- Overlays

.fade {
  opacity: 0;
  transition: opacity 0.3s;
}

.fade.visible {
  opacity: 1;
}

Side-by-side comparison:

HTML:
<div>Element 1</div>
<div class="test">Element 2 (hidden)</div>
<div>Element 3</div>

display: none:
Element 1
Element 3  ← No gap

Layout flow: ▓░░▓
             (no space for middle)

visibility: hidden:
Element 1
           ← Gap where Element 2 is
Element 3

Layout flow: ▓ ░ ▓
             (space preserved)

opacity: 0:
Element 1
           ← Invisible Element 2 (but clickable)
Element 3

Layout flow: ▓ [invisible] ▓
             (space preserved, interactive)

Animation differences:

display (can't animate directly):
Bad:
.element {
  display: none;
  transition: display 0.3s;  / * Doesn't work! * /
}

Workaround:
@keyframes fadeOut {
  0% { opacity: 1; display: block; }
  99% { opacity: 0; display: block; }
  100% { opacity: 0; display: none; }
}

Or use max-height trick:
.element {
  max-height: 1000px;
  transition: max-height 0.3s;
}

.element.hidden {
  max-height: 0;
  overflow: hidden;
}

visibility (can animate with delay):
.element {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.3s, opacity 0.3s;
}

.element.visible {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s, opacity 0.3s;
}

opacity (smoothly animatable):
.element {
  opacity: 0;
  transition: opacity 0.3s;
}

.element.visible {
  opacity: 1;
}

Interaction comparison:

Test: Click hidden element

display: none:
<button style="display: none">Click</button>
<!-- Can't click (not in layout) -->

visibility: hidden:
<button style="visibility: hidden">Click</button>
<!-- Can't click (events disabled) -->

opacity: 0:
<button style="opacity: 0">Click</button>
<!-- CAN click! (events still work) -->

Solution for opacity:
<button style="opacity: 0; pointer-events: none">Click</button>
<!-- Now can't click -->

Accessibility:

Screen reader behavior:

display: none:
<div style="display: none">Hidden from screen readers</div>
<!-- Not announced -->

visibility: hidden:
<div style="visibility: hidden">Hidden from screen readers</div>
<!-- Not announced -->

opacity: 0:
<div style="opacity: 0">Still read by screen readers!</div>
<!-- Announced! -->

Solution - hide from screen readers:
<div style="opacity: 0" aria-hidden="true">
  Hidden from screen readers
</div>

Or use:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

Real-world examples:

Modal fade-in:
.modal {
  display: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.modal.open {
  display: block;
}

.modal.visible {
  opacity: 1;
}

// JavaScript
modal.classList.add('open');
requestAnimationFrame(() => {
  modal.classList.add('visible');
});

Dropdown menu:
.dropdown-menu {
  visibility: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s;
}

.dropdown:hover .dropdown-menu {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

Loading overlay:
.overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.overlay.loading {
  opacity: 1;
  pointer-events: auto;
}

Responsive visibility:
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  .desktop-only {
    display: block;
  }
}

Fade on scroll:
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s, transform 0.6s;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

Performance:

display: none:
- Removes from render tree
- Fastest (no painting)
- No layout calculation

visibility: hidden:
- Still in render tree
- Layout calculated
- No painting
- Medium performance

opacity: 0:
- Still in render tree
- Layout calculated
- Still painted (transparent)
- Slowest (but GPU-accelerated)

Combination techniques:

Animated hide with display:
.element {
  opacity: 1;
  transition: opacity 0.3s;
}

.element.hiding {
  opacity: 0;
}

.element.hidden {
  display: none;
}

// JavaScript
element.classList.add('hiding');
setTimeout(() => {
  element.classList.add('hidden');
}, 300);

Clickable when visible:
.element {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.element.visible {
  opacity: 1;
  pointer-events: auto;
}

Best practices:

Use display: none when:
- Element truly not needed
- Responsive hiding
- Conditional rendering
- No animation needed

Use visibility: hidden when:
- Need to preserve layout
- Animated hiding
- Parent/child override needed

Use opacity: 0 when:
- Smooth fade animations
- Need transitions
- Complex animations
- Interactive during transition

Avoid opacity: 0 when:
- Want to prevent clicking
- Screen reader should ignore
- Performance critical

Summary:

display: none → Element gone, no space
visibility: hidden → Element invisible, space reserved
opacity: 0 → Element transparent, space reserved, interactive

Choose based on needs:
- Layout preservation?
- Animation required?
- Click interaction?
- Screen reader behavior?

*/