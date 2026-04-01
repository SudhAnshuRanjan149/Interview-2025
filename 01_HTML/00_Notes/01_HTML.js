/*
MASTER HTML + HTML5 INTERVIEW SYLLABUS  
(All topics structured as QUESTIONS – From Basic → Advanced)

========================================================
SECTION 1 — HTML FOUNDATIONS (BASICS)
========================================================
 1. What is HTML and why do we use it?  
 2. What is the DOM and how does HTML relate to it?
 3. What is the difference between HTML attributes and DOM properties?
 4. What is the difference between <strong> vs <b> and <em> vs <i>? (semantic vs presentational)
 5. What is the basic structure of an HTML document?  
 6. What is the purpose of the <!DOCTYPE html> declaration?  
 7. What are HTML tags and elements?  
 8. What is the difference between block-level and inline elements?  
 9. What are void elements in HTML?  
 10. What is the difference between <div> and <span>?  
 11. What are semantic elements in HTML and why are they important?  
 12. What is the purpose of the <head> section in HTML?  
 13. What are HTML entities and why do we use character encoding like UTF-8?  
 14. What are global HTML attributes and how are they used?  
 15. What is the purpose of the id and class attributes?  
 16. What is the difference between href and src attributes?  
 17. What are data-* attributes and when should you use them?  
 18. What are ordered, unordered, and description lists in HTML?  

========================================================
SECTION 2 — HTML LAYOUT & STRUCTURE
========================================================
 19. What are the key HTML5 structural elements (header, footer, main, section, article)?  
 20. What is the role of <nav> and <aside>?  
 21. What is the difference between <section> and <article>?  
 22. What is the <figure> and <figcaption> element used for?  
 23. How does the browser parse and render HTML?  

========================================================
SECTION 3 — MEDIA, IMAGES & GRAPHICS
========================================================
 24. What are different image formats like PNG, JPG, WebP, SVG, and when to use each?  
 25. What is the <picture> tag and how does responsive imaging work?  
 26. What are srcset and sizes attributes?  
 27. What is lazy loading in HTML and how does loading="lazy" work?  
 28. What are <audio> and <video> tags and what attributes do they support?  
 29. What are media attributes like autoplay, loop, muted, controls, and preload?  
 30. What is the Canvas API and what is it used for?  
 31. What is the difference between Canvas and SVG?  

========================================================
SECTION 4 — FORMS & VALIDATION
========================================================
 32. What are HTML form elements and how are they structured?  
 33. What are the new HTML5 input types (email, date, color, range, etc.)?  
 34. What built-in form validation features does HTML5 provide?  
 35. What is the difference between placeholder, value, and label?  
 36. What is the purpose of the autocomplete attribute?  
 37. What are required, pattern, min, max, and step attributes?  
 38. What are form events and how does constraint validation work?  

========================================================
SECTION 5 — DOCUMENT METADATA & SEO
========================================================
 39. What is the purpose of <meta> tags?  
 40. What is the viewport meta tag and why is it important?  
 41. What is robots meta tag and how does it affect SEO?  
 42. What is the <title> tag and why is it important for accessibility and SEO?  
 43. What is structured data / microdata in HTML?  

========================================================
SECTION 6 — ACCESSIBILITY (A11Y)
========================================================
 44. What is accessibility in HTML and why does it matter?  
 45. What are ARIA roles and when should you use them?  
 46. What is the difference between role, aria-label, aria-labelledby?  
 47. What is tabindex and how does keyboard navigation work?  
 48. What is the semantic importance of headings (<h1>–<h6>)?  

========================================================
SECTION 7 — EMBEDDING CONTENT
========================================================
 49. What is the <iframe> tag and how is it used?  
 50. What are iframe security risks and how does sandboxing work?  
 51. What is the difference between <object>, <embed>, and <iframe>?  

========================================================
SECTION 8 — HTML5 APIS (CORE)
========================================================
 52. What is localStorage and how does it differ from sessionStorage?  
 53. What are cookies and how do they differ from Web Storage?  
 54. What is the Geolocation API?  
 55. What is the Drag-and-Drop API?  
 56. What are Web Workers and what problems do they solve?  
 57. What are Server-Sent Events (SSE)?  
 58. What are WebSockets and how do they relate to HTML applications?  

========================================================
SECTION 9 — WEB COMPONENTS
========================================================
 59. What are Web Components and why are they useful?  
 60. What is the Shadow DOM and how does it provide encapsulation?  
 61. What are Custom Elements and how do you define one?  
 62. What is the <template> element used for in HTML?  
 63. What are slots in Web Components?  

========================================================
SECTION 10 — PERFORMANCE & NETWORKING
========================================================
 64. What is the Critical Rendering Path in HTML?  
 65. What are render-blocking resources in HTML?  
 66. What are preload, prefetch, and preconnect and when to use each?  
 67. What is the difference between async and defer on <script>?  
 68. What is reflow and repaint in the browser?  
 69. How does HTML impact page load performance?  
 70. What is the difference between <link> and <style>?  

========================================================
SECTION 11 — SECURITY IN HTML
========================================================
 71. What is XSS (Cross-Site Scripting) and how does it relate to HTML?  
 72. What is HTML sanitization and why is it necessary?  
 73. What is Content Security Policy (CSP) and how does it protect HTML documents?  
 74. What is rel="noopener noreferrer" and why is it used with target="_blank"?  

========================================================
SECTION 12 — ADVANCED & MODERN HTML PRACTICES
========================================================
 75. What is progressive enhancement in web development?  
 76. What is graceful degradation and how does it differ?  
 77. What is semantic versioning in HTML context (HTML as a living standard)?  
 78. What are best practices for SEO-friendly HTML?  
 79. What are modern HTML features used in PWAs (installability, manifest link, etc.)?  
 80. What is the purpose of the <noscript> tag and when should you use it?

========================================================
SECTION 13 — INTERVIEW-SPECIFIC TOPICS
========================================================
 81. What are common pitfalls when using innerHTML?  
 82. What is the difference between innerHTML, textContent, and innerText?
 83. When should you avoid using tables for layout?  
 84. What is the difference between DOMContentLoaded and load events?  
 85. How does browser caching work with HTML?  
 86. What are some common HTML anti-patterns?  

========================================================


*/


// -----------------------------------------------------------
// -----------------------------------------------------------



