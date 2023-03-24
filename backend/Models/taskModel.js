const mongoose=require("mongoose");

// Schema of Tasks.
const taskSchema=mongoose.Schema({
    name:String,
    sprintID:String
});

// Model of Tasks.
const taskModel=mongoose.model("tasks",taskSchema);

module.exports={taskModel};