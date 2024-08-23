const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");
const connectDB = async()=>{
 
    try {
      const  connetionInstence = await mongoose.connect(`${config.get("MONGODB_URI")}/${config.get("DBNAME")}`);
         dbgr(`MONGODB CONNETED SUCCESSFULLY || ${connetionInstence.connection.host}`);
         
    } catch (error) {
        dbgr("db connetion erro:",error);
        
    }


}

module.exports = connectDB ;