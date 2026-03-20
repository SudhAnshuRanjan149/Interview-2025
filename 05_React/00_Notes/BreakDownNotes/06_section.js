/*

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

*/




/**
52. What is React Router?
-------------------------

React Router is a standard library for routing in React applications. It enables
navigation between different views/components, manages browser history, and keeps
UI in sync with the URL.

Core Purpose:
- Single Page Application (SPA) routing
- Declarative routing (routes defined as components)
- URL parameter handling
- Nested routes
- Route protection
- Lazy loading

Installation:
-------------

npm install react-router-dom

Basic Setup:
------------

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}

Key Components:
---------------

1. BrowserRouter / HashRouter: Wrapper component
2. Routes: Container for Route components
3. Route: Defines path-to-component mapping
4. Link / NavLink: Navigation links
5. Navigate: Redirect component
6. Outlet: Renders child routes

Dynamic Routes with Parameters:
--------------------------------

import { useParams, useSearchParams } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* URL parameters * /}
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/products/:category/:productId" element={<Product />} />
      
      {/* Query parameters * /}
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

// Access URL parameters
function UserProfile() {
  const { userId } = useParams();
  
  return <h1>User Profile: {userId}</h1>;
  // URL: /users/123 → userId = "123"
}

function Product() {
  const { category, productId } = useParams();
  
  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Product ID: {productId}</h2>
    </div>
  );
  // URL: /products/electronics/456
  // category = "electronics", productId = "456"
}

// Access query parameters
function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  return (
    <div>
      <h1>Search: {query}</h1>
      <p>Page: {page}</p>
      <button onClick={() => setSearchParams({ q: query, page: '2' })}>
        Next Page
      </button>
    </div>
  );
  // URL: /search?q=laptop&page=1
}

Navigation Components:
----------------------

// Link - basic navigation
<Link to="/about">About</Link>
<Link to="/users/123">User 123</Link>

// NavLink - styled when active
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
  style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}
>
  About
</NavLink>

// Link with state
<Link to="/profile" state={{ from: 'dashboard' }}>
  Go to Profile
</Link>

function Profile() {
  const location = useLocation();
  const from = location.state?.from;
  
  return <p>Came from: {from}</p>;
}

Hooks:
------

// useNavigate - programmatic navigation
const navigate = useNavigate();
navigate('/home');
navigate(-1);  // Go back
navigate(1);   // Go forward

// useLocation - current location info
const location = useLocation();
console.log(location.pathname);  // "/users/123"
console.log(location.search);    // "?page=2"
console.log(location.hash);      // "#section1"
console.log(location.state);     // Custom state

// useParams - URL parameters
const { userId } = useParams();

// useSearchParams - query parameters
const [searchParams, setSearchParams] = useSearchParams();

// useMatch - check if route matches
const match = useMatch('/users/:userId');
if (match) {
  console.log('User ID:', match.params.userId);
}

Real-World Example:
-------------------

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  Navigate
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes * /}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes * /}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Dynamic routes * /}
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          
          {/* Nested routes * /}
          <Route path="/products" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          
          {/* 404 * /}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

function Layout({ children }) {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <main>{children}</main>
    </div>
  );
}

Summary:

React Router provides:
- Declarative routing
- Dynamic URL parameters
- Nested routes
- Programmatic navigation
- Route protection
- Browser history management
- SPA navigation without page refresh
*/


