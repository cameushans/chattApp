const mongoose = require("mongoose");



const connex = mongoose.connect("mongodb+srv://hans:sibawaiyh@cluster0.wlsqn.mongodb.net/ChattApp?retryWrites=true&w=majority",{ useNewUrlParser: true },(err,result)=>{
    try {
        console.log("Successs")
    } catch (error) {
        console.log(error)
    }
})


module.exports = connex;