const mongoose=require("mongoose");

// Schema of Sprints.
const sprintSchema=mongoose.Schema({
    name:String
});

// Model of Sprints.
const sprintModel=mongoose.model("sprints",sprintSchema);

module.exports={sprintModel};