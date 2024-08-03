const express = require("express");
const router = express.Router();
const {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
} = require("../controllers/foraneController");

router.get("/", getAllForanes);
router.get("/:foraneid", getOneForane);
router.post("/", createNewForane);
router.put("/:foraneid", updateForane);
router.delete("/:foraneid", deleteForane);

module.exports = router;
