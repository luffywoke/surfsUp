// Require the necessary dependencies
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const {verifyToken} = require('./middleware/authMiddleware');
require('dotenv').config();

// Set up Express app instance
const app = express();
const PORT = 5000;

// Adding middleware to read requests that have JSON data 
app.use(express.json());
app.use(cors());

//Connect mongoose to MongoDB
mongoose.connect(process.env.MONGO_URI,)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));


// Using the auth routes for handling authentication-related requests
app.use('/api/auth',authRoutes);
// Using the profile routes for handling profile-related requests
app.use('/api/profile', profileRoutes);

app.get('/api/test', verifyToken, (req, res) => {
    res.json({message: 'Testing token', user: req.user});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});