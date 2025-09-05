import HospitalImage from "../models/hospitalImage.models.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addHospitalImage = async (req, res) => {
  try {
    const image = req.file;
    if (!image) return res.status(400).json({ error: "Image is required" });

    // Upload to Cloudinary using buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "hospital_images" },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result);
        }
      );
      stream.end(image.buffer);
    });

    const hospitalImage = new HospitalImage({
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    await hospitalImage.save();
    res.json({ success: true, hospitalImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all hospital images
export const getHospitalImages = async (req, res) => {
  try {
    const images = await HospitalImage.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete hospital image
export const deleteHospitalImage = async (req, res) => {
  try {
    const hospitalImage = await HospitalImage.findById(req.params.id);
    if (!hospitalImage)
      return res.status(404).json({ error: "Hospital image not found" });

    await cloudinary.uploader.destroy(hospitalImage.imagePublicId);
    await hospitalImage.deleteOne();

    res.json({ success: true, message: "Hospital image deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
