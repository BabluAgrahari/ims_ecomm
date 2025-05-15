import express from "express";

import AuthController from "../Controllers/AuthController.js";
import UserContoller from "../Controllers/UserController.js";

// import logger from "../config/logger.config.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Welcome to your Express.js app Route!");
});

router.post("/register", UserContoller.create);
router.post("/login", AuthController.login);

export default router;
