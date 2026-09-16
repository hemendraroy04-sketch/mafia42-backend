import { Request, Response } from "express";
import { addRPRanking, getLatestRPRanking } from "../services/ranking.service.js";

export const createRPRanking = async (req: Request, res: Response) => {
  try {
    const { date, rankings } = req.body;

    if (!date || !Array.isArray(rankings)) {
      return res.status(400).json({
        message: "date and rankings are required",
      });
    }

    if (rankings.length !== 13) {
      return res.status(400).json({
        message: "Exactly 13 rankings are required",
      });
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        message: "Invalid date",
      });
    }

    const result = await addRPRanking(parsedDate, rankings);

    return res.status(201).json({
      message: "RP ranking added successfully",
      result,
    });
  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to add RP ranking",
    });
  }
};

export const getRPRanking = async (_req: Request,res: Response) => {
  try {
    const result = await getLatestRPRanking();

    return res.status(200).json(result);
  }
  catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch RP ranking",
    });
  }
};