import e from "express"


import { errorHandler } from "../../utils/errorHandler.js";
import { adminCreate,
     adminDeleteBooking,
      adminDeletePayment,
       adminDeleteReview, 
       admingetAllBookings,
        admingetBookingById, 
        AdminGetPayment,
        adminGetPayments,
        adminGetReviewById, 
        adminGetReviews,
        admingetUserBookings,
         admingetUserPayments,
         admingetUserReviews,
         adminLogin,
         adminProfile, 
         checkAdmin,
         deleteUserById,
        userCreatedByAdmin,
         userList } from "../../controllers/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";


const adminRoute = e.Router()
adminRoute.post("/create", errorHandler(adminCreate));
adminRoute.post("/login", adminLogin);
adminRoute.get("/profile/", authAdmin, errorHandler(adminProfile));
adminRoute.get("/check-admin", authAdmin, errorHandler(checkAdmin));
// admin user  controlling
adminRoute.get("/user-list", authAdmin, errorHandler(userList));
adminRoute.delete("/delete-user/:id", authAdmin, errorHandler(deleteUserById)); 
adminRoute.post("/create-user", authAdmin,errorHandler(userCreatedByAdmin));
 //bookin 
 adminRoute.get("/bookings", authAdmin, errorHandler(admingetAllBookings));
 adminRoute.get("/bookings/:userId", authAdmin, errorHandler(admingetUserBookings));
 adminRoute.get("/booking/:id", authAdmin, errorHandler(admingetBookingById));
 adminRoute.delete("/delete-booking/:id", authAdmin, errorHandler(adminDeleteBooking));

 //payment
 adminRoute.get("/payments", authAdmin, errorHandler(adminGetPayments));
 adminRoute.get("/payments/:userId", authAdmin, errorHandler(admingetUserPayments));
 adminRoute.get("/payment", authAdmin, errorHandler(AdminGetPayment));
 adminRoute.delete("/delete-payment/:id", authAdmin, errorHandler(adminDeletePayment));

 //review
 adminRoute.get("/reviews", authAdmin, errorHandler(adminGetReviews));
 adminRoute.get("/reviews/:user", authAdmin, errorHandler(admingetUserReviews));
 adminRoute.get("/review/:id", authAdmin, errorHandler(adminGetReviewById));
 adminRoute.delete("/delete-review/:id", authAdmin, errorHandler(adminDeleteReview));

export default adminRoute   