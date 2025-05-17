import express from "express";

import CategoryController from "../controllers/CategoryController.js";
// import auth from "../Middleware/Auth.js";

const router = express.Router();

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category list
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       category:
 *                         type: string
 *                         example: "BAKERY"
 *                       description:
 *                         type: string
 *                         example: "about bakery"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       createdAt:
 *                         type: string
 *                         example: "2025-05-16T12:02:21.621Z"
 *                       updatedAt:
 *                         type: string
 *                         example: "2025-05-16T12:02:21.621Z"
 *                       deletedAt:
 *                         type: string
 *                         example: null
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.get("/category", CategoryController.index);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get Category Details
 *     tags:
 *       - Category Details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category Details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category details
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     category:
 *                       type: string
 *                       example: "BAKERY"
 *                     description:
 *                       type: string
 *                       example: "about bakery"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     deletedAt:
 *                       type: string
 *                       example: null
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.get("/category/{id}", CategoryController.show);

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Create Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - description
 *               - status
 *             properties:
 *               category:
 *                 type: string
 *                 example: "BAKERY"
 *               description:
 *                 type: string
 *                 example: "about bakery"
 *               status:
 *                 type: integer
 *                 description: 1 for active, 0 for inactive
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     category:
 *                       type: string
 *                       example: "BAKERY"
 *                     description:
 *                       type: string
 *                       example: "about bakery"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     deletedAt:
 *                       type: string
 *                       example: null
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/category", CategoryController.store);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update a category
 *     tags:
 *       - Update Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *               - description
 *               - status
 *             properties:
 *               category:
 *                 type: string
 *                 example: "BAKERY"
 *               description:
 *                 type: string
 *                 example: "about bakery"
 *               status:
 *                 type: integer
 *                 description: 1 for active, 0 for inactive
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     category:
 *                       type: string
 *                       example: "BAKERY"
 *                     description:
 *                       type: string
 *                       example: "about bakery"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     deletedAt:
 *                       type: string
 *                       example: null
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put("/category/:id", CategoryController.update);

/**
 * @swagger
 * /category/status/{id}:
 *   post:
 *     summary: Update status of a category
 *     tags:
 *       - Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: integer
 *                 description: 1 for active, 0 for inactive
 *                 example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Status Updated Successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     category:
 *                       type: string
 *                       example: "BAKERY"
 *                     description:
 *                       type: string
 *                       example: "about bakery"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     updatedAt:
 *                       type: string
 *                       example: "2025-05-16T12:02:21.621Z"
 *                     deletedAt:
 *                       type: string
 *                       example: null
 *       422:
 *         description: validation error
 *       500:
 *         description: Server error
 */
router.post("/category/status/:id", CategoryController.stateUpdate);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Delete Category
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Deleted Successfully!
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

router.post("/category/delete/:id", CategoryController.destroy);

export default router;
