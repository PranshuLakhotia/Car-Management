
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// dotenv.config();

// const app = express();

// // CORS Middleware Configuration
// const corsOptions = {
//   origin: 'http://localhost:3000', // Allow frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
// };

// // Enable CORS for all routes
// app.use(cors(corsOptions));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// // Routes
// app.use('/api/auth', authRoutes);

// // Handle Preflight OPTIONS request
// app.options('*', cors(corsOptions)); // This ensures preflight requests are handled

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/cars');  // Import car routes

dotenv.config();

const app = express();

// CORS Middleware Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/cars', carRoutes);  // Add this line to handle /api/cars routes

app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack trace
  res.status(500).send('Something went wrong!');
});


// Handle Preflight OPTIONS request
app.options('*', cors(corsOptions)); // This ensures preflight requests are handled

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
