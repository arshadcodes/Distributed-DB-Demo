import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios

const RegionData = () => {
  const [region, setRegion] = useState('Canada');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Use axios to make the API request
      const response = await axios.get(`/api/data`, {
        params: { region }  // Pass region as a query parameter
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
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="region" className="block text-lg font-semibold">Select Region:</label>
        <select
          id="region"
          className="p-2 border rounded"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="India">India</option>
          <option value="Europe">Eu</option>
        </select>
      </div>

      <div className="data-table">
        <h2 className="text-2xl font-bold">Data from {region} Database</h2>
        <ul className="list-disc pl-5">
          {/* Check if data is an array before mapping */}
          {data.length > 0 ? (
            data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))
          ) : (
            <p>No data available for {region}</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RegionData;
