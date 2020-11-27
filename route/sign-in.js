const express = require('express');
const Router = express.Router();
const jwt  = require("jsonwebtoken");




Router.post("/", (req,res,next) => {
        const currentUser = {
            email:req.session.email =  req.body.email,
            password: req.body.password
        }

        const  findUserByEmail = () =>  user.findOne({email:req.body.email});
        function compareUserPasswordwithStoredPassword(){
            bcrypt.compare(req.body.password,currentUser.password,(error,result)=>{
                if(result){
                const token = jwt.sign(currentUser.email,"secret")
                redisCl.set(token,currentUser.id,(err,res)=>console.log(res))
                redisCl.get(token,(err,token)=>res.send({token:token,data:"login with successs"}))
                }
            })
          }


module.exports = Router;