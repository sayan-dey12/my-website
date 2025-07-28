// models/Email.ts
import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Email || mongoose.model("Email", EmailSchema);
