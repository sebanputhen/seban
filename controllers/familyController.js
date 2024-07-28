const Family = require("../models/Family");

async function getAllFamilies(req, res) {
  try {
    const families = await Family.find({ koottayma: req.params.koottaymaid })
      .select("_id name")
      .exec();
    res.status(200).json(families);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOneFamily(req, res) {
  try {
    const family = await Family.findById(req.params.familyid).populate(
      "forane parish koottayma",
      "_id name"
    );
    console.log(family);
    res.status(200).json(family);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewFamily(req, res) {
  try {
    const { name } = req.body;
    const family = await Family.findOne({ name }).exec();
    if (!family) {
      const newFamily = new Family(req.body);
      await newFamily.save();
      res.status(201).json(newFamily);
    } else {
      res.status(409).json({ message: "Family Already Exists" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Family" });
  }
}

async function updateFamily(req, res) {
  try {
    const updatedFamily = await Family.findByIdAndUpdate(
      req.params.familyid,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedFamily);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Updating Family" });
  }
}

async function deleteFamily(req, res) {
  try {
    const deletedFamily = await Family.findByIdAndDelete(req.params.familyid);
    res.status(200).json(deletedFamily);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Family" });
  }
}

module.exports = {
  getAllFamilies,
  getOneFamily,
  createNewFamily,
  updateFamily,
  deleteFamily,
};
