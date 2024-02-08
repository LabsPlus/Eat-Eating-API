-- CreateEnum
CREATE TYPE "CategoryName" AS ENUM ('ESTUDANTE', 'FUNCIONARIO', 'VISITANTE');

-- CreateEnum
CREATE TYPE "TypeGrantName" AS ENUM ('INTEGRAL', 'PARCIAL', 'NAO_APLICAVEL');

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
    "is_master" BOOLEAN NOT NULL DEFAULT false,
    "personId" INTEGER NOT NULL,
    "loginAdmId" INTEGER NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "born" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "personId" INTEGER NOT NULL,
    "loginUserId" INTEGER,
    "categoryId" INTEGER,
    "typeGrantId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "enrollment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "enrollment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
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
    "name" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "LoginAdministrator_email_key" ON "LoginAdministrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_personId_key" ON "Administrator"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_loginAdmId_key" ON "Administrator"("loginAdmId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_cpf_key" ON "Person"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_personId_key" ON "User"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "User_loginUserId_key" ON "User"("loginUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_categoryId_key" ON "User"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "User_typeGrantId_key" ON "User"("typeGrantId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_enrollment_key" ON "Student"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Visitors_userId_key" ON "Visitors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_enrollment_key" ON "Employee"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Picture_url_key" ON "Picture"("url");

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

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrator" ADD CONSTRAINT "Administrator_loginAdmId_fkey" FOREIGN KEY ("loginAdmId") REFERENCES "LoginAdministrator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loginUserId_fkey" FOREIGN KEY ("loginUserId") REFERENCES "LoginUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_typeGrantId_fkey" FOREIGN KEY ("typeGrantId") REFERENCES "TypeGrant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitors" ADD CONSTRAINT "Visitors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;