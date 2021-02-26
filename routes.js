const {Router} = require('express');

const router = Router();
const charityController = require('./controllers/charityController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const categoryService = require('./services/categoryService');


router.get('/', async (req, res) => {
    try{
        var catergories = await categoryService.getAllCategories();
        res.render('home/index', {title: 'Home page'});
    } catch(message) {
        console.log(message);
    }
    
});
router.get('/news', (req, res) => {
    res.render('news/news');
})
router.use('/products', productController);
router.use('/charities', charityController);
router.use('/user', userController);
router.get('*', (req, res) => {
    res.render('error/error', {title: 'Page not found'});
})

module.exports = router;