-- CreateTable
CREATE TABLE "RfidCard" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RfidCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RfidCard_cardNumber_key" ON "RfidCard"("cardNumber");

-- CreateIndex
CREATE UNIQUE INDEX "RfidCard_userId_key" ON "RfidCard"("userId");

-- AddForeignKey
ALTER TABLE "RfidCard" ADD CONSTRAINT "RfidCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
