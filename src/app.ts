import express from "express";
import cors from "cors";
import rankingRoutes from "./routes/ranking.routes";
import eventRoutes from "./routes/event.routes.js";
import playerRoutes from "./routes/player.route.js";
import guildRoutes from "./routes/guild.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Mafia42 API is running",
  });
});

app.use("/api/rankings", rankingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/guilds", guildRoutes);

export default app;