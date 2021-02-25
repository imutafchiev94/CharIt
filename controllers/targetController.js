const {Router} = require('express');
const router = Router();


router.get("/new", function(req,res){
    res.render("charities/target/newTarget.hbs");
});


router.get("/edit/:targetId", function(req,res){
    res.render("charities/target/editTarget.hbs");
});

router.post("/", function(req,res){

});







module.exports = router;