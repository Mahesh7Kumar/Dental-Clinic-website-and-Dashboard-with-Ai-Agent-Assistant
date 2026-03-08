// routes/leadRoutes.js
import express from "express";
import { getAllLeads, createLead, deleteLead } from "../controllers/leadController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: From website/chatbot
router.post("/", createLead);

// Protected: Admin only
router.get("/", protect, adminOnly, getAllLeads);
router.delete("/:id", protect, adminOnly, deleteLead);

export default router;