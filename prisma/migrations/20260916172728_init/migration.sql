-- CreateTable
CREATE TABLE "RPRanking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rank" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "rp" INTEGER NOT NULL,

    CONSTRAINT "RPRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FameRanking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rank" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "fame" INTEGER NOT NULL,

    CONSTRAINT "FameRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildRanking" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rank" INTEGER NOT NULL,
    "guildId" TEXT NOT NULL,
    "guildName" TEXT NOT NULL,
    "gp" INTEGER NOT NULL,

    CONSTRAINT "GuildRanking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventBox" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventItem" (
    "id" SERIAL NOT NULL,
    "boxId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "probability" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EventItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RPRanking_date_idx" ON "RPRanking"("date");

-- CreateIndex
CREATE UNIQUE INDEX "RPRanking_date_rank_key" ON "RPRanking"("date", "rank");

-- CreateIndex
CREATE INDEX "FameRanking_date_idx" ON "FameRanking"("date");

-- CreateIndex
CREATE UNIQUE INDEX "FameRanking_date_rank_key" ON "FameRanking"("date", "rank");

-- CreateIndex
CREATE INDEX "GuildRanking_date_idx" ON "GuildRanking"("date");

-- CreateIndex
CREATE UNIQUE INDEX "GuildRanking_date_rank_key" ON "GuildRanking"("date", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_year_key" ON "Event"("name", "year");

-- CreateIndex
CREATE INDEX "EventBox_eventId_idx" ON "EventBox"("eventId");

-- CreateIndex
CREATE INDEX "EventItem_boxId_idx" ON "EventItem"("boxId");

-- AddForeignKey
ALTER TABLE "EventBox" ADD CONSTRAINT "EventBox_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventItem" ADD CONSTRAINT "EventItem_boxId_fkey" FOREIGN KEY ("boxId") REFERENCES "EventBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
