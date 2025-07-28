// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hashedPassword = await bcrypt.hash("admin123", 10);

const adminUser = new User({
  email: "ashrafulai10159@gmail.com", // ✅ change to your email
  password: hashedPassword,
});

await adminUser.save();
console.log("✅ Admin user created successfully");

await mongoose.disconnect();
