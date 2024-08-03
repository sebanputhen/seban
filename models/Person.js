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
  email: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  occupation: {
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
    enum: [
      "head",
      "bride",
      "groom",
      "son",
      "daughter",
      "deceased",
      "father",
      "mother",
      "brother",
      "sister",
    ],
  },
});

personSchema.pre("save", async function (next) {
  if (this.relation === "head") {
    const existingHead = await mongoose.model("Person").findOne({
      family: this.family,
      relation: "head",
    });

    if (existingHead) {
      return next(new Error("There is already a head in this family."));
    }
  }
  next();
});

personSchema.post("save", async function (doc, next) {
  if (doc.relation === "head") {
    await mongoose
      .model("Family")
      .findByIdAndUpdate(doc.family, { head: doc._id });
  }
  next();
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
