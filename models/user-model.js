const {Schema, default: mongoose} = require('mongoose')

const userSchema = Schema(
    {
       fullname:{type:String,required:true},
       email:{type:String,required:true},
       password:{type:String,required:true},
       cart:{type:Array,default:[]},
       orders:{type:Array , default:[]},
       contact:{type:Number},
       picture:{type:String}

    }
)

module.exports = mongoose.model("user",userSchema);