const Koottayma = require("../models/Koottayma");

async function getAllKoottaymas(req, res) {
  try {
    const koottaymas = await Koottayma.find({
      parish: req.params.parishid,
    })
      .select("_id name")
      .exec();
    if (!koottaymas) {
      res.status(404).json({ message: "No koottaymas found." });
    } else {
      res.status(200).json(koottaymas);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error occurred while fetching koottayma data." });
  }
}

async function getOneKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findById(req.params.koottaymaid).populate(
      "forane parish",
      "_id name"
    );
    if (!koottayma) {
      res.status(404).json({ message: "Koottayma not found." });
    } else {
      res.status(200).json(koottayma);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An rrror occurred while fetching koottayma data." });
  }
}

async function createNewKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findOne({
      parish: req.body.parish,
      name: req.body.name,
    }).exec();
    if (!koottayma) {
      const newkoottayma = new Koottayma(req.body);
      await newkoottayma.save();
      res.status(201).json({ message: "Koottayma created successfully." });
    } else {
      res.status(409).json({ message: "Koottayma already exists." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while creating koottayma." });
  }
}

async function updateKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findByIdAndUpdate(
      req.params.koottaymaid,
      req.body
    );
    if (!koottayma) {
      res.status(404).json({ message: "Koottayma not found." });
    } else {
      res.status(200).json({ message: "Koottayma updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating koottayma." });
  }
}

async function deleteKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findByIdAndDelete(req.params.koottaymaid);
    if (!koottayma) {
      res.status(404).json({ message: "Koottayma not found." });
    } else {
      res.status(200).json({ message: "Koottayma deleted successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Koottayma" });
  }
}

module.exports = {
  getAllKoottaymas,
  getOneKoottayma,
  createNewKoottayma,
  updateKoottayma,
  deleteKoottayma,
};
