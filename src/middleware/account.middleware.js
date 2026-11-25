const userModel=require("../../models/user.model")


const jwt=require("jsonwebtoken")



async function verifyUser(req,res,next){
    const token=req.cookies?.token|| req.headers.authorization?.split("")[1]

    if(!token){
        return res.status(400).json({
            message:"For creating account token is required and for token you should Login or Register ",
            status:"failed"
        })
    }
    try{

        const userVerify= await jwt.verify(token,process.env.JWT_KEY)

        const user=await userModel.findOne(userVerify._id)

        req.user=user

        next()
            

    }catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Invalid token",
            status:"failed"
        })
    }
    

}


module.exports={verifyUser}