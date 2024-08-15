const Family = require("../models/Family");
const Person = require("../models/Person");

async function getAllPersons(req, res) {
  try {
    const family = await Family.findOne({ id: req.params.familyid }).exec();
    if (!family) {
      return res.status(404).json({ message: "Family not found." });
    }
    const persons = await Person.find({ family: req.params.familyid })
      .select("_id name relation")
      .exec();
    if (!persons) {
      return res.status(404).json({ message: "No persons found." });
    } else {
      return res.status(200).json(persons);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching persons data." });
  }
}

async function getOnePerson(req, res) {
  try {
    const person = await Person.findById(req.params.personid).populate(
      "forane parish family",
      "_id name"
    );
    if (!person) {
      res.status(404).json({ message: "Person not found." });
    } else {
      res.status(200).json(person);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data." });
  }
}

async function createNewPerson(req, res) {
  try {
    const person = await Person.findOne({
      family: req.body.family,
      name: req.body.name,
    }).exec();
    if (!person) {
      if (req.body.email) {
        const email = await Person.findOne({ email: req.body.email }).exec();
        if (email) {
          res.status(409).json({ message: "Email already exists." });
          return;
        }
      }
      const newPerson = new Person(req.body);
      await newPerson.save();
      res.status(201).json({ message: "Person successfully added to family." });
    } else {
      res.status(409).json({ message: "Person already exists." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

async function updatePerson(req, res) {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.personid,
      req.body
    );
    if (!person) {
      res.status(404).json({ message: "Person not found." });
    } else {
      res.status(200).json({ message: "Person's data updated successfully." });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating person's data." });
  }
}

async function deletePerson(req, res) {
  try {
    await Person.findByIdAndDelete(req.params.personid);
    res.status(200).json({ message: "Person deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while deleting person" });
  }
}

module.exports = {
  getAllPersons,
  getOnePerson,
  createNewPerson,
  updatePerson,
  deletePerson,
};
