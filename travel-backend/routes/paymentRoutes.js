import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  initPayment,
  markFailed,
  verifyPayment,
  resumePayment,
  listPayments
} from "../controllers/paymentController.js";

const router = Router();

/** @route POST /api/payments/init @desc Create/reuse payment session */
router.post("/init", protect, initPayment);

/** @route POST /api/payments/failed @desc Mark attempt failed */
router.post("/failed", protect, markFailed);

/** @route POST /api/payments/verify @desc Verify & confirm booking */
router.post("/verify", protect, verifyPayment);

/** @route GET /api/payments/resume?bookingId=... @desc Find unpaid/failed session */
router.get("/resume", protect, resumePayment);

/** @route GET /api/payments @desc Admin: list payments */
router.get("/", protect, adminOnly, listPayments);

export default router;