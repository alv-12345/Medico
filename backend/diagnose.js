
import mongoose from 'mongoose';
import 'dotenv/config';
import http from 'http';

// Function to get public IP
const getPublicIP = () => {
    return new Promise((resolve, reject) => {
        http.get('http://api.ipify.org', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', (err) => reject(err));
    });
};

const diagnose = async () => {
    console.log("--- MongoDB Connection Diagnostic ---");

    // 1. Check IP
    try {
        const ip = await getPublicIP();
        console.log(`\nYour Public IP Address is: ${ip}`);
        console.log("Ensure this IP is added to your MongoDB Atlas Network Access whitelist.");
    } catch (e) {
        console.log("\nCould not fetch public IP (network issue?)");
    }

    // 2. Check Connection
    console.log(`\nAttempting to connect to MongoDB...`);
    // Mask password in logs
    const uri = process.env.MONGODB_URI || "";
    console.log(`URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`);

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000 // 5s timeout
        });
        console.log("\nSUCCESS: Database Connected!");
        process.exit(0);
    } catch (error) {
        console.error("\nFAILURE: Could not connect to MongoDB.");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);

        if (error.name === 'MongooseServerSelectionError') {
            console.log("\nDiagnosis: To fix this, you MUST whitelist your IP address in MongoDB Atlas.");
        }
        process.exit(1);
    }
};

diagnose();
