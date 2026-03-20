/*

========================================================
SECTION 12 — TESTING IN REACT
========================================================
91. What is Jest and how is it used in React?  
92. What is React Testing Library (RTL)?  
93. What is the difference between unit, integration, and E2E testing?  
94. What tools are used for E2E testing (Cypress, Playwright)?  
95. What is snapshot testing?  

*/




/**
91. What is Jest and how is it used in React?
--------------------------------------------

Jest is a JavaScript testing framework developed by Facebook, designed to work
seamlessly with React. It provides a complete testing solution with test runner,
assertion library, mocking capabilities, and code coverage out of the box.

What is Jest:
-------------

// Jest provides:
// - Test runner (executes tests)
// - Assertion library (expect API)
// - Mocking (functions, modules, timers)
// - Code coverage reports
// - Snapshot testing
// - Built-in with Create React App

Installation:
-------------

// If using Create React App:
// Jest is already configured!

// Manual installation:
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}

Basic Jest Test Structure:
---------------------------

// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { sum } from './sum';

// Test suite
describe('sum function', () => {
  // Individual test
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  test('adds -1 + 1 to equal 0', () => {
    expect(sum(-1, 1)).toBe(0);
  });
});

// Run tests:
npm test

Jest Matchers:
--------------

// Equality
expect(value).toBe(5);                    // Strict equality (===)
expect(value).toEqual({ name: 'John' }); // Deep equality
expect(value).not.toBe(10);              // Negation

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4.5);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays and iterables
expect(array).toContain(item);
expect(array).toHaveLength(3);
expect(array).toContainEqual({ id: 1 });

// Objects
expect(obj).toHaveProperty('name');
expect(obj).toHaveProperty('name', 'John');
expect(obj).toMatchObject({ name: 'John' });

// Exceptions
expect(() => func()).toThrow();
expect(() => func()).toThrow(Error);
expect(() => func()).toThrow('error message');

Testing React Components:
--------------------------

// Button.jsx
export function Button({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn(); // Mock function
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});

Testing Async Code:
-------------------

// UserProfile.jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// UserProfile.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';
import { fetchUser } from './api';

// Mock the API module
jest.mock('./api');

describe('UserProfile component', () => {
  test('shows loading state initially', () => {
    fetchUser.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(<UserProfile userId="123" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  
  test('displays user data when loaded', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    fetchUser.mockResolvedValue(mockUser);
    
    render(<UserProfile userId="123" />);
    
    // Wait for user data to appear
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  test('displays error message when fetch fails', async () => {
    fetchUser.mockRejectedValue(new Error('Failed to fetch'));
    
    render(<UserProfile userId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
    });
  });
});

Mocking in Jest:
----------------

// 1. Mock Functions
const mockFn = jest.fn();
mockFn('arg1', 'arg2');

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(1);
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenLastCalledWith('arg1', 'arg2');

// Mock return values
mockFn.mockReturnValue(42);
mockFn.mockReturnValueOnce(1).mockReturnValueOnce(2);

// Mock implementations
mockFn.mockImplementation((a, b) => a + b);
mockFn.mockImplementationOnce(() => 'first call');

// 2. Mock Modules
// api.js
export const fetchData = () => fetch('/api/data');

// component.test.js
import { fetchData } from './api';

jest.mock('./api');

test('fetches data', async () => {
  fetchData.mockResolvedValue({ data: 'test' });
  
  // Test code using fetchData
  const result = await fetchData();
  expect(result).toEqual({ data: 'test' });
});

// 3. Partial Module Mocking
jest.mock('./utils', () => ({
  ...jest.requireActual('./utils'), // Keep original exports
  specificFunction: jest.fn()       // Mock only this one
}));

// 4. Mock Timers
jest.useFakeTimers();

test('calls callback after delay', () => {
  const callback = jest.fn();
  
  setTimeout(callback, 1000);
  
  // Fast-forward time
  jest.advanceTimersByTime(1000);
  
  expect(callback).toHaveBeenCalled();
});

// 5. Mock Date
const mockDate = new Date('2024-01-01');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

Setup and Teardown:
-------------------

describe('Test suite', () => {
  // Runs once before all tests
  beforeAll(() => {
    console.log('Setup before all tests');
  });
  
  // Runs before each test
  beforeEach(() => {
    console.log('Setup before each test');
  });
  
  // Runs after each test
  afterEach(() => {
    console.log('Cleanup after each test');
    jest.clearAllMocks(); // Clear mock data
  });
  
  // Runs once after all tests
  afterAll(() => {
    console.log('Cleanup after all tests');
  });
  
  test('test 1', () => {
    expect(true).toBe(true);
  });
  
  test('test 2', () => {
    expect(false).toBe(false);
  });
});

Testing Forms:
--------------

// LoginForm.jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// LoginForm.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  test('submits form with email and password', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Get form elements
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Login');
    
    // Type into inputs (userEvent is more realistic than fireEvent)
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Verify submission
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
  
  test('does not submit with empty fields', () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    const submitButton = screen.getByText('Login');
    fireEvent.click(submitButton);
    
    // Form validation should prevent submission
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});

Testing Hooks:
--------------

// useCounter.js
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter hook', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });
  
  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });
  
  test('increments count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
  
  test('decrements count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
  
  test('resets count', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.count).toBe(10);
  });
});

Testing with Context:
---------------------

// ThemeContext.jsx
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// ThemedButton.jsx
function ThemedButton() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}

// ThemedButton.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { ThemedButton } from './ThemedButton';

describe('ThemedButton', () => {
  test('displays current theme', () => {
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });
  
  test('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
    
    const button = screen.getByText('Current theme: light');
    
    fireEvent.click(button);
    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });
});

Code Coverage:
--------------

// Run tests with coverage
npm test -- --coverage

// Coverage report:
// --------------------|---------|----------|---------|---------|-------------------
// File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
// --------------------|---------|----------|---------|---------|-------------------
// All files           |   85.71 |       75 |      80 |   85.71 |
//  Button.jsx         |     100 |      100 |     100 |     100 |
//  Counter.jsx        |      80 |       50 |      75 |      80 | 15-17
// --------------------|---------|----------|---------|---------|-------------------

// Configure coverage thresholds
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

Jest Configuration:
-------------------

// jest.config.js
module.exports = {
  // Test environment
  testEnvironment: 'jsdom', // or 'node'
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module paths
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  
  // Coverage
  collectCoverageFrom: [
    'src/** /*.{js,jsx}',
    '!src/index.js',
    '!src/** /*.test.js'
  ],
  
  // Transform
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
};

// jest.setup.js
import '@testing-library/jest-dom';

Best Practices:
---------------

// 1. Test behavior, not implementation
// ❌ Bad
test('has state initialized to 0', () => {
  const wrapper = shallow(<Counter />);
  expect(wrapper.state('count')).toBe(0);
});

// ✅ Good
test('displays initial count of 0', () => {
  render(<Counter />);
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});

// 2. Use realistic user interactions
// ❌ Bad
fireEvent.change(input, { target: { value: 'test' } });

// ✅ Good
await userEvent.type(input, 'test');

// 3. Query by accessible attributes
// ❌ Bad
screen.getByTestId('submit-button');

// ✅ Good
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');

// 4. Don't test implementation details
// ❌ Bad - Testing internal state
expect(component.state.isOpen).toBe(true);

// ✅ Good - Testing visible behavior
expect(screen.getByText('Modal content')).toBeVisible();

// 5. Keep tests isolated
// ❌ Bad - Tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  updateUser(user); // Depends on previous test!
});

// ✅ Good - Independent tests
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
test('updates user', () => {
  const user = createUser(); // Create fresh user
  updateUser(user);
  expect(user.updated).toBe(true);
});

Summary:

Jest for React:
- Complete testing framework
- Built-in with Create React App
- Test runner + assertions + mocking
- Works seamlessly with React Testing Library
- Mock functions, modules, timers
- Code coverage reports
- Snapshot testing support
- Fast and parallel test execution
- Watch mode for development
*/


