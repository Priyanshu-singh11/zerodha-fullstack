 const { Schema } = require('mongoose');

const HoldingsSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String
});

module.exports = HoldingsSchema;


// Holdings {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },

