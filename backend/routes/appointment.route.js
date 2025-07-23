import { Router } from "express";
import { bookAppointment } from "../controllers/appointment.controller.js";

const appointmentRouter = Router();


appointmentRouter.route("/appointment").post(bookAppointment);


export{
    appointmentRouter,
}


