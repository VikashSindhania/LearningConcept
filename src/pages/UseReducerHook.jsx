import React, { useReducer, useState } from "react";

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
