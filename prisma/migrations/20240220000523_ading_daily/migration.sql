/*
  Warnings:

  - A unique constraint covering the columns `[dailyMeals]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dailyMeals` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyMeals" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_dailyMeals_key" ON "User"("dailyMeals");
