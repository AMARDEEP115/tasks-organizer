const mongoose=require("mongoose");
require("dotenv").config();

// Connecting backend with database.
const connection=mongoose.connect(process.env.mongoURL);

module.exports={connection};