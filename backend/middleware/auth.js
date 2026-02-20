import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'

const auth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized, Login Again' });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const id = token_decode.id;

        // Check if user exists
        const user = await userModel.findById(id);
        if (user) {
            req.user = { userId: id, role: 'patient' };
            next();
            return;
        }

        // Check if doctor exists
        const doctor = await doctorModel.findById(id);
        if (doctor) {
            req.user = { userId: id, role: 'doctor' };
            next();
            return;
        }

        return res.json({ success: false, message: 'User not found' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default auth;