/**
53. What is the difference between BrowserRouter and HashRouter?
-----------------------------------------------------------------

BrowserRouter and HashRouter are two router implementations that handle URLs
differently.

BrowserRouter:
--------------

Uses HTML5 History API (pushState, replaceState, popstate)
URLs look clean and normal.

URL Format:
http://example.com/users/123
http://example.com/products/electronics

import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

How it works:
- Uses browser History API
- URLs: /home, /about, /users/123
- Requires server configuration
- Modern, recommended approach

Server Configuration Required:
-------------------------------

BrowserRouter needs server to redirect all routes to index.html

// Apache (.htaccess)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

// Nginx
location / {
  try_files $uri /index.html;
}

// Express.js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Webpack Dev Server
devServer: {
  historyApiFallback: true
}

HashRouter:
-----------

Uses URL hash (#) to keep UI in sync with URL.
URLs have # symbol.

URL Format:
http://example.com/#/users/123
http://example.com/#/products/electronics

import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  );
}

How it works:
- Uses URL hash (after #)
- URLs: /#/home, /#/about, /#/users/123
- No server configuration needed
- Hash part never sent to server
- Older approach, legacy support

Direct Comparison:
------------------

Feature              | BrowserRouter        | HashRouter
---------------------|----------------------|--------------------
URL Format           | /users/123           | /#/users/123
Appearance           | Clean, professional  | Has # symbol
SEO                  | Better               | Worse (hash ignored)
Server Config        | Required             | Not required
Browser Support      | Modern browsers      | All browsers
Use Case             | Production apps      | Static hosting, legacy
History API          | Yes                  | No
Shareable URLs       | Yes                  | Yes (but ugly)
Analytics            | Works normally       | May need special config

Example URLs:
-------------

BrowserRouter:
http://example.com/
http://example.com/about
http://example.com/users/123
http://example.com/products?category=electronics
http://example.com/posts/456#comments

HashRouter:
http://example.com/#/
http://example.com/#/about
http://example.com/#/users/123
http://example.com/#/products?category=electronics
http://example.com/#/posts/456

Why HashRouter works without server config:
--------------------------------------------

Browser behavior:
- Everything after # is NOT sent to server
- http://example.com/#/about → Server only sees http://example.com/
- Server always returns index.html
- React Router handles /#/about on client side

BrowserRouter behavior:
- http://example.com/about → Server sees /about
- If server not configured, returns 404
- Need to configure server to return index.html for all routes

Switching between them:
-----------------------

// Just swap the router component - rest of code stays same!

// BrowserRouter
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Routes * /}
    </Router>
  );
}

// HashRouter
import { HashRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Same routes work! * /}
    </Router>
  );
}

Custom basename:
----------------

// BrowserRouter with basename (app in subdirectory)
<BrowserRouter basename="/app">
  <Routes>
    <Route path="/" element={<Home />} />
    {/* Actual URL: http://example.com/app/ * /}
    <Route path="/about" element={<About />} />
    {/* Actual URL: http://example.com/app/about * /}
  </Routes>
</BrowserRouter>

// HashRouter with basename
<HashRouter basename="/app">
  <Routes>
    <Route path="/" element={<Home />} />
    {/* Actual URL: http://example.com/app#/ * /}
    <Route path="/about" element={<About />} />
    {/* Actual URL: http://example.com/app#/about * /}
  </Routes>
</HashRouter>

MemoryRouter (bonus):
---------------------

Keeps history in memory (no URL changes).
Used for testing or non-browser environments.

import { MemoryRouter } from 'react-router-dom';

// Testing
test('renders home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
});

// React Native
import { NativeRouter } from 'react-router-native';

When to use each:
-----------------

Use BrowserRouter when:
✅ Modern production apps
✅ Have control over server
✅ Want clean URLs
✅ SEO matters
✅ Professional appearance needed
✅ Can configure server redirects

Use HashRouter when:
✅ Static file hosting (GitHub Pages, S3)
✅ No server configuration access
✅ Legacy browser support needed
✅ Quick prototypes
✅ Local file:// protocol
✅ Electron apps

Use MemoryRouter when:
✅ Testing components
✅ React Native apps
✅ Non-browser environments
✅ Don't want URL changes

Real-world example:
-------------------

// Production app (BrowserRouter)
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

// URLs: example.com/products/123
// Server config: Redirect all to index.html

// GitHub Pages deployment (HashRouter)
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </HashRouter>
  );
}

// URLs: username.github.io/repo/#/products/123
// No server config needed!

Summary:

BrowserRouter:
- Clean URLs (/about)
- Requires server config
- Better SEO
- Modern, recommended
- Production apps

HashRouter:
- Hash URLs (/#/about)
- No server config needed
- Works on static hosts
- Legacy support
- Quick prototypes

Choose BrowserRouter unless you can't configure server!
*/


