/*
  Warnings:

  - You are about to drop the column `typeStudentGrantID` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_typeStudentGrantID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeStudentGrantID",
ADD COLUMN     "typeStudentGrantId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_typeStudentGrantId_fkey" FOREIGN KEY ("typeStudentGrantId") REFERENCES "TypeStudentGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
