const mongoose = require('mongoose');

const OrdersSchema = require('../schemas/OrdersSchema');

const Ordersmodel = mongoose.model('order',OrdersSchema);


module.exports = Ordersmodel

