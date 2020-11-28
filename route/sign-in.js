const express = require('express');
const router = express.Router();
const jwt  = require("jsonwebtoken");
const user = require("../model/mongooseSchema");
const bcrypt =  require('bcrypt');
const redis = require("../model/db")






router.post("/", (req,res,next) => {
        const currentUser = {
            email:req.session.email =  req.body.email,
            password: req.body.password
        };

        function  findUserByEmailAndSignIt (email)  {  
                   user.findOne({email:email})
                          .then(user => {
                              user?
                              compareUserPasswordwithStoredPassword(currentUser.password,user.password,user._id) : 
                              res.send("user does not exist");
                          });
            };

        function compareUserPasswordwithStoredPassword(storedPassword,enteredPassword,id)  {
            bcrypt.compare(storedPassword,enteredPassword,(error,result)=>{
                result ? 
                 generateToken(enteredPassword) (id):
                 console.log("error");          
            });
          };

          function generateToken(email,)  {
                const token = jwt.sign(email,"secret");
                function storeInTokenInCache(id){
                    redis.set(token,id)
                            .then(res=>res)
                            .catch(err=>console.log(err))
                }
                return storeInTokenInCache;
          };


          findUserByEmailAndSignIt(currentUser.email);

        });


module.exports = router;