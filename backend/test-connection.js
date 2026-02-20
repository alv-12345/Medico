
import mongoose from 'mongoose';

// Hardcoded Standard Connection String (Bypasses .env issues)
// This uses the explicit node addresses to avoid DNS SRV lookup issues
const MONGODB_URI = "mongodb://aishumaa18_db_user:onetwothree@ac-szjxtm8-shard-00-00.xzltp5w.mongodb.net:27017,ac-szjxtm8-shard-00-01.xzltp5w.mongodb.net:27017,ac-szjxtm8-shard-00-02.xzltp5w.mongodb.net:27017/medico?ssl=true&replicaSet=atlas-szjxtm8-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("--- Testing MongoDB Connection (Hardcoded URI) ---");
console.log("URI:", MONGODB_URI.replace(/:([^:@]+)@/, ':****@')); // Mask password

const connect = async () => {
    try {
        console.log("Connecting...");
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log("\n✅ SUCCESS: Connected to MongoDB successfully!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ FAILED: Connection failed.");
        console.error(error.message);

        if (error.message.includes("buffering timed out") || error.message.includes("SelectionError")) {
            console.log("\n👇 DIAGNOSIS:");
            console.log("The connection timed out. This means your password/URI is correct, but the FIREWALL is blocking you.");
            console.log("YOU MUST WHITELIST YOUR IP IN MONGODB ATLAS.");
        }
        process.exit(1);
    }
};

connect();
