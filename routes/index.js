const express = require("express");
const router = express.Router();
const islogedIn = require("../middlewares/isLogedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/",(req, res) => {
  let error = req.flash("error");
  res.render("index", {error,loggedin:false});
});

router.get("/shop",islogedIn,async (req, res) => {
 
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop",{products,success});
});

router.get("/cart",islogedIn,async (req, res) => {

  let user = await userModel.findOne({_id:req.user._id}).populate("cart").select("-password");
  let netTotal = 0
  let totalMrp = 0 
  let discount = 0
  let platformfee = user.cart.length * 10
  let shippingfee = 0
  let totalPrice = 0
  totalPrice += platformfee
  if (discount > 0)totalPrice -= discount
  if ( totalMrp <= 500)shippingfee += 50
  
  user.cart.forEach(product => {
     netTotal = product.price 
    totalMrp += Number(product.price)

    totalPrice += Number(product.price)
    discount+= Number(product.discount)
  });
  
  res.render("cart",{user,totalPrice,discount,platformfee,totalMrp,netTotal});
});

router.get("/addtocart/:productid",islogedIn,async (req, res) => {
 try {
   
   let user = await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid)
  await user.save();
  req.flash("success","Added to cart.")
  res.redirect("/shop")
  
 } catch (error) {
   res.send(error.message);

 }

});

module.exports = router;
