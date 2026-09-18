import { Request, Response } from "express";
import { createPlayer, updatePlayerCountry } from "../services/player.service.js";

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

export const editPlayerCountry = async (req: Request, res: Response) => {
  try {
    const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;
    const { country } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Player name is required",
      });
    }

    if (!country) {
      return res.status(400).json({
        message: "country is required",
      });
    }

    const player = await updatePlayerCountry(name, country);

    return res.status(200).json({
      message: "Player country updated successfully",
      player,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update player country",
    });
  }
};