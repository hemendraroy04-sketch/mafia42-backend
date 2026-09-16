import { Request, Response } from "express";
import {
  addRPRanking,
  getLatestRPRanking,
  addFameRanking,
  getLatestFameRanking,
  addGuildRanking,
  getLatestGuildRanking,
} from "../services/ranking.service.js";

// Helper to validate incoming payload
const validateRankingInput = (date: any, rankings: any) => {
  if (!date || !Array.isArray(rankings)) {
    return "date and rankings are required";
  }
  if (rankings.length !== 13) {
    return "Exactly 13 rankings are required";
  }
  if (Number.isNaN(new Date(date).getTime())) {
    return "Invalid date";
  }
  return null;
};

// RP ranking

export const createRPRanking = async (req: Request, res: Response) => {
  try {
    const { date, rankings } = req.body;
    const error = validateRankingInput(date, rankings);
    if (error) return res.status(400).json({ message: error });

    const result = await addRPRanking(new Date(date), rankings);
    return res.status(201).json({ message: "RP ranking added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add RP ranking" });
  }
};

export const getRPRanking = async (_req: Request, res: Response) => {
  try {
    const result = await getLatestRPRanking();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch RP ranking" });
  }
};

// Fame ranking

export const createFameRanking = async (req: Request, res: Response) => {
  try {
    const { date, rankings } = req.body;
    const error = validateRankingInput(date, rankings);
    if (error) return res.status(400).json({ message: error });

    const result = await addFameRanking(new Date(date), rankings);
    return res.status(201).json({ message: "Fame ranking added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add Fame ranking" });
  }
};

export const getFameRanking = async (_req: Request, res: Response) => {
  try {
    const result = await getLatestFameRanking();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch Fame ranking" });
  }
};

// Guild ranking

export const createGuildRanking = async (req: Request, res: Response) => {
  try {
    const { date, rankings } = req.body;
    const error = validateRankingInput(date, rankings);
    if (error) return res.status(400).json({ message: error });

    const result = await addGuildRanking(new Date(date), rankings);
    return res.status(201).json({ message: "Guild ranking added successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add Guild ranking" });
  }
};

export const getGuildRanking = async (_req: Request, res: Response) => {
  try {
    const result = await getLatestGuildRanking();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch Guild ranking" });
  }
};