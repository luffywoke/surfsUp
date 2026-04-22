const mongoose = require('mongoose');

// Listing Schema
const listingSchema = new mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        title: {
            type: String,
            required:true
        },
    
        price: {
            type: Number,
            required:true
        },

        condition: {
            type: String, 
            required:true
        },

        description: {
            type: String,
            required:false
        },

        photoURL: {
            type: String,
            required:false
        },

        isSold: {
            type: Boolean,
            default: false
        }

    
        
}, {timestamps: true});

// Creating Listing Model
const Listing = mongoose.model('Listing', listingSchema);

// Exporting the Listing model
module.exports = Listing;