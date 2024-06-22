import resetDb from "./reset-db";
import { beforeEach } from "vitest";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "../../../../.env.development"),
});

beforeEach(async () => {
  await resetDb();
});
