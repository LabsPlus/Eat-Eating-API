const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.TypeGrant.create({
    data: {
      name: 'INTEGRAL'
    }
  })

  await prisma.TypeGrant.create({
    data: {
      name: 'PARCIAL'
    }
  })

  await prisma.TypeGrant.create({
    data: {
      name: 'NAO_APLICAVEL'
    }
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })