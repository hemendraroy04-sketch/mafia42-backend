import { Router } from "express";
import {
  getAllEvents,
  getEvent,
  createNewEvent
} from "../controllers/event.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", adminCodeMiddleware, createNewEvent);

export default router;