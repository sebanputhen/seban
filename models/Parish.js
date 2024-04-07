const mongoose = require("mongoose");

const parishSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  forane: {
    type: mongoose.ObjectId,
    ref: "Forane",
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  lastupdated: {
    type: Date,
    default: Date.now(),
  },
});

const Parish = mongoose.model("Parish", parishSchema);
module.exports = Parish;
