import React from "react";

const Card = (props) => {
  const { countryData, index } = props;
  console.log(countryData);
  return (
    <div className=" items-center text-center w-[250px] h-[350px] bg-white border border-gray-300 rounded-md shadow-lg p-3 m-3">
      <h2 className="text-xl font-bold mb-2">#{index + 1}</h2>
      <img
        src={countryData.flags.png}
        alt={`${countryData.name.common} flag`}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-gray-700">
        {countryData.name.common}
      </h3>
    </div>
  );
};

export default Card;
