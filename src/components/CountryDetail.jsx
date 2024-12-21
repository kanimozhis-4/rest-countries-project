import React from "react";
import BorderCountries from "./BorderCountries";

function CountryDetail({country,borders,wholeCountries,isLight}) {
    const sortedLanguages = country?.languages
    ? Object.values(country.languages).sort()
    : [];
    console.log("country",country)
  return (
    <div className="lg:w-[75%] lg:ml-20 ">
      <h2 className="text-3xl font-bold mt-12">{country.name?.common}</h2>
      <div className=" flex flex-col mt-8 space-y-14 text-xl lg:flex-row lg:space-y-0 mg:gap-4 lg:gap-28">
        <div className="flex flex-col space-y-6 text-xl lg:mr-12 lg:text-lg">
        <p>
            <span className="font-semibold mr-1">Native Name:</span>{" "}
            {country?.name?.nativeName
              ? Object.values(country?.name?.nativeName)[0].common
              : "N/A"}
          </p>

          <p>
            <span className="font-semibold mr-1">Population:</span>
            {country?.population?.toLocaleString() || "N/A"}
          </p>

          <p >
            <span className="font-semibold mr-1">Region:</span>
            {country?.region || "N/A"}
          </p>
          <p >
            <span className="font-semibold mr-1">Sub Region:</span>
            {country?.subregion || "N/A"}
          </p>

          <p>
            <span className="font-semibold mr-1">Capital:</span>
            {country?.capital?.[0] || "N/A"}
          </p>
        </div>
        <div className="flex flex-col mt-6 text-xl space-y-6 lg:text-lg">
          <p className="mt-2">
            <span className="font-semibold mr-1">Top Level Domain:</span>
            {country?.tld?.[0] || "N/A"}
          </p>

          <p>
            <span className="font-semibold mr-1 mt-6">Currencies:</span>
            {country?.currencies
              ? Object.values(country?.currencies)
                  .map((curr) => curr.name)
                  .join(", ")
              : "N/A"}
          </p>

          <p>
            <span className="font-semibold mr-1">Languages:</span>
            {sortedLanguages.length > 0 ? sortedLanguages.join(", ") : "N/A"}
          </p>
        </div>
      </div>  
      <BorderCountries
            borders={borders}
            wholeCountries={wholeCountries}
            isLight={isLight}
        />
    </div>
  );
}

export default CountryDetail;
