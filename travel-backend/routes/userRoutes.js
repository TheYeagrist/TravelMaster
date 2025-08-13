import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getMe, updateMe, listUsers } from "../controllers/userController.js";
const router = Router();

/** @route GET /api/users/me @desc Current user profile */
router.get("/me", protect, getMe);

/** @route PUT /api/users/me @desc Update profile (name/phone) */
router.put("/me", protect, updateMe);

/** @route GET /api/users @desc Admin: list all users */
router.get("/", protect, adminOnly, listUsers);

export default router;