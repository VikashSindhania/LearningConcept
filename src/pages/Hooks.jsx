import React, { useState } from "react";

const Hooks = () => {
  // Example 1: Counter without useState
  const CounterWithoutHook = () => {
    let count = 0;

    const increment = () => {
      count += 1;
      console.log("Count:", count); // This won't update the UI
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Counter Without useState</h3>
        <p className="text-gray-600 mb-4">
          Count: {count} (This won't update when you click)
        </p>
        <button
          onClick={increment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Problems:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>UI doesn't update when count changes</li>
            <li>State is lost on re-render</li>
            <li>No way to trigger re-renders</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 2: Counter with useState
  const CounterWithHook = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
      setCount(count + 1);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Counter With useState</h3>
        <p className="text-gray-600 mb-4">Count: {count}</p>
        <button
          onClick={increment}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Increment
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Benefits:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>UI updates automatically</li>
            <li>State persists between re-renders</li>
            <li>Simple and clean code</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 3: Form with multiple states
  const FormWithMultipleStates = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      age: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Form with Multiple States
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Current State:</h4>
          <pre className="bg-gray-800 text-white p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  // Example 4: Toggle with useState
  const ToggleExample = () => {
    const [isOn, setIsOn] = useState(false);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Toggle Example</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsOn(!isOn)}
            className={`px-4 py-2 rounded ${
              isOn ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {isOn ? "ON" : "OFF"}
          </button>
          <span className="text-gray-600">
            Status: {isOn ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Simple boolean state management</li>
            <li>Clean toggle logic</li>
            <li>Conditional rendering</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 5: Advanced Form with Validation
  const AdvancedForm = () => {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
      const newErrors = {};
      if (!formData.username) newErrors.username = "Username is required";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords don't match";
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Advanced Form with Validation
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              className={`w-full p-2 border rounded ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className={`w-full p-2 border rounded ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className={`w-full p-2 border rounded ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    );
  };

  // Example 6: Todo List with Complex State
  const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [filter, setFilter] = useState("all");

    const addTodo = () => {
      if (newTodo.trim()) {
        setTodos((prev) => [
          ...prev,
          { id: Date.now(), text: newTodo, completed: false },
        ]);
        setNewTodo("");
      }
    };

    const toggleTodo = (id) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    const filteredTodos = todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    });

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Todo List</h3>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 p-2 border rounded-l"
            placeholder="Add new todo"
          />
          <button
            onClick={addTodo}
            className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <div className="flex space-x-2 mb-4">
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
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center space-x-2 p-2 border rounded"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Example 7: Custom Hook Example
  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    };

    return [storedValue, setValue];
  };

  const LocalStorageExample = () => {
    const [name, setName] = useLocalStorage("name", "");

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Local Storage with Custom Hook
        </h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter your name"
        />
        <p className="mt-2 text-gray-600">
          Your name is persisted in localStorage: {name || "Not set"}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Understanding useState Hook
        </h1>
        <p className="text-center text-gray-600 mb-8">
          The useState hook is one of the most important hooks in React,
          following the Pareto Principle - with just 20% of the learning effort,
          you can achieve 80% of React's state management capabilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CounterWithoutHook />
          <CounterWithHook />
          <FormWithMultipleStates />
          <ToggleExample />
          <AdvancedForm />
          <TodoList />
          <LocalStorageExample />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            useState Feature Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Basic Features</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Simple state management</li>
                <li>Automatic re-renders</li>
                <li>Initial value support</li>
                <li>State updates are batched</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Advanced Features</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Functional updates</li>
                <li>Lazy initialization</li>
                <li>State persistence</li>
                <li>Custom hooks creation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Keep state minimal</li>
                <li>Use multiple useState calls</li>
                <li>Consider useReducer for complex state</li>
                <li>Memoize expensive computations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Form Handling</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Input field values</li>
                <li>Form validation</li>
                <li>Form submission state</li>
                <li>Error messages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">UI State</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Modal visibility</li>
                <li>Loading states</li>
                <li>Toggle switches</li>
                <li>Accordion panels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hooks;
