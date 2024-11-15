const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [String], // Array of image URLs
  tags: [String], // Array of tags
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
