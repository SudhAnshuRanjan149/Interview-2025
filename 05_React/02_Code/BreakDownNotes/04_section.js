/*

========================================================
SECTION 4 — REACT COMPONENT ARCHITECTURE
========================================================
34. What is component composition?  
35. What is the difference between controlled and uncontrolled components?  
36. What is lifting state up?  
37. What are higher-order components (HOC)?  
38. What are render props?  
39. What is the container–presentational component pattern?  
40. What is the compound component pattern?  
41. What is the provider pattern?  
42. What is the difference between props drilling and context usage?  

*/



/**
34. What is component composition?
----------------------------------

Component composition is the pattern of building complex UIs by combining smaller, 
focused components together, rather than using inheritance or building monolithic 
components.

Core principle:
Instead of one big component doing everything, build small reusable pieces and 
compose them together.

Basic composition example:
--------------------------

// ❌ Bad: Monolithic component
function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="header">
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      <div className="stats">
        <div className="stat">
          <span className="label">Posts</span>
          <span className="value">{user.posts}</span>
        </div>
        <div className="stat">
          <span className="label">Followers</span>
          <span className="value">{user.followers}</span>
        </div>
      </div>
      <div className="recent-activity">
        {user.activities.map(activity => (
          <div key={activity.id} className="activity">
            <span>{activity.type}</span>
            <span>{activity.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Good: Composed from smaller components
function Avatar({ src, alt }) {
  return <img className="avatar" src={src} alt={alt} />;
}

function UserInfo({ name, email }) {
  return (
    <div className="user-info">
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );
}

function Stats({ posts, followers }) {
  return (
    <div className="stats">
      <Stat label="Posts" value={posts} />
      <Stat label="Followers" value={followers} />
    </div>
  );
}

function Activity({ type, date }) {
  return (
    <div className="activity">
      <span>{type}</span>
      <span>{date}</span>
    </div>
  );
}

function ActivityList({ activities }) {
  return (
    <div className="recent-activity">
      {activities.map(activity => (
        <Activity key={activity.id} {...activity} />
      ))}
    </div>
  );
}

// Compose everything together
function UserDashboard({ user }) {
  return (
    <div className="dashboard">
      <div className="header">
        <Avatar src={user.avatar} alt={user.name} />
        <UserInfo name={user.name} email={user.email} />
      </div>
      <Stats posts={user.posts} followers={user.followers} />
      <ActivityList activities={user.activities} />
    </div>
  );
}

Benefits of composition:
- Each component has single responsibility
- Easy to test (test small pieces)
- Reusable (Avatar, Stat can be used elsewhere)
- Easier to understand and maintain

Composition patterns:
---------------------

Pattern 1: Children prop (containment)

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Title</h2>
      <p>Content goes here</p>
    </Card>
  );
}

Pattern 2: Multiple slots (named composition)

function Layout({ header, sidebar, content, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{content}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}

function App() {
  return (
    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
      content={<MainContent />}
      footer={<Footer />}
    />
  );
}

Pattern 3: Render props for flexibility

function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);
  
  return render(data);
}

function App() {
  return (
    <DataFetcher
      url="/api/users"
      render={data => (
        data ? <UserList users={data} /> : <Loading />
      )}
    />
  );
}

Pattern 4: Specialized components

function Dialog({ title, children }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <Dialog title="Confirm Action">
      <p>Are you sure?</p>
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </Dialog>
  );
}

Real-world example: Modal composition
--------------------------------------

// Generic Modal
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

// Modal parts (composition)
function ModalHeader({ children, onClose }) {
  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose} className="close-button">×</button>
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

// Compose to create specific modals
function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>
        <h2>Confirm Delete</h2>
      </ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete "{itemName}"?</p>
        <p>This action cannot be undone.</p>
      </ModalBody>
      <ModalFooter>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm} className="btn-danger">Delete</button>
      </ModalFooter>
    </Modal>
  );
}

Composition over inheritance:
------------------------------

React doesn't use class inheritance for reuse. Use composition instead.

// ❌ Bad: Inheritance (not React way)
class BaseButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}

class PrimaryButton extends BaseButton {
  render() {
    return <button className="btn-primary" onClick={this.props.onClick}>
      {this.props.children}
    </button>;
  }
}

// ✅ Good: Composition
function Button({ variant = 'default', onClick, children }) {
  const className = `btn btn-${variant}`;
  
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

function PrimaryButton({ onClick, children }) {
  return (
    <Button variant="primary" onClick={onClick}>
      {children}
    </Button>
  );
}

// Or even simpler:
<Button variant="primary">Click me</Button>

Flexible composition example: Form builder
-------------------------------------------

function Form({ onSubmit, children }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

function FormField({ label, children }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, ...props }) {
  return <input type="text" value={value} onChange={onChange} {...props} />;
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={onChange}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// Compose to create any form
function UserForm({ user, onChange }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Name">
        <TextInput
          value={user.name}
          onChange={e => onChange({ ...user, name: e.target.value })}
        />
      </FormField>
      
      <FormField label="Email">
        <TextInput
          type="email"
          value={user.email}
          onChange={e => onChange({ ...user, email: e.target.value })}
        />
      </FormField>
      
      <FormField label="Role">
        <Select
          value={user.role}
          onChange={e => onChange({ ...user, role: e.target.value })}
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' }
          ]}
        />
      </FormField>
      
      <button type="submit">Save</button>
    </Form>
  );
}

Summary:

Component composition:
- Build complex UIs from small, focused components
- Use children prop and named props for flexibility
- Prefer composition over inheritance
- Makes components reusable, testable, maintainable
- Core React pattern for building scalable apps
*/


