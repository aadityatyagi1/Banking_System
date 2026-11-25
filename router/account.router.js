const express=require("express")


const accountRouter=express.Router()


const {verifyUser}=require("../src/middleware/account.middleware")

const {creatingAccount}=require("../controller/account.controller")




accountRouter.post("/",verifyUser,creatingAccount)



module.exports=accountRouter


