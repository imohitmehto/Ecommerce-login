const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const checkRole = (roles) => async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Role verification failed' });
    }
};

module.exports = { verifyToken, checkRole };
