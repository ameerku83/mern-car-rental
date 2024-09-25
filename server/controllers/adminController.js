

import { userValidate } from "../joiValidations/userValidation.js";
import { Admin } from "../models/adminModel.js";
import { Booking } from "../models/bookingModel.js";
import { Car } from "../models/carModel.js";
import { Contact } from "../models/contactModel.js";
import { Payment } from "../models/paymntModel.js";
import { Review } from "../models/review.js";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const adminCreate = async (req, res, next) => {
    
        const { name, email, password, } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const AdminExist = await Admin.findOne({ email });

        if (AdminExist) {
            return res.status(404).json({ success: false, message: "Admin already exist" });
        }

        //hashing
        const salt = 10;
        const hashedPassword = bcrypt.hashSync(password, salt);

        //create new user
        const newAdmin = new Admin({ name, email, password: hashedPassword, role: "admin" });
        await newAdmin.save();

        //create token
        const token = generateToken(email, "admin");

        res.cookie("admin", token,{ httpOnly:true,secure:true,sameSite:"None",} );
        res.json({ success: true, message: "Admin created successfully" });
   
};
export const adminLogin = async (req, res, next) => {
  
        const {email, password } = req.body;
        if ( !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const AdminExist = await Admin.findOne({ email });

        if (!AdminExist) {
            return res.status(404).json({ success: false, message: "Admin doesnot exist" });
        }
        const passwordMatch = bcrypt.compareSync(password, AdminExist.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Admin password not authenticated" });
        }
        const token = generateToken(email, "admin");

        res.cookie("admin", token, { httpOnly:true,secure:true,sameSite:"None"} );
        
        res.json({ success: true, message: "Admin login successfully" });
   
};

export const adminProfile = async (req, res, next) => {
    
        const  user  = req.user;

        const useData = await Admin.find({email:user.email}).select("-password");

        res.json({ success: true, message: "admin data fetched", data: useData });
   
};

export const checkAdmin = async (req, res, next) => {
    
        const user = req.user;

        if (!user) {
            return res.status(400).json({ success: true, message: "admin not authenticated" });
        }
        res.json({ success: true, message: "admin authenticated" });
   
};
export const adminLogout = async (req, res, next) => {
    
    res.clearCookie("admin",{ httpOnly:true,secure:true,sameSite:"None", });
   

    res.json({ success: true, message: "admin logout successfully" });

};



export const userCreatedByAdmin = async (req, res, next) => {
    
    const { name, email, password,mobile  } = req.body
    await userValidate.validateAsync( { name, email, password,mobile } );
    
    if (!name || !email || !password,!mobile ) {
        return res.status(400).json({ success: false, message: "all fields required" });
    }
   
    const userExist = await User.findOne({ email });

    if (userExist) {
        return res.status(404).json({ success: false, message: "user already exist" });
    }

    //hashing
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);

    //create new user
    const newUser = new User({ name, email, password: hashedPassword,mobile  });
    await newUser.save();

    //create token
    const token = generateToken(email);

    res.cookie("token", token);
    res.json({ success: true, message: "user created by admin", data:newUser});

};

//admin controll users 

export const userList =async(req,res,next)=>{

    const userList=await User.find().select("-password");
    res.json({success:true,message:'user list fetched',data:userList})


}

export const deleteUserById = async (req, res, next) => {
    
    const {id} = req.params;
     const user =await User.findByIdAndDelete(id)
    if (!user) {
        return res.status(400).json({ success: false, message: "user not found" });
    }
    res.json({ success: true, message: " user account deleted by admin" });

};

export const admingetCarById =async(req,res)=>{
    const {id} =req.params

   const carDetail=await Car.findById(id)
   
   if (!carDetail) {
       return res.status(400).json({ message: "car details not found" });
   }
   res.json({success:true,message:'car details fetched',data:carDetail})


}


