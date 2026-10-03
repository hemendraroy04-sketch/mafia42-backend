import {
  addRPRanking,
  getLatestRPRanking,
  getRPRankingByDate,
  addFameRanking,
  getLatestFameRanking,
  getFameRankingByDate,
  addGuildRanking,
  getLatestGuildRanking,
  getGuildRankingByDate,
} from "../services/ranking.service.js";
import { createRankingController } from "../utils/rankingController.js";

const rp = createRankingController("RP", {
  add: addRPRanking,
  getLatest: getLatestRPRanking,
  getByDate: getRPRankingByDate,
});
const fame = createRankingController("Fame", {
  add: addFameRanking,
  getLatest: getLatestFameRanking,
  getByDate: getFameRankingByDate,
});
const guild = createRankingController("Guild", {
  add: addGuildRanking,
  getLatest: getLatestGuildRanking,
  getByDate: getGuildRankingByDate,
});

export const createRPRanking = rp.create;
export const getRPRanking = rp.get;
export const createFameRanking = fame.create;
export const getFameRanking = fame.get;
export const createGuildRanking = guild.create;
export const getGuildRanking = guild.get;