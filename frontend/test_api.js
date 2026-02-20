import axios from 'axios';

const testBackend = async () => {
    try {
        const res = await axios.get('http://localhost:4000/api/doctor/list');
        console.log("Doctors:", JSON.stringify(res.data.doctors, null, 2));
    } catch (error) {
        console.error("Error connecting to backend:", error.message);
    }
};

testBackend();
