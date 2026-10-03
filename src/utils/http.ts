import { Request, Response } from "express";
import { RankingInputError } from "../services/ranking.service.js";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function assert(condition: unknown, message: string, status = 400): asserts condition {
  if (!condition) throw new HttpError(status, message);
}

export const handle =
  (failMessage: string, fn: (req: Request, res: Response) => Promise<unknown>) =>
  async (req: Request, res: Response) => {

    try { await fn(req, res) }
    catch (error) {
      const status = error instanceof HttpError ? error.status : error instanceof RankingInputError ? 400 : 500;
      if (status === 500) console.error(error);
      res.status(status).json({ message: status === 500 ? failMessage : (error as Error).message });
    }

  };

export const getNameParam = (req: Request, label: string) => {
  const { name } = req.params;
  const value = Array.isArray(name) ? name[0] : name;
  assert(value, `${label} name is required`);
  
  return value;
};