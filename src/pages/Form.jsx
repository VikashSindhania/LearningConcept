import React from "react";

const Form = () => {
  return (
    <div className=" p-4 flex justify-center items-center border-red-400 bg-slate-500 w-[300px] h-[400px] rounded mx-auto my-[200px] ">
      <form onSubmit={"submit"}>
        <div className="p-2 ">
          <label className="" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            className="p-1 border border-cyan-300 rounded ml-1 w-full"
            type="text"
            placeholder="Enter your Name"
          />
        </div>

        <div className="p-2">
          <label htmlFor="email">Email:</label>
          <input
            className="p-1 border border-cyan-300 rounded ml-1 w-full"
            type="email"
            placeholder="Enter your Email"
          />
        </div>

        <div className="ml-auto mr-10 ">
          <button
            className=" border border-gray-800 p-2 rounded-lg focus:outline-none text-white bg-blue-500 hover:bg-blue-700 focus:ring-4
          focus:ring-purple-400 font-medium
          "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
