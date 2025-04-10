import React, { useState, useEffect } from "react";

const UseEffectHook = () => {
  // Example 1: Basic useEffect (Component Mount)
  const MountExample = () => {
    const [message, setMessage] = useState("Component not mounted");

    useEffect(() => {
      setMessage("Component mounted!");
      console.log("Component mounted - useEffect ran");

      // Cleanup function
      return () => {
        console.log("Component unmounted - cleanup ran");
      };
    }, []); // Empty dependency array means run once on mount

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Basic useEffect (Mount)</h3>
        <p className="text-gray-600">{message}</p>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Runs once when component mounts</li>
            <li>Empty dependency array []</li>
            <li>Cleanup function runs on unmount</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 2: useEffect with Dependencies
  const CounterExample = () => {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);

    useEffect(() => {
      setEffectCount((prev) => prev + 1);
      console.log(`Effect ran - Count is ${count}`);
    }, [count]); // Runs when count changes

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          useEffect with Dependencies
        </h3>
        <div className="space-y-4">
          <p className="text-gray-600">Count: {count}</p>
          <p className="text-gray-600">Effect ran {effectCount} times</p>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Runs when count changes</li>
            <li>Dependency array [count]</li>
            <li>Effect count tracks executions</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 3: Data Fetching
  const DataFetchingExample = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const mockData = {
            id: 1,
            title: "Sample Data",
            description: "This is fetched data",
          };
          setData(mockData);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []); // Fetch once on mount

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Data Fetching with useEffect
        </h3>
        <div className="space-y-4">
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {data && (
            <div className="space-y-2">
              <p className="text-gray-600">Title: {data.title}</p>
              <p className="text-gray-600">Description: {data.description}</p>
            </div>
          )}
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Async data fetching</li>
            <li>Loading and error states</li>
            <li>Clean data handling</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 4: Event Listeners
  const EventListenerExample = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      // Cleanup: remove event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); // Empty dependency array

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Event Listeners with useEffect
        </h3>
        <div className="space-y-4">
          <p className="text-gray-600">Window Width: {windowSize.width}px</p>
          <p className="text-gray-600">Window Height: {windowSize.height}px</p>
          <p className="text-sm text-gray-500">
            Try resizing your browser window
          </p>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Event listener setup</li>
            <li>Cleanup on unmount</li>
            <li>Window size tracking</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 5: Multiple Effects
  const MultipleEffectsExample = () => {
    const [count, setCount] = useState(0);
    const [theme, setTheme] = useState("light");

    // Effect 1: Document title
    useEffect(() => {
      document.title = `Count: ${count}`;
    }, [count]);

    // Effect 2: Theme
    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Multiple useEffect Hooks</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600">Count: {count}</p>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Increment Count
            </button>
          </div>
          <div>
            <p className="text-gray-600">Theme: {theme}</p>
            <button
              onClick={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Toggle Theme
            </button>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Separate concerns</li>
            <li>Multiple effects</li>
            <li>Different dependencies</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 6: Debounced Search with useEffect
  const DebouncedSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [debouncedTerm, setDebouncedTerm] = useState("");

    // Debounce effect
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedTerm(searchTerm);
      }, 500);

      return () => clearTimeout(timer);
    }, [searchTerm]);

    // Search effect
    useEffect(() => {
      if (!debouncedTerm) {
        setResults([]);
        return;
      }

      const search = async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 300));
        setResults([
          `Result 1 for ${debouncedTerm}`,
          `Result 2 for ${debouncedTerm}`,
          `Result 3 for ${debouncedTerm}`,
        ]);
      };

      search();
    }, [debouncedTerm]);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Debounced Search</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border rounded"
          />
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded">
                {result}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Debouncing user input</li>
            <li>Cleanup for timers</li>
            <li>Chained effects</li>
            <li>Performance optimization</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 7: WebSocket Connection
  const WebSocketExample = () => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState(null);

    useEffect(() => {
      // Simulate WebSocket connection
      const socket = {
        onmessage: null,
        onopen: null,
        onclose: null,
        send: (msg) => console.log("Sending:", msg),
        close: () => console.log("Closing connection"),
      };

      socket.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };

      socket.onopen = () => {
        setIsConnected(true);
        console.log("Connected to WebSocket");
      };

      socket.onclose = () => {
        setIsConnected(false);
        console.log("Disconnected from WebSocket");
      };

      setWs(socket);

      // Simulate connection
      setTimeout(() => socket.onopen(), 1000);

      return () => {
        socket.close();
      };
    }, []);

    const sendMessage = () => {
      if (ws && isConnected) {
        ws.send("Hello from client!");
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">WebSocket Connection</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>Status: {isConnected ? "Connected" : "Disconnected"}</span>
          </div>
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Send Message
          </button>
          <div className="h-40 overflow-y-auto border rounded p-2">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                {msg}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Real-time connection management</li>
            <li>Connection state tracking</li>
            <li>Message handling</li>
            <li>Proper cleanup</li>
          </ul>
        </div>
      </div>
    );
  };

  // Example 8: Complex State Synchronization
  const StateSyncExample = () => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate user data
    useEffect(() => {
      const fetchUser = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUser({ id: 1, name: "John Doe" });
      };
      fetchUser();
    }, []);

    // Fetch posts when user changes
    useEffect(() => {
      if (!user) return;

      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 800));
          setPosts([
            { id: 1, title: "Post 1", userId: user.id },
            { id: 2, title: "Post 2", userId: user.id },
          ]);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }, [user]);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Complex State Synchronization
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">User:</h4>
            <p className="text-gray-600">
              {user ? user.name : "Loading user..."}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Posts:</h4>
            {isLoading ? (
              <p className="text-gray-600">Loading posts...</p>
            ) : (
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li key={post.id} className="p-2 bg-gray-50 rounded">
                    {post.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            <li>Dependent data fetching</li>
            <li>Loading state management</li>
            <li>Error handling</li>
            <li>State synchronization</li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Understanding useEffect Hook
        </h1>
        <p className="text-center text-gray-600 mb-8">
          The useEffect hook is essential for handling side effects in React
          components. It helps manage component lifecycle, data fetching,
          subscriptions, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MountExample />
          <CounterExample />
          <DataFetchingExample />
          <EventListenerExample />
          <MultipleEffectsExample />
          <DebouncedSearch />
          <WebSocketExample />
          <StateSyncExample />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            useEffect Feature Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Basic Usage</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Component lifecycle management</li>
                <li>Side effect handling</li>
                <li>Cleanup functions</li>
                <li>Dependency arrays</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Advanced Patterns</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Data fetching</li>
                <li>Event listeners</li>
                <li>Subscriptions</li>
                <li>Multiple effects</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Proper dependency management</li>
                <li>Cleanup resources</li>
                <li>Avoid infinite loops</li>
                <li>Separate concerns</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Common Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Data Management</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>API calls</li>
                <li>Data subscriptions</li>
                <li>State synchronization</li>
                <li>Data fetching</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">DOM Interactions</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Event listeners</li>
                <li>DOM manipulation</li>
                <li>Window/document events</li>
                <li>Third-party integrations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseEffectHook;
