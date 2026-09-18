import prisma from "../lib/prisma.js";

import { CreateGuildInput } from "../types/guild.js";

export const createGuild = async (data: CreateGuildInput) => {
  return prisma.guild.create({
    data: {
      name: data.name,
      country: data.country,
    },
  });
};