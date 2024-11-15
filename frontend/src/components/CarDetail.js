import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CarDetail = () => {
  const { id } = useParams(); // Extract the car ID from the URL
  const [car, setCar] = useState(null); // Store car details
  const [error, setError] = useState(null); // Store error messages

  // Function to fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Authorization Token:', token); 
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API Response:', response.data); 
        setCar(response.data); // Set the fetched car details in state
      } catch (err) {
        console.error('Error in API call:', err.response || err.message);
        setError('Failed to fetch car details'); // Set error message if fetch fails
      }
    };

    fetchCarDetails(); // Fetch details on component mount
  }, [id]); // Dependency array includes only `id`

  if (error) return <p>{error}</p>; // Show error message if any
  if (!car) return <p>Loading car details...</p>; // Show loading state

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <ul>
        {car.images.map((image, index) => (
          <li key={index}>
            <img src={image} alt={`Car ${index + 1}`} width="200" />
          </li>
        ))}
      </ul>
      <p>Tags: {car.tags.join(', ')}</p> {/* Display tags */}
    </div>
  );
};

export default CarDetail;
