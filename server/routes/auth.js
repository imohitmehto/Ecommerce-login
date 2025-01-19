const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login Route
router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { sub: googleId, email, name } = ticket.getPayload(); // Extract user info from Google token

        // Check if user exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user if it doesn't exist
            user = new User({
                googleId,
                email,
                name,
            });
            await user.save();
        }

        // Generate a JWT for your application
        const appToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token: appToken });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ message: 'Invalid Google token' });
    }
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, password, role = 'user' } = req.body; // Default role is 'user'

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

module.exports = router;
