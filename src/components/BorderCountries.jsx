import React from "react";

function BorderCountries({borders,wholeCountries,isLight}) {
    if (!Array.isArray(borders)) {
        return ( 
            <div> 
                <h3 className="text-2xl font-semibold mt-8">Border Countries:</h3>
                <div className="mt-4 text-xl">No border countries found.</div>
            </div>
        );
      }
    
    const borderCountries = borders? borders
    .map((borderCode) => {
      return wholeCountries.find((country) => country.cca3 === borderCode);
    })
    .filter((borderCountry) => borderCountry !== undefined)
    .sort((a, b) => a.name.common.localeCompare(b.name.common)):[];
  return (
    <div className="flex flex-col lg:flex lg:flex-row">
      <h3 className="text-2xl font-semibold mt-8  lg:text-lg">Border Countries:</h3>
      <div className="flex flex-wrap gap-4 mt-4 lg:ml-2">
        {borderCountries.length > 0 ? (
          borderCountries.slice(0,3).map((borderCountry, index) => (
            <div key={index} className={`border p-4 rounded-lg 
                ${isLight ?  "bg-white":"bg-gray-700 border-none" }
            `}>
              <h4 className="font-semibold text-lg lg:text-base">{borderCountry.name?.common}</h4>
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
