/*
  Warnings:

  - You are about to drop the column `phone` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `pictureId` on the `Administrator` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Picture` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[personId]` on the table `Picture` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `personId` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Administrator" DROP CONSTRAINT "Administrator_pictureId_fkey";

-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_userId_fkey";

-- DropIndex
DROP INDEX "Administrator_pictureId_key";

-- DropIndex
DROP INDEX "Picture_userId_key";

-- AlterTable
ALTER TABLE "Administrator" DROP COLUMN "phone",
DROP COLUMN "pictureId";

-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "userId",
ADD COLUMN     "personId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Picture_personId_key" ON "Picture"("personId");

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;
