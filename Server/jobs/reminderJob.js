// jobs/reminderJob.js
import DoctorModel from "../models/index.js";
import { sendEmailReminder } from "../services/emailService.js";
import { sendWhatsAppReminder } from "../services/whatsappService.js";

/**
 * Main reminder job — runs daily at 6:00 AM via cron.
 * Fetches today's pending/confirmed appointments,
 * sends WhatsApp + Email reminders, then marks as 'reminded'.
 */
export const runReminderJob = async () => {
  console.log("\n========================================");
  console.log(`[Reminder] 🕕 Job started at ${new Date().toLocaleString()}`);
  console.log("========================================");

  try {
    // Step 1 — Fetch today's appointments that need reminders
    const appointments = await DoctorModel.getTodayAppointmentsForReminder();

    if (!appointments || appointments.length === 0) {
      console.log("[Reminder] ✅ No appointments to remind today. Job done.");
      return;
    }

    console.log(`[Reminder] 📋 Found ${appointments.length} appointment(s) to remind.\n`);

    let successCount = 0;
    let failCount = 0;

    // Step 2 — Loop each appointment
    for (const appointment of appointments) {
      const { id, patient_name, patient_phone, patient_email } = appointment;
      console.log(`[Reminder] 👤 Processing: ${patient_name} (ID: ${id})`);

      let whatsappResult = { sent: false };
      let emailResult = { sent: false };

      // Step 3a — Send WhatsApp if phone exists
      try {
        if (patient_phone) {
          whatsappResult = await sendWhatsAppReminder(appointment);
        } else {
          console.log(`[Reminder]   ⚠️  No phone number — WhatsApp skipped.`);
        }
      } catch (err) {
        console.error(`[Reminder]   ❌ WhatsApp failed for ${patient_name}:`, err.message);
      }

      // Step 3b — Send Email if email exists
      try {
        if (patient_email) {
          emailResult = await sendEmailReminder(appointment);
        } else {
          console.log(`[Reminder]   ⚠️  No email address — Email skipped.`);
        }
      } catch (err) {
        console.error(`[Reminder]   ❌ Email failed for ${patient_name}:`, err.message);
      }

      // Step 4 — Update DB status → 'reminded' (only if at least one notification sent)
      if (whatsappResult.sent || emailResult.sent) {
        try {
          await DoctorModel.markAsReminded(id);
          console.log(`[Reminder]   ✅ Status updated to 'reminded' for ID: ${id}`);
          successCount++;
        } catch (err) {
          console.error(`[Reminder]   ❌ DB update failed for ID ${id}:`, err.message);
          failCount++;
        }
      } else {
        console.log(`[Reminder]   ⚠️  No notifications sent for ${patient_name} — status NOT updated.`);
        failCount++;
      }

      console.log(""); // blank line between appointments in logs
    }

    console.log("========================================");
    console.log(`[Reminder] 🏁 Job complete | ✅ ${successCount} reminded | ❌ ${failCount} failed`);
    console.log("========================================\n");

  } catch (err) {
    console.error("[Reminder] 🔥 Fatal error in reminder job:", err);
  }
};
