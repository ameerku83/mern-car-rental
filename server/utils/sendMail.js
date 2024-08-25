import nodemailer from "nodemailer"
 export const sendClient= async(to,subject,text,html)=> {

   const transporter = nodemailer.createTransport({
        
       port:465,
      host:"smtp.gmail.com",
      secure:true,
        auth: {
          user:process.env.EMAIL ,
          pass:process.env.PASSWORD,
        }
      })
      
     
     

      let info=   await  transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
            html 
            
          });
        
     }
      
   
