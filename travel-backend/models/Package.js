import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dates: [Date],
  images: [String],
  itinerary: String,
  inclusions: [String],
  exclusions: [String]
}, { timestamps: true });

export default mongoose.model("Package", packageSchema);