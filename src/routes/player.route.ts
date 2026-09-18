import { Router } from "express";
import { createNewPlayer } from "../controllers/player.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.post("/", adminCodeMiddleware, createNewPlayer);

export default router;