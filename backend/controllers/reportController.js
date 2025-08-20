import Report from "../models/Report.js";

export const getReports = async (req, res) => {
  const reports = await Report.find().populate("user", "name email").populate("dustbin", "location");
  res.json(reports);
};

export const addReport = async (req, res) => {
  const report = await Report.create(req.body);
  res.status(201).json(report);
};
