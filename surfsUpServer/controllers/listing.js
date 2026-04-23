const Listing = require('../models/Listing');

// Creates a new listing
async function createListing(req, res) {
    try {
        const userId = req.user.userId;
        const { title, price, condition, description, photoURL } = req.body;

        const listing = await Listing.create({
            user: userId,
            title,
            price,
            condition,
            description,
            photoURL
        });

        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Retrieves all logged-in user's listings from the database
async function getMyListings(req, res) {
    try {
        const userId = req.user.userId;
        const listings = await Listing.find({ user: userId })
            .populate('user', 'username email');

        res.status(200).json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


// Retrieves all listings from the database
async function getListings(req, res) {
    try {
        const listings = await Listing.find()
            .populate('user', 'username email');

        res.status(200).json(listings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Retrieves a specific listing by ID
async function getListingById(req, res) {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate('user', 'username email');

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json(listing);
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Marks listing as sold by setting isSold to true 
async function markAsSold(req, res) {
    try {
        const userId = req.user.userId;
        const listing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: { isSold: true } },
            { new: true }
        );

        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        res.status(200).json({ message: 'Listing marked as sold', listing });
    } catch (error) {
        console.error('Error marking listing as sold:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createListing, getListings, getMyListings, getListingById, markAsSold };