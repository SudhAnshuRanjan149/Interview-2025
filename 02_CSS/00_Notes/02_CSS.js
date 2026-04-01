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


/**
 * 1. What is CSS and why is it used?
 * ------------------------------------
 * CSS (Cascading Style Sheets) is a stylesheet language used to control the
 * presentation of HTML elements—layout, colors, spacing, fonts, responsiveness.
 *
 * Why it's used:
 * - Separates content (HTML) from design
 * - Improves maintainability
 * - Enables responsive, attractive layouts
 * - Allows reuse across multiple pages
 *
 *
 * 2. Ways to apply CSS (inline, internal, external)
 * ---------------------------------------------------
 * Inline CSS:
 * <p style="color: red;">Text</p>
 * - Applied directly to the element
 * - High specificity, hard to maintain
 *
 * Internal CSS:
 * <style>
 *   p { color: blue; }
 * </style>
 * - Inside <head>
 * - Good for small pages
 *
 * External CSS:
 * <link rel="stylesheet" href="styles.css">
 * - Best practice
 * - Reusable across pages and cached by browser
 *
 *
 * 3. Syntax of a CSS rule
 * -------------------------
 * selector {
 *   property: value;
 * }
 *
 * Example:
 * p {
 *   color: red;
 *   font-size: 16px;
 * }
 *
 *
 * 4. What are CSS selectors and how do they work?
 * -------------------------------------------------
 * Selectors target HTML elements for styling.
 * Browser applies styles to elements that match the selector pattern.
 *
 * Example:
 * p → selects all <p> elements
 * .box → selects elements with class="box"
 *
 *
 * 5. Types of selectors in CSS
 * ------------------------------
 * - Type selectors: p, div
 * - Class selectors: .btn
 * - ID selectors: #header
 * - Attribute selectors: input[type="text"]
 * - Universal selector: *
 * - Pseudo-classes: a:hover
 * - Pseudo-elements: ::before, ::after
 * - Combinators: div > p, ul li, a + b
 *
 *
 * 6. Difference between class selector and ID selector
 * ------------------------------------------------------
 * class (.class):
 * - Reusable on multiple elements
 * - Recommended for styling
 *
 * id (#id):
 * - Must be unique per page
 * - Higher specificity
 * - Avoid using for styling unless necessary
 *
 *
 * 7. Attribute selectors in CSS
 * -------------------------------
 * They select elements based on attributes or attribute values.
 *
 * Examples:
 * input[type="email"] → selects email inputs
 * a[target="_blank"] → selects links opening in new tab
 * img[alt] → selects images with alt attribute
 *
 *
 * 8. Pseudo-classes and pseudo-elements
 * ----------------------------------------
 * Pseudo-classes:
 * - Represent dynamic states of elements.
 * - Examples: :hover, :focus, :active, :nth-child()
 *
 * Pseudo-elements:
 * - Represent virtual elements.
 * - Examples: ::before, ::after, ::first-letter
 *
 * Difference:
 * - Pseudo-classes = state
 * - Pseudo-elements = part of element
 *
 *
 * 9. Universal selector (*)
 * ---------------------------
 * * selects all elements.
 *
 * Usage:
 * - Reset styles: * { margin: 0; padding: 0; }
 * - Rarely used for large projects due to performance cost
 *
 *
 * 10. What is specificity and how is it calculated?
 * ---------------------------------------------------
 * Specificity determines which CSS rule wins when multiple rules apply.
 *
 * Calculation:
 * - Inline styles → highest (1000)
 * - IDs → 100
 * - Classes, pseudo-classes, attributes → 10
 * - Elements, pseudo-elements → 1
 *
 * Example:
 * #nav .item p → 100 + 10 + 1 = 111
 *
 *
 * 11. What is the cascade in CSS?
 * ---------------------------------
 * The cascade is the decision process the browser uses to determine final styles.
 *
 * Order factors:
 * - Importance (!important)
 * - Specificity
 * - Source order (later rules override earlier)
 *
 * The final applied style = result of the cascade.
 *
 *
 * 12. What is !important and when to avoid it?
 * ----------------------------------------------
 * !important overrides all other declarations.
 *
 * Example:
 * p { color: red !important; }
 *
 * Problems:
 * - Makes CSS harder to maintain
 * - Breaks specificity rules
 * - Causes conflicts with libraries
 *
 * Use only as a last resort.
 *
 *
 * 13. CSS comments
 * -------------------
 * Written as:
 * /* comment *\/
 *
 * Used to document code; ignored by browser.
 *
 *
 * 14. Difference between `display: none` and `visibility: hidden`
 * ---------------------------------------------------------------
 * display: none:
 * - Element is removed from layout
 * - No space is reserved
 *
 * visibility: hidden:
 * - Element is hidden
 * - Space is still reserved
 *
 *
 * 15. Difference between block, inline, and inline-block
 * --------------------------------------------------------
 * block elements:
 * - Take full width
 * - Start on new line
 * - Allow width/height changes
 *
 * inline elements:
 * - Do not start new line
 * - Do not accept width/height
 * - Used inside text content
 *
 * inline-block elements:
 * - Behave like inline but allow width/height
 * - Useful for buttons, icons, badges
 */


