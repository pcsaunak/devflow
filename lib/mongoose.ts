import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabse = async () => {
  // PRevent unknown field query
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("No MongoDB URL");

  if (isConnected) {
    return console.log("MongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.error(error);
  }
};
