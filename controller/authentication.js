const jwt=require('jsonwebtoken');



 function authentication(req,res,next){
    const {accessToken}=req.cookies;  
    
     if(accessToken){            
        decoded=jwt.verify(accessToken,process.env.token);       
        if(decoded.userID){
            req.body.userID=decoded.userID;
                        next()                                      
        }else{
            res.status(401).send({msg:"Please login!"})
        }
    }else{
        res.status(401).send({msg:"Please login!"})     
    }
} 

module.exports={authentication}