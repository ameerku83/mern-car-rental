import Joi from "joi"
  export  const carValidation = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(2000).max(new Date().getFullYear()).required(),
    pricePerDay: Joi.number().positive().required(),
    capacity: Joi.number().integer().positive().required(),
    transmission: Joi.string().valid('Automatic', 'Manual').required(),
    fuelType: Joi.string().valid('Petrol', 'Diesel', 'Electric', 'Hybrid').required(),
   
    mileage:Joi.number().positive().required()
  }).unknown();