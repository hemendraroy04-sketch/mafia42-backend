import prisma from "../lib/prisma.js";
import { RPEntry } from "../types/entry.js";


export const addRPRanking = async (date: Date, rankings: RPEntry[]) => {
  return prisma.rPRanking.createMany({
    data: rankings.map(({ rank, playerId, playerName, rp }) => ({
      date, rank, playerId, playerName, rp
    })),
  });
};

export const getLatestRPRanking = async () => {
  const latest = await prisma.rPRanking.findFirst({
    orderBy: {date: "desc"},
    select: {date: true}
  });

  if (!latest) return {date: null,rankings: []};

  const rankings = await prisma.rPRanking.findMany({
    where: {date: latest.date},
    orderBy: {rank: "asc"}
  });

  return {date: latest.date, rankings};
};