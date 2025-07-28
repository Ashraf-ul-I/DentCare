import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB database is connected \nHost: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

export { connectDB };
