const mongoose = require('mongoose');

// Define the Profile schema
const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    skillLevel: {
        type: String,
        required:false
    },

    location: {
        type: String,
        required:false
    },

    profilePhoto: {
        type: String,
        required:false
    },

    bio: {
        type: String,
        required:false
    }

    
}, {timestamps: true});

// Creating Profile Model
const Profile = mongoose.model('Profile', profileSchema);

// Exporting the Profile model
module.exports = Profile;