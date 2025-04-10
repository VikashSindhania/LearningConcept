import React from "react";

const LearningCss = () => {
  return (
    <>
      {/* playing with text case */}
      <div>
        <h3 className="text-2xl font-bold text-start bg-red-500">
          Text-Start (className = text-start)
        </h3>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center bg-blue-500">
          Text-Center (className = text-center in a div container)
        </h3>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-end bg-green-500">
          Text-End (className = text-end in a div container)
        </h3>
      </div>

      {/* playing with text decoration in single div row*/}
      <h2 className=" w-[700px] mx-auto text-2xl font-bold text-center border border-black p-1 m-3 bg-yellow-500 flex flex-row gap-2 items-center justify-center">
        flex flex-row gap-2 items-center justify-center
      </h2>
      <div className="flex flex-row gap-2 items-center justify-center m-2">
        <h3 className="text-2xl font-bold text-start bg-red-500 underline">
          Text-Start
        </h3>
        <h3 className="text-2xl font-bold text-center bg-blue-500 underline">
          Text-Center
        </h3>
        <h3 className="text-2xl font-bold text-end bg-green-500 underline">
          Text-End
        </h3>
      </div>

      {/* playing with text decoration in single div col*/}
      <h2 className=" w-[700px] mx-auto text-2xl font-bold text-center border border-black p-1 m-3 bg-yellow-500 flex flex-row gap-2 items-center justify-center">
        flex flex-col gap-2 items-center justify-center
      </h2>
      <div className="flex flex-col gap-2 items-center justify-center m-2">
        <h3 className="text-2xl font-bold text-start bg-red-500 underline">
          Text-Start
        </h3>
        <h3 className="text-2xl font-bold text-center bg-blue-500 underline">
          Text-Center
        </h3>
        <h3 className="text-2xl font-bold text-end bg-green-500 underline">
          Text-End
        </h3>
      </div>

      {/* playing with text decoration start in single independently*/}
      <h3 className=" w-[400px] ml-0 mr-auto text-sm font-bold text-center border border-black p-1 m-3 bg-yellow-500 flex flex-row gap-2 items-center justify-center">
        className="w-[180px] ml-[20px] mr-auto text-center"
      </h3>
      <h3 className=" w-[180px] ml-[20px] mr-auto text-2xl font-bold text-center border border-black p-1 m-2 bg-purple-500 underline">
        Text-Start
      </h3>
      {/* playing with text decoration center in single independently*/}

      <h3 className=" w-[180px] mx-auto text-2xl font-bold text-center  border border-black p-1 m-2 bg-purple-500 underline">
        Text-Center
      </h3>
      <p className=" w-[400px] mx-auto text-sm font-bold text-center border border-black p-1 m-3 bg-yellow-500 flex flex-row gap-2 items-center justify-center">
        className="w-[180px] mx-auto text-2xl text-center"
      </p>

      {/* playing with text decoration end  in single independently*/}
      <h3 className=" w-[180px] mr-10 ml-auto text-2xl font-bold text-center border border-black p-1 m-2 bg-purple-500 underline">
        Text-End
      </h3>
      <p className=" w-[400px] ml-auto mr-0 text-sm font-bold text-center border border-black p-1 m-3 bg-yellow-500 flex flex-row gap-2 items-center justify-center">
        className="w-[180px] mr-10 ml-auto text-center"
      </p>

      {/* Designing a Navabar with five elements */}
      <div className="flex flex-row gap-2  justify-start m-2 p-3  bg-gray-500">
        <p className="text-2xl font-bold p-2 ml-2 border-black- border-2 rounded-lg bg-red-500">
          Page1
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-blue-500">
          Page2
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-green-500">
          Page3
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-[20px] bg-yellow-500">
          Page4
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-full bg-purple-500">
          Page5
        </p>
      </div>

      {/* Designing a Navabar with different styles */}
      <div className="flex flex-row gap-2  justify-between m-2 p-3 space-between bg-gray-500">
        <p className="text-2xl font-bold p-2 ml-2 border-black- border-2 rounded-lg bg-red-500">
          Page1
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-blue-500">
          Page2
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-green-500">
          Page3
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-[20px] bg-yellow-500">
          Page4
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-full bg-purple-500">
          Page5
        </p>
      </div>

      {/* Designing a Navabar with different styles */}
      <div className="flex flex-row gap-2  justify-around m-2 p-3 space-between bg-gray-500">
        <p className="text-2xl font-bold p-2 ml-2 border-black- border-2 rounded-lg bg-red-500">
          Page1
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-blue-500">
          Page2
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-md bg-green-500">
          Page3
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-[20px] bg-yellow-500">
          Page4
        </p>
        <p className="text-2xl font-bold p-2 ml-2 border-black border-2 rounded-full bg-purple-500">
          Page5
        </p>
      </div>
    </>
  );
};

export default LearningCss;
