const Profile = require('../models/Profile');


async function getProfile (req, res) {
    try {
        // Get logged in user's ID from the token
        const userId = req.user.userId;
        // Find the profile associated with the user ID
        const profile = await Profile.findOne({user: userId}).populate('user', 'username email');

        if (!profile) {
            return res.status(404).json({message: 'Profile not found'});
        }

        // Send back profile 
        res.status(200).json(profile);
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({message: 'Server error'});
    }
}

async function updateProfile (req, res) {
    try {
        const userId = req.user.userId;
        const {bio, skillLevel, location, profilePhoto} = req.body;

        const profile = await Profile.findOneAndUpdate(
            {user: userId},
            { $set: {bio, skillLevel, location, profilePhoto} },
            {new: true, upsert: true} // Create if not exists
        ).populate('user', 'username email');

        res.status(200).json({message: 'Profile updated', profile});
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({message: 'Server error'});
    }
}

module.exports = {
    getProfile, updateProfile
}