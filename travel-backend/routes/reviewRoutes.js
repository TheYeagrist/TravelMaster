import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createOrUpdateReview,
  getPackageReviews,
  deleteReview
} from "../controllers/reviewController.js";

const router = Router();

/** @route POST /api/reviews @desc Create/Update review for a package */
router.post("/", protect, createOrUpdateReview);

/** @route GET /api/reviews/package/:packageId @desc List reviews of a package */
router.get("/package/:packageId", getPackageReviews);

/** @route DELETE /api/reviews/:id @desc Delete (owner or admin) */
router.delete("/:id", protect, deleteReview);

export default router;