const express = require("express")
require("dotenv").config();
const courseRoute = require("./routes/course")
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const  bodyParser= require("body-parser");
app.use(bodyParser.json())
app.use(courseRoute);


app.get("/",(req,res)=>{
    res.send("Api is working fine");
})

mongoose.connect(process.env.DB_CONNECTION_URL,()=>{
    console.log("connected to mongoose")
})
app.listen(3000,()=>{
    console.log("server is running on port no 3000");
})