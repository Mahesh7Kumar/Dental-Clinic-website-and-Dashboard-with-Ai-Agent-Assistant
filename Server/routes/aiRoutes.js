import express from "express";
import { getAISettings, updateAISettings } from "../controllers/aiSettingsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/settings", protect, getAISettings);
router.put("/settings", protect, adminOnly, updateAISettings);

export default router;