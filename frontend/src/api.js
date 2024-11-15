import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const api = {
  registerUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },

  loginUser: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

    // Fetch car list
    getCars: async () => {
      try {
        const response = await axios.get(`${API_URL}/cars`);
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch cars');
      }
    },
  
    // Create a new car (if needed in CarCreate component later)
    createCar: async (carData) => {
      try {
        const response = await axios.post(`${API_URL}/cars`, carData);
        return response.data;
      } catch (error) {
        throw new Error('Failed to create car');
      }
    }
};

export default api;
