import { Router } from "express";
import { createNewPlayer, editPlayerCountry } from "../controllers/player.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.post("/", adminCodeMiddleware, createNewPlayer);
router.patch("/:name/country", adminCodeMiddleware, editPlayerCountry);

export default router;