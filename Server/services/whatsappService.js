// services/whatsappService.js
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

/**
 * Format time from "HH:MM:SS" → "HH:MM AM/PM"
 */
function formatTime(timeStr) {
  if (!timeStr) return "N/A";
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

/**
 * Format date from "YYYY-MM-DD" → "12 March 2026"
 */
function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Send a WhatsApp reminder via Twilio.
 * Phone number must be in international format: e.g. 919876543210 (no + needed, we prefix it)
 * @param {Object} appointment - { patient_name, patient_phone, date, time }
 */
export const sendWhatsAppReminder = async (appointment) => {
  const { patient_name, patient_phone, date, time } = appointment;

  if (!patient_phone) {
    console.log(`[WhatsApp] No phone for ${patient_name}, skipping.`);
    return { sent: false, reason: "no_phone" };
  }

  // Normalize phone: strip leading + or spaces
  const phone = String(patient_phone).replace(/[\s+\-()]/g, "");

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  const message = `Hello ${patient_name} 👋

This is a reminder from *Dental Clinic* about your upcoming appointment.

📅 *Date:* ${formattedDate}
⏰ *Time:* ${formattedTime}

Please arrive *10 minutes early* and bring any previous dental records.

If you need to reschedule, please contact us.

Thank you! 😊`;

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM, // e.g. whatsapp:+14155238886
    to: `whatsapp:+${phone}`,
    body: message,
  });

  console.log(`[WhatsApp] ✅ Reminder sent to +${phone} for ${patient_name}`);
  return { sent: true };
};