/**
 * 1. What is HTML and why do we use it?
 * --------------------------------------------------
 * HTML (HyperText Markup Language) is the foundational language used to create
 * the structure of web pages. It defines WHAT content appears on the page.
 *
 * Why we use it:
 * - It allows browsers to understand and display content.
 * - It organizes text, images, links, forms, and multimedia.
 * - It provides meaningful structure that search engines and screen readers rely on.
 * - It works together with CSS and JavaScript to create full web experiences.
 *
 *
 * 2. What is the DOM and how does HTML relate to it?
 * --------------------------------------------------
 * DOM (Document Object Model) is a live, in-memory tree created by the browser
 * when it parses an HTML document. Each HTML element becomes a node.
 *
 * Relationship:
 * - HTML is the static source code.
 * - The DOM is the dynamic, manipulable version of that code.
 * - JavaScript interacts with the DOM, not directly with the HTML file.
 * - When the HTML changes, the DOM updates; when JS changes the DOM, the page updates.
 *
 *
 * 3. Difference between HTML attributes and DOM properties
 * --------------------------------------------------------
 * HTML Attributes:
 * - Defined inside HTML tags (e.g., <input value="Name">).
 * - Provide initial, default values.
 * - Are static and do not automatically change if the DOM updates.
 *
 * DOM Properties:
 * - Represent the actual current values of elements in the DOM.
 * - Are part of JS objects (e.g., input.value).
 * - Can change dynamically as user interacts or scripts modify them.
 *
 * Example:
 * <input value="Hello"> initially:
 *   attribute: value="Hello"
 *   property: value = "Hello"
 * But if user types "World":
 *   attribute: stays "Hello"
 *   property: becomes "World"
 *
 *
 * 4. Difference between <strong> vs <b> and <em> vs <i>
 * ------------------------------------------------------
 * <strong> and <em> are semantic elements:
 * - <strong>: Indicates strong importance; usually rendered bold,
 *   but the meaning is what matters.
 * - <em>: Indicates emphasis; usually italic.
 *
 * <b> and <i> are purely presentational:
 * - <b>: Makes text bold with no meaning attached.
 * - <i>: Makes text italic with no meaning attached.
 *
 * Semantic tags help SEO, accessibility, and meaning.
 * Presentational tags are only for styling.
 *
 *
 * 5. Basic structure of an HTML document
 * ---------------------------------------
 * <!DOCTYPE html>          → Tells browser to use HTML5 standard mode
 * <html>                   → Root element
 *   <head>                 → Metadata (title, CSS, scripts, charset)
 *     <title>Title</title>
 *   </head>
 *   <body>                 → Visible content of the webpage
 *     Page Content
 *   </body>
 * </html>
 *
 * The browser reads this from top to bottom and constructs the DOM.
 *
 *
 * 6. Purpose of <!DOCTYPE html>
 * ------------------------------
 * - Forces the browser to use modern HTML5 rendering mode.
 * - Prevents "quirks mode," which mimics old browser behavior.
 * - Ensures consistent CSS layout and correct interpretation of HTML standards.
 *
 *
 * 7. HTML tags and elements
 * ---------------------------
 * Tag:
 * - The actual markup used to define elements.
 * - Examples: <p>, <div>, </h1>.
 *
 * Element:
 * - The complete structure including start tag, content, and end tag.
 *   Example: <p>Hello world</p>
 * - Some elements are empty (void elements) and don’t have closing tags.
 *
 *
 * 8. Difference between block-level and inline elements
 * ------------------------------------------------------
 * Block-level elements:
 * - Occupy full width of their container.
 * - Always start on a new line.
 * - Can contain other block and inline elements.
 * - Examples: <div>, <p>, <h1>, <section>, <ul>, <li>
 *
 * Inline elements:
 * - Do not start on a new line.
 * - Only take as much width as needed.
 * - Cannot contain block-level elements.
 * - Examples: <span>, <a>, <strong>, <i>, <img>
 *
 * Block = structure; Inline = text-level formatting.
 *
 *
 * 9. Void elements in HTML
 * -------------------------
 * Void elements are self-closing elements that cannot contain content and do not
 * require an end tag.
 *
 * Examples:
 * <img>  (image)
 * <br>   (line break)
 * <hr>   (horizontal rule)
 * <input> (form input)
 * <meta> (metadata)
 * <link> (stylesheet reference)
 *
 * These are defined by HTML specifications as content-less.
 *
 *
 * 10. Difference between <div> and <span>
 * -----------------------------------------
 * <div>:
 * - Block-level element.
 * - Used for large layout divisions.
 * - Commonly used as a container for multiple elements.
 *
 * <span>:
 * - Inline element.
 * - Used for styling or grouping small portions of text.
 * - Does not affect layout structure.
 *
 * <div> = structural layout container.
 * <span> = inline text container.
 */


/**
 * 11. What are semantic elements in HTML and why are they important?
 * -------------------------------------------------------------------
 * Semantic elements are HTML tags that clearly describe their meaning and role
 * in a webpage. Examples: <header>, <nav>, <main>, <section>, <article>, <footer>.
 *
 * Importance:
 * - Improve accessibility: screen readers understand the page structure better.
 * - Improve SEO: search engines understand content purpose.
 * - Improve readability for developers: makes code easier to understand.
 * - Encourages proper structure instead of using generic <div> everywhere.
 *
 *
 * 12. What is the purpose of the <head> section in HTML?
 * -------------------------------------------------------
 * The <head> section contains metadata about the web page. This information is
 * not displayed to the user but is essential for the browser and search engines.
 *
 * Common items inside <head>:
 * - <title> → Page title shown on browser tab
 * - <meta> → character set, viewport, SEO description, etc.
 * - <link> → CSS files
 * - <script> → JavaScript that should load before page render
 * - <style> → internal CSS
 *
 * The head configures how the page behaves, is interpreted, and is displayed.
 *
 *
 * 13. What are HTML entities and why do we use character encoding like UTF-8?
 * ----------------------------------------------------------------------------
 * HTML entities are special encodings used to display reserved characters
 * or symbols that conflict with HTML syntax.
 *
 * Examples:
 * - &lt;  → <
 * - &gt;  → >
 * - &amp; → &
 * - &copy; → ©
 *
 * UTF-8 encoding:
 * - Allows representation of virtually every character from all languages.
 * - Ensures consistent rendering across browsers and operating systems.
 * - Prevents issues where special characters display incorrectly.
 *
 *
 * 14. What are global HTML attributes and how are they used?
 * -----------------------------------------------------------
 * Global attributes are attributes that can be used on ANY HTML element.
 *
 * Common examples:
 * - class    → assign CSS classes
 * - id       → unique identifier
 * - style    → inline CSS
 * - title    → tooltip text
 * - tabindex → keyboard navigation
 * - data-*   → custom data attributes
 *
 * They are used to control styling, behavior, accessibility, or store data.
 *
 *
 * 15. What is the purpose of the id and class attributes?
 * --------------------------------------------------------
 * id:
 * - Must be unique within the document.
 * - Used for identifying one specific element.
 * - Often used with JavaScript or anchor links (#section).
 *
 * class:
 * - Can be reused on multiple elements.
 * - Used mainly for styling with CSS and grouping similar elements.
 *
 * id = unique target  
 * class = reusable group
 *
 *
 * 16. What is the difference between href and src attributes?
 * ------------------------------------------------------------
 * href (Hypertext Reference):
 * - Used for linking to resources.
 * - Browser NAVIGATES to or fetches the referenced file.
 * - Used in <a>, <link>, <area>.
 *
 * src (Source):
 * - Used to embed resources into the page.
 * - Browser DOWNLOADS and replaces the element with the resource.
 * - Used in <img>, <script>, <iframe>, <audio>, <video>.
 *
 * href = reference to another page or file  
 * src = resource loaded INTO the current page
 *
 *
 * 17. What are data-* attributes and when should you use them?
 * --------------------------------------------------------------
 * data-* attributes allow you to store custom data on HTML elements.
 *
 * Example:
 * <div data-user-id="54" data-role="admin"></div>
 *
 * Usage:
 * - When you want to attach extra information to an element
 *   without affecting layout or needing extra JS variables.
 * - Accessed in JS using dataset, e.g., element.dataset.userId.
 *
 * Appropriate for:
 * - Dynamic content
 * - Temporary data for scripts
 * - Storing identifiers, states, flags
 *
 *
 * 18. What are ordered, unordered, and description lists in HTML?
 * ----------------------------------------------------------------
 * Ordered List (<ol>):
 * - Numbered lists
 * - Items wrapped in <li>
 * Example:
 * <ol>
 *   <li>First</li>
 *   <li>Second</li>
 * </ol>
 *
 * Unordered List (<ul>):
 * - Bulleted lists
 * - Items wrapped in <li>
 * Example:
 * <ul>
 *   <li>Item</li>
 *   <li>Item</li>
 * </ul>
 *
 * Description List (<dl>):
 * - Used for terms and their descriptions
 * - <dt> = term, <dd> = description
 * Example:
 * <dl>
 *   <dt>HTML</dt>
 *   <dd>Markup language for structuring web pages.</dd>
 * </dl>
 */


