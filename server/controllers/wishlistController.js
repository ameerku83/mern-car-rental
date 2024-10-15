import { Wishlist } from "../models/wishlistModel.js";
import { getUserIdByEmail } from "../utils/getUserId.js";



export const addToWishlist = async (req, res) => {
  const userId = await getUserIdByEmail(req.user.email);
  const { carId } = req.body;

  
    const existingWishlistItem = await Wishlist.findOne({ carId,userId:userId });
    if (existingWishlistItem) {
      return res.status(404).json({  success: false,  message: 'Car already added  wishlist' });
    }

    const newWishlistItem = new Wishlist({
      userId:userId,
      carId,
    });

    await newWishlistItem.save();
    res.json({  success: true ,message: 'Car added to wishlist', wishlistItem: newWishlistItem });
};

export const getUserWishlist = async (req, res) => {
  const userId = await getUserIdByEmail(req.user.email);
    const wishlist = await Wishlist.find({ userId:userId  }).populate('carId');
    res.json({ success: true, message:"whish list fetched", data:wishlist});
 
};

export const isCarInWishlist = async (req, res) => {
  const userId = await getUserIdByEmail(req.user.email);
  const { carId } = req.params;

  try {
    // Check if the specific user has added this car to their wishlist
    const wishlistItem = await Wishlist.findOne({ userId:userId, carId });
    res.json({ success: true, isInWishlist: !!wishlistItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error checking wishlist status' });
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
