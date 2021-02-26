var express = require("express");
var router  = express.Router({mergeParams:true});
var Product = require("../models/product.js");
var Category = require("../models/category.js");
var orderController = require('./orderController');
var categoryController = require('./categoryController');
router.use('/order', orderController);
router.use('/category', categoryController);

router.get("/", function(req,res){
    Product.find({deletedAt : null}, function(err, products){
        if(err){
            res.render("products/products.hbs", { message : err});
        }else{

            Category.find({deletedAt : null}, function(err, categories){
                if(err){
                    res.render("products/products.hbs", {products : products});
                }else{
                    res.render("products/products.hbs", {products : products, categories: categories});
                }
            }).lean();

        }
    }).lean();
});

router.get("/new", function(req, res){

    Category.find({deletedAt : null}, function(err, categories){
        if(err){
            res.render("products/newProduct.hbs", {message : err});
        }else{
            res.render("products/newProduct.hbs", {categories: categories});
        }
    }).lean();

});

router.post("/", function(req,res){

    var title = req.body.product.title;
    var description = req.body.product.description;
    var price = req.body.product.price;
    var quantity = req.body.product.quantity;
    //TODO:ADD MORE

    var newProduct = {title: title, description: description, price: price, quantity: quantity, createdAt: Date.now(), createdBy: req.user._id};

    Product.create(newProduct, function(err, product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/products");
        }
    });

});

router.get("/:id", function(req,res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log();
        }else{
            res.render("products/productDetails.hbs", {product: product});
        }
    }).lean();
});

router.get("/:id/edit", function(req,res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            res.render("products/products.hbs", {message: err});
        }else{

            Category.find({}, function(err,categories){
                if(err){
                    res.render("products/editProduct.hbs", {product: product});
                }else{
                    res.render("products/editProduct.hbs", {product: product, categories: categories});
                }
            }).lean();

            
        }
    }).lean();
});


router.post("/:id", function(req,res){
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, product){
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
