import axios from 'axios';

const testUserLogin = async () => {
    try {
        console.log("Testing Patient Login...");
        // Use a known user or create one if needed, but for now test login with likely non-existent to see 404 vs 400/200
        const loginRes = await axios.post('http://localhost:4000/api/user/login', {
            email: 'testuser@medico.com',
            password: 'password123'
        });

        console.log("Response:", loginRes.data);

    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
};

testUserLogin();
