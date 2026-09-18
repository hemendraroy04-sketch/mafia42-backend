import { Router } from "express";
import { createNewGuild } from "../controllers/guild.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.post("/", adminCodeMiddleware, createNewGuild);

export default router;