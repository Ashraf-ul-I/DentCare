import express from "express";
import {
  login,
  logout,
  verifyFirebaseToken,
} from "../controllers/firebaseAuth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);

// Example: protected admin route
router.get("/admin-only", verifyFirebaseToken, (req, res) => {
  res.json({ message: "Welcome, Admin!", user: req.user });
});

export default router;
