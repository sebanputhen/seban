const Forane = require("../models/Forane");

async function getAllForanes(req, res) {
  try {
    const foranes = await Forane.find().select("_id name");
    if (!foranes) {
      res.status(404).json({ message: "No foranes found." });
    } else {
      res.status(200).json(foranes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching forane data." });
  }
}

async function getOneForane(req, res) {
  try {
    const forane = await Forane.findById(req.params.foraneid);
    if (!forane) {
      res.status(404).json({ message: "Forane not found." });
    } else {
      res.status(200).json(forane);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while fetching forane data." });
  }
}

async function createNewForane(req, res) {
  try {
    const forane = await Forane.findOne({
      name: req.body.name,
    }).exec();
    if (!forane) {
      const newforane = new Forane(req.body);
      await newforane.save();
      res.status(201).json({ message: "Forane created successfully." });
    } else {
      res.status(409).json({ message: "Forane already exists." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating forane" });
  }
}

async function updateForane(req, res) {
  try {
    const forane = await Forane.findByIdAndUpdate(
      req.params.foraneid,
      req.body
    );
    if (!forane) {
      res.status(404).json({ message: "Forane not found." });
    } else {
      res.status(200).json({ message: "Forane updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating forane" });
  }
}

async function deleteForane(req, res) {
  try {
    const forane = await Forane.findByIdAndDelete(req.params.foraneid);
    if (!forane) {
      res.status(404).json({ message: "Forane not found." });
    } else {
      res.status(200).json({ message: "Forane deleted successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting forane" });
  }
}

module.exports = {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
};
