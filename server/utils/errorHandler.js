

  export const errorHandler=(fn)=> async(req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (err) {
        if(err.isJoi)err.status=422
        res.status(err.status||500).send({status:false, error:err.message})
    }

}
