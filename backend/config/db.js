import mongoose from "mongoose";

let dbReady = false;

export async function connectDB(uri) {
  if (!uri) {
    console.warn("MONGODB_URI not set, skipping DB connection");
    dbReady = false;
    return;
  }
  try {
    await mongoose.connect(uri, { dbName: "chadeinaag" });
    dbReady = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.warn("MongoDB connection failed:", err?.message || err);
    dbReady = false;
  }
}

export function isDBReady() {
  return dbReady;
}
