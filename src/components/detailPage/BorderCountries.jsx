import React, { useContext } from "react";
import { ThemeContext } from "../ThemeMode";
import { useNavigate } from "react-router-dom";

function BorderCountries({ borders, wholeCountries }) {
  const { isLight } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!Array.isArray(borders)) {
    return (
      <div className="flex">
        <h3 className=" text-2xl font-semibold mt-8">Border Countries:</h3>
        <div className="ml-2 mt-9 text-xl">No border countries found.</div>
      </div>
    );
  }

  const borderCountries = borders
    ? borders
        .map((borderCode) => {
          return wholeCountries.find((country) => country.cca3 === borderCode);
        })
        .filter((borderCountry) => borderCountry !== undefined)
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
    : [];

  const handleClick = (borderCountry) => {
    navigate(`/country/${borderCountry?.ccn3}`, {
      state: { country: borderCountry, wholeCountries },
    });
  };

  return (
    <div className="flex flex-col lg:flex lg:flex-row">
      <h3 className="text-2xl font-semibold mt-8  lg:text-lg">
        Border Countries:
      </h3>
      <div className="flex flex-wrap gap-4 mt-4 lg:ml-2">
        {borderCountries.length > 0 ? (
          borderCountries.map((borderCountry, index) => (
            <div
              key={index}
              className={`border p-4 rounded-lg 
                ${isLight ? "bg-white" : "bg-gray-700 border-none"}
            `}
              onClick={() => handleClick(borderCountry)}
            >
              <h4 className="font-semibold text-lg lg:text-base">
                {borderCountry.name?.common}
              </h4>
            </div>
          ))
        ) : (
          <div>No border countries found.</div>
        )}
      </div>
    </div>
  );
}

export default BorderCountries;
