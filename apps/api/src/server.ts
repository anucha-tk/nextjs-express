import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import prisma from "./common/database/prisma";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });
  app.get("/apikey", async (_, res) => {
    const apikeys = await prisma.apiKey.findMany();
    return res.json(apikeys);
  });
  return app;
};
