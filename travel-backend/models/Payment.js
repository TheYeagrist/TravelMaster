import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending", "failed", "paid"], default: "pending", index: true },
    // Store gateway identifiers to resume/verify
    gateway: { type: String, enum: ["razorpay", "stripe", "mock"], default: "mock" },
    gatewayOrderId: { type: String },     // e.g., Razorpay order_id
    gatewayPaymentId: { type: String },   // e.g., Razorpay payment_id
    gatewaySignature: { type: String }    // e.g., Razorpay signature
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);