import Joi from "joi";
import Logger from "@repo/logger";
import { ValidationSource } from "./validator.enum";
import { Request, Response, NextFunction } from "express";
import { UnprocessableContentResponse } from "@response/response";
import _ from "lodash";

export const validator =
  ({
    schema,
    source = ValidationSource.BODY,
  }: {
    schema: Joi.ObjectSchema;
    source: ValidationSource;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToValidate = (req as any)[source];
      const { error } = schema.validate(dataToValidate, { abortEarly: false });

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      Logger.error(message);

      const errors = _.map(
        details,
        _.partialRight(_.pick, ["message", "path"]),
      );

      next(
        new UnprocessableContentResponse("Unprocessable Content", {
          errors,
        }).send(res),
      );
    } catch (error) {
      next(error);
    }
  };
