import { cloudinaryInstance } from "../config/cloudinary.js";
import { carValidation } from "../joiValidations/carValidation.js";

import  {Car}  from "../models/carModel.js"



export const getCarList =async(req,res,)=>{

    const carList=await Car.find();
    res.json({success:true,message:'car list fetched',data:carList})

}
export const getCarsByBrand = async (req, res) => {
    
      const { brand } = req.params;
      const cars = await Car.find({ brand: new RegExp(brand, 'i') });
      res.status(200).json({ message:'car list fetched by brand',  data:cars});
    
  };

export const getCarById =async(req,res)=>{
     const {id} =req.params

    const carDetail=await Car.findById(id)
    
    if (!carDetail) {
        return res.status(400).json({ message: "car details not found" });
    }
    res.json({success:true,message:'car details fetched',data:carDetail})


}

export const createCars =async(req,res,next)=>{

   
     
          
    const {brand,model,year,pricePerDay,capacity,transmission, fuelType,mileage,availability}=req.body;

        await carValidation.validateAsync( {brand,model,year,pricePerDay,capacity,transmission, fuelType,mileage,availability} );
        
       
        if (!req.file) {
            return res.status(400).json({ message: "image not visible" });
        }
        // Upload an image
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path,{folder:"cars"})
        .catch((error) => {
            console.log(error);
        });

        //console.log(uploadResult);

        const newCar = new Car({brand,model,year,pricePerDay,capacity,transmission, fuelType,mileage,availability});
        if (uploadResult?.url) {
            newCar.image = uploadResult.url;
        }
       
        await newCar.save();
    
 res.json({success:true,message:' new car created scuessfully!',data:newCar})
}

export const updateCar = async (req, res) => {
    
    const { brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage, availability } = req.body;
    const { id } = req.params;
          let image
            if (req.file) {
            let uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, { folder: "cars" });
             image=  uploadResult.url;
        }

    const updatedCar = await Car.findByIdAndUpdate(id, {
        brand, model, year, pricePerDay, capacity, transmission, fuelType, mileage,image:image, availability
    }, { new: true });

    res.json({ success: true, message: 'Car updated successfully!', data: updatedCar });
} 

export const deleteCar =async(req,res,next)=>{
    const {id} =req.params

   const carDetail=await Car.findByIdAndDelete(id)
   
   if (!carDetail) {
       return res.status(400).json({ message: "car details not found" });
   }
   res.json({success:true,message:'car details deleted',data:carDetail})

}