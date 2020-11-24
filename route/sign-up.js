const express = require('express');
const Router = express.Router();
const bcrypt =  require('bcrypt');
const user = require("../model/mongooseSchema");





Router.post("/",  (req,res,next) => {
    
    const newUser =  {
        email: req.session.email = req.body.email,
        username: req.session.username = req.body.username,
        password: req.session.password = req.body.password
     }

     function saveUser(emailUser,instructions)  {
               user.findOne({email:emailUser})
                     .then(result => {
                           result  ?
                           res.send("email allready exists") :
                           instructions(newUser)
                        })
         }


    function signUser (userInput)  {
        bcrypt.hash(userInput.password,10,(err,data)=>{
            var newUser = new user({
                username:userInput.username,
                password:data,
                email:userInput.email,
                date:Date.now()
            })
            newUser.save();
        
    })}

   SaveUser(newUser.email,signUser)

})


module.exports = Router;