/**
 * 19. Key HTML5 structural elements
 * -----------------------------------
 * HTML5 introduced semantic layout elements to replace generic <div> structures.
 *
 * <header>  
 * - Represents introductory content or navigation for a page or section.
 * - Usually contains logo, title, nav links.
 *
 * <footer>  
 * - Represents closing or summary content of a page or section.
 * - Contains copyright, links, contact details.
 *
 * <main>  
 * - Contains the primary content of the document.
 * - Only one <main> should exist per page.
 *
 * <section>  
 * - Represents a thematic grouping of content.
 * - Often used to divide content into logical sections (chapters, topics).
 *
 * <article>  
 * - Represents independent, self-contained content.
 * - Intended for blog posts, news articles, forum posts, etc.
 *
 *
 * 20. Role of <nav> and <aside>
 * -------------------------------
 * <nav>
 * - Represents a navigation section.
 * - Contains links that help users navigate the site or page.
 * - Example: main menu, sidebar menu, footer navigation.
 *
 * <aside>
 * - Represents content related to the main content but not essential to it.
 * - Often used for sidebars, ads, related posts, extra info.
 *
 *
 * 21. Difference between <section> and <article>
 * -----------------------------------------------
 * <section>:
 * - A thematic grouping of related content.
 * - Not independent; relies on surrounding context.
 * - Examples: sections within a page like "Introduction", "Features", "Contact".
 *
 * <article>:
 * - Self-contained and reusable content block.
 * - Makes sense on its own, even if removed from the page.
 * - Examples: blog post, user comment, news story, product card.
 *
 * Rule of thumb:
 * - If it can be syndicated or shared independently → <article>
 * - If it is just a part of a larger topic → <section>
 *
 *
 * 22. <figure> and <figcaption> usage
 * -------------------------------------
 * <figure>:
 * - Used to wrap media content like images, diagrams, code snippets, charts.
 * - The media is related to the main content but can stand alone.
 *
 * <figcaption>:
 * - Describes the content inside <figure>.
 * - Acts as an official caption.
 *
 * Example:
 * <figure>
 *   <img src="image.jpg">
 *   <figcaption>Description of the image</figcaption>
 * </figure>
 *
 *
 * 23. How the browser parses and renders HTML
 * ----------------------------------------------
 * The rendering process typically happens in these steps:
 *
 * 1. Parsing HTML  
 * - Browser reads the HTML file sequentially.
 * - Builds the DOM (tree of HTML elements).
 *
 * 2. Parsing CSS  
 * - Browser downloads CSS files.
 * - Builds the CSSOM (CSS Object Model).
 *
 * 3. Combining DOM + CSSOM  
 * - Browser constructs the Render Tree → elements + computed styles.
 *
 * 4. Layout / Reflow  
 * - Browser calculates position, size, and geometry of elements.
 *
 * 5. Painting  
 * - Browser draws pixels for text, colors, borders, images, etc.
 *
 * 6. Compositing  
 * - Layers (like fixed elements, animations) are merged and displayed on screen.
 *
 * This entire process repeats whenever DOM or CSS changes.
 */


