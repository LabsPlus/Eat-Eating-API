const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.operatedTickets.create({
      data: {
        id: 1,
        ticketsOpened: 100,
        ticketsSold: 0,
        ticketsAvailable: 100,
        ticketsConsumed: 0,
      },
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
