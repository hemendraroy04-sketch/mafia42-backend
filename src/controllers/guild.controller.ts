import { createGuild, updateGuildCountry, getGuildByName } from "../services/guild.service.js";
import { createCountryController } from "../utils/countryController.js";

const guild = createCountryController("Guild", {
  create: createGuild,
  updateCountry: updateGuildCountry,
  getByName: getGuildByName,
});

export const createNewGuild = guild.create;
export const editGuildCountry = guild.editCountry;
export const getGuild = guild.get;