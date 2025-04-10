import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
} from "react";

// Example 1: Basic Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  console.log("ThemedButton rendered");

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded ${
        theme === "dark"
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      Toggle Theme
    </button>
  );
};

const ThemedContent = () => {
  const { theme } = useContext(ThemeContext);
  console.log("ThemedContent rendered");

  return (
    <div
      className={`p-4 rounded ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      <h3 className="text-lg font-semibold">Current Theme: {theme}</h3>
      <p className="mt-2">This content changes based on the theme context.</p>
    </div>
  );
};

const BasicExample = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Basic Context</h3>
      <div className="space-y-4">
        <ThemedButton />
        <ThemedContent />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Context creation and provider</li>
          <li>Context consumption with useContext</li>
          <li>State sharing across components</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Nested Context
const UserContext = createContext();
const SettingsContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Developer",
  });

  const updateUser = useCallback((newUser) => {
    setUser((prev) => ({ ...prev, ...newUser }));
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    notifications: true,
    language: "en",
  });

  const updateSettings = useCallback((newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

const UserProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  console.log("UserProfile rendered");

  return (
    <div className="p-4 bg-blue-100 rounded">
      <h4 className="font-semibold">User Profile</h4>
      <div className="mt-2 space-y-2">
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <button
          onClick={() =>
            updateUser({
              role: user.role === "Developer" ? "Manager" : "Developer",
            })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Toggle Role
        </button>
      </div>
    </div>
  );
};

const UserSettings = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  console.log("UserSettings rendered");

  return (
    <div className="p-4 bg-green-100 rounded">
      <h4 className="font-semibold">User Settings</h4>
      <div className="mt-2 space-y-2">
        <div className="flex items-center">
          <span className="mr-2">Notifications:</span>
          <button
            onClick={() =>
              updateSettings({ notifications: !settings.notifications })
            }
            className={`px-3 py-1 rounded text-sm ${
              settings.notifications ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            {settings.notifications ? "Enabled" : "Disabled"}
          </button>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Language:</span>
          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="p-1 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const NestedContextExample = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Nested Context</h3>
      <div className="space-y-4">
        <UserProvider>
          <SettingsProvider>
            <UserProfile />
            <UserSettings />
          </SettingsProvider>
        </UserProvider>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Multiple context providers</li>
          <li>Nested context consumption</li>
          <li>State management across contexts</li>
          <li>Performance considerations</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Complex Context with Actions
const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const filteredTodos = useCallback(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos(),
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);
  console.log("TodoList rendered");

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-2 bg-gray-100 rounded"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const TodoControls = () => {
  const { filter, setFilter, addTodo } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

const ComplexContextExample = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Complex Context with Actions
      </h3>
      <div className="space-y-4">
        <TodoProvider>
          <TodoControls />
          <TodoList />
        </TodoProvider>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex state management</li>
          <li>Action handlers in context</li>
          <li>Filtered state</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Context with Custom Hook and Performance Optimization
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate checking for existing session/token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking for existing session
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // For demo purposes, we'll start with no user
        setUser(null);
      } catch (err) {
        setError("Failed to check authentication status");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (credentials.email && credentials.password) {
        setUser({ id: 1, name: "John Doe", role: "admin" });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
      isAuthenticated: !!user,
      hasRole: (role) => user?.role === role,
    }),
    [user, loading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthExample = () => {
  const { user, loading, error, login, logout, isAuthenticated, hasRole } =
    useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced Auth Context</h3>
      <div className="space-y-4">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : isAuthenticated ? (
          <div className="space-y-2">
            <p>Welcome, {user.name}!</p>
            <p>Role: {user.role}</p>
            <p>Admin Access: {hasRole("admin") ? "Yes" : "No"}</p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Advanced Example 2: Context with Reducer Pattern
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: Date.now() }],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.items.reduce(
          (sum, item) => (item.id === action.payload ? sum : sum + item.price),
          0
        ),
      };
    case "CLEAR_CART":
      return { items: [], total: 0 };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      addItem,
      removeItem,
      clearCart,
    }),
    [state, addItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const CartExample = () => {
  const { items, total, addItem, removeItem, clearCart } =
    useContext(CartContext);
  const [newItem, setNewItem] = useState({ name: "", price: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price > 0) {
      addItem(newItem);
      setNewItem({ name: "", price: 0 });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced Cart Context</h3>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Item name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Item
          </button>
        </form>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded"
            >
              <span>
                {item.name} - ${item.price}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total: ${total}</span>
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Advanced Example 3: Context with Middleware Pattern
const LoggerContext = createContext();

const withLogger = (WrappedComponent) => {
  return (props) => {
    const log = (message, data) => {
      console.log(`[${new Date().toISOString()}] ${message}`, data);
    };

    return <WrappedComponent {...props} log={log} />;
  };
};

const LoggerProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = useCallback((message, data) => {
    const timestamp = new Date().toISOString();
    setLogs((prev) => [...prev, { timestamp, message, data }]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const value = useMemo(
    () => ({
      logs,
      addLog,
      clearLogs,
    }),
    [logs, addLog, clearLogs]
  );

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

const LoggerExample = () => {
  const { logs, addLog, clearLogs } = useContext(LoggerContext);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      addLog("User Message", { text: message });
      setMessage("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced Logger Context</h3>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter log message"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Log
          </button>
        </form>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="p-2 bg-gray-100 rounded text-sm">
              <span className="text-gray-500">{log.timestamp}</span>
              <p className="font-semibold">{log.message}</p>
              <pre className="text-gray-600">
                {JSON.stringify(log.data, null, 2)}
              </pre>
            </div>
          ))}
        </div>
        <button
          onClick={clearLogs}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Clear Logs
        </button>
      </div>
    </div>
  );
};

const UseContextHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Understanding useContext</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            useContext is a React hook that allows you to consume values from a
            context. It's particularly useful for sharing state and functions
            across multiple components without prop drilling.
          </p>
        </div>

        <div className="space-y-8">
          <ThemeProvider>
            <BasicExample />
          </ThemeProvider>
          <NestedContextExample />
          <ComplexContextExample />

          {/* Advanced Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-8">
              <AuthProvider>
                <AuthExample />
              </AuthProvider>
              <CartProvider>
                <CartExample />
              </CartProvider>
              <LoggerProvider>
                <LoggerExample />
              </LoggerProvider>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            When to Use useContext
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Theme management</li>
                <li>User authentication</li>
                <li>Global state</li>
                <li>Configuration settings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Keep contexts focused</li>
                <li>Use multiple contexts</li>
                <li>Optimize re-renders</li>
                <li>Consider performance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            Performance Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Benefits</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Reduces prop drilling</li>
                <li>Simplifies state management</li>
                <li>Improves code organization</li>
                <li>Enables global access</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Potential re-render issues</li>
                <li>Context nesting complexity</li>
                <li>Testing challenges</li>
                <li>Debugging complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseContextHook;
