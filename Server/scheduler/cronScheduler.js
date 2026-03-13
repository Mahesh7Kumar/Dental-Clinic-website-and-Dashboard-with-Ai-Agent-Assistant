// scheduler/cronScheduler.js
import cron from "node-cron";
import { runReminderJob } from "../jobs/reminderJob.js";

/**
 * Starts all cron schedules.
 *
 * Schedule: "0 6 * * *"
 *  ┌─ minute  (0)
 *  ├─ hour    (6)  → 6:00 AM
 *  ├─ day     (*)  → every day
 *  ├─ month   (*)  → every month
 *  └─ weekday (*)  → every weekday
 */
export const startScheduler = () => {
  // ── Daily 6:00 AM reminder job ─────────────────────────────
  cron.schedule(
    "0 6 * * *",
    async () => {
      console.log("[Cron] ⏰ 6:00 AM — Triggering daily reminder job...");
      await runReminderJob();
    },
    {
      timezone: "Asia/Kolkata", // ← Set your local timezone here
    }
  );

  console.log("[Scheduler] ✅ Cron jobs registered:");
  console.log("            📅 Daily reminder → every day at 6:00 AM (Asia/Kolkata)");
};
