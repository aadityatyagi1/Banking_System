const express=require('express')


const userRouter=express.Router()

const {useRegistration, userRegistration}=require("../controller/auth.controller")



userRouter.post("/registration",userRegistration)

module.exports=userRouter