import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error!", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Something went wrong in connecting to DB.");
    console.error(error);
    throw error;
  }
}
