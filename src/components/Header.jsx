import React from 'react'
import { FaMoon } from "react-icons/fa";
function Header({ isLight, handleMode }) {
  return (
    <header className={`flex flex-row mt-8 p-8 justify-between
        ${isLight ? " bg-white text-black" : "bg-gray-800 text-white"}`}>
       <h1 className="text-2xl font-bold mr-12">Where in the world?</h1>
       <h2 className="text-2xl" onClick={handleMode}>
         {isLight ? (
           <img
             src={"https://icomoon.io/app/icomoon-lib/icons4acad3d/20/156.svg"}
             alt="Moon Icon"
             className="inline-block mr-3 w-6 h-6 mb-1 "
           />
         ) : ( 
           <FaMoon className="inline-block mr-3 w-6 h-6 mb-1 text-white" />
         )}
         Dark Mode
       </h2>
     </header>
  )
}

export default Header