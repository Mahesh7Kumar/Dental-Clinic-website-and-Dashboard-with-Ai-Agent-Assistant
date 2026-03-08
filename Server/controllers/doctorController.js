import DoctorModel from "../models/index.js";

export const getDoctor = async (req, res) => {
  try {
    const { id } = req.query; // ✅ Log the incoming id
    if (!id) {
      return res.status(400).json({ message: "Access id need" });
    }
    const doctor = await DoctorModel.getDoctor(id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    if (doctor.image) {
      doctor.image = `${req.protocol}://${req.get("host")}${doctor.image}`;
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
  }
};
export const getDoctorAll = async (req, res) => {
  try {
    const doctors = await DoctorModel.getDoctorAll();

    // ✅ Prepend host to each doctor's image
    const doctorsWithImages = doctors.map((doc) => ({
      ...doc,
      image: doc.image
        ? `${req.protocol}://${req.get("host")}${doc.image}`
        : null,
    }));

    res.json(doctorsWithImages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
};

   

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.query;
    const data = { ...req.body };
    console.log("id of hte user is ", id);
    // ✅ Parse available_date
    if (data.available_date) {
      try { data.available_date = JSON.parse(data.available_date); }
      catch { return res.status(400).json({ message: "available_date must be valid JSON" }); }
    }

    // ✅ Parse available_slots
    if (data.available_slots) {
      try { data.available_slots = JSON.parse(data.available_slots); }
      catch { return res.status(400).json({ message: "available_slots must be valid JSON" }); }
    }

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    await DoctorModel.updateDoctor(data, id);
    res.json({ message: "Doctor profile updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor profile", error: error.message });
  }
};
