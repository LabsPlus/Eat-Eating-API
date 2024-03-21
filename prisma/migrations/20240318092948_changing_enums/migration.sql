/*
  Warnings:

  - The values [ESTUDANTE] on the enum `CategoryName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CategoryName_new" AS ENUM ('ALUNO', 'FUNCIONARIO', 'VISITANTE');
ALTER TABLE "Category" ALTER COLUMN "name" TYPE "CategoryName_new" USING ("name"::text::"CategoryName_new");
ALTER TYPE "CategoryName" RENAME TO "CategoryName_old";
ALTER TYPE "CategoryName_new" RENAME TO "CategoryName";
DROP TYPE "CategoryName_old";
COMMIT;
