import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";

/**
 * INIT PAYMENT
 * - If an existing unpaid/failed payment exists for the booking, reuse it (resume)
 * - Otherwise, create a fresh pending payment record
 * - Simulates creating a gateway order (store gatewayOrderId)
 */
export const initPayment = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.userId.toString() !== req.user._id.toString())
      return res.status(404).json({ message: "Booking not found" });

    let payment = await Payment.findOne({
      bookingId,
      status: { $in: ["pending", "failed"] }
    }).sort({ createdAt: -1 });

    if (!payment) {
      // create a new one if none to resume
      payment = await Payment.create({
        bookingId,
        userId: req.user._id,
        amount: 0, // will be client-provided or computed server-side elsewhere
        currency: "INR",
        status: "pending",
        gateway: "mock"
      });
    }

    // Mock: create a "gateway order id" (in real life call Razorpay/Stripe)
    payment.gatewayOrderId = payment.gatewayOrderId || `order_${payment._id}`;
    await payment.save();

    res.json({
      message: "Payment session ready (resume-supported)",
      payment
    });
  } catch (e) { next(e); }
};

/**
 * MARK FAILURE (client/network fail)
 * - Allows front-end to mark an attempt as failed so we keep trail
 */
export const markFailed = async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    const payment = await Payment.findById(paymentId);
    if (!payment || payment.userId.toString() !== req.user._id.toString())
      return res.status(404).json({ message: "Payment not found" });

    payment.status = "failed";
    await payment.save();
    res.json({ message: "Payment marked as failed", payment });
  } catch (e) { next(e); }
};

/**
 * VERIFY PAYMENT (webhook or client-verify)
 * - In production: verify signature with gateway secret
 * - On success: mark payment paid & set booking confirmed
 */
export const verifyPayment = async (req, res, next) => {
  try {
    const { paymentId, gatewayPaymentId, gatewaySignature } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    if (payment.userId.toString() !== req.user._id.toString() && req.user.role !== "admin")
      return res.status(403).json({ message: "Not allowed" });

    // TODO: add real signature verification (Razorpay/Stripe)
    // For now, treat any provided gatewayPaymentId as success
    if (!gatewayPaymentId) return res.status(400).json({ message: "gatewayPaymentId required" });

    payment.gatewayPaymentId = gatewayPaymentId;
    payment.gatewaySignature = gatewaySignature || "mock_signature";
    payment.status = "paid";
    await payment.save();

    // Confirm associated booking
    await Booking.findByIdAndUpdate(payment.bookingId, { status: "confirmed" });

    res.json({ message: "Payment verified & booking confirmed", payment });
  } catch (e) { next(e); }
};

/**
 * RESUME CHECK
 * - Return the latest unpaid/failed payment for a booking (if any)
 * - Frontend can jump straight to payment page without refilling the booking form
 */
export const resumePayment = async (req, res, next) => {
  try {
    const { bookingId } = req.query;
    const payment = await Payment.findOne({
      bookingId,
      status: { $in: ["pending", "failed"] }
    }).sort({ createdAt: -1 });

    if (!payment) return res.status(404).json({ message: "No payment to resume" });
    res.json({ message: "Resume payment session", payment });
  } catch (e) { next(e); }
};

// Admin: list payments
export const listPayments = async (req, res, next) => {
  try {
    const list = await Payment.find().populate("bookingId").populate("userId", "name email");
    res.json(list);
  } catch (e) { next(e); }
};