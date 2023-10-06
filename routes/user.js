const express = require('express');
const User = require("../Models/user");
const router= express.Router();


router.route("/registeruser").post(async(req,res)=>{
    try{
        const {name,username,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            
            return res.status(400).json({message:"Email already exist"})
        }
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            
            return res.status(400).json({message:"User`9 name already exist"})
        }
        const user = await User.create({name,username,email,password});
        const token= await user.gentoken();
        res.status(201).json({message:"User Registered Successfully",user,token});
        

    }

    

    catch(error){
        console.log(error.message);
    }

    
})
router.route("/loginUser").post(async(req,res)=>{
   try{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        
        return res.status(400).json({message:"User Not Found , Pslease Resgister yourself first"})
    }
    const isMatch = await existingUser.comparedPassword(password);
    if(!isMatch){
        return res.status(400).json({message:"Password Not Matched"});
    }
    const username = existingUser;
   
    
    const token= await existingUser.gentoken();
    return res.status(200).json({message:"User Login Successfully", token,username});
   
  ;
   } 
   catch(error){
    console.log(error);
   }
}
 )
 router.route('/allusers').get(async(req,res)=>{
    try{
        const  allUsers =  await User.find();
        console.log(allUsers);
        return res.status(200).json({message:"Users fetched Successfully",allUsers});

    }
    catch(error){
        console.log(error)
    }
 })
 router.route('/allusers/edit').get(async(req,res)=>{
    try{
        const  allUsers =  await User.find();
        console.log(allUsers);
        return res.status(200).json({message:"Users fetched Successfully",allUsers});

    }
    catch(error){
        console.log(error)
    }
 })

module.exports= router;


