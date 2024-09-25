import e from "express"


import { errorHandler } from "../../utils/errorHandler.js";
import { adminCreate,
     adminDeleteBooking,
      adminDeleteMessage,
      adminDeletePayment,
       adminDeleteReview, 
       admingetAllBookings,
        admingetBookingById, 
        admingetCarById, 
        AdminGetPayment,
        adminGetPayments,
         
        admingetReviewCarid, 
        adminGetReviews,
        admingetUserBookings,
         admingetUserPayments,
         admingetUserReviews,
         adminLogin,
         adminLogout,
         adminProfile, 
         checkAdmin,
         deleteUserById,
        getContacts,
        userCreatedByAdmin,
         userList } from "../../controllers/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
import { cancelBooking } from "../../controllers/bookingController.js";


const adminRoute = e.Router()
adminRoute.post("/create", errorHandler(adminCreate));
adminRoute.post("/login", adminLogin);
adminRoute.get("/profile", authAdmin, errorHandler(adminProfile));
adminRoute.get("/check-admin", authAdmin, errorHandler(checkAdmin));
adminRoute.put("/adminlogout", authAdmin, errorHandler(adminLogout));
// admin user  controlling
adminRoute.get("/user-list", authAdmin, errorHandler(userList));
adminRoute.delete("/delete-user/:id", authAdmin, errorHandler(deleteUserById)); 
adminRoute.post("/create-user", authAdmin,errorHandler(userCreatedByAdmin));
//car
adminRoute.get("/car/:id", authAdmin, errorHandler(admingetCarById));

 //bookin 
 adminRoute.get("/bookings", authAdmin, errorHandler(admingetAllBookings));
 adminRoute.get("/bookings/:userId", authAdmin, errorHandler(admingetUserBookings));
 adminRoute.put("/cancel-booking/:id", authAdmin, errorHandler(cancelBooking));
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
//  adminRoute.get("/review/:id", authAdmin, errorHandler(adminGetReviewById));
 adminRoute.delete("/delete-review/:id", authAdmin, errorHandler(adminDeleteReview));
 adminRoute.get("/review/:id", authAdmin, errorHandler(admingetReviewCarid));
 
//contact usadminGer
adminRoute.get("/contact", authAdmin, errorHandler(getContacts))
adminRoute.delete("/delete-message/:id", authAdmin, errorHandler(adminDeleteMessage))

export default adminRoute   