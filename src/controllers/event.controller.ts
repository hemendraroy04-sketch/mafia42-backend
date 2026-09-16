import { Request, Response } from "express";
import { getEvents, getEventById } from "../services/event.service.js";

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await getEvents();
    return res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch event" });
  }
};