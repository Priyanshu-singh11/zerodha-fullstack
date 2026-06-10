const mongoose = require("mongoose");
const OtpSchema = require("../schemas/OtpSchema");

const Otpmodel = mongoose.model(
  "Otp",
  OtpSchema
);

module.exports = Otpmodel;