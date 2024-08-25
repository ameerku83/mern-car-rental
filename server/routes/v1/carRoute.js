
import e from "express"
import { createCars, deleteCar, getCarById, getCarList, getCarsByBrand, updateCar } from "../../controllers/carController.js";
import upload from "../../middlewares/uploadMiddleWare.js";
import { errorHandler } from "../../utils/errorHandler.js";
import { authAdmin } from "../../middlewares/authAdmin.js";


const carRoute = e.Router();


carRoute.post("/create", upload.single("image"), authAdmin,errorHandler(createCars));
carRoute.get("/car-list",  errorHandler(getCarList));
carRoute.get("/cars/:brand",  errorHandler(getCarsByBrand));
carRoute.get("/single-car/:id",  errorHandler(getCarById));
carRoute.put("/update/:id", upload.single("image"), authAdmin,errorHandler(updateCar));
carRoute.delete("/delete/:id",  authAdmin,errorHandler(deleteCar));
export default carRoute;