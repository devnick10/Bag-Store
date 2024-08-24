const express = require("express");
const router = express.Router();
const islogedIn = require("../middlewares/isLogedIn");
const productModel = require("../models/product-model");

router.get("/",(req, res) => {
  let error = req.flash("error");
  res.render("index", {error});
});

router.get("/shop",islogedIn,async (req, res) => {
 
  let products = await productModel.find();

  res.render("shop",{products});
});





router.post("/register",);

module.exports = router;