/**
35. What is the difference between controlled and uncontrolled components?
--------------------------------------------------------------------------

Controlled and uncontrolled components refer to how form inputs manage their state.

Controlled Components:
----------------------

Form data is handled by React state. Component controls the input value.

Definition:
- React state is the "single source of truth"
- Input value is controlled by React
- Every state mutation has a handler function

Basic controlled input:

function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      type="text"
      value={value} // ← Controlled by state
      onChange={e => setValue(e.target.value)} // ← Update state
    />
  );
}

How it works:
1. User types in input
2. onChange fires
3. Handler updates state
4. Component re-renders
5. Input displays new state value

Full controlled form example:

function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // formData always reflects current state
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      
      <label>
        <input
          name="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={handleChange}
        />
        I agree to terms
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

Benefits of controlled components:
- Full control over input value
- Easy to validate on every keystroke
- Can transform input (uppercase, formatting, etc.)
- Can disable/enable based on other fields
- Easy to debug (state is visible in DevTools)

Uncontrolled Components:
-------------------------

Form data is handled by the DOM itself. React doesn't control the value.

Definition:
- DOM is the "single source of truth"
- Input manages its own state
- Use refs to get values when needed

Basic uncontrolled input:

function UncontrolledInput() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    // Read value from DOM when needed
    console.log(inputRef.current.value);
  };
  
  return (
    <div>
      <input
        type="text"
        ref={inputRef} // ← Access DOM directly
        defaultValue="Initial value" // ← Not controlled by state
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

Full uncontrolled form example:

function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const agreeRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Read values from DOM
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      agreeToTerms: agreeRef.current.checked
    };
    
    console.log('Form data:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={usernameRef}
        name="username"
        defaultValue=""
      />
      
      <input
        ref={emailRef}
        name="email"
        type="email"
        defaultValue=""
      />
      
      <input
        ref={passwordRef}
        name="password"
        type="password"
        defaultValue=""
      />
      
      <label>
        <input
          ref={agreeRef}
          name="agreeToTerms"
          type="checkbox"
          defaultChecked={false}
        />
        I agree to terms
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}

Benefits of uncontrolled components:
- Less code (no state management)
- Simpler for simple forms
- Can integrate with non-React code
- Better for large forms (less re-renders)

Key differences:
----------------

Aspect              | Controlled               | Uncontrolled
--------------------|--------------------------|---------------------------
State location      | React state              | DOM
Value prop          | value={state}            | defaultValue={initial}
Get value           | Read from state          | Read from ref
Update value        | setState                 | ref.current.value =
Validation          | On every change          | On submit
Re-renders          | On every keystroke       | Only when form submits
Code complexity     | More                     | Less

Controlled example with validation:

function ControlledWithValidation() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validate on every change
    if (!value.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
    }
  };
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

Uncontrolled with validation:

function UncontrolledWithValidation() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = emailRef.current.value;
    
    // Validate on submit
    if (!value.includes('@')) {
      setError('Invalid email');
    } else {
      setError('');
      // Submit form
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={emailRef} type="email" defaultValue="" />
      {error && <span className="error">{error}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

Transforming input (controlled only):

function FormattedInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    // Force uppercase
    setValue(e.target.value.toUpperCase());
  };
  
  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder="WILL BE UPPERCASE"
    />
  );
}

// Can't do this with uncontrolled components!

Hybrid approach (controlled with reset):

function HybridForm() {
  const [email, setEmail] = useState('');
  const formRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email });
    
    // Reset using form.reset()
    formRef.current.reset();
    setEmail(''); // Also clear state
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

When to use controlled:
-----------------------

✅ Need instant validation
✅ Transform input (formatting, uppercase, etc.)
✅ Conditional disable/enable
✅ Dynamic default values
✅ Enforce input format
✅ Multi-step forms with state
✅ Form depends on other component state

Example - conditional fields:

function ConditionalForm() {
  const [userType, setUserType] = useState('guest');
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <select value={userType} onChange={e => setUserType(e.target.value)}>
        <option value="guest">Guest</option>
        <option value="member">Member</option>
      </select>
      
      {userType === 'member' && (
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email required for members"
        />
      )}
    </form>
  );
}

When to use uncontrolled:
--------------------------

✅ Simple forms (contact, login)
✅ File inputs (always uncontrolled)
✅ Integrating with non-React libraries
✅ Performance critical (many inputs)
✅ Quick prototypes
✅ Don't need validation until submit

Example - file input (always uncontrolled):

function FileUpload() {
  const fileRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    console.log('File:', file);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* File inputs are ALWAYS uncontrolled * /}
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  );
}

Converting controlled to uncontrolled (and vice versa):

// Controlled
function Controlled() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}

// Same as uncontrolled
function Uncontrolled() {
  const ref = useRef();
  return <input ref={ref} defaultValue="" />;
}

// Hybrid - start uncontrolled, become controlled
function HybridInput() {
  const [isControlled, setIsControlled] = useState(false);
  const [value, setValue] = useState('');
  
  if (isControlled) {
    return <input value={value} onChange={e => setValue(e.target.value)} />;
  }
  
  return (
    <div>
      <input defaultValue="" />
      <button onClick={() => setIsControlled(true)}>
        Make Controlled
      </button>
    </div>
  );
}

Common mistakes:
----------------

Mistake 1: Mixing controlled and uncontrolled

// ❌ Bad: value AND defaultValue (React warning)
<input value={value} defaultValue="initial" onChange={onChange} />

// ✅ Good: Pick one
<input value={value} onChange={onChange} /> // Controlled
<input ref={ref} defaultValue="initial" /> // Uncontrolled

Mistake 2: value without onChange

// ❌ Bad: Read-only input (can't type)
<input value={value} />

// ✅ Good: Add onChange
<input value={value} onChange={e => setValue(e.target.value)} />

// Or make it explicitly read-only
<input value={value} readOnly />

Mistake 3: Switching between controlled and uncontrolled

// ❌ Bad: Starts uncontrolled (value is undefined)
const [value, setValue] = useState();
return <input value={value} onChange={e => setValue(e.target.value)} />;

// React warning: changing from uncontrolled to controlled

// ✅ Good: Initialize with string
const [value, setValue] = useState(''); // Empty string, not undefined

Summary:

Controlled:
- React state controls value
- Use value prop
- onChange updates state
- Full control, validation, transformation
- More code, more re-renders
- Recommended for most cases

Uncontrolled:
- DOM controls value
- Use defaultValue and ref
- Read value when needed
- Less code, simpler
- Good for simple forms, file inputs
- Less React-like, harder to validate
*/


