import express from "express"
import cors from "cors"
import mongoDb from "./config/mongoDb.js"
import apiRouter from "./routes/index.js"
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
//import morgan from "morgan"
const app =express()
dotenv.config()
//app.use(morgan("dev"))
  app.use(cors(
    {
      origin:["http://localhost:3000"],
      credentials:true
    }
  ))
  //"https://ameer83mern-car-rental.onrender.com", 

app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT;
mongoDb()






app.use("/",apiRouter)


app.all("*",(req,res)=>{
  res.status(404).json({message:"end pont does not exist"})
})

app.listen(port,()=>{
    console.log("server running on "+port);
    
})