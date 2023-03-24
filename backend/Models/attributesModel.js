const mongoose=require("mongoose");

const attributesSchema=mongoose.Schema({
    description:String,
    userID:String,
    state:String,
    taskID:String,
    sprintID:String
});

const attributesModel=mongoose.model("attributes",attributesSchema);

module.exports={attributesModel};