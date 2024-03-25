/*
  Warnings:

  - A unique constraint covering the columns `[emailRecovery]` on the table `LoginAdministrator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailRecovery]` on the table `LoginUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_emailRecovery_key" ON "LoginAdministrator"("emailRecovery");

-- CreateIndex
CREATE UNIQUE INDEX "LoginUser_emailRecovery_key" ON "LoginUser"("emailRecovery");
