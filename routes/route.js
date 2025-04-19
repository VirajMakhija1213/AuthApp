const express=require("express");
const route=express.Router();
//Importing the controllers
const {login,signup}=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");
//Linking 
route.post("/signup",signup);
route.post("/login",login);
//Protected Routes
route.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the testing phase of routes"
    })
})
route.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for student"
    })
})
route.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected routes for admin"
    })
})
//Exporting
module.exports=route;