const Parish = require("../models/Parish");

async function getAllParish(req, res, next) {
  try {
    const parishes = await Parish.find({ forane: req.params.foraneid }).select("_id name");
    res.status(200).json(parishes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOneParish(req, res, next) {
  try {
    const parish = await Parish.findById(req.params.parishid).populate(
      "forane", "_id name"
    );
    console.log(req.params)
    res.status(200).json(parish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewParish(req, res, next) {
  try {
    const newparish = new Parish(req.body);
    await newparish.save();
    res.status(201).json(newparish);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Parish" });
  }
}

async function updateParish(req, res, next) {
  try {
    const updatedParish = await Parish.findByIdAndUpdate(
      req.params.parishid,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedParish);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Updating Parish" });
  }
}

async function deleteParish(req, res, next) {
  try {
    const deletedParish = await Parish.findByIdAndDelete(req.params.parishid);
    res.status(200).json(deletedParish);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Parish" });
  }
}

module.exports = {
  getAllParish,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
};
