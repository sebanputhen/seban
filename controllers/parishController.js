
const Parish = require("../models/Parish");
const Family = require("../models/Family");
const Person = require("../models/Person");
const Koottayma = require("../models/Koottayma");
const Forane = require("../models/Forane");   
async function getAllParishes(req, res) {
  try {
    const parishes = await Parish.find({ forane: req.params.foraneid }).select(
      "_id name phone building street pincode state district forane"
    );
    if (!parishes) {
      res.status(404).json({ message: "No parish found." });
    } else {
      res.status(200).json(parishes);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching parish data." });
  }
}
async function searchParishes(req, res) {
  try {
    // Fetch all parishes
    const parishes = await Parish.find({}).select("_id name phone building street pincode state district forane");

    if (!parishes || parishes.length === 0) {
      return res.status(404).json({ message: "No parishes found." });
    }

    res.status(200).json(parishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching parish data." });
  }
}



async function getOneParish(req, res) {
  try {
    const parish = await Parish.findById(req.params.parishid).populate(
      "forane",
      "_id name"
    );
    if (!parish) {
      res.status(404).json({ message: "Parish not found." });
    } else {
      res.status(200).json(parish);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while fetching parish data." });
  }
}

async function createNewParish(req, res) {
  try {
    const parish = await Parish.findOne({
      forane: req.body.forane,
      name: req.body.name,
    }).exec();
    if (!parish) {
      const newparish = new Parish(req.body);
      await newparish.save();
      res.status(201).json({ message: "Parish created successfully." });
    } else {
      res.status(409).json({ message: "Parish already exists." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occured while creating parish." });
  }
}

async function updateParish(req, res) {
  try {
    const parish = await Parish.findByIdAndUpdate(
      req.params.parishid,
      req.body
    );
    if (!parish) {
      res.status(404).json({ message: "Parish not found." });
    } else {
      res.status(200).json({ message: "Parish updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error occurred while updating parish." });
  }
}

async function deleteParish(req, res) {
  try {
    const parish = await Parish.findByIdAndDelete(req.params.parishid);
    if (!parish) {
      res.status(404).json({ message: "Parish not found." });
    } else {
      res.status(200).json({ message: "Parish deleted successfully." });
    }
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
  searchParishes,
};
