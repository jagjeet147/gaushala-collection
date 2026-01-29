import { Router } from "express";
import { collectorLogin, addDonor, collectMoney } from "../controllers/collector.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/login", collectorLogin);
router.post("/donor", auth("collector"), addDonor);
router.post("/collect", auth("collector"), collectMoney);

export default router;
