-- CreateTable
CREATE TABLE "Keystore" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Keystore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Keystore" ADD CONSTRAINT "Keystore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
