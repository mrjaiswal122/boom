var express=require("express");
var app=express.Router();

const userModel=require("./user");
// const model2=userModel.model2();

const passport=require('passport');
const localStrategy=require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

app.get("/",function(req,res){
    // app.setHeader('Content-Type','text/html');
    // res.write("hi ankush go on!!!!!");
    res.render("index");
    // res.end();
    });
app.get("/profile_try",isLoggedIn,function(req,res){

    res.render("profile",{user:req.cookies.name,profession:req.cookies.profession});
});    

app.post('/register',function(req,res){
    var userdata=new userModel({
        username:req.body.username,
        name:req.body.name,
        profession:req.body.profession
     });
     res.cookie("name",req.body.name);
     res.cookie("profession",req.body.profession);
     userModel.register(userdata,req.body.password)
     .then(function(registereduser){
        passport.authenticate("local")(req,res,function(){
            res.redirect('/profile_try');
        })
     })
} );
app.get("/mlogin",function(req,res){
   
    res.render("login");
});
app.post("/login", async function(req,res,next){
    var searchUser= await userModel.findOne({username:req.body.username});
    res.cookie("name",searchUser.name);
    res.cookie("profession",searchUser.profession);
    next();
},passport.authenticate("local",{
    successRedirect:"/profile_try",
    failureRedirect:"/"}),
    async function(req,res){});

app.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
module.exports=app;    