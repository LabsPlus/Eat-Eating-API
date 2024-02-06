/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeStudentGrant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_typeStudentGrantId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "TypeStudentGrant";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tb_login" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "email_recovery" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_type_grant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_type_grant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_person" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "enrollment" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_administrator" (
    "id" SERIAL NOT NULL,
    "id_login" INTEGER NOT NULL,
    "id_person" INTEGER NOT NULL,
    "is_manager_administrator" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_student" (
    "id" SERIAL NOT NULL,
    "id_course" INTEGER NOT NULL,
    "id_person" INTEGER NOT NULL,
    "id_type_grant" INTEGER NOT NULL,
    "enrollment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_visiting" (
    "id" SERIAL NOT NULL,
    "id_person" INTEGER NOT NULL,
    "id_type_grant" INTEGER NOT NULL,
    "enrollment" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_visiting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_employee" (
    "id" SERIAL NOT NULL,
    "id_person" INTEGER NOT NULL,
    "id_type_grant" INTEGER NOT NULL,
    "enrollment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_login_user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email_recovery" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_login_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "id_person" INTEGER NOT NULL,
    "id_login_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_biometry" (
    "id" INTEGER NOT NULL,
    "biometry" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_biometry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_ticket" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_access_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_access_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_access" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_access_type" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_access_user" (
    "id_access" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_access_user_pkey" PRIMARY KEY ("id_access","id_user")
);

-- CreateTable
CREATE TABLE "tb_ticket_user" (
    "id_ticket" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_ticket_user_pkey" PRIMARY KEY ("id_ticket","id_user")
);

-- CreateTable
CREATE TABLE "tb_cartao_rfid" (
    "id_user" INTEGER NOT NULL,
    "card" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_cartao_rfid_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_login_email_key" ON "tb_login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_login_email_recovery_key" ON "tb_login"("email_recovery");

-- CreateIndex
CREATE UNIQUE INDEX "tb_person_cpf_key" ON "tb_person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tb_person_enrollment_key" ON "tb_person"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "tb_student_enrollment_key" ON "tb_student"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "tb_visiting_enrollment_key" ON "tb_visiting"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "tb_employee_enrollment_key" ON "tb_employee"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "tb_login_user_email_key" ON "tb_login_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_login_user_email_recovery_key" ON "tb_login_user"("email_recovery");

-- AddForeignKey
ALTER TABLE "tb_administrator" ADD CONSTRAINT "tb_administrator_id_login_fkey" FOREIGN KEY ("id_login") REFERENCES "tb_login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_administrator" ADD CONSTRAINT "tb_administrator_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "tb_person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_student" ADD CONSTRAINT "tb_student_id_course_fkey" FOREIGN KEY ("id_course") REFERENCES "tb_course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_student" ADD CONSTRAINT "tb_student_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "tb_person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_student" ADD CONSTRAINT "tb_student_id_type_grant_fkey" FOREIGN KEY ("id_type_grant") REFERENCES "tb_type_grant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_visiting" ADD CONSTRAINT "tb_visiting_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "tb_person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_visiting" ADD CONSTRAINT "tb_visiting_id_type_grant_fkey" FOREIGN KEY ("id_type_grant") REFERENCES "tb_type_grant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_employee" ADD CONSTRAINT "tb_employee_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "tb_person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_employee" ADD CONSTRAINT "tb_employee_id_type_grant_fkey" FOREIGN KEY ("id_type_grant") REFERENCES "tb_type_grant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "tb_person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_id_login_user_fkey" FOREIGN KEY ("id_login_user") REFERENCES "tb_login_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_biometry" ADD CONSTRAINT "tb_biometry_id_fkey" FOREIGN KEY ("id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_ticket" ADD CONSTRAINT "tb_ticket_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_access" ADD CONSTRAINT "tb_access_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_access" ADD CONSTRAINT "tb_access_id_access_type_fkey" FOREIGN KEY ("id_access_type") REFERENCES "tb_access_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_access_user" ADD CONSTRAINT "tb_access_user_id_access_fkey" FOREIGN KEY ("id_access") REFERENCES "tb_access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_access_user" ADD CONSTRAINT "tb_access_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_ticket_user" ADD CONSTRAINT "tb_ticket_user_id_ticket_fkey" FOREIGN KEY ("id_ticket") REFERENCES "tb_ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_ticket_user" ADD CONSTRAINT "tb_ticket_user_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cartao_rfid" ADD CONSTRAINT "tb_cartao_rfid_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
