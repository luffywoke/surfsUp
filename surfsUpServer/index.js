// Require the necessary dependencies
const mongoose = require('mongoose');
const express = require('express');
const authRoutes = require('./routes/auth');
const middleware = require('./middleware/authMiddleware');
require('dotenv').config();

// Set up Express app instance
const app = express();
const PORT = 5000;

// Adding middleware to read requests that have JSON data 
app.use(express.json());

//Connect mongoose to MongoDB
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Using the auth routes for handling authentication-related requests
app.use('/api/auth',authRoutes);