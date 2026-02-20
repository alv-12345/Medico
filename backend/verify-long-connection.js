
import mongoose from 'mongoose';

// Long form URI from test-connection.js but with corrected password
const MONGODB_URI = "mongodb://aishumaa18_db_user:Aishwarya2026@ac-szjxtm8-shard-00-00.xzltp5w.mongodb.net:27017,ac-szjxtm8-shard-00-01.xzltp5w.mongodb.net:27017,ac-szjxtm8-shard-00-02.xzltp5w.mongodb.net:27017/medico?ssl=true&replicaSet=atlas-szjxtm8-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log("--- Testing MongoDB Connection (Long Form) ---");
console.log("URI:", MONGODB_URI.replace(/:([^:@]+)@/, ':****@'));

const connect = async () => {
    try {
        console.log("Connecting...");
        await mongoose.connect(MONGODB_URI, {
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
