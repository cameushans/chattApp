const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String,
    date:String

})

const user = mongoose.model("userSchema",userSchema);


module.exports = user;

