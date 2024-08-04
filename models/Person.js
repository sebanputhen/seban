const mongoose = require("mongoose");
const { parse, isAfter } = require("date-fns");

const personSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: function (value) {
          return !isAfter(value, new Date());
        },
        message: "Date of birth cannot be after today.",
      },
      set: function (value) {
        return parse(value, "dd/MM/yyyy", new Date());
      },
    },
    phone: {
      type: String,
      required: true,
      maxlength: 13,
      minlength: 10,
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
        "father",
        "mother",
        "brother",
        "sister",
      ],
    },
    status: {
      type: String,
      enum: ["alive", "deceased"],
      default: "alive",
    },
  },
  {
    timestamps: true,
  }
);

personSchema.pre("save", async function (next) {
  if (this.relation === "head") {
    const existingHead = await mongoose.model("Person").findOne({
      family: this.family,
      relation: "head",
    });

    if (existingHead) {
      return next(new Error("There is already a head in this family."));
    }
  } else if (this.status === "deceased") {
    const family = await mongoose.model("Family").findById(this.family);
    if (family.head && family.head.toString() === this._id.toString()) {
      family.head = undefined;
      await family.save();
    }
  }
  next();
});

personSchema.post("save", async function (doc, next) {
  if (doc.relation === "head") {
    const family = await mongoose.model("Family").findById(doc.family);
    if (!family.head) {
      await mongoose.model("Family").findByIdAndUpdate(doc.family, { head: doc._id });
    }
  }
  next();
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
