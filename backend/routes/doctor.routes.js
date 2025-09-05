import express from "express";
import {
  addDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers/doctorsPanel.controller.js";
import { adminOnly } from "../middlewares/adminOnly.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

// Admin protected routes
router.post("/add", authenticate, adminOnly, upload.single("image"), addDoctor);
router.put(
  "/:id",
  authenticate,
  adminOnly,
  upload.single("image"),
  updateDoctor
);
router.delete("/:id", authenticate, adminOnly, deleteDoctor);

// Public route
router.get("/", getDoctors);

export default router;
