const express = require("express");
const router = express.Router();
const {
  getAllForanes,
  createNewForane,
  updateForane,
  getOneForane,
  deleteForane,
} = require("../controllers/foraneController");

/**
 * @swagger
 * tags:
 *   name: Foranes
 *   description: API endpoints for managing foranes
 * /foranes:
 *   get:
 *     summary: Get all foranes
 *     tags: [Foranes]
 *     responses:
 *       200:
 *         description: List of foranes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Forane'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new forane
 *     tags: [Foranes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Forane'
 *     responses:
 *       201:
 *         description: Forane created successfully
 *       409:
 *         description: Forane already exists
 *       500:
 *         description: Internal server error
 * /foranes/{foraneid}:
 *   get:
 *     summary: Get a specific forane by ID
 *     tags: [Foranes]
 *     parameters:
 *       - in: path
 *         name: foraneid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the forane
 *     responses:
 *       200:
 *         description: Forane found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Forane'
 *       404:
 *         description: Forane not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a specific forane by ID
 *     tags: [Foranes]
 *     parameters:
 *       - in: path
 *         name: foraneid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the forane
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Forane'
 *     responses:
 *       200:
 *         description: Forane updated successfully
 *       404:
 *         description: Forane not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a specific forane by ID
 *     tags: [Foranes]
 *     parameters:
 *       - in: path
 *         name: foraneid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the forane
 *     responses:
 *       200:
 *         description: Forane deleted successfully
 *       404:
 *         description: Forane not found
 *       500:
 *         description: Internal server error
 */


router.get("/", getAllForanes);
router.get("/:foraneid", getOneForane);
router.post("/", createNewForane);
router.put("/:foraneid", updateForane);
router.delete("/:foraneid", deleteForane);

module.exports = router;
