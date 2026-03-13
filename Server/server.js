// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Import Routes (use .js extension in ESM)
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import leadRoutes from "./routes/leadRoutes.js";
import { startScheduler } from "./scheduler/cronScheduler.js";
import { runReminderJob } from "./jobs/reminderJob.js";

// CORS
// CORS - FIXED VERSION
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", // your phone/tablet
  "https://demodental-care.vercel.app",// production URL from .env
  // add more if needed
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/leads", leadRoutes);

// ── Manual Reminder Test Endpoint ──────────────────────────────────────
// Hit GET /api/v1/reminder/test-now to trigger the reminder job immediately.
// Remove or protect this route in production.
app.get("/api/v1/reminder/test-now", async (req, res) => {
  try {
    console.log("[Test] Manual reminder trigger via API...");
    await runReminderJob();
    res.json({ success: true, message: "Reminder job executed. Check server logs." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// Start Server - localhost only (no host binding)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Doctor Appointment System is LIVE`);
  console.log(`http://localhost:${PORT}`);

  // ── Start the cron scheduler ────────────────────────────────
  startScheduler();
});