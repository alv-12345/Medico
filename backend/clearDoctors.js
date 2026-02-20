import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const clearDB = async () => {
    try {
        await connectDB();
        console.log("Connected to DB for clearing...");

        // Clear existing doctors
        await doctorModel.deleteMany({});
        console.log("Cleared all doctors from the database.");

        process.exit();
    } catch (error) {
        console.error("Error clearing database:", error);
        process.exit(1);
    }
};

clearDB();
