const mongoose=require("mongoose");

// Schema of Users.
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    mobile:Number,
    password:String
});

// Model of Users.
const userModel=mongoose.model("users",userSchema);

module.exports={userModel};