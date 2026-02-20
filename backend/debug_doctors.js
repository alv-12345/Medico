import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";

dotenv.config();

const checkDoctors = async () => {
    try {
        await connectDB();
        const count = await doctorModel.countDocuments();
        console.log(`Total doctors in database: ${count}`);
        const doctors = await doctorModel.find({}).limit(5);
        console.log("Doctors found:", JSON.stringify(doctors, null, 2));
        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkDoctors();
