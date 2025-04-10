import React, { useState, useEffect } from "react";

const Search = () => {
  const fruitData = [
    { id: 1, name: "Apple", quantity: 50 },
    { id: 2, name: "Banana", quantity: 100 },
    { id: 3, name: "Mango", quantity: 500 },
    { id: 4, name: "Orange", quantity: 400 },
    { id: 5, name: "Guava", quantity: 250 },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFruits, setFilteredFruits] = useState(fruitData);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      const results = fruitData.filter((fruit) =>
        fruit.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredFruits(results);
    } else {
      setFilteredFruits(fruitData);
    }
  }, [searchTerm]);

  return (
    <div>
      <div className="flex justify-center">
        <input
          className=" w-[500px] border border-cyan-400 rounded-md p-3 m-3"
          placeholder="Search Fruit"
          type="text"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>

      {/* Display Search Result */}
      <ul style={{ marginTop: "20px", padding: "15px", textAlign: "center" }}>
        {filteredFruits.map((fruit, index) => (
          <li key={fruit.id}>
            {fruit.name} - Quantity:{fruit.quantity}
          </li>
        ))}
      </ul>

      {/* Message when no results are found */}
      {searchTerm && filteredFruits.length === 0 && (
        <li className="text-red-500 p-2 text-2xl">
          No Fruits Found Starting with {searchTerm}
        </li>
      )}
    </div>
  );
};

export default Search;
