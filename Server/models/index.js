import db from "../config/db.js";
import bcrypt from "bcryptjs";

const DoctorModel = {
    register: async ({ username, password, role, name, specialization, phone, image, available_date, available_slots }) => {
        // 1. Insert into admins
        const hashed = await bcrypt.hash(password, 10);
        const [adminResult] = await db.query(
            "INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)",
            [username, hashed, role || "doctor"]
        );

        const adminId = adminResult.insertId;

        // 2. Parse or default to empty arrays
        const dates = Array.isArray(available_date) ? available_date : [];
        const slots = Array.isArray(available_slots) ? available_slots : [];

        // 3. Insert into doctors
        const [doctorResult] = await db.query(
            `INSERT INTO doctors 
      (access_id, name, specialization, phone, image, available_date, available_slots) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                String(adminId),
                name,
                specialization || null,
                phone || null,
                image || null,
                JSON.stringify(dates), // ✅ [] if not sent
                JSON.stringify(slots), // ✅ [] if not sent
            ]
        );

        return {
            admin_id: adminId,
            doctor_id: doctorResult.insertId,
            username,
            role: role || "doctor",
            name,
            available_date: dates,
            available_slots: slots,
        };
    },
    findByUsername: async (username) => {
        const [rows] = await db.query("SELECT * FROM admins WHERE username = ?", [username]);
        return rows[0] || null;
    },
    ChangePassword: async (id) => {
        try {
            const [rows] = await db.query("SELECT * FROM admins WHERE id = ?", [id]);
            return rows[0] || null; // ✅ Return single user object, not array
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    updatePassword: async (id, newPassword) => {
        const hashed = await bcrypt.hash(newPassword, 10);
        const result = await db.query("UPDATE admins SET password_hash = ? WHERE id = ?", [hashed, id]);
        return result;
    },
    getDoctor: async (id) => {
        const [rows] = await db.query(`SELECT * FROM doctors WHERE access_id = ? LIMIT 1`, [id]);
        const doctor = rows[0] || null;
        return doctor;
    },
    getDoctorAll: async () => {
        const [rows] = await db.query(`SELECT id, access_id, name, specialization, phone, location, image FROM doctors`);
        return rows;
    },

    updateDoctor: async (data, id) => {
        const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
        const values = Object.values(data).map(v =>
            typeof v === "object" ? JSON.stringify(v) : v
        );
        await db.query(`UPDATE doctors SET ${fields} WHERE access_id = ?`, [...values, id]);
    },
    // updateDoctor: async (data,id) => {
    //     const fields = Object.keys(data).map(k => `${k} = ?`).join(", ");
    //     const values = Object.values(data).map(v =>
    //         typeof v === "object" ? JSON.stringify(v) : v
    //     );

    //     await db.query(
    //         `UPDATE doctors SET ${fields} WHERE access_id = ?`,
    //         [...values, id]
    //     );
    // },

    saveDoctorImage: async (filename) => {
        try {
            const result = await db.query("UPDATE doctors SET image = ? WHERE id = 1", [`/uploads/${filename}`]);
            return result;
        } catch (error) {
            console.error("Error saving doctor image:", error);
            throw error;
        }
    },
    getAllAppointments: async (filterdate) => {
        try {
            const [rows] = await db.query(`
            SELECT 
                id,
                patient_name,
                patient_phone,
                patient_email,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                time,
                status,
                source,
                created_at
            FROM appointments
            WHERE date = ?
            ORDER BY time ASC
        `, [filterdate]);
            return rows;
        } catch (err) {
            console.error("Database query error:", err);
            throw err;
        }
    },
    deleteAppointment: async (id) => {
        await db.query("DELETE FROM appointments WHERE id = ?", [id]);
    },
    getAISettings: async () => {
        const [rows] = await db.query("SELECT prompt FROM ai_settings ORDER BY id DESC LIMIT 1");
        return rows[0] || { prompt: "You are a helpful assistant." };
    },
    updateAISettings: async (prompt) => {
        await db.query("INSERT INTO ai_settings (prompt) VALUES (?) ON DUPLICATE KEY UPDATE prompt = ?", [prompt, prompt]);
    },
    // === LEAD MANAGEMENT ===
    getAllLeads: async () => {
        const [rows] = await db.query("SELECT * FROM leads ORDER BY created_at ASC");
        return rows;
    },

    createLead: async (data) => {
        const { name, email, phone, message, source = "website" } = data;
        const [result] = await db.query(
            "INSERT INTO leads (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, message, source]
        );
        return { id: result.insertId, ...data };
    },

    deleteLead: async (id) => {
        await db.query("DELETE FROM leads WHERE id = ?", [id]);
    },
    appointmentStatsData: async () => {
        const [rows] = await db.query(`
            SELECT 
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled,
            COUNT(*) - SUM(CASE WHEN status IN ('completed', 'cancelled') THEN 1 ELSE 0 END) AS balance,
            ROUND(IF(COUNT(*) = 0, 0, 
            (SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) / COUNT(*)) * 100
            ), 2) AS completionPercentage
        FROM appointments
        WHERE date = CURDATE()
    `);
        return rows[0]; // ✅ return object not array
    },
    todayAppointments: async () => {
        const [rows] = await db.query(`
             SELECT 
             id,
             TIME_FORMAT(time, '%h:%i %p') AS time,
             CONCAT(patient_name, ' - ', patient_phone) AS type,
            status
        FROM appointments
        WHERE date = CURDATE()
        ORDER BY 
        FIELD(status, 'confirmed', 'cancelled', 'completed') ASC,
            time ASC
        `);
        return rows;
    },
    monthlyAppointmentData: async () => {
        const [rows] = await db.query(`
        SELECT 
            DATE_FORMAT(date, '%a') AS label,
            COUNT(*) AS value
        FROM appointments
        WHERE date >= DATE(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY))
          AND date <= DATE(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) - 6 DAY))
        GROUP BY date
        ORDER BY date ASC
        `);
        return rows;
    },
    calendarData: async () => {
        const [appointmentDates] = await db.query(`
        SELECT DISTINCT DAY(date) AS day
        FROM appointments
        WHERE MONTH(date) = MONTH(CURDATE())
          AND YEAR(date) = YEAR(CURDATE())
        ORDER BY day ASC
    `);

        const [completedDates] = await db.query(`
        SELECT DISTINCT DAY(date) AS day
        FROM appointments
        WHERE MONTH(date) = MONTH(CURDATE())
          AND YEAR(date) = YEAR(CURDATE())
          AND date < CURDATE()  -- ✅ strictly before today
          ORDER BY day ASC
    `);

        return { appointmentDates, completedDates };
    },

    getAvailableDates: async (doctor_id) => {
        const [result] = await db.query(`
        SELECT DISTINCT
            d.id          AS doctor_id,
            d.name        AS doctor_name,
            ad.available_date
        FROM doctors d

        JOIN JSON_TABLE(
            d.available_date,
            '$[*]' COLUMNS (
                available_date DATE PATH '$'
            )
        ) ad

        JOIN JSON_TABLE(
            d.available_slots,
            '$[*]' COLUMNS (
                available_time TIME PATH '$'
            )
        ) ats

        LEFT JOIN appointments a
            ON  a.date   = ad.available_date
            AND a.time   = ats.available_time
            AND a.status NOT IN ('cancelled')

        WHERE
            d.id = ?
            AND ad.available_date >= CURRENT_DATE  -- ✅ AND was missing here
            AND a.id IS NULL

        ORDER BY ad.available_date;
    `, [doctor_id]);

        return result;
    },
    getAvailableSlots: async (doctor_id, available_date) => {
        const [result] = await db.query(`
            SELECT
            ats.available_time
        FROM doctors d
        
        -- explode available_slots JSON
        JOIN JSON_TABLE(
            d.available_slots,
            '$[*]' COLUMNS (
                available_time TIME PATH '$'
                )
        ) ats

        -- check if slot is already booked for that date
        LEFT JOIN appointments a
        ON  a.date   = ?
        AND a.time   = ats.available_time
            AND a.status NOT IN ('cancelled')

            WHERE
            d.id = ?
            AND a.id IS NULL   -- only free slots

            ORDER BY ats.available_time;
            `, [available_date, doctor_id]);

        return result;
    },
    createAppointment: async (data) => {
        const [result] = await db.query("INSERT INTO appointments SET ?, status = 'confirmed'", data);
        return { id: result.insertId, ...data };
    },


    // ── REMINDER SYSTEM ─────────────────────────────────────────────

    /**
     * Fetch today's appointments that still need a reminder.
     * Only picks status = 'pending' or 'confirmed'.
     * Skips: reminded, completed, cancelled.
     */
    getTodayAppointmentsForReminder: async () => {
        const [rows] = await db.query(`
            SELECT
                id,
                patient_name,
                patient_phone,
                patient_email,
                DATE_FORMAT(date, '%Y-%m-%d') AS date,
                time
            FROM appointments
            WHERE date = CURDATE()
              AND status IN ('pending', 'confirmed')
            ORDER BY time ASC
        `);
        return rows;
    },

    /**
     * Mark a single appointment as 'reminded' to prevent duplicate notifications.
     * @param {number} id - appointment ID
     */
    markAsReminded: async (id) => {
        await db.query(
            "UPDATE appointments SET status = 'reminded' WHERE id = ?",
            [id]
        );
    },
};

export default DoctorModel;