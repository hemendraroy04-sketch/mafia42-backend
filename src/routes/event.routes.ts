import { Router } from "express";
import {
  getAllEvents,
  getEvent,
  createNewEvent
} from "../controllers/event.controller.js";

const router = Router();

router.get("/", getAllEvents);
router.get("/:id", getEvent);
router.post("/", createNewEvent);

export default router;