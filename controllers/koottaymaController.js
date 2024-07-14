const Koottayma = require("../models/Koottayma");

async function getAllKoottaymas(req, res) {
  try {
    const koottaymas = await Koottayma.find({
      forane: req.params.foraneid,
    }).select("_id name").exec();
    res.status(200).json(koottaymas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOneKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findById(req.params.koottaymaid).populate(
      "forane parish",
      "_id name"
    );
    res.status(200).json(koottayma);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewKoottayma(req, res) {
  try {
    const koottayma = await Koottayma.findOne(req.body.name).exec();
    if (!koottayma) {
      const newkoottayma = new Koottayma(req.body);
      await newkoottayma.save();
      res.status(201).json(newkoottayma);
    } else {
      res.status(409).json({ message: "Koottayma Already Exists" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Koottayma" });
  }
}

async function updateKoottayma(req, res) {
  try {
    const updatedKoottayma = await Koottayma.findByIdAndUpdate(
      req.params.koottaymaid,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedKoottayma);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Updating Koottayma" });
  }
}

async function deleteKoottayma(req, res) {
  try {
    const deletedKoottayma = await Koottayma.findByIdAndDelete(
      req.params.koottaymaid
    );
    res.status(200).json(deletedKoottayma);
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
}