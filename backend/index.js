const express=require("express");
const cors=require("cors");
const { connection } = require("./Config/db");

require("dotenv").config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.send({"message":"Home Route"});
});

app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log(`Connected to db`);
    } catch(err) {
        console.log(`Not-Connected to db`);
    }
    console.log(`server is running at port ${process.env.port}`);
});