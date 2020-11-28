const express = require("express");
const redis  =  require("./model/db");
const compression = require('compression');//to compress responses bodies for all request
const bodyParser  =  require('body-parser');
const cookieParser = require('cookie-parser');
const session  = require('express-session');//to manage session
 const redisStore   = require('connect-redis')(session);
 const redisCl =  require("redis").createClient();
const cors =  require("cors");
const helmet = require("helmet")//secure headers
const mongoDb = require("./model/mongooseDb");
const user = require("./model/mongooseSchema");
const chat = require("./route/chat");
const signIn = require("./route/sign-in");
const signUp = require("./route/sign-up");
require("dotenv").config();


const app  =   express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
        extended: true
    }));

 app.use(session({ 
        secret: 'mon secret',
        resave: false,
        saveUninitialized: false,
        }) );

 app.use("/chat",chat);       
 app.use("/sign-in",signIn);
 app.use("/sign-up",signUp);
 

app.listen(3000,(err,res) => console.log("Nokia connecting people"));
