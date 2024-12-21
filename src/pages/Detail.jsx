import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CountryDetail from "../components/CountryDetail";
import BorderCountries from "../components/BorderCountries";
function Details() {
  const [isLight, setIsLight] = useState(true);
  const { state } = useLocation();
  const { country, wholeCountries } = state || {};
  const navigate = useNavigate();
  const handleMode = () => {
    setIsLight(!isLight);
  };
  const handleBackClick = () => {
    navigate("/home");
  };

  const borders = country?.borders;
  return ( 
    <div className="flex flex-col justify-center items-center bg-gray-200 font-nunito min-h-screen">
      <div className={`m-8 lg:w-[90%]
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-800"}`}>
        <Header isLight={isLight} handleMode={handleMode} />
        <button
          onClick={handleBackClick}
          className={`flex items-center text-lg font-normal mt-4 mb-6 ml-6 border w-28 h-10 rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.25)]
            ${isLight ? "bg-white" : "bg-gray-700 border-none text-white"}`}
        >
          <FaArrowLeft className="ml-4 mr-4" /> Back
        </button> 
        <div
          className={`
           ${
             isLight
               ? "bg-[hsl(0,0%,98%)] text-black"
               : "bg-gray-800 text-white"
           } p-8 rounded-lg shadow-md`}
        >   
          <div className="flex flex-col lg:flex-row lg:w-full ">
          <img
            src={country.flags?.png}
            alt={country.name?.common}
            className="w-full h-40 object-cover rounded-md mt-4 lg:w-1/2 lg:mr-6 lg:h-80 lg:w-[35%]"
          />  
          <CountryDetail country={country}
           borders={borders}
           wholeCountries={wholeCountries}
           isLight={isLight}
           /> 
           </div>
        </div>
      </div>

    </div>

  );
}
export default Details;

  // return (
    // <div className="flexmin-h-screen">
    {/* // <div className="flex flex-col justify-center items-center bg-gray-200 min-h-screen  overflow-x-hidden font-nunito"> */}
      // <div>
      {/* <div
        className={`m-8 
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-800"}`}
      > */}
        {/* <Header isLight={isLight} handleMode={handleMode} /> */}
        {/* <button
          onClick={handleBackClick}
          className={`flex items-center text-lg font-normal mt-4 mb-6 ml-6 border w-28 h-10 rounded-lg shadow-[0_0_6px_rgba(0,0,0,0.25)]
            ${isLight ? "bg-white" : "bg-gray-700 border-none text-white"}`}
        >
          <FaArrowLeft className="ml-4 mr-4" /> Back
        </button> */}
        {/* <div
          className={`w-full max-w-4xl  
           ${
             isLight
               ? "bg-[hsl(0,0%,98%)] text-black"
               : "bg-gray-800 text-white"
           } p-8 rounded-lg shadow-md`}
        >  */}
        {/* <div className="flex flex-col lg:flex-row lg:w-full "> */}
          {/* <img
            src={country.flags?.png}
            alt={country.name?.common}
            className="w-full h-40 object-cover rounded-md mt-4 lg:w-1/2 lg:mr-6"
          /> */}
          {/* <CountryDetail country={country}
           borders={borders}
           wholeCountries={wholeCountries}
           isLight={isLight}
           /> */}
        {/* </div> */}
          
        {/* </div> */}
      {/* </div>
    </div>
  );
} */}

{/* export default Details; */}