/**
36. What is lifting state up?
-----------------------------

Lifting state up is the pattern of moving state from child components to their common 
parent, allowing multiple children to share and sync the same state.

Core principle:
When two or more components need to share state, move the state to their closest 
common ancestor.

Problem: Shared state between siblings
---------------------------------------

// ❌ Problem: Siblings can't share state directly

function TemperatureInput({ scale }) {
  const [temperature, setTemperature] = useState('');
  
  return (
    <div>
      <label>Temperature in {scale}:</label>
      <input
        value={temperature}
        onChange={e => setTemperature(e.target.value)}
      />
    </div>
  );
}

function Calculator() {
  return (
    <div>
      <TemperatureInput scale="Celsius" />
      <TemperatureInput scale="Fahrenheit" />
      {/* How do these sync? They can't! * /}
    </div>
  );
}

Solution: Lift state up
------------------------

// ✅ Solution: Lift state to common parent

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  return (
    <div>
      <label>Temperature in {scale}:</label>
      <input
        value={temperature}
        onChange={e => onTemperatureChange(e.target.value)}
      />
    </div>
  );
}

function Calculator() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('c');
  
  const handleCelsiusChange = (temp) => {
    setScale('c');
    setTemperature(temp);
  };
  
  const handleFahrenheitChange = (temp) => {
    setScale('f');
    setTemperature(temp);
  };
  
  const celsius = scale === 'f' ? tryConvert(temperature, toC

elsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
  return (
    <div>
      <TemperatureInput
        scale="Celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="Fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

Real-world examples:
--------------------

Example 1: Shopping cart with quantity controls

// Before lifting (doesn't work):
function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  
  return (
    <div>
      {item.name}
      <button onClick={() => setQuantity(q => q - 1)}>-</button>
      {quantity}
      <button onClick={() => setQuantity(q => q + 1)}>+</button>
      {/* Total doesn't know about quantity changes! * /}
    </div>
  );
}

function Cart({ items }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div>
      {items.map(item => <CartItem key={item.id} item={item} />)}
      <div>Total: ${total}</div>
    </div>
  );
}

// After lifting (works):
function CartItem({ item, quantity, onQuantityChange }) {
  return (
    <div>
      {item.name}
      <button onClick={() => onQuantityChange(item.id, quantity - 1)}>-</button>
      {quantity}
      <button onClick={() => onQuantityChange(item.id, quantity + 1)}>+</button>
    </div>
  );
}

function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Widget', price: 10, quantity: 1 },
    { id: 2, name: 'Gadget', price: 20, quantity: 2 }
  ]);
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div>
      {items.map(item => (
        <CartItem
          key={item.id}
          item={item}
          quantity={item.quantity}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      <div>Total: ${total}</div>
    </div>
  );
}

Example 2: Filter and list sync

// Before lifting:
function FilterBar() {
  const [filter, setFilter] = useState('');
  // ProductList doesn't know about filter!
  return <input value={filter} onChange={e => setFilter(e.target.value)} />;
}

function ProductList({ products }) {
  // Can't filter because filter state is in FilterBar!
  return products.map(p => <Product key={p.id} product={p} />);
}

// After lifting:
function FilterBar({ filter, onFilterChange }) {
  return (
    <input
      value={filter}
      onChange={e => onFilterChange(e.target.value)}
      placeholder="Filter products..."
    />
  );
}

function ProductList({ products, filter }) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return filtered.map(p => <Product key={p.id} product={p} />);
}

function ProductPage({ products }) {
  const [filter, setFilter] = useState('');
  
  return (
    <div>
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <ProductList products={products} filter={filter} />
    </div>
  );
}

Example 3: Multi-step form

// State lifted to parent to track overall progress
function FormStep1({ data, onChange }) {
  return (
    <div>
      <input
        value={data.name}
        onChange={e => onChange({ ...data, name: e.target.value })}
      />
      <input
        value={data.email}
        onChange={e => onChange({ ...data, email: e.target.value })}
      />
    </div>
  );
}

function FormStep2({ data, onChange }) {
  return (
    <div>
      <input
        value={data.address}
        onChange={e => onChange({ ...data, address: e.target.value })}
      />
      <input
        value={data.city}
        onChange={e => onChange({ ...data, city: e.target.value })}
      />
    </div>
  );
}

function FormStep3({ data }) {
  return (
    <div>
      <h3>Review:</h3>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <p>Address: {data.address}</p>
      <p>City: {data.city}</p>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: ''
  });
  
  return (
    <div>
      {step === 1 && <FormStep1 data={formData} onChange={setFormData} />}
      {step === 2 && <FormStep2 data={formData} onChange={setFormData} />}
      {step === 3 && <FormStep3 data={formData} />}
      
      <div>
        {step > 1 && <button onClick={() => setStep(s => s - 1)}>Back</button>}
        {step < 3 && <button onClick={() => setStep(s => s + 1)}>Next</button>}
        {step === 3 && <button onClick={() => console.log(formData)}>Submit</button>}
      </div>
    </div>
  );
}

When to lift state up:
----------------------

✅ Multiple components need same data
✅ Components need to stay in sync
✅ Child components need to communicate
✅ Parent needs to aggregate child data
✅ Shared validation across components

When NOT to lift state up:
---------------------------

❌ State only used by one component (keep it local)
❌ Would require lifting through many levels (use Context instead)
❌ Independent component states (no sync needed)

Example - when NOT to lift:

// ❌ Bad: Lifting unnecessary state
function Parent() {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  
  return (
    <div>
      <Accordion isExpanded={isExpanded1} setIsExpanded={setIsExpanded1} />
      <Accordion isExpanded={isExpanded2} setIsExpanded={setIsExpanded2} />
    </div>
  );
}

// ✅ Good: Keep state local (they don't need to sync)
function Accordion() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>Toggle</button>
      {isExpanded && <div>Content</div>}
    </div>
  );
}

Lifting state vs Context:
--------------------------

Lift state up when:
- Only a few components need state
- Components are close in tree (1-2 levels)
- Simple parent-child relationship

Use Context when:
- Many components need state
- Components are far apart in tree
- Deep prop drilling would occur

Example showing both:

// Lifting state (good for local scope)
function TodoSection() {
  const [todos, setTodos] = useState([]);
  
  return (
    <div>
      <TodoInput onAdd={todo => setTodos([...todos, todo])} />
      <TodoList todos={todos} onToggle={id => {/* ... * /}} />
      <TodoStats todos={todos} />
    </div>
  );
}

// Context (good for app-wide state)
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header /> {/* Deep child needs user * /}
      <Sidebar /> {/* Deep child needs user * /}
      <Content /> {/* Deep child needs user * /}
    </UserContext.Provider>
  );
}

Best practices:
---------------

1. Lift to lowest common ancestor:

// ❌ Bad: Lift too high
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Header />
      <Main modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <Footer />
    </div>
  );
}

// ✅ Good: Lift only as far as needed
function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setModalOpen(true)} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

2. Pass callbacks for updates:

// ✅ Good: Specific callbacks
function Parent() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);
  
  return <Child count={count} increment={increment} decrement={decrement} reset={reset} />;
}

3. Keep components reusable:

// ✅ Components don't know about parent structure
function TemperatureInput({ value, onChange, scale }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={`Temperature in ${scale}`}
    />
  );
}

Summary:

Lifting state up:
- Move state from children to common parent
- Allows siblings to share and sync state
- Parent controls state, children receive props
- Pass callbacks down for state updates
- Use when components need to communicate
- Don't lift too high (use Context for deep trees)
- Keep components reusable and generic
*/


