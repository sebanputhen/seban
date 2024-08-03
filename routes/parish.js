const express = require("express");
const router = express.Router();
const {
  getAllParishes,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
} = require("../controllers/parishController");

router.get("/forane/:foraneid", getAllParishes);
router.get("/:parishid", getOneParish);
router.post("/", createNewParish);
router.put("/:parishid", updateParish);
router.delete("/:parishid", deleteParish);

module.exports = router;
