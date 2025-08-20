import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dustbin: { type: mongoose.Schema.Types.ObjectId, ref: "Dustbin", required: true },
  message: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