/**
92. What is React Testing Library (RTL)?
----------------------------------------

React Testing Library is a lightweight testing library that encourages testing
components the way users interact with them. It focuses on testing behavior
rather than implementation details.

Philosophy:
-----------

// "The more your tests resemble the way your software is used,
//  the more confidence they can give you."

// RTL encourages:
// ✅ Testing what users see and do
// ✅ Testing accessibility
// ✅ Testing behavior, not implementation
// ❌ Avoiding testing internal state
// ❌ Avoiding testing implementation details

Installation:
-------------

npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

// jest.setup.js
import '@testing-library/jest-dom';

Core API - Queries:
-------------------

import { render, screen } from '@testing-library/react';

// Priority order for queries:
// 1. Accessible to everyone (including assistive technology)
// 2. Semantic queries
// 3. Test IDs (last resort)

// 1. getByRole (BEST - accessibility focused)
screen.getByRole('button');
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 1 });

// Common roles:
// - button
// - link
// - textbox (input, textarea)
// - checkbox
// - radio
// - combobox (select)
// - heading
// - img
// - dialog
// - alert

// 2. getByLabelText (forms)
screen.getByLabelText('Email');
screen.getByLabelText(/password/i);

// 3. getByPlaceholderText (inputs)
screen.getByPlaceholderText('Enter email');

// 4. getByText (text content)
screen.getByText('Hello World');
screen.getByText(/hello/i); // Case insensitive regex

// 5. getByDisplayValue (form inputs with value)
screen.getByDisplayValue('Current value');

// 6. getByAltText (images)
screen.getByAltText('Profile picture');

// 7. getByTitle (title attribute)
screen.getByTitle('Close');

// 8. getByTestId (LAST RESORT)
screen.getByTestId('custom-element');
// Use data-testid attribute: <div data-testid="custom-element" />

Query Variants:
---------------

// getBy - Throws error if not found (single element)
const button = screen.getByRole('button');

// queryBy - Returns null if not found (single element)
const button = screen.queryByRole('button');
expect(button).toBeNull(); // For checking absence

// findBy - Returns promise, waits for element (single element)
const button = await screen.findByRole('button');

// getAllBy - Returns array, throws if none found (multiple elements)
const buttons = screen.getAllByRole('button');

// queryAllBy - Returns empty array if none found (multiple elements)
const buttons = screen.queryAllByRole('button');

// findAllBy - Returns promise for array (multiple elements)
const buttons = await screen.findAllByRole('button');

// Use cases:
// - getBy: Element should be present
// - queryBy: Check element is NOT present
// - findBy: Element appears asynchronously

Rendering Components:
---------------------

import { render, screen } from '@testing-library/react';

// Basic render
render(<Button>Click me</Button>);

// Render with props
render(<UserProfile userId="123" />);

// Render returns utilities
const { container, rerender, unmount, debug } = render(<App />);

// container: DOM node
console.log(container.innerHTML);

// rerender: Update props
rerender(<App count={1} />);
rerender(<App count={2} />);

// unmount: Remove component
unmount();

// debug: Print DOM tree
debug(); // Prints entire tree
debug(screen.getByRole('button')); // Prints specific element

User Interactions:
------------------

import userEvent from '@testing-library/user-event';

// userEvent is more realistic than fireEvent
// It simulates real user interactions

describe('User interactions', () => {
  test('clicking button', async () => {
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalled();
  });
  
  test('typing in input', async () => {
    const user = userEvent.setup();
    render(<input />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello');
    
    expect(input).toHaveValue('Hello');
  });
  
  test('clearing input', async () => {
    const user = userEvent.setup();
    render(<input defaultValue="initial" />);
    
    const input = screen.getByRole('textbox');
    await user.clear(input);
    
    expect(input).toHaveValue('');
  });
  
  test('selecting option', async () => {
    const user = userEvent.setup();
    render(
      <select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    );
    
    await user.selectOptions(screen.getByRole('combobox'), '2');
    
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeSelected();
  });
  
  test('checking checkbox', async () => {
    const user = userEvent.setup();
    render(<input type="checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });
  
  test('hovering element', async () => {
    const user = userEvent.setup();
    render(<button>Hover me</button>);
    
    await user.hover(screen.getByRole('button'));
    // Check for hover effects
  });
  
  test('keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<input />);
    
    const input = screen.getByRole('textbox');
    await user.tab(); // Tab to input
    await user.keyboard('Hello'); // Type
    
    expect(input).toHaveValue('Hello');
  });
});

Async Testing:
--------------

import { render, screen, waitFor } from '@testing-library/react';

// 1. Using findBy (recommended for simple cases)
test('displays user data', async () => {
  render(<UserProfile userId="123" />);
  
  // findBy waits for element to appear
  const name = await screen.findByText('John Doe');
  expect(name).toBeInTheDocument();
});

// 2. Using waitFor (complex assertions)
test('loads and displays data', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
  
  // Can also check multiple things
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

// 3. Using waitForElementToBeRemoved
test('removes loading spinner', async () => {
  render(<Component />);
  
  const spinner = screen.getByText('Loading...');
  
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

// Configure timeout
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
}, { timeout: 3000 }); // Wait up to 3 seconds

Custom Matchers:
----------------

// @testing-library/jest-dom provides custom matchers

// Visibility
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// Presence
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Content
expect(element).toHaveTextContent('Hello');
expect(element).toHaveTextContent(/hello/i);

// Attributes
expect(element).toHaveAttribute('href', '/about');
expect(element).toHaveClass('active');

// Forms
expect(input).toHaveValue('text');
expect(input).toHaveDisplayValue('text');
expect(checkbox).toBeChecked();
expect(checkbox).not.toBeChecked();
expect(input).toBeDisabled();
expect(input).toBeEnabled();
expect(input).toBeRequired();
expect(input).toHaveFormValues({ email: 'test@example.com' });

// Focus
expect(element).toHaveFocus();

// Style
expect(element).toHaveStyle('display: none');
expect(element).toHaveStyle({ color: 'red', fontSize: '16px' });

Testing Examples:
-----------------

// Example 1: Counter component
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

test('increments count', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  
  expect(screen.getByText('Count: 0')).toBeInTheDocument();
  
  await user.click(screen.getByRole('button', { name: /increment/i }));
  
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});

// Example 2: Search component
function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} role="search">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

test('calls onSearch with query', async () => {
  const user = userEvent.setup();
  const handleSearch = jest.fn();
  render(<SearchBox onSearch={handleSearch} />);
  
  const input = screen.getByPlaceholderText('Search...');
  const button = screen.getByRole('button', { name: /search/i });
  
  await user.type(input, 'react testing');
  await user.click(button);
  
  expect(handleSearch).toHaveBeenCalledWith('react testing');
});

// Example 3: Todo list
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

test('adds and toggles todos', async () => {
  const user = userEvent.setup();
  render(<TodoList />);
  
  const input = screen.getByPlaceholderText('Add todo');
  const addButton = screen.getByRole('button', { name: /add/i });
  
  // Add first todo
  await user.type(input, 'Buy milk');
  await user.click(addButton);
  
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(input).toHaveValue('');
  
  // Add second todo
  await user.type(input, 'Walk dog');
  await user.click(addButton);
  
  expect(screen.getByText('Walk dog')).toBeInTheDocument();
  
  // Toggle first todo
  const checkboxes = screen.getAllByRole('checkbox');
  await user.click(checkboxes[0]);
  
  const firstTodo = screen.getByText('Buy milk');
  expect(firstTodo).toHaveStyle('text-decoration: line-through');
});

Testing with Providers:
------------------------

// Wrapper for tests needing context
function Wrapper({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {children}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Use wrapper in tests
test('component with providers', () => {
  render(<MyComponent />, { wrapper: Wrapper });
  
  // Test component
});

// Create custom render
function customRender(ui, options) {
  return render(ui, { wrapper: Wrapper, ...options });
}

// Use custom render
test('with custom render', () => {
  customRender(<MyComponent />);
});

RTL vs Enzyme:
--------------

// Enzyme (old way - implementation focused)
const wrapper = shallow(<Counter />);
expect(wrapper.state('count')).toBe(0); // Testing state
wrapper.find('button').simulate('click'); // Simulating events
expect(wrapper.state('count')).toBe(1);

// RTL (new way - user focused)
render(<Counter />);
expect(screen.getByText('Count: 0')).toBeInTheDocument(); // Testing what user sees
await userEvent.click(screen.getByRole('button')); // Real user interaction
expect(screen.getByText('Count: 1')).toBeInTheDocument();

// RTL advantages:
// ✅ Tests behavior, not implementation
// ✅ More maintainable (refactor-proof)
// ✅ Better accessibility testing
// ✅ Simulates real user interactions
// ✅ Recommended by React team

Debugging Tests:
----------------

// 1. screen.debug()
test('debugging', () => {
  render(<Component />);
  
  screen.debug(); // Prints entire DOM
  screen.debug(screen.getByRole('button')); // Prints specific element
});

// 2. logRoles
import { logRoles } from '@testing-library/react';

test('log roles', () => {
  const { container } = render(<Component />);
  logRoles(container); // Shows all accessible roles
});

// 3. Testing Playground
// Install: npm install --save-dev @testing-library/react-devtools
screen.logTestingPlaygroundURL();
// Opens browser with interactive query builder

Best Practices:
---------------

// 1. Query by role (accessibility)
// ✅ Good
screen.getByRole('button', { name: /submit/i });

// ❌ Bad
screen.getByTestId('submit-button');

// 2. Use userEvent over fireEvent
// ✅ Good
await userEvent.click(button);

// ❌ Bad
fireEvent.click(button);

// 3. Test user behavior, not implementation
// ✅ Good
expect(screen.getByText('Welcome, John')).toBeInTheDocument();

// ❌ Bad
expect(component.props.user.name).toBe('John');

// 4. Use findBy for async
// ✅ Good
const element = await screen.findByText('Loaded');

// ❌ Bad
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// 5. Query for absence with queryBy
// ✅ Good
expect(screen.queryByText('Error')).not.toBeInTheDocument();

// ❌ Bad
expect(() => screen.getByText('Error')).toThrow();

Summary:

React Testing Library:
- Focus on user behavior
- Query by accessibility (roles, labels)
- Realistic user interactions (userEvent)
- Async testing support (findBy, waitFor)
- Works with Jest
- Encourages best practices
- Better than Enzyme
- Recommended by React team
- Refactor-proof tests
- Built-in accessibility testing
*/


