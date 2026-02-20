import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email send failure:", error);
        return { success: false, error: error.message };
    }
};

export default sendEmail;
