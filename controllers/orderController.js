const { Router } = require("express");
const order = require("../models/order");
const Category = require("../models/category");
const charityService = require("../services/charityService");
const targetService = require("../services/targetService");
const productService = require('../services/productService');


const router = Router();

router.get("/:productId/new/", async function (req, res) {
  try {
    var charities = await charityService.getAll();
    var product = await productService.getProductById(req.params.productId);
    Category.find({deletedAt : null}, function(err, categories){
      if(err){
        res.render("products/order/newOrder.hbs", { charities, message : err });
      }else{
        res.render("products/order/newOrder.hbs", { charities, categories: categories, product } );
      }
    }).lean();
   
  } catch (message) {

    Category.find({ deletedAt : null }, function(err, categories){
      if(!err){
        res.render("products/order/newOrder.hbs", { charities, message, categories });
      }
    });
  }
});

router.get("/:id", function(req,res){
  order.findById(req.params.id, function(err, order){
    if(err){
      res.render("products/order/orderDetails.hbs", {message: err});
    }else{

      Category.find({deletedAt : null}, function(err, categories){
        if(err){
          res.render("products/order/orderDetails.hbs", {order : order, message : err});
        }else{
          res.render("products/order/orderDetails.hbs", {order : order, categories: categories});
        }
      }).lean();     
    }
  }).lean();
});

router.post("/", async function (req, res) {
  //TODO IVO Find charity by target and send target from request!
  try {
    var sum = req.body.sum;
    var user = req.user._id;
    var product = await productService.getProductById(req.params.productId);
    //var target = req.body.target;
    // var charity = await charityService.getCharityByTargetId(req.body.target)
    var createdBy = req.user.username;
    var updatedBy = req.user.username;
    var createdAt = Date.now();
    var updatedAt = Date.now();
    var newOrder = {
      sum: sum,
      user: user,
      product: product,
      //target: target,
      // charity: charity,
      createdBy: createdBy,
      updatedBy: updatedBy,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    order.create(newOrder, function (err, target) {
      if (err) {
        console.log(err);
        res.redirect("/products", {message : err});
      } else {
        res.redirect(`/products/order/${target._id}`);
      }
    });
  } catch (message) {
    res.redirect("/products/", { message });
  }
});


router.post("/:id/delete", function(req,res){
  order.findById(req.params.id, function(err, order){
    if(err){
      res.redirect("/product", {message : err});
    }else{
      order.deletedBy = req.user.username;
      order.deletedAt = Date.now();

      order.save();
      res.redirect("/products");
    }
  });
});

module.exports = router;
