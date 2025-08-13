import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createBooking,
  myBookings,
  allBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";

const router = Router();

/** @route POST /api/bookings @desc Create booking + pending payment */
router.post("/", protect, createBooking);

/** @route GET /api/bookings/me @desc My bookings */
router.get("/me", protect, myBookings);

/** @route GET /api/bookings @desc Admin: all bookings */
router.get("/", protect, adminOnly, allBookings);

/** @route PATCH /api/bookings/:id/status @desc Admin: update status */
router.patch("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
