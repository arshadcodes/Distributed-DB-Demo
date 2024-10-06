import React, { useState } from "react";

const RegionData = () => {
  const [region, setRegion] = useState("India"); // Default to 'India'
  const [data, setData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Track if data is fetched

  // Function to simulate fetching random data
  const fetchData = () => {
    const randomData = Array.from({ length: 5 }, (_, i) => ({
      name: `Item ${i + 1} from ${region} - ${Math.floor(Math.random() * 100)}`,
    }));
    setData(randomData);
    setHasFetched(true); // Set to true when data is fetched
  };

  return (
    <div className="container mx-auto p-8">
      {/* Dropdown and Button */}
      <div className="flex items-center justify-center mb-10">
        <label
          htmlFor="region"
          className="text-lg font-semibold text-gray-700 mr-4"
        >
          Select Region:
        </label>
        <select
          id="region"
          className="custom-select" // Apply custom class
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="India">India</option> {/* Value and label updated */}
          <option value="Europe">Europe</option> {/* Value and label updated */}
        </select>
        <button
          className="custom-button" // Apply custom class
          onClick={fetchData}
        >
          Fetch Data
        </button>
      </div>

      {/* Display Data only if fetched */}
      {hasFetched && (
        <div className="text-center bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Data from {region} Database
          </h2>
          <ul className="list-disc pl-6 text-left text-gray-700">
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegionData;
