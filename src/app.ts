import express from "express";
import cors from "cors";
import rankingRoutes from "./routes/ranking.routes";
import eventRoutes from "./routes/event.routes.js";

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

export default app;