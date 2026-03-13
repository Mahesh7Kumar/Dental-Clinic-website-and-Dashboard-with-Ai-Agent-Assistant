// services/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
 * Send an appointment reminder email.
 * @param {Object} appointment - { patient_name, patient_email, date, time }
 */
export const sendEmailReminder = async (appointment) => {
  const { patient_name, patient_email, date, time } = appointment;

  if (!patient_email) {
    console.log(`[Email] No email for ${patient_name}, skipping.`);
    return { sent: false, reason: "no_email" };
  }

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  const mailOptions = {
    from: `"Dental Clinic" <${process.env.EMAIL_USER}>`,
    to: patient_email,
    subject: "🦷 Appointment Reminder – Dental Clinic",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fb; margin: 0; padding: 0; }
          .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 36px 32px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
          .header p { color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px; }
          .body { padding: 32px; }
          .greeting { font-size: 18px; color: #1e293b; font-weight: 600; margin-bottom: 12px; }
          .message { font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
          .details { background: #f8fafc; border-radius: 10px; padding: 20px 24px; border-left: 4px solid #4f46e5; }
          .details-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
          .details-row:last-child { border-bottom: none; }
          .details-label { color: #64748b; font-size: 14px; font-weight: 500; }
          .details-value { color: #1e293b; font-size: 14px; font-weight: 600; }
          .tip { margin-top: 24px; font-size: 14px; color: #64748b; background: #fffbeb; border-radius: 8px; padding: 12px 16px; }
          .tip span { color: #d97706; font-weight: 600; }
          .footer { background: #f8fafc; padding: 20px 32px; text-align: center; }
          .footer p { color: #94a3b8; font-size: 13px; margin: 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦷 Dental Clinic</h1>
            <p>Appointment Reminder</p>
          </div>
          <div class="body">
            <p class="greeting">Dear ${patient_name},</p>
            <p class="message">
              We hope you're doing well! This is a friendly reminder about 
              your upcoming appointment with us.
            </p>
            <div class="details">
              <div class="details-row">
                <span class="details-label">📅 Date</span>
                <span class="details-value">${formattedDate}</span>
              </div>
              <div class="details-row">
                <span class="details-label">⏰ Time</span>
                <span class="details-value">${formattedTime}</span>
              </div>
              <div class="details-row">
                <span class="details-label">👤 Patient</span>
                <span class="details-value">${patient_name}</span>
              </div>
            </div>
            <div class="tip">
              <span>💡 Tip:</span> Please arrive <strong>10 minutes early</strong> and bring any previous dental records if available.
            </div>
          </div>
          <div class="footer">
            <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
            <p style="margin-top:8px;">Thank you for choosing our clinic! 😊</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`[Email] ✅ Reminder sent to ${patient_email} for ${patient_name}`);
  return { sent: true };
};
