const express=require('express')


const userRouter=express.Router()

const {useRegistration, userRegistration,userLogin}=require("../controller/auth.controller")



userRouter.post("/registration",userRegistration)

userRouter.post("/userLogin",userLogin)

module.exports=userRouter