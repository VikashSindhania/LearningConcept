import React, { useState, useMemo, useCallback } from "react";

// Example 1: Expensive Calculation
const ExpensiveCalculationExample = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Without useMemo
  const calculateWithoutMemo = () => {
    console.log("Calculating without memo...");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += count * multiplier;
    }
    return result;
  };

  // With useMemo
  const memoizedResult = useMemo(() => {
    console.log("Calculating with memo...");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += count * multiplier;
    }
    return result;
  }, [count, multiplier]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Expensive Calculation</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment Count
          </button>
          <span>Count: {count}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMultiplier((prev) => prev + 1)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Increment Multiplier
          </button>
          <span>Multiplier: {multiplier}</span>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p>Without useMemo: {calculateWithoutMemo()}</p>
          <p>With useMemo: {memoizedResult}</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Prevents unnecessary recalculations</li>
          <li>Improves performance</li>
          <li>Cache expensive computations</li>
          <li>Dependency tracking</li>
        </ul>
      </div>
    </div>
  );
};

// Example 2: Complex Object Creation
const ComplexObjectExample = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const userWithoutMemo = {
    name,
    age,
    isAdult: age >= 18,
    birthYear: new Date().getFullYear() - age,
    greeting: `Hello, ${name}!`,
  };

  const userWithMemo = useMemo(
    () => ({
      name,
      age,
      isAdult: age >= 18,
      birthYear: new Date().getFullYear() - age,
      greeting: `Hello, ${name}!`,
    }),
    [name, age]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex Object Creation</h3>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Enter age"
            className="p-2 border rounded"
          />
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Without useMemo:</h4>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(userWithoutMemo, null, 2)}
          </pre>
          <h4 className="font-semibold mt-4 mb-2">With useMemo:</h4>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(userWithMemo, null, 2)}
          </pre>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Prevents unnecessary object creation</li>
          <li>Maintains referential equality</li>
          <li>Optimizes prop passing</li>
          <li>Reduces re-renders</li>
        </ul>
      </div>
    </div>
  );
};

