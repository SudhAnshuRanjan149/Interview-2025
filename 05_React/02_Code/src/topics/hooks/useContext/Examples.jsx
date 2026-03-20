import React, { createContext, useContext, useState } from 'react';

/**
useContext - Example 1: Basic Theme Context
============================================
*/

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = {
    isDarkMode,
    toggleTheme: () => setIsDarkMode(prev => !prev),
    background: isDarkMode ? '#333' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    border: isDarkMode ? '#555' : '#ddd'
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return (
    <div style={{
      background: theme.background,
      color: theme.text,
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '10px'
    }}>
      <p>Current Theme: {theme.isDarkMode ? 'Dark' : 'Light'}</p>
      <button 
        onClick={theme.toggleTheme}
        style={{
          padding: '8px 12px',
          background: theme.isDarkMode ? '#555' : '#ddd',
          color: theme.text,
          border: `1px solid ${theme.border}`,
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export function Example1_BasicThemeContext() {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 1: Basic Theme Context</h3>
      <ThemeProvider>
        <ThemedComponent />
        <ThemedComponent />
      </ThemeProvider>
    </div>
  );
}

/**
useContext - Example 2: Multiple Contexts
==========================================
*/

const UserContext = createContext();
const NotificationContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com', role: 'user' });
  const [notifications, setNotifications] = useState(['Welcome!']);

  const addNotification = (msg) => {
    setNotifications(prev => [...prev, msg]);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NotificationContext.Provider value={{ notifications, addNotification }}>
        {children}
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
}

function UserProfile() {
  const { user } = useContext(UserContext);
  const { addNotification } = useContext(NotificationContext);

  return (
    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '3px', marginBottom: '10px' }}>
      <h4>User Profile</h4>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button 
        onClick={() => addNotification(`Viewed profile: ${user.name}`)}
        style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
      >
        View Profile
      </button>
    </div>
  );
}

function NotificationCenter() {
  const { notifications } = useContext(NotificationContext);

  return (
    <div style={{ padding: '10px', background: '#e3f2fd', borderRadius: '3px', marginBottom: '10px' }}>
      <h4>Notifications ({notifications.length})</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map((notif, idx) => (
          <li key={idx} style={{ padding: '5px', background: '#fff', marginBottom: '5px', borderRadius: '2px', borderLeft: '3px solid #2196F3', paddingLeft: '8px' }}>
            {notif}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Example2_MultipleContexts() {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 2: Multiple Contexts</h3>
      <ContextProvider>
        <UserProfile />
        <NotificationCenter />
      </ContextProvider>
    </div>
  );
}

/**
useContext - Example 3: Language/Localization Context
=====================================================
*/

const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      greeting: 'Hello',
      welcome: 'Welcome to our app',
      goodbye: 'Goodbye'
    },
    es: {
      greeting: 'Hola',
      welcome: 'Bienvenido a nuestra aplicación',
      goodbye: 'Adiós'
    },
    fr: {
      greeting: 'Bonjour',
      welcome: 'Bienvenue dans notre application',
      goodbye: 'Au revoir'
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <div style={{ marginBottom: '10px' }}>
      <label>Select Language: </label>
      <select 
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px', borderRadius: '3px' }}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}

function LocalizedContent() {
  const { t } = useContext(LanguageContext);

  return (
    <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '3px' }}>
      <p><strong>{t('greeting')}!</strong> {t('welcome')}</p>
      <p style={{ fontSize: '12px', color: '#999' }}>{t('goodbye')}</p>
    </div>
  );
}

export function Example3_LanguageContext() {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 3: Language/Localization Context</h3>
      <LanguageProvider>
        <LanguageSelector />
        <LocalizedContent />
      </LanguageProvider>
    </div>
  );
}

/**
useContext - Example 4: Authentication Context
===============================================
*/

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null
  });

  const login = (username, password) => {
    // Simulated login
    if (password.length >= 3) {
      setAuthState({
        isAuthenticated: true,
        user: { username, email: `${username}@example.com` },
        token: `token_${Date.now()}`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login, logout, user } = useContext(AuthContext);

  const handleLogin = () => {
    if (!username.trim()) {
      setError('Username required');
      return;
    }
    if (!login(username, password)) {
      setError('Login failed - password too short (min 3 chars)');
      return;
    }
    setError('');
    setUsername('');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <div style={{ padding: '10px', background: '#e8f5e9', borderRadius: '3px' }}>
        <p>Logged in as: <strong>{user.username}</strong></p>
        <button 
          onClick={logout}
          style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px', background: '#fff3e0', borderRadius: '3px' }}>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '5px' }}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleLogin}
          style={{ padding: '5px 10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Login
        </button>
      </div>
      {error && <p style={{ color: '#f44336', fontSize: '12px' }}>{error}</p>}
    </div>
  );
}

export function Example4_AuthContext() {
  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
      <h3>Example 4: Authentication Context</h3>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </div>
  );
}

/**
useContext - Example 5: Modal Context
======================================
*/

const ModalContext = createContext();

function ModalProvider({ children }) {
  const [modals, setModals] = useState({});

  const openModal = (modalId, data = null) => {
    setModals(prev => ({ ...prev, [modalId]: { isOpen: true, data } }));
  };

  const closeModal = (modalId) => {
    setModals(prev => ({ ...prev, [modalId]: { isOpen: false, data: null } }));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Modal({ modalId, title, children }) {
  const { modals, closeModal } = useContext(ModalContext);
  const isOpen = modals[modalId]?.isOpen;

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h4>{title}</h4>
          <button 
            onClick={() => closeModal(modalId)}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalButton({ modalId, label }) {
  const { openModal } = useContext(ModalContext);

  return (
    <button 
      onClick={() => openModal(modalId)}
      style={{ padding: '8px 15px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}
    >
      {label}
    </button>
  );
}

export function Example5_ModalContext() {
  return (
    <ModalProvider>
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Example 5: Modal Context</h3>
        <div style={{ marginBottom: '15px' }}>
          <ModalButton modalId="modal1" label="Open Modal 1" />
          <ModalButton modalId="modal2" label="Open Modal 2" />
        </div>

        <Modal modalId="modal1" title="Modal 1">
          <p>This is the first modal. You can manage multiple modals with a single context!</p>
          <p style={{ fontSize: '12px', color: '#999' }}>Click X or outside to close</p>
        </Modal>

        <Modal modalId="modal2" title="Modal 2">
          <p>This is the second modal. Each modal has its own state managed by the context.</p>
          <p style={{ fontSize: '12px', color: '#999' }}>Click X or outside to close</p>
        </Modal>
      </div>
    </ModalProvider>
  );
}

/**
useContext - Example 6: Shopping Cart Context
==============================================
*/

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29, quantity: 2 }
  ]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  return (
    <div style={{ padding: '10px', background: '#f9f9f9', borderRadius: '3px' }}>
      <h4>Shopping Cart ({cartItems.length} items)</h4>
      {cartItems.length === 0 ? (
        <p style={{ color: '#999' }}>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ padding: '8px', background: '#fff', marginBottom: '8px', borderRadius: '2px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong>{item.name}</strong> - ${item.price}
              </div>
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{ padding: '2px 5px', background: '#ddd', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{ padding: '2px 5px', background: '#ddd', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
                >
                  +
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: '2px 5px', background: '#f44336', color: 'white', border: 'none', borderRadius: '2px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ddd' }}>
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export function Example6_ShoppingCartContext() {
  return (
    <CartProvider>
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Example 6: Shopping Cart Context</h3>
        <ShoppingCart />
      </div>
    </CartProvider>
  );
}

/**
useContext - Example 7: Form Context
====================================
*/

const FormContext = createContext();

function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    subscribe: false
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.country) newErrors.country = 'Country required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      subscribe: false
    });
    setErrors({});
  };

  return (
    <FormContext.Provider value={{ formData, errors, updateField, validateForm, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

function FormComponent() {
  const { formData, errors, updateField, validateForm, resetForm } = useContext(FormContext);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (validateForm()) {
      setSubmitted(true);
      setTimeout(() => {
        resetForm();
        setSubmitted(false);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '3px', border: '2px solid #4CAF50' }}>
        <h4>✓ Form submitted successfully!</h4>
        <p>Name: {formData.firstName} {formData.lastName}</p>
        <p>Email: {formData.email}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <input
          type="text"
          value={formData.firstName}
          onChange={e => updateField('firstName', e.target.value)}
          placeholder="First Name"
          style={{ width: '100%', padding: '8px', borderRadius: '3px', border: errors.firstName ? '2px solid #f44336' : '1px solid #ccc', boxSizing: 'border-box' }}
        />
        {errors.firstName && <p style={{ color: '#f44336', fontSize: '12px', margin: '2px 0' }}>{errors.firstName}</p>}
      </div>

      <div>
        <input
          type="text"
          value={formData.lastName}
          onChange={e => updateField('lastName', e.target.value)}
          placeholder="Last Name"
          style={{ width: '100%', padding: '8px', borderRadius: '3px', border: errors.lastName ? '2px solid #f44336' : '1px solid #ccc', boxSizing: 'border-box' }}
        />
        {errors.lastName && <p style={{ color: '#f44336', fontSize: '12px', margin: '2px 0' }}>{errors.lastName}</p>}
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={e => updateField('email', e.target.value)}
          placeholder="Email"
          style={{ width: '100%', padding: '8px', borderRadius: '3px', border: errors.email ? '2px solid #f44336' : '1px solid #ccc', boxSizing: 'border-box' }}
        />
        {errors.email && <p style={{ color: '#f44336', fontSize: '12px', margin: '2px 0' }}>{errors.email}</p>}
      </div>

      <div>
        <select
          value={formData.country}
          onChange={e => updateField('country', e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '3px', border: errors.country ? '2px solid #f44336' : '1px solid #ccc', boxSizing: 'border-box' }}
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>
        {errors.country && <p style={{ color: '#f44336', fontSize: '12px', margin: '2px 0' }}>{errors.country}</p>}
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="checkbox"
          checked={formData.subscribe}
          onChange={e => updateField('subscribe', e.target.checked)}
        />
        Subscribe to newsletter
      </label>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleSubmit}
          style={{ flex: 1, padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Submit
        </button>
        <button 
          onClick={resetForm}
          style={{ flex: 1, padding: '10px', background: '#757575', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export function Example7_FormContext() {
  return (
    <FormProvider>
      <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '15px' }}>
        <h3>Example 7: Form Context</h3>
        <FormComponent />
      </div>
    </FormProvider>
  );
}

/**
All Examples Component
======================
*/
export function UseContextExamples() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>useContext - Practical Examples</h2>
      <Example1_BasicThemeContext />
      <Example2_MultipleContexts />
      <Example3_LanguageContext />
      <Example4_AuthContext />
      <Example5_ModalContext />
      <Example6_ShoppingCartContext />
      <Example7_FormContext />
    </div>
  );
}

export default UseContextExamples;
