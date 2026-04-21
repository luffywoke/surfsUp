const Meetup = require('../models/Meetup');

// Creates a new meetup and automatically adds the creator as the first participant
async function createMeetup(req, res) {
    try {
        const userId = req.user.userId;
        const { location, date, skillLevel, description } = req.body;

        const meetup = await Meetup.create({
            user: userId,
            location,
            date,
            skillLevel,
            description,
            participants: [userId] // Creator automatically joins
        });

        res.status(201).json({ message: 'Meetup created successfully', meetup });
    } catch (error) {
        console.error('Error creating meetup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Retrieves all meetups from the database and populates
// the creator and participants with their username and email
async function getMeetups(req, res) {
    try {
        const meetups = await Meetup.find()
            .populate('user', 'username email')
            .populate('participants', 'username');

        res.status(200).json(meetups);
    } catch (error) {
        console.error('Error fetching meetups:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Retrieves all meetups from the database and populates
// the creator and participants with their username and email
async function getMeetupById(req, res) {
    try {
        const meetup = await Meetup.findById(req.params.id)
            .populate('user', 'username email')
            .populate('participants', 'username');

        if (!meetup) {
            return res.status(404).json({ message: 'Meetup not found' });
        }

        res.status(200).json(meetup);
    } catch (error) {
        console.error('Error fetching meetup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Adds the logged in user to the participants array of a meetup
// Uses $push to append their ID without overwriting existing participants
async function joinMeetup(req, res) {
    try {
        const userId = req.user.userId;
        const meetup = await Meetup.findByIdAndUpdate(
            req.params.id,
            { $push: { participants: userId } },
            { new: true }
        );

        if (!meetup) {
            return res.status(404).json({ message: 'Meetup not found' });
        }

        res.status(200).json({ message: 'Joined meetup successfully', meetup });
    } catch (error) {
        console.error('Error joining meetup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { createMeetup, getMeetups, getMeetupById, joinMeetup };