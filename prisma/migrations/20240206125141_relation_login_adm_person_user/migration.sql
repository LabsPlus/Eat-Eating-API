/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `typeStudentGrantId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Login` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeStudentGrant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[personId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_typeStudentGrantId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "typeStudentGrantId",
ADD COLUMN     "personId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Login";

-- DropTable
DROP TABLE "TypeStudentGrant";

-- CreateTable
CREATE TABLE "LoginAdministrator" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailRecovery" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "LoginAdministrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "is_master" BOOLEAN NOT NULL DEFAULT false,
    "loginAdmId" INTEGER NOT NULL,
    "adminId" INTEGER NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "cpf" TEXT NOT NULL DEFAULT '',
    "born" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_email_key" ON "LoginAdministrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_adminId_key" ON "LoginAdministrator"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_loginAdmId_key" ON "Administrator"("loginAdmId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_adminId_key" ON "Administrator"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_cpf_key" ON "Person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Person_adminId_key" ON "Person"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_userId_key" ON "Person"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_personId_key" ON "User"("personId");

-- AddForeignKey
ALTER TABLE "LoginAdministrator" ADD CONSTRAINT "LoginAdministrator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Administrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
