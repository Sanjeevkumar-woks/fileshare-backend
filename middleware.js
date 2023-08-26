
 const auth=(req,res,next)=>{
    try{
    const email= req.header('x-auth-email');
    File.findOne(email);
    next();
    }catch(err){
        res.send({err :err.message});
    }
}

module.exports=auth;