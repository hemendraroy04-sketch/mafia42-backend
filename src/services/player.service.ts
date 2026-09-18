import prisma from "../lib/prisma.js";

import { CreatePlayerInput } from "../types/player.js";

export const createPlayer = async (data: CreatePlayerInput) => {
  return prisma.player.create({
    data: {
      name: data.name,
      country: data.country,
    },
  });
};