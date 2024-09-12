import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoDb from "./config/mongoDb.js"
import apiRouter from "./routes/index.js"
import cookieParser from 'cookie-parser';

// import path from "path"
// import { fileURLToPath } from "url";

//import morgan from "morgan"

const app =express()

//app.use(morgan("dev"))
  app.use(cors(
    {
      origin: "https://ameerku83mern-car-rental.vercel.app",
      credentials:true,
      
    }
  ))
  
  app.use(express.urlencoded({ extended: true }));

 //"http://localhost:3000"
 
app.use(express.json())

app.use(cookieParser())
const port = process.env.PORT ;
mongoDb()

app.use("/",apiRouter)


app.all("*",(req,res)=>{
  res.status(404).json({message:"end pont does not exist"})
})

app.listen(port,()=>{
    console.log("server running on "+port);
    
})