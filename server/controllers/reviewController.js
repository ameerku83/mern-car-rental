import { Car } from "../models/carModel.js";
import { Review } from "../models/review.js";
import { User } from "../models/userModel.js";



export const createReview = async (req, res, next) => {
  
    // Validate request body using Joi
    

    const { userId, carId, rating, comment } = req.body;

    // Check if user and car exist
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const carExists = await Car.findById(carId);
    if (!carExists) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }

    // Create the review
    const review = new Review({
      user: userId,
      car: carId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ success: true, message: 'Review created successfully', data: review });
  } 



// Update review
export const updateReview = async (req, res, next) => {
  
    
    const { userId, carId, rating, comment } = req.body;
    const { id } = req.params;

    const updatedCarReview = await Review.findByIdAndUpdate(
      id,
      { user: userId, car: carId, rating, comment },
      { new: true }
    );

    if (!updatedCarReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review updated successfully!', data: updatedCarReview });
  } 


  // Get all reviews
export const getReviews= async (req, res, next) => {
    const {userId}= req.params
    const reviewList = await Review.find({user:userId});
    if (!reviewList) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review list fetched', data: reviewList });
  }

// Get review by ID
export const getReviewById = async (req, res, next) => {
  
    const { id } = req.params;
    const reviewById = await Review.findById(id);

    if (!reviewById) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review fetched successfully', data: reviewById });
  } 

// Delete review
export const deleteReview = async (req, res, next) => {
  
    const { id } = req.params;
    const deleteReview = await Review.findByIdAndDelete(id);

    if (!deleteReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted successfully!', data: deleteReview });
  } 