/**
 * 16. Different units in CSS (px, em, rem, vw, vh, %)
 * -----------------------------------------------------
 * px:
 * - Absolute pixel unit
 * - Not responsive by default
 *
 * em:
 * - Relative to the font-size of the element’s parent
 *
 * rem:
 * - Relative to the root (html) font-size
 *
 * vw (viewport width):
 * - 1vw = 1% of browser window width
 *
 * vh (viewport height):
 * - 1vh = 1% of browser window height
 *
 * % (percentage):
 * - Relative to parent element’s size
 *
 *
 * 17. How absolute units differ from relative units?
 * -----------------------------------------------------
 * Absolute units:
 * - Fixed size regardless of context
 * - Example: px, cm, mm
 *
 * Relative units:
 * - Size adapts based on parent, root, or viewport
 * - Example: em, rem, %, vw, vh
 *
 * Absolute = static  
 * Relative = flexible/responsive  
 *
 *
 * 18. Difference between em and rem
 * -----------------------------------
 * em:
 * - Relative to parent element’s font-size
 * - Can compound (nested em values multiply)
 *
 * rem:
 * - Relative to root (html) font-size only
 * - Does NOT compound
 *
 * Example:
 * html { font-size: 16px; }
 * .box { font-size: 2em; }  → depends on parent
 * .box { font-size: 2rem; } → always 32px
 *
 *
 * 19. CSS color formats (hex, rgb, rgba, hsl)
 * ---------------------------------------------
 * hex:
 * - #RRGGBB format
 * - Example: #ff0000 (red)
 *
 * rgb():
 * - rgb(red, green, blue)
 * - Example: rgb(255, 0, 0)
 *
 * rgba():
 * - RGB with alpha transparency
 * - Example: rgba(255, 0, 0, 0.5)
 *
 * hsl():
 * - hsl(hue, saturation, lightness)
 * - Example: hsl(0, 100%, 50%)
 *
 *
 * 20. What is opacity and how does it differ from rgba alpha?
 * -------------------------------------------------------------
 * opacity:
 * - Controls transparency of the entire element (including child elements)
 * - Example: opacity: 0.5;
 *
 * rgba alpha:
 * - Controls transparency of JUST the color you apply
 * - Does NOT affect child elements
 *
 * Example difference:
 * parent { opacity: 0.5; }  → children become faded too  
 * parent { background: rgba(0,0,0,0.5); } → children stay fully opaque  
 */


/**
 * 21. What is the CSS box model?
 * --------------------------------
 * The box model describes how every element is structured in terms of:
 * - Content
 * - Padding
 * - Border
 * - Margin
 *
 * The browser uses this model to calculate layout, sizes, and spacing.
 *
 *
 * 22. What are content, padding, border, and margin?
 * ----------------------------------------------------
 * content:
 * - The actual text or image area inside the box.
 *
 * padding:
 * - Space between content and border.
 * - Increases element size from the inside.
 *
 * border:
 * - The line surrounding padding and content.
 * - Adds to the total element dimensions.
 *
 * margin:
 * - Space outside the border.
 * - Creates distance between elements.
 *
 *
 * 23. `box-sizing: content-box` vs `box-sizing: border-box`
 * -----------------------------------------------------------
 * content-box (default):
 * - width = content only
 * - padding + border are added OUTSIDE the width
 * - Actual element size becomes: width + padding + border
 *
 * border-box:
 * - width INCLUDES content + padding + border
 * - Makes layout easier and more predictable
 *
 * Example:
 * width: 200px; padding: 20px; border: 5px;
 *
 * content-box → final width = 200 + 20 + 20 + 5 + 5 = 250px  
 * border-box  → final width = 200px total  
 *
 *
 * 24. What is margin collapsing and when does it occur?
 * -------------------------------------------------------
 * Margin collapsing occurs when vertical margins of two elements meet
 * and combine into a single margin instead of adding together.
 *
 * Happens in:
 * - Adjacent block elements (one after another)
 * - Parent and first/last child (in some cases)
 * - Empty block elements with no padding/border
 *
 * Collapsed margin = the larger of the two margins.
 *
 *
 * 25. Difference between padding and margin
 * -------------------------------------------
 * padding:
 * - Inside the element’s box
 * - Affects element background color
 * - Increases element size
 *
 * margin:
 * - Outside the element’s border
 * - Creates space between separate elements
 * - Does NOT affect background or size
 *
 * Summary:
 * padding = internal spacing  
 * margin = external spacing  
 */


/**
 * 26. What is the float property and how does float-based layout work?
 * -----------------------------------------------------------------------
 * The float property moves an element to the left or right and lets text and inline
 * elements wrap around it.
 *
 * Example:
 * img { float: right; }
 *
 * Float-based layout (before flex/grid):
 * - Used floats to create columns
 * - Required manual width calculations
 * - Did not naturally stretch parent height
 *
 * Floats were originally designed for wrapping text around images, not layout.
 *
 *
 * 27. What is clearfix and why is it needed?
 * --------------------------------------------
 * Floated elements are removed from normal document flow, causing parent containers
 * to collapse (height becomes zero).
 *
 * Clearfix forces a parent to wrap around its floated children.
 *
 * Example clearfix:
 * .clearfix::after {
 *   content: "";
 *   display: block;
 *   clear: both;
 * }
 *
 * Used when:
 * - Child elements are floated
 * - Parent needs to contain them
 *
 *
 * 28. CSS position values (static, relative, absolute, fixed, sticky)
 * ---------------------------------------------------------------------
 * static:
 * - Default positioning
 * - Element follows normal flow
 *
 * relative:
 * - Offsets element from its normal position
 * - Establishes positioning context for absolutely positioned children
 *
 * absolute:
 * - Removed from normal flow
 * - Positioned relative to nearest positioned ancestor (not static)
 *
 * fixed:
 * - Positioned relative to the viewport (screen)
 * - Stays in place when scrolling (e.g., fixed nav bar)
 *
 * sticky:
 * - Behaves like relative until a scrollbar threshold is reached
 * - Then behaves like fixed
 *
 *
 * 29. What is stacking context in CSS?
 * --------------------------------------
 * A stacking context is a layer where elements are stacked along the z-axis.
 *
 * New stacking contexts form when:
 * - position + z-index applied (except static)
 * - opacity < 1
 * - transform applied
 * - filter applied
 * - flex/grid items with z-index
 *
 * Each context is isolated:
 * - Elements inside a stacking context cannot overlap elements outside using z-index.
 *
 *
 * 30. What is z-index and how does it work?
 * -------------------------------------------
 * z-index controls the stacking order of positioned elements along the z-axis.
 *
 * Rules:
 * - Only works on positioned elements (relative, absolute, fixed, sticky)
 * - Higher z-index appears above lower z-index
 * - Scoped by stacking contexts
 *
 *
 * 31. Inline, block, and inline-block display types
 * ---------------------------------------------------
 * inline:
 * - Does not start new line
 * - Width/height cannot be set
 *
 * block:
 * - Starts new line
 * - Width and height can be set
 *
 * inline-block:
 * - Inline placement + block capabilities
 * - Supports width and height
 *
 *
 * 32. Difference between `overflow: hidden`, `scroll`, and `auto`
 * ----------------------------------------------------------------
 * overflow: hidden
 * - Extra content is clipped
 * - No scrollbars
 *
 * overflow: scroll
 * - Always shows scrollbars, even if unnecessary
 *
 * overflow: auto
 * - Shows scrollbars only when content overflows
 *
 * Summary:
 * hidden → crop  
 * scroll → force scrollbars  
 * auto → scrollbars only when needed  
 */


