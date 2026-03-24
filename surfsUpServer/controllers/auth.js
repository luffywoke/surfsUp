async function registerUser (req, res) {
    try {
        const {username, password, email} = req.body;
        // Check if email exists
        const emailExists = await User.findOne({email: email});
        if (emailExists) {
            return res.status(409).json({message: 'Email already exists'});
        }
        // Hashing password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({message: 'Server error'});
    }
}

async function loginUser (req, res) {

}