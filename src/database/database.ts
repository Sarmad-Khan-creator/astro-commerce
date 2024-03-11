import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (!isConnected) {
    mongoose.set("strictQuery", true);

    try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
        dbName: "astro-commerce",
      });
      isConnected = true;
    } catch (error) {
      throw error;
    }
  }
};
