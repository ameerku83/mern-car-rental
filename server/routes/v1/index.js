
import express from "express"
import router from "./userRouter.js"

import adminRoute from "./adminRoute.js"
import carRoute from "./carRoute.js"

const v1Router=express.Router()


v1Router.use('/user',router)

v1Router.use('/admin',adminRoute)
v1Router.use('/car',carRoute)





export default v1Router