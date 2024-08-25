
import { userValidate } from "../joiValidations/userValidation.js";
import { Admin } from "../models/adminModel.js";
import { Booking } from "../models/bookingModel.js";
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

        res.cookie("token", token);
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

        res.cookie("token", token);
        
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



export const userCreatedByAdmin = async (req, res, next) => {
    
    const { name, email, password,mobile  } = req.body
    
    if (!name || !email || !password,!mobile ) {
        return res.status(400).json({ success: false, message: "all fields required" });
    }
    await userValidate.validateAsync( { name, email, password,mobile } );

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
    res.json({ success: true, message: "user created by admin" });

};

//admin controll users 

export const userList =async(req,res,next)=>{

    const userList=await User.find();
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

//admin controll booking
export const admingetAllBookings = async (req, res, next) => {
  
    const bookings = await Booking.find().populate('user', 'name email ').populate('car', 'brand model');
    if (!bookings) {
        return res.status(400).json({ success: false, message: "users bookings  not found" });
    }

    res.json({ success: true, message: 'Bookings list fetched successfully', data: bookings });
}

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
            
            const payments = await Payment.find();
            
            if (!payments) {
                return res.status(404).json({ success: false, message: 'payment not found' });
            }
            
            res.json({ success: true, message: 'payment deleted successfully!', data: payments });
            }
             
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
  
    const reviewList = await Review.find();
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