/**
 * 24. Image formats: PNG, JPG, WebP, SVG and when to use each
 * -------------------------------------------------------------
 * PNG:
 * - Lossless compression
 * - Supports transparency
 * - Best for icons, UI elements, screenshots, crisp graphics
 *
 * JPG (JPEG):
 * - Lossy compression
 * - Small file size for photos
 * - Best for real-world images like portraits, landscapes
 *
 * WebP:
 * - Modern format with lossy + lossless versions
 * - Much smaller file sizes than PNG/JPG
 * - Best for general web performance optimization
 *
 * SVG:
 * - Vector format (mathematically drawn)
 * - Infinite scalability with no quality loss
 * - Best for logos, icons, illustrations, charts
 *
 *
 * 25. What is the <picture> tag and how responsive imaging works?
 * ----------------------------------------------------------------
 * <picture> allows browsers to choose the best image based on:
 * - Screen size
 * - Resolution
 * - Format support (e.g., WebP vs PNG)
 *
 * Example:
 * <picture>
 *   <source srcset="image.webp" type="image/webp">
 *   <source srcset="image.jpg" type="image/jpeg">
 *   <img src="image.jpg" alt="">
 * </picture>
 *
 * The browser selects the most appropriate source automatically.
 *
 *
 * 26. What are srcset and sizes attributes?
 * -----------------------------------------
 * srcset:
 * - Provides multiple versions of the same image with different resolutions/sizes.
 * - Browser picks the optimal one.
 *
 * Example:
 * <img src="img-400.jpg"
 *      srcset="img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w">
 *
 * sizes:
 * - Tells browser how much space the image will take at different viewport widths.
 *
 * Example:
 * sizes="(max-width: 600px) 100vw, 50vw"
 *
 * This helps the browser choose the right file before downloading.
 *
 *
 * 27. What is lazy loading and how loading="lazy" works?
 * --------------------------------------------------------
 * Lazy loading delays the loading of images or iframes until they are close to
 * entering the user's viewport.
 *
 * Example:
 * <img src="photo.jpg" loading="lazy">
 *
 * How it works:
 * - Browser doesn't download the resource immediately.
 * - When the element is near the visible area, the download starts.
 * - Improves performance by reducing initial load time.
 *
 *
 * 28. <audio> and <video> tags and supported attributes
 * --------------------------------------------------------
 * <audio> → Embeds audio content  
 * <video> → Embeds video content
 *
 * Common attributes:
 * - controls  → shows play/pause UI
 * - autoplay  → playback starts automatically
 * - muted     → mutes audio (required for autoplay on many browsers)
 * - loop      → restarts after finishing
 * - preload   → hints how much data to preload
 * - src       → file source
 *
 * Video-only attributes:
 * - width, height → define display size
 * - poster → placeholder image before playback
 *
 *
 * 29. Media attributes: autoplay, loop, muted, controls, preload
 * --------------------------------------------------------------
 * autoplay:
 * - Automatically starts playback when the media is ready.
 *
 * loop:
 * - Restarts the media from the beginning after it ends.
 *
 * muted:
 * - Starts playback with no sound.
 * - Required for autoplay to work on many devices.
 *
 * controls:
 * - Displays built-in play/pause/volume UI to the user.
 *
 * preload:
 * - none → browser should not preload
 * - metadata → load only metadata (duration, size)
 * - auto → load the entire file (browser decides)
 *
 *
 * 30. What is the Canvas API and what is it used for?
 * -----------------------------------------------------
 * Canvas API provides a way to draw graphics using JavaScript.
 *
 * Usage:
 * - Games
 * - Visualizations
 * - Animations
 * - Image processing
 *
 * Canvas works like a bitmap: you draw pixels manually using JS.
 *
 *
 * 31. Difference between Canvas and SVG
 * ---------------------------------------
 * Canvas:
 * - Pixel-based (raster)
 * - Good for fast, dynamic, complex graphics (games)
 * - Not scalable without losing quality
 * - No built-in event handling per shape
 *
 * SVG:
 * - Vector-based
 * - Graphics scale infinitely with no quality loss
 * - Each shape is a DOM element (can attach events)
 * - Slower with extremely complex or animated drawings
 *
 * Summary:
 * Canvas = pixel drawing  
 * SVG = vector DOM graphics
 */


/**
 * 32. What are HTML form elements and how are they structured?
 * --------------------------------------------------------------
 * HTML forms collect user input and send it to a server or JavaScript.
 *
 * Basic structure:
 * <form action="/submit" method="post">
 *   <label>Username</label>
 *   <input type="text">
 *   <button type="submit">Send</button>
 * </form>
 *
 * Main elements:
 * - <input> (text, password, email, file, checkbox, radio)
 * - <textarea>
 * - <select> + <option>
 * - <button>
 * - <label>
 * - <fieldset> + <legend> (grouping controls)
 *
 * Forms connect UI controls to data submission.
 *
 *
 * 33. New HTML5 input types
 * ---------------------------
 * HTML5 expanded input types with built-in validation and UI controls.
 *
 * Examples:
 * - email   → validates email pattern
 * - url     → URL validation
 * - tel     → phone number
 * - date    → calendar picker
 * - time    → time picker
 * - datetime-local
 * - month
 * - week
 * - color   → color picker
 * - number  → numeric input
 * - range   → slider input
 * - search  → search box UI
 *
 * These improve usability and browser-based validation.
 *
 *
 * 34. Built-in HTML5 form validation features
 * ---------------------------------------------
 * HTML5 provides automatic validation without JavaScript:
 *
 * - required          → field must be filled
 * - minlength/maxlength → limits text length
 * - pattern           → regex validation
 * - type-based rules  → email, url, number validation, etc.
 * - min/max           → numeric range
 * - step              → numeric step interval
 *
 * Browser prevents form submission and shows error messages.
 *
 *
 * 35. Difference between placeholder, value, and label
 * ------------------------------------------------------
 * placeholder:
 * - Hint text inside an empty input.
 * - Not actual input value.
 * - Disappears when typing begins.
 *
 * value:
 * - Actual value stored in the input.
 * - Pre-filled data or user input.
 *
 * label:
 * - Describes the purpose of the input.
 * - Increases accessibility and usability.
 * - Clicking label focuses the input.
 *
 *
 * 36. Purpose of autocomplete attribute
 * ---------------------------------------
 * autocomplete guides browsers on whether to store and auto-fill user data.
 *
 * Options:
 * - on  → allow autofill
 * - off → disable autofill
 * - specific fields like "email", "name", "street-address", etc.
 *
 * Helps user experience and reduces typing.
 *
 *
 * 37. required, pattern, min, max, and step attributes
 * ------------------------------------------------------
 * required:
 * - Prevents form submission unless filled.
 *
 * pattern:
 * - Specifies a regex pattern for validation.
 * - Example: pattern="[0-9]{10}" for 10-digit number.
 *
 * min / max:
 * - Numeric, date, and time constraints.
 * - Example: <input type="number" min="1" max="10">
 *
 * step:
 * - Controls allowed increments.
 * - Example: step="0.5" allows decimals like 1.5, 2.0, 2.5.
 *
 *
 * 38. Form events and constraint validation
 * -------------------------------------------
 * Common form events:
 * - input    → fires while typing
 * - change   → fires when field value changes and loses focus
 * - submit   → fires when form is submitted
 * - reset    → fires when form is reset
 *
 * Constraint validation:
 * - Browser checks input validity before submit.
 * - If invalid:
 *     - Submission stops
 *     - Browser displays error UI
 * - The validity is based on:
 *     - type rules (email, url, etc.)
 *     - required, min, max, step
 *     - pattern regex
 *
 * JavaScript can check validity using:
 * element.checkValidity()  
 * element.reportValidity()
 */


