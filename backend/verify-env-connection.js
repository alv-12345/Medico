
import mongoose from 'mongoose';
import 'dotenv/config';

console.log("--- Testing MongoDB Connection using .env ---");
console.log("URI:", process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':****@') : "UNDEFINED");

const connect = async () => {
    try {
        console.log("Connecting...");
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("\n✅ SUCCESS: Connected to MongoDB successfully!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ FAILED: Connection failed.");
        console.error(error.message);
        process.exit(1);
    }
};

connect();
