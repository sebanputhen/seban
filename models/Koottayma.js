const mongoose = require("mongoose");

const koottaymaSchema = new mongoose.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

const Koottayma = mongoose.model("Kottayma", koottaymaSchema);
module.exports = Koottayma;
