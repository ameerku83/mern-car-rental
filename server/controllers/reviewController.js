import { Car } from "../models/carModel.js";
import { Review } from "../models/review.js";
import { User } from "../models/userModel.js";
import { getUserIdByEmail } from "../utils/getUserId.js";



export const createReview = async (req, res, next) => {
  
  const userId = await getUserIdByEmail(req.user.email);

    const {  carId, rating, comment } = req.body;

    // Check if user and car exist
    const userExists = await User.findOne(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Create the review
    const review =  Review({
      user:userId,
      car: carId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ success: true, message: 'Review created successfully', data: review });
  } 

  export const getReviewCarid= async (req, res) => {
    const {carId}= req.params
    const reviewList = await Review.find({car:carId}).populate('user').populate('car');
    if (!reviewList) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review list fetched', data: reviewList });
  }
