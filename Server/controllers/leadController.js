// controllers/leadController.js
import DoctorModel from "../models/index.js";

export const getAllLeads = async (req, res) => {
  try {
    const leads = await DoctorModel.getAllLeads();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

export const createLead = async (req, res) => {
  try {
    const lead = await DoctorModel.createLead(req.body);
    res.status(201).json({ message: "Thank you! We will contact you soon.", lead });
  } catch (err) {
    res.status(500).json({ error: "Failed to save lead" });
  }
};

export const deleteLead = async (req, res) => {
  try {
    await DoctorModel.deleteLead(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};