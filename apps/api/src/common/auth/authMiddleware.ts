import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { AuthFailureError } from "@error/error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) throw new AuthFailureError("Unauthorized");
    req.user = user;
    next();
  })(req, res, next);
};
