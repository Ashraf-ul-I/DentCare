import express from "express"
import cors from "cors"
import { appointmentRouter } from "./routes/appointment.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("api/v1/booking", appointmentRouter);

export{
    app,
}