// Example 3: Filtered List
const FilteredListExample = () => {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 100,
    }))
  );
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedItems = useMemo(() => {
    console.log("Filtering and sorting...");
    return items
      .filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return a.value - b.value;
      });
  }, [items, filter, sortBy]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Filtered List</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter items..."
            className="p-2 border rounded flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="value">Sort by Value</option>
          </select>
        </div>
        <div className="h-60 overflow-y-auto border rounded">
          <ul className="divide-y">
            {filteredAndSortedItems.map((item) => (
              <li key={item.id} className="p-2">
                {item.name} - {item.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Efficient list filtering</li>
          <li>Optimized sorting</li>
          <li>Prevents unnecessary recalculations</li>
          <li>Improves performance</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 1: Custom Hook with useMemo
const useDataTransform = (data, transformFn) => {
  return useMemo(() => {
    console.log("Transforming data...");
    return transformFn(data);
  }, [data, transformFn]);
};

const DataTransformExample = () => {
  const [data] = useState(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i,
      value: Math.random() * 1000,
      timestamp: Date.now() - Math.random() * 1000000,
    }))
  );

  const transformFn = useCallback((items) => {
    return items.map((item) => ({
      ...item,
      formattedValue: `$${item.value.toFixed(2)}`,
      date: new Date(item.timestamp).toLocaleDateString(),
      category: item.value > 500 ? "High" : "Low",
    }));
  }, []);

  const transformedData = useDataTransform(data, transformFn);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Custom Hook with useMemo</h3>
      <div className="space-y-4">
        <div className="h-60 overflow-y-auto border rounded">
          <ul className="divide-y">
            {transformedData.map((item) => (
              <li key={item.id} className="p-2">
                <span className="font-semibold">{item.formattedValue}</span>
                <span className="text-gray-500 ml-2">({item.date})</span>
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    item.category === "High"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Custom hook composition</li>
          <li>Complex data transformation</li>
          <li>Performance optimization</li>
          <li>Reusable logic</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 2: Complex State Derivation
const ComplexStateExample = () => {
  const [users] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      age: Math.floor(Math.random() * 50) + 18,
      score: Math.floor(Math.random() * 100),
      department: ["Engineering", "Marketing", "Sales", "HR"][
        Math.floor(Math.random() * 4)
      ],
    }))
  );

  const [filters, setFilters] = useState({
    minAge: 25,
    minScore: 50,
    department: "All",
  });

  const derivedStats = useMemo(() => {
    console.log("Calculating derived stats...");
    const filteredUsers = users.filter((user) => {
      if (user.age < filters.minAge) return false;
      if (user.score < filters.minScore) return false;
      if (
        filters.department !== "All" &&
        user.department !== filters.department
      )
        return false;
      return true;
    });

    return {
      totalUsers: filteredUsers.length,
      averageAge:
        filteredUsers.reduce((acc, user) => acc + user.age, 0) /
          filteredUsers.length || 0,
      averageScore:
        filteredUsers.reduce((acc, user) => acc + user.score, 0) /
          filteredUsers.length || 0,
      departmentDistribution: filteredUsers.reduce((acc, user) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
      }, {}),
    };
  }, [users, filters]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Complex State Derivation</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Age
            </label>
            <input
              type="number"
              value={filters.minAge}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minAge: Number(e.target.value),
                }))
              }
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Min Score
            </label>
            <input
              type="number"
              value={filters.minScore}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minScore: Number(e.target.value),
                }))
              }
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              value={filters.department}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, department: e.target.value }))
              }
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-2">Statistics</h4>
            <ul className="space-y-2">
              <li>Total Users: {derivedStats.totalUsers}</li>
              <li>Average Age: {derivedStats.averageAge.toFixed(1)}</li>
              <li>Average Score: {derivedStats.averageScore.toFixed(1)}</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h4 className="font-semibold mb-2">Department Distribution</h4>
            <ul className="space-y-2">
              {Object.entries(derivedStats.departmentDistribution).map(
                ([dept, count]) => (
                  <li key={dept}>
                    {dept}: {count} users
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Complex state derivation</li>
          <li>Multiple filter conditions</li>
          <li>Performance optimization</li>
          <li>Real-time statistics</li>
        </ul>
      </div>
    </div>
  );
};

// Advanced Example 3: Performance Optimization with useMemo
const PerformanceOptimizationExample = () => {
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random() * 1000,
      category: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
    }))
  );

  const [viewConfig, setViewConfig] = useState({
    pageSize: 10,
    currentPage: 0,
    sortBy: "value",
    sortDirection: "asc",
  });

  const paginatedItems = useMemo(() => {
    console.log("Calculating pagination...");
    const sortedItems = [...items].sort((a, b) => {
      const direction = viewConfig.sortDirection === "asc" ? 1 : -1;
      return (a[viewConfig.sortBy] - b[viewConfig.sortBy]) * direction;
    });

    const start = viewConfig.currentPage * viewConfig.pageSize;
    return sortedItems.slice(start, start + viewConfig.pageSize);
  }, [items, viewConfig]);

  const pageCount = useMemo(
    () => Math.ceil(items.length / viewConfig.pageSize),
    [items.length, viewConfig.pageSize]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Performance Optimization</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <select
            value={viewConfig.pageSize}
            onChange={(e) =>
              setViewConfig((prev) => ({
                ...prev,
                pageSize: Number(e.target.value),
              }))
            }
            className="p-2 border rounded"
          >
            <option value="10">10 items</option>
            <option value="20">20 items</option>
            <option value="50">50 items</option>
          </select>
          <select
            value={viewConfig.sortBy}
            onChange={(e) =>
              setViewConfig((prev) => ({ ...prev, sortBy: e.target.value }))
            }
            className="p-2 border rounded"
          >
            <option value="value">Sort by Value</option>
            <option value="name">Sort by Name</option>
          </select>
          <button
            onClick={() =>
              setViewConfig((prev) => ({
                ...prev,
                sortDirection: prev.sortDirection === "asc" ? "desc" : "asc",
              }))
            }
            className="p-2 border rounded"
          >
            Toggle Sort Direction
          </button>
        </div>
        <div className="h-60 overflow-y-auto border rounded">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.value.toFixed(2)}</td>
                  <td className="p-2">{item.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() =>
                setViewConfig((prev) => ({ ...prev, currentPage: i }))
              }
              className={`p-2 border rounded ${
                viewConfig.currentPage === i ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h4 className="font-semibold mb-2">Key Points:</h4>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Efficient pagination</li>
          <li>Optimized sorting</li>
          <li>Memoized calculations</li>
          <li>Large dataset handling</li>
        </ul>
      </div>
    </div>
  );
};

const UseMemoHook = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Understanding useMemo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          useMemo is a React hook that memoizes the result of a function call,
          preventing unnecessary recalculations and improving performance. It's
          particularly useful for expensive calculations and complex object
          creation.
        </p>

        <div className="grid grid-cols-1 gap-8">
          <ExpensiveCalculationExample />
          <ComplexObjectExample />
          <FilteredListExample />

          <h2 className="text-2xl font-bold mt-8 mb-4">Advanced Examples</h2>
          <DataTransformExample />
          <ComplexStateExample />
          <PerformanceOptimizationExample />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">When to Use useMemo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Use Cases</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Expensive calculations</li>
                <li>Complex object creation</li>
                <li>List filtering and sorting</li>
                <li>Referential equality</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Profile before optimizing</li>
                <li>Use for expensive operations</li>
                <li>Consider dependency array</li>
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
                <li>Reduces unnecessary calculations</li>
                <li>Improves render performance</li>
                <li>Prevents prop changes</li>
                <li>Optimizes expensive operations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Trade-offs</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Memory overhead</li>
                <li>Initial calculation cost</li>
                <li>Dependency management</li>
                <li>Code complexity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseMemoHook;
