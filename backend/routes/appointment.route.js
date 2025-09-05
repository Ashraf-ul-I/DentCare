import { Router } from "express";
import {
  bookAppointment,
  deleteAppointment,
  getAllAppointments,
  getBookedAppointments,
  statusChecked,
  updateAppointment,
} from "../controllers/appointment.controller.js";

const appointmentRouter = Router();

appointmentRouter.route("/appointment").post(bookAppointment);
appointmentRouter.get("/appointment/booked", getBookedAppointments);
appointmentRouter.get("/appointment/all", getAllAppointments);
appointmentRouter.patch("/appointment/:id/status", statusChecked);
appointmentRouter.delete("/appointment/delete/:id", deleteAppointment);
appointmentRouter.patch("/appointment/edit/:id", updateAppointment);
export { appointmentRouter };
