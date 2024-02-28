import mongoose from "mongoose";

let isCOnnected = false;

export const connectToDatabase = async () => {
  if (!isCOnnected) {
    mongoose.set("strictQuery", true);

    try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: "astro-commerce",
      });
      isCOnnected = true;
    } catch (error) {
      throw error;
    }
  }
};
