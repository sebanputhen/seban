const mongoose = require("mongoose");

const foraneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
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

const Forane = mongoose.model('forane',foraneSchema)
module.exports=Forane;
