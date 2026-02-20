import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);

export default authRouter;
