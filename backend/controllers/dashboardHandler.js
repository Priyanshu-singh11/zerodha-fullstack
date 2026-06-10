const Holdingsmodel = require('../model/Holdingsmodel')
const Positinsmodel = require('../model/Positionsmodel');
const Ordersmodel = require('../model/Ordersmodel');
const WatchListmodel = require('../model/WatchListsmodel')



const holding =async (req, res) => {
  let holdingData = await Holdingsmodel.find({});
  res.send(holdingData)
};
 
const position = async (req, res) => {
  let positionData = await Positinsmodel.find({});
  res.send(positionData)
}

const watchlist = async (req, res) => {
  let watchlistData = await WatchListmodel.find({});
  res.send(watchlistData)
}

const orders = async (req, res) => {
  if(!req.user || !req.user.id){
    return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
  }
  try {
    const orderData = await Ordersmodel.find({userId: req.user.id }).sort({ _id: -1 });
    res.status(200).json({
      success: true,
      totalOrders: orderData.length,
      orders: orderData
    })
  }
  catch (error) {
    console.log('error')
    res.status(500).json({
      message: 'internal server error'
    })
  }
}




const addOrders = async (req, res) => {
  let newOrder = new Ordersmodel({
    userId: req.user.id,
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode
  });
  await newOrder.save();
  res.send('succcefull add orders ');
}

module.exports = {
  holding,
  position,
  watchlist,
  orders,
  addOrders
};