const express = require("express");
const router = express.Router();

const {
  getAllPersons,
  getOnePerson,
  createNewPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

router.get("/", getAllPersons);
router.get("/:personid", getOnePerson);
router.post("/newperson", createNewPerson);
router.put("/:personid", updatePerson);
router.delete("/:personid", deletePerson);

module.exports = router;
