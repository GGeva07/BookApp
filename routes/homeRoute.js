import * as homeController from "../controllers/homeController.js";
import express from "express";

const router = express.Router();

router.get("/", homeController.index);
router.post("/buscar", homeController.buscar);

export default router;
