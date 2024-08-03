const Family = require("../models/Family");

async function getAllFamilies(req, res) {
  try {
    const families = await Family.find({ koottayma: req.params.koottaymaid })
      .select("_id id name")
      .exec();
    if (!families) {
      res.status(404).json({ message: "No families found." });
    } else {
      res.status(200).json(families);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching family data." });
  }
}

async function getOneFamily(req, res) {
  try {
    const family = await Family.findOne({id:req.params.familyid}).populate(
      "forane parish koottayma head",
      "_id name"
    );
    if (!family) {
      res.status(404).json({ message: "Family not found." });
    } else {
      res.status(200).json(family);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching family data." });
  }
}

async function createNewFamily(req, res) {
  try {
    const family = await Family.findOne({ id: req.body.id }).exec();
    if (!family) {
      const newFamily = new Family(req.body);
      await newFamily.save();
      res.status(201).json({ message: "Family created successfully." });
    } else {
      res.status(409).json({ message: "Family already exists." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating family." });
  }
}

async function updateFamily(req, res) {
  try {
    const family = await Family.findOneAndUpdate(
      {id:req.params.familyid},
      req.body
    );
    if (!family) {
      res.status(404).json({ message: "Family not found." });
    } else {
      res.status(200).json({ message: "Family updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating family" });
  }
}

async function deleteFamily(req, res) {
  try {
    const family = await Family.findOneAndDelete({id:req.params.familyid});
    if (!family) {
      res.status(404).json({ message: "Family not found." });
    } else {
      res.status(200).json({ message: "Family deleted successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting family" });
  }
}

module.exports = {
  getAllFamilies,
  getOneFamily,
  createNewFamily,
  updateFamily,
  deleteFamily,
};