/**
37. What are higher-order components (HOC)?
-------------------------------------------

A higher-order component (HOC) is a function that takes a component and returns a new 
component with additional props or behavior. It's a pattern for reusing component logic.

Syntax:

const EnhancedComponent = higherOrderComponent(WrappedComponent);

HOC is:
- A function (not a component)
- Takes a component as argument
- Returns a new enhanced component
- Doesn't modify original component

Basic example:
--------------

// HOC function
function withLogging(WrappedComponent) {
  return function EnhancedComponent(props) {
    useEffect(() => {
      console.log('Component mounted:', WrappedComponent.name);
      return () => console.log('Component unmounted:', WrappedComponent.name);
    }, []);
    
    return <WrappedComponent {...props} />;
  };
}

// Original component
function HelloWorld({ name }) {
  return <h1>Hello, {name}</h1>;
}

// Enhanced component
const HelloWorldWithLogging = withLogging(HelloWorld);

// Usage
<HelloWorldWithLogging name="Alice" />
// Logs: "Component mounted: HelloWorld"

Real-world HOC examples:
------------------------

Example 1: Authentication HOC

function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const { user, loading } = useAuth(); // Custom hook
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!user) {
      return <Navigate to="/login" />;
    }
    
    // User is authenticated, render component
    return <WrappedComponent {...props} user={user} />;
  };
}

// Protected component
function Dashboard() {
  return <div>Dashboard content</div>;
}

// Wrap with auth HOC
const ProtectedDashboard = withAuth(Dashboard);

// Usage
<Route path="/dashboard" element={<ProtectedDashboard />} />

Example 2: Data fetching HOC

function withDataFetching(WrappedComponent, url) {
  return function DataFetchingComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return <WrappedComponent {...props} data={data} />;
  };
}

// Component that needs data
function UserList({ data }) {
  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

// Enhanced with data fetching
const UserListWithData = withDataFetching(UserList, '/api/users');

// Usage
<UserListWithData />

Example 3: Conditional rendering HOC

function withConditionalRender(WrappedComponent, condition) {
  return function ConditionalComponent(props) {
    if (!condition(props)) {
      return null;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Component
function AdminPanel() {
  return <div>Admin controls</div>;
}

// Only render if user is admin
const AdminPanelForAdmins = withConditionalRender(
  AdminPanel,
  (props) => props.user?.role === 'admin'
);

// Usage
<AdminPanelForAdmins user={currentUser} />

Example 4: Subscription HOC (like React Redux connect)

function withSubscription(WrappedComponent, selectData) {
  return function SubscriptionComponent(props) {
    const [data, setData] = useState(selectData(DataSource, props));
    
    useEffect(() => {
      const handleChange = () => {
        setData(selectData(DataSource, props));
      };
      
      DataSource.subscribe(handleChange);
      return () => DataSource.unsubscribe(handleChange);
    }, []);
    
    return <WrappedComponent data={data} {...props} />;
  };
}

// Usage
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

Example 5: Styling/theming HOC

function withTheme(WrappedComponent) {
  return function ThemedComponent(props) {
    const theme = useContext(ThemeContext);
    
    return <WrappedComponent {...props} theme={theme} />;
  };
}

// Component
function Button({ theme, children }) {
  return (
    <button style={{ background: theme.primaryColor }}>
      {children}
    </button>
  );
}

// Enhanced with theme
const ThemedButton = withTheme(Button);

Example 6: Props manipulation HOC

function withDefaultProps(WrappedComponent, defaultProps) {
  return function ComponentWithDefaults(props) {
    return <WrappedComponent {...defaultProps} {...props} />;
  };
}

// Component
function Greeting({ name, greeting }) {
  return <h1>{greeting}, {name}!</h1>;
}

// Add default greeting
const GreetingWithDefaults = withDefaultProps(Greeting, {
  greeting: 'Hello'
});

// Usage
<GreetingWithDefaults name="Alice" />
// Renders: "Hello, Alice!"

<GreetingWithDefaults name="Bob" greeting="Hi" />
// Renders: "Hi, Bob!"

Composing multiple HOCs:
-------------------------

// Multiple HOCs
const enhance = compose(
  withAuth,
  withLogging,
  withTheme
);

const EnhancedComponent = enhance(MyComponent);

// Or chain them
const EnhancedComponent = withAuth(withLogging(withTheme(MyComponent)));

Best practices:
---------------

1. Pass unrelated props through:

function withSomething(WrappedComponent) {
  return function Enhanced(props) {
    const { specialProp, ...passThroughProps } = props;
    
    const injectedProp = doSomethingWith(specialProp);
    
    // Pass through all other props
    return <WrappedComponent injectedProp={injectedProp} {...passThroughProps} />;
  };
}

2. Wrap display name for debugging:

function withSomething(WrappedComponent) {
  function Enhanced(props) {
    return <WrappedComponent {...props} />;
  }
  
  // Set display name for DevTools
  Enhanced.displayName = `withSomething(${getDisplayName(WrappedComponent)})`;
  
  return Enhanced;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

3. Don't use HOCs inside render:

// ❌ Bad: Creates new component on every render
function Parent() {
  const EnhancedComponent = withAuth(MyComponent); // Don't do this!
  return <EnhancedComponent />;
}

// ✅ Good: Create enhanced component outside
const EnhancedComponent = withAuth(MyComponent);

function Parent() {
  return <EnhancedComponent />;
}

4. Copy static methods:

import hoistNonReactStatics from 'hoist-non-react-statics';

function withSomething(WrappedComponent) {
  function Enhanced(props) {
    return <WrappedComponent {...props} />;
  }
  
  // Copy static methods from wrapped component
  hoistNonReactStatics(Enhanced, WrappedComponent);
  
  return Enhanced;
}

Limitations of HOCs:
--------------------

1. Prop name collisions:

// If both HOCs inject a "data" prop, collision!
const enhanced = withData(withMoreData(Component));

2. Wrapper hell in DevTools:

<WithAuth>
  <WithTheme>
    <WithLogging>
      <WithData>
        <MyComponent />
      </WithData>
    </WithLogging>
  </WithTheme>
</WithAuth>

3. No static composition:

// Can't see what props are injected without running code
const Enhanced = withAuth(withTheme(Component));

HOCs vs Hooks:
--------------

HOCs (older pattern):

const EnhancedComponent = withAuth(Component);

Hooks (modern pattern):

function Component() {
  const user = useAuth(); // Cleaner!
  if (!user) return <Navigate to="/login" />;
  return <div>Content</div>;
}

Hooks advantages:
✅ No wrapper components
✅ Clearer where data comes from
✅ No prop naming collisions
✅ Easier to compose

When to still use HOCs:
- Working with class components (can't use hooks)
- Library patterns (like React Redux connect)
- When you need to wrap component tree

Modern alternative - custom hooks:

// Instead of HOC
function withWindowSize(Component) {
  return function(props) {
    const [size, setSize] = useState(getWindowSize());
    
    useEffect(() => {
      const handleResize = () => setSize(getWindowSize());
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return <Component {...props} windowSize={size} />;
  };
}

// Use custom hook instead
function useWindowSize() {
  const [size, setSize] = useState(getWindowSize());
  
  useEffect(() => {
    const handleResize = () => setSize(getWindowSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// Usage in component
function MyComponent() {
  const windowSize = useWindowSize(); // Much cleaner!
  return <div>Width: {windowSize.width}</div>;
}

Summary:

HOCs:
- Functions that take and return components
- Add behavior/props to components
- Enable code reuse across components
- Common before hooks (auth, data fetching, theming)
- Can be composed together
- Modern alternative: custom hooks (preferred)
- Still useful for class components and some libraries
*/


