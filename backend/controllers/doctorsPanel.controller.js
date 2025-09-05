import Doctor from "../models/doctorsProfile.model.js";
import { cloudinary } from "../utils/cloudinary.js";

export const addDoctor = async (req, res) => {
  try {
    const {
      doctorName,
      degrees,
      specialization,
      designation,
      description,
      workingHospital,
      doctorPhoneNumbers,
      serialNumbers,
      visitingHours,
    } = req.body;

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = upload.secure_url;
      imagePublicId = upload.public_id;
    }

    const doctor = new Doctor({
      doctorName,
      degrees,
      specialization,
      designation,
      description,
      workingHospital,
      doctorPhoneNumbers,
      serialNumbers,
      visitingHours,
      imageUrl,
      imagePublicId,
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Update fields
    doctor.doctorName = req.body.doctorName || doctor.doctorName;
    doctor.degrees = req.body.degrees || doctor.degrees;
    doctor.specialization = req.body.specialization || doctor.specialization;
    doctor.designation = req.body.designation || doctor.designation;
    doctor.description = req.body.description || doctor.description;
    doctor.workingHospital = req.body.workingHospital || doctor.workingHospital;
    doctor.doctorPhoneNumbers =
      req.body.doctorPhoneNumbers || doctor.doctorPhoneNumbers;
    doctor.serialNumbers = req.body.serialNumbers || doctor.serialNumbers;
    doctor.visitingHours = req.body.visitingHours || doctor.visitingHours;

    // Handle image update
    if (req.file) {
      if (doctor.imagePublicId) {
        await cloudinary.uploader.destroy(doctor.imagePublicId);
      }
      const upload = await cloudinary.uploader.upload(req.file.path);
      doctor.imageUrl = upload.secure_url;
      doctor.imagePublicId = upload.public_id;
    }

    await doctor.save();
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    await cloudinary.uploader.destroy(doctor.imagePublicId);
    await doctor.deleteOne();

    res.json({ success: true, message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
