import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createEnquiry,
  listEnquiries,
  markHandled
} from "../controllers/enquiryController.js";

const router = Router();

/** @route POST /api/enquiries @desc Public enquiry submit */
router.post("/", createEnquiry);

/** @route GET /api/enquiries @desc Admin list */
router.get("/", protect, adminOnly, listEnquiries);

/** @route PATCH /api/enquiries/:id/handled @desc Admin: mark handled */
router.patch("/:id/handled", protect, adminOnly, markHandled);

export default router;