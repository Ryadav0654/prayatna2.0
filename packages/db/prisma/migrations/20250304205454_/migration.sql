-- CreateEnum
CREATE TYPE "AlarmStatus" AS ENUM ('PENDING', 'DEPARTED', 'RESOLVED');

-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AlarmStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
