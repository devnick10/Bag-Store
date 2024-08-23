const mongoose = require("mongoose");
const dbName = "bad store";

const connectDB = async()=>{
 
    try {
      const  connetionInstence = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
         console.log(`MONGODB CONNETED SUCCESSFULLY || ${connetionInstence.connection.host}`);
         
    } catch (error) {
        console.log("db connetion erro:",error);
        
    }


}

module.exports = connectDB ;