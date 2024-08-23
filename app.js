require('dotenv').config();
const express = require("express");
const app = express();
const dbconnect = require("./config/dbConfig");
const path  = require("path");
const cookieParser =require("cookie-parser");
const { log } = require("console");
const ownersRouter = require("./routes/ownersRouters");
const productRouter = require("./routes/productRouters");
const usersRouter = require("./routes/usersRouters");



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine", "ejs");

app.use("/owenrs",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productRouter);





dbconnect();
app.listen(process.env.PORT || 3000 ,()=>{
    console.log(`SERVER IS RUNNING AT PORT || ${process.env.PORT}`);

    
})