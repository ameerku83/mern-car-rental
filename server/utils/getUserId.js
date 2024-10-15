import { User } from "../models/userModel.js";


export const getUserIdByEmail = async (email) => {
  try {
    const userData = await User.findOne({ email }).select("-password ");
    if (!userData) {
      throw new Error('User not found');
    }
    return userData._id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
