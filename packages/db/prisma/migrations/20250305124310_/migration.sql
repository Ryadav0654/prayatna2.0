/*
  Warnings:

  - You are about to drop the column `documents` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "documents",
ALTER COLUMN "businessName" DROP NOT NULL;
