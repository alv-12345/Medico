
import mongoose from 'mongoose';
import dns from 'dns';
import 'dotenv/config';

console.log("--- Testing MongoDB Connection with Custom DNS ---");

// Try to set Google DNS
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log("✅ DNS Servers set to Google DNS (8.8.8.8)");
} catch (e) {
    console.error("❌ Failed to set DNS servers:", e.message);
}

// Use standard connection string from .env
const MONGODB_URI = process.env.MONGODB_URI;
console.log("URI:", MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));

const connect = async () => {
    try {
        console.log("Connecting...");
        // Mongoose might use the underlying OS DNS, but let's try.
        // We can also try to resolve the SRV manually if this fails.

        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("\n✅ SUCCESS: Connected to MongoDB successfully with Custom DNS!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ FAILED: Connection failed.");
        console.error(error.message);
        process.exit(1);
    }
};

connect();
