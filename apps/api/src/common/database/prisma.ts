import { PrismaClient } from "@prisma/client";
import Logger from "@repo/logger";
import * as emoji from "node-emoji";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

prisma
  .$connect()
  .then(() => {
    Logger.info(`${emoji.get("bookmark_tabs")} Connected to the database`);
  })
  .catch((error) => {
    Logger.error("Error connecting to the database:", error);
  });
