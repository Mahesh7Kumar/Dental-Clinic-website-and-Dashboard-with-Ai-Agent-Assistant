import DoctorModel from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password, role, name, specialization, phone } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: "username, password and name are required" });
  }

  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ Frontend can send JSON string or real array (FormData sends strings)
    const parseField = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch { return []; }
    };

    const user = await DoctorModel.register({
      username,
      password,
      role,
      name,
      specialization,
      phone,
      image,
      available_date: parseField(req.body.available_date),   // ✅ array or []
      available_slots: parseField(req.body.available_slots), // ✅ array or []
    });

    res.status(201).json({ message: "Registered successfully", user });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await DoctorModel.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, username: user.username } });
};


export const ChangePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  console.log("Received data:", { id, currentPassword, newPassword });

  try {
    if (!id || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Fetch user
    const user = await DoctorModel.ChangePassword(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // ✅ Separate check
    }

    // 2. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" }); // ✅ Separate check
    }

    // 3. Update password
    await DoctorModel.updatePassword(id, newPassword);
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("ChangePassword Error:", error); // ✅ Always log the real error
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
  res.json({ message: "Logged out" });
};