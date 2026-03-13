import express from "express";
import {
    getAllAppointments,
    deleteAppointment,
    appointmentStatsData,
    todayAppointments,
    monthlyAppointmentData,
    calendarData,
    getAvailableDates,
    getAvailableSlots,
    createAppointment,
} from "../controllers/appointmentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllAppointments);
router.get("/stats", protect, appointmentStatsData);
router.get("/today", protect, todayAppointments);
router.get("/weekly", protect, monthlyAppointmentData);
router.get("/calendar", protect, calendarData);
router.delete("/:id", protect, adminOnly, deleteAppointment);
router.get('/available-dates', getAvailableDates);
router.get("/available-slots", getAvailableSlots);
router.post("/create", createAppointment);           // Public (AI or form)

export default router;