/**
38. What are render props?
--------------------------

Render props is a pattern where a component takes a function as a prop and calls it 
to render content, sharing logic while allowing flexibility in what gets rendered.

Core concept:
A component with a render prop takes a function that returns a React element and 
calls it instead of implementing its own render logic.

Basic example:
--------------

// Component with render prop
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Call the render prop function with data
  return render(position);
}

// Usage
<Mouse render={({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)} />

// Different usage
<Mouse render={({ x, y }) => (
  <div style={{ position: 'absolute', left: x, top: y }}>
    🐭
  </div>
)} />

The "children as function" pattern:
------------------------------------

// Instead of a "render" prop, use "children" prop as function
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return children(position);
}

// Usage
<Mouse>
  {({ x, y }) => (
    <h1>Mouse at {x}, {y}</h1>
  )}
</Mouse>

Real-world examples:
--------------------

Example 1: Data fetching with render prop

function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading, error });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <UserList users={data} />;
  }}
/>

// Different rendering for same data
<DataFetcher
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorPage error={error} />;
    return <UserGrid users={data} />;
  }}
/>

Example 2: Toggle component

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  
  const toggle = () => setOn(prev => !prev);
  
  return children({ on, toggle });
}

// Usage - different UIs for same logic
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>
        {on ? 'ON' : 'OFF'}
      </button>
      {on && <div>Content is visible</div>}
    </div>
  )}
</Toggle>

<Toggle>
  {({ on, toggle }) => (
    <div>
      <Switch checked={on} onChange={toggle} />
      <Panel visible={on}>Panel content</Panel>
    </div>
  )}
</Toggle>

Example 3: Media query component

function MediaQuery({ query, children }) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return children(matches);
}

// Usage
<MediaQuery query="(max-width: 768px)">
  {(isMobile) => (
    isMobile ? <MobileNav /> : <DesktopNav />
  )}
</MediaQuery>

Example 4: Form validation

function Validator({ value, rules, children }) {
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    const newErrors = [];
    
    rules.forEach(rule => {
      if (!rule.test(value)) {
        newErrors.push(rule.message);
      }
    });
    
    setErrors(newErrors);
  }, [value, rules]);
  
  const isValid = errors.length === 0;
  
  return children({ errors, isValid });
}

// Usage
<Validator
  value={email}
  rules={[
    { test: (v) => v.length > 0, message: 'Required' },
    { test: (v) => v.includes('@'), message: 'Invalid email' }
  ]}
>
  {({ errors, isValid }) => (
    <div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={isValid ? 'valid' : 'invalid'}
      />
      {errors.map((error, i) => (
        <div key={i} className="error">{error}</div>
      ))}
    </div>
  )}
</Validator>

Example 5: Intersection observer

function InView({ children, threshold = 0.5 }) {
  const [inView, setInView] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold]);
  
  return children({ inView, ref });
}

// Usage
<InView>
  {({ inView, ref }) => (
    <div ref={ref}>
      {inView ? (
        <ExpensiveComponent />
      ) : (
        <Placeholder />
      )}
    </div>
  )}
</InView>

Prop naming (render, children, or custom):
-------------------------------------------

// 1. "render" prop (explicit)
<Mouse render={mouse => <div>{mouse.x}, {mouse.y}</div>} />

// 2. "children" prop (common)
<Mouse>
  {mouse => <div>{mouse.x}, {mouse.y}</div>}
</Mouse>

// 3. Custom name (semantic)
<DataFetcher renderData={data => <List items={data} />} />

// 4. Multiple render props
<Tabs
  renderHeader={({ tabs, activeTab }) => <TabBar tabs={tabs} active={activeTab} />}
  renderContent={({ content }) => <TabPanel>{content}</TabPanel>}
/>

Performance optimization:
-------------------------

// ❌ Bad: Creates new function on every render
<Mouse render={position => <div>{position.x}</div>} />

// ✅ Good: Use useCallback to memoize
const renderMouse = useCallback(
  position => <div>{position.x}</div>,
  []
);

<Mouse render={renderMouse} />

// Or extract to component
function MouseDisplay({ x, y }) {
  return <div>{x}, {y}</div>;
}

<Mouse render={position => <MouseDisplay {...position} />} />

Render props vs HOCs:
---------------------

// HOC approach
const MouseTracker = withMouse(Component);

// Render prop approach
<Mouse render={mouse => <Component mouse={mouse} />} />

Render props advantages:
✅ More flexible (different rendering for same logic)
✅ Composition is clearer
✅ No prop name collisions
✅ Can see data flow in JSX

HOC advantages:
✅ Less nesting in JSX
✅ Can enhance components declaratively

Render props vs Hooks:
----------------------

// Render props (older pattern)
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
  )}
</Toggle>

// Custom hook (modern pattern)
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(prev => !prev);
  return { on, toggle };
}

// Usage
function MyComponent() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}

Hooks advantages:
✅ No nesting
✅ Cleaner JSX
✅ Easier to compose
✅ Better tree in DevTools

When to still use render props:
- Need dynamic rendering based on state
- Want to share UI logic but keep rendering flexible
- Working with components (hooks only work in components)

Combining patterns:
-------------------

// Component uses hook internally, exposes render prop for flexibility
function DataLoader({ url, children }) {
  const { data, loading, error } = useFetch(url); // Hook
  
  return children({ data, loading, error }); // Render prop
}

Common mistakes:
----------------

1. Forgetting to call the render function:

// ❌ Bad
<Mouse render={position => <div>{position.x}</div>} />

function Mouse({ render }) {
  const position = useMousePosition();
  return render; // Missing () - renders function instead of calling it
}

// ✅ Good
return render(position);

2. Not handling undefined/null:

// ❌ Bad: Crashes if no render prop
function Mouse({ render }) {
  const position = useMousePosition();
  return render(position);
}

// ✅ Good: Handle missing render prop
function Mouse({ render, children }) {
  const position = useMousePosition();
  const renderFn = render || children;
  
  if (!renderFn) {
    return null;
  }
  
  return renderFn(position);
}

3. Creating functions in render (performance):

// ❌ Bad: New function every render
<Mouse render={position => <div>{position.x}</div>} />

// ✅ Better: Extract or memoize
const RenderMouse = React.memo(({ x, y }) => <div>{x}, {y}</div>);
<Mouse render={position => <RenderMouse {...position} />} />

Summary:

Render props:
- Pass function as prop to share logic
- Function receives data and returns elements
- Flexible rendering for same logic
- Common patterns: children as function, render prop
- Modern alternative: custom hooks (preferred)
- Still useful for dynamic rendering needs
- More flexible than HOCs, less nesting than hooks
*/


