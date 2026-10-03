import { createPlayer, updatePlayerCountry, getPlayerByName } from "../services/player.service.js";
import { createCountryController } from "../utils/countryController.js";

const player = createCountryController("Player", {
  create: createPlayer,
  updateCountry: updatePlayerCountry,
  getByName: getPlayerByName,
});

export const createNewPlayer = player.create;
export const editPlayerCountry = player.editCountry;
export const getPlayer = player.get;