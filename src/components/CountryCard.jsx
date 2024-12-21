import React from 'react'
import { useNavigate } from 'react-router-dom';

function CountryCard({ countries, isLight,wholeCountries }) {
    const navigate = useNavigate();
    const handleClick = (country) => {
        // Navigates to the details page with the country name
        navigate(`/detail`,{ state: { country ,wholeCountries} });
      };
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8  ${isLight ? " bg-[hsl(0,0%,98%)]" : "bg-gray-800  border-none"}`}>
    {countries.length === 0 ? (
      <div className={`text-xl font-semibold text-center col-span-full flex justify-center items-center h-96  ${isLight ? "text-black": "text-white"}`}>
        No Data Found
      </div>
    ) : (
      countries.map((country, index) => (
        <div key={index} className={` m-16 mb-4 rounded shadow-md 
        ${isLight ? " bg-white text-black" : "bg-gray-700 text-white "}`} 
        onClick={()=>{handleClick(country)}}
        >
          <img
            src={country.flags?.png}
            alt={country.name?.common}
            className="w-full h-40 object-cover rounded-md"
          />
          <div className="m-8">
            <h3 className="text-3xl font-semibold mt-4 mb-4 ">
              {country.name?.common}
            </h3>
            <p className=" mb-2 text-lg">
              <strong>Population:</strong>{" "}
              {country.population.toLocaleString()}
            </p>
            <p className="mb-2 text-lg">
              <strong>Region:</strong> {country.region}
            </p>
            <p className="text-lg">
              <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
  )
}

export default CountryCard