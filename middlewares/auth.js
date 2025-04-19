//Here we will create authorisation routes for auth,isAdmin,isStudent
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.auth=async(req,res,next)=>{
    try{
        const token=req.body.token;
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }
        //Verify the token
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user=payload;
        }
        catch(error)
        {
            return res.status(500).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"Something went wrong "
        })
    }
}
exports.isStudent=async(req,res,next)=>{
    try{
        if(req.user.role!="Student")
        {
            return res.status(401).json({
                success:false,
                message:"This is the protected route for students"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}
exports.isAdmin=async(req,res,next)=>{
    try{
        if(req.user.role!="Admin")
        {
            return res.status(401).json({
                success:false,
                message:"This is the protected route for Admin"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}