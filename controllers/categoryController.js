const {Router} = require('express');
const router = Router();
const Category = require('../models/category');


router.get("/new", function(req,res){
    res.render("products/category/newCategory.hbs");
});

router.get("/:id/edit", function(req,res){
    Category.findById(req.params.id, function(err, category){
        if(err){
            res.redirect("/:id", {message : err});
        }else{
            res.render("products/category/edit.hbs", {category: category});
        }
    }).lean();
});


router.post("/", function(req,res){
    var title = req.body.title;
    createdBy = req.user.username;
    updatedBy = req.user.username;
    createdAt = Date.now();
    updatedAt = Date.now();    

    var newCategory = {title: title, createdBy: createdBy, updatedBy : updatedBy, createdAt : createdAt, updatedAt : updatedAt}

    Category.create(newCategory, function(err, category){
        if(err){
            res.redirect("/", {message : err});
        }else{
            res.redirect("/products");
        }
    });

});

router.post("/:id", function(req,res){
    Category.findByIdAndUpdate(req.params.id, req.body.category, function(err,category){
        Category.findByIdAndUpdate(req.params.id, req.body.category, function(err, category){
            category.updatedAt = Date.now();
            category.updatedBy = req.user.username;
            category.save();
            res.redirect("/products");
        });
    });
});

router.post("/:id/delete", function(req,res){
    Category.findById(req.params.id, function(err, category){
        if(err){
            res.redirect("/:id", {message : err});;
        }else{
            category.deletedBy = req.user.username;
            category.deletedAt = Date.now();

            category.save();
            res.redirect("/products");
        }
    });
});


module.exports = router;