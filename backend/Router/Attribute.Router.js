const { Rouer }=require("express");
const { attributesModel } = require("../Models/attributesModel");

const attributeRouter=Rouer();

// creating a new attribute
attributeRouter.post("/addattribute",async(req,res)=>{
    let newAttribute=req.body;
    try{
        let saveAttribute=new attributesModel(newAttribute);
        await saveAttribute();
        res.send({"message":"new attribute is added"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// update an attribute
attributeRouter.patch("/editattribute/:id",async(req,res)=>{
    let ID=req.params.id;
    let updates=req.body;
    try{
        await attributesModel.findByIdAndUpdate({_id:ID},updates);
        res.send({"message":"new attribute is added"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// delelte an attribute
attributeRouter.delete("/removeattribute/:id",async(req,res)=>{
    let ID=req.params.id;
    try{
        await attributesModel.findByIdAndDelete({_id:ID});
        res.send({"message":"new attribute is added"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});


module.exports={attributeRouter};