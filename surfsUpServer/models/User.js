const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique:true
    }, 

    email: {
        type: String,
        required:true,
        unique:true
    },

    password: {
        type: String,
        required:true
    },
    
    skillLevel: {
        type: String,
        required:false
    },


    
}, {timestamps: true});

// Creating User Model
const User = mongoose.model('User', userSchema);

// Exporting the User model
module.exports = User;

// This is creating and exporting user model in one line
//module.exports = User = mongoose.model('User', userSchema);
