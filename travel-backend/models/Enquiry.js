import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    source: { type: String, enum: ["web", "instagram", "whatsapp", "other"], default: "web" },
    handled: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);