const express     =    require("express");
const redis    =      require("./model/db");
const bcrypt =  require('bcrypt');
const compression = require('compression');//to compress responses bodies for all request
const jwt  = require("jsonwebtoken");
const session    =   require('express-session');//to manage session
const bodyParser    =   require('body-parser');
const cookieParser = require('cookie-parser');
const redisStore    =   require('connect-redis')(session);
const redisCl =  require("redis").createClient();
const cors =  require("cors");
const helmet = require("helmet")//secure headers
const mongoDb = require("./model/mongooseDb");
const user = require("./model/mongooseSchema");

const app  =    express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
        extended: true
    }));

 app.use( session({ 
        secret: 'mon secret',
        resave: false,
        saveUninitialized: false,
        }) );

app.get("/",(req,res,next)=>{
}); 

//This route handle signin and generate a token when the user exist , and then redirect him to his account
app.post("/sign-in",async (req,res,next)=>{
    req.body.email;
    req.body.password;
    const {authorization} = req.headers;
    const existingUser = await user.find();
    const currentUser =  await existingUser.filter((element,index)=>{
      return  req.body.email === element.email;
    });

    await currentUser.map((element,index)=>{
        bcrypt.compare(req.body.password,element.password,(error,result)=>{
             //return a boolean , if true the user is authenticate an can access what you allow him to access
             if(result){
             const token = jwt.sign(element.email,"secret")//generate a token when the user is authenticate 
             redisCl.set(token,element.id,(err,res)=>console.log(res))//store the token in the redis cache db
             redisCl.get(token,(err,token)=>res.send({token:token}))//request the token 
             }

        })
    })
 });

   
 ////This route handle sign up and encrypt password 
app.post("/sign-up",async (req,res,next)=>{
    req.session.email = req.body.email;
    req.session.username = req.body.username;
    req.session.password = req.body.password;

      await  user.findOne({email:req.session.email}).then((result)=>{
             if(result){
                 res.send("email already exist choose an other email"
                 )
             } else {
                 bcrypt.hash(req.session.password,10,(err,data)=>{

                    var newUser = new user({
                        username:req.session.username,
                        password:data,
                        email:req.session.email
                    })
                    newUser.save();
                })
             }
            })
});

app.get("/myAccount",(req,res,next)=>{
 
})
  
app.listen(3000,(req,res)=>{console.log("Nokia connecting people")});