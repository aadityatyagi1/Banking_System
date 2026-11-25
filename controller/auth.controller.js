const userModel=require("../models/user.model")


const jwt=require("jsonwebtoken")



async function userRegistration(req,res){
    const {email,name,password}=req.body;

    const isExist=await userModel.findOne({email:email})

    if(isExist){
        return res.status(422).json({
            message:"User with is email already exist!",
            status:"failed"
        })

    }
    const user=await userModel.create({
        email:email,
        name:name,
        password:password,
    })

    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_KEY,
        {expiresIn:"5d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        user:{
            _id:user._id,
            name:user.name,
            email:user.email
        },
        token
    })


}
module.exports={userRegistration}