/**
54. What are Route and Switch (or Routes in v6)?
------------------------------------------------

Route defines a mapping between a URL path and a component.
Switch (v5) / Routes (v6) is a container that renders the first matching Route.

React Router v6 (Current):
--------------------------

Routes component replaces Switch with improved features.

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

Key Differences v5 vs v6:
--------------------------

React Router v5 (Old):
----------------------

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      {/* component prop * /}
      <Route path="/" exact component={Home} />
      
      {/* render prop * /}
      <Route path="/about" render={() => <About />} />
      
      {/* children prop * /}
      <Route path="/contact">
        <Contact />
      </Route>
      
      {/* Dynamic route * /}
      <Route path="/users/:userId" component={UserProfile} />
      
      {/* 404 - no path * /}
      <Route component={NotFound} />
    </Switch>
  );
}

// Need exact prop for exact matches
<Route exact path="/" component={Home} />

React Router v6 (New):
----------------------

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* element prop (JSX) * /}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Dynamic route * /}
      <Route path="/users/:userId" element={<UserProfile />} />
      
      {/* 404 - wildcard * /}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Exact matching by default (no exact prop needed!)
// Best match automatically selected

Comparison Table:
-----------------

Feature              | v5 (Switch)          | v6 (Routes)
---------------------|----------------------|-------------------
Component name       | Switch               | Routes
Prop for component   | component/render     | element (JSX)
Exact matching       | Need exact prop      | Default behavior
Match algorithm      | First match          | Best match
Relative paths       | No                   | Yes
Nested routes        | Complex              | Simple with Outlet
Multiple rendering   | No (first match)     | No (best match)
Route ordering       | Matters a lot        | Matters less

Route Component Props:
----------------------

// v6 Route props
<Route
  path="/users/:userId"           // URL pattern
  element={<UserProfile />}        // Component to render
  index                            // Default child route
  caseSensitive                    // Case-sensitive matching
/>

// Path patterns
<Route path="/" />                      // Root
<Route path="/about" />                 // Static path
<Route path="/users/:userId" />         // Dynamic segment
<Route path="/posts/:id/:slug" />       // Multiple params
<Route path="/files/*" />               // Wildcard (rest of path)
<Route path="*" />                      // Catch all (404)

Index Routes:
-------------

// Default child route
<Routes>
  <Route path="/products" element={<ProductLayout />}>
    <Route index element={<ProductList />} />
    {/* When URL is /products, show ProductList * /}
    <Route path=":id" element={<ProductDetail />} />
  </Route>
</Routes>

Multiple Routes Containers:
----------------------------

// Can have multiple Routes in different parts of app
function App() {
  return (
    <div>
      <Header>
        <Routes>
          <Route path="/login" element={<LoginButton />} />
          <Route path="*" element={<LogoutButton />} />
        </Routes>
      </Header>
      
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<DashboardNav />} />
          <Route path="/settings" element={<SettingsNav />} />
        </Routes>
      </Sidebar>
      
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Main>
    </div>
  );
}

Route Matching Examples:
-------------------------

// v6: Best match (not first match)
<Routes>
  <Route path="/users" element={<Users />} />
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/users/new" element={<NewUser />} />
</Routes>

// URL: /users → Users
// URL: /users/123 → UserProfile (userId=123)
// URL: /users/new → NewUser (specific route wins over dynamic!)

// v5 needed careful ordering
<Switch>
  <Route path="/users/new" component={NewUser} />
  {/* Must be BEFORE :userId route * /}
  <Route path="/users/:userId" component={UserProfile} />
  <Route path="/users" component={Users} />
</Switch>

Wildcard Routes:
----------------

<Routes>
  {/* Matches /files/a * /}
  <Route path="/files/*" element={<FileManager />} />
  
  {/* Inside FileManager, can have nested routes * /}
</Routes>

function FileManager() {
  return (
    <Routes>
      <Route path="/" element={<FileList />} />
      <Route path="/:fileId" element={<FileDetail />} />
    </Routes>
  );
}

Layout Routes:
--------------

// Route that wraps other routes
<Routes>
  <Route path="/" element={<Layout />}>
    {/* Child routes * /}
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
  </Route>
</Routes>

function Layout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <Outlet />  {/* Child routes render here * /}
      </main>
      <Footer />
    </div>
  );
}

No Match (404) Routes:
----------------------

// v6: Use * wildcard at end
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>

// v5: Route with no path
<Switch>
  <Route path="/" exact component={Home} />
  <Route path="/about" component={About} />
  <Route component={NotFound} />
</Switch>

Relative Routes:
----------------

// v6: Relative paths work!
<Route path="users" element={<UsersLayout />}>
  <Route path="list" element={<UserList />} />
  {/* Full path: /users/list * /}
  
  <Route path=":userId" element={<UserProfile />} />
  {/* Full path: /users/:userId * /}
  
  <Route path=":userId/edit" element={<EditUser />} />
  {/* Full path: /users/:userId/edit * /}
</Route>

Passing Props to Route Elements:
---------------------------------

// v6: Can pass props directly in JSX
<Route path="/profile" element={<Profile user={user} theme={theme} />} />

// v5: Had to use render prop
<Route path="/profile" render={(props) => (
  <Profile {...props} user={user} theme={theme} />
)} />

Route Configuration (Object-based):
------------------------------------

import { useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
      ]
    },
    {
      path: '/users',
      element: <UsersLayout />,
      children: [
        { index: true, element: <UserList /> },
        { path: ':userId', element: <UserProfile /> },
      ]
    },
    { path: '*', element: <NotFound /> }
  ]);
  
  return routes;
}

Route Guards / Protection:
---------------------------

<Routes>
  {/* Public routes * /}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  
  {/* Protected routes * /}
  <Route
    path="/dashboard"
    element={
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    }
  />
  
  <Route
    path="/profile"
    element={
      <RequireAuth>
        <Profile />
      </RequireAuth>
    }
  />
</Routes>

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

Summary:

v5 (Switch):
- Renders first matching route
- Need exact prop for exact matches
- Order matters a lot
- component/render props

v6 (Routes):
- Renders best matching route
- Exact by default
- Smarter matching algorithm
- element prop (JSX)
- Relative paths support
- Simpler nested routes
- Better TypeScript support

v6 is a complete rewrite with better API and performance!
*/


