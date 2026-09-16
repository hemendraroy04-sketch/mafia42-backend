import { Router } from "express";
import { createFameRanking,
    createGuildRanking,
    createRPRanking,
    getFameRanking,
    getGuildRanking,
    getRPRanking
} from "../controllers/ranking.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

// RP
router.post("/rp", adminCodeMiddleware, createRPRanking);
router.get("/rp", getRPRanking);

// Fame
router.post("/fame", adminCodeMiddleware, createFameRanking);
router.get("/fame", getFameRanking);

// Guild
router.post("/guild", adminCodeMiddleware, createGuildRanking);
router.get("/guild", getGuildRanking);

export default router;