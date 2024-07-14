const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    building: {
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
    koottayma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Koottayma",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Family = mongoose.model("Family", familySchema);
module.exports = Family;
