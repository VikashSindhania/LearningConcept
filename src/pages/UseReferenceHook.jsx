import React, { useState, useRef, useEffect, useCallback } from "react";

// Example 1: Basic DOM Reference
const FocusInput = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Basic DOM Reference</h3>
      <div className="space-y-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Click button to focus"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Focus Input
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Accessing DOM elements</li>
          <li>Imperative DOM manipulation</li>
          <li>Focus management</li>
          <li>No re-renders on ref changes</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Previous Value Tracking
const CounterWithPrevious = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef(0);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Previous Value Tracking</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg">Current Count: {count}</span>
          <span className="text-lg text-gray-600">
            Previous Count: {prevCountRef.current}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Increment
          </button>
          <button
            onClick={() => setCount((prev) => prev - 1)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Decrement
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Tracking previous values</li>
          <li>Value persistence across renders</li>
          <li>No re-render triggers</li>
          <li>State comparison</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Interval Management
const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Interval Management</h3>
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold">{time}</span>
          <span className="text-gray-600 ml-2">seconds</span>
        </div>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            disabled={!isRunning}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Interval management</li>
          <li>Cleanup on unmount</li>
          <li>State persistence</li>
          <li>Resource management</li>
        </ul>
      </div>
    </div>
  );
};

// Example 4: Form Validation
const FormValidation = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
      emailRef.current.focus();
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      emailRef.current.focus();
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      if (!newErrors.email) passwordRef.current.focus();
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      if (!newErrors.email) passwordRef.current.focus();
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Form Validation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            ref={emailRef}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            ref={passwordRef}
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
          <li>Form validation</li>
          <li>Focus management</li>
          <li>Error handling</li>
          <li>User experience</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Custom Hook with useRef
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AdvancedHooksExample = () => {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const previousCount = usePrevious(count);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced Custom Hooks</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Previous Value Hook</h4>
          <div className="flex items-center space-x-4">
            <span className="text-lg">Current: {count}</span>
            <span className="text-lg text-gray-600">
              Previous: {previousCount}
            </span>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Increment
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Debounce Hook</h4>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to see debounce..."
            className="w-full p-2 border rounded"
          />
          <p className="text-gray-600">
            Debounced Value: {debouncedSearchTerm}
          </p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Custom hook composition</li>
          <li>Resource cleanup</li>
          <li>Performance optimization</li>
          <li>Reusable logic</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Animation with useRef
const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

const AnimationExample = () => {
  const [position, setPosition] = useState(0);
  const boxRef = useRef(null);

  useAnimationFrame((deltaTime) => {
    setPosition((prev) => {
      const newPosition = prev + deltaTime * 0.1;
      return newPosition > 300 ? 0 : newPosition;
    });
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Animation with useRef</h3>
      <div className="space-y-4">
        <div
          ref={boxRef}
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "blue",
            transform: `translateX(${position}px)`,
            transition: "transform 0.1s linear",
          }}
        />
        <p className="text-gray-600">Position: {Math.round(position)}px</p>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Animation frame management</li>
          <li>Performance optimization</li>
          <li>Resource cleanup</li>
          <li>Smooth animations</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Complex Form with useRef
const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});
  const firstErrorRef = useRef(null);

  const validateField = useCallback(
    (name, value) => {
      const rules = validationRules[name];
      if (!rules) return true;

      for (const rule of rules) {
        if (!rule.validate(value)) {
          return rule.message;
        }
      }
      return true;
    },
    [validationRules]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    let firstError = null;

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error !== true) {
        newErrors[name] = error;
        if (!firstError) {
          firstError = name;
        }
      }
    });

    setErrors(newErrors);
    if (firstError && fieldRefs.current[firstError]) {
      fieldRefs.current[firstError].focus();
    }
    firstErrorRef.current = firstError;

    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const registerField = useCallback((name, ref) => {
    fieldRefs.current[name] = ref;
  }, []);

  return {
    formData,
    errors,
    validateForm,
    registerField,
    setFormData,
    firstError: firstErrorRef.current,
  };
};

const ComplexFormExample = () => {
  const validationRules = {
    username: [
      {
        validate: (value) => value.length >= 3,
        message: "Username must be at least 3 characters",
      },
    ],
    email: [
      {
        validate: (value) => /\S+@\S+\.\S+/.test(value),
        message: "Email is invalid",
      },
    ],
    password: [
      {
        validate: (value) => value.length >= 6,
        message: "Password must be at least 6 characters",
      },
      {
        validate: (value) => /[A-Z]/.test(value),
        message: "Password must contain at least one uppercase letter",
      },
    ],
  };

  const { formData, errors, validateForm, registerField, setFormData } =
    useFormValidation(
      {
        username: "",
        email: "",
        password: "",
      },
      validationRules
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex Form Validation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            ref={(ref) => registerField("username", ref)}
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="Username"
            className={`w-full p-2 border rounded ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <input
            ref={(ref) => registerField("email", ref)}
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <input
            ref={(ref) => registerField("password", ref)}
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
          <li>Complex form validation</li>
          <li>Dynamic field registration</li>
          <li>Focus management</li>
          <li>Reusable validation logic</li>
        </ul>
      </div>
    </div>
  );
};

const UseReferenceHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Understanding useRef</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            useRef is a React hook that allows you to create a mutable reference
            that persists across renders without causing re-renders. It's
            commonly used for accessing DOM elements and storing values that
            don't need to trigger re-renders.
          </p>
        </div>

        <div className="space-y-8">
          <FocusInput />
          <CounterWithPrevious />
          <Timer />
          <FormValidation />

          {/* Advanced Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-8">
              <AdvancedHooksExample />
              <AnimationExample />
              <ComplexFormExample />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">When to Use useRef</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Accessing DOM elements</li>
                <li>Storing previous values</li>
                <li>Managing intervals/timeouts</li>
                <li>Form validation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Use for mutable values</li>
                <li>Clean up resources</li>
                <li>Avoid unnecessary refs</li>
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
                <li>No re-renders on changes</li>
                <li>Direct DOM access</li>
                <li>Value persistence</li>
                <li>Resource management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Imperative code</li>
                <li>Memory management</li>
                <li>Testing complexity</li>
                <li>Debugging challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseReferenceHook;
