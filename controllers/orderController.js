const {Router} = require('express');
const order = require('../models/order');

const router = Router();

router.get("/new", function(req,res){
    res.render("products/order/newOrder.hbs");
});

router.post("/", function(req,res){

//TODO IVO Find charity by target and send target from request!
    var sum = req.body.sum;
    var user = req.user._id;
    var product = req.params.productId;
    var target = req.body.target;
    var charity = chartiy.target;
    var createdBy = req.user._id;
    var updatedBy = req.user._id;
    var createdAt = Date.now();
    var updatedAt = Date.now();

    var newOrder = {sum: sum, user: user, product: product, target: target, charity: charity, createdBy: createdBy, updatedBy: updatedBy, createdAt: createdAt, updatedAt: updatedAt }

    order.create(newOrder, function(err, target){
        if(err){
            console.log(err);
        }else{
            res.redirect("/products");
        }
    });

});




module.exports = router;