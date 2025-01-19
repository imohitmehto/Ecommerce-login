const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const colors = require('colors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// Import middleware
const { verifyToken, checkRole } = require('./middlewares/roleMiddleware');

// Initialize environment variables
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware configuration
app.use(
    cors({
        origin: 'http://localhost:3000', // Frontend URL
        methods: 'GET,POST,PUT,DELETE',
        credentials: true, // Allow cookies and credentials
    })
);
app.use(express.json());

app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Route configurations
app.use('/api/auth', authRoutes);       // Authentication routes
app.use('/api/admin', adminRoutes);     // Admin-only routes
app.use('/api/user', userRoutes);       // User-only routes

// Google Auth Routes
app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('http://localhost:3000'); // Redirect to frontend after login
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.redirect('http://localhost:3000'); // Redirect to frontend after logout
    });
});

app.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Connect to the database
connectDB();

// Define PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});
