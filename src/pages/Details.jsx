import React from 'react'
import { useState, useEffect } from "react";
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
function Details() {
  const [isLight,setIsLight]=useState(true);
  const { state } = useLocation(); 
  const country = state?.country; 
  const handleMode=()=>{ 
    setIsLight(!isLight)

  }
  console.log(country.borders)
//   const borders = country.borders ? country.borders.join(', ') : "No border countries";
  const borders = country?.borders;
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 min-h-screen font-nunito">
      <div className={`m-8 
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-700"}`}>
        <Header isLight={isLight} handleMode={handleMode} /> 
        <div className={`w-full max-w-4xl  ${isLight ? "bg-[hsl(0,0%,98%)] text-black" : "bg-gray-800 text-white"} p-8 rounded-lg shadow-md`}>
          {/* Country details */}
         
          <img src={country.flags?.png} alt={country.name?.common} className="w-full h-40 object-cover rounded-md mt-4" />
          <h2 className="text-4xl font-bold">{country.name?.common}</h2>
          <div className=" flex flex-col mt-8 space-y-4"> 
            <div className='flex flex-col space-y-2'>
                <p><span className="font-semibold text-xl ">Native Name:</span> {country?.name?.nativeName ? Object.values(country?.name?.nativeName)[0].common : "N/A"}</p>
            
                <p><span className="font-semibold text-lg">Population:</span> 
                {country?.population?.toLocaleString() || "N/A"}
                </p>

                <p><span className="font-semibold text-lg">Region:</span> 
                {country?.region || "N/A"}
                </p>
                <p><span className="font-semibold text-lg">Sub Region:</span> 
                {country?.subregion || "N/A"}
                </p>

                <p><span className="font-semibold text-lg">Capital:</span> 
                {country?.capital?.[0] || "N/A"}
                </p>
            </div> 
            <div className='flex flex-col space-y-2'>
            <p><span className="font-semibold text-lg">Top Level Domain:</span> 
                {country?.tld?.[0] || "N/A"}
                </p>

                <p><span className="font-semibold text-lg">Currencies:</span> 
                {country?.currencies ? Object.values(country?.currencies).map(curr => curr.name).join(', ') : "N/A"}
                </p>

                <p><span className="font-semibold text-lg">Languages:</span> 
                {country?.languages ? Object.values(country?.languages).join(', ') : "N/A"}
                </p>
            </div>

            {/* Border Countries */}
           
            <div className="mt-8">
              <strong>Border Countries:</strong>
              {borders && borders.length > 0 ? (
                <div className="flex flex-wrap gap-4 mt-4">
                  {borders.map((border, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 bg-white text-black rounded-md shadow-md"
                    >
                      {border}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-lg">No border countries</div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Details