const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
    );
    console.log("DB connected");

  } catch (err) {
    console.log('HAVING SOME ERROR IN DATABASE');
  }
};

module.exports = connectDB;

