import express from "express";
import { getDoctor, updateDoctor, getDoctorAll } from "../controllers/doctorController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", getDoctor);
router.get("/all", getDoctorAll)
router.put("/", protect, adminOnly, upload.single("image"), updateDoctor);

export default router;