/**
93. What is the difference between unit, integration, and E2E testing?
----------------------------------------------------------------------

Testing can be categorized by scope: unit tests check individual pieces,
integration tests verify how pieces work together, and E2E tests validate
the entire application from a user's perspective.

Testing Pyramid:
----------------

//                  /\
//                 /  \  E2E Tests (Few)
//                /____\
//               /      \
//              / Integ. \ Integration Tests (Some)
//             /__________\
//            /            \
//           /    Unit      \ Unit Tests (Many)
//          /________________\

// Bottom: Many fast, cheap unit tests
// Middle: Some integration tests
// Top: Few slow, expensive E2E tests

1. Unit Testing:
----------------

// Tests individual functions/components in isolation
// Fast, cheap, easy to debug

// Example 1: Pure function
// utils.js
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// utils.test.js
import { calculateTotal } from './utils';

describe('calculateTotal', () => {
  test('calculates total for single item', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(20);
  });
  
  test('calculates total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    expect(calculateTotal(items)).toBe(35);
  });
  
  test('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});

// Example 2: Component in isolation
// Button.jsx
export function Button({ onClick, children, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

// Button.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button component', () => {
  test('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

// Unit test characteristics:
// ✅ Fast (milliseconds)
// ✅ Isolated (mocked dependencies)
// ✅ Easy to debug
// ✅ High code coverage
// ❌ Don't catch integration issues
// ❌ Can give false confidence

2. Integration Testing:
-----------------------

// Tests how multiple units work together
// More realistic, catches integration bugs

// Example 1: Component with hooks and context
// TodoApp.jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, done: false }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TodoApp.test.js - Integration test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from './TodoApp';

describe('TodoApp integration', () => {
  test('full todo workflow', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    // Add first todo
    const input = screen.getByPlaceholderText('Add todo');
    await user.type(input, 'Buy milk');
    await user.click(screen.getByRole('button', { name: /add/i }));
    
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    
    // Add second todo
    await user.type(input, 'Walk dog');
    await user.click(screen.getByRole('button', { name: /add/i }));
    
    expect(screen.getByText('Walk dog')).toBeInTheDocument();
    
    // Toggle first todo
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    expect(checkboxes[0]).toBeChecked();
    
    // Delete second todo
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[1]);
    
    expect(screen.queryByText('Walk dog')).not.toBeInTheDocument();
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });
});

// Example 2: Component with API calls (mocked)
// UserProfile.jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId)
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.bio}</p>
    </div>
  );
}

// UserProfile.test.js - Integration test
import { render, screen, waitFor } from '@testing-library/react';
import { UserProfile } from './UserProfile';
import { fetchUser } from './api';

jest.mock('./api');

describe('UserProfile integration', () => {
  test('fetches and displays user data', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software developer'
    };
    
    fetchUser.mockResolvedValue(mockUser);
    
    render(<UserProfile userId="123" />);
    
    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
    
    // All user data displayed
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Software developer')).toBeInTheDocument();
  });
  
  test('handles API errors', async () => {
    fetchUser.mockRejectedValue(new Error('API Error'));
    
    render(<UserProfile userId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
    });
  });
});

// Integration test characteristics:
// ✅ Tests real interactions
// ✅ Catches integration bugs
// ✅ More confidence than unit tests
// ❌ Slower than unit tests
// ❌ Harder to debug
// ❌ May need mocking

3. End-to-End (E2E) Testing:
-----------------------------

// Tests entire application flow from user perspective
// Most realistic, but slowest and most expensive

// Example with Cypress
// cypress/e2e/todo.cy.js
describe('Todo App E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  
  it('completes full todo workflow', () => {
    // Add todo
    cy.get('input[placeholder="Add todo"]').type('Buy milk');
    cy.contains('button', 'Add').click();
    
    // Verify todo appears
    cy.contains('Buy milk').should('be.visible');
    
    // Add another todo
    cy.get('input[placeholder="Add todo"]').type('Walk dog');
    cy.contains('button', 'Add').click();
    
    // Check first todo
    cy.get('input[type="checkbox"]').first().check();
    
    // Verify it's checked
    cy.get('input[type="checkbox"]').first().should('be.checked');
    
    // Delete second todo
    cy.contains('Walk dog').parent().find('button').contains('Delete').click();
    
    // Verify it's gone
    cy.contains('Walk dog').should('not.exist');
    cy.contains('Buy milk').should('exist');
  });
  
  it('persists todos after page refresh', () => {
    // Add todo
    cy.get('input').type('Buy milk');
    cy.contains('Add').click();
    
    // Reload page
    cy.reload();
    
    // Todo still there
    cy.contains('Buy milk').should('exist');
  });
  
  it('handles empty input', () => {
    // Try to add empty todo
    cy.contains('button', 'Add').click();
    
    // No empty todo added
    cy.get('ul li').should('have.length', 0);
  });
});

// Example: E2E login flow
describe('Authentication E2E', () => {
  it('logs in user successfully', () => {
    cy.visit('/login');
    
    // Fill login form
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');
    
    // Should show user name
    cy.contains('Welcome, John').should('be.visible');
    
    // Should have auth token
    cy.getCookie('auth-token').should('exist');
  });
  
  it('shows error for invalid credentials', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    // Should show error
    cy.contains('Invalid credentials').should('be.visible');
    
    // Should stay on login page
    cy.url().should('include', '/login');
  });
  
  it('logs out user', () => {
    // Login first
    cy.login('user@example.com', 'password123'); // Custom command
    
    // Click logout
    cy.contains('Logout').click();
    
    // Should redirect to login
    cy.url().should('include', '/login');
    
    // Auth token removed
    cy.getCookie('auth-token').should('not.exist');
  });
});

// E2E test characteristics:
// ✅ Tests real user flows
// ✅ Tests entire stack (frontend + backend + DB)
// ✅ Highest confidence
// ✅ Catches real-world bugs
// ❌ Very slow (seconds/minutes)
// ❌ Expensive to maintain
// ❌ Flaky (timing issues)
// ❌ Hard to debug

Comparison Table:
-----------------

// Aspect          | Unit           | Integration    | E2E
// ----------------|----------------|----------------|------------------
// Scope           | Single unit    | Multiple units | Entire app
// Speed           | Fast (ms)      | Medium (100ms) | Slow (seconds)
// Dependencies    | Mocked         | Some mocked    | Real
// Environment     | Isolated       | Partial        | Full stack
// Confidence      | Low            | Medium         | High
// Cost            | Cheap          | Medium         | Expensive
// Debugging       | Easy           | Medium         | Hard
// Maintenance     | Easy           | Medium         | Hard
// Flakiness       | Rare           | Occasional     | Common
// Coverage        | High           | Medium         | Low
// When to run     | Every save     | Every commit   | Before deploy

What to Test Where:
-------------------

// Unit Tests:
// ✅ Pure functions
// ✅ Utilities
// ✅ Component rendering
// ✅ Component props
// ✅ Event handlers
// ✅ Hooks logic
// ✅ State management

// Example:
test('calculateDiscount', () => {
  expect(calculateDiscount(100, 0.2)).toBe(80);
});

// Integration Tests:
// ✅ Component + hooks
// ✅ Component + context
// ✅ Component + API (mocked)
// ✅ Form workflows
// ✅ User interactions
// ✅ Multiple components together

// Example:
test('shopping cart', async () => {
  render(<ShoppingCart />);
  await addItem('Product 1');
  await updateQuantity(2);
  expect(getTotal()).toBe(40);
});

// E2E Tests:
// ✅ Critical user journeys
// ✅ Authentication flows
// ✅ Purchase flows
// ✅ Multi-page workflows
// ✅ Cross-browser testing
// ✅ Production-like scenarios

// Example:
test('complete purchase', () => {
  cy.visit('/products');
  cy.addToCart('Product 1');
  cy.checkout();
  cy.fillPaymentInfo();
  cy.confirmPurchase();
  cy.verifyOrderConfirmation();
});

Testing Strategy:
-----------------

// 1. Start with unit tests (70%)
// - Test all functions and components
// - Fast feedback during development
// - Easy to maintain

// 2. Add integration tests (20%)
// - Test critical workflows
// - Verify components work together
// - Balance speed and confidence

// 3. Add E2E tests (10%)
// - Test critical user paths
// - Happy path + edge cases
// - Before deployments only

// Example: E-commerce app

// Unit Tests (70%):
// - Product card rendering
// - Cart calculations
// - Form validations
// - Utility functions
// - Hooks

// Integration Tests (20%):
// - Add to cart workflow
// - Search and filter
// - Product listing + pagination
// - Checkout form

// E2E Tests (10%):
// - Complete purchase flow
// - User registration + login
// - Password reset
// - Product search to purchase

Real-World Example:
-------------------

// Feature: User Registration

// Unit Test - Form validation
test('validateEmail', () => {
  expect(validateEmail('test@example.com')).toBe(true);
  expect(validateEmail('invalid')).toBe(false);
});

// Integration Test - Form submission
test('registration form', async () => {
  const handleSubmit = jest.fn();
  render(<RegistrationForm onSubmit={handleSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.type(screen.getByLabelText('Password'), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});

// E2E Test - Full registration flow
test('user registration flow', () => {
  cy.visit('/register');
  cy.get('input[name="email"]').type('newuser@example.com');
  cy.get('input[name="password"]').type('SecurePass123');
  cy.get('input[name="confirmPassword"]').type('SecurePass123');
  cy.get('button[type="submit"]').click();
  
  // Verify account created
  cy.url().should('include', '/welcome');
  cy.contains('Welcome aboard!').should('be.visible');
  
  // Verify can log in
  cy.visit('/logout');
  cy.visit('/login');
  cy.get('input[name="email"]').type('newuser@example.com');
  cy.get('input[name="password"]').type('SecurePass123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

Summary:

Unit Tests:
- Test individual functions/components
- Fast, isolated, easy to debug
- Many tests (70% of suite)
- Mocked dependencies
- Run on every save

Integration Tests:
- Test multiple components together
- Medium speed, some mocking
- Moderate tests (20% of suite)
- Balance speed and confidence
- Run on every commit

E2E Tests:
- Test entire application flow
- Slow, expensive, high confidence
- Few tests (10% of suite)
- Real environment
- Run before deployment
*/


