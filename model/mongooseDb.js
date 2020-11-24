const mongoose = require("mongoose");
require("dotenv").config();



const connex = mongoose.connect(process.env.URI,{ useNewUrlParser: true },(err,result)=>{
    try {
        console.log("Successs")
    } catch (error) {
        console.log(error)
    }
})


module.exports = connex;