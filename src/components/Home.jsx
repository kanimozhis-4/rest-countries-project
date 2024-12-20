import React from "react";
import { useState, useEffect } from "react";
import { fetchCountries } from "../services/countriesService";

function Home() {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [search, setSearch] = useState("");
  const [wholeData, setWholeData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLight,setIsLight]=useState(true);

  useEffect(() => {
    fetchInitalData();
  }, []);

  const fetchInitalData = async () => {
    try {
      const data = await fetchCountries();
      setWholeData(data);
      setCountries(data);
      const uniqueRegions = [
        ...new Set(data.map((country) => country.region)),
      ].filter((region) => region);
      setRegions(uniqueRegions);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    handleSearchSubmit();
  };

  const handleFilter = async (event) => {
    try {
      const region = event.target.value;
      setSelectedRegion(region);

      const regionData = wholeData.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase()
      );

      if (search.trim() !== "") {
        const filterData = regionData.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
        setCountries(filterData);
      } else {
        setCountries(regionData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleSearchSubmit = async () => {
    try {
      let filteredCountries = wholeData;
      if (selectedRegion) {
        filteredCountries = filteredCountries.filter(
          (country) =>
            country.region.toLowerCase() === selectedRegion.toLowerCase()
        );
      }
      if (search.trim() !== "") {
        filteredCountries = filteredCountries.filter((country) =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCountries(filteredCountries);
    } catch (err) {
      console.error(err);
    }
  }; 
  const handleMode=()=>{ 
    setIsLight(!isLight)

  }
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200  h-full font-nunito">
      <div className={`mt-8 ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-700"}`}>
        <header className={`flex flex-row mt-8 p-8 lg:justify-between
           ${isLight ? " bg-white text-black" : "bg-gray-800 text-white"}`}>
          <h1 className="text-2xl font-bold mr-12">Where in the world?</h1>
          <h2 className="text-2xl lg:self-end"
          onClick={handleMode}
          > 
            {isLight? 
            <img
              src={"https://icomoon.io/app/icomoon-lib/icons4acad3d/20/156.svg"}
              alt="Moon Icon"
              className="inline-block mr-3 w-6 h-6 mb-1 "
            />: 
            <img src="/img.png"
             alt="Moon Icon"
              className="inline-block mr-3 w-8 h-8 mb-1 bg-white"
            />
            } 
            Dark Mode
          </h2>
        </header>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:w-full ">
        <div className="relative  mt-8 ml-8 mr-8  lg:w-[50%]"> 
          {/* {isLight? */}
          <img
            src="/searchIcon.png"
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 "
          />
          <input
            className={`pl-10 w-full border border-black p-4 rounded-md                                             
               ${isLight ? " bg-white text-black" : "bg-gray-800 text-white border-none"}`}
            placeholder="Search for a country..."
            value={search}                                                                                                                                                                  
            onChange={handleSearchChange}
          />
        </div>                                                                                                  
        <div className="relative lg:w-[15%] lg:mr-14 ">                                                                                                                                                                                      
        <img src="/downArrow.png" alt="down arrow" className="w-4 h-4 absolute top-1/2 right-0 left-1/2 bg-white lg:left-44"></img>
        <select
          className={`mt-8 w-[50%] border border-black appearance-none  rounded-md  ml-8 p-4 lg:w-full
             ${isLight ? " bg-white text-black" : "bg-gray-800 text-white border-none"}`}
          value={selectedRegion}
          onChange={handleFilter}
        > 
       
          {selectedRegion ==="" && (
            <option value="" disabled >
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
      </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-8  ${isLight ? " bg-[hsl(0,0%,98%)]" : "bg-gray-800  border-none"}`}>
          {countries.length === 0 ? (
            <div className={`text-xl font-semibold text-center col-span-full flex justify-center items-center h-96  ${isLight ? "text-black": "text-white"}`}>
              No Data Found
            </div>
          ) : (
            countries.map((country, index) => (
              <div key={index} className={` m-16 mb-4 rounded shadow-md ${isLight ? " bg-white text-black" : "bg-gray-700 text-white "}`}>
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
      </div>
    </div>
  );
}

export default Home;
