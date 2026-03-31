const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth');

// Setting up express.Router()
const router = express.Router();

// Setting up the routes for authentication
router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;