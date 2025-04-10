import { React, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className=" ">
      <h1 className="text-center  text-4xl font-bold bg-blue-300 p-2 m-2  mx-auto">
        Counter Functionalities
      </h1>
      <h2 className="text-3xl w-[300px] p-2 rounded-md mx-auto text-center bg-red-300">
        Count:{count}
      </h2>

      <div className="flex justify-center">
        <button
          className="font-bold bg-blue-400  hover:bg-green-400 rounded-md p-2 m-5 w-[150px]   "
          onClick={increment}
        >
          Increase
        </button>
        <button
          className="font-bold bg-red-400 hover:bg-red-600 m-5 p-2 rounded-md w-[150px]"
          onClick={decrement}
        >
          Decrease
        </button>

        <button
          className="font-bold bg-gray-200 hover:bg-gray-600 m-5 p-2 rounded-md w-[150px]"
          onClick={() => window.location.reload()}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Counter;
