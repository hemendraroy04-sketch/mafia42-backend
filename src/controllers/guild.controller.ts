import { Request, Response } from "express";
import { createGuild } from "../services/guild.service.js";

export const createNewGuild = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        message: "name and country are required",
      });
    }

    const guild = await createGuild({ name, country });

    return res.status(201).json({
      message: "Guild created successfully",
      guild,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create guild",
    });
  }
};