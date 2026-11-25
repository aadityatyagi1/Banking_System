const accountModel=require("../models/account.model")


async function creatingAccount(req,res){
    const user=req.user

    const account=await accountModel.create({
        user:user._id
    })


    return res.status(200).json({
        account
    })
}


module.exports={creatingAccount}