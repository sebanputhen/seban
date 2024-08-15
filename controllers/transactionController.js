const Transaction = require("../models/Transaction");
const Person = require("../models/Person");
const mongoose = require("mongoose");

async function getAllFamilyTransactions(req,res)
{
  try {
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching family transactions" });
    }
}

async function createNewTransaction(req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction successfully recorded." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while recording the transaction." });
  }
}

async function calculateForaneTotal(req, res) {
  try {
    const total = await Transaction.aggregate([
      { $match: { forane: new mongoose.Types.ObjectId(req.params.foraneid) } },
      { $group: { _id: null, totalAmount: { $sum: "$amountPaid" } } },
    ]);
    res.status(200).json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while calculating the total amount for the Forane.",
    });
  }
}

async function calculateParishTotal(req, res) {
  try {
    const total = await Transaction.aggregate([
      { $match: { parish: new mongoose.Types.ObjectId(req.params.parishid) } },
      { $group: { _id: null, totalAmount: { $sum: "$amountPaid" } } },
    ]);
    res.status(200).json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while calculating the total amount for the Parish.",
    });
  }
}

async function calculateFamilyTotal(req, res) {
  try {
    const total = await Transaction.aggregate([
      { $match: { family: req.params.familyid } },
      { $group: { _id: null, totalAmount: { $sum: "$amountPaid" } } },
    ]);
    res.status(200).json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while calculating the total amount for the Family.",
    });
  }
}

async function calculatePersonTotal(req, res) {
  try {
    const total = await Transaction.aggregate([
      { $match: { person: new mongoose.Types.ObjectId(req.params.personid) } },
      { $group: { _id: null, totalAmount: { $sum: "$amountPaid" } } },
    ]);
    res.status(200).json({ totalAmount: total[0]?.totalAmount || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "An error occurred while calculating the total amount for the Person.",
    });
  }
}

module.exports = {
  createNewTransaction,
  calculateForaneTotal,
  calculateParishTotal,
  calculateFamilyTotal,
  calculatePersonTotal,
};
