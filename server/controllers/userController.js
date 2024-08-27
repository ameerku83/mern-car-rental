import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { userValidate } from "../joiValidations/userValidation.js";

export const userCreate = async (req, res, next) => {
    
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

        res.cookie("token", token,{ httpOnly:true,secure:true,sameSite:"None", } );
        res.json({ success: true, message: "user created successfully" });
   
};

export const userLogin = async (req, res, next) => {
   
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({ success: false, message: "user does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "user password not authenticated" });
        }

        const token = generateToken(email);

        res.cookie("token", token,{ httpOnly:true,secure:true,sameSite:"None",  } );

        res.json({ success: true, message: "user login successfully" });
    
};
export const userLogout = async (req, res, next) => {
    
        res.clearCookie("token",{ httpOnly:true,secure:true,sameSite:"None", });
       
    
        res.json({ success: true, message: "user logout successfully" });
   
};

export const userProfile = async (req, res, next) => {
    
        const user = req.user;
        const userData = await User.findOne({email:user.email}).select("-password");

        res.json({ success: true, message: "user data fetched", data: userData });
    
};

export const checkUser = async (req, res, next) => {
   
        const user = req.user;

        if (!user) {
            return res.status(400).json({ success: true, message: "user not authenticated" });
        }
        res.json({ success: true, message: "User authenticated" });
   
};

export const updateUser = async (req, res, next) => {
    const { email, password,name,mobile } = req.body;
    const { id } = req.params;
    const salt = 10;
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userData = await User.findByIdAndUpdate(id,{email, password:hashedPassword  ,mobile,name },{new:true})
    if (!userData) {
        return res.status(400).json({ success: true, message: "user not found" });
    }

    res.json({ success: true, message: "user data updated", data: userData });

};