/**
 * 33. What is Flexbox and when should it be used?
 * -------------------------------------------------
 * Flexbox (Flexible Box Layout) is a one-dimensional layout system used to create
 * responsive and flexible layouts without floats or manual calculations.
 *
 * Best used for:
 * - Centering elements
 * - Navigation bars
 * - Horizontal/vertical alignment
 * - Equal-height columns
 * - Small-scale component layouts
 *
 *
 * 34. What are flex container and flex items?
 * ---------------------------------------------
 * flex container:
 * - The parent element with display: flex or display: inline-flex.
 * - Controls layout direction, alignment, wrapping.
 *
 * flex items:
 * - Direct children of the flex container.
 * - They stretch/shrink based on flex container rules.
 *
 * Example:
 * .box { display: flex; }   → flex container  
 * .box > div               → flex items  
 *
 *
 * 35. What do justify-content, align-items, and align-content do?
 * -----------------------------------------------------------------
 * justify-content:
 * - Aligns flex items along the main axis (horizontal by default).
 * - Examples: flex-start, flex-end, center, space-between, space-around.
 *
 * align-items:
 * - Aligns items along the cross axis (vertical by default).
 * - Examples: stretch, center, flex-start, flex-end.
 *
 * align-content:
 * - Controls spacing between rows when flex-wrap creates multiple lines.
 * - Examples: stretch, center, space-between.
 *
 *
 * 36. What is flex-grow, flex-shrink, and flex-basis?
 * -----------------------------------------------------
 * flex-grow:
 * - Defines how much a flex item expands relative to others.
 * - 0 = no growth, 1 = grow to fill space.
 *
 * flex-shrink:
 * - Defines how items shrink when container space is limited.
 * - 0 = do not shrink, 1 = shrink proportionally.
 *
 * flex-basis:
 * - Initial size of element before grow/shrink.
 * - Can be px, %, auto, etc.
 *
 * Examples:
 * flex-grow: 1 → item expands  
 * flex-shrink: 0 → item won't shrink  
 * flex-basis: 200px → starting width  
 *
 *
 * 37. What is the shorthand flex property?
 * ------------------------------------------
 * flex: grow shrink basis;
 *
 * Example:
 * flex: 1 1 200px;
 *
 * Common patterns:
 * flex: 1;       → flex: 1 1 0
 * flex: 0 0 auto → do not grow/shrink
 *
 *
 * 38. What is flex-direction and how does it affect layout?
 * -----------------------------------------------------------
 * flex-direction controls the main axis of the layout.
 *
 * Values:
 * - row (default) → left to right
 * - row-reverse   → right to left
 * - column        → top to bottom
 * - column-reverse → bottom to top
 *
 * It changes:
 * - Direction of items
 * - What justify-content and align-items refer to
 *
 *
 * 39. What are flex-wrap and flex-flow?
 * ---------------------------------------
 * flex-wrap:
 * - Controls whether flex items wrap or stay on one line.
 *
 * Values:
 * - nowrap (default)
 * - wrap
 * - wrap-reverse
 *
 * flex-flow:
 * - Shorthand for flex-direction + flex-wrap.
 *
 * Example:
 * flex-flow: row wrap;
 *
 *
 * 40. How does align-self differ from align-items?
 * --------------------------------------------------
 * align-items:
 * - Applies alignment to ALL flex items (cross axis).
 *
 * align-self:
 * - Applies alignment to ONE specific item.
 * - Overrides align-items for that item only.
 *
 * Example:
 * align-items: center;   → all centered  
 * align-self: flex-end;  → only this one item moves  
 */


