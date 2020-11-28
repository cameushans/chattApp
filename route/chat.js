const express = require('express');
const Router = express.Router();



Router.get("/",(req,res,next) => {  console.log("coucou i am in chat");
})
  

module.exports = Router;