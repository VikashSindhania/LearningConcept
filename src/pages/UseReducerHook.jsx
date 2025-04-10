import React, { useReducer, useState, useEffect } from "react";

// Example 1: Basic Counter with useReducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET_VALUE":
      return { count: action.payload };
    default:
      return state;
  }
};

const CounterExample = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Basic Counter with useReducer
      </h3>
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold">{state.count}</span>
        </div>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => dispatch({ type: "DECREMENT" })}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT" })}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Increment
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Centralized state logic</li>
          <li>Predictable state updates</li>
          <li>Action-based state changes</li>
          <li>Easy to test and debug</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Todo List with useReducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoExample = () => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Todo List with useReducer</h3>
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
        <ul className="space-y-2">
          {state.todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Toggle
                </button>
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex state management</li>
          <li>Multiple actions</li>
          <li>Immutable updates</li>
          <li>State normalization</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Form with useReducer
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: "",
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case "RESET":
      return {
        name: "",
        email: "",
        password: "",
        errors: {},
      };
    default:
      return state;
  }
};

const FormExample = () => {
  const [state, dispatch] = useReducer(formReducer, {
    name: "",
    email: "",
    password: "",
    errors: {},
  });

  const validateForm = () => {
    let isValid = true;
    if (!state.name) {
      dispatch({
        type: "SET_ERROR",
        field: "name",
        message: "Name is required",
      });
      isValid = false;
    }
    if (!state.email) {
      dispatch({
        type: "SET_ERROR",
        field: "email",
        message: "Email is required",
      });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      dispatch({
        type: "SET_ERROR",
        field: "email",
        message: "Email is invalid",
      });
      isValid = false;
    }
    if (!state.password) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        message: "Password is required",
      });
      isValid = false;
    } else if (state.password.length < 6) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        message: "Password must be at least 6 characters",
      });
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", state);
      dispatch({ type: "RESET" });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Form with useReducer</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            placeholder="Name"
            className={`w-full p-2 border rounded ${
              state.errors.name ? "border-red-500" : ""
            }`}
          />
          {state.errors.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "email",
                value: e.target.value,
              })
            }
            placeholder="Email"
            className={`w-full p-2 border rounded ${
              state.errors.email ? "border-red-500" : ""
            }`}
          />
          {state.errors.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "password",
                value: e.target.value,
              })
            }
            placeholder="Password"
            className={`w-full p-2 border rounded ${
              state.errors.password ? "border-red-500" : ""
            }`}
          />
          {state.errors.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Form state management</li>
          <li>Validation logic</li>
          <li>Error handling</li>
          <li>Complex state updates</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Shopping Cart with useReducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };
    case "UPDATE_QUANTITY":
      const itemToUpdate = state.items.find(
        (item) => item.id === action.payload.id
      );
      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + itemToUpdate.price * quantityDiff,
      };
    case "APPLY_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
        total: state.total * (1 - action.payload),
      };
    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        discount: 0,
      };
    default:
      return state;
  }
};