/**
 * 41. What is CSS Grid and how is it different from Flexbox?
 * ------------------------------------------------------------
 * CSS Grid is a two-dimensional layout system designed for creating complex,
 * responsive layouts. It controls both rows AND columns.
 *
 * Flexbox:
 * - One-dimensional (row OR column)
 *
 * Grid:
 * - Two-dimensional (rows AND columns simultaneously)
 *
 * When to use:
 * - Flexbox → component-level alignment, single-axis layouts
 * - Grid → full-page layouts, multi-axis control
 *
 *
 * 42. What are grid-template-columns and grid-template-rows?
 * ------------------------------------------------------------
 * They define the explicit grid structure by specifying column and row sizes.
 *
 * Example:
 * .container {
 *   display: grid;
 *   grid-template-columns: 200px 1fr 2fr;
 *   grid-template-rows: 100px auto;
 * }
 *
 * The values can be:
 * - px, %, fr, auto, minmax(), repeat(), etc.
 *
 *
 * 43. What is the repeat() function in CSS Grid?
 * ------------------------------------------------
 * repeat() reduces repetitive track definitions.
 *
 * Example:
 * grid-template-columns: repeat(3, 1fr);
 * → same as: 1fr 1fr 1fr
 *
 * repeat(auto-fill, 200px)
 * → dynamic columns that wrap based on container width
 *
 *
 * 44. What are grid areas and how are they defined?
 * ---------------------------------------------------
 * Grid areas are named regions of the grid that elements can be placed into.
 *
 * Step 1: Define areas on the container:
 * .container {
 *   display: grid;
 *   grid-template-areas:
 *     "header header"
 *     "sidebar main"
 *     "footer footer";
 * }
 *
 * Step 2: Assign child elements:
 * .header { grid-area: header; }
 * .sidebar { grid-area: sidebar; }
 *
 * This creates semantic, readable layouts.
 *
 *
 * 45. What is auto-fit vs auto-fill?
 * ------------------------------------
 * Both work with repeat() to create responsive grids.
 *
 * auto-fill:
 * - Fills the row with as many columns as possible.
 * - Empty tracks remain as placeholders.
 *
 * auto-fit:
 * - Similar, but collapses empty tracks.
 * - Content stretches to fill available space.
 *
 * Example:
 * grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
 *
 *
 * 46. How do minmax() and fractional units (fr) work?
 * -----------------------------------------------------
 * fr unit:
 * - Fraction of available space.
 * - Example: 1fr 2fr → second column twice as wide.
 *
 * minmax(min, max):
 * - Sets minimum and maximum size limits.
 * - Example: minmax(200px, 1fr)
 *   → Won’t shrink below 200px, but can expand.
 *
 *
 * 47. What are implicit vs explicit grid tracks?
 * ------------------------------------------------
 * Explicit tracks:
 * - Defined directly using grid-template-rows/columns.
 *
 * Implicit tracks:
 * - Automatically created by the browser when items exceed the explicit grid.
 *
 * Example:
 * If you place an item in row 5 but only defined 2 rows,
 * the browser creates implicit rows.
 *
 * Control implicit tracks:
 * grid-auto-rows: 100px;
 *
 *
 * 48. How does grid-template-areas simplify layouts?
 * ----------------------------------------------------
 * It allows you to design layouts visually using named regions.
 *
 * Example:
 * grid-template-areas:
 *   "nav   nav"
 *   "side  main"
 *   "foot  foot";
 *
 * instead of calculating row/column start/end positions.
 *
 * Benefits:
 * - Very readable
 * - Very easy to maintain
 * - Great for prototyping complex layouts quickly
 */


/**
 * 49. What is responsive web design?
 * ------------------------------------
 * Responsive design ensures a website adapts to different screen sizes and devices.
 * It uses flexible layouts, fluid images, and media queries so content looks good on:
 * - Mobile phones
 * - Tablets
 * - Laptops
 * - Large screens
 *
 * Goal:
 * - One website that scales and rearranges content automatically.
 *
 *
 * 50. What are media queries and how do you use them?
 * -----------------------------------------------------
 * Media queries apply styles conditionally based on device characteristics.
 *
 * Example:
 * @media (max-width: 600px) {
 *   body { font-size: 14px; }
 * }
 *
 * They target:
 * - Width
 * - Height
 * - Orientation
 * - Resolution
 *
 *
 * 51. What are breakpoints and how do you choose them?
 * -------------------------------------------------------
 * Breakpoints are screen widths where layout changes occur.
 *
 * Example common breakpoints:
 * - 480px (small phones)
 * - 768px (tablets)
 * - 1024px (laptops)
 * - 1200+ px (desktops)
 *
 * How to choose:
 * - Based on your layout’s natural “breaking” points
 * - Avoid device-specific values
 * - Test where elements need rearrangement
 *
 *
 * 52. What is mobile-first design?
 * -----------------------------------
 * Mobile-first means:
 * - Start designing and coding for small screens first
 * - Then enhance layout for larger screens using min-width media queries
 *
 * Benefits:
 * - Simpler, cleaner base CSS
 * - Better performance for mobile users
 * - Natural progressive enhancement
 *
 *
 * 53. Difference between min-width and max-width media queries
 * --------------------------------------------------------------
 * min-width:
 * - Styles apply when screen is wider than the given width
 * - Used for mobile-first approach
 *
 * Example:
 * @media (min-width: 800px) { ... }
 *
 * max-width:
 * - Styles apply when screen is narrower than the given width
 * - Desktop-first mindset
 *
 * Example:
 * @media (max-width: 800px) { ... }
 *
 * Summary:
 * min-width → mobile-first scaling up  
 * max-width → desktop-first scaling down  
 *
 *
 * 54. How do viewport units (vh, vw) help with responsive design?
 * ----------------------------------------------------------------
 * vh and vw scale relative to the viewport dimensions:
 *
 * - 1vw = 1% of viewport width
 * - 1vh = 1% of viewport height
 *
 * Useful for:
 * - Full-height hero sections (height: 100vh)
 * - Responsive typography (font-size: 5vw)
 * - Elements that scale with screen size
 *
 * They eliminate the need for fixed pixel values, making layouts fluid.
 */


