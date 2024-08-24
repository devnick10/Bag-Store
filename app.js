require('dotenv').config();
const express = require("express");
const app = express();
const path  = require("path");
const cookieParser =require("cookie-parser");
const flash = require("connect-flash");
const expressSession = require("express-session");
const dbgr = require("debug")("development:app")
const config = require("config")

const dbconnect = require("./config/dbConfig");
const ownersRouter = require("./routes/ownersRouters");
const productRouter = require("./routes/productRouters");
const usersRouter = require("./routes/usersRouters");
const indexRouter = require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/",indexRouter);


app.use("/owners",ownersRouter);
app.use("/users",usersRouter,);
app.use("/products",productRouter);





dbconnect();

const port = config.get("PORT");
app.listen(port,()=>{
    dbgr(`SERVER IS RUNNING AT PORT || ${config.get("PORT")}`);

})