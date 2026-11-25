const express=require("express")


const cookieparser=require("cookie-parser")


const userRouter=require("../router/auth.router")




const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())


app.use("/api/auth",userRouter)

module.exports=app;




