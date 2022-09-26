const mongoose = require("mongoose");

const Course =  mongoose.Schema({
    title :{
        type:String,
        required: true
    },
    genre:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    active:Boolean
})

module.exports= mongoose.model("courses",Course)