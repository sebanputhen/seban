const express = require("express");
const {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
} = require("../../controllers/foraneController");
const router = express.Router();

router.get("/", getAllForanes);
router.get("/:foraneid", getOneForane);
router.post("/newforane", createNewForane);
router.put("/:foraneid", updateForane);
router.delete("/:foraneid", deleteForane);

module.exports = router;
