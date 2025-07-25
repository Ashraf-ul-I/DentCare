import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
        minLength: [4, "Full name must be at least 4 characters long"],
    },
    email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
    },
    phone: {
        type: Number,
        required: [true, "Phone number is required"],
    },

})

const Appointment = mongoose.model("Appointment", appointmentSchema);

export{
    Appointment,
}