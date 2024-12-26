import React, { useContext } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { ThemeContext } from "../ThemeMode";

function Sort({ name, order, handleSort }) {
  const { isLight } = useContext(ThemeContext);
  return (
    <button
      className={`flex items-center border border-gray-300 text-black p-3 rounded
        ${
          isLight
            ? "bg-white text-black"
            : "bg-gray-800 text-white border-none "
        }
        `}
      value={name}
      onClick={() => {
        handleSort(name);
      }}
    >
      {name}
      {order == "asc" ? (
        <FaArrowDown className="ml-2" />
      ) : (
        <FaArrowUp className="ml-2" />
      )}
    </button>
  );
}

export default Sort;
