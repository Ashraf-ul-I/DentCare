import { Router } from "express";

const appointmentRouter = Router();


appointmentRouter.route("/appointment").post(bookAppointment);


export{
    appointmentRouter,
}


