-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userTicketsCountId_fkey";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userTicketsCountId_fkey" FOREIGN KEY ("userTicketsCountId") REFERENCES "UserTicketsCount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
