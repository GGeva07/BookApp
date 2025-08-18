import * as AutorController from "../controllers/autorController.js";
import express from "express";

const router = express.Router();

router.get("/autor/index", AutorController.index);
router.get("/autor/create", AutorController.createForm);
router.post("/autor/create", AutorController.create);
router.get("/autor/update/:id", AutorController.updateForm);
router.post("/autor/update/:id", AutorController.update);
router.post("/autor/delete/:id", AutorController.deleteA);

export default router;
