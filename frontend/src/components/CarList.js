// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CarList = () => {
//   const [cars, setCars] = useState([]); // Store fetched cars
//   const [error, setError] = useState(null); // For handling errors

//   // Function to fetch cars from the backend
//   const fetchCars = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Get token from localStorage or session
//       const response = await axios.get('http://localhost:5000/api/cars', {
//         headers: {
//           'Authorization': `Bearer ${token}`, // Pass token in header
//         },
//       });
//       setCars(response.data); // Update the state with the fetched cars
//     } catch (err) {
//       setError('Failed to fetch cars'); // Handle error if the request fails
//     }
//   };

//   // Use useEffect to fetch cars on component mount
//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <div>
//       <h1>Car List</h1>
//       {error && <p>{error}</p>} {/* Display error message */}
//       <ul>
//         {cars.length === 0 ? (
//           <p>No cars available</p>
//         ) : (
//           cars.map((car) => (
//             <li key={car._id}>
//               <h3>{car.title}</h3>
//               <p>{car.description}</p>
//               <img src={car.images[0]} alt={car.title} width="200" />
//               {/* Show more car details as needed */}
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default CarList;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CarList = () => {
  const [cars, setCars] = useState([]); // Store fetched cars
  const [error, setError] = useState(null); // For handling errors
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  // Function to fetch cars from the backend with or without a search query
  const fetchCars = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage or session
      const response = await axios.get(`http://localhost:5000/api/cars${searchQuery ? `?q=${searchQuery}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Pass token in header
        },
      });
      setCars(response.data); // Update the state with the fetched cars
    } catch (err) {
      setError('Failed to fetch cars'); // Handle error if the request fails
    }
  }, [searchQuery]); // Add searchQuery as dependency to re-fetch when it changes

  // Use useEffect to fetch cars on component mount or when search query changes
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);  // Only run effect when fetchCars changes

  return (
    <div>
      <h1>Car List</h1>
      
      {/* Search bar for filtering cars */}
      <input
        type="text"
        placeholder="Search cars by title, description, or tags"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      
      {error && <p>{error}</p>} {/* Display error message */}
      
      <ul>
        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          cars.map((car) => (
            <li key={car._id}>
              <Link to={`/cars/${car._id}`}>
              <h3>{car.title}</h3>
              <p>{car.description}</p>
              <img src={car.images[0]} alt={car.title} width="200" />
              </Link>
              {/* Show more car details as needed */}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CarList;
