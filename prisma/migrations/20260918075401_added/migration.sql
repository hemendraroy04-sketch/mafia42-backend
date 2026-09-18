/*
  Warnings:

  - You are about to drop the column `playerName` on the `FameRanking` table. All the data in the column will be lost.
  - You are about to drop the column `guildName` on the `GuildRanking` table. All the data in the column will be lost.
  - You are about to drop the column `playerName` on the `RPRanking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[date,playerId]` on the table `FameRanking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,guildId]` on the table `GuildRanking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date,playerId]` on the table `RPRanking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FameRanking" DROP COLUMN "playerName";

-- AlterTable
ALTER TABLE "GuildRanking" DROP COLUMN "guildName";

-- AlterTable
ALTER TABLE "RPRanking" DROP COLUMN "playerName";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- CreateIndex
CREATE INDEX "FameRanking_playerId_date_idx" ON "FameRanking"("playerId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "FameRanking_date_playerId_key" ON "FameRanking"("date", "playerId");

-- CreateIndex
CREATE INDEX "GuildRanking_guildId_date_idx" ON "GuildRanking"("guildId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "GuildRanking_date_guildId_key" ON "GuildRanking"("date", "guildId");

-- CreateIndex
CREATE INDEX "RPRanking_playerId_date_idx" ON "RPRanking"("playerId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "RPRanking_date_playerId_key" ON "RPRanking"("date", "playerId");

-- AddForeignKey
ALTER TABLE "RPRanking" ADD CONSTRAINT "RPRanking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FameRanking" ADD CONSTRAINT "FameRanking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildRanking" ADD CONSTRAINT "GuildRanking_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
