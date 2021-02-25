const {Router} = require('express');

const router = Router();

const authController = require('./controllers/authController');
const charityController = require('./controllers/charityController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');


router.get('/', (req, res) => {
    res.render('home/index', {title: 'Home page'});
});
router.use('/products', productController);
router.use('/charities', charityController);
router.use('/user', userController);
router.use('/auth', authController);
router.get('*', (req, res) => {
    res.render('error/error', {title: 'Page not found'});
})

module.exports = router;