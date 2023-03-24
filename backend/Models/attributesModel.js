const mongoose=require("mongoose");


// Schema of Attributes.
const attributesSchema=mongoose.Schema({
    description:String,
    userID:String,
    state:String,
    taskID:String,
    sprintID:String
});


// Model of Attributes.
const attributesModel=mongoose.model("attributes",attributesSchema);

module.exports={attributesModel};