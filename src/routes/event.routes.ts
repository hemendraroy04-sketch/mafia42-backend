import { Router } from "express";
import {
  getAllEvents,
  getEvent,
  createNewEvent,
  openBox
} from "../controllers/event.controller.js";
import adminCodeMiddleware from "../middleware/adminCode.middleware.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", adminCodeMiddleware, createNewEvent);
router.post("/:eventId/boxes/:boxId/open", openBox);

export default router;