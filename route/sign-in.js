const express = require('express');
const Router = express.Router();
const jwt  = require("jsonwebtoken");




Router.post("/",async (req,res,next) => {
    req.session.email =  req.body.email;
    req.body.password;
    const currentUser = await user.findOne({email:req.body.email});
 
    await  bcrypt.compare(req.body.password,currentUser.password,(error,result)=>{
             //return a boolean , if true the user is authenticate an can access what you allow him to access
             if(result){
             const token = jwt.sign(currentUser.email,"secret")//generate a token when the user is authenticate 
             redisCl.set(token,currentUser.id,(err,res)=>console.log(res))//store the token in the redis cache db
             redisCl.get(token,(err,token)=>res.send({token:token,data:"login with successs"}))//request the token 
             }
        })
})


module.exports = Router;