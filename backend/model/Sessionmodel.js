const mongoose = require("mongoose");
const SessionSchema = require("../schemas/SessionSchema");

const Sessionmodel = mongoose.model(
  "Session",
  SessionSchema
);

module.exports = Sessionmodel;