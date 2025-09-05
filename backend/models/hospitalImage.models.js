import mongoose from "mongoose";

const hospitalImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

const HospitalImage = mongoose.model("HospitalImage", hospitalImageSchema);
export default HospitalImage;
