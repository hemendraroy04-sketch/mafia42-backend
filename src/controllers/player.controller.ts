import { Request, Response } from "express";
import { createPlayer } from "../services/player.service.js";

export const createNewPlayer = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        message: "name and country are required",
      });
    }

    const player = await createPlayer({ name, country });

    return res.status(201).json({
      message: "Player created successfully",
      player,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create player",
    });
  }
};