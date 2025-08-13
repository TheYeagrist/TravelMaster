import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["pending", "failed", "paid"], default: "pending" },
  paymentGatewayId: String
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);