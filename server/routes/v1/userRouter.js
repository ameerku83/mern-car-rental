
import e from "express"
import { checkUser, createContact, updateUser, userCreate, userLogin, userLogout, userProfile } from "../../controllers/userController.js";
import { authUser } from "../../middlewares/userAuth.js";
import { errorHandler } from "../../utils/errorHandler.js";
import { cancelBooking, createBooking, deleteBooking, getAllBookings, getBookingById } from "../../controllers/bookingController.js";
import { cancelPayment, createPayment, getPayment, getPayments,  } from "../../controllers/paymentController.js";
import { createReview, deleteReview, getReviewById, updateReview } from "../../controllers/reviewController.js";
import { adminGetReviews } from "../../controllers/adminController.js";

const router = e.Router()
router.post("/create", errorHandler(userCreate));
router.post("/login", userLogin);
router.get("/profile", authUser, errorHandler(userProfile));
router.put("/update/:id", authUser, errorHandler(updateUser));
router.put("/logout", authUser, errorHandler(userLogout));
router.get("/check-user", authUser, errorHandler(checkUser));
//bookin
router.post("/booking", authUser, errorHandler(createBooking));
router.put("/cancel-booking/:id", authUser, errorHandler(cancelBooking));
router.get("/bookings/:userId", authUser, errorHandler(getAllBookings));
router.get("/single-booking/:id", authUser, errorHandler(getBookingById));
router.delete("/delete-booking/:id", authUser, errorHandler(deleteBooking));

//payment
 router.post("/payment", authUser, errorHandler(createPayment));
 router.delete("/cancel-payment/:id", authUser, errorHandler(cancelPayment));
 router.get("/payments/:userId", authUser, errorHandler(getPayments));
 router.get("/get-payment/:id", authUser, errorHandler(getPayment));

 //review
 router.get("/reviews", errorHandler(adminGetReviews));
 router.post("/review", authUser, errorHandler(createReview));
 router.get("/get-review/:id", authUser, errorHandler(getReviewById));
 router.put("/update-review/:id", authUser, errorHandler(updateReview));
 router.delete("/delete-review/:id", authUser, errorHandler(deleteReview));
 //contact us
 router.post("/contact", authUser, errorHandler(createContact))
export default router








