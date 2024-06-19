import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import Logger from "@repo/logger";
import { routesV1 } from "./routes";
import expressListEndpoints from "express-list-endpoints";
import errorHandler from "@middlewares/errorHandler";
import { NotFoundError } from "@error/error";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api/v1", routesV1)
    .use((_req, _res, next) => next(new NotFoundError()))
    .use(errorHandler);

  const endPoints = expressListEndpoints(app);
  Logger.info("--------------EndPoint Registers-------------------");
  endPoints.forEach((e) => {
    Logger.info(`${e.methods} ${e.path}`);
  });
  Logger.info("---------------------------------------------------");

  return app;
};
