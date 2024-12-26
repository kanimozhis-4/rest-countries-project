import React, { useContext } from "react";
import { ThemeContext } from "../ThemeMode";
function Filter({ regions, selected, handleFilter, isDisabled, template }) {
  const { isLight } = useContext(ThemeContext);

  return (
    <select
      className={` w-[50%] border rounded-md m-8 p-4 lg:w-auto ${
        isLight
          ? `bg-white text-black 
        ${
          isDisabled ? "border-gray-400 bg-gray-100" : " border-black bg-white"
        }`
          : "bg-gray-800 text-white border-none"
      }`}
      value={selected}
      onChange={handleFilter}
      disabled={isDisabled}
    >
      {selected === "" && (
        <option value="" disabled>
          {template}
        </option>
      )}
      {regions?.map((region, index) => (
        <option key={index} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
}
export default Filter;
