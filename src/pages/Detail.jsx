import React, { useEffect, useState } from "react";
import Header from "../components/homePage/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import CountryDetail from "../components/detailPage/CountryDetail";
import { ThemeContext } from "../components/ThemeMode";
import { useContext } from "react";
import { fetchCountries, fetchCountryById } from "../services/countriesService";
import { useParams } from "react-router-dom";
import Loader from "../components/homePage/Loader";
function Details() {
  const { isLight } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [allCountries, SetAllCountries] = useState([]);
  useEffect(() => {
    if (id) {
      getDetailById();
    }
  }, [id]);
  const getDetailById = async () => {
    try {
      setLoading(true);
      const wholeData = await fetchCountries();
      SetAllCountries(wholeData);
      const countryData = await fetchCountryById(id);

      setCountry(countryData[0]);
    } catch (error) {
      console.error("Failed to fetch country details:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const borders = country?.borders;
  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 font-nunito min-h-screen">
      <div
        className={`m-8 lg:w-[90%]
        ${isLight ? "bg-[hsl(0,0%,98%)]" : "bg-gray-800"}`}
      >
        <Header />
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
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col lg:flex-row lg:w-full ">
              <img
                src={country?.flags?.png}
                alt={country?.name?.common}
                className="w-full h-40 object-cover rounded-md mt-4  lg:mr-6 lg:h-80 lg:w-[35%]"
              />
              <CountryDetail
                key={id}
                country={country}
                borders={borders}
                allCountries={allCountries}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Details;
