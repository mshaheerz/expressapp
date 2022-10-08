const mongoose = require('mongoose');
var express = require('express');
const router = express.Router()
const mongoDB = "mongodb://localhost:27017/shopping";
mongoose.connect(mongoDB, {
     useNewUrlParser: true,
     useUnifiedTopology: true 
    }).then(()=>
    {console.log("connection successfull");
}).catch(err=>{
    console.log("connection error: ",err)
});

// Define a schema

module.exports = router;





