const mongoose = require('mongoose');
const PositionsSchema = require('../schemas/PositionsSchema');

const Positionsmodel = mongoose.model('position', PositionsSchema);

module.exports = Positionsmodel;