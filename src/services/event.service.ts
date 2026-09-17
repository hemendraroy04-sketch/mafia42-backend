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
    orderBy: [{ year: "desc" }, { month: "desc" }],
    select: {
      id: true,
      name: true,
      year: true,
      month: true,
      image: true
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
      month: data.month,
      image: data.image,
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