/**
94. What tools are used for E2E testing (Cypress, Playwright)?
--------------------------------------------------------------

Cypress and Playwright are the most popular modern E2E testing frameworks.
Both allow you to test your application in real browsers with real user interactions.

Cypress:
--------

// Installation
npm install --save-dev cypress

// Open Cypress
npx cypress open

// Project structure:
cypress/
  e2e/
    login.cy.js
    dashboard.cy.js
  fixtures/
    users.json
  support/
    commands.js
    e2e.js

// Basic Cypress test
// cypress/e2e/login.cy.js
describe('Login Page', () => {
  beforeEach(() => {
    // Visit page before each test
    cy.visit('http://localhost:3000/login');
  });
  
  it('should log in successfully', () => {
    // Type into inputs
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    
    // Click button
    cy.get('button[type="submit"]').click();
    
    // Assertions
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome back!').should('be.visible');
  });
  
  it('shows error for invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid credentials').should('be.visible');
    cy.url().should('include', '/login');
  });
});

// Cypress Commands:
cy.visit('/path');                  // Navigate to URL
cy.get('selector');                 // Get element
cy.contains('text');                // Find by text
cy.click();                         // Click element
cy.type('text');                    // Type into input
cy.check();                         // Check checkbox/radio
cy.select('option');                // Select from dropdown
cy.clear();                         // Clear input
cy.submit();                        // Submit form
cy.reload();                        // Reload page
cy.go('back');                      // Go back
cy.wait(1000);                      // Wait milliseconds
cy.wait('@alias');                  // Wait for request

// Assertions:
cy.should('be.visible');
cy.should('have.text', 'text');
cy.should('have.value', 'value');
cy.should('have.class', 'active');
cy.should('be.disabled');
cy.should('be.checked');
cy.should('have.length', 3);
cy.should('contain', 'text');
cy.should('exist');
cy.should('not.exist');

Cypress Advanced Features:
---------------------------

// 1. Custom commands
// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

// Use custom command
it('tests dashboard', () => {
  cy.login('user@example.com', 'password123');
  // Now on dashboard, continue testing
});

// 2. Fixtures (test data)
// cypress/fixtures/users.json
{
  "validUser": {
    "email": "user@example.com",
    "password": "password123"
  },
  "invalidUser": {
    "email": "invalid@example.com",
    "password": "wrongpass"
  }
}

// Use fixture
it('logs in with fixture data', () => {
  cy.fixture('users').then(users => {
    cy.get('input[name="email"]').type(users.validUser.email);
    cy.get('input[name="password"]').type(users.validUser.password);
    cy.get('button[type="submit"]').click();
  });
});

// 3. Intercepting API requests
it('intercepts API call', () => {
  // Stub API response
  cy.intercept('GET', '/api/users', {
    statusCode: 200,
    body: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
  }).as('getUsers');
  
  cy.visit('/users');
  
  // Wait for request
  cy.wait('@getUsers');
  
  // Verify UI shows data
  cy.contains('John').should('be.visible');
  cy.contains('Jane').should('be.visible');
});

// 4. Network stubbing
it('tests offline behavior', () => {
  cy.intercept('GET', '/api/data', { forceNetworkError: true });
  
  cy.visit('/dashboard');
  cy.contains('Network error').should('be.visible');
});

// 5. File upload
it('uploads file', () => {
  cy.get('input[type="file"]').selectFile('cypress/fixtures/image.png');
  cy.get('button').contains('Upload').click();
  cy.contains('Upload successful').should('be.visible');
});

// 6. Screenshots and videos
it('takes screenshot', () => {
  cy.visit('/page');
  cy.screenshot('page-screenshot');
});

// Videos recorded automatically on failure

Playwright:
-----------

// Installation
npm install --save-dev @playwright/test

// Project structure:
tests/
  login.spec.js
  dashboard.spec.js
playwright.config.js

// Basic Playwright test
// tests/login.spec.js
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });
  
  test('should log in successfully', async ({ page }) => {
    // Fill inputs
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    
    // Click button
    await page.click('button[type="submit"]');
    
    // Assertions
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('text=Welcome back!')).toBeVisible();
  });
  
  test('shows error for invalid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });
});

// Playwright API:
page.goto('url');                   // Navigate
page.click('selector');             // Click
page.fill('selector', 'text');      // Fill input
page.check('selector');             // Check checkbox
page.selectOption('selector', 'value'); // Select option
page.press('selector', 'Enter');    // Press key
page.screenshot();                  // Take screenshot
page.reload();                      // Reload page
page.goBack();                      // Go back
page.waitForSelector('selector');   // Wait for element
page.waitForLoadState('networkidle'); // Wait for network

// Locators:
page.locator('selector');
page.locator('text=Submit');
page.locator('button:has-text("Submit")');
page.getByRole('button', { name: 'Submit' });
page.getByLabel('Email');
page.getByPlaceholder('Enter email');
page.getByTestId('submit-button');

Playwright Advanced Features:
------------------------------

// 1. Multiple browsers
import { chromium, firefox, webkit } from '@playwright/test';

test('cross-browser test', async () => {
  // Chromium
  const chromiumBrowser = await chromium.launch();
  const chromiumPage = await chromiumBrowser.newPage();
  await chromiumPage.goto('http://localhost:3000');
  await chromiumBrowser.close();
  
  // Firefox
  const firefoxBrowser = await firefox.launch();
  const firefoxPage = await firefoxBrowser.newPage();
  await firefoxPage.goto('http://localhost:3000');
  await firefoxBrowser.close();
  
  // WebKit (Safari)
  const webkitBrowser = await webkit.launch();
  const webkitPage = await webkitBrowser.newPage();
  await webkitPage.goto('http://localhost:3000');
  await webkitBrowser.close();
});

// 2. Mobile emulation
test('mobile view', async ({ browser }) => {
  const context = await browser.newContext({
    ...devices['iPhone 12']
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  // Test mobile view
});

// 3. API mocking
test('mock API', async ({ page }) => {
  await page.route('** /api/users', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' }
      ])
    });
  });
  
  await page.goto('/users');
  await expect(page.locator('text=John')).toBeVisible();
});

// 4. Authentication state
// Save auth state
test('save auth', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Save cookies/storage
  await page.context().storageState({ path: 'auth.json' });
});

// Reuse auth state
test.use({ storageState: 'auth.json' });

test('already logged in', async ({ page }) => {
  await page.goto('/dashboard');
  // Already authenticated!
});

// 5. Parallel execution
// playwright.config.js
export default {
  workers: 4, // Run 4 tests in parallel
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  }
};

// 6. Visual regression testing
test('visual comparison', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

// First run creates baseline
// Subsequent runs compare with baseline

Cypress vs Playwright:
-----------------------

// Feature               | Cypress           | Playwright
// ----------------------|-------------------|------------------
// Browser Support       | Chrome, Firefox   | Chrome, Firefox, Safari
// Speed                 | Medium            | Fast
// API Style             | Chained           | Async/await
// Auto-waiting          | Yes               | Yes
// Network Control       | Yes               | Yes
// Multiple tabs         | Limited           | Full support
// Mobile Testing        | Limited           | Native
// Parallel Tests        | Paid feature      | Built-in
// Visual Testing        | Plugin            | Built-in
// Learning Curve        | Easy              | Medium
// Community             | Large             | Growing
// Debugging             | Excellent         | Good
// CI/CD                 | Easy              | Easy

// Cypress Syntax (chained):
cy.get('input').type('text').should('have.value', 'text');

// Playwright Syntax (async/await):
await page.fill('input', 'text');
await expect(page.locator('input')).toHaveValue('text');

Real-World E2E Test Examples:
------------------------------

// Example 1: E-commerce purchase flow

// Cypress
describe('Purchase Flow', () => {
  it('completes purchase', () => {
    // Login
    cy.login('user@example.com', 'password');
    
    // Browse products
    cy.visit('/products');
    cy.contains('Laptop').click();
    
    // Add to cart
    cy.get('button').contains('Add to Cart').click();
    cy.contains('Item added').should('be.visible');
    
    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
    
    // Proceed to checkout
    cy.contains('Checkout').click();
    
    // Fill shipping info
    cy.get('input[name="address"]').type('123 Main St');
    cy.get('input[name="city"]').type('New York');
    cy.get('input[name="zip"]').type('10001');
    
    // Fill payment info
    cy.get('input[name="cardNumber"]').type('4111111111111111');
    cy.get('input[name="expiry"]').type('12/25');
    cy.get('input[name="cvv"]').type('123');
    
    // Complete purchase
    cy.get('button[type="submit"]').contains('Place Order').click();
    
    // Verify success
    cy.contains('Order confirmed').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });
});

// Playwright
test('Purchase Flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  // Browse products
  await page.goto('/products');
  await page.click('text=Laptop');
  
  // Add to cart
  await page.click('button:has-text("Add to Cart")');
  await expect(page.locator('text=Item added')).toBeVisible();
  
  // Go to cart
  await page.click('[data-testid="cart-icon"]');
  await expect(page).toHaveURL(/.*cart/);
  
  // Proceed to checkout
  await page.click('text=Checkout');
  
  // Fill shipping info
  await page.fill('input[name="address"]', '123 Main St');
  await page.fill('input[name="city"]', 'New York');
  await page.fill('input[name="zip"]', '10001');
  
  // Fill payment info
  await page.fill('input[name="cardNumber"]', '4111111111111111');
  await page.fill('input[name="expiry"]', '12/25');
  await page.fill('input[name="cvv"]', '123');
  
  // Complete purchase
  await page.click('button[type="submit"]:has-text("Place Order")');
  
  // Verify success
  await expect(page.locator('text=Order confirmed')).toBeVisible();
  await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
});

Best Practices:
---------------

// 1. Use data-testid for stable selectors
// ✅ Good
<button data-testid="submit-btn">Submit</button>
cy.get('[data-testid="submit-btn"]').click();

// ❌ Bad (brittle)
cy.get('.btn-primary.large').click();

// 2. Don't use cy.wait with times
// ❌ Bad
cy.wait(5000);

// ✅ Good
cy.get('.loading').should('not.exist');

// 3. Use beforeEach for common setup
beforeEach(() => {
  cy.login('user@example.com', 'password');
});

// 4. Group related tests
describe('Shopping Cart', () => {
  describe('Adding items', () => {
    it('adds single item', () => {});
    it('adds multiple items', () => {});
  });
  
  describe('Removing items', () => {
    it('removes single item', () => {});
    it('empties cart', () => {});
  });
});

// 5. Keep tests independent
// Each test should be able to run alone

Summary:

Cypress:
- Easy to learn and use
- Great debugging experience
- Chained API style
- Chrome/Firefox support
- Strong community
- Best for: Getting started quickly

Playwright:
- Multiple browsers (including Safari)
- Fast execution
- Async/await style
- Built-in parallelization
- Mobile testing
- Visual regression testing
- Best for: Cross-browser testing, advanced features
*/


