const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

module.exports.registerUser =async function(req, res){
    try {
      let { fullname, email, password } = req.body;
     
     let user = await  userModel.findOne({email:email});
     if(user){
      req.flash("error","You already have account , please login.")
      return res.redirect("/");
     }

      bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
          
          if (err)res.send(err.message);
          else{
  
            const user = await userModel.create({
              fullname,
              email,
              password:hash,
            });
            
            let token =  generateToken(user)
            res.cookie("token",token);
            res.redirect("/shop")
          }
  
        
        })
      })
        
  
  
    } catch (error) {
      res.send(error.message);
    }
  }

module.exports.loginUser = async function(req,res){
  
  let {email,password} = req.body;
     
  let user = await userModel.findOne({email:email});
  if(!user){
    
    req.flash("error","Email or Password incorrect");
    return res.redirect("/")
  } 

  bcrypt.compare(password,user.password,(err,result)=>{
    
    if(result){
      let token = generateToken(user);
      res.cookie("token",token);
      res.redirect("/shop");
    }else{
      req.flash("error","Email or Password incorrect");
      return res.redirect("/")
    }
    
    


  })


}

module.exports.logout = function(req,res){
  res.clearCookie("token");
   res.redirect("/");

}