/**
39. What is the container–presentational component pattern?
----------------------------------------------------------

The container–presentational pattern separates components into two types:
- Containers (smart/stateful): Handle logic, state, and data
- Presentational (dumb/stateless): Handle how things look

This pattern promotes separation of concerns and reusability.

Presentational Components:
--------------------------

Characteristics:
- Concerned with how things look
- Receive data and callbacks via props
- Rarely have own state (only UI state)
- Written as function components
- Reusable and testable

Example presentational component:

function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p className="role">{user.role}</p>
      
      <div className="actions">
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)} className="danger">
          Delete
        </button>
      </div>
    </div>
  );
}

// Presentational - pure display logic
function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <div className="empty">No users found</div>;
  }
  
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

Container Components:
---------------------

Characteristics:
- Concerned with how things work
- Provide data and behavior to presentational components
- Often stateful (useState, useReducer, etc.)
- Call APIs, manage side effects
- Rarely have DOM markup (mostly logic)

Example container component:

function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data fetching
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  // Business logic
  const handleEdit = (user) => {
    // Navigate to edit page or open modal
    navigate(`/users/${user.id}/edit`);
  };
  
  const handleDelete = async (userId) => {
    if (!confirm('Are you sure?')) return;
    
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    setUsers(users.filter(u => u.id !== userId));
  };
  
  // Render states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  // Pass data and handlers to presentational component
  return (
    <UserList
      users={users}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

Full example:
-------------

// ========== Presentational Components ==========

// Button (presentational)
function Button({ variant = 'primary', onClick, children, disabled }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// SearchBar (presentational)
function SearchBar({ value, onChange, onClear, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button onClick={onClear} className="clear-btn">×</button>
      )}
    </div>
  );
}

// ProductCard (presentational)
function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <p className="description">{product.description}</p>
      
      <div className="actions">
        <Button onClick={() => onViewDetails(product.id)}>
          Details
        </Button>
        <Button
          variant="success"
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}

// ProductList (presentational)
function ProductList({ products, onAddToCart, onViewDetails }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

// ========== Container Component ==========

function ProductListContainer() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, []);
  
  // Business logic: Search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);
  
  // Business logic: Add to cart
  const handleAddToCart = (product) => {
    // Call cart API
    fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId: product.id })
    }).then(() => {
      showNotification(`Added ${product.name} to cart`);
    });
  };
  
  // Business logic: View details
  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };
  
  // Business logic: Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div className="product-page">
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={handleClearSearch}
        placeholder="Search products..."
      />
      
      <ProductList
        products={filteredProducts}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}

Benefits of this pattern:
-------------------------

1. Reusability:
   Presentational components can be reused in different contexts

// Same UserCard used in different containers
<UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
<UserCard user={user} onEdit={openModal} onDelete={showConfirm} />

2. Testability:
   Presentational components easy to test (just props)

test('UserCard renders user info', () => {
  const user = { name: 'Alice', email: 'alice@example.com' };
  render(<UserCard user={user} onEdit={jest.fn()} onDelete={jest.fn()} />);
  
  expect(screen.getByText('Alice')).toBeInTheDocument();
  expect(screen.getByText('alice@example.com')).toBeInTheDocument();
});

3. Separation of concerns:
   UI logic separate from business logic

4. Better collaboration:
   Designers work on presentational, developers on containers

Modern approach with hooks:
---------------------------

The pattern has evolved with hooks. Now we use custom hooks for logic instead of 
container components.

// Old pattern: Container component
function UserListContainer() {
  const [users, setUsers] = useState([]);
  // ... fetch logic, handlers, etc.
  
  return <UserList users={users} onEdit={handleEdit} />;
}

// Modern pattern: Custom hook + presentational component
function useUsers() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);
  
  const deleteUser = (id) => {
    // delete logic
  };
  
  return { users, deleteUser };
}

function UserListPage() {
  const { users, deleteUser } = useUsers(); // Hook provides logic
  
  return <UserList users={users} onDelete={deleteUser} />; // Presentational component
}

Comparison:
-----------

Old pattern (container component):

UserListContainer (container)
  └── UserList (presentational)
        └── UserCard (presentational)

Modern pattern (hook + component):

UserListPage (uses custom hook)
  ├── useUsers() (custom hook - logic)
  └── UserList (presentational)
        └── UserCard (presentational)

Both achieve separation, but hooks are more flexible and composable.

When to use presentational components:
---------------------------------------

✅ Reusable UI components (buttons, cards, modals)
✅ Design system components
✅ Pure display logic
✅ Components that will be tested extensively
✅ Shareable across projects

When presentational components can have state:
----------------------------------------------

Presentational components CAN have local UI state that doesn't affect business logic:

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false); // UI state OK
  
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

Summary:

Container–Presentational pattern:
- Separates logic (containers) from UI (presentational)
- Presentational: props in, UI out, reusable, testable
- Containers: fetch data, handle events, manage state
- Modern approach: custom hooks for logic + presentational components
- Promotes reusability, testability, and separation of concerns
- Core pattern for building maintainable React apps
*/


