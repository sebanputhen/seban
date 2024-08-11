const express = require("express");
const router = express.Router();

const {
  getAllKoottaymas,
  getOneKoottayma,
  createNewKoottayma,
  updateKoottayma,
  deleteKoottayma,
} = require("../controllers/koottaymaController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Koottayma:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the Koottayma.
 *         forane:
 *           type: string
 *           description: The ID of the associated Forane.
 *         parish:
 *           type: string
 *           description: The ID of the associated Parish.
 *       required:
 *         - name
 *         - forane
 *         - parish
 */

router.get("/parish/:parishid", getAllKoottaymas);
router.get("/:koottaymaid", getOneKoottayma);
router.post("/", createNewKoottayma);
router.put("/:koottaymaid", updateKoottayma);
router.delete("/:koottaymaid", deleteKoottayma);

module.exports = router;
