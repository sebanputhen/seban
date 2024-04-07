const Forane = require("../models/Forane");

async function getAllForanes(req, res, next) {
  try {
    const foranes = await Forane.find().select("_id name");
    res.status(200).json(foranes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOneForane(req, res, next) {
  try {
    const forane = await Forane.findById(req.params.foraneid);
    res.status(200).json(forane);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewForane(req, res, next) {
  try {
    const newforane = new Forane(req.body);
    await newforane.save();
    res.status(201).json(newforane);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Forane" });
  }
}

async function updateForane(req, res, next) {
  try {
    const updatedForane = await Forane.findByIdAndUpdate(
      req.params.foraneid,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedForane);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Updating Forane" });
  }
}

async function deleteForane(req, res, next) {
  try {
    const deletedForane = await Forane.findByIdAndDelete(req.params.foraneid);
    res.status(200).json(deletedForane);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Forane" });
  }
}

module.exports = {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
};
