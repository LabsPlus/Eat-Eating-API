/*
  Warnings:

  - Made the column `description` on table `categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `tipodebolsa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `categoria` MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tipodebolsa` MODIFY `description` VARCHAR(191) NOT NULL;
