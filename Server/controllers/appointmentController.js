import DoctorModel from "../models/index.js";

export const getAllAppointments = async (req, res) => {
  try {
    const { filterdate } = req.query; // ← req.query not req.body
    const appointments = await DoctorModel.getAllAppointments(filterdate);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointment = await DoctorModel.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteAppointment = async (req, res) => {
  await DoctorModel.deleteAppointment(req.params.id);
  res.json({ message: "Deleted" });
};

export const appointmentStatsData = async (req, res) => {
  try {
    const stats = await DoctorModel.appointmentStatsData();
    return res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
export const todayAppointments = async (req, res) => {
  try {
    const result = await DoctorModel.todayAppointments();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
export const monthlyAppointmentData = async (req, res) => {
  try {
    const data = await DoctorModel.monthlyAppointmentData();

    // Format into { labels: [...], values: [...] } shape
    const labels = data.map(row => row.label);
    const values = data.map(row => row.value);

    return res.status(200).json({ labels, values });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
export const calendarData = async (req, res) => {
  try {
    const data = await DoctorModel.calendarData();

    const now = new Date();

    return res.status(200).json({
      currentMonth: now.getMonth(),        // 0-indexed (Feb = 1)
      currentYear: now.getFullYear(),      // 2026
      currentDate: now.getDate(),          // 27
      appointmentDates: data.appointmentDates.map(row => row.day),  // [27, ...]
      completedDates: data.completedDates.map(row => row.day),      // [25, 26, 27, ...]
    });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
export const getAvailableDates = async (req, res) => {
  try {
    const { doctor_id } = req.query;

    if (!doctor_id) {
      return res.status(400).json({
        success: false,
        message: "Please Select Doctor to Book",
      });
    }

    const result = await DoctorModel.getAvailableDates(doctor_id);

    const grouped = {};

    result.forEach(({ doctor_id, doctor_name, available_date }) => {
      if (!grouped[doctor_id]) {
        grouped[doctor_id] = {
          id: doctor_id,
          doctorName: doctor_name,
          availableDates: [],
        };
      }

      // ✅ Safe date formatting — no UTC timezone shift
      const d = new Date(available_date);
      const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

      grouped[doctor_id].availableDates.push(formattedDate);
    });

    const response = Object.values(grouped);

    return res.status(200).json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error("Error fetching available dates:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch available dates",
    });
  }
};
export const getAvailableSlots = async (req, res) => {
  try {
    const { doctor_id, available_date } = req.query;

    // ── Validate incoming params ─────────────────────────────────
    if (!doctor_id || !available_date) {
      return res.status(400).json({
        success: false,
        message: "Please Selected Available Date for Appointment Booking",
      });
    }
    // ─────────────────────────────────────────────────────────────

    const result = await DoctorModel.getAvailableSlots(doctor_id, available_date);

    // Extract just the time strings from result rows
    const availableSlots = result.map(({ available_time }) => available_time);

    return res.status(200).json({
      success: true,
      data: {
        doctor_id: Number(doctor_id),
        date: available_date,
        availableSlots,  // ["09:00:00", "10:00:00", "14:00:00"]
      },
    });

  } catch (error) {
    console.error("Error fetching available slots:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch available slots",
    });
  }
};