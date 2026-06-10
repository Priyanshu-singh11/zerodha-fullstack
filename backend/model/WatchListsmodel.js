const mongoose = require('mongoose');
const WatchListsSchema = require('../schemas/WatchListsSchema')

const WatchListsmodel = mongoose.model('watchlist', WatchListsSchema);

module.exports = WatchListsmodel;
