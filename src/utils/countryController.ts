import { assert, getNameParam, handle } from "./http.js";

interface CountryService {
  create: (data: any) => Promise<unknown>;
  updateCountry: (name: string, country: any) => Promise<unknown>;
  getByName: (name: string) => Promise<unknown>;
}

export const createCountryController = (label: string, service: CountryService) => {
  const key = label.toLowerCase();

  return {
    create: handle(`Failed to create ${key}`, async (req, res) => {
      const { name, country } = req.body;
      assert(name && country, "name and country are required");
      const entity = await service.create({ name, country });
      
      res.status(201).json({ message: `${label} created successfully`, [key]: entity });
    }),

    editCountry: handle(`Failed to update ${key} country`, async (req, res) => {
      const name = getNameParam(req, label);
      const { country } = req.body;
      assert(country, "country is required");
      const entity = await service.updateCountry(name, country);

      res.status(200).json({ message: `${label} country updated successfully`, [key]: entity });
    }),

    get: handle(`Failed to fetch ${key}`, async (req, res) => {
      const entity = await service.getByName(getNameParam(req, label));
      assert(entity, `${label} not found`, 404);

      res.status(200).json(entity);
    }),
  };
};