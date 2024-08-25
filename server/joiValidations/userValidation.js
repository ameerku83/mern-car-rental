import joi from "joi"

export const userValidate= joi.object({
    name:joi.string().min(3).max(40).required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).required(),
    mobile:joi.string().pattern(/^[0-9]{10}$/).messages({"string.pattern.base":"mobile number must have 10 digit"}).required()
})

//.unknown()