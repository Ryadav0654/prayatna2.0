/*
  Warnings:

  - You are about to drop the column `businessType` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `approvalDate` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `constructionYear` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `fireSafetyMeasures` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `floors` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `ownerContact` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `pincode` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Building` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Inspection` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledDate` on the `Inspection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Inspection` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "businessType",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Approval" DROP COLUMN "approvalDate",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Building" DROP COLUMN "area",
DROP COLUMN "city",
DROP COLUMN "constructionYear",
DROP COLUMN "createdAt",
DROP COLUMN "fireSafetyMeasures",
DROP COLUMN "floors",
DROP COLUMN "ownerContact",
DROP COLUMN "ownerName",
DROP COLUMN "pincode",
DROP COLUMN "state",
DROP COLUMN "updatedAt",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "createdAt",
DROP COLUMN "scheduledDate",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
