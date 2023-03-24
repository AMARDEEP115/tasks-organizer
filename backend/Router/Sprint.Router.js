const { Router }=require("express");
const { attributesModel } = require("../Models/attributesModel");
const { sprintModel } = require("../Models/sprintModel");
const { taskModel } = require("../Models/taskModel");

const sprintRouter=Router();

// To create a new sprint   - C r u d
sprintRouter.post("/addsprint",async(req,res)=>{
    let newSprint=req.body;
    try{

        // Checking if Sprint with given name is present in Database or not.
        let CheckSprint=await sprintModel.find({name:newSprint.name});
        if(CheckSprint.length===0){

            // if Sprint with given name is not present in Database.
            let saveSprint=new sprintModel(newSprint);
            await saveSprint.save();
            res.send({"message":"A new sprint is added"});
        } else {

            // Checking if Sprint with given name is present in Database.
            res.send({"message":"A sprint with this name is already present"});
        }
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To get all sprints in database   - c R u d
sprintRouter.get("/",async(req,res)=>{
    try{
        let allSprints=await sprintModel.find();
        res.send({"message":"All sprints","Sprints":allSprints});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To update a sprint   - c r U d
sprintRouter.patch("/updatesprint/:id",async(req,res)=>{
    let ID=req.params.id;
    let Sprint=req.body;
    try{
        await sprintModel.findByIdAndUpdate({_id:ID},Sprint);
        res.send({"message":"Sprint is updated"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// Delete a sprint   - c r u D
sprintRouter.delete("/removesprint/:id",async(req,res)=>{
    let ID=req.params.id;
    try{

        // Deleting all data of the sprint with given id from Sprints, Tasks and Attributes.
        await sprintModel.findByIdAndDelete({_id:ID});
        await taskModel.deleteMany({sprintID:ID});
        await attributesModel.deleteMany({sprintID:ID});
        res.send({"message":"Sprint is deleted"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

module.exports={sprintRouter};