const express = require("express");
const { createMeetup, getMeetups, getMeetupById, joinMeetup } = require('../controllers/meetup');
const { verifyToken } = require('../middleware/authMiddleware');

// Setting up express router
const router = express.Router();

// Setting up all routes
router.post('/', verifyToken, createMeetup);
router.get("/", verifyToken, getMeetups);
router.get('/:id', verifyToken, getMeetupById);
router.put('/:id', verifyToken, joinMeetup);

module.exports = router;