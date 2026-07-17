import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import paymentRoutes from "./routes/payments.js";
import betRoutes from "./routes/bets.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bets", betRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Backend error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
