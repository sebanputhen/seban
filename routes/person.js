const express = require("express");
const router = express.Router();

const {
  getAllPersons,
  getOnePerson,
  createNewPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/personController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the person.
 *         baptismName:
 *           type: string
 *           description: The baptism name of the person.
 *         gender:
 *           type: string
 *           description: The gender of the person.
 *           enum: [male, female]
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the person in dd/MM/yyyy.
 *         phone:
 *           type: string
 *           description: The phone number of the person.
 *         email:
 *           type: string
 *           description: The email address of the person.
 *         education:
 *           type: string
 *           description: The education of the person.
 *         occupation:
 *           type: string
 *           description: The occupation of the person.
 *         forane:
 *           type: string
 *           description: The ID of the forane the person belongs to.
 *         parish:
 *           type: string
 *           description: The ID of the parish the person belongs to.
 *         family:
 *           type: string
 *           description: The ID of the family the person belongs to.
 *         relation:
 *           type: string
 *           description: The relation of the person to the family head.
 *           enum: [head, bride, groom, son, daughter, father, mother, brother, sister]
 *         status:
 *           type: string
 *           description: The status of the person.
 *           enum: [alive, deceased]
 *       required:
 *         - name
 *         - baptismName
 *         - gender
 *         - dob
 *         - phone
 *         - email
 *         - education
 *         - occupation
 *         - forane
 *         - parish
 *         - family
 *         - relation
 */


router.get("/family/:familyid", getAllPersons);
router.get("/:personid", getOnePerson);
router.post("/", createNewPerson);
router.put("/:personid", updatePerson);
router.delete("/:personid", deletePerson);

module.exports = router;