/**
 * 39. What is the purpose of <meta> tags?
 * -----------------------------------------
 * <meta> tags provide metadata about the HTML document.
 * They are placed inside the <head> and help browsers, search engines,
 * and social platforms understand how the page should behave.
 *
 * Common uses:
 * - Charset declaration: <meta charset="UTF-8">
 * - SEO description: <meta name="description" content="...">
 * - Keywords (less used today)
 * - Author info
 * - Social preview tags (Open Graph, Twitter Cards)
 * - Viewport configuration for mobile devices
 *
 * Meta tags do not display content; they configure the environment.
 *
 *
 * 40. What is the viewport meta tag and why is it important?
 * -----------------------------------------------------------
 * Mobile browsers originally rendered pages as if they were very wide
 * (≈980px) and then scaled them down. This caused layout issues.
 *
 * The viewport tag fixes this:
 *
 * <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *
 * What it does:
 * - Makes the layout match the device's actual width
 * - Ensures responsive CSS works correctly
 * - Prevents unwanted zooming and scaling
 *
 * Without this tag, responsive design breaks on mobile.
 *
 *
 * 41. What is the robots meta tag and how does it affect SEO?
 * ------------------------------------------------------------
 * The robots meta tag instructs search engine crawlers on how to index a page.
 *
 * Example:
 * <meta name="robots" content="index, follow">
 *
 * Common directives:
 * - index / noindex → whether page should appear in search results
 * - follow / nofollow → whether crawlers should follow links
 * - noarchive → prevent cached versions
 * - nosnippet → prevent search text snippets
 *
 * It directly influences search engine behavior and visibility.
 *
 *
 * 42. What is the <title> tag and why is it important?
 * ------------------------------------------------------
 * <title> defines the title of the webpage shown in:
 * - Browser tabs
 * - Bookmarks
 * - Search engine results
 *
 * Importance for accessibility:
 * - Screen readers announce the title first
 * - Helps users understand page context
 *
 * Importance for SEO:
 * - One of the strongest on-page ranking factors
 * - Used as the main headline in search results
 *
 *
 * 43. What is structured data / microdata in HTML?
 * --------------------------------------------------
 * Structured data is extra information added to HTML to help search engines
 * understand the meaning of the content, not just the text.
 *
 * Usually done using schema.org vocabulary with JSON-LD or Microdata.
 *
 * Microdata example:
 * <div itemscope itemtype="https://schema.org/Person">
 *   <span itemprop="name">John Doe</span>
 *   <span itemprop="jobTitle">Developer</span>
 * </div>
 *
 * Purpose:
 * - Improve search engine interpretation
 * - Enable rich results (stars, reviews, prices, FAQs, etc.)
 * - Provide context to crawlers about entities and relationships
 *
 * Structured data boosts visibility and enhances search presentation.
 */


/**
 * 44. What is accessibility in HTML and why does it matter?
 * -----------------------------------------------------------
 * Accessibility (a11y) ensures that websites can be used by everyone,
 * including people with disabilities such as visual, hearing, motor,
 * or cognitive impairments.
 *
 * Why it matters:
 * - Legal compliance in many countries
 * - Ethical responsibility
 * - Better user experience for all users
 * - Improves SEO (accessible sites are easier for crawlers to interpret)
 * - Makes content understandable by assistive technologies like screen readers
 *
 * Accessibility is achieved through:
 * - Semantic HTML
 * - Proper labels
 * - Alt text for images
 * - Keyboard navigability
 * - ARIA attributes (when necessary)
 *
 *
 * 45. What are ARIA roles and when should you use them?
 * -------------------------------------------------------
 * ARIA (Accessible Rich Internet Applications) provides attributes that add
 * extra accessibility information to HTML, mainly for assistive technologies.
 *
 * ARIA roles:
 * - Define what an element represents, especially for custom widgets.
 * - Examples: role="button", role="dialog", role="navigation"
 *
 * When to use ARIA:
 * - ONLY when native semantic HTML is insufficient.
 * - Do NOT replace existing semantic HTML like <button>, <nav>, <header>.
 * - ARIA is mainly for custom components built with <div> or <span>.
 *
 * Rule: “Use ARIA as a last resort.”
 *
 *
 * 46. Difference between role, aria-label, aria-labelledby
 * ---------------------------------------------------------
 * role:
 * - Describes what an element *is*.
 * - Example: <div role="button">Click</div>
 *
 * aria-label:
 * - Provides an accessible name directly.
 * - Used when visible text does not describe functionality.
 * - Example: <button aria-label="Close popup">X</button>
 *
 * aria-labelledby:
 * - Uses another element’s text as the accessible label.
 * - Example:
 *   <h2 id="title">Login Form</h2>
 *   <form aria-labelledby="title">
 *
 * Summary:
 * - role → defines the element’s type
 * - aria-label → explicit custom text label
 * - aria-labelledby → label taken from another element
 *
 *
 * 47. What is tabindex and how does keyboard navigation work?
 * -------------------------------------------------------------
 * tabindex controls the order in which elements are focused when using TAB.
 *
 * Values:
 * - tabindex="0"   → element is focusable in natural DOM order
 * - tabindex="-1"  → element is focusable only via JS, not via TAB
 * - tabindex="1+"  → custom tab order (NOT recommended)
 *
 * Keyboard navigation:
 * - TAB moves forward through focusable elements
 * - SHIFT + TAB moves backward
 * - ENTER or SPACE activates buttons/links
 *
 * Good accessibility requires:
 * - Logical, natural tab order
 * - Focusable interactive elements (<button>, <input>, <a>)
 * - Visible focus outlines
 *
 *
 * 48. Semantic importance of headings (<h1>–<h6>)
 * -------------------------------------------------
 * Headings define the logical document structure.
 * They create an outline used by:
 * - Search engines
 * - Screen readers
 * - Browser navigation tools
 *
 * Importance:
 * - <h1> is the main topic of the page (only one recommended)
 * - <h2>–<h6> define subsections
 * - Helps assistive technologies understand hierarchy
 * - Improves SEO by organizing content meaningfully
 *
 * Headings should reflect structure, not styling.
 */


/**
 * 49. What is the <iframe> tag and how is it used?
 * -------------------------------------------------
 * <iframe> embeds another webpage inside the current page.
 *
 * Basic usage:
 * <iframe src="https://example.com" width="600" height="400"></iframe>
 *
 * Common uses:
 * - Embedding external sites
 * - Embedding videos (e.g., YouTube)
 * - Embedding maps
 * - Embedding dashboards or forms
 *
 * Features:
 * - Isolated browsing context
 * - Has its own DOM, separate from the parent page
 *
 *
 * 50. What are iframe security risks and how does sandboxing work?
 * ------------------------------------------------------------------
 * Iframe risks:
 * - Clickjacking (malicious page hidden in an iframe)
 * - Embedded site running harmful scripts
 * - Access to parent window (if allowed)
 * - Phishing or misleading content embedded without user awareness
 *
 * Sandboxing provides restrictions to limit what an iframe can do.
 *
 * Example:
 * <iframe src="page.html" sandbox></iframe>
 *
 * sandbox restrictions (when empty):
 * - No scripts allowed
 * - No form submissions
 * - No popups
 * - No same-origin access
 *
 * You can enable specific abilities:
 * <iframe sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
 *
 * This lets you control:
 * - Whether it can run JS
 * - Whether it can access cookies/local storage
 * - Whether it can submit forms
 * - Whether it can open new windows
 *
 * Sandboxing significantly reduces iframe attack vectors.
 *
 *
 * 51. Difference between <object>, <embed>, and <iframe>
 * --------------------------------------------------------
 * <iframe>:
 * - Embeds an entire webpage
 * - Creates a separate browsing context
 * - Used for websites, video embeds, maps
 *
 * <embed>:
 * - Embeds external content like PDFs, media players, plugins
 * - Self-closing tag
 * - Most commonly used for PDFs today
 *
 * Example:
 * <embed src="file.pdf" type="application/pdf">
 *
 * <object>:
 * - More flexible than <embed>
 * - Can embed images, PDFs, multimedia, HTML, plugins
 * - Can provide fallback content inside
 *
 * Example:
 * <object data="file.pdf" type="application/pdf">
 *   Fallback text if PDF cannot be displayed.
 * </object>
 *
 * Summary:
 * - iframe → embed full web pages
 * - embed → simple external resource embedding (PDFs, media)
 * - object → versatile embedding with fallback support
 */


