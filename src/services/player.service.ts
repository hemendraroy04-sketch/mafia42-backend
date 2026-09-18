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

export const updatePlayerCountry = async (name: string, country: string) => {
  return prisma.player.update({
    where: { name },
    data: { country },
  });
};