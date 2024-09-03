import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
    try {
        const token  = req.cookies.admin;

        if (!token) {
            return res.status(400).json({ success: false, message: "user not authenticated" });
        }

        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!tokenVerified) {
            return res.status(400).json({ success: false, message: "user not authenticated" });
        }

        if (tokenVerified.role !== "admin" ) {
            return res.status(400).json({ message: "user not authenticated admin only" });
        }

        req.user = tokenVerified;
        next();
    } catch (error) {
        console.log(error);
    } 
};