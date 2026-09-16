import prisma from "../lib/prisma.js";

const includeBoxesWithItems = {
  boxes: {
    orderBy: { id: "asc" as const },
    include: {
      items: {
        orderBy: { id: "asc" as const },
      },
    },
  },
};

export const getEvents = async () => {
  return prisma.event.findMany({
    orderBy: [{ year: "desc" }, { name: "asc" }],
    include: includeBoxesWithItems,
  });
};

export const getEventById = async (id: number) => {
  return prisma.event.findUnique({
    where: { id },
    include: includeBoxesWithItems,
  });
};