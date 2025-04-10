import React from "react";

const ResponsiveCss = () => {
  return (
    <>
      {/* Designing a Navabar with different styles */}
      <div className="flex flex-col sm:flex-row gap-2  justify-around m-2 p-3 space-between bg-gray-500">
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black- border-2 rounded-lg bg-red-500 w-full sm:w-auto">
          Page1
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-blue-500 w-full sm:w-auto">
          Page2
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-green-500 w-full sm:w-auto">
          Page3
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-[20px] bg-yellow-500 w-full sm:w-auto">
          Page4
        </p>
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-full bg-purple-500 w-full sm:w-auto">
          Page5
        </p>
      </div>

      {/* Tailwind's responsive breakpoints:
      sm: 640px
      md: 768px
      lg: 1024px
      xl: 1280px
      2xl: 1536px
      3xl: 1792px
      4xl: 2048px
      5xl: 2560px
      */}

      <div className="flex flex-col sm:flex-row gap-2  justify-around m-2 p-3 space-between bg-gray-500">
        <p className="text-xl sm:text-2xl font-bold p-2 ml-2 border-black border-2 rounded-lg bg-green-400 w-full sm:w-auto">
          Tailwind's Responsive Breakpoints: sm: 640px md: 768px lg: 1024px xl:
          1280px 2xl: 1536px 3xl: 1792px 4xl: 2048px 5xl: 2560px 6xl: 3072px
        </p>
      </div>
    </>
  );
};

export default ResponsiveCss;
