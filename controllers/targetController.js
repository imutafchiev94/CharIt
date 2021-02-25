const {Router} = require('express');
const router = Router();


router.get("/new", function(req,res){
    res.render("charities/target/newTarget.hbs");
});


router.get("/edit/:id", function(req,res){

    Target.findById(req.params.id, function(err, target){
        if(err){
            console.log(err);
        }else{
            res.render("charities/target/editTarget.hbs", {target: target});
        }
    });

    
});

router.post("/", function(req,res){

    var targetSum = req.body.sum;
    var currentSum = 0;
    var title = req.body.title;
    var description = req.body.description;
    var charity = req.params.charity;
    var createdBy = req.user.username;
    var updatedBy = req.user.username;
    var createdAt = Date.now();
    var updatedAt = Date.now();

    var newTarget = {targetSum: targetSum, currentSum: currentSum, title: title, description:description, charity:charity, createdAt:createdAt, createdBy: createdBy, updatedBy:updatedBy, updatedAt: updatedAt};
    
    Target.create(newTarget, function(err, target){
        if(err){
            console.log(err);
        }else{
            res.redirect("/charities/" + target.charity);
        }
    });
});

router.post("/:id", function(req,res){

    Target.findByIdAndUpdate(req.params.id, req.body.target, function(err,target){
        if(err){
            console.log(err);
        }else{
            target.updatedAt = Date.now();
            target.updatedBy = req.user.username;
            target.save();
            res.redirect("/charities/" + target.charity);
        }
    });
});

router.post("/delete/:id", function(req,res){
    Target.findById(req.params.id, function(err, target){
        if(err){
            console.log(err);
        }else{
            target.deletedBy = req.user.username;
            target.deletedAt = Date.now();

            target.save();
            res.redirect("/charities/" + target.charity);

        }
    });
});







module.exports = router;