/**
 * 52. What is localStorage and how does it differ from sessionStorage?
 * ----------------------------------------------------------------------
 * localStorage:
 * - Stores key–value data in the browser.
 * - Data persists even after the browser is closed.
 * - Storage limit ~5–10MB depending on browser.
 *
 * sessionStorage:
 * - Similar to localStorage but lasts only for the duration of the tab session.
 * - Data is deleted when the tab or window is closed.
 *
 * Differences:
 * - Persistence: localStorage = permanent, sessionStorage = session-based.
 * - Scope: sessionStorage is isolated per tab; localStorage is shared across tabs of same domain.
 *
 *
 * 53. What are cookies and how do they differ from Web Storage?
 * --------------------------------------------------------------
 * Cookies:
 * - Small pieces of data stored by the browser (max ~4KB).
 * - Sent automatically with every HTTP request.
 * - Often used for authentication/session tracking.
 * - Can have expiration dates and security flags (HttpOnly, Secure, SameSite).
 *
 * Web Storage (localStorage/sessionStorage):
 * - Much larger storage capacity (5MB+).
 * - Not sent automatically with requests.
 * - Used for client-side application data.
 *
 * Main differences:
 * - Cookies travel with HTTP requests; Web Storage does not.
 * - Cookies are smaller; Web Storage is larger.
 * - Cookies have expiration rules; Web Storage persists automatically.
 *
 *
 * 54. What is the Geolocation API?
 * ----------------------------------
 * A browser API that retrieves the user's geographic location (with permission).
 *
 * Example:
 * navigator.geolocation.getCurrentPosition(successCallback);
 *
 * It provides:
 * - Latitude
 * - Longitude
 * - Accuracy
 * - Altitude (if available)
 * - Speed and heading
 *
 * Used for maps, location-based services, tracking apps, etc.
 *
 *
 * 55. What is the Drag-and-Drop API?
 * ------------------------------------
 * The Drag-and-Drop API allows elements to be draggable and respond to drop events.
 *
 * Key events:
 * - dragstart
 * - dragover
 * - drop
 *
 * Used for:
 * - File uploads (drag files into browser)
 * - Rearranging UI elements
 * - Custom editors and dashboards
 *
 * Implementation involves setting draggable="true" and defining event handlers.
 *
 *
 * 56. What are Web Workers and what problems do they solve?
 * -----------------------------------------------------------
 * Web Workers run JavaScript in background threads, separate from the main UI thread.
 *
 * Why they exist:
 * - Long-running JS tasks can freeze the UI.
 *
 * Web Workers:
 * - Run in parallel
 * - Cannot access DOM directly
 * - Communicate using postMessage()
 *
 * Used for:
 * - Heavy computations
 * - Data processing
 * - Large loops or algorithms that would block the UI
 *
 *
 * 57. What are Server-Sent Events (SSE)?
 * ----------------------------------------
 * SSE allows a server to push continuous data updates to the browser over HTTP.
 *
 * Features:
 * - One-way communication: server → client
 * - Uses EventSource API in JS
 * - Efficient for live updates (stock data, notifications, dashboards)
 *
 * Example:
 * const source = new EventSource('/events');
 *
 * Benefits:
 * - Auto-reconnect
 * - Lightweight protocol
 *
 *
 * 58. What are WebSockets and how do they relate to HTML applications?
 * ----------------------------------------------------------------------
 * WebSockets enable full-duplex (two-way) real-time communication between:
 * - Browser ↔ Server
 *
 * Unlike HTTP:
 * - WebSockets stay open
 * - No repeated HTTP requests
 * - Very low latency
 *
 * Used for:
 * - Chat apps
 * - Multiplayer games
 * - Live dashboards
 * - Collaborative apps (Google Docs style)
 *
 * Relation to HTML apps:
 * - HTML UI + JS WebSocket connection enables interactive real-time experiences.
 */


/**
 * 59. What are Web Components and why are they useful?
 * ------------------------------------------------------
 * Web Components are a set of web platform features that allow developers to
 * create reusable, encapsulated custom UI elements that work like native HTML tags.
 *
 * They are composed of:
 * - Custom Elements
 * - Shadow DOM
 * - HTML Templates
 *
 * Why they are useful:
 * - Encapsulation: styles and behavior don’t leak out or in
 * - Reusability: create components usable across projects
 * - Native support: no frameworks required
 * - Composable: behave like regular HTML elements
 *
 *
 * 60. What is the Shadow DOM and how does it provide encapsulation?
 * -------------------------------------------------------------------
 * Shadow DOM creates a hidden DOM subtree inside an element.
 * This subtree has:
 * - Its own HTML structure
 * - Its own scoped CSS
 * - Its own behavior
 *
 * Benefits:
 * - Encapsulated styles → prevents CSS conflicts
 * - Private markup → cannot be accessed by external CSS unintentionally
 *
 * Example:
 * const root = element.attachShadow({ mode: "open" });
 *
 * Encapsulation ensures consistent component behavior regardless of surrounding code.
 *
 *
 * 61. What are Custom Elements and how do you define one?
 * ---------------------------------------------------------
 * Custom Elements are user-defined HTML tags with custom behavior.
 *
 * Steps to create one:
 * 1. Define a class that extends HTMLElement
 * 2. Implement lifecycle callbacks (optional)
 * 3. Register the element using customElements.define()
 *
 * Example:
 * class MyComponent extends HTMLElement {
 *   connectedCallback() {
 *     this.innerHTML = "<p>Hello!</p>";
 *   }
 * }
 * customElements.define("my-component", MyComponent);
 *
 * Usage in HTML:
 * <my-component></my-component>
 *
 *
 * 62. What is the <template> element used for in HTML?
 * ------------------------------------------------------
 * <template> stores inert HTML that is not rendered until activated.
 *
 * Characteristics:
 * - Hidden from the DOM until cloned
 * - Does not execute scripts or load images
 *
 * Common use:
 * - Used by Web Components to define markup that will be inserted into the Shadow DOM
 *
 * Example:
 * <template id="card-template">
 *   <div class="card">...</div>
 * </template>
 *
 *
 * 63. What are slots in Web Components?
 * ----------------------------------------
 * Slots allow developers to insert external content into a Web Component’s Shadow DOM.
 *
 * Example:
 * <my-card>
 *   <h2 slot="title">Product Name</h2>
 *   <p slot="description">Product description here.</p>
 * </my-card>
 *
 * Inside the component:
 * <slot name="title"></slot>
 * <slot name="description"></slot>
 *
 * Purpose:
 * - Enable flexible component composition
 * - Allow customizable internal structure
 *
 * Slots = placeholder locations for user-provided content in Shadow DOM.
 */


