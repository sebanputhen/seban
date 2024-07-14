const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baptismName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  dob: {
    type: Date,
    required: true,
    max: Date.now(),
  },
  phone: {
    type: String,
    required: true,
  },
  forane: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forane",
    required: true,
  },
  parish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parish",
    required: true,
  },
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
