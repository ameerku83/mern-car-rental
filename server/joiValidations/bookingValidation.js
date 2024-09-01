import Joi from 'joi';

 export const bookingValiadation = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  
    pickupLocation: Joi.string().required(),
    address:Joi.string().required(),
    mobile:Joi.string().pattern(/^[0-9]{10}$/).messages({"string.pattern.base":"mobile number must have 10 digit"}).required(),
 }).unknown();