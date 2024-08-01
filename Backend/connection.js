const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb+srv://Godwin:Godu2005@pfinance.nyt4lvs.mongodb.net/users?retryWrites=true&w=majority&appName=PFinance')
.then(()=>{
    console.log("Connected to Database _1");
   
    
})
.catch((err)=>{
    console.log(err);
})




