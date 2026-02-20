import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from './models/userModel.js';
import doctorModel from './models/doctorModel.js';
import adminModel from './models/adminModel.js';

dotenv.config();

const testReset = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const email = 'aishumaa07@gmail.com'; // Use a known email
        let user = await userModel.findOne({ email });
        let type = 'user';

        if (!user) {
            user = await doctorModel.findOne({ email });
            type = 'doctor';
        }

        if (!user) {
            console.log("User not found for test");
            process.exit(1);
        }

        console.log(`Found user: ${user.email}, Type: ${type}`);

        const token = jwt.sign(
            { id: user._id, email: user.email, type: type },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        console.log("Saved token to DB");

        // Now simulate resetPassword logic
        console.log("Simulating reset verify...");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        let userReloaded;
        if (decoded.type === 'user') userReloaded = await userModel.findById(decoded.id);
        else if (decoded.type === 'doctor') userReloaded = await doctorModel.findById(decoded.id);
        else if (decoded.type === 'admin') userReloaded = await adminModel.findById(decoded.id);

        if (!userReloaded) {
            console.log("FAIL: User not found in verify step");
        } else if (userReloaded.resetPasswordToken !== token) {
            console.log(`FAIL: Token mismatch. Expected ${token.substring(0, 20)}... but got ${userReloaded.resetPasswordToken?.substring(0, 20)}...`);
        } else if (userReloaded.resetPasswordExpires < Date.now()) {
            console.log("FAIL: Token expired");
        } else {
            console.log("SUCCESS: Token verified correctly in logic simulation");
        }

        process.exit(0);
    } catch (error) {
        console.error("Test Error:", error);
        process.exit(1);
    }
};

testReset();
