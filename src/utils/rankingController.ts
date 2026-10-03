import { assert, HttpError, handle } from "./http.js";

interface RankingService {
  add: (date: Date, rankings: any[]) => Promise<unknown>;
  getLatest: () => Promise<unknown>;
  getByDate: (date: Date) => Promise<unknown>;
}

const validateRankingInput = (date: any, rankings: any) => {
  assert(date && Array.isArray(rankings), "date and rankings are required");
  assert(rankings.length === 13, "Exactly 13 rankings are required");
  assert(!Number.isNaN(new Date(date).getTime()), "Invalid date");
};

const parseQueryDate = (date: unknown) => {
  const parsed = typeof date === "string" && date
    ? new Date(`${date}T00:00:00.000Z`)
    : null;
  if (!parsed || Number.isNaN(parsed.getTime())) throw new HttpError(400, "Invalid date");

  return parsed;
};

export const createRankingController = (label: string, service: RankingService) => ({
  create: handle(`Failed to add ${label} ranking`, async (req, res) => {
    const { date, rankings } = req.body;
    validateRankingInput(date, rankings);
    const result = await service.add(new Date(date), rankings);

    res.status(201).json({ message: `${label} ranking added successfully`, result });
  }),

  get: handle(`Failed to fetch ${label} ranking`, async (req, res) => {
    const { date } = req.query;
    const result = date === undefined
        ? await service.getLatest()
        : await service.getByDate(parseQueryDate(date));

    res.status(200).json(result);
  }),
});