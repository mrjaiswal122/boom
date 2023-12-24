const mongoose=require("mongoose");
const passportLocalMongoose =require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/database_try");
const userSchema1=new mongoose.Schema({
    username:String,
    name:String,
    profession:String,
    password:String
    });
    userSchema1.plugin(passportLocalMongoose);

    module.exports=mongoose.model("userid",userSchema1);