/**
 * 64. What is the Critical Rendering Path in HTML?
 * --------------------------------------------------
 * The Critical Rendering Path (CRP) is the sequence of steps a browser takes
 * to convert HTML, CSS, and JavaScript into pixels on the screen.
 *
 * Key stages:
 * 1. Parse HTML → build DOM
 * 2. Parse CSS → build CSSOM
 * 3. Combine DOM + CSSOM → Render Tree
 * 4. Layout/Reflow → calculate positions and sizes
 * 5. Paint → draw pixels
 *
 * Goal:
 * - Minimize blocking resources so the browser can render the page faster.
 *
 *
 * 65. What are render-blocking resources in HTML?
 * -------------------------------------------------
 * Render-blocking resources delay the initial page render because the browser
 * must fully load and parse them before showing content.
 *
 * Examples:
 * - External CSS (<link rel="stylesheet">)
 * - Synchronous JavaScript (<script> without async/defer)
 *
 * Why they block:
 * - CSS is required to compute layout before rendering
 * - JS may modify DOM/CSS, so browser must wait before proceeding
 *
 *
 * 66. What are preload, prefetch, and preconnect and when to use each?
 * -----------------------------------------------------------------------
 * preload:
 * - Loads a resource early because it's needed soon.
 * - High priority.
 * Example: <link rel="preload" as="style" href="main.css">
 *
 * prefetch:
 * - Loads a resource for future navigation or later use.
 * - Low priority.
 * Example: <link rel="prefetch" href="next-page.js">
 *
 * preconnect:
 * - Establishes early connection (DNS, TCP, TLS) to an external domain.
 * - Reduces future latency.
 * Example: <link rel="preconnect" href="https://fonts.googleapis.com">
 *
 * When to use:
 * - preload → critical resources needed immediately
 * - prefetch → resources needed after navigation or later in the session
 * - preconnect → loading assets from third-party domains (fonts, APIs)
 *
 *
 * 67. Difference between async and defer on <script>?
 * -----------------------------------------------------
 * async:
 * - Script loads in parallel with HTML parsing
 * - Executes as soon as it finishes downloading
 * - Execution order NOT guaranteed
 *
 * defer:
 * - Script loads in parallel with parsing
 * - Executes ONLY after the HTML is fully parsed
 * - Execution order IS guaranteed
 *
 * Summary:
 * - async → independent scripts like analytics
 * - defer → scripts that depend on DOM structure
 *
 *
 * 68. What is reflow and repaint in the browser?
 * ------------------------------------------------
 * reflow (layout):
 * - Browser recalculates element size, position, layout
 * - Triggered by DOM changes, resizing, font load
 * - Most expensive visual operation
 *
 * repaint:
 * - Browser redraws elements without changing layout
 * - Triggered by color or visibility changes
 *
 * Reflow = layout changes  
 * Repaint = visual changes only  
 *
 *
 * 69. How does HTML impact page load performance?
 * -------------------------------------------------
 * HTML impacts performance through:
 * - Document structure (large DOM slows rendering)
 * - Use of too many nested elements
 * - Placement of scripts (blocking the parser)
 * - Use of images (large inline images = heavy HTML)
 * - Amount of CSS/JS referenced in <head>
 *
 * Best practices:
 * - Keep DOM small and efficient
 * - Move non-critical scripts to bottom or use defer/async
 * - Preload critical resources
 * - Avoid blocking CSS and JS
 *
 *
 * 70. What is the difference between <link> and <style>?
 * --------------------------------------------------------
 * <link>:
 * - Loads external CSS file
 * - Recommended for maintainability and caching
 * - Example: <link rel="stylesheet" href="styles.css">
 *
 * <style>:
 * - Contains internal CSS code inside HTML
 * - Useful for page-specific styles or dynamic style insertion
 * - Example:
 *   <style>
 *     body { background: #fff; }
 *   </style>
 *
 * Summary:
 * - <link> = external stylesheet
 * - <style> = internal stylesheet
 */


/**
 * 71. What is XSS (Cross-Site Scripting) and how does it relate to HTML?
 * ------------------------------------------------------------------------
 * XSS is a security vulnerability where attackers inject malicious JavaScript
 * into web pages viewed by other users.
 *
 * How it relates to HTML:
 * - HTML is the medium attackers inject into.
 * - Unsafe HTML insertion (innerHTML, user comments, form fields) can load scripts.
 *
 * Example of unsafe HTML injection:
 * <script>alert('Hacked')</script>
 *
 * Impact:
 * - Steal session cookies
 * - Redirect users
 * - Modify page content
 * - Perform actions as the victim user
 *
 * XSS originates from mixing untrusted user input directly into HTML output.
 *
 *
 * 72. What is HTML sanitization and why is it necessary?
 * --------------------------------------------------------
 * HTML sanitization is the process of removing or escaping dangerous HTML,
 * JavaScript, or attributes from user-generated content.
 *
 * Necessary because:
 * - Prevents XSS attacks
 * - Ensures only safe tags and attributes are allowed
 * - Protects users and data from malicious scripts
 *
 * Sanitization removes:
 * - <script>, <iframe>, <object>, on* event handlers (onclick, onload, etc.)
 * - Unsafe URLs (javascript:)
 *
 * Essential anytime you display user input inside HTML.
 *
 *
 * 73. What is Content Security Policy (CSP) and how does it protect HTML documents?
 * -----------------------------------------------------------------------------------
 * CSP is a security header that tells browsers which resources are allowed to load.
 *
 * Example header:
 * Content-Security-Policy: default-src 'self';
 *
 * CSP helps prevent:
 * - XSS (by blocking inline scripts and untrusted sources)
 * - Data injection attacks
 *
 * Key directives:
 * - script-src → controls where scripts can come from
 * - img-src → controls allowed image sources
 * - style-src → controls CSS sources
 * - frame-ancestors → controls who can embed the page
 *
 * Benefits:
 * - Even if attacker injects HTML, scripts won’t run if CSP blocks them.
 *
 *
 * 74. What is rel="noopener noreferrer" and why is it used with target="_blank"?
 * --------------------------------------------------------------------------------
 * When using:
 * <a href="https://example.com" target="_blank">
 *
 * The new tab can access:
 * - window.opener → reference to the original page
 *
 * This creates a vulnerability called "tabnabbing".
 *
 * rel="noopener":
 * - Prevents new page from accessing window.opener
 * - Removes the reference and increases security
 *
 * rel="noreferrer":
 * - Hides referrer information
 * - Also implies noopener in most browsers
 *
 * Safe link example:
 * <a href="https://example.com" target="_blank" rel="noopener noreferrer">
 *
 * Purpose:
 * - Prevent tab hijacking
 * - Protect original page from malicious control
 */


