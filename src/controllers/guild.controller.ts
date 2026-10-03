import { Request, Response } from "express";
import { createGuild, updateGuildCountry, getGuildByName } from "../services/guild.service.js";

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

export const editGuildCountry = async (req: Request, res: Response) => {
  try {
    const name = Array.isArray(req.params.name)
      ? req.params.name[0]
      : req.params.name;
    const { country } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Guild name is required",
      });
    }

    if (!country) {
      return res.status(400).json({
        message: "country is required",
      });
    }

    const guild = await updateGuildCountry(name, country);

    return res.status(200).json({
      message: "Guild country updated successfully",
      guild,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update guild country",
    });
  }
};

export const getGuild = async (req: Request, res: Response) => {
  try {
    const name = Array.isArray(req.params.name) ? req.params.name[0] : req.params.name;

    if (!name) {
      return res.status(400).json({
        message: "Guild name is required",
      });
    }

    const guild = await getGuildByName(name);

    if (!guild) {
      return res.status(404).json({
        message: "Guild not found",
      });
    }

    return res.status(200).json(guild);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch guild",
    });
  }
};