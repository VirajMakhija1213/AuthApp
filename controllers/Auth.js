const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config();
exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        //Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        //yaha tak aagaye ho it means ki not present Now secure the password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10);
        }   
        catch(error)
        {
            return res.status(500).json({
                success:false,
                message:"Error in hashing the password"
            })
        }
        //Create the entry
        const user =await User.create({name,email,password:hashedPassword,role});
        return res.status(200).json({
            success:true,
            message:"User created successfully"
        })
    }
    catch(error)
    {
        console.log("Error while signing up in the page");
        console.error(error);
        res.status(200).json({
            success:true,
            message:"Error while signing up the page"
        })
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //All the data is not filled yet
        if(!email || !password)
        {
            return res.status(500).json({
                success:false,
                message:"Please enter all the credentials"
            })
        }
        //Check user present or not
        let user=await User.findOne({email});
        if(!user)
        {
            return res.status(500).json({
                success:false,
                message:"No user found with the following credentials"
            })
        }
        const payload={
            email:user.email,id:user._id,role:user.role
        }
        //yaha tak pohche ho means present now we have to validate the password and generate a JWT Token
        if(await bcrypt.compare(password,user.password))
        {
            //Password match
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            //Yaha se password hatana hai user ke object mein se
            user=user.toObject();
            user.token=token;
            user.password=undefined;
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
        else
        {
            //Password do not match
            return res.status(500).json({
                success:false,
                message:"Passwords do not match"
            })
        }
    }
    catch(error)
    {
        console.log("Error while Logging the page");
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Error while Logging the page"
        })
    }
}