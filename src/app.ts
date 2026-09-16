import express from "express";
import cors from "cors";
import rankingRoutes from "./routes/ranking.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Mafia42 API is running",
  });
});

app.use("/api/rankings", rankingRoutes);

export default app;