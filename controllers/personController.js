const Person = require("../models/Person");

async function getAllPersons(req, res) {
  try {
    const persons = await Person.find({ family: req.params.familyid })
      .select("_id name")
      .exec();
    res.status(200).json(persons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function getOnePerson(req, res) {
  try {
    const person = await Person.findById(req.params.personid).populate(
      "forane parish family",
      "_id name"
    );
    res.status(200).json(person);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An Error Occurred while fetching data" });
  }
}

async function createNewPerson(req, res) {
  try {
    const person = await Person.findOne(req.body.name).exec();
    if (!person) {
      const newPerson = new Person(req.body);
      await newPerson.save();
      res.status(201).json(newPerson);
    } else {
      res.status(409).json({ message: "Person Already Exists" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Creating Person" });
  }
}

async function updatePerson(req, res) {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.personid,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPerson);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Updating Person" });
  }
}

async function deletePerson(req, res) {
  try {
    await Person.findByIdAndDelete(req.params.personid);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An Error Occurred while Deleting Person" });
  }
}

module.exports = {
  getAllPersons,
  getOnePerson,
  createNewPerson,
  updatePerson,
  deletePerson,
};
