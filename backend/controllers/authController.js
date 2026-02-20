import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';
import adminModel from '../models/adminModel.js';
import sendEmail from '../utils/email.js';

// API to request password reset
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Check if user exists in any model
        let user = await userModel.findOne({ email });
        let userType = 'user';

        if (!user) {
            user = await doctorModel.findOne({ email });
            userType = 'doctor';
        }

        if (!user) {
            user = await adminModel.findOne({ email });
            userType = 'admin';
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "We couldn't find an account with that email" });
        }

        // Generate JWT reset token
        const expiryMs = parseInt(process.env.RESET_PASSWORD_EXPIRES_MS) || 3600000;
        const token = jwt.sign(
            { id: user._id, email: user.email, type: userType },
            process.env.JWT_SECRET,
            { expiresIn: `${expiryMs / 60000}m` }
        );

        // Store token in DB for extra security/single-use
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + expiryMs;

        try {
            await user.save();
            console.log(`Success: Reset token saved for ${userType} ${user.email}`);
        } catch (saveError) {
            console.error(`Database Error: Failed to save reset token for ${user.email}`, saveError.message);
            return res.status(500).json({ success: false, message: "Database error - please try again later" });
        }

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        const subject = 'Password Reset Request - Medico';
        const text = `You requested a password reset. Please use the following link to reset your password: ${resetLink}`;
        const html = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 12px; border-top: 5px solid #5f6FFF;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2D3748; margin: 0; font-size: 24px;">Medico</h1>
                </div>
                
                <h2 style="color: #2D3748; font-size: 20px; text-align: center; margin-bottom: 20px;">Password Reset Request</h2>
                
                <p style="color: #4A5568; line-height: 1.6; text-align: center;">You requested to reset your password for your Medico account.</p>
                
                <div style="text-align: center; margin: 35px 0;">
                    <a href="${resetLink}" 
                       style="display: inline-block; padding: 14px 28px; background-color: #5f6FFF; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(95, 111, 255, 0.2);">
                       Reset Your Password
                    </a>
                </div>
                
                <div style="padding: 15px; background-color: #f7fafc; border-radius: 8px; margin-bottom: 25px;">
                    <p style="color: #718096; font-size: 13px; margin: 0; text-align: center; word-break: break-all;">
                        <strong>Link expires in ${expiryMs / 60000} minutes.</strong><br>
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${resetLink}" style="color: #5f6FFF; text-decoration: underline;">${resetLink}</a>
                    </p>
                </div>
                
                <p style="text-align: center; font-size: 13px; color: #a0aec0; margin-top: 30px; border-top: 1px solid #edf2f7; pt: 20px;">
                    If you did not request this, please ignore this email.
                </p>
            </div>
        `;

        const emailResult = await sendEmail(user.email, subject, text, html);

        if (emailResult.success) {
            res.json({ success: true, message: "Password reset link sent to your email" });
        } else {
            res.status(500).json({ success: false, message: "Failed to send email", error: emailResult.error });
        }

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// API to reset password
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // 1. Verify JWT
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("JWT Verify Error:", err.message);
            return res.status(401).json({ success: false, message: "This reset link is invalid or has expired" });
        }

        // 2. Find user
        let user;
        if (decoded.type === 'user') user = await userModel.findById(decoded.id);
        else if (decoded.type === 'doctor') user = await doctorModel.findById(decoded.id);
        else if (decoded.type === 'admin') user = await adminModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Account not found" });
        }

        // 3. Verify Token and Expiry in DB
        if (!user.resetPasswordToken || user.resetPasswordToken !== token) {
            return res.status(401).json({ success: false, message: "This link has already been used or replaced" });
        }

        if (user.resetPasswordExpires && new Date(user.resetPasswordExpires) < new Date()) {
            return res.status(401).json({ success: false, message: "This reset link has expired" });
        }

        // 4. Update Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ success: true, message: "Your password has been updated successfully" });

    } catch (error) {
        console.error("Reset Error:", error);
        res.status(500).json({ success: false, message: "An unexpected error occurred" });
    }
};

export { forgotPassword, resetPassword };
