import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your full name"],
      minLength: [4, "Full name must be at least 4 characters long"],
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    appointmentDate: {
      type: Date,
      required: [true, "Please select an appointment date"],
      validate: {
        validator: function (v) {
          return v >= new Date().setHours(0, 0, 0, 0);
        },
        message: "Appointment date cannot be in the past, select future date",
      },
    },
    timeSlot: {
      type: String,
      required: [true, "Please select a time slot"],
      enum: {
        values: [
          "9:00 AM",
          "10:00 AM",
          "11:00 AM",
          "1::00 PM",
          "2:00 PM",
          "3:00 PM",
          "4:00 PM",
        ],
        message: "Please select a valid time slot",
      },
    },
  },
  { timestamps: true }
);

//avoid double booking
appointmentSchema.index(
  {
    appointmentDate: 1,
    timeSlot: 1,
  },
  { unique: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export { Appointment };
