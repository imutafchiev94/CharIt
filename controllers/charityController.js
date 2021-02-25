const {Router} = require('express');
const charity = require('../models/charity');
const router = Router();
const donationController = require('./donationController');
const targetController = require('./targetController');


router.use('/donation', donationController);
router.use('/target', targetController);

router.get("/", function(req,res){
    res.render("/charities/charities.hbs");
});

router.get("/edit/:id", function(req,res){
    Charity.findById(req.params.id, function(err,charity){
        if(err){
            console.log(err);
        }else{
            res.render("/charities/editCharity.hbs", {charity: charity});
        }
    });
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
            console.log(err);
        }else{
            res.redirect("charities/" + charity._id);
        }
    });
});

router.post("/:id", function(req,res){
    Charity.findByIdAndUpdate(req.params.id, req.body.charity, function(err,charity){
        if(err){
            console.log(err);
        }else{
            charity.updatedAt = Date.now();
            charity.updatedBy = req.user.username;
            charity.save();
            res.redirect("/charities/" + charity._id);
        }
    });
});






module.exports = router;