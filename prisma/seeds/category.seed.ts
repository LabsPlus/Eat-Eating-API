const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  await prisma.Category.create({
    data: {
      name: 'ESTUDANTE'
    }
  })

  await prisma.Category.create({
    data: {
      name: 'VISITANTE'
    }
  })

  await prisma.Category.create({
    data: {
      name: 'FUNCIONARIO'
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