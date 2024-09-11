import { Wishlist } from "../models/WishlistModel.js";


export const addToWishlist = async (req, res) => {
  const { userId, carId } = req.body;

  try {
    const existingWishlistItem = await Wishlist.findOne({ userId, carId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: 'Car already in wishlist' });
    }

    const newWishlistItem = new Wishlist({
      userId,
      carId,
    });

    await newWishlistItem.save();
    res.status(200).json({ message: 'Car added to wishlist', wishlistItem: newWishlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate('carId');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const isCarInWishlist = async (req, res) => {
  const { userId, carId } = req.params;
  
  try {
    const wishlistItem = await Wishlist.findOne({ userId, carId });
    res.status(200).json({ isInWishlist: !!wishlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removecarFormWishlist = async (req, res, next) => {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    
    if (!wishlist) {
        return res.status(404).json({ success: false, message: 'wishlist not found' });
    }
    
    res.json({ success: true, message: 'car removed from wish list successfully!', data: wishlist });
    }
