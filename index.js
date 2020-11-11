const express     =    require("express");
const redis    =      require("./model/db");
const bcrypt =  require('bcrypt');
const compression = require('compression');//to compress responses bodies for all request
const jwt  = require("jsonwebtoken");
const session    =   require('express-session');
const bodyParser    =   require('body-parser');
const cookieParser = require('cookie-parser');
const redisStore    =   require('connect-redis')(session);
const redisCl =  require("redis").createClient();
const cors =  require("cors");
const helmet = require("helmet")//secure headers
const mongoDb = require("./model/mongooseDb");
const user = require("./model/mongooseSchema");

const app  =    express();

app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(express.json())
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

//cette route verifie si le suer existe et si son mot de passe est correct , s'il l'est il est redirigé vers un page sinon un msg 
//d'erreur lui est envoyé
app.post("/sign-in",(req,res,next)=>{
    req.body.email;
    req.body.password;
    redis.get("password").then((data)=>{
        bcrypt.compare(req.body.password,data,(err,result)=>{
            if(result){
                var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                console.log(token)
               
            }else {
                res.send("not valid password")
            }
        })
    })

 });
   
 //cette route prend en charge l'inscription d'un user et crypte  son password  avant de le mettre en cache
app.post("/sign-up",(req,res,next)=>{
    req.session.email = req.body.email;
    req.session.username = req.body.username;
    req.session.password = req.body.password;

    var newUser = new user({
        username:req.session.username,
        password:req.session.password,
        email:req.session.email
    })

    newUser.save();




    bcrypt.hash(req.session.password,10,(err,data)=>{
        redis.set("password",data).then((result)=>console.log(data , "stored"))
        redis.get("password").then((data)=>console.log(data))
    });

});

app.get("/myAccount",(req,res,next)=>{
    let date = {nom:"hans",prenom:"jean"};
    redis.set("users",JSON.stringify(date)).then((res)=>console.log(res));
    redis.get("users").then((res)=>console.log(JSON.parse(res)))
})
  
app.listen(3000,(req,res)=>{console.log("connect")});