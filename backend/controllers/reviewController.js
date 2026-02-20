import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";

// API to add a review
const addReview = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;

        if (!userId || !rating || !comment) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const userData = await userModel.findById(userId);

        const reviewData = {
            userId,
            userName: userData.name,
            userImage: userData.image,
            rating: Number(rating),
            comment,
            date: Date.now()
        }

        const newReview = new reviewModel(reviewData);
        await newReview.save();

        res.json({ success: true, message: "Review Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({}).sort({ date: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addReview, getAllReviews };
