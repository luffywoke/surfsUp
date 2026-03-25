const express = require('express');
const { registerUser } = require('../controllers/auth');

// Setting up express.Router()
const router = express.Router();

// Setting up the routes for authentication
router.post('/register', registerUser);

router.post('/login', (req, res) => {
});

module.exports = router;