const express = require("express");
const router = express.Router();

const {
  getAllFamilies,
  getOneFamily,
  createNewFamily,
  updateFamily,
  deleteFamily,
} = require("../controllers/familyController");

router.get("/kottayma/:koottaymaid", getAllFamilies);
router.get("/:familyid", getOneFamily);
router.post("/", createNewFamily);
router.put("/:familyid", updateFamily);
router.delete("/:familyid", deleteFamily);

module.exports = router;
