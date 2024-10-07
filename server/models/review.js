import mongoose from 'mongoose';

// Review Schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        enum: {
            values: [1, 2, 3, 4, 5],
            message: 'Rating must be between 1 and 5',
        },
    },
    comment: {
        type: String,
        required: [true, 'Review  is required'],
        minlength: [10, 'Review must be at least 10 characters long'],
        
    },
    date: {
        type: Date,
        default: Date.now,
    }
    
}, {
    timestamps: true,
});

export const Review = mongoose.model("Review", reviewSchema);