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

export const updateGuildCountry = async (name: string, country: string) => {
  return prisma.guild.update({
    where: { name },
    data: { country },
  });
};

export const getGuildByName = async (name: string) => {
  return prisma.guild.findUnique({
    where: { name },
    select: {
      id: true,
      name: true,
      country: true,
      GuildLbCount: true,
      PeakGP: true,
      PeakGPRank: true,
    },
  });
};