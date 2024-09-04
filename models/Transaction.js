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
      default: () => format(new Date(), "dd/MM/yyyy"),
      validate: {
        validator: (value) => {
          return !isAfter(value, format(new Date(), "dd/MM/yyyy"));
        },
        message: "Date cannot be after today.",
      },
      set: function (value) {
        return parse(value, "dd/MM/yyyy", new Date());
      },
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre("save", async function (next) {
  const personId = this.person;
  const year = this.date.split("/")[2];
  console.log(this.date);
  const existingTransaction = await this.constructor
    .findOne({
      person: personId,
      date: {
        $gte: () => format(new Date(`01/01${year}`), "dd/MM/yyyy"),
        $lte: () => format(new Date(`12/31/${year}`), "dd/MM/yyyy"),
      },
    })
    .exec();
  if (existingTransaction) {
    throw new Error("Only one transaction per person per year is allowed.");
  }
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
