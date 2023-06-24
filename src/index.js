// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create the express app
const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/vehicle_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the schema for the vehicle collection
const vehicleSchema = new mongoose.Schema({
  type: String,
  name: String,
});

// Create the vehicle model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Seed initial data into the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Vehicle.deleteMany();

    // Seed new data
    const vehicles = [
      { type: 'car', name: 'Hatchback 1' },
      { type: 'car', name: 'SUV 1' },
      { type: 'car', name: 'Sedan 1' },
      { type: 'bike', name: 'Cruiser 1' },
      { type: 'bike', name: 'Sports 1' },
    ];

    await Vehicle.insertMany(vehicles);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();

// Define the API routes

// Get all vehicles
app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit a booking
app.post('/bookings', async (req, res) => {
  const { type, name } = req.body;

  try {
    // Check if the vehicle is available
    const vehicle = await Vehicle.findOne({ type, name });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Perform your checks to ensure bookings don't overlap
    

    // Save the booking to the database
    

    res.json({ message: 'Booking successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});