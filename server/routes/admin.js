const express = require('express');
const { verifyToken, checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/dashboard', verifyToken, checkRole(['admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;
