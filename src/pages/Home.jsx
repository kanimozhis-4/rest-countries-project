import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { fetchCountries } from "../services/countriesService";
import Loader from "../components/homePage/Loader";
import CountryCard from "../components/homePage/CountryCard";
import Header from "../components/homePage/Header";
import Search from "../components/homePage/Search";
import Filter from "../components/homePage/Filter";
import { ThemeContext } from "../components/ThemeMode";
import { FaExclamationTriangle } from "react-icons/fa";

function Home() {
  const { isLight } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubRegion, setSelectedSubRegion] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState("");
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLannguage] = useState("");
  const sortOptions = [
    "Population ASC",
    "Population DESC",
    "Area ASC",
    "Area DESC",
  ];
  useEffect(() => {
    fetchInitalData();
  }, []);

  const languageFilter = [
    ...new Set(
      allCountries.flatMap((country) => {
        return country.languages ? Object.values(country.languages) : [];
      })
    ),
  ];

  const regions = [
    ...new Set(allCountries?.map((country) => country.region)),
  ].filter((region) => region);

  const subRegions =
    selectedRegion !== ""
      ? [
          ...new Set(
            allCountries
              ?.filter((country) => country.region === selectedRegion)
              .map((country) => country?.subregion)
          ),
        ].filter((subregion) => subregion)
      : [];

  let countries = allCountries.filter((country) => {
    const matchesRegion =
      selectedRegion === "" ||
      country.region.toLowerCase() === selectedRegion.toLowerCase();
    const matchesSubRegion =
      selectedSubRegion === "" ||
      country.subregion?.toLowerCase() === selectedSubRegion.toLowerCase();
    const matchesSearch =
      search.trim() === "" ||
      country.name.common.toLowerCase().includes(search.toLowerCase());
    const matchesLanguage = country?.languages
      ? Object.values(country.languages).some((language) => {
          if (!language) return false;
          if (selectedLanguage === "") {
            return true;
          }
          return (
            language.trim().toLowerCase() ===
            selectedLanguage.trim().toLowerCase()
          );
        })
      : false;

    return (
      matchesRegion && matchesSubRegion && matchesSearch && matchesLanguage
    );
  });

  if (selectedSort === "Population ASC") {
    countries.sort((a, b) => a.population - b.population);
  } else if (selectedSort === "Population DESC") {
    countries.sort((a, b) => b.population - a.population);
  } else if (selectedSort === "Area ASC") {
    countries.sort((a, b) => a.area - b.area);
  } else if (selectedSort === "Area DESC") {
    countries.sort((a, b) => b.area - a.area);
  }

  const fetchInitalData = async () => {
    try {
      setLoading(true);
      const data = await fetchCountries();
      setAllCountries(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch countries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleFilterLanguage = (event) => {
    try {
      const language = event.target.value;
      setSelectedLannguage(language);
    } catch (err) {
      setError("Error filtering by language.");
      console.error(err);
    }
  };
  const handleFilterRegion = (event) => {
    try {
      const region = event.target.value;
      setSelectedRegion(region);
    } catch (err) {
      setError("Error filtering by region.");
      console.error(err);
    }
  };
  const handleFilterSubRegion = (event) => {
    try {
      const subRegion = event.target.value;
      setSelectedSubRegion(subRegion);
    } catch (err) {
      setError("Error filtering by subregion.");
      console.error(err);
    }
  };
  const handleSort = (event) => {
    try {
      const sort = event.target.value;
      setSelectedSort(sort);
    } catch (err) {
      setError("Error sorting countries.");
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 min-h-screen font-nunito">
      <div
        className={`m-8 
          ${countries.length === 0 ? "w-[90%] " : ""}
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-700"}`}
      >
        <Header />
        <div className="flex flex-col  lg:flex-row lg:justify-between lg:w-full">
          <Search search={search} handleSearchChange={handleSearchChange} />
          <div className=" flex flex-row  ">
            <Filter
              options={languageFilter}
              selected={selectedLanguage}
              handleFilter={handleFilterLanguage}
              isDisabled={false}
              template={"Language By"}
            />
            <Filter
              options={regions}
              selected={selectedRegion}
              handleFilter={handleFilterRegion}
              isDisabled={false}
              template={"Region"}
            />
            <Filter
              options={subRegions}
              selected={selectedSubRegion}
              handleFilter={handleFilterSubRegion}
              isDisabled={selectedRegion === "" || subRegions.length === 0}
              template={"Sub-Region"}
            />
            <Filter
              options={sortOptions}
              selected={selectedSort}
              handleFilter={handleSort}
              template={"Sort By"}
            />
          </div>
        </div>
        {error ? (
          <div className="text-red-500 text-center p-4  bg-red-100 rounded-md flex items-center justify-center space-x-2">
            <FaExclamationTriangle className="text-red-500 text-2xl" />
            <span>{error}</span>
          </div>
        ) : loading ? (
          <Loader />
        ) : (
          <CountryCard countries={countries} />
        )}
      </div>
    </div>
  );
}

export default Home;
