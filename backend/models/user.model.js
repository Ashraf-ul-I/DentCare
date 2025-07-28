import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  resetOTP: String,
  resetExpires: Date,
});

export default mongoose.model("User", userSchema);
