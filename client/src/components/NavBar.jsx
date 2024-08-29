import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from "../plant.png";

export function NavBar() {
  const location = useLocation();
  const tabArray = [
    { name: "Home", add: "/" },
    { name: "Admin", add: "/admin" },
    { name: "Product Description", add: "/product-description" },
    { name: "Our Team", add: "/our-team" }
  ];

  return (
    <nav className="pt-2 font-serif border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-700">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3 ml-5">
          <img
            src={logo}
            className="h-8 dark:bg-transparent"
            alt="Flowbite Logo"
          />
          <span className="text-sm font-semibold whitespace-nowrap dark:text-white">
            Agro-horticulture
            <br />
            Price Predictor
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-100 pt-3 pb-3 rounded-2xl">
          <ul className="flex flex-col md:flex-row font-medium mt-4 md:space-x-8 md:mt-0 rounded-lg bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            {tabArray.map((ele) => (
              <li key={ele.add} className=" pr-2 pl-2 text-lg">
                <Link
                  to={ele.add}
                  className={`block py-2 px-4 rounded-full md:border-0 md:hover:text-blue-700 md:pr-5 md:pl-5 dark:md:hover:text-white dark:md:hover:bg-blue-400 ${
                    location.pathname === ele.add ? "text-white bg-blue-400" : "dark:text-blue-600"
                  }`}
                >
                  {ele.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