/**
95. What is snapshot testing?
-----------------------------

Snapshot testing captures the rendered output of a component and saves it as a
reference file. Future test runs compare against this snapshot to detect
unexpected changes.

Basic Snapshot Test:
--------------------

// Button.jsx
export function Button({ children, variant = 'primary' }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

// Button.test.js
import { render } from '@testing-library/react';
import { Button } from './Button';

test('matches snapshot', () => {
  const { container } = render(<Button>Click me</Button>);
  
  // Creates snapshot file on first run
  expect(container).toMatchSnapshot();
});

// First run creates:
// __snapshots__/Button.test.js.snap
exports[`matches snapshot 1`] = `
<div>
  <button
    class="btn btn-primary"
  >
    Click me
  </button>
</div>
`;

// Subsequent runs compare against this

How Snapshot Testing Works:
----------------------------

// 1. First run: Create snapshot
test('component snapshot', () => {
  const { container } = render(<MyComponent />);
  expect(container).toMatchSnapshot();
});

// Creates snapshot file with component's HTML

// 2. Subsequent runs: Compare
// - If output matches snapshot ✅ Test passes
// - If output differs ❌ Test fails

// 3. When test fails:
// - Review diff
// - If change is intentional: Update snapshot
// - If change is bug: Fix code

Updating Snapshots:
-------------------

// When you intentionally change component:
// Test fails showing diff

// Update snapshot with:
npm test -- -u
// or
npm test -- --updateSnapshot

// Updates all failing snapshots

// Update specific test:
npm test Button.test.js -u

Snapshot Testing Use Cases:
----------------------------

// 1. Component Rendering
test('renders user card', () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg'
  };
  
  const { container } = render(<UserCard user={user} />);
  expect(container).toMatchSnapshot();
});

// 2. Different Props/States
describe('Button snapshots', () => {
  test('primary variant', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container).toMatchSnapshot();
  });
  
  test('secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container).toMatchSnapshot();
  });
  
  test('disabled state', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container).toMatchSnapshot();
  });
});

// 3. Complex Components
test('dashboard layout', () => {
  const { container } = render(
    <Dashboard
      user={mockUser}
      notifications={mockNotifications}
      stats={mockStats}
    />
  );
  expect(container).toMatchSnapshot();
});

// 4. API Responses
test('API response structure', async () => {
  const response = await fetchUserData('123');
  expect(response).toMatchSnapshot({
    // Ignore dynamic fields
    id: expect.any(String),
    createdAt: expect.any(String),
  });
});

Inline Snapshots:
-----------------

// Instead of separate file, snapshot inline

test('inline snapshot', () => {
  const { container } = render(<Button>Click me</Button>);
  
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button class="btn btn-primary">
        Click me
      </button>
    </div>
  `);
});

// Snapshot written directly in test file
// Easier to review in code review

Property Matchers:
------------------

// Ignore dynamic values

test('user with timestamp', () => {
  const user = {
    id: generateId(),
    name: 'John',
    createdAt: new Date().toISOString()
  };
  
  expect(user).toMatchSnapshot({
    id: expect.any(String),          // Match any string
    createdAt: expect.any(String),   // Match any string
  });
});

// Snapshot only captures static parts:
// {
//   "id": Any<String>,
//   "name": "John",
//   "createdAt": Any<String>
// }

Custom Serializers:
-------------------

// Customize how objects are serialized

// Custom serializer for Dates
expect.addSnapshotSerializer({
  test: val => val instanceof Date,
  print: val => `Date("${val.toISOString()}")`,
});

// Custom serializer for React Elements
import { createSerializer } from '@emotion/jest';
expect.addSnapshotSerializer(createSerializer());

Snapshot Testing Best Practices:
---------------------------------

// 1. Keep snapshots small
// ❌ Bad - too large
test('entire app snapshot', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot(); // Thousands of lines!
});

// ✅ Good - focused
test('header component', () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

// 2. Use descriptive test names
// ❌ Bad
test('snapshot 1', () => {});
test('snapshot 2', () => {});

// ✅ Good
test('renders primary button', () => {});
test('renders disabled button', () => {});

// 3. Review snapshots in code review
// Don't blindly update snapshots
// Understand why they changed

// 4. Commit snapshots to version control
// Snapshots are part of tests

// 5. Use property matchers for dynamic data
test('with dynamic data', () => {
  expect(data).toMatchSnapshot({
    id: expect.any(Number),
    timestamp: expect.any(String),
  });
});

// 6. Don't snapshot too much
// Snapshot testing is not a replacement for proper assertions

// ❌ Bad - snapshots everything
test('form behavior', () => {
  const { container } = render(<Form />);
  expect(container).toMatchSnapshot();
  
  fireEvent.click(submitButton);
  expect(container).toMatchSnapshot();
  
  // Hard to understand what changed
});

// ✅ Good - specific assertions
test('form behavior', () => {
  render(<Form />);
  
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Form submitted')).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalledWith(expectedData);
});

Snapshot Testing Gotchas:
--------------------------

// 1. Date/Time issues
// ❌ Bad - will fail every time
test('shows timestamp', () => {
  const { container } = render(<Post timestamp={new Date()} />);
  expect(container).toMatchSnapshot();
});

// ✅ Good - mock date or use matcher
test('shows timestamp', () => {
  const fixedDate = new Date('2024-01-01');
  const { container } = render(<Post timestamp={fixedDate} />);
  expect(container).toMatchSnapshot();
});

// 2. Random values
// ❌ Bad - generates different IDs
test('list items', () => {
  const items = generateItems(); // Uses Math.random()
  const { container } = render(<List items={items} />);
  expect(container).toMatchSnapshot();
});

// ✅ Good - deterministic data
test('list items', () => {
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' }
  ];
  const { container } = render(<List items={items} />);
  expect(container).toMatchSnapshot();
});

// 3. Fragile snapshots
// Snapshots break on minor style changes
// Use only for stable components

Real-World Example:
-------------------

// UserProfile.jsx
function UserProfile({ user }) {
  return (
    <div className="profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div className="stats">
        <div>
          <strong>{user.followers}</strong>
          <span>Followers</span>
        </div>
        <div>
          <strong>{user.following}</strong>
          <span>Following</span>
        </div>
      </div>
      {user.verified && <Badge text="Verified" />}
    </div>
  );
}

// UserProfile.test.js
describe('UserProfile snapshots', () => {
  const baseUser = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.jpg',
    followers: 100,
    following: 50,
    verified: false
  };
  
  test('renders basic profile', () => {
    const { container } = render(<UserProfile user={baseUser} />);
    expect(container).toMatchSnapshot();
  });
  
  test('renders verified profile', () => {
    const user = { ...baseUser, verified: true };
    const { container } = render(<UserProfile user={user} />);
    expect(container).toMatchSnapshot();
  });
  
  test('renders profile with many followers', () => {
    const user = { ...baseUser, followers: 10000 };
    const { container } = render(<UserProfile user={user} />);
    expect(container).toMatchSnapshot();
  });
});

// Generated snapshots:
// __snapshots__/UserProfile.test.js.snap

exports[`UserProfile snapshots renders basic profile 1`] = `
<div>
  <div class="profile">
    <img alt="John Doe" src="avatar.jpg" />
    <h2>John Doe</h2>
    <p>john@example.com</p>
    <div class="stats">
      <div>
        <strong>100</strong>
        <span>Followers</span>
      </div>
      <div>
        <strong>50</strong>
        <span>Following</span>
      </div>
    </div>
  </div>
</div>
`;

Snapshot Testing Alternatives:
-------------------------------

// Visual Regression Testing (better for UI)
// - Percy.io
// - Chromatic
// - Applitools

// Takes screenshots instead of HTML snapshots
// Detects visual changes pixel by pixel
// Better for catching CSS/styling issues

// Snapshot testing is better for:
// - Data structures
// - API responses
// - Simple component structure

// Visual regression is better for:
// - Complex layouts
// - Responsive design
// - Cross-browser rendering
// - CSS changes

When to Use Snapshot Testing:
------------------------------

// ✅ Use snapshot testing for:
// - Component structure verification
// - Preventing accidental UI changes
// - API response structure
// - Error messages
// - Simple components
// - Generated code output

// ❌ Don't use snapshot testing for:
// - Complex user interactions
// - Business logic
// - Async behavior
// - Frequently changing components
// - Instead of proper assertions

Summary:

Snapshot Testing:
- Captures component output
- Saves as reference file
- Compares future runs
- Detects unexpected changes
- Update with -u flag
- Keep snapshots small and focused
- Review changes carefully
- Commit snapshots to git
- Use property matchers for dynamic data
- Complement, don't replace, proper tests
- Built into Jest
- Great for regression testing
*/


