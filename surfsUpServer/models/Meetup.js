const mongoose = require('mongoose');

// Meetup Schema
const meetupSchema = new mongoose.Schema({
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

        date: {
            type: Date, 
            required:false
        },

        description: {
            type: String,
            required:false
        },

        participants: [{ 
            type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        }]

    
        
}, {timestamps: true});

// Creating Meetup Model
const Meetup = mongoose.model('Meetup', meetupSchema);

// Exporting the Meetup model
module.exports = Meetup;