/**
40. What is the compound component pattern?
-------------------------------------------

Compound components are components that work together to form a complete UI, sharing 
implicit state without passing props through every level. They provide a flexible and 
expressive API.

Think of HTML elements like <select> and <option>:

<select>
  <option value="1">One</option>
  <option value="2">Two</option>
</select>

Option knows about Select's state without explicit props. Compound components work similarly.

Basic example:
--------------

Without compound components (explicit props):

function Tabs({ defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div>
      <TabList activeTab={activeTab} onTabChange={setActiveTab}>
        <Tab id="home" label="Home" />
        <Tab id="profile" label="Profile" />
      </TabList>
      
      <TabPanels activeTab={activeTab}>
        <TabPanel id="home">Home content</TabPanel>
        <TabPanel id="profile">Profile content</TabPanel>
      </TabPanels>
    </div>
  );
}

With compound components (implicit state sharing):

// Usage (clean API)
<Tabs defaultTab="home">
  <Tabs.List>
    <Tabs.Tab id="home">Home</Tabs.Tab>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panels>
    <Tabs.Panel id="home">Home content</Tabs.Panel>
    <Tabs.Panel id="profile">Profile content</Tabs.Panel>
  </Tabs.Panels>
</Tabs>

Implementation with Context:
----------------------------

// 1. Create context
const TabsContext = createContext();

// 2. Parent component provides state
function Tabs({ defaultTab, children }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const value = {
    activeTab,
    setActiveTab
  };
  
  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// 3. Child components consume context
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === id;
  
  return (
    <button
      className={isActive ? 'tab active' : 'tab'}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
}

// 4. Attach as properties (compound pattern)
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Now can use: <Tabs><Tabs.Tab /></Tabs>

Real-world example: Modal compound component
---------------------------------------------

const ModalContext = createContext();

function Modal({ isOpen, onClose, children }) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          {children}
        </div>
      )}
    </ModalContext.Provider>
  );
}

function ModalContent({ children }) {
  return (
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  );
}

function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);
  
  return (
    <div className="modal-header">
      {children}
      <button onClick={onClose} className="close">×</button>
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

// Attach compound components
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>
          <Modal.Header>
            <h2>Modal Title</h2>
          </Modal.Header>
          
          <Modal.Body>
            <p>Modal content goes here</p>
          </Modal.Body>
          
          <Modal.Footer>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

Example: Accordion compound component
--------------------------------------

const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);
  
  const toggle = (id) => {
    if (allowMultiple) {
      setOpenItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => prev.includes(id) ? [] : [id]);
    }
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  return (
    <div className="accordion-item">
      {children}
    </div>
  );
}

function AccordionHeader({ id, children }) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);
  
  return (
    <button
      className="accordion-header"
      onClick={() => toggle(id)}
    >
      {children}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
  );
}

function AccordionPanel({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(id);
  
  if (!isOpen) return null;
  
  return <div className="accordion-panel">{children}</div>;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

// Usage
<Accordion>
  <Accordion.Item id="1">
    <Accordion.Header id="1">Section 1</Accordion.Header>
    <Accordion.Panel id="1">Content 1</Accordion.Panel>
  </Accordion.Item>
  
  <Accordion.Item id="2">
    <Accordion.Header id="2">Section 2</Accordion.Header>
    <Accordion.Panel id="2">Content 2</Accordion.Panel>
  </Accordion.Item>
</Accordion>

Flexible composition example:
-----------------------------

// Can rearrange components
<Modal isOpen={isOpen} onClose={onClose}>
  <Modal.Content>
    <Modal.Body>
      <p>No header needed!</p>
    </Modal.Body>
    <Modal.Footer>
      <button>OK</button>
    </Modal.Footer>
  </Modal.Content>
</Modal>

// Can add custom components between
<Tabs defaultTab="home">
  <div className="custom-wrapper">
    <Tabs.List>
      <Tabs.Tab id="home">Home</Tabs.Tab>
    </Tabs.List>
  </div>
  
  <Tabs.Panels>
    <Tabs.Panel id="home">Content</Tabs.Panel>
  </Tabs.Panels>
</Tabs>

Benefits:
---------

1. Flexible API:
   Users compose components how they want

2. Implicit state sharing:
   No prop drilling

3. Readable JSX:
   Semantic, self-documenting

4. Separation of concerns:
   Each compound component has one job

5. Customizable:
   Can rearrange, skip, or extend parts

When to use compound components:
---------------------------------

✅ Related components that share state (tabs, accordions, menus)
✅ Building reusable component libraries
✅ When you want flexible, composable APIs
✅ Components with multiple moving parts that need coordination

When NOT to use:
-----------------

❌ Simple components without shared state
❌ When order/structure must be enforced
❌ Overly complex state management (use forms library instead)

Summary:

Compound components:
- Work together to form complete UI
- Share state implicitly via Context
- Flexible, composable API
- Common for tabs, modals, menus, accordions
- Attach child components as properties
- Balance flexibility with guidance
*/


/**
41. What is the provider pattern?
---------------------------------

The provider pattern uses React Context to make data available to a component tree 
without passing props through every level. A "provider" component wraps the tree and 
supplies values that descendant components can "consume."

Basic pattern:
--------------

// 1. Create context
const ThemeContext = createContext();

// 2. Create provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    setTheme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create custom hook for consuming
function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
}

// 4. Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
      <Footer />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'}
      </button>
    </header>
  );
}

Real-world example: Authentication provider
--------------------------------------------

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication on mount
    checkAuth()
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
    logoutAPI();
    setUser(null);
    localStorage.removeItem('token');
  };
  
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage across app
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

function Profile() {
  const { user, logout } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
}

Multiple providers example:
---------------------------

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <Router>
              <Routes />
            </Router>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Or compose them
function AppProviders({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes />
      </Router>
    </AppProviders>
  );
}

Provider with reducer example:
------------------------------

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  
  const total = state.items.reduce((sum, item) => sum + item.price, 0);
  
  const value = {
    items: state.items,
    addItem,
    removeItem,
    clearCart,
    total
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

Optimized provider (prevent unnecessary re-renders):
-----------------------------------------------------

function OptimizedProvider({ children }) {
  const [state, setState] = useState(initialState);
  
  // Memoize value to prevent new object on every render
  const value = useMemo(() => ({
    state,
    setState,
    // ... other values/functions
  }), [state]); // Only recreate when state changes
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

Split context for performance:
-------------------------------

// Instead of one large context
const AppContext = createContext();

// Split into separate contexts
const UserContext = createContext();
const ThemeContext = createContext();
const SettingsContext = createContext();

// Components only re-render when their specific context changes
function UserProfile() {
  const user = useContext(UserContext); // Only re-renders on user change
  return <div>{user.name}</div>;
}

function ThemedButton() {
  const theme = useContext(ThemeContext); // Only re-renders on theme change
  return <button className={theme}>Click</button>;
}

Best practices:
---------------

1. Always provide custom hook:

function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
}

2. Memoize provider value:

const value = useMemo(() => ({ state, actions }), [state]);

3. Split large contexts:

// Bad: One huge context
<AppContext.Provider value={{ user, theme, cart, settings }} />

// Good: Separate contexts
<UserProvider>
  <ThemeProvider>
    <CartProvider>
      <SettingsProvider />
    </CartProvider>
  </ThemeProvider>
</UserProvider>

4. Co-locate provider with related code:

// features/auth/AuthProvider.js
export { AuthProvider, useAuth };

// features/cart/CartProvider.js
export { CartProvider, useCart };

Summary:

Provider pattern:
- Wraps component tree to provide data/functionality
- Uses React Context under the hood
- Avoids prop drilling
- Common for auth, theme, language, cart
- Create provider component + custom hook
- Optimize with useMemo
- Split contexts for performance
- Essential pattern for app-wide state
*/


