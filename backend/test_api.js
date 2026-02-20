import axios from 'axios';

const testAdminAPI = async () => {
    try {
        // 1. Login
        console.log("Logging in as Admin...");
        const loginRes = await axios.post('http://localhost:4000/api/admin/login', {
            email: 'admin@medico.com',
            password: 'admin123'
        });

        if (!loginRes.data.success) {
            console.error("Login Failed:", loginRes.data.message);
            return;
        }

        const token = loginRes.data.token;
        console.log("Login Success. Token:", token);

        // 2. Fetch Doctors
        console.log("Fetching Doctors...");
        const doctorsRes = await axios.get('http://localhost:4000/api/admin/all-doctors', {
            headers: {
                atoken: token
            }
        });

        if (doctorsRes.data.success) {
            console.log("Doctors Fetched Successfully:");
            console.log("Count:", doctorsRes.data.doctors.length);
            console.log("Data:", doctorsRes.data.doctors);
        } else {
            console.error("Fetch Failed:", doctorsRes.data.message);
        }

    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) console.error("Response:", error.response.data);
    }
};

testAdminAPI();
