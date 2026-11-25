const userModel=require("../models/user.model")


const {sendRegistrationEmail}=require("../src/services/email.service")


const jwt=require("jsonwebtoken")

/**
 * -Registration route
 
 * -Post route
 *
 */

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


    await sendRegistrationEmail(user.email,user.name)


}


/**
 * -Login Get router
 */

async function userLogin(req,res){
    console.log("request comming")
    const {password,email}=req.body
    


    const user=await userModel.findOne({email:email}).select("+password")

    console.log("Request password:", password);
    console.log("Database password:", user.password);

    if(!user){
        return res.status(404).json({
            message:"User not found with this email",
            status:"failed"

        })
    }

    const valid=await user.comparePassword(password)

    if(!valid){
        return res.status(404).json({
            message:"Password is wrong",
            status:"failed"
        })
    }
    console.log("request comming")
  



    const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_KEY,
        {expiresIn:"5d"}
    )


    res.cookie("token",token);


    return res.status(200).json({
        message:"Login successfully",
        status:"success",
        token:token
    })

}
module.exports={userRegistration,userLogin}