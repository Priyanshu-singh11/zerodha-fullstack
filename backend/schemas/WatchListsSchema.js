const {Schema} = require('mongoose');

const WatchListsSchema = new Schema({
    name:String,
    price:Number,
    percent:Number,
    isDown:Boolean,
})

module.exports =  WatchListsSchema 

