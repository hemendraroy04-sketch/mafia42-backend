/*
  Warnings:

  - A unique constraint covering the columns `[name,year,month]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_name_year_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_year_month_key" ON "Event"("name", "year", "month");
