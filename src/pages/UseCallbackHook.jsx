import React, { useState, useCallback, memo, useMemo } from "react";

// Example 1: Basic useCallback
const CounterButton = memo(({ onClick, label }) => {
  console.log(`Rendering ${label}`);
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
});

const BasicExample = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // Without useCallback - function is recreated on every render
  const incrementWithoutCallback = () => {
    setCount(count + 1);
  };

  // With useCallback - function is memoized
  const incrementWithCallback = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Basic useCallback</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg">Count: {count}</span>
          <CounterButton
            onClick={incrementWithoutCallback}
            label="Increment (No Callback)"
          />
          <CounterButton
            onClick={incrementWithCallback}
            label="Increment (With Callback)"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg">Other State: {otherState}</span>
          <button
            onClick={() => setOtherState((prev) => prev + 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Update Other State
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Function memoization</li>
          <li>Preventing unnecessary re-renders</li>
          <li>Dependency array usage</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: useCallback with Event Handlers
const SearchInput = memo(({ onSearch }) => {
  console.log("SearchInput rendered");
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search..."
      className="w-full p-2 border rounded"
    />
  );
});

const DebouncedSearch = memo(({ onSearch }) => {
  console.log("DebouncedSearch rendered");
  const [value, setValue] = useState("");

  const debouncedSearch = useCallback(
    (searchValue) => {
      setValue(searchValue);
      // Simulate debounce
      setTimeout(() => {
        onSearch(searchValue);
      }, 300);
    },
    [onSearch]
  );

  return (
    <input
      type="text"
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Debounced Search..."
      className="w-full p-2 border rounded"
    />
  );
});

const EventHandlerExample = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedResults, setDebouncedResults] = useState([]);

  const handleSearch = useCallback((query) => {
    console.log("Searching for:", query);
    // Simulate search results
    setSearchResults([`Result 1 for ${query}`, `Result 2 for ${query}`]);
  }, []);

  const handleDebouncedSearch = useCallback((query) => {
    console.log("Debounced search for:", query);
    // Simulate debounced search results
    setDebouncedResults([
      `Debounced result 1 for ${query}`,
      `Debounced result 2 for ${query}`,
    ]);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">
        Event Handlers with useCallback
      </h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Regular Search</h4>
          <SearchInput onSearch={handleSearch} />
          <div className="space-y-1">
            {searchResults.map((result, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {result}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Debounced Search</h4>
          <DebouncedSearch onSearch={handleDebouncedSearch} />
          <div className="space-y-1">
            {debouncedResults.map((result, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                {result}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Event handler memoization</li>
          <li>Debounced function creation</li>
          <li>Preventing unnecessary re-renders</li>
          <li>Performance optimization</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Complex useCallback with Dependencies
const ComplexComponent = memo(({ data, onUpdate }) => {
  console.log("ComplexComponent rendered");
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
            onClick={() => onUpdate(index)}
          >
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
});

const ComplexExample = () => {
  const [data, setData] = useState([
    { title: "Item 1", description: "Description 1" },
    { title: "Item 2", description: "Description 2" },
    { title: "Item 3", description: "Description 3" },
  ]);
  const [filter, setFilter] = useState("all");

  const filteredData = useCallback(() => {
    console.log("Filtering data");
    return data.filter((item) => {
      if (filter === "all") return true;
      return item.title.includes(filter);
    });
  }, [data, filter]);

  const handleUpdate = useCallback((index) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, description: `Updated ${item.description}` }
          : item
      )
    );
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex useCallback</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter items..."
            className="flex-1 p-2 border rounded"
          />
        </div>
        <ComplexComponent data={filteredData()} onUpdate={handleUpdate} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex dependency management</li>
          <li>Memoized data transformations</li>
          <li>Event handler optimization</li>
          <li>Performance with large datasets</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Custom Hook with useCallback
const useDataFetching = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

const DataFetchingExample = () => {
  const [url, setUrl] = useState(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const { data, loading, error, refetch } = useDataFetching(url);

  const handleUrlChange = useCallback((e) => {
    setUrl(e.target.value);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Advanced Data Fetching</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="flex-1 p-2 border rounded"
            placeholder="Enter API URL"
          />
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Refetch
          </button>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : data ? (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        ) : null}
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Custom hook composition</li>
          <li>Memoized API calls</li>
          <li>Error handling</li>
          <li>Loading states</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Complex State Management with useCallback
const useComplexState = (initialState) => {
  const [state, setState] = useState(initialState);

  const updateState = useCallback((updates) => {
    setState((prev) => ({
      ...prev,
      ...(typeof updates === "function" ? updates(prev) : updates),
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const stateWithActions = useMemo(
    () => ({
      ...state,
      updateState,
      resetState,
    }),
    [state, updateState, resetState]
  );

  return stateWithActions;
};

const ComplexStateExample = () => {
  const user = useComplexState({
    name: "",
    age: 0,
    preferences: {
      theme: "light",
      notifications: true,
    },
  });

  const handleNameChange = useCallback(
    (e) => {
      user.updateState({ name: e.target.value });
    },
    [user]
  );

  const handleAgeChange = useCallback(
    (e) => {
      user.updateState({ age: Number(e.target.value) });
    },
    [user]
  );

  const toggleTheme = useCallback(() => {
    user.updateState((prev) => ({
      preferences: {
        ...prev.preferences,
        theme: prev.preferences.theme === "light" ? "dark" : "light",
      },
    }));
  }, [user]);

  const toggleNotifications = useCallback(() => {
    user.updateState((prev) => ({
      preferences: {
        ...prev.preferences,
        notifications: !prev.preferences.notifications,
      },
    }));
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex State Management</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={user.age}
            onChange={handleAgeChange}
            placeholder="Age"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded"
          >
            Toggle Theme ({user.preferences.theme})
          </button>
          <button
            onClick={toggleNotifications}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded"
          >
            Toggle Notifications (
            {user.preferences.notifications ? "On" : "Off"})
          </button>
        </div>
        <button
          onClick={user.resetState}
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset State
        </button>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex state updates</li>
          <li>Nested state management</li>
          <li>Memoized state actions</li>
          <li>State reset functionality</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Performance Optimization with useCallback
const useOptimizedList = (items, options = {}) => {
  const { filterFn, sortFn, pageSize = 10 } = options;
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    return items.filter(filterFn || (() => true));
  }, [items, filterFn]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort(sortFn || (() => 0));
  }, [filteredItems, sortFn]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedItems.slice(start, start + pageSize);
  }, [sortedItems, page, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedItems.length / pageSize);
  }, [sortedItems.length, pageSize]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    items: paginatedItems,
    page,
    totalPages,
    nextPage,
    prevPage,
    setPage,
  };
};

const PerformanceExample = () => {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 1000,
    }))
  );

  const filterFn = useCallback((item) => item.value > 500, []);
  const sortFn = useCallback((a, b) => b.value - a.value, []);

  const {
    items: paginatedItems,
    page,
    totalPages,
    nextPage,
    prevPage,
  } = useOptimizedList(items, { filterFn, sortFn, pageSize: 10 });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {paginatedItems.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded">
              <h4 className="font-semibold">{item.name}</h4>
              <p>Value: {item.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Optimized list rendering</li>
          <li>Memoized filtering and sorting</li>
          <li>Efficient pagination</li>
          <li>Performance with large datasets</li>
        </ul>
      </div>
    </div>
  );
};

const UseCallbackHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Understanding useCallback</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            useCallback is a React hook that memoizes functions, preventing
            unnecessary re-renders and optimizing performance in React
            applications.
          </p>
        </div>

        <div className="space-y-8">
          <BasicExample />
          <EventHandlerExample />
          <ComplexExample />

          {/* Advanced Examples */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Advanced Examples</h2>
            <div className="space-y-8">
              <DataFetchingExample />
              <ComplexStateExample />
              <PerformanceExample />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            When to Use useCallback
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Event handlers passed to child components</li>
                <li>Functions used in dependency arrays</li>
                <li>Performance-critical components</li>
                <li>Complex calculations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Use with React.memo</li>
                <li>Proper dependency management</li>
                <li>Avoid unnecessary memoization</li>
                <li>Consider performance impact</li>
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
                <li>Reduces unnecessary re-renders</li>
                <li>Optimizes child component updates</li>
                <li>Improves application performance</li>
                <li>Prevents infinite loops</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Memory overhead</li>
                <li>Complex dependency management</li>
                <li>Potential over-optimization</li>
                <li>Debugging complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackHook;
