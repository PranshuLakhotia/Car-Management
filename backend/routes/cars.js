
const express = require('express');
const Car = require('../models/Car');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check if user is authenticated
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer token"

    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send('Token expired');
            }
            return res.status(500).send('Failed to authenticate token');
        }

        req.userId = decoded.id;  // Pass the decoded information to the next middleware
        next();
    });
};



// Create a car
router.post('/create', verifyToken, async (req, res) => {
    const { title, description, images, tags } = req.body;
    const newCar = new Car({
        title,
        description,
        images,
        tags,
        user: req.user.id, // Associate the car with the logged-in user
    });

    try {
        await newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ error: 'Error creating car' });
    }
});

// Get all cars for the logged-in user
router.get('/', async (req, res) => {
    try {
      const cars = await Car.find(); // Assuming this gets all cars from the DB
      res.json(cars);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cars' });
    }
  });

// Get details of a specific car
// Search cars based on title, description, or tags
router.get('/search', verifyToken, async (req, res) => {
    const keyword = req.query.q;  // Query string from the frontend
    
    if (!keyword) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Find cars where title, description, or tags match the keyword (case insensitive)
        const cars = await Car.find({
            user: req.user.id, // Ensure cars belong to the logged-in user
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ]
        });

        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Error searching cars' });
    }
});

// Get a car by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id); // Find car by ID
        if (!car) {
            return res.status(404).json({ error: 'Car not found' }); // Handle not found
        }
        res.json(car); // Return car details
    } catch (error) {
        res.status(500).json({ error: 'Error fetching car details' }); // Handle errors
    }
});



// Update a car
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, images, tags } = req.body;
    try {
        const car = await Car.findById(req.params.id);
        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Car not found or not authorized' });
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.images = images || car.images;
        car.tags = tags || car.tags;

        await car.save();
        res.json({ message: 'Car updated successfully', car });
    } catch (error) {
        res.status(500).json({ error: 'Error updating car' });
    }
});

// Delete a car
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Car not found or not authorized' });
        }
        await car.remove();
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting car' });
    }
});




module.exports = router;
