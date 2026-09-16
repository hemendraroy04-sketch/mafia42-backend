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