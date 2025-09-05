// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema({
//   doctorName: String,
//   specialization: String,
//   description: String,
//   age: Number,
//   email: String,
//   phoneNumber: String,
//   imageUrl: String, // Cloudinary image URL
//   imagePublicId: String, // To delete image from Cloudinary
// });

// export default mongoose.model("Doctor", doctorSchema);

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    degrees: { type: String },
    specialization: { type: String },
    designation: { type: String },
    description: { type: String },
    workingHospital: { type: String },
    doctorPhoneNumbers: { type: String },
    serialNumbers: { type: String },
    visitingHours: { type: String },
    imageUrl: { type: String },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
