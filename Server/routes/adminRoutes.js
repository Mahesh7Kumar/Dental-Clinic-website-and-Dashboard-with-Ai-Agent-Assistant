import express from "express";
import { register, login, ChangePassword, logout } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", protect, upload.single('image'), register);
router.post("/login", login);
router.post("/change-password", protect, ChangePassword);
router.post("/logout", protect, logout);


export default router;