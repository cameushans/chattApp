const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String

})

const user = mongoose.model("userSchema",userSchema);


module.exports = user;

