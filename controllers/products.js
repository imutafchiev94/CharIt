var express = require("express");
var router  = express.Router({mergeParams:true});
var Product = require("../models/product.js");

router.get("/", function(req,res){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }else{
            res.render("products", {products : products});
        }
    });
});

router.post("/", function(req,res){

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var quantity = req.body.quantity;
    //TODO:ADD MORE

    var newProdcut = {title: title, description: description, price: price, quantity: quantity};

    Product.create(newProduct, function(err, product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/products");
        }
    });


});
