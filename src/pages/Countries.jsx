import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = await response.json();
      console.log("data", data);
      setCountries(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("countries", countries);
  }, [countries]);
  return (
    <div>
      <h1>Countries</h1>
    </div>
  );
};

export default Countries;

// import React from "react";
// import Card from "./Card";

// const Countries = ({ countriesData }) => {
//   const [countries, setCountries] = React.useState([]);
//   const [searchCountry, setSearchCountry] = React.useState("");
//   const [filteredCountries, setFilteredCountries] = React.useState([]);
//   React.useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const result = await fetch("https://restcountries.com/v3.1/all");
//         const data = await result.json();
//         setCountries(data);
//         setFilteredCountries(data);
//       };
//       fetchData();
//     } catch (error) {
//       console.log("error", error);
//     }
//   }, []);

//   React.useEffect(() => {
//     console.log("searchCountry", searchCountry);
//     const newCountries = countries.filter((country) =>
//       country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
//     );
//     setFilteredCountries(newCountries);
//   }, [searchCountry]);

//   return (
//     <div className="App">
//       <h1>Welcome to Country Flag</h1>

//       <input
//         style={{
//           padding: "2px",
//           margin: "2px",
//           border: "2px",
//           borderColor: "blue",
//         }}
//         placeholder="Enter Countries Name"
//         value={searchCountry}
//         type="text"
//         onChange={(e) => setSearchCountry(e.target.value)}
//       />

//       <div className="flex flex-wrap justify-center">
//         {filteredCountries.map((country, index) => (
//           <Card key={index} countryData={country} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Countries;
