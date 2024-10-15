import mongoose from "mongoose"

 export  const mongoDb = ()=>{
     mongoose.connect( process.env.MONGO_URL)
     .then(()=>{
        console.log("db connected");
        
     })
     .catch((err)=>{
        console.log("error DB " + err);
        
     })

} 
