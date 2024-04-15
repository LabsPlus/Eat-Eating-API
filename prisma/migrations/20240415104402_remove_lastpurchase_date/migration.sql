-- CreateEnum
CREATE TYPE "CategoryName" AS ENUM ('ALUNO', 'FUNCIONARIO', 'VISITANTE');

-- CreateEnum
CREATE TYPE "TypeGrantName" AS ENUM ('INTEGRAL', 'PARCIAL', 'NAO_APLICAVEL');

-- CreateEnum
CREATE TYPE "CourseName" AS ENUM ('TECNICO_AGROPECUARIA', 'TECNICO_AGROINDUSTRIA', 'TECNICO_MEIO_AMBIENTE', 'TECNICO_SUBSEQUENTE_AGROPECUARIA', 'TECNICO_SUBSEQUENTE_INFORMATICA', 'TECNICO_SUBSEQUENTE_ALIMENTOS', 'BACHARELADO_SISTEMA_DE_INFORMACAO', 'BACHARELADO_LIBRAS', 'BACHARELADO_EDUCACAO_FISICA', 'POS_ENSINO_DE_CIENCIAS_NATURAIS_E_MATEMATICA', 'POS_LEITURA_E_PRODUCAO_TEXTUAL_APLICADAS_A_EJA');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('NAO_USADO', 'USADO');

-- CreateTable
CREATE TABLE "LoginAdministrator" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailRecovery" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginAdministrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administrator" (
    "id" SERIAL NOT NULL,
    "isMaster" BOOLEAN NOT NULL DEFAULT false,
    "personId" INTEGER NOT NULL,
    "loginAdmId" INTEGER NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL DEFAULT '',
    "born" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "loginUserId" INTEGER,
    "categoryId" INTEGER,
    "typeGrantId" INTEGER,
    "dailyMeals" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" SERIAL NOT NULL,
    "enrollment" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" "CategoryName" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeGrant" (
    "id" SERIAL NOT NULL,
    "name" "TypeGrantName" NOT NULL,

    CONSTRAINT "TypeGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" "CourseName" NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailRecovery" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoginUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "status" "TypeStatus" NOT NULL DEFAULT 'NAO_USADO',
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticketPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userTicketsCountId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTicketsCount" (
    "id" SERIAL NOT NULL,
    "totalTicketsOfUser" INTEGER NOT NULL,
    "totalTicketsOfUserActive" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserTicketsCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatedTickets" (
    "id" SERIAL NOT NULL,
    "ticketsOpened" INTEGER NOT NULL,
    "ticketsSold" INTEGER NOT NULL,
    "ticketsAvailable" INTEGER NOT NULL,
    "ticketsConsumed" INTEGER NOT NULL,

    CONSTRAINT "OperatedTickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_email_key" ON "LoginAdministrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_emailRecovery_key" ON "LoginAdministrator"("emailRecovery");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_personId_key" ON "Administrator"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_loginAdmId_key" ON "Administrator"("loginAdmId");

-- CreateIndex
CREATE UNIQUE INDEX "User_personId_key" ON "User"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginUserId_key" ON "User"("loginUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollmentId_key" ON "Student"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_enrollment_key" ON "Enrollment"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_enrollmentId_key" ON "Employee"("enrollmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_userId_key" ON "Visitor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_userId_key" ON "Picture"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TypeGrant_name_key" ON "TypeGrant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LoginUser_email_key" ON "LoginUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LoginUser_emailRecovery_key" ON "LoginUser"("emailRecovery");

-- CreateIndex
CREATE UNIQUE INDEX "UserTicketsCount_userId_key" ON "UserTicketsCount"("userId");

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_loginAdmId_fkey" FOREIGN KEY ("loginAdmId") REFERENCES "LoginAdministrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loginUserId_fkey" FOREIGN KEY ("loginUserId") REFERENCES "LoginUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_typeGrantId_fkey" FOREIGN KEY ("typeGrantId") REFERENCES "TypeGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userTicketsCountId_fkey" FOREIGN KEY ("userTicketsCountId") REFERENCES "UserTicketsCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTicketsCount" ADD CONSTRAINT "UserTicketsCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
