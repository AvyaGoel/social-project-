import mongoose from "mongoose";

const dustbinSchema = new mongoose.Schema({
  location: { type: String, required: true },
  status: { type: String, enum: ["empty", "half", "full"], default: "empty" },
}, { timestamps: true });

export default mongoose.model("Dustbin", dustbinSchema);
