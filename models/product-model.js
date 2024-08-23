const {Schema, default: mongoose} = require("mongoose");

const productSchema = Schema(
    {
        image:{type:String,required:true},
        name:{type:String,required:true},
        price:{type:Number,required:true},
        discount:{type:Number,default:0},
        bgcolor:{type:String},
        panelcolor:{type:String},
        textcolor:{type:String}
    }
)

module.exports = mongoose.model("product",productSchema);