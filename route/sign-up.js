const express = require('express');
const Router = express.Router();
const bcrypt =  require('bcrypt');
const user = require("../model/mongooseSchema");



Router.post("/",  (req,res,next) => {

   const newUser =  {
        email: req.session.email = req.body.email,
        username: req.session.username = req.body.username,
        password: req.session.password = req.body.password
     };

   function signUp(emailNewUser,funcToHash)  {
               user.findOne({email:emailNewUser})
                     .then(result => {
                           result  ?
                           res.send("email allready exists") :
                           funcToHash(newUser);
                        })
                      .catch(err => console.log(error));  
         };

    function hashPassword (newUser)  {
        bcrypt.hash(newUser.password,10,(err,hashedPassword) =>  saveUserInDb(newUser,hashedPasswor))
      };

    function saveUserInDb(newUser,hashedPassword){
         var newUser = new user({
            username:newUser.username,
            password:hashedPassword,
            email:newUser.email,
            date:Date.now()
      });
          newUser.save();
    };

    signUp(newUser.email,hashPassword);
});

module.exports = Router;