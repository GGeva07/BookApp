import * as libroController from "../controllers/libroController.js";
import express from "express";

const router = express.Router();

router.get("/libro/index", libroController.index);
router.get("/libro/create", libroController.createForm);
router.get("/libro/details/:id", libroController.details);
router.post("/libro/create", libroController.create);
router.get("/libro/update/:id", libroController.updateForm);
router.post("/libro/update/:id", libroController.update);
router.post("/libro/delete/:id", libroController.deleteA);

export default router;
