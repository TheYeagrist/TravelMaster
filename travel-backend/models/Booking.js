import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
  travelDate: Date,
  peopleCount: Number,
  specialRequests: String,
  status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);