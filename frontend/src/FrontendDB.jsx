import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const RegionData = () => {
  const [region, setRegion] = useState('India'); // Default region
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Use axios to make the API request
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/data`, {
        params: { region },  // Pass region as a query parameter
      });
      
      // Ensure response data is an array before setting it
      const result = Array.isArray(response.data) ? response.data : [];
      setData(result);
      console.log(result);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [region]);

  return (
    <div className="container  mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="region" className="block text-lg font-semibold">Select Region:</label>
        <select
          id="region"
          className="p-2 border rounded"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="India">India</option>
          <option value="Europe">Europe</option>
        </select>
      </div>

      <div className="data-table">
        <h2 className="text-2xl font-bold">Data from {region} Database</h2>
        {data.length > 0 ? (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.type}</td>
                  <td className="border px-4 py-2">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available for {region}</p>
        )}
      </div>
    </div>
  );
};

export default RegionData;
