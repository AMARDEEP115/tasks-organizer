const mongoose=require("mongoose");

const sprintSchema=mongoose.Schema({
    name:String,
    tasks:Array
});

const sprintModel=mongoose.model("sprints",sprintSchema);

module.exports={sprintModel};