/**
 * 55. What are web-safe fonts?
 * ------------------------------
 * Web-safe fonts are fonts that are commonly installed on most operating systems
 * (Windows, macOS, Linux). Because they are universally available, they display
 * consistently without needing downloads.
 *
 * Examples:
 * - Arial
 * - Times New Roman
 * - Georgia
 * - Verdana
 * - Courier New
 *
 * Used as fallback fonts when custom fonts fail to load.
 *
 *
 * 56. What is the @font-face rule?
 * ----------------------------------
 * @font-face allows you to load custom fonts hosted on your server.
 *
 * Example:
 * @font-face {
 *   font-family: "MyFont";
 *   src: url("MyFont.woff2") format("woff2");
 * }
 *
 * After defining:
 * body {
 *   font-family: "MyFont", sans-serif;
 * }
 *
 * Benefits:
 * - Enables custom typography
 * - Works across browsers with multiple file formats (woff2, woff, ttf)
 *
 *
 * 57. Difference between serif and sans-serif fonts
 * ---------------------------------------------------
 * serif:
 * - Fonts with decorative strokes at the ends of letters.
 * - Traditional, formal.
 * - Examples: Times New Roman, Georgia
 *
 * sans-serif:
 * - Fonts without decorative strokes.
 * - Modern, clean, easier to read on screens.
 * - Examples: Arial, Helvetica, Roboto
 *
 *
 * 58. What are font-weight, font-style, and font-variant?
 * ---------------------------------------------------------
 * font-weight:
 * - Controls thickness of text.
 * - Values: normal, bold, 100–900
 *
 * font-style:
 * - Controls italic or oblique styling.
 * - Values: normal, italic, oblique
 *
 * font-variant:
 * - Small-caps or stylistic variations.
 * - Example: font-variant: small-caps;
 *
 *
 * 59. What is line-height and how is it calculated?
 * --------------------------------------------------
 * line-height controls the vertical spacing between lines of text.
 *
 * Forms:
 * - number (multiplier): line-height: 1.5
 * - unit value: line-height: 24px
 * - percentage: line-height: 150%
 *
 * Calculation example:
 * font-size: 16px, line-height: 1.5 → 16 × 1.5 = 24px line height
 *
 * Does *not* include padding—only text spacing.
 *
 *
 * 60. What is letter-spacing and word-spacing?
 * ----------------------------------------------
 * letter-spacing:
 * - Controls horizontal space between individual letters.
 * - Example: letter-spacing: 2px;
 *
 * word-spacing:
 * - Controls space between words.
 * - Example: word-spacing: 10px;
 *
 * Used for readability, visual style, and branding.
 *
 *
 * 61. What is text-overflow and how does ellipsis work?
 * -------------------------------------------------------
 * text-overflow controls how hidden overflow text is shown.
 *
 * Example for ellipsis:
 * .box {
 *   width: 200px;
 *   white-space: nowrap;
 *   overflow: hidden;
 *   text-overflow: ellipsis;
 * }
 *
 * Requirements:
 * - The text must overflow
 * - Must be a single line (unless using -webkit-line-clamp for multi-line)
 *
 * Result:
 * → "This is a long text..."  
 *
 * text-overflow: ellipsis shows "..." when content doesn’t fit.
 */


/**
 * 62. What is transform and what are translate, rotate, scale, skew?
 * ---------------------------------------------------------------------
 * transform applies 2D/3D transformations to elements without affecting normal flow.
 *
 * Common transform functions:
 *
 * translate(x, y):
 * - Moves an element along X/Y axes.
 * - Example: transform: translate(50px, 20px);
 *
 * rotate(angle):
 * - Rotates an element around its center.
 * - Example: transform: rotate(45deg);
 *
 * scale(x, y):
 * - Increases or decreases size.
 * - Example: transform: scale(1.5);
 *
 * skew(x, y):
 * - Slants an element.
 * - Example: transform: skew(20deg, 10deg);
 *
 * Combined example:
 * transform: translateX(50px) rotate(30deg) scale(1.2);
 *
 *
 * 63. What are CSS transitions and how do they work?
 * -----------------------------------------------------
 * Transitions animate changes between property values over time.
 *
 * Syntax:
 * transition: property duration delay timing-function;
 *
 * Example:
 * div {
 *   transition: all 0.3s ease;
 * }
 * div:hover {
 *   transform: scale(1.1);
 * }
 *
 * When the property changes, the browser animates it smoothly.
 *
 *
 * 64. What is transition-timing-function?
 * -----------------------------------------
 * Controls acceleration pattern of a transition.
 *
 * Common values:
 * - ease (default)
 * - linear
 * - ease-in
 * - ease-out
 * - ease-in-out
 * - cubic-bezier(a,b,c,d)
 *
 * Example:
 * transition: transform 0.5s ease-in;
 *
 *
 * 65. What are CSS animations and keyframes?
 * --------------------------------------------
 * CSS animations allow multi-step animations without JavaScript.
 *
 * @keyframes defines the animation steps:
 *
 * @keyframes bounce {
 *   0%   { transform: translateY(0); }
 *   50%  { transform: translateY(-50px); }
 *   100% { transform: translateY(0); }
 * }
 *
 * Apply animation:
 * .box {
 *   animation: bounce 1s infinite;
 * }
 *
 *
 * 66. Difference between animation and transition
 * ------------------------------------------------
 * transition:
 * - Requires a trigger (hover, click, JS change)
 * - Only animates between two states
 *
 * animation:
 * - Runs automatically if desired
 * - Supports multiple keyframe steps
 * - More complex motion possible
 *
 * Summary:
 * transition → simple, 2-state  
 * animation → complex, multi-step  
 *
 *
 * 67. What is animation-fill-mode and animation-iteration-count?
 * -----------------------------------------------------------------
 * animation-fill-mode:
 * - Controls element style before/after animation plays.
 *
 * Values:
 * - none      → no style retention
 * - forwards  → keep final state
 * - backwards → apply initial keyframe before animation starts
 * - both      → forwards + backwards
 *
 * animation-iteration-count:
 * - Number of times animation repeats.
 * - Example: 3, 5, infinite
 *
 * Example:
 * .box {
 *   animation: fade 2s forwards;
 *   animation-iteration-count: 3;
 * }
 *
 *
 * 68. What is hardware acceleration in CSS animations?
 * ------------------------------------------------------
 * Hardware acceleration uses the GPU instead of the CPU to render animations.
 *
 * Triggered by:
 * - transform: translateZ(0);
 * - transform: translate3d(...)
 * - opacity changes
 *
 * Benefits:
 * - Smoother animations
 * - Reduced jank and lag
 *
 * Best practice:
 * Animate transform and opacity for best performance.
 */


