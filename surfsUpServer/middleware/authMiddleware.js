const jwt = require('jsonwebtoken');

async function verifyToken (req, res, next) {
    try {
        // Checking for an authorization header which contains the token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({message: 'Authorization header missing'});
        }
        // Token can be accessed anywhere
        let token;
        // Since authorization headers start with bearer, we remove it
        // to get the token itself
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7, authHeader.length);
        }
        // Decoded user info using verify so route handler knows
        // who is logged in
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({message: 'Server error'});
    }
    
}

module.exports = {
    verifyToken
}