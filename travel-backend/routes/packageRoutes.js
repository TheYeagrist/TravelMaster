import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createPackage,
  updatePackage,
  deletePackage,
  listPackages,
  getPackage
} from "../controllers/packageController.js";

const router = Router();

/** Public: list and get package */
router.get("/", listPackages);
router.get("/:id", getPackage);

/** Admin CRUD */
router.post("/", protect, adminOnly, createPackage);
router.put("/:id", protect, adminOnly, updatePackage);
router.delete("/:id", protect, adminOnly, deletePackage);

export default router;