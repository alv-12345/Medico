import mongoose from "mongoose";
import dns from "dns";

// Force DNS to 8.8.8.8 to fix SRV lookup issues in some environments
try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
    console.log("DNS set to Google Public DNS");
} catch (e) {
    console.warn("Could not set custom DNS:", e.message);
}

const connectDB = async () => {

    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error("Database connection failed:", error);
        // Do not exit process, let the server try again or handle it
    }

}

export default connectDB;

// Do not use '@' symbol in your databse user's password else it will show an error.