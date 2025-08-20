import Dustbin from "../models/Dustbin.js";

export const getDustbins = async (req, res) => {
  const dustbins = await Dustbin.find();
  res.json(dustbins);
};

export const addDustbin = async (req, res) => {
  const dustbin = await Dustbin.create(req.body);
  res.status(201).json(dustbin);
};

export const updateDustbinStatus = async (req, res) => {
  const { id } = req.params;
  const updated = await Dustbin.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};
