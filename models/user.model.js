const mongoose = require("mongoose");
const bycrpt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/],
      unique: [true, "This email is already register"],
    },
    name: {
      type: String,
      required: [true, "Nmae is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return ;
  } else {
    const hash = await bycrpt.hash(this.password, 10);
    this.password=hash
    return ;
  }
})


userSchema.methods.comparePassword=async function(password){
    return await bycrpt.compare(password,this.password)
}


const userModel=mongoose.model("user",userSchema)


module.exports=userModel
