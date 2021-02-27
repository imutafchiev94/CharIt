const {Router} = require('express');

const router = Router();
const authController = require('./controllers/authController');
const charityController = require('./controllers/charityController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const newsController = require('./controllers/newsController');
const categoryService = require('./services/categoryService');


router.get('/', async (req, res) => {
    try{
        let categories = await categoryService.getAllCategories().lean();
        res.render('home/index', {title: 'Home page', categories});
    } catch(message) {
        console.log(message);
    }
    
});
router.get('/payments', async (req, res) => {
    try{
        let categories = await categoryService.getAllCategories().lean();
        res.render('payments/payments', {title: 'Payments page', categories});
    } catch(message) {
        console.log(message);
    }
    
});
router.use('/news', newsController);
router.use('/auth', authController);
router.use('/products', productController);
router.use('/charities', charityController);
router.use('/user', userController);
router.get('*', (req, res) => {
    res.render('error/error', {title: 'Page not found'});
})

module.exports = router;