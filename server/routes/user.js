const express = require('express');
const { verifyToken, checkRole } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/products', verifyToken, checkRole(['user']), (req, res) => {
    const products = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 150 },
        { id: 3, name: 'Product 3', price: 200 },
    ];
    res.status(200).json(products);
});

module.exports = router;
