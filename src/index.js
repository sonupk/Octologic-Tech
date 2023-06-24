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

//Create the Bookings model
const bookingSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    wheels: {
      type: Number,
      required: true
    },
    vehicleType: {
      type: String,
      required: true
    },
    vehicleModel: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    }
  });

  // Create the booking model
  const Booking = mongoose.model('Booking', bookingSchema);
  

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
    try {
    const bookingData=req.body
    const { firstName, lastName, wheels, vehicleType, vehicleModel, startDate, endDate } = bookingData;
    res.json({ message: 'Booking successful' });
    // Perform booking logic here, checking for overlapping bookings and 
//saving the booking to the database
  } catch (error) {
    //res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});