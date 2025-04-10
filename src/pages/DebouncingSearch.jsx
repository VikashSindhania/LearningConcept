import React, { useState, useEffect } from "react";
import { fruitStore } from "../utils/fruitsStore";

const DebouncingSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // search State
  const [fruitItem, setFruitItem] = useState(fruitStore); // filteredState
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Handling Search Term by useEffect
  useEffect(() => {
    if (debouncedTerm) {
      const searchResponse = fruitStore.filter((fruit) =>
        fruit.name.toLowerCase().startsWith(debouncedTerm.toLowerCase())
      );

      setFruitItem(searchResponse);
    } else {
      setFruitItem(fruitStore);
    }
  }, [debouncedTerm]);

  return (
    <div>
      <input
        className="flex justify-center border border-gray-800 rounded-md p-2 m-2"
        value={searchTerm}
        placeholder="Search Fruit"
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {fruitItem.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncingSearch;
