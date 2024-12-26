import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "../ThemeMode";
function Header() {
  const { isLight, handleMode } = useContext(ThemeContext);

  return (
    <header
      className={`flex flex-row  p-8 justify-between
        ${isLight ? " bg-white text-black" : "bg-gray-700 text-white"}`}
    >
      <h1 className="text-2xl font-bold mr-12">Where in the world?</h1>
      <h2 className="text-2xl" onClick={handleMode}>
        {isLight ? (
          <FaMoon className="inline-block mr-3 w-6 h-6 mb-1 text-black" />
        ) : (
          <FaMoon className="inline-block mr-3 w-6 h-6 mb-1 text-white" />
        )}
        Dark Mode
      </h2>
    </header>
  );
}

export default Header;
