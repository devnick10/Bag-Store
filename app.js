require('dotenv').config();
const express = require("express");
const app = express();

const path  = require("path");
const cookieParser =require("cookie-parser");
const { log } = require("console");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render("index");
})




app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`SERVER IS RUNNING AT PORT || ${process.env.PORT}`);

    
})