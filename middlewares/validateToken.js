const jwt=require('jsonwebtoken');

const validateToken = async (req,res,next) =>{
 let token;
 let authorizerHead= req.headers.Authorization || req.headers.authorization 
 if(authorizerHead && authorizerHead.startsWith("Bearer")){
  token=authorizerHead.split(" ")[1];
  console.log(token)
  jwt.verify(token,process.env.SECRET_ACCESS_TOKEN, (err,decode)=>{
    if(err){
        res.status(401).json("Token Is Not Valid !")
    }
    req.user=decode.user;
    next();
  })
  if(!token){
    res.status(401).json("Token Is Missing ")  }
 }
};

module.exports= validateToken;