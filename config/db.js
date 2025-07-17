import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_API);
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
  }
};
