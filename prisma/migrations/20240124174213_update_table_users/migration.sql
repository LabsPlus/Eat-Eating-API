/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refeicoesDiarias` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `refeicoesDiarias` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_matricula_key` ON `User`(`matricula`);
