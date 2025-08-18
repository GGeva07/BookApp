import * as EditorialController from "../controllers/editorialController.js";
import express from "express";

const router = express.Router();

router.get("/editorial/index", EditorialController.index);
router.get("/editorial/create", EditorialController.createForm);
router.post("/editorial/create", EditorialController.create);
router.get("/editorial/update/:id", EditorialController.updateForm);
router.post("/editorial/update/:id", EditorialController.update);
router.post("/editorial/delete/:id", EditorialController.deleteA);

export default router;
