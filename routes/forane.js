const express = require("express");
const router = express.Router();
const {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
} = require("../controllers/foraneController");
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT);

router.get("/", getAllForanes);
router.get("/:foraneid", getOneForane);
router.post("/newforane", createNewForane);
router.put("/:foraneid", updateForane);
router.delete("/:foraneid", deleteForane);

module.exports = router;