/**
 * 69. What is the difference between opacity and visibility?
 * -----------------------------------------------------------
 * opacity:
 * - Controls transparency level (0 = fully transparent, 1 = opaque).
 * - Element still occupies space.
 * - Children become transparent too.
 *
 * visibility:
 * - visibility: hidden → hides element but keeps its space.
 * - visibility: visible → shows element.
 * - Does NOT affect transparency.
 *
 * Summary:
 * opacity hides visually but keeps element visible to cursor events unless 0;  
 * visibility hides element but keeps layout space.  
 *
 *
 * 70. What are box-shadow and text-shadow?
 * ------------------------------------------
 * box-shadow:
 * - Adds shadow around an element’s box (including padding + border).
 * - Syntax: box-shadow: offsetX offsetY blur spread color;
 *
 * Example:
 * box-shadow: 0 4px 10px rgba(0,0,0,0.3);
 *
 * text-shadow:
 * - Adds shadow behind text.
 * - Syntax: text-shadow: offsetX offsetY blur color;
 *
 * Example:
 * text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
 *
 *
 * 71. What are gradients (linear, radial, conic) in CSS?
 * ---------------------------------------------------------
 * Gradients create smooth color transitions.
 *
 * linear-gradient():
 * - Straight-line color transition.
 * - Example: background: linear-gradient(to right, red, blue);
 *
 * radial-gradient():
 * - Circular or elliptical gradient from center outwards.
 * - Example: background: radial-gradient(circle, red, blue);
 *
 * conic-gradient():
 * - Rotational gradient around a center point.
 * - Example: background: conic-gradient(red, yellow, blue);
 *
 * Used for backgrounds, charts, and decorative effects.
 *
 *
 * 72. What is filter: blur, brightness, contrast, grayscale, etc.?
 * ----------------------------------------------------------------
 * filter applies graphical effects to elements (like editing an image).
 *
 * Common filters:
 * - blur(px)
 * - brightness(%)
 * - contrast(%)
 * - grayscale(%)
 * - sepia(%)
 * - invert(%)
 * - saturate(%)
 *
 * Example:
 * img { filter: grayscale(100%) blur(2px); }
 *
 * Filters affect only the rendered appearance, not layout.
 *
 *
 * 73. What is backdrop-filter and when is it used?
 * --------------------------------------------------
 * backdrop-filter applies effects to the *background behind* an element.
 *
 * Example:
 * backdrop-filter: blur(10px);
 *
 * Commonly used for:
 * - Frosted-glass UI
 * - Modals
 * - Navigation bars
 *
 * Requires:
 * - Element must have background with transparency (rgba or opacity)
 * - Browser support (not universal in very old browsers)
 *
 *
 * 74. What is object-fit and object-position?
 * ---------------------------------------------
 * object-fit controls how replaced elements (img, video) fit inside their container.
 *
 * Values:
 * - cover → fill container, crop overflow
 * - contain → fit entirely, may leave empty space
 * - fill → stretch
 * - none → keep original size
 * - scale-down → smallest of none or contain
 *
 * object-position:
 * - Defines alignment inside container.
 * - Example: object-position: center top;
 *
 * Useful for responsive image/video containers (like hero banners).
 */


/**
 * 75. What are CSS custom properties (variables)?
 * -------------------------------------------------
 * CSS custom properties are reusable values defined with --variable-name syntax.
 *
 * Example:
 * :root {
 *   --primary-color: #3498db;
 * }
 *
 * .btn {
 *   background: var(--primary-color);
 * }
 *
 * Benefits:
 * - Reusable theme values
 * - Dynamic styling (can change via JS)
 * - Cascade-aware (inherit and override easily)
 *
 *
 * 76. What is the var() function and how do fallbacks work?
 * -----------------------------------------------------------
 * var() retrieves the value of a CSS custom property.
 *
 * Syntax:
 * var(--variable, fallback)
 *
 * Example:
 * color: var(--text-color, black);
 *
 * If --text-color is not defined, fallback “black” is used.
 *
 *
 * 77. What are calc(), min(), max(), and clamp() functions?
 * -----------------------------------------------------------
 * calc():
 * - Performs mathematical calculations.
 * Example: width: calc(100% - 40px);
 *
 * min():
 * - Chooses the smallest value.
 * Example: width: min(90%, 600px);
 *
 * max():
 * - Chooses the largest value.
 * Example: font-size: max(16px, 2vw);
 *
 * clamp(min, preferred, max):
 * - Sets a value that grows but stays within limits.
 * Example:
 * font-size: clamp(1rem, 2vw, 2rem);
 *
 * These functions help make layouts more flexible and responsive.
 *
 *
 * 78. Difference between root variables and component-level variables
 * ---------------------------------------------------------------------
 * root variables:
 * - Defined inside :root selector
 * - Global and accessible everywhere
 *
 * Example:
 * :root {
 *   --spacing: 1rem;
 * }
 *
 * component-level variables:
 * - Defined on a specific component
 * - Override root variables within that element’s scope
 *
 * Example:
 * .card {
 *   --spacing: 2rem;
 * }
 *
 * Summary:
 * - :root variables → global theme values  
 * - Component-level variables → local overrides for specific UI parts  
 */


