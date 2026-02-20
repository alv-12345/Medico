
const BASE_URL = 'http://localhost:4000/api/auth';

async function testAuth() {
    try {
        console.log("--- Testing Patient Auth ---");
        const patientEmail = `patient${Date.now()}@test.com`;
        const patientPassword = 'password123';

        // 1. Signup Patient
        console.log(`\n1. Signing up patient: ${patientEmail}`);
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test Patient",
                email: patientEmail,
                password: patientPassword,
                role: 'patient'
            })
        });
        const signupData = await signupRes.json();
        console.log("Signup Response:", signupData);

        if (!signupData.success) {
            console.error("Patient Signup Failed");
            return;
        }

        // 2. Login Patient
        console.log("\n2. Logging in patient...");
        const loginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: patientEmail,
                password: patientPassword
            })
        });
        const loginData = await loginRes.json();
        console.log("Login Response:", loginData);

        if (!loginData.success) {
            console.error("Patient Login Failed");
            return;
        }
        const patientToken = loginData.token;

        // 3. Get Patient Profile
        console.log("\n3. Getting patient profile...");
        const profileRes = await fetch(`${BASE_URL}/profile`, {
            headers: { 'token': patientToken }
        });
        const profileData = await profileRes.json();
        console.log("Profile Response:", profileData);


        console.log("\n--- Testing Doctor Auth ---");
        const doctorEmail = `doctor${Date.now()}@test.com`;

        // 4. Signup Doctor
        console.log(`\n4. Signing up doctor: ${doctorEmail}`);
        const docSignupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test Doctor",
                email: doctorEmail,
                password: patientPassword,
                role: 'doctor',
                speciality: "Dermatologist"
            })
        });
        const docSignupData = await docSignupRes.json();
        console.log("Doctor Signup Response:", docSignupData);

        if (!docSignupData.success) {
            console.error("Doctor Signup Failed");
            return;
        }

        // 5. Login Doctor
        console.log("\n5. Logging in doctor...");
        const docLoginRes = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: doctorEmail,
                password: patientPassword
            })
        });
        const docLoginData = await docLoginRes.json();
        console.log("Doctor Login Response:", docLoginData);

        if (!docLoginData.success) {
            console.error("Doctor Login Failed");
            return;
        }
        const docToken = docLoginData.token;

        // 6. Get Doctor Profile
        console.log("\n6. Getting doctor profile...");
        const docProfileRes = await fetch(`${BASE_URL}/profile`, {
            headers: { 'token': docToken }
        });
        const docProfileData = await docProfileRes.json();
        console.log("Doctor Profile Response:", docProfileData);

    } catch (error) {
        console.error("Test Error:", error);
    }
}

testAuth();
