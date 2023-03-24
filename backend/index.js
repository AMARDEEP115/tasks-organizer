const express=require("express");
const cors=require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Router/User.Router");
const { sprintRouter } = require("./Router/Sprint.Router");
const { tasksRouter } = require("./Router/Tasks.Router");
const { attributeRouter } = require("./Router/Attribute.Router");

require("dotenv").config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:"*"
}));

// Home Route
app.get("/",(req,res)=>{
    res.send({"message":"Home Route","All Routes":"/users  ,  /sprints  ,   /tasks  ,   /attributes"});
});

// users route
app.use("/users",userRouter);

// sprint route
app.use("/sprints",sprintRouter);

// taks route
app.use("/tasks",tasksRouter);

// attributes route
app.use("/attributes",attributeRouter);


app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log(`Connected to DB`);
    } catch(err) {
        console.log(err);
        console.log(`Error while connecting to DB`);
    }
    console.log(`server is running at port ${process.env.port}`);
});