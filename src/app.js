const express=require("express")


const cookieparser=require("cookie-parser")



const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


const userRouter=require("../router/auth.router")


const accountRouter=require("../router/account.router")

// user router
app.use("/api/auth",userRouter)

app.use("/api/auth",userRouter)


// account router
app.use("/api/account",accountRouter)

module.exports=app;




