const { Schema } = require('mongoose');

const PositionsSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    product:String,
    name:String,
    qty:String,
    avg:String,
    price:Number,
    net:String,
    day:String,
    isLoss:Boolean
})

module.exports = PositionsSchema;
//  product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
