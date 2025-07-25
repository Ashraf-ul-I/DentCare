import dotenv from "dotenv"
dotenv.config();

import { connectDB } from "./db/index.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Server connection failed: `, error);
        process.exit(1);
    })