/**
 * 79. What are CSS preprocessors?
 * ---------------------------------
 * CSS preprocessors are tools that extend CSS with advanced features
 * (variables, nesting, functions, loops) and compile into normal CSS.
 *
 * Common preprocessors:
 * - SASS/SCSS
 * - LESS
 * - Stylus
 *
 * Benefits:
 * - Cleaner, modular code
 * - Reusable logic (mixins, functions)
 * - Faster development for large projects
 *
 *
 * 80. What is SASS/SCSS and why is it used?
 * -------------------------------------------
 * SASS/SCSS is the most popular CSS preprocessor.
 *
 * Differences:
 * - SASS syntax → indentation-based (.sass files)
 * - SCSS syntax → CSS-like syntax (.scss files)
 *
 * Why it's used:
 * - Supports variables
 * - Nesting for cleaner hierarchy
 * - Mixins for reusable code blocks
 * - Partials for modular CSS
 * - Functions for dynamic calculations
 *
 * SCSS compiles → CSS that browsers can understand.
 *
 *
 * 81. What are nesting, variables, mixins, and extends in SASS?
 * --------------------------------------------------------------
 * variables:
 * - Store reusable values
 * $primary: #3498db;
 *
 * nesting:
 * - CSS written in parent-child structure
 * nav {
 *   ul { list-style: none; }
 * }
 *
 * mixins:
 * - Reusable blocks of CSS
 * @mixin center {
 *   display: flex;
 *   justify-content: center;
 *   align-items: center;
 * }
 *
 * extends:
 * - Share a set of rules between selectors
 * .btn { padding: 10px; }
 * .primary-btn { @extend .btn; }
 *
 *
 * 82. What are partials and imports in SCSS?
 * --------------------------------------------
 * partials:
 * - SCSS files starting with "_" and not compiled alone.
 * - Used for organizing code.
 * Example: _variables.scss, _mixins.scss
 *
 * imports:
 * - Include partials inside main SCSS.
 * @import "variables";
 * @import "mixins";
 *
 * Helps building modular CSS architecture.
 *
 *
 * 83. What are functions and loops in SCSS?
 * -------------------------------------------
 * functions:
 * - Perform calculations and return values.
 *
 * Example:
 * @function rem($px) {
 *   @return $px / 16 * 1rem;
 * }
 *
 * .text { font-size: rem(24); }
 *
 * loops:
 * - Automate repetitive styles.
 *
 * Example (for loop):
 * @for $i from 1 through 5 {
 *   .m-#{$i} { margin: #{$i * 4}px; }
 * }
 *
 * loops create multiple classes efficiently.
 */


/**
 * 84. What is the BEM naming methodology (Block, Element, Modifier)?
 * -------------------------------------------------------------------
 * BEM is a CSS naming convention that makes code predictable and maintainable.
 *
 * Block:
 * - The standalone, reusable component.
 * - Example: .card
 *
 * Element:
 * - A part of the block that performs a function.
 * - Written with __ (double underscore)
 * - Example: .card__title
 *
 * Modifier:
 * - A variation of the block or element.
 * - Written with -- (double hyphen)
 * - Example: .card--large, .card__title--highlight
 *
 * Purpose:
 * - Clear structure
 * - Avoid naming conflicts
 * - Improve scalability
 *
 *
 * 85. What is the difference between OOCSS, SMACSS, and BEM?
 * ------------------------------------------------------------
 * OOCSS (Object-Oriented CSS):
 * - Encourages separating structure from skin (appearance).
 * - Focuses on reusable “objects.”
 *
 * SMACSS (Scalable and Modular Architecture for CSS):
 * - Categorizes CSS into sections: base, layout, module, state, theme.
 * - Helps organize large codebases.
 *
 * BEM:
 * - Naming methodology that defines structure within components.
 * - Clear block–element–modifier pattern.
 *
 * Summary:
 * - OOCSS → conceptual approach to reusable styles  
 * - SMACSS → organizational system  
 * - BEM → naming pattern for components  
 *
 *
 * 86. What are utility classes and when should you use them?
 * ------------------------------------------------------------
 * Utility classes are single-purpose classes that apply one specific style.
 *
 * Examples:
 * .mt-2 { margin-top: 8px; }
 * .text-center { text-align: center; }
 * .flex { display: flex; }
 *
 * When to use:
 * - For repetitive spacing, display, alignment styles
 * - For rapidly building UI layouts
 * - When working with frameworks like Tailwind
 *
 * Benefits:
 * - Avoids deep CSS selectors
 * - Reduces specificity issues
 * - Makes design consistent across UI
 *
 *
 * 87. What is CSS architecture and why is it important for maintainability?
 * ---------------------------------------------------------------------------
 * CSS architecture is the strategy used to structure, organize, and scale CSS
 * in large projects.
 *
 * Why it's important:
 * - Prevents CSS from becoming messy and unmanageable
 * - Reduces specificity conflicts
 * - Improves readability and team collaboration
 * - Ensures predictable styling behavior
 *
 * Good CSS architecture uses:
 * - Naming conventions (BEM)
 * - Modularity
 * - Reusable components
 * - Clear folder structure
 *
 *
 * 88. How do you avoid CSS specificity wars?
 * --------------------------------------------
 * Specificity wars happen when developers keep adding more specific selectors
 * (IDs, !important, long selectors) to override styles.
 *
 * Ways to avoid:
 * - Use BEM or similar naming systems
 * - Rely on class selectors, not IDs
 * - Keep selectors short and flat
 * - Avoid !important unless absolutely necessary
 * - Use CSS variables for shared values
 * - Use component-based architecture (e.g., CSS Modules, Styled Components)
 *
 * Goal:
 * Maintain simple, predictable CSS rules without escalating specificity.
 */


