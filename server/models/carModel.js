import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // for multiple image URLs
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual'],
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  },
  mileage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
 
  availability: {
    type: Boolean,
    default: true,
  },
 
}, {
  timestamps: true,
});

export const Car = mongoose.model("Car", carSchema);