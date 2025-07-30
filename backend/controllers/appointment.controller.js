import { Appointment } from "../models/appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import moment from "moment-timezone";
const bookAppointment = asyncHandler(async (req, res) => {
  const { fullname, email, phone, appointmentDate, timeSlot } = req.body;
  console.log(req.body);

  if (!fullname || !phone || !appointmentDate || !timeSlot) {
    throw new ApiError(400, "Please fill up all the information");
  }

  //checking if slot is already booked
  const existAppointment = await Appointment.findOne({
    appointmentDate: new Date(appointmentDate),
    timeSlot: timeSlot,
  });

  if (existAppointment) {
    throw new ApiError(
      400,
      "This time slot is already booked. Please select another time slot"
    );
  }

  const newAppointment = await Appointment.create({
    fullname,
    email,
    phone,
    appointmentDate,
    timeSlot,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, newAppointment, "Appointment created successfully")
    );
});

// Get booked appointments on a current date
const getBookedAppointments = asyncHandler(async (req, res) => {
  const { date } = req.query;

  if (!date) {
    throw new ApiError(400, "Date is required");
  }
  const selectedDate = new Date(date);
  const appoointments = await Appointment.find({
    appointmentDate: {
      $gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
      $lte: new Date(selectedDate.setHours(23, 59, 59, 999)),
    },
  });
  console.log(appoointments);
  const bookedSlots = appoointments.map((a) => a.timeSlot);
  console.log(bookedSlots);
  return res
    .status(200)
    .json(new ApiResponse(200, bookedSlots, "Booked Slots fetched"));
});
// Get all appointments

export const getAllAppointments = asyncHandler(async (req, res) => {
  const { date } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};

  if (date) {
    // Use moment-timezone to get start and end of the day in Asia/Dhaka timezone
    const start = moment.tz(date, "Asia/Dhaka").startOf("day").toDate();
    const end = moment.tz(date, "Asia/Dhaka").endOf("day").toDate();

    filter.appointmentDate = { $gte: start, $lte: end };
  }

  const appointments = await Appointment.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ appointmentDate: -1 });

  const total = await Appointment.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page,
        limit,
        appointments,
      },
      "Fetched appointments"
    )
  );
});

export const statusChecked = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status: "Checked" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated", data: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
});

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const updates = {};

  if (req.body.timeSlot !== undefined) updates.timeSlot = req.body.timeSlot;
  if (req.body.status !== undefined) updates.status = req.body.status;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );

    if (!updatedAppointment)
      return res.status(404).json({ message: "Appointment not found" });

    res
      .status(200)
      .json({ message: "Appointment updated", data: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment)
      return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { bookAppointment, getBookedAppointments };
