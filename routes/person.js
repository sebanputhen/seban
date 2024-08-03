const express = require("express");
const router = express.Router();

const {
  getAllPersons,
  getOnePerson,
  createNewPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

router.get("/family/:familyid", getAllPersons);
router.get("/:personid", getOnePerson);
router.post("/", createNewPerson);
router.put("/:personid", updatePerson);
router.delete("/:personid", deletePerson);

module.exports = router;
