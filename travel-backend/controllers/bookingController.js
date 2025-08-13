import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Package from "../models/Package.js";

// Create booking -> create pending payment (resume-able)
export const createBooking = async (req, res, next) => {
  try {
    const { packageId, travelDate, peopleCount, specialRequests } = req.body;
    const pkg = await Package.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    // 1) Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      packageId,
      travelDate,
      peopleCount,
      specialRequests
    });

    // 2) Create initial payment record (pending)
    const amount = Math.round((pkg.price || 0) * (peopleCount || 1));
    const payment = await Payment.create({
      bookingId: booking._id,
      userId: req.user._id,
      amount,
      currency: "INR",
      status: "pending",
      gateway: "mock"
    });

    res.status(201).json({ booking, payment });
  } catch (e) { next(e); }
};

// Get my bookings
export const myBookings = async (req, res, next) => {
  try {
    const list = await Booking.find({ userId: req.user._id })
      .populate("packageId", "title price slug")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
};

// Admin: all bookings
export const allBookings = async (req, res, next) => {
  try {
    const list = await Booking.find()
      .populate("userId", "name email")
      .populate("packageId", "title price")
      .sort({ createdAt: -1 });
    res.json(list);
  } catch (e) { next(e); }
};

// Admin: update booking status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (e) { next(e); }
};