import admin from "../utils/serviceAccountPath.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
// Correct absolute path
const serviceAccountPath = path.join(
  process.cwd(), // points to D:\dental-react\backend
  "config",
  "dentalcare-be7d2-firebase-adminsdk-fbsvc-f2a4de2240.json"
);

// Read JSON
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Initialize Firebase Admin

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const JWT_SECRET = process.env.JWT_SECRET; // for backend-issued tokens
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_GMAIL;

// Middleware to verify Firebase token
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Login endpoint: create backend access + refresh tokens
export const login = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Only admin can login" });
    }

    // Optional: save/update admin in MongoDB
    let user = await User.findOne({ email: decoded.email });
    if (!user) {
      user = new User({
        email: decoded.email,
        role: "admin",
      });
      await user.save();
    }

    // Create backend short-lived access token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Create refresh token
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(token, REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

// Logout (frontend handles Firebase signOut)
export const logout = async (req, res) => {
  res.clearCookie("refreshToken", { path: "/" });
  res.json({ message: "Logged out" });
};
