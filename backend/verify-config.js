
import connectDB from './config/mongodb.js';
import 'dotenv/config';

console.log("--- Testing MongoDB Connection via Config Module ---");

const test = async () => {
    try {
        await connectDB();
        console.log("\n✅ SUCCESS: Connected to MongoDB successfully via config module!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ FAILED: Connection failed.");
        console.error(error);
        process.exit(1);
    }
};

test();
