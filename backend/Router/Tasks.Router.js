const { Router }=require("express");
const { attributesModel } = require("../Models/attributesModel");
const { taskModel } = require("../Models/taskModel");

const tasksRouter=Router();

// To create a task   - C r u d
tasksRouter.post("/addtask",async(req,res)=>{
    let newTask=req.body;
    try{

        // Checking if task with given name is present in database or not.
        let CheckTask=await taskModel.find({name:newTask.name});
        
        if(CheckTask.length!==0){
            // If task with given name is present in database.
            let available=false;

            // Checking if task with given name is present in the given sprint or not.
            CheckTask.forEach((el)=>{
                if(el.sprintID===newTask.sprintID){
                    available=true;
                }
            });
            if(!available){

                // If task with given name is not present in the given sprint.
                let saveTask=new taskModel(newTask);
                await saveTask.save();
                res.send({"message":"Task is created"});                
            } else {

                // If task with given name is present in the given sprint.
                res.send({"message":"A task with this name is already present"});
            }
        } else {

            // If task with given name is not present in database.
            let saveTask=new taskModel(newTask);
            await saveTask.save();
            res.send({"message":"Task is created"});
        }
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To get all tasks present in database   - c R u d
tasksRouter.get("/",async(req,res)=>{
    try{
        let AllTask=await taskModel.find();
        res.send({"message":"All tasks","tasks":AllTask});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To update a task   - c r U d
tasksRouter.patch("/updatetask/:id",async(req,res)=>{
    let ID=req.params.id;
    let Task=req.body;
    try{
        await taskModel.findByIdAndUpdate({_id:ID},Task);
        res.send({"message":"Task is updated"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});

// To delete a task   - c r u D
tasksRouter.delete("/removetask/:id",async(req,res)=>{
    let ID=req.params.id;
    try{

        // Deleting all data of the task with given id from Tasks and Attributes.
        await taskModel.findByIdAndDelete({_id:ID});
        await attributesModel.deleteMany({taskID:ID});
        res.send({"message":"Task is deleted"});
    } catch(err){
        console.log(err);
        res.send({"message":"Something went wrong"});
    }
});


module.exports={tasksRouter};