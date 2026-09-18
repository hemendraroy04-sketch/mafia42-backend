import { Router } from "express";
import { createNewGuild, editGuildCountry } from "../controllers/guild.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.post("/", adminCodeMiddleware, createNewGuild);
router.patch("/:name/country", adminCodeMiddleware, editGuildCountry);

export default router;