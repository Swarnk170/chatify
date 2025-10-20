import mongoose from "mongoose";

export const connectdb = async (req, res) => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    const connInstance = await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected", connInstance.connection.host);
  } catch (error) {
    console.error("Error connecting mongodb", error);
    process.exit(1);
  }
};