/**
42. What is the difference between props drilling and context usage?
-------------------------------------------------------------------

Prop drilling and Context are two different ways to pass data through a React component tree.

Prop drilling:
--------------

Definition:
- Passing data from a top-level component down through multiple intermediate components
  via props, even if those middle components don't use the data themselves.

Example:

function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  // Must pass user down through Page
  return <Page user={user} setUser={setUser} />;
}

function Page({ user, setUser }) {
  // Must pass user further down
  return <Layout user={user} setUser={setUser} />;
}

function Layout({ user, setUser }) {
  // Must pass user further down
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  // Finally used here
  return <UserProfile user={user} setUser={setUser} />;
}

function UserProfile({ user, setUser }) {
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ ...user, name: 'Bob' })}>
        Change Name
      </button>
    </div>
  );
}

Characteristics of prop drilling:
- Data flow is explicit (you can see who gets what via props).
- Intermediate components become “pipelines” for data they don’t care about.
- Refactoring the tree (inserting/removing levels) can require updating many components.
- For shallow trees (1–2 levels) it’s simple and often preferable.

Pros:
- Very explicit and easy to trace.
- No extra abstractions.
- Fine-grained control over what re-renders (only components that receive changed props).

Cons:
- Noisy and repetitive when data has to cross many levels.
- Makes intermediate components more coupled to higher-level data.
- Harder to maintain as the tree grows deeper.

Context usage:
--------------

Definition:
- A way to make data available to any component in a subtree without passing it explicitly
  via props through every intermediate level.

Core pieces:
- A context object created with `createContext`.
- A provider component that supplies a value.
- Consumers that read the value via `useContext` (or `<Context.Consumer>`).

Example using Context:

// 1. Create context
const UserContext = createContext(null);

// 2. Provider wraps tree
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'Alice', role: 'admin' });

  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. App uses provider at a high level
function App() {
  return (
    <UserProvider>
      <Page />
    </UserProvider>
  );
}

// 4. Intermediate components no longer need user props
function Page() {
  return <Layout />;
}

function Layout() {
  return <Sidebar />;
}

function Sidebar() {
  return <UserProfile />;
}

// 5. Deep component consumes context directly
function UserProfile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => setUser({ ...user, name: 'Bob' })}>
        Change Name
      </button>
    </div>
  );
}

Characteristics of Context:
- Data is “global” to a subtree; any descendant can read it without being passed props.
- Removes the need for intermediate components to forward props.
- Improves ergonomics for deeply nested or widely used state (auth, theme, language, etc.).

Pros:
- Eliminates prop drilling for shared state.
- Easier to add/remove intermediate components without changing props.
- Good for truly shared / app-wide concerns.

Cons:
- Data flow is more implicit (harder to see exactly where values come from by reading JSX).
- All consumers re-render when the provided value changes (if not optimized).
- Slightly more setup (context, provider, and usually a custom hook).

Direct comparison:
------------------

Conceptual difference:

- Prop drilling:
  - Data flows explicitly: parent → child → grandchild → ...
  - Every level receives props, even if it doesn’t use them.
  - Good for local, shallow sharing.

- Context:
  - Data flows implicitly: provider → any descendant that calls `useContext`.
  - Intermediate components stay unaware of that data.
  - Good for global or widely shared state across deep trees.

Example: 4-level tree:

// Prop drilling
<App user={user}>
  <Page user={user}>
    <Layout user={user}>
      <Sidebar user={user}>
        <UserProfile user={user} />
      </Sidebar>
    </Layout>
  </Page>
</App>

// Context
<UserProvider>
  <App>
    <Page>
      <Layout>
        <Sidebar>
          <UserProfile /> // pulls from context directly
        </Sidebar>
      </Layout>
    </Page>
  </App>
</UserProvider>

When to use prop drilling:
--------------------------

Use prop drilling when:
- Data is needed only a few levels down (e.g., parent → child → grandchild).
- The intermediate components also logically care about that data.
- You prefer maximum explicitness.
- The tree is small or local to a feature.

Example (prop drilling makes sense):

function ProductPage() {
  const [product, setProduct] = useState(...);

  return (
    <ProductLayout product={product}>
      <ProductHeader product={product} />
      <ProductDetails product={product} />
      <ProductFooter product={product} />
    </ProductLayout>
  );
}

Here, all components care about product, so passing via props is straightforward.

When to use Context:
--------------------

Use Context when:
- The same data is needed by many components at different levels.
- You’d otherwise pass props through many layers that don’t use them.
- You’re dealing with “global-ish” concerns:
  - Auth user
  - Theme (light/dark)
  - Locale / translations
  - Feature flags
  - Global app settings
- You want to avoid rigid prop chains across the app.

Example concerns ideal for Context:
- `AuthProvider` for user and permissions.
- `ThemeProvider` for colors, typography, UI mode.
- `CartProvider` for shopping cart state in e-commerce.
- `SettingsProvider` for preferences like language and layout.

Performance considerations:
---------------------------

Prop drilling:
- Only components that receive updated props re-render.
- You control exactly which components get which data.
- Can be more efficient when state is local and tree is small.

Context:
- Every component that consumes the context re-renders when the value changes.
- If a provider’s value is an object recreated on every render, it can trigger extra renders.
- Good practice: memoize provider values and split contexts when necessary.

Example optimization:

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

Hybrid pattern (both together):
-------------------------------

A common real-world pattern:
- Use Context for app-wide or cross-cutting concerns.
- Use prop drilling for local, feature-specific data.

Example:

// App-level “global” state with Context
<AuthProvider>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</AuthProvider>

// Local state via props for a small feature
function TodoSection() {
  const [todos, setTodos] = useState([]);
  return (
    <TodoList
      todos={todos}
      onToggle={id => { ... }}
      onDelete={id => { ... }}
    />
  );
}

Summary:
--------

- Prop drilling:
  - Explicit data passing via props through every level.
  - Great for small, shallow trees and local state.
  - Becomes noisy and brittle for deeply nested/shared state.

- Context usage:
  - Provides data implicitly to any descendant via a provider.
  - Ideal for global or widely shared state across deep trees.
  - Needs careful optimization and good structure for performance and clarity.

Rule of thumb:
--------------
- If only a couple of levels need the data → props.
- If many distant components need the data → Context (provider pattern).
*/


