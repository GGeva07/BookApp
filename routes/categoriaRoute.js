import * as CategoriaController from "../controllers/categoriaController.js";
import express from "express";

const router = express.Router();

router.get("/categoria/index", CategoriaController.index);
router.get("/categoria/create", CategoriaController.createForm);
router.post("/categoria/create", CategoriaController.create);
router.get("/categoria/update/:id", CategoriaController.updateForm);
router.post("/categoria/update/:id", CategoriaController.update);
router.post("/categoria/delete/:id", CategoriaController.deleteA);

export default router;