/**
55. What is useNavigate and how do you programmatically navigate?
-----------------------------------------------------------------

useNavigate is a hook that returns a function to programmatically navigate between
routes. It replaces useHistory from v5.

Basic Usage:
------------

import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await loginAPI(credentials);
    
    if (success) {
      navigate('/dashboard');  // Navigate to dashboard
    }
  };
  
  return (
    <form onSubmit={handleLogin}>
      {/* form fields * /}
    </form>
  );
}

Navigation Methods:
-------------------

function NavigationExamples() {
  const navigate = useNavigate();
  
  // 1. Navigate to path
  const goToHome = () => {
    navigate('/');
  };
  
  // 2. Navigate with params
  const goToUser = (userId) => {
    navigate(`/users/${userId}`);
  };
  
  // 3. Navigate with query params
  const goToSearch = (query) => {
    navigate(`/search?q=${query}`);
  };
  
  // 4. Navigate with state
  const goToProfile = () => {
    navigate('/profile', {
      state: { from: 'dashboard', userId: 123 }
    });
  };
  
  // 5. Replace current entry (no back button)
  const replaceRoute = () => {
    navigate('/new-page', { replace: true });
  };
  
  // 6. Go back
  const goBack = () => {
    navigate(-1);
  };
  
  // 7. Go forward
  const goForward = () => {
    navigate(1);
  };
  
  // 8. Go back 2 pages
  const goBack2 = () => {
    navigate(-2);
  };
  
  // 9. Relative navigation
  const goToRelative = () => {
    navigate('..'); // Parent route
    navigate('../sibling'); // Sibling route
    navigate('child'); // Child route
  };
  
  return (
    <div>
      <button onClick={goToHome}>Home</button>
      <button onClick={() => goToUser(123)}>User 123</button>
      <button onClick={goBack}>Back</button>
      <button onClick={goForward}>Forward</button>
    </div>
  );
}

Common Patterns:
----------------

// 1. Navigate after form submission
function CreatePostForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (formData) => {
    const post = await createPost(formData);
    
    // Redirect to new post
    navigate(`/posts/${post.id}`);
  };
  
  return <form onSubmit={handleSubmit}>{/* ... * /}</form>;
}

// 2. Navigate after authentication
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogin = async (credentials) => {
    await loginAPI(credentials);
    
    // Redirect to page they tried to access or dashboard
    const from = location.state?.from || '/dashboard';
    navigate(from, { replace: true });
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}

// 3. Navigate with confirmation
function DeleteButton({ itemId }) {
  const navigate = useNavigate();
  
  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      await deleteItem(itemId);
      navigate('/items'); // Go back to list
    }
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}

// 4. Conditional navigation
function SubmitButton() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    const result = await saveData();
    
    if (result.success) {
      navigate('/success');
    } else {
      navigate('/error', { state: { error: result.error } });
    }
  };
  
  return <button onClick={handleClick}>Submit</button>;
}

// 5. Navigate with search params
function FilteredSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  
  const applyFilters = () => {
    const searchParams = new URLSearchParams(filters).toString();
    navigate(`/search?${searchParams}`);
  };
  
  return <button onClick={applyFilters}>Apply Filters</button>;
}

Navigate vs Link:
-----------------

// Link: For user clicks (declarative)
<Link to="/about">About</Link>

// useNavigate: For programmatic navigation (imperative)
const navigate = useNavigate();
const handleComplete = () => {
  // After some logic
  navigate('/complete');
};

Navigation Options:
-------------------

navigate(to, options);

// Options object:
{
  replace: boolean,    // Replace history entry instead of push
  state: any,          // State to pass to next route
  preventScrollReset: boolean  // Keep scroll position
}

// Examples
navigate('/profile', {
  replace: true,  // Can't go back to previous page
  state: { userId: 123 },  // Pass data
  preventScrollReset: true  // Don't scroll to top
});

Reading Navigation State:
-------------------------

import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  
  // Access state passed via navigate
  const userId = location.state?.userId;
  const from = location.state?.from;
  
  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Came from: {from}</p>
    </div>
  );
}

// Navigate with state
navigate('/profile', {
  state: { userId: 123, from: 'dashboard' }
});

Replacing vs Pushing:
---------------------

// Push (default): Adds to history stack
navigate('/page1');  // Can go back
navigate('/page2');  // Can go back to page1
navigate('/page3');  // Can go back to page2

// Replace: Replaces current entry
navigate('/page1', { replace: true });  // Can't go back to previous
navigate('/page2', { replace: true });  // Replaces page1 in history

// Use replace for:
// - Login redirects
// - Error page redirects
// - Wizard/multi-step flows

Example: Multi-step Form
------------------------

function MultiStepForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    
    if (step === 3) {
      // Final step: submit and navigate
      submitForm({ ...formData, ...data });
      navigate('/success', { replace: true });
      // replace: true prevents going back to form
    } else {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  
  return (
    <div>
      {step === 1 && <Step1 onNext={nextStep} />}
      {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <Step3 onNext={nextStep} onBack={prevStep} />}
    </div>
  );
}

Example: Protected Route Redirect
----------------------------------

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Save current location to redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogin = async (credentials) => {
    await loginAPI(credentials);
    
    // Redirect to where they came from
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}

Relative Navigation:
--------------------

// Current URL: /users/123/posts
const navigate = useNavigate();

navigate('edit');        // /users/123/posts/edit
navigate('./edit');      // /users/123/posts/edit
navigate('../edit');     // /users/123/edit
navigate('../../admin'); // /users/admin
navigate('..');          // /users/123
navigate('/');           // /

// Use relative for nested routes
<Route path="users/:userId" element={<UserLayout />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>

function Profile() {
  const navigate = useNavigate();
  
  const goToSettings = () => {
    navigate('../settings'); // Relative to /users/:userId
  };
  
  return <button onClick={goToSettings}>Settings</button>;
}

Preventing Navigation (v5 comparison):
---------------------------------------

// v5: useHistory + Prompt
import { useHistory, Prompt } from 'react-router-dom';

function Form() {
  const history = useHistory();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  return (
    <>
      <Prompt
        when={hasUnsavedChanges}
        message="You have unsaved changes. Leave anyway?"
      />
      <form>{/* ... * /}</form>
    </>
  );
}

// v6: useBlocker (unstable API)
import { useBlocker } from 'react-router-dom';

function Form() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  useBlocker(() => {
    if (hasUnsavedChanges) {
      return !window.confirm('You have unsaved changes. Leave anyway?');
    }
    return false;
  });
  
  return <form>{/* ... * /}</form>;
}

// Or use native browser API
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = '';
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [hasUnsavedChanges]);

Navigate Component (declarative alternative):
----------------------------------------------

import { Navigate } from 'react-router-dom';

// Declarative redirect
function OldPage() {
  return <Navigate to="/new-page" replace />;
}

// Conditional redirect
function Dashboard() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Dashboard Content</div>;
}

// vs useNavigate (imperative)
function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return <div>Dashboard Content</div>;
}

v5 to v6 Migration:
-------------------

// v5: useHistory
import { useHistory } from 'react-router-dom';

function Component() {
  const history = useHistory();
  
  history.push('/path');
  history.replace('/path');
  history.goBack();
  history.goForward();
  history.push('/path', { state: 'value' });
}

// v6: useNavigate
import { useNavigate } from 'react-router-dom';

function Component() {
  const navigate = useNavigate();
  
  navigate('/path');
  navigate('/path', { replace: true });
  navigate(-1);
  navigate(1);
  navigate('/path', { state: { state: 'value' } });
}

Summary:

useNavigate:
- Hook for programmatic navigation
- Returns navigate function
- navigate(path) - go to path
- navigate(-1) - go back
- navigate(1) - go forward
- Can pass state with navigation
- replace option to replace history
- Relative paths supported
- Use for: form submissions, authentication, conditional redirects

Use Link for user clicks, useNavigate for programmatic logic!
*/


