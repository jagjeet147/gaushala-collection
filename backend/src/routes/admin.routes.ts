import { Router } from "express";
import { adminLogin, createCollector, getAllCollections } from "../controllers/admin.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/login", adminLogin);
router.post("/collector", auth("admin"), createCollector);
router.get("/collections", auth("admin"), getAllCollections);

export default router;
