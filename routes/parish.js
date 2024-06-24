const express = require("express");
const router = express.Router();
const {
  getAllParish,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
} = require("../controllers/parishController");
// const verifyJWT = require("../middleware/verifyJWT")
// router.use(verifyJWT);

router.get("/forane/:foraneid", getAllParish);
router.get("/:parishid", getOneParish);
router.post("/newparish", createNewParish);
router.put("/:parishid", updateParish);
router.delete("/:parishid", deleteParish);

module.exports = router;
