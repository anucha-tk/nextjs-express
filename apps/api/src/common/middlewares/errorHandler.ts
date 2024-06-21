/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError, BadRequestError, InternalError } from "@error/error";
import ErrorResponse from "@response/errorResponse";
import { NextFunction, Request, Response } from "express";
import Logger from "@repo/logger";
import { environment } from "src/config";

/**
 * catch error to response
 * */
const errorHandler = (
  err: ErrorResponse | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else if (err.code === 11000) {
    ApiError.handle(
      new BadRequestError(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        `Duplicate field value entered ${Object.keys(err.keyValue)}`,
      ),
      res,
    );
  } else {
    if (environment === "development") {
      Logger.error(err);

      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
};

export default errorHandler;
