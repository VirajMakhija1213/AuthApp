const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT || 3000;
//Body parser
app.use(express.json());
//Routes
const route=require("./routes/route");
app.use("/api/v1",route);
const dbConnect=require("./config/database");
dbConnect();
app.listen(PORT,()=>{
    console.log(`Server Started at PORT ${PORT}`);
})
app.get("/",(req,res)=>{
    res.send("<h1>Successfully started Auth App</h1>")
})