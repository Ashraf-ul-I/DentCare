import express from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  addHospitalImage,
  getHospitalImages,
  deleteHospitalImage,
} from "../controllers/hospitalImage.controller.js";

const router = express.Router();
// Admin upload
router.post("/", upload.single("image"), addHospitalImage);

// Homepage fetch
router.get("/", getHospitalImages);

// Admin delete
router.delete("/:id", deleteHospitalImage);

export default router;
