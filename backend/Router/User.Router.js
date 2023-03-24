const { Router }=require("express");
const { userModel } = require("../Models/userModel");
const bcrypt = require('bcrypt');
require("dotenv").config();

const userRouter=Router();

// Create Account
userRouter.post("/signup",async(req,res)=>{
    let userDetails=req.body;
    let registeredUsers=await userModel.find();
    try{
        let checkUser=registeredUsers.find(({ name, email, mobile }) =>{
            if(name === userDetails.name){
                return name === userDetails.name;
            } else if(email === userDetails.email){
                return email === userDetails.email;
            } else if(mobile === userDetails.mobile){
                return mobile === userDetails.mobile;
            }
        });
        if(checkUser===undefined){
            await bcrypt.hash(userDetails.password, process.env.saltRounds, async(err, hash)=>{
                // Store hash in your password DB.
                if(err){
                    res.send({"message":"Something went wrong"});
                }
                userDetails.password=hash;
                let saveUser=new userModel(userDetails);
                await saveUser();
                res.send({"message":"Registered Successfully"});
            });
        } else if(checkUser.name!==undefined && checkUser.email!==undefined && checkUser.mobile!==undefined){
            res.send({"message":"Alredy registered try to login"});
        } else if(checkUser.name!==undefined && checkUser.email!==undefined){
            res.send({"message":"Alredy registered with this name and email"});
        } else if(checkUser.name!==undefined && checkUser.mobile!==undefined){
            res.send({"message":"Alredy registered with this name and mobile number"});
        } else if(checkUser.email!==undefined && checkUser.mobile!==undefined){
            res.send({"message":"Alredy registered with this email and mobile number"});
        } else if(checkUser.name!==undefined){
            res.send({"message":"Alredy registered with this name"});
        } else if(checkUser.email!==undefined){
            res.send({"message":"Alredy registered with this email"});
        } else if(checkUser.mobile!==undefined){
            res.send({"message":"Alredy registered with this mobile"});
        }
    } catch(err){
        res.send({"message":"Something went wrong"});
    }
});

// User Login
userRouter.post("/signin",async(req,res)=>{
    let {email,password}=req.body;
    try{
        let findUser=await userModel.find({email:email});
        if(findUser.length===0){
            res.send({"message":"User not found"});            
        } else {
            await bcrypt.compare(password, findUser[0].password, function(err, result) {
                // result == true
                if(err){
                    res.send({"message":"Something went wrong"});
                }
                if(result){
                    res.send({"message":"Signin Successfully","user":findUser[0]});
                }
            });
        }
    } catch(err){
        res.send({"message":"Something went wrong"});
    }
});

// Edit Loggedin User Account
userRouter.patch("/edit/:id",async(req,res)=>{
    let ID=req.params.id;
    let upadtes=req.body;
    try{
        if(upadtes.oldPassword!==""){
            let findUser=await userModel.findById({_id:ID});
            await bcrypt.compare(upadtes.oldPassword, findUser.password, async(err, result)=>{
                // result == true
                if(err){
                    res.send({"message":"Something went wrong"});
                }
                if(result){
                    await bcrypt.hash(upadtes.newPassword, process.env.saltRounds, async(err, hash)=>{
                        // Store hash in your password DB.
                        if(err){
                            res.send({"message":"Something went wrong"});
                        }
                        if(upadtes.name!==""){
                            findUser.name=upadtes.name;
                        }
                        if(upadtes.email!==""){
                            findUser.email=upadtes.email;
                        }
                        if(upadtes.mobile!==""){
                            findUser.mobile=upadtes.mobile;
                        }
                        findUser.password=hash;
                        await userModel.findByIdAndUpdate({_id:ID},findUser);
                        res.send({"message":"Account Updated Successfully"});
                    });
                    await userModel.findByIdAndUpdate({_id:ID},upadtes);
                    res.send({"message":"Account Updated Successfully"});
                } else {
                    await userModel.findByIdAndUpdate({_id:ID},upadtes);
                    res.send({"message":"Account Updated Successfully except password"});
                }
            });
        }
        await userModel.findByIdAndUpdate({_id:ID},upadtes);
        res.send({"message":"Account Updated Successfully"});
    } catch(err){
        res.send({"message":"Something went wrong"});
    }
});


// Delete Account
userRouter.delete("/remove/:id",async(req,res)=>{
    let ID=req.params.id;
    try{
        await userModel.findByIdAndDelete({_id:ID});
        res.send({"message":"Account Deleted Successfully"});
    } catch(err){
        res.send({"message":"Something went wrong"});
    }
});

module.exports={userRouter};