import { Request, Response } from "express";
import { getEvents, getEventById, createEvent } from "../services/event.service.js";

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

export const createNewEvent = async (req: Request, res: Response) => {
  try {
    const { name, year, month, boxes, image } = req.body;

    if (!name || !year || !month || !image || !Array.isArray(boxes)) {
      return res.status(400).json({
        message: "name, year, image and boxes are required",
      });
    }

    if (boxes.length !== 4) {
      return res.status(400).json({
        message: "Exactly 4 boxes are required",
      });
    }

    for (const box of boxes) {
      if (!box.name || !Array.isArray(box.items)) {
        return res.status(400).json({
          message: "Each box must have a name and items",
        });
      }

      for (const item of box.items) {
        if (!item.name || !item.image || typeof item.probability !== "number" ) {
          return res.status(400).json({
            message: "Each item must have a name, image and probability",
          });
        }
      }
    }

    const event = await createEvent({ name, year, month, boxes, image });

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create event",
    });
  }
};