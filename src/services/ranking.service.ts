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
  return prisma.$transaction(async (tx) => {
    const players = await tx.player.findMany({
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

    const previous = await tx.rPRanking.findFirst({
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
      const previousRankings = await tx.rPRanking.findMany({
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

    const result = await tx.rPRanking.createMany({
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

    for (const ranking of rankings) {
      const player = playerMap.get(ranking.playerName)!;

      await tx.player.update({
        where: { id: player.id },
        data: {
          RPLbcount: {
            increment: 1,
          },
          PeakRP:
            player.PeakRP === null || ranking.rp > player.PeakRP
              ? ranking.rp
              : player.PeakRP,
          PeakRPRank:
            player.PeakRPRank === null || ranking.rank < player.PeakRPRank
              ? ranking.rank
              : player.PeakRPRank,
        },
      });
    }

    return result;
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
  return prisma.$transaction(async (tx) => {
    const players = await tx.player.findMany({
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

    const previous = await tx.fameRanking.findFirst({
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
      const previousRankings = await tx.fameRanking.findMany({
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

    const result = await tx.fameRanking.createMany({
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

    for (const ranking of rankings) {
      const player = playerMap.get(ranking.playerName)!;

      await tx.player.update({
        where: { id: player.id },
        data: {
          FameLBcount: {
            increment: 1,
          },
          PeakFame:
            player.PeakFame === null || ranking.fame > player.PeakFame
              ? ranking.fame
              : player.PeakFame,
          PeakFameRank:
            player.PeakFameRank === null || ranking.rank < player.PeakFameRank
              ? ranking.rank
              : player.PeakFameRank,
        },
      });
    }

    return result;
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
  return prisma.$transaction(async (tx) => {
    const guilds = await tx.guild.findMany({
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

    const previous = await tx.guildRanking.findFirst({
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
      const previousRankings = await tx.guildRanking.findMany({
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

    const result = await tx.guildRanking.createMany({
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

    for (const ranking of rankings) {
      const guild = guildMap.get(ranking.guildName)!;

      await tx.guild.update({
        where: { id: guild.id },
        data: {
          GuildLbCount: {
            increment: 1,
          },
          PeakGP:
            guild.PeakGP === null || ranking.gp > guild.PeakGP
              ? ranking.gp
              : guild.PeakGP,
          PeakGPRank:
            guild.PeakGPRank === null || ranking.rank < guild.PeakGPRank
              ? ranking.rank
              : guild.PeakGPRank,
        },
      });
    }

    return result;
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