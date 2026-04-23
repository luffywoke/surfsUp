const express = require('express');
const { createListing, getListings, getMyListings, getListingById, markAsSold } = require('../controllers/listing');
const { verifyToken } = require('../middleware/authMiddleware');

// Setting up express router
const router = express.Router();

// Setting up all routes
router.post('/', verifyToken, createListing);
router.get("/", verifyToken, getListings);
router.get('/my', verifyToken, getMyListings);
router.get('/:id', verifyToken, getListingById);
router.put('/:id/sold', verifyToken, markAsSold);

module.exports = router;