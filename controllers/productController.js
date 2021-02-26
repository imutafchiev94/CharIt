var express = require("express");
var router  = express.Router({mergeParams:true});
var Product = require("../models/product.js");
var orderController = require('./orderController');
var categoryController = require('./categoryController');
router.use('/order', orderController);
router.use('/category', categoryController);

router.get("/", function(req,res){
    Product.find({}, function(err, products){
        if(err){
            console.log(err);
        }else{
            res.render("products/products.hbs", {products : products});
        }
    }).lean();
});

router.get("/new", function(req, res){
    res.render("products/newProduct.hbs");
});

router.post("/", function(req,res){

    var title = req.body.title;
    var description = req.body.description;
    var price = req.body.price;
    var quantity = req.body.quantity;
    //TODO:ADD MORE

    var newProduct = {title: title, description: description, price: price, quantity: quantity};

    Product.create(newProduct, function(err, product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/products");
        }
    });

});

router.get("/:id/edit", function(req,res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        }else{
            res.render("products/editProduct.hbs", {product: product});
        }
    });
});


router.post("/:id", function(req,res){
    Product.findByIdAndUpdate(req.params.id, erq.body.product, function(err, product){
        if(err){
            console.log(err);
        }else{
            product.updatedAt = Date.now();
            product.updatedBy = Date.now();
            product.save();
            res.redirect("/products/" + product._id);
        }
    });
});

router.post("/:id/delete", function(req,res){
    Product.findById(req.params.id, function(err,product){
        if(err){
            console.log(err);
        }else{
            product.deletedBy = req.user.username;
            product.deletedAt = Date.now();

            product.save();
            res.redirect("/products");
        }
    });
});







module.exports = router;
