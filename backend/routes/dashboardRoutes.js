const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router();

const { holding, position, watchlist, orders, addOrders } = require('../controllers/dashboardHandler');


router.get('/holdings',authMiddleware,holding)
router.get('/positions',authMiddleware, position)
router.get('/watchlist',authMiddleware, watchlist)
router.get('/orders',authMiddleware, orders)
router.post('/addOrders',authMiddleware, addOrders);


module.exports = router