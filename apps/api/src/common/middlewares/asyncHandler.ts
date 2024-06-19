import { Request, Response, NextFunction } from "express";

export type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

/**
 * Middleware catching exeception inside async function
 * */
export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(next);
  };
