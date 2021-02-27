const {Router} = require('express');
const router = Router();
var News = require("../models.news.js");
var Category = require("../models/category.js");
var Charity = require("../models/charity.js");


router.get("/", function(req,res){
    News.find({deletedAt : null}, function(req,res){
        if(err){
            res.redirect("/", {message : err});
        }else{

            Category.find({deletedAt : null}, function(err, categories){

                if(err){
                    res.redirect("/news", {message : err});
                }else{
                    res.render("news/news.hbs", {categories : categories, news : news});
                }

            });

        }
    });
});

router.get("/:id", function(req,res){

    News.findById(req.params.id, function(err, news){

        if(err){
            res.redirect("/news", {message : err});
        }else{

            Category.find({deletedAt : null}, function(err, categories){

                if(err){
                    res.redirect("/news/", {message : err});
                }else{

                    Charity.findById(news.charity, function(err, charity){

                        if(err){
                            res.redirect("/news", {message : err});
                        }else{
                            res.render("/news/newsDetails", {news : news, charity : charity, categories : categories});
                        }
                    });
                }
            });
        }
    });
});

router.get("/new", function(req,res){

    Category.find({deletedAt : null}, function(err, categories){
        if(err){
            res.redirect("/news", {message : err});
        }else{

            Charity.find({deletedAt : null}, function(err, charities){
                if(err){
                    res.render("news/addNews.hbs", {categories : categories, message : err});
                }else{
                    res.render("news/addNews.hbs", {charities : charities, message : err});
                }
            });           
        }
    });
});

router.get("/:id/edit", function(req,res){

    News.findById(req.params.id, function(err, news){
        if(err){
            res.redirect("/news", {message : err});
        }else{

            Charity.find({deletedAt : null}, function(err, charities){
                if(err){
                    res.render("news/editNews.hbs", {news : news, message : err});
                }else{

                    Category.find({deletedAt : null}, function(err, categories){

                        if(err){
                            res.render("news/editNews.hbs", {news : news, charities : charities, message : err});
                        }else{
                            res.render("news/editNews.hbs", {news : news, charities : charities, categories : categories}); 
                        }
                    });
                }
            });
        }
    });
});


router.post("/", function(req,res){

    var title = req.body.title;
    var description = req.body.description;
    var author = req.user._id;
    var imageUrl = req.body.imageUrl;
    var charity = req.body.charity;
    var createdBy = req.user.username;
    var createdAt = Date.now();

    var news = News.create({title : title, description : description, author : author, imageUrl : imageUrl, charity : charity, createdBy : createdBy, createdAt});

    News.create(news, function(err, addedNews){
        if(err){
            res.redirect("/news", {message : err});
        }else{
            res.redirect("/news/" + addedNews._id);
        }
    });

});

router.post("/:id", function(req,res){

    var title = req.body.title;
    var description = req.body.description;
    var author = req.user._id;
    var imageUrl = req.body.imageUrl;
    var charity = req.body.charity;
    var updatedBy = req.user.username;
    var updatedAt = Date.now();

    News.findById(req.params.id, function(err, news){
        if(err){
            res.redirect("/news", {message : err});
        }else{

            news.title = title;
            news.description = description;
            news.author = author;
            news.imageUrl = imageUrl;
            news.charity = charity;
            news.updatedBy = updatedBy;
            news.updatedAt = updatedAt;

            news.save();
            res.redirect("/news/" + news._id);
        }
    });



});

router.post("/:id/delete", function(req, res){

    News.findById(req.params.id, function(err, news){
        if(err){
            res.redirect("/news", {message : err});
        }else{
            news.deletedAt = Date.now();
            news.deletedBy = req.user.username;

            news.save();
            res.redirect("/news");
        }
    });

});





module.exports = router;