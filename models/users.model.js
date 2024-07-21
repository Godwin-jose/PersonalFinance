const mongoose = require('mongoose');

const userSchema=mongoose.Schema({

    userName:{
        type:String,
        unique:true,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const model=mongoose.model("User",userSchema);
module.exports=model;