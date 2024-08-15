const mongoose = require("mongoose");
const { parse, format, isAfter } = require("date-fns");

const transactionSchema = new mongoose.Schema(
  {
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
      type: String,
      required: true,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: function () {
        const formattedDate = format(new Date(), "dd/MM/yyyy");
        return parse(formattedDate, "dd/MM/yyyy", new Date());
      },
      validate: {
        validator: function (value) {
          return !isAfter(value, new Date());
        },
        message: "Date cannot be after today.",
      },
      set: function (value) {
        if (typeof value === "string") {
          return parse(value, "dd/MM/yyyy", new Date());
        }
        return value;
      },
      get: function (value) {
        return value ? format(value, "dd/MM/yyyy") : null;
      },
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
