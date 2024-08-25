import React, { useState } from 'react';
import axios from 'axios';
import "../styles/admin.css"

const AdminPage = () => {
  const [location, setLocation] = useState('');
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');

  const locations = [
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Houston', label: 'Houston' },
    { value: 'Phoenix', label: 'Phoenix' },
    { value: 'Philadelphia', label: 'Philadelphia' },
    { value: 'San Antonio', label: 'San Antonio' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the prices array with the current location and price
    const prices = [
      { location: location, price: parseFloat(price) }
    ];

    try {
      const response = await axios.post(
        'http://localhost:3000/food', // Make sure this URL matches your backend route
        { name: foodName, prices }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center" style={{
      background: 'linear-gradient(to bottom, rgba(128, 128, 128, 0.5) 50%, rgba(0, 0, 0, 0.5) 50%)'
    }}>
      <div className="max-w-md p-4 md:p-6 lg:p-8 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location:</label>
            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="mt-1 block w-full pl-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a location</option>
              {locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Food Name:</label>
            <input
              type="text"
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
              className="mt-1 block w-full pl-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="mt-1 block w-full pl-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
