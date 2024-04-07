const express = require("express");
const {
  getAllParish,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
} = require("../../controllers/parishController");
const router = express.Router();

router.get("/forane/:foraneid", getAllParish);
router.get("/:parishid", getOneParish);
router.post("/newparish", createNewParish);
router.put("/:parishid", updateParish);
router.delete("/:parishid", deleteParish);

module.exports = router;
