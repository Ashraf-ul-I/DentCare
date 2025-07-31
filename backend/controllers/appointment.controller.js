import { Appointment } from "../models/appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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

  // Limiting dayily booking per phone/email
  const maxAppointmentsPerDay = 2;
  const today = new Date();
  const dayStartTime = new Date(today.setHours(0, 0, 0, 0));
  const dayEndTime = new Date(today.setHours(23, 59, 59, 999));

  const todaysAppointmentCount = await Appointment.countDocuments({
    $or: [
      {email},
      {phone}
    ],
    // The day when the appointment was booked
    createdAt: {
      $gte: dayStartTime,
      $lte: dayEndTime
    }
  });

  if(todaysAppointmentCount >= maxAppointmentsPerDay){
    throw new ApiError(400, "You have reached your maximum appointment slot for today!")
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

export { bookAppointment, getBookedAppointments };
