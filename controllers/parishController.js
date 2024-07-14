const Parish = require("../models/Parish");

async function getAllParishes(req, res) {
  try {
    const parishes = await Parish.find({ forane: req.params.foraneid }).select(
      "_id name"
    );
    res.status(200).json(parishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOneParish(req, res) {
  try {
    const parish = await Parish.findById(req.params.parishid).populate(
      "forane",
      "_id name"
    );
    res.status(200).json(parish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewParish(req, res) {
  try {
    const parish = await Parish.findOne({ name: req.body.name }).exec();
    if (!parish) {
      const newparish = new Parish(req.body);
      await newparish.save();
      res.status(201).json(newparish);
    } else res.status(409).json({ message: "Parish Already Exists" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Parish" });
  }
}

async function updateParish(req, res) {
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

async function deleteParish(req, res) {
  try {
    const deletedParish = await Parish.findByIdAndDelete(req.params.parishid);
    res.status(200).json(deletedParish);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Parish" });
  }
}

module.exports = {
  getAllParishes,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
};
