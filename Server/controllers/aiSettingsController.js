import DoctorModel from "../models/index.js";

export const getAISettings = async (req, res) => {
  const settings = await DoctorModel.getAISettings();
  res.json(settings);
};

export const updateAISettings = async (req, res) => {
  await DoctorModel.updateAISettings(req.body.prompt);
  res.json({ message: "AI Settings updated" });
};