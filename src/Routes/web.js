import express from "express";

import UserContoller from "../Controllers/UserController.js";
import CategoryController from "../Controllers/CategoryController.js";
import auth from "../Middleware/Auth.js";

// import logger from "../config/logger.config.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Welcome to your Express.js app Route!");
});

router.post("/register", UserContoller.create);

router.get("/category", auth, CategoryController.list);

export default router;
