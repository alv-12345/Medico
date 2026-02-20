import mongoose from 'mongoose';
import 'dotenv/config';

console.log("Starting DB test...");
console.log("URI:", process.env.MONGODB_URI);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });
        console.log("SUCCESS: Database Connected");
    } catch (err) {
        console.error("FAILURE: Connection Error:");
        console.error(err.message);
        if (err.cause) console.error("Cause:", err.cause.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

connect();
