"use client";
import lookup from 'country-code-lookup';
import React, { useEffect, useState } from 'react';
import { findFlagUrlByIso2Code } from 'country-flags-svg';
import Image from "next/image";

const CountryCode = () => {

  
  const [randomCountryCode, setRandomCountryCode] = useState<string | null>(null);
  const [randomCountryName, setRandomCountryName] = useState<string | null>(null);
  const [countryFlag, setCountryFlag] = useState<string | null>(null)
  const [userCountryName, setUserCountryName] = useState<string>("");
  

  useEffect(() => {
  // Collect country objects
  const allCountries = lookup.countries;
  const numberOfCountries = allCountries.length;

  // Random number between 1 - 251 (length of allCountries)
  const randomNumber = Math.floor(Math.random() * numberOfCountries);

  // Get random country details
  const randomCountry = allCountries[randomNumber];
  setRandomCountryCode(randomCountry.iso2)
  setRandomCountryName(randomCountry.country);
  }, []);

  useEffect(() => {
    // Fetch the country flag SVG when randomCountryCode changes
    if (randomCountryCode) {
      const flagUrl = findFlagUrlByIso2Code(randomCountryCode);
      setCountryFlag(flagUrl);
    }
  }, [randomCountryCode]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCountryName(event.target.value); // update state with input value
  }

  const handleSubmit = () => {
    console.log("User's guess: ", userCountryName); // log user's guess
    if (userCountryName === randomCountryName) {
      console.log("Correct guess!");
        // increment score
    } else {
      console.log("Incorrect guess!");
    }
  }

  return (
    <div>
      {/* <h1>Country Code: {randomCountryCode || "Loading..."}</h1>
      <h1>Country Name: {randomCountryName || "Loading..."}</h1> */}
      <div className="flex flex-col justify-center items-center">
        {countryFlag ? (
          <Image 
            className="shadow-xl dark:shadow-gray-800 max-w-lg"
            src={countryFlag}
            alt={'Country Flag'}
            width={500}
            height={300}
          />
        ) : (
          <p>Loading flag...</p>
        )}
        <div className="flex flex-col pt-10">
          <h2 className="text-2xl font-semibold">Guess the country: </h2>
          <input 
            type="text" 
            className="bg-white rounded-sm text-black text-center"
            value={userCountryName} // Bind input to value state 
            onChange={handleInputChange} // Update state on input change
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(); // Call handleSubmit on Enter key press
              }
            }}
          />
          <button onClick={handleSubmit}>Enter</button>
        </div>
      </div>
    </div>
  )
}

export default CountryCode

