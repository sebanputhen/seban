const express = require("express");
const router = express.Router();
const {
  getAllParishes,
  getOneParish,
  createNewParish,
  updateParish,
  deleteParish,
} = require("../controllers/parishController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Parish:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the parish.
 *         building:
 *           type: string
 *           description: The building of the parish.
 *         forane:
 *           type: string
 *           description: The ID of the forane associated with the parish.
 *         phone:
 *           type: string
 *           description: The phone number of the parish.
 *         street:
 *           type: string
 *           description: The street of the parish.
 *         city:
 *           type: string
 *           description: The city of the parish.
 *         district:
 *           type: string
 *           description: The district of the parish.
 *         state:
 *           type: string
 *           description: The state of the parish.
 *         pincode:
 *           type: string
 *           description: The pincode of the parish.
 *       required:
 *         - name
 *         - building
 *         - forane
 *         - phone
 *         - city
 *         - district
 *         - state
 *         - pincode
 */

router.get("/forane/:foraneid", getAllParishes);
router.get("/:parishid", getOneParish);
router.post("/", createNewParish);
router.put("/:parishid", updateParish);
router.delete("/:parishid", deleteParish);

module.exports = router;
