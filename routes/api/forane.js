const express = require("express");
const Forane = require("../../models/Forane");
const {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
} = require("../../controllers/foraneController");
const router = express.Router();

router.get("/", getAllForanes);
router.get("/:id", getOneForane);
router.post("/newforane", createNewForane);
router.put("/:id", updateForane);
router.delete("/:id", deleteForane);

module.exports = router;