const ShoppingCartExample = () => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    discount: 0,
  });

  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Shopping Cart with useReducer
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>
                    {product.name} - ${product.price}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_ITEM", payload: product })
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Cart</h4>
            <div className="space-y-2">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            id: item.id,
                            quantity: parseInt(e.target.value),
                          },
                        })
                      }
                      className="w-16 p-1 border rounded"
                    />
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount:</span>
                <span>{state.discount * 100}%</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${(state.total * (1 - state.discount)).toFixed(2)}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() =>
                    dispatch({ type: "APPLY_DISCOUNT", payload: 0.1 })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Apply 10% Discount
                </button>
                <button
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex state calculations</li>
          <li>Multiple action types</li>
          <li>Derived state</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Authentication with useReducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const AuthExample = () => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    dispatch({ type: "LOGIN_REQUEST" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "test@example.com" && password === "password") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: 1,
            email,
            name: "Test User",
            role: "user",
          },
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleUpdateProfile = () => {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: {
        name: "Updated Name",
        role: "admin",
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Authentication with useReducer
      </h3>
      <div className="space-y-4">
        {state.isAuthenticated ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-100 rounded">
              <h4 className="font-semibold">User Profile</h4>
              <p>Name: {state.user.name}</p>
              <p>Email: {state.user.email}</p>
              <p>Role: {state.user.role}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                defaultValue="test@example.com"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                defaultValue="password"
              />
            </div>
            <button
              type="submit"
              disabled={state.loading}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {state.loading ? "Logging in..." : "Login"}
            </button>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
          </form>
        )}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Async state management</li>
          <li>Error handling</li>
          <li>Loading states</li>
          <li>Complex user flows</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Data Fetching with useReducer
const dataReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case "UPDATE_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "UPDATE_PAGINATION":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

const DataFetchingExample = () => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    loading: false,
    error: null,
    filters: {
      search: "",
      category: "all",
    },
    sort: {
      field: "id",
      direction: "asc",
    },
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const fetchData = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      // Simulate API call with filters, sort, and pagination
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        category: ["A", "B", "C"][i % 3],
        value: Math.floor(Math.random() * 1000),
      }));

      // Apply filters
      let filteredData = mockData;
      if (state.filters.search) {
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(state.filters.search.toLowerCase())
        );
      }
      if (state.filters.category !== "all") {
        filteredData = filteredData.filter(
          (item) => item.category === state.filters.category
        );
      }

      // Apply sort
      filteredData.sort((a, b) => {
        const direction = state.sort.direction === "asc" ? 1 : -1;
        return (a[state.sort.field] > b[state.sort.field] ? 1 : -1) * direction;
      });

      // Apply pagination
      const start = (state.pagination.page - 1) * state.pagination.pageSize;
      const end = start + state.pagination.pageSize;
      const paginatedData = filteredData.slice(start, end);

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          items: paginatedData,
          total: filteredData.length,
        },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, [state.filters, state.sort, state.pagination.page]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Data Fetching with useReducer
      </h3>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={state.filters.search}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FILTER",
                payload: { search: e.target.value },
              })
            }
            className="flex-1 p-2 border rounded"
          />
          <select
            value={state.filters.category}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FILTER",
                payload: { category: e.target.value },
              })
            }
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="A">Category A</option>
            <option value="B">Category B</option>
            <option value="C">Category C</option>
          </select>
          <select
            value={`${state.sort.field}-${state.sort.direction}`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("-");
              dispatch({
                type: "UPDATE_SORT",
                payload: { field, direction },
              });
            }}
            className="p-2 border rounded"
          >
            <option value="id-asc">Sort by ID (Asc)</option>
            <option value="id-desc">Sort by ID (Desc)</option>
            <option value="name-asc">Sort by Name (Asc)</option>
            <option value="name-desc">Sort by Name (Desc)</option>
            <option value="value-asc">Sort by Value (Asc)</option>
            <option value="value-desc">Sort by Value (Desc)</option>
          </select>
        </div>

        {state.loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : state.error ? (
          <div className="text-red-500 text-center py-4">{state.error}</div>
        ) : (
          <div className="space-y-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Value</th>
                </tr>
              </thead>
              <tbody>
                {state.data.items?.map((item) => (
                  <tr key={item.id}>
                    <td className="p-2 border">{item.id}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.category}</td>
                    <td className="p-2 border">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div>
                Showing{" "}
                {(state.pagination.page - 1) * state.pagination.pageSize + 1} to{" "}
                {Math.min(
                  state.pagination.page * state.pagination.pageSize,
                  state.data.total
                )}{" "}
                of {state.data.total} items
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_PAGINATION",
                      payload: { page: state.pagination.page - 1 },
                    })
                  }
                  disabled={state.pagination.page === 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_PAGINATION",
                      payload: { page: state.pagination.page + 1 },
                    })
                  }
                  disabled={
                    state.pagination.page * state.pagination.pageSize >=
                    state.data.total
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex data fetching</li>
          <li>Filtering and sorting</li>
          <li>Pagination</li>
          <li>Loading states</li>
        </ul>
      </div>
    </div>
  );
};

const UseReducerHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Understanding useReducer</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            useReducer is a React hook that helps manage complex state logic in
            your components. It's particularly useful when you have state that
            involves multiple sub-values or when the next state depends on the
            previous one.
          </p>
        </div>

        <div className="space-y-8">
          <CounterExample />
          <TodoExample />
          <FormExample />

          {/* Advanced Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-8">
              <ShoppingCartExample />
              <AuthExample />
              <DataFetchingExample />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            When to Use useReducer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Complex state logic</li>
                <li>Multiple sub-values</li>
                <li>Next state depends on previous</li>
                <li>Shared state logic</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Keep reducers pure</li>
                <li>Use action types</li>
                <li>Handle all cases</li>
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
                <li>Predictable state updates</li>
                <li>Centralized logic</li>
                <li>Easier testing</li>
                <li>Better debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>More boilerplate</li>
                <li>Learning curve</li>
                <li>Overhead for simple state</li>
                <li>Complexity management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseReducerHook;
