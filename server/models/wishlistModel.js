
import mongoose from  'mongoose'

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Wishlist = mongoose.model('Wishlist', WishlistSchema);
