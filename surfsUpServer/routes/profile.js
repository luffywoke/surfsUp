const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get profile route
router.get('/', verifyToken, getProfile);

// Update profile route
router.put('/', verifyToken, updateProfile);

module.exports = router;