import React, { useState, useRef, useEffect } from "react";
import ChartComponent from "./ChartComponent";

export default function User() {
 
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCommodityDropdownOpen, setIsCommodityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [triggerPrediction, setTriggerPrediction] = useState(false);
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

  
  const handlePredict = () => {
    // if (selectedCity && selectedCommodity) {
      setTriggerPrediction(true);
      // Optionally reset triggerPrediction after a certain period or based on some condition
    // }
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
      

      <div className="dark:bg-black p-8">
        <p className="text-white text-3xl mb-6">Please select the location and commodity</p>
        <div className="flex space-x-6">
          <div className="relative" ref={cityDropdownRef}>
            <button
              onClick={toggleCityDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  {["Delhi", "Hisar", "Hyderabad", "Karnal", "Vijayawada", "Bhubaneswar", "Shimla", "Chennai"].map((city) => (
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  {["Onion", "Potato", "Rice", "Wheat"].map((commodity) => (
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

          <button
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={handlePredict}
          >
            Predict
          </button>
        </div>
      </div>
      
      <div className="flex flex-row space-x-20 p-8">
        <div className="h-90 w-1/2">
        if(selectedCity && setSelectedCommodity){
          <ChartComponent 
          city={selectedCity} 
          commodity={selectedCommodity}
          triggerPrediction={triggerPrediction}
        />
        }
          
        </div>
        <div className="flex-grow flex flex-col justify-center items-end">
          <p className="text-white text-xl max-w-lg">
            The graph displays the trend in prices over the next eight weeks (or a season), with the X-axis representing time in weeks and the Y-axis showing the price. As you move from left to right along the X-axis, each point corresponds to a specific week and its associated price. The graph helps visualize how prices are expected to change over this period, showing whether they will increase, decrease, or remain stable. This analysis is useful for forecasting and making informed decisions based on the anticipated price trends.
          </p>
        </div>
      </div>
    </div>
  );
}
