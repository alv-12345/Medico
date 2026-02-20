
const BASE_URL = 'http://localhost:4000/api/user';

async function testForgotPassword() {
    try {
        const testEmail = 'aishunagar100@gmail.com'; // Use a real email for testing or a test account
        const newPassword = 'newPassword123';

        console.log("--- Testing Forgot Password ---");

        // 1. Request password reset
        console.log(`\n1. Requesting password reset for: ${testEmail}`);
        const forgotRes = await fetch(`${BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail })
        });
        const forgotData = await forgotRes.json();
        console.log("Forgot Password Response:", forgotData);

        if (!forgotData.success) {
            console.error("Forgot Password Request Failed");
            return;
        }

        console.log("\n--- IMPORTANT: Capture the token from the console or database ---");
        console.log("Since I cannot access your email, please provide the token sent to your email or capture it from the database.");

    } catch (error) {
        console.error("Test Error:", error);
    }
}

testForgotPassword();
