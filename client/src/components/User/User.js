import React, { useState, useRef, useEffect } from "react";
import ChartComponent from "./ChartComponent";

export default function User() {

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCommodityDropdownOpen, setIsCommodityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const cityDropdownRef = useRef(null);
  const commodityDropdownRef = useRef(null);



  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
  };

  const toggleCommodityDropdown = () => {
    setIsCommodityDropdownOpen(!isCommodityDropdownOpen);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
  };

  const handleCommoditySelect = (commodity) => {
    setSelectedCommodity(commodity);
    setIsCommodityDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) &&
        (commodityDropdownRef.current && !commodityDropdownRef.current.contains(event.target))
      ) {
        setIsCityDropdownOpen(false);
        setIsCommodityDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen">


      <div className="dark:bg-black pt-8 pr-8 pl-8">
        <p className="pl-20 text-white text-xl mb-2">Please select the location and commodity</p>
        <div className="flex space-x-6 pl-20">
          <div className="relative " ref={cityDropdownRef}>
            <button
              onClick={toggleCityDropdown}
              className=" pl-10 pr-10 text-blue-600 bg-blue-700  font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-slate-100  dark:focus:ring-blue-800"
              type="button"
            >
              {selectedCity || "Select City"}
              <svg
                className={`w-2.5 h-2.5 ms-3 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isCityDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {["DELHI", "HISAR", "HYDERABAD", "KARNAL", "VIJAYAWADA", "BHUBANESWAR", "SHIMLA", "CHENNAI"].map((city) => (
                    <li key={city}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleCitySelect(city)}
                      >
                        {city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative" ref={commodityDropdownRef}>
            <button
              onClick={toggleCommodityDropdown}
              className=" pl-10 pr-10 text-blue-600 bg-blue-700  font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:bg-slate-100  dark:focus:ring-blue-800"
              type="button"
            >
              {selectedCommodity || "Select Commodity"}
              <svg
                className={`w-2.5 h-2.5 ms-3 transition-transform ${isCommodityDropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {isCommodityDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {["onion", "potato", "rice", "wheat"].map((commodity) => (
                    <li key={commodity}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => handleCommoditySelect(commodity)}
                      >
                        {commodity}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-20 pt-1 pb-8 pl-8 pr-8">
        <div className=" flex-2/3 h-90 w-1/2">
          <ChartComponent
            city={selectedCity}
            commodity={selectedCommodity}
          />


        </div>
        <div className=" flex-1/3 rounded-3xl pl-10 pr-10 ml-20 mr-40 mb-1 dark:bg-slate-100 flex-grow flex flex-col justify-center items-end">
          <p className="text-black text-sm max-w-lg">
          The graph displays the trend in prices over the next eight weeks (or a season), with the X-axis representing time in weeks and the Y-axis showing the price. As you move from left to right along the X-axis, each point corresponds to a specific week and its associated price. </p>
        </div>
      </div>
    </div>
  );
}