/**
 * 89. How does CSS affect page performance?
 * -------------------------------------------
 * CSS impacts performance through:
 * - Render-blocking stylesheets delay page rendering.
 * - Large CSS files increase download time.
 * - Unused CSS adds unnecessary processing.
 * - Complex selectors slow down style calculation.
 * - Frequent layout-affecting changes trigger reflow.
 *
 * Good CSS practices improve:
 * - Load speed
 * - First Contentful Paint (FCP)
 * - Overall responsiveness
 *
 *
 * 90. What are critical CSS and above-the-fold CSS?
 * ---------------------------------------------------
 * critical CSS:
 * - CSS needed to style the content visible on the screen when the page loads.
 *
 * above-the-fold CSS:
 * - Same idea: styles required for the initial viewport.
 *
 * Why important:
 * - Reduces render-blocking CSS
 * - Improves perceived load speed
 * - Allows faster first paint
 *
 * Common method:
 * - Inline critical CSS in <head>
 * - Load the rest asynchronously
 *
 *
 * 91. What is CSS unloading and why should unused CSS be removed?
 * -----------------------------------------------------------------
 * CSS unloading = removing CSS that is not used by the page or app.
 *
 * Problems with unused CSS:
 * - Larger CSS file → slower download
 * - More rules → slower style calculation
 * - Harder maintenance
 *
 * Solutions:
 * - Tools like PurgeCSS
 * - Component-scoped CSS (CSS Modules, Tailwind)
 *
 *
 * 92. What is render-blocking CSS and how do you avoid it?
 * -----------------------------------------------------------
 * External CSS in <head> blocks rendering until it is downloaded and parsed.
 *
 * Avoiding render-blocking CSS:
 * - Inline critical CSS
 * - Load non-critical CSS with:
 *   <link rel="preload" as="style" href="style.css" onload="this.rel='stylesheet'">
 * - Use media attributes:
 *   <link rel="stylesheet" href="print.css" media="print">
 * - Minimize CSS file size
 *
 * Goal:
 * - Reduce time before first content appears.
 *
 *
 * 93. How does the browser compute style, layout, paint, and composite?
 * ----------------------------------------------------------------------
 * Browser rendering pipeline:
 *
 * 1. Style (Recalculate Styles)
 * - Browser applies CSS rules to DOM nodes
 * - Builds Render Tree
 *
 * 2. Layout (Reflow)
 * - Computes element positions and sizes
 * - Triggered by layout changes (width, height, font-size, etc.)
 *
 * 3. Paint
 * - Draws pixels for colors, borders, shadows, text
 *
 * 4. Composite
 * - Combines layers (positioned, transformed elements)
 * - Faster because GPU can handle it
 *
 * Optimizing these steps improves performance.
 *
 *
 * 94. What triggers reflow and repaint in CSS?
 * ----------------------------------------------
 * Reflow triggers (layout changes):
 * - Changing width, height, padding, margin, border
 * - Changing display property
 * - Changing font-size
 * - Adding/removing DOM elements
 * - Accessing layout properties → offsetWidth, scrollHeight (forces sync)
 *
 * Repaint triggers (visual changes only):
 * - Changing colors
 * - Changing shadows
 * - Changing visibility (not display)
 * - Changing background images
 *
 * Reflow = expensive  
 * Repaint = less expensive  
 *
 * Best practice:
 * - Minimize layout changes inside animations
 * - Use transform + opacity to animate (GPU friendly)
 */


/**
 * 95. What is the stacking context and what creates it?
 * -------------------------------------------------------
 * A stacking context is an isolated z-index layer in which elements stack
 * relative to each other but not outside their context.
 *
 * Created by:
 * - position + z-index (not auto)
 * - opacity < 1
 * - transform (e.g., transform: translate())
 * - filter
 * - will-change: transform
 * - isolation: isolate
 * - flex/grid items with z-index
 *
 * Each context is independent—elements can’t overlap elements outside it
 * using z-index alone.
 *
 *
 * 96. What are containing blocks and how are they determined?
 * -------------------------------------------------------------
 * A containing block is the reference box used to calculate the position/size
 * of positioned elements.
 *
 * Determined by:
 * - For static/relative elements: nearest ancestor’s content box.
 * - For absolute positioned elements: nearest ancestor with position ≠ static.
 * - For fixed positioned elements: viewport.
 * - For transformed elements: the transform box.
 *
 * The containing block defines where offsets (top, left, etc.) are measured from.
 *
 *
 * 97. Difference between relative and absolute positioning
 * ----------------------------------------------------------
 * relative:
 * - Element stays in normal flow.
 * - Offsets (top/left) move the element visually.
 * - Creates a containing block for absolute children.
 *
 * absolute:
 * - Removed from normal flow.
 * - Positioned relative to nearest positioned ancestor.
 * - Does not affect siblings' layout.
 *
 * Summary:
 * relative = offset from its own original position  
 * absolute = positioned relative to ancestor  
 *
 *
 * 98. How does overflow create new block formatting contexts?
 * -------------------------------------------------------------
 * A block formatting context (BFC) is an isolated layout region that
 * prevents elements inside from interacting with outside floats and margins.
 *
 * overflow (other than visible) creates a BFC:
 * Example:
 * .box { overflow: hidden; }
 *
 * Effects of BFC:
 * - Prevents margin collapsing
 * - Contains floats inside it
 * - Helps layout consistency
 *
 *
 * 99. What is isolation: isolate and why is it used?
 * -----------------------------------------------------
 * isolation: isolate forces the element to create a new stacking context.
 *
 * Example:
 * .container { isolation: isolate; }
 *
 * Why used:
 * - Prevents mix of z-index layers between parent and children
 * - Helps control complex stacking behaviors
 * - Prevents unexpected overlaps
 *
 *
 * 100. What is will-change and how does it affect performance?
 * --------------------------------------------------------------
 * will-change tells the browser what properties will change soon.
 *
 * Example:
 * .box { will-change: transform; }
 *
 * Browser optimizes in advance by:
 * - Allocating GPU layers
 * - Preparing memory
 *
 * Benefits:
 * - Smoother animations
 *
 * Warning:
 * - Overuse hurts performance (forces extra memory/layers)
 *
 *
 * 101. What is pointer-events in CSS?
 * --------------------------------------
 * pointer-events controls whether an element reacts to mouse/touch events.
 *
 * pointer-events: none;
 * - Element ignores clicks
 * - Useful for overlay elements
 *
 * pointer-events: auto;
 * - Default, interactive
 *
 * Does NOT affect visibility—only interaction.
 *
 *
 * 102. Difference between visibility, display, and opacity
 * ----------------------------------------------------------
 * display: none
 * - Element removed from layout
 * - No space taken
 * - No interaction possible
 *
 * visibility: hidden
 * - Element invisible
 * - Space reserved
 * - No interaction
 *
 * opacity: 0
 * - Element fully transparent
 * - Still takes space
 * - Still interactive unless pointer-events disabled
 *
 * Summary:
 * display → removes element  
 * visibility → hides but keeps space  
 * opacity → transparent but still interactable  
 */
