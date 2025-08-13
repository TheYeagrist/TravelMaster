import { Router } from "express";
import { register, login } from "../controllers/authController.js";
const router = Router();

/**
 * @route POST /api/auth/register
 * @desc  Create user account
 */
router.post("/register", register);

/**
 * @route POST /api/auth/login
 * @desc  Login & get JWT
 */
router.post("/login", login);

export default router;