/**
56. What are nested routes?
---------------------------

Nested routes are routes defined within other routes, creating a hierarchical URL
structure and component hierarchy. Child routes render inside parent routes using
the Outlet component.

Purpose:
- Shared layouts
- Hierarchical URLs
- Component composition
- Code organization

Basic Nested Routes:
--------------------

import { Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Parent route * /}
      <Route path="/" element={<Layout />}>
        {/* Child routes * /}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

// Layout component with Outlet
function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      
      <main>
        <Outlet />  {/* Child routes render here * /}
      </main>
      
      <footer>Footer</footer>
    </div>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

// URL Structure:
// / → Layout + Home
// /about → Layout + About
// /contact → Layout + Contact

Multi-Level Nesting:
--------------------

<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    
    {/* Products section * /}
    <Route path="products" element={<ProductsLayout />}>
      <Route index element={<ProductList />} />
      <Route path=":productId" element={<ProductDetail />} />
      <Route path=":productId/reviews" element={<ProductReviews />} />
      <Route path="new" element={<NewProduct />} />
    </Route>
    
    {/* Users section * /}
    <Route path="users" element={<UsersLayout />}>
      <Route index element={<UserList />} />
      <Route path=":userId" element={<UserProfile />} />
      <Route path=":userId/settings" element={<UserSettings />} />
    </Route>
  </Route>
</Routes>

// URL Structure:
// / → Layout + Home
// /products → Layout + ProductsLayout + ProductList
// /products/123 → Layout + ProductsLayout + ProductDetail
// /products/123/reviews → Layout + ProductsLayout + ProductReviews
// /users → Layout + UsersLayout + UserList
// /users/456 → Layout + UsersLayout + UserProfile

Index Routes:
-------------

// Index route = default child route
<Route path="products" element={<ProductsLayout />}>
  <Route index element={<ProductList />} />
  {/* Renders when URL is exactly /products * /}
  
  <Route path=":id" element={<ProductDetail />} />
  {/* Renders when URL is /products/:id * /}
</Route>

Real-World Example: Dashboard
------------------------------

function App() {
  return (
    <Routes>
      {/* Public routes * /}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      {/* Dashboard routes (protected) * /}
      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        
        {/* Analytics section * /}
        <Route path="analytics" element={<AnalyticsLayout />}>
          <Route index element={<AnalyticsOverview />} />
          <Route path="reports" element={<Reports />} />
          <Route path="charts" element={<Charts />} />
        </Route>
        
        {/* Settings section * /}
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<GeneralSettings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="billing" element={<BillingSettings />} />
        </Route>
        
        {/* Users section * /}
        <Route path="users" element={<UsersSection />}>
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserDetail />} />
          <Route path="new" element={<NewUser />} />
        </Route>
      </Route>
      
      {/* 404 * /}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Dashboard Layout (with sidebar)
function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar>
        <Link to="/dashboard">Home</Link>
        <Link to="/dashboard/analytics">Analytics</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/users">Users</Link>
      </Sidebar>
      
      <main>
        <Outlet />  {/* Nested routes render here * /}
      </main>
    </div>
  );
}

// Analytics Layout (with sub-navigation)
function AnalyticsLayout() {
  return (
    <div>
      <nav>
        <Link to="/dashboard/analytics">Overview</Link>
        <Link to="/dashboard/analytics/reports">Reports</Link>
        <Link to="/dashboard/analytics/charts">Charts</Link>
      </nav>
      
      <div>
        <Outlet />  {/* Analytics sub-routes render here * /}
      </div>
    </div>
  );
}

// Settings Layout (tabs)
function SettingsLayout() {
  return (
    <div>
      <h1>Settings</h1>
      
      <nav className="tabs">
        <Link to="/dashboard/settings">General</Link>
        <Link to="/dashboard/settings/profile">Profile</Link>
        <Link to="/dashboard/settings/security">Security</Link>
        <Link to="/dashboard/settings/billing">Billing</Link>
      </nav>
      
      <div>
        <Outlet />  {/* Settings pages render here * /}
      </div>
    </div>
  );
}

Outlet Context (Passing Data):
-------------------------------

// Parent passes data to children via Outlet
function ProductsLayout() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  
  return (
    <div>
      <h1>Products</h1>
      <Outlet context={{ products, loading }} />
    </div>
  );
}

// Child accesses context
import { useOutletContext } from 'react-router-dom';

function ProductList() {
  const { products, loading } = useOutletContext();
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

Relative Links in Nested Routes:
---------------------------------

function ProductsLayout() {
  return (
    <div>
      <nav>
        {/* Relative links (relative to current route) * /}
        <Link to="">List</Link>
        {/* Same as /products * /}
        
        <Link to="new">New Product</Link>
        {/* Same as /products/new * /}
        
        <Link to="../users">Users</Link>
        {/* Up one level: /users * /}
      </nav>
      
      <Outlet />
    </div>
  );
}

Nested Routes with Parameters:
-------------------------------

<Routes>
  <Route path="users" element={<UsersLayout />}>
    <Route index element={<UserList />} />
    
    {/* User detail with nested routes * /}
    <Route path=":userId" element={<UserLayout />}>
      <Route index element={<UserProfile />} />
      <Route path="posts" element={<UserPosts />} />
      <Route path="followers" element={<UserFollowers />} />
      <Route path="settings" element={<UserSettings />} />
    </Route>
  </Route>
</Routes>

function UserLayout() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <div>
      <header>
        <h1>{user.name}</h1>
        <nav>
          <Link to={`/users/${userId}`}>Profile</Link>
          <Link to={`/users/${userId}/posts`}>Posts</Link>
          <Link to={`/users/${userId}/followers`}>Followers</Link>
          <Link to={`/users/${userId}/settings`}>Settings</Link>
        </nav>
      </header>
      
      <Outlet context={{ user }} />
    </div>
  );
}

function UserPosts() {
  const { user } = useOutletContext();
  
  return (
    <div>
      <h2>{user.name}'s Posts</h2>
      {/* ... * /}
    </div>
  );
}

Pathless Routes (Layout-only):
-------------------------------

// Route without path (for grouping/layout only)
<Routes>
  <Route element={<AuthLayout />}>
    {/* All these routes use AuthLayout * /}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
  </Route>
  
  <Route element={<MainLayout />}>
    {/* All these use MainLayout * /}
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
</Routes>

function AuthLayout() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Logo />
        <Outlet />  {/* Login/Register/etc renders here * /}
      </div>
    </div>
  );
}

Route Object Configuration:
----------------------------

import { useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        {
          path: 'products',
          element: <ProductsLayout />,
          children: [
            { index: true, element: <ProductList /> },
            { path: ':id', element: <ProductDetail /> },
            { path: 'new', element: <NewProduct /> }
          ]
        }
      ]
    }
  ]);
  
  return routes;
}

Benefits of Nested Routes:
---------------------------

1. Shared Layouts
   - Header/footer/sidebar shared across pages
   - DRY (Don't Repeat Yourself)

2. Code Organization
   - Logical grouping of related routes
   - Easier to understand structure

3. URL Hierarchy
   - /dashboard/analytics/reports reflects structure
   - Intuitive navigation

4. Component Composition
   - Layouts wrap content
   - Reusable components

5. Context Sharing
   - Parent can provide data to children via Outlet context

6. Performance
   - Can lazy load nested routes
   - Only load what's needed

Lazy Loading with Nested Routes:
---------------------------------

import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));
const Settings = lazy(() => import('./Settings'));

<Routes>
  <Route path="/" element={<Layout />}>
    <Route path="dashboard" element={
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    }>
      <Route path="analytics" element={
        <Suspense fallback={<Loading />}>
          <Analytics />
        </Suspense>
      } />
      <Route path="settings" element={
        <Suspense fallback={<Loading />}>
          <Settings />
        </Suspense>
      } />
    </Route>
  </Route>
</Routes>

Summary:

Nested Routes:
- Routes within routes
- Create URL hierarchy (/parent/child)
- Share layouts with Outlet
- Index routes for default child
- Outlet context for passing data
- Relative links and navigation
- Multiple levels of nesting
- Pathless routes for layouts
- Code organization and composition
- Essential for complex apps
*/


