const { Router } = require("express");
const order = require("../models/order");
const charityService = require("../services/charityService");
const targetService = require("../services/targetService");

const router = Router();

router.get("/new/:id", async function (req, res) {
  try {
    var charities = await targetService.getAllByCharityId(id);
    res.render("products/order/newOrder.hbs", { charities });
  } catch (message) {
    res.render("products/order/newOrder.hbs", { charities, message });
  }
});

router.post("/", async function (req, res) {
  //TODO IVO Find charity by target and send target from request!
  try {
    var sum = req.body.sum;
    var user = req.user._id;
    var product = req.params.productId;
    var target = req.body.target;
    var charity = await charityService.getCharityByTargetId(req.body.target)
    var createdBy = req.user.username;
    var updatedBy = req.user.username;
    var createdAt = Date.now();
    var updatedAt = Date.now();
    var newOrder = {
      sum: sum,
      user: user,
      product: product,
      target: target,
      charity: charity,
      createdBy: createdBy,
      updatedBy: updatedBy,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    order.create(newOrder, function (err, target) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/products");
      }
    });
  } catch (message) {
    res.redirect("/products/", { message });
  }
});


router.post("/:id/delete", function(req,res){
  order.findById(req.params.id, function(err, order){
    if(err){
      console.log(err);
    }else{
      order.deletedBy = req.user.username;
      order.deletedAt = Date.now();

      order.save();
      res.redirect("/products");
    }
  });
});

module.exports = router;
