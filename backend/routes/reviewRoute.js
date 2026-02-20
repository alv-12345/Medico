import express from 'express';
import { addReview, getAllReviews } from '../controllers/reviewController.js';
import authUser from '../middleware/authUser.js';

const reviewRouter = express.Router();

reviewRouter.post('/add', authUser, addReview);
reviewRouter.get('/all', getAllReviews);

export default reviewRouter;
