// require('dotenv').config();
const express = require("express");
const app = express();
const dbconnect = require("./config/dbConfig");
const path  = require("path");
const cookieParser =require("cookie-parser");
const { log } = require("console");
const ownersRouter = require("./routes/ownersRouters");
const productRouter = require("./routes/productRouters");
const usersRouter = require("./routes/usersRouters");

const dbgr = require("debug")("development:app")
const config = require("config")

console.log(process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine", "ejs");

app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productRouter);





dbconnect();

const port = config.get("PORT");
app.listen(port,()=>{
    dbgr(`SERVER IS RUNNING AT PORT || ${config.get("PORT")}`);

})