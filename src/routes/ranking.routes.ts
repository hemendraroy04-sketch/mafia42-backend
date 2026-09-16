import { Router } from "express";
import { createRPRanking, getRPRanking } from "../controllers/ranking.controller.js";

const router = Router();

router.post("/rp", createRPRanking);
router.get("/rp", getRPRanking);

export default router;