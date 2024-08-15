const Family = require("../models/Family");
const Person = require("../models/Person");

async function getAllFamilies(req, res) {
  try {
    const families = await Family.find({ koottayma: req.params.koottaymaid })
      .select("_id id name head")
      .populate("head", "_id name")
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
    const family = await Family.findOne({ id: req.params.familyid })
      .populate("forane parish koottayma head", "_id name")
      .exec();
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
      if (req.body.head) {
        const newHeadId = req.body.head;
        const person = await Person.findOne({ _id: newHeadId }).exec();
        if (person.relation === "head") {
          return res.status(400).json({
            message: "Cannot create a new family with an existing head.",
          });
        } else {
          await newFamily.save();
          person.family = newFamily.id;
          person.relation = "head";
          await person.save();
          return res
            .status(201)
            .json({ message: "Family created successfully." });
        }
      }
      await newFamily.save();
      return res.status(201).json({ message: "Family created successfully." });
    } else {
      return res.status(409).json({ message: "Family already exists." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function updateFamily(req, res) {
  try {
    const family = await Family.findOne({ id: req.params.familyid }).exec();
    if (!family) {
      res.status(404).json({ message: "Family not found." });
    } else {
      const newHeadId = req.body.head;
      if (newHeadId && newHeadId !== family.head) {
        const currentHead = await Person.findById(family.head).exec();
        if (currentHead && currentHead.status === "alive") {
          return res.status(400).json({
            message:
              "Cannot change the head of the family unless the current head is deceased or not assigned.",
          });
        }
        await family.updateHead(newHeadId);
      }
      Object.assign(family, req.body);
      await family.save();
      res.status(200).json({ message: "Family updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function deleteFamily(req, res) {
  try {
    const family = await Family.findOneAndDelete({ id: req.params.familyid });
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
