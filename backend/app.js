import express from "express";
import cors from "cors";
import { appointmentRouter } from "./routes/appointment.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/authRoutes.route.js";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // allow your frontend origin
    credentials: true, // allow sending cookies
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/booking", appointmentRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

export { app };
