import React from "react";
import { useState, useEffect } from "react";
import { fetchCountries } from "../services/countriesService";
import Loader from "../components/Loader";
import CountryCard from "../components/CountryCard";
import Header from "../components/Header";
import Search from "../components/Search";
import Filter from "../components/Filter";

function Home() {

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [search, setSearch] = useState("");
  const [wholeData, setWholeData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [isLight, setIsLight] = useState(true);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
  
  const handleMode = () => {
    setIsLight(!isLight);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 min-h-screen font-nunito">
      <div
        className={`m-8 
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-700"}`}
      >
        <Header isLight={isLight} handleMode={handleMode} />
        <div className="flex flex-col lg:flex-row lg:justify-between lg:w-full">
          <Search
            search={search}
            handleSearchChange={handleSearchChange}
            isLight={isLight}
          />
          <Filter
            regions={regions}
            selectedRegion={selectedRegion}
            handleFilter={handleFilter}
            isLight={isLight}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <CountryCard
            countries={countries}
            isLight={isLight}
            wholeCountries={wholeData}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
