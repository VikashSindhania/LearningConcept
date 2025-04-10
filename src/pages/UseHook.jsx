import React, {
  useState,
  Suspense,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from "react";

// Simulated API functions
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      });
    }, 1000);
  });
};

const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" },
      ]);
    }, 1500);
  });
};

// Example 1: Basic Promise Example
const PromiseExample = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchUserData().then((data) => {
      setUserData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading user data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Basic Promise Example</h3>
      <div className="space-y-2">
        <p className="text-gray-600">Name: {userData.name}</p>
        <p className="text-gray-600">Email: {userData.email}</p>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Promise handling with useEffect</li>
          <li>Loading state management</li>
          <li>Clean data access</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Nested Promise Example
const NestedPromiseExample = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    Promise.all([fetchUserData(), fetchPosts()]).then(([user, postsData]) => {
      setUserData(user);
      setPosts(postsData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-gray-600">Loading data...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Nested Promise Example</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">User Info:</h4>
          <p className="text-gray-600">Name: {userData.name}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Posts:</h4>
          <ul className="space-y-2">
            {posts.map((post) => (
              <li key={post.id} className="p-2 bg-gray-50 rounded">
                {post.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Multiple promise handling</li>
          <li>Parallel data fetching</li>
          <li>Loading state management</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Theme Context Example
const ThemeContext = React.createContext("light");

const ThemeExample = () => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Theme Context Example</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              theme === "light" ? "bg-yellow-500" : "bg-gray-800"
            }`}
          />
          <span>Current Theme: {theme}</span>
        </div>
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Toggle Theme
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Theme state management</li>
          <li>UI updates</li>
          <li>State persistence</li>
        </ul>
      </div>
    </div>
  );
};

// Example 4: Error Handling Example
const ErrorExample = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWithError = () => {
    setLoading(true);
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Failed to fetch data"));
      }, 1000);
    });
  };

  const handleError = async () => {
    try {
      setError(null);
      setLoading(true);
      await fetchWithError();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Error Handling Example</h3>
      <div className="space-y-4">
        <button
          onClick={handleError}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Trigger Error"}
        </button>
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Error handling patterns</li>
          <li>Loading state management</li>
          <li>User feedback</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Custom Hook for Data Fetching
const useDataFetching = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchCount, setRefetchCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, refetchCount, JSON.stringify(options)]);

  const refetch = () => setRefetchCount((prev) => prev + 1);

  return { data, loading, error, refetch };
};

const CustomHookExample = () => {
  const { data, loading, error, refetch } = useDataFetching(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Custom Hook Example</h3>
      <div className="space-y-4">
        <button
          onClick={refetch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Refetch Data"}
        </button>
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}
        {data && (
          <div className="p-4 bg-gray-50 rounded">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Custom hook creation</li>
          <li>Abort controller for cleanup</li>
          <li>Error handling</li>
          <li>Refetch capability</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Complex State Management with useReducer
const initialState = {
  todos: [],
  filter: "all",
  loading: false,
  error: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, todos: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

const ComplexStateExample = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data.slice(0, 5) });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "completed") return todo.completed;
    if (state.filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex State Management</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => dispatch({ type: "SET_FILTER", payload: "all" })}
            className={`px-3 py-1 rounded ${
              state.filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => dispatch({ type: "SET_FILTER", payload: "active" })}
            className={`px-3 py-1 rounded ${
              state.filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: "completed" })
            }
            className={`px-3 py-1 rounded ${
              state.filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
        {state.loading && <div className="text-gray-600">Loading...</div>}
        {state.error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            Error: {state.error}
          </div>
        )}
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
                className="rounded"
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>useReducer for complex state</li>
          <li>Action creators pattern</li>
          <li>State filtering</li>
          <li>Optimistic updates</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Performance Optimization with useMemo and useCallback
const PerformanceExample = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const expensiveComputation = useMemo(() => {
    console.log("Performing expensive computation...");
    return items.map((item) => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString(),
    }));
  }, [items]);

  const handleAddItem = useCallback(() => {
    setItems((prev) => [...prev, { id: Date.now(), value: Math.random() }]);
  }, []);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Item
          </button>
          <button
            onClick={handleIncrement}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count ({count})
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h4 className="font-semibold mb-2">Processed Items:</h4>
          <ul className="space-y-2">
            {expensiveComputation.map((item) => (
              <li key={item.id} className="text-sm">
                ID: {item.id} | Value: {item.value} | Processed:{" "}
                {item.processed.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>useMemo for expensive computations</li>
          <li>useCallback for function memoization</li>
          <li>Performance optimization</li>
          <li>Render optimization</li>
        </ul>
      </div>
    </div>
  );
};

const UseHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Understanding Promise and Context Handling
        </h1>
        <p className="text-center text-gray-600 mb-8">
          This component demonstrates various ways to handle promises and
          context in React, showing different patterns for data fetching, state
          management, and error handling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromiseExample />
          <NestedPromiseExample />
          <ThemeExample />
          <ErrorExample />
        </div>

        <h2 className="text-2xl font-semibold mt-12 mb-6">Advanced Examples</h2>
        <div className="grid grid-cols-1 gap-8">
          <CustomHookExample />
          <ComplexStateExample />
          <PerformanceExample />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Feature Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Basic Usage</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Promise handling</li>
                <li>State management</li>
                <li>Loading states</li>
                <li>Clean data access</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Advanced Patterns</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Multiple promises</li>
                <li>Error handling</li>
                <li>Context providers</li>
                <li>Loading states</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Error handling</li>
                <li>Loading state management</li>
                <li>State organization</li>
                <li>Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Data Fetching</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>API calls</li>
                <li>Data loading</li>
                <li>Resource management</li>
                <li>Cache handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">State Management</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Theme switching</li>
                <li>User preferences</li>
                <li>Global state</li>
                <li>UI state</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseHook;
