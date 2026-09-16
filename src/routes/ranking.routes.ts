import { Router } from "express";
import { createFameRanking,
    createGuildRanking,
    createRPRanking,
    getFameRanking,
    getGuildRanking,
    getRPRanking
} from "../controllers/ranking.controller.js";

const router = Router();

// RP
router.post("/rp", createRPRanking);
router.get("/rp", getRPRanking);

// Fame
router.post("/fame", createFameRanking);
router.get("/fame", getFameRanking);

// Guild
router.post("/guild", createGuildRanking);
router.get("/guild", getGuildRanking);

export default router;