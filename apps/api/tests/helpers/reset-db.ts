import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Reset database for testing
 * @caution not use on production, separate database for testing
 * */
export default async () => {
  await prisma.$transaction([
    prisma.keystore.deleteMany(),
    prisma.user.deleteMany(),
  ]);
};
