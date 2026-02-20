import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js";
import connectDB from "./config/mongodb.js";
import bcrypt from "bcryptjs";
import dns from "dns";

// Force DNS to 8.8.8.8 to fix SRV lookup issues
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log("DNS set to Google Public DNS");
} catch (e) {
    console.warn("Could not set custom DNS:", e.message);
}

dotenv.config();

const doctors = [
    {
        name: 'Dr. Richard James',
        email: 'richard@gmail.com',
        password: 'password123',
        image: 'https://res.cloudinary.com/db66hdzvj/image/upload/v1727785461/doc1.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Emily Larson',
        email: 'emily@gmail.com',
        password: 'password123',
        image: 'https://res.cloudinary.com/db66hdzvj/image/upload/v1727785461/doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'sarah@gmail.com',
        password: 'password123',
        image: 'https://res.cloudinary.com/db66hdzvj/image/upload/v1727785461/doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Christopher Lee',
        email: 'chris@gmail.com',
        password: 'password123',
        image: 'https://res.cloudinary.com/db66hdzvj/image/upload/v1727785461/doc4.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        name: 'Dr. Jennifer Garcia',
        email: 'jennifer@gmail.com',
        password: 'password123',
        image: 'https://res.cloudinary.com/db66hdzvj/image/upload/v1727785461/doc5.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    }
    // Add more if needed
];

const seedDB = async () => {
    try {
        await connectDB();
        console.log("Connected to DB for seeding...");

        // Clear existing doctors
        await doctorModel.deleteMany({});
        console.log("Cleared existing doctors.");

        const salt = await bcrypt.genSalt(10);

        for (const doc of doctors) {
            doc.password = await bcrypt.hash(doc.password, salt);
            doc.date = Date.now();
            const newDoctor = new doctorModel(doc);
            await newDoctor.save();
        }

        console.log("Database seeded with doctors!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
