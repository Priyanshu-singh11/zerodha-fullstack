const mongoose = require('mongoose');
const HoldingsSchema = require('../schemas/HoldingsSchema');

const Holdingsmodel = mongoose.model('holding', HoldingsSchema);

module.exports = Holdingsmodel;