export const admingetAllBookings = async (req, res, next) => {
    const { userName } = req.query;

    let matchStage = {};
    if (userName) {
        matchStage = { 'user.name': { $regex: userName, $options: 'i' } }; // Case-insensitive search
    }

    
        const bookings = await Booking.aggregate([
            {
                $lookup: {
                    from: 'users',  
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'  
            },
            {
                $lookup: {
                    from: 'cars',  
                    localField: 'car',
                    foreignField: '_id',
                    as: 'car'
                }
            },
            {
                $unwind: '$car'  
            },
            {
                $match: matchStage  
            }
        ]);

        if (!bookings.length) {
            return res.status(400).json({ success: false, message: "No bookings found" });
        }

        res.json({ success: true, message: 'Bookings list fetched successfully', data: bookings });
    
};





//admin controll booking
export const admingetUserBookings = async (req, res, next) => {
   
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const bookings = await Booking.find({ user: userId }).populate('car');

        // if (bookings.length === 0) {
        //     return res.status(404).json({ success: false, message: "User bookings not found" });
        // }

        res.json({ success: true, message: 'Bookings list fetched successfully', data: bookings });
    
};


export const admingetBookingById = async (req, res) => {
    
    const { id } = req.params;
    const booking = await Booking.findById(id)
    
    if (!booking) {
        return res.status(404).json({ success: false, message: 'Car not found' });
    }
    
    res.json({ success: true, message: 'got booking by id ', data: booking });
  } 
  
   
  export const adminDeleteBooking = async (req, res, next) => {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({ success: true, message: 'Booking deleted successfully!', data: booking });
    }
  

         // Cancel a paymen
         export const adminDeletePayment = async (req, res, next) => {
            const { id } = req.params;
            const payment = await Payment.findByIdAndDelete(id);
            
            if (!payment) {
                return res.status(404).json({ success: false, message: 'payment not found' });
            }
            
            res.json({ success: true, message: 'payment deleted successfully!', data: payment });
            }
    
         // Cancel a paymen
         export const adminGetPayments = async (req, res, next) => {
            const { userName } = req.query;
        
            let matchStage = {};
            if (userName) {
                matchStage = { 'user.name': { $regex: userName, $options: 'i' } }; 
            }
        
            try {
                const payments = await Payment.aggregate([
                    {
                        $lookup: {
                            from: 'users',  // Join with users collection
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: '$user'  // Unwind to handle the array result from lookup
                    },
                    {
                        $lookup: {
                            from: 'cars',  // Join with cars collection
                            localField: 'car',
                            foreignField: '_id',
                            as: 'car'
                        }
                    },
                    {
                        $unwind: '$car'  
                    },
                    {
                        $lookup: {
                            from: 'bookings',  
                            localField: 'booking',
                            foreignField: '_id',
                            as: 'booking'
                        }
                    },
                    {
                        $unwind: '$booking'  
                    },
                    {
                        $match: matchStage  
                    }
                ]);
        
                if (!payments.length) {
                    return res.status(404).json({ success: false, message: 'No payments found' });
                }
        
                res.json({ success: true, message: 'Payments fetched successfully!', data: payments });
            } catch (error) {
                res.status(500).json({ success: false, message: "Server error" });
            }
        };
        
             
     export const admingetUserPayments = async (req, res, next) => {
        const {userId}= req.params
        const payments = await Payment.find({user:userId});
        
        if (!payments) {
            return res.status(404).json({ success: false, message: 'payment not found' });
        }
        
        res.json({ success: true, message: 'payment gets successfully!', data: payments });
        }
   export const AdminGetPayment = async (req, res, next) => {
                const { id } = req.params;
                const payment = await Payment.findById(id);
                
                if (!payment) {
                    return res.status(404).json({ success: false, message: 'payment not found' });
                }
                
                res.json({ success: true, message: 'payment deleted successfully!', data: payment });  }


 // Get all reviews



 

 export const adminGetReviews = async (req, res, next) => {
     const { userName } = req.query;
 
     let matchStage = {};
 
     if (userName) {
         matchStage['user.name'] = { $regex: userName, $options: 'i' }; // Case-insensitive search
     }
 
    
 
     try {
         const reviews = await Review.aggregate([
             {
                 $lookup: {
                     from: 'users',
                     localField: 'user',
                     foreignField: '_id',
                     as: 'user'
                 }
             },
             {
                 $unwind: {
                     path: '$user',
                     preserveNullAndEmptyArrays: true  // Keep reviews even if user is null
                 }
             },
             {
                 $lookup: {
                     from: 'cars',
                     localField: 'car',
                     foreignField: '_id',
                     as: 'car'
                 }
             },
             {
                 $unwind: {
                     path: '$car',
                     preserveNullAndEmptyArrays: true // Keep reviews even if car is null
                 }
             },
             {
                 $match: matchStage
             }
         ]);
 
         // Adjust the condition here
         if ( reviews.length === 0) {
             return res.status(200).json({ success: false, message: "No reviews found" });
         }
 
         res.json({ success: true, message: 'Reviews fetched successfully', data: reviews });
     } catch (error) {
         return res.status(500).json({ success: false, message: "Error fetching reviews", error: error.message });
     }
 };
 export const  admingetReviewCarid= async (req, res) => {
    const {id}= req.params
    const reviewList = await Review.find({car:id}).populate('user').populate('car');
    if (!reviewList) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review list fetched', data: reviewList });
  }


  export const admingetUserReviews = async (req, res, next) => {
    const {userId}= req.params
    const reviewList = await Review.find({user:userId});
    if (!reviewList) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, message: 'Review list fetched', data: reviewList });
  }

// Get revie by ID
export const adminGetReviewById = async (req, res, next) => {
  
    const { id } = req.params;
    const reviewById = await Review.findById(id);

    if (!reviewById) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review fetched successfully', data: reviewById });
  } 

// Delete review
export const adminDeleteReview = async (req, res, next) => {
  
    const { id } = req.params;
    const deleteReview = await Review.findByIdAndDelete(id);

    if (!deleteReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted successfully!', data: deleteReview });
  } 

  export const getContacts = async (req,res)=>{
     const contacts= await Contact.find().populate("user")
   
    res.json({ success: true, message: "contact fetched",data:contacts });
}

export const adminDeleteMessage = async (req, res, next) => {
  
    const { id } = req.params;
    const deleteMessage = await Contact.findByIdAndDelete(id);

    if (!deleteMessage) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message deleted successfully!', data: deleteMessage });
  } 