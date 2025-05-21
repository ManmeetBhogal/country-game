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
  const [score, setScore] = useState<number>(0); // state to track the score
  

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
    if (userCountryName.toLowerCase() === randomCountryName?.toLowerCase()) {
      console.log("Correct guess!");
      // increment score
      setScore((prevScore) => prevScore + 1);
      handleSkip(); // Call handleSkip to get a new country
    } else {
      console.log("Incorrect guess!");
    }
    setUserCountryName(""); // Reset input field
  }

  const handleSkip = () => {
    // Collect country objects
    const allCountries = lookup.countries;
    const numberOfCountries = allCountries.length;

    // Random number between 1 - 251 (length of allCountries)
    const randomNumber = Math.floor(Math.random() * numberOfCountries);

    // Get random country details
    const randomCountry = allCountries[randomNumber];
    setRandomCountryCode(randomCountry.iso2);
    setRandomCountryName(randomCountry.country);
    setCountryFlag(null); // Reset the flag while loading the new one
  };

  return (
    <div>
      {/* <h1>Country Code: {randomCountryCode || "Loading..."}</h1>
      <h1>Country Name: {randomCountryName || "Loading..."}</h1> */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full sm:w-2/3 md:w-2/3 lg:w-7/8 flex justify-center">
          {countryFlag ? (
            <Image 
              className="max-w-lg"
              src={countryFlag}
              alt={'Country Flag'}
              layout="responsive"
              width={500}
              height={300}
            />
          ) : (
            <p>Loading flag...</p>
          )}
        </div>
        <div className="flex flex-col pt-10">
          <input 
            type="text"
            placeholder='Type your guess here'
            className="bg-white rounded-lg text-black text-center w-xl shadow-md p-3"
            value={userCountryName} // Bind input to value state 
            onChange={handleInputChange} // Update state on input change
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(); // Call handleSubmit on Enter key press
              }
            }}
          />
        <div className="flex flex-row justify-center">
          <button className="bg-green-400 hover:bg-green-600 m-5 w-25 h-10 rounded-3xl text-white" onClick={handleSubmit}>Enter</button>
          <button className="bg-white m-5 w-25 h-10 shadow-md rounded-3xl text-green-400">{score}</button>
          <button className="bg-green-400 hover:bg-green-600 m-5 w-25 h-10 rounded-3xl text-white" onClick={handleSkip}>Skip</button>

        </div>
        </div>
      </div>
    </div>
  )
}

export default CountryCode

