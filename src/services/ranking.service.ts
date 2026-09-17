import prisma from "../lib/prisma.js";

import { RPEntry, FameEntry, GuildEntry } from "../types/entry.js";

// RP ranking 

export const addRPRanking = async (date: Date, rankings: RPEntry[]) => {
  return prisma.rPRanking.createMany({
    data: rankings.map(({ rank, playerId, playerName, rp }) => ({
      date, rank, playerId, playerName, rp
    })),
  });
};

export const getLatestRPRanking = async () => {
  const latest = await prisma.rPRanking.findFirst({
    orderBy: { date: "desc" },
    select: { date: true }
  });

  if (!latest) return { date: null, rankings: [] };

  const rankings = await prisma.rPRanking.findMany({
    where: { date: latest.date },
    orderBy: { rank: "asc" }
  });

  return { date: latest.date, rankings };
};

export const getRPRankingByDate = async (date: Date) => {
  const rankings = await prisma.rPRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" }
  });

  return { date, rankings };
};

// Fame ranking

export const addFameRanking = async (date: Date, rankings: FameEntry[]) => {
  return prisma.fameRanking.createMany({
    data: rankings.map(({ rank, playerId, playerName, fame }) => ({
      date, rank, playerId, playerName, fame
    })),
  });
};

export const getLatestFameRanking = async () => {
  const latest = await prisma.fameRanking.findFirst({
    orderBy: { date: "desc" },
    select: { date: true }
  });

  if (!latest) return { date: null, rankings: [] };

  const rankings = await prisma.fameRanking.findMany({
    where: { date: latest.date },
    orderBy: { rank: "asc" }
  });

  return { date: latest.date, rankings };
};

export const getFameRankingByDate = async (date: Date) => {
  const rankings = await prisma.fameRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" }
  });

  return { date, rankings };
};

// Guild ranking

export const addGuildRanking = async (date: Date, rankings: GuildEntry[]) => {
  return prisma.guildRanking.createMany({
    data: rankings.map(({ rank, guildId, guildName, gp }) => ({
      date, rank, guildId, guildName, gp
    })),
  });
};

export const getLatestGuildRanking = async () => {
  const latest = await prisma.guildRanking.findFirst({
    orderBy: { date: "desc" },
    select: { date: true }
  });

  if (!latest) return { date: null, rankings: [] };

  const rankings = await prisma.guildRanking.findMany({
    where: { date: latest.date },
    orderBy: { rank: "asc" }
  });

  return { date: latest.date, rankings };
};

export const getGuildRankingByDate = async (date: Date) => {
  const rankings = await prisma.guildRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" }
  });

  return { date, rankings };
};