const express = require('express');
const { verifyToken, checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/products', verifyToken, checkRole(['user']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the product screen' });
});

module.exports = router;
