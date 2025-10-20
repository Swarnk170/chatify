import mongoose from "mongoose";

export const connectdb = async (req, res) => {
  try {
    const connInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected", connInstance.connection.host);
  } catch (error) {
    console.error("Error connecting mongodb", error);
    process.exit(1);
  }
};
