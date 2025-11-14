import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const dbUrl = process.env.NODE_ENV == 'development'? process.env.DATABASE_LOCAL: process.env.DATABASE_URL?.replace('<db_password>', process.env.DATABASE_PASSWORD || '');
    await mongoose.connect(dbUrl as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};