/**
57. What are protected routes and how do you implement them?
------------------------------------------------------------

Protected routes (also called private routes or auth routes) restrict access to certain
pages based on authentication or authorization. Unauthenticated users are redirected
to login.

Purpose:
- Protect sensitive pages (dashboard, profile, admin)
- Enforce authentication
- Handle authorization (roles, permissions)
- Redirect unauthorized users

Basic Protected Route:
----------------------

import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();  // Custom auth hook
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login, save current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// Usage
<Routes>
  <Route path="/login" element={<Login />} />
  
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
</Routes>

Auth Context Setup:
-------------------

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in (check token, etc.)
    checkAuthStatus()
      .then(user => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  
  const login = async (credentials) => {
    const user = await loginAPI(credentials);
    setUser(user);
    localStorage.setItem('token', user.token);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

Complete Protected Route with Loading:
---------------------------------------

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Show loading while checking auth
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Render protected content
  return children;
}

Login with Redirect Back:
--------------------------

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (credentials) => {
    await login(credentials);
    
    // Redirect to where they came from (or dashboard)
    navigate(from, { replace: true });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

Role-Based Protected Routes:
-----------------------------

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}

// Usage
<Routes>
  {/* Anyone can access * /}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  
  {/* Only authenticated users * /}
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  
  {/* Only admins * /}
  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  } />
  
  {/* Admin or moderator * /}
  <Route path="/moderation" element={
    <ProtectedRoute allowedRoles={['admin', 'moderator']}>
      <ModerationPanel />
    </ProtectedRoute>
  } />
</Routes>

Layout-Based Protection:
-------------------------

// Protect entire section
<Routes>
  <Route path="/" element={<PublicLayout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="login" element={<Login />} />
  </Route>
  
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }>
    {/* All nested routes automatically protected * /}
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    <Route path="analytics" element={<Analytics />} />
  </Route>
</Routes>

Permission-Based Protection:
-----------------------------

function ProtectedRoute({ children, requiredPermission }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check specific permission
  if (requiredPermission && !user.permissions.includes(requiredPermission)) {
    return <div>You don't have permission to access this page.</div>;
  }
  
  return children;
}

// Usage
<Route path="/users/delete" element={
  <ProtectedRoute requiredPermission="users.delete">
    <DeleteUser />
  </ProtectedRoute>
} />

<Route path="/posts/create" element={
  <ProtectedRoute requiredPermission="posts.create">
    <CreatePost />
  </ProtectedRoute>
} />

Reusable Route Components:
---------------------------

// Public-only routes (redirect if logged in)
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

// Guest routes (login/register)
<Route path="/login" element={
  <PublicRoute>
    <Login />
  </PublicRoute>
} />

<Route path="/register" element={
  <PublicRoute>
    <Register />
  </PublicRoute>
} />

Multiple Protection Layers:
----------------------------

function ProtectedRoute({ children, requireAuth = true, allowedRoles, requiredPermissions }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Check permissions
  if (requiredPermissions) {
    const hasPermissions = requiredPermissions.every(
      perm => user?.permissions.includes(perm)
    );
    
    if (!hasPermissions) {
      return <div>Insufficient permissions</div>;
    }
  }
  
  return children;
}

// Usage
<Route path="/admin/users" element={
  <ProtectedRoute
    requireAuth={true}
    allowedRoles={['admin', 'superadmin']}
    requiredPermissions={['users.view', 'users.edit']}
  >
    <UserManagement />
  </ProtectedRoute>
} />

Route Configuration with Protection:
-------------------------------------

const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> }
    ]
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'profile', element: <Profile /> },
      {
        path: 'admin',
        element: <ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>,
        children: [
          { path: 'users', element: <UserManagement /> },
          { path: 'settings', element: <AdminSettings /> }
        ]
      }
    ]
  }
];

function App() {
  return useRoutes(routes);
}

Token Refresh on Protected Routes:
-----------------------------------

function ProtectedRoute({ children }) {
  const { isAuthenticated, refreshToken, loading } = useAuth();
  const location = useLocation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    // Try to refresh token if expired
    if (isAuthenticated && isTokenExpired()) {
      setIsRefreshing(true);
      refreshToken()
        .catch(() => {
          // Refresh failed, redirect to login
          navigate('/login', { state: { from: location }, replace: true });
        })
        .finally(() => setIsRefreshing(false));
    }
  }, [location]);
  
  if (loading || isRefreshing) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

Protected API Routes:
---------------------

// Axios interceptor for protected API calls
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

Component-Level Protection:
----------------------------

// Protect specific components/actions within a page
function Dashboard() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* All users see this * /}
      <UserStats />
      
      {/* Only admins see this * /}
      {user.role === 'admin' && (
        <AdminPanel />
      )}
      
      {/* Only users with permission * /}
      {user.permissions.includes('posts.create') && (
        <button>Create Post</button>
      )}
    </div>
  );
}

Testing Protected Routes:
--------------------------

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('redirects to login when not authenticated', () => {
  render(
    <AuthProvider value={{ isAuthenticated: false, loading: false }}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div>Dashboard</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
  
  expect(screen.getByText('Login Page')).toBeInTheDocument();
});

test('renders protected content when authenticated', () => {
  render(
    <AuthProvider value={{ isAuthenticated: true, loading: false, user: { role: 'user' } }}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div>Dashboard</div>
            </ProtectedRoute>
          } />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
  
  expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

Summary:

Protected Routes:
- Restrict access based on authentication
- Redirect unauthorized users to login
- Support role-based access control (RBAC)
- Support permission-based access
- Handle loading states
- Preserve attempted URL for redirect after login
- Can wrap individual routes or entire sections
- Essential for secure applications
- Combine with auth context for state management
*/


