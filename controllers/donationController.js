const {Router} = require('express');
const router = Router();

router.get("/new", function(req,res){
    res.render("charities/donation/newDonation.hbs");
});

router.post("/", function(req,res){

    //TODO: IVO
     

    
    



});


module.exports = router;