const {Schema, default: mongoose} = require('mongoose')

const ownerSchema = Schema(
    {
       fullname:{type:String,required:true},
       email:{type:String,required:true},
       password:{type:String,required:true},
       products:[{type:mongoose.Schema.Types.ObjectId ,ref:"product"}],
       contact:{type:Number},
       picture:{type:String},
       gstn:{type:String}

    }
)

module.exports = mongoose.model("owner",ownerSchema);