const { Router }=require("express");
const { attributesModel } = require("../Models/attributesModel");

const attributeRouter=Router();

// To create a new attribute   - C r u d
attributeRouter.post("/addattribute",async(req,res)=>{
    let newAttribute=req.body;
    try{
        let saveAttribute=new attributesModel(newAttribute);
        await saveAttribute.save();
        res.send({"message":"new attribute is added"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To get All attribute   - c R u d
attributeRouter.get("/",async(req,res)=>{
    try{
        let allAttributes=await attributesModel.find();
        res.send({"message":"all attributes","attributes":allAttributes});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To get specific attribute   - c R u d
attributeRouter.get("/sigleattribute/:id",async(req,res)=>{
    let ID=req.params.id;
    try{
        let Attribute=await attributesModel.findById({_id:ID});
        res.send({"message":"specific attributes","attribute":Attribute});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To update an attribute   - c r U d
attributeRouter.patch("/editattribute/:id",async(req,res)=>{
    let ID=req.params.id;
    let updates=req.body;
    try{
        await attributesModel.findByIdAndUpdate({_id:ID},updates);
        res.send({"message":"Attribute is updated"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To delelte an attribute   - c r u D
attributeRouter.delete("/removeattribute/:id",async(req,res)=>{
    let ID=req.params.id;
    try{
        await attributesModel.findByIdAndDelete({_id:ID});
        res.send({"message":"Attribute is deleted"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});


module.exports={attributeRouter};