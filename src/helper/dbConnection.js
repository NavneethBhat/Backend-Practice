import mongoose from "mongoose";

export const connectDB = () => {
  try {
    // console.log(process.env.DB_URL);

    //    mongoose.connect("mongodb://127.0.0.1/my_database");
    mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Unable to Connect");
  }
};
