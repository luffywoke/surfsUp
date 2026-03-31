const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function registerUser (req, res) {
    try {
        const {username, password, email} = req.body;
        // Check if email exists
        const emailExists = await User.findOne({email: email});
        if (emailExists) {
            return res.status(409).json({message: 'Email already exists'});
        }
        // Hashing password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user using Model.create() method where 
        // it creates the instance and saves it 
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({message: 'User registered successfully', userId: newUser._id});
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error'});
    }
}

async function loginUser (req, res) {
    try { 
        const {email, password} = req.body;

        // Check if user exists
        const userExists = await User.findOne({email: email});
        if(!userExists) {
            return res.status(404).json({message: 'User not found'});
        }

        // Compare plaintext password with hashed password
        const match = await bcrypt.compare(password, userExists.password);
        if (!match) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Generate JWT token
        const secretKey = process.env.JWT_SECRET;
        const payload = {userId: userExists._id, email:email};
        const token = jwt.sign(payload, secretKey, {expiresIn: "7 days"});
        res.status(200).json({message: 'Login successful', token: token});
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    registerUser, loginUser
}

