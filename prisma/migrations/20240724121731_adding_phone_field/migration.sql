/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_phone_key" ON "Administrator"("phone");
