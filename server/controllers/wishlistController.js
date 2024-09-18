import { Wishlist } from "../models/wishlistModel.js";



export const addToWishlist = async (req, res) => {
  const { userId, carId } = req.body;

  
    const existingWishlistItem = await Wishlist.findOne({ userId, carId });
    if (existingWishlistItem) {
      return res.status(404).json({  success: false,  message: 'Car already in wishlist' });
    }

    const newWishlistItem = new Wishlist({
      userId,
      carId,
    });

    await newWishlistItem.save();
    res.json({  success: true ,message: 'Car added to wishlist', wishlistItem: newWishlistItem });
};

export const getUserWishlist = async (req, res) => {
  
    const wishlist = await Wishlist.find({ userId: req.params.userId }).populate('carId');
    res.json({ success: true, message:"whish list fetched", data:wishlist});
 
};

export const isCarInWishlist = async (req, res) => {
  const { userId, carId } = req.params;
  
  
    const wishlistItem = await Wishlist.findOne({ userId, carId });
    res.json({ success: true, isInWishlist: !!wishlistItem });
 
};

export const removecarFormWishlist = async (req, res, next) => {
    const { id } = req.params;
    const wishlist = await Wishlist.findByIdAndDelete(id);
    
    if (!wishlist) {
        return res.status(404).json({ success: false, message: 'wishlist not found' });
    }
    
    res.json({ success: true, message: 'car removed from wish list successfully!', data: wishlist });
    }
