const express = require("express");
const router = express.Router();

const {
  getAllKoottaymas,
  getOneKoottayma,
  createNewKoottayma,
  updateKoottayma,
  deleteKoottayma,
} = require("../controllers/koottaymaController");

router.get("/", getAllKoottaymas);
router.get("/:koottaymaid", getOneKoottayma);
router.post("/newkoottayma", createNewKoottayma);
router.put("/:koottaymaid", updateKoottayma);
router.delete("/:koottaymaid", deleteKoottayma);

module.exports = router;
