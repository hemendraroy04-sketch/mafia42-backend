import prisma from "../lib/prisma.js";
import { CreateEventInput } from "../types/event.js";

const includeBoxesWithItems = {
  boxes: {
    orderBy: { id: "asc" as const },
    include: { items: { orderBy: { id: "asc" as const } } }
  },
};

export const getEvents = async () => {
  return prisma.event.findMany({
    orderBy: [{ year: "desc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      year: true,
    },
  });
};

export const getEventById = async (id: number) => {
  return prisma.event.findUnique({
    where: { id },
    include: includeBoxesWithItems,
  });
};

export const createEvent = async (data: CreateEventInput) => {
  return prisma.event.create({
    data: {
      name: data.name,
      year: data.year,
      boxes: {
        create: data.boxes.map((box) => ({
          name: box.name,
          items: {
            create: box.items.map(({ name, image, probability }) => ({
              name, image, probability
            })),
          },
        })),
      },
    },
    include: { boxes: { include: { items: true } } },
  });
};

export const openEventBox = async (eventId: number, boxId: number) => {
  const box = await prisma.eventBox.findFirst({
    where: { id: boxId, eventId },
    include: { items: true },
  });

  if (!box) return null;
  if (box.items.length === 0) throw new Error("Box has no items");
  const totalProbability = box.items.reduce((sum, item) => sum + item.probability, 0);
  if (totalProbability <= 0) throw new Error("Invalid item probabilities");
  const random = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  for (const item of box.items) {
    cumulativeProbability += item.probability;
    if (random < cumulativeProbability) return item;
  }

  return box.items[box.items.length - 1];
};