import mongoose from "mongoose";
import env from "dotenv";

env.config();
export const dbconnection = async () => {
  mongoose
    .connect(process.env.MONGODB_URL!)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};
