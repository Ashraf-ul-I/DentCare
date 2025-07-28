import { Router } from "express";
import {
  bookAppointment,
  getBookedAppointments,
} from "../controllers/appointment.controller.js";

const appointmentRouter = Router();

appointmentRouter.route("/appointment").post(bookAppointment);
appointmentRouter.get("/appointment/booked", getBookedAppointments);

export { appointmentRouter };
