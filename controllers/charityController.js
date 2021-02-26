const {Router} = require('express');
const Charity = require('../models/charity');
const router = Router();
const donationController = require('./donationController');
const targetController = require('./targetController');


router.use('/donation', donationController);
router.use('/target', targetController);

router.get("/", function(req,res){
    res.render("charities/charities.hbs");
});

router.get("/:id/edit", function(req,res){
    Charity.findById(req.params.id, function(err,charity){
        if(err){
            res.render("charities/charityDetails.hbs", {message: err, charity: charity});
        }else{
            res.render("charities/editCharity.hbs", {charity: charity});
        }
    }).lean();
});


router.get("/:id", function(req,res){
    Charity.findById(req.params.id, function(err, charity){
        if(err){
            res.render("charities/charities.hbs", {message : err});
        }else{
            res.render("charities/charityDetails.hbs", {charity: charity});
        }
    }).lean();
});

router.post("/", function(req,res){

 //#TODO ADD TARGETS

    var title = req.body.title;
    var description = req.body.description;
    var author = req.user._id;
    var email = req.body.email;
    var phoneNumber = req.body.email;
    var iban = req.body.iban;
    var address = req.body.address;
    var city = req.body.city;
    var createdBy = req.user.username;
    var updatedBy = req.user.username;
    var createdAt = Date.now();
    var updatedAt = Date.now();

    var newCharity = {title : title, description : description, author : author, email : email, phoneNumber : phoneNumber, iban : iban, address : address, city : city,
         createdBy : createdBy, updatedBy : updatedBy, createdAt : createdAt, updatedAt : updatedAt  };

    Charity.create(newCharity, function(err, charity){
        if(err){
            res.render("charities/charities.hbs", {message : err});
        }else{
            res.redirect("/charities/" + charity._id);
        }
    });
});

router.post("/:id", function(req,res){
    Charity.findByIdAndUpdate(req.params.id, req.body.charity, function(err,charity){
        if(err){
            res.redirect("/charities/" + charity._id, {message: err});
        }else{
            charity.updatedAt = Date.now();
            charity.updatedBy = req.user.username;
            charity.save();
            res.redirect("/charities/" + charity._id);
        }
    });
});

router.post("/:id/delete", function(req,res){
    Charity.findById(req.params.id, function(err, charity){
        if(err){
            res.redirect("/charities", {message: err});
        }else{
            charity.deletedAt = Date.now();
            charity.deletedBy = req.user.username;
            charity.save();
            res.redirect("/charities");
        }
    });
});



module.exports = router;