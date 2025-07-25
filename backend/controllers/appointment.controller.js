import { Appointment } from "../models/appointment.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"

const bookAppointment = asyncHandler(async (req, res) => {
    const {fullname, email, phone, appointmentDate, timeSlot} = req.body;

    if(!fullname || !phone || !appointmentDate || !timeSlot ){
        throw new ApiError(400, "Please fill up all the information");
    }

    //checking if slot is already booked 
    const existAppointment = await Appointment.findOne({
        appointmentDate: new Date(appointmentDate),
        timeSlot: timeSlot
    });

    if(existAppointment){
        throw new ApiError(400, "This time slot is already booked. Please select another time slot");
    }

    const newAppointment = await Appointment.create({
        fullname,
        email,
        phone,
        appointmentDate,
        timeSlot,
    });

    return res.status(201).json(
        new ApiResponse(201, newAppointment, "Appointment created successfully")
    )
})

export{
    bookAppointment,
}