import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Relative_DB_URL = process.env.REAL_DB_URL

const ConntectToMongoDB = async()=>{
    try {
        await mongoose.connect(Relative_DB_URL);
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

export default ConntectToMongoDB