import prisma from "../lib/prisma.js";

import { RPEntry, FameEntry, GuildEntry } from "../types/entry.js";

export class RankingInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RankingInputError";
  }
}

// RP ranking

export const addRPRanking = async (date: Date, rankings: RPEntry[]) => {
  const players = await prisma.player.findMany({
    where: {
      name: {
        in: rankings.map(({ playerName }) => playerName),
      },
    },
  });

  const playerMap = new Map(
    players.map((player) => [player.name, player]),
  );

  for (const ranking of rankings) {
    if (!playerMap.has(ranking.playerName)) {
      throw new RankingInputError(
        `Player '${ranking.playerName}' is not registered`,
      );
    }
  }

  const previous = await prisma.rPRanking.findFirst({
    where: {
      date: {
        lt: date,
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  });

  let previousMap = new Map<number, number>();

  if (previous) {
    const previousRankings = await prisma.rPRanking.findMany({
      where: {
        date: previous.date,
      },
      select: {
        playerId: true,
        rp: true,
      },
    });

    previousMap = new Map(
      previousRankings.map((ranking) => [ranking.playerId, ranking.rp]),
    );
  }

  return prisma.rPRanking.createMany({
    data: rankings.map(({ rank, playerName, rp }) => {
      const playerId = playerMap.get(playerName)!.id;
      const previousRP = previousMap.get(playerId);

      return {
        date,
        rank,
        playerId,
        rp,
        change: previousRP === undefined ? null : rp - previousRP,
      };
    }),
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
    orderBy: { rank: "asc" },
    include: {
      player: true,
    },
  });

  return { date: latest.date, rankings };
};

export const getRPRankingByDate = async (date: Date) => {
  const rankings = await prisma.rPRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" },
    include: {
      player: true,
    },
  });

  return { date, rankings };
};

// Fame ranking

export const addFameRanking = async (date: Date, rankings: FameEntry[]) => {
  const players = await prisma.player.findMany({
    where: {
      name: {
        in: rankings.map(({ playerName }) => playerName),
      },
    },
  });

  const playerMap = new Map(
    players.map((player) => [player.name, player]),
  );

  for (const ranking of rankings) {
    if (!playerMap.has(ranking.playerName)) {
      throw new RankingInputError(
        `Player '${ranking.playerName}' is not registered`,
      );
    }
  }

  const previous = await prisma.fameRanking.findFirst({
    where: {
      date: {
        lt: date,
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  });

  let previousMap = new Map<number, number>();

  if (previous) {
    const previousRankings = await prisma.fameRanking.findMany({
      where: {
        date: previous.date,
      },
      select: {
        playerId: true,
        fame: true,
      },
    });

    previousMap = new Map(
      previousRankings.map((ranking) => [ranking.playerId, ranking.fame]),
    );
  }

  return prisma.fameRanking.createMany({
    data: rankings.map(({ rank, playerName, fame }) => {
      const playerId = playerMap.get(playerName)!.id;
      const previousFame = previousMap.get(playerId);

      return {
        date,
        rank,
        playerId,
        fame,
        change: previousFame === undefined ? null : fame - previousFame,
      };
    }),
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
    orderBy: { rank: "asc" },
    include: {
      player: true,
    },
  });

  return { date: latest.date, rankings };
};

export const getFameRankingByDate = async (date: Date) => {
  const rankings = await prisma.fameRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" },
    include: {
      player: true,
    },
  });

  return { date, rankings };
};

// Guild ranking

export const addGuildRanking = async (date: Date, rankings: GuildEntry[]) => {
  const guilds = await prisma.guild.findMany({
    where: {
      name: {
        in: rankings.map(({ guildName }) => guildName),
      },
    },
  });

  const guildMap = new Map(
    guilds.map((guild) => [guild.name, guild]),
  );

  for (const ranking of rankings) {
    if (!guildMap.has(ranking.guildName)) {
      throw new RankingInputError(
        `Guild '${ranking.guildName}' is not registered`,
      );
    }
  }

  const previous = await prisma.guildRanking.findFirst({
    where: {
      date: {
        lt: date,
      },
    },
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
  });

  let previousMap = new Map<number, number>();

  if (previous) {
    const previousRankings = await prisma.guildRanking.findMany({
      where: {
        date: previous.date,
      },
      select: {
        guildId: true,
        gp: true,
      },
    });

    previousMap = new Map(
      previousRankings.map((ranking) => [ranking.guildId, ranking.gp]),
    );
  }

  return prisma.guildRanking.createMany({
    data: rankings.map(({ rank, guildName, gp }) => {
      const guildId = guildMap.get(guildName)!.id;
      const previousGP = previousMap.get(guildId);

      return {
        date,
        rank,
        guildId,
        gp,
        change: previousGP === undefined ? null : gp - previousGP,
      };
    }),
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
    orderBy: { rank: "asc" },
    include: {
      guild: true,
    },
  });

  return { date: latest.date, rankings };
};

export const getGuildRankingByDate = async (date: Date) => {
  const rankings = await prisma.guildRanking.findMany({
    where: { date },
    orderBy: { rank: "asc" },
    include: {
      guild: true,
    },
  });

  return { date, rankings };
};