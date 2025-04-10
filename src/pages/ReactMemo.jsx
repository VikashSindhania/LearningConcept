import React, { useState, useCallback, useContext } from "react";

// Example 1: Basic React.memo
const RegularComponent = ({ count }) => {
  console.log("RegularComponent rendered");
  return <div className="p-4 bg-blue-100 rounded">Count: {count}</div>;
};

const MemoizedComponent = React.memo(({ count }) => {
  console.log("MemoizedComponent rendered");
  return <div className="p-4 bg-green-100 rounded">Count: {count}</div>;
});

const BasicExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Basic React.memo</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Other State
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Regular Component</h4>
            <RegularComponent count={count} />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Memoized Component</h4>
            <MemoizedComponent count={count} />
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Prevents unnecessary re-renders</li>
          <li>Shallow prop comparison</li>
          <li>Performance optimization</li>
          <li>Component memoization</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Custom Comparison Function
const UserProfile = React.memo(
  ({ user }) => {
    console.log("UserProfile rendered");
    return (
      <div className="p-4 bg-purple-100 rounded">
        <h4 className="font-semibold">{user.name}</h4>
        <p className="text-gray-600">Age: {user.age}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return (
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.age === nextProps.user.age
    );
  }
);

const CustomComparisonExample = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    age: 30,
    role: "Developer",
  });
  const [otherState, setOtherState] = useState(0);

  const updateUser = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      role: prev.role === "Developer" ? "Manager" : "Developer",
    }));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Custom Comparison Function</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={updateUser}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Update User Role
          </button>
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Other State
          </button>
        </div>
        <UserProfile user={user} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Custom prop comparison</li>
          <li>Selective re-rendering</li>
          <li>Performance control</li>
          <li>Deep comparison control</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Complex Props
const ComplexComponent = React.memo(({ data, onUpdate }) => {
  console.log("ComplexComponent rendered");
  return (
    <div className="p-4 bg-yellow-100 rounded">
      <h4 className="font-semibold">Complex Data</h4>
      <pre className="text-sm overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={onUpdate}
        className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Update Data
      </button>
    </div>
  );
});

const ComplexPropsExample = () => {
  const [data, setData] = useState({
    items: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: Math.random() * 100,
    })),
  });
  const [otherState, setOtherState] = useState(0);

  const handleUpdate = useCallback(() => {
    setData((prev) => ({
      items: prev.items.map((item) => ({
        ...item,
        value: Math.random() * 100,
      })),
    }));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex Props</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Other State
          </button>
        </div>
        <ComplexComponent data={data} onUpdate={handleUpdate} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex object props</li>
          <li>Callback memoization</li>
          <li>Deep prop comparison</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Nested Memoization
const NestedItem = React.memo(({ item, onUpdate }) => {
  console.log(`NestedItem ${item.id} rendered`);
  return (
    <div className="p-2 bg-indigo-100 rounded mb-2">
      <div className="flex justify-between items-center">
        <span>Item {item.id}</span>
        <button
          onClick={() => onUpdate(item.id)}
          className="bg-indigo-500 text-white px-2 py-1 rounded text-sm"
        >
          Update
        </button>
      </div>
    </div>
  );
});

const NestedList = React.memo(({ items, onItemUpdate }) => {
  console.log("NestedList rendered");
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <NestedItem key={item.id} item={item} onUpdate={onItemUpdate} />
      ))}
    </div>
  );
});

const NestedMemoizationExample = () => {
  const [items, setItems] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      value: Math.random() * 100,
    }))
  );
  const [otherState, setOtherState] = useState(0);

  const handleItemUpdate = useCallback((itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, value: Math.random() * 100 } : item
      )
    );
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Nested Memoization</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Other State
          </button>
        </div>
        <NestedList items={items} onItemUpdate={handleItemUpdate} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Nested component memoization</li>
          <li>Granular re-render control</li>
          <li>Callback optimization</li>
          <li>Performance in complex hierarchies</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Context with Memo
const ThemeContext = React.createContext();

const ThemedButton = React.memo(({ onClick }) => {
  const theme = useContext(ThemeContext);
  console.log("ThemedButton rendered");
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        theme === "dark"
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      }`}
    >
      Toggle Theme
    </button>
  );
});

const ContextMemoExample = () => {
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(0);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Context with Memo</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
        </div>
        <ThemeContext.Provider value={theme}>
          <div
            className={`p-4 rounded ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
            }`}
          >
            <ThemedButton onClick={toggleTheme} />
            <p className="mt-4">Count: {count}</p>
          </div>
        </ThemeContext.Provider>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Context optimization</li>
          <li>Selective re-rendering</li>
          <li>Theme management</li>
          <li>Performance with context</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Complex List with Virtualization
const VirtualizedItem = React.memo(({ index, style, data }) => {
  console.log(`VirtualizedItem ${index} rendered`);
  return (
    <div
      style={{
        ...style,
        padding: "8px",
        marginBottom: "4px",
        boxSizing: "border-box",
      }}
      className="bg-teal-100 rounded"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">Item {index}</span>
        <span className="text-gray-600">
          Value: {data[index].value.toFixed(2)}
        </span>
      </div>
    </div>
  );
});

const VirtualizedList = React.memo(({ data, height, itemHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(height / itemHeight),
    data.length
  );

  const visibleItems = data.slice(startIndex, endIndex);

  return (
    <div
      style={{
        height,
        overflow: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        backgroundColor: "white",
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: data.length * itemHeight,
          position: "relative",
        }}
      >
        {visibleItems.map((_, index) => (
          <VirtualizedItem
            key={startIndex + index}
            index={startIndex + index}
            style={{
              position: "absolute",
              top: (startIndex + index) * itemHeight,
              width: "100%",
              height: itemHeight - 4, // Subtracting margin
              padding: "0 8px",
            }}
            data={data}
          />
        ))}
      </div>
    </div>
  );
});

const VirtualizationExample = () => {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      value: Math.random() * 1000,
    }))
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Virtualized List</h3>
      <div className="space-y-4">
        <VirtualizedList data={items} height={400} itemHeight={48} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Virtual scrolling</li>
          <li>Performance with large lists</li>
          <li>Memory optimization</li>
          <li>Render window management</li>
        </ul>
      </div>
    </div>
  );
};

const ReactMemo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Understanding React.memo</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            React.memo is a higher-order component that memoizes the rendered
            output of a component, preventing unnecessary re-renders when props
            haven't changed. It's particularly useful for optimizing performance
            in React applications.
          </p>
        </div>

        <div className="space-y-8">
          <BasicExample />
          <CustomComparisonExample />
          <ComplexPropsExample />

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Advanced Examples
            </h2>
            <div className="space-y-8">
              <NestedMemoizationExample />
              <ContextMemoExample />
              <VirtualizationExample />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            When to Use React.memo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Pure functional components</li>
                <li>Frequent re-renders</li>
                <li>Complex prop objects</li>
                <li>Performance bottlenecks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Profile before optimizing</li>
                <li>Use with stable props</li>
                <li>Consider prop complexity</li>
                <li>Balance performance vs. memory</li>
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
                <li>Reduces unnecessary renders</li>
                <li>Improves performance</li>
                <li>Optimizes complex components</li>
                <li>Better user experience</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Memory overhead</li>
                <li>Prop comparison cost</li>
                <li>Complexity in debugging</li>
                <li>Potential over-optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactMemo;
