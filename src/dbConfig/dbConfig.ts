import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not set");

    const db = await mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.setMaxListeners(20); // ✅ Increase listener limit
    isConnected = true;

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}
