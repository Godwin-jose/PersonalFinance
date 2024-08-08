const mongoose = require('mongoose');
const data=mongoose.Schema({

    userName:{
        type:String,
        required:true,
        
    },

    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
},
{
    timestamps:true
});

const model=mongoose.model('Data',data);
module.exports=model;