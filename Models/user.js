const mongoose = require("mongoose");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const userScheama = new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profilepicture:{type:String},
    role:{type:String,default:"Agent",enum:["Superadmin","Admin","Agent"]},
    active:{type:Boolean,default:false},
    
})
userScheama.pre("save", async function(next){
    if(this.isModified("password")|| this.new){
        this.password=await bcrypt.hash(this.password,10);
        
        return next();
    }
    next();
})
userScheama.methods.comparedPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userScheama.methods.gentoken= async function(){
return await jwt.sign({id:this._id},"JWTSECRETKEY",{expiresIn:"1d"});
}
module.exports=mongoose.model("User",userScheama);
