import { getEvents, getEventById, createEvent } from "../services/event.service.js";
import { assert, handle } from "../utils/http.js";

const validateEvent = ({ name, year, month, boxes, image }: any) => {
  assert(name && year && month && image && Array.isArray(boxes), "name, year, image and boxes are required");
  
  assert(boxes.length === 4, "Exactly 4 boxes are required");

  for (const box of boxes) {
    assert(box.name && Array.isArray(box.items), "Each box must have a name and items");
    for (const item of box.items) {
      assert(item.name && typeof item.probability === "number", "Each item must have a name and probability");
    }
  }
};

export const getAllEvents = handle("Failed to fetch events", async (_req, res) => {
  res.status(200).json({ events: await getEvents() });
});

export const getEvent = handle("Failed to fetch event", async (req, res) => {
  const id = Number(req.params.id);
  assert(!Number.isNaN(id), "Invalid event ID");

  const event = await getEventById(id);
  assert(event, "Event not found", 404);

  res.status(200).json(event);
});

export const createNewEvent = handle("Failed to create event", async (req, res) => {
  validateEvent(req.body);
  const { name, year, month, boxes, image } = req.body;

  const event = await createEvent({ name, year, month, boxes, image });
  
  res.status(201).json({ message: "Event created successfully", event });
});