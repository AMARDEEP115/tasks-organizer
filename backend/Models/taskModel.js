const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    name:String,
    attributes:Array
});

const taskModel=mongoose.model("tasks",taskSchema);

module.exports={taskModel};