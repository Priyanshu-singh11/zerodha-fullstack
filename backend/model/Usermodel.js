const mongoose = require('mongoose');

const UserSchema = require('../schemas/UserSchema');

const Usermodel = mongoose.model('User',UserSchema);

module.exports = Usermodel; 