-- DropForeignKey
ALTER TABLE "UserTicketsCount" DROP CONSTRAINT "UserTicketsCount_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserTicketsCount" ADD CONSTRAINT "UserTicketsCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
