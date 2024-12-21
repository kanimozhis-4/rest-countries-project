import React from "react";
import searchIcon from "../assets/images/searchIcon.png";

function Search({ search, handleSearchChange, isLight }) {
  return (
    <div className="relative mt-8 ml-8 mr-8 lg:w-[50%]">
      <img
        src={searchIcon}
        alt="Search Icon"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className={`pl-10 w-full border border-black p-4 rounded-md ${
          isLight ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
        placeholder="Search for a country..."
      />
    </div>
  );
}

export default Search;
