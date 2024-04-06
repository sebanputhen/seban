const Forane = require("../models/Forane");

async function getAllForanes(req, res, next) {
  try {
    const foranes = await Forane.find().select("_id name");
    res.status(200).json(foranes);
  } catch (err) {
    console.log(err);
  }
}

async function getOneForane(req, res, next) {
  try {
    const forane = await Forane.findById(req.params.id);
    res.status(200).json(forane);
  } catch (err) {
    console.error(err);
  }
}

async function createNewForane(req, res, next) {
  try {
    const newforane = new Forane(req.body);
    await newforane.save();
    res.status(201).json(newforane);
  } catch (err) {
    console.log(err);
  }
}

async function updateForane(req, res, next) {
  try {
    const updatedForane = await Forane.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedForane);
  } catch (err) {
    console.error(err);
  }
}

async function deleteForane(req, res, next) {
  try {
    const deletedForane = await Forane.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedForane);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
};
