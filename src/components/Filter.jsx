import React from "react";
import { AiOutlineDown } from "react-icons/ai";
function Filter({ regions, selectedRegion, handleFilter, isLight }) {
    
  return (
    <div className="relative lg:w-[15%] lg:mr-14">
      <AiOutlineDown
        className="w-4 h-4 absolute top-1/2 right-1/2 lg:right-0"
        style={{ color: isLight ? "#000" : "#fff" }}
      />
      <select
        className={`mt-8 w-[50%] border border-black appearance-none rounded-md ml-8 p-4 lg:w-full ${
          isLight ? "bg-white text-black" : "bg-gray-800 text-white border-none"
        }`}
        value={selectedRegion}
        onChange={handleFilter}
      >
        {selectedRegion === "" && (
          <option value="" disabled>
            Filter by Region
          </option>
        )}
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
