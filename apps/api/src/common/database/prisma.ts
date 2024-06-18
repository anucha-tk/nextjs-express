import { PrismaClient } from "@prisma/client";
import Logger from "@repo/logger";

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
    Logger.info("Connected to the database");
  })
  .catch((error) => {
    Logger.error("Error connecting to the database:", error);
  });
