/*
  Warnings:

  - A unique constraint covering the columns `[pictureId]` on the table `Administrator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Administrator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pictureId` to the `Administrator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Administrator" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "pictureId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_pictureId_key" ON "Administrator"("pictureId");

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