/**
 * 75. What is progressive enhancement in web development?
 * ---------------------------------------------------------
 * Progressive enhancement is a development strategy where:
 * - You start with a basic, functional experience using simple HTML.
 * - Then add CSS for better styling.
 * - Then add JavaScript for advanced interactions.
 *
 * Principles:
 * - Core functionality works on all devices and browsers.
 * - Enhancements improve the experience when supported.
 *
 * Example:
 * - Form works with plain HTML submission.
 * - JavaScript adds validation only if available.
 *
 *
 * 76. What is graceful degradation and how does it differ?
 * ----------------------------------------------------------
 * Graceful degradation starts with a fully featured experience and ensures that
 * when features fail or are unsupported, the system “degrades gracefully.”
 *
 * Differences:
 * - Progressive enhancement → build from simple → enhanced
 * - Graceful degradation → build advanced → fallback for older browsers
 *
 * Progressive enhancement = additive  
 * Graceful degradation = subtractive  
 *
 *
 * 77. What is semantic versioning in HTML context (HTML as a living standard)?
 * -----------------------------------------------------------------------------
 * HTML used to have fixed versions like HTML4, XHTML, HTML5.
 * Now HTML is a "living standard":
 * - Updated continuously
 * - No strict version numbers
 * - New features added gradually without major version jumps
 *
 * Meaning:
 * - Browsers adopt features at different times
 * - Developers rely on feature detection instead of version detection
 *
 * HTML semantic versioning today means:
 * - Use features when supported
 * - Progressive enhancement ensures compatibility
 *
 *
 * 78. Best practices for SEO-friendly HTML
 * ------------------------------------------
 * Key practices:
 * - Use semantic HTML (header, main, article, nav, footer)
 * - Use meaningful, descriptive <title> and <meta description>
 * - Use correct heading hierarchy (h1 → h2 → h3)
 * - Add alt text to images
 * - Avoid duplicate content
 * - Use canonical URLs when needed
 * - Make pages mobile-friendly (viewport meta tag)
 * - Ensure fast loading (optimize images, reduce blocking scripts)
 * - Use structured data (schema.org)
 *
 *
 * 79. Modern HTML features used in PWAs (Progressive Web Apps)
 * --------------------------------------------------------------
 * PWAs rely on modern HTML-related features:
 *
 * - Web App Manifest:
 *   <link rel="manifest" href="/manifest.json">
 *   Defines name, icons, theme color, display mode, installability.
 *
 * - Service Workers:
 *   Enable offline access, caching, background sync.
 *
 * - Installability:
 *   Browser prompts “Add to Home Screen” when criteria are met.
 *
 * - Responsive icons:
 *   High-resolution icons for app-like installation.
 *
 * - Metadata for theme:
 *   <meta name="theme-color" content="#000">
 *
 * These allow web apps to behave like native applications.
 *
 *
 * 80. What is the purpose of the <noscript> tag and when should you use it?
 * ---------------------------------------------------------------------------
 * <noscript> displays fallback content when:
 * - JavaScript is disabled
 * - JavaScript fails to load
 *
 * Example:
 * <noscript>
 *   <p>Please enable JavaScript to use this site.</p>
 * </noscript>
 *
 * When to use:
 * - For critical UI that depends on JavaScript
 * - To offer alternative navigation or messaging
 * - In analytics: notify about JS-disabled users
 *
 * <noscript> ensures functionality or communication even without JavaScript.
 */


/**
 * 81. What are common pitfalls when using innerHTML?
 * ----------------------------------------------------
 * - XSS risk: inserting untrusted content can execute malicious scripts.
 * - Re-renders entire content: replacing innerHTML destroys event listeners.
 * - Performance issues: causes more reflows compared to targeted DOM updates.
 * - Invalid HTML handling: browser may auto-correct markup in unexpected ways.
 * - Harder debugging: mixing strings and HTML increases complexity.
 *
 *
 * 82. Difference between innerHTML, textContent, and innerText
 * --------------------------------------------------------------
 * innerHTML:
 * - Returns/sets HTML markup.
 * - Parses tags and inserts them into the DOM.
 * - Unsafe for untrusted input.
 *
 * textContent:
 * - Returns/sets only text.
 * - Ignores styling and hidden elements.
 * - Safest and fastest for adding plain text.
 *
 * innerText:
 * - Returns text as rendered (e.g., respects CSS `display: none`).
 * - Triggers layout calculations.
 * - Slower than textContent.
 *
 * Summary:
 * innerHTML → HTML  
 * textContent → raw text  
 * innerText → rendered text  
 *
 *
 * 83. When should you avoid using tables for layout?
 * ----------------------------------------------------
 * Avoid tables when:
 * - Creating responsive layouts
 * - Structuring modern webpages
 * - Designing flexible or accessible UI
 *
 * Problems with layout tables:
 * - Poor accessibility (screen readers struggle with non-data tables)
 * - Hard to style for responsiveness
 * - Bloated markup
 * - Mixes content with presentation (bad semantic practice)
 *
 * Tables should only be used for tabular data.
 *
 *
 * 84. Difference between DOMContentLoaded and load events
 * ---------------------------------------------------------
 * DOMContentLoaded:
 * - Fires when HTML has finished parsing.
 * - Does NOT wait for images, CSS, or subresources.
 * - Best event for running initialization scripts.
 *
 * load:
 * - Fires after everything is fully loaded.
 * - Waits for images, CSS, iframes, fonts, etc.
 *
 * Summary:
 * DOMContentLoaded → document ready  
 * load → page fully loaded  
 *
 *
 * 85. How does browser caching work with HTML?
 * ----------------------------------------------
 * Browsers store downloaded files (HTML, CSS, JS, images) to avoid re-downloading.
 *
 * Controlled by HTTP headers:
 * - Cache-Control: max-age=3600 → how long resource is valid
 * - ETag → checks if file changed on server
 * - Last-Modified → server timestamp for validation
 *
 * HTML is often not cached aggressively because:
 * - It changes frequently
 * - Needs fresh version to load updated assets
 *
 * Benefits of caching:
 * - Faster load times
 * - Reduced server load
 * - Offline capabilities (with service workers)
 *
 *
 * 86. Common HTML anti-patterns
 * -------------------------------
 * - Using <div> for everything instead of semantic tags.
 * - Inline styles everywhere instead of CSS.
 * - Tables for layout.
 * - Missing alt attributes on images.
 * - Deeply nested DOM structures.
 * - Excessive use of <br> for spacing.
 * - Using <b> and <i> instead of <strong> and <em>.
 * - Writing invalid HTML or forgetting closing tags.
 * - Overusing IDs instead of reusable classes.
 * - Using innerHTML for building UIs instead of DOM methods.
 *
 * These reduce accessibility, maintainability, performance, and clarity.
 */