/**
58. What is code splitting in React Router?
-------------------------------------------

Code splitting in React Router is the technique of splitting your app into smaller
chunks that are loaded on-demand, reducing initial bundle size and improving
performance. Routes are loaded only when needed.

Purpose:
- Reduce initial bundle size
- Faster initial page load
- Load routes on-demand
- Better performance for large apps
- Improved user experience

Basic Code Splitting:
---------------------

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Loading fallback
function LoadingSpinner() {
  return <div>Loading...</div>;
}

Without Code Splitting:
------------------------

// All components imported immediately
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

// Result: Large initial bundle
// bundle.js: 500KB (includes all pages)

With Code Splitting:
--------------------

// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

// Result: Smaller initial bundle + separate chunks
// bundle.js: 100KB (main app)
// Home.chunk.js: 50KB (loaded when visiting /)
// About.chunk.js: 30KB (loaded when visiting /about)
// Dashboard.chunk.js: 200KB (loaded when visiting /dashboard)
// Profile.chunk.js: 120KB (loaded when visiting /profile)

Multiple Suspense Boundaries:
------------------------------

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes * /}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Dashboard with its own Suspense * /}
            <Route path="/dashboard" element={
              <Suspense fallback={<DashboardLoader />}>
                <Dashboard />
              </Suspense>
            } />
            
            {/* Admin with its own Suspense * /}
            <Route path="/admin" element={
              <Suspense fallback={<AdminLoader />}>
                <AdminPanel />
              </Suspense>
            } />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

Nested Route Code Splitting:
-----------------------------

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics'));
const Reports = lazy(() => import('./pages/Dashboard/Reports'));
const Settings = lazy(() => import('./pages/Dashboard/Settings'));

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      }>
        {/* Nested routes also lazy loaded * /}
        <Route path="analytics" element={
          <Suspense fallback={<Loading />}>
            <Analytics />
          </Suspense>
        } />
        
        <Route path="reports" element={
          <Suspense fallback={<Loading />}>
            <Reports />
          </Suspense>
        } />
        
        <Route path="settings" element={
          <Suspense fallback={<Loading />}>
            <Settings />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

Preloading Routes:
------------------

// Preload component before user navigates
const Dashboard = lazy(() => import('./pages/Dashboard'));

function Home() {
  // Preload Dashboard when user hovers over link
  const handleMouseEnter = () => {
    import('./pages/Dashboard');  // Starts loading
  };
  
  return (
    <div>
      <h1>Home</h1>
      <Link
        to="/dashboard"
        onMouseEnter={handleMouseEnter}
      >
        Dashboard
      </Link>
    </div>
  );
}

// Or preload after a delay
useEffect(() => {
  setTimeout(() => {
    import('./pages/Dashboard');  // Preload in background
  }, 3000);
}, []);

Error Boundaries with Code Splitting:
--------------------------------------

import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Failed to load page</h1>
          <button onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

Route-based Code Splitting Pattern:
------------------------------------

// routes.js
export const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
    exact: true
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/About'))
  },
  {
    path: '/dashboard',
    component: lazy(() => import('./pages/Dashboard')),
    protected: true
  },
  {
    path: '/admin',
    component: lazy(() => import('./pages/Admin')),
    protected: true,
    roles: ['admin']
  }
];

// App.js
import { routes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map(({ path, component: Component, protected, roles }) => (
            <Route
              key={path}
              path={path}
              element={
                protected ? (
                  <ProtectedRoute allowedRoles={roles}>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

Component-Level Splitting:
---------------------------

// Split large components too, not just routes
const Home = lazy(() => import('./pages/Home'));
const HeavyChart = lazy(() => import('./components/HeavyChart'));
const VideoPlayer = lazy(() => import('./components/VideoPlayer'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <h1>Dashboard</h1>
      
      <button onClick={() => setShowChart(true)}>
        Show Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}

Real-World Example:
-------------------

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Immediately loaded (small, always needed)
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// Lazy loaded (large, not always needed)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Dashboard section (large feature)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardHome = lazy(() => import('./pages/Dashboard/Home'));
const Analytics = lazy(() => import('./pages/Dashboard/Analytics'));
const Reports = lazy(() => import('./pages/Dashboard/Reports'));

// Admin section (rarely accessed)
const Admin = lazy(() => import('./pages/Admin'));
const Users = lazy(() => import('./pages/Admin/Users'));
const Settings = lazy(() => import('./pages/Admin/Settings'));

// Shop section
const Shop = lazy(() => import('./pages/Shop'));
const ProductList = lazy(() => import('./pages/Shop/ProductList'));
const ProductDetail = lazy(() => import('./pages/Shop/ProductDetail'));
const Cart = lazy(() => import('./pages/Shop/Cart'));
const Checkout = lazy(() => import('./pages/Shop/Checkout'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes * /}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Dashboard routes * /}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={
              <Suspense fallback={<SectionLoader />}>
                <DashboardHome />
              </Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<SectionLoader />}>
                <Analytics />
              </Suspense>
            } />
            <Route path="reports" element={
              <Suspense fallback={<SectionLoader />}>
                <Reports />
              </Suspense>
            } />
          </Route>
          
          {/* Admin routes * /}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }>
            <Route path="users" element={
              <Suspense fallback={<SectionLoader />}>
                <Users />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<SectionLoader />}>
                <Settings />
              </Suspense>
            } />
          </Route>
          
          {/* Shop routes * /}
          <Route path="/shop" element={<Shop />}>
            <Route index element={
              <Suspense fallback={<SectionLoader />}>
                <ProductList />
              </Suspense>
            } />
            <Route path=":id" element={
              <Suspense fallback={<SectionLoader />}>
                <ProductDetail />
              </Suspense>
            } />
            <Route path="cart" element={
              <Suspense fallback={<SectionLoader />}>
                <Cart />
              </Suspense>
            } />
            <Route path="checkout" element={
              <Suspense fallback={<SectionLoader />}>
                <Checkout />
              </Suspense>
            } />
          </Route>
          
          {/* 404 * /}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

Performance Metrics:
--------------------

Without code splitting:
- Initial bundle: 800KB
- First load: 3.5s
- Time to Interactive: 4.2s

With code splitting:
- Initial bundle: 150KB (main app + home page)
- First load: 0.8s
- Time to Interactive: 1.2s
- Subsequent pages: Load on demand (200-300ms each)

Best Practices:
---------------

1. Split by route (most common)
2. Split large features/sections
3. Don't over-split (too many chunks is bad)
4. Keep critical code in main bundle
5. Preload likely next routes
6. Use Error Boundaries
7. Meaningful loading states
8. Monitor chunk sizes

When to Code Split:
-------------------

✅ Large routes/pages (>100KB)
✅ Admin panels (not all users access)
✅ Dashboards with heavy visualizations
✅ E-commerce checkout flows
✅ Feature-rich pages with third-party libs
✅ Modals/dialogs with heavy content

When NOT to:
❌ Small components (<10KB)
❌ Critical above-the-fold content
❌ Shared components used everywhere
❌ Already small bundles (<200KB total)

Webpack Magic Comments:
------------------------

// Chunk naming
const Dashboard = lazy(() => import(
  /* webpackChunkName: "dashboard" * /
  './pages/Dashboard'
));

// Prefetch (load in idle time)
const Dashboard = lazy(() => import(
  /* webpackPrefetch: true * /
  './pages/Dashboard'
));

// Preload (load immediately with parent)
const Dashboard = lazy(() => import(
  /* webpackPreload: true * /
  './pages/Dashboard'
));

Summary:

Code Splitting in React Router:
- Use lazy() and Suspense
- Split by route for best results
- Reduces initial bundle size
- Improves load time
- Routes loaded on-demand
- Multiple Suspense boundaries
- Error boundaries for failures
- Preload next likely routes
- Essential for large apps
- Webpack handles chunking
- Monitor and optimize chunk sizes
*/


