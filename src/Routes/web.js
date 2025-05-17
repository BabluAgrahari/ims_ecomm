import express from "express";
import categoryRouter from "./category.router.js";

const router = express.Router();
router.use("/", categoryRouter);
export default router;
